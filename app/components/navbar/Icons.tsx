import React, { FC } from 'react';
import { IconType } from 'react-icons';
import {FaXTwitter, FaFacebook, FaInstagram} from "react-icons/fa6"

interface SocialIconProps {
  Icon: IconType;
}

const SocialIcon: FC<SocialIconProps> = ({ Icon }) => (
  <div className='border hover:bg-neutral-100 cursor-pointer rounded-full p-2 flex justify-center items-center'>
    <Icon size={24} />
  </div>
);

const Icons: FC = () => {
  return (
    <div className='hidden md:flex flex-row items-center gap-3'>
      <SocialIcon Icon={FaXTwitter} />
      <SocialIcon Icon={FaFacebook} />
      <SocialIcon Icon={FaInstagram} />
    </div>
  )
}

export default Icons;
