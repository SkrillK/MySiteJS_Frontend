import React, { useEffect, useState } from "react";
import { useParams, useNavigate, NavLink } from 'react-router-dom';
import { connect } from 'react-redux';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGuitar } from '@fortawesome/free-solid-svg-icons';


const UpdateBook = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [task, setTask] = useState({
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
							<input
								type="text"
								name="name"
								value={task.name}
								onChange={handleChange}
								required
							placeholder="Name" className="form-control"/>
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
							<input
								type="text"
								name="form"
								value={task.form}
								onChange={handleChange}
								required
							placeholder="Form" className="form-control"/>
						</div>
						<div>
							<input
								type="text"
								name="strings"
								value={task.strings}
								onChange={handleChange}
								required
							placeholder="Strings" className="form-control"/>
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