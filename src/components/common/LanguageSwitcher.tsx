"use client";

import { useLocale, useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useTransition } from "react";

export default function LanguageSwitcher() {
  const t = useTranslations();
  const locale = useLocale();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const handleLocaleChange = (newLocale: string) => {
    startTransition(() => {
      // Store preference in localStorage
      localStorage.setItem("preferredLocale", newLocale);

      // Navigate to the new locale
      const currentPath = window.location.pathname;
      const segments = currentPath.split("/");
      segments[1] = newLocale; // Replace the locale segment
      const newPath = segments.join("/");

      router.replace(newPath);
    });
  };

  return (
    <div className="relative">
      <select
        value={locale}
        onChange={(e) => handleLocaleChange(e.target.value)}
        disabled={isPending}
        className="p-2 border rounded-md bg-white text-black border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
      >
        <option value="en">English</option>
        <option value="am">አማርኛ (Amharic)</option>
      </select>
      {isPending && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}
    </div>
  );
}
