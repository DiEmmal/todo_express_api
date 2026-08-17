import mongoose from "mongoose";

const todoSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    task: {
        type: String,
        required: true,
    },
    user: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    id: {
        type: String,
        required: true
    },
    completedAt: {
        type: Date,
        default: null
    },
});

export const TodoModel = mongoose.model('Todo', todoSchema);
