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

## Basic Components

### Rendering a component

In App.js:

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

In Component.js:

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

In App.js:

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

In Component.js:

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

In Component.js:

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

In Component.module.css:

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

In Component.js

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

In Component.js:

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

In Home.js:

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

In Component.js:

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

In Component2.js:

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

In Home.js:

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

In Component.js:

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

In Component2.js:

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

In Home.js:

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