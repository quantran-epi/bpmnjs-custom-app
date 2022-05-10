import { IProperty } from "@models/Property";
import { useEffect, useState } from "react";

interface IUseHandleProperty<T = any> {
    valueDirty: boolean;
    data: T;
    setKey: (value: string) => void;
    setValue: (value: T) => void;
    save: () => void;
    remove: () => void;
}

interface IUseHandlePropertyProps<T = any> {
    data: IProperty<T>;
    onRemove: (id: string) => void;
    onSave: (data: IProperty<T>) => void;
}

export const useHandleProperty = (props: IUseHandlePropertyProps): IUseHandleProperty => {
    const [_data, _setData] = useState<IProperty>(props.data);
    const [_valueDirty, _setValueDirty] = useState<boolean>(false);

    useEffect(() => {
        _setData(props.data);
    }, [props.data])

    const _setKey = (value: string) => {
        let newData: IProperty = {
            ..._data,
            key: value
        };
        _setData(newData);
        props.onSave(newData);
    }

    const _setValue = (value: string) => {
        _setValueDirty(true);
        _setData({
            ..._data,
            value: value
        })
    }

    const _remove = () => {
        if (confirm('Are you sure to remove this property?'))
            props.onRemove(_data.id);
    }

    const _save = () => {
        _setValueDirty(false);
        props.onSave(_data);
    }

    return {
        setValue: _setValue,
        setKey: _setKey,
        data: _data,
        valueDirty: _valueDirty,
        remove: _remove,
        save: _save
    }
}