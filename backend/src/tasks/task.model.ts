import * as mongoose from 'mongoose';

export interface Task extends mongoose.Document{
    id: String;
    title: string;
    description: string;
    status: TaskStatus;
}

export enum TaskStatus{
    OPEN = "OPEN",
    IN_PROGRESS = "IN_PROGRESS",
    DONE = "DONE",
}

export const TasksSchema = new mongoose.Schema({
    //id: {type: String, required: true},
    title: {type: String, required: true},
    description: {type: String, required: true},
    status: {type: Object.values(TaskStatus), required: true},
});