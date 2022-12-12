import axios from 'axios'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
const ResortDetails = () => {
    let { id } = useParams()
    let navigate = useNavigate()






    const [resorts, setResorts] = useState({})
    const [comments, setComments] = useState([{ review: "no comments" }])


    useEffect(() => {
        const detailsCall = async () => {
            let res = await axios
                .get(
                    `http://localhost:3001/api/resorts/${id}`
                )
            setResorts(res.data)

        }
        detailsCall()
    },)

    // useEffect(() => {
    //     if (resorts) {
    //         setComments(resorts.Comments)
    //     }
    // }, [resorts])




    return (
        <div>
            <button onClick={() => navigate('/resorts')} className="back-btn">Back to Resorts</button>

            <h1>{resorts.name}</h1>
            <img src={resorts.image} />
            <h2>Resort Overview: {resorts.review}</h2>
            <h2>Location: {resorts.location}</h2>
            <h2>Height: {resorts.height}</h2>
            <h2>Number of Lifts: {resorts.runs}</h2>

            <div> <h3>Comments:</h3>
                {resorts.Comments?.map((comment) => (
                    <div key={comment.id}>
                        <h4>{comment.review}</h4>
                    </div>
                ))} </div>


            {/* <button onClick={() => handleDelete(resorts.id)} className="delete-btn">Delete Resort</button> */}
        </div>
    )
}
export default ResortDetails