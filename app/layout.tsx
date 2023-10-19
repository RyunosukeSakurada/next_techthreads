import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Navbar from './components/navbar/Navbar'
import RegisterModal from './components/modals/RegisterModal'
import ToasterProvider from './providers/ToasterProvider'
import LoginModal from './components/modals/LoginModal'
import ClientOnly from './components/ClientOnly'
import getCurrentUser from './actions/getCurrentUser'
import PostModal from './components/modals/PostModal'


const inter = Inter({ subsets: ['latin'] })

export const dynamic = "force-dynamic"

export const metadata: Metadata = {
  title: 'TechThreads',
  description: 'TechThreads',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const currentUser = await getCurrentUser();

  return (
    <html lang="en">
      <body className={inter.className}>
        <ClientOnly>
          <ToasterProvider />
          <PostModal />
          <LoginModal />
          <RegisterModal />
          <Navbar  currentUser={currentUser}/>
        </ClientOnly>
        <div className='py-40 px-6'>
          {children}
        </div>
      </body>
    </html>
  )
}
