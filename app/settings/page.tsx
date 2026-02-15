"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { 
  User, 
  FileText, 
  Grid3X3, 
  Eye, 
  Fingerprint,
  GraduationCap,
  Award,
  Briefcase,
  Globe,
  ChevronDown,
  Camera,
  X,
  Link2,
  Github,
  Linkedin,
  Twitter,
  Globe2,
  Save
} from "lucide-react"

type Tab = "about" | "education" | "achievements" | "work" | "socials"
type SidebarItem = "basic" | "details" | "platform" | "visibility" | "accounts"

const tabs: { id: Tab; label: string; icon: React.ReactNode }[] = [
  { id: "about", label: "About Me", icon: <FileText size={16} /> },
  { id: "education", label: "Education", icon: <GraduationCap size={16} /> },
  { id: "achievements", label: "Achievements", icon: <Award size={16} /> },
  { id: "work", label: "Work Experience", icon: <Briefcase size={16} /> },
  { id: "socials", label: "Socials", icon: <Globe size={16} /> },
]

const sidebarItems: { id: SidebarItem; label: string; icon: React.ReactNode }[] = [
  { id: "basic", label: "Basic Info", icon: <User size={18} /> },
  { id: "details", label: "Profile Details", icon: <FileText size={18} /> },
  { id: "platform", label: "Platform", icon: <Grid3X3 size={18} /> },
  { id: "visibility", label: "Visibility", icon: <Eye size={18} /> },
  { id: "accounts", label: "Accounts", icon: <Fingerprint size={18} /> },
]

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState<Tab>("about")
  const [activeSidebar, setActiveSidebar] = useState<SidebarItem>("details")
  const [formData, setFormData] = useState({
    firstName: "Yuvraj",
    lastName: "Singh",
    email: "yuvrajsingh58428@gmail.com",
    bio: "",
    country: "India",
    college: "",
    degree: "Bachelor of Technology",
    branch: "Artificial Intelligence",
    graduationYear: "2028",
    linkedin: "",
    twitter: "",
    website: "",
    github: "",
  })

  return (
    <div className="min-h-screen bg-[#0D0D0F] flex">
      {/* Left Sidebar */}
      <aside className="w-64 bg-[#121214] border-r border-[#1E1E24] shrink-0 hidden md:block">
        <div className="p-6">
          {/* Back Link */}
          <button className="flex items-center gap-2 text-orange-500 hover:text-orange-400 text-sm mb-6 transition-colors">
            <ChevronDown size={14} className="rotate-90" />
            Back to Profile
          </button>

          {/* Sidebar Title */}
          <h2 className="text-sm font-semibold text-white mb-4 px-3">Profile Details</h2>

          {/* Sidebar Navigation */}
          <nav className="space-y-1">
            {sidebarItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveSidebar(item.id)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all ${
                  activeSidebar === item.id
                    ? "bg-[#1E1E24] text-white"
                    : "text-gray-400 hover:text-gray-200 hover:bg-[#18181B]"
                }`}
              >
                <span className={activeSidebar === item.id ? "text-orange-500" : "text-gray-500"}>
                  {item.icon}
                </span>
                {item.label}
              </button>
            ))}
          </nav>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 md:p-8 lg:p-10 overflow-y-auto">
        <div className="max-w-4xl mx-auto">
          {/* Tab Navigation */}
          <div className="border-b border-[#1E1E24] mb-8">
            <div className="flex gap-1 overflow-x-auto scrollbar-hide">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 transition-all whitespace-nowrap ${
                    activeTab === tab.id
                      ? "border-orange-500 text-orange-500"
                      : "border-transparent text-gray-400 hover:text-gray-200"
                  }`}
                >
                  {tab.icon}
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Tab Content */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              {activeTab === "about" && (
                <AboutSection formData={formData} setFormData={setFormData} />
              )}
              {activeTab === "education" && (
                <EducationSection formData={formData} setFormData={setFormData} />
              )}
              {activeTab === "achievements" && <AchievementsSection />}
              {activeTab === "work" && <WorkSection />}
              {activeTab === "socials" && (
                <SocialsSection formData={formData} setFormData={setFormData} />
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>
    </div>
  )
}

// About Section
function AboutSection({ formData, setFormData }: { 
  formData: any; 
  setFormData: (data: any) => void 
}) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-white mb-2">About</h2>
        <p className="text-gray-400 text-sm">
          Add a brief introduction about yourself to showcase your personality and interests.
        </p>
      </div>

      {/* Profile Image */}
      <div className="flex items-center gap-4">
        <div className="relative">
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center text-2xl font-bold text-white">
            {formData.firstName[0]}{formData.lastName[0]}
          </div>
          <button className="absolute -bottom-1 -right-1 p-1.5 bg-[#1E1E24] rounded-full border border-gray-700 hover:border-orange-500 transition-colors">
            <Camera size={14} className="text-gray-400" />
          </button>
        </div>
      </div>

      {/* Form Fields */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormInput
          label="First Name *"
          value={formData.firstName}
          onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
        />
        <FormInput
          label="Last Name"
          value={formData.lastName}
          onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
        />
        <FormInput
          label="Email"
          value={formData.email}
          onChange={() => {}}
          disabled
          className="md:col-span-2"
        />
        <FormTextarea
          label="Bio (Max 200 Characters)"
          value={formData.bio}
          onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
          maxLength={200}
          className="md:col-span-2"
        />
        <FormSelect
          label="Country *"
          value={formData.country}
          options={["India", "USA", "UK", "Canada", "Australia"]}
          onChange={(e) => setFormData({ ...formData, country: e.target.value })}
        />
      </div>

      <div className="flex justify-end pt-4">
        <button className="flex items-center gap-2 px-6 py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-lg font-medium transition-colors">
          <Save size={16} />
          Update Changes
        </button>
      </div>
    </div>
  )
}

// Education Section
function EducationSection({ formData, setFormData }: { 
  formData: any; 
  setFormData: (data: any) => void 
}) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white mb-2">Education</h2>
          <p className="text-gray-400 text-sm">
            Add your education details, including college name, degree, and grades.
          </p>
        </div>
        <button className="text-blue-500 hover:text-blue-400 text-sm font-medium transition-colors">
          + Add Education
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormInput
          label="School / College / University *"
          value={formData.college}
          onChange={(e) => setFormData({ ...formData, college: e.target.value })}
          placeholder="Enter your college name"
        />
        <FormSelect
          label="Degree *"
          value={formData.degree}
          options={["Bachelor of Technology", "Bachelor of Engineering", "Bachelor of Science", "Master of Technology", "Master of Science"]}
          onChange={(e) => setFormData({ ...formData, degree: e.target.value })}
        />
        <FormSelect
          label="Branch *"
          value={formData.branch}
          options={["Artificial Intelligence", "Computer Science", "Information Technology", "Data Science", "Electronics"]}
          onChange={(e) => setFormData({ ...formData, branch: e.target.value })}
        />
        <FormSelect
          label="Year of Graduation *"
          value={formData.graduationYear}
          options={["2024", "2025", "2026", "2027", "2028", "2029", "2030"]}
          onChange={(e) => setFormData({ ...formData, graduationYear: e.target.value })}
        />
      </div>

      <div className="flex justify-end pt-4">
        <button className="flex items-center gap-2 px-6 py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-lg font-medium transition-colors">
          <Save size={16} />
          Update Changes
        </button>
      </div>
    </div>
  )
}

// Achievements Section
function AchievementsSection() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white mb-2">Achievements</h2>
          <p className="text-gray-400 text-sm">
            Showcase your achievements and certifications to enhance your profile.
          </p>
        </div>
        <button className="text-blue-500 hover:text-blue-400 text-sm font-medium transition-colors">
          + Add Achievement
        </button>
      </div>

      {/* Empty State */}
      <div className="border-2 border-dashed border-[#2A2A30] rounded-xl p-12 text-center">
        <Award size={48} className="mx-auto text-gray-600 mb-4" />
        <p className="text-gray-400">No achievements added yet</p>
        <p className="text-gray-500 text-sm mt-1">Click "+ Add Achievement" to get started</p>
      </div>
    </div>
  )
}

// Work Experience Section
function WorkSection() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white mb-2">Work Experience</h2>
          <p className="text-gray-400 text-sm">
            Add your work experience, internships, and professional journey.
          </p>
        </div>
        <button className="text-blue-500 hover:text-blue-400 text-sm font-medium transition-colors">
          + Add Experience
        </button>
      </div>

      {/* Empty State */}
      <div className="border-2 border-dashed border-[#2A2A30] rounded-xl p-12 text-center">
        <Briefcase size={48} className="mx-auto text-gray-600 mb-4" />
        <p className="text-gray-400">No work experience added yet</p>
        <p className="text-gray-500 text-sm mt-1">Click "+ Add Experience" to get started</p>
      </div>
    </div>
  )
}

// Socials Section
function SocialsSection({ formData, setFormData }: { 
  formData: any; 
  setFormData: (data: any) => void 
}) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-white mb-2">Socials</h2>
        <p className="text-gray-400 text-sm">
          Link your social profiles to help others connect with you.
        </p>
      </div>

      <div className="space-y-4">
        <SocialInput
          label="GitHub"
          icon={<Github size={20} />}
          value={formData.github}
          onChange={(e) => setFormData({ ...formData, github: e.target.value })}
          placeholder="https://github.com/username"
        />
        <SocialInput
          label="LinkedIn"
          icon={<Linkedin size={20} />}
          value={formData.linkedin}
          onChange={(e) => setFormData({ ...formData, linkedin: e.target.value })}
          placeholder="https://linkedin.com/in/username"
        />
        <SocialInput
          label="Twitter"
          icon={<Twitter size={20} />}
          value={formData.twitter}
          onChange={(e) => setFormData({ ...formData, twitter: e.target.value })}
          placeholder="https://twitter.com/username"
        />
        <SocialInput
          label="Website"
          icon={<Globe2 size={20} />}
          value={formData.website}
          onChange={(e) => setFormData({ ...formData, website: e.target.value })}
          placeholder="https://yourwebsite.com"
        />
      </div>

      <div className="flex justify-end pt-4">
        <button className="flex items-center gap-2 px-6 py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-lg font-medium transition-colors">
          <Save size={16} />
          Update Changes
        </button>
      </div>
    </div>
  )
}

// Form Components
function FormInput({ 
  label, 
  value, 
  onChange, 
  disabled, 
  placeholder,
  className = "",
  maxLength 
}: { 
  label: string; 
  value: string; 
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  placeholder?: string;
  className?: string;
  maxLength?: number;
}) {
  return (
    <div className={className}>
      <label className="block text-sm font-medium text-gray-300 mb-2">
        {label}
      </label>
      <input
        type="text"
        value={value}
        onChange={onChange}
        disabled={disabled}
        placeholder={placeholder}
        maxLength={maxLength}
        className={`w-full px-4 py-3 bg-[#18181B] border border-[#2A2A30] rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed`}
      />
    </div>
  )
}

function FormTextarea({ 
  label, 
  value, 
  onChange, 
  placeholder,
  className = "",
  maxLength 
}: { 
  label: string; 
  value: string; 
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  placeholder?: string;
  className?: string;
  maxLength?: number;
}) {
  return (
    <div className={className}>
      <label className="block text-sm font-medium text-gray-300 mb-2">
        {label}
      </label>
      <textarea
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        maxLength={maxLength}
        rows={4}
        className="w-full px-4 py-3 bg-[#18181B] border border-[#2A2A30] rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-colors resize-none"
      />
      {maxLength && (
        <p className="text-xs text-gray-500 mt-1 text-right">{value.length}/{maxLength}</p>
      )}
    </div>
  )
}

function FormSelect({ 
  label, 
  value, 
  options, 
  onChange,
  className = ""
}: { 
  label: string; 
  value: string; 
  options: string[];
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  className?: string;
}) {
  return (
    <div className={className}>
      <label className="block text-sm font-medium text-gray-300 mb-2">
        {label}
      </label>
      <div className="relative">
        <select
          value={value}
          onChange={onChange}
          className="w-full px-4 py-3 bg-[#18181B] border border-[#2A2A30] rounded-lg text-white focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-colors appearance-none cursor-pointer"
        >
          {options.map((option) => (
            <option key={option} value={option} className="bg-[#18181B]">
              {option}
            </option>
          ))}
        </select>
        <ChevronDown size={18} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
      </div>
    </div>
  )
}

function SocialInput({ 
  label, 
  icon, 
  value, 
  onChange, 
  placeholder 
}: { 
  label: string; 
  icon: React.ReactNode; 
  value: string; 
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
}) {
  return (
    <div>
      <label className="flex items-center gap-2 text-sm font-medium text-gray-300 mb-2">
        {icon}
        {label}
      </label>
      <div className="relative">
        <Link2 size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
        <input
          type="url"
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className="w-full pl-10 pr-4 py-3 bg-[#18181B] border border-[#2A2A30] rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-colors"
        />
      </div>
    </div>
  )
}
