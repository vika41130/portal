import { createFeatureSelector, createSelector } from '@ngrx/store';
import { TaskJiroState } from './task.reducer';

export const taskSelector = createFeatureSelector<TaskJiroState>('task');

export const taskCounterSelector = createSelector(
    taskSelector,
    (task) => {
        return task.counter;
    }
);
export const taskSelected = createSelector(
    taskSelector,
    (task) => {
        return task.selectedTask
    }
);
