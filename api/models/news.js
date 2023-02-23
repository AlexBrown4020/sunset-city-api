'use strict';
import mongoose from "mongoose";

const NewsSchema = new mongoose.Schema({
  title: String,
  created_date: Date,
  message:String,
});

export default mongoose.model('News', NewsSchema);