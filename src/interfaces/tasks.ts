enum TaskType {
  CRON = 'cron',
  ONCE_TIME = 'onceTime',
  INTERVAL = 'interval',
}

interface ITask {
  id: string;
  name: string;
  createdAt: number;
  enabled: boolean;
  dateChanged: number;
  type: TaskType;
  callback: <T>() => void | Promise<T>;
}

interface ICronTask extends ITask {
  schedule: string;
  lastRunAt: number;
  totalRunCount: number;
  type: TaskType.CRON;
}

interface IOnceTimeTask extends ITask {
  runAt: number;
  type: TaskType.ONCE_TIME;
}

interface IIntervalTask extends ITask {
  interval: number;
  lastRunAt: number;
  totalRunCount: number;
  type: TaskType.INTERVAL;
}

interface ITaskDatabase {
  addCronTask(task: Omit<ICronTask, 'id'>): Promise<ICronTask | undefined>;

  addOnceTimeTask(task: Omit<IOnceTimeTask, 'id'>): Promise<IOnceTimeTask | undefined>;

  addIntervalTask(task: Omit<IIntervalTask, 'id'>): Promise<IIntervalTask | undefined>;

  getAllCronTasks(): Promise<ICronTask[] | undefined>;

  getAllOnceTimeTasks(): Promise<IOnceTimeTask[] | undefined>;

  getAllIntervalTasks(): Promise<IIntervalTask[] | undefined>;

  getCronTaskById(id: string): Promise<ICronTask | undefined>;

  getOnceTimeTaskById(id: string): Promise<IOnceTimeTask | undefined>;

  getIntervalTaskById(id: string): Promise<IIntervalTask | undefined>;

  updateCronTask(id: string, updates: Partial<ICronTask>): Promise<void>;

  updateOnceTimeTask(id: string, updates: Partial<IOnceTimeTask>): Promise<void>;

  updateIntervalTask(id: string, updates: Partial<IIntervalTask>): Promise<void>;

  deleteCronTask(id: string): Promise<void>;

  deleteOnceTimeTask(id: string): Promise<void>;

  deleteIntervalTask(id: string): Promise<void>;
}

export type { ITask, ITaskDatabase, ICronTask, IIntervalTask, IOnceTimeTask };

export { TaskType };
