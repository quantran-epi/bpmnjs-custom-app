import elementTemplate from '@config/properties-template.json';
import { PropertyType } from '@constants';
import { IProperty } from '@models/Property';
import { ELEMENT_TYPES } from './../constants/ElementType';

const getProperty = (elementId: string, key: string, type: PropertyType) => {
    switch (type) {
        case PropertyType.Text: return {
            id: elementId.concat("_").concat(key),
            key: key,
            valueType: PropertyType.Text,
            value: "",
            dynamic: false
        }
        case PropertyType.MultilineText: return {
            id: elementId.concat("_").concat(key),
            key: key,
            valueType: PropertyType.MultilineText,
            value: "",
            dynamic: false
        }
    }
}

export const initProperties = (elementId: string, elementType: string) => {
    const _getWebProperties = (elementId: string): IProperty[] => {
        return Object.keys(elementTemplate.web.properties).map(key => {
            return getProperty(elementId, key, elementTemplate.web.properties[key].type);
        })
    }

    const _getClickProperties = (elementId: string): IProperty[] => {
        return Object.keys(elementTemplate.click.properties).map(key => {
            return getProperty(elementId, key, elementTemplate.click.properties[key].type);
        })
    }

    switch (elementType) {
        case ELEMENT_TYPES.WEB: return _getWebProperties(elementId);
        case ELEMENT_TYPES.CLICK: return _getClickProperties(elementId);
        default: return [];
    }
}