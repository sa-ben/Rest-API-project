import { useEffect, useState } from "react"
import Axios from 'axios'
import { Link } from 'react-router-dom'
import PhotoItem from "./PhotoItem"

const PhotosList = () => {
    const [photos, setPhotos] = useState([])
    const [sortBy, setSortBy] = useState('')
    const [filterValue, setFilterValue] = useState('')

    const fetchPhotos = async () => {
        try {
            const { data } = await Axios.get("http://localhost:5600/api/photos");
            const filteredData = data.filter(el => el.title.toLowerCase().includes(filterValue))
            setPhotos(filteredData)
        } catch (error) {
            console.error("Failed to fetch photos:", error);
        }
    };

    useEffect(() => {
        fetchPhotos()
    }, [filterValue])

    const sortPhotos = (sortBy) => {
        switch (sortBy) {
            case "alphabeta":
                photos.sort((a, b) => a.title.localeCompare(b.title))
                break;
            case "random":
                photos.sort(() => Math.random() - 0.5)
                break;
            default:
                photos.sort((a, b) => a._id.localeCompare(b._id))
                break;
        }
        console.log(`sorted by ${sortBy} successfully`);
        setPhotos([...photos]);
    }

    useEffect(() => {
        sortPhotos(sortBy)
    }, [sortBy])

    return <>
        <div className="photosList">
            <div className="photos_header">
                <div className="div_sort">
                    <select className="selectList" onChange={(e) => setSortBy(e.target.value)}>
                        <option value="id"> id </option>
                        <option value="alphabeta"> a-z </option>
                        <option value="random"> random </option>
                    </select>
                </div>
                <input className="inpSearch" placeholder="search" onChange={(e) => setFilterValue(e.target.value)} />
                <button className="btnAddNew"> <Link className="linkBtn" to='/photos/add'> Add new photo </Link> </button>
            </div>
            <h1> Photos </h1>
            <div className="potos_display">
                {(photos.length) ?
                    photos.map((photo) => <PhotoItem key={photo._id} photo={photo} fetchPhotos={fetchPhotos} sortBy={sortBy} sortPhotos={sortPhotos} />)
                    : <h2 style={{ width: "72vw" }}> No photos found </h2>
                }
            </div>
        </div>
    </>
}

export default PhotosList