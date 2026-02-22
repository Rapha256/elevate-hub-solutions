import { useState } from "react";
import { Send, Lightbulb } from "lucide-react";

interface Suggestion {
  id: number;
  name: string;
  problem: string;
  solution: string;
  timestamp: string;
}

const SuggestionsSection = () => {
  const [suggestions, setSuggestions] = useState<Suggestion[]>([
    {
      id: 1,
      name: "Community Member",
      problem: "Students lack access to updated software licenses",
      solution: "Partner with tech companies for free educational licenses (e.g., Microsoft Imagine, GitHub Education)",
      timestamp: "Feb 20, 2026",
    },
  ]);
  const [name, setName] = useState("");
  const [problem, setProblem] = useState("");
  const [solution, setSolution] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!problem.trim()) return;
    setSuggestions([
      {
        id: Date.now(),
        name: name.trim() || "Anonymous",
        problem: problem.trim(),
        solution: solution.trim() || "Open for suggestions...",
        timestamp: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
      },
      ...suggestions,
    ]);
    setName("");
    setProblem("");
    setSolution("");
  };

  return (
    <section id="suggestions" className="py-20 px-4 bg-background">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <p className="text-primary uppercase tracking-widest text-sm font-semibold mb-3">Community Portal</p>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Share Your <span className="text-gradient">Ideas</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Feel free to post problems you've noticed and suggest solutions. Together we can make the hub better!
          </p>
        </div>
        <div className="grid md:grid-cols-2 gap-12">
          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-1">Your Name (optional)</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Anonymous"
                className="w-full px-4 py-3 rounded-lg bg-card border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-1">Problem / Idea *</label>
              <textarea
                value={problem}
                onChange={(e) => setProblem(e.target.value)}
                placeholder="Describe a problem or share an idea..."
                rows={3}
                required
                className="w-full px-4 py-3 rounded-lg bg-card border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary resize-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-1">Suggested Solution</label>
              <textarea
                value={solution}
                onChange={(e) => setSolution(e.target.value)}
                placeholder="Got a solution? Share it here..."
                rows={3}
                className="w-full px-4 py-3 rounded-lg bg-card border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary resize-none"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-primary text-primary-foreground px-6 py-3 rounded-lg font-semibold flex items-center justify-center gap-2 hover:opacity-90 transition-opacity"
            >
              <Send className="w-5 h-5" /> Post Your Idea
            </button>
          </form>
          {/* Posts */}
          <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2">
            {suggestions.map((s) => (
              <div key={s.id} className="bg-card border border-border rounded-xl p-5">
                <div className="flex items-center gap-2 mb-3">
                  <Lightbulb className="w-5 h-5 text-accent" />
                  <span className="font-semibold text-foreground">{s.name}</span>
                  <span className="text-xs text-muted-foreground ml-auto">{s.timestamp}</span>
                </div>
                <p className="text-foreground font-medium mb-2">{s.problem}</p>
                <div className="bg-secondary/10 rounded-lg p-3">
                  <p className="text-xs uppercase tracking-wide text-secondary font-semibold mb-1">💡 Solution</p>
                  <p className="text-sm text-muted-foreground">{s.solution}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SuggestionsSection;
