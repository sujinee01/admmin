import React, { useState, useEffect } from "react";
import "./App.css";
import "./Font.css";
import BoxGrid from "./BoxGrid.js";
import bell from "./bell.png";

function App() {
  const alarmData = [
    {
      alarm: "[시간 충전] 5번 테이블에 시간을 N분 충전해 주세요",
    },
    {
      alarm: "[합석 처리] 1번, 2번 테이블의 합석 처리를 진행해 주세요.",
    },
    {
      alarm: "[하트 충전] 4번 테이블에 하트 N개를 충전해 주세요.",
    },
    {
      alarm: "[이용 시간] 3번 테이블의 이용 시간이 10분 남았습니다.",
    },
    {
      alarm: "[테이블 비우기] 3번 테이블을 비워주세요.",
    },
    // 추가적인 질문과 답변을 필요에 따라 추가할 수 있습니다.
  ];
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);

    // Cleanup interval on component unmount
    return () => clearInterval(interval);
  }, []); // 빈 배열을 전달하여 컴포넌트가 처음 마운트될 때만 실행되도록 함

  const formattedTime = () => {
    let hour = time.getHours();
    let minute = time.getMinutes();
    let second = time.getSeconds();
    let period = hour >= 12 ? "PM" : "AM";

    // Converting the hour in 12-hour format
    hour = hour % 12 || 12;

    // Updating hour, minute, and second if they are less than 10
    hour = hour < 10 ? "0" + hour : hour;
    minute = minute < 10 ? "0" + minute : minute;
    second = second < 10 ? "0" + second : second;

    return `${hour} : ${minute} : ${second} ${period}`;
  };

  return (
    <div className="admin_body">
      <div class="v-line"></div>
      <div class="h-line1"></div>
      <div class="h-line2"></div>
      <div class="h-line3"></div>
      <div class="h-line4"></div>
      <div class="h-line5"></div>
      <div class="h-line6"></div>
      <div class="h-line7"></div>
      <div class="h-line8"></div>
      <div class="h-line9"></div>
      <header>
        <div class="admin_header">
          <div class="main-title">
            <span>
              바른생각
              <br />
              바른주점
            </span>
          </div>
          <div className="digital-clock">{formattedTime()}</div>
        </div>
        <div class="title-alarm">
          <p class="title-notice">
            <strong>NOTICE</strong>
            <img src="./img/bell.png" />
          </p>
        </div>
        <div className="alarm-container">
          {alarmData.map((item, index) => (
            <div key={index} className="alarm-item">
              <button class="alarmdel">x</button>
              <br />
              <p>{item.alarm}</p>
            </div>
          ))}
        </div>
        <div class="bottom-line"></div>
      </header>
      <nav class="admin_nav">
        <div class="info_table1">
          <p class="info_title">남자 테이블 수</p>
          <div class="info_num">1</div>
        </div>
        <div class="info_table2">
          <p class="info_title">여자 테이블 수</p>
          <div class="info_num">1</div>
        </div>
        <div class="info_table3">
          <p class="info_title">혼성 테이블 수</p>
          <div class="info_num">1</div>
        </div>
        <div class="info_table4">
          <p class="info_title">합성 테이블 수</p>
          <div class="info_num">1</div>
        </div>
        <div class="info_table5">
          <p class="info_title">빈 테이블 수</p>
          <div class="info_num">1</div>
        </div>
      </nav>
      <div class="admin_container">
        <button class="table_choice">선택</button>
      </div>

      <div class="table-container">
        <BoxGrid />
      </div>

      <footer>
        <div class="admin-footer">
          <div class="footer-button">
            <button class="time-plus">시간 추가</button>
            <button class="heart-plus">하트 충전</button>
            <button class="table-exit">퇴장 처리</button>
            <button class="table-mix">합석 처리</button>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
