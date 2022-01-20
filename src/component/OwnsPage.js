import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { Button, Typography } from "@mui/material";
import UsersList from "./UsersList";

function OwnsPage(props) {
    // console.log(props);
    return (
        <Container>
            <Typography>Group name: {props.groupName}</Typography>
            <UsersList owns={props.owns} />
            <Button>Calculate</Button>
        </Container>
    );
}

const Container = styled.div`
    margin-top: 2rem;
`;

OwnsPage.propTypes = {
    groupName: PropTypes.string.isRequired,
    // ownsMapping: PropTypes.
};

export default OwnsPage;
