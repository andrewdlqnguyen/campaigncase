/**
 * Title of the accordion item
 * @param {*} param0 prop values from API endpoint.
 * @returns Accordion Item title.
 */
const Title = ({ campaignTitle, campaignId }) => {
  return (
    <div className="d-flex align-items-end global-mediumStyles">
      <div style={{ fontSize: "36px" }}>{campaignTitle}</div><div className="ms-2 pb-2">ID: {campaignId}</div>
    </div>
  );
}

export default Title;