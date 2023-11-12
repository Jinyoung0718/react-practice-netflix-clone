import React, { useState, useEffect } from "react";
import "./Nav.css";
import { useNavigate } from "react-router-dom";

export default function Nav() {
  const [show, setShow] = useState(false);
  const [searchValue, setsearchValue] = useState("");
  const navigate = useNavigate(); // 검색을 칠 때마다 경로에 추가

  useEffect(() => {
    window.addEventListener("scroll", () => {
      // 스크롤 이벤트를 리스닝하는 이벤트 리스너를 등록
      if (window.scrollY > 50) {
        setShow(true);
      } else {
        setShow(false);
      }
    });

    return () => {
      // 이벤트 리스너를 제거하기 위한 반환 함수
      window.removeEventListener("scroll", () => {});
    };
  }, []); // 빈 배열([])이 useEffect 함수의 두 번째 인수로 전달되고, 이 배열에 특정 상태 또는 변수를 넣으면 해당 상태나 변수가 변경될 때 useEffect가 다시 실행됩니다. 빈 배열([])은 의존성이 없음을 나타내며, 이 경우 useEffect는 컴포넌트가 처음 마운트될 때 한 번만 실행

  // 밑의 {`nav ${show && "nav__black"}`의 nav의 자리는 항상 할당되는 클래스 이름이며, ${show && "nav__black"}는 조건부로 클래스 이름을 할당합니다. show 변수가 true이면 "nav__black" 클래스가 추가됩니다
  // && 연산자는 조건을 검사하고, 조건이 true일 때 두 번째 피연산자를 반환

  const handleChange = (e) => {
    setsearchValue(e.target.value);
    navigate(`/search?q=${e.target.value}`);
    // navigate: 내가 입력하는 값이 주소창에 입력이 됨
    // /search: 이 부분은 경로(path)를 나타내고 ?q= 쿼리 매개변수를 나타내며 공식처럼 ?q=가 key이고 뒤에가 value이다
  };
  // show가 true일 때만 "nav__black" 클래스가 적용되고, show가 false거나 다른 거라면 해당 클래스는 적용되지 않게 될 것
  return (
    <nav className={`nav ${show && "nav__black"}`}>
      <img
        alt="Netflix logo"
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/1280px-Netflix_2015_logo.svg.png"
        className="nav__logo"
        onClick={() => window.location.reload()} // 클릭 시 리로드 하게 만듦
      />

      <input
        value={searchValue}
        onChange={handleChange}
        className="nav__input"
        type="text"
        placeholder="영화를 검색해주세요"
      />

      <img
        alt="User logged"
        src="https://wallpapers.com/images/hd/netflix-profile-pictures-1000-x-1000-88wkdmjrorckekha.jpg"
        className="nav__avatar"
      />
    </nav>
  );
}
