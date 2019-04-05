import React from 'react';
import { Button, Card, Flex, Heading, Text } from 'rebass';

export default function FriendList(props) {
    const { id, name, age, email } = props.data;
    return (
        <>
            <Card
                key={id}
                p={4}
                py={4}
                mb={5}
                backgroundSize="cover"
                borderRadius={8}
                color="white"
                bg="black"
            >
                <Heading textAlign="center" fontSize={[5, 6]} pb={3}>
                    {name}
                </Heading>
                <Text
                    fontSize={[2, 3, 4, 5]}
                    fontWeight="bold"
                    color="magenta"
                    textAlign="center"
                    pb={2}
                >
                    Age: {age}
                </Text>
                <Text
                    fontSize={[2, 3, 4, 5]}
                    fontWeight="bold"
                    color="magenta"
                    textAlign="center"
                    pb={4}
                >
                    {email}
                </Text>
                <Flex justifyContent="center" alignItems="center">
                    <Button
                        bg="magenta"
                        m={2}
                        onClick={() => props.handleUpdate(id)}
                    >
                        Select
                    </Button>
                    <Button
                        bg="magenta"
                        m={2}
                        onClick={() => props.handleDelete(id)}
                    >
                        Delete
                    </Button>
                </Flex>
            </Card>
        </>
    );
}
