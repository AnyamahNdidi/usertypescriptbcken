import mongoose from "mongoose"

type userdt = {
    name: string,
    email: string,
    password:string
}

interface newuser extends userdt, mongoose.Document{}

const usermodel = new mongoose.Schema({
    name: {
        type:String
    },
    email: {
        type:String
    },
    password: {
        String
    }
})

export default mongoose.model<newuser>("users", usermodel)
