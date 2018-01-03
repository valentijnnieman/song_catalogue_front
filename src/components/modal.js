import React from 'react';
import './modal.scss'

export class Modal extends React.Component {
  constructor(props) {
    super(props)
    this.state = {revealed: false}
    this.reveal_content = this.reveal_content.bind(this)
  }
  reveal_content(e) {
    e.stopPropagation()
    this.setState({
      revealed: !this.state.revealed
    });
  }
  render() {
    if(this.props.wide) {
      return <div className='modal_container'>
        <a className={this.props.sub ? 'fr song-modal__close song-modal__close--sub' : 'fr song-modal__close'} onClick={this.reveal_content}>
          {this.props.label}
        </a>
        <div className={this.state.revealed ? 'song-modal' : 'song-modal song-modal--hidden'} onClick={this.reveal_content}>
          <div className='song-modal__content' onClick={(e) => e.stopPropagation()}>
            {this.props.children}
          </div>
        </div>
      </div>
    }
    return <div className='modal_container'>
      <button className={this.props.sub ? 'btn-floating btn-sub fr' : 'btn-floating fl'} onClick={this.reveal_content}>
        {this.props.label}
      </button>
      <div className={this.state.revealed ? 'song-modal' : 'song-modal song-modal--hidden'} onClick={this.reveal_content}>
        <div className='song-modal__content' onClick={(e) => e.stopPropagation()}>
          {this.props.children}
        </div>
      </div>
    </div>
  }
}

export default Modal 
