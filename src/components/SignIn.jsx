import React from "react";
import { useState } from "react"


const SignIn = ({setLocalStorage}) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    async function handleSubmit(event) {
        event.preventDefault();

        const response = await fetch("http://localhost:3000/login", {
            method: "POST",
            headers: {
                "Content-type": "application/json",
            },
            body: JSON.stringify({ username, password}),
        });

        if (response.ok) {
            const data = await response.json();
            setLocalStorage("token", data.token);
        } else {
            console.error("Login failed");
        }
    }

    return (
        <section>
            <form onSubmit={handleSubmit}>
                <ul>
                    <li>
                        <label htmlFor="username">Username:</label> 
                        <input type="text" id="username" name="username" value={username} onChange={(e) => setUsername(e.target.value)}/>
                    </li>
                    <li>
                        <label htmlFor="password">Password:</label>
                        <input type="password" id="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
                    </li>
                    <li>
                        <button type="submit">Submit</button>
                    </li>
                </ul>
            </form>
        </section>
    );
}

export default SignIn;