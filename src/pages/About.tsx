import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { 
  Target, 
  Eye, 
  Heart, 
  Shield, 
  Award, 
  Users, 
  Clock, 
  CheckCircle2, 
  ArrowRight 
} from "lucide-react";

const About = () => {
  const values = [
    {
      icon: Shield,
      title: "Trust & Integrity",
      description: "We maintain the highest standards of honesty and transparency in all our dealings.",
    },
    {
      icon: Award,
      title: "Excellence",
      description: "We're committed to delivering exceptional quality in every placement we make.",
    },
    {
      icon: Users,
      title: "Partnership",
      description: "We build lasting relationships with hospitals and healthcare professionals alike.",
    },
    {
      icon: Heart,
      title: "Patient-Centered",
      description: "Everything we do ultimately serves to improve patient care and outcomes.",
    },
  ];

  const reasons = [
    "Rigorous credential verification for every professional",
    "24/7 dedicated support team for urgent needs",
    "Rapid response time for emergency staffing",
    "Comprehensive liability coverage included",
    "Flexible contracts tailored to your needs",
    "Continuous quality monitoring and feedback",
  ];

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="py-24 hero-gradient">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-primary-foreground mb-6">
              Connecting Healthcare Excellence
            </h1>
            <p className="text-xl text-primary-foreground/80 leading-relaxed">
              We're on a mission to bridge the gap between healthcare facilities 
              and qualified medical professionals, ensuring patients always receive 
              the best possible care.
            </p>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-24 bg-background">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-12">
            <div className="p-10 rounded-2xl bg-card border border-border shadow-lg">
              <div className="w-16 h-16 rounded-xl hero-gradient flex items-center justify-center mb-6">
                <Target className="h-8 w-8 text-primary-foreground" />
              </div>
              <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
              <p className="text-muted-foreground leading-relaxed text-lg">
                To provide healthcare facilities with reliable, qualified medical professionals 
                who are committed to excellence in patient care. We strive to make healthcare 
                staffing seamless, efficient, and stress-free for both hospitals and healthcare workers.
              </p>
            </div>
            
            <div className="p-10 rounded-2xl bg-card border border-border shadow-lg">
              <div className="w-16 h-16 rounded-xl accent-gradient flex items-center justify-center mb-6">
                <Eye className="h-8 w-8 text-accent-foreground" />
              </div>
              <h2 className="text-2xl font-bold mb-4">Our Vision</h2>
              <p className="text-muted-foreground leading-relaxed text-lg">
                To become the most trusted healthcare staffing partner, known for our 
                unwavering commitment to quality, reliability, and the well-being of 
                both patients and healthcare professionals across the nation.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-24 bg-secondary/50">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
              Our Story
            </h2>
            <div className="prose prose-lg mx-auto text-muted-foreground">
              <p className="text-lg leading-relaxed mb-6">
                MedBizz was founded with a simple yet powerful belief: every patient
                deserves access to quality healthcare, and every hospital deserves reliable
                staffing solutions when they need them most.
              </p>
              <p className="text-lg leading-relaxed mb-6">
                Having witnessed firsthand the challenges hospitals face when short-staffed, 
                our founders set out to create a staffing agency that truly understands the 
                healthcare industry's unique demands. We built a network of verified, 
                experienced medical professionals ready to step in and make a difference.
              </p>
              <p className="text-lg leading-relaxed">
                Today, we serve hundreds of healthcare facilities across the country, 
                from major hospital systems to specialized clinics. Our commitment to 
                quality, speed, and reliability has made us a trusted partner in 
                healthcare staffing solutions.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-24 bg-background">
        <div className="container">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Our Core Values
            </h2>
            <p className="text-muted-foreground text-lg">
              These principles guide everything we do and shape how we serve our partners.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value) => (
              <div
                key={value.title}
                className="p-8 rounded-2xl bg-card border border-border text-center hover:shadow-lg transition-shadow"
              >
                <div className="w-16 h-16 rounded-full hero-gradient flex items-center justify-center mx-auto mb-6">
                  <value.icon className="h-8 w-8 text-primary-foreground" />
                </div>
                <h3 className="text-xl font-semibold mb-3">{value.title}</h3>
                <p className="text-muted-foreground">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Trust Us */}
      <section className="py-24 bg-secondary/50">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Why Hospitals Trust Us
              </h2>
              <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
                We understand that when you reach out for staffing support, you need 
                more than just bodies—you need qualified professionals who will 
                uphold your standards of care.
              </p>
              
              <div className="space-y-4">
                {reasons.map((reason) => (
                  <div key={reason} className="flex items-start gap-3">
                    <CheckCircle2 className="h-6 w-6 text-healthcare-green flex-shrink-0 mt-0.5" />
                    <span className="text-foreground">{reason}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-6">
              <div className="p-8 rounded-2xl bg-card border border-border text-center">
                <div className="text-4xl font-bold text-primary mb-2">15+</div>
                <div className="text-muted-foreground">Years Experience</div>
              </div>
              <div className="p-8 rounded-2xl bg-card border border-border text-center">
                <div className="text-4xl font-bold text-primary mb-2">500+</div>
                <div className="text-muted-foreground">Partner Facilities</div>
              </div>
              <div className="p-8 rounded-2xl bg-card border border-border text-center">
                <div className="text-4xl font-bold text-primary mb-2">10K+</div>
                <div className="text-muted-foreground">Professionals</div>
              </div>
              <div className="p-8 rounded-2xl bg-card border border-border text-center">
                <div className="text-4xl font-bold text-primary mb-2">98%</div>
                <div className="text-muted-foreground">Satisfaction Rate</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 hero-gradient">
        <div className="container text-center">
          <div className="flex items-center justify-center gap-2 mb-6">
            <Clock className="h-6 w-6 text-primary-foreground" />
            <span className="text-primary-foreground/80">Available 24/7</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-6">
            Partner With Us Today
          </h2>
          <p className="text-primary-foreground/80 text-lg max-w-2xl mx-auto mb-10">
            Join the hundreds of healthcare facilities that trust MedBizz
            for their staffing needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="accent" size="xl" asChild>
              <Link to="/request-staff">
                Request Staff
                <ArrowRight className="h-5 w-5" />
              </Link>
            </Button>
            <Button variant="hero-outline" size="xl" asChild className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground hover:text-primary">
              <Link to="/services">
                View Services
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
