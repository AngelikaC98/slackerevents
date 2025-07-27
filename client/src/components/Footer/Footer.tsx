"use client";

import styles from "./Footer.module.css";
import { useTranslation } from "@/hooks/useTranslation";

export default function Footer() {
  const { t, isClient } = useTranslation();

  // Fallback content during SSR
  if (!isClient) {
    return (
      <footer className={styles.footer}>
        <span>© 2025 by Vefkraft</span>
      </footer>
    );
  }

  return (
    <footer className={styles.footer}>
      <span>{t("footer.copyright")}</span>
    </footer>
  );
}
