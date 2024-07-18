import { useEffect, useState } from "react"
import Axios from 'axios'
import { Link } from 'react-router-dom'
import UserItem from "./UserItem"

const UsersList = () => {

    const [users, setUsers] = useState([])
    const [sortBy, setSortBy] = useState('')
    const [filterValue, setFilterValue] = useState('')

    
    const fetchUsers = async () => {
        try {
            const { data } = await Axios.get("http://localhost:5600/api/users");
            const filteredData = data.filter(el => el.username.toLowerCase().includes(filterValue)) 
            setUsers(filteredData)
        } catch (error) {
            console.error("Failed to fetch users:", error);
        }
    };

    useEffect(() => {
        fetchUsers()
    }, [filterValue])

    const sortUsers = (sortBy) => {
        switch (sortBy) {
            case "alphabeta":
                users.sort((a, b) => a.username.localeCompare(b.username))
                break;
            case "random":
                users.sort(() => Math.random() - 0.5)
                break;
            default:
                users.sort((a, b) => a._id.localeCompare(b._id))
                break;
        }
        console.log(`sorted by ${sortBy} successfully`);
        setUsers([...users]);
    }

    useEffect(() => {
        sortUsers(sortBy)
    }, [sortBy])

    // if (users.length === 0) return <h1>Loading</h1>

    return <>
        <div className="usersList">
            <div className="users_header">
                <div className="div_sort">
                    <select className="selectList" onChange={(e) => setSortBy(e.target.value)}>
                        <option value="id"> id </option>
                        <option value="alphabeta"> a-z </option>
                        <option value="random"> random </option>
                    </select>
                </div>
                <input className="inpSearch" placeholder="search" onChange={(e) => setFilterValue(e.target.value)} />
                <button className="btnAddNew"> <Link className="linkBtn" to='/users/add'> Add new user </Link> </button>

            </div>
            <h1> Users List </h1>
            {(users.length) ?
                users.map((user) => <UserItem key={user._id} user={user} fetchUsers={fetchUsers} sortBy={sortBy} sortUsers={sortUsers} />)
                : <h2 style={{width:"72vw"}}> No users found </h2>
            }
            
        </div>
    </>
}

export default UsersList