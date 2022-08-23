import { useState } from "react";

const SearchBar = () => {
  const [searchCampaign, setSearchCampaign] = useState();
  const [showDropdown, setShowDropdown] = useState(false);

  let searchCount = 0; // dropdown search items
  let campaigns = campaignProperties;

  dropdownClickHandler = (e) => {
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
        campaign.id.match(new RegExp(searchId, "i")) ||
        campaign.name.match(new RegExp(searchId, "i"))
    )
    .map((campaign, index) => {
      searchCount++;
      return (
        <li
          key={campaign.id + index}
          onMouseDown={() => selectCampaignHandler(campaign.id)}
          className="campaign-item"
        >
          <div>{campaign.id}</div>
          <div>
            <small>{campaign.name}</small>
          </div>
        </li>
      );
    });

  return (
    <>
      <div>SearchBar Component</div>
      <input
        className="searchBox"
        type="text"
        name="search"
        value={searchCampaign}
        onChange={(e) => setSearchCampaign(e.target.value)}
        onFocus={(e) => dropdownClickHandler(e.target)}
        onBlur={() => setShowDropdown(false)}
      />
      {/* {!showDropdown && (
        <span style={{ position: "absolute", right: "22px" }}>
          <i className="arrow down"></i>
        </span>
      )} */}
      {showDropdown && (
        <DropdownPortal coords={coords}>
          <div className="px-4 py-2" style={{ textAlign: "right" }}>
            <small>search count: {searchCount}</small>
          </div>
          <ul
            id="scrollbar-thin"
            className="dropdown-container px-4"
            style={{ listStyle: "none" }}
          >
            {dropDownVehicleItems}
          </ul>
        </DropdownPortal>
      )}
    </>
  );
};

export default SearchBar;
