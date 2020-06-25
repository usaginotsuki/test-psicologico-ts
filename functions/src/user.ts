import * as main from './index';
import * as firebaseHelper from 'firebase-functions-helper';
import * as Router from 'express';

const routes=Router();
const db=main.db;
const collection="users";

interface User {
    name: string,
    surname: string,
    birth: string,
    place: string,
    email: string,
    address: string,
    phone: string
}

routes.post('/user',async(req,res)=>{
    try{
        const newUser:User={
            name: req.body['name'],
            surname: req.body['surname'],
            birth: req.body['birth'],
            place: req.body['place'],
            email: req.body['email'],
            address: req.body['address'],
            phone: req.body['phone']
        };
        const userAdded=await firebaseHelper.firestore.createNewDocument(db,collection,newUser);
        res.status(201).send(`User was added to collection with id ${userAdded.id}`);
    }
    catch(err){
        res.status(400).send(`An error has ocurred ${err}`);
    }
});

routes.get('/user/:id',(req,res)=>{
    firebaseHelper.firestore.getDocument(db,collection,req.params.id)
    .then(doc=>res.status(200).send(doc)).catch(err=>res.status(400)
    .send(`An error has ocurred ${err}`))
});

routes.patch('/user/:id',async(req,res)=>{
    try{
        var id=req.params.id;
        const user:User={
            name: req.body['name'],
            surname: req.body['surname'],
            birth: req.body['birth'],
            place: req.body['place'],
            email: req.body['email'],
            address: req.body['address'],
            phone: req.body['phone']
        }
        await firebaseHelper.firestore.updateDocument(db,collection,id,user);
        res.status(200).send(`Person with id ${id} was updated`);
    }
    catch(err){
        res.status(400).send(`An error has ocurred ${err}`);
    }
});

routes.delete('/user/:id',async(req,res)=>{
    try{
        let id=req.params.id;
        await firebaseHelper.firestore.deleteDocument(db,collection,id);
        res.status(200).send(`User document with id ${id} was deleted`);
    }
    catch(err){
        res.status(400).send(`An error has ocurred ${err}`)
    }
});

routes.get('/user',(req,res)=>{
    firebaseHelper.firestore.backup(db,collection)
    .then(result=>res.status(200).send(result))
    .catch(err=>res.status(400).send(`An error has ocurred ${err}`));
});

export {routes};