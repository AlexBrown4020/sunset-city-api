'use strict';
import express from 'express';
import { News } from "../models/News.js";

const router = express.Router();

router.post('/', async (req, res, next) => {
    const newArticle = new News({
        title: req.body.title,
        created_date: Date.now(),
        message: req.body.message
    });
    try {
        const news = await newArticle.save();
        res.status(200).json(news);
    } catch(err) {
        next(err);
    }
});

router.put('/:id', async (req, res, next) => {
    try {
        const updatedNews = await News.findByIdAndUpdate(req.params.id, {$set: req.body}, {new: true});
        res.status(200).json(updatedNews);
    } catch(err) {
        next(err);
    }
});

router.delete('/:id', async (req, res, next) => {
    try {
        await News.findByIdAndDelete(req.params.id);
        res.status(200).json('Article Deleted');
    } catch(err) {
        next(arr);
    }
});

router.get('/:id', async (req, res, next) => {
    try {
        const foundNews = await News.findById(req.params.id);
        res.status(200).json(foundNews);
    } catch(err) {
        next(err);
    }
});

router.get('/', async (req, res, next) => {
    try {
        const news = await News.find();
        res.status(200).json(news);
    } catch(err) {
        next(err);
    }
});

export default router;