import React, { useState, useEffect } from "react";
import "./user-edit.scss";
import axios from "axios";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { withRouter } from "react-router-dom";
import { currentUserSelect } from "../../redux/user/user-selector";

function UserEdit({ currentUserSelect }) {
  // console.log(currentUserSelect);

  const [member, setMember] = useState([]);
  const [memberAccount, setmemberAccount] = useState();

  const [memberName, setName] = useState();
  const [memberNickname, setNickName] = useState();
  const [memberGender, setsex] = useState();
  const [memberBirth, setdate] = useState();
  const [memberEmail, setmail] = useState();
  const [memberPhoneNum, setphone] = useState();
  const [city, setcity] = useState();
  const [contury, setcontury] = useState();
  const [memberAddress, setaddress] = useState();
  const [memberPwd, setpwd] = useState();
  const [memberImg, setimg] = useState();

  async function AddFromToServer() {
    axios.post("http://localhost:5000/api/user/UpdateUser", {
      data: {
        memberName,
        memberNickname,
        memberGender,
        memberBirth,
        memberEmail,
        memberPhoneNum,
        memberAddress,
        memberPwd,
        memberImg,
      },
      currentUserSelect,
      city,
      contury,
    });
  }
  //圖片上傳後轉base64存進資料庫
  const handleImgChange = (e) => {
    let input = e.target.files[0];
    let reader = new FileReader();
    reader.onload = function () {
      let dataURL = reader.result;
      setimg(dataURL);
    };
    reader.readAsDataURL(input);
  };

  useEffect(() => {
    const FetchData = async () => {
      const result = await axios(
        `http://localhost:5000/api/user/${currentUserSelect.id}`
      );
      // console.log(result.data.memberItem.membersRow)
      setMember(result.data.memberItem.membersRow);
    };
    FetchData();
  }, [currentUserSelect.id]);

  useEffect(() => {
    member.forEach((el) => {
      setName(el.memberName);
      setNickName(el.memberNickname);
      setmail(el.memberEmail);
      setmemberAccount(el.memberAccount);
      setimg(el.memberImg);
    });
  }, [member]);
  return (
    <>
      <div className="edit">
        <p className="edit-title">
          個人資料修改
          <br />
          管理您的檔案以保護您的帳戶
        </p>

        <div className="horizontally-line"></div>
        <p className="edit-account">使用者帳號: {memberAccount}</p>
        <form onSubmit={() => AddFromToServer()}>
          <div className="form-wrapper">
            <div className="left-form">
              <input
                className="user-input"
                type="text"
                placeholder=" 請輸入姓名"
                onChange={(e) => setName(e.target.value)}
              />
              <input
                className="user-input"
                type="text"
                placeholder=" 請輸入暱稱"
                onChange={(e) => setNickName(e.target.value)}
              />

              <div></div>
              <input
                className="user-birth"
                type="date"
                placeholder=" 請輸入生日"
                onChange={(e) => setdate(e.target.value)}
              />
              <select
                className="user-sex"
                onChange={(e) => setsex(e.target.value)}
              >
                <option value="男">男生</option>
                <option value="女">女生</option>
              </select>
              <div></div>

              <input
                className="user-input-long"
                type="text"
                minLength="10"
                pattern="[0-9]*"
                placeholder=" 請輸入手機號碼"
                onChange={(e) => setphone(e.target.value)}
              />
              <div></div>
              <input
                className="user-input"
                type="text"
                placeholder=" 請輸入縣市"
                onChange={(e) => setcity(e.target.value)}
              />
              <input
                className="user-input"
                type="text"
                placeholder=" 請輸入鄉鎮"
                onChange={(e) => setcontury(e.target.value)}
              />
              <div></div>
              <input
                className="user-input-long"
                maxLength="40"
                type="text"
                placeholder=" 請輸入地址"
                onChange={(e) => setaddress(e.target.value)}
              />
              <div></div>
              <input
                className="user-input-long"
                type="email"
                placeholder=" 請輸入電子郵件"
                onChange={(e) => setmail(e.target.value)}
              />
            </div>
            <div className="center-line"></div>
            <div className="right-form">
              <div className="img-card">
                <img className="user-img" alt="user-Img" src={memberImg}></img>
                <input
                  className="user-img-input"
                  type="file"
                  accept=".jpg,.png"
                  onChange={(e) => {
                    handleImgChange(e);
                  }}
                />
                <p>檔案大小:最大1Mb</p>
                <p>檔案限制:JPEG、PNG</p>
              </div>
              <div></div>
              <p className="right-title">修改密碼</p>
              <input
                className="user-input-long"
                minLength="8"
                type="password"
                pattern="(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z a-z]).*$"
                placeholder=" 請輸入舊密碼"
                onChange={(e) => setpwd(e.target.value)}
              />
              <div></div>
              <input
                className="user-input-long"
                minLength="8"
                type="password"
                pattern="(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z a-z]).*$"
                placeholder=" 請輸入新密碼"
              />
              <div></div>
              <input
                className="user-input-long"
                minLength="8"
                type="password"
                pattern="(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z a-z]).*$"
                placeholder=" 請再輸入一次新密碼"
              />
              <div></div>
              <button type="submit">儲存</button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}

const mapStateToProps = createStructuredSelector({
  currentUserSelect: currentUserSelect,
});

export default withRouter(connect(mapStateToProps)(UserEdit));
