import express, { Request, Response } from "express"
import usermodel from "../model.js/uesermodel"
import bycrpt, { genSalt } from "bcrypt"
import jwt from "jsonwebtoken"
import nodemailer from "nodemailer"
import path from "path"
import ejs from "ejs"

const transport = nodemailer.createTransport({
    service: "gmail",
	auth: {
		user: "anyamahedwin@gmail.com",
		pass: "jzntihynbiivuleo",
	},
})

type crluser = {
    name: string,
    email: string,
    password: string,
    _id?:string
    
}




const getuser = async (req:Request, res:Response) :Promise<Response> =>
{
    try
    {
        const getuserfile = await usermodel.find()
        return res.status(200)
      .json({ message: "Students has been FOUND", data: getuserfile })
        
    } catch (error)
    {
        return res.status(404).json({
            message: "an error occour",
            data:error
        })
    }
}

const signuser = async (req:Request, res:Response) :Promise<Response> =>
{
    try
    {
        const { name, email, password } = req.body
        const salt = await bycrpt.genSalt(10)
        const hashed = await bycrpt.hash(password, salt)
        const studentData: crluser | null = await usermodel.create({
            name,
            email,
            password:hashed
        });
        
        const token = jwt.sign({ name: studentData?.name, id: studentData?._id }, "typescriptcode", { expiresIn: "1d" })
        const file = path.join(__dirname, "../views/home.ejs")

        ejs.renderFile(file, (err, data) => {
            if (err)
            {
                console.log(err)
            } else
            {
                const mailoption = {
                    from: "no-reply",
                    to: email,
                    subject: "email verification",
                    html:data
                }
                transport.sendMail(mailoption, (err, info) =>
                {
                    if (err)
                    {
                        console.log(err)
                    } else
                    {
                       console.log("messages sent", info.response) 
                    }
                    
                })
            }
        })

        return res.status(200)
      .json({ message: "Students has been creted", 
          data: studentData,
          token:token
      })
        
    } catch (error)
    {
        return res.status(404).json({
            message: "an error occour",
            data:error
        })
    }
}

export  {getuser, signuser}