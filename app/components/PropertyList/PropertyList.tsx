import { CodeEditorProperty } from '@components/DynamicCreateProperties/PropertyTemplate/CodeEditorProperty';
import { MultilineTextProperty } from '@components/DynamicCreateProperties/PropertyTemplate/MultilineTextProperty';
import { TextProperty } from '@components/DynamicCreateProperties/PropertyTemplate/TextProperty';
import { VideoProperty } from '@components/DynamicCreateProperties/PropertyTemplate/VideoProperty';
import { PropertyType } from '@constants';
import { IProperty } from '@models/Property';
import { Stack } from '@mui/material';
import React, { FunctionComponent } from 'react';

interface IPropertyListProps {
    properties: IProperty[];
    onSave: (data: IProperty) => void;
    onRemove: (id: string) => void;
}

export const PropertyList: FunctionComponent<IPropertyListProps> = ({
    properties,
    onSave,
    onRemove
}) => {

    const _renderProperty = (prop: IProperty): React.ReactNode => {
        switch (prop.valueType) {
            case PropertyType.Text: return <TextProperty allowDelete={prop.dynamic} key={prop.id} data={prop} onSave={onSave} onRemove={onRemove} />
            case PropertyType.MultilineText: return <MultilineTextProperty allowDelete={prop.dynamic} key={prop.id} data={prop} onSave={onSave} onRemove={onRemove} />
            case PropertyType.CodeEditor: return <CodeEditorProperty allowDelete={prop.dynamic} key={prop.id} data={prop} onSave={onSave} onRemove={onRemove} />
            case PropertyType.Video: return <VideoProperty allowDelete={prop.dynamic} key={prop.id} data={prop} onSave={onSave} onRemove={onRemove} />
            case PropertyType.Number: return <TextProperty type="number" allowDelete={prop.dynamic} key={prop.id} data={prop} onSave={onSave} onRemove={onRemove} />
            default: return;
        }
    }

    return (
        <Stack className="app-property-list">
            {properties.map(_renderProperty)}
        </Stack>
    )
}