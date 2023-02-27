import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cookieParser from "cookie-parser";
import cors from 'cors';
import newsRoutes from './api/routes/routes.js';
import adminRoutes from './api/routes/admin.js';
import authRoutes from './api/routes/auth.js';

const app = express();
const port = process.env.PORT || 3000;

dotenv.config();
mongoose.set("strictQuery", false);

const connect = async () => {
    try {
        mongoose.connect(process.env.MONGO_URL);
        console.log("Connected to mongoDB")
    } catch (error) {
        throw error;
    }
};

mongoose.connection.on('disconnected', () => {
    console.log('mongoDB disconnected');
});

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());

app.use('/news', newsRoutes);
app.use('/admin', adminRoutes);
app.use('/auth', authRoutes);

app.use((err,req,res,next) => {
    const errorStatus = err.status || 500;
    const errorMessage = err.message || "Something went wrong, no error message found";
    return res.status(errorStatus).json({
        success: false,
        status: errorStatus,
        message: errorMessage,
        stack: err.stack,
    });
})

app.listen(port, () => {
    connect();
    console.log("Connected to backend");
});