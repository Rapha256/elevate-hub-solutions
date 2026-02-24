import teamPeace from "@/assets/team-agnes.jpeg";
import teamAgnes from "@/assets/team-peace.jpeg";
import teamRapha from "@/assets/team-rapha.jpeg";
import teamEric from "@/assets/team-eric.jpeg";
import teamMuhindo from "@/assets/team-muhindo.jpeg";

const team = [
  {
    name: "Namirimo Peace",
    role: "Group Discussant",
    phone: "+255 755 733 515",
    image: teamPeace,
  },
  {
    name: "Aikomo Agnes",
    role: "Group Secretary",
    phone: "+256 763 073 899",
    image: teamAgnes,
  },
  {
    name: "Rapha (Adamz Ntege)",
    role: "Group Leader & Engineer",
    phone: "+966 501 858 627 / +256 703 539 749",
    image: teamRapha,
    highlight: true,
  },
  {
    name: "Muhindo Pius",
    role: "Group Member",
    phone: "+256 773 614 900",
    image: teamMuhindo,
  },
  {
    name: "Eric Bulega",
    role: "Group Motivator",
    phone: "+256 748 047 573",
    image: teamEric,
  },
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
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {team.map((m) => (
            <div
              key={m.name}
              className={`rounded-2xl border overflow-hidden transition-all hover:shadow-lg ${
                m.highlight ? "bg-primary/5 border-primary/30 ring-2 ring-primary/20" : "bg-card border-border hover:border-primary/20"
              }`}
            >
              <img
                src={m.image}
                alt={m.name}
                className="w-full h-72 object-cover object-top"
              />
              <div className="p-5">
                <h3 className="text-xl font-bold text-foreground">{m.name}</h3>
                <p className="text-primary font-medium text-sm">{m.role}</p>
                <p className="text-muted-foreground text-sm mt-2">📞 {m.phone}</p>
                {m.highlight && (
                  <p className="text-xs text-muted-foreground mt-1">Presenter: Kiyemba (@AdamzNtege)</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeamSection;
