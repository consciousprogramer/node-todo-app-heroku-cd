const express = require('express');
const path = require('path');
const basePath = require('../utils/path')
// const nunjucks = require('nunjucks');

const router = express.Router()

const Task = require('../models/task')

router.get('/',(req,res,next) => {
    let error = false;
    let errorMsg = null;
    if(req.forIndex){
        if(req.forIndex.post_new_task.includes('invalid')){
            error = true;
            errorMsg = 'Task title cannot be empty!'
            console.log('has error');
        }
    }
    Task.find({}).then(result => {
        res.render('nunjucks/index.njk', {
            tasks:result,
            error:error,
            errorMsg:errorMsg,
            empty: result.length === 0
        })
    }).catch(err => console.log(error))
})

router.post('/new-task',(req,res) => {
    const newTask = new Task({
        title:req.body.title,
    })
    if(req.body.title.length !== 0){
        newTask.save().then(result => {
            console.log('added new task!',result);
            res.redirect('/')
        }).catch(err => {
            throw err
        })
        
    }else{
        req.forIndex = {
            ...req.forIndex,
            post_new_task:['invalid']
        }
        res.redirect('/')
    }
})

router.get('/edit-task/:taskId', (req,res) => {
    const id =  req.params.taskId;
    Task.findById(id).then(result => {
        res.render('nunjucks/components/edit-task.njk',{
            task:result
        })
    })
})
router.post('/edit-task/:taskId', (req,res) => {
    const id =  req.params.taskId;
    Task.findByIdAndUpdate(id,{title:req.body.title},{new:true},function(err,result){
        if(err){
            throw err
        }else{
            console.log(result);
            res.redirect('/')
        }
    })
})

router.get('/delete-task/:taskId', (req,res) => {
    const id =  req.params.taskId;
    Task.deleteOne({_id:id}, function(err, result) {
        if(err){
            throw err
        }else{
            console.log(result);
            res.redirect('/')
        }
    })
})

//  path.join(basePath,'view','nunjucks','index.njk')
module.exports = router;