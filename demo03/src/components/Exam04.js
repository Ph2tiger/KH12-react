import { useState } from "react";

const Exam04 = () => {
  const [text, setText] = useState(""); // 텍스트 내용을 저장하는 상태
  const maxByte = 1000; // 최대 byte 수

  const handleTextChange = (event) => {
    const textValue = event.target.value;
    setText(textValue);

    // 문자열을 byte 수로 변환
    const byteCount = new TextEncoder().encode(textValue).length;
    setTextCount(byteCount);
  };

  const [textCount, setTextCount] = useState(0);

  return (
    <>
      <h2>(Q) 주말에 뭐하세요?</h2>
      <textarea
        value={text}
        onChange={handleTextChange}
        style={{ minHeight: "400px", minWidth: "800px" }}
      ></textarea>
      <br />
      <span>
        {textCount}/{maxByte} byte
      </span>
    </>
  );
};

export default Exam04;
