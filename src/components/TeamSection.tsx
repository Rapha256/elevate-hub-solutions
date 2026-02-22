import hubTrainer from "@/assets/hub-trainer.jpeg";

const team = [
  { name: "Rapha (Adamz Ntege)", role: "Group Leader", highlight: true },
  { name: "Agness", role: "Group Secretary & Discussant" },
  { name: "Peace", role: "Team Member" },
  { name: "Jesca", role: "Team Member" },
];

const TeamSection = () => {
  return (
    <section id="team" className="py-20 px-4 bg-background">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-primary uppercase tracking-widest text-sm font-semibold mb-3">The Team</p>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            The <span className="text-gradient">Hunters</span> Group
          </h2>
          <p className="text-lg text-muted-foreground">Dedicated to solving problems facing Era92 Elevate Hub</p>
        </div>
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <img src={hubTrainer} alt="Team presenting at the hub" className="rounded-2xl object-cover w-full h-96" />
          <div className="space-y-4">
            {team.map((m) => (
              <div key={m.name} className={`p-6 rounded-xl border transition-colors ${m.highlight ? 'bg-primary/10 border-primary/30' : 'bg-card border-border hover:border-primary/20'}`}>
                <h3 className="text-xl font-bold text-foreground">{m.name}</h3>
                <p className="text-muted-foreground">{m.role}</p>
                {m.highlight && (
                  <p className="text-sm text-primary mt-2 font-medium">Presenter: Kiyemba (@AdamzNtege)</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TeamSection;
