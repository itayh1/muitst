import React, { useState } from "react";

import { Button, Input, Typography } from "@mui/material";
import styled from "styled-components";

import { GlassLayout } from "./UsersList";

function Enter(props) {
    const [groupName, setGroupName] = useState("");
    const [userName, setUserName] = useState("");

    const signIn = () => {
        if (groupName.length === 0 || userName.length === 0) return;
        props.signIn(groupName, userName);
    };
    return (
        <Container>
            <GlassLayout value={200}>
                <Container>
                    <Typography>Enter Group Name:</Typography>
                    <Input placeholder="Group's Name" value={groupName} onChange={(e) => setGroupName(e.target.value)}></Input>
                    <Input placeholder="Your Name" value={userName} onChange={(e) => setUserName(e.target.value)}></Input>
                </Container>
            </GlassLayout>
            <Button onClick={signIn}>
                <Typography fontWeight={500}>Enter room</Typography>
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

    input {
        color: white;
    }
    * {
        margin: 1rem 0;
    }
`;

export default Enter;
