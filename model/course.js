import mongoose from "mongoose";

const courseSchema = new mongoose.Schema({
  Title: {
    type: String,
    required: [true, "please enter your title"],
    minLength: [4, "Title must be atleast 4 character"],
    maxLength: [80, "Title can't exceed 80 character"],
  },
  description: {
    type: String,
    required: [true, "please enter your description"],
    minLength: [20, "description must be atleast 4 character"],
  },
  lectures: [
    {
      title: {
        type: String,
        required: true,
      },
      description: {
        type: String,
        required: true,
      },
      video: {
        public_id: {
          type: String,
          required: true,
        },
        url: {
          type: String,
          required: true,
        },
      },
    },
  ],

  poster: {
    public_id: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
  },
  views:{
    type:Number,
    default:0,
  },
  numOfVideos:{
    type:Number,
    default:0,
  },
  category:{
    type:String,
    required:true
  },
  createdBy:{
    type:String,
    required:[true,"Enter Course Creator Name"]
  },
  createdAt:{
    type:Date,
    default:Date.now
  },

});

export const Course = mongoose.model("Course", courseSchema);
