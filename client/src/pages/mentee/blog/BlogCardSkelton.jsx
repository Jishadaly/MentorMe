import Skeleton from 'react-loading-skeleton';

import React from 'react'

export default function BlogCardSkelton({index}) {
    return (
        <div key={index} className="bg-white dark:bg-gray-100 dark:text-gray-900 rounded-xl overflow-hidden shadow-lg">
                    <div className="grid grid-cols-12 mx-auto rounded-lg">
                      <div className="col-span-full lg:col-span-4">
                        <Skeleton height={300} className="w-full h-full object-cover rounded-lg lg:rounded-l-lg lg:rounded-none" />
                      </div>
                      <div className="flex flex-col p-6 col-span-full lg:col-span-8 lg:p-10 bg-white rounded-lg lg:rounded-r-lg lg:rounded-l-none">
                        <div className="flex justify-start">
                          <Skeleton width={80} height={24} className="rounded-full" />
                        </div>
                        <Skeleton height={36} width={`80%`} className="mt-2" />
                        <Skeleton count={3} className="flex-1 pt-2" />
                        <div className="flex items-center justify-between pt-2">
                          <div className="flex space-x-2">
                            <Skeleton circle={true} height={20} width={20} />
                            <Skeleton width={100} />
                          </div>
                          <Skeleton width={50} height={20} />
                        </div>
                      </div>
                    </div>
                  </div>
    )
}