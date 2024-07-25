import React, { useEffect, useState } from 'react';
import NotificationCard from './NotificationCard';
import { getNotifications , markRead} from '@/Api/services/mentorServices';

const Notifications = () => {

  const  [notifications , setNotifications] = useState([])
  
  const fetchNotifications = async()=>{
     const notifications = await getNotifications('user/getNotifications');
     console.log(notifications);
     setNotifications(notifications);
  }
  useEffect(()=>{
      fetchNotifications();
  },[])


  const handleMarkButton = async (id) => {
    const markedId = await markRead('user/editNotification', id);
    console.log("Marked ID:", markedId);
    setNotifications((prev) => prev.filter((notification) => notification._id !== markedId));
  };
  


  return (
    <div className="w-full max-w-md mx-auto py-8">
     {notifications.length > 0 && (
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-extrabold mt-10 font-inter">Notifications</h1>
          {/* <p className="cursor-pointer mt-10 font-inter">clear all</p> */}
        </div>
      )}

      <div className="grid gap-4">
      { notifications.length === 0 ? (
        <div className="flex items-center justify-center h-64">
        <p className="text-muted-foreground">No notifications</p>
      </div>
      ):(
        notifications.map((notification, index) => {
          return (
            <NotificationCard
              key={index} // Add a key prop
              iconType="bell"
              title={notification.title}
              time={notification.createdAt}
              description={notification.description}
              buttonText="Mark as Read"
              markButton={()=>handleMarkButton(notification._id)}
            />
          );
        })
      )}

      
        
      </div>
    </div>
  );
}

export default Notifications;
