import React from "react";

/**
 * campaign context global state and setters.
 */
const campaignContext = React.createContext({
    selectedCampaigns: [],
    updateSelectedCampaigns: () => {},
    userPreferences: {
        ctrUnit: "%",
    },
});

export default campaignContext;
