import React from "react";
import { useState } from "react"


const SignIn = ({signInStatus, usernameData, viewSignUp, setLocalStorage, logOut, logIn}) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");

    async function handleSubmitLogin(event) {
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

            const userResponse = await fetch(`http://localhost:3000/users/${username}`, {
                method: "GET",
                headers: {
                    "Content-type": "application/json",
                    "Authorization": `Bearer ${data.token}`
                }
            });

            const userData = await userResponse.json();
            setLocalStorage("user", userData.user);

            logIn(userData.user.username);
        } else {
            console.error("Login failed");
        }
    }

    async function handleSubmitSignUp(event) {
        event.preventDefault();

        const response = await fetch("http://localhost:3000/users", {
            method: "POST",
            headers: {
                "Content-type": "application/json",
            },
            body: JSON.stringify({ username, password, email }),
        });

        if (response.ok) {
            logOut();
        } else {
            console.error("Login failed");
        }
    }

    if (signInStatus === 'logged in') {
        return (
            <section>
                <h2>Hi {usernameData}</h2>
                <button onClick={logOut}>Log out</button>
            </section>
        );
    } else if (signInStatus === 'signing up') {
        return (
            <section>
                <h2>Sign Up</h2>
                <form onSubmit={handleSubmitSignUp}>
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
                            <label htmlFor="email">Email:</label>
                            <input type="email" id="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)}/>
                        </li>
                        <li>
                            <button type="submit">Submit</button>
                        </li>
                    </ul>
                </form>
                <button onClick={logOut}>Back</button>
            </section>
        )
    } else {
        return (
            <section>
                <h2>Sign In</h2>
                <form onSubmit={handleSubmitLogin}>
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
                <span>Not signed up? No worries! <button onClick={viewSignUp}>Click here to Sign Up</button></span>
            </section>
        );
    }
}

export default SignIn;