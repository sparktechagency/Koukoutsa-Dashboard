import { IoChevronBack } from "react-icons/io5";
import { TbEdit } from "react-icons/tb";
import { Link } from "react-router-dom";
import { Spin } from "antd"; // Importing Spin
import { useGetPrivacyPolicyQuery } from "../../redux/features/setting/settingApi";

// Decode HTML entities to actual HTML
const decodeHtmlEntities = (html) => {
  const doc = new DOMParser().parseFromString(html, "text/html");
  return doc.documentElement.textContent;
};

const PrivacyPolicyPage = () => {
  const { data: privacyPolicy, isLoading } = useGetPrivacyPolicyQuery();

  const privacyPolicyContent = privacyPolicy?.data?.attributes?.content;

  // Debugging: Log the raw content to see if it's HTML entities
  console.log("Privacy Policy Content (Raw):", privacyPolicyContent);

  // Decode HTML entities first, then render HTML content
  const decodedContent = privacyPolicyContent ? decodeHtmlEntities(privacyPolicyContent) : "";

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
          {/* Display Privacy Policy Content with HTML formatting */}
          {decodedContent ? (
            <div dangerouslySetInnerHTML={{ __html: decodedContent }} /> // Render HTML content directly
          ) : (
            <p>No privacy policy available.</p> // Optional: Handle case if no content is available
          )}
        </div>
      )}
    </section>
  );
};

export default PrivacyPolicyPage;
