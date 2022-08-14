import { Repository } from 'typeorm';
import { Task } from 'tasks/task.entity';

@EntityRepository(Task)
export class TasksRepository extends Repository<Task> {}
