import Link from 'next/link'
import React from 'react'

const Logo = () => {
  return (
    <Link href={"/"}>
      <h1 className='text-2xl font-bold cursor-pointer hover:text-zinc-500'>
        TechThreads
      </h1>
    </Link>
  )
}

export default Logo
