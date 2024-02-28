import NavBar from "./NavBar"
import {Outlet} from 'react-router-dom'
function AppLayout() {
  return (
    <div className="font-bebas">
        <NavBar/>
        <Outlet/>
    </div>
  )
}

export default AppLayout