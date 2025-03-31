import { RouteObject,  Navigate } from "react-router";
import App from "../App";
import React from "react";
import Products from "../App/Pages/Products";
import Product from "../App/Pages/Product";

const routesConfig: RouteObject[] = [
    {
        path: '/',
        element: <App />,
        children: [
            {
                path: '/products',
                element: <Products />
            },
            {
                path: '/products/:id',
                element: <Product />
            }
        ]
    },
    {
        path: "*",
        element: <Navigate to="/" replace />,
    },
];

export default routesConfig;