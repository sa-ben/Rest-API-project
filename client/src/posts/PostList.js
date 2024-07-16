import { useEffect, useState } from "react"
import Axios from 'axios'
import { Link } from 'react-router-dom'
import PostItem from "./PostItem"
import { FiFilter } from "react-icons/fi";


const PostList = () => {
    const [posts, setPosts] = useState([])
    const [sortBy, setSortBy] = useState('')
    const [filterValue, setFilterValue] = useState('')

    const fetchPosts = async () => {
        try {
            const { data } = await Axios.get("http://localhost:5600/api/posts");
            const filteredData = data.filter(el => el.title.includes(filterValue)) // Filter by 'title' containing the entered text
            setPosts(filteredData)
        } catch (error) {
            console.error("Failed to fetch posts:", error);
        }
    };

    useEffect(() => {
        fetchPosts()
    }, [filterValue])

    const sortPosts = (sortBy) => {
        switch (sortBy) {
            case "alphabeta":
                posts.sort((a, b) => a.title.localeCompare(b.title))
                break;
            case "random":
                posts.sort(() => Math.random() - 0.5)
                break;
            default:
                posts.sort((a, b) => a._id.localeCompare(b._id))
                break;
        }
        console.log(`sorted by ${sortBy} successfully`);
        setPosts([...posts]);
    }

    useEffect(() => {
        sortPosts(sortBy)
    }, [sortBy])

    // if (posts.length === 0) return <h1>Loading</h1>

    return <>
        <div className="postsList">
            <div className="posts_header">
                <div className="div_sort">
                    <select className="selectList" onChange={(e) => setSortBy(e.target.value)}>
                        <option value="id"> id </option>
                        <option value="alphabeta"> a-z </option>
                        <option value="random"> random </option>
                    </select>
                </div>
                <input className="inpSearch" placeholder="search" onChange={(e) => setFilterValue(e.target.value)} />
                <button className="btnAddNew"> <Link className="linkBtn" to='/posts/add'> Add new post </Link> </button>
            </div>
            <h1> Posts List </h1>
            {(posts.length) ?
                posts.map((post, index) => <PostItem key={post._id} post={post} fetchPosts={fetchPosts} sortBy={sortBy} sortPosts={sortPosts} />)
                : <h2> No posts found </h2>
            }
        </div>
    </>
}

export default PostList