CREATE TABLE public.jobs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  department text NOT NULL,
  location text NOT NULL,
  employment_type text NOT NULL DEFAULT 'Full-time',
  experience_level text NOT NULL DEFAULT 'Mid-level',
  salary_range text,
  description text NOT NULL,
  requirements text[] NOT NULL DEFAULT '{}',
  is_active boolean NOT NULL DEFAULT true,
  posted_at timestamptz NOT NULL DEFAULT now(),
  created_at timestamptz NOT NULL DEFAULT now()
);

GRANT SELECT ON public.jobs TO anon;
GRANT SELECT ON public.jobs TO authenticated;
GRANT ALL ON public.jobs TO service_role;
ALTER TABLE public.jobs ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Active jobs are viewable by everyone" ON public.jobs FOR SELECT USING (is_active = true);

CREATE TABLE public.job_applications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  job_id uuid NOT NULL REFERENCES public.jobs(id) ON DELETE CASCADE,
  full_name text NOT NULL,
  email text NOT NULL,
  phone text NOT NULL,
  years_experience text,
  current_location text,
  resume_url text,
  cover_letter text,
  status text NOT NULL DEFAULT 'submitted',
  created_at timestamptz NOT NULL DEFAULT now()
);

GRANT INSERT ON public.job_applications TO anon;
GRANT INSERT ON public.job_applications TO authenticated;
GRANT ALL ON public.job_applications TO service_role;
ALTER TABLE public.job_applications ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can submit an application" ON public.job_applications FOR INSERT WITH CHECK (true);

INSERT INTO public.jobs (title, department, location, employment_type, experience_level, salary_range, description, requirements) VALUES
('Staff Nurse - ICU', 'Nursing', 'Hyderabad, Telangana', 'Full-time', 'Mid-level', '₹3.6 - 5.4 LPA', 'Provide critical care nursing in a 24-bed multi-speciality ICU for one of our partner hospitals in Hyderabad. You will monitor ventilated patients, administer medication and coordinate closely with intensivists.', ARRAY['B.Sc / GNM Nursing with valid council registration','2+ years ICU or critical care experience','BLS / ACLS certification preferred','Willing to work rotational shifts']),
('Medical Officer (MBBS)', 'Clinical', 'Bengaluru, Karnataka', 'Full-time', 'Entry-level', '₹8 - 12 LPA', 'Serve as first-line physician in the emergency and outpatient departments, handling triage, initial diagnosis and referrals to specialists.', ARRAY['MBBS with state medical council registration','0-3 years clinical experience','Strong emergency assessment skills','Fluency in English and one regional language']),
('Radiology Technician', 'Diagnostics', 'Chennai, Tamil Nadu', 'Full-time', 'Mid-level', '₹2.8 - 4.2 LPA', 'Operate X-ray, CT and MRI equipment, ensure patient positioning and radiation safety, and maintain imaging records for a high-volume diagnostic centre.', ARRAY['B.Sc / Diploma in Radiology Technology','2+ years hands-on CT / MRI experience','Knowledge of AERB radiation safety norms','Attention to detail in reporting']),
('Physiotherapist', 'Rehabilitation', 'Pune, Maharashtra', 'Full-time', 'Mid-level', '₹3 - 4.8 LPA', 'Design and deliver rehabilitation programmes for orthopaedic and neuro patients, including post-operative recovery and pain management.', ARRAY['BPT / MPT qualification','2+ years clinical physiotherapy practice','Experience with electrotherapy modalities','Good patient counselling skills']),
('Hospital Operations Manager', 'Administration', 'Hyderabad, Telangana', 'Full-time', 'Senior', '₹9 - 14 LPA', 'Own day-to-day hospital operations across housekeeping, front office, patient flow and vendor management for a 200-bed facility.', ARRAY['MHA / MBA in Hospital Administration','6+ years hospital operations experience','NABH accreditation exposure','Strong team leadership and reporting skills']),
('Healthcare Recruiter', 'Talent Acquisition', 'Hyderabad, Telangana (Hybrid)', 'Full-time', 'Entry-level', '₹3 - 5 LPA', 'Source, screen and place clinical and paramedical talent for our hospital partners across India. You will own the candidate pipeline end to end.', ARRAY['Any graduate; healthcare background a plus','0-2 years recruitment or HR experience','Excellent verbal and written communication','Comfortable with high-volume calling']),
('Lab Technician - Pathology', 'Diagnostics', 'Vijayawada, Andhra Pradesh', 'Full-time', 'Entry-level', '₹2.4 - 3.6 LPA', 'Collect and process samples, run biochemistry and haematology analysers and maintain quality control logs in an NABL-accredited lab.', ARRAY['DMLT / B.Sc MLT','0-2 years laboratory experience','Familiarity with automated analysers','Strict adherence to biosafety protocols']),
('Home Care Nurse', 'Nursing', 'Multiple cities', 'Contract', 'Mid-level', '₹25,000 - 38,000 / month', 'Deliver bedside nursing care at patient homes including wound care, catheterisation, injections and vitals monitoring with daily reporting to the care team.', ARRAY['GNM / B.Sc Nursing with registration','1+ year bedside nursing experience','Own smartphone for care reporting','Willing to travel within assigned city']);