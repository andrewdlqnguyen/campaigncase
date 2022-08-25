import { useState, useEffect } from "react";
import { Container, Row } from "react-bootstrap";
import CampaignList from "../../components/CampaignList/CampaignList";
import SearchBar from "../../components/SearchBar/SearchBar";
import { Fetch } from "../../helper/helper";
import * as dashboardStyles from "./Dashboard.module.css";

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
                <Row className="m-5">
                    <div className={` ${dashboardStyles.title} mb-5`}>
                        <div className={`${dashboardStyles.header} global-boldStyles`}>
                            <span className={dashboardStyles.companyName}>
                                Loblaw{" "}
                            </span>
                            <span className={dashboardStyles.companySubName}>
                                Technology
                            </span>
                        </div>
                        <div className={`${dashboardStyles.subHeader} global-mediumStyles`}>Performance <span style={{color: "#ff8c1a"}}>Metric System</span></div>
                        <div>View and compare key business campaign performance metrics.</div>
                    </div>
                    {campaignList && <SearchBar campaignList={campaignList} />}
                    <CampaignList />
                </Row>
            </Container>
        </>
    );
};

export default Dashboard;
