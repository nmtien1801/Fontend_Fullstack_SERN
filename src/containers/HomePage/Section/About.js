import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";

class HandBook extends Component {
  render() {
    return (
      <>
        <div className="section-share section-about">
          <div className="section-about-header">
            Truyền thông nói về chúng tôi
          </div>
          <div className="section-about-content">
            {/* CHÈN VIDEO VÀO WEB
            B1: chuột phải chọn coppy embed code trên ytb 
            B2: chỉnh css*/}
            <div className="content-left">
              <iframe
                width="100%"
                height="300px "
                src="https://www.youtube.com/embed/147SkAVXEqM?list=PLncHg6Kn2JT6E38Z3kit9Hnif1xC_9VqI"
                title="#51 Kết Thúc Design Giao Diện Clone BookingCare.vn 4 | React.JS Cho Người Mới Bắt Đầu"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerpolicy="strict-origin-when-cross-origin"
                allowfullscreen
              ></iframe>
            </div>
            <div className="content-right">
              <p>
                Ngày mình còn là sinh viên, đi học tại giảng đường đại học, có
                rất nhiều câu hỏi mà các thầy cô không giúp mình trả lời được,
                ví dụ như "Để trở thành một lập trình viên website thì cần học
                những gì", hay một câu hỏi đơn giản hơn, "Học công nghệ thông
                tin, ra trường thường làm những gì ? "...
              </p>
            </div>
          </div>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  console.log("state", state);
  return {
    isLoggedIn: state.user.isLoggedIn,
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(HandBook);
