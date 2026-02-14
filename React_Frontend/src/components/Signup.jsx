import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const Signup=()=>{

    const [inputData,setInputData] = useState({
        name:"",
        email:"",
        password:""
    })
    const navigate = useNavigate();

    const handleChange=(e)=>{

        const {name,value} = e.target;
        setInputData(prev => ({...prev, [name] : value}))
    }

    const handleSubmit= async(e)=>{
        e.preventDefault();
        try {

            const res= await axios.post("http://localhost:4567/user/signup", inputData);

            console.log("res from BE is",res.data);

          alert("Signup successful.. Login to continue");
          
          navigate("/login");
          
        } 
        catch (error) {

            alert("Something went wrong", error.response);
            
        }

    }

    return (
        <form onSubmit={handleSubmit}>
            <h2>Signup page</h2>
            <input type="text" placeholder="Enter name" name="name" value={inputData.name} onChange={handleChange} />
            <input type="email" placeholder="Enter email" name="email" value={inputData.email} onChange={handleChange}/>
            <input type="password" placeholder="Enter password" name="password" value={inputData.password} onChange={handleChange} />
            <button type="submit">Signup</button>
        </form>
    )
}
