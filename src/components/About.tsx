import { Card, CardContent } from "@/components/ui/card";
import { Code2, Zap, BookOpen } from "lucide-react";

const About = () => {
  const highlights = [
    {
      icon: Code2,
      title: "Machine Learning",
      description: "Developing advanced forecasting models and AI solutions"
    },
    {
      icon: Zap,
      title: "Energy Systems",
      description: "Optimizing energy consumption and renewable energy yield"
    },
    {
      icon: BookOpen,
      title: "Research",
      description: "Publishing findings at international conferences"
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
                I'm an engineer with a unique blend of expertise in Artificial Intelligence and Energy Systems. 
                I recently completed my Master's in AI at KU Leuven after earning my 
                Master's in Energy Engineering, including an exchange semester at École Polytechnique de Montréal.
              </p>
            </CardContent>
          </Card>
          
          <Card className="border-none shadow-lg">
            <CardContent className="p-8">
              <h3 className="text-2xl font-semibold mb-4">What I Do</h3>
              <p className="text-foreground/80 leading-relaxed">
                My work focuses on applying machine learning and AI to solve real-world energy challenges. 
                At ELECTA research group, I developed an imbalance price forecast 
                and presented my research at the International Ruhr Energy Conference in Germany.
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
