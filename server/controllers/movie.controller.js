import Movies from "../models/movie.model.js";

const getMovies = async (req,res) =>{
    try{
        const movies = await Movies.find({});
        res.status(200).json(movies);
    }catch (err){
        res.status(500).json({ message: err.message});
    }
}

const getMovie = async (req,res) => {
    try{
        const {id} = req.params;
        const movie = await Movies.findById(id);
        if(!movie){
            return res.status(404).json({message: "movie not found"});
        }
        res.status(200).json(movie);
    }catch (err){
        res.status(500).json({message: err.message});
    }
}

const createMovie = async (req,res) => {
    try {
        const movie = await Movies.create(req.body);
    
        res.send(movie).status(204);
      } catch (err) {
        console.error(err);
        res.status(500).send("Error adding movie");
      }
}

const updateMovie = async (req,res) => {
    try{

        const {id} = req.params;
        const movie = await Movies.findByIdAndUpdate(id, req.body);
    
        if(!movie){
          return res.status(404).json({message: "Movie not found"});
        }
    
        const updatedMovie = await Movies.findById(id);
        res.status(200).send(updatedMovie);
      }catch(err){
        res.status(500).send("Error in the update");
      }
}

const deleteMovie = async (req,res) => {
    try{
    
        const {id} = req.params;
        const movie = await Movies.findByIdAndDelete(id);
    
        if(!movie){
          return res.status(404).json({message: "Movie not found"});
        }
    
        res.status(200).json({message: "Movie deleted successfully"});
      }catch (err){
        res.status(500).send("Error  could not delete movie")
      }
}

export {getMovies, getMovie, createMovie, updateMovie, deleteMovie};