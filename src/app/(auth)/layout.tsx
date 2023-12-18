import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import '../../css/Auth.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
      <div className='user-signs'>
        <h1>Calend<span className='logo-colored-part'>izer</span></h1>
        {children}
      </div>
  )
}