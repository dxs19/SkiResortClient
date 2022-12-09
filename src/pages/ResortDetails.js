import axios from 'axios'
import { useEffect, useState } from 'react'
import { Navigate, useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { GetResortsById } from '../services/ResortServices'
const ResortDetails = () => {
    let { id } = useParams()
    let navigate = useNavigate()

    const initialState = {
        resortId: id
    }
    const [resorts, setResorts] = useState({})
    const [formState, setFormState] = useState(initialState)


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
            <h3>Details Page:</h3>
            <h1>{resorts.name}</h1>
            <img src={resorts.image} />
            <h2>Resort Overview: {resorts.review}</h2>
            <h2>Location: {resorts.location}</h2>
            <h2>Height: {resorts.height}</h2>
            <h2>Number of Lifts: {resorts.runs}</h2>
        </div>
    )
}
export default ResortDetails