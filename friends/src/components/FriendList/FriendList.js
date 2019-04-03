import React from 'react';

export default function FriendList(props) {
    const { id, name, age, email } = props.data;
    return (
        <>
            <div key={id}>
                <h3>{name}</h3>
                <p>Age: {age}</p>
                <p>{email}</p>
            </div>
            <div>
                <button onClick={() => props.handleUpdate(id)}>Select</button>
                <button onClick={() => props.handleDelete(id)}>Delete</button>
            </div>
        </>
    );
}
