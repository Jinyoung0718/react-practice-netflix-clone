import React, { useState, useEffect } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom"; // useNavigation으로 추가된 경로에 따라 데이터를 추가해야하므로 location을 사용 = app.js에서 보면 path가 search이므로 nav.js에서 navigate(`/search?q=${e.target.value}`); <- 이런식으로 설정하였으니 path에 따라 SearchPage로 이동이 된다. app.js에서 path를 search로 설정했기 때문
import axios from "../../api/axios";
import "./SearchPage.css";
import { useDebounce } from "../../hooks/useDebounce";

export default function SearchPage() {
  const navigate = useNavigate();
  const [searchResults, setsearchResults] = useState([]);

  const useQuery = () => {
    console.log("useLocation()", useLocation()); // 콘솔로 찍어보면 pahtname은 /search이고 search는 ?q={e.target.value}이다
    return new URLSearchParams(useLocation().search);
  };

  let query = useQuery(); // 덩어리를 가져왔고 그걸 헤체를 해야 한다고 생각하면 편함
  const searchTerm = query.get("q"); // q라는 키에 맞는 벨류를 내놓음
  const debounceSearchTerm = useDebounce(searchTerm, 500); // useDebounce 훅을 사용하여 searchTerm을 지연시킨 값을 가져오고 있습니다, searchTerm과 500 밀리초의 딜레이를 적용하여 값을 반환합니다.
  useEffect(() => {
    if (debounceSearchTerm) {
      fetchSearchMovie(debounceSearchTerm);
    }
  }, [debounceSearchTerm]); // 검색이 바뀔 때마다 실행되어야 하기에 useeffet 마지막 배열에 변수 삽입한다

  console.log("디바운스", debounceSearchTerm);

  const fetchSearchMovie = async (searchTerm) => {
    try {
      const request = await axios.get(
        `/search/multi?include_adult=false&query=${searchTerm}` // /search/multi는 가능한 옵션을 제공할 수 있는 엔드포인트이고 이것은 api설명서에서 확인가능, ? 이후로 쿼리문자
      );
      console.log(request);
      setsearchResults(request.data.results);
    } catch (error) {
      console.log("error", error);
    }
  };

  const renderSearchResults = () => {
    return searchResults.length > 0 ? ( // earchResults.length > 0 조건문을 사용하고 있기 때문에, searchResults 배열에 데이터가 존재할 때만 해당 코드 블록이 실행
      <section className="search-container">
        {searchResults.map((movie) => {
          // movie는 searchResults 배열에서 각각의 요소를 가리킴
          if (movie.backdrop_path !== null && movie.media_type !== "person") {
            const movieImageUrl =
              "https://image.tmdb.org/t/p/w500" + movie.backdrop_path;
            return (
              <div className="movie" key={movie.id}>
                <div
                  onClick={() => navigate(`/${movie.id}`)} // img를 클릭시 그 영화의 아이디에 따른 주소창으로 이동이 되고, app.js에서 보면 detail page의 path가 movie id이므로 detailpage로 이동된다
                  className="movie__column-poster"
                >
                  <img
                    src={movieImageUrl}
                    alt="movie"
                    className="movie__poster"
                  />
                </div>
              </div>
            );
          }
        })}
      </section>
    ) : (
      <section className="no-results">
        <div className="no-results__text">
          <p>찾고자하는 검색어"{debounceSearchTerm}"에 맞는 영화가 없습니다.</p>
        </div>
      </section>
    );
  };

  return renderSearchResults();
}

/*
  
 https://www.example.com/search?q=ategory=books&page=2와
 같이 되어있다면, ? 이후의 부분이 query 부분이 됩니다. 
 URLSearchParams를 사용하면 
 category=books&page=2와 같은 문자열을 쉽게 다룰 수 있습니다.

 URLSearchParams 객체를 사용하면 URL 쿼리 문자열을 해석하여 각 매개변수의 값을 쉽게 가져올 수 있습니다.
 이때 get() 메서드는 특정 매개변수의 값을 가져오는 데 사용

  */

// console.log("useLocation()", useLocation()); 콘솔로 찍어보면 pahtname은 /search이고 search는 ?q={e.target.value}이다
