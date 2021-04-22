import { useEffect } from "react";
import { connect } from "react-redux";
import { Container } from "./styled";
import { actGetUserInfo } from "../../redux/actions/user";
import { getAccessToken, isFalsyValue } from "../../utils/common";
import { withRouter } from "react-router-dom";
import Header from "../Header";

function App({ children, userInfo, actGetUserInfo, history }) {
  useEffect(() => {
    if (Object.keys(userInfo).length === 0 && !isFalsyValue(getAccessToken())) {
      actGetUserInfo(history);
    }
  }, []);

  return (
    <>
      {Object.keys(userInfo).length !== 0 && <Header history={history} />}
      <Container>{children}</Container>
    </>
  );
}

const mapStateToProps = (state) => ({
  userInfo: state.user,
});

const mapDispatchToProps = { actGetUserInfo };

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
