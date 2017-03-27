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
  }
  render() {
    return <div className='accordion'>
      <div className={this.props.sub ? 'accordion__button accordion__button--sub' : 'accordion__button'} onClick={this.reveal_content}>
        <span>{this.props.title}</span>
      </div>
      <div className={this.state.revealed ? 'accordion__content' : 'accordion__content accordion__content--hidden'}>
        {this.props.children}
      </div>
    </div>
  }
}

export default Accordion
