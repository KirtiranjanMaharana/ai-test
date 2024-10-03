import React from "react";
import { useTranslation } from "react-i18next";

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({
  icon,
  title,
  description,
}) => {
  return (
    <div
      style={{
        background: "linear-gradient(180deg, #9c0816 0%, #0b0a6d 100%)",
      }}
      className="flex flex-col  items-center justify-center  bg-opacity-10 backdrop-blur-lg rounded-lg p-6 text-center shadow-md hover:shadow-lg transition-shadow"
    >
      <div className="text-4xl mb-4">{icon}</div>
      <h3 className="text-lg font-semibold mb-2 text-white">{title}</h3>
      <p className="text-sm text-gray-300">{description}</p>
    </div>
  );
};

const FeaturesSection: React.FC = () => {
  const { t } = useTranslation();
  return (
    <section className="py-12 ">
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        <FeatureCard
          icon={
            <span role="img" aria-label="compass">
              ⌛️
            </span>
          }
          title={t("EfficientDataText")}
          description={t("EfficientDataDesc")}
        />
        <FeatureCard
          icon={
            <span role="img" aria-label="peach">
              📂
            </span>
          }
          title={t("UploadFilesText")}
          description={t("UploadFilesDesc")}
        />
        <FeatureCard
          icon={
            <span role="img" aria-label="secure">
              🔒
            </span>
          }
          title={t("SecureModeText")}
          description={t("SecureModeDesc")}
        />
      </div>
    </section>
  );
};

export default FeaturesSection;
