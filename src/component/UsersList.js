import React from "react";
import PropTypes from "prop-types";
import { Grid } from "@mui/material";

function UsersList(props) {
    // console.log(props);
    return (
        <div>
            {props.owns.map((item) => (
                <UserDetail key={item.name} {...item} />
            ))}
        </div>
    );
}

function UserDetail(props) {
    const items = props.items.map((item, i) => [item, props.prices[i]]);
    const list = items.map((x) => (
        <li key={x[0]}>
            {x[0]}:{x[1]}
        </li>
    ));
    return (
        <Grid container>
            <Grid item>{props.name}</Grid>
            <ul>{list}</ul>
        </Grid>
    );
}

UserDetail.propTypes = {
    name: PropTypes.string,
    items: PropTypes.arrayOf(PropTypes.string),
    prices: PropTypes.arrayOf(PropTypes.number),
};

UsersList.propTypes = {
    owns: PropTypes.arrayOf(PropTypes.shape({ UserDetail })),
};

export default UsersList;
