/**
 * Created by Administrator on 2019/1/4 0004.
 */
//等所有的资源都加载完成后才调用
window.onload = function(){
//    获取dom元素
//    头部区域的获取
    var headerLiNodes = document.querySelectorAll('.nav li');
    var headerArrowNode = document.querySelector('.arrow');
    var headerUpNodes = document.querySelectorAll('.nav li .up');

    //内容区域的获取
    var contentUlNodes = document.querySelector('.contentMain');
    var contentNode = document.querySelector('.content');

    //内容区域设置的变量
    var contentHeight = contentNode.offsetHeight;
    var nowIndex = 0;
    var wheelTimer = null;

    //头部函数
    header();
    function header(){
//    初始化第一个headerUpNodes的宽度为100%
        headerUpNodes[0].style.width = '100%';
//    初始化小箭头来到第一个li下
        headerArrowNode.style.left = headerLiNodes[0].getBoundingClientRect().left +  headerLiNodes[0].offsetWidth / 2 - headerArrowNode.offsetWidth / 2 + 'px';
//    给所有的li绑定点击事件
        for(var i = 0;i < headerLiNodes.length; i++){
            headerLiNodes[i].index = i;

            headerLiNodes[i].onclick = function(){
                //点击时同步nowindex 的值
                nowIndex = this.index;
                move(this.index);
            }
        }
    }

//    内容区域的滚轮事件
    content();
    function content(){
        document.onmousewheel = wheel;
        document.addEventListener('DOMMouseScroll',wheel);

        function wheel(event) {
            event = event || window.event;
            //函数反斗 防止函数多次调用  优化函数性能  规定时间内调用的函数还有最后一次生效
            clearTimeout(wheelTimer);
            wheelTimer = setTimeout(function(){
                var flag = '';
                if (event.wheelDelta) {
                    //ie/chrome
                    if (event.wheelDelta > 0) {
                        flag = 'up';
                    } else {
                        flag = 'down'
                    }
                } else if (event.detail) {
                    //firefox
                    if (event.detail < 0) {
                        flag = 'up';
                    } else {
                        flag = 'down'
                    }
                }
                switch (flag) {
                    case 'up' :
                        //范围限定
                        if(nowIndex > 0){
                            nowIndex--;
                            // console.log('up');
                            move(nowIndex);
                        }
                        break;
                    case 'down' :
                        if(nowIndex < 4){
                            nowIndex++;
                            move(nowIndex);
                        }
                        break;
                }
            },100);

            //禁止默认行为
            event.preventDefault && event.preventDefault();
            return false;
        }

    }

//    调整窗口的大小事件
    window.onresize = function(){
        headerArrowNode.style.left = headerLiNodes[nowIndex].getBoundingClientRect().left +  headerLiNodes[nowIndex].offsetWidth / 2 - headerArrowNode.offsetWidth / 2 + 'px';
        //让内容区的ul跟着移动
        contentUlNodes.style.top = -nowIndex * contentHeight + 'px';
    }

//    封装函数(公共的区域)
    function move(nowIndex){

        //默认清空所有的width为0
        for(var j = 0;j < headerUpNodes.length; j++){
            headerUpNodes[j].style.width = '0';
        }
        //手动设置为100%；
        headerUpNodes[nowIndex].style.width = '100%';
        //   让小箭头去指定的li的位置下
        headerArrowNode.style.left = headerLiNodes[nowIndex].getBoundingClientRect().left +  headerLiNodes[nowIndex].offsetWidth / 2 - headerArrowNode.offsetWidth / 2 + 'px';

        //让内容区的ul跟着移动
        contentUlNodes.style.top = -nowIndex * contentHeight + 'px';
    }

//    第一屏区域的代码
    homeHandle();
    function homeHandle(){
        var homePointNodes = document.querySelectorAll('.home_point li');
        var homeUlNode = document.querySelector('.home_carousel');
        var homeLiNodes = document.querySelectorAll('.home_carousel li');

        //上一次的下标
        var lastIndex = 0;
    //    当前的下标值
        var nowIndex = 0;

    //    给每个小圆点绑定单击事件
        for(var i=0;i<homePointNodes.length;i++){

            homePointNodes[i].onclick = function(){
                // console.log('wo');

                //清除掉所有的class
                for (var j = 0; j < homeLiNodes.length; j++) {
                    homeLiNodes[j].className = 'commonTitle';
                }

                if(nowIndex > lastIndex){
                //    点击的是右边
                    homeLiNodes[nowIndex].className = 'commonTitle rightShow';
                    homeLiNodes[lastIndex].className = 'commonTitle leftHide';
                }else{
                //    点击的是左边
                    homeLiNodes[nowIndex].className = 'commonTitle leftShow';
                    homeLiNodes[lastIndex].className = 'commonTitle rightHide';
                }
            //    同步下标
                lastIndex = nowIndex;
            }

        }
    }

}
