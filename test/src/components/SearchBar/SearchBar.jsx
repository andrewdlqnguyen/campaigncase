import { useState, useContext } from "react";
import campaignContext from "../../store/campaign-context";
import { Portal as DropdownPortal } from "./Portal/Portal";
import { BsSearch } from "react-icons/bs";
import * as searchBarStyles from "./SearchBar.module.css";

const SearchBar = ({ campaignList: campaignList }) => {
    const [searchCampaign, setSearchCampaign] = useState("");
    const [showDropdown, setShowDropdown] = useState(false);
    const [coords, setCoords] = useState({});
    const { selectedCampaigns, updateSelectedCampaigns: setSelectedCampaigns } =
        useContext(campaignContext);

    let searchCount = 0; // dropdown search items
    let campaigns = campaignList;

    const selectCampaignHandler = (campaign) => {
        setSearchCampaign("");
        setShowDropdown(false);

        setSelectedCampaigns((prevState) => {
            const newArray = [...prevState];

            let check = newArray.find((c) => c.id === campaign.id);

            if (check) {
                let list = newArray.filter((x) => {
                    return x.id != check.id;
                });
                return list;
            } else {
                newArray.push(campaign);
                return newArray;
            }
        });
    };

    const removeCampaignHandler = (campaign) => {
        setSelectedCampaigns((prevState) => {
            const newArray = [...prevState];

            return newArray.filter((x) => {
                return x.id != campaign.id;
            });
        });
    };

    const dropdownClickHandler = (e) => {
        const rect = e.getBoundingClientRect();
        setCoords({
            left: rect.x,
            top: rect.bottom + window.scrollY,
        });
        setShowDropdown(true);
    };

    let dropDownCampaignItems = campaigns
        .filter(
            (campaign) =>
                campaign.id.toString().match(new RegExp(searchCampaign, "i")) ||
                campaign.name.match(new RegExp(searchCampaign, "i"))
        )
        .map((campaign, index) => {
            searchCount++;

            let selectedStyle = {};
            selectedCampaigns.forEach((item) => {
                if (Object.values(item).includes(campaign.id)) {
                    selectedStyle = {
                        backgroundColor: "#fcbf7a",
                    };
                }
            });

            return (
                <li
                    key={campaign.id + index}
                    onMouseDown={() => selectCampaignHandler(campaign)}
                    className={`${searchBarStyles.campaignItem}`}
                    style={{ ...selectedStyle }}
                >
                    <div>
                        <span>{campaign.name}</span>
                        <small className="ms-2">- ID: {campaign.id}</small>
                    </div>
                </li>
            );
        });

    let selectedCampaignList = "";

    if (selectedCampaigns) {
        selectedCampaignList = selectedCampaigns.map((campaign, index) => (
            <div
                className={`${searchBarStyles.campaignLabel} global-mediumStyles mx-2 d-flex justify-content-between`}
                key={index}
            >
                <div>
                    {campaign.id} : {campaign.name}
                </div>
                <div
                    className={`${searchBarStyles.campaignLabelExit}`}
                    onClick={() => removeCampaignHandler(campaign)}
                >
                    X
                </div>
            </div>
        ));
    }

    return (
        <>
            <div className="d-flex flex-row ps-0">
                <div className="flex-grow-1">
                <input
                    className={`${searchBarStyles.searchBox} global-lightStyles`}
                    type="text"
                    // name="search"
                    placeholder="search campaign by ID or Name..."
                    value={searchCampaign}
                    onChange={(e) => setSearchCampaign(e.target.value)}
                    onFocus={(e) => dropdownClickHandler(e.target)}
                    onBlur={() => setShowDropdown(false)}
                />
                </div>
                <BsSearch style={{margin: "10px 0 0 -40px"}} size={25}/>
            </div>
            {showDropdown && (
                <DropdownPortal coords={coords}>
                    <div className={searchBarStyles.dropdownContainer}>
                        <ul
                            id="scrollbar-thin"
                            className={`${searchBarStyles.dropdownContext}`}
                        >
                            {dropDownCampaignItems}
                        </ul>
                        {/* <div style={{ textAlign: "left", padding: "" }}>
                            <small className={`${searchBarStyles.searchBox} global-lightStyles`}>search count: {searchCount}</small>
                        </div> */}
                    </div>
                </DropdownPortal>
            )}
            {selectedCampaignList.length > 0 && (
                <div className={`${searchBarStyles.campaignLabelContainer}`}>
                    {selectedCampaignList && (
                        <div className="d-flex flex-wrap">
                            {selectedCampaignList}
                        </div>
                    )}
                </div>
            )}
        </>
    );
};

export default SearchBar;
