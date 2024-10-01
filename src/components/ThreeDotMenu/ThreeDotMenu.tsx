import React, { useEffect, useRef, useState } from "react";
import { PiDotsThreeVerticalBold } from "react-icons/pi"; // Assuming you're using this icon library

interface ThreeDotMenuProps {
  onDownload: () => void;
  onDelete: () => void;
}

const ThreeDotMenu: React.FC<ThreeDotMenuProps> = ({
  onDownload,
  onDelete,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const handleToggleMenu = () => {
    setIsOpen((prevIsOpen) => !prevIsOpen);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="text-lg text-center relative" ref={dropdownRef}>
      {/* Three dot icon to toggle the menu */}
      <div
        className="cursor-pointer hover:bg-gray-300 w-fit rounded-full p-1"
        onClick={handleToggleMenu}
      >
        <PiDotsThreeVerticalBold size={20} />
      </div>

      {/* Conditional rendering for the options menu */}
      {isOpen && (
        <div className="bg-white border text-gray-700 shadow-md rounded text-sm absolute mt-12 top-0 right-0 min-w-full w-48 z-30">
          <div className="bg-white overflow-auto rounded w-full relative z-10">
            <ul className="list-reset">
              <li
                className="px-4 py-2 flex hover:bg-gray-100 no-underline hover:no-underline transition-colors duration-100 cursor-pointer"
                onClick={(e) => {
                  e.preventDefault();
                  onDownload(); // Trigger the download
                  setIsOpen(false); // Close menu after click
                }}
              >
                <span className="inline-block">Download</span>
              </li>

              <li
                className="px-4 py-2 flex hover:bg-gray-100 no-underline hover:no-underline transition-colors duration-100 cursor-pointer"
                onClick={(e) => {
                  e.preventDefault();
                  onDelete();
                  setIsOpen(false); // Close menu after click
                }}
              >
                <span className="inline-block">Delete</span>
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default ThreeDotMenu;
