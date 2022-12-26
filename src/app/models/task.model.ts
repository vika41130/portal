import { StatusEnum } from "../enums/status.enum";
import { User } from "./model.user";

export class TaskModel {
    key!: string;
    id!: string;
    summary!: string;
    description!: string;
    status!: StatusEnum;
    assignee!: User;
    created!: Date;
    updated!: Date;
    isRemoved!: boolean;
}
