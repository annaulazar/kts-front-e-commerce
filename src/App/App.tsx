import { Outlet } from 'react-router';
import React from "react";

import './App.scss';

function App(): React.ReactNode {
    return (
        <div className="app">
            <Outlet />
        </div>
    );
}

export default App;
