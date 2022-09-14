import './index.css'
import {Redirect} from 'react-router-dom'
import {Component} from 'react'
import Cookie from 'js-cookie'

export default class Login extends Component {
  state = {username: '', password: '', errorMsg: ''}

  usernameChange = event => {
    this.setState({username: event.target.value})
  }

  passwordChange = event => {
    this.setState({password: event.target.value})
  }

  loginClicked = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {username, password}
    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    const respData = await response.json()
    console.log(response)
    console.log(respData)
    if (response.ok === true) {
      this.setState({errorMsg: ''})
      Cookie.set('jwt_token', respData.jwt_token, {expires: 30})
      const {history} = this.props
      history.replace('/')
    } else {
      this.setState({errorMsg: respData.error_msg})
    }
  }

  render() {
    const {username, password, errorMsg} = this.state
    if (Cookie.get('jwt_token') !== undefined) {
      return <Redirect to="/" />
    }

    return (
      <div className="login-bg-container">
        <div className="login-card">
          <img
            className="login-website-logo"
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
          />
          <form className="login-form" onSubmit={this.loginClicked}>
            <div className="input-div">
              <label className="label" htmlFor="username">
                USERNAME
              </label>
              <input
                value={username}
                onChange={this.usernameChange}
                className="input"
                id="username"
                type="text"
                placeholder="Username"
              />
            </div>
            <div className="input-div">
              <label className="label" htmlFor="password">
                PASSWORD
              </label>
              <input
                value={password}
                onChange={this.passwordChange}
                className="input"
                id="password"
                type="password"
                placeholder="Password"
              />
            </div>
            <p className="error-msg">{errorMsg}</p>
            <button className="login-btn" type="submit">
              Login
            </button>
          </form>
        </div>
      </div>
    )
  }
}
