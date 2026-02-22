import hubOutdoor from "@/assets/hub-outdoor-2.jpeg";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0">
        <img src={hubOutdoor} alt="Elevate Era Hub 92 community gathering" className="w-full h-full object-cover" />
        <div className="absolute inset-0 gradient-hero" />
      </div>
      <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
        <p className="text-primary-foreground/80 uppercase tracking-[0.3em] text-sm font-medium mb-6">
          Empowering Uganda's Youth
        </p>
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-primary-foreground mb-6 leading-tight">
          Elevate Era
          <br />
          <span className="text-accent">Hub 92</span>
        </h1>
        <p className="text-xl md:text-2xl text-primary-foreground/90 mb-4 max-w-3xl mx-auto">
          On a mission to create <strong>100,000 jobs</strong> for youths and end unemployment
        </p>
        <p className="text-lg text-primary-foreground/70 mb-10">
          Katanga Lungujja &bull; Jinja Hubs &bull; Kampala, Uganda
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a href="#problems" className="inline-block bg-accent text-accent-foreground px-8 py-4 rounded-lg font-semibold text-lg hover:opacity-90 transition-opacity">
            Explore Challenges
          </a>
          <a href="#suggestions" className="inline-block border-2 border-primary-foreground/40 text-primary-foreground px-8 py-4 rounded-lg font-semibold text-lg hover:bg-primary-foreground/10 transition-colors">
            Share Your Ideas
          </a>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
