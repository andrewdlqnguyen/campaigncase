import Dashboard from "./pages/Dashboard/Dashboard";
import CampaignProvider from "./store/CampaignProvider";
import "./App.css";

/**
 * App will be lean and contain only components, wrappers, routes.
 * @returns Dashboard of the Campaign Case
 */
const App = () => {
    return (
        <CampaignProvider>
            <Dashboard className="global-styles"/>
        </CampaignProvider>
    );
};

export default App;
