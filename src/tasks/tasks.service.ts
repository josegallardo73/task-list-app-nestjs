import { Injectable, NotFoundException } from '@nestjs/common';
import { Task, TaskStatus } from './task.model';
import { CreateTaskDto } from './dto/create-task.dto';
import { v4 as uuid4 } from 'uuid';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';

@Injectable()
export class TasksService {

    private tasks: any[] = [];

    getAllTasks() {
        return this.tasks;
    }

    getTasksWithFilters(filterDto: GetTasksFilterDto): Task[] {
        const {status, search} = filterDto;
        let tasks = this.getAllTasks()

        if(status) {
            tasks = tasks.filter(task => task.status === status);
        }
        if(search) {
            tasks = tasks.filter(task => task.title.includes(search) || 
            task.description.includes(search));
        }
        return tasks;
    }

    getTaskById(id: string) {
        const found = this.tasks.find(task => task.id === id);
        if(!found) {
            throw new NotFoundException(`Task "${id}" not found`);
        }
        return found;
    }

    createTask(data: CreateTaskDto): Task {
        const {title, description} = data;
        const task: Task = {
            id: uuid4(),
            title,
            description,
            status: TaskStatus.OPEN
        }
        this.tasks.push(task);
        return task;
    }

    updateTaskStatusById(id: string, status: string) {
        const found = this.getTaskById(id);
        found.status = status;
    }

    deleteTaskById(id: string) {
        const found = this.getTaskById(id);
        this.tasks = this.tasks.filter(task => task.id === found.id);
    }
}
