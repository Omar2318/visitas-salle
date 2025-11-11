import { PaginationInput } from "src/common/inputs";

export interface FindAdminsInput extends PaginationInput{
    search?: string;
}