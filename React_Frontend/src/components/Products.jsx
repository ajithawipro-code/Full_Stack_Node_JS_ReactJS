import { useState } from "react"
import { useEffect } from "react"
import axios from "axios";

export const Products = () =>{

    const [formData,setFormData]= useState({
                name: "",
                price:""

    });

    const[products,setProducts] = useState([]);

    const [editProduct,setEditProduct] = useState(null);

    const [deleteProduct, setDeleteProduct] = useState(null);



    const handleChange= (e)=>{

        const { name, value} = e.target;
        setFormData((prev)=>({...prev, [name] : value}));
      }

    const handleEdit= (product)=>{    

        setEditProduct(product);

        setFormData({
            name: product.name,
            price: product.price
        })
    
}

    const handleSubmit= async(e) =>{

        e.preventDefault();

        const token= localStorage.getItem("token");
        try{

        if(editProduct)
        {

            const response = await axios.put(`https://full-stack-node-js-reactjs.onrender.com/product/update/${editProduct.id}`, formData,
                {
                    headers : {
                        Authorization : `Bearer ${token}`
                    }
                }
            
            )
            console.log("comes here---->",response.data);

            alert("data updated successfully");

            fetchProducts();
          
        }
            
      else{
            const response = await axios.post("https://full-stack-node-js-reactjs.onrender.com/product/addProduct", formData,
                {
                    headers: {
                        Authorization : `Bearer ${token}`
                    }
                }
            )

            console.log("token is --->", token);
            fetchProducts();
                     
        }

        setEditProduct(null);
       setFormData({
        name: "",
        price :""
       });
    }
        catch (error) {

            console.error("Error inside catch block--->", error);
            
        }

    }

    const handleDelete = async (product) =>{

           try{


            console.log("Came inside here");

            
            setDeleteProduct(product);

            console.log(product);

            console.log("deelet Product is--->", deleteProduct);

     
            if(product)
            {

            const token = localStorage.getItem("token");

            const response = await axios.delete(`https://full-stack-node-js-reactjs.onrender.com/product/delete/${product.id}`,
                {
                    headers : {
                        Authorization : `Bearer ${token}`
                    }
                }
            );

            alert("Data deleted successfully");

            fetchProducts();

        }
    }
        catch(error){

            console.error("Error inside catch block", error);          

         }

    }

    

    const fetchProducts=async()=>{
        try {

            const token=localStorage.getItem("token");

            const fetch_response = await axios.get("https://full-stack-node-js-reactjs.onrender.com/product/getProducts", 
                {
                    headers: {
                        Authorization : `Bearer ${token}`
                    }
                }
            )

            setProducts(fetch_response.data.data);
            console.log(fetch_response.data);
        } catch (error) {

            console.error("Something went wrongnnnnnnn heerrerer inside Ctahchhh-->", error);
            
        }

    }



 useEffect(()=>{
        fetchProducts()
    },[]);


    return(
<>
        <form onSubmit={handleSubmit}>

            <input type="text" placeholder="Enter name" name="name" value={formData.name} onChange={handleChange} />
            <input type="text" placeholder="Enter price" name="price" value={formData.price} onChange={handleChange} />
            <button type="submit">{editProduct ? "Update Product" : "Add Product"}</button>
            
            
        </form>

        <div>

            {
                products.map((product)=>(
                    <div key={product.id}>
                        <p>{product.name}</p>
                        <p>{product.price}</p>
                        <button onClick={()=>handleEdit(product)}>Edit</button>
                        <button onClick={()=>handleDelete(product)}>delete</button>
                    </div>
                ))
                
            }

        </div>
        </>
    )


}