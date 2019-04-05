import axios from 'axios';
import React, { Component } from 'react';
import { Button, Flex, Heading } from 'rebass';
import { Container, StyledForm } from './App.styles';
import FriendList from './components/FriendList/FriendList';

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
        },
        isUpdate: false,
        updateID: ''
    };

    componentDidMount = async () => {
        await this.getDataFromServer();
    };

    getDataFromServer = async () => {
        try {
            const response = await axios.get('http://localhost:5000/friends');
            const friends = response.data;
            this.setState({ friends });
        } catch (err) {
            console.log('Error getting data:', err);
        }
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

    handleSubmit = async e => {
        const { newFriend, isUpdate } = this.state;
        e.preventDefault();
        const err = this.handleValidate();

        if (!err && !isUpdate) {
            //POST request add friend
            try {
                const resp = await axios.post(
                    'http://localhost:5000/friends/',
                    newFriend
                );
                this.setState({ friends: resp.data });
            } catch (err) {
                console.log('Error posting data:', err);
            }

            //clear form
            this.setState({
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
        if (!err && isUpdate) {
            const id = this.state.updateID;
            try {
                const resp = await axios.put(
                    `http://localhost:5000/friends/${id}`,
                    newFriend
                );
                this.setState({ friends: resp.data, updateID: '' });
            } catch (err) {
                console.log('Error updating data:', err);
            }
            //clear form
            this.setState({
                errorData: {
                    nameErrors: '',
                    ageErrors: '',
                    emailErrors: ''
                },
                newFriend: {
                    name: '',
                    age: '',
                    email: ''
                },
                isUpdate: false
            });
        }
    };

    handleUpdate = id => {
        const { friends } = this.state;
        friends.map(friend => {
            return friend.id === id
                ? this.setState({
                      newFriend: { ...friend },
                      isUpdate: true,
                      updateID: id
                  })
                : null;
        });
    };

    handleDelete = async id => {
        const { newFriend } = this.state;
        try {
            const resp = await axios.delete(
                `http://localhost:5000/friends/${id}`,
                newFriend
            );
            this.setState({ friends: resp.data, updateID: '' });
        } catch (err) {
            console.log('Error deleting data:', err);
        }
        this.setState({
            newFriend: {
                name: '',
                age: '',
                email: ''
            }
        });
    };

    render() {
        const { friends, newFriend, errorData, isUpdate } = this.state;
        return (
            <Container>
                <StyledForm onSubmit={this.handleSubmit}>
                    <Flex
                        flexDirection="column"
                        justifyContent="center"
                        alignItems="center"
                        pb={5}
                    >
                        {isUpdate ? (
                            <Heading pt={5} pb={3} color="magenta">
                                Update Friend
                            </Heading>
                        ) : (
                            <Heading pt={5} pb={3} color="magenta">
                                Add New Friend
                            </Heading>
                        )}
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
                        {isUpdate ? (
                            <Button bg="magenta">Update Friend</Button>
                        ) : (
                            <Button bg="magenta">Add Friend</Button>
                        )}
                    </Flex>
                </StyledForm>
                {friends.map(friend => (
                    <FriendList
                        key={friend.id}
                        data={friend}
                        handleUpdate={this.handleUpdate}
                        handleDelete={this.handleDelete}
                    />
                ))}
            </Container>
        );
    }
}

export default App;
