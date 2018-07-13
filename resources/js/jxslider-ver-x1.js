/*
//------------------ JXSLIDER  ------------------ //
version( 버전 ) : x1
date ( 날짜 ) : 2018.07

obj               : 클래스 명
nView           : 화면에 몇개의 li를 보일것인가 (기본=1)
nStart          : 앞에 li를 뒤로 붙이는경우. 즉 외부에서 몇번째를 처음부터 보여줄것인가를 정할때. 이걸 정하면 nBackCopy값이 작동 안함  (*이걸 사용하면 nBackCopy값은 0이됨  *loop가 false가 될경우만 작동)
nBackCopy     : 뒤에 li를 앞으로 붙임.css로 ul의 margin-left로 센터 조정해야함. nStart가 0이여야함 *loop가 false가 될경우만 작동
nMargin        : li간에 간격(단위 px)
nUlSpeed       : 이동속도 (기본=400 > 0.4초 )
bAuto           : 자동 움직임 (true or false:기본)
nAutoSpeed   : bAuto가 true일경우 몇초 단위로 자동을 시킬것인가 ( 기본=3000 > 3초 )
bLoop           : 반복으로 로테이션 (true or false:기본)
bDrag        : pc 또는 mobile에서 드래그 여부 (true or false:기본)
bResize         : li 객체를 jxbox 박스 기준으로 리사징을 할것인가 여부(true or false:기본)
nSans           : 드래그 온하고 오프햇을때 드래그 한정도에 따라서 다시 제자리로 오느냐 아님 이동하느냐에 민감도 ( 기본값:10 )
sDirection      : sDirection, //방향
bAction         : jxunit 본인을 클릭하면 칸 차이를 인식하여 이동 모바일에선 드래그와 출동하기 때문에 true면 bMobile옵션을 false로 해야함
bGroupMove  : 움직일때 view가 3일때 한칸씩 움직이는게 기본이지만(단 페이징 있을때 예외) 3칸씩 움직이도록 하고 싶을때
reCallFnc       : 콜백함수이며 선택된 li의 data-num 을 넘긴다.


추가

수정


*/


//jQuery.easing['jswing'] = jQuery.easing['swing'];

jQuery.extend( jQuery.easing,
{
    def: 'easeOutQuad',
    swing: function (x, t, b, c, d) {
        //alert(jQuery.easing.default);
        return jQuery.easing[jQuery.easing.def](x, t, b, c, d);
    },
    easeOutCubic: function (x, t, b, c, d) {
        return c*((t=t/d-1)*t*t + 1) + b;
    }
});


function JXSLIDER( obj ,   option  )
{
    var _this = this;
    this.default =
    {
        nView            : 1 , //화면에 몇개의 객체를 보여줄것인가
        nStart            : 0 , // 앞객체를 뒤로 붙여서 몇번째 객체를 처음부터 보여줄려할때 , nBackCopy작동안함. *loop가 false가 될경우만 작동 xx
        nBackCopy     : 0 , // 뒤객체를 앞으로 붙여서 센터 정렬. margin-left로 센터 조정해야함. nStart가 0이여야함 *loop가 false가 될경우만 작동 xx
        nMargin         : 0 , //sDirection에 따라 margin-right or margin-bottom 값 xx
        nUlSpeed       : 400 , //움직이는 속도 xx
        bAuto           : false , //자동롤링 xx
        nAutoSpeed   : 3000 , //자동롤링 속도 xx
        bLoop           : true , //무한 반복 xx
        //bMobile        : false , //PC or 모바일 인지를 구분 한다기 보단 드래그 가능여부인데 모바일에서 드래그 하고 싶으면 true PC 에서 드래그할려면 false를 줘야함
        bResize         : true ,  //li 객체를 jxbox 박스 기준으로 리사징을 할것인가 여부(true:기본 or false) xx
        nSans           : 10 , //드래그 온하고 오프햇을때 드래그 한정도에 따라서 다시 제자리로 오느냐 아님 이동하느냐에 민감도 ( 기본값:10 ) xx
        sDirection      : "horizontal" , //움직이는 방향 xx
        bAction         : false , //li 객체를 클릭하면 칸 차이를 인식하여 이동 링크가 아닌 이동 loop를 true로 바꿔야할듯 xx
        bGroupMove  : false , //nView에 값에 따라서 이동을 한꺼번에 할것인가 아닌가
        bDrag         : true , //드래그 가능
        // reCallFnc       : function(v)
        //                     {
        //                          console.log('default reCallFnc' , v)
        //                     }
    }

    $.extend(true ,  this.default , option );

    console.log('default  ' , this.default );


    (function(a,b)
    {
        if( /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4)) )
        {
            //console.log('11 ' , b)
            //window.location=b
            //모바일
            _this.bMobile = true;
        }
        else
        {
            _this.bMobile = false;
            //pc
            //console.log('22')

        }
    })(navigator.userAgent||navigator.vendor||window.opera,'m/');


    this.jxslider = obj;
    this.jxbox = this.jxslider.find(".jx-box"); //ul을 감싸고 있는 부모 클래스
    this.jxwrap = this.jxbox.find("> .jx-wrap");
    this.bIng = false; // 좌우 버튼이나 아래 컨트롤을 이용하여 움직임이 시작했느냐
    this.bMovIng = false; // 드래그 이용하여 움직임이 시작했느냐
    this.bControl = false; //아래 페이징이 있을겨우를 참조 하는 변수
    this.nTotal = this.jxwrap.find(">.jx-unit").size(); // .jxunit 의 총 갯수
    //this.nTotalPaging = Math.ceil( this.nTotal /  _this.default.nView ); //아래 페이징이 있을경우 총 페이징 값

    this.bPcIng = false; // pc에선 마우스 무브가 계속 움직이므로 그러나 공통으로 하면 된다.
    this.nCopy = 0; //드래그 하는 동안 몇개의 .jxunit를 이동할것인가를 담는 변수
    this.nSave = 0; // 전 this.nCopy 를 담는 변수이며 두 숫자가 달라졌을때만 .jxunit를 이동한다.
    this.nEX = this.nEY = 0; //ul 의 이동완료 된후 left or top 값을 담는다.
    this.nAddStep= 0; // 몇개의 .jxunit가 이동하는
    this.autoTime;
    this.sEase = 'easeOutCubic';

    //console.log('typeof _this.default.reCallFnc   ' , typeof _this.default.reCallFnc , _this.default.reCallFnc == "" , typeof window[ _this.default.reCallFnc ] === 'function')


    //this.reCallFnc = ( option["reCallFnc"] != undefined && option["reCallFnc"] != "" ) ? eval( option["reCallFnc"] ) : undefined; //콜벡 함수가 존재하면 담고

    //.jxunit의 고유 데이터 넘버를 넣어버린다.
    this.jxwrap.find(">.jx-unit").each(function(i, e)
    {
        $(this).attr("data-num" , i);
        var $num = $("<span class='num'>"+(i+1)+"</span>")
        $(this).find("a").append($num)
    });

     //this.bResize = ( option["bResize"]  != undefined && option["bResize"]  != "" ) ? option["bResize"] :  false; //리사이징 여부

    if ( _this.default.sDirection != "horizontal")
    {
        //세로방향일때고 리사이징일때만
        if ( _this.default.bResize )
        {
            this.jxslider.css({"height": "100%"});
        }
         //$(".jxslider .jxbox > .jxwrap > .jxunit img").css ( {"width":"auto" , "height":"inherit" });
         this.jxwrap.find(">.jx-unit > .jx-cont .thumb img").css ( {"width":"auto" , "height":"inherit" });
         //this.jxbox.css({"height": "100%"});
    }

    //페이징이 존재하면  그룹별 움직임에 true를 넣어버리고 or 그룹별 움직임이 true라면
    //if ( this.jxslider.find(".jxcontrol").size() > 0 || this.default.bGroupMove )

    if ( this.jxslider.find(".jx-control").size() > 0 )
    {
        this.bControl = true;
    }
    else
    {
        this.bControl = false;
    }


    if ( this.default.bGroupMove )
    {
        this.nTotalPaging = Math.ceil( this.nTotal /  _this.default.nView ); //아래 페이징이 있을경우 총 페이징 값
    }
    else
    {
        this.nTotalPaging = this.nTotal;
    }

    if ( _this.default.bLoop )
    {
        if ( this.default.nStart == 0 )
        {
            this.nCurr = this.nCurrPaging = 0;

            if ( this.default.bGroupMove )
            {
                this.default.nBackCopy = this.default.nBackCopy%this.default.nView;
            }
        }
        else
        {
            _this.default.nBackCopy = 0;
            //if ( _this.default.bGroupMove  || this.bControl )
            if ( _this.default.bGroupMove )
            {
                /*
                동작이 그룹단위로 움직여야 할경우인데
                앞에서 뒤로 붙이는 옵션 ( nStart : 몇번째 부터 시작을 할까요 옵션 ) 값이 1, 2 들어온다 하여도 씽크는 맞춰야 하기 때문에
                nView 값을 넣어버려야한다.
                */

                //console.log(  '계산 '  , this.default.nStart , this.nTotal  , Math.ceil( _this.default.nStart /_this.default.nView ) , Math.ceil( _this.default.nStart /_this.default.nView ) * _this.default.nView )
                this.default.nStart = Math.ceil( _this.default.nStart /_this.default.nView ) * _this.default.nView; //계산을 맞춰서 해야해서 그룹별이나 버튼이 잇을때는 다시 값을 바꿔야함

                if ( this.default.nStart > this.nTotal-1 )
                {
                    this.default.nStart = this.nTotal-1;
                }

                //console.log('--aaaaa ' , this.default.nStart  , this.nTotal)

                this.nCurrPaging = Math.floor( _this.default.nStart /_this.default.nView ) ; //아래 페이징이 있을경우 초기값
            }
            else
            {
                if ( this.default.nStart > this.nTotal-1 )
                {
                    this.default.nStart = this.nTotal-1;
                }

                this.nCurrPaging = this.default.nStart;

                //console.log('-- ' , this.default.nStart  , this.nTotal)
            }

            this.nCurr = _this.default.nStart;
            //console.log( _this.nCurrPaging )
        }
    }
    else
    {
        this.nCurr = this.nCurrPaging = this.default.nStart = this.default.nBackCopy = 0;
    }


    if ( this.default.bAuto )
    {
        this.addEventAuto(true);
    }


    if ( !_this.default.bResize )
    {
        //리사이징이 아닐때 jx-unit 객체 가로 세로 사이즈를 가지고 움직일 값을 담는다
        if ( _this.default.sDirection == "horizontal")
        {
            this.nMove =   this.jxwrap.find(">.jx-unit").innerWidth() + _this.default.nMargin;
            this.jxwrap.find(">.jx-unit").css(  {"margin-right": _this.default.nMargin} );
            this.jxwrap.css( {"width": this.nMove * this.nTotal } ) // ul의 가로 사이즈를 .jx-unit의 갯수만큼
        }
        else
        {
            this.nMove =   this.jxwrap.find(">.jx-unit").innerHeight() + _this.default.nMargin;
            this.jxwrap.find(">.jx-unit").css(  {"float": "none", "margin-bottom": _this.default.nMargin } );
            this.jxwrap.css( {"height": this.nMove * this.nTotal } ) // ul의 가로 사이즈를 .jx-unit의 갯수만큼
        }
    }
    else
    {
        //리사이징일때는 여기서 계산
        //$(window).unbind();
        $(window).resize(function(e)
        {
            _this.resize();
        });
       $(window).trigger("resize");
    }


    //여기는 진짜 페이징이 존재할것인가 할때
    if ( this.bControl )
    //if ( this.default.bGroupMove )
    {

        this.jxcontrol = this.jxslider.find(".jx-control");
        //console.log('시작 ' , this.bMovIng)
        this.addEventControl(); //아래 페이징이 있는 경우만 이벤트 추가
    }

    if ( _this.default.bLoop )
    {
        if( _this.default.nBackCopy != 0 )
        {
            for ( var i = 0 ; i < _this.default.nBackCopy ; i++)
            {
                this.jxwrap.prepend( this.jxwrap.find(">.jx-unit:last") );
            }
        }
        else
        {
            for ( var i = 0 ; i < _this.default.nStart ; i++)
            {
                this.jxwrap.append( this.jxwrap.find(">.jx-unit:first") );
            }

        }
    }

    //기본 드래그 이벤트 추가
    //this.bMobile = ( option["bMobile"]  != undefined && option["bMobile"]  != "" ) ? option["bMobile"] :  false; // 모바일 체크이다. 기본은 pc 작동


    _this.jxwrap.find(">.jx-unit").eq( _this.default.nBackCopy ).addClass("on"); //처음에 한번


    //좌우 버튼이 있는 경우만 좌우 버튼 이벤트 추간
     if ( this.jxslider.find(".jx-btn").size() > 0 )
    {
        this.addEventBtns();
    }

    if ( this.jxslider.find(".jx-stop").size() > 0 )
    {
        this.addEventStop();
    }

    if ( _this.default.bAction )
    {
        //console.log('a')
        this.addEventAction();


    }
    else
    {
//        this.addEventDrag();
    }

    if( _this.default.bDrag )
        {
            this.addEventDrag();
        }





}

//본인 자신을 클릭하면 움직임 추가
JXSLIDER.prototype.addEventAction = function(b)
{
    var _this = this;

    function numFind()
    {
        var idx;
        _this.jxwrap.find(">.jx-unit").each(function(i, e)
        {
            //console.log(i , $(this).attr("class") )
            if( $(this).hasClass("on") )
            {
                idx =  $(this).index();
            }
        });

        return idx;
    }

    /*
        링크가 있는경우가 문제이다
        pc 경우는 문제가 되기 때문에 드래그 기능을 못하도록 해는데
        e.preventDefault(); 작동되게 하려면 click 이벤트를 넣어야한다.
    */
    //this.jxwrap.find(">.jx-unit").on("mouseup " , function(e)
    this.jxwrap.find(">.jx-unit").on("click" , function(e)
    {

        var nChr = numFind() - $(this).index();

       if ( _this.default.bGroupMove )
       {
            //_this.right()
            if( nChr  < 0 )
            {

                e.preventDefault();
                if ( _this.nCurr + _this.default.nView > _this.nTotal-1 )
                {
                    _this.rcal( _this.nTotal - _this.nCurr );
                }
                else
                {
                    //_this.right( _this.default.nView );
                    _this.rcal( _this.default.nView );
                }
            }
            else if( nChr > 0 )
            {

                e.preventDefault();
                if ( _this.nCurr - _this.default.nView < 0 && _this.nTotal % _this.default.nView != 0)
                {
                    _this.lcal( _this.nTotal % _this.default.nView );
                }
                else
                {
                    _this.lcal( _this.default.nView );
                }
            }
            else
            {
                //console.log('m,m,')
            }
            //var view = _this.default.nView;

       }
       else
       {
            //var nChr = _this.nCurr - $(this).data('num');
            //var view = Math.abs(nChr);
            if( nChr  < 0 )
            {
                //console.log("click a")
                e.preventDefault();
                _this.rcal( Math.abs(nChr) ); //이건 끝
            }
            else if( nChr  > 0 )
            {
                //console.log("click b")
                e.preventDefault();
                //e.stopPropagation();
                //_this.lcal( Math.abs(nChr) ); //이건 끝
            }
            else
            {
                //console.log('mfsdfsdfd')
            }
            //_this.rmv( view ); //계속 돌고
            //_this.right();
       }

    });

}//JXSLIDER.prototype.addEventAction

//스탑 버튼에 이벤트 추가
JXSLIDER.prototype.addEventStop = function(b)
{
    var _this = this;

    this.jxslider.find(".jx-stop").click(function(event)
    {
        $(this).toggleClass("on");
        if ( $(this).hasClass("on") )
        {
            //$(this).text("play");
            $(this).addClass("on");
            _this.default.bAuto = false;
            _this.addEventAuto(false);
        }
        else
        {
            //$(this).text("stop");
            $(this).removeClass("on");
            _this.default.bAuto = true;
            _this.addEventAuto(true);
        }
    });
}//addEventStop

//자동으로 이동
JXSLIDER.prototype.addEventAuto = function(b)
{
    var _this = this;

    //console.log("addEventAuto  " ,b)
    if ( b )
    {
        clearInterval( _this.autoTime )
        _this.autoTime = setInterval( function()
        {
            _this.right();
            //_this.lv();

        } , _this.default.nAutoSpeed);
    }
    else
    {
        clearInterval( _this.autoTime )
    }
}

//좌우 버튼 이벤트
JXSLIDER.prototype.addEventBtns = function()
{
    var _this = this;

    this.jxslider.find(".jx-left").click(function(e)
    {

        //console.log('jx-left ' , _this.nCurr , _this.default.bGroupMove)
        _this.left();
    }).mouseenter(function(event)
    {
        if ( _this.default.bAuto ) { _this.addEventAuto(false); }
    }).mouseleave(function(event) {
        if ( _this.default.bAuto ) { _this.addEventAuto(true); }
        _this.bMovIng = false;
    });

    this.jxslider.find(".jx-right").click(function(e)
    {
        //_this.rcal(1);
        //그룹 모션이 참일때 조건을 더 넣자.

        _this.right();

    }).mouseenter(function(event)
    {
        if ( _this.default.bAuto ) { _this.addEventAuto(false); }
    }).mouseleave(function(event) {
        if ( _this.default.bAuto ) { _this.addEventAuto(true); }

        _this.bMovIng = false;
    });

}//JXSLIDER.prototype.addEventBtns

JXSLIDER.prototype.left = function()
{
    var _this = this;
    if ( !_this.bIng )
    {
        _this.bIng = true;
        if ( _this.default.bGroupMove )
        {
            if ( _this.nCurr - _this.default.nView < 0 && _this.nTotal % _this.default.nView != 0)
            {
                _this.lcal( _this.nTotal % _this.default.nView );
            }
            else
            {
                _this.lcal( _this.default.nView );
            }
        }
        else
        {
            _this.lcal( 1 );
        }

        if ( _this.default.bAuto ) { _this.addEventAuto(true); }
    }
}//JXSLIDER.prototype.left

//오른쪽 버튼 클릭시 실제 동작
//JXSLIDER.prototype.right = function(v)
JXSLIDER.prototype.right = function()
{
    var _this = this;

    if ( !_this.bIng )
    {
        _this.bIng = true;
        if ( _this.default.bGroupMove )
        {
            if ( _this.nCurr + _this.default.nView > _this.nTotal-1 )
            {
                _this.rcal( _this.nTotal - _this.nCurr );
            }
            else
            {
                _this.rcal( _this.default.nView );
            }
        }
        else
        {
            _this.rcal( 1 );
        }

        if ( _this.default.bAuto ) { _this.addEventAuto(true); }
    }
}//JXSLIDER.prototype.right


//왼쪽 버튼 클릭시 이벤트
JXSLIDER.prototype.lcal = function(n)
{
    var _this = this;

    var n = n;

    //console.log('lv ' , n )

    if ( n == undefined ) { n = 1; }

    //console.log('lv  ' , n , _this.default.bLoop )
    if ( _this.default.bLoop )
    {
        //loop 일때

        _this.nCurr -= n;
        if (_this.nCurr < 0 )
        {
           //_this.nCurr =  _this.nTotal-1;
           _this.nCurr =  _this.nTotal + _this.nCurr;
        }

        if ( _this.default.bGroupMove )
        {
            _this.nCurrPaging = _this.nCurr / _this.default.nView;
        }

        //console.log('lv bb ' , n , _this.nCurr )

        _this.lmv(n);
    }
    else
    {
        //loop 아닐때
        //if ( _this.bControl || _this.default.bGroupMove )
        if ( _this.default.bGroupMove )
        {
            //컨트롤이 존재할때
            if ( !_this.default.bAuto )
            {
                //자동이 아닐때
                if ( _this.nCurrPaging > 0 )
                {
                    _this.nCurrPaging--;
                    _this.nCurr = _this.nCurrPaging * _this.default.nView;
                    _this.lmv( _this.nCurr );
                }
                else
                {
                    //alert ("첫 페이지");
                    _this.bIng = false;
                    //console.log('첫 페이지')
                }
            }
            else
            {
                //자동때
                _this.nCurrPaging--;
                if ( _this.nCurrPaging < 0 )
                {
                    _this.nCurrPaging = _this.nTotalPaging - 1;
                }
                _this.nCurr = _this.nCurrPaging * _this.default.nView;
                _this.lmv( _this.nCurr );

            }
        }
        else
        {
            //컨트롤이 없을때
            if ( !_this.default.bAuto )
            {
                if ( _this.nCurr > 0 )
                {
                    _this.nCurr -= n;
                    _this.lmv(_this.nCurr);
                }
                else
                {
                    _this.bIng = false;
                    //console.log('첫 페이지');
                }
            }
            else
            {
                _this.nCurr -= n;
                if ( _this.nCurr < 0 )
                {
                    _this.nCurr = _this.nTotal-_this.default.nView;
                }
                _this.lmv(_this.nCurr);
            }

        }// if ( _this.bControl )
    }//if ( _this.default.bLoop )

}//JXSLIDER.prototype.lcal


//오른쪽 버튼 클릭시 이벤트
JXSLIDER.prototype.rcal = function(n)
{
    var _this = this;

    var n = n;


    if ( n == undefined ) { n = 1; }

    //console.log('rv ' , n )
        if ( _this.default.bLoop )
        {
            //loop 일때
            _this.nCurr += n;

            if ( _this.nCurr > _this.nTotal - 1 )
            {
               //_this.nCurr = 0;
               _this.nCurr = _this.nCurr - _this.nTotal;
            }

            if ( _this.default.bGroupMove )
            {
                _this.nCurrPaging = _this.nCurr / _this.default.nView;
            }

            //_this.right(1);
            _this.rmv(n);
        }
        else
        {
            //loop 아닐때
            //if ( _this.bControl || _this.default.bGroupMove )
            if ( _this.default.bGroupMove )
            {
                //그룹으로
                if ( !_this.default.bAuto )
                {
                    if ( _this.nCurrPaging < _this.nTotalPaging - 1 )
                    {
                        _this.nCurrPaging++;
                        _this.nCurr = _this.nCurrPaging * _this.default.nView;
                        _this.rmv( _this.nCurr );
                    }
                    else
                    {
                        //alert ("마지막 페이지");
                        _this.bIng = false;
                    }
                }
                else
                {
                    _this.nCurrPaging++;
                    if ( _this.nCurrPaging > _this.nTotalPaging-1 )
                    {
                        _this.nCurrPaging = 0;
                    }
                    _this.nCurr = _this.nCurrPaging * _this.default.nView;
                    _this.rmv( _this.nCurr );
                }
            }
            else
            {
                //그룹 아니고
                if ( !_this.default.bAuto )
                {
                    //if ( _this.nCurr < _this.nTotal-_this.default.nView )
                    if ( _this.nCurr < _this.nTotal - 1 )
                    {
                        _this.nCurr += n;
                        _this.rmv(_this.nCurr);
                    }
                    else
                    {
                        _this.bIng = false;
                        //console.log('마지막 페이지');
                    }
                }
                else
                {
                    _this.nCurr += n;
                    //if ( _this.nCurr > _this.nTotal-_this.default.nView )
                    if ( _this.nCurr > _this.nTotal - 1 )
                    {
                        _this.nCurr = 0;
                    }
                    _this.rmv(_this.nCurr);
                }
            }//if ( _this.bControl )
        }//if ( _this.default.bLoop )

}//rv


//왼쪽 버튼 클릭시 실제 동작
JXSLIDER.prototype.lmv = function(v)
{

    var _this = this;
    var ntx = _this.nMove * v * -1; //최종 움직일 칸 사이즈

    //console.log('ntx   ' , ntx )
    if ( _this.default.bLoop )
    {
        _this.jxwrap.find(">.jx-unit").each(function(index, element)
        {
            if ( _this.nTotal - 1 - v < index )
            {
                var last = _this.jxwrap.find(">.jx-unit:last");
                _this.jxwrap.prepend( last );
            }
        });


        if( _this.default.sDirection == "horizontal")
        {
            _this.jxwrap.css( {"left": ntx } );
        }
        else
        {
            _this.jxwrap.css( {"top": ntx } );
        }

        ntx = 0;

    }

    //console.log('ntx   ' , ntx )
    if ( _this.default.sDirection == "horizontal")
    {
        _this.jxwrap.stop().animate( {"left": ntx } ,  _this.default.nUlSpeed , _this.sEase  ,function()
        {
            _this.nEX = _this.jxwrap.position().left;
            //console.log('left end '  , _this.nEX , ntx)
            end();
        });

    }
    else
    {

        _this.jxwrap.stop().animate( {"top": ntx } ,  _this.default.nUlSpeed , _this.sEase  ,function()
        {
            _this.nEX = _this.jxwrap.position().top;
            end();
        });
    }

    function end()
    {
        _this.bIng = false;
        //console.log("left  _this.nEX = " , _this.nEX )

        /*
        _this.jxwrap.find(">.jxunit").each(function(i, e)
        {
            if ( $(this).data("num") == _this.nCurr )
            {
                $(this).addClass("on").siblings().removeClass("on");
            }
        });
        */

         _this.callback();

    }//end

}//JXSLIDER.prototype.lmv



JXSLIDER.prototype.rmv = function(v)
{
    var _this = this;
    var ntx = _this.nMove * v * -1; //최종 움직일 칸 사이즈

    if ( _this.default.sDirection == "horizontal")
    {

        _this.jxwrap.stop().animate( {"left": ntx } ,  _this.default.nUlSpeed , _this.sEase  ,function()
        {
            _this.nEX = _this.jxwrap.position().left;
            //console.log('right end '  , _this.nEX , _this.jxwrap.offset().left )
            end();
        });
    }
    else
    {
        _this.jxwrap.stop().animate( {"top": ntx } ,  _this.default.nUlSpeed , _this.sEase  ,function()
        {
            _this.nEX = _this.jxwrap.position().top;
            end();
        });

    }

    function end()
    {
        _this.bIng = false;

        if ( _this.default.bLoop )
        {
            if ( _this.default.sDirection == "horizontal")
            {
                _this.jxwrap.css( {"left": 0 } );
            }
            else
            {
                _this.jxwrap.css( {"top": 0 } );

            }

            _this.jxwrap.find(">.jx-unit").each(function(index, element)
            {
                if ( v > index )
                {
                    var copy = $(this);
                    _this.jxwrap.append(copy);
                }
            });

            _this.nEX = _this.nEY = 0;

        }

         _this.callback();

    }
}//JXSLIDER.prototype.rmv


//페이징 버튼 생성 및 이벤트
JXSLIDER.prototype.addEventControl = function()
{
    var _this = this;
    //.jxunit 갯수만큼 버튼을 생성하고

    //console.log('addEventControl    ' , _this.default.nView)

    for(var i = 0 ; i < _this.nTotalPaging ; i++ )
    {
         var $btn = $("<span class='jx-cbtn'><i>"+ ( _this.nTotalPaging - i ) +"</i></span>");
         //_this.jxcontrol.append($btn);
         //console.log( i , _this.nTotalPaging - i )
         _this.jxcontrol.prepend($btn);
    }

    _this.jxcontrol.find(".jx-cbtn").eq(_this.nCurrPaging).addClass("on").trigger("click");

    _this.jxcontrol.find(".jx-cbtn").click(function(e)
    {

        var nChr = _this.nCurrPaging - $(this).index();
        _this.nCurrPaging = $(this).index();
        //_this.nCurr = _this.default.nView * _this.nCurrPaging; //몇번째 .jxunit 인지를 담는다
        _this.nCurr = _this.nCurrPaging; //몇번째 .jxunit 인지를 담는다

       if ( _this.default.bGroupMove )
       {
            var view = _this.default.nView;
       }
       else
       {
            var view = 1;
       }

        if (nChr < 0)
        {
            if ( _this.default.bLoop )
            {
                _this.rmv( Math.abs(nChr) * view );
            }
            else
            {
                _this.rmv( $(this).index() *  view );
            }
        }

        if (nChr > 0)
        {

            if ( _this.default.bLoop )
            {
                _this.lmv(Math.abs(nChr) * view );
            }
            else
            {
                _this.lmv( $(this).index() *  view );
            }
        }


        if ( _this.default.bAuto ) { _this.addEventAuto(true); }

    }).mouseenter(function(event)
    {
        if ( _this.default.bAuto ) { _this.addEventAuto(false); }
    }).mouseleave(function(event)
    {
        if ( _this.default.bAuto ) { _this.addEventAuto(true); }
        _this.bMovIng = false;
    });


}//JXSLIDER.prototype.addEventControl


//드래그 이벤트
JXSLIDER.prototype.addEventDrag = function()
{
    var _this = this;

    //_this.nCurr = 0; //처음엔 backcopy 때문에 nCurr 에 backcopy값이 들어가서 초기에 on을 넣지만 좌우버튼 클릭하면  nCurr이 0이 아니기 때문에 문제가됨. 아주 중요

    var sEventOver , sEventStart , sEventMove , sEventEnd;

    sEventOver = "mouseover";

    //if  (bMobile)
    if  ( _this.bMobile )
    {
        sEventStart  = "touchstart"; sEventMove = "touchmove"; sEventEnd = "touchend";
    }
    else
    {
        sEventStart  = "mousedown"; sEventMove = "mousemove"; sEventEnd = "click mouseup mouseleave";
    }

    var nSX = 0 , nSY = 0 ; // 클릭시에 처음 지점
    var nCX = 0 , nCY = 0 ; // 무브시에 차이값
    //var nEX = 0 ; // 끝난지점
    var nPX = undefined, nMX ; // 드래그 할때 한쪽 방향으로만 이동하면 되지만 왔다 갔다 했을때는 문제가 되기 때문에 이 변수에 담아서 확
    var nPY= undefined , nMY;

   // _this.jxslider.bind( sEventStart , function(e)

   _this.jxbox.bind( sEventOver , function(e)
    {
        //console.log("over")
        //if ( _this.default.bAuto ) { _this.addEventAuto(false); }

        //e.preventDefault();

    }).bind( sEventStart , function(e)
    {

        nSX = (e.originalEvent.touches) ? e.originalEvent.touches[0].clientX :  e.originalEvent.clientX;
        nSY = (e.originalEvent.touches) ? e.originalEvent.touches[0].clientY :  e.originalEvent.clientY;

        //console.log ( "sEventStart = " , nSX)
        _this.bPcIng = true;
        _this.nAddStep = 0;

        if ( _this.default.bAuto ) { _this.addEventAuto(false); }

    }).bind (sEventMove, function(e)
    {
        //console.log('_this.bPcIng ' , _this.bPcIng , '  _this.bMovIng ' , _this.bMovIng)
       //pc에서 드래그가 계속 되는것을 방지
        if ( !_this.bPcIng ) { return; }

        //움직임 중이면 움직이지 못하게
        if ( _this.bMovIng ) { return; }


        nPX = nMX; //드래그 하는 동안 전에 좌표값(nMX : x축으로 )을  담는다
        nPY = nMY; //드래그 하는 동안 전에 좌표값(nMY : y축으로 )을  담는다
        nMX = (e.originalEvent.touches) ? e.originalEvent.touches[0].clientX :  e.originalEvent.clientX; //무브시에 값을 다시 가져오고
        nMY = (e.originalEvent.touches) ? e.originalEvent.touches[0].clientY :  e.originalEvent.clientY; //무브시에 값을 다시 가져오고

         nCX = nMX - nSX; //드래그 차이값
         nCY = nMY - nSY; //드래그 차이값

        if ( _this.default.sDirection == "horizontal")
        {
            if ( Math.abs(nCX) > Math.abs(nCY)  )
            {
                e.preventDefault();  //console.log(" x축 값이 더 크면 스크롤 막자 ")
            }
            else
            {
                return; //console.log("좌우 움직이지 마")
            }
        }
        else
        {
            if ( Math.abs(nCX) < Math.abs(nCY)  )
            {
                e.preventDefault();  //console.log(" x축 값이 더 크면 스크롤 막자 ")
            }
            else
            {
                return; //console.log("좌우 움직이지 마")
            }

        }


        if ( _this.default.bLoop )
        {
            //루프 일때

            if ( _this.default.sDirection == "horizontal")
            {
                //가로형
                if ( !_this.default.bGroupMove )
                {
                    _this.nCopy = Math.abs(  Math.ceil( nCX /  _this.nMove  ) ) ; //몇개의 .jxunit를 이동할 타이밍 잡기 왼드래그할땐 0부터 시작이고 우드래그할땐 1부터 시작
                }
                else
                {
                    //console.log('rrrr')
                    _this.nCopy =  _this.default.nView;
                    //_this.nCopy = Math.abs(  Math.ceil( nCX /  _this.nMove  ) ) ; //몇개의 .jxunit를 이동할 타이밍 잡기 왼드래그할땐 0부터 시작이고 우드래그할땐 1부터 시작
                }

                if (nPX > nMX)
                {
                    //우에서 왼으로 드래그 할때
                     //console.log('<<<<<<<<<<<<<<<' )
                     if ( _this.default.bGroupMove )
                     {
                        //왼쪽으로 드래그할때만
                         //_this.nSave = 4;//_this.default.nView;
                     }

                    if( _this.nSave != _this.nCopy )
                    {
                        //값이 다를경우며

                        _this.nSave = _this.nCopy;

                        if ( !_this.default.bGroupMove )
                        {
                            _this.nAddStep++; //몇개의 li값 붙는지 저장하고
                            var $jxunit = _this.jxwrap.find(">.jx-unit:first") // 첫번째를 뒤에 붙이고
                            _this.jxwrap.append( $jxunit );
                        }

                    }
                }

                if (nPX < nMX)
                {
                    //왼에서 우로 드래그
                    //console.log('>>>>>>>>>>>>>>>> ' )
                    if( _this.nSave != _this.nCopy )
                    {

                        _this.nSave = _this.nCopy;
                        if ( !_this.default.bGroupMove )
                        {
                            _this.nAddStep--; //몇개의 .jxunit값 붙는지 저장하고
                            var $jxunit = _this.jxwrap.find(">.jx-unit:last"); //마지막을 앞에 붙이고
                            _this.jxwrap.prepend( $jxunit );
                        }
                        else
                        {
                            if ( _this.nCurr - _this.default.nView < 0 && _this.nTotal % _this.default.nView != 0)
                            {
                                _this.nAddStep = _this.nTotal % _this.default.nView * -1;
                            }
                            else
                            {
                                _this.nAddStep = _this.default.nView * -1; //몇개의 li값 붙는지 저장하고
                            }

                            for(var i = 0 ; i < Math.abs(_this.nAddStep) ; i++)
                            {
                                var $jxunit = _this.jxwrap.find(">.jx-unit:last") // 첫번째를 뒤에 붙이고
                                _this.jxwrap.prepend( $jxunit );
                            }
                        }
                    }
                }

                var ntx = _this.nEX + nCX - (   _this.nMove * _this.nAddStep * -1  );

            }
            else
            {

                //세로형
                if ( !_this.default.bGroupMove )
                {
                    _this.nCopy = Math.abs(  Math.ceil( nCY /  _this.nMove  ) ) ; //몇개의 .jxunit를 이동할 타이밍 잡기 왼드래그할땐 0부터 시작이고 우드래그할땐 1부터 시작
                }
                else
                {
                    _this.nCopy =  _this.default.nView;
                    //_this.nCopy = Math.abs(  Math.ceil( nCX /  _this.nMove  ) ) ; //몇개의 .jxunit를 이동할 타이밍 잡기 왼드래그할땐 0부터 시작이고 우드래그할땐 1부터 시작
                }

                if (nPY > nMY)
                {
                    //우에서 왼으로 드래그 할때
                     //console.log('<<<<<<<<<<<<<<<' )

                    if( _this.nSave != _this.nCopy )
                    {
                        //값이 다를경우며
                        //console.log('c  '   , _this.nCurr)
                        _this.nSave = _this.nCopy;

                        if ( !_this.default.bGroupMove )
                        {
                            _this.nAddStep++; //몇개의 li값 붙는지 저장하고
                            var $jxunit = _this.jxwrap.find(">.jx-unit:first") // 첫번째를 뒤에 붙이고
                            _this.jxwrap.append( $jxunit );
                        }

                    }
                }

                if (nPY < nMY)
                {
                    //왼에서 우로 드래그
                    //console.log('>>>>>>>>>>>>>>>> ' )
                    if( _this.nSave != _this.nCopy )
                    {
                        _this.nSave = _this.nCopy;
                        if ( !_this.default.bGroupMove )
                        {
                            _this.nAddStep--; //몇개의 .jxunit값 붙는지 저장하고
                            var $jxunit = _this.jxwrap.find(">.jx-unit:last"); //마지막을 앞에 붙이고
                            _this.jxwrap.prepend( $jxunit );
                        }
                        else
                        {

                            if ( _this.nCurr - _this.default.nView < 0 && _this.nTotal % _this.default.nView != 0)
                            {
                                _this.nAddStep = _this.nTotal % _this.default.nView * -1;
                            }
                            else
                            {
                                _this.nAddStep = _this.default.nView * -1; //몇개의 li값 붙는지 저장하고
                            }

                            for(var i = 0 ; i < Math.abs(_this.nAddStep) ; i++)
                            {
                                var $jxunit = _this.jxwrap.find(">.jx-unit:last") // 첫번째를 뒤에 붙이고
                                _this.jxwrap.prepend( $jxunit );
                            }


                        }
                    }
                }

                //console.log('-- ' , _this.nEY , nCY )

                var ntx = _this.nEY + nCY - (   _this.nMove * _this.nAddStep * -1  );
            }

            if ( _this.default.sDirection == "horizontal")
            {
                //console.log('move ' , ntx)
                _this.jxwrap.css({ "left" : ntx }); //ul을 이동하고
            }
            else
            {
                _this.jxwrap.css({ "top" : ntx }); //ul을 이동하고
            }

        }
        else
        {
            //loop 가 아닐때/
            //console.log('  loop 가 아닐때    _this.nEX  '  , _this.nEX)

            if ( _this.default.sDirection == "horizontal")
            {
                _this.jxwrap.css( { "left" : _this.nEX + nCX } ); //ul을 이동하고
            }
            else
            {
                _this.jxwrap.css( { "top" : _this.nEY + nCY } ); //ul을 이동하고
            }

        }

    }).bind ( sEventEnd , function(e)
    {
        // e.stopPropagation();

        nMX = nPX = undefined ; //드래그 왔다 갔다 담는 값을 초기화

        _this.bPcIng = false; //피시에서 드래그 계속 되는것을 방지

        if ( _this.default.bAuto  ) { _this.addEventAuto(true); }

        if( _this.default.bLoop )
        {
            if ( _this.default.sDirection == "horizontal")
            {
                //루프 좌우
                if ( nCX <  _this.default.nSans * -1 )
                {
                    e.preventDefault();
                    /* 왼쪽으로 드래그는 _this.default.nSans (40) 보다 크게 움직였다는거여서 한번은 움직여야함 */
                    var ntx = loopLeftUpNTX();
                    _this.jxwrap.stop().animate({"left": ntx },  _this.default.nUlSpeed , _this.sEase , left_end );
                }
                else if ( nCX > _this.default.nSans )
                {
                    e.preventDefault();
                    var ntx = loopRightDownDragNTX();
                    _this.jxwrap.stop().animate({"left": ntx },  _this.default.nUlSpeed , _this.sEase  ,stop_end );
                }
                else
                {
                    if ( Math.abs(nCX) < Math.abs(nCY)  )
                    {
                        return;
                    }
                    if ( nCX >  0 )
                    {

                        _this.jxwrap.stop().animate({"left": _this.nMove * _this.nAddStep },  _this.default.nUlSpeed , _this.sEase  ,right_end );
                    }
                    if ( nCX < 0 )
                    {
                        //console.log("루프 아주 작게움직였다 왼쪽으로 " );
                        _this.jxwrap.stop().animate({"left": 0 },  _this.default.nUlSpeed , _this.sEase  , stop_end );
                    }
                }

            }
            else
            {
                //루프 상하
                if ( nCY <  _this.default.nSans*-1 )
                {
                    e.preventDefault();
                    var ntx = loopLeftUpNTX();
                    _this.jxwrap.stop().animate({"top": ntx },  _this.default.nUlSpeed , _this.sEase , left_end );
                }
                else if ( nCY > _this.default.nSans )
                {
                    e.preventDefault();
                    var ntx = loopRightDownDragNTX();
                    //console.log(  "오른쪽으로 드래그" );
                    _this.jxwrap.stop().animate({"top": ntx },  _this.default.nUlSpeed , _this.sEase  , stop_end );

                }
                else
                {
                    console.log("상하 루프 아주 작게움직였다")
                    if ( Math.abs(nCY) < Math.abs(nCX)  )
                    {
                        //console.log("아래로 스크롤 내릴때는 좌우 움직이지 마")
                        return;
                    }

                    if ( nCY >  0 )
                    {
                        _this.jxwrap.stop().animate({"top": _this.nMove * _this.nAddStep },  _this.default.nUlSpeed , _this.sEase , right_end );
                    }

                    if ( nCY < 0 )
                    {
                        //console.log("아주 작게움직였다 위쪽으로 " , nCX );
                        _this.jxwrap.stop().animate({"top": 0 },  _this.default.nUlSpeed , _this.sEase , stop_end );
                    }
                }

            }

            function loopLeftUpNTX()
            {

                if( !_this.bMovIng )
                {
                    _this.bMovIng = true;
                }


                if ( !_this.default.bGroupMove )
                {
                    _this.nAddStep++;
                    //console.log(  "왼쪽이나 위로 드래그 aa _this.nAddStep=   ", _this.nAddStep );
                    return ntx = (_this.nAddStep == 1)? (_this.nMove * _this.nAddStep * -1) :  (_this.nMove * (   _this.nAddStep - (_this.nAddStep-1)  ) * -1) ;
                }
                else
                {

                    //console.log(' loopLeftUpNTX ' , _this.nCurr )

                    if ( _this.nCurr + _this.default.nView > _this.nTotal-1 )
                    {

                        //_this.rv( _this.nTotal - _this.nCurr );
                        _this.nAddStep = (_this.nTotal - _this.nCurr);
                    }
                    else
                    {
                        //_this.rv( _this.default.nView );
                        _this.nAddStep = _this.default.nView;
                    }
                    //console.log(  "왼쪽이나 위로 드래그 bb _this.nAddStep=   ", _this.nAddStep );
                    //_this.nAddStep *= 2;
                    return ntx = _this.nMove * _this.nAddStep * -1 ;
                    //return ntx = (_this.nAddStep == 1)? (_this.nMove * _this.nAddStep * -1) :  (_this.nMove * (   _this.nAddStep - (_this.nAddStep-1)  ) * -1) ;
                }//loopLeftUpNTX

            }//loopLeftDrag

            function loopRightDownDragNTX()
            {
                //console.log(  "오른쪽이나 아래로 드래그 loopRightDownDragNTX ");
                if( !_this.bMovIng )
                {
                    _this.bMovIng = true;
                }
                //var ntx = (_this.nAddStep == 1)? (_this.nMove * _this.nAddStep * -1) :  (_this.nMove * (_this.nAddStep-1) * -1) ;
                return ntx = 0;
            }//loopRightDownDragNTX

            //마우스를 때자 마자 바로 값을 초기화를 한번은 하고 움직이고 나서도 한번 더 하자
            //nCX = 0;

            function left_end()
            {

                //var npa = (_this.nAddStep == 1)? 0 : 1;
                var npa

                if ( !_this.default.bGroupMove )
                {
                    npa = (  Math.abs( _this.nAddStep )  == 1)? 0 : Math.abs( _this.nAddStep ) -1;
                }
                else
                {
                    npa = 0;
                }

                //console.log('left end  _this.nAddStep ' , _this.nAddStep , npa)

                //console.log( "left end" , npa , _this.nAddStep - (_this.nAddStep-1) )
                for(var i = 0 ; i < Math.abs( _this.nAddStep ) - npa   ; i++)
                {
                    //console.log('sss  ' , i )
                    var $jxunit = _this.jxwrap.find(">.jx-unit:first");
                    _this.jxwrap.append( $jxunit );
                }

                stop_end();
            }//left_end

            function right_end()
            {
                //console.log('right  end  ' , _this.nAddStep)
                for(var i = 0 ; i < Math.abs(_this.nAddStep) ; i++ )
                {
                    var $jxunit = _this.jxwrap.find(">.jx-unit:first");
                    _this.jxwrap.append( $jxunit );
                }

                stop_end();

            }//right_end

            function stop_end()
            {
                //console.log('stop_end  _this.nAddStep ' , _this.nAddStep )

                if ( _this.default.sDirection == "horizontal")
                {
                    _this.jxwrap.css({"left":0});
                }
                else
                {
                    _this.jxwrap.css({"top":0});
                }

                drag_destrory(); //초기화
            }//stop_end

        }
        else
        {
            // loop가 아닐때

           var nAurr;
            if ( _this.bControl  || _this.default.bGroupMove )
            {
                //컨트롤이 있을땐  _this.default.nView 단위로 이동하면 되고
                nAurr = ( _this.default.nView == 1 )? 1 : _this.default.nView ; //몇칸을 더할것인지
                //nAurr = _this.default.nView ; //몇칸을 더할것인지

                //console.log('end   ' , nAurr )
            }
            else
            {
                //컨트롤이 없을땐  드래그 한정도에 따라서
                //var nAurr = ( _this.default.nView == 1 )? 1 : Math.round( nCX / (_this.nMove/_this.nActive ) ); //몇칸을 더할것인지
                if ( _this.default.sDirection == "horizontal")
                {
                    nAurr = Math.ceil( Math.abs ( nCX / _this.nMove  ) ); //몇칸을 더할것인지
                }
                else
                {
                    nAurr = Math.ceil( Math.abs ( nCY / _this.nMove  ) ); //몇칸을 더할것인지
                }

            }

            if ( nCX <  _this.default.nSans * -1 ||  nCY <  _this.default.nSans * -1)
            {
                //console.log("왼쪽으로 드래그  " ,  _this.nCurr  , nAurr )
                notLoopLeftUpDrag();
            }
            else if ( nCX > _this.default.nSans || nCY > _this.default.nSans )
            {
                //console.log(  "오른쪽으로 드래그" ,  _this.nCurr  , nAurr );
                notLoopRightDownDrag();
            }
            else
            {
                //console.log("아주작게 " ,      _this.bMovIng )
            }

            function notLoopLeftUpDrag()
            {
                if( !_this.bMovIng )
                {
                    _this.bMovIng = true;
                }

                //if ( _this.bControl || _this.default.bGroupMove )
                if ( _this.default.bGroupMove )
                {
                    _this.nCurr += _this.default.nView;
                    _this.nCurrPaging = Math.floor( _this.nCurr/_this.default.nView );

                    if (_this.nCurrPaging  > _this.nTotalPaging - 1)
                    {
                        _this.nCurrPaging = _this.nTotalPaging - 1;
                        _this.nCurr = _this.nCurrPaging * _this.default.nView +  _this.default.nStart;
                    }
                }
                else
                {
                    //nAurr++; //무조건 반내림을 해서:ceil 왼쪽으로 할땐 1을 더해주자
                    _this.nCurr += nAurr;
                    if ( _this.nCurr  > _this.nTotal   - _this.default.nView )
                    {
                        _this.nCurr = _this.nTotal  - _this.default.nView ;
                    }

                }

            }//notLoopLeftUpDrag

            function notLoopRightDownDrag()
            {
                if( !_this.bMovIng )
                {
                    _this.bMovIng = true;
                }

                if ( _this.bControl || _this.default.bGroupMove )
                {
                    _this.nCurr -= _this.default.nView;
                    _this.nCurrPaging = Math.floor( _this.nCurr/_this.default.nView );

                    if (_this.nCurrPaging  < 0 )
                    {
                        _this.nCurrPaging = 0;
                        //_this.nCurr = _this.nCurrPaging * _this.default.nView;
                        _this.nCurr = _this.nCurrPaging * _this.default.nView + _this.default.nStart;
                    }

                }
                else
                {
                    _this.nCurr -= nAurr;
                    //console.log("오른쪽  "  , Math.abs( _this.nCurr )  , nAurr)
                    if ( _this.nCurr < 0 )
                    {
                        _this.nCurr = 0;
                    }
                }

            }//notLoopRightDownDrag

            //console.log(  " 드래그" ,  _this.nCurr  ,   Math.round( _this.nCurr / _this.default.nView ) , Math.ceil( _this.nCurr / _this.default.nView )  , Math.floor( _this.nCurr / _this.default.nView ) );

            var ntx = _this.nMove * _this.nCurr  * -1;
            // var ntx = _this.nMove * (  Math.floor( _this.nCurr / _this.default.nView )  * _this.default.nView  )  * -1;

            if ( _this.default.sDirection == "horizontal")
            {
                _this.jxwrap.stop().animate({"left" : ntx } ,  _this.default.nUlSpeed , _this.sEase  ,drag_destrory);
            }
            else
            {
                _this.jxwrap.stop().animate({"top" : ntx } ,  _this.default.nUlSpeed , _this.sEase  ,drag_destrory);
            }

        }// if( _this.default.bLoop )

        function drag_destrory()
        {
            if ( _this.default.sDirection == "horizontal")
            {
                _this.nEX = _this.jxwrap.position().left; //드래그 다시 할때 필요한 엔드 값을 담는다.
            }
            else
            {
                _this.nEX = _this.jxwrap.position().top; //드래그 다시 할때 필요한 엔드 값을 담는다.
            }


            _this.bPcIng = false; //피시 드래그 방지

            _this.bIng = false;
            _this.bMovIng = false;
            //console.log("e drag_destrory------------------------------" , _this.bMovIng)

            _this.nSave = 0;
            _this.nCopy = 0;
            nPX = nPY = undefined;
            nMX = nMY = undefined;
            nCX = nCY = 0;
            _this.nAddStep = 0;

            //console.log(  "drag_destrory  " , _this.nEX )

            _this.callback();
        }

    })
}//JXSLIDER.prototype.addEventDrag

//동작후 콜백 함수
JXSLIDER.prototype.callback = function()
{

    var _this = this;

    if ( _this.default.bLoop )
    {

        _this.nCurr = _this.jxwrap.find(">.jx-unit").eq(_this.default.nBackCopy).data("num");
        if ( this.default.bGroupMove )
        {
            _this.nCurrPaging = Math.floor( _this.nCurr / _this.default.nView ) ;
        }
        else
        {
            _this.nCurrPaging = _this.nCurr;
        }

        _this.jxwrap.find(">.jx-unit").eq(_this.default.nBackCopy).addClass("on").siblings().removeClass("on");
    }
    else
    {
        _this.jxwrap.find(">.jx-unit").eq(_this.nCurr).addClass("on").siblings().removeClass("on");
    }


    if ( this.bControl )
    //if ( this.bControl && this.default.bGroupMove )
    {
        if ( this.default.bGroupMove )
        {
            this.jxcontrol.find(".jx-cbtn").eq( this.nCurrPaging ).addClass("on").siblings(".jx-cbtn").removeClass("on");
        }
        else
        {
            this.jxcontrol.find(".jx-cbtn").eq( this.nCurr ).addClass("on").siblings(".jx-cbtn").removeClass("on");
        }
    }


    //console.log('call   ' ,  _this.default.reCallFnc , typeof _this.default.reCallFnc ,  _this.default.reCallFnc !="" , typeof window[ _this.default.reCallFnc ] === 'function')

    if ( typeof _this.default.reCallFnc === 'string' )
    {
        var str = _this.default.reCallFnc.split(' ').join('');
        if( str.length > 0 && typeof window[str] === 'function')
        {
            //console.log('일단 빈문자가 아닌 함수명도 있고 함수도 정의된 경우만 ')

            if( this.bControl || _this.default.bGroupMove )
            {
                eval( _this.default.reCallFnc )(this.nCurrPaging);
            }
            else
            {
                eval( _this.default.reCallFnc )(this.nCurr);
            }

        }
        else
        {
            //console.log('일단 글자가 없는경우')
        }
    }
    else
    {
        //console.log('옵션을 넘기지 않았다')
    }


}//JXSLIDER.prototype.callback


//리사이즈 시 동작
JXSLIDER.prototype.resize = function()
{
    var _this = this;
    _this.default.bResize = true;

    //console.log('re ' , this.default.nView)
    //this.nMove =  this.jxbox.innerWidth() / this.nView ; // 한번씩 이동할 거리를 저장해둠
    if ( _this.default.sDirection == "horizontal")
    {
        this.nMove =  Math.ceil(this.jxbox.innerWidth() / this.default.nView) ; // 한번씩 이동할 거리를 저장해둠
        this.jxwrap.find(">.jx-unit").css({"width": Math.ceil( this.jxbox.innerWidth() / this.default.nView )-_this.default.nMargin , "margin-right": _this.default.nMargin }); // .jx-unit의 가로사이즈와 간격 ( 추후에 가로냐 세로냐를 추가해야함)
        this.jxwrap.css({"width" : this.nMove * this.nTotal }) // ul의 가로 사이즈를 .jx-unit의 갯수만큼
    }
    else
    {
        this.nMove =  Math.ceil(this.jxbox.innerHeight() / this.default.nView) ; // 한번씩 이동할 거리를 저장해둠
        this.jxwrap.find(">.jx-unit").css({"height": Math.ceil( this.jxbox.innerHeight() / this.default.nView )-_this.default.nMargin , "margin-bottom": _this.default.nMargin , "float" : "none" }); // .jx-unit의 가로사이즈와 간격 ( 추후에 가로냐 세로냐를 추가해야함)
        this.jxwrap.css({"height" : this.nMove * this.nTotal }) // ul의 가로 사이즈를 .jxunit의 갯수만큼
    }
    //this.default.nView = 4; //response가 있다면 그룹단위로 움지기이게 하지 말거나 페이징을 다시 바궈야함

    //console.log( "resize   nMove = " + this.nMove )
}//JXSLIDER.prototype.resize


