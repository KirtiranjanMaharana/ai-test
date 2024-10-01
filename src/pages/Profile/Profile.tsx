import React from "react";
import "./Profile.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import DocumentUpload from "../../components/DocumentUpload/DocumentUpload";
import FileManager from "../../components/FileManager/FileManager";
import { ReactComponent as Logo } from "../../assets/Logo.svg";
import PlusIcon from "../../assets/Profile/PlusIcon";
import Avatar from "../../components/Avatar/Avatar";
import { GoHistory } from "react-icons/go";
import { FaUserAlt } from "react-icons/fa";

const Profile: React.FC = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const userProfile = () => {
    navigate("/profile");
  };

  const handleFilesUpload = (files: File[]) => {
    console.log("Uploaded files:", files);
  };

  const navigateHome = () => {
    navigate("/");
  };

  return (
    <div className="profile-page-container custom-scrollbar">
      <div className="top-navigation-bar">
        <button onClick={userProfile}>
          {/* <Avatar
            src="https://github.com/shadcn.png"
            alt="User Avatar"
            size="3rem"
          /> */}
        </button>
      </div>

      <div className="profile-page-side-menu">
        <div
          className="profile-logo cursor-pointer"
          onClick={() => navigate("/")}
        >
          <p>
            <Logo />
          </p>
          <p className="logo-name-style">Phnyx RAG</p>
        </div>

        <div className="w-full mt-20 flex">
          <button
            onClick={() => navigate("/profile")}
            style={{
              background:
                pathname === "/profile"
                  ? "transparent linear-gradient(180deg, #2c2164 0%, #3e337a 100%) 0% 0% no-repeat padding-box"
                  : "transparent linear-gradient(180deg, #2c2164 0%, #3e337a 100%) 0% 0% no-repeat padding-box",
            }}
            className="bg-gray-300 w-[16vw] h-[3.25vw]  hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-md inline-flex items-center"
          >
            <FaUserAlt size={20} className="mr-4 text-white" />
            <span className="text-white">Profile</span>
          </button>
        </div>

        {/* <div className="w-full mt-2 flex">
          <button
            onClick={() => navigate("/history")}
            style={{
              background:
                pathname === "/history"
                  ? "transparent linear-gradient(180deg, #5158de 0%, #613ade 49%, #711ade 100%) 0% 0% no-repeat padding-box"
                  : "transparent linear-gradient(180deg, #2c2164 0%, #3e337a 100%) 0% 0% no-repeat padding-box",
            }}
            className="bg-gray-300 w-[16vw] h-[3.25vw]  hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-md inline-flex items-center"
          >
            <GoHistory size={20} className="mr-4 text-white " />
            <span className="text-white">History</span>
          </button>
        </div> */}

        <div className="return-home-button">
          <button onClick={navigateHome}>
            <PlusIcon />
            PhnyX RAG 검색
          </button>
        </div>
      </div>

      <div className="profile-page-body-container">
        <h1>파일 업로드</h1>
        <>
          <DocumentUpload onFilesUpload={handleFilesUpload} />
          <FileManager />
        </>
      </div>

      {/* Conditionally show content based on selected option */}
      {/* {selectedOption && (
        <div className="profile-page-body-container">
          <h1>
            {(showButtons === true &&
              (selectedOption === "Option 1" ? "파일 업로드" : "")) ||
              (selectedOption === "Option 2" ? "문서 탐색" : "")}
          </h1>

          {selectedOption === "Option 1" && showButtons === true && (
            <>
              <DocumentUpload onFilesUpload={handleFilesUpload} />
              <FileManager />
            </>
          )}
          {selectedOption === "Option 2" && showButtons === true && (
            <FileSearch />
          )}
        </div>
      )} */}
    </div>
  );
};

export default Profile;
