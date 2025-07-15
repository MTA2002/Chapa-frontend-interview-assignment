import React from "react";
import { useTranslations } from "next-intl";
import { FaTwitter, FaGithub, FaLinkedin, FaFacebook } from "react-icons/fa";

const Footer = () => {
  const t = useTranslations();

  return (
    <footer className="bg-gray-900 text-gray-300 py-12 px-6 md:px-10">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10">
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-cyan-600 to-teal-600 rounded-lg flex items-center justify-center">
              <svg
                className="w-6 h-6 text-white"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <span className="text-xl font-bold">
              <span className="text-cyan-400">Chapa</span>
              <span className="text-white"> PSP</span>
            </span>
          </div>
          <p className="text-sm text-gray-400 max-w-xs">
            {t("footer.description")}
          </p>
        </div>

        <div className="flex flex-col gap-4">
          <h3 className="text-sm font-semibold text-white uppercase tracking-wider">
            {t("footer.navigation.title")}
          </h3>
          <div className="flex flex-col gap-2">
            <a
              href="#features"
              className="hover:text-white text-sm transition-colors"
            >
              {t("navigation.features")}
            </a>
            <a
              href="#contact"
              className="hover:text-white text-sm transition-colors"
            >
              {t("navigation.contact")}
            </a>
            <a
              href="/en/login"
              className="hover:text-white text-sm transition-colors"
            >
              {t("common.login")}
            </a>
            <a
              href="/en/signup"
              className="hover:text-white text-sm transition-colors"
            >
              {t("common.signup")}
            </a>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <h3 className="text-sm font-semibold text-white uppercase tracking-wider">
            {t("footer.services.title")}
          </h3>
          <div className="flex flex-col gap-2">
            <span className="text-sm text-gray-400">
              {t("footer.services.payment_processing")}
            </span>
            <span className="text-sm text-gray-400">
              {t("footer.services.transaction_management")}
            </span>
            <span className="text-sm text-gray-400">
              {t("footer.services.analytics")}
            </span>
            <span className="text-sm text-gray-400">
              {t("footer.services.security")}
            </span>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <h3 className="text-sm font-semibold text-white uppercase tracking-wider">
            {t("footer.connect.title")}
          </h3>
          <div className="flex gap-4 text-xl">
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-cyan-400 transition-colors"
              aria-label="Twitter"
            >
              <FaTwitter />
            </a>
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-colors"
              aria-label="GitHub"
            >
              <FaGithub />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-cyan-400 transition-colors"
              aria-label="LinkedIn"
            >
              <FaLinkedin />
            </a>
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-cyan-600 transition-colors"
              aria-label="Facebook"
            >
              <FaFacebook />
            </a>
          </div>
          <div className="text-sm text-gray-400">
            <p>mahfouzteyib57@gmail.com</p>
            <p>+251 929146352</p>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-800 mt-10 pt-6 text-center text-sm text-gray-400">
        <p>
          &copy; {new Date().getFullYear()} {t("footer.copyright")}
        </p>
      </div>
    </footer>
  );
};

export default Footer;
