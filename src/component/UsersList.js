import React, { useState } from "react";
import PropTypes from "prop-types";
import { Grid, Input, Typography, List, ListItem } from "@mui/material";
import { Add } from "@mui/icons-material";
import styled from "styled-components";

function UsersList(props) {
    // console.log(props);
    return (
        <div>
            {props.owns.map((item) => (
                <UserDetail key={item.name} {...item} addItem={props.addItem} myName={props.myName} />
            ))}
        </div>
    );
}

function UserDetail(props) {
    const [item, setItem] = useState({ name: "", price: "" });
    const items = props.items.map((item, i) => [item, props.prices[i]]);
    const list = items.map((x) => (
        <ListItem key={x[0]}>
            {x[0]}:{x[1]}
        </ListItem>
    ));
    return (
        <DetailsContainer>
            <InnerDetailsContainer>
                <Typography>{props.name}</Typography>
                <List>{list}</List>
            </InnerDetailsContainer>
            {props.myName === props.name && (
                <AddItemContainer>
                    <Input value={item.name} name="name" onChange={(e) => setItem({ ...item, [e.target.name]: e.target.value })} />
                    <Input value={item.price} name="price" onChange={(e) => setItem({ ...item, [e.target.name]: e.target.value })} />
                    <Add onClick={(e) => props.addItem(item.name, parseInt(item.price))} />
                </AddItemContainer>
            )}
        </DetailsContainer>
    );
}

const DetailsContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

const InnerDetailsContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
`;

const AddItemContainer = styled.div`
    flex-direction: row;
    align-items: center;
`;
UserDetail.propTypes = {
    name: PropTypes.string.isRequired,
    items: PropTypes.arrayOf(PropTypes.string).isRequired,
    prices: PropTypes.arrayOf(PropTypes.number).isRequired,
    addItem: PropTypes.func.isRequired,
    myName: PropTypes.string.isRequired,
};

UsersList.propTypes = {
    owns: PropTypes.arrayOf(PropTypes.shape({ UserDetail })),
    addItem: PropTypes.func.isRequired,
    myName: PropTypes.string.isRequired,
};

export default UsersList;
