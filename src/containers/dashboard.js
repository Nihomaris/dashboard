import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as Actions from '../store/actions';
import Project from '../components/project';

class Dashboard extends Component {

  moveCard(dragIndex, hoverIndex) {

    const { projects } = this.props;
    const dragProject = projects[dragIndex]
    
    this.props.moveProject({dragIndex, hoverIndex, dragProject})
  }

  render() {
      const { projects } = this.props;
      const { itemtype, toggleCommentWindow, commentWindow, addComment } = this.props;

      return (   
        <section className="dashboard">

          <div className="container">
            <div className="row justify-content-center">
              <div className="col-sm col-md-4">

                <article className="dashboard__container">
                  <div className="container">
                    <div className="row align-items-center">
                      
                      <div className="col-12">

                         {(projects && projects.map((project, i) => (renderProject(project, itemtype, toggleCommentWindow, commentWindow, addComment, this.moveCard.bind(this), i)))) || renderLoading() }
                          
                      </div>

                    </div>
                  </div>
                </article>

              </div>
            </div>
          </div>

        </section>
      )
  }     

}


function renderLoading() {
  return (
    <h3 style={{'color': 'black', 'textAlign': 'center'}}>
    Loading
    </h3>
  )
}

function renderProject(project, itemtype, toggleCommentWindow, commentWindow, addComment, movecard, i) {
  if(project.type === itemtype) {
    return ( 
      <Project
        itemtype={itemtype}
        project={project}
        key={project.id}
        index={i}
        id={project.id}
        type={project.type}
        title={project.title}
        comment={project.comment}
        result={project.result}
        moveCard={movecard}
        toggleCommentWindow={toggleCommentWindow}
        commentWindow={commentWindow}
        addComment={addComment}
      />
    )
  } 
}


export default connect(
  state => ({
    projects: state.dashboard.sortProjects,
    commentWindow: state.dashboard.commentWindow
  }),
  dispatch => ({
    addComment: (data) => {
      dispatch(Actions.addComment(data))
    },
    moveProject: (data) => {
      dispatch(Actions.moveProject(data))
    },
    toggleCommentWindow: (data) => {
      dispatch(Actions.toggleCommentWindow(data))
    }
  })
)(Dashboard);