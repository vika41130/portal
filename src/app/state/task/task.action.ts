import { createAction, props } from "@ngrx/store";
import { TaskModel } from "src/app/models/task.model";

export const addTask = createAction(
    '[Task] Add Task',
    props<{task: TaskModel}>(),
);
export const updateTask = createAction(
    '[Task] Update Task',
    props<{task: TaskModel}>()
);
export const selectTask = createAction(
    '[Task] Select Task',
    props<{task: TaskModel}>()
);
export const resetTask = createAction(
    '[Task] Reset Task'
);
