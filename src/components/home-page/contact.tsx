import React from "react";
import { useTranslations } from "next-intl";

const Contact = () => {
  const t = useTranslations();

  return (
    <section
      id="contact"
      className="bg-white py-16 px-6 md:px-10 border-t border-gray-200"
    >
      <div className="max-w-4xl mx-auto flex flex-col items-center gap-6 text-center">
        <div className="bg-cyan-100 text-cyan-800 px-4 py-2 rounded-full text-sm font-medium">
          {t("contact.badge")}
        </div>
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
          {t("contact.title")}
        </h2>
        <p className="text-gray-600 text-sm md:text-base max-w-2xl">
          {t("contact.subtitle")}
        </p>
      </div>

      <form className="mt-10 max-w-3xl mx-auto flex flex-col gap-5">
        <div className="flex flex-col md:flex-row gap-5">
          <input
            type="text"
            placeholder={t("contact.form.name_placeholder")}
            className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all"
            required
          />
          <input
            type="email"
            placeholder={t("contact.form.email_placeholder")}
            className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all"
            required
          />
        </div>
        <input
          type="text"
          placeholder={t("contact.form.subject_placeholder")}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all"
          required
        />
        <textarea
          rows={5}
          placeholder={t("contact.form.message_placeholder")}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all"
          required
        ></textarea>
        <button
          type="submit"
          className="self-start bg-cyan-700 hover:bg-cyan-600 text-white font-medium py-3 px-8 rounded-lg shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl"
        >
          {t("contact.form.submit_button")}
        </button>
      </form>

      {/* Contact Info */}
      <div className="mt-16 max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="text-center">
          <div className="w-12 h-12 bg-cyan-100 rounded-lg flex items-center justify-center mx-auto mb-4">
            <svg
              className="w-6 h-6 text-cyan-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
            </svg>
          </div>
          <h3 className="font-semibold text-gray-900 mb-2">
            {t("contact.info.email.title")}
          </h3>
          <p className="text-gray-600 text-sm">
            {t("contact.info.email.description")}
          </p>
          <p className="text-cyan-600 font-medium">mahfouzteyib57@gmail.com</p>
        </div>

        <div className="text-center">
          <div className="w-12 h-12 bg-cyan-100 rounded-lg flex items-center justify-center mx-auto mb-4">
            <svg
              className="w-6 h-6 text-cyan-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
              />
            </svg>
          </div>
          <h3 className="font-semibold text-gray-900 mb-2">
            {t("contact.info.phone.title")}
          </h3>
          <p className="text-gray-600 text-sm">
            {t("contact.info.phone.description")}
          </p>
          <p className="text-cyan-600 font-medium">+251 929146352</p>
        </div>

        <div className="text-center">
          <div className="w-12 h-12 bg-cyan-100 rounded-lg flex items-center justify-center mx-auto mb-4">
            <svg
              className="w-6 h-6 text-cyan-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
          </div>
          <h3 className="font-semibold text-gray-900 mb-2">
            {t("contact.info.office.title")}
          </h3>
          <p className="text-gray-600 text-sm">
            {t("contact.info.office.description")}
          </p>
          <p className="text-cyan-600 font-medium">Addis Ababa, Ethiopia</p>
        </div>
      </div>
    </section>
  );
};

export default Contact;
