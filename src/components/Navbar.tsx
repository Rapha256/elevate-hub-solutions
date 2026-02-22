import { useState } from "react";
import { Menu, X, LogIn, LayoutDashboard } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

const links = [
  { label: "About", href: "#about" },
  { label: "Challenges", href: "#problems" },
  { label: "Team", href: "#team" },
  { label: "Gallery", href: "#gallery" },
  { label: "Suggest", href: "#suggestions" },
  { label: "Contact", href: "#contact" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const { user, role } = useAuth();

  const dashboardLink = role === "admin" ? "/admin-dashboard" : "/student-dashboard";

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        <a href="#" className="font-bold text-xl text-foreground">
          <span className="text-primary">Era92</span> Elevate
        </a>
        <div className="hidden md:flex items-center gap-6">
          {links.map((l) => (
            <a key={l.label} href={l.href} className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
              {l.label}
            </a>
          ))}
          {user ? (
            <a href={dashboardLink} className="flex items-center gap-1 text-sm font-medium bg-primary text-primary-foreground px-3 py-1.5 rounded-lg hover:opacity-90">
              <LayoutDashboard className="w-4 h-4" /> Dashboard
            </a>
          ) : (
            <a href="/auth" className="flex items-center gap-1 text-sm font-medium bg-primary text-primary-foreground px-3 py-1.5 rounded-lg hover:opacity-90">
              <LogIn className="w-4 h-4" /> Sign In
            </a>
          )}
        </div>
        <button onClick={() => setOpen(!open)} className="md:hidden text-foreground">
          {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>
      {open && (
        <div className="md:hidden bg-background border-b border-border px-4 pb-4 space-y-2">
          {links.map((l) => (
            <a key={l.label} href={l.href} onClick={() => setOpen(false)} className="block py-2 text-sm font-medium text-muted-foreground hover:text-primary">
              {l.label}
            </a>
          ))}
          {user ? (
            <a href={dashboardLink} className="block py-2 text-sm font-medium text-primary">Dashboard</a>
          ) : (
            <a href="/auth" className="block py-2 text-sm font-medium text-primary">Sign In</a>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
