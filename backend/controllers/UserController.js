const User = require("../models/User")
const mongoose = require('mongoose')
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");

const jwtSecret = process.env.JWT_SECRET;

const generateToken = (id) => {
    return jwt.sign({id} , jwtSecret,{
        expiresIn:"7d",
    })
};

// Register user and sign in 
const register = async(req,res) => {
    const {name,email,password} = req.body
    //check if use exists
    try {
        const user = await User.findOne({email})

        if(user){
            res.status(422).json({errors:["Por favor, utilize outro e-mail"]})
            return
        }

        const salt = await bcrypt.genSalt()
        const passawordHash = await bcrypt.hash(password,salt)

        //create user
        const newUser = await User.create({
            name,
            email,
            password:passawordHash
        })

        if(!newUser){
            res.status(422).json({errors:["Houve um erro,porfavor tente mais tarde"]})
        }
        res.status(201).json({
            _id:newUser._id,
            token:generateToken(newUser._id),
        })
    } catch (error) {
        console.log(error)        
    }

}

const login = async (req,res) => {
    const {email,password} = req.body

    const user = await User.findOne({email})

    if(!user){
        res.status(404).json({errors:["Usuario não encontrado."]})
        return
    }

    //check if password matches
    if(!(await bcrypt.compare(password,user.password))){
        res.status(422).json({errors:["Senha inválida"]})
        return
    }
    //return user with token
    res.status(201).json({
        _id: user._id,
        profileImage:user.profileImage,
        token:generateToken(user._id),
    })
};

const getCurrentUser = async (req,res) => {
    const user = req.user
    res.status(200).json(user)
}
const update = async (req,res) => {
    
    const {name,password,bio} = req.body

    let profileImage = null

    if(req.file){
        profileImage = req.file.filename
    }
    const reqUser = req.user

    const user = await User.findById(mongoose.Types.ObjectId(reqUser._id)).select("-password")

    if(name){
        user.name = name;
    }

    if(password){
        //generate password hash
        const salt = await bcrypt.genSalt();
        const passwordHash = await bcrypt.hash(password,salt)

        user.password = passwordHash
    }
    if(profileImage){
        user.profileImage = profileImage
    }
    if(bio){
        user.bio = bio
    }

    await user.save()
    res.status(200).json(user)
}

const getUserById = async(req,res) => {
    const {id} = req.params

    try {
        const user = await User.findById(mongoose.Types.ObjectId(id)).select("-password")
        
        //check if user exists
        if(!user){
            res.status(404).json({errors:["Usuario não encontrado."]})
            return
        }

        res.status(200).json(user)
    } catch (error) {
        res.status(404).json({errors:["Usuario não encontrado"]})
        return
    }
    

}

module.exports = {
    register,
    login,
    getCurrentUser,
    update,
    getUserById,
} 