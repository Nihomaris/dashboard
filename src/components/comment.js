import React, { Component } from 'react';


class Comment extends Component {
	
	constructor(props) {
		super(props);
		this.state = { comment: '' };
		this.updateInputVal = this.updateInputVal.bind(this)
		this.sendComment = this.sendComment.bind(this)
	}

	updateInputVal(e) {
		this.setState({
			comment: e.target.value
		})
	}
	
	sendComment() {
		const { project, addComment, closeFn } = this.props;
		if( !this.state.comment ) { return; }
		// console.log({id: project.id, comment: {'comment': this.state.comment}})
		addComment({id: project.id, comment: {'comment': this.state.comment}})
		closeFn(null)
	}

	render() {
		  const { project, closeFn } = this.props;
		  return (          
		    <div className="project_comment_container">
		      <div className="container">
		        <div className="row">
		          <div className="col-12">
		            <div className="alert alert-success project_comment">
		              <span>{ project.comment }</span>
		            </div>
		          </div>
		        </div>
		      </div>
		      <div className="input-group">
		      	<input type="text" onChange={this.updateInputVal} className="form-control" />
		      </div>
		      <div className="input-group">
		        <div className="input-group-append" style={{'marginLeft': 'auto'}}>
		          <button onClick={this.sendComment}className="btn btn-outline-secondary" type="button">Send</button>
		          <button onClick={closeFn} className="btn btn-outline-secondary" type="button">Close</button>
		        </div>
		      </div>
		      
		    </div>
		  )
	}     

}

function parseComments() {

}
export default Comment;