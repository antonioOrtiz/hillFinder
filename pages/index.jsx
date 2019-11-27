import React, { Component } from 'react'
import { connect } from 'react-redux'
import { logInUser, logOutUser } from '../store/index'
import { bindActionCreators } from 'redux'

import {
 BrowserRouter as Router,
 Switch,
 Route,
 Redirect,

 withRouter
} from 'react-router-dom'

import LinkNavWithLayout from './LinkNavWithLayout'
import Index from './home'
import Profile from './profile'
import Dashboard from './dashboard'
import Login from './login'
import Register from './register'

class App extends Component {
 static getInitialProps({ store, isLoggedIn, logInUser, logOutUser }) {
  return { store, isLoggedIn, logInUser, logOutUser }
 }

 constructor(props) {
  super(props)
 }

 render(){
  const { isLoggedIn } = this.props;

 console.log("pages/index this.props ", this.props);
  let navBars = [
   { name: "Home", path: "/"},
   { name: "Profile", path: "/profile"},
   { name: "Dashboard", path: "/dashboard"},
   { name: "Log in", path: "/login"},
   { name: "Register", path: "/register"}
  ];

  function PrivateRoute({ children, ...rest }) {
   return (
    <Route
     {...rest}
     render={({ location }) =>
      isLoggedIn ? (
       children
      ) : (
        <Redirect
         to={{
          pathname: "/login",
          state: { from: location }
         }}
        />
       )
     }
    />
   );
  }

  return (
    <>
    <Switch>
     <Route
      path='/'
      exact
      render={(props) => <LinkNavWithLayout {...props} data={navBars}><Index /></LinkNavWithLayout>} />

     <PrivateRoute
      path='/profile'
      isLoggedIn={isLoggedIn}
      >
      <LinkNavWithLayout data={navBars}><Profile /></LinkNavWithLayout>
     </PrivateRoute>

     <PrivateRoute
      path='/dashboard'
      isLoggedIn={isLoggedIn}
     >
      <LinkNavWithLayout data={navBars}><Dashboard /></LinkNavWithLayout>
     </PrivateRoute>

     <Route
      path='/login'
      render={(props) => <Login {...props}/>}
     />

     <Route
      path='/register'
      render={() => <Register />}
     />

     <Route component={({ location }) => <p>Sorry but the page <h1>{location.pathname.substring(1)} </h1> Page, Could Not be found</p>} />
    </Switch>
    </>
  )
 }
}

function mapStateToProps(state) {
 const { isLoggedIn } = state
 return { isLoggedIn }
}

const mapDispatchToProps = dispatch =>
 bindActionCreators({ logInUser, logOutUser }, dispatch)

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App))
