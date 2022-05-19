import template from '@config/properties.json';
import { ElementType } from '@constants';
import { IPropertyGroup } from '@models/PropertyGroup';

interface IUsePropertyGroup {
    groups: IPropertyGroup[];
}

interface IUsePropertyGroupProps {
    elementType: ElementType;
}

export const usePropertyGroup = (props: IUsePropertyGroupProps): IUsePropertyGroup => {

    const _getGroupInfo = () => {
        return Object.keys(template[props.elementType].groups).map(key => {
            return template[props.elementType].groups[key] as IPropertyGroup;
        })
    }

    return {
        groups: _getGroupInfo()
    }
}