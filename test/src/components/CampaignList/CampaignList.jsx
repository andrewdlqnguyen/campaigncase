import { useContext, useEffect, useState } from "react";
import campaignContext from "../../store/campaign-context";
import { Col, Row } from "react-bootstrap";

import Header from "./CampaignItems/CampaignItem/Header/Header";
import Iteration from "./CampaignItems/CampaignItem/Header/Iteration/Iteration";
import Title from "./CampaignItems/CampaignItem/Header/Title/Title";
import Metrics from "./CampaignItems/CampaignItem/Metrics/Metric";
import Spinner from "../../components/UI/Spinner/Spinner";
import { Fetch } from "../../helper/helper";

/**
 * List of campaign that is displayed in accordion list to allow user to compare.
 * @returns Accordion items holding campaign selected from search bar
 */
const CampaignList = () => {
    const [activeContents, setActiveContents] = useState([]);
    const [contentMetrics, setContentMetrics] = useState({});
    const { selectedCampaigns, userPreference } = useContext(campaignContext);

    /**
     * This current useEffect depends on the change on selectedCampaign. 
     * This hook will update current active campaign list and remove campaigns when campaign label is removed.
     */
    useEffect(() => {
        if (activeContents) {
            const newActiveContents = [...activeContents];
            let idList = [];
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

    /**
     * When the accordion header is clicked, the specific campaign will call the API endpoint with the selected ID.
     * The data will be stored in contentMetrics with the required case performance metric. connection will remain 
     * active and will call the endpoint every 5 seconds.
     * @param {*} content takes in the campaign data content
     * @param {*} index  the index of the campaign location
     */
    const updateMetrics = (content, index) => {
        let counter = contentMetrics[content.id]?.currentNumber
            ? contentMetrics[content.id].currentNumber
            : 0;
        let objectLocation = "tempCampaign";

        content[objectLocation] = setInterval(() => {
            Fetch(
                "http://localhost:4000/campaigns/" +
                    content.id +
                    "?number=" +
                    counter,
                (data) => {
                    counter += 1;
                    console.log(typeof data.impressions);
                    setContentMetrics((prevState) => ({
                        ...prevState,
                        [content.id]: {
                            color: content.name,
                            totalImpression: prevState[content.id]
                                ?.totalImpression
                                ? prevState[content.id].totalImpression +
                                  data.impressions
                                : data.impressions,
                            totalClicks: prevState[content.id]?.totalClicks
                                ? prevState[content.id].totalClicks +
                                  data.clicks
                                : data.clicks,
                            totalUsers: prevState[content.id]?.totalUsers
                                ? prevState[content.id].totalUsers + data.users
                                : data.users,
                            ctr: prevState[content.id]?.totalClicks
                                ? (
                                      (prevState[content.id].totalClicks /
                                          prevState[content.id]
                                              .totalImpression) *
                                      100
                                  ).toFixed(2) + userPreference.ctrUnit
                                : (
                                      (data.clicks / data.impressions) *
                                      100
                                  ).toFixed(2) + userPreference.ctrUnit,
                            currentNumber: counter,
                            recentImpression: data.impressions,
                            recentClicks: data.clicks,
                            recentUsers: data.users,
                            recentCTR:
                                (
                                    (data.clicks / data.impressions) *
                                    100
                                ).toFixed(2) + userPreference.ctrUnit,
                        },
                    }));
                }
            );
        }, 5000);
    };

    console.log(contentMetrics);

    /**
     * useEffect will clear intervals when campaign is no longer selected.
     */
    useEffect(() => {
        activeContents.map((content, index) => {
            let objectLocation = "tempCampaign";
            if (content.active) {
                clearInterval(content[objectLocation]);
                updateMetrics(content, index);
            } else {
                clearInterval(content[objectLocation]);
            }
        });
    }, [activeContents]);

    const triggerContentHandler = (event, campaignID) => {
        const index = parseInt(event.currentTarget.id, 10);
        const newActiveContents = [...activeContents];
        newActiveContents[index].active = !newActiveContents[index].active;
        setActiveContents(newActiveContents);
    };

    /**
     * campaignMetric JSX. This variable can be broken down more and in separate components.
     * metric naming needs to be stored in object list. and Metric component be dynamically by map method.
     */
    let campaignMetrics = activeContents.map((campaign, index) => (
        <div className="accordion-item" key={campaign.id}>
            <h2 className="accordion-header" id={`campaignHead-${campaign.id}`}>
                <button
                    className="accordion-button"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target={`#campaignCollapse-${campaign.id}`}
                    aria-expanded="false"
                    aria-controls={`#campaignCollapse-${campaign.id}`}
                    id={index}
                    onClick={(event) =>
                        triggerContentHandler(event, campaign.id)
                    }
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
                    {contentMetrics[campaign.id] ? (
                        <div>
                            <Row>
                                <Header
                                    campaignTitle={
                                        contentMetrics[campaign.id].color
                                    }
                                    campaignId={campaign.id}
                                    campaignIteration={
                                        contentMetrics[campaign.id]
                                            .currentNumber
                                    }
                                />
                            </Row>
                            <Row>
                                <div className="global-mediumStyles">Most Recent</div>
                                <div className="d-flex flex-wrap">
                                    <Metrics
                                        campaignName="Most Recent Impression"
                                        campaignValue={
                                            contentMetrics[campaign.id]
                                                .recentImpression
                                        }
                                        campaignMetric="impression"
                                    />
                                    <Metrics
                                        campaignName="Most Recent Clicks"
                                        campaignValue={
                                            contentMetrics[campaign.id]
                                                .recentClicks
                                        }
                                        campaignMetric="clicks"
                                    />
                                    <Metrics
                                        campaignName="Most Recent Users"
                                        campaignValue={
                                            contentMetrics[campaign.id]
                                                .recentUsers
                                        }
                                        campaignMetric="users"
                                    />
                                </div>
                                <div>
                                    <Metrics
                                        campaignName="CTR - Click Through Rate"
                                        campaignValue={
                                            contentMetrics[campaign.id].recentCTR
                                        }
                                    />
                                </div>
                                <div className="global-mediumStyles">Total</div>
                                <div className="d-flex flex-wrap">
                                    <Metrics
                                        campaignName="Total Impression"
                                        campaignValue={contentMetrics[campaign.id].totalImpression
                                        }
                                        campaignMetric="impression"
                                    />
                                    <Metrics
                                        campaignName="Total Clicks"
                                        campaignValue={contentMetrics[campaign.id].totalClicks
                                        }
                                        campaignMetric="clicks"
                                    />
                                    <Metrics
                                        campaignName="Total Users"
                                        campaignValue={contentMetrics[campaign.id].totalUsers
                                        }
                                        campaignMetric="users"
                                    />
                                </div>
                                <div>
                                    <Metrics
                                        campaignName="CTR - Click Through Rate"
                                        campaignValue={
                                            contentMetrics[campaign.id].ctr
                                        }
                                    />
                                </div>
                            </Row>
                        </div>
                    ): <Spinner/>}
                </div>
            </div>
        </div>
    ));

    return (
        <>
            <div className="accordion" id="campaignAccordionList">
                {campaignMetrics}
            </div>
        </>
    );
};

export default CampaignList;
