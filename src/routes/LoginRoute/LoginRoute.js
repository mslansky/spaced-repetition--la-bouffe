import React, { Component } from 'react'
import LoginForm from '../../components/LoginForm/LoginForm'
import './LoginRoute.css'

class LoginRoute extends Component {
  static defaultProps = {
    location: {},
    history: {
      push: () => { },
    },
  }

  handleLoginSuccess = () => {
    const { location, history } = this.props
    const destination = (location.state || {}).from || '/'
    history.push(destination)
  }

  render() {
    return (
      <section>
          <div className="demo">
          <div className="demolog">
              <p>Demonstration Username: Bonjour</p>
              <p>Demonstration Password: FrenchFood1!</p>
          </div>
        </div>
        <div className="loginForm">
          <LoginForm onLoginSuccess={this.handleLoginSuccess}/>
        </div>
      </section>
    );
  }
}

export default LoginRoute
