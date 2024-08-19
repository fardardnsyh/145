"use client";
import React from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { SignInButton, UserButton, useUser } from '@clerk/nextjs'
import Link from 'next/link';

const Header = () => {
    const{user,isSignedIn} = useUser();
  return (
    <div className='p-5 border-b shadow-sm '>
        <div className='flex items-center justify-between '>
            <div>
            <Image src={'/logo.png'} width={60} height={50} alt="logo" />
            </div>
            { isSignedIn ? 

            (<div className='flex items-center'>
            <Link href="/dashboard">
                <Button variant="outline"> Dashboard </Button>
            </Link>
            <UserButton/>
            </div>):(
           <SignInButton>
            <Button>+Create AI Form</Button>
            </SignInButton>
            )
            }
        </div>
    </div>
  )
}

export default Header