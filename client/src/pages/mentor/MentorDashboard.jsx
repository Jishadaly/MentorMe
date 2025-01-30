import React, { useEffect, useState } from "react";
import StatisticsCard from "../admin/widgets/cards/statistics-card";
import {
  CheckBadgeIcon,
  ClockIcon,
  BookOpenIcon,
  
} from "@heroicons/react/24/solid";
import { Typography } from "@material-tailwind/react";
import MentorChart from "@/componets/chart/MentorChart";
import { getMentorDashboardData } from "@/Api/services/adminServices";
import moment from "moment";

export default function MentorDashboard() {

  const [availableSessionData, setAvailableSessionData] = useState([]);
  const [bookedSessionData, setBookedSessionData] = useState([]);
  const [completedSessionData, setCompletedSessionData] = useState([]);
  const [blogCreationData, setBlogCreationData] = useState([]);

  const [slotCount, setSlotCount] = useState(null);
  const [boockedSessionsCount, setBookedSessionsCount] = useState(null);
  const [completedSessionCount, setCompletedSessionCount] = useState(null);
  const [blogCreationCount, setBlogCreationCount] = useState(null);

  const [recentSessions, setRecentSessions] = useState([])
  const [recentBlogs, setRecentBlogs] = useState([])


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
      text: "Mentor Session & Blog Creation Stats",
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
      const response = await getMentorDashboardData('user/getMentorDashboard'); 
      const { availableSessionStats, bookedSessionStats, completedSessionStats, blogCreationStats } = response.chartData;
      const { blogCount, mentorSessionCount, mentorBookedSessionCount, mentorCompletedSessionCount } = response.stats;
      const { recentBlogs, recentSessions } = response;



      setSlotCount(mentorSessionCount);
      setBlogCreationCount(blogCount);
      setBookedSessionsCount(mentorBookedSessionCount);
      setCompletedSessionCount(mentorCompletedSessionCount);

      setRecentBlogs(recentBlogs);
      setRecentSessions(recentSessions);

      console.log({ response });
      setAvailableSessionData(availableSessionStats.map((item) => ({
        month: new Date(item._id).toISOString(),
        count: item.availableSessionCount,
      })));

      setBookedSessionData(bookedSessionStats.map((item) => ({
        month: new Date(item._id).toISOString(),
        count: item.bookedSessionCount,
      })));

      setCompletedSessionData(completedSessionStats.map((item) => ({
        month: new Date(item._id).toISOString(),
        count: item.completedSessionCount,
      })));

      setBlogCreationData(blogCreationStats.map((item) => ({
        month: new Date(item._id).toISOString(),
        count: item.blogCount,
      })));

      setLoading(false);
    } catch (error) {
      console.error('Error fetching mentor chart data:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchChartData();
  }, []);

  const availableSessionSeries = {
    name: 'Available Sessions',
    data: availableSessionData.map((data) => [new Date(data.month).getTime(), data.count]),
  };

  const bookedSessionSeries = {
    name: 'Booked Sessions',
    data: bookedSessionData.map((data) => [new Date(data.month).getTime(), data.count]),
  };

  const completedSessionSeries = {
    name: 'Completed Sessions',
    data: completedSessionData.map((data) => [new Date(data.month).getTime(), data.count]),
  };

  const blogSeries = {
    name: 'Blogs Created',
    data: blogCreationData.map((data) => [new Date(data.month).getTime(), data.count]),
  };


  const statisticsCardsData = [
    {
      color: "indigo",
      icon: ClockIcon,
      title: "slots",
      value: slotCount,
      footer: {
        color: "text-green-500",
        value: "+55%",
        label: "than last week",
      },
    },
    {
      color: "indigo",
      icon: CheckBadgeIcon,
      title: " Booked",
      value: boockedSessionsCount,
      footer: {
        color: "text-green-500",
        value: "+3%",
        label: "than last month",
      },
    },
    {
      color: "indigo",
      icon: VideoIcon,
      title: " Completed",
      value: completedSessionCount,
      footer: {
        color: "text-red-500",
        value: "-2%",
        label: "than yesterday",
      },
    },
    {
      color: "indigo",
      icon: BookOpenIcon,
      title: "blogs",
      value: blogCreationCount,
      footer: {
        color: "text-green-500",
        value: "+5%",
        label: "than yesterday",
      },
    },
  ];


  return (
    <div className="flex flex-col min-h-screen bg-background md:ml-36 mt-16">
      <main className="flex-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 p-6">


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

        <div className="col-span-1 md:col-span-2 lg:col-span-3 border border-blue-gray-100 shadow-sm  rounded-md">

          {/* <LinechartChart className="aspect-[16/9]" /> */}
          <MentorChart options={options} availableSessionSeries={availableSessionSeries} bookedSessionSeries={bookedSessionSeries} completedSessionSeries={completedSessionSeries} blogSeries={blogSeries} />

        </div>
        <Card  title="Recent Sessions">

        <div className="max-w-md mx-auto flex flex-col gap-4">
          {recentSessions.map((session, index) => {
           
            if (!session.bookedBy) {
              return null; // Skip this session if bookedBy is undefined
            }

            const formattedDate = moment(session.createdAt).format('MMMM D YYYY');

            return (
              <div key={index} className="bg-white p-4 rounded-xl border border-indigo-100-50 flex items-center">

                <div className="flex items-center gap-2 mr-auto">
                  <Avatar src={session.bookedBy.profilePic} fallback={"fallback"} />
                  <div>
                    <p className="font-medium">{session.bookedBy.userName}</p>
                    <p className="text-sm text-gray-500">Mentee</p>
                  </div>
                </div>
                <div className="text-sm text-gray-500">
                  <div className="flex items-center gap-1">
                    <CalendarIcon className="w-4 h-4" />
                    <span>{formattedDate}</span>
                  </div>
                </div>
              </div>
            );
          })}
          </div>
          
        </Card>
        {/* <Card title="Recent Blogs">
          <BlogPost title="How to Become a Successful Mentor" date="May 15, 2023" />
          <BlogPost title="5 Tips for Effective Online Mentoring" date="May 10, 2023" />
        </Card> */}
      </main>
    </div>
  );
}

function Card({ title, value, subtitle, icon: Icon, children }) {
  return (
    <div className="p-4 bg-white rounded-lg shadow">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold">{title}</h2>
        {Icon && <Icon className="w-6 h-6 text-muted-foreground" />}
      </div>
      {value && <div className="text-4xl font-bold">{value}</div>}
      {subtitle && <p className="text-sm text-muted-foreground">{subtitle}</p>}
      {children}
    </div>
  );
}

function TableRow({ student, email, date, duration, status }) {
  return (
    <tr>
      <td>
        <div className="font-medium">{student}</div>
        <div className="text-sm text-muted-foreground">{email}</div>
      </td>
      <td>{date}</td>
      <td>{duration}</td>
      <td>
        <Badge variant={status === "Completed" ? "secondary" : "outline"}>{status}</Badge>
      </td>
    </tr>
  );
}

function Avatar({ src, alt, fallback }) {
  return (
    <div className="relative flex items-center justify-center w-10 h-10 rounded-full bg-gray-200">
      {src ? (
        <img
          className="w-full h-full rounded-full object-cover"
          src={src}
          alt={alt}
        />
      ) : (
        <span className="text-sm font-medium text-gray-500">{fallback}</span>
      )}
    </div>
  );
}

function BlogPost({ title, date }) {
  return (
    <article className="mb-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium">{title}</h3>
        <div className="text-sm text-muted-foreground">{date}</div>
      </div>
      <p className="text-muted-foreground">Lorem ipsum dolor sit amet...</p>
    </article>
  );
}

function Badge({ variant, children }) {
  const variants = {
    secondary: "bg-green-100 text-green-800",
    outline: "border border-gray-300 text-gray-800",
  };
  return <span className={`px-2 py-1 rounded ${variants[variant]}`}>{children}</span>;
}

function LinechartChart(props) {
  return (
    <div {...props}>
      <svg className="w-full h-full">

      </svg>
    </div>
  );
}

function BookIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20" />
    </svg>
  );
}

function CalendarCheckIcon(props) {
  return (
    <svg
      CurrencyRupeeIcon
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M8 2v4" />
      <path d="M16 2v4" />
      <rect width="18" height="18" x="3" y="4" rx="2" />
      <path d="M3 10h18" />
      <path d="m9 16 2 2 4-4" />
    </svg>
  );
}

function CalendarIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M8 2v4" />
      <path d="M16 2v4" />
      <rect width="18" height="18" x="3" y="4" rx="2" />
      <path d="M3 10h18" />
    </svg>
  );
}

function DollarSignIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="12" x2="12" y1="2" y2="22" />
      <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
    </svg>
  );
}

function VideoIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m16 13 5.223 3.482a.5.5 0 0 0 .777-.416V7.87a.5.5 0 0 0-.752-.432L16 10.5" />
      <rect x="2" y="6" width="14" height="12" rx="2" />
    </svg>
  );
}