import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export default function Hero() {
  return (
    <section id="hero" className="relative min-h-[90vh] flex items-center overflow-hidden bg-white">
      {/* Ambient background blobs */}
      <div className="absolute -top-40 -left-40 h-[500px] w-[500px] rounded-full bg-indigo-500/10 blur-3xl" />
      <div className="absolute top-1/3 -right-40 h-[500px] w-[500px] rounded-full bg-purple-500/10 blur-3xl" />

      <div className="relative max-w-4xl mx-auto px-6 text-center">
        {/* Platform Name */}
        <p className="text-sm font-medium tracking-wide text-gray-500">
          ShikenX Examination Platform
        </p>

        {/* Headline */}
        <h1 className="mt-4 text-4xl md:text-5xl font-semibold text-gray-900 leading-tight">
          Create, Conduct, and Evaluate
          <br />
          <span className="relative inline-block bg-gradient-to-r from-indigo-500 to-purple-500 bg-clip-text text-transparent">
            Online Examinations
            <span className="absolute left-0 -bottom-2 h-[3px] w-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full opacity-80" />
          </span>
        </h1>

        {/* Subheading */}
        <p className="mt-8 text-lg text-gray-600 max-w-2xl mx-auto">
          A secure and structured examination system that helps examiners manage
          assessments efficiently and enables candidates to attempt exams with
          clarity, discipline, and confidence.
        </p>

        {/* Divider */}
        <div className="mt-10 h-px w-40 bg-gradient-to-r from-transparent via-gray-300 to-transparent mx-auto" />

        {/* CTAs */}
        <div className="mt-10 flex justify-center gap-4">
          {/* Primary CTA */}
          <Link to="/signup">
            <Button className="
              px-8 py-6
              text-white
              bg-gradient-to-r from-blue-400 to-pink-400
              shadow-lg shadow-indigo-500/30
              hover:shadow-xl hover:shadow-indigo-500/40
              hover:-translate-y-0.5
              transition-all duration-300
            ">
              Start Examination
            </Button>
          </Link>

          {/* Secondary CTA */}
          <Link to="/login">
            <Button
              variant="outline"
              className="
                px-8 py-6
                border-gray-300
                text-gray-700
                hover:border-indigo-400
                hover:text-indigo-600
                hover:-translate-y-0.5
                transition-all duration-300
              "
            >
              Candidate Login
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
