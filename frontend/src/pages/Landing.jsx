import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import LandingNavbar from "@/components/landing/LandingNavbar";
import Hero from "@/components/landing/Hero";
export default function Landing() {
  return (
    <div className="min-h-screen bg-white text-gray-900">
      <LandingNavbar
      />

      {/* HERO */}
    <Hero></Hero>

      {/* FEATURES */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-semibold text-center mb-12">
            Why ShikenX?
          </h2>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                title: "Secure Exams",
                desc: "Role-based access, protected attempts, fair evaluation.",
              },
              {
                title: "Smart Analytics",
                desc: "Instant results and performance insights.",
              },
              {
                title: "Easy Test Creation",
                desc: "Create, schedule, and manage exams effortlessly.",
              },
            ].map((f) => (
              <Card
                key={f.title}
                className="shadow-sm hover:shadow-md transition"
              >
                <CardHeader>
                  <CardTitle>{f.title}</CardTitle>
                </CardHeader>
                <CardContent className="text-gray-600">{f.desc}</CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="py-20 max-w-7xl mx-auto px-6">
        <h2 className="text-3xl font-semibold text-center mb-12">
          How It Works
        </h2>

        <div className="grid md:grid-cols-3 gap-8 text-center">
          <div>
            <h3 className="font-medium text-lg">1. Create Test</h3>
            <p className="text-gray-600 mt-2">
              Examiner creates and schedules exams.
            </p>
          </div>
          <div>
            <h3 className="font-medium text-lg">2. Attempt Exam</h3>
            <p className="text-gray-600 mt-2">
              Candidates attempt tests securely.
            </p>
          </div>
          <div>
            <h3 className="font-medium text-lg">3. View Results</h3>
            <p className="text-gray-600 mt-2">Instant scoring and analytics.</p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-black text-white py-20 text-center">
        <h2 className="text-3xl font-semibold">Ready to get started?</h2>
        <p className="mt-4 text-gray-300">Build smarter exams with ShikenX.</p>
        <Link to="/signup">
          <Button className="mt-6 bg-white text-black hover:bg-gray-200">
            Create Account
          </Button>
        </Link>
      </section>

      {/* FOOTER */}
      <footer className="py-6 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} ShikenX. All rights reserved.
      </footer>
    </div>
  );
}
