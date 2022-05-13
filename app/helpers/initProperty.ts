import elementTemplate from '@config/properties-template.json';
import { PropertyType } from '@constants';
import { IProperty } from '@models/Property';
import { ELEMENT_TYPES } from './../constants/ElementType';

export const initProperties = (elementId: string, elementType: string) => {
    const _getWebProperties = (elementId: string): IProperty[] => {
        return Object.keys(elementTemplate.web.properties).map(key => {
            switch (elementTemplate.web.properties[key].type) {
                case PropertyType.Text: return {
                    id: elementId.concat("_").concat(key),
                    key: key,
                    valueType: PropertyType.Text,
                    value: "",
                    dynamic: false
                }
            }
        })
    }

    const _getClickProperties = (elementId: string): IProperty[] => {
        return Object.keys(elementTemplate.click.properties).map(key => {
            switch (elementTemplate.click.properties[key].type) {
                case PropertyType.Text: return {
                    id: elementId.concat("_").concat(key),
                    key: key,
                    valueType: PropertyType.Text,
                    value: "",
                    dynamic: false
                }
            }
        })
    }

    switch (elementType) {
        case ELEMENT_TYPES.WEB: return _getWebProperties(elementId);
        case ELEMENT_TYPES.CLICK: return _getClickProperties(elementId);
        default: return [];
    }
}