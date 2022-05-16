import { Accordion, AccordionDetails, AccordionSummary } from '@components/Accordion';
import { IconButton, Stack, Typography } from '@mui/material';
import React, { FunctionComponent } from 'react';
import { INode } from '@models/Node';
import { ExpandLess, ExpandMore } from '@mui/icons-material';

interface IBasicPropertiesProps {
    node: INode,
    expanded: boolean;
    onExpanedChange: (event: React.SyntheticEvent<Element, Event>, expanded: boolean) => void;
    children: React.ReactNode;
}

export const BasicProperties: FunctionComponent<IBasicPropertiesProps> = ({
    node,
    expanded,
    onExpanedChange,
    children
}) => {
    return <Accordion expanded={expanded} onChange={onExpanedChange}>
        <AccordionSummary
            expandButton={<Stack direction="row" spacing={2} alignItems="center">
                {expanded ? <IconButton onClick={(e) => onExpanedChange(e, false)}><ExpandLess /></IconButton> :
                    <IconButton onClick={(e) => onExpanedChange(e, true)}><ExpandMore /></IconButton>}
            </Stack>}
            aria-controls="panel1a-content"
            id="panel1a-header"
        >
            <Typography style={{ fontWeight: expanded ? "bold" : "normal" }}>Basic Properties</Typography>
        </AccordionSummary>
        <AccordionDetails>
            {children}
        </AccordionDetails>
    </Accordion>
}