import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export default function LandingNavbar({scrollToSection}) {
  return (
    <nav className="sticky top-0 z-50  border-b border-gray-200 bg-linear-to-r from-[rgb(245,129,177)] to-[#94BBE9] shadow-lg ">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* LEFT — LOGO */}
        <div className="flex items-center gap-2">
          <img src="/ShikenXbgr.png"  
          onClick={(e) => {
              e.preventDefault();
              scrollToSection("hero");
            }} alt="ShikenX" className="h-13 w-auto drop-shadow-xl cursor-pointer pointer-events-auto" />
        </div>

        {/* RIGHT — ACTIONS */}
        <div className="flex items-center gap-6">
          <a
            href="#features"
            className="text-xl  font-semibold text-gray-700 hover:text-black transition"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection("features");
            }}
          >
            Features
          </a>

          <a
            href="#how-it-works"
            className="text-xl font-semibold text-gray-700 hover:text-black transition"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection("how-it-works");
            }}
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
            <Button className="bg-black  cursor-pointer text-lg text-white hover:bg-gray-800">
              Get Started
            </Button>
          </Link>
        </div>
      </div>
    </nav>
  );
}
