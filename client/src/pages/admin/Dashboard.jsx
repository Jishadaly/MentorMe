import React, { useEffect, useState } from "react";

import {
  Typography,
  Card,
  CardHeader,
  CardBody,
  IconButton,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Avatar,
  Tooltip,
  Progress,
} from "@material-tailwind/react";

import {
  EllipsisVerticalIcon,
  ArrowUpIcon,
} from "@heroicons/react/24/outline";

import {
  BanknotesIcon,
  UserPlusIcon,
  UsersIcon,
  ChartBarIcon,
} from "@heroicons/react/24/solid";

import { CheckCircleIcon, ClockIcon } from "@heroicons/react/24/solid";
import StatisticsCard from "./widgets/cards/statistics-card";
import { fetchAllMentors, fetchSlotes, fetchAllUsers } from "@/Api/services/adminServices";
import { BarChart, LineChart } from "@mui/x-charts";
import { PieChart } from '@mui/x-charts/PieChart';
import projectsTableData from "./data/projects-table-data";
import ordersOverviewData from "./data/orders-overview-data";
import ApexChartComponent from "@/componets/ApexChart";

const chartsConfig = {
  chart: {
    height: 220,
    type: 'line',
    zoom: {
      enabled: false
    }
  },
  dataLabels: {
    enabled: false
  },
  stroke: {
    curve: 'smooth'
  },
  title: {
    text: 'Dynamic Data',
    align: 'left'
  },
  grid: {
    row: {
      colors: ['#5d5299', 'transparent'],
      opacity: 0.5
    },
  },
  xaxis: {
    categories: []
  }
};

function Dashboard() {
  const [users, setUsers] = useState([]);
  const [slots, setSlots] = useState([]);
  const [mentors, setMentors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [websiteViewsChart, setWebsiteViewsChart] = useState({});
  const [dailySalesChart, setDailySalesChart] = useState({});
  const [completedTasksChart, setCompletedTasksChart] = useState({});

  useEffect(() => {
    async function fetchData() {
      try {
        const [usersResponse, slotsResponse, mentorsResponse] = await Promise.all([
          fetchAllUsers('admin/getAllUsers'),
          fetchSlotes('admin/ferchMentoSlots'),
          fetchAllMentors('admin/getAllMentors')
        ]);
        console.log("11111111", slotsResponse.slots);
        setUsers(usersResponse.data.users);
        setSlots(slotsResponse.slots);
        setMentors(mentorsResponse.data.Mentors);


      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  

  const generateMonthlyData = (data) => {
    const monthlyData = Array(12).fill(0);
    data.forEach(item => {
      const month = new Date(item.createdAt).getMonth();
      monthlyData[month] += 1;
    });
    return monthlyData;
  };

  const total = users.length + mentors.length;
  const userPercentage = ((users.length / total) * 100).toFixed(2);
  const mentorPercentage = ((mentors.length / total) * 100).toFixed(2);

  const pieData = [
    { id: 0, value: users.length, label: `Total Users (${userPercentage}%)`, color: '#5d5299' },
    { id: 1, value: mentors.length, label: `Mentors (${mentorPercentage}%)` },
  ];


  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const statisticsCardsData = [
    {
      color: "indigo",
      icon: BanknotesIcon,
      title: "Today's Money",
      value: "$53k",
      footer: {
        color: "text-green-500",
        value: "+55%",
        label: "than last week",
      },
    },
    {
      color: "indigo",
      icon: UsersIcon,
      title: " Users",
      value: users.length,
      footer: {
        color: "text-green-500",
        value: "+3%",
        label: "than last month",
      },
    },
    {
      color: "indigo",
      icon: UserPlusIcon,
      title: "Mentors",
      value: mentors.length,
      footer: {
        color: "text-red-500",
        value: "-2%",
        label: "than yesterday",
      },
    },
    {
      color: "indigo",
      icon: ChartBarIcon,
      title: "Slots",
      value: slots.length,
      footer: {
        color: "text-green-500",
        value: "+5%",
        label: "than yesterday",
      },
    },
  ];


  const userMonthlyData = generateMonthlyData(users);
  const slotMonthlyData = generateMonthlyData(slots);
  const mentorMonthlyData = generateMonthlyData(mentors);



  return (
    <div>
      <div className="mb-12 grid gap-y-10 gap-x-6 md:grid-cols-2 xl:grid-cols-4">
        {statisticsCardsData.map(({ icon, title, footer, ...rest }) => (
          <StatisticsCard
            key={title}
            {...rest}
            title={title}
            icon={React.createElement(icon, {
              className: "w-6 h-6 text-white",
            })}
            footer={
              <Typography className="font-normal text-blue-gray-600">
                <strong className={footer.color}>{footer.value}</strong> 
                &nbsp;{footer.label}
              </Typography>
            }
          />
        ))}
      </div>

      {/* <h1 className=" mb-4 text-3xl font-inter font-extrabold text-gray-500" >Statitics</h1> */}

      <div className="mb-8 grid grid-cols-1 gap-y-12 gap-x-6 md:grid-cols-1 xl:grid-cols-3 sm:grid-cols-1">
        <div className="border border-blue-gray-100 shadow-sm rounded-lg">
         <Typography className="m-4" variant="h4" color="blue-gray">
          {"Users"}
         </Typography>
          <BarChart className=""


            xAxis={[
              {
                id: 'barCategories',
                data: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
                scaleType: 'band',
              },
            ]}
            series={[
              {
                data: userMonthlyData,
                color: '#5d5299'
              },
            ]}
          
            height={300}

          />
        </div>

        <div className="border border-blue-gray-100 shadow-sm rounded-lg">
        <ApexChartComponent />
        </div>

        <div className="border border-blue-gray-100 shadow-sm rounded-lg">
          <PieChart
            series={[
              {
                data: pieData,
                innerRadius: 30,
                outerRadius: 100,
                paddingAngle: 5,
                cornerRadius: 5,
                startAngle: -90,
                endAngle: 180,
                cx: 150,
                cy: 150,
              }
            ]}
            label={({ dataEntry }) => `${dataEntry.label}`}
          />
        </div>
      </div>

      <div className="border border-blue-gray-100 shadow-sm rounded-lg">
        <ApexChartComponent
          userMonthlyData={userMonthlyData}
          slotMonthlyData={slotMonthlyData}
          mentorMonthlyData={mentorMonthlyData}
          // blogMonthlyData={blogMonthlyData}
        />
      </div>

    </div>
  );
}

export default Dashboard;