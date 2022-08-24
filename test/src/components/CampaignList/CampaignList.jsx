import { useContext, useEffect, useState } from "react";
import Accordion from "react-bootstrap/Accordion";
import { Fetch } from "../../helper/helper";
import campaignContext from "../../store/campaign-context";

const CampaignList = () => {
    const [content, setContent] = useState();
    const [activeContents, setActiveContents] = useState([]);
    const { selectedCampaigns } = useContext(campaignContext);

    useEffect(() => {
        if (activeContents) {
            const newActiveContents = [...activeContents];
            let idList = []; // new selected id
            for (let i = 0; i < selectedCampaigns.length; i++) {
                idList = [...idList, selectedCampaigns[i].id];
            }
            if (idList.length > newActiveContents.length) {
                console.log(selectedCampaigns[selectedCampaigns.length - 1])
                setActiveContents(
                    (prevState) => [
                        ...prevState,
                        {
                            id: selectedCampaigns[selectedCampaigns.length - 1]
                                .id,
                            name: selectedCampaigns[
                                selectedCampaigns.length - 1
                            ].name,
                            active: false,
                        }
                    ]
                    // selectedCampaigns.map((campaign) => ({
                    //     id: campaign.id,
                    //     name: campaign.name,
                    //     active: false,
                    // }))
                );
            }
            if (idList.length < newActiveContents.length) {
                let activeContentList = [];
                for (let i = 0; i < newActiveContents.length; i++) {
                    activeContentList = [...activeContentList, newActiveContents[i].id];
                }
                console.log(idList, activeContentList)
                for(let i = 0; i < activeContentList.length; i++) {
                    if(activeContentList[i] !== idList[i]) {
                        newActiveContents.splice(i, 1);
                        setActiveContents(newActiveContents);
                        break;
                    }
                }
            }
            // let activeList = [];
            // for (let j = 0; j < newActiveContents.length; j++) {
            //     newActiveContents[j].id;
            // }

            // newActiveContents.filter(x => x.id.includes(selectedCampaigns.map(x => x.id)))
            console.log(idList);
            console.log(newActiveContents.length);
            // setActiveContent((prevState) => [...prevState, false]);
        } else {
            setActiveContents(() =>
                selectedCampaigns.map((campaign) => ({
                    id: campaign.id,
                    name: campaign.name,
                    active: false,
                }))
            );
        }
    }, [selectedCampaigns]);

    console.log(activeContents);

    const triggerContentHandler = (event, campaignID) => {
        console.log(typeof event.currentTarget.id, campaignID);
        const index = parseInt(event.currentTarget.id, 10);
        const newActiveContents = [...activeContents];
        newActiveContents[index].active = !newActiveContents[index].active;
        setActiveContents(newActiveContents);
    };

    // const populateContentHandler = (id) => {
    //     Fetch("http://localhost:4000/campaigns/" + id + "?number=0", (data) => {
    //         setContent(data);
    //     });
    //     console.log("FETCH");
    // };

    let campaignMetrics = activeContents.map((campaign, index) => (
        <Accordion.Item
            eventKey={campaign.id}
            key={campaign.id}
            id={index}
            // onClick={() => populateContentHandler(campaign.id)}
            onClick={(event) => triggerContentHandler(event, campaign.id)}
        >
            <Accordion.Header>
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
                {/* {content && (
                    <div>
                        Impressions - {content.impressions} Clicks -{" "}
                        {content.clicks} Users - {content.users}
                    </div>
                )} */}
            </Accordion.Body>
        </Accordion.Item>
    ));

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
