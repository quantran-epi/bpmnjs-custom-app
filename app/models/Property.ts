import { PropertyType } from './../constants/PropertyType';
export type IProperty = {
    valueType: PropertyType;
    key: string;
    value: any;
}