import { withRouter } from "react-router-dom";

export default withRouter(function WithRouterSample({
  location,
  match,
  history,
}) {
  return (
    <div>
      <h4>location</h4>
      <textarea
        value={JSON.stringify(location, null, 2)}
        rows={7}
        readOnly={true}
      />
      <h4>match</h4>
      <textarea
        value={JSON.stringify(match, null, 2)}
        rows={7}
        readOnly={true}
      />
      <button onClick={() => history.push("/")}>Home</button>
    </div>
  );
});
