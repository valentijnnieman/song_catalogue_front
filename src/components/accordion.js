import React from 'react';
import './accordion.scss';

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
  content_classes() {
    let classes = 'accordion__content'
    if(!this.state.revealed) classes += ' accordion__content--hidden';
    if(this.props.sub) classes += ' accordion__content--sub';
    return classes
  }
  render() {
    return <div className='accordion'>
      <nav className={this.props.sub ? 'accordion__button accordion__button--sub' : 'accordion__button'} onClick={this.reveal_content}>
        <div className="nav-wrapper">
          <ul className='left'>
            <li><span>{this.props.title}</span></li>
          </ul>
          <ul className='right'>
            <li>{this.props.button}</li>
          </ul>
        </div>
      </nav>
      <div className={this.content_classes()}>
        {this.props.children}
      </div>
    </div>
  }
}

export default Accordion