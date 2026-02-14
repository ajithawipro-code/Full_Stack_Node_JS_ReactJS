import { supabase } from "../configs/supabase.config.js";

export const addProduct = async(req,res) =>{

    const {id} = req.user;

    const{name, price} = req.body;

    const {data,error} = await supabase.from("products_45")
                                       .insert({name, price, user_id:id})
                                       .select();
    if(error)
    {
        return res.status(500).json({error: error.message});
    }

    return res.status(201).json({message:"product added successfully.", data});                                 

}

export const getProducts = async(req,res) =>{

    console.log("what u get here", req.user);

    const {id} = req.user;

    const {data, error} = await supabase.from("products_45")
                                        .select()
                                        .eq("user_id", id);

                                        console.log(data);
    if(error)
    {
        return res.status(500).json({error: error.message});
    }

    return res.status(200).json({message: "All products fetched", data});                                     

}

export const updateProduct = async(req,res)=>{

    const {id} = req.params;
    const user_id = req.user.id;

    const {name, price} = req.body;

    const{data,error} = await supabase.from("products_45")
                                      .update({name, price})
                                      .eq("user_id", user_id)
                                      .eq("id",id)
                                      .select();

    if(error)
    {
        return res.status(500).json({error: error.message});
    }

    return res.status(200).json({message: "Updated data successfully", data});                                    


}

export const deleteProduct = async(req,res) =>{

    const {id} = req.params;
    const user_id = req.user.id;

    const {data,error} = await supabase.from("products_45")
                                       .delete()
                                       .eq("id",id)
                                       .eq("user_id",user_id)
                                       .select();
    if(error)
    {
        return res.status(500).json({error:error.message});
    }

    return res.status(200).json({message: "Product deleted successfully"});
}
