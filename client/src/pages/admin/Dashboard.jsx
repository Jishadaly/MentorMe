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
import { fetchAllMentors, fetchSlotes, fetchAllUsers, getChartData, getBlogsStatus } from "@/Api/services/adminServices";
import { BarChart, LineChart } from "@mui/x-charts";
import { PieChart } from '@mui/x-charts/PieChart';
import projectsTableData from "./data/projects-table-data";
import ordersOverviewData from "./data/orders-overview-data";
import ApexChart from "@/componets/ApexChart";
import { getBlogs } from "@/Api/services/menteeService";
import ReactLoading from 'react-loading';


function Dashboard() {

  const [users, setUsers] = useState([]);
  const [slots, setSlots] = useState([]);
  const [mentors, setMentors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userData, setUserData] = useState([])
  const [blogData, setBlogData] = useState(null)
  const [slotData, setSlotData] = useState([])



  const fetchChartData = async () => {
    const response = await getChartData('admin/fetchChartData');
    console.log(response);
  }

  useEffect(() => {
    async function fetchData() {
      try {
        const [usersResponse, slotsResponse, mentorsResponse, blogsResponse] = await Promise.all([
          fetchAllUsers('admin/getAllUsers'),
          fetchSlotes('admin/ferchMentoSlots'),
          fetchAllMentors('admin/getAllMentors'),
          getBlogsStatus('admin/getDashboardStatus'),
        ]);
        console.log("Blogs:", blogsResponse);
        setUsers(usersResponse.data.users);
        setSlots(slotsResponse.slots);
        setMentors(mentorsResponse.data.Mentors);
        setBlogData(blogsResponse.totalBlogs);

        // console.log(blogResponse); 
        setLoading(false);
      } catch (err) {
        setError(err);
        console.log(err);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
    fetchChartData()

  }, []);


  if (loading) {
    return <div> <ReactLoading type="cylon" color="#4338CA" height={100} width={100} /></div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const statisticsCardsData = [
    {
      color: "indigo",
      icon: BanknotesIcon,
      title: "Blog created",
      value: blogData,
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

      <div className="border border-blue-gray-100 shadow-sm rounded-lg">
        <ApexChart />
      </div>

    </div>
  );
}

export default Dashboard;