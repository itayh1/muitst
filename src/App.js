import { useState } from "react";

import logo from "./logo.svg";
import "./App.css";
import { Button, ButtonGroup, Checkbox, FormControlLabel } from "@mui/material";

import { ThemeProvider, createTheme } from "@mui/material";
import { green, amber, teal } from "@mui/material/colors";

import { Typography, Container, Paper, Grid, AppBar, Toolbar, IconButton } from "@mui/material";
import { Menu } from "@mui/icons-material";

import "fontsource-roboto";

import SortableList from "./component/SortableList";
import Navbar from "./component/Navbar";
import Enter from "./component/EnterPage";
import OwnsPage from "./component/OwnsPage";

import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDoc, setDoc, updateDoc, doc, onSnapshot } from "firebase/firestore";
import { getAuth, signInAnonymously, onAuthStateChanged } from "firebase/auth";
import "firebase/auth";
import "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollectionData } from "react-firebase-hooks/firestore";

// if (!firebase.apps.length) {
initializeApp({
    apiKey: "AIzaSyA5reNeZ4nPxn0agS6na6rLKBVjoYN_uGE",
    authDomain: "website-64644.firebaseapp.com",
    projectId: "website-64644",
    storageBucket: "website-64644.appspot.com",
    messagingSenderId: "848566509101",
    appId: "1:848566509101:web:a983d2fc84e5220a63a2a4",
});

const db = getFirestore();

const theme = createTheme({
    typography: { h5: { fontSize: 25, margin: "10px" } },
    palette: {
        primary: teal,
        secondary: amber,
    },
});

const auth = getAuth();
onAuthStateChanged(auth, (user) => {
    if (user) {
        const uid = user.uid;
        // setIsConnected(true);
        console.log("logged in with user: " + uid);
    } else {
        // setIsConnected(false);
        console.log("logged out");
    }
});
async function signIn(auth) {
    const res = await signInAnonymously(auth)
        .then(() => {
            console.log("Signed In");
            return true;
        })
        .catch((error) => {
            console.log(error.code);
            console.log(error.message);
            return false;
        });
    return res;
}
async function getOrSetGroup(data, roomName, userName) {
    try {
        const docRef = doc(data, roomName);
        const queryRes = await getDoc(docRef);

        if (queryRes.exists()) {
            const queryData = queryRes.data();
            if (queryData.owns.some((x) => x.name === userName)) {
                alert(`The username ${userName} already taken`);
                return null;
            }
            queryData.owns.push({ name: userName, items: [], prices: [] });
            await updateDoc(docRef, { owns: queryData.owns });
            return queryData;
        } else {
            const objToSet = { Name: roomName, owns: [{ name: userName, items: [], prices: [] }] };
            await setDoc(doc(data, roomName), objToSet);
            return objToSet;
        }
    } catch (error) {
        console.log("Error while setting group: ", error);
    }
    return null;
}

async function addNewItem(data, ownsList, roomName, userName, itemName, itemPrice) {
    const userIndex = ownsList.owns.findIndex((x) => x.name === userName);
    if (userIndex === -1) return;
    ownsList.owns[userIndex].items.push(itemName);
    ownsList.owns[userIndex].prices.push(itemPrice);

    const docRef = doc(data, roomName);
    const res = await updateDoc(docRef, { owns: ownsList.owns });
    console.log("Added item");
}

async function removeExistingItem(data, ownsList, roomName, userName, itemIndex) {
    const userIndex = ownsList.owns.findIndex((x) => x.name === userName);
    if (userIndex === -1) return;
    ownsList.owns[userIndex].items.splice(itemIndex, 1);
    ownsList.owns[userIndex].prices.splice(itemIndex, 1);

    const docRef = doc(data, roomName);
    const res = await updateDoc(docRef, { owns: ownsList.owns });
    console.log("Removes item");
}

function CheckboxExample() {
    const [checked, setChecked] = useState(true);
    return <FormControlLabel control={<Checkbox checked={checked} onChange={(e) => setChecked(e.target.checked)} />} label={"Test checkbox"} />;
}

function App() {
    const [isConnected, setIsConnected] = useState(false);
    const [user] = useAuthState(auth);
    const data = collection(db, "deals");
    const [roomName, setRoomName] = useState("");
    const [userName, setUserName] = useState("");
    const [ownsList, setOwnsList] = useState(null);
    const EnterRoom = async (roomName, userName) => {
        roomName = roomName;
        let succeed = await signIn(auth);
        if (!succeed) return;
        const newOwnsList = await getOrSetGroup(data, roomName, userName);
        if (!newOwnsList) return;
        onSnapshot(doc(data, roomName), (doc) => {
            const source = doc.metadata.hasPendingWrites ? "Local" : "Server";
            setOwnsList(doc.data());
            console.log(source, "data: ", doc.data());
        });
        setRoomName(roomName);
        setUserName(userName);
        setOwnsList(newOwnsList);
        setIsConnected(true);
    };
    const addItem = async (itemName, itemPrice) => {
        addNewItem(data, ownsList, roomName, userName, itemName, itemPrice);
    };
    const removeItem = async (itemIndex) => {
        removeExistingItem(data, ownsList, roomName, userName, itemIndex);
    };

    // const deals = {
    //     groupName: "Nugat",
    //     owns: [
    //         { name: "Itay", items: ["Meat", "Water"], prices: [50, 30] },
    //         { name: "Leon", items: ["Fuel"], prices: [100] },
    //     ],
    // };
    return (
        <ThemeProvider theme={theme}>
            {/* <Container maxWidth="sm"> */}
            <Navbar />
            <div className="App">
                <header className="App-header">
                    {isConnected && user ? <OwnsPage {...ownsList} addItem={addItem} removeItem={removeItem} myName={userName} /> : <Enter signIn={EnterRoom} />}
                    {/* <AppBar color="secondary">
                            <Toolbar>
                                <IconButton>
                                    <Menu />
                                </IconButton>
                                <Typography style={{ flexGrow: 1 }} variant="h6">
                                    MUI Theme
                                </Typography>
                                <Button variant="contained">Login</Button>
                            </Toolbar>
                        </AppBar> */}
                    {/* <Typography variant="h5">Welcome to test site of MaterialUI</Typography>

                    <Grid container spacing={4} justifyContent={"center"}>
                        <Grid item xs={3}>
                            <Paper style={{ height: 75, width: "100%" }} />
                        </Grid>
                        <Grid item xs={3} sm={6}>
                            <Paper style={{ height: 75, width: "100%" }} />
                        </Grid>
                        <Grid item xs={3}>
                            <Paper style={{ height: 75, width: "100%" }} />
                        </Grid>
                    </Grid>
                    <CheckboxExample />
                    <ButtonGroup>
                        <Button size="large" variant="contained" color="primary">
                            Upload
                        </Button>
                        <Button size="large" variant="contained" color="secondary">
                            Download
                        </Button>
                    </ButtonGroup>
                    <SortableList /> */}
                    <img src={logo} className="App-logo" alt="logo" />
                </header>
            </div>
            {/* </Container> */}
        </ThemeProvider>
    );
}

export default App;
