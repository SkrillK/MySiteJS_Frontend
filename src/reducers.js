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
			return state.filter(function(task){
				return task._id !== action._id;
			})
		 case TODO_UPDATE_STATE:
			return  state.map(function(task) {
				if (task._id === action._id) {
					return {...task, done: !task.done}
				}
				return task
			})
		case TODO_FULL_UPDATE:
            return state.map(function (task) {
                if (task._id === action._id) {
                    return {
                        ...task,
						brand: action.brand,
                        name: action.name,
                        color: action.color,
						form: action.form,
                        strings: action.strings
                    };
                }
                return task
            })
		 default: 
			return state
	 }
 }
 
 export default combineReducers({
	 tasks: todo
 })