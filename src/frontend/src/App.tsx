import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Toaster } from "@/components/ui/sonner";
import { Textarea } from "@/components/ui/textarea";
import { useActor } from "@/hooks/useActor";
import {
  BadgeCheck,
  Mail,
  MapPin,
  Menu,
  Package,
  Phone,
  Scissors,
  Shield,
  Star,
  Truck,
  X,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useRef, useState } from "react";
import { toast } from "sonner";

const products = [
  {
    id: 1,
    name: "Boys School Uniform",
    description:
      "Classic white shirt with navy blue trousers, school tie, and belt. Durable fabric suitable for daily wear across all seasons.",
    image: "/assets/generated/uniform-products.dim_600x400.jpg",
    tag: "Best Seller",
  },
  {
    id: 2,
    name: "Girls School Uniform",
    description:
      "White shirt with navy blue skirt or salwar-kameez sets. Available in multiple sizes, stitched for comfort and easy movement.",
    image: "/assets/generated/uniform-products.dim_600x400.jpg",
    tag: "Popular",
  },
  {
    id: 3,
    name: "Sports / PT Uniform",
    description:
      "Lightweight polyester tracksuit and PT shorts for physical education. Breathable, quick-dry material ideal for all weather.",
    image: "/assets/generated/sports-uniform.dim_600x400.jpg",
    tag: "New",
  },
  {
    id: 4,
    name: "Winter Wear",
    description:
      "Warm woolen sweaters, cardigans, and blazers with school insignia. Keeps students comfortable during cold months.",
    image: "/assets/generated/uniform-products.dim_600x400.jpg",
    tag: "Seasonal",
  },
];

const schools = [
  {
    id: 1,
    image: "/assets/generated/govt-school-1.dim_600x400.jpg",
  },
  {
    id: 2,
    image: "/assets/generated/govt-school-2.dim_600x400.jpg",
  },
  {
    id: 3,
    image: "/assets/generated/govt-school-3.dim_600x400.jpg",
  },
];

const features = [
  {
    icon: Truck,
    title: "Pan-India Delivery",
    desc: "We deliver to all 28 states and 8 union territories. Bulk orders dispatched within 7–10 working days.",
    color: "text-saffron",
  },
  {
    icon: Package,
    title: "Bulk Order Discounts",
    desc: "Special pricing for orders of 100+ uniforms. School and district-level procurement supported.",
    color: "text-india-green",
  },
  {
    icon: Shield,
    title: "ISI Quality Standards",
    desc: "All fabrics meet Bureau of Indian Standards (BIS) specifications. Colourfast, shrink-resistant, durable.",
    color: "text-navy",
  },
  {
    icon: Scissors,
    title: "Custom Embroidery",
    desc: "School name, logo, and class badges embroidered with precision. Minimum order applies.",
    color: "text-saffron",
  },
];

export default function App() {
  const { actor } = useActor();
  const [navOpen, setNavOpen] = useState(false);
  const [form, setForm] = useState({
    name: "",
    phone: "",
    school: "",
    city: "",
    state: "",
    message: "",
  });
  const [formState, setFormState] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const contactRef = useRef<HTMLDivElement>(null);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setNavOpen(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!actor) {
      toast.error("Service unavailable, please try again.");
      return;
    }
    setFormState("loading");
    try {
      await actor.submitInquiry(
        form.name,
        form.phone,
        form.school,
        form.city,
        form.state,
        form.message,
      );
      setFormState("success");
      toast.success("Inquiry submitted! We'll contact you within 24 hours.");
    } catch {
      setFormState("error");
      toast.error("Failed to submit. Please try again.");
    }
  };

  const navLinks = [
    { label: "Home", id: "home", ocid: "nav.home.link" },
    { label: "Products", id: "products", ocid: "nav.products.link" },
    { label: "Our Schools", id: "schools", ocid: "nav.schools.link" },
    { label: "Contact", id: "contact", ocid: "nav.contact.link" },
  ];

  return (
    <div className="min-h-screen bg-background font-body">
      <Toaster position="top-right" />

      {/* ─── HEADER ─── */}
      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur border-b border-border shadow-xs">
        <div className="tricolor-bar" />
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 bg-navy rounded-full flex items-center justify-center">
              <Star className="w-4 h-4 text-saffron fill-current" />
            </div>
            <div>
              <span className="font-display font-bold text-xl text-navy">
                Uniform<span className="text-saffron">India</span>
              </span>
              <p className="text-[10px] text-muted-foreground leading-none">
                Quality Uniforms Pan-India
              </p>
            </div>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <button
                type="button"
                key={link.id}
                data-ocid={link.ocid}
                onClick={() => scrollTo(link.id)}
                className="text-sm font-medium text-foreground hover:text-saffron transition-colors"
              >
                {link.label}
              </button>
            ))}
            <Button
              onClick={() => scrollTo("contact")}
              className="bg-saffron hover:bg-amber-500 text-white font-semibold text-sm px-5 py-2 rounded-full"
            >
              Get a Quote
            </Button>
          </nav>

          {/* Mobile hamburger */}
          <button
            type="button"
            className="md:hidden p-2"
            onClick={() => setNavOpen(!navOpen)}
          >
            {navOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile Nav Drawer */}
        <AnimatePresence>
          {navOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="md:hidden border-t border-border bg-background overflow-hidden"
            >
              <div className="container mx-auto px-4 py-4 flex flex-col gap-3">
                {navLinks.map((link) => (
                  <button
                    type="button"
                    key={link.id}
                    data-ocid={link.ocid}
                    onClick={() => scrollTo(link.id)}
                    className="text-left py-2 font-medium border-b border-border last:border-none hover:text-saffron transition-colors"
                  >
                    {link.label}
                  </button>
                ))}
                <Button
                  onClick={() => scrollTo("contact")}
                  className="bg-saffron hover:bg-amber-500 text-white font-semibold rounded-full mt-2"
                >
                  Get a Quote
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <main>
        {/* ─── HERO ─── */}
        <section id="home" className="relative overflow-hidden">
          <div className="relative h-[520px] md:h-[600px]">
            <img
              src="/assets/generated/hero-banner.dim_1200x500.jpg"
              alt="Indian school children in uniforms"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-navy/85 via-navy/60 to-transparent" />
            <div className="absolute inset-0 flex items-center">
              <div className="container mx-auto px-4">
                <motion.div
                  initial={{ opacity: 0, y: 32 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  className="max-w-xl"
                >
                  <div className="flex items-center gap-2 mb-4">
                    <div className="h-1 w-10 bg-saffron rounded" />
                    <span className="text-saffron font-semibold text-sm uppercase tracking-widest">
                      Pan-India Supplier
                    </span>
                  </div>
                  <h1 className="font-display text-4xl md:text-5xl font-bold text-white leading-tight mb-4">
                    Quality School Uniforms
                    <br />
                    <span className="text-saffron">for Every Indian Child</span>
                  </h1>
                  <p className="text-white/85 text-lg mb-8 leading-relaxed">
                    Serving government schools across all 28 states. Bulk
                    orders, custom embroidery, and ISI-certified fabrics — at
                    affordable prices.
                  </p>
                  <div className="flex flex-wrap gap-3">
                    <Button
                      data-ocid="hero.primary_button"
                      size="lg"
                      onClick={() => scrollTo("contact")}
                      className="bg-saffron hover:bg-amber-500 text-white font-bold text-base px-8 py-3 rounded-full shadow-lg"
                    >
                      Get a Free Quote
                    </Button>
                    <Button
                      size="lg"
                      variant="outline"
                      onClick={() => scrollTo("products")}
                      className="border-white text-white bg-white/10 hover:bg-white/20 font-semibold text-base px-8 py-3 rounded-full"
                    >
                      View Products
                    </Button>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>

          {/* Stats bar */}
          <div className="bg-navy">
            <div className="container mx-auto px-4 py-5 grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              {[
                ["28+", "States Served"],
                ["500+", "Schools Supplied"],
                ["10 Lakh+", "Uniforms Delivered"],
                ["15+ Years", "Industry Experience"],
              ].map(([num, label]) => (
                <div key={label}>
                  <p className="font-display text-2xl font-bold text-saffron">
                    {num}
                  </p>
                  <p className="text-white/70 text-xs mt-0.5">{label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── PRODUCTS ─── */}
        <section id="products" className="py-20 bg-secondary">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-14"
            >
              <span className="text-saffron font-semibold text-sm uppercase tracking-widest">
                Our Catalogue
              </span>
              <h2 className="font-display text-4xl font-bold text-navy mt-2 mb-4">
                School Uniform Range
              </h2>
              <p className="text-muted-foreground max-w-lg mx-auto">
                Complete uniform solutions for boys, girls, and all activities —
                crafted for durability and comfort.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {products.map((product, i) => (
                <motion.div
                  key={product.id}
                  data-ocid={`products.item.${i + 1}`}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                >
                  <Card className="overflow-hidden shadow-card hover:shadow-card-hover transition-shadow duration-300 group">
                    <div className="relative overflow-hidden h-48">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute top-3 left-3">
                        <Badge className="bg-saffron text-white font-semibold text-xs">
                          {product.tag}
                        </Badge>
                      </div>
                      <div className="absolute top-3 right-3">
                        <Badge
                          variant="secondary"
                          className="bg-india-green text-white font-semibold text-xs"
                        >
                          Affordable Price
                        </Badge>
                      </div>
                    </div>
                    <CardContent className="p-5">
                      <h3 className="font-display font-bold text-lg text-navy mb-2">
                        {product.name}
                      </h3>
                      <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                        {product.description}
                      </p>
                      <Button
                        data-ocid={`products.enquire_button.${i + 1}`}
                        onClick={() => scrollTo("contact")}
                        className="w-full bg-navy hover:bg-primary text-white font-semibold rounded-full transition-colors"
                      >
                        Enquire Now
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── GOVERNMENT SCHOOLS ─── */}
        <section id="schools" className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-14"
            >
              <span className="text-saffron font-semibold text-sm uppercase tracking-widest">
                Serving Schools Nationwide
              </span>
              <h2 className="font-display text-4xl font-bold text-navy mt-2 mb-4">
                All Government Schools of India
              </h2>
              <p className="text-muted-foreground max-w-xl mx-auto">
                We proudly supply uniforms to all government schools across
                India — from villages to cities, in every state and union
                territory.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {schools.map((school, i) => (
                <motion.div
                  key={school.id}
                  data-ocid={`schools.item.${i + 1}`}
                  initial={{ opacity: 0, scale: 0.96 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.12 }}
                  className="rounded-xl overflow-hidden shadow-card group cursor-default"
                >
                  <div className="relative h-56 overflow-hidden">
                    <img
                      src={school.image}
                      alt="Government School of India"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-navy/80 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-5">
                      <p className="text-white font-display font-semibold text-lg leading-tight">
                        All Government Schools of India
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Trust indicators */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="mt-12 bg-navy rounded-2xl px-8 py-7 flex flex-wrap justify-center gap-8 text-center"
            >
              {[
                ["CBSE Schools", "150+"],
                ["ICSE Schools", "80+"],
                ["State Board Schools", "270+"],
                ["KV & NVS Schools", "100+"],
              ].map(([label, count]) => (
                <div key={label}>
                  <p className="font-display text-3xl font-bold text-saffron">
                    {count}
                  </p>
                  <p className="text-white/70 text-sm mt-0.5">{label}</p>
                </div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ─── WHY CHOOSE US ─── */}
        <section className="py-20 bg-secondary">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-14"
            >
              <span className="text-saffron font-semibold text-sm uppercase tracking-widest">
                Why UniformIndia
              </span>
              <h2 className="font-display text-4xl font-bold text-navy mt-2 mb-4">
                What Sets Us Apart
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {features.map((feat, i) => (
                <motion.div
                  key={feat.title}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="bg-background rounded-2xl p-6 shadow-card hover:shadow-card-hover transition-shadow"
                >
                  <div className="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center mb-4">
                    <feat.icon className={`w-6 h-6 ${feat.color}`} />
                  </div>
                  <h3 className="font-display font-bold text-lg text-navy mb-2">
                    {feat.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {feat.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── CONTACT FORM ─── */}
        <section id="contact" className="py-20 bg-background" ref={contactRef}>
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-5 gap-12">
              {/* Left info */}
              <motion.div
                initial={{ opacity: 0, x: -24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="lg:col-span-2 flex flex-col justify-center"
              >
                <span className="text-saffron font-semibold text-sm uppercase tracking-widest mb-3">
                  Get In Touch
                </span>
                <h2 className="font-display text-4xl font-bold text-navy mb-4">
                  Request a Quote
                </h2>
                <p className="text-muted-foreground leading-relaxed mb-8">
                  Fill in your school details and our team will get back to you
                  within 24 hours with the best pricing for your requirements.
                </p>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 bg-navy/10 rounded-full flex items-center justify-center">
                      <Phone className="w-4 h-4 text-navy" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Call Us</p>
                      <p className="font-semibold text-navy">+91 98765 43210</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 bg-navy/10 rounded-full flex items-center justify-center">
                      <Mail className="w-4 h-4 text-navy" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Email Us</p>
                      <p className="font-semibold text-navy">
                        orders@uniformindia.in
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 bg-navy/10 rounded-full flex items-center justify-center">
                      <MapPin className="w-4 h-4 text-navy" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">
                        Head Office
                      </p>
                      <p className="font-semibold text-navy">
                        New Delhi, India
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Form */}
              <motion.div
                initial={{ opacity: 0, x: 24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="lg:col-span-3 bg-secondary rounded-2xl p-8 shadow-card"
              >
                <AnimatePresence mode="wait">
                  {formState === "success" ? (
                    <motion.div
                      key="success"
                      data-ocid="contact.success_state"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="flex flex-col items-center justify-center py-12 text-center"
                    >
                      <div className="w-16 h-16 bg-india-green/10 rounded-full flex items-center justify-center mb-4">
                        <BadgeCheck className="w-8 h-8 text-india-green" />
                      </div>
                      <h3 className="font-display text-2xl font-bold text-navy mb-2">
                        Inquiry Submitted!
                      </h3>
                      <p className="text-muted-foreground mb-6">
                        Our team will contact you within 24 hours with a quote
                        tailored to your school's needs.
                      </p>
                      <Button
                        onClick={() => setFormState("idle")}
                        className="bg-saffron hover:bg-amber-500 text-white font-semibold rounded-full"
                      >
                        Submit Another Inquiry
                      </Button>
                    </motion.div>
                  ) : (
                    <motion.form
                      key="form"
                      onSubmit={handleSubmit}
                      className="space-y-5"
                    >
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                          <Label
                            htmlFor="name"
                            className="font-medium text-navy"
                          >
                            Your Name *
                          </Label>
                          <Input
                            id="name"
                            data-ocid="contact.input"
                            placeholder="e.g. Ramesh Kumar"
                            value={form.name}
                            onChange={(e) =>
                              setForm((p) => ({ ...p, name: e.target.value }))
                            }
                            required
                            className="bg-background"
                          />
                        </div>
                        <div className="space-y-1.5">
                          <Label
                            htmlFor="phone"
                            className="font-medium text-navy"
                          >
                            Phone Number *
                          </Label>
                          <Input
                            id="phone"
                            data-ocid="contact.phone.input"
                            placeholder="+91 XXXXX XXXXX"
                            type="tel"
                            value={form.phone}
                            onChange={(e) =>
                              setForm((p) => ({ ...p, phone: e.target.value }))
                            }
                            required
                            className="bg-background"
                          />
                        </div>
                      </div>
                      <div className="space-y-1.5">
                        <Label
                          htmlFor="schoolName"
                          className="font-medium text-navy"
                        >
                          School Name *
                        </Label>
                        <Input
                          id="schoolName"
                          data-ocid="contact.school.input"
                          placeholder="e.g. Government Senior Secondary School, Sector 4"
                          value={form.school}
                          onChange={(e) =>
                            setForm((p) => ({ ...p, school: e.target.value }))
                          }
                          required
                          className="bg-background"
                        />
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                          <Label
                            htmlFor="city"
                            className="font-medium text-navy"
                          >
                            City *
                          </Label>
                          <Input
                            id="city"
                            data-ocid="contact.city.input"
                            placeholder="e.g. Jaipur"
                            value={form.city}
                            onChange={(e) =>
                              setForm((p) => ({ ...p, city: e.target.value }))
                            }
                            required
                            className="bg-background"
                          />
                        </div>
                        <div className="space-y-1.5">
                          <Label
                            htmlFor="state"
                            className="font-medium text-navy"
                          >
                            State *
                          </Label>
                          <Input
                            id="state"
                            placeholder="e.g. Rajasthan"
                            value={form.state}
                            onChange={(e) =>
                              setForm((p) => ({ ...p, state: e.target.value }))
                            }
                            required
                            className="bg-background"
                          />
                        </div>
                      </div>
                      <div className="space-y-1.5">
                        <Label
                          htmlFor="message"
                          className="font-medium text-navy"
                        >
                          Requirements / Message
                        </Label>
                        <Textarea
                          id="message"
                          data-ocid="contact.textarea"
                          placeholder="Describe your uniform requirements — quantity, type, sizes, custom logo, delivery timeline..."
                          rows={4}
                          value={form.message}
                          onChange={(e) =>
                            setForm((p) => ({ ...p, message: e.target.value }))
                          }
                          className="bg-background resize-none"
                        />
                      </div>

                      {formState === "error" && (
                        <div
                          data-ocid="contact.error_state"
                          className="bg-destructive/10 text-destructive text-sm px-4 py-3 rounded-lg"
                        >
                          Something went wrong. Please try again or call us
                          directly.
                        </div>
                      )}

                      <Button
                        type="submit"
                        data-ocid="contact.submit_button"
                        disabled={formState === "loading"}
                        className="w-full bg-navy hover:bg-primary text-white font-bold text-base py-3 rounded-full"
                      >
                        {formState === "loading" ? (
                          <span
                            data-ocid="contact.loading_state"
                            className="flex items-center gap-2"
                          >
                            <span className="animate-spin inline-block w-4 h-4 border-2 border-white/40 border-t-white rounded-full" />
                            Submitting...
                          </span>
                        ) : (
                          "Submit Inquiry"
                        )}
                      </Button>
                    </motion.form>
                  )}
                </AnimatePresence>
              </motion.div>
            </div>
          </div>
        </section>
      </main>

      {/* ─── FOOTER ─── */}
      <footer className="bg-navy text-white">
        <div className="tricolor-bar" />
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {/* Brand */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-9 h-9 bg-saffron rounded-full flex items-center justify-center">
                  <Star className="w-4 h-4 text-white fill-current" />
                </div>
                <span className="font-display font-bold text-xl">
                  Uniform<span className="text-saffron">India</span>
                </span>
              </div>
              <p className="text-white/65 text-sm leading-relaxed">
                India's trusted pan-national school uniform supplier. Serving
                students, schools, and districts with quality uniforms since
                2009.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-display font-semibold text-lg mb-4">
                Quick Links
              </h4>
              <ul className="space-y-2">
                {["Home", "Products", "Our Schools", "Contact"].map((link) => (
                  <li key={link}>
                    <button
                      type="button"
                      onClick={() =>
                        scrollTo(link.toLowerCase().replace(" ", ""))
                      }
                      className="text-white/65 hover:text-saffron text-sm transition-colors"
                    >
                      {link}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="font-display font-semibold text-lg mb-4">
                Contact Us
              </h4>
              <ul className="space-y-3 text-sm text-white/65">
                <li className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-saffron" /> +91 98765 43210
                </li>
                <li className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-saffron" />{" "}
                  orders@uniformindia.in
                </li>
                <li className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 text-saffron mt-0.5" /> 12, Uniform
                  Market, Karol Bagh,
                  <br />
                  New Delhi – 110005
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-white/15 mt-10 pt-6 flex flex-col md:flex-row items-center justify-between gap-3 text-white/50 text-xs">
            <p>
              © {new Date().getFullYear()} UniformIndia. All rights reserved.
            </p>
            <p>
              Built with ❤️ using{" "}
              <a
                href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(typeof window !== "undefined" ? window.location.hostname : "")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-saffron hover:underline"
              >
                caffeine.ai
              </a>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
