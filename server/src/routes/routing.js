const express = require('express');
const router = express.Router();
const regModel = require('../models/registrationModel');

router.get('/', (req, res, next) => {
    try {
        res.json({
            message: "server is running"
        })
    } catch (err) {
        next(err)
    }
});

router.post('/register', async (req,res,next)=>{
    try {
        let regMem = await regModel.register(req.body);
        if(regMem){
            res.status(200).json({
                message:"Member added successfully"
            })
        }
    } catch (err){
        res.status(500).json({
            message: err.message
        })
    }
});

router.get('/members', async (req,res,next)=> {
    try {
    let members = await regModel.getMembers();
    res.json({
        members
    })
    }
    catch (err) {
        res.status(500).json({
            message: err.message
        })
    }
});

router.put("/updateMember", async (req,res,next) => {
    try {
        let memObj = req.body;
        await regModel.updateMember(memObj);
        res.json({
            message: "Member updated successfully"
        })
    } catch(err) {
        res.status(500).json({
            message: err.message
        })
    }
});

router.delete("/deleteMember/:memId", async (req,res,next) => {
    try {
        let memId = req.params.memId;
        await regModel.deleteMember(memId);
        res.json({
            message: `Member deleted successfully`
        })
    }
    catch (err) {
        res.status(500).json({
            message: err.message
        })
    }
});

module.exports = router;