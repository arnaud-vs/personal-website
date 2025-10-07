import { Card, CardContent } from "@/components/ui/card";
import { Code2, Palette, Rocket } from "lucide-react";

const About = () => {
  const highlights = [
    {
      icon: Code2,
      title: "Clean Code",
      description: "Writing maintainable, scalable, and well-documented code"
    },
    {
      icon: Palette,
      title: "Design-Focused",
      description: "Creating beautiful, intuitive user experiences"
    },
    {
      icon: Rocket,
      title: "Performance",
      description: "Optimizing for speed, efficiency, and scalability"
    }
  ];

  return (
    <section id="about" className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold mb-4 text-center">About Me</h2>
        <p className="text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
          A brief introduction to who I am and what drives me
        </p>
        
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <Card className="border-none shadow-lg">
            <CardContent className="p-8">
              <h3 className="text-2xl font-semibold mb-4">My Journey</h3>
              <p className="text-foreground/80 leading-relaxed">
                With over 8 years of experience in software development, I've had the privilege 
                of working with startups and established companies alike. My journey has taken me 
                from frontend development to full-stack engineering, allowing me to build 
                comprehensive solutions that delight users and drive business value.
              </p>
            </CardContent>
          </Card>
          
          <Card className="border-none shadow-lg">
            <CardContent className="p-8">
              <h3 className="text-2xl font-semibold mb-4">What I Do</h3>
              <p className="text-foreground/80 leading-relaxed">
                I specialize in building modern web applications using React, TypeScript, and Node.js. 
                I'm passionate about creating accessible, performant, and beautiful digital experiences. 
                When I'm not coding, you'll find me contributing to open-source projects or mentoring 
                aspiring developers.
              </p>
            </CardContent>
          </Card>
        </div>
        
        <div className="grid md:grid-cols-3 gap-6">
          {highlights.map((highlight, index) => (
            <Card key={index} className="border-none shadow-lg hover:shadow-xl transition-all">
              <CardContent className="p-6 text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-primary/10 text-primary mb-4">
                  <highlight.icon className="h-6 w-6" />
                </div>
                <h4 className="text-lg font-semibold mb-2">{highlight.title}</h4>
                <p className="text-sm text-muted-foreground">{highlight.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
