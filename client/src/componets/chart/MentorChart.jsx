import ReactApexChart from 'react-apexcharts';
import { useState, useEffect } from 'react';
import { getMentorDashboardData } from '@/Api/services/adminServices';

const MentorChart = ({options , availableSessionSeries , bookedSessionSeries , completedSessionSeries , blogSeries }) => {
    
    return (
        <div id="mentor-chart" className="border rounded-lg bg-white w-full p-20">
            <ReactApexChart
                options={options}
                series={[availableSessionSeries, bookedSessionSeries, completedSessionSeries, blogSeries]}
                type="line"
                height={500}
            />
        </div>
    );
};

export default MentorChart;