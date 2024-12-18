import { useState } from "react";

function Login() {

    const [username,setUsername] = useState("");
    const [password,setPassword] = useState("");

    function handleSubmit(e:React.FormEvent<HTMLFormElement>){

    }

    return(
        <div>
            <form onSubmit={handleSubmit}>
                <label htmlFor="username">Username: </label>
                <input type="text" id="username" value={username} onChange={e => setUsername(e.target.value)} required/>
                <label htmlFor="password">Password: </label>
                <input type="text" id="password" value={password} onChange={e => setPassword(e.target.value)} required/>
                <button type="submit">Connexion</button>
            </form>
        </div>
    )
}

export default Login;