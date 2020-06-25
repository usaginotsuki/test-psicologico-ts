import * as main from './index';
import * as firebaseHelper from 'firebase-functions-helper';
import * as Router from 'express';

const routes=Router();
const db=main.db;
const collection="application";

interface Application {
    id:string,
    date:string,
    score:string,
    observation:string
}

routes.post('/application',async(req,res)=>{
    try{
        const newApplication:Application={
            id:req.body['id'],
            date: req.body['date'],
            score: req.body['score'],
            observation: req.body['observation'],
        };
        const ApplicationAdded=await firebaseHelper.firestore.createNewDocument(db,collection,newApplication);
        res.status(201).send(`Application was added to collection with id ${ApplicationAdded.id}`);
    }
    catch(err){
        res.status(400).send(`An error has ocurred ${err}`);
    }
});

routes.get('/application/:id',(req,res)=>{
    firebaseHelper.firestore.getDocument(db,collection,req.params.id)
    .then(doc=>res.status(200).send(doc)).catch(err=>res.status(400)
    .send(`An error has ocurred ${err}`))
});

routes.patch('/application/:id',async(req,res)=>{
    try{
        var id=req.params.id;
        const application:Application={
            id:req.body['id'],
            date: req.body['date'],
            score: req.body['score'],
            observation: req.body['observation'],
        }
        await firebaseHelper.firestore.updateDocument(db,collection,id,application);
        res.status(200).send(`Application with id ${id} was updated`);
    }
    catch(err){
        res.status(400).send(`An error has ocurred ${err}`);
    }
});

routes.delete('/application/:id',async(req,res)=>{
    try{
        let id=req.params.id;
        await firebaseHelper.firestore.deleteDocument(db,collection,id);
        res.status(200).send(`Application document with id ${id} was deleted`);
    }
    catch(err){
        res.status(400).send(`An error has ocurred ${err}`)
    }
});

routes.get('/application',(req,res)=>{
    firebaseHelper.firestore.backup(db,collection)
    .then(result=>res.status(200).send(result))
    .catch(err=>res.status(400).send(`An error has ocurred ${err}`));
});

export {routes};