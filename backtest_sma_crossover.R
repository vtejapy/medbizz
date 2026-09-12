suppressPackageStartupMessages({
  library(reticulate)
  library(quantmod)
  library(TTR)
  library(PerformanceAnalytics)
  library(xts)
  library(dplyr)
})

ticker <- "AAPL"
start_date <- "2020-01-01"
end_date <- Sys.Date()
short_window <- 20
long_window <- 50
commission_bps <- 5
init_capital <- 100000

yf <- import("yfinance")
hist <- yf$download(ticker, start = start_date, end = end_date)
hist_r <- as.data.frame(hist)
hist_r$Date <- as.Date(rownames(hist_r))
px <- xts(hist_r[, "Adj Close"], order.by = hist_r$Date)
colnames(px) <- ticker
px <- px[!is.na(px)]

sma_short <- SMA(px, n = short_window)
sma_long <- SMA(px, n = long_window)

sig <- ifelse(sma_short > sma_long, 1, 0)
sig <- sig[!is.na(sig)]
sig <- na.locf(sig)

ret <- dailyReturn(px)
ret <- ret[index(ret) %in% index(sig)]

pos <- sig
pos_lag <- lag(pos, 1)
pos_lag[is.na(pos_lag)] <- 0

turnover <- abs(pos - pos_lag)
cost <- (commission_bps / 10000) * turnover

strat_ret <- pos_lag * ret - cost
strat_ret[is.na(strat_ret)] <- 0

strat_ret_xts <- strat_ret
colnames(strat_ret_xts) <- "Strategy"
benchmark_ret <- ret
colnames(benchmark_ret) <- "BuyHold"

combined <- na.omit(merge(strat_ret_xts, benchmark_ret))

strat_equity <- cumprod(1 + combined[, "Strategy"])
bench_equity <- cumprod(1 + combined[, "BuyHold"])

metrics <- data.frame(
  Strategy = c(
    Return.annualized(combined[, "Strategy"], scale = 252),
    SharpeRatio.annualized(combined[, "Strategy"], scale = 252, Rf = 0),
    SortinoRatio(combined[, "Strategy"], MAR = 0, scale = 252),
    maxDrawdown(combined[, "Strategy"]),
    CalmarRatio(combined[, "Strategy"]),
    sd.annualized(combined[, "Strategy"], scale = 252),
    Return.annualized(combined[, "Strategy"], scale = 252) /
      maxDrawdown(combined[, "Strategy"]),
    sum(turnover > 0)
  ),
  BuyHold = c(
    Return.annualized(combined[, "BuyHold"], scale = 252),
    SharpeRatio.annualized(combined[, "BuyHold"], scale = 252, Rf = 0),
    SortinoRatio(combined[, "BuyHold"], MAR = 0, scale = 252),
    maxDrawdown(combined[, "BuyHold"]),
    CalmarRatio(combined[, "BuyHold"]),
    sd.annualized(combined[, "BuyHold"], scale = 252),
    Return.annualized(combined[, "BuyHold"], scale = 252) /
      maxDrawdown(combined[, "BuyHold"]),
    NA
  )
)
rownames(metrics) <- c("CAGR", "Sharpe", "Sortino", "MaxDrawdown",
                       "Calmar", "AnnVol", "ReturnToDD", "NumTrades")

cat(sprintf("Backtest: %s | SMA(%d/%d) | %s to %s (via yfinance)\n",
            ticker, short_window, long_window, start_date, end_date))
print(round(metrics, 4))

charts.PerformanceSummary(combined,
                         main = sprintf("%s SMA(%d/%d) vs Buy&Hold (yfinance)",
                                        ticker, short_window, long_window))

final_strat <- as.numeric(last(strat_equity)) * init_capital
final_bench <- as.numeric(last(bench_equity)) * init_capital
cat(sprintf("\nFinal equity (start $%d): Strategy $%.0f | Buy&Hold $%.0f\n",
            init_capital, final_strat, final_bench))
