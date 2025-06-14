import { IoChevronBack } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import { Form, message } from "antd";
import { useGetTermsAndConditionsQuery, useUpdateTramsAndConditionsAllMutation } from "../../redux/features/setting/settingApi";
import { Editor } from "@toast-ui/react-editor";
import "@toast-ui/editor/dist/toastui-editor.css";

const EditTermsConditions = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const editorRef = useRef();

  // Fetch the terms and conditions data
  const { data: termsAndConditions, refetch } = useGetTermsAndConditionsQuery();

  // Extract the terms content
  const termsAndConditionsContent = termsAndConditions?.data?.attributes?.content;

  // Mutation to update terms and conditions
  const [updateTramsAndCondition, { isLoading }] = useUpdateTramsAndConditionsAllMutation();

  // Utility function to convert HTML to plain text
  const convertHtmlToText = (html) => {
    const doc = new DOMParser().parseFromString(html, "text/html");
    return doc.body.textContent || "";
  };

  // Set the editor's content when the data is loaded
  useEffect(() => {
    if (termsAndConditionsContent) {
      // Convert HTML content to plain text
      const plainTextContent = convertHtmlToText(termsAndConditionsContent);
      // Set the content into the editor
      editorRef.current?.getInstance().setHTML(plainTextContent);
    }
  }, [termsAndConditionsContent]);

  // Handle form submission
  const handleSubmit = async () => {
    // Get the HTML content from the editor
    const content = editorRef.current.getInstance().getHTML();
    console.log("Updated Terms and Conditions Content:", content);

    if (!content || content === "<p><br></p>") {
      message.error("Please enter Terms and Conditions content");
      return;
    }

    try {
      const res = await updateTramsAndCondition({ content }).unwrap();
      console.log(res);
      if (res?.code === 200) {
        message.success(res?.message);
        navigate("/settings/terms-conditions");
      }
    } catch (error) {
      console.error("Error updating Terms and Conditions:", error);
      message.error("Failed to update Terms and Conditions");
    }
  };

  return (
    <section className="w-full h-full min-h-screen">
      {/* Header Section */}
      <div className="flex justify-between items-center py-5">
        <Link to="/settings" className="flex gap-4 items-center">
          <IoChevronBack className="text-2xl" />
          <h1 className="text-2xl font-semibold">Terms and Conditions</h1>
        </Link>
      </div>

      {/* Form Section */}
      <div className="w-full p-6 rounded-lg shadow-md">
        <Form form={form} layout="vertical" onFinish={handleSubmit}>
          <Form.Item>
            <Editor
              previewStyle="vertical"
              height="300px"
              initialEditType="wysiwyg"
              useCommandShortcut={true}
              ref={editorRef}
            />
          </Form.Item>

          {/* Update Button */}
          <div className="w-full flex justify-end mt-20 md:mt-16">
            <button
              type="submit"
              className="bg-primary text-white text-xl gap-2 py-2 px-8 rounded-md font-bold"
              disabled={isLoading}
            >
              {isLoading ? "Updating..." : "Update"}
            </button>
          </div>
        </Form>
      </div>
    </section>
  );
};

export default EditTermsConditions;
