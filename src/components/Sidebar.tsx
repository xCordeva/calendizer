import Link from "next/link";
import { usePathname } from "next/navigation";


export default function Sidebar() {
    
    const pathname= usePathname()

  return (
    <div className="sidebar">
        <Link href='/' className={pathname === '/' ? 'active' : ''}>Dashboard</Link>
        <Link href='/calendar' className={pathname === '/calendar' ? 'active' : ''}>Calendar</Link>
        <Link href='/tasks' className={pathname === '/' ? 'active' : ''}>Tasks</Link>
    </div>
  )
}
