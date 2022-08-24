import { useState } from 'react';
import { SaveToLocalStorage } from '../helper/helper';
import CampaignContext from './campaign-context';

const CampaignProvider = props => {
  const [selectedCampaign, setSelectedCampaign] = useState([]); //global state for itemPool to see it deselect


  const updateSelectedCampaign = (value) => {
    SaveToLocalStorage("selectedCampaign", value);
    setSelectedCampaign(value);
  }

  const campaignContext = {
    selectedCampaign: selectedCampaign,
    updateSelectedCampaign: updateSelectedCampaign,
  };

  return (
    <CampaignContext.Provider value={campaignContext}>
      {props.children}
    </CampaignContext.Provider>
  )
}

export default CampaignProvider;