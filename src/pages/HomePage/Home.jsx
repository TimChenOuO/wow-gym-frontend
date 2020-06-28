import React from "react";
import "./Home.scss";
import GYM2 from "../../API/GYM.mp4";
import PhotosImgbackground from "./PhotosImgbackground1.png";
import PhotosImgFront from "./PhotosImgFront.png";
import CoachBackGround from "./CoachBackGround.jpg";
import CustomButton from "../../component/custom-button/Custom-button";
const HomePage = () => {
  return (
    <div className="home-page">
      {/* Video session */}
      <div className="video-session-container">
        <video autoPlay loop muted className="video">
          <source src={GYM2} type="video/mp4" />
        </video>
        <div id="VideoScroll" className="video-scroll">
          <h3>關於我們</h3>
          <span>
            尖頂是數位顧問公司，幫助客戶找出機會、創造體驗成為系統，從科技轉變中獲利。
            <br />
            Acme is a digital consultancy that identifies opportunities, creates
            experiences and builds systems to help our clients benefit from
            technological change.
          </span>
        </div>
      </div>
      {/* news session */}
      <div className="news-session-container">
        <figure className="news-img-container">
          <img src={PhotosImgbackground} alt="" />
        </figure>
        <div className="news-font-container">
          <h3 className="news-font-title">
            <span>最新消息</span>
            <div className="news-font-title-line" />
          </h3>

          <span className="news-font-introduction">
            包含最熱門的飛輪、 舞蹈、瑜珈、與獨家系列(LESM
            ILLS、MOSSA)，有氧老師 師資也非常充足與 專業，滿足您隨時
            想上課的需求。
            <br />
            <br />
            Including the most popular flywheels, dance, yoga, LESM ILLS, MOSSA
            and exclusive series, the aerobic teacher is also very adequate and
            professional, to meet your needs at any time.
          </span>
          <br />
          <CustomButton>了解更多</CustomButton>
        </div>
      </div>
    </div>
  );
};
export default HomePage;
