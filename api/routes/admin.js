'use strict';
import express from 'express';
import { Admin } from '../models/Admin.js';

const router = express.Router();

router.post('/', async (req, res, next) => {
    const newAdmin = new Admin(req.body)

    try {
        const saved = await newAdmin.save();
        res.status(200).json(saved);
    } catch(err) {
        next(err);
    }
});

router.put('/:id', async (req, res, next) => {
    try {
        const updatedAdmin = await Admin.findByIdAndUpdate(req.params.id, {$set: req.body}, {new: true});
        res.status(200).json(updatedAdmin);
    } catch(err) {
        next(err);
    }
});

router.delete('/:id', async (req, res, next) => {
    try {
        await Admin.findByIdAndDelete(req.params.id);
        res.status(200).json('Admin deleted.');
    } catch(err) {
        next(err);
    }
});

router.get('/:id', async (req, res, next) => {
    try {
        const admin = await Admin.findById(req.params.id);
        res.status(200).json(admin);
    } catch(err) {
        next(err);
    }
});

router.get('/', async (req, res, next) => {
    try {
        const admins = await Admin.find();
        res.status(200).json(admins);
    } catch(err) {
        next(err);
    }
});

export default router;