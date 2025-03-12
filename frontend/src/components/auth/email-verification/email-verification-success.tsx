import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

export function EmailVerifiedSuccess() {
  const navigate = useNavigate();

  const handleContinue = () => {
    navigate("/dashboard");
  };

  const handleResendEmail = () => {
    alert("Email resent!");
  };

  const handleBackToLogin = () => {
    navigate("/login-screen");
  };

  return (
    <div className=" flex flex-col items-center justify-center p-4 ">
      <div className="w-full max-w-md space-y-4 text-center">
        <div className="bg-blue-500 w-12 h-12 mt-15 mx-auto rounded-lg flex items-center justify-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-8 w-8 text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
        <h1 className="text-3xl font-semibold mb-3 text-white">
          Email verified
        </h1>
        <p className="text-gray-500">
          Your password has been successfully reset.
          <br />
          Click below to log in magically.
        </p>
        {/* Continue Button */}
        <div className="w-full max-w-xs">
          <button
            onClick={handleContinue}
            className="w-[340px] py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-200 font-semibold mt-4"
            style={{
              boxShadow: "inset 0 0 12px rgba(255, 255, 255, 0.25)",
            }}
          >
            Continue
          </button>
        </div>

        <p className="text-gray-500 text-sm mt-4">
          Didn't receive the email?{" "}
          <button
            onClick={handleResendEmail}
            className="text-blue-500 hover:underline"
          >
            Click to resend
          </button>
        </p>

        <div className="flex items-center justify-center mt-4">
          <button
            className="flex items-center text-gray-500 text-sm hover:text-gray-400"
            onClick={handleBackToLogin}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to log in
          </button>
        </div>
      </div>
    </div>
  );
}
