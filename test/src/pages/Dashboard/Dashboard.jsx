import { useState, useEffect } from "react";
import { Fetch } from "../../helper/helper";

const Dashboard = () => {
  const [campaignList, setCampaignList] = useState();

  useEffect(() => {
    Fetch("http://localhost:4000/campaigns", (data) => {
      setCampaignList(data);
    });
  }, []);

  let campaignItems = "";

  if (campaignList !== undefined) {
    campaignItems += campaignList.campaigns.map((campaign) => {
      return <div>{campaign.id}</div>;
    });
  }

  return (
    <>
      <div>SearchBar Component</div>
      {campaignItems}
      {/* {!campaignList ? <></> : <div>{campaignList}</div>} */}
      <div>ItemPool Component</div>
      <div>CampaignList Component</div>
    </>
  );
};

export default Dashboard;
