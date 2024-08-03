import React, { Component } from "react";
import { FormattedMessage } from "react-intl"; // chuyển đổi ngôn ngữ
import { connect } from "react-redux";
import * as actions from "../../../store/actions";
import { LANGUAGE } from "../../../utils/constant";
// import "./LikeAndShare.scss";
import { NumericFormat } from "react-number-format"; // format số tiền

class LikeAndShare extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  // search: like and share plugin facebook
  // search: facebook sdk
  initFacebookSDK() {
    // bug: khi refesh lại thì mất nút like, share
    // facebook khi refresh sẽ hiểu là đã load rồi nên mất
    if (window.FB) {
      window.FB.XFBML.parse();
    }

    let { language } = this.props;
    let locale = language === LANGUAGE.VI ? "vi_VN" : "en_US";
    window.fbAsyncInit = (function () {
      window.FB.init({
        appId: process.env.REACT_APP_FACEBOOK_APP_ID,
        cookie: true, // dùng cookie để xác thực người dùng
        xfbml: true, // chèn plugin vào website
        version: "v11.0", // or v2.5
      });
    })(
      //load the SDK asynchronously
      function (d, s, id) {
        var js,
          fjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(id)) {
          return;
        }
        js = d.createElement(s);
        js.id = id;
        js.src = `//connect.facebook.net/${locale}/sdk.js`;
        fjs.parentNode.insertBefore(js, fjs);
      }
    )(document, "script", "facebook-jssdk");
  }

  async componentDidMount() {
    this.initFacebookSDK();
  }

  async componentDidUpdate(prevProps, prevState) {
    if (prevProps.language !== this.props.language) {
      this.initFacebookSDK();
    }
  }

  render() {
    let { dataHref } = this.props;
    return (
      <>
        <div
          className="fb-like"
          data-href={dataHref}
          data-width=""
          data-layout="standard"
          data-action="like"
          data-size="small"
          data-share="true"
        ></div>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(LikeAndShare);
