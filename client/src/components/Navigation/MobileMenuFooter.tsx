import Socials from "@/components/UI/SocialMedia/socials";

interface MobileMenuFooterProps {
  locale: string;
  onLanguageChange: (locale: string) => void;
  isClient: boolean;
  t: (key: string) => string;
}

export default function MobileMenuFooter({
  locale,
  onLanguageChange,
  isClient,
  t,
}: MobileMenuFooterProps) {
  return (
    <div className="absolute bottom-10 left-1 right-0 p-4">
      {/* Container for all three elements */}
      <div className="relative w-full h-16">
        {/* Language Toggle - Bottom Left */}
        <div className="absolute bottom-8rem left-0">
          <div className="flex gap-2 text-xl">
            <button
              onClick={() => onLanguageChange("is")}
              className={`transition-colors ${
                locale === "is"
                  ? "text-[var(--color-acidYellow)]"
                  : "text-white hover:text-[var(--color-acidYellow)]"
              }`}
            >
              {isClient ? t("language.icelandic") : "ÍSL"}
            </button>
            <span className="text-white">/</span>
            <button
              onClick={() => onLanguageChange("en")}
              className={`transition-colors ${
                locale === "en"
                  ? "text-[var(--color-acidYellow)]"
                  : "text-white hover:text-[var(--color-acidYellow)]"
              }`}
            >
              {isClient ? t("language.english") : "ENG"}
            </button>
          </div>
        </div>

        {/* Social Media Icons - Bottom Right */}
        <div className="absolute bottom-8 right-0">
          <Socials />
        </div>
      </div>
    </div>
  );
}
