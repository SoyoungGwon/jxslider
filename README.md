﻿﻿jxslider
-
피씨와 모바일에서 슬라이드 배너를 표현하기 위한 플러그인이며 제이쿼리를 `head 태그` 사이에 필수로 넣어야한다.
제이쿼리 버전에 버그 영향이 있지만  최상위 버전을 지양한다면 익스플로러 8에서도 작동이 가능한 플러그인이다.

#### html

 ``` sh
 <div class="jx-slider" id="jx-slider">

      <div class="jx-box">
            <div class="jx-wrap">
                  <div class="jx-unit"><div class="jx-cont"><span class="thumb"><img src="resources/imgs/img_1.jpg" alt=""></span></div></div>
                  <div class="jx-unit"><div class="jx-cont"><span class="thumb"><img src="resources/imgs/img_2.jpg" alt=""></span></div></div>
                  <div class="jx-unit"><div class="jx-cont"><span class="thumb"><img src="resources/imgs/img_3.jpg" alt=""></span></div></div>
            </div>
      </div>

      <div class="jx-control"> </div> <!-- 페이징을 생성 노드-->

      <button type="button" class="jx-btn jx-left">&lt; </button> <!-- 좌버튼 생성 노드 -->
      <button type="button" class="jx-btn jx-right">&gt; </button> <!-- 우버튼 생성 노드 -->

      <button type="button" class="jx-stop">stop</button> <!-- 정지 버튼 생성 노드 -->
</div>

````


#### javascript

```` sh
<head>
    <script src="https://ajax.aspnetcdn.com/ajax/jQuery/jquery-1.9.1.js"></script>
    <script src="https://code.jquery.com/jquery-migrate-1.2.1.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery-easing/1.4.1/jquery.easing.js"></script>
    <script src="resources/js/jxslider-ver-x2.js"></script>
</head>

<body>

..기본 슬라이드 객체 생략..

<script>
      var option =
      {
            nView : 3
      };
      new JXSLIDER( $("#jx-slider") ,  option );
</script>

</body>

````


### option

Option | Type | Default | Description
------ | ---- | ------- | -----------
nView            |  number  |  1  | 화면에 몇개의 객체를 보여줄것인가
sDirection      |  string  |  horizontal  | 움직이는 방향 ( horizontal  or vertical )
nMargin         |  number  | 0 | 객체마다 간격
nAutoSpeed   |  number  |  3000  | 자동롤링 속도
nUlSpeed       |  number  |  400 | 움직이는 속도
bAuto           |  boolean  |  false  | 자동롤링
bDrag         |  boolean  |  true  | 드래그 가능
bLoop           |  boolean  |  true  | 무한 반복
bResize         |  boolean  |  true  | 리사이징 `리사이징을 하지 않을경우 모바일에서 하나의 컨텐츠가 클경우 문제가 생길수도 있다`
nSans           |  number  |  10  | 드래그 민감도
bGroupMove  |  boolean  |  false  | 이동을 nView에 값에 따라서 이동
bAction         |  boolean  |  false  | 객체를 클릭하면 칸 차이를 인식하여 이동  `링크가 있는경우에는 현제 활성화된=on 객체는 링크 연결이 되고 나머지는 움직이게 된다.`
nStart            |  number  |  0  | 몇번째 객체를 처음부터 보여줄려할때 사용. 1을 사용하면 앞에서 1개의 객체를 제일 뒤로 붙인다. `단. nView = 3, bGroupMove = true 일경우는 3개씩 페이징 이동하기 때문에 1이면 3개씩 단위로 뒤에 이동하여 붙게 된다. nBackCopy 옵션은 작동안하게 된다`
nBackCopy     |  number  |  0  | 뒤객체를 숫자만큼 앞으로 붙여서 센터 정렬처럼 유사하게 보일려 할때 사용. `부모의 사이즈나 위치는 조정해야함. nStart = 0 값을 가져야 함. bLoop = true 여야함.`
oResponsive     |  array  |  []  | 브라우저에 맞게 반응형을 하기 위함. `bGroupMove = true 라면 false로 변하게 된다.`
bAaptiveHeight |  boolean  |  false  | 활성화된 객체의 높이값에 맞춰서 슬라이드 높이를 조절한다. `nView = 1 일때 사용하는게 좋으나 아닐때는 좌우에 나타난 정보들을 숨겼다가 나타나게 css를 추가하는게 좋다.`
reCallFnc |  string  |  -  | 슬라이드가 끝난후 외부에서 넘긴 함수를 실행시키는 방법 `외부에서 함수를 정의하고 속성에 스트링 타입으로 함수명을 적어주면 된다. ex ) {reCallFnc : testCall} 넘겨주고 function testCall(v) { console.log(v); } `




