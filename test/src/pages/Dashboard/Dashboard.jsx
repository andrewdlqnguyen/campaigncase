import { useState, useEffect } from "react";
import CampaignList from "../../components/CampaignList/CampaignList";
import ItemPool from "../../components/ItemPool/ItemPool";
import SearchBar from "../../components/SearchBar/SearchBar";
import { Fetch } from "../../helper/helper";

const Dashboard = () => {
  const [campaignList, setCampaignList] = useState();
  const [selectedCampaign, setSelectedCampaign] = useState();

  useEffect(() => {
    Fetch("http://localhost:4000/campaigns", (data) => {
      setCampaignList(data.campaigns);
    });
  }, []);

  const selectedCampaignHandler = (selectedCampaign) => {

  }

  let campaignItems = "";

  // if (campaignList !== undefined) {
  //   campaignItems = campaignList.campaigns.map((campaign) => 
    
  //     <div>{campaign.name}</div>
  //   );
  // }

  return (
    <>
      {campaignList && <SearchBar campaignList={campaignList}/>}
      {/* {campaignList && <SearchBar campaignList={campaignList} setSelectedCampaign={setSelectedCampaign}/>} */}

      {selectedCampaign && <div>{JSON.stringify(selectedCampaign)}</div>}
      {/* {!campaignList ? <></> : <div>{campaignList}</div>} */}
      {/* <ItemPool selectedCampaignItem={selectedCampaign}/> */}
      {/* <CampaignList /> */}
    </>
  );
};

export default Dashboard;
