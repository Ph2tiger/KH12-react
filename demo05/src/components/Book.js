import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { FaPenToSquare, FaTrashCan } from "react-icons/fa6";
import { Modal } from "bootstrap";
import "./Book.css"


const Book = (porps) => {
  const [bookList, setBookList] = useState([]);

    // const loadBook = ()=>{
    //     //서버에 있는 도서 정보를 불러와서 state에 반영하는 코드
    //     axios({
    //         url:"http://localhost:8080/book/",
    //         method:"get"
    //     })
    //     .then(response=>{
    //         setBookList(response.data);
    //     })
    //     .catch(err=>{
    //         window.alert("통신 오류 발생");
    //     });
    // };

    const loadBook = async () => {
      const response = await axios({
          url:`${process.env.REACT_APP_REST_API_URL}/book/`,
          method:"get"
      });
      setBookList(response.data);
  };

  useEffect(()=>{
      loadBook();
  }, []);

  //도서 삭제
  const deleteBook = (book) => {
    const choice = window.confirm("정말 삭제하시겠습니까?");
    if (choice === false) return;

    axios({
      //url: "http://localhost:8080/book/"+book.bookId,
      url:`${process.env.REACT_APP_REST_API_URL}/book/${book.bookId}`,
      method: "delete"
    })
      .then(response => {
        loadBook();//목록 갱신
      })
      .catch(err => { })
  };

  //모달 관련 기능과 참조
  const bsModal = useRef();
    // 모달 열기 함수
    const openModal = () => {
      const modal = new Modal(bsModal.current);
      modal.show();
    };
  
    // 모달 닫기 함수
    const closeModal = () => {
      const modal = Modal.getInstance(bsModal.current);
      modal.hide();
  
      clearBook();
    };


    //등록 수정과 관련된 state와 기능
    const [book, setBook] = useState({bookTitle:"", bookAuthor:"", bookPublicationDate:"", 
			bookPrice:"", bookPublisher:"", bookPageCount:"", bookGenre:"" });

      const changeBook = (e)=>{
        setBook({
            ...book,
            [e.target.name] : e.target.value
        })
    };
    const clearBook = ()=>{
        setBook({
            bookTitle:"", bookAuthor:"", bookPublicationDate:"", bookPrice:0,
            bookPublisher:"", bookPageCount:0, bookGenre:""
        });
    };


    // const saveBook = ()=>{
    //   //book 유효성 검가 및 차단 코드
    //   axios({
    //     url: `http://localhost:8080/book`,
    //     method: "post",
    //     data: book,
    //     //data:{...book}
    //   })
    //   .then(response => {
    //     loadBook();
    //     closeModal();
    //   })
    //   .catch(err => { })
    // };

    //async 함수와 await 키워드를 사용한 간소화 작업이 가능
    //- 비동기 작업을 동기화된 코드로 작성할 수 있다
    const saveBook = async ()=>{
      const response = await axios({
        url:`${process.env.REACT_APP_REST_API_URL}/book/`,
          method:"post",
          data:book
      });
      loadBook();
      closeModal();
  };

    const editBook = (target)=>{
      setBook({...target});
      openModal();
    };
    
    const updateBook = ()=>{
      //검사 후 차단 코드

      const copyBook = {...book};
      delete copyBook.bookId;
      axios({
        url:`${process.env.REACT_APP_REST_API_URL}/book/${book.bookId}`,
        method:"put",
        data: copyBook
      })
      .then(response=>{
        loadBook();
        closeModal();
      });
    };

  return (
    <>
      <div className="row">
        <div className="col">
          <button className="btn btn-success" onClick={openModal}>
            도서추가
          </button>
        </div>
      </div>

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
              <th className="pc-only">출판사</th>
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
                  <td className="pc-only">{book.bookPublisher}</td>
                  <td>
                    {/* 아이콘 자리 */}
                    <FaPenToSquare className="text-warning" 
                      onClick={e=>editBook(book)}/>
                    <FaTrashCan className="text-danger"
                      onClick={e=>deleteBook(book)} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      <div className="modal fade" ref={bsModal}
        data-bs-backdrop="static" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title">
                {book.bookId === undefined ?'신규 도서 등록': '${book.bookId}번 도서 수정'}
              </h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">

              <div className="row">
                <div className="col">
                  <label className="from-label">제목</label>
                  <input type="text" name="bookTitle" className="form-control" 
                  value={book.bookTitle} onChange={changeBook}/>
                </div>
              </div>  

              <div className="row mt-4">
                <div className="col">
                  <label className="from-label">저자</label>
                  <input type="text" name="bookAuthor" className="form-control" 
                  value={book.bookAuthor} onChange={changeBook}/>
                </div>
              </div> 

              <div className="row mt-4"><div className="col">
                            <label className="form-label">장르</label>
                            <select name="bookGenre" value={book.bookGenre} onChange={changeBook} className="form-select">
                                <option value="">선택하세요</option>
                                <option>다큐멘터리</option>
                                <option>판타지/무협</option>
                                <option>소설</option>
                                <option>자서전</option>
                                <option>로맨스</option>
                                <option>수필</option>
                                <option>추리</option>
                            </select>
                        </div></div>

              <div className="row mt-4">
                <div className="col">
                  <label className="from-label">가격</label>
                  <input type="number" name="bookPrice" className="form-control" 
                  value={book.bookPrice} onChange={changeBook}/>
                </div>
              </div>

              <div className="row mt-4">
                <div className="col">
                  <label className="from-label">출판일</label>
                  <input type="date" name="bookPublicationDate" className="form-control" 
                  value={book.bookPublicationDate} onChange={changeBook}/>
                </div>
              </div>

              <div className="row mt-4">
                <div className="col">
                  <label className="from-label">페이지수</label>
                  <input type="number" name="bookPageCount" className="form-control" 
                  value={book.bookPageCount} onChange={changeBook}/>
                </div>
              </div>

              <div className="row mt-4">
                <div className="col">
                  <label className="from-label">출판사</label>
                  <input type="text" name="bookPublisher" className="form-control" 
                  value={book.bookPublisher} onChange={changeBook}/>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn btn-secondary" onClick={closeModal}>닫기</button>
              {book.bookId === undefined ? 
                        <button className="btn btn-success" onClick={saveBook}>
                            저장
                        </button>
                        : 
                        <button className="btn btn-success" onClick={updateBook}>
                            수정
                        </button>
                        }
            </div>
          </div>
        </div>
      </div>

    </>
  )
}

export default Book;