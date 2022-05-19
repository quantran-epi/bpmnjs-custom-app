import template from '@config/properties.json';
import { ElementType } from '@constants';
import { IPropertyGroup } from '@models/PropertyGroup';
import { useState, useEffect } from 'react';

interface IUsePropertyGroup {
    groups: IPropertyGroup[];
    getGroupByIndex: (index: number) => IPropertyGroup;
}

interface IUsePropertyGroupProps {
    elementType: ElementType;
}

export const usePropertyGroup = (props: IUsePropertyGroupProps): IUsePropertyGroup => {
    const [_groups, _setGroups] = useState<IPropertyGroup[]>([]);

    useEffect(() => {
        _setGroups(_getGroupInfo());
    }, [])

    const _getGroupInfo = () => {
        return Object.keys(template[props.elementType].groups).map(key => {
            return template[props.elementType].groups[key] as IPropertyGroup;
        })
    }

    const _getGroupByIndex = (index: number): IPropertyGroup => {
        return _groups[index];
    }

    return {
        groups: _getGroupInfo(),
        getGroupByIndex: _getGroupByIndex
    }
}