import * as types from './actionTypes';
import update from 'immutability-helper';

const INITIAL_STATE = {
	apiProjects: null,
	sortProjects: null,
	commentWindow: null
}

export const PROJECT_WEBSITE = 'website';
export const PROJECT_OTHER = 'other';

export function dashboard(state = INITIAL_STATE, action = {}) {
	switch(action.type) {
		case types.GET_PROJECTS:
			return {
				...state,
				apiProjects: action.payload,
				sortProjects: state.sortProjects ? synchronizeProjects(state, action.payload) : action.payload
			}
		case types.ADD_COMMENT:
			return {
				...state,
				sortProjects: AddComment(state, action.payload)
			}
		case types.MOVE_PROJECT:
			const { dragIndex, hoverIndex, dragProject } = action.payload;
			
			return update(state, {
					sortProjects: {
					  $splice: [[dragIndex, 1], [hoverIndex, 0, dragProject]],
					}
			  })
		case types.TOGGLE_COMMENT_WINDOW:
			return {
				...state,
				commentWindow: action.payload
			}
		default:
			return state;
			
	}
}

function AddComment(state, project) {
	const { sortProjects } = state;

	let newSortProjects = [...sortProjects];

	sortProjects.map((item, i) => {
		if(item.id === project.id) {
			newSortProjects.splice(i, 1, project)
		}
	})

	return newSortProjects;
}

function synchronizeProjects(state, apiProjects) {
	const { sortProjects } = state;

	var newApiProjects = [...apiProjects]
	var newSortProjects = [];

	sortProjects.map((project) => {
		newApiProjects.map((item, i) => { 
			if(item.id === project.id) {
				newSortProjects.push(newApiProjects.splice(i, 1)[0]);
			} 
			return false;
		})
		return false;
	})

	if(newApiProjects.length) {
		newApiProjects.map((item) => newSortProjects.push(item))
	}
	
	return newSortProjects;
}