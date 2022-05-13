import { IProperty } from "@models/Property";
import { RefObject, useEffect, useRef, useState } from "react";

interface IUseHandleProperty<T = any> {
    valueDirty: boolean;
    keyDirty: boolean;
    valueDirtyRef: RefObject<boolean>;
    keyDirtyRef: RefObject<boolean>;
    data: IProperty<T>;
    setKey: (value: string) => void;
    setValue: (value: T) => void;
    save: () => void;
    remove: () => void;
    saveByRef: () => void;
    removeByRef: () => void;
}

interface IUseHandlePropertyProps<T = any> {
    data: IProperty<T>;
    onRemove: (id: string) => void;
    onSave: (data: IProperty<T>) => void;
}

export const useHandleProperty = <T = any>(props: IUseHandlePropertyProps<T>): IUseHandleProperty<T> => {
    const [_data, _setData] = useState<IProperty<T>>(props.data);
    const [_valueDirty, _setValueDirty] = useState<boolean>(false);
    const [_keyDirty, _setKeyDirty] = useState<boolean>(false);

    const _dataRef = useRef<IProperty>(props.data);
    const _valueDirtyRef = useRef<boolean>(false);
    const _keyDirtyRef = useRef<boolean>(false);

    useEffect(() => {
        _dataRef.current = _data;
    }, [_data])

    useEffect(() => {
        _valueDirtyRef.current = _valueDirty;
    }, [_valueDirty])

    useEffect(() => {
        _keyDirtyRef.current = _keyDirty;
    }, [_keyDirty])

    useEffect(() => {
        _setData(props.data);
    }, [props.data])

    const _setKey = (value: string) => {
        _setKeyDirty(true);
        let newData: IProperty = {
            ..._data,
            key: value
        };
        _setData(newData);
        props.onSave(newData);
    }

    const _setValue = (value: T) => {
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
        _setKeyDirty(false);
        _setValueDirty(false);
        props.onSave(_data);
    }

    const _removeByRef = () => {
        if (confirm('Are you sure to remove this property?'))
            props.onRemove(_dataRef.current.id);
    }

    const _saveByRef = () => {
        _setKeyDirty(false);
        _setValueDirty(false);
        props.onSave(_dataRef.current);
    }

    return {
        setValue: _setValue,
        setKey: _setKey,
        data: _data,
        valueDirty: _valueDirty,
        keyDirty: _keyDirty,
        valueDirtyRef: _valueDirtyRef,
        keyDirtyRef: _keyDirtyRef,
        remove: _remove,
        save: _save,
        removeByRef: _removeByRef,
        saveByRef: _saveByRef
    }
}