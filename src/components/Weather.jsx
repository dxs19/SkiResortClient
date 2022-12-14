import React, { useState } from 'react'
import axios from 'axios'

function Weather() {
    const [data, setData] = useState({})

    const url = `https://api.openweathermap.org/data/2.5/weather?lat=40.395618&lon=-79.838661&appid=${process.env.API_APP_WEATHER_KEY}`
    return (
        <div classname="weather">
            <div className="container">
                <div className="top">
                    <div className="location">
                        <p>Pittsburgh</p>
                    </div>
                    <div className="temp">
                        60F
                    </div>
                    <div className="description">
                        <p>Clouds</p>
                    </div>
                    <div className="feels">
                        <h3>65F</h3>
                        <div className="humidity">
                            20%
                        </div>
                        <div className="wind">
                            2 mph
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Weather