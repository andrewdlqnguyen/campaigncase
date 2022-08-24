import { useEffect, useState } from "react";

const ItemPool = ({ selectedCampaignItem: selectedCampaignItem }) => {
    const [selectedCampaigns, setSelectedCampaigns] = useState([]);

    useEffect(() => {
        if (selectedCampaignItem !== undefined) {
            setSelectedCampaigns((prevState) => [
                ...prevState,
                selectedCampaignItem,
            ]);
        }
    }, [selectedCampaignItem]);

    console.log(selectedCampaigns);

    let selectedCampaignList = "";
    
    if (selectedCampaigns) {
      selectedCampaignList = selectedCampaigns.map((campaign, index) => 
            <div key={index}>
                <span>{campaign.id} - {campaign.name} </span>
            </div>
        );
    }

    return (
        <>
            <div>ItemPool Component</div>

            <div
                style={{
                    width: "600px",
                    height: "200px",
                    backgroundColor: "yellow",
                }}
            >
                {selectedCampaignList && <div>{selectedCampaignList}</div>}
            </div>
        </>
    );
};

export default ItemPool;
