import React, { useEffect, useState } from "react";
import { useParams, useNavigate, NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { todoUpdateState } from './actions';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGuitar, faPlus } from '@fortawesome/free-solid-svg-icons';

// Универсальный компонент для выбора и добавления опций (такой же как в первом файле)
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

const UpdateGuitar = ({ dispatch }) => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [task, setTask] = useState({
        brand: '',
        name: '',
        color: '',
        form: '',
        strings: ''
    });
    
    const [options, setOptions] = useState({
        brands: ['Fender', 'Gibson', 'Ibanez', 'Jackson', 'Schecter', 'Luxars', 'ESP'],
        colors: ['Red', 'Black', 'White', 'Blue', 'Sunburst'],
        forms: ['Explorer', 'Stratocaster', 'Superstrat', 'Les Paul', 'Headless'],
        stringsOptions: ['6', '7', '8']
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
        setOptions(prev => ({
            ...prev,
            brands: [...prev.brands, newBrand]
        }));
        setTask(prev => ({ ...prev, brand: newBrand }));
    };

    const addColor = (newColor) => {
        setOptions(prev => ({
            ...prev,
            colors: [...prev.colors, newColor]
        }));
        setTask(prev => ({ ...prev, color: newColor }));
    };

    const addForm = (newForm) => {
        setOptions(prev => ({
            ...prev,
            forms: [...prev.forms, newForm]
        }));
        setTask(prev => ({ ...prev, form: newForm }));
    };

    const addStrings = (newStrings) => {
        setOptions(prev => ({
            ...prev,
            stringsOptions: [...prev.stringsOptions, newStrings]
        }));
        setTask(prev => ({ ...prev, strings: newStrings }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const updatedData = {
            _id: task._id,
            brand: task.brand,
            name: task.name,
            color: task.color,
            form: task.form,
            strings: task.strings
        };

        fetch(`/update/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedData),
        })
        .then(res => res.json())
        .then(data => {
            dispatch(todoUpdateState(data._id, data.brand, data.name, data.color, data.form, data.strings));
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
                        {/* Бренд */}
                        <OptionAdder
                            name="brand"
                            selectedValue={task.brand}
                            onChange={handleChange}
                            options={options.brands}
                            onAdd={addBrand}
                            label="Brand"
                        />

                        {/* Модель */}
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

                        {/* Цвет */}
                        <OptionAdder
                            name="color"
                            selectedValue={task.color}
                            onChange={handleChange}
                            options={options.colors}
                            onAdd={addColor}
                            label="Color"
                        />

                        {/* Форма */}
                        <OptionAdder
                            name="form"
                            selectedValue={task.form}
                            onChange={handleChange}
                            options={options.forms}
                            onAdd={addForm}
                            label="Form"
                        />

                        {/* Струны */}
                        <OptionAdder
                            name="strings"
                            selectedValue={task.strings}
                            onChange={handleChange}
                            options={options.stringsOptions}
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

export default connect()(UpdateGuitar);