import Hero from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Experience from "@/components/Experience";
import Education from "@/components/Education";
import Contact from "@/components/Contact";
import ChessPuzzle from "@/components/ChessPuzzle";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Hero />
      <About />
      <Skills />
      <Experience />
      <Education />
      <Contact />
      <ChessPuzzle />
      
      <footer className="py-6 px-4 border-t">
        <p className="text-center text-sm text-muted-foreground">
          © 2024 Arnaud Verstraeten. All rights reserved.
        </p>
      </footer>
    </div>
  );
};

export default Index;
