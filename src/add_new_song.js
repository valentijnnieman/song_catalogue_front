import React from 'react';

export class AddNewSong extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      title: "New song",
      notes: "",
      lyrics: ""
    }

    this.change_state = this.change_state.bind(this)
    this.add_new_song= this.add_new_song.bind(this)
  }
  add_new_song(event) {
    event.preventDefault()
  }
  change_state(event) {
    this.setState({title: event.target.value})
  }
  render() {
    return <form onSubmit={this.add_new_song}>
        <input value={this.state.title} onChange={this.change_state}/>
        <input name='notes' />
        <input name='lyrics' />
        <input type='submit' />
      </form>
  }
};

export default AddNewSong 
