import { Key, useState } from "react";
import { Token } from "typescript";
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

type user = {
    _id: Key,
    username: String,
    password: String,
    __v:any
}

function Login() {

    const [username,setUsername] = useState("");
    const [password,setPassword] = useState("");
    const [accessToken,setAccessToken] = useState("");
    const [refreshToken,setRefreshToken] = useState("");

    async function handleSubmit(e:React.FormEvent<HTMLFormElement>){
        e.preventDefault();
        const user = {username,password};
        try{
            const response = await fetch(`${API_BASE_URL}/user/logInUser`,{
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(user)
            });
            if(!response.ok){
                throw new Error("Problem");
            }
            const data = await response.json();
            setPassword("");
            setUsername("");
            setAccessToken(data.accessToken);
            setRefreshToken(data.refreshToken);

        }catch(err){
            console.log("le user n'a pas été trouvé"); 
        }
    }
    async function handleTest(e:React.FormEvent<HTMLFormElement>){
        e.preventDefault();
        try{
            const response = await fetch(`${API_BASE_URL}/user/getUsername`,{
                method: "GET",
                headers: {"Authorization": `Bearer ${accessToken}`},
            });
            const data = await response.json();
            console.log(data);
        }catch(err){
            const token = {refreshToken};
            const response = await fetch(`${API_BASE_URL}/user/token`,{
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(token)
            });
            const data = await response.json();
            setAccessToken(data.accessToken);
        }
    }

    return(
        <div>
            <form onSubmit={handleSubmit}>
                <label htmlFor="username">Username: </label>
                <input type="text" id="username" value={username} onChange={e => setUsername(e.target.value)} required/>
                <label htmlFor="password">Password: </label>
                <input type="password" id="password" value={password} onChange={e => setPassword(e.target.value)} required/>
                <button type="submit">Connexion</button>
            </form>
            <form onSubmit={handleTest}>
                <button type="submit">Test</button>
            </form>
            
        </div>
    )
}

export default Login;