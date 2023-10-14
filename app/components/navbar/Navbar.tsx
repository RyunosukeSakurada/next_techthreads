import React from 'react'
import Container from '../Container'
import Logo from './Logo'
import UseMenu from './UseMenu'

const Navbar = () => {
  return (
    <div className='fixed w-full bg-white z-10 shadow-md'>
      <div className='p-4 border-b'>
        <Container>
          <div className='flex flex-row justify-between items-center'>
            <Logo />
            <UseMenu />
          </div>
        </Container>
      </div>
    </div>
  )
}

export default Navbar
