import React, { FunctionComponent, useEffect, useState } from 'react';
import { Button, Card, Form, FormControl, InputGroup, Modal, Stack } from 'react-bootstrap';
import { IProperty } from '@models/Property';
import { FaPencilAlt, FaTrashAlt } from 'react-icons/fa';
import { TextInput } from '../../../../Form/Input/';

interface ITextPropertyProps {
    data: IProperty;
    onSave?: (data: IProperty) => void;
    onRemove?: (id: string) => void;
    readonly?: boolean;
}

export const TextProperty: FunctionComponent<ITextPropertyProps> = ({
    data,
    onSave,
    onRemove,
    readonly = false
}) => {
    const [_data, _setData] = useState<IProperty>(data);
    const [_editingKey, _setEditingKey] = useState<boolean>(false);
    const [_valueTextBoxDirty, _setValueTextBoxDirty] = useState<boolean>(false);

    useEffect(() => {
        _setData(data);
    }, [data])

    const _onChangeKey = (value: string) => {
        let newData: IProperty = {
            ..._data,
            key: value
        };
        _setData(newData);
        _onSave(newData);
    }

    const _onChangeValue = (value: string) => {
        _setValueTextBoxDirty(true);
        _setData({
            ..._data,
            value: value
        })
    }

    const _onSave = (data: IProperty) => {
        _setValueTextBoxDirty(false);
        onSave(data);
    }

    const _onRemove = () => {
        if (confirm('Are you sure to remove this property?'))
            onRemove(_data.id);
    }

    const _onValueTextBoxBlur = () => {
        if (_valueTextBoxDirty) _onSave(_data);
    }

    const _onValueTextBoxEnter = () => {
        if (_valueTextBoxDirty) _onSave(_data);
    }

    const _showEditKeyModal = () => {
        _setEditingKey(true);
    }

    const _hideEditKeyModal = () => {
        _setEditingKey(false);
    }

    return <React.Fragment>
        <Form.Group className="mb-3 mt-3" controlId="exampleForm.ControlInput1">
            <Stack direction="horizontal" gap={2} style={{ marginBottom: 5 }}>
                <label>{_data.key}</label>
                <div>
                    <FaPencilAlt color="blue" onClick={_showEditKeyModal} />
                </div>
                <div className="ms-auto">
                    <FaTrashAlt color="red" onClick={_onRemove} />
                </div>
            </Stack>
            <TextInput
                type="text"
                placeholder="Enter value"
                aria-label="Enter value"
                value={_data.value}
                onChangeText={_onChangeValue}
                onBlur={_onValueTextBoxBlur}
                onEnter={_onValueTextBoxEnter}
                readOnly={readonly} />
        </Form.Group>
        <TextPropertyEditKeyModal value={_data.key} show={_editingKey} onHide={_hideEditKeyModal} onSave={_onChangeKey} />
    </React.Fragment>
}

interface ITextPropertyEditKeyModalProps {
    value: string;
    show: boolean;
    onHide: () => void;
    onSave: (value: string) => void;
}

const TextPropertyEditKeyModal: FunctionComponent<ITextPropertyEditKeyModalProps> = ({
    value,
    show,
    onHide,
    onSave
}) => {
    const [_value, _setValue] = useState<string>(value);

    const _onChangeKey = (value: string) => {
        _setValue(value);
    }

    const _onSave = () => {
        onSave(_value);
        onHide();
    }

    return <Modal size="sm" show={show} onHide={onHide}>
        {/* <Modal.Header closeButton>
            <Modal.Title>Edit key</Modal.Title>
        </Modal.Header> */}
        <Modal.Body>
            <InputGroup className="mb-3">
                <InputGroup.Text id="basic-addon1">Key</InputGroup.Text>
                <TextInput
                    placeholder="Enter key"
                    aria-label="Enter key"
                    aria-describedby="basic-addon1"
                    value={_value}
                    onChangeText={_onChangeKey}
                    onEnter={_onSave} />
            </InputGroup>
        </Modal.Body>
        <Modal.Footer>
            <Button variant="secondary" onClick={onHide}>
                Cancel
            </Button>
            <Button variant="primary" onClick={_onSave}>
                Save Changes
            </Button>
        </Modal.Footer>
    </Modal>
}