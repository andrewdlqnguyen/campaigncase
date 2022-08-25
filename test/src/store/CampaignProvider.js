import { useState } from "react";
import CampaignContext from "./campaign-context";

import { SaveToLocalStorage } from "../helper/helper";

/**
 * Setting configuration for global store context
 * @param {*} props campaign global provider for states
 * @returns global store wrapper for web application
 */
const CampaignProvider = (props) => {
    const [selectedCampaigns, setSelectedCampaigns] = useState([]); //global state for itemPool to see it deselect
    const [userPreferences, setUserPreferences] = useState({
        ctrUnit: "%",
    });

    const updateSelectedCampaigns = (value) => {
        SaveToLocalStorage("selectedCampaign", value);
        setSelectedCampaigns(value);
    };

    const campaignContext = {
        selectedCampaigns: selectedCampaigns,
        userPreference: userPreferences,
        updateSelectedCampaigns: updateSelectedCampaigns,
    };

    return (
        <CampaignContext.Provider value={campaignContext}>
            {props.children}
        </CampaignContext.Provider>
    );
};

export default CampaignProvider;
