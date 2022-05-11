import React from "react";

interface IUseMenu {
    setAnchor: (target: HTMLElement) => void;
    removeAnchor: () => void;
    anchor: HTMLElement;
}

interface IUseMenuProps {

}

export const useMenu = (props?: IUseMenuProps): IUseMenu => {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

    const _setAnchor = (target: HTMLElement) => {
        setAnchorEl(target);
    }

    const _removeAnchor = () => {
        setAnchorEl(null);
    }

    return {
        anchor: anchorEl,
        setAnchor: _setAnchor,
        removeAnchor: _removeAnchor
    }
}