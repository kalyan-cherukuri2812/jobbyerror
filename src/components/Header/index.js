import './index.css'
import {Link, withRouter} from 'react-router-dom'
import {AiFillHome} from 'react-icons/ai'
import {BsBagFill} from 'react-icons/bs'
import {FiLogOut} from 'react-icons/fi'
import Cookie from 'js-cookie'

const Header = props => {
  const logoutClick = () => {
    Cookie.remove('jwtToken')
    const {history} = props
    history.replace('/login')
  }
  return (
    <div className="header-bg-card">
      <img
        className="header-logo-sm"
        src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
        alt="website logo"
      />
      <div className="header-icons-div">
        <Link to="/">
          <AiFillHome className="header-icon" />
        </Link>
        <Link to="/jobs">
          <BsBagFill className="header-icon" />
        </Link>

        <FiLogOut onClick={logoutClick} className="header-icon" />
      </div>
      <div className="header-options-div">
        <Link className="header-link-lg" to="/">
          Home
        </Link>
        <Link className="header-link-lg" to="/jobs">
          Jobs
        </Link>
      </div>
      <button onClick={logoutClick} className="logout-btn" type="button">
        Logout
      </button>
    </div>
  )
}

export default withRouter(Header)
