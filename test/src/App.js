import Dashboard from "./pages/Dashboard/Dashboard";
import CampaignProvider from "./store/CampaignProvider";

/**
 * App will be lean and contain only components, wrappers, routes.
 * @returns Dashboard of the Campaign Case
 */
const App = () => {
  return (
    <CampaignProvider>
      <Dashboard />
    </CampaignProvider>
  );
}

export default App;


