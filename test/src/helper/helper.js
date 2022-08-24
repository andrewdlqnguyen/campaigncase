
export const Fetch = (url, callback) => {
    fetch(url)
        .then((response) => {
            try {
                return response.json();
            } catch (err) {
                throw new Error(response.statusText);
            }
        })
        .then((data) => {
            callback(data);
        })
        .catch((error) => {
            throw error;
        });
};

export const SaveToLocalStorage = (objectName, state) => {
    try {
        localStorage.setItem(objectName, JSON.stringify(state));
    } catch (e) {
        console.error(e);
    }
};

export const ReadFromLocalStorage = (objectName) => {
    try {
        const stateStr = localStorage.getItem(objectName);
        return stateStr ? JSON.parse(stateStr) : undefined;
    } catch (e) {
        console.error(e);
        return undefined
    }
};

export const PingService = (campaignID, timer) => {
    // const [timeInterval, setTimeInterval] = useState();
    // const [campaignInfo, setCampaignInfo] = useState();
    // const counterRef = useRef(0);
    // const totalImpression = useRef(0);
    // const totalClicks = useRef(0);
    // const totalUsers = useRef(0);
    // const campaignMetrics = useRef(null);
    let campaignMetrics = {};

    let counter = 0;

    console.log("IM IN")
    setInterval(() => {
        Fetch("http://localhost:4000/campaigns/" + campaignID + "?number=" + counter, (data) => {
            campaignMetrics = {
                totalImpression: data.impressions,
                totalClicks: data.clicks,
                totalUsers: data.users
            }
            counter += 1;
            console.log(campaignMetrics)

        });
    }, timer)
    return campaignMetrics;
}