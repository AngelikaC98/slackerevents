"use client";

import styles from "./Footer.module.css";
import { useTranslation } from "@/hooks/useTranslation";

export default function Footer() {
  const { t, isClient } = useTranslation();

  // URL you want to open when clicked
  const linkUrl = "https://vefkraft.com";

  // Fallback content during SSR
  if (!isClient) {
    return (
      <footer className={styles.footer}>
        <a
          href={linkUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="cursor-pointer hover:underline"
        >
          <span>© 2025 by Vefkraft</span>
        </a>
      </footer>
    );
  }

  return (
    <footer className={styles.footer}>
      <a
        href={linkUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="cursor-pointer hover:underline"
      >
        <span>{t("footer.copyright")}</span>
      </a>
    </footer>
  );
}
