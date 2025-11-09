import { CreateAreaOptions } from "./create-area.interface";

export type UpdateAreaOptions = Partial<CreateAreaOptions> & {
    id: string;
};