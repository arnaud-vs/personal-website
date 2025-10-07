import { Button } from "@/components/ui/button";
import { ArrowDown, Mail, Linkedin, Github } from "lucide-react";
import profilePhoto from "@/assets/profile-photo.jpg";

const Hero = () => {
  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="min-h-screen flex items-center justify-center px-4 py-20 bg-gradient-to-br from-background via-background to-secondary/30">
      <div className="max-w-5xl mx-auto text-center">
        <div className="mb-8 flex justify-center">
          <div className="relative">
            <div className="absolute inset-0 bg-primary/20 rounded-full blur-2xl"></div>
            <img
              src={profilePhoto}
              alt="Professional profile"
              className="relative w-32 h-32 rounded-full object-cover border-4 border-background shadow-lg"
            />
          </div>
        </div>
        
        <h1 className="text-5xl md:text-7xl font-bold mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
          Arnaud Verstraeten
        </h1>
        
        <p className="text-xl md:text-2xl text-muted-foreground mb-6">
          Senior Software Engineer & Full-Stack Developer
        </p>
        
        <p className="text-lg text-foreground/80 max-w-2xl mx-auto mb-8">
          Passionate about building elegant solutions to complex problems. 
          Experienced in modern web technologies, cloud architecture, and agile methodologies.
        </p>
        
        <div className="flex flex-wrap gap-4 justify-center mb-12">
          <Button 
            size="lg" 
            className="bg-primary hover:bg-primary/90"
            onClick={() => scrollToSection("contact")}
          >
            <Mail className="mr-2 h-5 w-5" />
            Get In Touch
          </Button>
          <Button 
            size="lg" 
            variant="outline"
            onClick={() => scrollToSection("experience")}
          >
            View Experience
          </Button>
        </div>
        
        <div className="flex gap-4 justify-center">
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
            <Button size="icon" variant="ghost" className="hover:text-primary">
              <Linkedin className="h-5 w-5" />
            </Button>
          </a>
          <a href="https://github.com" target="_blank" rel="noopener noreferrer">
            <Button size="icon" variant="ghost" className="hover:text-primary">
              <Github className="h-5 w-5" />
            </Button>
          </a>
          <a href="mailto:arnaud@example.com">
            <Button size="icon" variant="ghost" className="hover:text-primary">
              <Mail className="h-5 w-5" />
            </Button>
          </a>
        </div>
        
        <button
          onClick={() => scrollToSection("about")}
          className="mt-16 animate-bounce text-muted-foreground hover:text-primary transition-colors"
          aria-label="Scroll to content"
        >
          <ArrowDown className="h-8 w-8" />
        </button>
      </div>
    </section>
  );
};

export default Hero;
