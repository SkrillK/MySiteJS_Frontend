import ToDoTask from './ToDoTask';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGuitar } from '@fortawesome/free-solid-svg-icons';

const ToDoList = ({ tasks }) => {
    return (
        <div className="card-hover-shadow-2x mb-3 card">
            <div className="card-header-tab card-header">
                <div className="card-header-title font-size-lg text-capitalize font-weight-normal">
                    <FontAwesomeIcon icon={faGuitar} />&nbsp;Guitar Shop List
                </div>
            </div>
            <div className="scroll-area-sm">
                <perfect-scrollbar className="ps-show-limits">
                    <div style={{ position: "static" }} className="ps ps--active-y">
                        <div className="ps-content">
                            <ul className="list-group list-group-flush">
                                {tasks.map((task) => (
                                    <ToDoTask task={task} key={task._id} />
                                ))}
                            </ul>
                        </div>
                    </div>
                </perfect-scrollbar>
            </div>
            <div className="d-block text-right card-footer">
                <NavLink to='/add' className="btn btn-primary">Add Guitar</NavLink>
            </div>
        </div>
    );
};

function mapStateToProps(state) {
    return {
        tasks: [...state.tasks]
    };
}

export default connect(mapStateToProps)(ToDoList);