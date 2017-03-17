import React from 'react';

export class Accordion extends React.Component {
  constructor(props) {
    super(props)
    this.state = {revealed: false}

    this.reveal_content = this.reveal_content.bind(this)
  }
  reveal_content() {
    this.setState({
      revealed: !this.state.revealed
    });
    console.log(this.state.revealed)
  }
  render() {
    let accordion_class = null
    if(!this.state.revealed) {
      accordion_class = 'accordion__content accordion__content--hidden';
    } else {
      accordion_class = 'accordion__content';
    }
    let content = <div className={accordion_class}>
      {this.props.children}
    </div>
    let button = <div className='accordion__button' onClick={this.reveal_content}></div>
    if(this.props.sub) {
      button = <div className='accordion__button accordion__button--sub' onClick={this.reveal_content}></div>
    }

    return <div className='accordion'>
      {button}<span>{this.props.title}</span>
      {content}
    </div>
  }
}

export default Accordion
