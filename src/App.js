import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider, connect } from 'react-redux';
import ToDoList from './ToDoList';
import ToDoTaskAdd from './ToDoTaskAdd';
import ToDoTaskUpdate from './ToDoTaskUpdate';
import { todoAddAll, updateOptions } from './actions';

class App extends React.Component {
	componentDidMount() {
		fetch('tasks').then(res => res.json()).then((data) => {
			this.props.dispatch(todoAddAll(data));
		});

		fetch('options').then(res => res.json()).then((data) => {
			this.props.dispatch(updateOptions(
				data.brands || [],
				data.colors || [],
				data.forms || [],
				data.stringsOptions || []
			));
		});
	}

	render() {
		return (
			<div className="row justify-content-center" style={{ marginTop: "200px" }}>
				<div className="col-md-auto">
					<Provider store={this.props.store}>
						<Router>
							<Routes>
								<Route path="/" element={<ToDoList />} />
								<Route path="/add" element={<ToDoTaskAdd />} />
								<Route path="/update/:id" element={<ToDoTaskUpdate />} />
							</Routes>
						</Router>
					</Provider>
				</div>
			</div>
		);
	}
}

export default connect()(App);