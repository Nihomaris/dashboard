import React, { Component } from 'react';
import { findDOMNode } from 'react-dom';
import { DragSource,DropTarget } from 'react-dnd';
// import { XYCoord } from 'dnd-core';

import { PROJECT_WEBSITE, PROJECT_OTHER } from '../store/reducers';
import Comment from './comment';

const ItemTypes = {
  type: 'project',
}

const cardSource = {
  beginDrag(props) {
    props.toggleCommentWindow(null)
    return {
      id: props.id,
      index: props.index,
    }
  }
}

const cardTarget = {
  hover(props, monitor, component) {
    if (!component) {
      return null;
    }
    const dragIndex = monitor.getItem().index
    const hoverIndex = props.index

    if (dragIndex === hoverIndex) {
      return
    }

    const hoverBoundingRect = findDOMNode(component).getBoundingClientRect()

    const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2

    const clientOffset = monitor.getClientOffset()

    const hoverClientY = clientOffset.y - hoverBoundingRect.top


    if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
      return
    }

    if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
      return
    }

    props.moveCard(dragIndex, hoverIndex)

    monitor.getItem().index = hoverIndex
  },
}

function targetConnect(connect) {
  return {
    connectDropTarget: connect.dropTarget(),
  }
}
function sourceConnect(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging(),
  }
}

class Project extends Component {
  
  openCommentWindow() {
    const { project, commentWindow, toggleCommentWindow } = this.props;
    if(commentWindow && project.id === commentWindow.id) {
      toggleCommentWindow(null);
    } else {
      toggleCommentWindow(project);
    } 
  }

  render() {
      const { id, type, title, comment, result, project, itemtype, commentWindow } = this.props;
      const { text, isDragging, connectDragSource, connectDropTarget, } = this.props;
      const opacity = isDragging ? 0 : 1;
      

      return connectDragSource(connectDropTarget(
        <section className="project" style={{ opacity }}>       
          
            <div className="container project_info">
              <div className="row align-items-center" style={{'height': '100%'}}>
                <div className="col-4">
                  <span>{ type || 'неизвестно' }<br/><strong>{ title || 'неизвестно' }</strong></span>
                </div>
                <div className="col-4">
                   <span>status:<br/><strong>{ getStatus(result, itemtype) }</strong></span>
                </div>
                <div className="col-4">
                  <button onClick={this.openCommentWindow.bind(this)} className="btn btn-success">write</button>
                </div>
              </div>
            </div>
             { commentWindow && commentWindow.id === project.id && <RenderCommentWindow data={this.props} /> }
        
        </section>
      ))
  }     

}


function RenderCommentWindow(props) {
  const { project, toggleCommentWindow, addComment } = props.data;
  return <Comment closeFn={toggleCommentWindow} project={project} addComment={addComment} />
}

function getStatus(result, itemtype) {
  let status = '';

  switch(itemtype) {
    case PROJECT_WEBSITE:
      if(typeof(result) === 'string') {
        status = result;
      } else {
        status = '200';
      }      
      return status;
    case PROJECT_OTHER:
      result ? status = 'ON' : status = 'OFF';
      return status;
    default:
      status = 'Неизвестно';
      return status;
  }

}

let ProjectTarget = DropTarget( ItemTypes.type, cardTarget, targetConnect )(Project);
    ProjectTarget = DragSource( ItemTypes.type, cardSource, sourceConnect )(ProjectTarget);
export default ProjectTarget;