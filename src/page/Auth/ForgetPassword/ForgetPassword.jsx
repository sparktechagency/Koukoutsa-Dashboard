/* eslint-disable react/no-unescaped-entities */
import forgetPasswordImage from "/public/Auth/forgot-password.png";
import authLogo from "/Auth/authLogo.png";
import { Link, useNavigate } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";
import { Form } from "antd";
import CustomInput from "../../../utils/CustomInput";
import { HiOutlineMail } from "react-icons/hi";
import CustomButton from "../../../utils/CustomButton";
import { useForgotPasswordMutation } from "../../../redux/features/auth/authApi";
import { toast } from "sonner";

const ForgetPassword = () => {
  const navigate = useNavigate();
  const [forgotPassword, { isLoading }] = useForgotPasswordMutation();

  const submit = async (values) => {
    try {
      const res = await forgotPassword(values);
      if (res.error) {
        toast.error(res?.error?.data?.message);
        console.log(res.error);
      }
      if (res.data) {
        toast.success(res.data.message);
        navigate(`/auth/otp/${values?.email}`);
        localStorage.setItem("email", values?.email);
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="w-full h-full md:h-screen md:flex relative justify-around items-center overflow-visible">
      {/* Background Images */}
      <img className="absolute -z-10 bottom-0 right-0 w-1/2" src="/Auth/1.png" alt="" />
      <img className="absolute -z-10 top-0 left-0 w-1/2" src="/Auth/2.png" alt="" />

      <div className="w-full md:w-1/4">
        <div className="mt-16 border border-primary rounded-lg p-5">
          <div className="mb-8">
            <img src={authLogo} className="w-[100px] mx-auto mb-5" alt="Auth Logo" />
            <h1 className="font-semibold text-3xl text-gray-800">
              Forgot Password
            </h1>
            <p className="text-gray-500">
              Enter the email address associated with your account. We'll send you a verification code to your email.
            </p>
          </div>

          {/* Ant Design Form */}
          <Form
            layout="vertical"
            onFinish={submit} // Ant Design form submission
            initialValues={{ email: "" }} // Set initial form values
          >
            {/* Email Input */}
            <Form.Item
              label="Email"
              name="email"
              rules={[
                {
                  required: true,
                  message: "Please input your email!",
                },
                {
                  type: "email",
                  message: "Please enter a valid email address!",
                },
              ]}
            >
              <CustomInput icon={HiOutlineMail} placeholder="Enter Email" />
            </Form.Item>

            {/* Submit Button */}
            <Form.Item>
              <button
                loading={isLoading}
                type="submit"
                className={`w-full ${isLoading ? 'bg-gray-400' : 'bg-primary'} text-xl font-semibold text-white rounded-md py-2`}
                disabled={isLoading} // Disable button during loading
              >
                {isLoading ? "Sending..." : "Send Verification Code"}
              </button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default ForgetPassword;
