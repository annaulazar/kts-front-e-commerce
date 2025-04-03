import React from "react";
import { Outlet } from 'react-router';
import style from './App.module.scss';

function App(): React.ReactNode {
    return (
        <div className="app">
            <Outlet />
        </div>
    );
}

export default App;
