"use client";

// ------------ Imports ---------------
import { useState, useEffect, useRef } from "react";
import { signIn, getSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { useTranslation } from "@/hooks/useTranslation";
import Button from "@/components/UI/UniversalButton/button";
import Image from "next/image";

// ------------ Icons ---------------
import GoogleIcon from "../../../public/assets/icons/GoogleIcon.svg";
// import AppleIcon from "../../../public/assets/icons/AppleIcon.svg";
// import FacebookIcon from "../../../public/assets/icons/Facebook.svg";

// ------------ Styling ---------------
import "./LoginModal.module.css";

// ------------ Types ---------------
interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  callbackUrl?: string;
}

interface LoginFormData {
  email: string;
  password: string;
}

interface LoginError {
  message: string;
  field?: 'email' | 'password' | 'general';
}

// ------------ Component ---------------
const LoginModal: React.FC<LoginModalProps> = ({ 
  isOpen, 
  onClose, 
  callbackUrl = "/" 
}) => {
  // Translation hook
  const { t } = useTranslation();
  
  // Router and search params
  const router = useRouter();
  // const searchParams = useSearchParams();
  
  // Modal ref for click outside handling
  const modalRef = useRef<HTMLDivElement>(null);
  
  // Form state
  const [formData, setFormData] = useState<LoginFormData>({
    email: "",
    password: "",
  });
  
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<LoginError | null>(null);
  const [showPassword, setShowPassword] = useState(false);

  // ------------ Effects ---------------
  
  // Handle escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      // Prevent body scroll when modal is open
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  // Handle click outside modal
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);

  // Reset form when modal opens
  useEffect(() => {
    if (isOpen) {
      setFormData({ email: "", password: "" });
      setError(null);
      setIsLoading(false);
      setShowPassword(false);
    }
  }, [isOpen]);

  // ------------ Handlers ---------------

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear field-specific errors
    if (error?.field === name) {
      setError(null);
    }
  };

  const validateForm = (): boolean => {
    if (!formData.email.trim()) {
      setError({
        message: t("auth.errors.emailRequired"),
        field: "email"
      });
      return false;
    }

    if (!formData.email.includes("@")) {
      setError({
        message: t("auth.errors.emailInvalid"),
        field: "email"
      });
      return false;
    }

    if (!formData.password.trim()) {
      setError({
        message: t("auth.errors.passwordRequired"),
        field: "password"
      });
      return false;
    }

    if (formData.password.length < 6) {
      setError({
        message: t("auth.errors.passwordTooShort"),
        field: "password"
      });
      return false;
    }

    return true;
  };

  const handleCredentialsLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsLoading(true);
    setError(null);

    try {
      const result = await signIn("credentials", {
        email: formData.email,
        password: formData.password,
        redirect: false,
      });

      if (result?.error) {
        setError({
          message: t("auth.errors.invalidCredentials"),
          field: "general"
        });
      } else if (result?.ok) {
        // Check if session is established
        const session = await getSession();
        if (session) {
          onClose();
          router.push(callbackUrl);
          router.refresh();
        }
      }
    } catch (err) {
      console.error("Login error:", err);
      setError({
        message: t("auth.errors.unknownError"),
        field: "general"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialLogin = async (provider: "google" | "apple" | "facebook") => {
    setIsLoading(true);
    setError(null);

    try {
      await signIn(provider, {
        callbackUrl,
        redirect: true,
      });
    } catch (err) {
      console.error(`${provider} login error:`, err);
      setError({
        message: t("auth.errors.socialLoginFailed"),
        field: "general"
      });
      setIsLoading(false);
    }
  };

  const handleForgotPassword = () => {
    // TODO: Implement forgot password functionality
    console.log("Forgot password clicked");
    // For now, just redirect to a forgot password page or show a message
    router.push("/forgot-password");
    onClose();
  };

  // Don't render if not open
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
      
      {/* Modal Content */}
      <div 
        ref={modalRef}
        className="relative w-full max-w-md mx-4 bg-white rounded-lg shadow-xl transform transition-all"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-2xl font-bold text-gray-900">
            {t("auth.login")}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
            aria-label={t("common.close")}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Body */}
        <div className="p-6">
          {/* Error Display */}
          {error && (
            <div className="mb-4 p-3 rounded-md bg-red-50 border border-red-200">
              <p className="text-sm text-red-600">{error.message}</p>
            </div>
          )}

          {/* Credentials Form */}
          <form onSubmit={handleCredentialsLogin} className="space-y-4">
            {/* Email Field */}
            <div>
              <label 
                htmlFor="email" 
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                {t("auth.email")}
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                  error?.field === "email" 
                    ? "border-red-300 focus:ring-red-500 focus:border-red-500" 
                    : "border-gray-300"
                }`}
                placeholder={t("auth.emailPlaceholder")}
                disabled={isLoading}
                autoComplete="email"
              />
            </div>

            {/* Password Field */}
            <div>
              <label 
                htmlFor="password" 
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                {t("auth.password")}
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-2 pr-10 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                    error?.field === "password" 
                      ? "border-red-300 focus:ring-red-500 focus:border-red-500" 
                      : "border-gray-300"
                  }`}
                  placeholder={t("auth.passwordPlaceholder")}
                  disabled={isLoading}
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  disabled={isLoading}
                >
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    {showPassword ? (
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
                    ) : (
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    )}
                  </svg>
                </button>
              </div>
            </div>

            {/* Forgot Password Link */}
            <div className="text-right">
              <button
                type="button"
                onClick={handleForgotPassword}
                className="text-sm text-blue-600 hover:text-blue-500 transition-colors"
                disabled={isLoading}
              >
                {t("auth.forgotPassword")}
              </button>
            </div>

            {/* Login Button */}
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? t("auth.signingIn") : t("auth.signIn")}
            </Button>
          </form>

          {/* Divider */}
          <div className="my-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">
                  {t("auth.orContinueWith")}
                </span>
              </div>
            </div>
          </div>

          {/* Social Login Buttons */}
          <div className="space-y-3">
            {/* Google */}
            <button
              onClick={() => handleSocialLogin("google")}
              disabled={isLoading}
              className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Image src={GoogleIcon} alt="Google" width={20} height={20} className="mr-2" />
              {t("auth.continueWithGoogle")}
            </button>

            {/* Apple - commented out until Apple OAuth is configured */}
            {/* <button
              onClick={() => handleSocialLogin("apple")}
              disabled={isLoading}
              className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Image src={AppleIcon} alt="Apple" width={20} height={20} className="mr-2" />
              {t("auth.continueWithApple")}
            </button> */}

            {/* Facebook - commented out until Facebook OAuth is configured */}
            {/* <button
              onClick={() => handleSocialLogin("facebook")}
              disabled={isLoading}
              className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Image src={FacebookIcon} alt="Facebook" width={20} height={20} className="mr-2" />
              {t("auth.continueWithFacebook")}
            </button> */}
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t bg-gray-50 rounded-b-lg">
          <p className="text-sm text-gray-600 text-center">
            {t("auth.noAccount")}{" "}
            <button 
              onClick={() => {
                // TODO: Implement sign up functionality or redirect
                console.log("Sign up clicked");
                router.push("/register");
                onClose();
              }}
              className="text-blue-600 hover:text-blue-500 font-medium transition-colors"
              disabled={isLoading}
            >
              {t("auth.signUp")}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;
