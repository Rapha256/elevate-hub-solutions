import { useState, useEffect } from "react";
import { Send, Lightbulb } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";

const SuggestionsSection = () => {
  const { user } = useAuth();
  const [ideas, setIdeas] = useState<any[]>([]);
  const [content, setContent] = useState("");
  const [solution, setSolution] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchIdeas = async () => {
    const { data } = await supabase
      .from("ideas")
      .select("*, profiles(full_name)")
      .eq("status", "approved")
      .order("created_at", { ascending: false })
      .limit(10);
    if (data) setIdeas(data);
  };

  useEffect(() => { fetchIdeas(); }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim() || !user) return;
    setLoading(true);
    await supabase.from("ideas").insert({
      user_id: user.id,
      content: content.trim(),
      solution: solution.trim(),
    });
    setContent("");
    setSolution("");
    setLoading(false);
    fetchIdeas();
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
            Post problems and suggest solutions. Together we can make the hub better!
            {!user && <span className="block mt-2 text-primary font-medium"><a href="/auth">Sign in</a> to post your ideas.</span>}
          </p>
        </div>
        <div className="grid md:grid-cols-2 gap-12">
          {user ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">Problem / Idea *</label>
                <textarea value={content} onChange={(e) => setContent(e.target.value)} placeholder="Describe a problem or share an idea..." rows={3} required maxLength={2000}
                  className="w-full px-4 py-3 rounded-lg bg-card border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary resize-none" />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">Suggested Solution</label>
                <textarea value={solution} onChange={(e) => setSolution(e.target.value)} placeholder="Got a solution? Share it here..." rows={3} maxLength={2000}
                  className="w-full px-4 py-3 rounded-lg bg-card border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary resize-none" />
              </div>
              <button type="submit" disabled={loading}
                className="w-full bg-primary text-primary-foreground px-6 py-3 rounded-lg font-semibold flex items-center justify-center gap-2 hover:opacity-90 transition-opacity disabled:opacity-50">
                <Send className="w-5 h-5" /> {loading ? "Posting..." : "Post Your Idea"}
              </button>
              <p className="text-xs text-muted-foreground text-center">Your idea will be reviewed before appearing publicly.</p>
            </form>
          ) : (
            <div className="flex items-center justify-center bg-card border border-border rounded-xl p-8">
              <div className="text-center">
                <Lightbulb className="w-12 h-12 text-accent mx-auto mb-4" />
                <p className="text-foreground font-medium mb-2">Want to share an idea?</p>
                <a href="/auth" className="bg-primary text-primary-foreground px-6 py-2 rounded-lg font-medium inline-block hover:opacity-90">Sign In / Sign Up</a>
              </div>
            </div>
          )}
          <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2">
            {ideas.map((s) => (
              <div key={s.id} className="bg-card border border-border rounded-xl p-5">
                <div className="flex items-center gap-2 mb-3">
                  <Lightbulb className="w-5 h-5 text-accent" />
                  <span className="font-semibold text-foreground">{s.profiles?.full_name || "Anonymous"}</span>
                  <span className="text-xs text-muted-foreground ml-auto">{new Date(s.created_at).toLocaleDateString()}</span>
                </div>
                <p className="text-foreground font-medium mb-2">{s.content}</p>
                {s.solution && (
                  <div className="bg-secondary/10 rounded-lg p-3">
                    <p className="text-xs uppercase tracking-wide text-secondary font-semibold mb-1">💡 Solution</p>
                    <p className="text-sm text-muted-foreground">{s.solution}</p>
                  </div>
                )}
              </div>
            ))}
            {ideas.length === 0 && <p className="text-muted-foreground text-center py-8">No approved ideas yet. Be the first to share!</p>}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SuggestionsSection;
