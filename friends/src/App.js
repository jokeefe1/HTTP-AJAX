import axios from 'axios';
import React, { Component } from 'react';
import { Box, Flex, Heading } from 'rebass';
import { Button, Container, StyledForm } from './App.styles';
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
            const resp = await axios.get('http://localhost:5000/friends');
            this.setState({ friends: resp.data });
        } catch (err) {
            console.log('Error getting data:', err);
        }
    };

    handleChange = e => {
        const { name, value } = e.target;
        if (name === 'name') {
          this.setState({
            newFriend: { ...this.state.newFriend, [name]: value.charAt(0).toUpperCase() + value.slice(1).trim() }
          });
        }
        else {
          this.setState({
            newFriend: { ...this.state.newFriend, [name]: value }
          });
        }
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

        if (!newFriend.email || !newFriend.email.match(/.+@.+\..+/i)) {
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
        const { friends, updateID } = this.state;
        friends.map(friend => {
            if (friend.id === id && updateID !== id) {
                this.setState({
                    newFriend: { ...friend },
                    isUpdate: true,
                    updateID: id
                });
            }
            if (updateID === id) {
                this.setState({
                    newFriend: {
                        name: '',
                        age: '',
                        email: ''
                    },
                    isUpdate: false,
                    updateID: false
                });
            }
            return null;
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
        const {
            friends,
            newFriend,
            errorData,
            isUpdate,
            updateID
        } = this.state;
        return (
            <Box bg="#111">
                <Container>
                    <StyledForm onSubmit={this.handleSubmit}>
                        <Flex
                            flexDirection="column"
                            justifyContent="center"
                            alignItems="center"
                            pb={5}
                        >
                            {isUpdate ? (
                                <Heading
                                    pt={5}
                                    fontSize={[4, 5, 6]}
                                    pb={3}
                                    color="magenta"
                                >
                                    Update Friend
                                </Heading>
                            ) : (
                                <Heading
                                    pt={5}
                                    fontSize={[4, 5, 6]}
                                    pb={3}
                                    color="magenta"
                                >
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
                            <p style={{ color: '#E85F5C' }}>
                                {errorData.nameErrors}
                            </p>
                            <input
                                type="text"
                                name="age"
                                value={newFriend.age}
                                onChange={this.handleChange}
                                placeholder="Age"
                            />
                            <p style={{ color: '#E85F5C' }}>
                                {errorData.ageErrors}
                            </p>
                            <input
                                type="text"
                                name="email"
                                value={newFriend.email}
                                onChange={this.handleChange}
                                placeholder="Email"
                            />
                            <p style={{ color: '#E85F5C' }}>
                                {errorData.emailErrors}
                            </p>
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
                            updateID={updateID}
                            handleUpdate={this.handleUpdate}
                            handleDelete={this.handleDelete}
                        />
                    ))}
                </Container>
            </Box>
        );
    }
}

export default App;
