import React from "react";

interface IUseAccorion {
    isExpanded: (panel: string) => boolean;
    handleExpandedChange: (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => void;
}

interface IUseAccordionProps {
    keys: string[];
    activeKeys: string[];
}

export const useAccordion = ({
    keys,
    activeKeys
}: IUseAccordionProps): IUseAccorion => {
    const [expanded, setExpanded] = React.useState<string[]>(activeKeys);

    const handleChange =
        (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
            let currentExpanded = [...expanded];
            if (isExpanded)
                currentExpanded.push(panel);
            else currentExpanded = currentExpanded.filter(e => e !== panel)
            setExpanded(currentExpanded);
        };


    const isExpanded = (panel: string) => {
        return expanded.includes(panel);
    }

    return {
        isExpanded: isExpanded,
        handleExpandedChange: handleChange
    }
}