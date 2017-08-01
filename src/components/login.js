import React from 'react';
import './login.scss';
import {fetchLogin} from '../actions/songs.js'
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
          <nav>
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
          </nav>
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
  let username, password

  return <div className='login'>
    <div className='notice'>{message}</div>
    <form className='form--login' onSubmit={e => {
      e.preventDefault()
      if (!username.value.trim()) {
        return
      }
      store.dispatch(fetchLogin(username.value, password.value))
    }}>
    <input className="input input--sub" placeholder="Email adress" ref={node => {
      username = node
    }} />
    <input type='password' className="input input--sub" placeholder="Password" ref={node => {
      password = node
    }} />
    <button type="submit" className="button button--sub button--wide">Login</button>
    <button className="button button--wide notice-box" onClick={() => store.dispatch(fetchLogin('demo', 'demo123'))}>See a live demo</button>
    </form>
  </div>
}

const Register = () => {
  let username, password, passwordCheck

  return <div className='register'>
    <form className='form--login' onSubmit={e => {
      e.preventDefault()
      if (!username.value.trim()) {
        return
      }
      if (password.value === passwordCheck.value) {
        console.log("it all checks out, let's register!")
      }
      else {
        console.log("something went wrong!")
        console.log(username.value, password.value, passwordCheck.value)
      }
      //store.dispatch(fetchLogin(username.value, password.value))
    }}>
    <input className="input input--sub" disabled="disabled" placeholder="Email adress" ref={node => {
      username = node
    }} />
    <input type='password' className="input input--sub" disabled="disabled" placeholder="Password" ref={node => {
      password = node
    }} />
    <input type='password' className="input input--sub" disabled="disabled" placeholder="Repeat password" ref={node => {
      passwordCheck = node
    }} />
    <button type="submit"disabled="disabled" className="button button--sub button--wide">Register (disabled)</button>
    </form>
  </div>
}

export default LoginContainer
