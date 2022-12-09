import { useEffect, useState } from 'react'
import { GetResorts, GetResortsById } from '../services/ResortServices'
import { useNavigate } from 'react-router-dom'

const Resorts = () => {
    let navigate = useNavigate()
    const [resorts, setResorts] = useState([])

    const showAllResorts = async () => {
        const data = await GetResorts()
        setResorts(data)
    }

    useEffect(() => {
        showAllResorts()
    },
        [resorts])

    const viewDetails = async (id) => {
        navigate(`/resorts/${id}`)
    }


    return (<div>
        <h1>List of Resorts:</h1>
        <div className="resort-container">
            {resorts.map((resort) => (
                <div key={resort.id}>
                    <h2>{resort.name}</h2>
                    <h3>{resort.location}</h3>
                    <h4>{resort.review}</h4>
                    <h4>Height:{resort.height}</h4>
                    <h4>Number of Lifts:{resort.height}</h4>
                    <img src={resort.image} />
                    <button onClick={() => viewDetails(resort.id)}>Click to go to Resort Page</button>
                </div>

            ))}
        </div>
    </div>)
}

export default Resorts