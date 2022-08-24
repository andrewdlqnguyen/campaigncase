import React from 'react';

const campaignContext = React.createContext({
  selectedCampaign: [],
  updateSelectedCampaign: () => { },
});

export default campaignContext;