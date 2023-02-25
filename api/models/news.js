'use strict';
import mongoose from "mongoose";

const News = new mongoose.Schema({
  title: String,
  created_date: Date,
  message:String,
});

export default mongoose.model('News', News);