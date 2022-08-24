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
                console.log(selectedCampaigns[selectedCampaigns.length - 1]);
                setActiveContents((prevState) => [
                    ...prevState,
                    {
                        id: selectedCampaigns[selectedCampaigns.length - 1].id,
                        name: selectedCampaigns[selectedCampaigns.length - 1]
                            .name,
                        active: false,
                    },
                ]);
            }
            if (idList.length < newActiveContents.length) {
                let activeContentList = [];
                for (let i = 0; i < newActiveContents.length; i++) {
                    activeContentList = [
                        ...activeContentList,
                        newActiveContents[i].id,
                    ];
                }
                console.log(idList, activeContentList);
                for (let i = 0; i < activeContentList.length; i++) {
                    if (activeContentList[i] !== idList[i]) {
                        newActiveContents.splice(i, 1);
                        setActiveContents(newActiveContents);
                        break;
                    }
                }
            }
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
        console.log("hello", event.currentTarget.id, campaignID);
        const index = parseInt(event.currentTarget.id, 10);
        const newActiveContents = [...activeContents];
        newActiveContents[index].active = !newActiveContents[index].active;
        setActiveContents(newActiveContents);
    };

    let campaignMetrics = activeContents.map((campaign, index) => (
        <div
            className="accordion-item"
            key={campaign.id}
            id={index}
            onClick={(event) => triggerContentHandler(event, campaign.id)}
        >
            <h2 className="accordion-header" id={`campaignHead-${campaign.id}`}>
                <button
                    className="accordion-button"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target={`#campaignCollapse-${campaign.id}`}
                    aria-expanded="false"
                    aria-controls={`#campaignCollapse-${campaign.id}`}
                >
                    {campaign.id} - {campaign.name}
                </button>
            </h2>
            <div
                id={`campaignCollapse-${campaign.id}`}
                className="accordion-collapse collapse"
                aria-labelledby={`campaignHead-${campaign.id}`}
            >
                <div className="accordion-body">
                    <strong>This is the first item's accordion body.</strong> It
                    is shown by default, until the collapse plugin adds the
                    appropriate classes that we use to style each element. These
                    classes control the overall appearance, as well as the
                    showing and hiding via CSS transitions. You can modify any
                    of this with custom CSS or overriding our default variables.
                    It's also worth noting that just about any HTML can go
                    within the <code>.accordion-body</code>, though the
                    transition does limit overflow.
                </div>
            </div>
        </div>
    ));

    return (
        <>
            <div>CampaignList Component</div>
            <div class="accordion" id="accordionPanelsStayOpenExample">
                {campaignMetrics}
            </div>
        </>
    );
};

export default CampaignList;
