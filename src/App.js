import React from 'react';
import './App.css';
import axios from 'axios';
class App extends React.Component {
	state = {
		users: [],
		user: '',
		choix: '',
		montant: '',
		lieu: ''
	};

	componentDidMount = async () => {
		const response = await axios.get('https://lereacteur2-back.herokuapp.com/');
		this.setState({
			users: response.data
		});
	};
	// ADD USER
	addUser = async () => {
		const response = await axios.post('https://lereacteur2-back.herokuapp.com/create/user', {
			user: this.state.user
		});
		const newUser = this.state.users.slice();
		newUser.push(response.data.newUsers);
		this.setState({
			users: newUser
		});
	};
	// ADD EXPENSE
	addExpense = async () => {
		const response = await axios.post('https://lereacteur2-back.herokuapp.com/update', {
			choix: this.state.choix,
			montant: this.state.montant,
			lieu: this.state.lieu
		});
		let newUser = this.state.users.findIndex((user) => response.data.user._id === user._id);
		this.state.users[newUser] = response.data.user;
		this.setState({
			users: this.state.users
		});
	};
	// USERS
	usersList = () => {
		const { users } = this.state;
		return users.map((user, index) => {
			return (
				<li key={index}>
					{user.user} - {user.total}€
				</li>
			);
		});
	};
	// EXPENSES
	expenseList = () => {
		const { users } = this.state;
		return users.map((users, index) => {
			if (users.expense.length >= 0) {
				return users.expense.map((expense, index) => {
					if (expense.lieu !== '' || expense.montant !== '') {
						return (
							<li key={index}>
								{expense.lieu} - {users.user} - {expense.montant}€
							</li>
						);
					}
				});
			}
		});
	};
	// INPUTS => HANDLECHANGE
	handleChange = (event) => {
		const name = event.target.name;
		const value = event.target.value;

		const statesToUpdate = {};
		statesToUpdate[name] = value;

		this.setState(statesToUpdate);
	};

	render() {
		return (
			<div className="page">
				<div className="app">
					<div className="un">
						<h3>Users</h3>
						{this.usersList()}
					</div>
					<div className="deux">
						<h3>New User</h3>
						<input name="user" type="text" onChange={this.handleChange} className="input" />
						<button onClick={() => this.addUser()} className="input" type="button">
							Ajouter
						</button>
					</div>
					<div className="trois">
						<h3>Expenses</h3>
						{this.expenseList()}
					</div>
					<div className="quatre">
						<h3>New Expenses</h3>
						<input name="lieu" onChange={this.handleChange} className="input" placeholder="Description" />
						<input name="montant" onChange={this.handleChange} className="input" placeholder="Montant" />
						<select onChange={this.handleChange} className="input" name="choix">
							<option value="choix" selected>
								Choisissez - Select one
							</option>
							{this.state.users.map((user, index) => {
								return (
									<option key={index} value={user._id}>
										{user.user}
									</option>
								);
							})}
						</select>
						<button onClick={() => this.addExpense()} className="input" type="button">
							Ajouter
						</button>
					</div>
				</div>
			</div>
		);
	}
}

export default App;
