import hubSign from "@/assets/hub-sign.jpeg";
import hubClassroom from "@/assets/hub-classroom-3.jpeg";

const AboutSection = () => {
  return (
    <section id="about" className="py-20 px-4 bg-background">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <p className="text-primary uppercase tracking-widest text-sm font-semibold mb-3">About the Hub</p>
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Bridging the <span className="text-gradient">Digital Skills Gap</span>
            </h2>
            <p className="text-lg text-muted-foreground mb-4">
              Katanga Era 92 Innovation Creative Hub is a community-based center located in Katanga, Kampala, 
              dedicated to enhancing students' computer skills. We offer training in <strong>web design</strong>, 
              <strong> graphics design</strong>, <strong>AI essentials</strong>, and various short computer courses.
            </p>
            <p className="text-lg text-muted-foreground mb-6">
              Our mission is to bridge the digital skills gap for students in underserved areas by providing 
              accessible training and resources — creating pathways to <strong>100,000 jobs</strong> for Ugandan youth.
            </p>
            <div className="grid grid-cols-3 gap-4">
              {[
                { num: "100K", label: "Jobs Target" },
                { num: "2", label: "Hub Locations" },
                { num: "4+", label: "Courses" },
              ].map((stat) => (
                <div key={stat.label} className="text-center p-4 bg-card rounded-lg">
                  <p className="text-3xl font-bold text-primary">{stat.num}</p>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <img src={hubSign} alt="Era92 Hub sign" className="rounded-2xl object-cover w-full h-64 col-span-2" />
            <img src={hubClassroom} alt="Students learning at the hub" className="rounded-2xl object-cover w-full h-48 col-span-2" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
