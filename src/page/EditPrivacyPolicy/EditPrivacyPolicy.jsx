import { IoChevronBack } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import { useState, useRef } from "react";
import { Form, message } from "antd";
import { useUpdatePrivacyPolicyAllMutation } from "../../redux/features/setting/settingApi";
import { Editor } from "@toast-ui/react-editor";
import "@toast-ui/editor/dist/toastui-editor.css";

const EditPrivacyPolicy = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const editorRef = useRef();

  const [updatePrivacyPolicy, { isLoading }] = useUpdatePrivacyPolicyAllMutation();

  // No controlled state, get content from editor on submit
  const handleSubmit = async () => {
    const content = editorRef.current.getInstance().getHTML();
    console.log("Updated Privacy Policy Content:", content);

    try {
      const res = await updatePrivacyPolicy({ privacyPolicy: content }).unwrap();
      if (res?.success) {
        message.success(res?.message);
        navigate("/settings/privacy-policy");
      }
    } catch (error) {
      console.error("Error updating privacy policy:", error);
      message.error("Failed to update privacy policy");
    }
  };

  return (
    <section className="w-full h-full min-h-screen ">
      {/* Header Section */}
      <div className="flex justify-between items-center py-5">
        <Link to="/settings" className="flex gap-4 items-center">
          <IoChevronBack className="text-2xl" />
          <h1 className="text-2xl font-semibold">Privacy Policy</h1>
        </Link>
      </div>

      {/* Form Section */}
      <div className="w-full p-6 rounded-lg shadow-md">
        <Form form={form} layout="vertical" onFinish={handleSubmit}>
          {/* Toast UI Editor */}
          <Form.Item>
            <Editor
              initialValue="<p>Write your privacy policy here...</p>"
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

export default EditPrivacyPolicy;
