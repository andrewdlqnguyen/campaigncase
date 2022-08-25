import CampaignProvider from "./store/CampaignProvider";

import Dashboard from "./pages/Dashboard/Dashboard";
import "./App.css";

/**
 * App will be lean and contain only components, wrappers, routes.
 * @returns Dashboard of the Campaign Case wrapped with global state.
 */
const App = () => {
    return (
        <CampaignProvider>
            <Dashboard className="global-styles"/>
        </CampaignProvider>
    );
};

export default App;
