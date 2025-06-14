import React from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import  { Provider, connect } from 'react-redux';
import ToDoList from './ToDoList';
import ToDoTaskAdd from './ToDoTaskAdd';
import ToDoTaskUpdate from './ToDoTaskUpdate';
import { todoAddAll } from './actions';

class App extends React.Component {
	componentDidMount() {
		fetch('tasks').then(function(res){
			return res.json();
		}).then((data) => {
			this.props.dispatch(todoAddAll(data));
		});
	}
	
	render() {
		return (
			
			<div className="row justify-content-center" style={{marginTop : "200px"}}>
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
