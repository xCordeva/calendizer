import Link from "next/link";

export default function PopupUser() {
  return (
    <div className="popup">
      <div className="popup-user">
        <h4>Cordeva Cordeva Cordeva</h4>
        <hr />
        <Link href='/'>Sign Out</Link>
        </div>
    </div>
  )
}
