import { combineReducers } from 'redux';
import { TODO_ADD, TODO_ADD_ALL, TODO_DELETE, TODO_UPDATE_STATE, TODO_FULL_UPDATE } from './actions';

function todo(state = [], action) {
	switch (action.type) {
		case TODO_ADD:
			return [
				...state,
				{
					_id: action._id,
					brand: action.brand,
					name: action.name,
					color: action.color,
					form: action.form,
					strings: action.strings,
					done: false
				}
			]
		case TODO_ADD_ALL:
			return [
				...action.todo_list
			]
		case TODO_DELETE:
			return state.filter(task => task._id !== action._id)
		case TODO_UPDATE_STATE:
			return state.map(task =>
				task._id === action._id ? { ...task, done: !task.done } : task
			)
		case TODO_FULL_UPDATE:
			return state.map(task =>
				task._id === action._id ? {
					...task,
					brand: action.brand,
					name: action.name,
					color: action.color,
					form: action.form,
					strings: action.strings
				} : task
			)
		default:
			return state
	}
}

const initialOptions = {
	brands: [],
	colors: [],
	forms: [],
	stringsOptions: []
};

function options(state = initialOptions, action) {
	switch (action.type) {
		case 'UPDATE_OPTIONS':
			return {
				...state,
				brands: action.brands || state.brands,
				colors: action.colors || state.colors,
				forms: action.forms || state.forms,
				stringsOptions: action.stringsOptions || state.stringsOptions
			};
		default:
			return state;
	}
}

export default combineReducers({
	tasks: todo,
	options: options
});