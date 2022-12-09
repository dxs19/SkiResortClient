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
        </div>
    )
}
export default ResortDetails