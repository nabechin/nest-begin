import { Test } from '@nestjs/testing';
import { TasksService } from './tasks.service';
import { TasksRepository } from './tasks.repository';
import { TaskStatus } from './task.status.enum';

const mockTasksRepository = () => ({
  getTasks: jest.fn(),
  findOne: jest.fn(),
});

const mockUser = {
  id: 'abcde',
  username: 'nabechin',
  password: 'somepass',
  tasks: [],
};

describe('TasksService', () => {
  let tasksService: TasksService;
  let tasksRepository;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        TasksService,
        { provide: TasksRepository, useFactory: mockTasksRepository },
      ],
    }).compile();
    tasksService = module.get(TasksService);
    tasksRepository = module.get(TasksRepository);
  });
  describe('Get Tasks', () => {
    it('call TasksRepository.get() and return result', async () => {
      tasksRepository.getTasks.mockResolvedValue('Something');
      const result = await tasksService.getTasks(null, mockUser);
      expect(result).toEqual('Something');
    });
  });

  describe('getTaskById', () => {
    it('calls taskRepository and return some result', async () => {
      const mockTask = {
        title: 'test title',
        description: 'test description',
        id: 'task id',
        status: TaskStatus.OPEN,
      };
      tasksRepository.findOne.mockResolvedValue(mockTask);
      const result = await tasksService.getTaskById('id', mockUser);
      expect(result).toEqual(mockTask);
    });
    it('calls tasksRepository and return exception', async () => {
      tasksRepository.findOne.mockResolvedValue(null);
      expect(tasksService.getTaskById('id', mockUser)).rejects.toThrow();
    });
  });
});
