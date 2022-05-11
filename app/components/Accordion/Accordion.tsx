import React from 'react';
import { styled } from '@mui/material/styles';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import MuiAccordion, { AccordionProps } from '@mui/material/Accordion';
import MuiAccordionSummary, {
    AccordionSummaryProps,
} from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import { Divider, Stack } from '@mui/material';

interface ICustomAccordionSummaryProps extends AccordionSummaryProps {
    expandButton?: React.ReactNode;
    expandPosition?: "left" | "right";
    toolbar?: React.ReactNode;
}

interface ICustomAccordionProps extends AccordionProps {
    bottomSeparator?: boolean;
}

export const Accordion = styled((props: ICustomAccordionProps) => (
    <div>
        <MuiAccordion disableGutters elevation={0} square {...props} />
        {props.bottomSeparator && <Divider />}
    </div>
))(({ theme }) => ({
    '&:not(:last-child)': {
        borderBottom: 0,
    },
    '&:before': {
        display: 'none',
    },
}));

export const AccordionSummary = styled(({
    expandPosition = "right",
    ...props
}: ICustomAccordionSummaryProps) => (
    <Stack direction={"row"}>
        {expandPosition === "left" && props.expandButton}
        <MuiAccordionSummary
            style={{ flex: 1, ...props.style }}
            {...props}
        />
        {props.toolbar}
        {expandPosition === "right" && props.expandButton}
    </Stack>
))(({ theme }) => ({
    minHeight: 25,
    paddingLeft: 5,
    paddingRight: 5,
    flexDirection: 'row-reverse',
    '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
        transform: 'rotate(90deg)',
    },
    '& .MuiAccordionSummary-content': {
        marginLeft: theme.spacing(1),
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),
    },
}));

export const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
    paddingTop: 0,
    paddingBottom: theme.spacing(1),
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
}));
