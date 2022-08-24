import { useState, useContext } from "react";
import campaignContext from "../../store/campaign-context";
import { Portal as DropdownPortal } from "./Portal/Portal";

const SearchBar = ({ campaignList: campaignList }) => {
    const [searchCampaign, setSearchCampaign] = useState("");
    const [showDropdown, setShowDropdown] = useState(false);
    // const [selectedCampaign, setSelectedCampaign] = useState([]); //global state for itemPool to see it deselect
    const [coords, setCoords] = useState({});
    const { selectedCampaigns, updateSelectedCampaigns : setSelectedCampaigns } = useContext(campaignContext);


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

            return  newArray.filter((x) => {
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

            let selectedStyle = {
                backgroundColor: "red",
            };
            selectedCampaigns.forEach((item) => {
                if (Object.values(item).includes(campaign.id)) {
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

    let selectedCampaignList = "";

    if (selectedCampaigns) {
        selectedCampaignList = selectedCampaigns.map((campaign, index) => (
            <div key={index}>
                <span>
                    {campaign.id} - {campaign.name}{" "}
                </span>
                <span onClick={() => removeCampaignHandler(campaign)}>X</span>
            </div>
        ));
    }

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
            <div>
                {selectedCampaignList && <div>{selectedCampaignList}</div>}
            </div>
        </>
    );
};

export default SearchBar;
