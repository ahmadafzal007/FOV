"use client";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

export function EmailVerification() {
  const navigate = useNavigate();
  const email = localStorage.getItem("VerifyEmail") || "olivia@untitledui.com";

  const handleEnterCodeManually = () => {
    navigate("/email-verification?step=verification-code");
  };

  const handleBackToLogin = () => {
    navigate("/login-screen");
  };

  return (
    <div className=" flex flex-col items-center justify-center p-4 ">
      <div className="w-full max-w-md space-y-4 text-center">
        <div className="bg-blue-500 w-12 h-12 mt-30 mx-auto rounded-lg flex items-center justify-center">
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
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </div>
        <h1 className="text-3xl font-semibold mb-3 text-white">
          Check your email
        </h1>
        <p className="text-gray-500">
          We sent a password reset link to
          <br />
          {email}
        </p>

        <div>
          <button
            onClick={handleEnterCodeManually}
            className="w-[340px] py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-200 font-semibold mt-4"
            style={{
              boxShadow: "inset 0 0 12px rgba(255, 255, 255, 0.25)",
            }}
          >
            Enter code manually
          </button>
        </div>

        <p className="text-gray-500 text-sm mt-4">
          Didn't receive the email?{" "}
          <button className="text-blue-500 hover:underline">
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
