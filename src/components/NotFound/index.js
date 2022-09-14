import './index.css'
import Header from '../Header'

const NotFound = () => (
  <div className="not-found-bg">
    <Header />
    <div className="not-found-div">
      <img
        src="https://assets.ccbp.in/frontend/react-js/jobby-app-not-found-img.png"
        alt="not found"
      />
      <h1>Page Not Found</h1>
      <p>we are sorry, the page you requested could not be found</p>
    </div>
  </div>
)

export default NotFound
