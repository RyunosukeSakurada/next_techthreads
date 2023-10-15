"use client"

import React from 'react'
import Container from '../Container'
import Logo from './Logo'
import UseMenu from './UseMenu'
import { SafeUser } from "@/app/types";
import Icons from './Icons'
import Categories from './Categories'


interface NavbarProps {
  currentUser?: SafeUser | null;
}

const Navbar: React.FC<NavbarProps> = ({currentUser}) => {
  return (
    <div className='fixed w-full bg-white z-10 shadow-md'>
      <div className='p-4 border-b'>
        <Container>
          <div className='flex flex-row justify-between items-center'>
            <Icons />
            <Logo />
            <UseMenu currentUser={currentUser}/>
          </div>
        </Container>
      </div>

      <Categories />
    </div>
  )
}

export default Navbar
