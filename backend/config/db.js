const mongoose = require("mongoose");
const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASSWORD;

//connnection

 const conn = async () => {

     try {
         const dbConn = await mongoose.connect(`mongodb+srv://${dbUser}:${dbPassword}@cluster0.cffus.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`)
         console.log("Conectou com sucesso")
         return dbConn
     } catch (error) {
         console.log(error)
     }
 }
// const conn = async () => {
//     try {
//         mongoose.connect("mongodb://localhost:27017/reactgram",{useNewUrlParser: true, useUnifiedTopology: true})
//         console.log("Bd conectado com sucesso")
//     } catch (error) {
//         console.log(error)
//     }
// }

conn()
module.exports = conn;