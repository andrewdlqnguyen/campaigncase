import { useState } from 'react';
import { SaveToLocalStorage } from '../helper/helper';
import CampaignContext from './campaign-context';

const CampaignProvider = props => {
  const [selectedCampaigns, setSelectedCampaigns] = useState([]); //global state for itemPool to see it deselect
  const [userPreferences, setUserPreferences] = useState({
    ctrUnit: "%",
  });

  const updateSelectedCampaigns = (value) => {
    SaveToLocalStorage("selectedCampaign", value);
    setSelectedCampaigns(value);
  }

  const campaignContext = {
    selectedCampaigns: selectedCampaigns,
    userPreference: userPreferences,
    updateSelectedCampaigns: updateSelectedCampaigns,
  };

  return (
    <CampaignContext.Provider value={campaignContext}>
      {props.children}
    </CampaignContext.Provider>
  )
}

export default CampaignProvider;