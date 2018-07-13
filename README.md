jxslider
-------

#### html

```` sh
 <div class="jx-slider" data-view ="3">

      <div class="jx-box">
            <div class="jx-wrap">
                  <div class="jx-unit"></div>
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

new JXSLIDER( $(".jx-slider") ,  option );

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
bAction         |  boolean  |  false  | 객체를 클릭하면 칸 차이를 인식하여 이동
nStart            |  number  |  0  | 몇번째 객체를 처음부터 보여줄려할때 `nBackCopy 옵션은 작동안하게 된다`
nBackCopy     |  number  |  0  | 뒤객체를 앞으로 붙여서 센터 정렬. `부모의 사이즈나 위치는 조정해야함. nStart = 0 값을 가져야 함`



