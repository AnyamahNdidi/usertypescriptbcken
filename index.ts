import express, { Application, Request, Response } from "express"
import regrouter from "./router/router"
import path from "path"
const port: number = 2024
require("./utlis/db")
const app: Application = express()
app.set("view engine", "ejs")
// app.set("views", path.join(__dirname, "views"))


app.use(express.json());
app.use("/api", regrouter)
app.get("/home/:id", (req:Request, res:Response) =>
{
    const id = req.params.id
    const nme = "edwin"
    return res.render("home",{id, nme} )
})


app.get("/", (req:Request, res:Response): Response  =>
{
    return res.status(200).json({"message":"server is up nd running "})
})


app.listen(port, (): void =>
{
    console.log("sever is up ready")
})