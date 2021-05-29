import { Injectable } from '@nestjs/common';

@Injectable()
export class TasksService {
  private tasks = ['aaa'];

  getAllTasks() {
    return this.tasks;
  }
}
