/**
 * The current number called to backend for the campaign.
 * @param {*} param0 prop values from API endpoint.
 * @returns a ui of the current number called to back end and update date.
 */
const Iteration = ({ campaignIteration }) => {
  const event = new Date();

  return (
    <div className="d-flex flex-column" style={{ textAlign: "right" }}>
      <div style={{ fontSize: "16px" }}>PULL #{campaignIteration}</div>
      <small style={{ textDecoration: "underline" }}>updated on: {event.toLocaleTimeString('en-US')}</small>
    </div>
  );
}

export default Iteration;