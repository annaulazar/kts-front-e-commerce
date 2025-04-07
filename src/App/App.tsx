import React from "react";
import { Outlet } from 'react-router';
import style from './App.module.scss';
import {useQueryParamsStoreInit} from "store/RootStore/hooks/useQueryParamsStoreInit";

function App(): React.ReactNode {
    useQueryParamsStoreInit();
    return (
        <div className={style.app}>
            <Outlet />
        </div>
    );
}

export default App;
