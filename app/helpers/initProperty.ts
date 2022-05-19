import elementTemplate from '@config/properties.json';
import { PropertyType } from '@constants';
import { IProperty } from '@models/Property';

const getProperty = (elementId: string, key: string, type: PropertyType, group: string): IProperty => {
    return {
        id: elementId.concat("_").concat(key),
        key: key,
        valueType: type,
        value: "",
        dynamic: false,
        group: group
    }
}

export const initProperties = (elementId: string, elementType: string) => {
    if (!elementTemplate[elementType]) return [];
    return Object.keys(elementTemplate[elementType].properties).map(key => {
        return getProperty(elementId,
            key,
            elementTemplate[elementType].properties[key].type,
            elementTemplate[elementType].properties[key].group);
    })
}