import axios from 'axios'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { createComment } from '../services/CommentServices'
const ResortDetails = (props) => {
    let { id } = useParams()
    let navigate = useNavigate()
    if (props.user && props.authenticated) { console.log(props.user.id) }







    const [resorts, setResorts] = useState({})
    const [formState, setFormState] = useState({
        userId: props.user?.id,
        resortId: id,
        review: ''
    })
    const [comments, updateComments] = useState([])
    const [userToEdit, setUserToEdit] = useState()



    useEffect(() => {
        const detailsCall = async () => {
            let res = await axios
                .get(
                    `http://localhost:3001/api/resorts/${id}`
                )
            setResorts(res.data)
        }
        detailsCall()
    }, [])


    const handleSubmit = async (e, id) => {
        e.preventDefault()
        await axios.post(`http://localhost:3001/api/comments/addComment`, formState)
        await axios.get(`http://localhost:3001/api/resorts/${id}`)
        setFormState(formState)
    }
    const handleChange = (e) => {
        setFormState({ ...formState, [e.target.id]: e.target.value })
    }

    // const onClick = (id) => {
    //     console.log(id)
    //     setUserToEdit(id)
    // }




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
                <div>
                    {resorts.Comments?.map((comment) => (
                        <div key={comment.id}>
                            <p>{comment.review}</p>
                            <form onSubmit={handleSubmit} className="form-list">
                                <input className='input'
                                    type='text'
                                    value={comment.review}
                                    placeholder='review'
                                    onChange={handleChange}
                                />
                            </form>
                        </div>
                    ))} </div>


            </div>
        </div>
    )
}
export default ResortDetails