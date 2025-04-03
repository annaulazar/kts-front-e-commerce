import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router";
import routesConfig from "config/routes";
import 'styles/style.scss';

const router = createBrowserRouter(routesConfig);

const root = ReactDOM.createRoot(
    document.getElementById("root") as HTMLDivElement
);

root.render(<RouterProvider router={router} />);
