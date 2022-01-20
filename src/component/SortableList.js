import { useState } from "react";

import { Container, Draggable } from "react-smooth-dnd";
import { arrayMoveImmutable } from "array-move";

import { List, ListItem, ListItemText, ListItemIcon } from "@mui/material";
import { DragHandle } from "@mui/icons-material";

export default function SortableList() {
    const [items, setItems] = useState([
        { id: "1", text: "Item 1", order: 0 },
        { id: "2", text: "Item 2", order: 1 },
        { id: "3", text: "Item 3", order: 2 },
        { id: "4", text: "Item 4", order: 3 },
    ]);

    const onDrop = ({ removedIndex, addedIndex }) => {
        // console.log({ items, removedIndex, addedIndex });
        setItems((currItems) => arrayMoveImmutable(currItems, removedIndex, addedIndex));
    };

    function Item(props) {
        return (
            <ListItem>
                <ListItemIcon>
                    <DragHandle />
                </ListItemIcon>
                <ListItemText primary={props.text} />
            </ListItem>
        );
    }

    return (
        <List>
            <Container lockAxis="y" onDrop={onDrop}>
                {items.map(({ id, text }) => (
                    <Draggable key={id}>
                        <Item text={text} />
                    </Draggable>
                ))}
            </Container>
        </List>
    );
}
