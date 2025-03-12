import type React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import google from "../../assets/google.svg";


export default function LoginForm() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("")
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isLogin) {
      localStorage.setItem("VerifyEmail",email)
      navigate("/email-verification");
    } else {
      navigate("/dashboard");
    }
  };

  const handleForgotPassword = () => {
    navigate("/forgot-password");
  };

  return (
    <div className="w-full max-w-[440px] p-8">
      <h2 className="text-3xl font-semibold text-white mb-3">
        {isLogin ? "Log in to your account" : "Create an account"}
      </h2>
      {isLogin && (
        <p className="text-gray-400 text-sm mb-6">
          Welcome back! Please enter your details.
        </p>
      )}

      {/* Toggle Login / Signup */}
      <div className="flex font-semibold mb-8 bg-[#040911] border border-gray-600 rounded-lg ">
        <button
          className={`flex-1  text-sm rounded-lg transition-all duration-200 ${
            !isLogin
              ? "bg-[#363A41] text-white border-1 border-gray-300"
              : "text-gray-400"
          }`}
          onClick={() => setIsLogin(false)}
        >
          Sign up
        </button>
        <button
          className={`flex-1 py-2 text-sm rounded-lg transition-all duration-200 ${
            isLogin
              ? "bg-[#363A41] text-white border-1 border-gray-300"
              : "text-gray-400"
          }`}
          onClick={() => setIsLogin(true)}
        >
          Log in
        </button>
      </div>

      {/* Form Fields */}
      <form className="space-y-5" onSubmit={handleLogin}>
        {!isLogin && (
          <div className="space-y-2">
            <label className="text-sm text-start text-gray-400 block">
              Name
            </label>
            <input
              type="text"
              placeholder="Enter your name"
              className="w-full px-3 py-3 text-sm rounded-lg bg-[#040911] border border-gray-600 text-white placeholder-gray-500 outline-none focus:border-gray-300 transition-colors"
              required
            />
          </div>
        )}

        <div className="space-y-2">
          <label className="text-sm text-start text-gray-400 block">
            Email
          </label>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}

            className="w-full px-3 py-3 text-sm rounded-lg bg-[#040911] border border-gray-600 text-white placeholder-gray-500 outline-none focus:border-gray-300 transition-colors"
            required
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm text-start text-gray-400 block">
            Password
          </label>
          <input
            type="password"
            placeholder={isLogin ? "**********" : "Create a password"}
            className="w-full px-3 py-3 text-sm rounded-lg bg-[#040911] border border-gray-600 text-white placeholder-gray-500 outline-none focus:border-gray-300 transition-colors"
            required
          />
          {!isLogin && (
            <p className="text-start text-xs ">
              Must be at least 6 characters.
            </p>
          )}

          {/* Remember me & Forgot Password */}
          {isLogin && (
            <div className="flex items-center justify-between text-xs mt-1">
              <label className="flex items-center text-white">
                <input
                  type="checkbox"
                  className="bg-[#040911] mr-1 w-3 h-3 rounded border-gray-800 "
                />
                Remember for 30 days
              </label>
              <button
                type="button"
                onClick={handleForgotPassword}
                className="text-[#0066FF] hover:text-blue-400 transition-colors"
              >
                Forgot password?
              </button>
            </div>
          )}
        </div>

        <div>
          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-2 bg-blue-500 rounded-md hover:bg-blue-600 transition font-semibold shadow-inner"
            style={{
              boxShadow: "inset 0 0px 10px rgba(255, 255, 255, 0.4)",
            }}
          >
            {isLogin ? "Sign in" : "Get started"}
          </button>

          {/* Google Sign-in */}
          <button
            type="button"
            className="w-full py-3 border border-gray-600 rounded-lg bg-[#040911] hover:bg-[#040911] transition-colors text-white flex items-center justify-center gap-2 mt-4 "
          >
            <img src={google} alt="Google" className="w-5 h-5" />
            Sign {isLogin ? "in" : "up"} with Google
          </button>
        </div>

        {/* Sign up link */}
        {isLogin && (
          <p className="text-center text-gray-400 text-sm mt-6">
            Don't have an account?{" "}
            <button
              type="button"
              onClick={() => setIsLogin(false)}
              className="text-[#0066FF] hover:text-blue-400 transition-colors"
            >
              Sign up
            </button>
          </p>
        )}
      </form>
    </div>
  );
}
