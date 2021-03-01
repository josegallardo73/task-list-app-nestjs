import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task } from './task.model';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';

@Controller('tasks')
export class TasksController {

    constructor(private TasksService: TasksService) {

    }

    @Get()
    getTasks(@Query(ValidationPipe) filterDto: GetTasksFilterDto) :Task[] {
        if(Object.keys(filterDto).length) {
            return this.TasksService.getTasksWithFilters(filterDto);
        } else {
            return this.TasksService.getAllTasks();
        }
        
    }

    @Get('/:id')
    getTaskById(@Param('id') id: string) :any {
        return this.TasksService.getTaskById(id);
    }

    @Post()
    @UsePipes(ValidationPipe)
    createTask(@Body() data: CreateTaskDto) :Task {
        return this.TasksService.createTask(data);
    }

    @Patch('/:id/status')
    updateTaskStatusById(
        @Param('id') id: string,
        @Body('status') status: any) :any {
        return this.TasksService.updateTaskStatusById(id, status)
    }

    @Delete('/:id')
    deleteTaskById(@Param('id') id: string) :any {
        return this.TasksService.deleteTaskById(id);
    }

}
