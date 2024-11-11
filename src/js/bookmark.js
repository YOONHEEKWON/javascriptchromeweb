(function () {
  //bookmark
  const newBookMarkForm = document.getElementById("bookmark-item-input-form");
  const bookmarkItemList = document.getElementById("bookmark-list");

  // 로컬 스토리지에서 bookmarkList 불러오기
  let bookmarkList = [];
  if (localStorage.getItem("bookmarkList")) {
    try {
      bookmarkList = JSON.parse(localStorage.getItem("bookmarkList"));
    } catch (e) {
      console.error("JSON parsing error:", e);
      bookmarkList = []; // 파싱 오류 시 빈 배열로 초기화
    }
  } else {
    localStorage.setItem("bookmarkList", JSON.stringify(bookmarkList));
  }

  const addBookMarkItem = () => {
    console.log(bookmarkList);
    let name = document.getElementById("new-bookmark-name-input").value;
    let url = document.getElementById("new-bookmark-url-input").value;
    let createAt = Date.now();
    console.log(name, url, createAt);

    bookmarkList.push({
      name: name,
      url: url,
      createAt: createAt,
    });
    localStorage.setItem("bookmarkList", JSON.stringify(bookmarkList));

    // 입력 필드 초기화
    document.getElementById("new-bookmark-name-input").value = "";
    document.getElementById("new-bookmark-url-input").value = "";
    setBookmarkItem({ name: name, url: url, createAt: createAt });
    newBookmarkToggle();
  };

  let isAddBtnClick = false;
  newBookMarkForm.style.display = "none";

  const newBookmarkToggle = () => {
    isAddBtnClick = !isAddBtnClick;
    isAddBtnClick
      ? (newBookMarkForm.style.display = "block")
      : (newBookMarkForm.style.display = "none");
  };

  const deleteBookmarkItem = (id) => {
    const isDelete = window.confirm("정말 삭제 하시겠습니까 ?");
    if (isDelete) {
      bookmarkList = bookmarkList.filter((elm) => elm.createAt !== id);
      localStorage.setItem("bookmarkList", JSON.stringify(bookmarkList));
      document.getElementById(`bookmark-item-${id}`).remove();
    }
  };

  const setBookmarkItem = (item) => {
    const bookmarkItem = document.createElement("div");
    bookmarkItem.classList.add("bookmark-item");
    bookmarkItem.id = `bookmark-item-${item.createAt}`;

    const bookmarkInfo = document.createElement("div");
    bookmarkInfo.classList.add("bookmark-info");

    const boomarkUrl = document.createElement("a");
    boomarkUrl.classList.add("bookmark-url");
    boomarkUrl.href = item.url;

    const urlIcon = document.createElement("div");
    urlIcon.classList.add("url-icon");

    const urlIconImg = document.createElement("img");
    urlIconImg.src = `https://www.google.com/s2/favicons?domain_url=${item.url}`;

    const nameElement = document.createElement("div");
    nameElement.classList.add("name");
    nameElement.textContent = item.name;

    const bookmarkDelBtn = document.createElement("div");
    bookmarkDelBtn.textContent = "삭제";
    bookmarkDelBtn.classList.add("del-btn");
    bookmarkDelBtn.addEventListener("click", () => {
      deleteBookmarkItem(item.createAt);
    });

    bookmarkItem.appendChild(bookmarkInfo);
    bookmarkItem.appendChild(bookmarkDelBtn);
    bookmarkInfo.appendChild(boomarkUrl);
    boomarkUrl.appendChild(urlIcon);
    boomarkUrl.appendChild(nameElement);
    urlIcon.append(urlIconImg);

    bookmarkItemList.appendChild(bookmarkItem);
  };

  const setBookmarkList = () => {
    bookmarkList.forEach((item) => {
      setBookmarkItem(item);
    });
  };

  document
    .getElementById("bookmark-item-add-btn")
    .addEventListener("click", newBookmarkToggle);
  document.getElementById("add-btn").addEventListener("click", addBookMarkItem);
  document
    .getElementById("cancel-btn")
    .addEventListener("click", newBookmarkToggle);

  setBookmarkList();
})();
