import { Navbar } from "@/components/navbar";
import { Banner } from "@/components/banner";
import { About } from "@/components/about";
import { FeaturedProjects } from "@/components/featured-projects";
import { TechStack } from "@/components/tech-stack";
import { Contact } from "@/components/contact";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#FBFBFA] dark:bg-[#0D0D0F] text-zinc-950 dark:text-zinc-50 flex flex-col selection:bg-zinc-950 selection:text-zinc-50 dark:selection:bg-zinc-100 dark:selection:text-zinc-950">
      <Navbar />
      <main id="home" className="flex-1 flex flex-col">
        <Banner />
        <About />
        <FeaturedProjects />
        <TechStack />
        <Contact />
      </main>
    </div>
  );
}
