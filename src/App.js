import React, { useState, useEffect } from "react";
import "./App.css";
import "./Font.css";

const Box = ({ number, color, isSelected, onBoxClick, onButtonClick }) => {
  const [selectedBox, setSelectedBox] = useState(null);
  const [selectedBoxes, setSelectedBoxes] = useState([]);

  const boxStyle = {
    backgroundColor: color,
    position: "relative", // 부모 요소의 position을 설정
  };

  const buttonStyle = {
    backgroundColor: isSelected ? "black" : "white",
    border: "none",
    borderRadius: "50%",
    padding: "10px",
    cursor: "pointer",
    position: "absolute", // 자식 요소의 position을 설정하여 부모 요소에 영향을 주지 않도록 함
    top: "10px", // 원하는 위치에 버튼을 배치할 수 있도록 bottom, top, left, right 등의 속성을 조절
    left: "10px",
  };

  const handleButtonClick = (event, boxNumber) => {
    event.stopPropagation(); // 버튼 클릭 이벤트 전파 중지
    onButtonClick(event, number);
  };

  return (
    <div className="box" style={boxStyle} onClick={() => onBoxClick(number)}>
      <span className="box-number">{number}</span>
      <button style={buttonStyle} onClick={handleButtonClick}></button>
    </div>
  );
};

function App() {
  const [isModalVisible, setModalVisible] = useState(false);
  const [popupType, setPopupType] = useState(null);
  const [selectedBox, setSelectedBox] = useState(null);
  const [selectedBoxes, setSelectedBoxes] = useState([]);
  const [boxtext, setBoxText] = useState("");

  const handleBoxClick = (boxNumber) => {
    setSelectedBox(boxNumber);
    const selectedBoxText = `Table No. ${boxNumber}`;
    setBoxText(selectedBoxText);
    openPopup("box");
  };

  const [isButtonSelected, setIsButtonSelected] = useState(false);
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const handleButtonClick = (event, boxNumber) => {
    event.stopPropagation(); // 버튼 클릭 이벤트 전파 중지

    if (selectedBoxes.includes(boxNumber)) {
      // 이미 선택된 상자일 경우 선택 해제
      setSelectedBoxes(selectedBoxes.filter((number) => number !== boxNumber));
    } else {
      // 선택되지 않은 상자일 경우 선택
      setSelectedBoxes([...selectedBoxes, boxNumber]);
    }
  };
  const handleAllClick = () => {
    // 버튼 클릭 시 선택 상태 토글
    setIsButtonSelected((prevIsButtonSelected) => !prevIsButtonSelected);
  };

  useEffect(() => {
    if (isButtonSelected) {
      // 버튼이 선택된 상태라면 모든 상자 선택
      const allBoxNumbers = Array.from({ length: 30 }, (_, index) => index + 1);
      setSelectedBoxes(allBoxNumbers);
    } else {
      // 버튼이 해제된 상태라면 모든 상자 선택 해제
      setSelectedBoxes([]);
    }
  }, [isButtonSelected]);

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

  const upValue = () => {
    setValue(value + 1); // 현재 값에 1을 더한 값으로 상태값 업데이트
  };

  const downValue = () => {
    setValue(value - 1); // 현재 값에서 1을 뺀 값으로 상태값 업데이트
  };

  const handlePopupClick = (type) => {
    if (selectedBoxes.length > 0) {
      openPopup(type);
    }
  };

  const openPopup = (type) => {
    setPopupType(type);
    toggleModal(); // 팝업을 열 때 모달을 보이도록 설정
  };

  const closePopup = () => {
    setPopupType(null);
    toggleModal(); // 팝업을 닫을 때 모달을 숨기도록 설정
    setSelectedBoxes([]);
    setValue(0);
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
        <button class="table_choice" onClick={handleAllClick}>
          선택
        </button>
      </div>
      <div class="box-list">
        <div class="table-container">
          <Box
            number={1}
            color="#9A66FF"
            isSelected={selectedBoxes.includes(1)}
            onBoxClick={handleBoxClick}
            onButtonClick={handleButtonClick}
          />
          <Box
            number={2}
            color="#D9D9D9"
            isSelected={selectedBoxes.includes(2)}
            onBoxClick={handleBoxClick}
            onButtonClick={handleButtonClick}
          />
          <Box
            number={3}
            color="#F9F16A"
            isSelected={selectedBoxes.includes(3)}
            onBoxClick={handleBoxClick}
            onButtonClick={handleButtonClick}
          />
          <Box
            number={4}
            color="#FFC5F1"
            isSelected={selectedBoxes.includes(4)}
            onBoxClick={handleBoxClick}
            onButtonClick={handleButtonClick}
          />
          <Box
            number={5}
            color="#9A66FF"
            isSelected={selectedBoxes.includes(5)}
            onBoxClick={handleBoxClick}
            onButtonClick={handleButtonClick}
          />
          <Box
            number={6}
            color="#F9F16A"
            isSelected={selectedBoxes.includes(6)}
            onBoxClick={handleBoxClick}
            onButtonClick={handleButtonClick}
          />
        </div>
        <div class="table-container">
          <Box
            number={7}
            color="#F9F16A"
            isSelected={selectedBoxes.includes(7)}
            onBoxClick={handleBoxClick}
            onButtonClick={handleButtonClick}
          />
          <Box
            number={8}
            color="#D9D9D9"
            isSelected={selectedBoxes.includes(8)}
            onBoxClick={handleBoxClick}
            onButtonClick={handleButtonClick}
          />
          <Box
            number={9}
            color="#87DEFF"
            isSelected={selectedBoxes.includes(9)}
            onBoxClick={handleBoxClick}
          />
          <Box
            number={10}
            color="#FFC5F1"
            isSelected={selectedBoxes.includes(10)}
            onBoxClick={handleBoxClick}
            onButtonClick={handleButtonClick}
          />
          <Box
            number={11}
            color="#87DEFF"
            isSelected={selectedBoxes.includes(11)}
            onBoxClick={handleBoxClick}
            onButtonClick={handleButtonClick}
          />
          <Box
            number={12}
            color="#F9F16A"
            isSelected={selectedBoxes.includes(12)}
            onBoxClick={handleBoxClick}
            onButtonClick={handleButtonClick}
          />
        </div>
        <div class="table-container">
          <Box
            number={13}
            color="#9A66FF"
            isSelected={selectedBoxes.includes(13)}
            onBoxClick={handleBoxClick}
            onButtonClick={handleButtonClick}
          />
          <Box
            number={14}
            color="#F9F16A"
            isSelected={selectedBoxes.includes(14)}
            onBoxClick={handleBoxClick}
            onButtonClick={handleButtonClick}
          />
          <Box
            number={15}
            color="#87DEFF"
            isSelected={selectedBoxes.includes(15)}
            onBoxClick={handleBoxClick}
            onButtonClick={handleButtonClick}
          />
          <Box
            number={16}
            color="#F9F16A"
            isSelected={selectedBoxes.includes(16)}
            onBoxClick={handleBoxClick}
            onButtonClick={handleButtonClick}
          />
          <Box
            number={17}
            color="#9A66FF"
            isSelected={selectedBoxes.includes(17)}
            onBoxClick={handleBoxClick}
            onButtonClick={handleButtonClick}
          />
          <Box
            number={18}
            color="#87DEFF"
            isSelected={selectedBoxes.includes(18)}
            onBoxClick={handleBoxClick}
            onButtonClick={handleButtonClick}
          />
        </div>
        <div class="table-container">
          <Box
            number={19}
            color="#F9F16A"
            isSelected={selectedBoxes.includes(19)}
            onBoxClick={handleBoxClick}
            onButtonClick={handleButtonClick}
          />
          <Box
            number={20}
            color="#D9D9D9"
            isSelected={selectedBoxes.includes(20)}
            onBoxClick={handleBoxClick}
            onButtonClick={handleButtonClick}
          />
          <Box
            number={21}
            color="#9A66FF"
            isSelected={selectedBoxes.includes(21)}
            onBoxClick={handleBoxClick}
            onButtonClick={handleButtonClick}
          />
          <Box
            number={22}
            color="#87DEFF"
            isSelected={selectedBoxes.includes(22)}
            onBoxClick={handleBoxClick}
            onButtonClick={handleButtonClick}
          />
          <Box
            number={23}
            color="#FFC5F1"
            isSelected={selectedBoxes.includes(23)}
            onBoxClick={handleBoxClick}
            onButtonClick={handleButtonClick}
          />
          <Box
            number={24}
            color="#9A66FF"
            isSelected={selectedBoxes.includes(24)}
            onBoxClick={handleBoxClick}
            onButtonClick={handleButtonClick}
          />
        </div>
        <div class="table-container">
          <Box
            number={25}
            color="#F9F16A"
            isSelected={selectedBoxes.includes(25)}
            onBoxClick={handleBoxClick}
            onButtonClick={handleButtonClick}
          />
          <Box
            number={26}
            color="#FFC5F1"
            isSelected={selectedBoxes.includes(26)}
            onBoxClick={handleBoxClick}
            onButtonClick={handleButtonClick}
          />
          <Box
            number={27}
            color="#87DEFF"
            isSelected={selectedBoxes.includes(27)}
            onBoxClick={handleBoxClick}
            onButtonClick={handleButtonClick}
          />
          <Box
            number={28}
            color="#FFC5F1"
            isSelected={selectedBoxes.includes(28)}
            onBoxClick={handleBoxClick}
            onButtonClick={handleButtonClick}
          />
          <Box
            number={29}
            color="#9A66FF"
            isSelected={selectedBoxes.includes(29)}
            onBoxClick={handleBoxClick}
            onButtonClick={handleButtonClick}
          />
          <Box
            number={30}
            color="#F9F16A"
            isSelected={selectedBoxes.includes(30)}
            onBoxClick={handleBoxClick}
            onButtonClick={handleButtonClick}
          />
        </div>
      </div>
      {isModalVisible && (
        <div className="modal">
          <div className="modal-content">
            {popupType === "box" && (
              <div id="layer_bg" className="modal-container">
                <div id="popup" className="modal-box">
                  <div className="boxtitle">
                    <div className="close-button" onClick={closePopup}>
                      x
                    </div>
                    <h2 className="boxname">{boxtext}</h2>
                  </div>
                  <hr className="box-hr" />
                  <div className="contentposi">
                    <div className="boxcontent">
                      <span className="boxvalue">인원수 : n</span>
                      <br />
                      <span className="boxvalue">입장시간 : 19:30</span>
                      <br />
                      <span className="boxvalue">퇴장시간 : 21:00</span>
                    </div>
                    <div className="boxbuttons">
                      <button className="boxbtn" onClick={closePopup}>
                        시간추가
                      </button>
                      <button className="boxbtn" onClick={closePopup}>
                        하트추가
                      </button>
                      <button className="boxbtn" onClick={closePopup}>
                        퇴장처리
                      </button>
                      <button className="boxbtn" onClick={closePopup}>
                        합석처리
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
            {popupType === "time" && (
              <div id="layer_bg" className="modal-container">
                <div id="popup" className="modal-content">
                  <div className="close-button" onClick={closePopup}>
                    x
                  </div>
                  <h2 className="classname">
                    Table No. {selectedBoxes.join(", ")}
                  </h2>
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
                  <h2 className="classname">
                    Table No. {selectedBoxes.join(", ")}
                  </h2>
                  <div className="modalline"></div>
                  <hr className="modal-hr" />
                  <div className="content-area">
                    <button className="adjust-button" onClick={downValue}>
                      -
                    </button>
                    <span className="value">{value}</span>
                    <button className="adjust-button" onClick={upValue}>
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
                  <h2 className="classname">
                    Table No. {selectedBoxes.join(", ")}
                  </h2>
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
                  <h2 className="classname">
                    Table No.{selectedBoxes.join(", ")}
                  </h2>
                  <div className="modalline"></div>
                  <hr className="modal-hr" />
                  <div className="content-area">
                    <span className="content">
                      <div>몇 번 테이블로 </div>
                      <div>합석처리하시겠습니까?</div>
                    </span>
                  </div>
                  <button className="plus-button" onClick={closePopup}>
                    합석처리
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
            <button
              className="time-plus"
              onClick={() => {
                handlePopupClick("time");
              }}
            >
              시간 추가
            </button>
            <button
              className="heart-plus"
              onClick={() => {
                handlePopupClick("heart");
              }}
            >
              하트 충전
            </button>
            <button
              className="table-exit"
              onClick={() => {
                handlePopupClick("exit");
              }}
            >
              퇴장 처리
            </button>
            <button
              className="table-mix"
              onClick={() => {
                handlePopupClick("mix");
              }}
            >
              합석 처리
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
