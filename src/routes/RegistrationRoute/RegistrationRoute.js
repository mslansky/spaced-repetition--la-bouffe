import React, { Component } from 'react'
import AuthApiService from '../../services/auth-api-service'
import UserContext from '../../contexts/UserContext'
import RegistrationForm from '../../components/RegistrationForm/RegistrationForm'
import './RegistrationRoute.css';

class RegistrationRoute extends Component {

  static contextType = UserContext
  static defaultProps = {
    history: {
      push: () => {},
    },
  }

  handleRegistrationSuccess = ({ username, password }) => {
    AuthApiService.postLogin({
      username: username.value,
      password: password.value,
    })
    .then(res => {
      this.context.processLogin(res.authToken)

      const { history } = this.props
      history.push('/')
    })
    .catch(res => {
      console.log({ error: res.error })
    })
  }

  render() {
    return (
      <section>
        <p className="desc">
          Learn French words for Food!
        </p>
        
        <RegistrationForm
          onRegistrationSuccess={this.handleRegistrationSuccess}
        />
      </section>
    );
  }
}

export default RegistrationRoute
