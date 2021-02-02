import React, { Component } from 'react'
import { Input, Label } from '../Form/Form'
import AuthApiService from '../../services/auth-api-service'
import UserContext from '../../contexts/UserContext'
import Button from '../Button/Button'
import './LoginForm.css'

class LoginForm extends Component {
  static defaultProps = {
    onLoginSuccess: () => { }
  }

  static contextType = UserContext

  state = { error: null }

  firstInput = React.createRef()

  handleSubmit = ev => {
    ev.preventDefault()
    const { username, password } = ev.target

    this.setState({ error: null })

    AuthApiService.postLogin({
      username: username.value,
      password: password.value,
    })
      .then(res => {
        username.value = ''
        password.value = ''
        this.context.processLogin(res.authToken)
        this.props.onLoginSuccess()
      })
      .catch(res => {
        this.setState({ error: res.error })
      })
  }

  componentDidMount() {
    this.firstInput.current.focus()
  }

  render() {
    const { error } = this.state
    return (
      <div className="Log">
      <form
        className='LoginForm'
        onSubmit={this.handleSubmit}
      >
        <div role='alert'>
          {error && <p>{error}</p>}
        </div>
        <div>
          <Label htmlFor='login-username-input' className="username-log">
            Username: 
          </Label>
          <Input
            ref={this.firstInput}
            id='login-username-input'
            name='username'
            required
            className="username-log-input"
          />
        </div>
        <div>
          <Label htmlFor='login-password-input' className="password-log">
            Password:
          </Label>
          <Input
            id='login-password-input'
            name='password'
            type='password'
            required
            className="password-log-input"
          />
        </div>
        <Button type='submit' className="log-button">
          Login
        </Button>
      </form>
      </div>
    )
  }
}

export default LoginForm
