import { Injectable, NotFoundException } from '@nestjs/common';
import { Task, TaskStatus } from './task.model';
import {v1 as uuid} from  'uuid';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class TasksService {
    private tasks: Task[] = [];

    getAllTasks(): Task[] {
        return this.tasks;
    }

    getTaskWithFilter(filterDto: GetTasksFilterDto): Task[]{
        const {status, search} = filterDto;

        let tasks = this.getAllTasks();

        if(status){
            tasks = tasks.filter(task => task.status === status);
        }

        if(search){
            tasks = tasks.filter(task => 
                task.title.includes(search) ||
                task.description.includes(search));
        }

        return tasks;
    }

    getTaskById(id: string): Task{
        const found =  this.tasks.find(task => task.id === id);

        if(! found){
            throw new NotFoundException('Task with ID ' +id + ' not found');
        }

        return found;
    }

    deleteTaskById(id: string): void{
        const found = this.getTaskById(id);
        this.tasks = this.tasks.filter(task => task.id !== found.id);
    }

    updateTaskStatus(id: string, status: TaskStatus): Task{
        const task = this.getTaskById(id);
        task.status = status;
        return task;
    }


    constructor(
        @InjectModel('Tasks') private readonly taskModel : Model<Task>){}
    

    //createTask(title: string, description: string) : Task{
    // createTask(createTaskDto: CreateTaskDto) : Task{
    //     const {title, description} = createTaskDto;

    //     const task: Task = {
    //         id: uuid(),
    //         title,
    //         description,
    //         status: TaskStatus.OPEN,
    //     };

    //     this.tasks.push(task);
    //     return task;
    // }

    async dbcreateTask(title: string, description: string){

        const dbtask = new this.taskModel({
            //id: uuid(),
            title: title,
            description: description,
            status: TaskStatus.OPEN,
        });
        
        const result = await dbtask.save();
        //console.log(result);
    }

    async dbgetAllTasks() {
        const result = await this.taskModel.find().exec();
        return result.map((task) => ({id: task.id, title: task.title, description: task.description, status: task.status.valueOf().toString()}));
    }

    async dbgetTaskById(id: string): Promise<Task>{
        let found;

        try{
            found =  await this.taskModel.findById(id);
        }catch(error){
            throw new NotFoundException('Task with ID ' +id + ' not found');
        }

        if(! found){
            throw new NotFoundException('Task with ID ' +id + ' not found');
        }

        return found;
    }

    async dbupdateTaskStatus(id: string, status: TaskStatus){
        const task = await this.dbgetTaskById(id);
        task.status = status;
        task.save();
        return task;
    }

    async dbdeleteTaskById(id: string){
        const result = await this.taskModel.deleteOne({_id: id}).exec();
        
        if(result.deletedCount === 0){
            throw new NotFoundException('Task with ID ' +id + ' not found');
        }
    }

    
}
