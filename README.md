npm install gh-pages --save-dev로 깃허브 페이지 모듈 설치하여 깃허브로 배포

    "predeploy" : "npm run build",
    "deploy" : "gh-pages -d build"  이 둘을 script에 추가함

index.js에 basename을 추가 (내용은 저장소 이름)

  <BrowserRouter basename="react-practice-netflix-clone">
    <App />
  </BrowserRouter>
