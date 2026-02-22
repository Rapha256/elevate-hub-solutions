import { useState, useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { Users, Lightbulb, Bell, Calendar, LogOut, Home, Clock, CheckCircle, XCircle, Trash2, Plus, Edit } from "lucide-react";

type Tab = "overview" | "users" | "ideas" | "announcements" | "events";

const AdminDashboard = () => {
  const { user, profile, signOut } = useAuth();
  const navigate = useNavigate();
  const [tab, setTab] = useState<Tab>("overview");
  const [users, setUsers] = useState<any[]>([]);
  const [ideas, setIdeas] = useState<any[]>([]);
  const [announcements, setAnnouncements] = useState<any[]>([]);
  const [events, setEvents] = useState<any[]>([]);

  // Form states
  const [annTitle, setAnnTitle] = useState("");
  const [annContent, setAnnContent] = useState("");
  const [evtTitle, setEvtTitle] = useState("");
  const [evtDesc, setEvtDesc] = useState("");
  const [evtDate, setEvtDate] = useState("");

  const fetchAll = async () => {
    const [u, i, a, e] = await Promise.all([
      supabase.from("profiles").select("*, user_roles(role)"),
      supabase.from("ideas").select("*, profiles(full_name)").order("created_at", { ascending: false }),
      supabase.from("announcements").select("*").order("created_at", { ascending: false }),
      supabase.from("events").select("*").order("event_date", { ascending: true }),
    ]);
    if (u.data) setUsers(u.data);
    if (i.data) setIdeas(i.data);
    if (a.data) setAnnouncements(a.data);
    if (e.data) setEvents(e.data);
  };

  useEffect(() => { fetchAll(); }, []);

  const updateIdeaStatus = async (id: string, status: "pending" | "approved" | "rejected") => {
    await supabase.from("ideas").update({ status }).eq("id", id);
    fetchAll();
  };

  const deleteIdea = async (id: string) => {
    await supabase.from("ideas").delete().eq("id", id);
    fetchAll();
  };

  const addAnnouncement = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!annTitle.trim() || !annContent.trim()) return;
    await supabase.from("announcements").insert({ title: annTitle.trim(), content: annContent.trim(), created_by: user!.id });
    setAnnTitle(""); setAnnContent("");
    fetchAll();
  };

  const deleteAnnouncement = async (id: string) => {
    await supabase.from("announcements").delete().eq("id", id);
    fetchAll();
  };

  const addEvent = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!evtTitle.trim() || !evtDate) return;
    await supabase.from("events").insert({ title: evtTitle.trim(), description: evtDesc.trim(), event_date: evtDate, created_by: user!.id });
    setEvtTitle(""); setEvtDesc(""); setEvtDate("");
    fetchAll();
  };

  const deleteEvent = async (id: string) => {
    await supabase.from("events").delete().eq("id", id);
    fetchAll();
  };

  const deleteUser = async (userId: string) => {
    // Can't delete from auth directly, but remove profile & roles
    await supabase.from("profiles").delete().eq("id", userId);
    fetchAll();
  };

  const stats = {
    totalUsers: users.length,
    totalIdeas: ideas.length,
    pendingIdeas: ideas.filter((i) => i.status === "pending").length,
  };

  const tabs: { key: Tab; label: string; icon: any }[] = [
    { key: "overview", label: "Overview", icon: Home },
    { key: "users", label: "Users", icon: Users },
    { key: "ideas", label: "Ideas", icon: Lightbulb },
    { key: "announcements", label: "Announcements", icon: Bell },
    { key: "events", label: "Events", icon: Calendar },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Top bar */}
      <header className="bg-card border-b border-border px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <a href="/" className="font-bold text-xl"><span className="text-primary">Era92</span> Admin</a>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-sm text-muted-foreground hidden sm:inline">Welcome, {profile?.full_name || "Admin"}</span>
          <button onClick={() => { signOut(); navigate("/"); }} className="text-muted-foreground hover:text-destructive transition-colors">
            <LogOut className="w-5 h-5" />
          </button>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className="w-56 min-h-[calc(100vh-53px)] bg-card border-r border-border p-4 hidden md:block">
          <nav className="space-y-1">
            {tabs.map((t) => (
              <button
                key={t.key}
                onClick={() => setTab(t.key)}
                className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${tab === t.key ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-muted"}`}
              >
                <t.icon className="w-4 h-4" /> {t.label}
              </button>
            ))}
          </nav>
        </aside>

        {/* Mobile tabs */}
        <div className="md:hidden fixed bottom-0 left-0 right-0 bg-card border-t border-border flex z-50">
          {tabs.map((t) => (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              className={`flex-1 flex flex-col items-center py-2 text-xs ${tab === t.key ? "text-primary" : "text-muted-foreground"}`}
            >
              <t.icon className="w-5 h-5" /> {t.label}
            </button>
          ))}
        </div>

        {/* Main content */}
        <main className="flex-1 p-4 md:p-6 pb-20 md:pb-6">
          {tab === "overview" && (
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-6">Dashboard Overview</h2>
              <div className="grid sm:grid-cols-3 gap-4 mb-8">
                <div className="bg-card border border-border rounded-xl p-5">
                  <Users className="w-8 h-8 text-primary mb-2" />
                  <p className="text-3xl font-bold text-foreground">{stats.totalUsers}</p>
                  <p className="text-sm text-muted-foreground">Total Users</p>
                </div>
                <div className="bg-card border border-border rounded-xl p-5">
                  <Lightbulb className="w-8 h-8 text-accent mb-2" />
                  <p className="text-3xl font-bold text-foreground">{stats.totalIdeas}</p>
                  <p className="text-sm text-muted-foreground">Total Ideas</p>
                </div>
                <div className="bg-card border border-border rounded-xl p-5">
                  <Clock className="w-8 h-8 text-secondary mb-2" />
                  <p className="text-3xl font-bold text-foreground">{stats.pendingIdeas}</p>
                  <p className="text-sm text-muted-foreground">Pending Ideas</p>
                </div>
              </div>
            </div>
          )}

          {tab === "users" && (
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-4">Manage Users</h2>
              <div className="bg-card border border-border rounded-xl overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead className="bg-muted">
                      <tr>
                        <th className="text-left px-4 py-3 font-medium text-muted-foreground">Name</th>
                        <th className="text-left px-4 py-3 font-medium text-muted-foreground">Email</th>
                        <th className="text-left px-4 py-3 font-medium text-muted-foreground">Role</th>
                        <th className="text-left px-4 py-3 font-medium text-muted-foreground">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {users.map((u) => (
                        <tr key={u.id} className="border-t border-border">
                          <td className="px-4 py-3 text-foreground">{u.full_name || "—"}</td>
                          <td className="px-4 py-3 text-muted-foreground">{u.email}</td>
                          <td className="px-4 py-3">
                            <span className={`px-2 py-0.5 rounded text-xs font-medium ${u.user_roles?.[0]?.role === "admin" ? "bg-primary/20 text-primary" : "bg-secondary/20 text-secondary"}`}>
                              {u.user_roles?.[0]?.role || "student"}
                            </span>
                          </td>
                          <td className="px-4 py-3">
                            {u.id !== user?.id && (
                              <button onClick={() => deleteUser(u.id)} className="text-destructive hover:underline text-xs">
                                Delete
                              </button>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {tab === "ideas" && (
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-4">Manage Ideas</h2>
              <div className="space-y-3">
                {ideas.map((idea) => (
                  <div key={idea.id} className="bg-card border border-border rounded-xl p-4">
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className={`px-2 py-0.5 rounded text-xs font-medium ${
                            idea.status === "approved" ? "bg-secondary/20 text-secondary" :
                            idea.status === "rejected" ? "bg-destructive/20 text-destructive" :
                            "bg-accent/20 text-accent-foreground"
                          }`}>{idea.status}</span>
                          <span className="text-xs text-muted-foreground">by {idea.profiles?.full_name || "Unknown"}</span>
                        </div>
                        {idea.title && <p className="font-semibold text-foreground">{idea.title}</p>}
                        <p className="text-sm text-foreground mt-1">{idea.content}</p>
                        {idea.solution && <p className="text-sm text-muted-foreground mt-1">💡 {idea.solution}</p>}
                      </div>
                      <div className="flex gap-1 shrink-0">
                        {idea.status !== "approved" && (
                          <button onClick={() => updateIdeaStatus(idea.id, "approved")} className="p-1.5 rounded hover:bg-secondary/20 text-secondary" title="Approve">
                            <CheckCircle className="w-4 h-4" />
                          </button>
                        )}
                        {idea.status !== "rejected" && (
                          <button onClick={() => updateIdeaStatus(idea.id, "rejected")} className="p-1.5 rounded hover:bg-destructive/20 text-destructive" title="Reject">
                            <XCircle className="w-4 h-4" />
                          </button>
                        )}
                        <button onClick={() => deleteIdea(idea.id)} className="p-1.5 rounded hover:bg-destructive/20 text-destructive" title="Delete">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
                {ideas.length === 0 && <p className="text-muted-foreground text-center py-8">No ideas yet.</p>}
              </div>
            </div>
          )}

          {tab === "announcements" && (
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-4">Announcements</h2>
              <form onSubmit={addAnnouncement} className="bg-card border border-border rounded-xl p-4 mb-6 space-y-3">
                <input value={annTitle} onChange={(e) => setAnnTitle(e.target.value)} placeholder="Announcement title..." maxLength={200}
                  className="w-full px-4 py-2 rounded-lg bg-background border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary" />
                <textarea value={annContent} onChange={(e) => setAnnContent(e.target.value)} placeholder="Content..." rows={3} maxLength={2000}
                  className="w-full px-4 py-2 rounded-lg bg-background border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary resize-none" />
                <button type="submit" className="bg-primary text-primary-foreground px-4 py-2 rounded-lg font-medium flex items-center gap-2 hover:opacity-90">
                  <Plus className="w-4 h-4" /> Post Announcement
                </button>
              </form>
              <div className="space-y-3">
                {announcements.map((a) => (
                  <div key={a.id} className="bg-card border border-border rounded-xl p-4 flex justify-between items-start gap-2">
                    <div>
                      <p className="font-semibold text-foreground">{a.title}</p>
                      <p className="text-sm text-muted-foreground mt-1">{a.content}</p>
                      <p className="text-xs text-muted-foreground mt-2">{new Date(a.created_at).toLocaleDateString()}</p>
                    </div>
                    <button onClick={() => deleteAnnouncement(a.id)} className="text-destructive hover:bg-destructive/20 p-1.5 rounded">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {tab === "events" && (
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-4">Events</h2>
              <form onSubmit={addEvent} className="bg-card border border-border rounded-xl p-4 mb-6 space-y-3">
                <input value={evtTitle} onChange={(e) => setEvtTitle(e.target.value)} placeholder="Event title..." maxLength={200}
                  className="w-full px-4 py-2 rounded-lg bg-background border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary" />
                <textarea value={evtDesc} onChange={(e) => setEvtDesc(e.target.value)} placeholder="Description..." rows={2} maxLength={1000}
                  className="w-full px-4 py-2 rounded-lg bg-background border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary resize-none" />
                <input type="datetime-local" value={evtDate} onChange={(e) => setEvtDate(e.target.value)}
                  className="w-full px-4 py-2 rounded-lg bg-background border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-primary" />
                <button type="submit" className="bg-primary text-primary-foreground px-4 py-2 rounded-lg font-medium flex items-center gap-2 hover:opacity-90">
                  <Plus className="w-4 h-4" /> Add Event
                </button>
              </form>
              <div className="space-y-3">
                {events.map((ev) => (
                  <div key={ev.id} className="bg-card border border-border rounded-xl p-4 flex justify-between items-start gap-2">
                    <div>
                      <p className="font-semibold text-foreground">{ev.title}</p>
                      <p className="text-sm text-muted-foreground mt-1">{ev.description}</p>
                      <p className="text-xs text-primary font-medium mt-2">📅 {new Date(ev.event_date).toLocaleString()}</p>
                    </div>
                    <button onClick={() => deleteEvent(ev.id)} className="text-destructive hover:bg-destructive/20 p-1.5 rounded">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
