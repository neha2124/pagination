import "./styles.css";
import { useEffect, useState } from "react";

export default function App() {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);

  const fetchData = async () => {
    try {
      const data = await fetch("https://dummyjson.com/products?limit=100");
      const response = await data.json();
      setData(response.products);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  // console.log(data);
  // console.log(pagination)
  const handlePage = (selectedPage) => {
    setPage(selectedPage);
  };

  return (
    <div className="App">
      {data ? (
        <div className="cards">
          {data.slice(page * 10 - 10, page * 10).map((item, i) => {
            return (
              <div className="card" key={i}>
                <img src={item.thumbnail} alt="img" />
                <span>{item.title}</span>
              </div>
            );
          })}
        </div>
      ) : (
        "Loading"
      )}
      {/* {data && setPagination([data.length])} */}
      <div className="pagination">
        <button
          onClick={() => handlePage(page + 1)}
          className={page >= data.length / 10 ? "disable" : ""}
        >
          ▶
        </button>
        {[...Array(data.length / 10)].map((_, i) => {
          return (
            <span
              onClick={() => handlePage(i + 1)}
              className={page === i + 1 ? "selected" : ""}
            >
              {i + 1}
            </span>
          );
        })}
        <button
          onClick={() => handlePage(page - 1)}
          className={page <= 1 ? "disable" : ""}
        >
          ◀
        </button>
      </div>
    </div>
  );
}
