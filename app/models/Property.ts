import { PropertyType } from './../constants/PropertyType';
export type IProperty = {
    id: string;
    valueType: PropertyType;
    key: string;
    value: any;
}