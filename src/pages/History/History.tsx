import React from "react";
import "../Profile/Profile.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ReactComponent as Logo } from "../../assets/Logo.svg";
import PlusIcon from "../../assets/Profile/PlusIcon";
import Avatar from "../../components/Avatar/Avatar";
import { GoHistory } from "react-icons/go";
import { FaUserAlt } from "react-icons/fa";

const History: React.FC = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const userProfile = () => {
    navigate("/profile");
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
                  ? "transparent linear-gradient(180deg, #5158de 0%, #613ade 49%, #711ade 100%) 0% 0% no-repeat padding-box"
                  : "transparent linear-gradient(180deg, #2c2164 0%, #3e337a 100%) 0% 0% no-repeat padding-box",
            }}
            className="bg-gray-300 w-[16vw] h-[3.25vw]  hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-md inline-flex items-center"
          >
            <FaUserAlt size={20} className="mr-4 text-white" />
            <span className="text-white">Profile</span>
          </button>
        </div>

        <div className="w-full mt-2 flex">
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
        </div>

        <div className="return-home-button">
          <button onClick={navigateHome}>
            <PlusIcon />
            PhnyX RAG 검색
          </button>
        </div>
      </div>

      <div className="profile-page-body-container overflow-y-auto">
        <div className="h-[80vh] flex bg-white text-gray-500 overflow-auto">
          <aside className="w-1/4 bg-white p-4">
            <div className="mb-4">
              <input
                type="text"
                placeholder="Search"
                className="w-full p-2 rounded-md bg-gray-200 text-gray-500 focus:outline-none"
              />
            </div>
            <ul className="space-y-3">
              {/* Chat History Items */}
              <li className="p-3 bg-gray-200 rounded-md">UI UX</li>
              <li className="p-3 bg-gray-200 rounded-md">
                The Science of Happiness
              </li>
              <li className="p-3 bg-gray-200 rounded-md">Sustainable Living</li>
              {/* Add more chat items here */}
            </ul>
          </aside>

          <main className="flex-1 bg-gray-900 p-6">
            {/* Chat header */}
            <div className="text-2xl mb-4">UI UX</div>

            {/* User Question */}
            <div className="flex items-start space-x-3">
              <div className="bg-green-500 p-3 rounded-full text-black">
                Y {/* Initials of the user */}
              </div>
              <div className="bg-gray-800 p-4 rounded-md flex-1">
                <p>What is UI UX?</p>
              </div>
            </div>

            {/* Response */}
            <div className="mt-6 flex items-start space-x-3">
              <div className="bg-gray-600 p-3 rounded-full">
                {/* Icon for response */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className="w-6 h-6 text-white"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 16h-1v-4h-1m1 4v-4m0-4h-1m0 4h-1v-4h1m0 4h1m1-4h1m0 4h-1"
                  />
                </svg>
              </div>
              <div className="bg-gray-800 p-4 rounded-md flex-1">
                <p>
                  UI/UX stands for User Interface (UI) and User Experience (UX).
                  It refers to the design and overall experience a user has when
                  interacting with a digital product...
                </p>
              </div>
            </div>

            {/* Regenerate response button */}
            <div className="mt-6 flex justify-end">
              <button className="bg-green-600 text-black px-4 py-2 rounded-md">
                Regenerate Response
              </button>
            </div>

            {/* Input Area */}
            <div className="mt-6">
              <textarea
                placeholder="Send a message"
                className="w-full p-4 bg-gray-700 text-white rounded-md"
              />
              <button className="bg-green-600 text-black px-4 py-2 mt-2 rounded-md">
                Send
              </button>
            </div>
          </main>
        </div>
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

export default History;
