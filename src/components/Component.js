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