import { Link } from 'react-router-dom'

const Nav = ({ user, authenticated, handleLogOut }) => {

    return (<nav>
        <div className='div'>
            <h3>Welcome!</h3>
            <Link to='/login'>Sign In</Link>
            <Link to='/register'>Register</Link>
            <Link to='/'>Home</Link>
            <Link to='/resorts'>All Ski Resorts</Link>
            <Link onClick={handleLogOut} to="/">
                Sign Out
            </Link>

        </div>
    </nav>
    )
}

export default Nav