import React, { useState } from "react";
import { Bell, Mail, Search, User, LogOut, Settings } from "lucide-react";

export default function Navbar({ role = "Candidate" }) {
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  return (
    <nav className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6 sticky top-0 z-50">
      {/* LEFT SIDE - Logo & Search */}
      <div className="flex items-center gap-6">
        {/* Logo/Brand */}
        {/* <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">EX</span>
          </div>
          <span className="text-lg font-semibold text-gray-800">ExamPortal</span>
        </div> */}

        {/* Search bar */}
        {/* <div className="relative hidden md:block">
          <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search exams, results..."
            className="bg-gray-50 pl-10 pr-4 py-2 rounded-lg w-80 outline-none border border-gray-200 focus:border-blue-500 focus:bg-white transition-all text-sm"
          />
        </div> */}
      </div>

      {/* RIGHT SIDE */}
      <div className="flex items-center gap-4">
        {/* Role Badge */}
        <div className="hidden sm:flex items-center bg-blue-50 text-blue-700 px-3 py-1.5 rounded-full text-xs font-medium">
          {role}
        </div>

        {/* Notifications */}
        <button className="relative p-2 hover:bg-gray-100 rounded-lg transition-colors group">
          <Bell className="w-5 h-5 text-gray-600 group-hover:text-blue-600 transition-colors" />
          <span className="absolute top-1 right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-medium">
            2
          </span>
        </button>

        {/* Messages */}
        <button className="relative p-2 hover:bg-gray-100 rounded-lg transition-colors group">
          <Mail className="w-5 h-5 text-gray-600 group-hover:text-blue-600 transition-colors" />
          <span className="absolute top-1 right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-medium">
            5
          </span>
        </button>

        {/* Divider */}
        <div className="w-px h-8 bg-gray-200 hidden sm:block"></div>

        {/* Profile Dropdown */}
        <div className="relative">
          <button
            onClick={() => setShowProfileMenu(!showProfileMenu)}
            className="flex items-center gap-3 hover:bg-gray-50 rounded-lg p-2 transition-colors"
          >
            <div className="hidden sm:block text-right">
              <p className="text-sm font-medium text-gray-800">John Doe</p>
              <p className="text-xs text-gray-500">{role}</p>
            </div>
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-semibold shadow-sm">
              JD
            </div>
          </button>

          {/* Dropdown Menu */}
          {showProfileMenu && (
            <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
              <div className="px-4 py-3 border-b border-gray-100">
                <p className="text-sm font-semibold text-gray-800">John Doe</p>
                <p className="text-xs text-gray-500">john.doe@example.com</p>
              </div>
              
              <button className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-3 transition-colors">
                <User className="w-4 h-4" />
                View Profile
              </button>
              
              <button className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-3 transition-colors">
                <Settings className="w-4 h-4" />
                Settings
              </button>
              
              <div className="border-t border-gray-100 mt-2 pt-2">
                <button className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 flex items-center gap-3 transition-colors">
                  <LogOut className="w-4 h-4" />
                  Logout
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}