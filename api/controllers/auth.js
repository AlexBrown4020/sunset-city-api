import Admin from '../models/admin.js';
import bcrypt from 'bcryptjs';
import { createError } from '../utils/error.js';

export const register  = async (req, res, next) => {
    try {
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password, salt);

        const newAdmin = new Admin({
            username: req.body.username,
            password: hash,
            email: req.body.email,
        });
    await newAdmin.save();
    res.status(201).send('User created.');
    } catch(err) {
        next(err);
    }
};

export const login  = async (req, res, next) => {
    try {
        const user = await Admin.findOne({username: req.body.username})
        if(!user) return next(createError(404, 'User not found'));

        const isPasswordCorrect = await bcrypt.compare(req.body.password, user.password);
        if(!isPasswordCorrect) return next(createError(400, 'Wrong password or username'));

        res.status(200).json(user._doc);
    } catch(err) {
        next(err);
    }
};