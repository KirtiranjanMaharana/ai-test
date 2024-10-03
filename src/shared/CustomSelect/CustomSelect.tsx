import React, { useState, useEffect, useRef } from "react";
import { IoChevronDownOutline } from "react-icons/io5";

interface Option {
  value: string;
  label: string;
}
interface CustomSelectProps {
  options: Option[];
  value: string | string[];
  onChange: (value: string | string[]) => void;
  placeholder?: string;
  multiple?: boolean;
}

const CustomSelect: React.FC<CustomSelectProps> = ({
  options,
  value,
  onChange,
  placeholder = "Select an option",
  multiple = false,
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const selectRef = useRef<HTMLDivElement | null>(null);

  const toggleDropdown = (): void => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (optionValue: string): void => {
    if (multiple) {
      const selectedValues = Array.isArray(value) ? value : [];
      const isSelected = selectedValues.includes(optionValue);
      let updatedValues;

      if (isSelected) {
        // Remove the option if already selected
        updatedValues = selectedValues.filter((v) => v !== optionValue);
      } else {
        // Add the option if not selected
        updatedValues = [...selectedValues, optionValue];
      }
      onChange(updatedValues);
      // Call the parent-provided handler with updated values (for multiple)
    } else {
      onChange(optionValue);
      // Call the parent-provided handler with a single value

      setIsOpen(false);
      // Close dropdown after selection for single select
    }
  };

  // Close the dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent): void => {
      if (
        selectRef.current &&
        !selectRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    // Add event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Remove event listener on cleanup
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Helper function to display selected options
  const displayValue = (): string => {
    if (multiple && Array.isArray(value)) {
      if (value.length === 0) {
        return placeholder; // Show placeholder if no values selected
      }
      return options
        .filter((option) => value.includes(option.value))
        .map((option) => option.label)
        .join(", ");
    }
    const selectedOption = options.find((option) => option.value === value);
    return selectedOption ? selectedOption.label : placeholder;
  };

  return (
    <div className="relative" ref={selectRef}>
      <div
        className="w-fit min-w-52  bg-white rounded-md p-3 cursor-pointer flex justify-between items-center"
        onClick={toggleDropdown}
      >
        <span>{displayValue()}</span>
        <span
          className={`transform transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
        >
          <IoChevronDownOutline />
        </span>
      </div>

      {isOpen && (
        <div className="absolute left-0 right-0 mt-1 max-h-60 overflow-y-auto bg-white border border-gray-300 rounded-md shadow-lg z-10">
          {options.map((option) => (
            <div
              key={option.value}
              className={`p-2 flex items-center hover:bg-gray-100 cursor-pointer ${
                option.value === "complete"
                  ? "text-green-500"
                  : option.value === "failure"
                  ? "text-red-400"
                  : "text-yellow-800"
              } `}
              onClick={() => handleOptionClick(option.value)}
            >
              {multiple && (
                <input
                  type="checkbox"
                  checked={Array.isArray(value) && value.includes(option.value)}
                  onChange={() => handleOptionClick(option.value)}
                  className="mr-2"
                />
              )}
              <label>{option.label}</label>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CustomSelect;
