import { useLanguage } from "../../lib/language-context";

const loadingTranslations = {
  en: "Loading...",
  fa: "در حال بارگذاری...",
  ar: "جارٍ التحميل...",
  he: "טוען..."
};


export default function Loding ({className}:{className?: string}) {
  const { language, selectedLang } = useLanguage();
  return (
    <div className={`${selectedLang.font} flex flex-col items-center justify-center min-h-screen ${className}`}>
      <div className="relative w-16 h-16 mb-4">
        <div className="absolute inset-0 rounded-full border-4 border-gray-200 border-t-gray-500 animate-spin"></div>
      </div>
      <p className="text-lg text-gray-700">
        {loadingTranslations[language] || "Loading..."}
      </p>
    </div>
  );
}