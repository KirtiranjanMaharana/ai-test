import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// Define translations directly inside the i18n.ts file
const resources = {
  en: {
    translation: {
      welcome: "Hello, welcome!",
      language: "Language",
      askAnything: "Ask PhnyX RAG anything.",
      homeSearchPlaceHolder: "Please enter your question",
      searchText: "Search",
      accountText: "Account",
      EfficientDataText: "Efficient Data",
      UploadFilesText: "Upload files",
      SecureModeText: "Secure Mode",
      EfficientDataDesc:
        "Reveal first results fast to buy your time and continue searching deeply.",
      UploadFilesDesc:
        "No matter what image or video resolution, AI search can find it.",
    },
    SecureModeDesc:
      "No one can access your result because of end-to-end search.",
  },
  ko: {
    translation: {
      welcome: "안녕하세요, 환영합니다!",
      language: "언어",
      askAnything: "PhnyX RAG에게 무엇이든 물어보세요.",
      homeSearchPlaceHolder: "질문을 입력하세요.",
      searchText: "검색",
      accountText: "계정",
      EfficientDataText: "효율적인 데이터.",
      UploadFilesText: "파일 업로드.",
      SecureModeText: "보안 모드.",
      EfficientDataDesc:
        "첫 번째 결과를 빠르게 보여주어 시간을 벌고 깊이 있는 검색을 계속하세요",
      UploadFilesDesc:
        "이미지나 비디오 해상도에 상관없이 AI 검색이 찾아낼 수 있습니다.",
      SecureModeDesc:
        "종단 간 검색으로 인해 아무도 당신의 결과에 접근할 수 없습니다.",
    },
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: "ko",
  fallbackLng: "ko",
  interpolation: {
    escapeValue: false,
  },
});

// Function to switch languages
export const changeLanguage = (language: "en" | "ko") => {
  i18n.changeLanguage(language);
};

// Function to get the current language
export const getCurrentLanguage = () => i18n.language;

export default i18n;
