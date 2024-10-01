import React, { useRef, useState, useEffect } from "react";
import "./UploadPopup.css";
import axios from "axios";
import API_BASE_URL from "../../config";

interface UploadPopupProps {
  onClose: () => void;
  onUploadConfirm: (files: File[], category: string) => void;
  initialSelectedFiles: File[]; // New prop for initial files
}

const UploadPopup: React.FC<UploadPopupProps> = ({
  onClose,
  onUploadConfirm,
  initialSelectedFiles,
}) => {
  const [selectedFiles, setSelectedFiles] =
    useState<File[]>(initialSelectedFiles); // Initialize with passed files
  const [category, setCategory] = useState<string>("default");
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [uploading, setUploading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [documentGroups, setDocumentGroups] = useState<string[]>([]);
  const [dragging, setDragging] = useState(false);

  useEffect(() => {
    const fetchDocumentGroups = async () => {
      try {
        const response = await axios.get(
          `${API_BASE_URL}/list_document_groups`
        );
        setDocumentGroups(response.data.document_groups);
      } catch (error) {
        console.error("Error fetching document groups:", error);
      }
    };

    fetchDocumentGroups();
  }, []);

  const handleFileSelection = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files ? Array.from(event.target.files) : [];
    setSelectedFiles(files);
  };

  const handleCategoryChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setCategory(event.target.value);
  };

  const uploadFiles = async (files: File[], category: string) => {
    const formData = new FormData();

    files.forEach((file) => {
      formData.append("file", file);
    });

    formData.append("document_group_name", category);

    try {
      setUploading(true);
      setErrorMessage(null);

      const response = await axios.post(`${API_BASE_URL}/upload`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log("Upload success:", response.data);

      onUploadConfirm(files, category);
    } catch (error) {
      console.error("Error uploading files:", error);
      setErrorMessage("Failed to upload files. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  const handleConfirm = () => {
    if (selectedFiles.length > 0 && category !== "default") {
      uploadFiles(selectedFiles, category);
    } else {
      alert("Please select a file and a category.");
    }
  };

  const handleDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragging(false);
  };

  return (
    <div
      className={`popup-overlay ${dragging ? "dragging" : ""}`}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
    >
      <div className="popup-container">
        <h2>파일 업로드</h2>
        <div className="popup-body">
          {/* <div className="dropdown-container">
            <label htmlFor="category-select">
              <h3>문서 위치</h3>
            </label>
            <select
              className="category-select px-2"
              id="category-select"
              value={category}
              aria-placeholder="문서 그룹"
              onChange={handleCategoryChange}
            >
              <option value="default">문서 그룹</option>
              {documentGroups.map((group, index) => (
                <option key={index} value={group}>
                  {group}
                </option>
              ))}
            </select>
          </div> */}

          <div className="sm:col-span-3">
            <label
              htmlFor="doc-location"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              문서 위치
            </label>
            <div className="mt-2">
              <select
                id="category-select"
                value={category}
                name="doc-location"
                autoComplete="doc-location"
                onChange={handleCategoryChange}
                className="block px-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
              >
                <option disabled value="default">
                  문서 그룹
                </option>
                {documentGroups.map((group, index) => (
                  <option key={index} value={group}>
                    {group}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="">
            <label
              htmlFor="country"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              파일
            </label>
            <div className="mt-2">
              <div className="upload-button-and-text">
                <button
                  type="button"
                  className="upload-button-pop-up h-12"
                  onClick={() => fileInputRef.current?.click()}
                >
                  파일 선택
                </button>
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileSelection}
                  multiple
                  style={{ display: "none" }}
                />
                <p>
                  {selectedFiles.length > 0
                    ? `${selectedFiles.length} 파일 선택됨`
                    : "선택된 파일 없음"}
                </p>
              </div>
            </div>
          </div>

          {selectedFiles.length > 0 && (
            <div className="selected-files flex gap-1 text-violet-800">
              <p>선택된 파일:</p>
              <ul>
                {selectedFiles.map((file, index) => (
                  <li key={index}>{file.name}</li>
                ))}
              </ul>
            </div>
          )}

          {uploading && <p>업로드 중...</p>}
          {errorMessage && <p className="error-message">{errorMessage}</p>}
        </div>

        <div className="popup-footer">
          {/* <button className="confirm-button"></button>
          <button className="cancel-button"></button> */}

          <div className="flex gap-4">
            <button
              onClick={handleConfirm}
              disabled={uploading}
              className="px-6 py-2 min-w-[150px] h-12 text-center text-white bg-[var(--color-primary-dark-blue)] border border-violet-600 rounded active:text-violet-500 hover:bg-violet-100 hover:text-violet-600 focus:outline-none focus:ring"
            >
              {uploading ? "업로드 중..." : "업로드"}
            </button>

            <button
              onClick={onClose}
              disabled={uploading}
              className="px-6 py-2 min-w-[150px] h-12  text-center text-violet-600 border border-violet-600 rounded hover:bg-violet-300 hover:text-white active:bg-indigo-500 focus:outline-none focus:ring"
            >
              취소
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UploadPopup;
