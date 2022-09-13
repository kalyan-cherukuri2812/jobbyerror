import './index.css'
import {Redirect, Link} from 'react-router-dom'

import Cookie from 'js-cookie'

import Header from '../Header'

const Home = () => {
  if (Cookie.get('jwtToken') === undefined) {
    return <Redirect to="/login" />
  }
  return (
    <div className="home-div">
      <Header />
      <div className="home-card">
        <h1 className="home-h">Find The Job That Fits Your Life</h1>
        <p className="home-p">
          Millions of people are searching for jobs, salary information.company
          reviews.find the job that fits your abilities and potential
        </p>
        <Link to="/jobs">
          <button className="home-btn" type="button">
            Find Jobs
          </button>
        </Link>
      </div>
    </div>
  )
}

export default Home
