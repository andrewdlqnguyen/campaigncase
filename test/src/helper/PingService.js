import { useState, useRef } from "react";

const usePingService = (campaignID, timer) => {
  const [timeInterval, setTimeInterval] = useState();
  // const [campaignInfo, setCampaignInfo] = useState();
  // const counterRef = useRef(0);
  // const totalImpression = useRef(0);
  // const totalClicks = useRef(0);
  // const totalUsers = useRef(0);
  // const campaignMetrics = useRef(null);


  let counter = 0;

  // console.log("IM IN")
  // setInterval(() => {
  //   Fetch("http://localhost:4000/campaigns/" + campaignID + "?number=" + counterRef.current, (data) => {
  //     // setCampaignInfo(data);
  //     // counterRef.current += 1
  //   });
  // }, timer)

  // campaignMetrics = {
  //   totalImpression: campaignInfo.impressions,
  //   totalClicks: campaignInfo.clicks,
  //   totalUsers: campaignInfo.users
  // }
  return counter;
}

export default usePingService;