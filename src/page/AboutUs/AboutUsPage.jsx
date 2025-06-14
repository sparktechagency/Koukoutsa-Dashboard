import { IoChevronBack } from "react-icons/io5";
import { Link } from "react-router-dom";
import { TbEdit } from "react-icons/tb";
import { Spin } from "antd"; // Importing Spin
import { useGetAboutUsQuery } from "../../redux/features/setting/settingApi";
import { useEffect } from "react";

const AboutUsPage = () => {
  // Fetch About Us data
  const { data: aboutUs, isLoading, refetch } = useGetAboutUsQuery();

  const aboutUsContent = aboutUs?.data?.attributes?.content; // Ensure we get only the content

  // Refetch data on component mount (optional, if necessary)
  useEffect(() => {
    refetch(); // Optionally, if you need to refetch the data on mount
  }, [refetch]);

  return (
    <section className="w-full h-full min-h-screen">
      {/* Header Section */}
      <div className="flex justify-between items-center py-5">
        <Link to="/settings" className="flex gap-4 items-center">
          <IoChevronBack className="text-2xl" />
          <h1 className="text-2xl font-semibold">About Us</h1>
        </Link>
        <Link to="/settings/edit-about-us/11">
          <button className="bg-primary text-white flex items-center gap-2 p-2 rounded-md font-bold">
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
          {/* Render HTML content */}
          {aboutUsContent ? (
            <div dangerouslySetInnerHTML={{ __html: aboutUsContent }} />
          ) : (
            <p>No About Us content available.</p>
          )}
        </div>
      )}
    </section>
  );
};

export default AboutUsPage;
