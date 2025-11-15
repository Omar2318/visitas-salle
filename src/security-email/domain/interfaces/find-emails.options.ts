import { PaginationInput } from "src/common/inputs";

export interface FindEmailsOptions extends PaginationInput{
    search?: string;
}