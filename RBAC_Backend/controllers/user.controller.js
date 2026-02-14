import { supabase } from "../configs/supabase.config.js";
import dotenv from "dotenv"
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
dotenv.config();

export const signup = async(req,res)=>{

    const {name,email,password, role} = req.body;
    
    const {data : existing} = await supabase.from("user_45")
                                       .select("id")
                                       .eq("email",email)
                                       .maybeSingle();

    if(existing)
    {
        return res.status(409).json({message: "Email already exists"});
    }

    const hashedPassword = await bcrypt.hash(password,10);

    const payload ={
        name,
        email,
        password : hashedPassword
    }

    if(role && !['USER','ADMIN','MANAGER'].includes(role))
    {
        return res.status(400).json({message: "Not valid role"});
    }
       
    if(role) payload.role = role;

    const {data,error} = await supabase.from("user_45")
                                       .insert(payload)
                                       .select()
                                       .single();
    if(error)
    {
        return res.status(500).json({error: error.message});
    }

    const user_data = {
        name: data.name,
        email : data.email,
        id: data.id,
        role: data.role
    }

    return res.status(201).json({message:"User created successfully", user_data});                                       

}


export const login = async(req,res)=>{

    const {email,password} = req.body;

    const {data:existing} = await supabase.from("user_45")
                                                 .select()
                                                 .eq("email",email)
                                                 .maybeSingle();
                                                 
                                              
    if(!existing)
    {
        return res.status(401).json({message: "Invalid credentials"});
    }
    
    const isMatch = await bcrypt.compare(password, existing.password)

    if(!isMatch)
    {
    
        return res.status(400).json({message:"Invalid credentials"});
    }

    const token = jwt.sign(
        {id:existing.id, role: existing.role},
        process.env.JWT_SECRET,
        {expiresIn: "1h"}
    )

    const response = {id:existing.id,
         email: existing.email, 
        name:existing.name, 
        role: existing.role }

    res.status(200).json({message: "Login successful", response : response, token }); 
}