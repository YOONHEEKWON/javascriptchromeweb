//명언
(function () {
  const API_URL = "https://random-quote.hyobb.com/";
  const quoteElement = document.getElementById("quote");

  const setQuote = (result) => {
    quoteElement.textContent = result;
  };

  const getQuote = async () => {
    try {
      const data = await fetch(API_URL).then((res) => res.json());
      const result = data[1].respond;
      setQuote(result);
    } catch (err) {
      console.log(err);
      setQuote("노력은 배신하지않는다");
    }
  };

  getQuote();
})();
