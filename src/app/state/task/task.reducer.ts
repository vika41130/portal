import { createReducer, on } from '@ngrx/store';
import { TaskModel } from 'src/app/models/task.model';
import { addTask, resetTask, selectTask, updateTask } from './task.action';


export class TaskJiroState {
    list!: Array<TaskModel>;
    counter!: number;
    selectedTask!: TaskModel;
    constructor(list: Array<TaskModel>, counter: number, selectedTask?: TaskModel) {
        this.list = list;
        this.counter = counter;
        this.selectedTask = selectedTask!;
    }
}

export const initialState = new TaskJiroState([], 0);

export const taskReducer = createReducer(
    initialState,
    on(addTask, (state, { task }) => {
        return new TaskJiroState(
            [...state.list, task],
            state.list.length + 1
        );
    }),
    on(updateTask, (state, { task }) => {
        const filtered = state.list.filter(_task => _task.key != task.key);
        return new TaskJiroState(
            [...filtered, task],
            filtered.length + 1,
            state.selectedTask
        );
    }),
    on(selectTask, (state, { task }) => {
        return new TaskJiroState(
            [...state.list],
            state.list.length,
            task
        );
    }),
    on(resetTask, (state) => {
        return initialState;
    })
);
