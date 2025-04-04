import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Camera, Image, Users, Award, Download } from "lucide-react";

const About = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="py-16 container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="aspect-square rounded-lg overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1531746020798-e6953c6e8e04" 
                alt="Photographer" 
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <h1 className="text-4xl font-bold mb-4">About Me</h1>
              <p className="text-muted-foreground mb-6">
                Hello! I'm Alex Morgan, a professional photographer based in New York City. 
                With over 10 years of experience in photography, I specialize in capturing 
                moments that tell compelling stories.
              </p>
              <p className="text-muted-foreground mb-6">
                My journey in photography began when I was gifted my first camera at the age of 16. 
                Since then, I've developed a passion for finding beauty in everyday scenes and 
                creating visual narratives that resonate with viewers.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button asChild>
                  <Link to="/contact">Get in Touch</Link>
                </Button>
                <Button asChild variant="outline">
                  <a href="#" download>
                    <Download className="mr-2 h-4 w-4" />
                    Download Resume
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Skills & Expertise */}
        <section className="py-16 bg-muted/50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-12 text-center">Skills & Expertise</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
              {[
                {
                  icon: Camera,
                  title: "Photography",
                  description: "Specializing in portrait, landscape, and architectural photography with an eye for detail and composition."
                },
                {
                  icon: Image,
                  title: "Photo Editing",
                  description: "Expert in Adobe Lightroom and Photoshop with a focus on natural, authentic editing styles."
                },
                {
                  icon: Users,
                  title: "Direction",
                  description: "Skilled at directing subjects to capture authentic emotions and natural poses."
                },
                {
                  icon: Award,
                  title: "Storytelling",
                  description: "Creating visual narratives that convey emotion and connect with viewers on a deeper level."
                }
              ].map((skill, index) => (
                <Card key={index} className="border-none shadow-sm">
                  <CardContent className="pt-6">
                    <div className="mb-4 p-3 rounded-full bg-primary/10 w-fit">
                      <skill.icon className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="text-xl font-medium mb-2">{skill.title}</h3>
                    <p className="text-muted-foreground">{skill.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Experience & Education */}
        <section className="py-16 container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center">Experience & Education</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <h3 className="text-2xl font-semibold mb-6">Work Experience</h3>
              <div className="space-y-8">
                {[
                  {
                    period: "2020 - Present",
                    title: "Freelance Photographer",
                    company: "Self-employed",
                    description: "Working with various clients on portrait, commercial, and event photography projects."
                  },
                  {
                    period: "2016 - 2020",
                    title: "Senior Photographer",
                    company: "Aperture Studios",
                    description: "Led photography projects for major brands and publications, mentored junior photographers."
                  },
                  {
                    period: "2012 - 2016",
                    title: "Staff Photographer",
                    company: "Urban Magazine",
                    description: "Captured images for feature articles, profiles, and cover shoots."
                  }
                ].map((job, index) => (
                  <div key={index} className="relative pl-8 border-l-2 border-muted pb-2">
                    <div className="absolute w-4 h-4 bg-primary rounded-full -left-[9px] top-1"></div>
                    <span className="text-sm text-muted-foreground">{job.period}</span>
                    <h4 className="text-lg font-medium mt-1">{job.title}</h4>
                    <p className="text-primary">{job.company}</p>
                    <p className="text-muted-foreground mt-2">{job.description}</p>
                  </div>
                ))}
              </div>
            </div>
            
            <div>
              <h3 className="text-2xl font-semibold mb-6">Education & Certifications</h3>
              <div className="space-y-8">
                {[
                  {
                    period: "2008 - 2012",
                    title: "Bachelor of Fine Arts in Photography",
                    institution: "New York School of Visual Arts",
                    description: "Graduated with honors. Specialized in documentary and portrait photography."
                  },
                  {
                    period: "2018",
                    title: "Advanced Digital Imaging Certification",
                    institution: "Adobe Creative Institute",
                    description: "Mastered advanced techniques in digital image manipulation and color grading."
                  },
                  {
                    period: "2015",
                    title: "Master Class in Portrait Photography",
                    institution: "International Photography Workshop",
                    description: "Intensive workshop focused on lighting techniques and subject direction."
                  }
                ].map((edu, index) => (
                  <div key={index} className="relative pl-8 border-l-2 border-muted pb-2">
                    <div className="absolute w-4 h-4 bg-primary rounded-full -left-[9px] top-1"></div>
                    <span className="text-sm text-muted-foreground">{edu.period}</span>
                    <h4 className="text-lg font-medium mt-1">{edu.title}</h4>
                    <p className="text-primary">{edu.institution}</p>
                    <p className="text-muted-foreground mt-2">{edu.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Contact CTA */}
        <section className="py-16 bg-primary text-primary-foreground">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Work Together?</h2>
            <p className="max-w-2xl mx-auto mb-8">
              I'm currently available for freelance photography projects, collaborations, and consultations.
            </p>
            <Button asChild size="lg" variant="outline" className="bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground/10">
              <Link to="/contact">Contact Me</Link>
            </Button>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default About;