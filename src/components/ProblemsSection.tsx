import { Clock, Utensils, Zap, Wifi, Monitor, GraduationCap, MapPin, Users, Wallet, Heart } from "lucide-react";

const problems = [
  {
    icon: Clock, title: "Time Management",
    desc: "Difficulty scheduling activities and courses efficiently.",
    possible: "Plan the day by starting early; allocate specific time slots.",
    applicable: "Prepare a daily timetable by 4pm the previous day.",
  },
  {
    icon: Utensils, title: "Food",
    desc: "Providing meals during long training sessions.",
    possible: "Prepare food in advance or source from local vendors.",
    applicable: "Assign a cook to prepare food ready by 1pm daily.",
  },
  {
    icon: Zap, title: "Electricity",
    desc: "Frequent power outages disrupting training.",
    possible: "Rely on generators or UPS backup.",
    applicable: "Install solar panels as a sustainable backup power source.",
  },
  {
    icon: Wifi, title: "Internet",
    desc: "Unreliable connectivity hindering online learning.",
    possible: "Use mobile data hotspots or switch providers.",
    applicable: "Subscribe to a dedicated fiber optic connection.",
  },
  {
    icon: Monitor, title: "Computers",
    desc: "Insufficient or faulty computers limiting participation.",
    possible: "Repair existing units or borrow from partners.",
    applicable: "Fundraise or apply for donations for new computers.",
  },
  {
    icon: GraduationCap, title: "Trainers",
    desc: "Shortage of skilled instructors for specialized courses.",
    possible: "Use volunteers or cross-train current staff.",
    applicable: "Partner with universities for volunteer trainers.",
  },
  {
    icon: MapPin, title: "Location",
    desc: "Space, accessibility, or safety issues at current site.",
    possible: "Relocate or expand the existing area.",
    applicable: "Renovate current location for better usability.",
  },
  {
    icon: Users, title: "Human Resources",
    desc: "Limited staff for administrative and support roles.",
    possible: "Recruit volunteers from the community.",
    applicable: "Internal training program to upskill community members.",
  },
  {
    icon: Wallet, title: "Funding",
    desc: "Lack of consistent funding for operations and equipment.",
    possible: "Seek grants from NGOs or government programs.",
    applicable: "Launch crowdfunding campaigns targeting alumni and tech companies.",
  },
  {
    icon: Heart, title: "Student Engagement",
    desc: "Low retention due to competing community priorities.",
    possible: "Offer incentives and flexible scheduling.",
    applicable: "Provide certificates and free intro sessions to build loyalty.",
  },
];

const ProblemsSection = () => {
  return (
    <section id="problems" className="py-20 px-4 gradient-warm">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-accent uppercase tracking-widest text-sm font-semibold mb-3">Challenges & Solutions</p>
          <h2 className="text-4xl md:text-5xl font-bold text-warm-foreground mb-4">
            Problems We're Tackling
          </h2>
          <p className="text-lg text-warm-foreground/70 max-w-2xl mx-auto">
            Real challenges identified at the hub with practical, applicable solutions
          </p>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          {problems.map((p) => (
            <div key={p.title} className="bg-background/10 backdrop-blur-sm border border-warm-foreground/10 rounded-xl p-6 hover:bg-background/20 transition-colors">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-primary/20 rounded-lg shrink-0">
                  <p.icon className="w-6 h-6 text-accent" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-warm-foreground mb-2">{p.title}</h3>
                  <p className="text-warm-foreground/70 text-sm mb-3">{p.desc}</p>
                  <div className="space-y-2">
                    <div className="bg-secondary/20 rounded-lg p-3">
                      <p className="text-xs uppercase tracking-wide text-accent font-semibold mb-1">Possible Solution</p>
                      <p className="text-sm text-warm-foreground/80">{p.possible}</p>
                    </div>
                    <div className="bg-primary/10 rounded-lg p-3">
                      <p className="text-xs uppercase tracking-wide text-primary font-semibold mb-1">✅ Applicable Solution</p>
                      <p className="text-sm text-warm-foreground/90 font-medium">{p.applicable}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProblemsSection;
