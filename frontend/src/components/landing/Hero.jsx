import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const slides = [
  {
    title: (
      <>
        Conduct Exams.
        <br /> Analyze Performance.
        <br />
        <span className="text-gray-300">All in One Place.</span>
      </>
    ),
    description:
      "ShikenX helps examiners create secure tests and candidates track their performance with clarity.",
    image: "/hero-image-1.png",
  },
  {
    title: (
      <>
        Create Secure Tests.
        <br /> Monitor Progress.
        <br />
        <span className="text-gray-300">Without Hassle.</span>
      </>
    ),
    description:
      "Advanced tools to design exams, prevent malpractice, and analyze results in real time.",
    image: "/hero-image-2.jpg",
  },
  {
    title: (
      <>
        Smarter Exams.
        <br /> Better Insights.
        <br />
        <span className="text-gray-300">Built for Growth.</span>
      </>
    ),
    description:
      "Make data-driven decisions with performance analytics and detailed reports.",
    image: "/hero-image-3.jpg",
  },
];

export default function Hero() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 6000); // auto slide every 6s

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Slides */}
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            index === current ? "opacity-100 z-10" : "opacity-0 z-0"
          }`}
        >
          {/* Background Image */}
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${slide.image})` }}
          />

          {/* Dark Overlay */}
          <div className="absolute inset-0 bg-black/60" />

          {/* Content */}
          <div className="relative z-20 max-w-7xl mx-auto h-full px-6 flex items-center">
            <div className="max-w-xl text-white animate-fadeIn">
              <h1 className="text-4xl md:text-5xl font-bold leading-tight">
                {slide.title}
              </h1>

              <p className="mt-6 text-lg text-gray-200">{slide.description}</p>

              <div className="mt-8 flex gap-4">
                <Link to="/signup">
                  <Button className="bg-white text-black hover:bg-gray-200">
                    Get Started
                  </Button>
                </Link>
                <Link to="/login">
                  <Button variant="outline" className="text-white border-white">
                    Login
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Pagination Dots */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3 z-30">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            className={`h-3 w-3 rounded-full transition-all duration-300 ${
              current === index
                ? "bg-white scale-125"
                : "bg-white/50 hover:bg-white"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
