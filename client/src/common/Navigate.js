import { NavLink } from "react-router-dom"
import { FaTasks,FaUser,FaUserFriends } from "react-icons/fa";
import { FaRegFileLines, FaImages  } from "react-icons/fa6";


const Navigate = () => {
    return <div className="nav">
        <div className="nav_item"><NavLink to={"/tasks"}> <FaTasks style={{height:"20px"}}/> Tasks </NavLink> </div>
    {/* <NavLink to={"/tasks/add"}> Add new task</NavLink> */}
        <div className="nav_item"><NavLink to={"/tasks"}> <FaRegFileLines style={{height:"20px"}}/> Posts </NavLink></div>
        <div className="nav_item"><NavLink to={"/tasks"}> <FaImages style={{height:"20px"}}/> Albums </NavLink></div>
        <div className="nav_item"><NavLink to={"/tasks"}> <FaUser style={{height:"20px"}}/> Users </NavLink></div>

    </div>
}

export default Navigate