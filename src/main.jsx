import React from "react";
import ReactDOM from "react-dom/client";
import {createBrowserRouter, RouterProvider,} from "react-router-dom";
import "./index.css";
import Root, {action as rootAction, loader as rootLoader,} from "./routes/root";
import ErrorPage from "./error-page.jsx";
import Contact, {action as contactAction, loader as contactLoader} from "./routes/contacts/contact.jsx";
import EditContact, {action as editAction,} from "./routes/contacts/edit.jsx";

import {action as destroyAction} from "./routes/contacts/destroy";
import Index from "./routes/index.jsx";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Root/>,
        errorElement: <ErrorPage/>,
        loader: rootLoader,
        action: rootAction,
        children: [
            {
                errorElement: <ErrorPage/>,
                children: [
                    {
                        index: true,
                        element: <Index/>
                    },
                    {
                        path: "contacts/:contactId",
                        element: <Contact/>,
                        loader: contactLoader,
                        action: contactAction,
                    },
                    {
                        path: "contacts/:contactId/edit",
                        element: <EditContact/>,
                        loader: contactLoader,
                        action: editAction,
                    },
                    {
                        path: "contacts/:contactId/destroy",
                        action: destroyAction,
                        errorElement: <div>Oops! There was an error.</div>,
                    }
                ]
            }
        ]
    }
]);

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <RouterProvider router={router}/>
    </React.StrictMode>
);