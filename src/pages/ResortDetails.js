import axios from 'axios'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import UpdateForm from '../components/UpdateComment'
import { createComment } from '../services/CommentServices'
import { UpdateResort } from '../services/ResortServices'
const ResortDetails = (props) => {
    let { id } = useParams()
    let navigate = useNavigate()
    if (props.user && props.authenticated) { console.log(props.user.id) }
    console.log(id)





    const [updatingComment, updateComment] = useState({})
    const [resorts, setResorts] = useState({})
    const [formState, setFormState] = useState({
        review: '',
        userId: props.user?.id,
        resortId: id
    })
    // const [comment, deleteComment] = useState({
    //     comment: comments?.id
    // })
    // const [comments, updateComments] = useState([])
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
    // useEffect(() => {
    //     const deleteComment = async () => {
    //         handleDelete()
    //     }
    //     deleteComment()
    // },)

    // useEffect(() => {
    //     handleSubmit()
    // },)


    let deleteId =
        resorts.Comments?.map((comment) => {
            return comment.id
        }
        )

    const handleDelete = async () => {
        console.log(deleteId)
        await axios.delete(
            `http://localhost:3001/api/comments/${deleteId}`
        )
    }

    const handleSubmit = async (e, id) => {
        e.preventDefault()
        await axios.post(`http://localhost:3001/api/comments/addComment`, formState)
        setFormState(formState)
    }
    const handleChange = (event) => {
        setFormState({ ...formState, [event.target.id]: event.target.value })
    }

    // const handleUpdate = async (event, id) => {
    //     event.preventDefault()
    //     let response = await axios.put(
    //         `http://localhost:3001/api/comments/${Comments.id}`,
    //         formState
    //     )
    //     updateComment([updatingComment, response])
    //     setFormState({
    //         review: '',
    //         userId: props.user?.id,
    //         resortId: id
    //     })
    // }
    let updateButton = () => {
        resorts.Comments?.map((comment) => {
            if (props.user?.id === comment.userId) { return id = "updateButton" }
            else {
                return ''
            }
        })
    }

    // const isPoster = () => {
    //     resorts.Comments?.map((comment) => {
    //         if (props.user?.id === comment.userId) {
    //             return async (id) => {
    //                 await axios.delete(
    //                     `http://localhost:3001/api/comments/${id}`
    //                 )
    //             }
    //         }
    //         else {
    //             alert('unathorized')
    //         }
    //     })
    // }
    let isPoster = resorts.Comments?.map((comment) => {
        return props.user?.id === comment.userId
    })






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
                        <div key={comment.id} id="updateButton">
                            <div>
                                <h3>{comment.review}</h3>
                                <button disabled={props.user?.id !== comment.userId} onClick={() => updateButton(comment.id)}>Update Comment</button>
                                <button disabled={props.user?.id !== comment.userId} onClick={() => handleDelete(comment.id)}>Delete</button>
                            </div>

                        </div>
                    ))} </div>
                <form onSubmit={handleSubmit} className="form-list">
                    <label htmlFor='review'>Review:</label>
                    <input className='input'
                        id="review"
                        value={formState.review}
                        placeholder='review'
                        onChange={handleChange}
                    />
                    <button type="submit">Add Review</button>

                </form>
                <div>
                    {/* <UpdateResort /> */}
                </div>

            </div>
        </div >
    )
}
export default ResortDetails