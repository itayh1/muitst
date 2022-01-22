import React, { useState } from "react";
import PropTypes from "prop-types";
import { Grid, Input, Typography, List, ListItem } from "@mui/material";
import { Add, Remove } from "@mui/icons-material";
import styled from "styled-components";

function UsersList(props) {
    return (
        <div>
            {props.owns.map((item) => (
                <UserDetail key={item.name} {...item} addItem={props.addItem} removeItem={props.removeItem} myName={props.myName} />
            ))}
        </div>
    );
}

function UserDetail(props) {
    const [item, setItem] = useState({ name: "", price: "" });
    const isMyDetails = props.myName === props.name;

    const items = props.items.map((item, i) => [item, props.prices[i]]);
    const list = items.map((x, i) => (
        <ListItem key={x[0]}>
            {x[0]}:{x[1]}
            {isMyDetails && <Remove onClick={(e) => props.removeItem(i)} />}
        </ListItem>
    ));
    const submit = () => {
        props.addItem(item.name, parseInt(item.price));
        setItem({ name: "", price: "" });
    };
    return (
        <GlassLayout value={100}>
            <DetailsContainer>
                <InnerDetailsContainer>
                    <Typography>{props.name}</Typography>
                    <List>{list}</List>
                </InnerDetailsContainer>
                {isMyDetails && (
                    <AddItemContainer>
                        <Input value={item.name} name="name" onChange={(e) => setItem({ ...item, [e.target.name]: e.target.value })} />
                        <Input value={item.price} name="price" onChange={(e) => setItem({ ...item, [e.target.name]: e.target.value })} />
                        <Add onClick={submit} />
                    </AddItemContainer>
                )}
            </DetailsContainer>
        </GlassLayout>
    );
}

const GlassLayout = styled.div`
    background-color: rgba(${(p) => p.value}, ${(p) => p.value}, ${(p) => p.value}, 0.4);
    background-image: linear-gradient(to bottom right, rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0));
    backdrop-filter: blur(7px);
    box-shadow: 10px 10px 10px rgba(30, 30, 30, 0.1);
    border-radius: 20px;
    border-left: solid 1px rgba(255, 255, 255, 0.3);
    border-top: solid 1px rgba(255, 255, 255, 0.8);

    padding: 8px;
    margin-top: 8px;
`;

const DetailsContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    /* backdrop-filter: blur(35px);
    background-color: rgba(255, 255, 255, 0.8);
    border-radius: 30px; */

    color: black;
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
    removeItem: PropTypes.func.isRequired,
    myName: PropTypes.string.isRequired,
};

UsersList.propTypes = {
    owns: PropTypes.arrayOf(PropTypes.shape({ UserDetail })),
    addItem: PropTypes.func.isRequired,
    removeItem: PropTypes.func.isRequired,
    myName: PropTypes.string.isRequired,
};

export default UsersList;
