import React from "react";
import "./Search.css";
import { ReactComponent as Logo } from "../../assets/Logo.svg";
import SideMenu from "../../components/SideMenu/SideMenu";
import SearchForm from "../../components/SearchForm/SearchForm";
import Avatar from "../../components/Avatar/Avatar";
import LanguageSwitcher from "../../components/LanguageSwitcher/LanguageSwitcher";
import { useTranslation } from "react-i18next";

const Search: React.FC = () => {
  const { t } = useTranslation();
  return (
    <div className="search-page">
      <div className="search-header">
        <div>
          <Logo />
        </div>

        <div className="flex gap-2">
          <LanguageSwitcher />

          <div>
            <Avatar
              src="https://github.com/shadcn.png"
              alt="User Avatar"
              size="3rem"
            />
          </div>
        </div>
      </div>

      {/* Side Menu */}
      <div className="menu-container">
        <SideMenu />
      </div>

      {/* Header and Search Section */}
      <div className="header-container">
        {/* <div className="title">PhnyX RAG에게 무엇이든 물어보세요.</div> */}
        <div className="title"> {t("askAnything")}</div>
        <SearchForm />
      </div>
    </div>
  );
};

export default Search;
