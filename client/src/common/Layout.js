import Navigate from "./Navigate"
import { NavLink, Outlet } from 'react-router-dom'

const Layout = () => {
    return <div>
        <header> <NavLink to={"/"}> Sara Benyamin </NavLink>  <input className="h_search inpSearch" placeholder="Search In Site" /></header>
        <main>
            <section> <Navigate /> </section>
            <Outlet />
        </main>
    </div>
}

export default Layout