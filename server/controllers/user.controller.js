import jwt from "jsonwebtoken";
import Users from "../models/user.model.js";
import Token from "../models/token.model.js";
import bcrypt from "bcrypt";

const saltRound = 12;

////////////////////////////////////////////////////////////////////// create user

const createNewUser = async (req,res) =>{

    const check = await Users.findOne({username:req.body.username});

    if(check){
        res.status(500).send("Username taken");
        return;
    }else{
        bcrypt.genSalt(saltRound, (err, salt) =>{
            if(err) return res.status(500);
                
            bcrypt.hash(req.body.password,salt,(err,hash) => {
                if(err) return res.status(500);
    
                const sendRequest = async () => {
                    try{
                        const user = await Users.create({username:req.body.username,password:hash,role:"user",date : new Date});
                        res.send(user).status(201);
                    }catch (err){
                        console.log(err);
                        res.status(500).send("error adding a user");
                    }
                }
                sendRequest();
            });
        });
    }
}

////////////////////////////////////////////////////////////////////////////////////login user

const logInUser = async (req,res) => {
    try{
        const user = await Users.findOne({username:req.body.username});
        let test = await bcrypt.compare(req.body.password,user.password);

        if(!test) return res.send("not found").status(404);
            
        if(test){
            const userTemp = { _id:user._id,
                username:user.username,
                role:user.role};

            const accessToken = jwt.sign(userTemp,process.env.ACCESS_TOKEN_SECRET, {expiresIn: "15m"});
            const refreshToken = jwt.sign(userTemp, process.env.REFRESH_TOKEN_SECRET);

            const check = await Token.findOne({token:refreshToken});

            if(check) res.sendStatus(500);  

            if(!check){
                await Token.create({token:refreshToken});
                res.send({accessToken,refreshToken}).status(202);
            }
        }
    }catch (err){
        console.log(err);
        res.status(404).send("error finding user");
    }
}

//////////////////////////////////////////////////////////////////////////////////// get token

const getToken = async (req,res) => {

    const refreshToken = req.body.refreshToken;
    if(refreshToken == null) return res.sendStatus(401);

    const check = await Token.findOne({token:refreshToken})

    if(!check) return res.sendStatus(403);
    jwt.verify(refreshToken,process.env.REFRESH_TOKEN_SECRET, (err, user) =>{
        if(err) return res.sendStatus(403);
        const accessToken = jwt.sign({username: user.username, _id: user._id, role:user.role},process.env.ACCESS_TOKEN_SECRET, {expiresIn: "1m"});
        res.send({accessToken});
    });
}

///////////////////////////////////////////////////////////////////////////// getusername

const getUsername = async (req,res) => {
    console.log(req.user);
    res.send({username : req.user.username});
}

export {createNewUser, logInUser, getUsername, getToken};