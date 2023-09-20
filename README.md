TodoList

1. 개발하게 된 계기 - 내가 매일 해야할 일을 적어두고 관리하는 calendar가 있으면 좋겠다고 생각하여 개발을 시작했다.

2.  react typescript 및 nest js를 사용한 이유 -  
typescript를 통해 개발해 본 적이 없어서 typescript기반으로 react 및 nest js를 통하여 개발을 진행했다.

3. 추가개발 - 로그인 기능을 추가하여 해당 유저의 할일들만 볼 수 있도록 구현 하였다.
4. 추가개발예정 -> 관리자 기능으로 할일 부여 할 수 있게

5. 화면구성
### [1) 로그인 화면](https://github.com/Jungsooooooo/todolist_front_react_typescript/blob/master/src/login/Login.tsx)

![image](https://github.com/Jungsooooooo/todolist_front_react_typescript/assets/94541011/0666f2a4-69d7-4f82-acbf-5547db4fff98)
로그인 화면이며 아이디와 비밀번호를 입력 하면
해당 유저가 만든 할 일 들을 볼 수 있다.

로그인 시 서버에서 발급해주는 토큰을 cookie로 세팅해주고,

cookie 값을 통해 각 기능들에 대한 자격을 부여한다.

### [2) 회원가입 화면](https://github.com/Jungsooooooo/todolist_front_react_typescript/blob/master/src/login/JoinUser.tsx)
![image](https://github.com/Jungsooooooo/todolist_front_react_typescript/assets/94541011/d798c42f-17cd-438c-a1de-1bf550b300d6)

회원가입 화면이고 하나의 값이라도 없으면 아래에 값을 입력하라고 알려준다.
![image](https://github.com/Jungsooooooo/todolist_front_react_typescript/assets/94541011/21eab170-f7d2-4b17-b588-90a23033943e)

그리고 값을 다 입력했을 때 아이디를 중복 체크 하지 않으면 중복체크를 하라고 모달 창이 뜬다.
![image](https://github.com/Jungsooooooo/todolist_front_react_typescript/assets/94541011/7bed8cbc-5e18-4df9-a266-7fe4d031b90f)

그리고 아이디는 영문과 숫자로만 입력 할 수 있게 정규화 되어 있다.
![image](https://github.com/Jungsooooooo/todolist_front_react_typescript/assets/94541011/f3a3c4cc-9141-4118-a0a7-f5c79f0444ea)




### [3)메인화면](https://github.com/Jungsooooooo/todolist_front_react_typescript/blob/master/src/calendar/CalendarHome.tsx)
![image](https://github.com/Jungsooooooo/todolist_front_react_typescript/assets/94541011/00c3053d-0ca3-4efd-92c5-e21651600dc0)

### [3-1) 로그아웃 기능 추가](https://github.com/Jungsooooooo/todolist_front_react_typescript/blob/master/src/home/Home.tsx)
![image](https://github.com/Jungsooooooo/todolist_front_react_typescript/assets/94541011/0a673984-909d-48b2-a6d7-1725eaf7d133)
상단 버튼에 로그아웃 버튼을 추가하여 로그아웃 할 수 있도록 해놓았다.

달력에 그 날 해야할 일들이 보인다.
파란색인 데이터는 아직 진행중인 할 일, 초록색은 완료된 할 일을 의미한다.
화면 위 왼쪽에 할 일 적기 라는 버튼을 누르면

### [4)다음과 같은 화면이 뜬다.(할 일 적기)]()
![image](https://github.com/Jungsooooooo/todolist_front_react_typescript/assets/94541011/3875ebef-6d29-4235-a247-7eedaec80990)

5)할 일을 해야할 날짜를 선택하고 내용을 입력 후 생성 버튼을 누르면
![image](https://github.com/Jungsooooooo/todolist_front_react_typescript/assets/94541011/d3b9cf19-bb1c-4236-9bc2-522a8683b8fd)


선택할 수 있는 팝업창이 뜨며 ok를 누르면 데이터가 생성 된다.

![image](https://github.com/Jungsooooooo/todolist_front_react_typescript/assets/94541011/e6c6d746-52ef-49c4-8758-5d6d8d057f47)


### [6) 보기 전환 모드(달력 및 테이블 보기)](https://github.com/Jungsooooooo/todolist_front_react_typescript/blob/master/src/table/TodoTable.tsx)
6-1) 기본적으로 할 일 적기는 달력이 기본이며 테이블 모드로도 볼 수 있다.
![image](https://github.com/Jungsooooooo/todolist_front_react_typescript/assets/94541011/2ad6c4a8-d7c5-48ed-aa91-87528248d08f)
6-2) 테이블 보기에서는 월별, 일별로 볼 수 있게 구현 되어 있다.(일별 6-1번 참조)
![image](https://github.com/Jungsooooooo/todolist_front_react_typescript/assets/94541011/9b7a4103-2112-4013-b981-517813fda831)
6-3) 해당 할 일을 클릭하면 완료 처리 및 삭제가 가능되게 구현 되어 있다.
![image](https://github.com/Jungsooooooo/todolist_front_react_typescript/assets/94541011/36676b29-2434-4aa5-a5a3-24a82ef9b53b)


