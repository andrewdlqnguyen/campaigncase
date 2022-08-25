import Iteration from "./Iteration/Iteration";
import Title from "./Title/Title";

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
