/**import * as main from './index';
import * as firebaseHelper from 'firebase-functions-helper';
import * as Router from 'express';

const routes=Router();
const db=main.db.collection("test");
const collection="question";

interface Question {
    question:string,
    answers:string
}  

routes.post('/test/:id',async(req,res)=>{
    try{
        const newQuestion:Question={
            question: req.body['question'],
            answers: req.body['answers'],
        };
        const QuestionAdded=await firebaseHelper.firestore.createNewDocument(db.document("gCAxX44w1zXKXLwXxqUI"),collection,newQuestion);
        res.status(201).send(`Question was added to collection with id ${QuestionAdded.id}`);
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
*/
export {routes};