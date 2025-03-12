import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function StarterScreen() {
  const navigate = useNavigate();

  const handleContinue = (userType: "creator" | "admin") => {
    // You can store the user type in localStorage if needed
    localStorage.setItem("userType", userType);
    navigate("/login-screen");
  };

  return (
    <div className="w-full max-w-3xl mt-34  mx-auto">
      <h1 className="text-white text-3xl font-medium mb-12">Who are you?</h1>
      <div className="flex flex-col md:flex-row justify-center items-center gap-6">
        {/* Creator Box */}
        <div className="w-[360px] h-[210px] border border-gray-700 rounded-xl pt-2  bg-[#03060B]/80 overflow-hidden">
          <div className="p-5 pl-6 ">
            <div className="bg-blue-500 w-12 h-12 rounded-lg flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-7 w-7 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
            </div>
          </div>
          <div className="px-4 pl-6 text-start pb-2">
            <p className=" text-white">Creator</p>
            <p className="text-gray-400 text-sm">I want to create advertise.</p>
          </div>
          <button
            className="w-full mt-2 p-4 text-left flex items-center gap-2 hover:bg-gray-900/50 transition-colors"
            onClick={() => handleContinue("creator")}
          >
            <span className="text-gray-400 pl-2 text-sm">Continue</span>
            <ArrowRight className="text-gray-400 h-4 w-4" />
          </button>
        </div>

        {/* Admin Box */}
        <div className="w-[360px] h-[210px] border border-gray-700 rounded-xl pt-2  bg-[#03060B]/80 overflow-hidden">
          <div className="p-5 pl-6">
            <div className="bg-blue-500 w-12 h-12 rounded-lg flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-7 w-7 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z"
                />
              </svg>
            </div>
          </div>
          <div className="px-4 pl-6 pb-2 text-start">
            <p className=" text-white">Admin</p>
            <p className="text-gray-400 text-sm">
              I want to regulate advertise.
            </p>
          </div>
          <button
            className="w-full mt-2 p-4 text-left flex items-center gap-2 hover:bg-gray-900/50 transition-colors"
            onClick={() => handleContinue("admin")}
          >
            <span className="text-gray-400 pl-2 text-sm">Continue</span>
            <ArrowRight className="text-gray-400 h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
