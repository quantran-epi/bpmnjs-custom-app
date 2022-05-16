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
        case PropertyType.Video: return {
            id: elementId.concat("_").concat(key),
            key: key,
            valueType: PropertyType.Video,
            value: "",
            dynamic: false
        }
        case PropertyType.Number: return {
            id: elementId.concat("_").concat(key),
            key: key,
            valueType: PropertyType.Number,
            value: "",
            dynamic: false
        }
        case PropertyType.CodeEditor: return {
            id: elementId.concat("_").concat(key),
            key: key,
            valueType: PropertyType.CodeEditor,
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

    const _getInputProperties = (elementId: string): IProperty[] => {
        return Object.keys(elementTemplate.input.properties).map(key => {
            return getProperty(elementId, key, elementTemplate.input.properties[key].type);
        })
    }

    const _getSleepProperties = (elementId: string): IProperty[] => {
        return Object.keys(elementTemplate.sleep.properties).map(key => {
            return getProperty(elementId, key, elementTemplate.sleep.properties[key].type);
        })
    }

    const _getExtractTextValueProperties = (elementId: string): IProperty[] => {
        return Object.keys(elementTemplate.extractTextValue.properties).map(key => {
            return getProperty(elementId, key, elementTemplate.extractTextValue.properties[key].type);
        })
    }

    switch (elementType) {
        case ELEMENT_TYPES.WEB: return _getWebProperties(elementId);
        case ELEMENT_TYPES.CLICK: return _getClickProperties(elementId);
        case ELEMENT_TYPES.INPUT: return _getInputProperties(elementId);
        case ELEMENT_TYPES.SLEEP: return _getSleepProperties(elementId);
        case ELEMENT_TYPES.EXTRACT_TEXT_VALUE: return _getExtractTextValueProperties(elementId);
        default: return [];
    }
}