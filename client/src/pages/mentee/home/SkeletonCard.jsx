import React from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const SkeletonCard = () => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm flex flex-col items-center">
      <Skeleton circle={true} height={96} width={96} className="mb-4" />
      <Skeleton height={24} width={150} className="mb-1" />
      <Skeleton height={20} width={100} className="mb-4" />
      <Skeleton height={20} width={200} className="mb-4" />
      <Skeleton height={40} width={100} />
    </div>
  );
};

export default SkeletonCard;
