import { useEffect, useState } from 'react'
import { GetResorts, GetResortsById } from '../services/ResortServices'
import { useNavigate } from 'react-router-dom'
import Search from '../components/Search'
const Resorts = () => {
    let navigate = useNavigate()
    // const [data, setData] = useState({})
    const [resorts, setResorts] = useState([])
    const [wordEntered, setWordEntered] = useState("");

    const handleFilter = (event) => {
        const searchWord = event.target.value
        setWordEntered(searchWord)
        const newFilter = resorts.filter((value) => {
            return (value.name.toLowerCase().includes(searchWord.toLowerCase())
            )
        })
        if (searchWord === "") {
            setResorts([]);
        } else {
            setResorts(newFilter);
        }
    }
    console.log(resorts.longitude)

    const showAllResorts = async () => {
        const data = await GetResorts()
        setResorts(data)
    }

    useEffect(() => {
        showAllResorts()
    },
        [])

    const viewDetails = async (id) => {
        navigate(`/resorts/${id}`)
    }


    return (<div>

        <h1>List of Resorts:</h1>
        <div className="searchInputs"> </div>
        <div className='dataResults'>
            <input type="text"
                value={wordEntered}
                onChange={() => handleFilter(resorts)} />
            <div className='Search Icon'>
            </div>
        </div>

        <div className="resort-container">
            {resorts.map((resort) => (
                <div className='indvidual-resort' key={resort.id}>
                    <h3 className="resort-name">Resort Name: {resort.name}</h3>
                    <h4 className='resort-location'>Resort Location: {resort.location}</h4>
                    <img className='resort-img' src={resort.image} />
                    <button className='resort-btn' onClick={() => viewDetails(resort.id)}>Click to go to Resort Page</button>
                </div>

            ))}
        </div>
    </div>)
}

export default Resorts