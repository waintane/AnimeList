import Users from "../models/user.model.js";

const createNewUser = async (req,res) =>{
    console.log("called");
    try{
        const user = await Users.create(req.body);
        res.send(user).status(204);
    }catch (err){
        console.log(err);
        res.status(500).send("error adding a user");
    }
}

const findUser = async (req,res) => {
    console.log("called");
    try{
        const user = await Users.findOne(req.body);
        res.send(user).status(204);
    }catch (err){
        console.log(err);
        res.status(500).send("error finding user");
    }
}

export {createNewUser, findUser};