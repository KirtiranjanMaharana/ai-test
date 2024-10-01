import React, { useState } from "react";
import styles from "./Avatar.module.css";
import { useNavigate } from "react-router-dom";
import LogoutModal from "../../shared/Modals/LogoutModal";

interface AvatarProps {
  src: string;
  alt?: string;
  size?: string;
}

const Avatar: React.FC<AvatarProps> = ({
  src,
  alt = "Avatar",
  size = "50px",
}) => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen((prev) => !prev);
  };

  const handleProfileClick = () => {
    // Handle profile click action
    console.log("My Profile clicked");
    navigate("/profile");
    setDropdownOpen(false); // Close dropdown
  };

  const handleLogoutClick = () => {
    // Handle logout action
    console.log("Logout clicked");
    setIsModalOpen(true);
    setDropdownOpen(false); // Close dropdown
  };

  const handleDelete = (fileIndex: number) => {
    console.log(`Deleting file at index: ${fileIndex}`);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => setIsModalOpen(false);

  return (
    <div className="relative ">
      <div
        className="w-8 h-8 rounded-md cursor-pointer"
        onClick={toggleDropdown}
      >
        <img
          className="rounded-md"
          src={src}
          alt={alt}
          loading="lazy"
          // style={{ width: size, height: size }}
        />
      </div>
      {isDropdownOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10 border">
          <ul className="py-1">
            <li
              className="px-4 py-2 text-gray-700 hover:bg-gray-200 cursor-pointer"
              onClick={handleProfileClick}
            >
              My Profile
            </li>
            <li
              className="px-4 py-2 text-gray-700 hover:bg-gray-200 cursor-pointer"
              onClick={handleLogoutClick}
            >
              Logout
            </li>
          </ul>
        </div>
      )}

      <LogoutModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onDelete={handleDelete}
      />
    </div>
  );
};

export default Avatar;
