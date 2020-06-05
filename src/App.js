import React, { useEffect, useState } from "react";
import Button from "./components/molecules/Button";
import Input from "./components/molecules/Input";
import "./index.css";

const App = () => {
  const [user, setUser] = useState("");
  const [users, setUsers] = useState([]);
  const [userID, setUserID] = useState("");
  const [amount, setAmount] = useState("");
  const [place, setPlace] = useState("");

  useEffect(() => {
    // fetch("https://lereacteur2-back.herokuapp.com/")
    fetch("http://localhost:3600/")
      .then((data) => data.json())
      .then((response) => setUsers(response));
  }, []);

  // ADD USER
  const addUser = async () => {
    let addNewUserToList = [];
    // fetch("https://lereacteur2-back.herokuapp.com/create/user", {
    fetch("http://localhost:3600/create/user", {
      method: "POST",
      body: JSON.stringify({ user: user }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((data) => data.json())
      .catch((error) => console.error("Error:", error))
      .then((response) => {
        addNewUserToList = [...users, response.newUsers];
        setUsers(addNewUserToList);
      });
    setUser("");
  };

  // ADD EXPENSE
  const addExpense = async () => {
    // fetch("https://lereacteur2-back.herokuapp.com/update", {
    fetch("http://localhost:3600/update", {
      method: "POST",
      body: JSON.stringify({
        userID: userID,
        amount: amount,
        place: place,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((data) => data.json())
      .catch((error) => console.error("Error:", error))
      .then((response) => {
        console.log("response", response);
        let updateUserExpense = users.findIndex(
          (user) => response.user._id === user._id
        );
        let lastUsersArray = users.slice();
        lastUsersArray[updateUserExpense] = response.user;
        setUsers(lastUsersArray);
      });
  };

  // EXPENSES
  const expenseList = () => {
    if (users !== undefined) {
      return users.map((users, index) => {
        if (users.expense.length >= 0) {
          return users.expense.map((expense, index) => {
            if (expense.place !== "" || expense.amount !== "") {
              return (
                <li className="list-none" key={index}>
                  {users.user} - {expense.place} - {expense.amount}€
                </li>
              );
            }
          });
        }
      });
    } else {
      return <p>No expense</p>;
    }
  };

  return (
    <section className="flex items-center justify-center h-screen bg-indigo-100">
      <div className="flex">
        <div className="p-2 mr-5 bg-gray-100 border-2 border-purple-400 shadow-lg">
          <div className="flex flex-col w-64 mb-3">
            <h3 className="mb-1">Add new user</h3>
            <Input
              name="user"
              value={user}
              onChange={({ target }) => setUser(target.value)}
              className=""
              placeholder="User name"
            />
            <Button text="Add" onClick={() => addUser()} />
          </div>

          <div className="flex flex-col w-64">
            <h3 className="mb-1">New Expenses</h3>
            <Input
              name="place"
              place={place}
              onChange={({ target }) => setPlace(target.value)}
              placeholder="Description"
            />
            <Input
              name="amount"
              value={amount}
              onChange={({ target }) => setAmount(target.value)}
              placeholder="Amount"
            />

            <select
              onChange={({ target }) => setUserID(target.value)}
              className=""
              name="UserID"
            >
              <option value="userID" defaultValue>
                Select user
              </option>
              {users &&
                users.map((user, index) => {
                  return (
                    <option key={index} value={user._id}>
                      {user.user}
                    </option>
                  );
                })}
            </select>
            <Button text="Add" onClick={() => addExpense()} />
          </div>
        </div>

        <div id="UserList" className="mr-5">
          <h3 className="mb-1">Users with total expense</h3>
          {users &&
            users.map((user, index) => {
              return (
                <li className="list-none" key={index}>
                  {user.user} - {user.total}€
                </li>
              );
            })}
        </div>
        <div className="">
          <h3 className="mb-1">Expenses per users</h3>
          {expenseList()}
        </div>
      </div>
    </section>
  );
};

export default App;
