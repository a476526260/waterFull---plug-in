/**
 * Created by dennyzhou on 2016/6/30.
 */
(function($){
    $.fn.waterFull=function(options){
        $.fn.waterFull.defalut={
            col:6,
            spacingX:10,
            spacingY:10
        };
        opts=$.extend($.fn.waterFull.defalut,options);
        return this.each(function(){
            var $ths=$(this),minH,maxH,pos;
            function WaterFull(){}

            WaterFull.prototype.init=function(){
                var arrH=[];
                $ths.find(".item").css({"width":($ths.find(".waterFull_inner").width()-(opts.col-1)*opts.spacingX)/opts.col});
                $ths.find(".item").each(function(i,e){
                    if(i<opts.col){
                        $(e).css({"left":($ths.find(".item").outerWidth()+opts.spacingX)*i});
                        arrH.push($(e).outerHeight());
                    }else{
                      //  console.log(arrH);
                        minH=Math.min.apply(null,arrH);
                        pos=$.inArray(minH,arrH);     //最小高度在数组中的位置
                        $(e).css({"left":pos*($ths.find(".item").outerWidth()+opts.spacingX),"top":opts.spacingY+minH});
                        arrH[pos]=minH+$(e).outerHeight()+opts.spacingY;
                       // console.log(pos);
                    }
                });
                maxH=Math.max.apply(null,arrH);
                $ths.find(".waterFull_inner").css("height",maxH);
            };
            var waterFull=new WaterFull();
            waterFull.init();
            $(window).scroll(function(){
                var h=$ths.find(".item").last().offset().top;
                var scroll=$(window).scrollTop()>h-$(window).height();
                //console.log(scroll);
                var html='<div class="item"><a href="" target="_blank"><img src="images/'+Math.floor(Math.random()*5+1)+'.jpg" alt=""></a></div><div class="item"><a href="" target="_blank"><img src="images/'+Math.floor(Math.random()*5+1)+'.jpg" alt=""></a></div><div class="item"><a href="" target="_blank"><img src="images/'+Math.floor(Math.random()*5+1)+'.jpg" alt=""></a></div><div class="item"><a href="" target="_blank"><img src="images/'+Math.floor(Math.random()*5+1)+'.jpg" alt=""></a></div>';
                if(scroll){
                    $ths.find(".waterFull_inner").append($(html));
                    waterFull.init();

                }
            });

        })
    };
})(jQuery);



window.onload=function(){
    $("#waterFull").waterFull({
        col:6,
        spacingX:15,
        spacingY:15
    })
};