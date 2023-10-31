import { useEffect, useState } from "react";

const Exam07 = ()=>{

  const [member,setMember] = useState({//입력데이터
    memberId : "",
    memberPw : "",
    memberPwRe : ""
  });

  const [result, setResult] = useState({//검사결과
    memberId : false,
    memberPw : false,
    memberPwRe : false
  });
  //입력데이터가 변하면 검사결과가 자동으로 계산되도록 처리
  useEffect(()=>{
        //console.log("member가 변했습니다");
        //ID검사
        const idRegex = /^[a-z][a-z0-9]{7,19}$/;
        const idMatch = idRegex.test(member.memberId);

        //PW검사
        const pwRegex = /^[A-Za-z0-9!@#$]{8,16}$/;
        const pwMatch = pwRegex.test(member.memberPw);

        //PW-RE검사
        const pwReMatch = member.memberPw.length > 0 
                                        && member.memberPw === member.memberPwRe;

        setResult({
            memberId : idMatch,
            memberPw : pwMatch,
            memberPwRe : pwReMatch
        });
  },[member]);


  //객체의 상태를 한 번에 변경하는 함수를 구현
  const changeMember = (e)=>{
    //console.log(e.target);//이밴트 발생 태그 확인
    //console.log(e.target.name, e.target.value)//이름,값 확인

    //Member에서 이밴트가 발생한 태그명에 해당하는 필드만 입력값으로 바꾸고 나머진 그대로 둬라
    // ...Member는 Member의 나머지 항목을 의미(rest연산)
    //- 객체에 [] 표시를 쓰면 필드명을 변수로 지정할 수 있다
    setMember({
      ...member,
      [e.target.name]:e.target.value
    });
  };

  return(
    <div className="container-fluid">
    <div className="row">
        <div className="col-md-10 offset-md-1">
            
            {/* 점보트론 */}
            <div className="p-4 text-light bg-dark rounded">
                <h1>객체 상태 변수 문제</h1>
            </div>

            <form autoComplete="off">

            <div className="row mt-4">
                <div className="col">
                    <label className="form-label">아이디</label>
                    <input type="text" name="memberId" className="form-control"
                            value={member.memberId} onChange={changeMember}/>
                </div>
            </div>

            <div className="row mt-4">
                <div className="col">
                    <label className="form-label">비밀번호</label>
                    <input type="password" name="memberPw" className="form-control"
                            value={member.memberPw} onChange={changeMember}/>
                </div>
            </div>

            <div className="row mt-4">
                <div className="col">
                    <label className="form-label">비밀번호 확인</label>
                    <input type="password" name="memberPwRe" className="form-control"
                            value={member.memberPwRe} onChange={changeMember}/>
                </div>
            </div>

            </form>

            <div className="row mt-4">
                <div className="col">
                    <button type="button" className="btn btn-primary w-100">회원가입</button>
                </div>
            </div>

        </div>
    </div>
</div>
  )

}

export default Exam07;