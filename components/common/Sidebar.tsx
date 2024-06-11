"use client"

import Link from "next/link"

const HorizontalSidebar = () => {
  return (
    <div className="flex items-center justify-between w-full h-16 bg-gray-800 text-white px-4">
      <div className="flex items-center space-x-4">
        <Link href="/" className="hover:text-gray-400">
          Home
        </Link>
        <Link href="/about" className="hover:text-gray-400">
          About
        </Link>
        
      </div>
    </div>
  )
}

export default HorizontalSidebar
