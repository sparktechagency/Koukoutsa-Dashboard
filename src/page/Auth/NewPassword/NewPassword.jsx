import changePasswordImage from "/public/Auth/update-password.png";
import authLogo from "/Auth/authLogo.png";
import { Link, useNavigate, useParams } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";
import { Form } from "antd"; // Import Ant Design Form
import CustomInput from "../../../utils/CustomInput";
import CustomButton from "../../../utils/CustomButton";
import { toast } from "sonner";
import { useResetPasswordMutation } from "../../../redux/features/auth/authApi";

const NewPassword = () => {
  const navigate = useNavigate();
  const { email } = useParams();
  const [resetPassword, { isLoading }] = useResetPasswordMutation();
  const jwtToken = localStorage.getItem("jwtToken");

  const submit = async (values) => {
    const { password, confirmPassword } = values;

    if (!password || !confirmPassword) {
      toast.error("Password is required");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }

    try {
      const res = await resetPassword({
        email,
        password
      });
      if (res.error) {
        toast.error(res.error.data.message);
      }
      if (res.data) {
        toast.success(res.data.message);
        navigate("/auth/login");
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="w-full h-full md:h-screen md:flex justify-around items-center overflow-visible">
      {/* Background Images */}
      <img className="absolute -z-10 bottom-0 right-0 w-1/2" src="/Auth/1.png" alt="" />
      <img className="absolute -z-10 top-0 left-0 w-1/2" src="/Auth/2.png" alt="" />

      <div className="w-full md:w-1/4">
        <div className="mt-16 border border-primary rounded-lg p-5">
          <div className="mb-8">
            <img src={authLogo} className="w-[100px] mx-auto mb-5" alt="Auth Logo" />
            <h1 className="font-semibold text-3xl text-gray-800">Update Password</h1>
            <p className="text-gray-500">
              Your password must be 8-10 character long.
            </p>
          </div>

          {/* Ant Design Form */}
          <Form
            layout="vertical"
            onFinish={submit} // Ant Design's form submission handler
            initialValues={{ password: "", confirmPassword: "" }} // Initial values
          >
            {/* CustomInput wrapped inside Form.Item for validation */}
            <Form.Item
              label="New Password"
              name="password"
              rules={[
                {
                  required: true,
                  message: "Please input your new password",
                },
              ]}
            >
              <CustomInput isPassword type="password" placeholder="Password" />
            </Form.Item>

            <Form.Item
              label="Confirm Password"
              name="confirmPassword"
              rules={[
                {
                  required: true,
                  message: "Please confirm your password",
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("password") === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(new Error("Passwords do not match!"));
                  },
                }),
              ]}
            >
              <CustomInput
                isPassword
                type="password"
                placeholder="Confirm Password"
              />
            </Form.Item>

            {/* CustomButton for submission */}
            <Form.Item>
              <button
                className={`w-full ${isLoading ? 'bg-gray-400' : 'bg-primary'} text-xl font-semibold text-white rounded-md py-2`}
                disabled={isLoading}
              >
                {isLoading ? "Updating..." : "Update Password"}
              </button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default NewPassword;
