import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import LandingNavbar from "@/components/landing/LandingNavbar";
import Hero from "@/components/landing/Hero";

const scrollToSection = (id) => {
  const target = document.getElementById(id);
  if (!target) return;

  const start = window.pageYOffset;
  const end = target.getBoundingClientRect().top + start;
  const duration = 1400; // 🔥 increase = slower scroll

  let startTime = null;

  const easeInOutCubic = (t) =>
    t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

  const animateScroll = (currentTime) => {
    if (!startTime) startTime = currentTime;
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const easedProgress = easeInOutCubic(progress);
    window.scrollTo(0, start + (end - start) * easedProgress);
    if (elapsed < duration) {
      requestAnimationFrame(animateScroll);
    }
  };
  requestAnimationFrame(animateScroll);
};

export default function Landing() {
  return (
    <div className="min-h-screen bg-white text-gray-900">
      <LandingNavbar scrollToSection={scrollToSection} />

      {/* HERO */}
      <Hero ></Hero>

      {/* FEATURES */}
      <section
        id="features"
        className="min-h-screen flex items-center bg-gray-50"
      >
        <div className="max-w-7xl mx-auto px-6 w-full">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-semibold text-gray-900">
              Why ShikenX?
            </h2>
            <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
              A modern examination platform designed for reliability, clarity,
              and academic integrity.
            </p>
          </div>

          {/* Feature Cards */}
          <div className="grid md:grid-cols-3 gap-10">
            {[
              {
                title: "Secure Examinations",
                desc: "Role-based access control, protected attempts, and fair evaluation mechanisms to ensure exam integrity.",
              },
              {
                title: "Smart Performance Analytics",
                desc: "Instant results with structured insights that help examiners and candidates understand performance clearly.",
              },
              {
                title: "Effortless Test Management",
                desc: "Create, schedule, and manage examinations seamlessly with a clean and intuitive workflow.",
              },
            ].map((f) => (
              <Card
                key={f.title}
                className="
            h-full
            border-none
            shadow-lg
            hover:shadow-xl
            transition-all duration-300
            hover:-translate-y-1
            rounded-xl
          "
              >
                <CardHeader className="pb-2">
                  <CardTitle className="text-2xl font-semibold text-gray-900">
                    {f.title}
                  </CardTitle>
                </CardHeader>

                <CardContent className="text-gray-600 text-lg leading-relaxed">
                  {f.desc}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section
        id="how-it-works"
        className="min-h-screen flex items-center bg-white"
      >
        <div className="max-w-7xl mx-auto px-6 w-full">
          {/* Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-semibold text-gray-900">
              How It Works
            </h2>
            <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
              A simple and structured examination workflow designed for clarity,
              control, and accuracy.
            </p>
          </div>

          {/* Steps */}
          <div className="grid md:grid-cols-3 gap-10">
            {[
              {
                step: "01",
                title: "Create & Schedule Exams",
                desc: "Examiners design question papers, configure rules, and schedule examinations with full control.",
              },
              {
                step: "02",
                title: "Secure Exam Attempt",
                desc: "Candidates attempt exams in a monitored and distraction-free environment with defined time limits.",
              },
              {
                step: "03",
                title: "Evaluate & Analyze Results",
                desc: "Instant scoring, structured reports, and performance analytics for informed decision-making.",
              },
            ].map((item) => (
              <div
                key={item.step}
                className="
            relative
            rounded-xl
            p-10
            shadow-lg
            hover:shadow-xl
            transition-all duration-300
            hover:-translate-y-1
          "
              >
                {/* Step Number */}
                <span
                  className="
            absolute -top-5 left-8
            text-sm font-semibold
            px-4 py-1
            rounded-full
            bg-gradient-to-r from-indigo-500 to-purple-500
            text-white
            shadow-md
          "
                >
                  Step {item.step}
                </span>

                {/* Content */}
                <h3 className="mt-6 text-2xl font-semibold text-gray-900">
                  {item.title}
                </h3>

                <p className="mt-4 text-gray-600 text-lg leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      {/* CTA */}
      <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden bg-black text-white">
        {/* Ambient gradient */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(99,102,241,0.25),_transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,_rgba(168,85,247,0.25),_transparent_60%)]" />

        <div className="relative z-10 max-w-3xl mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-semibold leading-tight">
            Ready to Get Started?
          </h2>

          <p className="mt-6 text-lg text-gray-300">
            Build secure, structured, and scalable examinations with ShikenX.
          </p>

          <Link to="/signup">
            <Button
              className="
          mt-10
          px-10 py-6
          text-lg
          bg-gradient-to-r from-blue-500 to-pink-400
          text-white
          shadow-lg shadow-indigo-500/40
          hover:shadow-xl hover:shadow-pink-500/50
          hover:-translate-y-1
          transition-all duration-300
        "
            >
              Create Your Account
            </Button>
          </Link>
        </div>
      </section>

      {/* FOOTER */}
      {/* FOOTER */}
      <footer className="bg-white">
        <div className="max-w-7xl mx-auto px-6 py-8 border-t border-gray-200 text-center">
          <p className="text-sm text-gray-500">
            © {new Date().getFullYear()} ShikenX. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
