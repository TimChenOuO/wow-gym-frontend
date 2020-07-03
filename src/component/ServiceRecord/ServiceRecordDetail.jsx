import React, { useState, useEffect } from 'react'

import "./ServiceRecordDetail.scss"


const ServiceRecordDetail = (props) => {
    // console.log(props);

    const [replyData, setReplyData] = useState([])
    const [test, settest] = useState([])
    const [showAlert, setShowAlert] = useState(false)
    // 點擊後顯示對話欄
    const [userInput, setUserInput] = useState('')
    // 設定對話框
    const handleClick = () => { setShowAlert(!showAlert) }

    // 取對話資訊
    async function getReplyData() {
        const request = new Request('http://localhost:5000/api/getreplylist', {
            method: 'GET',
            headers: new Headers({
                Accept: 'application/json', 'Content-Type': 'application/json',
            })
        })
        const res = await fetch(request)
        const data = await res.json()
        setReplyData(data)
        // 設定資料
    }
    let Data = replyData.filter(item => item.complaintid === props.complaintid)

    useEffect(() => {
        getReplyData();
    }, [test])
    // 預設

    const onChangeUserInput = (e) => {
        setUserInput(e.target.value)
        console.log(e.target.value);
    }
    const showtime = (value) => {
        return props.createtime.substr(0, 10).concat(' ').concat(props.createtime.substr(11, 8))
    }
    // console.log(props.number);

    async function testPost(input) {
        const request = new Request('http://localhost:5000/api/test', {
            method: 'POST',
            headers: new Headers({
                Accept: 'application/json', 'Content-Type': 'application/json',
            }),
            body: JSON.stringify({
                complaintid: props.complaintid,
                responder: props.memberid,
                replycontent: userInput
            },
            )
        })
        const res = await fetch(request)
        const data = await res.json()
        settest(data)
        // 設定資料
        setUserInput('')
        // POST後對話框清空
    }

    return (
        <>
            <span>{props.number}</span>. <span>{props.complainttitle}</span>
            <div className="form-line">
                <span className="form-label">姓名</span>
                <span className="form-value">{props.name}</span>
                <span className="form-label">會員編號</span>
                <span className="form-value">{props.memberid}</span>
            </div>
            <div className="form-line">
                <span className="form-label">種類單號</span>
                <span className="form-value">{props.kinddocument}</span>
                <span className="form-label">單號</span>
                <span className="form-value">{props.complaintid}</span>
            </div>
            <div className="form-line">
                <span className="form-label">問題種類</span>
                <span className="form-value">{props.complaintkind}</span>
                <span className="form-label">建立時間</span>
                <span className="form-value">{showtime(props.createtime)}</span>
            </div>
            <div className="form-line">
                <span className="form-label">E-mail</span>
                <span className="form-value">{props.email}</span>
                <span className="form-label">問答內容</span>
                <span className="form-value">
                    <span className="reply">假的-已回覆</span>
                    <span className="content-btn-box">
                        <button className="content-btn"
                            onClick={handleClick}>icon</button>
                    </span>
                </span>
            </div>
            {showAlert ?
                <div className="reply-content-body show-modal">
                    <div className="reply-content-body-content">
                        <div className="button-box">
                            <button className="close-button"
                                onClick={handleClick}>X
                            </button>
                        </div>
                        <div className="history-body">
                            <div className="history-left">
                              會員{props.memberid}：{props.complainttextarea}
                            </div>
                            {/* complainttextarea 表單初始內容 */}
                            {Data.map((item, index) =>
                                <div className={item.responder === '1' ? 'history-right' : 'history-left'} >
                                    {item.replycontent}
                                </div>)}
                        </div>
                        <div className="textarea-box">
                            <textarea value={userInput} className="textarea-body"
                                onChange={e => onChangeUserInput(e)}>
                            </textarea>
                        </div>
                        <div className="testPost-btn">
                            <button
                                className="submit-btn"
                                onClick={testPost}>送出
                        </button>
                        </div>
                    </div>
                </div>
                : ''}
        </>
    )
}
export default ServiceRecordDetail;