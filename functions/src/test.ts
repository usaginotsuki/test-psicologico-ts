import * as main from './index';
import * as firebaseHelper from 'firebase-functions-helper';
import * as Router from 'express';

const routes=Router();
const db=main.db;
const collection="test";
const subcollection="question";
const subdb=db.collection(collection)
interface Test {
    name:string,
    category:string,
    instructions:string
}

interface Question {
    question:string,
    answers:string
}  

routes.post('/test',async(req,res)=>{
    try{
        const newTest:Test={
            name: req.body['name'],
            category: req.body['category'],
            instructions: req.body['instructions'],
        };
        const TestAdded=await firebaseHelper.firestore.createNewDocument(db,collection,newTest);
        res.status(201).send(`Test was added to collection with id ${TestAdded.id}`);
    }
    catch(err){
        res.status(400).send(`An error has ocurred ${err}`);
    }
});

routes.get('/test/:id',(req,res)=>{
    firebaseHelper.firestore.getDocument(db,collection,req.params.id)
    .then(doc=>res.status(200).send(doc)).catch(err=>res.status(400)
    .send(`An error has ocurred ${err}`))
});

routes.patch('/test/:id',async(req,res)=>{
    try{
        var id=req.params.id;
        const test:Test={
            name: req.body['name'],
            category: req.body['category'],
            instructions: req.body['instructions'],
        }
        await firebaseHelper.firestore.updateDocument(db,collection,id,test);
        res.status(200).send(`Test with id ${id} was updated`);
    }
    catch(err){
        res.status(400).send(`An error has ocurred ${err}`);
    }
});

routes.delete('/test/:id',async(req,res)=>{
    try{
        let id=req.params.id;
        await firebaseHelper.firestore.deleteDocument(db,collection,id);
        res.status(200).send(`Test document with id ${id} was deleted`);
    }
    catch(err){
        res.status(400).send(`An error has ocurred ${err}`)
    }
});


routes.get('/test',(req,res)=>{
    firebaseHelper.firestore.backup(db,collection)
    .then(result=>res.status(200).send(result))
    .catch(err=>res.status(400).send(`An error has ocurred ${err}`));
});


//SUBCOLECCION QUESTION


routes.post('/test/:id/question',async(req,res)=>{
    try{
        const newQuestion:Question={
            question: req.body['question'],
            answers: req.body['answers'],
        };
        let data=subdb.doc(req.params.id);
        const QuestionAdded=await firebaseHelper.firestore.createNewDocument(data,subcollection,newQuestion);
        res.status(201).send(`Test was added to collection with id ${QuestionAdded.id}`);
    }
    catch(err){
        res.status(400).send(`An error has ocurred ${err}`);
    }
});

routes.get('/test/:id/question/:id2',(req,res)=>{
    let data=subdb.doc(req.params.id);

    firebaseHelper.firestore.getDocument(data,subcollection,req.params.id2)
    .then(doc=>res.status(200).send(doc)).catch(err=>res.status(400)
    .send(`An error has ocurred ${err}`))
});

routes.patch('/test/:id/question/:id2',async(req,res)=>{
    try{
        let data=subdb.doc(req.params.id);
        var id2=req.params.id2;
        const Question:Question={
            question: req.body['question'],
            answers: req.body['answers'],
        };
        await firebaseHelper.firestore.updateDocument(data,subcollection,id2,Question);
        res.status(200).send(`Test with id ${id2} was updated`);
    }
    catch(err){
        res.status(400).send(`An error has ocurred ${err}`);
    }
});

routes.delete('/test/:id/question/:id2',async(req,res)=>{
    try{
        let id=req.params.id;
        let id2=req.params.id2;
        let data=subdb.doc(id);
        await firebaseHelper.firestore.deleteDocument(data,subcollection,id2);
        res.status(200).send(`Test document with id ${id2} was deleted`);
    }
    catch(err){
        res.status(400).send(`An error has ocurred ${err}`)
    }
});


routes.get('/test/:id/question',(req,res)=>{
    let data=subdb.doc(req.params.id);
    firebaseHelper.firestore.backup(data,'question')
    .then(result=>res.status(200).send(result))
    .catch(err=>res.status(400).send(`An error has ocurred ${err}`));
});

export {routes};