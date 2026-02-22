import img1 from "@/assets/hub-classroom-1.jpeg";
import img2 from "@/assets/hub-trainer-2.jpeg";
import img3 from "@/assets/hub-outdoor-1.jpeg";
import img4 from "@/assets/hub-classroom-2.jpeg";
import img5 from "@/assets/hub-classroom-4.jpeg";
import img6 from "@/assets/hub-outdoor-2.jpeg";

const images = [
  { src: img1, alt: "Students learning in classroom" },
  { src: img2, alt: "Trainer presenting" },
  { src: img3, alt: "Outdoor discussion at the hub" },
  { src: img4, alt: "Students at computers" },
  { src: img5, alt: "Group learning session" },
  { src: img6, alt: "Community gathering" },
];

const GallerySection = () => {
  return (
    <section id="gallery" className="py-20 px-4 bg-card">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <p className="text-primary uppercase tracking-widest text-sm font-semibold mb-3">Gallery</p>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground">Life at the Hub</h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {images.map((img, i) => (
            <div key={i} className={`overflow-hidden rounded-xl ${i === 0 ? 'md:col-span-2 md:row-span-2' : ''}`}>
              <img
                src={img.src}
                alt={img.alt}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                style={{ minHeight: i === 0 ? '400px' : '200px' }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default GallerySection;
