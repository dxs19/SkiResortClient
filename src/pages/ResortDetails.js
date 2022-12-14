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
    const [weather, setWeather] = useState({})
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



    let generateIconUrl = (ico) => {
        return `http://openweathermap.org/img/wn/${ico}@2x.png`
    }

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${resorts.longitude}&units=imperial&appid=${process.env.REACT_APP_WEATHER_KEY}`



    let weatherReport = axios.get(url).then((response) => {
        setWeather(response.data)
        console.log(response.data)
    })

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

        <div className='resort-page'>

            <div>
                <div className='weather-container'>
                    <div> {weather.weather ?
                        <img src={generateIconUrl(weather.weather[0].icon)} /> : null
                    }
                    </div>
                    <div className="description-weather">
                        {weather.weather ? <h1> {weather.weather[0].main}</h1> : null}
                        <p>current weather</p>
                    </div>
                    <div className="temp">
                        {weather.main ? <h1> {weather.main.temp.toFixed()}°F</h1> : null}
                        <p>current temperature</p>
                    </div>
                    <div className="wind">
                        {weather.wind ? <p className='bold'>{weather.wind.speed.toFixed()} MPH</p> : null}
                        <p>wind speed</p>
                    </div>

                </div>

                <div className='details-container'>
                    <button onClick={() => navigate('/resorts')}
                        className="back-btn">Back to Resorts</button>
                    <div className='resort-title'>
                        <h1 className='resort-place'>{resorts.name}</h1>
                        <h2> {resorts.location}</h2>
                    </div>
                    <div className='detail-img-container'>
                        <img className='detail-img' src={resorts.image} />
                    </div>
                    <div className='description'>
                        <h2>Resort Overview:
                            <h4>{resorts.review}</h4>
                        </h2>
                    </div>
                    <div className='resort-overview'>
                        <h2 className='overview-txt'>Overview:</h2>
                        <h2>Height: {resorts.height}</h2>
                        <h2>Number of Lifts: {resorts.runs}</h2>
                    </div>
                </div>

                <div className='comments'>
                    <div>
                        <div className='comment-txt'>
                            <h3 className='comment-title'>Comments:</h3>
                            {resorts.Comments?.map((comment) => (
                                <div key={comment.id} id="updateButton">
                                    <div className='comment-w-btns'>
                                        <h3>{comment.review}</h3>
                                        <button className="dlt" disabled={props.user?.id !== comment.userId} onClick={() => handleDelete(comment.id)} > Delete </button>
                                        <button className="upd" disabled={props.user?.id !== comment.userId} onClick={() => togglePopUp(comment.id)}> Update Comment </button>
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
                    </div>

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
            </div>
        </div >
    )
}
export default ResortDetails