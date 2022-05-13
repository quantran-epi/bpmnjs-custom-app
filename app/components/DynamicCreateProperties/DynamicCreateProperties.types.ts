import { IProperty } from "@models/Property";

export interface IBasePropertyTemplateProps<T = any> {
    data: IProperty<T>;
    onSave?: (data: IProperty<T>) => void;
    onRemove?: (id: string) => void;
    readonly?: boolean;
    autoExpand?: boolean;
    allowDelete?: boolean;
}