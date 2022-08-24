import { useState } from "react";
import { Portal as DropdownPortal } from "./Portal/Portal";

const SearchBar = ({ campaignList: campaignList }) => {
    const [searchCampaign, setSearchCampaign] = useState("");
    const [showDropdown, setShowDropdown] = useState(false);
    const [selectedCampaign, setSelectedCampaign] = useState([]); //global state for itemPool to see it deselect
    const [coords, setCoords] = useState({});

    let searchCount = 0; // dropdown search items
    let campaigns = campaignList;
    console.log(campaigns);

    const selectCampaignHandler = (campaign) => {
        setSearchCampaign("");
        setShowDropdown(false);

        selectedCampaign.forEach((item, index) => {
            if (Object.values(item).includes(campaign.id)) {
                const removeIndex = Object.values(item).indexOf(index);
                let tempSelectedCampaign = selectedCampaign;
                tempSelectedCampaign.splice(removeIndex, 1);
                console.log("HELLO", tempSelectedCampaign);
                setSelectedCampaign(tempSelectedCampaign);
            }
        });

        setSelectedCampaign((prevState) => [...prevState, campaign]);
        console.log(campaign);
    };
    // console.log(selectedID);

    const dropdownClickHandler = (e) => {
        const rect = e.getBoundingClientRect();
        setCoords({
            left: rect.x,
            top: rect.bottom + window.scrollY,
        });
        setShowDropdown(true);
    };

    // const selectedStyle = {
    //   backgroundColor: "red",
    // };
    console.log("=========");

    let dropDownCampaignItems = campaigns
        .filter(
            (campaign) =>
                campaign.id.toString().match(new RegExp(searchCampaign, "i")) ||
                campaign.name.match(new RegExp(searchCampaign, "i"))
        )
        .map((campaign, index) => {
            searchCount++;

            let selectedStyle = {
                backgroundColor: "red",
            };
            selectedCampaign.forEach((item) => {
                if ((campaign.id, Object.values(item).includes(campaign.id))) {
                    selectedStyle = {
                        backgroundColor: "green",
                    };
                }
            });

            return (
                <li
                    key={campaign.id + index}
                    onMouseDown={() => selectCampaignHandler(campaign)}
                    className="campaign-item"
                    style={{ ...selectedStyle }}
                >
                    <div>
                        #{campaign.id} - {campaign.name}
                    </div>
                </li>
            );
        });

    return (
        <>
            <div>SearchBar Component</div>
            <input
                // className="searchBox"
                type="text"
                // name="search"
                placeholder="search campaign..."
                value={searchCampaign}
                onChange={(e) => setSearchCampaign(e.target.value)}
                onFocus={(e) => dropdownClickHandler(e.target)}
                onBlur={() => setShowDropdown(false)}
            />
            {showDropdown && (
                <DropdownPortal coords={coords}>
                    <div>List of Campaigns</div>
                    <div className="px-4 py-2" style={{ textAlign: "right" }}>
                        <small>search count: {searchCount}</small>
                    </div>
                    <ul
                        id="scrollbar-thin"
                        className="dropdown-container px-4"
                        style={{ listStyle: "none" }}
                    >
                        {dropDownCampaignItems}
                    </ul>
                </DropdownPortal>
            )}
        </>
    );
};

export default SearchBar;
