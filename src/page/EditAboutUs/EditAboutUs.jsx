import { IoChevronBack } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import { Button, Form, message } from "antd";
import { useEffect, useRef, useState } from "react";
import { useGetAllSettingsQuery, useUpdateAboutUsMutation } from "../../redux/features/setting/settingApi";

import { Editor } from "@toast-ui/react-editor";
import "@toast-ui/editor/dist/toastui-editor.css";

const EditAboutUs = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const editorRef = useRef();

  const { data: settingsData, isFetching } = useGetAllSettingsQuery();
  const [updateAboutUs, { isLoading }] = useUpdateAboutUsMutation();

  // Set initial content in editor when data arrives
  useEffect(() => {
    if (settingsData?.aboutUs && editorRef.current) {
      editorRef.current.getInstance().setHTML(settingsData.aboutUs);
    }
  }, [settingsData]);

  const handleSubmit = async () => {
    if (!editorRef.current) return;

    const content = editorRef.current.getInstance().getHTML();

    if (!content || content === "<p><br></p>") {
      message.error("Please enter About Us content");
      return;
    }

    try {
      const res = await updateAboutUs({ aboutUs: content }).unwrap();
      if (res?.success) {
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
            <Editor
              initialValue="<p>Write your About Us content here...</p>"
              previewStyle="vertical"
              height="300px"
              initialEditType="wysiwyg"
              useCommandShortcut={true}
              ref={editorRef}
            />
          </Form.Item>

          {/* Update Button */}
          <div className="flex justify-end md:mt-16 mt-20">
            <Button
              type="primary"
              htmlType="submit"
              className="bg-primary text-white px-5 text-xl py-2 rounded-md"
              loading={isLoading || isFetching}
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
