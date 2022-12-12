import axios from 'axios'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { createComment } from '../services/CommentServices'
const ResortDetails = (props) => {
    // console.log(props.user)
    let { id } = useParams()
    let navigate = useNavigate()
    if (props.user && props.authenticated) { console.log(props.user.id) }

    // const initialState = {
    //     resortId: id,
    //     review: ''
    // }





    const [resorts, setResorts] = useState({})
    // const [comment, setComment] = useState([{ review: "no comments" }])
    const [formState, setFormState] = useState({
        // userId: props.user.id,
        resortId: id,
        review: ''
    })
    const [comments, updateComments] = useState([])
    const [userToEdit, setUserToEdit] = useState()

    const handleChange = (e) => {
        setFormState({ ...formState, [e.target.id]: e.target.value })
    }

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
        let newComment = await axios.post(`http://localhost:3001/api/comments/addComment`, formState)
            .then((response) => {
                return response
            })
            .catch((error) => {
                console.log(error)
            })
        updateComments([...comments, newComment.data])
        setFormState({ userId: '', })
    }

    const onClick = (id) => {
        console.log(id)
        setUserToEdit(id)
    }




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
                            {/* {userToEdit === user.id ? (

                                <form className="form"
                                    onSubmit={(e) => handleSubmit(e, user.id)}
                                >
                                    <input
                                        className="input"
                                        type="text"
                                        id="review"
                                        placeholder="write review here"
                                        onChange={(e) => handleChange(e)}
                                        value={formState.review} />

                                    <button onClick={() => onClick(student.id)}>
                                        Update Grade
                                    </button>
                                </form>
                            )} */}


                        </div>
                    ))} </div>


            </div>
        </div>
    )
}
export default ResortDetails