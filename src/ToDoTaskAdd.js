import React from 'react';
import { useNavigate, NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { todoAdd } from './actions';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGuitar } from '@fortawesome/free-solid-svg-icons';

class ToDoTaskAddInner extends React.Component {
	constructor(props) {
		super(props);
		this.state= {
			name: '',
			color: '',
			form: '',
			strings: ''
		}
		this.onNameChange = this.onNameChange.bind(this);
		this.onColorChange = this.onColorChange.bind(this);
		this.onFormChange = this.onFormChange.bind(this);
		this.onStringsChange = this.onStringsChange.bind(this);
		this.onAddFormSubmit = this.onAddFormSubmit.bind(this);
	}
	onNameChange(e) {
		e.preventDefault();
		this.setState({
			name: e.target.value
		});
	}
	onColorChange(e) {
		e.preventDefault();
		this.setState({
			color: e.target.value
		});
	}
	onFormChange(e) {
		e.preventDefault();
		this.setState({
			form: e.target.value
		});
	}
	onStringsChange(e) {
		e.preventDefault();
		this.setState({
			strings: e.target.value
		});
	}
	onAddFormSubmit(e){
		e.preventDefault();
		fetch('tasks',{
			method: 'POST',
			body: JSON.stringify({
				name: this.state.name,
				color: this.state.color,
				form: this.state.form,
				strings: this.state.strings
			}),
			headers: {
				'Content-Type': 'application/json'
			}
		}).then((res) => {
			return res.json();
		}).then((data) =>{
			this.props.dispatch(todoAdd(data._id, data.name, data.color, data.form, data.strings));
			this.props.history('/');
		}); 
	}
	render() {
		return (
			<div className="card-hover-shadow-2x mb-3 card">
				<div className="card-header-tab card-header">
					<div className="card-header-title font-size-lg text-capitalize font-weight-normal">
						<FontAwesomeIcon icon={faGuitar} />&nbsp;Add Guitar
					</div>
				</div>
				<form onSubmit={this.onAddFormSubmit} >
				<div className="widget-content">
					<div className="widget-content-wrapper">
						<input type="text" value={this.state.name} onChange={this.onNameChange} placeholder="Name" className="form-control" />
						<input type="text"value={this.state.color} onChange={this.onColorChange} placeholder="Color" className="form-control" />
						<input type="text"value={this.state.form} onChange={this.onFormChange} placeholder="Form" className="form-control" />
						<input type="text"value={this.state.strings} onChange={this.onStringsChange} placeholder="Strings" className="form-control" />
						<input type="submit" value="Add" className="btn btn-primary" />
					</div>
				</div>
				</form> 
				<div className="d-block text-right card-footer" >
					<NavLink to='/' className="btn btn-primary"> Back to list </NavLink>
				</div>
			</div>
		)
	}
}
const ToDoTaskAdd = (props) => {
	return (
		<ToDoTaskAddInner {...props} history={useNavigate()} />
	)
}
export default connect()(ToDoTaskAdd);
