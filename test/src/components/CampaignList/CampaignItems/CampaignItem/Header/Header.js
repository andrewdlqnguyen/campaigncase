import Iteration from "./Iteration/Iteration";
import Title from "./Title/Title";

/**
 * The head line of the accordion item. Contains title and current number call.
 * @param {*} param0 prop values from API endpoint. 
 * @returns Title of the accordion item
 */
const Header = ({ campaignTitle, campaignId, campaignIteration }) => {
  return (
    <div className="d-flex justify-content-between">
      <div>
        <Title
          campaignTitle={campaignTitle}
          campaignId={campaignId}
        />
      </div>
      <div>
        <Iteration
          campaignIteration={campaignIteration}
        />
      </div>
    </div>
  );
};

export default Header;
