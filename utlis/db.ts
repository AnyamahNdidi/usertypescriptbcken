import mongoose from "mongoose"

const localURL:string = "mongodb://localhost/useretype"

mongoose.connect(localURL).then(() =>
{
    console.log("connected succesfull")
}).catch((error) =>
{
    console.log("error in connection")
})


