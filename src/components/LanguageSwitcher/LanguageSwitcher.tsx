import React, { useEffect, useRef, useState } from "react";
import { changeLanguage } from "../../i18n";

interface Language {
  label: string;
  flag: string;
  lang: string;
}

const LanguageSwitcher: React.FC = () => {
  const languages: Language[] = [
    {
      label: "English",
      flag: "https://www.citypng.com/public/uploads/preview/free-united-kingdom-england-uk-flag-icon-png-735811697023915sbq5vwe1oa.png",
      lang: "en",
    },
    {
      label: "Korean",
      flag: "https://cdn-icons-png.flaticon.com/512/330/330591.png",
      lang: "ko",
    },
  ];

  const [selected, setSelected] = useState(
    localStorage.getItem("selectedLanguage") || "1"
  );
  const [menuToggle, setMenuToggle] = useState(false);
  const dropdownRef = useRef(null);
  const toggleMenu = () => setMenuToggle(!menuToggle);

  const handleSelect = (index: number) => {
    setSelected(index);
    if (index === 0) {
      changeLanguage("en");
      localStorage.setItem("selectedLanguage", "0");
    } else {
      localStorage.setItem("selectedLanguage", "1");
      changeLanguage("ko");
    }

    setMenuToggle(false);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setMenuToggle(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="w-full">
      <div className="w-full flex justify-end" ref={dropdownRef}>
        <div className="relative">
          <button
            className="bg-white border border-gray-500  text-gray-500 rounded shadow-lg  flex justify-center h-8 w-8"
            onClick={toggleMenu}
          >
            <img
              className="w-10 rounded"
              src={languages[selected].flag}
              alt={languages[selected].label}
              loading="lazy"
            />
          </button>

          {menuToggle && (
            <div className="bg-white border text-gray-700 shadow-md rounded text-sm absolute mt-12 top-0 right-0 min-w-full w-48 z-30">
              <div className="bg-white overflow-auto rounded w-full relative z-10">
                <ul className="list-reset">
                  {languages.map((item, index) => (
                    <li key={index}>
                      <a
                        href="#"
                        className="px-4 py-2 flex hover:bg-gray-100 no-underline hover:no-underline transition-colors duration-100"
                        onClick={(e) => {
                          e.preventDefault();
                          handleSelect(index);
                        }}
                      >
                        <span
                          className={`inline-block mr-2 flag-icon flag-icon-${item.flag}`}
                        ></span>
                        <span className="inline-block">{item.label}</span>
                        {index === selected && (
                          <span className="ml-auto">
                            <i className="mdi mdi-check"></i>
                          </span>
                        )}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LanguageSwitcher;
