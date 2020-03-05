import "../global-config";

import { configure, addDecorator } from '@storybook/react';
import React from "react";

 
import { Provider } from 'react-redux'
import { createStore } from 'redux';


import Router from 'next/router';
Router.router = { push: () => {}, prefetch: () => {} };

const store = createStore(x => x, {
    app: { }
});

const Decorator = storyFn => (
    <Provider store={store}>

      
            <div>
                <GridDebugger />
                {storyFn()}
            </div>
        
    </Provider>
);

addDecorator(Decorator);

// configure(require.context('../components-new', true, /\.stories\.js$/), module);
configure(require.context('../components', true, /\.stories\.js$/), module);
