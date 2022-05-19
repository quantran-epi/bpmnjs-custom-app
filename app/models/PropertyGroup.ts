import { PropertyType } from "@constants";

export interface IPropertyGroupCreation {
    enabled: boolean;
    allowTypes: PropertyType[];
}

export interface IPropertyGroup {
    key: string;
    title: string;
    creation?: IPropertyGroupCreation;
}