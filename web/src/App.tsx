import {
    Admin,
    Resource,
    ListGuesser,
    EditGuesser,
    ShowGuesser,
} from "react-admin";
import { Layout } from "./Layout";
import { authProvider } from "./authProvider";

export const App = () => (
    <Admin layout={Layout} authProvider={authProvider}>
        <Resource
            name="User"
            list={ListGuesser}
            edit={EditGuesser}
            show={ShowGuesser}
        />
        <Resource
            name="Customer"
            list={ListGuesser}
            edit={EditGuesser}
            show={ShowGuesser}
        />
        <Resource
            name="Employee"
            list={ListGuesser}
            edit={EditGuesser}
            show={ShowGuesser}
        />
        <Resource
            name="JobRole"
            list={ListGuesser}
            edit={EditGuesser}
            show={ShowGuesser}
        />
    </Admin>
);
