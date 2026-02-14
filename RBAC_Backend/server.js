import express from "express";
import cors from "cors";
import dotenv from "dotenv"
import { dbConnectionCheck } from "./utils/dbHealthCheck.js";
import { UserRoute } from "./routes/user.route.js";
import { ProductRoute } from "./routes/product.route.js";

const app=express();
app.use(express.json());
dotenv.config();


app.use(cors({
    origin : "http://localhost:5173",
    methods: ["GET","POST","PUT","DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],

})
);

app.options(/.*/, cors());

app.use("/user", UserRoute);
app.use("/product", ProductRoute);



const PORT=process.env.PORT;

app.listen(PORT,async()=>{

    await dbConnectionCheck();
    console.log(`Server listening to port ${PORT}`);

})
