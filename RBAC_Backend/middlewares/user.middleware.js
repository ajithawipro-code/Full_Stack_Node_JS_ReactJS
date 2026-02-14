import jwt from "jsonwebtoken";

export const authenticate = async(req,res,next)=> {
  try{

    console.log("Enters here====>", req.headers);

    const authHeaders = req.headers.authorization;

    if(!authHeaders || !authHeaders.startsWith("Bearer "))
    {
        return res.status(400).json({message: "Token missing"});
    }

    const token = authHeaders.split(" ")[1];

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("fwqhgh", decoded);

    req.user= decoded;

    console.log("Come here ===>>", req.user);

  next();
  }
  catch(err)
  {
   return  res.status(500).json({error: err.message});
  }

}