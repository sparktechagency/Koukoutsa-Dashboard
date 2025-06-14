import { IoChevronBack } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import { Button, Form, message } from "antd";
import { useEffect, useRef } from "react";
import { useGetAboutUsQuery, useUpdateAboutUsMutation } from "../../redux/features/setting/settingApi";
import { Editor } from "@toast-ui/react-editor";
import "@toast-ui/editor/dist/toastui-editor.css";

// Utility function to strip HTML tags and return plain text
const stripHtmlTags = (html) => {
  const doc = new DOMParser().parseFromString(html, "text/html");
  return doc.body.textContent || ""; // Return only the plain text
};

const EditAboutUs = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const editorRef = useRef();

  // Fetch About Us data
  const { data: aboutUs, isFetching } = useGetAboutUsQuery();
  const settingsDataContent = aboutUs?.data?.attributes?.content; // Ensure we get only the content

  // Mutation for updating About Us content
  const [updateAboutUs, { isLoading }] = useUpdateAboutUsMutation();

  // Set initial content in the editor when data arrives (strip HTML tags)
  useEffect(() => {
    if (settingsDataContent && editorRef.current) {
      const plainTextContent = stripHtmlTags(settingsDataContent);  // Strip HTML tags
      editorRef.current.getInstance().setHTML(plainTextContent);  // Set plain text in editor
    }
  }, [settingsDataContent]);

  // Handle form submission
  const handleSubmit = async () => {
    if (!editorRef.current) return;

    // Get the plain text content from the editor
    const content = editorRef.current.getInstance().getHTML();

    // Strip the HTML tags before submitting
    const plainText = stripHtmlTags(content);

    // Check if the content is empty or just a placeholder
    if (!plainText || plainText === "") {
      message.error("Please enter About Us content");
      return;
    }

    try {
      const res = await updateAboutUs({ content: plainText }).unwrap();
      if (res?.code === 200) {
        message.success(res?.message);
        navigate("/settings/about-us");
      }
    } catch (error) {
      console.error(error);
      message.error("Failed to update About Us.");
    }
  };

  return (
    <section className="w-full h-full min-h-screen">
      {/* Header Section */}
      <div className="flex justify-between items-center py-5">
        <Link to="/settings" className="flex gap-4 items-center">
          <IoChevronBack className="text-2xl" />
          <h1 className="text-2xl font-semibold">About Us</h1>
        </Link>
      </div>

      {/* Form Section */}
      <div className="w-full p-6 rounded-lg shadow-md">
        <Form form={form} layout="vertical" onFinish={handleSubmit}>
          <Form.Item>
            {/* Use the Toast UI Editor */}
            <Editor
              previewStyle="vertical"
              height="300px"
              initialEditType="wysiwyg"
              useCommandShortcut={true}
              ref={editorRef} // Referencing the editor
            />
          </Form.Item>

          {/* Update Button */}
          <div className="flex justify-end md:mt-16 mt-20">
            <Button
              type="primary"
              htmlType="submit"
              className="bg-primary text-white px-5 text-xl py-2 rounded-md"
              loading={isLoading || isFetching} // Show loading state when fetching or updating
            >
              {isLoading || isFetching ? "Updating..." : "Update"}
            </Button>
          </div>
        </Form>
      </div>
    </section>
  );
};

export default EditAboutUs;
