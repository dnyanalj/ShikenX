import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export default function LandingNavbar() {
  return (
    <nav className="sticky top-0 z-50 border-b border-gray-200 bg-linear-to-r from-[rgb(229,137,175)] to-[#94BBE9] shadow-lg">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* LEFT — LOGO */}
        <div className="flex items-center gap-2">
          <img src="/ShikenXbgr.png" alt="ShikenX" className="h-13 w-auto drop-shadow-xl"  />
        </div>

        {/* RIGHT — ACTIONS */}
        <div className="flex items-center gap-6">
          <a
            href="#features"
            className="text-xl  font-semibold text-gray-700 hover:text-black transition"
          >
            Features
          </a>

          <a
            href="#how-it-works"
            className="text-xl font-semibold text-gray-700 hover:text-black transition"
          >
            How it works
          </a>

          <Link
            to="/login"
            className="text-xl  font-semibold text-gray-700 hover:text-black transition"
          >
            Login
          </Link>

          <Link to="/signup">
            <Button className="bg-black text-lg text-white hover:bg-gray-800">
              Get Started
            </Button>
          </Link>
        </div>
      </div>
    </nav>
  );
}
