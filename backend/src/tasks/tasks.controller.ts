import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task, TaskStatus } from './task.model';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { TaskStatusValidationPipe } from './pipes/task-status-validation.pipe';

@Controller('tasks')
export class TasksController {
    constructor(private tasksService: TasksService){}

    // @Get()
    // getTasks(@Query(ValidationPipe) filterDto: GetTasksFilterDto): Task[] {
    //     if(Object.keys(filterDto).length){
    //         return this.tasksService.getTaskWithFilter(filterDto);
    //     }else{
    //         return this.tasksService.getAllTasks();
    //     }
    // }

    @Get()  //get from database
    async getTasks(@Query(ValidationPipe) filterDto: GetTasksFilterDto){
        if(Object.keys(filterDto).length){
            return this.tasksService.getTaskWithFilter(filterDto);
        }else{
            const task = await this.tasksService.dbgetAllTasks();
            return task;
        }
    }

    // @Get('/:id')
    // getTaskById(@Param('id') id: string): Task{
    //     return this.tasksService.getTaskById(id);
    // }

    @Get('/:id')  //get from database
    async getTaskById(@Param('id') id: string){
        const task = await this.tasksService.dbgetTaskById(id)
        return task;
    }

    // @Delete('/:id')
    // deleteTaskById(@Param('id') id: string): void{
    //    this.tasksService.deleteTaskById(id);
    // }

    // @Patch('/:id/status')
    // updateTaskStatus(
    //     @Param('id') id:string,
    //     @Body('status', TaskStatusValidationPipe) status: TaskStatus,
    // ): Task{
    //     return this.tasksService.updateTaskStatus(id, status);
    // }

    // @Post()
    // @UsePipes(ValidationPipe)
    // createTask(
    //     @Body('title') title: string,                 //alternative way to declare body
    //     @Body('description') description: string,
    //     @Body() createTaskDto: CreateTaskDto            //using DTO way
    // ): Task{
    //     return this.tasksService.createTask(createTaskDto);
    // }

    @Patch('/:id/status')
    async updateTaskStatus(   //for database
        @Param('id') id:string,
        @Body('status', TaskStatusValidationPipe) status: TaskStatus,
    ){
        const result = await this.tasksService.dbupdateTaskStatus(id, status)
        return result;
    }

    @Post() //post in database
    @UsePipes(ValidationPipe)
    async createTask(
        @Body('title') title: string,                 //alternative way to declare body
        @Body('description') description: string,
        //@Body() createTaskDto: CreateTaskDto            //using DTO way
    ){
        const result = await this.tasksService.dbcreateTask(title, description);
        return result;
    }

    @Delete('/:id')  //delete in database
    async deleteTaskById(@Param('id') id: string){
       await this.tasksService.dbdeleteTaskById(id);
    }
}
