import { Outlet, Routes, Route } from "react-router-dom";
import "./App.css";
import Footer from "./components/Footer";
import Nav from "./components/Nav";
import MainPage from "./Pages/MainPage";
import DetailPage from "./Pages/DetailPage";
import SearchPage from "./Pages/SearchPage";

const Layout = () => {
  // Nav와 Footer는 어느 페이지를 가든 존재해야 하므로 상시 두고, Outlet에 페이지들을 담음
  return (
    <div>
      <Nav />

      <Outlet />

      <Footer />
    </div>
  );
};

//  / 경로에 접속하면 Layout 컴포넌트와 MainPage 컴포넌트가 동시에 렌더링되지 않고, Layout 내부에서 MainPage가 렌더링
//  /:movieId와 같이 설정된 path에 : 뒤에 변수명을 넣으면 해당 부분은 동적인 파라미터가 됩니다.

function App() {
  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<MainPage />} />
          <Route path=":movieId" element={<DetailPage />} />
          <Route path="search" element={<SearchPage />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
