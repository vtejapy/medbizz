import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Stethoscope, CheckCircle2, Award, Clock, Users, Briefcase } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Register = () => {
  const { toast } = useToast();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    profession: "",
    specialty: "",
    experience: "",
    certifications: "",
    preferredLocation: "",
    email: "",
    phone: "",
    about: "",
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.fullName || !formData.profession || !formData.email || !formData.phone) {
      toast({
        title: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitted(true);
    toast({
      title: "Registration Submitted!",
      description: "Welcome to MedBizz. We'll be in touch soon.",
    });
  };

  if (isSubmitted) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center bg-background">
        <div className="text-center max-w-md mx-auto p-8">
          <div className="w-20 h-20 rounded-full accent-gradient flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="h-10 w-10 text-accent-foreground" />
          </div>
          <h1 className="text-3xl font-bold mb-4">Welcome to MedBizz!</h1>
          <p className="text-muted-foreground mb-8">
            Thank you for registering. Our team will review your profile and contact 
            you within 48 hours with available opportunities matching your qualifications.
          </p>
          <Button variant="default" onClick={() => setIsSubmitted(false)}>
            Submit Another Application
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="py-16 accent-gradient">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent-foreground/20 text-accent-foreground text-sm font-medium mb-6">
              <Award className="h-4 w-4" />
              Join 10,000+ Healthcare Professionals
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-accent-foreground mb-6">
              Join Our Medical Team
            </h1>
            <p className="text-xl text-accent-foreground/80 leading-relaxed">
              Register to access rewarding opportunities with top healthcare facilities. 
              Flexible assignments that fit your schedule.
            </p>
          </div>
        </div>
      </section>

      {/* Form Section */}
      <section className="py-16 bg-background">
        <div className="container">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Form */}
            <div className="lg:col-span-2">
              <div className="bg-card rounded-2xl border border-border p-8 shadow-lg">
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-12 h-12 rounded-xl accent-gradient flex items-center justify-center">
                    <Stethoscope className="h-6 w-6 text-accent-foreground" />
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold">Professional Registration</h2>
                    <p className="text-sm text-muted-foreground">
                      All fields marked with * are required
                    </p>
                  </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Personal Information */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium border-b border-border pb-2">
                      Personal Information
                    </h3>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="fullName">Full Name *</Label>
                        <Input
                          id="fullName"
                          name="fullName"
                          placeholder="Dr. John Smith"
                          value={formData.fullName}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="profession">Profession *</Label>
                        <Select
                          value={formData.profession}
                          onValueChange={(value) => handleSelectChange("profession", value)}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select profession" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="doctor">Doctor</SelectItem>
                            <SelectItem value="nurse-rn">Registered Nurse (RN)</SelectItem>
                            <SelectItem value="nurse-lpn">Licensed Practical Nurse (LPN)</SelectItem>
                            <SelectItem value="nurse-np">Nurse Practitioner (NP)</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="email">Email Address *</Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          placeholder="your@email.com"
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number *</Label>
                        <Input
                          id="phone"
                          name="phone"
                          type="tel"
                          placeholder="+1 (234) 567-890"
                          value={formData.phone}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                    </div>
                  </div>

                  {/* Professional Details */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium border-b border-border pb-2">
                      Professional Details
                    </h3>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="specialty">Specialty</Label>
                        <Input
                          id="specialty"
                          name="specialty"
                          placeholder="e.g., Cardiology, ICU, Pediatrics"
                          value={formData.specialty}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="experience">Years of Experience</Label>
                        <Select
                          value={formData.experience}
                          onValueChange={(value) => handleSelectChange("experience", value)}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select experience" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="0-1">Less than 1 year</SelectItem>
                            <SelectItem value="1-3">1-3 years</SelectItem>
                            <SelectItem value="3-5">3-5 years</SelectItem>
                            <SelectItem value="5-10">5-10 years</SelectItem>
                            <SelectItem value="10+">10+ years</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="certifications">Certifications</Label>
                        <Input
                          id="certifications"
                          name="certifications"
                          placeholder="e.g., BLS, ACLS, PALS"
                          value={formData.certifications}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="preferredLocation">Preferred Location</Label>
                        <Input
                          id="preferredLocation"
                          name="preferredLocation"
                          placeholder="City, State or Region"
                          value={formData.preferredLocation}
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>
                  </div>

                  {/* About */}
                  <div className="space-y-2">
                    <Label htmlFor="about">About You</Label>
                    <Textarea
                      id="about"
                      name="about"
                      placeholder="Tell us about your experience, skills, and what you're looking for in your next assignment..."
                      rows={4}
                      value={formData.about}
                      onChange={handleInputChange}
                    />
                  </div>

                  {/* CV Upload Placeholder */}
                  <div className="space-y-2">
                    <Label>Upload CV (Coming Soon)</Label>
                    <div className="border-2 border-dashed border-border rounded-xl p-8 text-center">
                      <Briefcase className="h-10 w-10 text-muted-foreground mx-auto mb-4" />
                      <p className="text-muted-foreground text-sm">
                        CV upload feature coming soon. For now, please email your CV to{" "}
                        <a href="mailto:careers@medbizz.com" className="text-primary hover:underline">
                          careers@medbizz.com
                        </a>
                      </p>
                    </div>
                  </div>

                  <Button type="submit" variant="accent" size="xl" className="w-full">
                    Submit Registration
                  </Button>
                </form>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <div className="bg-card rounded-2xl border border-border p-6">
                <h3 className="font-semibold mb-4">Why Join MedBizz?</h3>
                <ul className="space-y-4">
                  {[
                    { icon: Award, text: "Competitive compensation packages" },
                    { icon: Clock, text: "Flexible scheduling options" },
                    { icon: Users, text: "Work with top healthcare facilities" },
                    { icon: Briefcase, text: "Variety of assignment types" },
                  ].map((item, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <item.icon className="h-4 w-4 text-primary" />
                      </div>
                      <span className="text-sm text-muted-foreground">{item.text}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-healthcare-coral-light rounded-2xl border border-accent/20 p-6">
                <h3 className="font-semibold mb-4">What We Look For</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Active medical license in good standing</li>
                  <li>• Minimum 1 year clinical experience</li>
                  <li>• Current certifications (BLS, ACLS, etc.)</li>
                  <li>• Strong communication skills</li>
                  <li>• Commitment to patient care excellence</li>
                </ul>
              </div>

              <div className="bg-secondary/50 rounded-2xl border border-border p-6">
                <h3 className="font-semibold mb-2">Questions?</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Our recruitment team is here to help you find the perfect opportunity.
                </p>
                <a
                  href="mailto:careers@medbizz.com"
                  className="text-sm text-primary hover:underline"
                >
                  careers@medbizz.com
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Register;
