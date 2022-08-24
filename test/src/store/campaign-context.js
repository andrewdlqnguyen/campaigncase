import React from 'react';

const campaignContext = React.createContext({
  selectedCampaigns: [],
  updateSelectedCampaigns: () => { },
});

export default campaignContext;