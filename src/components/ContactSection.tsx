import { Mail, Phone, MapPin } from "lucide-react";

const ContactSection = () => {
  return (
    <section id="contact" className="py-20 px-4 gradient-warm">
      <div className="max-w-4xl mx-auto text-center">
        <p className="text-accent uppercase tracking-widest text-sm font-semibold mb-3">Get In Touch</p>
        <h2 className="text-4xl md:text-5xl font-bold text-warm-foreground mb-6">Contact Us</h2>
        <p className="text-lg text-warm-foreground/70 mb-4">
          Website created by <strong className="text-warm-foreground">Eng. Rapha Adamz</strong>
        </p>
        <p className="text-warm-foreground/60 text-sm mb-12">
          Era92 Elevate Hub — <a href="mailto:info@era92.com" className="underline text-accent">info@era92.com</a> | <a href="tel:+256784239786" className="underline text-accent">+256 784 239 786</a>
        </p>
        <div className="grid sm:grid-cols-3 gap-6 mb-12">
          <a href="mailto:ntegearapha17@gmail.com" className="bg-background/10 border border-warm-foreground/10 rounded-xl p-6 hover:bg-background/20 transition-colors">
            <Mail className="w-8 h-8 text-accent mx-auto mb-3" />
            <p className="text-warm-foreground font-medium text-sm">ntegearapha17@gmail.com</p>
          </a>
          <a href="tel:+966501858627" className="bg-background/10 border border-warm-foreground/10 rounded-xl p-6 hover:bg-background/20 transition-colors">
            <Phone className="w-8 h-8 text-accent mx-auto mb-3" />
            <p className="text-warm-foreground font-medium text-sm">+966 501 858 627</p>
            <p className="text-warm-foreground/60 text-xs mt-1">+256 703 539 749</p>
          </a>
          <div className="bg-background/10 border border-warm-foreground/10 rounded-xl p-6">
            <MapPin className="w-8 h-8 text-accent mx-auto mb-3" />
            <p className="text-warm-foreground font-medium text-sm">Katanga Lungujja &amp; Jinja</p>
            <p className="text-warm-foreground/60 text-xs mt-1">Kampala, Uganda</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
