import { Button } from '@mui/material';
import React, { FunctionComponent, useContext, useEffect, useState } from 'react';
import { AppContext } from '../../AppContext';

interface IElementModalProps {
    id: string;
    children: React.ReactNode;
}

export const ElementModal: FunctionComponent<IElementModalProps> = ({
    id,
    children
}) => {
    const _getInitialPosition = () => {
        let registry = modeler.get('elementRegistry');
        let element = registry.get(id);
        return { top: element.y + element.height, left: element.x + element.width };
    }

    const { modeler } = useContext(AppContext);
    const [_visible, _setVisible] = useState<boolean>(false);
    const [_moving, _setMoving] = useState<boolean>(false);
    const [_position, _setPosition] = useState(_getInitialPosition());

    const _toggleMoving = (moving: boolean) => {
        _setMoving(m => moving);
    }

    const _isThisElement = (e: any): boolean => {
        return e.shape.id === id
    }

    const _getThisElement = () => {
        return modeler.get('elementRegistry').get(id);
    }

    useEffect(() => {
        if (!modeler) return;
        let eventBus = modeler.get('eventBus');
        eventBus.on('shape.move.end', function (e) {
            if (!_isThisElement(e)) return;
            let element = _getThisElement();
            _toggleMoving(false);
            _setPosition(position => ({ top: element.y + element.height, left: element.x + element.width }));
            console.log('shape move - end', e, element);
        })
        eventBus.on('shape.move.start', function (e) {
            if (!_isThisElement(e)) return;
            console.log('shape move - start', e);
            _toggleMoving(true);
        })
    }, [modeler])

    const _style = (): React.CSSProperties => {
        return {
            position: "absolute",
            top: _position.top,
            left: _position.left,
        }
    }

    const _modalContentStyle = (): React.CSSProperties => {
        return {
            display: _visible ? "block" : "none"
        }
    }

    return <div style={_style()}>
        {!_moving && <Button>Open</Button>}
        <div style={_modalContentStyle()}>
            {children}
        </div>
    </div>
}