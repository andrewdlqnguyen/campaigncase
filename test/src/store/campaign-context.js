import React from 'react';

const campaignContext = React.createContext({
  selectedCampaigns: [],
  updateSelectedCampaigns: () => { },
  userPreferences: {
    ctrUnit: "%",
  }
});

export default campaignContext;