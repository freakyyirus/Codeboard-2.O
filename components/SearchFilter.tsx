"use client";

import { Search, Filter } from "lucide-react";
import { useState } from "react";

export default function SearchFilter({ 
  onSearch, 
  onLanguageFilter 
}: { 
  onSearch: (term: string) => void;
  onLanguageFilter: (language: string) => void;
}) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState("all");

  const languages = [
    "all", "JavaScript", "TypeScript", "Python", "Java", "Go", 
    "Rust", "C++", "C#", "PHP", "Ruby", "Swift"
  ];

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value;
    setSearchTerm(term);
    onSearch(term);
  };

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const lang = e.target.value;
    setSelectedLanguage(lang);
    onLanguageFilter(lang);
  };

  return (
    <div className="bg-[#0f0f0f] border border-[#1f1f1f] rounded-2xl p-4 mb-6">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500" />
          <input
            type="text"
            placeholder="Search repositories..."
            className="w-full bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg pl-10 pr-4 py-2 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchTerm}
            onChange={handleSearch}
          />
        </div>
        
        <div className="relative">
          <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500" />
          <select
            className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg pl-10 pr-8 py-2 text-white appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={selectedLanguage}
            onChange={handleLanguageChange}
          >
            {languages.map((lang) => (
              <option key={lang} value={lang} className="bg-[#1a1a1a]">
                {lang === "all" ? "All Languages" : lang}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}