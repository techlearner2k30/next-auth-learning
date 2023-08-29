import mongoose from "mongoose";

export async function Connect() {
    try {
        mongoose.connect(process.env.MONGO_URI!)
        const connection = mongoose.connection;
        connection.on('connected', () => { 
           console.log("MongoDb connected successfully")
         });
         connection.on('error', (err) => { 
            console.log("MongoDb Connection error. Make sure Mongo Db is running");
            console.log(err);
          });
    } catch (error) {
        console.log("Something gor wrong!!")
        console.log(error)
    }
}