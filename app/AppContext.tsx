import React, { FunctionComponent, useRef, useState } from 'react';

interface IAppContext {
    modeler: any;
    setModeler: (modeler: any) => void;
}

interface IAppContextProviderProps {
    children: React.ReactNode;
}

const defaultContextData: IAppContext = {
    modeler: () => null,
    setModeler: () => { }
}

export const AppContext = React.createContext<IAppContext>(defaultContextData);

export const AppContextProvider: FunctionComponent<IAppContextProviderProps> = ({
    children
}) => {
    const _setModeler = (modeler: any) => {
        _setAppContextData({
            ..._appContextData,
            modeler: modeler
        })
    }

    const [_appContextData, _setAppContextData] = useState<IAppContext>({
        modeler: null,
        setModeler: _setModeler
    });

    return <AppContext.Provider value={_appContextData}>
        {children}
    </AppContext.Provider>
}