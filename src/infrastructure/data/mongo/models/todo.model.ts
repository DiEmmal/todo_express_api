import mongoose from "mongoose";

const todoSchema = new mongoose.Schema({
    task:{
        type: String,
        required: true,
    },
    user: {
        type: String,
        required: true,
    },
    timestamp: {
        type: Date,
        default: Date.now
    },
    id: {
        type: String,
        required: true
    },
});

export const TodoModel = mongoose.model('Todo', todoSchema);
