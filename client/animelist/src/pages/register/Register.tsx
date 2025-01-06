import { FormEventHandler, useState } from "react";
const API_BASE_URL=process.env.REACT_APP_API_BASE_URL;


function Register(){

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    function handleSubmit(e:React.FormEvent<HTMLFormElement>){
        console.log("test");
        const form = {username, password,confirmPassword};
        const user = {username, password};
        e.preventDefault();
        if(form.confirmPassword != form.password){
            console.log("le mot de passe n'est pas pareil dans les 2 cases");
            return;
        }
        console.log("new user added");
        fetch(`${API_BASE_URL}/user/newUser`, {
            
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body:JSON.stringify(user)
        }).then(() =>{
            
            setUsername("");
            setPassword("");
            setConfirmPassword("");
        })
        
    }
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label htmlFor="#username">Nom d'utilisateur: </label>
                <input type="text" id="#username" value={username} onChange={e => setUsername(e.target.value)} required/>
                <label htmlFor="#password">Mot de passe: </label>
                <input type="password" id="#password" value={password} onChange={e => setPassword(e.target.value)} required/>
                <label htmlFor="#confirmPassword">Confirme mot de passe:</label>
                <input type="password" id="#confirmPassword" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} required />
                <button type="submit"> Enregistrer </button>
            </form>
        </div>
    )
}

export default Register;