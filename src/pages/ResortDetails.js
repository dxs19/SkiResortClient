import axios from 'axios'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

const ResortDetails = (props) => {
    let { id } = useParams()
    let navigate = useNavigate()
    if (props.user && props.authenticated) { console.log(props.user.id) }


    const [toggle, setToggle] = useState(false)
    const [updatingComment, updateComment] = useState({})
    const [resorts, setResorts] = useState({})
    const [formState, setFormState] = useState({
        review: '',
        userId: props.user?.id,
        resortId: id
    })


    useEffect(() => {
        const detailsCall = async () => {
            let res = await axios
                .get(
                    `https://skiresort-backend.herokuapp.com/api/resorts/${id}`
                )
            setResorts(res.data)
        }
        detailsCall()
    }, [toggle])



    const handleDelete = async (deleteId) => {
        console.log(deleteId)
        await axios.delete(
            `https://skiresort-backend.herokuapp.com/api/comments/${deleteId}`
        )
        setToggle(!toggle)
    }

    const handleSubmit = async (e, id) => {
        e.preventDefault()
        let submit = await axios.post(`https://skiresort-backend.herokuapp.com/api/comments/addComment`, formState)
        setFormState(formState)
        setToggle(!toggle)
    }
    const handleChange = (event) => {
        setFormState({ ...formState, [event.target.id]: event.target.value })
    }

    const handleUpdate = async (event, updateId) => {
        event.preventDefault()
        console.log(updateId)
        let response = await axios.put(
            `https://skiresort-backend.herokuapp.com/api/comments/${updateId}`,
            formState
        )
        updateComment([updatingComment, response])
        setFormState({
            review: '',
            userId: props.user?.id,
            resortId: id
        })
        setToggle(!toggle)
    }

    const [popUp, setPopUp] = useState(false)
    const togglePopUp = () => {
        setPopUp(!popUp)
    }
    if (popUp) {
        document.body.classList.add('active-popUp')
    } else {
        document.body.classList.remove('active-popUp')
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
                        <div key={comment.id} id="updateButton">
                            <div>
                                <h3>{comment.review}</h3>
                                <button disabled={props.user?.id !== comment.userId} onClick={() => handleDelete(comment.id)} > Delete </button>
                                <button disabled={props.user?.id !== comment.userId} onClick={() => togglePopUp(comment.id)}> Update Comment </button>
                            </div>

                            {popUp && (<form
                                onSubmit=
                                {(event) => {
                                    handleUpdate(event, comment.id)
                                }} className="update-form">
                                <label htmlFor='review'>Review:</label>
                                <input className='input'
                                    id="review"
                                    value={formState.review}
                                    placeholder='review'
                                    onChange={handleChange}
                                />
                                <button type="submit">Update Review</button>
                                <button className="close-popUp" onClick={togglePopUp}>
                                    Close
                                </button>
                            </form>)}
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
                </div>

            </div>
        </div >
    )
}
export default ResortDetails