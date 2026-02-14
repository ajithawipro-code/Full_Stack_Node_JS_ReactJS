import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const Login = () =>{

    const [inputData,setInputData] = useState({
        email:"",
        password:""

    })

   const navigate=useNavigate();

    const handleChange=(e)=>{

        const {name,value} = e.target;
        setInputData(prev=> ({...prev, [name]: value}))
    }

    const handleSubmit= async (e)=>{
        e.preventDefault();

        try {

            const response = await axios.post("http://localhost:4567/user/login", inputData);

            const token = response.data.token;

            localStorage.setItem("token", token);

            navigate("/products");

            
            
        } catch (error) {

            console.log("Something went wrong inside Login-->", error.response.data);
            
        }
    }



return (
        <form onSubmit={handleSubmit}>
            <h2>Login page</h2>
            <input type="email" placeholder="Enter email" name="email" value={inputData.email} onChange={handleChange}/>
            <input type="password" placeholder="Enter password" name="password" value={inputData.password} onChange={handleChange} />
            <button type="submit">Login</button>
        </form>
    )


}