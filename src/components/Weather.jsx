import React, { useState } from 'react'
import axios from 'axios'

function Weather() {
    const [data, setData] = useState({})
    const [location, setLocation] = useState('')

    const searchLocation = (event) => {
        if (event.key === 'Enter') {
            axios.get(url).then((response) => {
                setData(response.data)
                console.log(response.data)
            })
            setLocation('')
        }
    }
    const handleChange = (event) => {
        setLocation({ ...location, [event.target.id]: event.target.value })
    }
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=imperial&appid=c9f1d46755990cc84bab1907357b5202`



    return (
        <div className="app">
            <div className="search">
                <input
                    value={location}
                    onChange={event => setLocation(event.target.value)}
                    onKeyPress={searchLocation}
                    placeholder='Enter Location'
                    type="text" />
            </div>
            <div className="container">
                <div className="top">
                    <div className="location">
                        <p>{data.name}</p>
                    </div>
                    <div className="temp">
                        {data.main ? <h1>{data.main.temp.toFixed()}°F</h1> : null}
                    </div>
                    <div className="description">
                        {data.weather ? <p>{data.weather[0].main}</p> : null}
                    </div>
                </div>

                {data.name !== undefined &&
                    <div className="bottom">
                        <div className="feels">
                            {data.main ? <p className='bold'>{data.main.feels_like.toFixed()}°F</p> : null}
                            <p>Feels Like</p>
                        </div>
                        <div className="humidity">
                            {data.main ? <p className='bold'>{data.main.humidity}%</p> : null}
                            <p>Humidity</p>
                        </div>
                        <div className="wind">
                            {data.wind ? <p className='bold'>{data.wind.speed.toFixed()} MPH</p> : null}
                            <p>Wind Speed</p>
                        </div>
                    </div>
                }



            </div>
        </div>
    )

}

export default Weather





 // return (
    //     <div className="weather">
    //         <div className='search'>
    //             <input
    //                 value={location}
    //                 onChange={handleChange}
    //                 onKeyPress={searchLocation}
    //                 placeholder='Location'
    //                 type="text">

    //             </input>
    //         </div>
    //         <div className="container">
    //             <div className="top">
    //                 <div className="location">
    //                     <p>Pittsburgh</p>
    //                 </div>
    //                 <div className="temp">
    //                     60F
    //                 </div>
    //                 <div className="description">
    //                     <p>Clouds</p>
    //                 </div>
    //                 <div className="feels">
    //                     <h3>65F</h3>
    //                     <div className="humidity">
    //                         20%
    //                     </div>
    //                     <div className="wind">
    //                         2 mph
    //                     </div>
    //                 </div>
    //             </div>
    //         </div>
    //     </div>
    // )