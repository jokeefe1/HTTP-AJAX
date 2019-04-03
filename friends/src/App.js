import React, { Component } from 'react';
import FriendList from './components/FriendList/FriendList';
import axios from 'axios'

class App extends Component {
    state = {
        friends: [],
        newFriend: {
            name: '',
            age: '',
            email: ''
        },
        errorData: {
            nameErrors: '',
            ageErrors: '',
            emailErrors: ''
        }
    };

    componentDidMount = async () => {
        const result = await fetch('http://localhost:5000/friends');
        const friends = await result.json();
        this.setState({ friends });
    };

    handleChange = e => {
        const { name, value } = e.target;
        this.setState({
            newFriend: { ...this.state.newFriend, [name]: value }
        });
    };

    handleValidate = () => {
        const { newFriend } = this.state;
        let errors = false;
        const errorData = {
            nameErrors: '',
            ageErrors: '',
            emailErrors: ''
        };

        if (!newFriend.name || newFriend.name.length < 2) {
            errors = true;
            errorData.nameErrors = 'Name must be at least 2 characters long';
        }

        if (!newFriend.age || newFriend.age < 18) {
            errors = true;
            errorData.ageErrors = 'You must be at least 18 to be my friend';
        }

        if (!newFriend.email || !newFriend.email.match('@')) {
            errors = true;
            errorData.emailErrors = 'You must provide a valid email address';
        }

        this.setState({ errorData });

        return errors;
    };

    handleSubmit = e => {
        const { newFriend } = this.state;
        e.preventDefault();
        const err = this.handleValidate();

        if (!err) {
            //POST request add friend
          axios.post('http://localhost:5000/friends/', newFriend)
            .then(resp => {
              console.log(resp)
            })
            .catch( err => {
              console.log('Error posting data', err)
            })
            //clear form
            this.setState({
                // friends: [
                //     ...this.state.friends,
                //     {
                //         id: this.state.friends.length + 1,
                //         name: newFriend.name,
                //         age: newFriend.age,
                //         email: newFriend.email
                //     }
                // ],
                errorData: {
                    nameErrors: '',
                    ageErrors: '',
                    emailErrors: ''
                },
                newFriend: {
                    name: '',
                    age: '',
                    email: ''
                }
            });
        }
    };

    handleUpdate = id => {
        const { friends } = this.state;

        if (id === friends.id) {
        }
    };

    handleDelete = id => {
        const { friends } = this.state;
        return id === friends.id
            ? this.setState({ friends: friends.filter(friends.id !== id) })
            : friends;
    };

    render() {
        const { friends, newFriend, errorData } = this.state;
        return (
            <>
                <form onSubmit={this.handleSubmit}>
                    <div>
                        <h3>Add New Friend</h3>
                        <input
                            type="text"
                            name="name"
                            value={newFriend.name}
                            onChange={this.handleChange}
                            placeholder="Name"
                        />
                        <p style={{ color: 'red' }}>{errorData.nameErrors}</p>
                        <input
                            type="text"
                            name="age"
                            value={newFriend.age}
                            onChange={this.handleChange}
                            placeholder="Age"
                        />
                        <p style={{ color: 'red' }}>{errorData.ageErrors}</p>
                        <input
                            type="text"
                            name="email"
                            value={newFriend.email}
                            onChange={this.handleChange}
                            placeholder="Email"
                        />
                        <p style={{ color: 'red' }}>{errorData.emailErrors}</p>
                    </div>
                    <button>Add Friend</button>
                </form>
                {friends.map(friend => (
                    <FriendList
                        key={friend.id}
                        data={friend}
                        handleUpdate={this.handleUpdate}
                        handleDelete={this.handleDelete}
                    />
                ))}
            </>
        );
    }
}

export default App;
