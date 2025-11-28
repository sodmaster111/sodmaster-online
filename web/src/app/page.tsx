"use client";

import { useEffect, useMemo } from "react";
import { usePathname, useRouter } from "next/navigation";
import heMessages from "../messages/he.json";
import ruMessages from "../messages/ru.json";

type Locale = "he" | "ru";

const translations: Record<Locale, typeof heMessages> = {
  he: heMessages,
  ru: ruMessages,
};

export default function HomePage() {
  const pathname = usePathname() || "/";
  const router = useRouter();

  const locale = useMemo<Locale>(() => {
    return pathname.startsWith("/ru") ? "ru" : "he";
  }, [pathname]);

  useEffect(() => {
    const html = document.documentElement;
    const direction = locale === "he" ? "rtl" : "ltr";

    html.setAttribute("dir", direction);
    html.setAttribute("lang", locale);
  }, [locale]);

  const copy = translations[locale];
  const alignment = locale === "he" ? "text-right" : "text-left";
  const direction = locale === "he" ? "rtl" : "ltr";

  const handleLocaleSwitch = (targetLocale: Locale) => {
    if (targetLocale === locale) return;

    if (targetLocale === "he") {
      router.push("/");
    } else {
      router.push("/ru");
    }
  };

  return (
    <main
      className="flex min-h-screen flex-col items-center justify-center bg-gray-50 px-6 py-12"
      dir={direction}
    >
      <div className="mb-8 flex items-center gap-3">
        <button
          onClick={() => handleLocaleSwitch("he")}
          className={`rounded border px-4 py-2 text-sm font-semibold transition focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-50 ${
            locale === "he"
              ? "border-blue-600 bg-blue-600 text-white"
              : "border-gray-300 bg-white text-gray-800"
          }`}
          type="button"
        >
          HE
        </button>
        <button
          onClick={() => handleLocaleSwitch("ru")}
          className={`rounded border px-4 py-2 text-sm font-semibold transition focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-50 ${
            locale === "ru"
              ? "border-blue-600 bg-blue-600 text-white"
              : "border-gray-300 bg-white text-gray-800"
          }`}
          type="button"
        >
          RU
        </button>
      </div>

      <section className="w-full max-w-2xl rounded-xl bg-white p-8 shadow-lg">
        <header className={`${alignment}`}>
          <p className="text-sm uppercase tracking-wide text-blue-600">{copy.description}</p>
          <h1 className="mt-2 text-4xl font-bold text-gray-900">{copy.title}</h1>
          <p className="mt-4 text-lg text-gray-700">{copy.mission}</p>
        </header>

        <div
          className={`mt-8 flex flex-col gap-4 sm:flex-row ${
            locale === "he" ? "sm:flex-row-reverse" : "sm:flex-row"
          } ${alignment}`}
        >
          <button
            className="w-full rounded-lg bg-blue-600 px-5 py-3 text-center text-white shadow transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            type="button"
          >
            {copy.joinTelegram}
          </button>
          <button
            className="w-full rounded-lg bg-green-600 px-5 py-3 text-center text-white shadow transition hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
            type="button"
          >
            {copy.joinWhatsApp}
          </button>
        </div>
      </section>
    </main>
  );
}
