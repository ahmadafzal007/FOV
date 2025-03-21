import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import authService from "../../../api/authApi";
import { toast } from "react-hot-toast";

export default function ResetPasswordForm() {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialStep =
    (searchParams.get("step") as "set-password" | "success") || "set-password";
  const [step, setStep] = useState<"set-password" | "success">(initialStep);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [email, setEmail] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [tokenVerified, setTokenVerified] = useState(false);
  const navigate = useNavigate();
  const token = searchParams.get("token");
  const verificationCode = searchParams.get("code");

  useEffect(() => {
    // Verify the token is valid
    const verifyToken = async () => {
      if (!token || !verificationCode) {
        toast.error("Invalid reset link. Please request a new one.");
        navigate("/forgot-password");
        return;
      }

      try {
        // Decode the token to get the email
        const decodedEmail = atob(token);
        setEmail(decodedEmail);
        setTokenVerified(true);
      } catch (error) {
        console.error("Invalid token:", error);
        toast.error("Invalid reset link. Please request a new one.");
        navigate("/forgot-password");
      }
    };

    verifyToken();
  }, [token, verificationCode, navigate]);

  // Update URL when step changes while preserving the token
  useEffect(() => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set("step", step);
    setSearchParams(newParams);
  }, [step, setSearchParams, searchParams]);

  const handleSetNewPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isPasswordValid) {
      setError("Password must be at least 8 characters long");
      return;
    }
    
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    
    if (!email || !verificationCode) {
      setError("Missing required information");
      return;
    }

    setLoading(true);
    setError("");
    
    try {
      const response = await authService.resetPassword(email, verificationCode, password);
      toast.success(response.message || "Password reset successful");
      setStep("success");
    } catch (err: any) {
      console.error("Password reset error:", err);
      setError(err.response?.data?.message || "Failed to reset password. Please try again.");
      toast.error(err.response?.data?.message || "Failed to reset password");
    } finally {
      setLoading(false);
    }
  };

  const handleBackToLogin = () => {
    navigate("/login-screen");
  };

  const isPasswordValid = password.length >= 8;
  const doPasswordsMatch = password === confirmPassword;
  const isFormValid = isPasswordValid && doPasswordsMatch && password.length > 0;

  // If the token verification is pending, show loading
  if (!tokenVerified && !error) {
    return (
      <div className="flex flex-col items-center justify-center p-4">
        <div className="w-full max-w-md space-y-4 text-center">
          <div className="animate-pulse">
            <div className="bg-blue-500/50 mt-15 w-12 h-12 rounded-lg mx-auto"></div>
            <div className="h-8 bg-gray-700/50 rounded w-3/4 mx-auto mt-4"></div>
            <div className="h-4 bg-gray-700/30 rounded w-1/2 mx-auto mt-2"></div>
          </div>
          <p className="text-gray-500">Verifying your reset link...</p>
        </div>
      </div>
    );
  }

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
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
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
            
            {error && (
              <div className="bg-red-500/20 border border-red-500 text-red-300 p-3 rounded-md text-sm">
                {error}
              </div>
            )}
            
            <form onSubmit={handleSetNewPassword} className="space-y-4 mt-4">
              <div className="w-[370px] mx-auto mt-4">
                <label className="text-sm text-start text-gray-400 block mb-1 ">
                  Password
                </label>
                <input
                  type="password"
                  placeholder="**********"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setError("");
                  }}
                  className={`w-full px-3 py-3 text-sm rounded-lg bg-[#040911] border ${
                    error && !isPasswordValid ? "border-red-500" : "border-gray-600"
                  } text-white placeholder-gray-500 outline-none focus:border-gray-300 transition-colors`}
                  required
                  disabled={loading}
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
                  onChange={(e) => {
                    setConfirmPassword(e.target.value);
                    setError("");
                  }}
                  className={`w-full px-3 py-3 text-sm rounded-lg bg-[#040911] border ${
                    error && password && !doPasswordsMatch ? "border-red-500" : "border-gray-600"
                  } text-white placeholder-gray-500 outline-none focus:border-gray-300 transition-colors`}
                  required
                  disabled={loading}
                />
              </div>
              <div className="flex flex-col space-y-2 text-sm">
                <div className="flex items-center space-x-2">
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
                
                <div className="flex items-center space-x-2">
                  <div
                    className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                      password && confirmPassword && doPasswordsMatch
                        ? "bg-blue-500 border-blue-500"
                        : "border-gray-600"
                    }`}
                  >
                    {password && confirmPassword && doPasswordsMatch && (
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
                    Passwords match
                  </span>
                </div>
              </div>
              <button
                type="submit"
                disabled={loading || !isFormValid}
                className="w-full py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-200 font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                style={{
                  boxShadow: "inset 0 0 12px rgba(255, 255, 255, 0.25)",
                }}
              >
                {loading ? "Resetting password..." : "Reset password"}
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
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>{" "}
            <h1 className="text-3xl font-semibold mb-3 text-white">
              Password reset
            </h1>
            <p className="text-gray-500">
              Your password has been successfully reset.
              <br />
              Click below to log in with your new password.
            </p>
            <button
              onClick={handleBackToLogin}
              className="w-full py-2 bg-blue-500 mt-4 text-white rounded-md hover:bg-blue-600 transition duration-200 font-semibold"
              style={{
                boxShadow: "inset 0 0 12px rgba(255, 255, 255, 0.25)",
              }}
            >
              Continue to login
            </button>
          </>
        )}
      </div>
      <div className="flex items-center  justify-center mt-6">
        <button
          className="flex items-center text-gray-500 text-sm hover:text-gray-400"
          onClick={handleBackToLogin}
          disabled={loading}
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to log in
        </button>
      </div>
    </div>
  );
}
