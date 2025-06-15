import React, { useState } from 'react';
import { Pie } from '@ant-design/charts';
import { Select } from 'antd';
import { useGetUserAndIncomeQuery } from '../../../redux/features/dashboard/dashboardApi';

// Sample raw data for the months
const rawData = {
  august: { users: 15457, collaborators: 9457, month: 'August' },
  september: { users: 10457, collaborators: 11457, month: 'September' },
};

const Piechart = () => {
  const [month, setMonth] = useState('august');
  const mainData = rawData[month]; // Get data for the selected month


  const { data: response } = useGetUserAndIncomeQuery();
 
  const rawData2 = response?.data?.attributes;

  console.log(rawData2);


  // Pie chart configuration
  const config = {
    data: [
      { type: 'Income', value: rawData2?.totalIncome },
      { type: 'Total User', value: rawData2?.totalUsers },
    ],
    angleField: 'value',
    colorField: 'type',
    innerRadius: 0.6,
    label: {
      text: 'value',
      style: {
        fontWeight: 'bold',
      },
    },

    annotations: [
      {
        type: 'text',
        style: {
          // text: 'AntV\nCharts',
          x: '50%',
          y: '50%',
          textAlign: 'center',
          fontSize: 40,
          fontStyle: 'bold',
        },
      },
    ],
  };
  // Handle month change (from dropdown)
  const handleChange = (value) => {
    setMonth(value);
  };

  return (
    <div className="w-full col-span-full md:col-span-2 bg-white rounded-lg border border-primary p-5">
      <div className="">

        <div className="w-full">
          {/* Render the Pie Chart */}
          <Pie {...config} />
        </div>
      </div>


    </div>
  );
};

export default Piechart;
