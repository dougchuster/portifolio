import { TopNav } from "@/components/sections/top-nav";
import { SideNav } from "@/components/sections/side-nav";
import { HeroSection } from "@/components/sections/hero";
import { ServicesSection } from "@/components/sections/services";
import { ExpertiseSection } from "@/components/sections/expertise";
import { ProjectsSection } from "@/components/sections/projects";
import { WorkflowSection } from "@/components/sections/workflow";
import { ContactSection } from "@/components/sections/contact";
import { Footer } from "@/components/sections/footer";
import { GlowOrb } from "@/components/ui/cyber-glass";

export default function Home() {
  return (
    <div className="scan-lines">
      {/* Background Layers */}
      <div
        className="fixed inset-0 -z-30"
        style={{ background: "linear-gradient(135deg, #030014 0%, #080020 45%, #000d10 100%)" }}
      />
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          zIndex: -28,
          background:
            "radial-gradient(ellipse at 15% 60%, rgba(124,58,237,0.10) 0%, transparent 55%), radial-gradient(ellipse at 85% 15%, rgba(0,238,252,0.07) 0%, transparent 50%)",
        }}
      />
      {/* Vignette — escurece as bordas */}
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          zIndex: -19,
          background:
            "radial-gradient(ellipse 80% 80% at 50% 50%, transparent 40%, rgba(0,0,0,0.6) 75%, rgba(0,0,0,0.92) 100%)",
        }}
      />
      <GlowOrb
        className="w-[200px] sm:w-[350px] md:w-[500px] lg:w-[600px] h-[200px] sm:h-[350px] md:h-[500px] lg:h-[600px] -top-32 -left-32 -z-10 animate-pulse"
        color="primary"
      />
      <GlowOrb
        className="w-[180px] sm:w-[300px] md:w-[400px] lg:w-[500px] h-[180px] sm:h-[300px] md:h-[400px] lg:h-[500px] bottom-0 -right-20 -z-10"
        color="secondary"
      />

      {/* Navigation */}
      <TopNav />
      <SideNav />

      {/* Main Content */}
      <main>
        <HeroSection />
        <ServicesSection />
        <ExpertiseSection />
        <ProjectsSection />
        <WorkflowSection />
        <ContactSection />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
