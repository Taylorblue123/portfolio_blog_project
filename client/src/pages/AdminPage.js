import React, {useState} from "react";
import { Navigate } from "react-router-dom";

export default function AdminPage(){
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [redirect, setRedirect] = useState(false);

    async function login(e) {
        e.preventDefault();
        const response = await fetch("http://localhost:4000/admin", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            credentials: "include",
            body: JSON.stringify({username, password}),
        });
        
        if(response.status === 200){
            alert("Login Successful");
            const data = await response.json();
            console.log(data);
            setRedirect(true);
        } else {
            alert("Login Failed");
        }
    };

    if(redirect){
        return <Navigate to="/" />;
    }

    return (
        <main>
            <div>
                <form className="login" onSubmit={login}>
                    <h1>Admin</h1>
                    <input 
                        type="text" 
                        placeholder="username" 
                        value={username} 
                        onChange={(e) => setUsername(e.target.value)} 
                    />
                    <input 
                        type="password" 
                        placeholder="password" 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)} 
                    />
                    <button>Login</button>
                </form>
            </div>
        </main>
    );
}