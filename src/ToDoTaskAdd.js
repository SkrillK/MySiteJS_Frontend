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
			brand: '',
			name: '',
			color: '',
			form: '',
			strings: ''
		}
		this.onBrandChange = this.onBrandChange.bind(this);
		this.onNameChange = this.onNameChange.bind(this);
		this.onColorChange = this.onColorChange.bind(this);
		this.onFormChange = this.onFormChange.bind(this);
		this.onStringsChange = this.onStringsChange.bind(this);
		this.onAddFormSubmit = this.onAddFormSubmit.bind(this);
	}
	onBrandChange(e) {
		e.preventDefault();
		this.setState({
			brand: e.target.value
		});
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
				brand: this.state.brand,
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
			this.props.dispatch(todoAdd(data._id, data.brand, data.name, data.color, data.form, data.strings));
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
				<form onSubmit={this.onAddFormSubmit}>
				<div className="widget-content">
					<div className="widget-content-wrapper">
						<select
							name="brand"
							value={this.state.brand}
							onChange={this.onBrandChange}
							className="form-control"
							required>
							<option value="" disabled>Brand</option>
							<option value="Fender">Fender</option>
							<option value="Gibson">Gibson</option>
							<option value="Ibanez">Ibanez</option>
							<option value="Jackson">Jackson</option>
							<option value="Schecter">Schecter</option>
							<option value="Luxars">Luxars</option>
							<option value="ESP">ESP</option>
						</select>

						<input type="text" value={this.state.name} onChange={this.onNameChange} placeholder="Model" className="form-control" />
						<input type="text" value={this.state.color} onChange={this.onColorChange} placeholder="Color" className="form-control" />
						<select
							name="form"
							value={this.state.form}
							onChange={this.onFormChange}
							className="form-control"
							required>
							<option value="" disabled>Form</option>
							<option value="Explorer">Explorer</option>
							<option value="Stratocaster">Stratocaster</option>
							<option value="Superstrat">Superstrat</option>
							<option value="Les Paul">Les Paul</option>
							<option value="Headless">Headless</option>
						</select>
						<select
							name="strings"
							value={this.state.strings}
							onChange={this.onStringsChange}
							className="form-control"
							required>
							<option value="" disabled>Strings</option>
							<option value="6">6</option>
							<option value="7">7</option>
							<option value="8">8</option>
						</select>
					</div>
				</div>
				</form> 
				
				<div className="d-block text-right card-footer" >
					<form onSubmit={this.onAddFormSubmit}>
						<input type="submit" value="Add" className="btn btn-primary" />
					</form>
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
