import { IoChevronBack } from "react-icons/io5";
import { TbEdit } from "react-icons/tb";
import { Link } from "react-router-dom";
import { Spin } from "antd"; // Importing Spin
import { useGetPrivacyPolicyQuery } from "../../redux/features/setting/settingApi";

const PrivacyPolicyPage = () => {

  const { data: privacyPolicy, isLoading } = useGetPrivacyPolicyQuery();

  const privacyPolicyContent = privacyPolicy?.data?.attributes?.content;

  // Function to convert HTML to plain text
  const convertHtmlToText = (html) => {
    const doc = new DOMParser().parseFromString(html, "text/html");
    return doc.body.textContent || ""; // Get text content, stripping HTML tags
  };

  // Convert HTML content to plain text if it exists
  const plainTextContent = privacyPolicyContent ? convertHtmlToText(privacyPolicyContent) : '';

  return (
    <section className="w-full h-full min-h-screen">
      <div className="flex justify-between items-center py-5">
        <Link to="/settings" className="flex gap-4 items-center">
          <IoChevronBack className="text-2xl" />
          <h1 className="text-2xl font-semibold">Privacy Policy</h1>
        </Link>
        <Link to="/settings/edit-privacy-policy">
          <button className="bg-primary text-white flex items-center gap-2 p-2 rounded-md font-bold" border>
            <TbEdit className="size-5" />
            <span>Edit</span>
          </button>
        </Link>
      </div>

      {/* Show Spin loader if data is loading */}
      {isLoading ? (
        <div className="w-full h-full flex justify-center items-center">
          <Spin size="large" />
        </div>
      ) : (
        <div className="w-full h-full ml-3">
          {/* Display Privacy Policy Content as Plain Text */}
          {plainTextContent ? (
            <div>{plainTextContent}</div> // Only plain text is rendered, no HTML tags
          ) : (
            <p>No privacy policy available.</p> // Optional: Handle case if no content is available
          )}
        </div>
      )}
    </section>
  );
};

export default PrivacyPolicyPage;
