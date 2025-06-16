import React, { useEffect, useState } from "react";
import { useParams, useNavigate, NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { todoUpdateState, updateOptions } from './actions';
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

const UpdateGuitar = ({ dispatch, brands, colors, forms, stringsOptions }) => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [task, setTask] = useState({
        _id: '',
        brand: '',
        name: '',
        color: '',
        form: '',
        strings: '',
        done: false
    });

    useEffect(() => {
        fetch(`/tasks/${id}`)
            .then(res => res.json())
            .then(data => {
                setTask(data);
            });
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setTask(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const addBrand = (newBrand) => {
        const updatedBrands = [...brands, newBrand];
        fetch('/options', {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ brands: updatedBrands })
        }).then(() => {
            dispatch(updateOptions(
                updatedBrands,
                colors,
                forms,
                stringsOptions
            ));
            setTask(prev => ({ ...prev, brand: newBrand }));
        });
    };

    const addColor = (newColor) => {
        const updatedColors = [...colors, newColor];
        fetch('/options', {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ colors: updatedColors })
        }).then(() => {
            dispatch(updateOptions(
                brands,
                updatedColors,
                forms,
                stringsOptions
            ));
            setTask(prev => ({ ...prev, color: newColor }));
        });
    };

    const addForm = (newForm) => {
        const updatedForms = [...forms, newForm];
        fetch('/options', {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ forms: updatedForms })
        }).then(() => {
            dispatch(updateOptions(
                brands,
                colors,
                updatedForms,
                stringsOptions
            ));
            setTask(prev => ({ ...prev, form: newForm }));
        });
    };

    const addStrings = (newStrings) => {
        const updatedStringsOptions = [...stringsOptions, newStrings];
        fetch('/options', {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ stringsOptions: updatedStringsOptions })
        }).then(() => {
            dispatch(updateOptions(
                brands,
                colors,
                forms,
                updatedStringsOptions
            ));
            setTask(prev => ({ ...prev, strings: newStrings }));
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        fetch(`/update/${id}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(task)
        }).then(() => {
            dispatch(todoUpdateState(task._id));
            navigate('/');
        });
    };

    return (
        <div className="card-hover-shadow-2x mb-3 card">
            <div className="card-header-tab card-header">
                <div className="card-header-title font-size-lg text-capitalize font-weight-normal">
                    <FontAwesomeIcon icon={faGuitar} />&nbsp;Update Guitar
                </div>
            </div>

            <div className="card-body">
                <form onSubmit={handleSubmit}>
                    <div className="form-container">
                        <OptionAdder
                            name="brand"
                            selectedValue={task.brand}
                            onChange={handleChange}
                            options={brands}
                            onAdd={addBrand}
                            label="Brand"
                        />

                        <div className="form-group">
                            <label>Model</label>
                            <input
                                type="text"
                                name="name"
                                value={task.name}
                                onChange={handleChange}
                                placeholder="Enter model name"
                                className="form-control"
                                required
                            />
                        </div>

                        <OptionAdder
                            name="color"
                            selectedValue={task.color}
                            onChange={handleChange}
                            options={colors}
                            onAdd={addColor}
                            label="Color"
                        />

                        <OptionAdder
                            name="form"
                            selectedValue={task.form}
                            onChange={handleChange}
                            options={forms}
                            onAdd={addForm}
                            label="Form"
                        />

                        <OptionAdder
                            name="strings"
                            selectedValue={task.strings}
                            onChange={handleChange}
                            options={stringsOptions}
                            onAdd={addStrings}
                            label="Strings"
                        />
                    </div>

                    <div className="d-block text-right card-footer">
                        <button type="submit" className="btn btn-primary mr-2">Update Guitar</button>
                        <NavLink to='/' className="btn btn-secondary">Back to list</NavLink>
                    </div>
                </form>
            </div>
        </div>
    );
};

function mapStateToProps(state) {
    return {
        brands: state.options.brands,
        colors: state.options.colors,
        forms: state.options.forms,
        stringsOptions: state.options.stringsOptions
    };
}

export default connect(mapStateToProps)(UpdateGuitar);