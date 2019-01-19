
const API_HOST = 'https://novaweb.studio/';

export const get_projects = {
	url: API_HOST + 'dashboard/_api/projects/?format=json',
	method: 'GET'
}

export const add_project = {
	url: API_HOST + 'dashboard/_api/projects/',
	method: 'POST'
}

export const remove_project = {
	url: API_HOST + 'dashboard/_api/projects/',
	method: 'DELETE'
}

export const add_comment = {
	url: API_HOST + 'dashboard/_api/projects/',
	method: 'PATCH'
}