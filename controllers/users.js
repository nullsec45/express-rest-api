import {v4 as uuidv4} from "uuid";
import fs from "fs";
import {readFile, writeFile} from "fs";
import cors from "cors";


const fileBuffer=fs.readFileSync("./data.json","utf-8");
let users=JSON.parse(fileBuffer);

export const getUsers=(req,res) =>{
    const fileBuffer=fs.readFileSync("./data.json", "utf-8");
    const users=JSON.parse(fileBuffer);
    res.send(users);
}

export const createUser=(req,res) =>{
    const user=req.body;
    const userId=uuidv4();
    const userWithId={...user, id:userId};
    
    users.push(userWithId);
    fs.writeFile("./data.json", JSON.stringify(users), (err) =>{
        if(err) res.send(`Error : ${err}`);
        res.send({msg:`User : ${user.firstName} add to database.`});
    });
 
}

export const getUser=(req,res) =>{
    const {id}=req.params;
    const foundUser=users.find((user) => user.id === id);

    res.send(foundUser);
}

export const deleteUser=(req,res) =>{
    const {id}=req.params;

    
    users=users.filter((user) => user.id !== id);

    fs.writeFile("./data.json", JSON.stringify(users), (err) =>{
        if(err) res.send(`Error : ${err}`);

        res.send(`User with the id ${id} deleted from the database.`);
    });

}

export const updateUser=(req,res) => {
    const {id}=req.params;
    const {firstName, lastName, age}=req.body;
    console.log(firstName);
    
    const user=users.find((user) => user.id === id);
    let index=users.indexOf(user);

    if(firstName) user.firstName=firstName;
    if(lastName) user.lastName=lastName;
    if(age) user.age=age;
    
    users.splice(index, 1, user);
    fs.writeFile("./data.json", JSON.stringify(users), (err) =>{
        if(err) res.send(`Error : ${err}`);

        res.send(`User with the id ${id} has been updated!.`);
    });
}
