import { FaDatabase } from "react-icons/fa";
import { PiCurrencyCircleDollar, PiUsers, PiUsersThreeFill } from "react-icons/pi";
import { useGetDashboardStatusAllQuery } from "../../../redux/features/dashboard/dashboardApi";
import { MdWavingHand } from "react-icons/md";
import { BsCardChecklist } from "react-icons/bs";
import { CiMoneyCheck1 } from "react-icons/ci";

const Status = () => {
  const { data, isLoading } = useGetDashboardStatusAllQuery();
  // console.log(data?.data?.attributes);
  const mainData = data?.data?.attributes;

  return (
    <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">

      <div className=" p-5 rounded-lg bg-yellow-100 border-2 border-yellow-300">
        <div className=" gap-2 flex items-center">
          <div className="rounded-lg bg-yellow-500 text-white p-3">
            <BsCardChecklist className="text-4xl" />
          </div>
          <h3 className="text-lg font-semibold text-gray-700">Total User</h3>
        </div>
        <div className="space-y-2 flex items-center gap-2 mt-3">
          <h1 className="text-4xl font-semibold text-gray-800">{mainData?.totalUsers || "00"}</h1>
          {/* <h1 className="text-sm text-gray-500">Last month total 1050</h1> */}
        </div>
      </div>
      <div className=" p-5 rounded-lg bg-yellow-100 border-2 border-yellow-300">
        <div className=" gap-2 flex items-center">
          <div className="rounded-lg bg-yellow-500 text-white p-3">
            <CiMoneyCheck1 className="text-4xl" />
          </div>
          <h3 className="text-lg font-semibold text-gray-700">Total Subscribers</h3>
        </div>
        <div className="space-y-2 flex items-center gap-2 mt-3">
          <h1 className="text-4xl font-semibold text-gray-800">{mainData?.totalSubscribers || "00"}</h1>
          {/* <h1 className="text-sm text-gray-500">Last month total  1050</h1> */}
        </div>
      </div>




    </div>
  );
};

export default Status;
