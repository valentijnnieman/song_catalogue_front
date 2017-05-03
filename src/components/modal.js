import React from 'react';

export class Modal extends React.Component {
  constructor(props) {
    super(props)
    this.state = {revealed: false}
    this.reveal_content = this.reveal_content.bind(this)
  }
  reveal_content() {
    this.setState({
      revealed: !this.state.revealed
    });
  }
  render() {
    return <div className='modal_container'>
      <button className={this.props.sub ? 'button button--sub' : 'button'} onClick={this.reveal_content}>
        {this.props.label}
      </button>
      <div className={this.state.revealed ? 'modal' : 'modal modal--hidden'} onClick={this.reveal_content}>
        <div className='modal__content' onClick={(e) => e.stopPropagation()}>
          <button className={this.props.sub ? 'button button--sub' : 'button'} onClick={this.reveal_content}>
            x
          </button>
          {this.props.children}
        </div>
      </div>
    </div>
  }
}

export default Modal 
