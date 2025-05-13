import React, { useState } from 'react';
import { Pie } from '@ant-design/charts';
import { Select } from 'antd';

// Sample raw data for the months
const rawData = {
  august: { users: 15457, collaborators: 9457, month: 'August' },
  september: { users: 10457, collaborators: 11457, month: 'September' },
};

const Piechart = () => {
  const [month, setMonth] = useState('august');
  const mainData = rawData[month]; // Get data for the selected month



  // Pie chart configuration
  const config = {
    data: [
      { type: 'Resent-Used', value: 27 },
      { type: 'Income', value: 25 },
      { type: 'Total new User', value: 18 }
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
    // legend: {
    //   color: {
    //     title: false,
    //     position: 'right',
    //     rowPadding: 5,
    //   },
    // },
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
    <div className="w-full col-span-full md:col-span-2 bg-white rounded-lg border border-[#FF9800] p-5">
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
