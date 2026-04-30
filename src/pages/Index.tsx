import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  Shield, 
  Clock, 
  Users, 
  Award, 
  Stethoscope, 
  UserCheck, 
  ArrowRight, 
  Building, 
  CheckCircle2,
  Wrench
} from "lucide-react";
import heroImage from "@/assets/hero-image.jpg";

const Index = () => {
  const stats = [
    { value: "500+", label: "Healthcare Partners" },
    { value: "10,000+", label: "Medical Professionals" },
    { value: "24/7", label: "Support Available" },
    { value: "98%", label: "Client Satisfaction" },
  ];

  const features = [
    {
      icon: Shield,
      title: "Verified Professionals",
      description: "Every doctor and nurse undergoes rigorous credential verification and background checks.",
    },
    {
      icon: Clock,
      title: "Rapid Response",
      description: "Get qualified staff within 24-48 hours for urgent staffing needs.",
    },
    {
      icon: Users,
      title: "Flexible Solutions",
      description: "From single-shift coverage to long-term placements, we adapt to your needs.",
    },
    {
      icon: Award,
      title: "Quality Assurance",
      description: "Continuous performance monitoring ensures excellence in patient care.",
    },
  ];

  const steps = [
    {
      step: "01",
      title: "Submit Your Request",
      description: "Tell us your staffing needs including specialty, duration, and shift requirements.",
    },
    {
      step: "02",
      title: "We Match & Verify",
      description: "Our team matches you with qualified professionals and verifies all credentials.",
    },
    {
      step: "03",
      title: "Staff Arrives Ready",
      description: "Your new team member arrives fully prepared to deliver excellent care.",
    },
  ];

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src={heroImage}
            alt="Medical professionals"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-foreground/95 via-foreground/80 to-foreground/40" />
        </div>
        
        <div className="container relative z-10 py-20">
          <div className="max-w-2xl space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/20 text-primary-foreground text-sm font-medium animate-fade-in">
              <Shield className="h-4 w-4" />
              Trusted by 500+ Healthcare Facilities
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground leading-tight animate-slide-up">
              Quality Healthcare
              <span className="block text-primary">Staffing Solutions</span>
            </h1>
            
            <p className="text-lg md:text-xl text-primary-foreground/80 leading-relaxed animate-slide-up">
              Connecting hospitals with verified doctors and nurses. 
              Whether you need temporary coverage or permanent staff, 
              we deliver reliable professionals when you need them most.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 pt-4 animate-slide-up">
              <Button variant="accent" size="xl" asChild>
                <Link to="/request-staff">
                  <Building className="h-5 w-5" />
                  Request Medical Staff
                </Link>
              </Button>
              <Button variant="hero-outline" size="xl" asChild className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground hover:text-foreground">
                <Link to="/register">
                  <Stethoscope className="h-5 w-5" />
                  Join as Doctor or Nurse
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="relative z-10 -mt-16">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 bg-card rounded-2xl shadow-xl p-8 border border-border">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center p-4">
                <div className="text-3xl md:text-4xl font-bold text-primary mb-2">
                  {stat.value}
                </div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-background">
        <div className="container">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Why Hospitals Choose <span className="text-gradient">MedBizz</span>
            </h2>
            <p className="text-muted-foreground text-lg">
              We understand the critical nature of healthcare staffing. That's why we go above and beyond to ensure quality and reliability.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="group p-8 rounded-2xl bg-card border border-border hover:border-primary/50 hover:shadow-glow transition-all duration-300"
              >
                <div className="w-14 h-14 rounded-xl hero-gradient flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <feature.icon className="h-7 w-7 text-primary-foreground" />
                </div>
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-24 bg-secondary/50">
        <div className="container">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              How It Works
            </h2>
            <p className="text-muted-foreground text-lg">
              Getting quality healthcare staff has never been easier. Three simple steps to solve your staffing challenges.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {steps.map((item, index) => (
              <div
                key={item.step}
                className="relative p-8 rounded-2xl bg-card border border-border"
              >
                <div className="text-6xl font-bold text-primary/10 absolute top-6 right-6">
                  {item.step}
                </div>
                <div className="relative z-10">
                  <div className="w-12 h-12 rounded-full hero-gradient flex items-center justify-center text-primary-foreground font-bold mb-6">
                    {index + 1}
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{item.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Preview */}
      <section className="py-24 bg-background">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Comprehensive Staffing for Every Healthcare Need
              </h2>
              <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
                From emergency room coverage to specialized surgical teams, 
                we provide qualified medical professionals across all departments and specialties.
              </p>
              
              <div className="space-y-4 mb-8">
                {[
                  "Specialists & General Physicians",
                  "ICU & Emergency Nurses",
                  "Locum Tenens Coverage",
                  "Short & Long-term Placements",
                ].map((item) => (
                  <div key={item} className="flex items-center gap-3">
                    <CheckCircle2 className="h-5 w-5 text-healthcare-green" />
                    <span className="text-foreground">{item}</span>
                  </div>
                ))}
              </div>
              
              <Button variant="default" size="lg" asChild>
                <Link to="/services">
                  View All Services
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
            
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-6">
                <div className="p-6 rounded-2xl bg-healthcare-teal-light border border-primary/20">
                  <Stethoscope className="h-10 w-10 text-primary mb-4" />
                  <h3 className="font-semibold text-lg mb-2">Doctor Staffing</h3>
                  <p className="text-sm text-muted-foreground">
                    Board-certified physicians for all specialties
                  </p>
                </div>
                <div className="p-6 rounded-2xl bg-healthcare-coral-light border border-accent/20">
                  <UserCheck className="h-10 w-10 text-accent mb-4" />
                  <h3 className="font-semibold text-lg mb-2">Nurse Staffing</h3>
                  <p className="text-sm text-muted-foreground">
                    RNs, LPNs, and specialized nursing professionals
                  </p>
                </div>
              </div>
              <div className="space-y-6 pt-12">
                <div className="p-6 rounded-2xl bg-secondary border border-border">
                  <Wrench className="h-10 w-10 text-healthcare-blue mb-4" />
                  <h3 className="font-semibold text-lg mb-2">Technician Staffing</h3>
                  <p className="text-sm text-muted-foreground">
                    ECG, X-Ray, Lab, and other medical technicians
                  </p>
                </div>
                <div className="p-6 rounded-2xl bg-secondary border border-border">
                  <Clock className="h-10 w-10 text-healthcare-green mb-4" />
                  <h3 className="font-semibold text-lg mb-2">Temporary Staff</h3>
                  <p className="text-sm text-muted-foreground">
                    Flexible coverage for any duration
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 hero-gradient">
        <div className="container text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-6">
            Ready to Solve Your Staffing Challenges?
          </h2>
          <p className="text-primary-foreground/80 text-lg max-w-2xl mx-auto mb-10">
            Whether you need one nurse for a night shift or an entire department covered, 
            we're here to help 24/7.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="accent" size="xl" asChild>
              <Link to="/request-staff">
                Request Staff Now
                <ArrowRight className="h-5 w-5" />
              </Link>
            </Button>
            <Button variant="hero-outline" size="xl" asChild className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground hover:text-primary">
              <Link to="/register">
                Join Our Network
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
