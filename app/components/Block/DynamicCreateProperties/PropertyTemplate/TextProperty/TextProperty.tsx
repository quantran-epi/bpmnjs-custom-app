import { Accordion, AccordionDetails, AccordionSummary } from '@components/Accordion';
import { useHandleProperty } from '@hooks/useHandleProperty';
import { IProperty } from '@models/Property';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import { IconButton, Stack, Typography } from '@mui/material';
import React, { FunctionComponent, useState } from 'react';
import { Button, Form, InputGroup, Modal } from 'react-bootstrap';
import { TextInput } from '../../../../Form/Input/';
import DeleteIcon from '@mui/icons-material/Delete';

interface ITextPropertyProps {
    data: IProperty<string>;
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
    const [_editingKey, _setEditingKey] = useState<boolean>(false);
    const { data: _data, valueDirty, keyDirty, setKey, setValue, remove, save } = useHandleProperty({ data, onRemove, onSave });
    const [expanded, setExpanded] = React.useState<string | false>('panel1');
    const handleChange =
        (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
            setExpanded(isExpanded ? panel : false);
        };

    const _onValueTextBoxBlur = () => {
        if (valueDirty) save();
    }

    const _onValueTextBoxEnter = () => {
        if (valueDirty) save();
    }

    const _onKeyTextBoxBlur = () => {
        if (keyDirty) save();
    }

    const _onKeyTextBoxEnter = () => {
        if (keyDirty) save();
    }

    const _showEditKeyModal = () => {
        _setEditingKey(true);
    }

    const _hideEditKeyModal = () => {
        _setEditingKey(false);
    }

    return <React.Fragment>
        <Accordion expanded={expanded === 'panel1'} style={{ marginLeft: -15, marginRight: -15 }}>
            <AccordionSummary
                expandPosition="left"
                expandButton={<Stack direction="row" spacing={2} alignItems="center">
                    {expanded ? <IconButton onClick={(e) => handleChange('panel1')(e, false)}><ExpandLess /></IconButton> :
                        <IconButton onClick={(e) => handleChange('panel1')(e, true)}><ExpandMore /></IconButton>}
                </Stack>}
                toolbar={<Stack direction="row" spacing={2} alignItems="center">
                    <IconButton color="error" onClick={remove}>
                        <DeleteIcon />
                    </IconButton>
                </Stack>} aria-controls="panel1d-content" id="panel1d-header">
                <Typography style={{ marginLeft: -10 }}>{_data.key}</Typography>
            </AccordionSummary>
            <AccordionDetails style={{ borderLeft: "3px solid rgba(0,0,0,0.8)", marginLeft: 15 }}>
                <Form.Group>
                    <Form.Label>Key</Form.Label>
                    <TextInput
                        autoFocus
                        placeholder="Enter key"
                        aria-label="Enter key"
                        aria-describedby="basic-addon1"
                        value={_data.key}
                        onChangeText={setKey}
                        onBlur={_onKeyTextBoxBlur}
                        onEnter={_onKeyTextBoxEnter} />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Value</Form.Label>
                    <TextInput
                        type="text"
                        placeholder="Enter value"
                        aria-label="Enter value"
                        value={_data.value}
                        onChangeText={setValue}
                        onBlur={_onValueTextBoxBlur}
                        onEnter={_onValueTextBoxEnter}
                        readOnly={readonly} />
                </Form.Group>
            </AccordionDetails>
        </Accordion>
        {/* <Form.Group className="mb-3 mt-3" controlId="exampleForm.ControlInput1">
            <Stack direction="horizontal" gap={2} style={{ marginBottom: 5 }}>
                <label>{_data.key}</label>
                <div>
                    <FaPencilAlt title="Edit key" color="blue" onClick={_showEditKeyModal} />
                </div>
                <div className="ms-auto">
                    <FaTrashAlt title="Remove property" color="red" onClick={remove} />
                </div>
            </Stack>
            <TextInput
                type="text"
                placeholder="Enter value"
                aria-label="Enter value"
                value={_data.value}
                onChangeText={setValue}
                onBlur={_onValueTextBoxBlur}
                onEnter={_onValueTextBoxEnter}
                readOnly={readonly} />
        </Form.Group> */}
        <TextPropertyEditKeyModal value={_data.key} show={_editingKey} onHide={_hideEditKeyModal} onSave={setKey} />
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
                    autoFocus
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