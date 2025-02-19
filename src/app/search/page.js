
"use client";

import React from 'react'
import Search from './component/Search'
import { Suspense } from "react";


const page = () => {
  return (
    <Suspense fallback={
      <div className="container">
        <div className="grid gap-6 md:-mt-8 md:grid-cols-2 lg:grid-cols-3 md:container">
          {Array.from({ length: 6 }).map((_, index) => (
            <div className="bg-gray-200 animate-pulse rounded-lg p-4 w-full pt-10" key={index}>
              <div className="h-24 w-full rounded-md"></div>
              <div className="mt-2 h-4 bg-gray-300 rounded w-1/2"></div>
              <div className="mt-3 h-4 bg-gray-300 rounded w-3/4"></div>
            </div>
          ))}
        </div>
      </div>
    }>
      <Search />
    </Suspense>
  )
}

export default page