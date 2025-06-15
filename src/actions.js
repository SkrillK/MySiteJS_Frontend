export const TODO_ADD = 'TODO_ADD'
export const TODO_ADD_ALL = 'TODO_ADD_ALL'
export const TODO_DELETE = 'TODO_DELETE'
export const TODO_UPDATE_STATE = 'TODO_UPDATE_STATE'
export const TODO_FULL_UPDATE = 'TODO_FULL_UPDATE'


export function todoAdd(_id, brand, name, color, form, strings){
	return { type: TODO_ADD, _id, brand, name, color: color, form: form, strings: strings}
}
export function todoAddAll(todo_list){
	return { type: TODO_ADD_ALL, todo_list }
}
export function todoDelete(_id){
	return { type: TODO_DELETE, _id }
}
export function todoUpdateState(_id){
	return { type: TODO_UPDATE_STATE, _id }
}
export function todoFullUpdate(_id){
	return { type: TODO_FULL_UPDATE, _id }
}