#### jxslider 설명

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


#### option


nView            | 화면에 몇개의 객체를 보여줄것인가 ( 기본값 : 1 )
--    | --
nStart            | 몇번째 객체를 처음부터 보여줄려할때 , ( nBackCopy 옵션은 작동안하게 된다.  )
--    | --
nBackCopy     | 뒤객체를 앞으로 붙여서 센터 정렬. ( 부모의 사이즈나 위치는 조정해야함. nStart = 0 값을 가져야 함 )
--    | --
nMargin         | 객체마다 간격
--    | --
nUlSpeed       | 움직이는 속도 ( 기본값 : 400 )
--    | --
bAuto           | 자동롤링 ( 기본값 : false )
--    | --
nAutoSpeed   | 자동롤링 속도 ( 기본값 : 3000 )
--    | --
bLoop           | 무한 반복 ( 기본값 : true )
--    | --
bResize         | 리사이징 ( 기본값 : true )
--    | --
nSans           | 드래그 민감도 ( 기본값 : 10 )
--    | --
sDirection      | 움직이는 방향 ( 기본값 : horizontal ) or vertical
--    | --
bAction         | 객체를 클릭하면 칸 차이를 인식하여 이동 ( 기본값 : false )
--    | --
bGroupMove  | 이동을 nView에 값에 따라서 이동 ( 기본값 : false )
--    | --
bDrag         | 드래그 가능 ( 기본값 : true )


