"use client";

import { useSearchParams } from "react-router-dom";
import AuthLayout from "../../components/auth/auth-layout";
import { EmailVerification } from "../../components/auth/email-verification/email-verification";
import { EmailVerifiedSuccess } from "../../components/auth/email-verification/email-verification-success";
import { VerificationCode } from "../../components/auth/email-verification/verification-code";

export default function EmailVerificationPage() {
  const [searchParams] = useSearchParams();
  const step = searchParams.get("step") || "email-sent";

  // Render the appropriate component based on the step parameter
  const renderVerificationComponent = () => {
    switch (step) {
      case "verification-code":
        return <VerificationCode />;
      case "success":
        return <EmailVerifiedSuccess />;
      case "email-sent":
      default:
        return <EmailVerification />;
    }
  };

  return <AuthLayout>{renderVerificationComponent()}</AuthLayout>;
}
