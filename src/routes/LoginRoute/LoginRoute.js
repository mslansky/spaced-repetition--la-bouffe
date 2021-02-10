import React, { Component } from 'react'
import LoginForm from '../../components/LoginForm/LoginForm'

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
          <div className="demoUse">
          <div className="demoFlex">
            <ul>
              <li>Demonstration Username: Grader</li>
              <li>Demonstration Password: FrenchFood1!</li>
            </ul>
          </div>
        </div>
        <h2>Login</h2>
        <div className="CenterFormContainer">
          <LoginForm
            onLoginSuccess={this.handleLoginSuccess}
          />
        </div>
      </section>
    );
  }
}

export default LoginRoute
