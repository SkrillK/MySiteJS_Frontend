import React, { useEffect, useState } from "react";
import { useParams, useNavigate, NavLink } from 'react-router-dom';
import { connect } from 'react-redux';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGuitar } from '@fortawesome/free-solid-svg-icons';


const UpdateBook = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [task, setTask] = useState({
        brand: '',
        name: '',
		color: '',
		form: '',
		strings: ''
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

    const handleSubmit = (e) => {
        e.preventDefault();

        const updatedData = {
            _id: task._id,
			brand: task.brand,
			name: task.name,
			color: task.color,
			form: task.form,
			strings: task.strings
        }
        fetch(`/update/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedData),
        })
            .then(res => {
                if (res.ok) {
                    navigate('/', { state: { forceRefresh: true } });
					window.location.reload();
                }
            });
    };

    return (
		<div className="card-hover-shadow-2x mb-3 card">
			<div className="card-header-tab card-header">
				<div className="card-header-title font-size-lg text-capitalize font-weight-normal">
					<FontAwesomeIcon icon={faGuitar} />&nbsp;Update Guitar
				</div>
			</div>
			<div className="widget-content">
				<div className="widget-content-wrapper">
					<form onSubmit={handleSubmit}>
						<div>
							<select
								name="brand"
								value={task.brand}
								onChange={handleChange}
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
						</div>
						<div>
							<input
								type="text"
								name="name"
								value={task.name}
								onChange={handleChange}
								required
							placeholder="Model" className="form-control"/>
						</div>
						<div>
							<input
								name="color"
								value={task.color}
								onChange={handleChange}
								required
							placeholder="Color" className="form-control"/>
						</div>
						<div>
							<select
								name="form"
								value={task.form}
								onChange={handleChange}
								className="form-control"
								required>
								<option value="" disabled>Form</option>
								<option value="Explorer">Explorer</option>
								<option value="Stratocaster">Stratocaster</option>
								<option value="Superstrat">Superstrat</option>
								<option value="Les Paul">Les Paul</option>
								<option value="Headless">Headless</option>
							</select>
						</div>
						<div>
							<select
								name="strings"
								value={task.strings}
								onChange={handleChange}
								className="form-control"
								required>
								<option value="" disabled>Strings</option>
								<option value="6">6</option>
								<option value="7">7</option>
								<option value="8">8</option>
							</select>	
						</div>
							
					</form>
				</div>
			</div>
				<div className="d-block text-left card-footer">
					<form onSubmit={handleSubmit}>
						<div>
							<button 
								style={{ 
									backgroundColor: '#343a40', 
									border: 'none', 
									color: '#ffffff', 
									borderRadius: '5px', 
									padding: '5px 10px' 
								}}
								type="submit">
									Apply
							</button>
						</div>
					</form>
					<NavLink to='/' className="btn btn-primary" >Back to list</NavLink>
				</div>
		</div>
	);
};

export default connect()(UpdateBook);