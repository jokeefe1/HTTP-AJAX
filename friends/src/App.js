import React, { Component } from 'react';
import FriendList from './components/FriendList/FriendList';

class App extends Component {
    state = {
        friends: [],
        name: '',
        age: '',
        email: '',
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
        console.log(friends);
    };

    handleChange = e => {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    };

    handleValidate = () => {
        const { name, age, email } = this.state;
        let errors = false;
        const errorData = {
            nameErrors: '',
            ageErrors: '',
            emailErrors: ''
        };

        if (!name || name.length < 2) {
            errors = true;
            errorData.nameErrors = 'Name must be at least 2 characters long';
        }

        if (!age || age < 18) {
            errors = true;
            errorData.ageErrors = 'You must be at least 18 to be my friend';
        }

        if (!email || !email.match('@')) {
            errors = true;
            errorData.emailErrors = 'You must provide a valid email address';
        }

        this.setState({ errorData });

        return errors;
    };

    handleSubmit = e => {
        e.preventDefault();
        this.handleValidate()
        console.log('handleSubmit was clicked')
    };

    render() {
        const { friends, name, age, email, errorData } = this.state;
        return (
            <>
                <form onSubmit={this.handleSubmit}>
                    <div>
                        <h3>Add New Friend</h3>
                        <input
                            type="text"
                            name="name"
                            value={name}
                            onChange={this.handleChange}
                            placeholder="Name"
                        />
                        <p style={{ color: 'red' }}>{errorData.nameErrors}</p>
                        <input
                            type="text"
                            name="age"
                            value={age}
                            onChange={this.handleChange}
                            placeholder="Age"
                        />
                        <p style={{ color: 'red' }}>{errorData.ageErrors}</p>
                        <input
                            type="text"
                            name="email"
                            value={email}
                            onChange={this.handleChange}
                            placeholder="Email"
                        />
                        <p style={{ color: 'red' }}>{errorData.emailErrors}</p>
                    </div>
                    <button>Add Friend</button>
                </form>
                {name}
                {age}
                {email}
                {friends.map(friend => (
                    <FriendList key={friend.id} data={friend} />
                ))}
            </>
        );
    }
}

export default App;
