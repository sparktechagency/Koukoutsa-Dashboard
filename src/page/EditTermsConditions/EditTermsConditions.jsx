import { IoChevronBack } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import { Form, message } from "antd";
import { useState, useRef, useEffect } from "react";
import { useUpdateTramsAndConditionsAllMutation } from "../../redux/features/setting/settingApi";

import { Editor } from "@toast-ui/react-editor";
import "@toast-ui/editor/dist/toastui-editor.css";

const EditTermsConditions = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const editorRef = useRef();

  const [updateTramsAndCondition, { isLoading }] = useUpdateTramsAndConditionsAllMutation();

  // Load existing Terms & Conditions HTML on mount and set it to editor
  useEffect(() => {
    const existingHtml = "<p>Your current terms and conditions content here</p>";

    if (editorRef.current && existingHtml) {
      editorRef.current.getInstance().setHTML(existingHtml);
    }
  }, []);

  const handleSubmit = async () => {
    const content = editorRef.current.getInstance().getHTML();
    console.log("Updated Terms and Conditions Content:", content);

    if (!content || content === "<p><br></p>") {
      message.error("Please enter Terms and Conditions content");
      return;
    }

    try {
      const res = await updateTramsAndCondition({ termsAndConditions: content }).unwrap();
      if (res?.success) {
        message.success(res?.message);
        navigate("/settings/terms-conditions");
      }
    } catch (error) {
      console.error(error);
      message.error("Failed to update Terms and Conditions");
    }
  };

  return (
    <section className="w-full h-full min-h-screen ">
      {/* Header Section */}
      <div className="flex justify-between items-center py-5">
        <Link to="/settings" className="flex gap-4 items-center">
          <IoChevronBack className="text-2xl" />
          <h1 className="text-2xl font-semibold">Terms of Conditions</h1>
        </Link>
      </div>

      {/* Form Section */}
      <div className="w-full p-6 rounded-lg shadow-md">
        <Form form={form} layout="vertical" onFinish={handleSubmit}>
          <Form.Item>
            <Editor
              initialValue="<p>Write your terms and conditions here...</p>"
              previewStyle="vertical"
              height="300px"
              initialEditType="wysiwyg"
              useCommandShortcut={true}
              ref={editorRef}
            />
          </Form.Item>

          {/* Update Button */}
          <div className="flex justify-end mt-20 md:mt-16">
            <button
              type="submit"
              disabled={isLoading}
              className="bg-primary text-white text-xl font-semibold px-5 py-3 rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
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
