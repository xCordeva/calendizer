import '../../css/Navbar.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell, faUser } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';

export default function Navbar() {
  return (
    <div className="navbar-container">
      <div className='navbar'>
        <div className="logo">
          <Link href="/">
            <h1>Calend<span className='logo-colored-part'>izer</span></h1>
          </Link>
        </div>
        <div className="notif-user">
          <FontAwesomeIcon icon={faBell}/>
          <FontAwesomeIcon icon={faUser} />
        </div>
      </div>
    </div>
  )
}
