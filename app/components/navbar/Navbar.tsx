import React from 'react'
import Container from '../Container'
import Logo from './Logo'

const Navbar = () => {
  return (
    <div className='fixed w-full bg-white z-10 shadow-md'>
      <div className='p-4 border-b'>
        <Container>
          <Logo />
        </Container>
      </div>
    </div>
  )
}

export default Navbar
