import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

export default function ResetPasswordForm() {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialStep =
    (searchParams.get("step") as "set-password" | "success") || "set-password";
  const [step, setStep] = useState<"set-password" | "success">(initialStep);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();
  const token = searchParams.get("token");

  // Update URL when step changes while preserving the token
  useEffect(() => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set("step", step);
    setSearchParams(newParams);
  }, [step, setSearchParams, searchParams]);

  // Validate token exists
  //   if (!token) {
  //     navigate("/forgot-password")
  //     return null
  //   }

  const handleSetNewPassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === confirmPassword && password.length >= 8) {
      // Here you would make an API call to reset the password using the token
      setStep("success");
    }
  };

  const handleBackToLogin = () => {
    navigate("/login-screen");
  };

  const isPasswordValid = password.length >= 8;

  return (
    <div className="flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md space-y-4 text-center">
        {step === "set-password" && (
          <>
            <div className="bg-blue-500 mt-15 w-12 h-12 rounded-lg mx-auto flex items-center justify-center">
              <svg
                width="22"
                height="24"
                viewBox="0 0 22 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M16.8327 9.66667V7.33333C16.8327 4.11167 14.221 1.5 10.9993 1.5C7.77769 1.5 5.16602 4.11167 5.16602 7.33333V9.66667M10.9993 14.9167V17.25M7.26602 22.5H14.7327C16.6929 22.5 17.673 22.5 18.4217 22.1185C19.0802 21.783 19.6156 21.2475 19.9512 20.589C20.3327 19.8403 20.3327 18.8602 20.3327 16.9V15.2667C20.3327 13.3065 20.3327 12.3264 19.9512 11.5777C19.6156 10.9191 19.0802 10.3837 18.4217 10.0481C17.673 9.66667 16.6929 9.66667 14.7327 9.66667H7.26602C5.30583 9.66667 4.32574 9.66667 3.57705 10.0481C2.91848 10.3837 2.38305 10.9191 2.04749 11.5777C1.66602 12.3264 1.66602 13.3065 1.66602 15.2667V16.9C1.66602 18.8602 1.66602 19.8403 2.04749 20.589C2.38305 21.2475 2.91848 21.783 3.57705 22.1185C4.32574 22.5 5.30583 22.5 7.26602 22.5Z"
                  stroke="white"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </div>
            <h1 className="text-3xl font-semibold mb-3 text-white">
              Set new password
            </h1>
            <p className="text-gray-500">
              Your new password must be different to
              <br />
              previously used passwords.
            </p>
            <form onSubmit={handleSetNewPassword} className="space-y-4 mt-4">
              <div className="w-[370px] mx-auto mt-4">
                <label className="text-sm text-start text-gray-400 block mb-1 ">
                  Password
                </label>
                <input
                  type="password"
                  placeholder="**********"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-3 py-3 text-sm rounded-lg bg-[#040911] border border-gray-600 text-white placeholder-gray-500 outline-none focus:border-gray-300 transition-colors"
                  required
                />
              </div>
              <div>
                <label className="text-sm text-start text-gray-400 block mb-1">
                  Confirm password
                </label>
                <input
                  type="password"
                  placeholder="**********"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full px-3 py-3 text-sm rounded-lg bg-[#040911] border border-gray-600 text-white placeholder-gray-500 outline-none focus:border-gray-300 transition-colors"
                  required
                />
              </div>
              <div className="flex items-center space-x-2 text-sm">
                <div
                  className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                    isPasswordValid
                      ? "bg-blue-500 border-blue-500"
                      : "border-gray-600"
                  }`}
                >
                  {isPasswordValid && (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-3 w-3 text-white"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  )}
                </div>
                <span className="text-gray-400">
                  Must be at least 8 characters
                </span>
              </div>
              <button
                type="submit"
                className="w-full py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-200 font-semibold"
                style={{
                  boxShadow: "inset 0 0 12px rgba(255, 255, 255, 0.25)",
                }}
              >
                Reset password
              </button>
            </form>
          </>
        )}

        {step === "success" && (
          <>
            <div className="bg-blue-500 mt-35 w-12 h-12 rounded-lg mx-auto flex items-center justify-center">
              <svg
                width="28"
                height="28"
                viewBox="0 0 28 28"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M8.75065 13.9997L12.2507 17.4997L19.2507 10.4997M25.6673 13.9997C25.6673 20.443 20.444 25.6663 14.0007 25.6663C7.55733 25.6663 2.33398 20.443 2.33398 13.9997C2.33398 7.55635 7.55733 2.33301 14.0007 2.33301C20.444 2.33301 25.6673 7.55635 25.6673 13.9997Z"
                  stroke="white"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </div>{" "}
            <h1 className="text-3xl font-semibold mb-3 text-white">
              Password reset
            </h1>
            <p className="text-gray-500">
              Your password has been successfully reset.
              <br />
              Click below to log in magically.
            </p>
            <button
              onClick={handleBackToLogin}
              className="w-full py-2 bg-blue-500 mt-4 text-white rounded-md hover:bg-blue-600 transition duration-200 font-semibold"
              style={{
                boxShadow: "inset 0 0 12px rgba(255, 255, 255, 0.25)",
              }}
            >
              Continue
            </button>
          </>
        )}
      </div>
      <div className="flex items-center  justify-center mt-6">
        <button
          className="flex items-center text-gray-500 text-sm hover:text-gray-400"
          onClick={handleBackToLogin}
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to log in
        </button>
      </div>
    </div>
  );
}
