import React from 'react';
import { useNavigate, NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { todoAdd, updateOptions } from './actions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGuitar, faPlus } from '@fortawesome/free-solid-svg-icons';

class OptionAdder extends React.Component {
	constructor(props) {
		super(props);
		this.state = { newValue: '' };
		this.onSubmit = this.onSubmit.bind(this);
		this.onChange = this.onChange.bind(this);
	}

	onChange(e) {
		this.setState({ newValue: e.target.value });
	}

	onSubmit(e) {
		e.preventDefault();
		if (this.state.newValue.trim()) {
			this.props.onAdd(this.state.newValue);
			this.setState({ newValue: '' });
		}
	}

	render() {
		return (
			<div className="form-group">
				<label>{this.props.label}</label>
				<select
					name={this.props.name}
					value={this.props.selectedValue}
					onChange={this.props.onChange}
					className="form-control mb-2"
					required
				>
					<option value="" disabled>Select {this.props.label.toLowerCase()}</option>
					{this.props.options.map((option, index) => (
						<option key={index} value={option}>{option}</option>
					))}
				</select>

				<div className="input-group mb-3">
					<input
						type="text"
						value={this.state.newValue}
						onChange={this.onChange}
						placeholder={`Add new ${this.props.label.toLowerCase()}`}
						className="form-control"
					/>
					<div className="input-group-append">
						<button type="submit" className="btn btn-outline-secondary" onClick={this.onSubmit}>
							<FontAwesomeIcon icon={faPlus} />
						</button>
					</div>
				</div>
			</div>
		);
	}
}

class ToDoTaskAddInner extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			brand: '',
			name: '',
			color: '',
			form: '',
			strings: ''
		};

		this.onBrandChange = this.onBrandChange.bind(this);
		this.onNameChange = this.onNameChange.bind(this);
		this.onColorChange = this.onColorChange.bind(this);
		this.onFormChange = this.onFormChange.bind(this);
		this.onStringsChange = this.onStringsChange.bind(this);
		this.onAddFormSubmit = this.onAddFormSubmit.bind(this);
		this.addBrand = this.addBrand.bind(this);
		this.addColor = this.addColor.bind(this);
		this.addForm = this.addForm.bind(this);
		this.addStrings = this.addStrings.bind(this);
	}

	addBrand(newBrand) {
		const updatedBrands = [...this.props.brands, newBrand];
		fetch('/options', {
			method: 'PATCH',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ brands: updatedBrands })
		}).then(() => {
			this.props.dispatch(updateOptions(
				updatedBrands,
				this.props.colors,
				this.props.forms,
				this.props.stringsOptions
			));
			this.setState({ brand: newBrand });
		});
	}

	addColor(newColor) {
		const updatedColors = [...this.props.colors, newColor];
		fetch('/options', {
			method: 'PATCH',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ colors: updatedColors })
		}).then(() => {
			this.props.dispatch(updateOptions(
				this.props.brands,
				updatedColors,
				this.props.forms,
				this.props.stringsOptions
			));
			this.setState({ color: newColor });
		});
	}

	addForm(newForm) {
		const updatedForms = [...this.props.forms, newForm];
		fetch('/options', {
			method: 'PATCH',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ forms: updatedForms })
		}).then(() => {
			this.props.dispatch(updateOptions(
				this.props.brands,
				this.props.colors,
				updatedForms,
				this.props.stringsOptions
			));
			this.setState({ form: newForm });
		});
	}

	addStrings(newStrings) {
		const updatedStringsOptions = [...this.props.stringsOptions, newStrings];
		fetch('/options', {
			method: 'PATCH',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ stringsOptions: updatedStringsOptions })
		}).then(() => {
			this.props.dispatch(updateOptions(
				this.props.brands,
				this.props.colors,
				this.props.forms,
				updatedStringsOptions
			));
			this.setState({ strings: newStrings });
		});
	}

	onBrandChange(e) {
		this.setState({ brand: e.target.value });
	}

	onNameChange(e) {
		this.setState({ name: e.target.value });
	}

	onColorChange(e) {
		this.setState({ color: e.target.value });
	}

	onFormChange(e) {
		this.setState({ form: e.target.value });
	}

	onStringsChange(e) {
		this.setState({ strings: e.target.value });
	}

	onAddFormSubmit(e) {
		e.preventDefault();
		fetch('tasks', {
			method: 'POST',
			body: JSON.stringify({
				brand: this.state.brand,
				name: this.state.name,
				color: this.state.color,
				form: this.state.form,
				strings: this.state.strings,
				done: false
			}),
			headers: {
				'Content-Type': 'application/json'
			}
		}).then(res => res.json()).then((data) => {
			this.props.dispatch(todoAdd(
				data._id,
				data.brand,
				data.name,
				data.color,
				data.form,
				data.strings
			));
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

				<div className="card-body">
					<form onSubmit={this.onAddFormSubmit}>
						<div className="form-container">
							<OptionAdder
								name="brand"
								selectedValue={this.state.brand}
								onChange={this.onBrandChange}
								options={this.props.brands}
								onAdd={this.addBrand}
								label="Brand"
							/>

							<div className="form-group">
								<label>Model</label>
								<input
									type="text"
									name="name"
									value={this.state.name}
									onChange={this.onNameChange}
									placeholder="Enter model name"
									className="form-control"
									required
								/>
							</div>

							<OptionAdder
								name="color"
								selectedValue={this.state.color}
								onChange={this.onColorChange}
								options={this.props.colors}
								onAdd={this.addColor}
								label="Color"
							/>

							<OptionAdder
								name="form"
								selectedValue={this.state.form}
								onChange={this.onFormChange}
								options={this.props.forms}
								onAdd={this.addForm}
								label="Form"
							/>

							<OptionAdder
								name="strings"
								selectedValue={this.state.strings}
								onChange={this.onStringsChange}
								options={this.props.stringsOptions}
								onAdd={this.addStrings}
								label="Strings"
							/>
						</div>

						<div className="d-block text-right card-footer">
							<button type="submit" className="btn btn-primary mr-2">Add Guitar</button>
							<NavLink to='/' className="btn btn-secondary">Back to list</NavLink>
						</div>
					</form>
				</div>
			</div>
		);
	}
}

function mapStateToProps(state) {
	return {
		brands: state.options.brands,
		colors: state.options.colors,
		forms: state.options.forms,
		stringsOptions: state.options.stringsOptions
	};
}

const ToDoTaskAdd = (props) => {
	return (
		<ToDoTaskAddInner {...props} history={useNavigate()} />
	);
};

export default connect(mapStateToProps)(ToDoTaskAdd);