import { supabase } from "../configs/supabase.config.js"

export const dbConnectionCheck = async ()=>{

try {
        const {error} = await supabase.from("user_45").select().limit(1);
        if(error)
        {
            throw error;
          
        }
        console.log("%%%%%  DB SUCCESS  %%%%%%")
        

} catch (error) {
    console.error("*****DB failed*****", error.message);
    process.exit(1);
    
}




}