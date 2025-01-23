import React, {useState} from "react";

export default function RegisterPage(){
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    async function register(e) {
        e.preventDefault();

        const response = await fetch("https://host-5kkf.onrender.com/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({username, password}),
        });

        if(response.status !== 200){
            alert("Registration Error");
        } else {
            alert("Registration Successful");
        }
    };

    return (
        <div>
            <form className="register" onSubmit= {register}>
                <h1>Sign Up</h1>
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
                <button>Register</button>
            </form>
        </div>
    );
}