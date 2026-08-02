DROP POLICY "Anyone can submit an application" ON public.job_applications;

CREATE POLICY "Anyone can apply to an open job" ON public.job_applications
FOR INSERT
WITH CHECK (
  EXISTS (SELECT 1 FROM public.jobs j WHERE j.id = job_id AND j.is_active = true)
  AND char_length(full_name) BETWEEN 2 AND 120
  AND email ~* '^[^@\s]+@[^@\s]+\.[a-z]{2,}$'
  AND char_length(email) <= 255
  AND char_length(phone) BETWEEN 6 AND 20
  AND (cover_letter IS NULL OR char_length(cover_letter) <= 4000)
  AND (resume_url IS NULL OR char_length(resume_url) <= 500)
  AND status = 'submitted'
);