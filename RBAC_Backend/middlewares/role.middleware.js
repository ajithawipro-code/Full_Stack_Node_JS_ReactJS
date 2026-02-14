export const authorisedRoles = (...allowedRoles) =>{

     return (req,res,next)=>{

        console.log("HGYGHGHJBHJ",allowedRoles);

        if(!req.user || !allowedRoles.includes(req.user.role))
        {
            return res.status(403).json({message:"Forbidden/Unauthorised - Access Denied"});
        }

        next();

    }
       
}