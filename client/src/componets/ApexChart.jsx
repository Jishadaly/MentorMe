import React from 'react';
import ReactApexChart from 'react-apexcharts';

const ApexChart = ({ userMonthlyData, mentorMonthlyData, slotMonthlyData, categories }) => {
  const series = [
    { name: 'Users', data: userMonthlyData },
    { name: 'Mentors', data: mentorMonthlyData },
    { name: 'Slots', data: slotMonthlyData },
  ];

  const options = {
    chart: {
      height: 350,
      type: 'area',
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: 'smooth',
    },
    xaxis: {
      type: 'datetime',
      categories: categories,
    },
    tooltip: {
      x: {
        format: 'dd/MM/yy HH:mm',
      },
    },
  };

  return (
    <div id="chart">
      <ReactApexChart options={options} series={series} type="area" height={350} />
    </div>
  );
};

export default ApexChart;
