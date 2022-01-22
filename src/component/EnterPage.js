import React, { useState } from "react";

import { Button, Input, Typography } from "@mui/material";
import styled from "styled-components";

function Enter(props) {
    const [groupName, setGroupName] = useState("");
    const [userName, setUserName] = useState("");

    const signIn = () => {
        if (groupName.length === 0 || userName.length === 0) return;
        props.signIn(groupName, userName);
    };
    return (
        <Container>
            <Typography>Enter Group Name:</Typography>
            <Input placeholder="Group's Name" value={groupName} onChange={(e) => setGroupName(e.target.value)}></Input>
            <Input placeholder="Your Name" value={userName} onChange={(e) => setUserName(e.target.value)}></Input>
            <Button onClick={signIn}>
                <Typography>Enter room</Typography>
            </Button>
        </Container>
    );
}

const Container = styled.div`
    margin-top: 3rem;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    * {
        margin: 1rem 0;
    }
`;

export default Enter;
