import { UpdateTaskStatusDto } from './dto/update-task-status.dto';
import { Injectable } from '@nestjs/common';
import { Task, TaskStatus } from './tasks.model';
import { v4 } from 'uuid';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';

@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  getAllTasks(): Task[] {
    return this.tasks;
  }

  getTaskWithFilters(filterDto: GetTasksFilterDto): Task[] {
    const { status, search } = filterDto;
    let tasks = this.getAllTasks();

    if (status) {
      tasks = tasks.filter((task) => task.status === status);
    }

    if (search) {
      tasks = tasks.filter((task) => task.title.toLowerCase().includes(search));
    }
    return tasks;
  }

  getTaskById(id: string): Task {
    return this.tasks.find((task) => id === task.id);
  }

  deleteTaskById(id: string): void {
    this.tasks = this.tasks.filter((task) => id !== task.id);
  }

  createTask(createTaskDto: CreateTaskDto): Task {
    const { title, description } = createTaskDto;
    const task: Task = {
      id: String(this.tasks.length),
      title,
      description,
      status: TaskStatus.OPEN,
    };
    this.tasks.push(task);
    return task;
  }

  updateTaskStatus(id: string, status: TaskStatus): Task {
    const task = this.getTaskById(id);
    if (task) {
      task.status = status;
    }
    return task;
  }
}
