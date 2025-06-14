import { IoChevronBack } from "react-icons/io5";
import { Link } from "react-router-dom";
import { TbEdit } from "react-icons/tb";
import { Spin, message } from "antd"; // Importing Spin and message
import { useGetTermsAndConditionsQuery } from "../../redux/features/setting/settingApi";
import { useEffect } from "react";

const TermsconditionPage = () => {
  // Fetching terms and conditions data using React Query
  const { data: termsAndConditions, isLoading, isError } = useGetTermsAndConditionsQuery();

  const termsAndConditionsContent = termsAndConditions?.data?.attributes?.content;

  // Handle error state if data fetching fails
  useEffect(() => {
    if (isError) {
      message.error("Failed to load Terms and Conditions");
    }
  }, [isError]);

  return (
    <section className="w-full h-full min-h-screen">
      {/* Header Section */}
      <div className="flex justify-between items-center py-5">
        <Link to="/settings" className="flex gap-4 items-center">
          <IoChevronBack className="text-2xl" />
          <h1 className="text-2xl font-semibold">Terms of Conditions</h1>
        </Link>

        {/* Dynamic link to the edit page using the ID */}
        <Link to={`/settings/edit-terms-conditions/${termsAndConditions?.data?.id}`}>
          <button
            className="bg-primary text-white flex items-center gap-2 p-2 rounded-md font-bold"
            border
          >
            <TbEdit className="size-5" />
            <span>Edit</span>
          </button>
        </Link>
      </div>

      {/* Show Spin loader if data is loading */}
      {isLoading ? (
        <div className="flex justify-center items-center h-screen">
          <Spin size="large" />
        </div>
      ) : (
        <div className="w-full h-full ml-3">
          {/* Display content if available */}
          {termsAndConditionsContent ? (
            <div dangerouslySetInnerHTML={{ __html: termsAndConditionsContent }} />
          ) : (
            <p>No Terms and Conditions available.</p> // Fallback message if no content is available
          )}
        </div>
      )}
    </section>
  );
};

export default TermsconditionPage;
