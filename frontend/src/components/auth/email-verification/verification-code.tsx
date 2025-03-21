import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import authService from "../../../api/authApi";
import { toast } from "react-hot-toast";

// Verification Code Component
export function VerificationCode() {
  const navigate = useNavigate();
  const email = localStorage.getItem("VerifyEmail") || "";
  const [code, setCode] = useState<string[]>(["", "", "", ""]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (index: number, value: string) => {
    if (!/^\d?$/.test(value)) return;
    
    setError(""); // Clear error when user types
    
    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);

    // Move to next input if a number is entered
    if (value && index < code.length - 1) {
      document.getElementById(`code-${index + 1}`)?.focus();
    }
  };

  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      document.getElementById(`code-${index - 1}`)?.focus();
    }
  };

  const handleVerify = async () => {
    const verificationCode = code.join("");
    
    if (verificationCode.length !== 4) {
      setError("Please enter the complete 4-digit code");
      return;
    }
    
    if (!email) {
      setError("Email information is missing. Please go back to login.");
      return;
    }

    setLoading(true);
    setError("");
    
    // Get the stored role
    const userRole = localStorage.getItem("userRole");
    console.log("Verifying with role:", userRole || "user");
    
    try {
      const response = await authService.verifyEmail(
        email, 
        verificationCode, 
        userRole || undefined
      );
      
      // Store token and user data
      localStorage.setItem("token", response.token);
      localStorage.setItem("user", JSON.stringify(response.user));
      
      // Remove verification email and role from storage
      localStorage.removeItem("VerifyEmail");
      localStorage.removeItem("userRole");
      
      toast.success("Email verified successfully!");
      navigate("/dashboard");
    } catch (err: any) {
      console.error("Verification error:", err);
      setError(err.response?.data?.message || "Failed to verify email. Please try again.");
      toast.error(err.response?.data?.message || "Verification failed");
    } finally {
      setLoading(false);
    }
  };

  const handleResendEmail = async () => {
    if (!email) {
      setError("Email information is missing. Please go back to login.");
      return;
    }
    
    setLoading(true);
    try {
      // For resending during registration, we need name and password
      // We'll just request a new code without completing registration
      await authService.forgotPassword(email);
      toast.success("Verification code resent to your email");
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to resend verification code");
      setError(error.response?.data?.message || "Failed to resend code");
    } finally {
      setLoading(false);
    }
  };

  const handleBackToLogin = () => {
    localStorage.removeItem("VerifyEmail");
    navigate("/login-screen");
  };

  if (!email) {
    return (
      <div className="w-full max-w-md mt-60 space-y-4 text-center">
        <h1 className="text-3xl font-semibold mb-3 text-white">
          Email Verification Error
        </h1>
        <p className="text-red-500">
          Email information is missing. Please return to login.
        </p>
        <div className="mt-4">
          <button 
            onClick={handleBackToLogin}
            className="w-[340px] py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-200 font-semibold"
          >
            Return to Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className=" flex flex-col items-center justify-center p-4 ">
      <div className="w-full max-w-md space-y-4 text-center">
        <div className="bg-blue-500 w-12 h-12 mt-15 mx-auto rounded-lg flex items-center justify-center">
          <svg
            width="26"
            height="22"
            viewBox="0 0 26 22"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M1.33398 5.16699L10.8597 11.835C11.6311 12.375 12.0168 12.6449 12.4363 12.7495C12.8069 12.8419 13.1944 12.8419 13.565 12.7495C13.9845 12.6449 14.3702 12.375 15.1416 11.835L24.6673 5.16699M6.93398 20.3337H19.0673C21.0275 20.3337 22.0076 20.3337 22.7563 19.9522C23.4149 19.6166 23.9503 19.0812 24.2858 18.4226C24.6673 17.6739 24.6673 16.6938 24.6673 14.7337V7.26699C24.6673 5.30681 24.6673 4.32672 24.2858 3.57803C23.9503 2.91946 23.4149 2.38403 22.7563 2.04847C22.0076 1.66699 21.0275 1.66699 19.0673 1.66699H6.93398C4.9738 1.66699 3.99371 1.66699 3.24502 2.04847C2.58645 2.38403 2.05102 2.91946 1.71546 3.57803C1.33398 4.32672 1.33398 5.30681 1.33398 7.26699V14.7337C1.33398 16.6938 1.33398 17.6739 1.71546 18.4226C2.05102 19.0812 2.58645 19.6166 3.24502 19.9522C3.99371 20.3337 4.9738 20.3337 6.93398 20.3337Z"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <h1 className="text-3xl font-semibold mb-3 text-white">
          Verify your email
        </h1>
        <p className="text-gray-500">
          We sent a verification code to
          <br />
          <span className="text-blue-500">{email}</span>
        </p>

        {error && (
          <div className="bg-red-500/20 border border-red-500 text-red-300 p-3 rounded-md text-sm">
            {error}
          </div>
        )}

        {/* Code Input Fields */}
        <div className="flex justify-center space-x-3 mt-7 mb-6">
          {code.map((digit, index) => (
            <input
              key={index}
              id={`code-${index}`}
              type="text"
              value={digit}
              maxLength={1}
              className="w-17 h-17 text-center text-2xl font-semibold text-blue-500 bg-transparent border-2 border-blue-500 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={(e) => handleChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              disabled={loading}
            />
          ))}
        </div>

        {/* Verify Email Button */}
        <div className="w-full max-w-xs">
          <button
            onClick={handleVerify}
            disabled={loading || code.join("").length !== 4}
            className="w-[340px] py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-200 font-semibold mt-4 disabled:opacity-50 disabled:cursor-not-allowed"
            style={{
              boxShadow: "inset 0 0 12px rgba(255, 255, 255, 0.25)",
            }}
          >
            {loading ? "Verifying..." : "Verify email"}
          </button>
        </div>

        {/* Resend Email */}
        <div className="mt-4 text-sm text-gray-400">
          Didn't receive the email?{" "}
          <button 
            className="text-blue-500"
            onClick={handleResendEmail}
            disabled={loading}
          >
            Click to resend
          </button>
        </div>

        <div className="flex items-center justify-center mt-4">
          <ArrowLeft className="text-gray-500 mr-2 h-4 w-4" />
          <button 
            className="text-gray-500 text-sm" 
            onClick={handleBackToLogin}
            disabled={loading}
          >
            Back to log in
          </button>
        </div>
      </div>
    </div>
  );
}
