// src/app/(site)/login/page.tsx
"use client";
// ------------ Imports ---------------
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
// Use public path for icons
import styles from "./LoginPage.module.css";
// eefeaf

/**
 * LoginPage
 * ---------
 * Handles both credentials and Google OAuth login.
 * Redirects user to callbackUrl (or home) after successful login.
 */
export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/";

  // State for form fields and error message
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  /**
   * Handles credentials login form submit.
   * Calls NextAuth signIn with credentials and redirects on success.
   */
  const handleCredentialsLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    if (res?.ok) {
      router.push(callbackUrl);
    } else {
      setErrorMsg("Incorrect email or password");
    }
  };

  return (
    <div className={styles.loginRoot}>
      <div className={styles.loginContainer}>
        {/* Use ArrowLeft.svg asset for back arrow */}
        <div className={styles.logoBack} onClick={() => router.back()}>
          <img
            src="/assets/icons/ArrowLeftYellow.svg"
            alt="Back"
            width={32}
            height={32}
            className={styles.arrowLeftIcon}
          />
        </div>
        <h1 className={styles.loginTitle}>Log in to Slacker Events</h1>
        <form onSubmit={handleCredentialsLogin} className={styles.loginForm}>
          <label className={styles.inputLabel} htmlFor="email">
            Adress email
          </label>
          <input
            id="email"
            type="email"
            placeholder="Adress email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={styles.inputField}
            autoComplete="email"
          />
          <label className={styles.inputLabel} htmlFor="password">
            Password
          </label>
          <div className={styles.passwordWrapper}>
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={styles.inputField}
              autoComplete="current-password"
            />
            <button
              type="button"
              className={styles.passwordToggle}
              onClick={() => setShowPassword((v) => !v)}
              tabIndex={-1}
            >
              <img
                src="/assets/icons/formkit_eye.svg"
                alt={showPassword ? "Hide password" : "Show password"}
                className={styles.eyeIcon}
              />
            </button>
          </div>
          {errorMsg && (
            <p
              style={{
                color: "#faff00",
                margin: "0.5rem 0",
                textAlign: "center",
              }}
            >
              {errorMsg}
            </p>
          )}
          <button type="submit" className={styles.loginButton}>
            Log in
          </button>
        </form>
        <div
          className={styles.forgotPassword}
          onClick={() => router.push("/forgot-password")}
        >
          Forget Password
        </div>
        <div className={styles.divider}>or</div>
        <button
          className={styles.registerButton}
          onClick={() => router.push("/register")}
        >
          Register for SlackerEvents
        </button>
        <button
          className={styles.socialButton}
          onClick={() => signIn("google", { callbackUrl })}
        >
          <img
            src="/assets/icons/GoogleIcon.svg"
            alt="Google"
            width={22}
            height={22}
            style={{ marginRight: 12 }}
          />
          Continue with Google
        </button>
        <button className={styles.socialButton} disabled>
          <img
            src="/assets/icons/AppleIcon.svg"
            alt="Apple"
            width={22}
            height={22}
            style={{ marginRight: 12 }}
          />
          Continue with Apple
        </button>
        <div className={styles.copyright}>© 2025 by Vefkraft</div>
      </div>
    </div>
  );
}
//dfasdfa
