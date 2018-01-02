import React from 'react';
import './login.scss';
import {fetchLogin, fetchRegister, fetchPasswordReset} from '../actions/songs.js'
import store from '../store.js';

class LoginContainer extends React.Component {
  constructor(props) {
    super(props)
    this.state = { currentTab: 'login' }
    this.clickTab = this.clickTab.bind(this)
  }
  clickTab(clickedTab) {
    this.setState({currentTab: clickedTab})
  }
  render() {
    let tabElement
    switch(this.state.currentTab) {
      case 'login': 
        tabElement = <Login message={this.props.message} />
        break
      case 'register':
        tabElement = <Register message={this.props.message} />
        break
    }
      return <div className='home-container'>
        <h1 className='home__title'>A song-writer's companion</h1>
        <p className='home__subtitle'>Catalogue the songs that you are writing and get insights on each iteration of the song you're writing</p>
        <div className='home'>
          <div>
            <Tab 
              label="Login" 
              thisTab='login' 
              currentTab={this.state.currentTab} clickHandler={this.clickTab} 
            />
            <Tab 
              label="Register" 
              thisTab='register' 
              currentTab={this.state.currentTab} clickHandler={this.clickTab} 
            />
          </div>
          {tabElement}
        </div>
      </div>
  }
}

const Tab = ({label, thisTab, currentTab, clickHandler}) => {
  const isSelected = () => {
    if(thisTab == currentTab) {
      return "home__tab home__tab--selected"
    }
    else return "home__tab"
  }
  return <div 
    className={isSelected()} 
    onClick={() => {clickHandler(thisTab)}}>{label}
  </div>
}

let Login = ({dispatch, message}) => {
  let email, password

  return <div className='login'>
    <div className='notice'>{message}</div>
    <form className='form--login' onSubmit={e => {
      e.preventDefault()
      if (!email.value.trim()) {
        return
      }
      store.dispatch(fetchLogin(email.value, password.value))
    }}>
    <input className="input input--sub" placeholder="Email adress" ref={node => {
      email = node
    }} />
    <input type='password' className="input input--sub" placeholder="Password" ref={node => {
      password = node
    }} />
    <button type="submit" className="btn btn-large">Login</button>
    </form>
  </div>
}

const Register = () => {
  let email, password, passwordCheck

  return <div className='register'>
    <form className='form--login' onSubmit={e => {
      e.preventDefault()
      if (!email.value.trim()) {
        return
      }
      if (password.value === passwordCheck.value) {
        store.dispatch(fetchRegister(email.value, password.value))
      }
      else {
      }
    }}>
    <input className="input input--sub" placeholder="Email adress" ref={node => {
      email = node
    }} />
    <input type='password' className="input input--sub" placeholder="Password" ref={node => {
      password = node
    }} />
    <input type='password' className="input input--sub" placeholder="Repeat password" ref={node => {
      passwordCheck = node
    }} />
    <button type="submit" className="btn btn-large">Register</button>
    </form>
  </div>
}

export const ResetPassword = ({token}) => {
  let email, password, newPassword, newPasswordCheck

  return <div className='reset-password'>
    <form className='form--reset' onSubmit={e => {
      e.preventDefault()
      if (!email.value.trim()) {
        return
      }
      if (newPassword.value === newPasswordCheck.value) {
        store.dispatch(fetchPasswordReset(token, email.value, password.value, newPassword.value))
      }
      else {
      }
    }}>
    <input className="input input--sub" placeholder="Re-enter your email adress" ref={node => {
      email = node
    }} />
    <input type='password' className="input input--sub" placeholder="Re-enter your current password" ref={node => {
      password = node
    }} />
    <input type='password' className="input input--sub" placeholder="New password" ref={node => {
      newPassword = node
    }} />
    <input type='password' className="input input--sub" placeholder="Repeat new password" ref={node => {
      newPasswordCheck = node
    }} />
    <button type="submit" className="btn btn-large">Reset password</button>
    </form>
  </div>
}

export default LoginContainer
