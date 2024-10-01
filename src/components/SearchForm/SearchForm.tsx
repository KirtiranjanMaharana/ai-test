import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import SubmitButton from "../SubmitButton/SubmitButton";
import "./SearchForm.css";
import API_BASE_URL from "../../config.ts"; // Import the API base URL
import Spinner from "../Spinner/Spinner";
// import { fetchAuthSession } from "aws-amplify/auth";
import { EventSourcePolyfill } from "event-source-polyfill";
import { useTranslation } from "react-i18next";
import FeaturesSection from "../FeaturesSection/FeaturesSection.tsx";

const SearchForm: React.FC = () => {
  const [query, setQuery] = useState<string>("");
  // const [language, setLanguage] = useState<string>("KOREAN");
  // const [collectionType, setCollectionType] = useState<string>("LAYOUT_AWARE");
  // const [collectionTypes, setCollectionTypes] = useState<string[]>([]); // Store collection types from API
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const { t } = useTranslation();

  const { pathname } = useLocation();

  const [retrievedChunks, setRetrievedChunks] = useState<any[]>([]);
  const [generatedResponse, setGeneratedResponse] = useState<string | null>(
    null
  ); // Store generated response
  const [chatStrid, setChatStrid] = useState<string | null>(null); // Store the chat_strid

  const navigate = useNavigate();

  // // Fetch collection types from API on component mount
  // useEffect(() => {
  //   const fetchCollectionTypes = async () => {
  //     try {
  //       const response = await axios.get(`${API_BASE_URL}/list_collection_types`);
  //       setCollectionTypes(response.data.collection_types); // Populate the collection types
  //     } catch (error) {
  //       console.error("Error fetching collection types:", error);
  //       setError("Failed to fetch collection types.");
  //     }
  //   };

  //   fetchCollectionTypes();
  // }, []);

  useEffect(() => {
    if (retrievedChunks.length > 0 || generatedResponse) {
      setLoading(false);
      // only navigate if there is either retrievedChunks or generatedResponse
      navigate("/result", {
        state: {
          retrieved_chunks: retrievedChunks,
          generated_response: generatedResponse,
          original_query: query,
          chatStrid,
        },
      });
    }
  }, [retrievedChunks, generatedResponse, navigate, query]);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    if (query === "") {
      setError("Please Enter something...");
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post(`${API_BASE_URL}/search`, {
        query: query,
        document_group_name: "test",
        collection_type: "LAYOUT_AWARE",
      });

      const chatStrid = response.data.chat_strid;
      if (!chatStrid) {
        throw new Error("Invalid chat_strid");
      }

      // Use setChatStrid here
      setChatStrid(chatStrid);
      // const session = await fetchAuthSession();

      // const idToken = session?.tokens?.idToken?.toString() || "";
      const eventSource = new EventSourcePolyfill(
        `${API_BASE_URL}/search?chat_strid=${chatStrid}`
        // {
        // headers: {
        // 'Authorization': `Bearer ${idToken}`
        // }
        // }
      );

      let dataReceived = 0;

      // Listen for streaming events
      eventSource.onmessage = (event) => {
        dataReceived += 1;
        const parsedData = JSON.parse(event.data);
        if (parsedData.status === "failure") {
          console.error(`Service failed: ${parsedData.fail_reason}`);
          setError(`Service failed: ${parsedData.fail_reason}`);
          eventSource.close(); // Stop listening since it failed
          setLoading(false);
          return;
        }

        if (dataReceived === 3) {
          setRetrievedChunks(parsedData.retrieved_chunks);
          console.log("Updated retrievedChunks:", parsedData.retrieved_chunks);
        }
        if (dataReceived === 4) {
          setGeneratedResponse(parsedData.generated_answer); // Corrected key name
        }

        // Once both retrievedChunks and generatedResponse are available, navigate to the result page
        if (dataReceived === 4) {
          eventSource.close();
        }
      };

      eventSource.onerror = (error) => {
        console.error("Error with SSE connection:", error);
        setError("Failed to fetch results. Please try again.");
        eventSource.close();
        setLoading(false);
      };
    } catch (err) {
      setError("Failed to fetch results. Please try again.");
      setLoading(false);
    } finally {
      // setLoading(false);
    }
  };

  return (
    <div className="form-container">
      <form onSubmit={onSubmit}>
        <div className="input-wrapper">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t("homeSearchPlaceHolder")}
            className="search-input"
          />

          {/* Submit Button */}
          <div className="submit-button">
            {loading ? (
              <div style={{ marginRight: "1rem" }}>
                <Spinner />
              </div>
            ) : (
              <SubmitButton />
            )}
          </div>
        </div>
      </form>

      <div style={{ height: "2rem" }}>
        {error && <p className="error">{error}</p>}
      </div>
      {pathname === "/" && <FeaturesSection />}
    </div>
  );
};

export default SearchForm;
