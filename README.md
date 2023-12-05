# ReactJS Reference Repository

This repository is used to store my ReactJS notes and code snippets for future references.

# Index

- [ReactJS Reference Repository](#reactjs-reference-repository)
    - [Basic Components](#basic-components)
        - [Rendering a component](#rendering-a-component)
        - [Basic React Syntax](#basic-react-syntax)
        - [Props](#props)
        - [Styling](#styling)
    - [State Management](#state-management)
        - [Event Listeners](#event-listeners)
        - [Storing State](#storing-state)
        - [Moving data between Components](#moving-data-between-components)
    - [Nesting Components](#nesting-components)
    - [Conditional Content](#conditional-content)
    - [Forms](#forms)
        - [Handling Single Input Form](#handling-single-input-form)
        - [Handling Multi-Input Forms](#handling-multi-input-forms)
    - [Redux](#redux)

## Basic Components

### Rendering a component

In `App.js`:

``` jsx
function App() {
    return (
        <main>
            <Component />
        </main>
    );
}

export default App;
```

### Basic React Syntax

Use `{}` to insert dynamic values.

In `Component.js`:

``` jsx
function Component() {
    const name = "Arunam Gupta";

    return (
        <div>
            <h1>Home</h1>
            <p>Hi! My name is {name}</p>
        </div>
    );
}

export default Component;
```

### Props

'Props' stands for properties and can be used to send data from one component to another.

In `App.js`:

``` jsx
function App() {
    let jsonFirstName = {name: "Arunam"};

    return (
        <main>
            <Home firstName={jsonFirstName} lastName={"Gupta"}/>
        </main>
    );
}

export default App;
```

In `Component.js`:

``` jsx
function Component(props) {
    return (
        <div>
            <h1>Home</h1>
            <p>Hi! My name is {props.firstName.name} {props.lastName}</p>
        </div>
    );
}

export default Component;
```

### Styling

Styles should go in `<Component-Name>.module.css`

In `Component.js`:

``` jsx
import classes from './Component.module.css'

function Component() {
    return (
        <div className={classes['yellow-background']}>
            <p className={classes['red-text']}>This text will be styled using Component.module.css</p>
        </div>
    );
}

export default Component;
```

In `Component.module.css`:

``` css
.yellow-background {
    background-color: yellow;
}

.red-text {
    color: red;
}
```

## State Management

Used to track and update data for jsx based web page.

### Event Listeners

In `Component.js`:

``` jsx 
function Component() {
    function changeHandler(event) {
        console.log(event);
        console.log(event.target);
        console.log(event.target.value);
    }
    return (
        <form>
            <label htmlFor={'name'}>Name</label>
            <input id='name' onChange={changeHandler}/>
        </form>
    );
}

export default Component;
```

### Storing State

In `Component.js`:

``` jsx
import {useState} from "react";

function Component() {
    const [enteredName, setEnteredName] = useState('');

    function changeHandler(event) {
        setEnteredName(event.target.value)
    }

    return (
        <>
            <form>
                <label htmlFor={'name'}>Name</label>
                <input id='name' onChange={changeHandler}/>
            </form>
            <p>{enteredName}</p>
        </>
    );
}

export default Component;
```

### Moving data between Components

In order to share the State you must elevate it to a component where both the child components would have access to it.

In `Home.js`:

``` jsx 
function Home() {
    const [enteredText, setEnteredText] = useState('');

    function textChangeHandler (event) {
        setEnteredText(event.target.value);
    }

    return (
        <>
            <h1>Home.js</h1>
            <Component onTextChange={textChangeHandler}/>
            <Component2 newText={enteredText}/>
        </>
    );
}

export default Home;
```

In `Component.js`:

``` jsx 
function Component(props) {
    return (
        <>
            <h1>Component.js</h1>
            <form>
                <label htmlFor={'name'}>Name</label>
                <input id='name' onChange={props.onTextChange}/>
            </form>
        </>
    );
}

export default Component;
```

In `Component2.js`:

``` jsx 
function Component2 (props) {
    return (
        <>
            <h1>Component2.js</h1>
            <p>{props.newText}</p>
        </>
    );
}

export default Component2
```

## Nesting Components

When working with nested custom components use `props.children` to get access to the passed inner component.

In `Home.js`:

``` jsx
function Home() {
    return (
        <>
            <h1>Home.js</h1>
            <Component>
                <Component2></Component2>
            </Component>
        </>
    );
}

export default Home;
```

In `Component.js`:

``` jsx
function Component(props) {
    return (
        <>
            <h1>Component.js</h1>
            <p>{props.children}</p>
            <p>Last line of Component.js</p>
        </>
    );
}

export default Component;
```

In `Component2.js`:

``` jsx
function Component2 () {
    return (
        <>
            <h1>Component2.js</h1>
            <p>Last line of Component2.js</p>
        </>
    );
}

export default Component2
```

Following HTML content will be displayed:

``` text
Home.js
Component.js
Component2.js
Last line of Component2.js
Last line of Component.js
```

## Conditional Content

Using boolean values to conditionally display content.

In `Home.js`:

``` jsx
function Home() {
    const [displayBoolean, setDisplayBoolean] = useState(true);

    let trueTemplate = <p>Show this if boolean is true.</p>;
    let falseTemplate = <p>Show this if boolean is false.</p>;

    function displayBooleanChangeHandler() {
        setDisplayBoolean(!displayBoolean);
    }

    return (
        <>
            <h1>Home.js</h1>
            {displayBoolean ? trueTemplate : falseTemplate}
            <button onClick={displayBooleanChangeHandler}>Click to flip the boolean value.</button>
        </>
    );
}

export default Home;
```

## Forms

### Handling Single Input Form

In `Home.js`:

``` jsx
import {useState} from "react";

function Home() {
    const [currentInput, setCurrentInput] = useState('');
    const [submittedName, setSubmittedName] = useState('');

    function submitHandler(event) {
        // Make sure to use event.preventDefault to stop default server side response to onSubmit.
        event.preventDefault();
        setSubmittedName(currentInput); // Update submitted name on submit
    }

    function handleNameChange(event) {
        setCurrentInput(event.target.value); // Update current input as user types
    }

    return (
        <>
            <h1>Home.js</h1>
            <form onSubmit={submitHandler}>
                <label htmlFor='name'>Name</label>
                <input
                    id='name'
                    type="text"
                    value={currentInput}
                    onChange={handleNameChange} // Handle input change
                />
                <button type="submit">Submit!</button>
            </form>
            <p>Entered Name is: {submittedName}</p>
        </>
    );
}

export default Home;
```

### Handling Multi-Input Forms

``` jsx
import {useState} from "react";

function Home() {
    const [formState, setFormState] = useState({
        name: '',
        email: '',
    });
    const [submittedData, setSubmittedData] = useState({});

    function handleChange(event) {
        let fieldName = event.target.name;
        let fieldValue = event.target.value;
        let newFormState = {};
        for (let key in formState) {
            newFormState[key] = formState[key];
        }
        newFormState[fieldName] = fieldValue;
        setFormState(newFormState);
    }

    function handleSubmit(event) {
        event.preventDefault();
        setSubmittedData(formState);
    }

    return (
        <>
            <h1>Home.js</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor='name'>Name</label>
                <input
                    id='name'
                    name='name'
                    type="text"
                    value={formState.name}
                    onChange={handleChange}
                />
                <label htmlFor='email'>Email</label>
                <input
                    id='email'
                    name='email'
                    type="email"
                    value={formState.email}
                    onChange={handleChange}
                />
                <button type="submit">Submit!</button>
            </form>
            <p>Submitted Data:</p>
            <p>Name: {submittedData.name}</p>
            <p>Email: {submittedData.email}</p>
        </>
    );
}

export default Home;
```

## Redux

`ActionTypes.js`: This file defines the various types of actions that can be dispatched in the Redux application. These are usually constants which help in maintaining consistency and avoiding errors due to typos in action types.

`Actions.js`: Contains functions known as action creators. These functions return action objects which are dispatched to the store to convey what type of update is to be made to the state. Each action typically contains a type (defined in ActionTypes.js) and a payload (data).

`Reducer.js`: Reducers are functions that determine how the state of an application changes in response to actions sent to the store. Based on the action type, the reducer updates the state in an immutable way and returns the new state.

`Store.js`: This file is where the Redux store is configured and created. The store is essentially an object that brings the actions and reducers together, maintains the application state, and allows access to the state and the ability to dispatch actions.

`List.js`: A React component file that is connected to the Redux store. It would use Redux state to manage the names in the list.

In `Home.js`:

``` jsx
import List from "./redux/List";
import {Provider} from "react-redux";
import store from "./redux/Store";

function Home() {
    return (
        <>
            <h1>Home.js</h1>
            <Provider store={store}>
                <List/>
            </Provider>
        </>
    );
}

export default Home;
```

In `ActionTypes.js`:

``` jsx 
// Defining action type constants
const ACTION_ADD_NAME = 'ACTION_ADD_NAME';
const ACTION_DELETE_NAME = 'ACTION_DELETE_NAME';

// Exporting the action type constants
export default {
    ACTION_ADD_NAME,
    ACTION_DELETE_NAME
};
```

In `Actions.js`:

``` jsx 
import ActionTypes from './ActionTypes';

// Function to create an action for adding a name
export function actionAddPerson(name) {
    return {
        type: ActionTypes.ACTION_ADD_NAME,
        payload: name
    };
}

// Function to create an action for removing a name by index
export function actionRemovePerson(index) {
    return {
        type: ActionTypes.ACTION_DELETE_NAME,
        index: index
    };
}
```

In `Reducer.js`:

``` jsx 
import ActionTypes from './ActionTypes';

// Reducer function for handling state changes in the names list
export default function namesReducer(currentState = { namesList: [] }, incomingAction) {
    switch (incomingAction.type) {
        case ActionTypes.ACTION_ADD_NAME:
            // Handle adding a new name
            return {
                namesList: currentState.namesList.concat(incomingAction.payload)
            };

        case ActionTypes.ACTION_DELETE_NAME:
            // Handle deleting a name by index
            return {
                namesList: currentState.namesList.filter((element, index) => index !== incomingAction.index)
            };

        default:
            // Return current state for any other action
            return currentState;
    }
}
```

In `Store.js`:

``` jsx 
import { createStore } from 'redux';
import namesReducer from './Reducer';

// Creating the Redux store with the namesReducer
const namesStore = createStore(namesReducer);

// Exporting the store
export default namesStore;
```

In `List.js`:

``` jsx 
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { actionAddPerson, actionRemovePerson } from './Actions';

function ListComponent() {
    const [inputName, setInputName] = useState('');

    // Accessing the Redux state to get the names list
    const namesFromStore = useSelector((state) => {
        return state.namesList;
    });

    // Getting the dispatch function from useDispatch hook
    const dispatchAction = useDispatch();

    // Function to handle the addition of a name
    function handleAddName(event) {
        event.preventDefault();
        if (inputName.trim() !== '') {
            dispatchAction(actionAddPerson(inputName));
            setInputName('');
        }
    }

    // Function to handle the deletion of a name by its index
    function handleDeleteName(indexToDelete) {
        dispatchAction(actionRemovePerson(indexToDelete));
    }

    function handleChange(event) {
        setInputName(event.target.value);
    }

    return (
        <div>
            <h2>Add Name</h2>
            <form onSubmit={handleAddName}>
                <input
                    type="text"
                    value={inputName}
                    onChange={handleChange}
                    placeholder="Enter name"
                />
                <button type="submit">Add</button>
            </form>

            <h2>Names List</h2>
            <table>
                <thead>
                <tr>
                    <th>Index</th>
                    <th>Name</th>
                    <th>Action</th>
                </tr>
                </thead>
                <tbody>
                {namesFromStore.map((individualName, nameIndex) => (
                    <tr key={nameIndex}>
                        <td>{nameIndex}</td>
                        <td>{individualName}</td>
                        <td>
                            <button onClick={() => handleDeleteName(nameIndex)}>Delete</button>
                        </td>
                    </tr>
                ))}
                </tbody>

            </table>
        </div>
    );
}

export default ListComponent;
```
