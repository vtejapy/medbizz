import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { 
  Stethoscope, 
  UserCheck, 
  Clock, 
  Award, 
  ArrowRight, 
  CheckCircle2,
  HeartPulse,
  Syringe,
  Activity,
  Users
} from "lucide-react";

const Services = () => {
  const doctorServices = [
    {
      title: "Specialist Physicians",
      description: "Board-certified specialists across all medical disciplines including cardiology, neurology, orthopedics, and more.",
      features: ["All specialties covered", "Board-certified", "Hospital privileges verified"],
    },
    {
      title: "General Physicians",
      description: "Experienced general practitioners for primary care, urgent care, and hospital medicine coverage.",
      features: ["Internal medicine", "Family medicine", "Hospitalist services"],
    },
    {
      title: "Locum Tenens Doctors",
      description: "Temporary physician coverage for vacations, leaves of absence, or while searching for permanent hires.",
      features: ["Flexible durations", "Quick deployment", "Seamless transitions"],
    },
  ];

  const nurseServices = [
    {
      title: "ICU & Critical Care Nurses",
      description: "Highly trained critical care nurses experienced in managing complex, high-acuity patients.",
      features: ["CCRN certified", "Ventilator management", "Advanced monitoring"],
    },
    {
      title: "Emergency Room Nurses",
      description: "Fast-paced, experienced ER nurses ready to handle any emergency situation.",
      features: ["Trauma certified", "Triage expertise", "High-volume experience"],
    },
    {
      title: "General & Med-Surg Nurses",
      description: "Versatile nurses for medical-surgical units, telemetry, and general patient care.",
      features: ["All unit types", "Medication administration", "Patient education"],
    },
    {
      title: "Specialty Nurses",
      description: "Specialized nursing professionals for OR, L&D, pediatrics, oncology, and more.",
      features: ["Specialty certified", "Procedure-trained", "Department-specific"],
    },
  ];

  const staffingTypes = [
    {
      icon: Clock,
      title: "Short-Term Staffing",
      description: "Coverage for a few shifts to several weeks. Perfect for vacation coverage, sick leave, or temporary volume increases.",
      duration: "1 day - 13 weeks",
    },
    {
      icon: Award,
      title: "Long-Term Contracts",
      description: "Extended assignments for consistent staffing needs. Includes dedicated account management and quality monitoring.",
      duration: "3 - 12+ months",
    },
    {
      icon: Users,
      title: "Permanent Placement",
      description: "Full recruitment services to find your next permanent team member. Includes screening, interviews, and onboarding support.",
      duration: "Direct hire",
    },
  ];

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="py-24 hero-gradient">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-primary-foreground mb-6">
              Our Staffing Services
            </h1>
            <p className="text-xl text-primary-foreground/80 leading-relaxed">
              Comprehensive healthcare staffing solutions tailored to your facility's 
              unique needs. From single-shift coverage to permanent placement.
            </p>
          </div>
        </div>
      </section>

      {/* Doctor Staffing */}
      <section className="py-24 bg-background">
        <div className="container">
          <div className="flex items-center gap-4 mb-12">
            <div className="w-14 h-14 rounded-xl hero-gradient flex items-center justify-center">
              <Stethoscope className="h-7 w-7 text-primary-foreground" />
            </div>
            <div>
              <h2 className="text-3xl font-bold">Doctor Staffing</h2>
              <p className="text-muted-foreground">Board-certified physicians for all specialties</p>
            </div>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {doctorServices.map((service) => (
              <div
                key={service.title}
                className="p-8 rounded-2xl bg-card border border-border hover:border-primary/50 hover:shadow-glow transition-all duration-300"
              >
                <h3 className="text-xl font-semibold mb-4">{service.title}</h3>
                <p className="text-muted-foreground mb-6">{service.description}</p>
                <ul className="space-y-3">
                  {service.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2 text-sm">
                      <CheckCircle2 className="h-4 w-4 text-healthcare-green" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Nurse Staffing */}
      <section className="py-24 bg-secondary/50">
        <div className="container">
          <div className="flex items-center gap-4 mb-12">
            <div className="w-14 h-14 rounded-xl accent-gradient flex items-center justify-center">
              <UserCheck className="h-7 w-7 text-accent-foreground" />
            </div>
            <div>
              <h2 className="text-3xl font-bold">Nurse Staffing</h2>
              <p className="text-muted-foreground">RNs, LPNs, and specialized nursing professionals</p>
            </div>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            {nurseServices.map((service) => (
              <div
                key={service.title}
                className="p-8 rounded-2xl bg-card border border-border hover:shadow-lg transition-shadow"
              >
                <h3 className="text-xl font-semibold mb-4">{service.title}</h3>
                <p className="text-muted-foreground mb-6">{service.description}</p>
                <ul className="flex flex-wrap gap-2">
                  {service.features.map((feature) => (
                    <li
                      key={feature}
                      className="px-3 py-1 rounded-full bg-secondary text-sm text-secondary-foreground"
                    >
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Staffing Types */}
      <section className="py-24 bg-background">
        <div className="container">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Flexible Staffing Solutions
            </h2>
            <p className="text-muted-foreground text-lg">
              Whatever your timeline or needs, we have a staffing solution that works for you.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {staffingTypes.map((type) => (
              <div
                key={type.title}
                className="p-8 rounded-2xl bg-card border border-border text-center hover:shadow-lg transition-shadow"
              >
                <div className="w-16 h-16 rounded-full hero-gradient flex items-center justify-center mx-auto mb-6">
                  <type.icon className="h-8 w-8 text-primary-foreground" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{type.title}</h3>
                <p className="text-primary font-medium mb-4">{type.duration}</p>
                <p className="text-muted-foreground">{type.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Additional Services */}
      <section className="py-24 bg-secondary/50">
        <div className="container">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Additional Services
            </h2>
            <p className="text-muted-foreground text-lg">
              Beyond staffing, we offer comprehensive support to ensure seamless operations.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: HeartPulse, title: "Credential Verification", desc: "Thorough background checks and license verification" },
              { icon: Syringe, title: "Competency Testing", desc: "Skills assessment for specialized roles" },
              { icon: Activity, title: "Performance Monitoring", desc: "Ongoing quality assurance and feedback" },
              { icon: Users, title: "Dedicated Support", desc: "24/7 account management and assistance" },
            ].map((service) => (
              <div key={service.title} className="p-6 rounded-xl bg-card border border-border">
                <service.icon className="h-8 w-8 text-primary mb-4" />
                <h3 className="font-semibold mb-2">{service.title}</h3>
                <p className="text-sm text-muted-foreground">{service.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 hero-gradient">
        <div className="container text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-primary-foreground/80 text-lg max-w-2xl mx-auto mb-10">
            Tell us about your staffing needs and we'll provide a customized solution 
            within 24 hours.
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
                Join Our Team
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Services;
