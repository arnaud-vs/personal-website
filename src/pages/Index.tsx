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
        <div className="text-center text-sm text-muted-foreground">
          <p>© 2024 Arnaud Verstraeten. All rights reserved.</p>
          <p>Ondernemingsnummer: 1028.396.473</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
