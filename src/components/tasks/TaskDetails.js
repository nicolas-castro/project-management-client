import React, { Component } from 'react';
import axios from 'axios';
import EditTask from './EditTask'


class TaskDetails extends Component {
  constructor(props){
    super(props);
    this.state = {};
  }

  componentDidMount(){
    this.getTheTask();
  }

  getTheTask = () => {
    const { params } = this.props.match;
    axios.get(`http://localhost:5000/api/projects/${params.id}/tasks/${params.taskId}`)
    .then( responseFromApi =>{
      const theTask = responseFromApi.data;
      this.setState(theTask);
    })
    .catch((err)=>{
        console.log(err)
    })
  }

  renderEditForm = () => {
    if(!this.state.title){
      this.getTheTask();
    } else {
    // {...props} => so we can have 'this.props.history' in Edit.js
    //                                                                                          ^
    //                                                                                          |
      return <EditTask theTask={this.state} getTheTask={this.getTheTask} {...this.props} />
        
    }
  }

  render(){
    return(
      <div>
        <h1>{this.state.title}</h1>
        <p>{this.state.description}</p>
        <br></br>
        <div>{this.renderEditForm()} </div>
      </div>
    )
  }
}

export default TaskDetails;