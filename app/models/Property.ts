import { PropertyType } from './../constants/PropertyType';

export type IProperty<T = any> = {
    id: string;
    valueType: PropertyType;
    key: string;
    value: T;
    dynamic: boolean;
    group: string;
}