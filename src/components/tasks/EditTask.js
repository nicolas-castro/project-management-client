import React, { Component } from 'react';
import axios from 'axios';

class EditTask extends Component {
  constructor(props){
    super(props);
    this.state = {
        title: this.props.theTask.title, 
        description: this.props.theTask.description
    }
  }

    
  handleFormSubmit = event => {
    event.preventDefault();
    const { title, description} = this.state
    // const title = this.state.title;
    // const description = this.state.description;

    ///api/tasks/:id
    axios.put(`http://localhost:5000/api/tasks/${this.props.theTask._id}`, { title, description })
    .then( () => {
        this.props.getTheTask();
        // after submitting the form, redirect to '/projects'
        this.props.history.push('/projects');    
    })
    .catch( error => console.log(error) )
  }

  handleChange = (event) => {  
    const {name, value} = event.target;
    this.setState({[name]: value});
}

  render(){
    return (
      <div>
        <hr />
        <h3>Edit Task</h3>
        <form onSubmit={this.handleFormSubmit}>
          <label>Title:</label>
          <input type="text" name="title" value={this.state.title} onChange={e => this.handleChange(e)}/>
          <label>Description:</label>
          <textarea name="description" value={this.state.description} onChange={e => this.handleChange(e)} />
          
          <input type="submit" value="Submit" />
        </form>
      </div>
    )
  }
}

export default EditTask;