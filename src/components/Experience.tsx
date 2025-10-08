import { Card, CardContent } from "@/components/ui/card";
import { FlaskConical, Brain, BarChart } from "lucide-react";

const Experience = () => {
  const experiences = [
    {
      title: "Researcher",
      company: "ELECTA, KU Leuven",
      period: "July - September 2025",
      description: "Developed an imbalance price forecast based on machine learning. Presented research at the International Ruhr Energy Conference in Essen, Germany.",
      icon: FlaskConical
    },
    {
      title: "AI Intern",
      company: "ENERSEE, Brussels",
      period: "August 2024",
      description: "Leveraged generative AI to explain technical software output to energy managers. Improved machine learning algorithm calculating the energy yield of PV panels.",
      icon: Brain
    },
    {
      title: "BI Intern",
      company: "KATOEN NATIE, Antwerp",
      period: "August 2023",
      description: "Created a business intelligence dashboard that summarizes customer satisfaction surveys for a multinational logistics company.",
      icon: BarChart
    }
  ];

  return (
    <section id="experience" className="py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl font-bold mb-4 text-center">Experience</h2>
        <p className="text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
          My professional journey and key achievements
        </p>
        
        <div className="space-y-6">
          {experiences.map((exp, index) => (
            <Card key={index} className="border-none shadow-lg hover:shadow-xl transition-all">
              <CardContent className="p-6">
                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
                      <exp.icon className="h-6 w-6" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold mb-1">{exp.title}</h3>
                    <p className="text-primary font-medium mb-2">{exp.company}</p>
                    <p className="text-sm text-muted-foreground mb-3">{exp.period}</p>
                    <p className="text-foreground/80">{exp.description}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
