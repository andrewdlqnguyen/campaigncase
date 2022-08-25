import { FaRegHeart } from "react-icons/fa";
import { HiOutlineCursorClick, HiOutlineUsers } from "react-icons/hi";
import { ImStatsBars2 } from "react-icons/im";
import * as metricsStyles from "./Metrics.module.css";

/**
 * Metric block for performance metric data. This can be broken down further to more modular components.
 * @param {*} param0 prop values from API endpoint.
 * @returns a block of  text informantion regarding the data key values.
 */
const Metrics = ({ campaignName, campaignValue, campaignMetric }) => {
    let iconDisplay = "";
    let styling = {};

    const ctrRating = (campaignValue) => {
        let ctrCheck = parseFloat(campaignValue.replace("%", ""));
        if (ctrCheck > 5) {
            styling = {
                color: "#19a315"
            }
        }
        else if (ctrCheck > 2) {
            styling = {
                color: "#a1a315"
            }
        }
        else {
            styling = {
                color: "#cf534a"
            }
        }
    }

    switch (campaignMetric) {
        case "impression":
            iconDisplay = <FaRegHeart />;
            break;
        case "clicks":
            iconDisplay = <HiOutlineCursorClick />;
            break;
        case "users":
            iconDisplay = <HiOutlineUsers />;
            break;
        default:
            iconDisplay = <ImStatsBars2 />;
            ctrRating(campaignValue);
    }

    return (
        <div className={`${metricsStyles.container} d-flex flex-wrap m-2 flex-grow-1 global-lightStyles`}>
            <div className="flex-grow-1">
                <div >{campaignName}</div>
                <div className="global-mediumStyles" style={{ ...styling }}>{campaignValue}</div>
            </div>
            <div>{iconDisplay}</div>
        </div>
    );
};

export default Metrics;
