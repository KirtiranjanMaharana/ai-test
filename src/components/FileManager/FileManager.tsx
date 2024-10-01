import React, { useState, useEffect } from "react";
import "./FileManager.css";
import ListIcon from "../../assets/Profile/List.tsx";
import GridIcon from "../../assets/Profile/Grid.tsx";
import { ReactComponent as PDFIcon } from "../../assets/Profile/PDFIcon.svg";
import { ReactComponent as ThreeDots } from "../../assets/Profile/ThreeDots.svg";
import API_BASE_URL from "../../config";
import axios from "axios";
import CustomSelect from "../../shared/CustomSelect/CustomSelect.tsx";
import { PiDotsThreeVerticalBold } from "react-icons/pi";
import ThreeDotMenu from "../ThreeDotMenu/ThreeDotMenu.tsx";
import DeleteModal from "../../shared/Modals/DeleteModal.tsx";
import Spinner from "../Spinner/Spinner.tsx";

interface FileUpload {
  name: string;
  documentGroup: string;
  uploadDate: Date;
  status: string;
}

const FileManager: React.FC = () => {
  const [files, setFiles] = useState<FileUpload[]>([]);
  const [sortOrder, setSortOrder] = useState<string>("latest");
  const [view, setView] = useState<"list" | "grid">("list");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const sortByOptions = [
    { value: "latest", label: "정렬 기준" },
    { value: "earliest", label: "Earliest Uploaded" },
    { value: "az", label: "Alphabetical A-Z" },
    { value: "za", label: "Alphabetical Z-A" },
  ];

  const FilterByOptions = [
    { value: "complete", label: "완료" },
    { value: "uploading", label: "업로드 중" },
    { value: "failure", label: "실패" },
  ];

  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [selecteFilterOption, setSelectedFilterOption] = useState<string[]>([]);

  const handleFilterSelect = (values: string[]) => {
    setSelectedFilterOption(values);
    setErrorMsg("");
  };

  const parseTimestamp = (timestamp: string) => {
    const year = parseInt(timestamp.slice(0, 4), 10);
    const month = parseInt(timestamp.slice(4, 6), 10) - 1; // JS months are 0-based
    const day = parseInt(timestamp.slice(6, 8), 10);
    const hour = parseInt(timestamp.slice(9, 11), 10);
    const minute = parseInt(timestamp.slice(11, 13), 10);
    const second = parseInt(timestamp.slice(13, 15), 10);

    return new Date(year, month, day, hour, minute, second);
  };

  // Fetch files from API on component mount
  useEffect(() => {
    const fetchFiles = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `${API_BASE_URL}/list_recent_file_uploads`
        );
        const fetchedFiles = response.data.documents.map((doc: any) => ({
          name: doc.original_name,
          documentGroup: doc.document_group_name,
          uploadDate: parseTimestamp(doc.timestamp), // Replace _ with - for proper Date parsing
          status: doc.status,
        }));
        setFiles(fetchedFiles);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching files:", error);
        setLoading(false);
      }
    };

    fetchFiles();
  }, []);

  // Function to handle sort order change
  const handleSortChange = (option: string) => {
    setErrorMsg("");
    setSortOrder(option);
    setSelectedOption(option);
  };

  // Function to sort files
  const sortedFiles = () => {
    return [...files].sort((a, b) => {
      switch (sortOrder) {
        case "latest":
          return b.uploadDate.getTime() - a.uploadDate.getTime();
        case "earliest":
          return a.uploadDate.getTime() - b.uploadDate.getTime();
        case "az":
          return a.name.localeCompare(b.name);
        case "za":
          return b.name.localeCompare(a.name);
        default:
          return 0;
      }
    });
  };

  // Function to handle view change (list or grid)
  const handleViewChange = (viewType: "list" | "grid") => {
    setView(viewType);
    setErrorMsg("");
  };

  const handleDownload = (file: any) => {
    // Check if the file has a download URL or raw data
    if (file.downloadUrl) {
      // If it's a downloadable link from the server
      const link = document.createElement("a");
      link.href = file.downloadUrl;
      link.download = file.name;
      link.click();
    } else if (file.content) {
      // If the file content is available as Blob data
      const blob = new Blob([file.content], { type: "application/pdf" }); // Assuming PDF
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = file.name;
      link.click();
      URL.revokeObjectURL(link.href); // Clean up after download
    } else {
      setErrorMsg("No download URL or content available for this file");
      console.error("No download URL or content available for this file");
    }
  };

  const handleDelete = (fileIndex: number) => {
    console.log(`Deleting file at index: ${fileIndex}`);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => setIsModalOpen(false);

  // const handleDelete = () => {
  //   console.log("Item deleted");
  //   handleCloseModal(); // Close modal after deletion
  // };

  return (
    <div className="file-manager-container">
      <div className="file-manager-header">
        <div className="section-title">최근 업로드</div>
        <div className="header-buttons-container">
          {/* Filter By */}
          <CustomSelect
            options={FilterByOptions}
            value={selecteFilterOption}
            placeholder="필터"
            multiple={true}
            onChange={handleFilterSelect}
          />

          {/* sort By */}
          <CustomSelect
            options={sortByOptions}
            value={selectedOption || ""}
            onChange={handleSortChange}
            placeholder="정렬 기준"
          />

          <div className="view-buttons">
            <button
              className={`${view === "list" ? "bg-black" : "bg-black"}`}
              onClick={() => handleViewChange("list")}
            >
              <ListIcon />
            </button>
            <button onClick={() => handleViewChange("grid")}>
              <GridIcon />
            </button>
          </div>
        </div>
      </div>

      <div className="p-3 bg-white rounded-md">
        {loading ? (
          <div className="spinner-container flex justify-center min-h-[500px]">
            <Spinner />
          </div>
        ) : (
          <>
            {view === "list" && (
              <div className="overflow-x-auto min-h-[500px]">
                <table className="table-auto w-full">
                  <thead className="text-xs font-semibold uppercase text-gray-400 bg-gray-50">
                    <tr>
                      <th className="p-2 whitespace-nowrap">
                        <div className="font-semibold text-left">이름</div>
                      </th>
                      <th className="p-2 whitespace-nowrap">
                        <div className="font-semibold text-left">문서 그룹</div>
                      </th>
                      <th className="p-2 whitespace-nowrap">
                        <div className="font-semibold text-left">
                          업로드 날짜
                        </div>
                      </th>
                      <th className="p-2 whitespace-nowrap">
                        <div className="font-semibold text-center"></div>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="text-sm divide-y divide-gray-100">
                    {sortedFiles().map((file, index) => (
                      <tr key={index}>
                        <td className="p-2 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="w-10 h-10 flex-shrink-0 mr-2 sm:mr-3">
                              <div className="file-icon">
                                <PDFIcon />
                              </div>
                            </div>
                            <div className="font-medium text-gray-800">
                              {file.name}
                            </div>
                          </div>
                        </td>
                        <td className="p-2 whitespace-nowrap">
                          <div className="text-left">{file.documentGroup}</div>
                        </td>
                        <td className="p-2 whitespace-nowrap">
                          <div className="text-left font-medium text-green-500">
                            {file.uploadDate.toLocaleDateString()}
                          </div>
                        </td>
                        <td className="p-2 whitespace-nowrap">
                          <ThreeDotMenu
                            onDownload={() => handleDownload(file)} // Pass the file to the download handler
                            onDelete={() => handleDelete(index)}
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {errorMsg && (
                  <p className="text-red-500 my-3 flex justify-end">
                    {errorMsg}
                  </p>
                )}
              </div>
            )}
            {view === "grid" && (
              <>
                <div className="grid grid-cols-3 w-fit">
                  {sortedFiles().map((file, index) => (
                    <div className="p-4 ">
                      <div className="flex rounded-lg h-full  bg-gray-100 flex-col w-fit px-5 py-3">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <div className="w-10 h-10 flex-shrink-0 mr-2 sm:mr-3">
                              <div className="file-icon">
                                <PDFIcon />
                              </div>
                            </div>
                            <div className="font-medium text-gray-800">
                              {file.name}
                            </div>
                          </div>
                          <ThreeDotMenu
                            onDownload={() => handleDownload(file)} // Pass the file to the download handler
                            onDelete={() => handleDelete(index)}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                {errorMsg && (
                  <p className="text-red-500 my-3 flex justify-end">
                    {errorMsg}
                  </p>
                )}
              </>
            )}
          </>
        )}
      </div>

      <DeleteModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onDelete={handleDelete}
      />
    </div>
  );
};

export default FileManager;
