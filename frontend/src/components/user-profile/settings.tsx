import type React from "react"
import { useState } from "react"
import { ChevronDown, Upload } from "lucide-react"

export const SettingsForm: React.FC = () => {
  const [formData, setFormData] = useState({
    firstName: "Olivia",
    lastName: "Rhye",
    email: "olivia@untitledui.com",
    country: "Australia",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Form submitted:", formData)
  }

  return (
    <div className="max-w-7xl mx-auto py-6 px-4">
      <h1 className="text-2xl mt-2 font-semibold text-white mb-5">Settings</h1>

      <form onSubmit={handleSubmit}>
        {/* Personal Info Section */}
        <div className="mb-5">
          <h2 className="text-lg font-medium text-white mb-1">Personal info</h2>
          <p className="text-gray-400 text-sm mb-3">Update your photo and personal details here.</p>
          <div className="border-t border-gray-700"></div>
        </div>

        {/* Name Fields */}
        <div className="mb-5">
          <div className="grid grid-cols-1 md:grid-cols-3 ">
          <div className="block text-white text-sm  ">
            Name <span className="text-blue-500">*</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 ">
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              className="w-full  bg-[#040911] border border-gray-700 rounded-md px-3 py-2 text-white  focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              className="w-full bg-[#040911] border border-gray-700 rounded-md px-3 py-2 text-white  focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
              </div>
          </div>
          <div className="border-t mt-4 border-gray-700"></div>

        </div>

        {/* Email Field */}
        <div className="mb-5">
          <div className="flex items-center gap-80">
          <p className="block text-white text-sm mb-1.5">
            Email address <span className="text-blue-500">*</span>
          </p>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-3/8 bg-[#040911] border border-gray-700 rounded-md px-3 py-2 text-white  focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>
          <div className="border-t mt-4 border-gray-700"></div>

        </div>

        {/* Photo Upload */}
        <div className="mb-5">
          <div className="flex items-center">
          <div>
          <label className="block text-white text-sm mb-1">
            Your photo <span className="text-blue-500">*</span>
          </label>
          <p className="text-gray-400 text-xs mb-2">This will be displayed on your profile.</p>
          </div>
            <div className="w-14 h-14 ml-55 rounded-full overflow-hidden mr-4">
              <img src="https://img.freepik.com/free-photo/young-beautiful-woman-pink-warm-sweater-natural-look-smiling-portrait-isolated-long-hair_285396-896.jpg" alt="Profile" className="w-full h-full object-cover" />
            </div>
            <div className="flex-1">
              <div className="border w-2/4 border-dashed border-gray-700 rounded-md p-4 text-center">
                <div className="flex justify-center mb-1">
                  <div className="w-8 h-8 rounded-full bg-blue-500/10 flex items-center justify-center">
                    <Upload className="h-5 w-5 text-blue-500" />
                  </div>
                </div>
                <p className="text-blue-500 font-medium text-xs mb-0.5">Click to upload</p>
                <p className="text-gray-400 text-xs">or drag and drop</p>
                <p className="text-gray-500 text-xs mt-1">SVG, PNG, JPG or GIF (max. 800×400px)</p>
              </div>
            </div>
          </div>
          <div className="border-t mt-4 border-gray-700"></div>

        </div>

        {/* Country Dropdown */}
        <div className="mb-5">
          <label className="block text-white text-sm mb-1.5">Country</label>
          <div className="relative">
            <button
              type="button"
              className="w-full bg-[#040911] border border-gray-700 rounded-md px-3 py-2 text-white text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 flex items-center justify-between"
            >
              <div className="flex items-center">
                <span className="mr-2">🇦🇺</span>
                <span>Australia</span>
              </div>
              <ChevronDown className="h-4 w-4 text-gray-400" />
            </button>
          </div>
          <div className="border-t mt-4 border-gray-700"></div>

        </div>

        {/* Password Field */}
        <div className="mb-6">
          <label className="block text-white text-sm mb-1.5">Password</label>
          <button
            type="button"
            className="w-full bg-[#040911] border border-gray-700 rounded-md px-3 py-2 text-gray-400 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 text-center"
          >
            Change Password
          </button>
        </div>

        {/* Form Actions */}
        <div className="border-t border-gray-700 pt-4 flex justify-end space-x-3">
          <button
            type="button"
            className="px-3 py-2 border border-gray-700 rounded-md text-white text-sm hover:bg-[#222]"
          >
            Cancel
          </button>
          <button type="submit" className="px-3  bg-blue-500 rounded-md hover:bg-blue-600 transition  shadow-inner">
            Save
          </button>
        </div>
      </form>
    </div>
  )
}

