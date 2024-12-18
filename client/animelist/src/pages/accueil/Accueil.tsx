import {Key, useState,useEffect } from "react";
const API_BASE_URL=process.env.REACT_APP_API_BASE_URL;

type movie = {
    _id: Key
    name: String,
    genre : String,
    description : String,
    image : String
}

function Acceuil(){

    const [data,setData] = useState<movie[]>([]);

    useEffect(() => {
        const fetchMovies = async () =>{
            try{
                const response = await fetch(`${API_BASE_URL}/movies/`);
                if(!response.ok){
                    throw new Error(`HTTP error! status: ${response.status}`)
                }
                const data: movie[] = await response.json();
                setData(data);
            }catch (err:any){
                throw err;
            }
        }
        fetchMovies();
    },[]);

    return(
        <div className="accueil">
            <div>
                { data.length == 0 ? "Loading": (
                    data.map((e)=>(
                        <div key={e._id}>
                            <h3> {e.name} </h3>
                            <p> Description : {e.description} </p>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}
export default Acceuil;