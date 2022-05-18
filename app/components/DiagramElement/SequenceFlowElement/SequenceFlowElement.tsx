import { BasicProperties } from '@components/BasicProperties';
import { DynamicCreateProperties } from '@components/DynamicCreateProperties';
import { PropertyList } from '@components/PropertyList';
import { PropertyType } from '@constants';
import { useAccordion } from '@hooks/useAccordion';
import { useProperties } from '@hooks/useProperties';
import { INode } from '@models/Node';
import React, { FunctionComponent, useMemo } from 'react';

interface ISequenceFlowPropertiesProps {
    data: INode;
}

export const SequenceFlowProperties: FunctionComponent<ISequenceFlowPropertiesProps> = ({
    data
}) => {
    const { properties: _properties, saveProperty: _saveProperty, updateProperty: _updateProperty, removeProperty: _removeProperty } = useProperties({ node: data });
    const { handleExpandedChange, isExpanded } = useAccordion({
        keys: ['basic', 'dynamic'],
        activeKeys: ['basic']
    })
    const _filterProperties = useMemo(() => {
        return _properties.filter(prop => !prop.dynamic)
    }, [_properties])

    return (
        <React.Fragment>
            {/* {_filterProperties.length > 0 && <BasicProperties
                node={data}
                expanded={isExpanded("basic")}
                onExpanedChange={handleExpandedChange("basic")}>
                <PropertyList properties={_filterProperties} onSave={_updateProperty} onRemove={_removeProperty} />
            </BasicProperties>}
            <DynamicCreateProperties
                allowCreateTypes={[PropertyType.MultilineText, PropertyType.Text, PropertyType.CodeEditor]}
                title="Dynamic Properties"
                node={data}
                expanded={isExpanded("dynamic")}
                onExpanedChange={handleExpandedChange("dynamic")}
            /> */}
        </React.Fragment>
    )
}