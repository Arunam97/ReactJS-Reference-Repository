import {useState} from "react";

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