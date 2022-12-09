import axios from 'axios'
import { useEffect, useState } from 'react'
import { Navigate, useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
const ResortDetails = () => {
    let { id } = useParams()
    let navigate = useNavigate()



    const initialState = {
        resortId: id
    }
    const [resorts, setResorts] = useState({})
    const [formState, setFormState] = useState(initialState)

    const handleDelete = async (id) => {
        await axios.delete(
            `http://localhost:3001/api/resorts/${id}`
        )
        navigate('/resorts')
    }
    useEffect(() => {
        const detailsCall = async () => {
            await axios
                .get(
                    `http://localhost:3001/api/resorts/${id}`
                )
                .then((res) => {
                    setResorts(res.data)
                })
        }
        detailsCall()
    }, [])




    return (
        <div>
            <button onClick={() => navigate('/resorts')} className="back-btn">Back to Resorts</button>

            <h1>{resorts.name}</h1>
            <img src={resorts.image} />
            <h2>Resort Overview: {resorts.review}</h2>
            <h2>Location: {resorts.location}</h2>
            <h2>Height: {resorts.height}</h2>
            <h2>Number of Lifts: {resorts.runs}</h2>

            <h3>Comments:
                {resorts.Comments.map((comment) => (
                    <div key={comment.id}>
                        <h4>{comment.review}</h4>
                    </div>
                ))}
            </h3>
            {/* <button onClick={() => handleDelete(resorts.id)} className="delete-btn">Delete Resort</button> */}
        </div>
    )
}
export default ResortDetails