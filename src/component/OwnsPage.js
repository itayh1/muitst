import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { Button, Typography } from "@mui/material";
import UsersList from "./UsersList";

function OwnsPage(props) {
    // console.log(props);
    return (
        <Container>
            <Typography>Group name: {props.Name}</Typography>
            <UsersList {...props} />
            <Button>Calculate</Button>
        </Container>
    );
}

const Container = styled.div`
    margin-top: 2rem;
`;

OwnsPage.propTypes = {
    Name: PropTypes.string.isRequired,
    addItem: PropTypes.func.isRequired,
    removeItem: PropTypes.func.isRequired,
    myName: PropTypes.string.isRequired,
};

export default OwnsPage;
