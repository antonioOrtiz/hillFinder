import React, { Component } from 'react'
import { Transition, Button, Form, Grid, Header, Message, Segment } from 'semantic-ui-react'
import Link from 'next/link';

class RegisterForm extends Component {
  constructor(props) {
    super(props)

    this.state = {
      fadeUp: 'fade up',
      duration: 500,
      username: '',
      password: '',
      usernameError: false,
      passwordError: false,
      formSuccess: false,
      emailExistsError: false,
      error: false
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleBlur = this.handleBlur.bind(this)
    // this.handleIsLoggedInClick = this.handleIsLoggedInClick.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleErrors = this.handleErrors.bind(this)

  }

  handleChange(event) {
    var { name, value } = event.target
    this.setState({
      [name]: value
    })
  }

  // handleIsLoggedInClick() {
  //   this.state.isLoggedIn = this.state.isLoggedIn ? this.setState({ isLoggedIn: true }) : this.setState({ isLoggedIn: false })
  // }

  handleBlur() {
    var { username, password } = this.state

    var mailFormat = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

    if ((!username.match(mailFormat)) || (!username)) {
      this.setState({ usernameError: true, error: true })
    } else {
      this.setState({ usernameError: false, error: false })
    }

    if (password.length <= 8 || !password.length) {
      this.setState({ passwordError: true, error: true })
    } else {
      this.setState({ passwordError: false, error: false })
    }
  }

  handleErrors(response) {
    if (!response.ok) {
      if (response.status === 409) {
        console.log("response.status ", response.status);
        this.setState({
          emailExistsError: true, error: true
        })
      }

      if (response.status === 401) {
        console.log("response.status ", response.status);
        this.setState({
          emailExistsError: true, error: true
        })
      }
      throw Error(response.statusText);

    }

    return response;
  }

  handleSubmit(event) {
    event.preventDefault()

    var { username, password, error, emailExistsError } = this.state

    var mailFormat = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/


    if (!username.match(mailFormat)) {
      this.setState({ usernameError: true, error: true })
    } else {
      this.setState({ usernameError: false })
    }

    if (!username.match(mailFormat) && (password.length <= 8)) {
      this.setState({ passwordError: true, error: true })
    } else {
      this.setState({ usernameError: false })
    }

    if (error == true) {
      this.setState({ formSuccess: false })
    } else {
      this.setState({ formSuccess: true })
    }

    console.log(`error ${this.state.error}`)

    window.fetch('http://localhost:8016/users/registration', {
      method: 'POST',
      headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
      body: JSON.stringify({ username_email: username, password: password })
    })
      .then(this.handleErrors)
      .then(function (response) {
        console.log(`response ${response}`)
        return response.json()
      }).then(function (data) {

        console.log('User created:', data)
      }).catch(function (error) {
        console.log(error);
      });

  }

  render() {
    var { username, password, usernameError, passwordError, formSuccess, emailExistsError, error } = this.state;

    return (<div className='login-form'> {
      /*
      Heads up! The styles below are necessary for the correct render of this example.
      You can do same with CSS, the main idea is that all the elements up to the `Grid`
      below must have a height of 100%.
    */
    }<style>{`body > div, body > div > div, body > div > div > div.login-form { height: 100%;}`} </style>

      <Grid textAlign='center'
        style={{ height: '100%' }}
        verticalAlign='middle' >
        <Grid.Column style={{ maxWidth: 450 }}>
          <Header as='h2'
            color='teal'
            textAlign='center'>
            Register for an account
            {/* {isLoggedIn ? `Register for an account` : ` Log-in to your account`} */}
          </Header>

          <Form size='large'
            onSubmit={this.handleSubmit}
            error={!formSuccess || usernameError || passwordError}
            success={formSuccess}>
            <Segment stacked>
              <Form.Input fluid icon='user'
                iconPosition='left'
                placeholder='E-mail address, e.g. joe@schmoe.com'
                name='username'
                value={username}
                onBlur={this.handleBlur}
                onChange={this.handleChange}
                error={usernameError}
              />

              <Transition visible={usernameError}
                animation='scale'
                duration={500}>
                <Message error content='username_Email is in incorrect format e.g. joe@schmoe.com' />
              </Transition>

              <Form.Input fluid icon='lock'
                iconPosition='left'
                placeholder='Password'
                name='password'
                value={password}
                onBlur={this.handleBlur}
                onChange={this.handleChange}
                error={passwordError}
              />

              <Transition visible={passwordError}
                animation='scale'
                duration={500}>
                <Message error content='Password needs to be greater than eight characters.' />
              </Transition>

              <Button color='teal'
                fluid size='large'
                disabled={!username || !password || error}>
                Register
                {/* {isLoggedIn ? `Register` : `Log-in`} */}
              </Button>

              {console.log("emailExistsError ", emailExistsError)}
              {<Transition visible={emailExistsError && error}
                animation='scale'
                duration={500}>
                <Message error centered="true" header='This email exists.'
                  content='Please re-enter another email address.' />
              </Transition>}

              <Transition visible={formSuccess && !emailExistsError && !error}
                animation='scale'
                duration={500}>
                <Message success header='Your user registration was successful.'
                  content='You may now log-in with the username you have chosen.' />
              </Transition>
            </Segment>
          </Form>

          {formSuccess && !emailExistsError ?
            <Transition visible={formSuccess && !emailExistsError}
              animation='scale'
              duration={1000}>
              <Message>
                <Link href="/login">
                  <a>Login</a>
                </Link> </Message>
            </Transition>
            : null
          }
        </Grid.Column> </Grid> </div>
    )
  }
}
export default RegisterForm