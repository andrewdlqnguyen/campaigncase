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