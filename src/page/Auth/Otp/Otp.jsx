import otpImage from "/public/Auth/otp.png";
import { Link, useNavigate, useParams } from "react-router-dom";
import authLogo from "/Auth/authLogo.png";
import { IoIosArrowBack } from "react-icons/io";
import OTPInput from "react-otp-input";
import { useState } from "react";
import { useForgotPasswordMutation, useVerifyEmailMutation } from "../../../redux/features/auth/authApi";
import { toast } from "sonner";

const Otp = () => {
  const [otp, setOtp] = useState("");
  const { email } = useParams();
  const navigate = useNavigate();
  const [forgotPassword] = useForgotPasswordMutation();
  const [verifyOtp, { isLoading }] = useVerifyEmailMutation();

  const handleOtpChange = (otpValue) => {
    setOtp(otpValue);
  };

  const handleMatchOtp = async () => {
    try {
      const res = await verifyOtp({ otp }).unwrap();
      if (res.error) {
        toast.error(res?.error?.data?.message);
      }
      if (res) {
        localStorage.setItem("jwtToken", res?.changePasswordToken);
        toast.success(res?.data?.message);
        navigate(`/auth/new-password/${email}`);
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  const handleResendPassword = async () => {
    try {
      const res = await forgotPassword({ email });
      if (res.error) {
        toast.error(res?.error?.data?.message);
      }
      if (res.data) {
        toast.success(res.data.message);
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
            <h1 className="font-semibold text-3xl text-gray-800">Verify</h1>
            <p className="text-gray-500">
              We'll send a verification code to your email. Check your inbox and enter the code here.
            </p>
          </div>

          {/* OTP Input */}
          <OTPInput
            value={otp}
            onChange={handleOtpChange}
            numInputs={6}
            renderInput={(props) => <input {...props} />}
            containerStyle="otp-container"
            inputStyle={{
              width: "100%",
              maxWidth: "6.5rem",
              height: "3rem",
              margin: "0 0.5rem",
              fontSize: "2rem",
              fontWeight: "bold",
              border: "1px solid #ffd400",
              textAlign: "center",
              outline: "none",
            }}
          />

          {/* Verify Button */}
          <div onClick={handleMatchOtp} className="mt-5">
            <button
              loading={isLoading}
              type="button"
              className={`w-full ${isLoading ? 'bg-gray-400' : 'bg-primary'} text-xl font-semibold text-white rounded-md py-2`}
              disabled={isLoading}
            >
              {isLoading ? "Verifying..." : "Verify"}
            </button>
          </div>

          {/* Resend OTP */}
          <div className="flex justify-between items-center my-4">
            <h1>Didn’t receive code?</h1>
            <button
              onClick={handleResendPassword}
              className="text-[#4c7e95]"
            >
              Resend OTP
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Otp;
