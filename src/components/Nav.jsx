import { Link } from 'react-router-dom'
import Register from '../pages/Register'

const Nav = ({ user, authenticated }) => {
    // let authenticatedOptions
    // if (user) {
    //     authenticatedOptions = (
    //         <nav>
    //             <h3>Welcome {user.email}!</h3>
    //             {/* <Link to="/">Feed</Link> */}
    //             {/* <Link onClick={handleLogOut} to="/">
    //       Sign Out
    //     </Link> */}
    //         </nav>
    //     )
    // }
    // const publicOptions = (
    //     <nav>
    //         <Link to="/"></Link>
    //     </nav>
    // )
    return (<nav>
        <div>
            <h3>Welcome!</h3>
            <Link to='/login'>Sign In</Link>
            <Link to='/register'>Register</Link>
            <Link to='/'>Home</Link>
            <Link to='/resorts'>All Ski Resorts</Link>
        </div>
        {/* {authenticated && user ? authenticatedOptions : publicOptions} */}
    </nav>
    )
}

export default Nav