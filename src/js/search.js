(function () {
  //즉시실행함수 처리 함수스코프로 변수를 접근 못하게
  //search.js

  const searchInput = document.getElementById("search-input");

  const showSearchResult = () => {
    let serchWord = searchInput.value;
    window.location.href = `https://www.google.com/search?q=${serchWord}`;
    serchWord = "";
  };

  //enter키 입력
  const enterKey = (evt) => {
    if (evt.code === "Enter") {
      showSearchResult();
    }
  };
  searchInput.addEventListener("keypress", (evt) => {
    enterKey(evt);
  });
})();
