﻿jxslider
-
피씨와 모바일에서 슬라이드 배너를 표현하기 위한 플러그인이며 제이쿼리를 `head 태그` 사이에 필수로 넣어야한다.



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

      <button type="button" class="jx-btn jx-left">&lt; </button>
      <button type="button" class="jx-btn jx-right">&gt; </button>
      <div class="jx-control"> </div>
      <button type="button" class="jx-stop">stop</button>
</div>

````


#### javascript

```` sh

<script>

var option =
{
      nView : 3
};

new JXSLIDER( $("#jx-slider") ,  option );

</script>

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
bResize         |  boolean  |  true  | 리사이징
nSans           |  number  |  10  | 드래그 민감도
bGroupMove  |  boolean  |  false  | 이동을 nView에 값에 따라서 이동
bAction         |  boolean  |  false  | 객체를 클릭하면 칸 차이를 인식하여 이동  `링크가 있는경우에는 현제 활성화된=on 객체는 링크 연결이 되고 나머지는 움직이게 된다.`
nStart            |  number  |  0  | 몇번째 객체를 처음부터 보여줄려할때 사용. 1을 사용하면 앞에서 1개의 객체를 제일 뒤로 붙인다. `단. nView = 3, bGroupMove = true 일경우는 3개씩 페이징 이동하기 때문에 1이면 3개씩 단위로 뒤에 이동하여 붙게 된다. nBackCopy 옵션은 작동안하게 된다`
nBackCopy     |  number  |  0  | 뒤객체를 숫자만큼 앞으로 붙여서 센터 정렬처럼 유사하게 보일려 할때 사용. `부모의 사이즈나 위치는 조정해야함. nStart = 0 값을 가져야 함. bLoop = true 여야함.`
oResponsive     |  array  |  []  | 브라우저에 맞게 반응형을 하기 위함. `bGroupMove = true 라면 false로 변하게 된다.`




