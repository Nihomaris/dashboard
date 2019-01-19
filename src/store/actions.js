import * as types from './actionTypes';
import * as dashboardApi from '../services/dashboard_api';

// import { PROJECTS } from './list';

export const getProjects = () => {
	return dispatch => {
		fetch(dashboardApi.get_projects.url, {
	      method: dashboardApi.get_projects.method,
	      headers: {
	        'content-type': 'application/json'
	      }
    	})
		.then((res) => { return res.json() })
		.then((data) => { dispatch({type: types.GET_PROJECTS, payload: data})	})
		.catch((err) => { console.error('Не удалось получить список проектов') })
	}
	
	/*return dispatch => {
		const oldProjects = [...PROJECTS];
		var count = oldProjects.length;
		PROJECTS.push({
	        "id": count++,
	        "title": "She",
	        "type": "website",
	        "comment": "5",
	        "result": "AssertionError('Status code 5004',)",
	        "last_check": "2019-01-18T18:50:26.155261+03:00"
	    })
	    console.log(count)
		dispatch({type: types.GET_PROJECTS, payload: oldProjects})
	}*/
}

export const addComment = (data) => {
	return dispatch => {
		fetch(dashboardApi.add_comment.url + data.id, {
	      method: dashboardApi.add_comment.method,
	      headers: {
	        'content-type': 'application/json'
	      },
	      body: JSON.stringify(data.comment)
    	})
		.then((res) => { return res.json() })
		.then((data) => { dispatch({type: types.ADD_COMMENT, payload: data}) })
		.catch((err) => { console.error('Не удалось отправить комментарий') })
	}
}

export const moveProject = (data) => {
	return dispatch => {
		dispatch({type: types.MOVE_PROJECT, payload: data})
	}
}

export const toggleCommentWindow = (data) => {
	return dispatch => {
		dispatch({type: types.TOGGLE_COMMENT_WINDOW, payload: data})
	}
}