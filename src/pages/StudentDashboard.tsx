import { useState, useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { Lightbulb, Bell, Calendar, LogOut, Home, Send } from "lucide-react";

type Tab = "feed" | "my-ideas" | "announcements" | "events";

const StudentDashboard = () => {
  const { user, profile, signOut } = useAuth();
  const navigate = useNavigate();
  const [tab, setTab] = useState<Tab>("feed");
  const [ideas, setIdeas] = useState<any[]>([]);
  const [myIdeas, setMyIdeas] = useState<any[]>([]);
  const [announcements, setAnnouncements] = useState<any[]>([]);
  const [events, setEvents] = useState<any[]>([]);

  const [ideaTitle, setIdeaTitle] = useState("");
  const [ideaContent, setIdeaContent] = useState("");
  const [ideaSolution, setIdeaSolution] = useState("");

  const fetchAll = async () => {
    const [i, a, e] = await Promise.all([
      supabase.from("ideas").select("*, profiles(full_name)").order("created_at", { ascending: false }),
      supabase.from("announcements").select("*").order("created_at", { ascending: false }),
      supabase.from("events").select("*").order("event_date", { ascending: true }),
    ]);
    if (i.data) {
      setIdeas(i.data.filter((x: any) => x.status === "approved"));
      setMyIdeas(i.data.filter((x: any) => x.user_id === user?.id));
    }
    if (a.data) setAnnouncements(a.data);
    if (e.data) setEvents(e.data);
  };

  useEffect(() => { fetchAll(); }, [user]);

  const submitIdea = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!ideaContent.trim()) return;
    await supabase.from("ideas").insert({
      user_id: user!.id,
      title: ideaTitle.trim(),
      content: ideaContent.trim(),
      solution: ideaSolution.trim(),
    });
    setIdeaTitle(""); setIdeaContent(""); setIdeaSolution("");
    fetchAll();
  };

  const tabs: { key: Tab; label: string; icon: any }[] = [
    { key: "feed", label: "Ideas Feed", icon: Home },
    { key: "my-ideas", label: "My Ideas", icon: Lightbulb },
    { key: "announcements", label: "News", icon: Bell },
    { key: "events", label: "Events", icon: Calendar },
  ];

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-card border-b border-border px-4 py-3 flex items-center justify-between">
        <a href="/" className="font-bold text-xl"><span className="text-primary">Era92</span> Hub</a>
        <div className="flex items-center gap-4">
          <span className="text-sm text-muted-foreground hidden sm:inline">Hi, {profile?.full_name || "Student"}</span>
          <button onClick={() => { signOut(); navigate("/"); }} className="text-muted-foreground hover:text-destructive"><LogOut className="w-5 h-5" /></button>
        </div>
      </header>

      {/* Mobile tabs */}
      <div className="md:hidden flex border-b border-border bg-card overflow-x-auto">
        {tabs.map((t) => (
          <button key={t.key} onClick={() => setTab(t.key)}
            className={`flex-1 py-3 text-xs font-medium whitespace-nowrap px-2 ${tab === t.key ? "text-primary border-b-2 border-primary" : "text-muted-foreground"}`}>
            {t.label}
          </button>
        ))}
      </div>

      <div className="max-w-4xl mx-auto p-4 md:p-6">
        {/* Desktop tabs */}
        <div className="hidden md:flex gap-2 mb-6">
          {tabs.map((t) => (
            <button key={t.key} onClick={() => setTab(t.key)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${tab === t.key ? "bg-primary text-primary-foreground" : "bg-card text-muted-foreground hover:bg-muted"}`}>
              <t.icon className="w-4 h-4" /> {t.label}
            </button>
          ))}
        </div>

        {tab === "feed" && (
          <div>
            <h2 className="text-2xl font-bold text-foreground mb-4">Approved Ideas</h2>
            {ideas.length === 0 && <p className="text-muted-foreground text-center py-8">No approved ideas yet.</p>}
            <div className="space-y-3">
              {ideas.map((idea) => (
                <div key={idea.id} className="bg-card border border-border rounded-xl p-5">
                  <div className="flex items-center gap-2 mb-2">
                    <Lightbulb className="w-5 h-5 text-accent" />
                    <span className="font-semibold text-foreground">{idea.profiles?.full_name || "Anonymous"}</span>
                    <span className="text-xs text-muted-foreground ml-auto">{new Date(idea.created_at).toLocaleDateString()}</span>
                  </div>
                  {idea.title && <p className="font-medium text-foreground mb-1">{idea.title}</p>}
                  <p className="text-foreground">{idea.content}</p>
                  {idea.solution && (
                    <div className="bg-secondary/10 rounded-lg p-3 mt-2">
                      <p className="text-xs uppercase tracking-wide text-secondary font-semibold mb-1">💡 Solution</p>
                      <p className="text-sm text-muted-foreground">{idea.solution}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {tab === "my-ideas" && (
          <div>
            <h2 className="text-2xl font-bold text-foreground mb-4">Post an Idea</h2>
            <form onSubmit={submitIdea} className="bg-card border border-border rounded-xl p-4 mb-6 space-y-3">
              <input value={ideaTitle} onChange={(e) => setIdeaTitle(e.target.value)} placeholder="Title (optional)" maxLength={200}
                className="w-full px-4 py-2 rounded-lg bg-background border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary" />
              <textarea value={ideaContent} onChange={(e) => setIdeaContent(e.target.value)} placeholder="Describe the problem or idea..." rows={3} required maxLength={2000}
                className="w-full px-4 py-2 rounded-lg bg-background border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary resize-none" />
              <textarea value={ideaSolution} onChange={(e) => setIdeaSolution(e.target.value)} placeholder="Suggest a solution (optional)..." rows={2} maxLength={2000}
                className="w-full px-4 py-2 rounded-lg bg-background border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary resize-none" />
              <button type="submit" className="bg-primary text-primary-foreground px-4 py-2 rounded-lg font-medium flex items-center gap-2 hover:opacity-90">
                <Send className="w-4 h-4" /> Post Idea
              </button>
            </form>
            <h3 className="text-lg font-semibold text-foreground mb-3">Your Ideas</h3>
            <div className="space-y-3">
              {myIdeas.map((idea) => (
                <div key={idea.id} className="bg-card border border-border rounded-xl p-4">
                  <div className="flex items-center gap-2 mb-1">
                    <span className={`px-2 py-0.5 rounded text-xs font-medium ${
                      idea.status === "approved" ? "bg-secondary/20 text-secondary" :
                      idea.status === "rejected" ? "bg-destructive/20 text-destructive" :
                      "bg-accent/20 text-accent-foreground"
                    }`}>{idea.status}</span>
                  </div>
                  {idea.title && <p className="font-medium text-foreground">{idea.title}</p>}
                  <p className="text-sm text-foreground mt-1">{idea.content}</p>
                </div>
              ))}
              {myIdeas.length === 0 && <p className="text-muted-foreground text-center py-4">You haven't posted any ideas yet.</p>}
            </div>
          </div>
        )}

        {tab === "announcements" && (
          <div>
            <h2 className="text-2xl font-bold text-foreground mb-4">Announcements</h2>
            {announcements.length === 0 && <p className="text-muted-foreground text-center py-8">No announcements yet.</p>}
            <div className="space-y-3">
              {announcements.map((a) => (
                <div key={a.id} className="bg-card border border-border rounded-xl p-5">
                  <p className="font-semibold text-foreground text-lg">{a.title}</p>
                  <p className="text-muted-foreground mt-2">{a.content}</p>
                  <p className="text-xs text-muted-foreground mt-3">{new Date(a.created_at).toLocaleDateString()}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {tab === "events" && (
          <div>
            <h2 className="text-2xl font-bold text-foreground mb-4">Upcoming Events</h2>
            {events.length === 0 && <p className="text-muted-foreground text-center py-8">No events yet.</p>}
            <div className="space-y-3">
              {events.map((ev) => (
                <div key={ev.id} className="bg-card border border-border rounded-xl p-5">
                  <p className="font-semibold text-foreground text-lg">{ev.title}</p>
                  <p className="text-muted-foreground mt-1">{ev.description}</p>
                  <p className="text-primary font-medium text-sm mt-2">📅 {new Date(ev.event_date).toLocaleString()}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentDashboard;
