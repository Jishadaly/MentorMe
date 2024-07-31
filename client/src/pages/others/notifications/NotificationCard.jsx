import React from 'react';
// import { BellIcon, TruckIcon } from './Icons';
import { IconBase } from 'react-icons';
import ReactTimeAgo from 'react-time-ago';


const NotificationCard = ({ iconType, title, time, description, buttonText , markButton}) => {
  const Icon = iconType === 'bell' ? IconBase : '';

  
  return (
    <div className="p-4 flex items-start gap-4 w-full bg-white shadow rounded-lg">
      <div className={`rounded-full p-2 ${iconType === 'bell' ? 'bg-primary text-primary-foreground' : 'bg-secondary text-secondary-foreground'}`}>
        <Icon className="h-5 w-5" />
      </div>
      <div className="flex-1">
        <div className="flex items-center justify-between">
          <h3 className="font-medium">{title}</h3>
          <span><ReactTimeAgo date={time} locale="en-US"/></span>
        </div>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
      <button onClick={markButton} className="text-muted-foreground bg-transparent border-none cursor-pointer">{buttonText}</button>
    </div>
  );
}

export default NotificationCard;