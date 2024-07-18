import { useEffect, useState } from "react"
import Axios from 'axios'
import PostItem from "./PostItem"
import AddPost from './AddPost'

const PostsList = () => {

    const [openModal, setOpenModal] = useState(false)
    const [posts, setPosts] = useState([])
    const [sortBy, setSortBy] = useState('')
    const [filterValue, setFilterValue] = useState('')

    const handleOpenModal = () => setOpenModal(true)
    const handleCloseModal = () => setOpenModal(false)

    const fetchPosts = async () => {
        try {
            const { data } = await Axios.get("http://localhost:5600/api/posts");
            const filteredData = data.filter(el => el.title.toLowerCase().includes(filterValue)) // Filter by 'title' containing the entered text
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

    return <>
        <div className="postsList">
            <div className="posts_header">
                <div className="div_sort">
                    <select
                        className="selectList"
                        onChange={(e) => setSortBy(e.target.value)}
                    >
                        <option value="id"> id </option>
                        <option value="alphabeta"> a-z </option>
                        <option value="random"> random </option>
                    </select>
                </div>
                <input
                    className="inpSearch"
                    placeholder="search"
                    onChange={(e) => setFilterValue(e.target.value)}
                />
                <button className="btnAddNew" onClick={handleOpenModal}>
                    Add Post
                </button>
            </div>
            <h1> Posts List </h1>
            {(posts.length) ?
                posts.map((post) =>
                    <PostItem
                        key={post._id}
                        post={post}
                        fetchPosts={fetchPosts}
                        sortBy={sortBy}
                        sortPosts={sortPosts}
                    />)
                : <h2 style={{ width: "72vw" }}> No posts found </h2>
            }
            <AddPost
                isOpen={openModal}
                onClose={handleCloseModal}
                fetchPosts={fetchPosts}
            />
        </div>
    </>
}

export default PostsList