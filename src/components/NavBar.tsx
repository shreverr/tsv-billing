import { FC } from 'react'
import { ThemeToggle } from './ThemeToggle'
import { buttonVariants } from "@/components/ui/button"
import Link from 'next/link'

interface NavBarProps {

}

const NavBar: FC<NavBarProps> = ({ }) => {
  return (
    <nav className='border absolute top-0 w-screen flex items-center justify-center'>
      <div className='container min-h-10 flex items-center justify-between p-4'>
        <div className='text-2xl font-bold '>
          TSV Billing
        </div>
        <div className='flex items-center justify-center gap-4'>
          <ThemeToggle />
          <Link className={buttonVariants({ variant: "default" })} href={`/login`}>
            Login
          </Link>
        </div>
      </div>
    </nav>
  )
}

export default NavBar