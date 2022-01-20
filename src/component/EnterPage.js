import React from "react";

import { Button, Input, Typography } from "@mui/material";
import styled from "styled-components";

function Enter(props) {
    return (
        <Container>
            <Typography>Enter Group Name:</Typography>
            <Input placeholder="Group's Name"></Input>
            <Input placeholder="Your Name"></Input>
            <Button onClick={props.signIn}>
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
