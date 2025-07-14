import React from "react";
import { useTranslations } from "next-intl";
import {
  FaUsers,
  FaCreditCard,
  FaChartLine,
  FaShieldAlt,
  FaCog,
  FaDatabase,
  FaMobile,
  FaGlobe,
  FaLock,
} from "react-icons/fa";

const Features = () => {
  const t = useTranslations();

  const features = [
    {
      title: t("features.payment_processing.title"),
      description: t("features.payment_processing.description"),
      icon: <FaCreditCard />,
      category: "user",
    },
    {
      title: t("features.transaction_history.title"),
      description: t("features.transaction_history.description"),
      icon: <FaChartLine />,
      category: "user",
    },
    {
      title: t("features.mobile_payments.title"),
      description: t("features.mobile_payments.description"),
      icon: <FaMobile />,
      category: "user",
    },
    {
      title: t("features.user_management.title"),
      description: t("features.user_management.description"),
      icon: <FaUsers />,
      category: "admin",
    },
    {
      title: t("features.analytics_reports.title"),
      description: t("features.analytics_reports.description"),
      icon: <FaChartLine />,
      category: "admin",
    },
    {
      title: t("features.security_monitoring.title"),
      description: t("features.security_monitoring.description"),
      icon: <FaShieldAlt />,
      category: "admin",
    },
    {
      title: t("features.system_configuration.title"),
      description: t("features.system_configuration.description"),
      icon: <FaCog />,
      category: "super_admin",
    },
    {
      title: t("features.database_management.title"),
      description: t("features.database_management.description"),
      icon: <FaDatabase />,
      category: "super_admin",
    },
    {
      title: t("features.global_settings.title"),
      description: t("features.global_settings.description"),
      icon: <FaGlobe />,
      category: "super_admin",
    },
  ];

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "user":
        return "text-green-600";
      case "admin":
        return "text-cyan-600";
      case "super_admin":
        return "text-purple-600";
      default:
        return "text-gray-600";
    }
  };

  const getCategoryBg = (category: string) => {
    switch (category) {
      case "user":
        return "bg-green-50 border-green-200";
      case "admin":
        return "bg-cyan-50 border-cyan-200";
      case "super_admin":
        return "bg-purple-50 border-purple-200";
      default:
        return "bg-gray-50 border-gray-200";
    }
  };

  return (
    <section
      className="bg-gray-50 flex flex-col items-center gap-6 py-16 px-6 md:px-10"
      id="features"
    >
      <div className="bg-cyan-100 text-cyan-800 font-medium py-2 px-4 rounded-full text-sm">
        {t("features.badge")}
      </div>

      <h2 className="text-3xl md:text-4xl font-bold text-center max-w-3xl">
        {t("features.title")}
      </h2>

      <p className="text-gray-600 text-sm md:text-base max-w-3xl text-center">
        {t("features.subtitle")}
      </p>

      {/* Role Categories */}
      <div className="flex flex-wrap justify-center gap-4 mt-8 mb-12">
        <div className="flex items-center gap-2 bg-green-100 px-4 py-2 rounded-full">
          <div className="w-3 h-3 bg-green-600 rounded-full"></div>
          <span className="text-green-800 font-medium text-sm">
            {t("roles.user")}
          </span>
        </div>
        <div className="flex items-center gap-2 bg-cyan-100 px-4 py-2 rounded-full">
          <div className="w-3 h-3 bg-cyan-600 rounded-full"></div>
          <span className="text-cyan-800 font-medium text-sm">
            {t("roles.admin")}
          </span>
        </div>
        <div className="flex items-center gap-2 bg-purple-100 px-4 py-2 rounded-full">
          <div className="w-3 h-3 bg-purple-600 rounded-full"></div>
          <span className="text-purple-800 font-medium text-sm">
            {t("roles.super_admin")}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl">
        {features.map((feature, index) => (
          <div
            key={index}
            className={`${getCategoryBg(
              feature.category
            )} border rounded-xl shadow-sm p-6 hover:shadow-md transition duration-300 flex flex-col gap-3`}
          >
            <div
              className={`${getCategoryColor(feature.category)} text-2xl mb-2`}
            >
              {feature.icon}
            </div>
            <h3 className="text-lg font-semibold text-gray-800">
              {feature.title}
            </h3>
            <p className="text-sm text-gray-600 flex-1">
              {feature.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Features;
