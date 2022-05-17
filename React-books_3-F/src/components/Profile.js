import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import WithRouterSample from "./WithRouterSample";

export default function Profile(props) {
  console.log("props - ", props);
  const { match } = props;

  const history = useHistory();
  let unblock;

  useEffect(() => {
    return () => {
      unblock = history.block("떠날거임?");
    };
  }, []);

  return (
    <>
      <h1>Hello {match.params.username}</h1>
      <button type="click" onClick={() => history.push("/")}>
        Home
      </button>
      <button type="click" onClick={() => history.push("/profiles")}>
        Profile
      </button>
      <button type="click" onClick={() => history.goBack()}>
        Back
      </button>
      <WithRouterSample />
    </>
  );
}
