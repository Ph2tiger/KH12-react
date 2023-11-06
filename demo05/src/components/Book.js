import axios from "axios";
import { useEffect, useState } from "react";
import {FaHighlighter, FaTrashCan} from "react-icons/fa6";

import "./Book.css"

const Book = (porps)=>{
  const [bookList, setBookList] = useState([]);
  useEffect(()=>{
    //서버에 있는 도서 정보를 불러와서 state에 반영하는 코드
    axios({
      url: "http://localhost:8080/book/",
      method: "get"
    })
    .then(respons => {
      setBookList(respons.data)
    })
    .catch(err => {
      window.alert("통신 오류 발생")
    });
  }, []);

  return(
    <>
      <div className="row">
        <div className="col">
          <h1>도서 관리</h1>
          <p>도서관리 페이지</p>
        </div>
      </div>

      <div className="row mt-4 w-100">
        <div className="col">
          <table className="table">
            <thead>
              <th className="pc-only">번호</th>
              <th>제목</th>
              <th>저자</th>
              <th className="pc-only">장르</th>
              <th>가격</th>
              <th className="pc-only">출판일</th>
              <th className="pc-only">페이지 수</th>
              <th>출판사</th>
              <th>관리</th>
            </thead>
            <tbody>
              {bookList.map((book, index) => (
                <tr key={book.bookId}>
                  <td className="pc-only">{book.bookId}</td>
                  <td>{book.bookTitle}</td>
                  <td>{book.bookAuthor}</td>
                  <td className="pc-only">{book.bookGenre}</td>
                  <td>{book.bookPrice}</td>
                  <td className="pc-only">{book.bookPublicationDate}</td>
                  <td className="pc-only">{book.bookPageCount}</td>
                  <td>{book.bookPublisher}</td>
                  <td>
                    <FaHighlighter/><FaTrashCan/>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  )
}

export default Book;