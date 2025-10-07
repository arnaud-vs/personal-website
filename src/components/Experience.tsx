import { Card, CardContent } from "@/components/ui/card";
import { Briefcase } from "lucide-react";

const Experience = () => {
  const experiences = [
    {
      title: "Senior Software Engineer",
      company: "Tech Innovations Inc.",
      period: "2021 - Present",
      description: "Leading a team of 5 developers building scalable web applications. Architected and implemented microservices infrastructure, reducing deployment time by 60%."
    },
    {
      title: "Full-Stack Developer",
      company: "Digital Solutions Co.",
      period: "2019 - 2021",
      description: "Developed and maintained multiple client projects using React and Node.js. Improved application performance by 40% through optimization and best practices."
    },
    {
      title: "Frontend Developer",
      company: "Creative Studio",
      period: "2017 - 2019",
      description: "Created responsive web applications and landing pages. Collaborated with designers to implement pixel-perfect UI components."
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
                      <Briefcase className="h-6 w-6" />
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
