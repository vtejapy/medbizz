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
import { Building, CheckCircle2, Phone, Mail, Clock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const RequestStaff = () => {
  const { toast } = useToast();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    hospitalName: "",
    contactPerson: "",
    email: "",
    phone: "",
    role: "",
    specialty: "",
    numberOfStaff: "",
    shiftType: "",
    duration: "",
    notes: "",
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
    
    // Basic validation
    if (!formData.hospitalName || !formData.contactPerson || !formData.email || !formData.phone || !formData.role) {
      toast({
        title: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    // Simulate form submission
    setIsSubmitted(true);
    toast({
      title: "Request Submitted Successfully!",
      description: "Our team will contact you within 24 hours.",
    });
  };

  if (isSubmitted) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center bg-background">
        <div className="text-center max-w-md mx-auto p-8">
          <div className="w-20 h-20 rounded-full hero-gradient flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="h-10 w-10 text-primary-foreground" />
          </div>
          <h1 className="text-3xl font-bold mb-4">Request Submitted!</h1>
          <p className="text-muted-foreground mb-8">
            Thank you for your staffing request. Our dedicated team will review your 
            requirements and contact you within 24 hours with available options.
          </p>
          <Button variant="default" onClick={() => setIsSubmitted(false)}>
            Submit Another Request
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="py-16 hero-gradient">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-foreground/20 text-primary-foreground text-sm font-medium mb-6">
              <Clock className="h-4 w-4" />
              Response within 24 hours
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-primary-foreground mb-6">
              Request Medical Staff
            </h1>
            <p className="text-xl text-primary-foreground/80 leading-relaxed">
              Fill out the form below with your staffing requirements and we'll match 
              you with qualified healthcare professionals.
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
                  <div className="w-12 h-12 rounded-xl hero-gradient flex items-center justify-center">
                    <Building className="h-6 w-6 text-primary-foreground" />
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold">Staffing Request Form</h2>
                    <p className="text-sm text-muted-foreground">
                      All fields marked with * are required
                    </p>
                  </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Hospital Information */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium border-b border-border pb-2">
                      Hospital Information
                    </h3>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="hospitalName">Hospital/Facility Name *</Label>
                        <Input
                          id="hospitalName"
                          name="hospitalName"
                          placeholder="e.g., City General Hospital"
                          value={formData.hospitalName}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="contactPerson">Contact Person *</Label>
                        <Input
                          id="contactPerson"
                          name="contactPerson"
                          placeholder="Full name"
                          value={formData.contactPerson}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                    </div>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="email">Email Address *</Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          placeholder="email@hospital.com"
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

                  {/* Staffing Requirements */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium border-b border-border pb-2">
                      Staffing Requirements
                    </h3>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="role">Required Role *</Label>
                        <Select
                          value={formData.role}
                          onValueChange={(value) => handleSelectChange("role", value)}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select role" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="doctor">Doctor</SelectItem>
                            <SelectItem value="nurse">Nurse</SelectItem>
                            <SelectItem value="both">Both Doctors & Nurses</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="specialty">Specialty</Label>
                        <Input
                          id="specialty"
                          name="specialty"
                          placeholder="e.g., Cardiology, ICU, Emergency"
                          value={formData.specialty}
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>
                    <div className="grid md:grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="numberOfStaff">Number of Staff</Label>
                        <Input
                          id="numberOfStaff"
                          name="numberOfStaff"
                          type="number"
                          min="1"
                          placeholder="e.g., 2"
                          value={formData.numberOfStaff}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="shiftType">Shift Type</Label>
                        <Select
                          value={formData.shiftType}
                          onValueChange={(value) => handleSelectChange("shiftType", value)}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select shift" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="day">Day Shift</SelectItem>
                            <SelectItem value="night">Night Shift</SelectItem>
                            <SelectItem value="rotational">Rotational</SelectItem>
                            <SelectItem value="flexible">Flexible</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="duration">Duration</Label>
                        <Select
                          value={formData.duration}
                          onValueChange={(value) => handleSelectChange("duration", value)}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select duration" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="1-shift">Single Shift</SelectItem>
                            <SelectItem value="1-week">1 Week</SelectItem>
                            <SelectItem value="2-weeks">2 Weeks</SelectItem>
                            <SelectItem value="1-month">1 Month</SelectItem>
                            <SelectItem value="3-months">3 Months</SelectItem>
                            <SelectItem value="6-months">6+ Months</SelectItem>
                            <SelectItem value="permanent">Permanent</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>

                  {/* Additional Notes */}
                  <div className="space-y-2">
                    <Label htmlFor="notes">Additional Notes</Label>
                    <Textarea
                      id="notes"
                      name="notes"
                      placeholder="Any additional requirements, certifications needed, or special instructions..."
                      rows={4}
                      value={formData.notes}
                      onChange={handleInputChange}
                    />
                  </div>

                  <Button type="submit" variant="accent" size="xl" className="w-full">
                    Submit Staffing Request
                  </Button>
                </form>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <div className="bg-card rounded-2xl border border-border p-6">
                <h3 className="font-semibold mb-4">What Happens Next?</h3>
                <ol className="space-y-4">
                  {[
                    "We review your requirements within 24 hours",
                    "Match you with qualified professionals",
                    "Present candidates for your approval",
                    "Handle all credentialing and logistics",
                    "Staff arrives ready to work",
                  ].map((step, index) => (
                    <li key={step} className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full hero-gradient flex items-center justify-center flex-shrink-0 text-xs text-primary-foreground font-medium">
                        {index + 1}
                      </div>
                      <span className="text-sm text-muted-foreground">{step}</span>
                    </li>
                  ))}
                </ol>
              </div>

              <div className="bg-secondary/50 rounded-2xl border border-border p-6">
                <h3 className="font-semibold mb-4">Need Urgent Help?</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  For immediate staffing needs, contact us directly:
                </p>
                <div className="space-y-3">
                  <a
                    href="tel:+1234567890"
                    className="flex items-center gap-3 text-sm hover:text-primary transition-colors"
                  >
                    <Phone className="h-4 w-4 text-primary" />
                    +1 (234) 567-890
                  </a>
                  <a
                    href="mailto:urgent@medbizz.com"
                    className="flex items-center gap-3 text-sm hover:text-primary transition-colors"
                  >
                    <Mail className="h-4 w-4 text-primary" />
                    urgent@medbizz.com
                  </a>
                </div>
              </div>

              <div className="bg-healthcare-teal-light rounded-2xl border border-primary/20 p-6">
                <Clock className="h-8 w-8 text-primary mb-4" />
                <h3 className="font-semibold mb-2">24/7 Support</h3>
                <p className="text-sm text-muted-foreground">
                  Our team is available around the clock to handle your urgent 
                  staffing needs.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default RequestStaff;
