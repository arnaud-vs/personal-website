import { Card, CardContent } from "@/components/ui/card";
import { GraduationCap } from "lucide-react";

const Education = () => {
  const education = [
    {
      degree: "Master of Artificial Intelligence",
      school: "KU Leuven, Belgium",
      period: "2024 - 2025",
      description: "Magna cum laude"
    },
    {
      degree: "Master of Engineering: Energy",
      school: "KU Leuven, Belgium",
      period: "2022 - 2024",
      description: "Magna cum laude - Including exchange semester at École Polytechnique de Montréal"
    },
    {
      degree: "Bachelor of Engineering: Electromechanics",
      school: "KU Leuven, Belgium",
      period: "2019 - 2022",
      description: "Cum laude"
    }
  ];

  return (
    <section id="education" className="py-20 px-4 bg-secondary/30">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl font-bold mb-4 text-center">Education</h2>
        <p className="text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
          My academic background and qualifications
        </p>
        
        <div className="space-y-6">
          {education.map((edu, index) => (
            <Card key={index} className="border-none shadow-lg hover:shadow-xl transition-all">
              <CardContent className="p-6">
                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 rounded-lg bg-accent/10 text-accent flex items-center justify-center">
                      <GraduationCap className="h-6 w-6" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold mb-1">{edu.degree}</h3>
                    <p className="text-primary font-medium mb-2">{edu.school}</p>
                    <p className="text-sm text-muted-foreground mb-3">{edu.period}</p>
                    <p className="text-foreground/80">{edu.description}</p>
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

export default Education;
