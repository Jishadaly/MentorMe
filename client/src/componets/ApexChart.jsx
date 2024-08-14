import ReactApexChart from 'react-apexcharts';
import { useState, useEffect } from 'react';
import { getChartData } from '@/Api/services/adminServices';

const ApexChart = () => {
  const [userData, setUserData] = useState([]);
  const [blogData, setBlogData] = useState([]);
  const [slotData, setSlotData] = useState([]);
  const [mentorData, setMentorData] = useState([]);

  const [loading, setLoading] = useState(true);

  const options = {
    chart: {
      height: 350,
      type: "area",
    },
    stroke: {
      width: 5,
      curve: "smooth",
    },
    xaxis: {
      type: "datetime",
      labels: {
        formatter: function (value, timestamp, opts) {
          return opts.dateFormatter(new Date(value), "MMM yyyy");
        },
      },
    },
    title: {
      text: "User Growth, Blog, and Slot Creation",
      align: "left",
      style: {
        fontSize: "16px",
        color: "#666",
        
      },
    },
    fill: {
      type: "gradient",
      gradient: {
        shade: "dark",
        gradientToColors: ["#7E3AF2", "#3BA55D"],
        shadeIntensity: 1,
        type: "horizontal",
        opacityFrom: 1,
        opacityTo: 1,
        stops: [0, 100, 100, 100],
      },
    },
    yaxis: {
      min: 0,
    },
  };

  const fetchChartData = async () => {
    try {
      const response = await getChartData('admin/fetchChartData');
      const { slotCreationStats, blogtCreationStats, userJoinStatus  , mentorJoinStatus} = response;

      setUserData(userJoinStatus.map((item) => ({
        month: new Date(item._id).toISOString(),
        count: item.userCount,
      })));

      setMentorData(mentorJoinStatus.map((item) => ({
        month: new Date(item._id).toISOString(),
        count: item.mentorCount,
      })));

      setBlogData(blogtCreationStats.map((item) => ({
        month: new Date(item._id).toISOString(),
        count: item.blogCount,
      })));

      setSlotData(slotCreationStats.map((item) => ({
        month: new Date(item._id).toISOString(),
        count: item.slotCount,
      })));

      setLoading(false);
    } catch (error) {
      console.error('Error fetching chart data:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchChartData();
  }, []);

  const userSeries = {
    name: 'Users Joined',
    data: userData.map((data) => [new Date(data.month).getTime(), data.count]),
  };

  const mentorSeries = {
    name: 'Mentor Joined ',
    data: mentorData.map((data) => [new Date(data.month).getTime(), data.count]),
  };

  const blogSeries = {
    name: 'Blogs Created',
    data: blogData.map((data) => [new Date(data.month).getTime(), data.count]),
  };

  const slotSeries = {
    name: 'Slots Created',
    data: slotData.map((data) => [new Date(data.month).getTime(), data.count]),
  };

  console.log(blogSeries);
  // if (loading) {
  //   return <div>Loading...</div>;
  // }


  // Debugging the series data
  console.log('userSeries:', userSeries);
  console.log('blogSeries:', blogSeries);
  console.log('mentorSeries:', mentorSeries);

  return (
    <div id="chart" className="border rounded-lg bg-white w-full p-20">
      <ReactApexChart
        options={options}
        series={[userSeries, slotSeries , blogSeries , mentorSeries]}
        type="line"
        height={500}
      />
    </div>
  );
};

export default ApexChart;