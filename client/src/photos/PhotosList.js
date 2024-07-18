import { useEffect, useState } from "react"
import Axios from 'axios'
import PhotoItem from "./PhotoItem"
import AddTask from "./AddPhoto"

const PhotosList = () => {

    const [openModal, setOpenModal] = useState(false)
    const [photos, setPhotos] = useState([])
    const [sortBy, setSortBy] = useState('')
    const [filterValue, setFilterValue] = useState('')

    const handleOpenModal = () => setOpenModal(true)
    const handleCloseModal = () => setOpenModal(false)

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
                    Add Photo
                </button>
            </div>
            <h1 style={{ width: "70vw" }}> Photos </h1>
            <div className="potos_display">
                {(photos.length) ?
                    photos.map((photo) =>
                        <PhotoItem
                            key={photo._id}
                            photo={photo}
                            fetchPhotos={fetchPhotos}
                            sortBy={sortBy}
                            sortPhotos={sortPhotos}
                        />)
                    : <h2 style={{ width: "72vw" }}> No photos found </h2>
                }
                <AddTask
                    isOpen={openModal}
                    onClose={handleCloseModal}
                    fetchPhotos={fetchPhotos}
                />
            </div>
        </div>
    </>
}

export default PhotosList