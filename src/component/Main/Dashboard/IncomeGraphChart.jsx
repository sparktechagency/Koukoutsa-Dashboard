/* eslint-disable react/prop-types */
import { DatePicker } from "antd";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useGetIncomeRatioQuery } from "../../../redux/features/dashboard/dashboardApi";

// Custom Tooltip for the AreaChart
const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="custom-tooltip bg-white p-2 border border-gray-300 rounded shadow-lg">
        <p className="label font-semibold">{`Month: ${label}`}</p>
        <p className="intro">{`Total Income: $${payload[0].value.toLocaleString()}`}</p>
      </div>
    );
  }

  return null;
};

const IncomeGraphChart = () => {
  // Raw data (replace this with your actual raw data)
  const data = [
    { month: "Jan", income: 5000 },
    { month: "Feb", income: 4000 },
    { month: "Mar", income: 7000 },
    { month: "Apr", income: 8000 },
    { month: "May", income: 9000 },
    { month: "Jun", income: 10000 },
    { month: "Jul", income: 11000 },
    { month: "Aug", income: 10000 },
    { month: "Sep", income: 9000 },
    { month: "Oct", income: 14000 },
    { month: "Nov", income: 15000 },
    { month: "Dec", income: 16000 },
  ];

  const { data: response } = useGetIncomeRatioQuery();
 
  const rawData = response?.data?.attributes;



  return (
    <section className="w-full flex items-center justify-center md:col-span-4 bg-white rounded-lg border border-[#ffd400]">


      <ResponsiveContainer className="pr-4 h-auto pb-10" width="100%" height={450}>
        <AreaChart
          data={rawData} // Using raw data directly
          margin={{
            top: 1,
            bottom: 1,
          }}
          className="md:mt-5 md:mb-5"
        >
          <CartesianGrid strokeDasharray="3 3" />
          {/* <XAxis dataKey="month" /> */}
          <YAxis />
          <Tooltip content={<CustomTooltip />} />
          <Area
            type="monotone"
            dataKey="amount"
            stroke="#ffd400"
            fill="#ffd400"
            strokeWidth={2}
          />
        </AreaChart>
      </ResponsiveContainer>
    </section>
  );
};

export default IncomeGraphChart;
