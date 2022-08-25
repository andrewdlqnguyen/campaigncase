import { useState, useEffect } from "react";
import { Container, Row } from "react-bootstrap";
import CampaignList from "../../components/CampaignList/CampaignList";
import SearchBar from "../../components/SearchBar/SearchBar";
import { Fetch } from "../../helper/helper";
import * as containerStyles from "./Dashboard.module.css";

const Dashboard = () => {
    const [campaignList, setCampaignList] = useState();

    useEffect(() => {
        Fetch("http://localhost:4000/campaigns", (data) => {
            setCampaignList(data.campaigns);
        });
    }, []);

    return (
        <>
            <Container>
                <Row className="mx-5">
                    <div className={` ${containerStyles.title} mb-5`}>
                        <div className={`${containerStyles.header} global-boldStyles`}>
                            <span className={containerStyles.companyName}>
                                Loblaw{" "}
                            </span>
                            <span className={containerStyles.companySubName}>
                                Technology
                            </span>
                        </div>
                        <div className={`${containerStyles.subHeader} global-mediumStyles`}>Performance Metric System</div>
                    </div>
                    {campaignList && <SearchBar campaignList={campaignList} />}
                    <CampaignList />
                </Row>
            </Container>
        </>
    );
};

export default Dashboard;
