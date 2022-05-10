import React from 'react';
import { Provider } from 'react-redux';
import { AppContextProvider } from './AppContext';
import { DiagramPage } from './pages/Diagram';
import { store } from './store';

const App = () => {
    return <AppContextProvider>
        <Provider store={store}>
            <DiagramPage />
        </Provider>
    </AppContextProvider>
}

export default App;