import { useState } from "react"
import { GetResorts } from "../services/ResortServices"

const Search = () => {
    const initialState = {
        userId: '',
        resortId: ''
    }
    const [formState, setFormState] = useState(initialState)
    const [resort, setResort] = useState(null)
    const [searched, setSearched] = useState(false)

    const handleChange = (e) => {
        setFormState({ ...formState, [e.target.id]: e.target.value })
    }

    const onSubmit = async (e) => {
        e.preventDefault()
        console.log(formState)
        const result = await GetResorts(formState)
        setFormState(initialState)
        setResort(result)
        setSearched(true)
    }

    return (
        <div>
            <div>
                <form className="search" onSubmit={onSubmit}>

                    <input
                        type="text"
                        id="resortId"
                        value={formState.resortId}
                        placeholder="Resort"
                        onChange={handleChange}
                    ></input>
                    <button type="submit">Search</button>
                </form>
                {searched ? (
                    <div className="search-result">
                        {resort ? (
                            <div>resort: {(resort?.resort)}</div>
                        ) : (
                            <div>Cannot Find Mountain</div>
                        )}
                    </div>
                ) : <></>}
            </div>

        </div>



    )
}
export default Search