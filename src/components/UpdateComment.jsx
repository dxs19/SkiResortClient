// import axios from 'axios'
// import { useEffect, useState } from 'react'
// import { useParams } from 'react-router-dom'

// const UpdateForm = (props) => {
//     const [popUp, setPopUp] = useState(false)
//     const togglePopUp = () => {
//         setPopUp(!popUp)
//     }
//     if (popUp) {
//         document.body.classList.add('active-popUp')
//     } else {
//         document.body.classList.remove('active-popUp')
//     }



//     return (<div>
//         <form onSubmit={(event) => {
//             props.handleUpdate(event, comment.id)
//         }} className="update-form">
//             <label htmlFor='review'>Review:</label>
//             <input className='input'
//                 id="review"
//                 value={formState.review}
//                 placeholder='review'
//                 onChange={handleChange}
//             />
//             <button type="submit">Update Review</button>
//         </form>
//     </div>)
// }

// export default UpdateForm