import React, { useState, useEffect } from "react";
import "./App.css";
import "./Font.css";

const Box = ({ color, text, checkboxId }) => {
  const boxStyle = {
    backgroundColor: color, // color prop을 이용해 동적으로 배경색을 설정
  };

  return (
    <div className="box" style={boxStyle}>
      <input type="checkbox" id={checkboxId} />
      <label htmlFor={checkboxId}>{text}</label>
    </div>
  );
};

function App() {
  const [isModalVisible, setModalVisible] = useState(false);
  const [popupType, setPopupType] = useState(null);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const openPopup = (type) => {
    setPopupType(type);
    toggleModal(); // 팝업을 열 때 모달을 보이도록 설정
  };

  const closePopup = () => {
    setPopupType(null);
    toggleModal(); // 팝업을 닫을 때 모달을 숨기도록 설정
  };

  const [isTimePlusVisible, setTimePlusVisible] = useState(false);
  const [isHeartPlusVisible, setHeartPlusVisible] = useState(false);
  const [isTableExitVisible, setTableExitVisible] = useState(false);
  const [isTableMixVisible, setTableMixVisible] = useState(false);
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
  ];
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const formattedTime = () => {
    let hour = time.getHours();
    let minute = time.getMinutes();
    let second = time.getSeconds();
    let period = hour >= 12 ? "PM" : "AM";

    hour = hour % 12 || 12;

    hour = hour < 10 ? "0" + hour : hour;
    minute = minute < 10 ? "0" + minute : minute;
    second = second < 10 ? "0" + second : second;

    return `${hour} : ${minute} : ${second} ${period}`;
  };
  const toggleTimePlusPopup = () => {
    setTimePlusVisible(!isTimePlusVisible);
  };

  const toggleHeartPlusPopup = () => {
    setHeartPlusVisible(!isHeartPlusVisible);
  };

  const toggleTableExitPopup = () => {
    setTableExitVisible(!isTableExitVisible);
  };

  const toggleTableMixPopup = () => {
    setTableMixVisible(!isTableMixVisible);
  };

  useEffect(() => {
    // 여기에 필요한 부가적인 동작을 수행할 수 있습니다.
  }, []);

  const [value, setValue] = useState(0); // 초기값을 0으로 설정

  const increaseValue = () => {
    setValue(value + 10); // 현재 값에 10을 더한 값으로 상태값 업데이트
  };

  const decreaseValue = () => {
    setValue(value - 10); // 현재 값에서 10을 뺀 값으로 상태값 업데이트
  };
  return (
    <div className="admin_body">
      <div class="v-line"></div>
      <div class="h-line1"></div>
      <div class="h-line2"></div>
      <div class="h-line4"></div>
      <div class="h-line5"></div>
      <div class="h-line6"></div>
      <div class="h-line7"></div>
      <div class="h-line8"></div>
      <div class="h-line9"></div>
      <div class="h-line10"></div>
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
      <div class="box-list">
        <div class="table-container">
          <Box color="#FFC5F1" text="1" checkboxId="checkbox1" />
          <Box color="#D9D9D9" text="2" checkboxId="checkbox1" />
          <Box color="#F9F16A" text="3" checkboxId="checkbox1" />
          <Box color="#D9D9D9" text="4" checkboxId="checkbox1" />
          <Box color="#FFC5F1" text="5" checkboxId="checkbox1" />
          <Box color="#F9F16A" text="6" checkboxId="checkbox1" />
        </div>
        <div class="table-container">
          <Box color="#9A66FF" text="7" checkboxId="checkbox1" />
          <Box color="#D9D9D9" text="8" checkboxId="checkbox1" />
          <Box color="#87DEFF" text="9" checkboxId="checkbox1" />
          <Box color="#FFC5F1" text="10" checkboxId="checkbox1" />
          <Box color="#9A66FF" text="11" checkboxId="checkbox1" />
          <Box color="#87DEFF" text="12" checkboxId="checkbox1" />
        </div>
        <div class="table-container">
          <Box color="#FFC5F1" text="13" checkboxId="checkbox1" />
          <Box color="#87DEFF" text="14" checkboxId="checkbox1" />
          <Box color="#D9D9D9" text="15" checkboxId="checkbox1" />
          <Box color="#9A66FF" text="16" checkboxId="checkbox1" />
          <Box color="#D9D9D9" text="17" checkboxId="checkbox1" />
          <Box color="#F9F16A" text="18" checkboxId="checkbox1" />
        </div>
        <div class="table-container">
          <Box color="#F9F16A" text="19" checkboxId="checkbox1" />
          <Box color="#9A66FF" text="20" checkboxId="checkbox1" />
          <Box color="#FFC5F1" text="21" checkboxId="checkbox1" />
          <Box color="#9A66FF" text="22" checkboxId="checkbox1" />
          <Box color="#D9D9D9" text="23" checkboxId="checkbox1" />
          <Box color="#87DEFF" text="24" checkboxId="checkbox1" />
        </div>
        <div class="table-container">
          <Box color="#9A66FF" text="25" checkboxId="checkbox1" />
          <Box color="#FFC5F1" text="26" checkboxId="checkbox1" />
          <Box color="#F9F16A" text="27" checkboxId="checkbox1" />
          <Box color="#D9D9D9" text="28" checkboxId="checkbox1" />
          <Box color="#9A66FF" text="29" checkboxId="checkbox1" />
          <Box color="#87DEFF" text="30" checkboxId="checkbox1" />
        </div>
      </div>
      {isModalVisible && (
        <div className="modal">
          <div className="modal-content">
            {popupType === "time" && (
              <div id="layer_bg" className="modal-container">
                <div id="popup" className="modal-content">
                  <div className="close-button" onClick={closePopup}>
                    x
                  </div>
                  <h2>Table No.</h2>
                  <div className="modalline"></div>
                  <hr className="modal-hr" />
                  <div className="content-area">
                    <button className="adjust-button" onClick={decreaseValue}>
                      -
                    </button>
                    <span className="value">{value}분</span>
                    <button className="adjust-button" onClick={increaseValue}>
                      +
                    </button>
                  </div>
                  <button className="plus-button" onClick={closePopup}>
                    시간추가
                  </button>
                </div>
              </div>
            )}
            {popupType === "heart" && (
              <div id="layer_bg" className="modal-container">
                <div id="popup" className="modal-content">
                  <div className="close-button" onClick={closePopup}>
                    x
                  </div>
                  <h2>Table No.</h2>
                  <div className="modalline"></div>
                  <hr className="modal-hr" />
                  <div className="content-area">
                    <button className="adjust-button" onClick={decreaseValue}>
                      -
                    </button>
                    <span className="value">{value}</span>
                    <button className="adjust-button" onClick={increaseValue}>
                      +
                    </button>
                  </div>
                  <button className="plus-button" onClick={closePopup}>
                    하트추가
                  </button>
                </div>
              </div>
            )}
            {popupType === "exit" && (
              <div id="layer_bg" className="modal-container">
                <div id="popup" className="modal-content">
                  <div className="close-button" onClick={closePopup}>
                    x
                  </div>
                  <h2>Table No.</h2>
                  <div className="modalline"></div>
                  <hr className="modal-hr" />
                  <div className="content-area">
                    <span className="content">퇴장처리하시겠습니까?</span>
                  </div>
                  <button className="plus-button" onClick={closePopup}>
                    퇴장처리
                  </button>
                </div>
              </div>
            )}
            {popupType === "mix" && (
              <div id="layer_bg" className="modal-container">
                <div id="popup" className="modal-content">
                  <div className="close-button" onClick={closePopup}>
                    x
                  </div>
                  <h2>Table No.</h2>
                  <div className="modalline"></div>
                  <hr className="modal-hr" />
                  <div className="content-area">
                    <span className="content">
                      <div>몇 번 테이블로 </div>
                      <div>합석처리하시겠습니까?</div>
                    </span>
                  </div>
                  <button className="plus-button" onClick={closePopup}>
                    퇴장처리
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
      <footer>
        <div className="admin-footer">
          <div className="footer-button">
            <button className="time-plus" onClick={() => openPopup("time")}>
              시간 추가
            </button>
            <button className="heart-plus" onClick={() => openPopup("heart")}>
              하트 충전
            </button>
            <button className="table-exit" onClick={() => openPopup("exit")}>
              퇴장 처리
            </button>
            <button className="table-mix" onClick={() => openPopup("mix")}>
              합석 처리
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
