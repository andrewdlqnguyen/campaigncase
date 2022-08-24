import { useContext, useState } from "react";
import Accordion from "react-bootstrap/Accordion";
import { Fetch } from "../../helper/helper";
import campaignContext from "../../store/campaign-context";

const CampaignList = () => {
    const [content, setContent] = useState();
    const { selectedCampaigns } = useContext(campaignContext);

    console.log(selectedCampaigns);

    const populateContentHandler = (id) => {
        Fetch("http://localhost:4000/campaigns/" + id + "?number=0", (data) => {
            setContent(data);
        });
        console.log("FETCH");
    };

    let campaignMetrics = selectedCampaigns.map((campaign, index) => (
        <Accordion.Item eventKey={index}>
            <Accordion.Header
                onClick={() => populateContentHandler(campaign.id)}
            >
                {campaign.name} - {campaign.id}
            </Accordion.Header>
            <Accordion.Body>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                in reprehenderit in voluptate velit esse cillum dolore eu fugiat
                nulla pariatur. Excepteur sint occaecat cupidatat non proident,
                sunt in culpa qui officia deserunt mollit anim id est laborum.

                    {content && <div>Impressions - {content.impressions} Clicks - {content.clicks} Users - {content.users}</div>}
            </Accordion.Body>
        </Accordion.Item>
    ));

    console.log(campaignMetrics);
    return (
        <>
            <div>CampaignList Component</div>
            <Accordion defaultActiveKey={["0"]} alwaysOpen>
                {campaignMetrics}
            </Accordion>
        </>
    );
};

export default CampaignList;
