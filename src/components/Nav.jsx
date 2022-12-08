import { Link } from 'react-router-dom'

const Nav = () => {
    return (<nav>
        <h3>Welcome!</h3>
        <Link to='/login'>Sign In</Link>
        <Link to='/register'>Register</Link>
        <Link to='/'>Home</Link>
        <Link to='/resorts'>All Ski Resorts</Link>
    </nav>)
}

export default Nav