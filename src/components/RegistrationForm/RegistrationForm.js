import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Input, Required, Label } from '../Form/Form'
import AuthApiService from '../../services/auth-api-service'
import Button from '../Button/Button'
import './RegistrationForm.css'

class RegistrationForm extends Component {
  static defaultProps = {
    onRegistrationSuccess: () => { }
  }

  state = { error: null }

  firstInput = React.createRef()

  handleSubmit = ev => {
    ev.preventDefault()
    const { name, username, password } = ev.target
    AuthApiService.postUser({
      name: name.value,
      username: username.value,
      password: password.value,
    })
      .then(user => {
        this.props.onRegistrationSuccess({ name, username, password })
        name.value = ''
        username.value = ''
        password.value = ''
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
      <div className="register">
      <form onSubmit={this.handleSubmit} className="register-form">
        <div role='alert'>
          {error && <p>{error}</p>}
        </div>
        <div>
          <Label htmlFor='registration-name-input' className="name">
            Enter your name<Required />
          </Label>
          <Input
            ref={this.firstInput}
            id='registration-name-input'
            name='name'
            required
            className="name-input"
          />
        </div>
        <div>
          <Label htmlFor='registration-username-input' className="username">
            Choose a username<Required />
          </Label>
          <Input
            id='registration-username-input'
            name='username'
            required
            className="username-input"
          />
        </div>
        <div>
          <Label htmlFor='registration-password-input' className="password">
            Choose a password<Required />
          </Label>
          <Input
            id='registration-password-input'
            name='password'
            type='password'
            required
            className="password-input"
          />
        </div>
        <footer>
          <Button type='submit' className="signup">
            Sign up
          </Button>
          {' '}
          <div className="logflex">
            <div className="accountflex">
              <Link to='/login'>Already have an account? </Link>
            </div>
            <div className="demoflex">
              <Link to='/login'> Want a Demonstration?</Link>
            </div>
          </div>
          
        </footer>
      </form>
      </div>
    )
  }
}

export default RegistrationForm
