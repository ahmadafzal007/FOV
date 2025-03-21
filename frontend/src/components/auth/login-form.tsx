import type React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import google from "../../assets/google.svg";
import authService from "../../api/authApi";
import { toast } from "react-hot-toast";

export default function LoginForm() {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState<{
    email?: string;
    password?: string;
    name?: string;
    general?: string;
  }>({});
  const [loading, setLoading] = useState(false);
  const [userRole, setUserRole] = useState<string | null>(null);
  const navigate = useNavigate();

  // Get user role from localStorage on component mount
  useEffect(() => {
    const storedRole = localStorage.getItem("userType");
    console.log("Selected user role:", storedRole);
    if (storedRole) {
      setUserRole(storedRole);
    }
  }, []);

  const validateForm = () => {
    const newErrors: {
      email?: string;
      password?: string;
      name?: string;
    } = {};
    let isValid = true;

    if (!formData.email) {
      newErrors.email = "Email is required";
      isValid = false;
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
      isValid = false;
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
      isValid = false;
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
      isValid = false;
    }

    if (!isLogin && !formData.name) {
      newErrors.name = "Name is required";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear the specific error when user types
    if (errors[name as keyof typeof errors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setLoading(true);
    setErrors({});
    
    try {
      if (!isLogin) {
        // Register flow
        console.log("Attempting registration with role:", userRole);
        const response = await authService.register(
          formData.name, 
          formData.email, 
          formData.password, 
          undefined, 
          userRole || "user"
        );
        
        if (response.message && response.message.includes("Verification code sent")) {
          localStorage.setItem("VerifyEmail", formData.email);
          localStorage.setItem("userRole", userRole || "user"); // Save role for verification step
          toast.success("Verification code sent to your email");
          navigate("/email-verification");
        }
      } else {
        // Login flow
        console.log("Attempting login with:", { email: formData.email, passwordLength: formData.password.length });
        const response = await authService.login(formData.email, formData.password);
        toast.success("Login successful!");
        navigate("/dashboard");
      }
    } catch (error: any) {
      console.error("Auth error:", error);
      console.error("Error response data:", error.response?.data);
      
      const errorMessage = error.response?.data?.message || "An error occurred";
      
      // Set specific field errors if they exist
      if (errorMessage.toLowerCase().includes("email")) {
        setErrors(prev => ({ ...prev, email: errorMessage }));
      } else if (errorMessage.toLowerCase().includes("password")) {
        setErrors(prev => ({ ...prev, password: errorMessage }));
      } else if (errorMessage.toLowerCase().includes("name")) {
        setErrors(prev => ({ ...prev, name: errorMessage }));
      } else {
        setErrors(prev => ({ ...prev, general: errorMessage }));
      }
      
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setLoading(true);
    try {
      console.log("Starting Google login...");
      const response = await authService.initiateGoogleLogin();
      console.log("Google login response:", response);
      
      // Only navigate after successful response
      if (response && response.token) {
        console.log("Google login successful, navigating to dashboard");
        toast.success("Google login successful!");
        navigate("/dashboard");
      } else {
        console.error("Invalid response from Google login");
        toast.error("Login failed. Please try again.");
      }
    } catch (error: any) {
      console.error("Google login error:", error);
      toast.error(error.message || "Google login failed");
      setErrors(prev => ({ ...prev, general: error.message || "Google login failed" }));
    } finally {
      setLoading(false);
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

      {/* Error message display */}
      {errors.general && (
        <div className="bg-red-500/20 border border-red-500 text-red-200 p-3 rounded-md mb-4 text-sm">
          {errors.general}
        </div>
      )}

      {/* Toggle Login / Signup */}
      <div className="flex font-semibold mb-8 bg-[#040911] border border-gray-600 rounded-lg ">
        <button
          type="button"
          className={`flex-1 py-2 text-sm rounded-lg transition-all duration-200 ${
            !isLogin
              ? "bg-[#363A41] text-white border-1 border-gray-300"
              : "text-gray-400"
          }`}
          onClick={() => {
            setIsLogin(false);
            setErrors({});
          }}
        >
          Sign up
        </button>
        <button
          type="button"
          className={`flex-1 py-2 text-sm rounded-lg transition-all duration-200 ${
            isLogin
              ? "bg-[#363A41] text-white border-1 border-gray-300"
              : "text-gray-400"
          }`}
          onClick={() => {
            setIsLogin(true);
            setErrors({});
          }}
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
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your name"
              className={`w-full px-3 py-3 text-sm rounded-lg bg-[#040911] border ${
                errors.name ? "border-red-500" : "border-gray-600"
              } text-white placeholder-gray-500 outline-none focus:border-gray-300 transition-colors`}
              required
            />
            {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name}</p>}
          </div>
        )}

        <div className="space-y-2">
          <label className="text-sm text-start text-gray-400 block">
            Email
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
            className={`w-full px-3 py-3 text-sm rounded-lg bg-[#040911] border ${
              errors.email ? "border-red-500" : "border-gray-600"
            } text-white placeholder-gray-500 outline-none focus:border-gray-300 transition-colors`}
            required
          />
          {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email}</p>}
        </div>

        <div className="space-y-2">
          <label className="text-sm text-start text-gray-400 block">
            Password
          </label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder={isLogin ? "**********" : "Create a password"}
            className={`w-full px-3 py-3 text-sm rounded-lg bg-[#040911] border ${
              errors.password ? "border-red-500" : "border-gray-600"
            } text-white placeholder-gray-500 outline-none focus:border-gray-300 transition-colors`}
            required
          />
          {errors.password && <p className="text-red-400 text-xs mt-1">{errors.password}</p>}
          {!isLogin && !errors.password && (
            <p className="text-start text-xs text-gray-400">
              Must be at least 6 characters.
            </p>
          )}

          {/* Remember me & Forgot Password */}
          {isLogin && (
            <div className="flex items-center justify-between text-xs mt-1">
              <label className="flex items-center text-white">
                <input
                  type="checkbox"
                  className="bg-[#040911] mr-1 w-3 h-3 rounded border-gray-800"
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
            disabled={loading}
            className="w-full py-2 bg-blue-500 rounded-md hover:bg-blue-600 transition font-semibold shadow-inner disabled:opacity-50 disabled:cursor-not-allowed"
            style={{
              boxShadow: "inset 0 0px 10px rgba(255, 255, 255, 0.4)",
            }}
          >
            {loading ? "Please wait..." : (isLogin ? "Sign in" : "Get started")}
          </button>

          {/* Google Sign-in */}
          <button
            type="button"
            onClick={handleGoogleLogin}
            disabled={loading}
            className="w-full py-3 border border-gray-600 rounded-lg bg-[#040911] hover:bg-[#040911] transition-colors text-white flex items-center justify-center gap-2 mt-4 disabled:opacity-50 disabled:cursor-not-allowed"
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
              onClick={() => {
                setIsLogin(false);
                setErrors({});
              }}
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
