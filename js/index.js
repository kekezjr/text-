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

  //侧边导航栏
  var navLiNodes = document.querySelectorAll('.navList li');

    //音乐
  var musicNode = document.querySelector('.music');
  var musicIconNode = document.querySelector('.music-icon');

    //第一屏dom
  var homeUlNode = document.querySelector('.home_carousel');

    //第二屏dom元素
  var plane1Node = document.querySelector('.plane1');
  var plane2Node = document.querySelector('.plane2');
  var plane3Node = document.querySelector('.plane3');

    //第三屏
  var workPencel1Node = document.querySelector('.pencel1');
  var workPencel2Node = document.querySelector('.pencel2');
  var workPencel3Node = document.querySelector('.pencel3');

    //第四屏
  var aboutImgNode = document.querySelectorAll('.aboutImg');

    //第五屏
  var teamTitleNode = document.querySelector('.teamTitle');
  var teamContentNode = document.querySelector('.teamContent');

    //内容区域设置的变量
  var contentHeight = contentNode.offsetHeight;
  var nowIndex = 0;
  var lastIndex = 0;
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
        contentUlNodes.style.top = -nowIndex * contentNode.offsetHeight + 'px';
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

    //    侧标导航



    //上一屏做出厂动画，下一屏做入场动画
    animationArr[lastIndex].anOut();
    animationArr[nowIndex].anIn();

    lastIndex = nowIndex;
    }

//    第一屏区域的代码
    homeHandle();
    function homeHandle(){
        var homePointNodes = document.querySelectorAll('.home_point li');
        var homeLiNodes = document.querySelectorAll('.home_carousel li');

//         //上一次的下标
        var lastIndex = 0;
    //    当前的下标值
        var nowIndex = 0;
        var lastTime = 0;

        var timer = null;
    //    给每个小圆点绑定单击事件
        for(var i=0;i<homePointNodes.length;i++){
            homePointNodes[i].index = i;
            homePointNodes[i].onclick = function(){
                //函数节流，规定时间内，只让第一次操作，后面的不生效
                //如果点击的时间小于两秒  事件不生效
                var nowTime = Date.now();
                if(nowTime - lastTime <= 2000) return;
//                同步上次点击的时间
                lastTime = nowTime;

//                同步index的值
                nowIndex = this.index;
                //清除掉所有的class
                for (var j = 0; j < homeLiNodes.length; j++) {
                    homeLiNodes[j].className = 'commonTitle';
                }

                if(nowIndex === lastIndex) return;

                if(nowIndex > lastIndex){
                //    点击的是右边
                    homeLiNodes[nowIndex].className = 'commonTitle right-show';
                    homeLiNodes[lastIndex].className = 'commonTitle left-hide';
                }else{
                //    点击的是左边
                    homeLiNodes[nowIndex].className = 'commonTitle left-show';
                    homeLiNodes[lastIndex].className = 'commonTitle right-hide';
                }

                //小圆点同步
                homePointNodes[lastIndex].className = '';
                this.className = 'active';

            //    同步下标
                lastIndex = nowIndex;
            }

        }
    //    鼠标移入
        homeUlNode.onmouseenter = function(){
        //    定时器关闭
            clearInterval(timer);
        }
    //    鼠标移出
        homeUlNode.onmouseleave = autoplay;

    //    自动轮播
        autoplay();
        function autoplay(){
            timer = setInterval(function(){
                nowIndex++;
                if(nowIndex >= 4){
                    nowIndex = 0;
                }
                //右边显示
                homeLiNodes[nowIndex].className = 'commonTitle right-show';
                homeLiNodes[lastIndex].className = 'commonTitle left-hide';

                //小圆点同步
                homePointNodes[lastIndex].className = '';
                homePointNodes[nowIndex].className = 'active';

                //    同步index的值
                lastIndex = nowIndex;
            },2500);
        }
    }


//    第五屏区域的代码
    teamHandle();
    function teamHandle(){
    //    获取dom元素
        var teamUlNode = document.querySelector('.teamList');
        var teamLiNodes = document.querySelectorAll('.teamList li');

        var width = teamLiNodes[0].offsetWidth;
        var height = teamLiNodes[0].offsetHeight;

        var canvas = null;

        var timer1 = null;
        var timer2 = null;

        //给li绑定鼠标移入事件
        for(var i=0;i<teamLiNodes.length;i++){
            teamLiNodes[i].index = i;
            teamLiNodes[i].onmouseenter = function(){
            //    其他的li变成0.5的透明色
                for(var j=0;j<teamLiNodes.length;j++){
                    teamLiNodes[j].style.opacity = 0.5;
                }
                this.style.opacity = 1;

              if(!canvas){
                //  创建画布
                canvas = document.createElement('canvas');
                //  设置宽高
                canvas.width = width;
                canvas.height = height;
                canvas.className = 'canvas';
                //产生气泡运动
                bubble(canvas);
                teamUlNode.appendChild(canvas);

              }
              //不管canvas有没有创建成功，都得改变left的值
              canvas.style.left = this.index * width + 'px';
            }
        }

    //    给ul绑定鼠标移出事件
        teamUlNode.onmouseleave = function(){
            //给所有的li的透明度变成1
            for(var j=0;j<teamLiNodes.length;j++){
                teamLiNodes[j].style.opacity = 1;
            }
        //    清除画布
          canvas.remove();
          canvas = null;

        //  关闭定时器
          clearInterval(timer1);
          clearInterval(timer2);
        }
        //气泡运动
        function bubble(canvas){
          //       处理canvas的兼容问题
          if(canvas.getContext){

            var width = canvas.width;
            var height = canvas.height;

//        圆的数据数组
            var circleArr = [];
            // 获取画笔
            var painting = canvas.getContext('2d');
//        生成随机圆
            timer1 = setInterval(function(){
//            颜色随机
              var r = Math.round(Math.random() * 225);
              var g = Math.round(Math.random() * 225);
              var b = Math.round(Math.random() * 225);
//            半径随机
              var c_r = Math.round(Math.random() * 8 + 2);    //半径从2到10
//            起始位置随机
              var x = Math.round(Math.random() * width);
              var y = canvas.height + c_r;

//            缩放的系数
              var s = Math.round(Math.random() * 50 + 10);

//            填到数组中
              circleArr.push({
                r : r,
                g : g,
                b : b,
                x : x,
                y : y,
                c_r : c_r,
                deg : 0,
                s : s
              })
            },50);

//        画圆
            timer2 = setInterval(function(){
//            清除画布
              painting.clearRect(0, 0, width, height);
              for(var i=0;i<circleArr.length;i++){
                var item = circleArr[i];
//              增加角度
                item.deg += 4;
//              求取弧度
                var rad = item.deg * Math.PI / 180;
//              小圆点的运动坐标
                var nowLeft = item.x + Math.sin(rad) * item.s;
                var nowTop = item.y - rad * item.s;

//              将超出小圆点的坐标清除掉
                if(nowTop <= -item.c_r){
                  circleArr.splice(i , 1);
                  continue;
                }

//              绘制颜色
                painting.fillStyle = 'rgba(' +item.r + ', ' + item.g + ', ' + item.b + ', 1)';
//              开始一条路径
                painting.beginPath();
//              画圆
                painting.arc(nowLeft , nowTop , item.c_r , 0 , Math.PI * 2);
//              填充
                painting.fill();
              }
            },1000 / 60);

          }

        }

    }


//头部音乐
  musicNode.onclick = function(){
    if(musicIconNode.paused){
    //  说明当前音乐暂停，点击播放
      musicIconNode.play();
      this.style.backgroundImage = 'url("./img/musicon.gif")';
    }else{
      //  说明当前音乐是播放，点击静音
      musicIconNode.pause();
      this.style.backgroundImage = 'url("./img/musicoff.gif")';
    }

  }



//出入场动画
  var animationArr = [
    {    //第一屏
      anOut : function() {
        //  出厂动画
        homeUlNode.style.transform = 'translateY(-200px)';
        homeUlNode.style.opacity = 0;
      },
      anIn : function() {
        //  入场动画化
        homeUlNode.style.transform = 'translateY(0)';
        homeUlNode.style.opacity = 1;
      }
    },

    {    //第二屏
      anOut : function() {
        //  出厂动画  左上  左下  右上
        plane1Node.style.transform = 'translate(-200px,-200px)';
        plane2Node.style.transform = 'translate(-200px,200px)';
        plane3Node.style.transform = 'translate(200px,-200px)';
      },
      anIn : function() {
        //  入场动画化
        plane1Node.style.transform = 'translate(0,0)';
        plane2Node.style.transform = 'translate(0,0)';
        plane3Node.style.transform = 'translate(0,0)';
      }
    },

    {   //第三屏
      anOut : function(){
        //出厂动画  1 上  2 上  3 下
        workPencel1Node.style.transform = 'translateY(-100px)';
        workPencel2Node.style.transform = 'translateY(100px)';
        workPencel3Node.style.transform = 'translateY(100px)';
      },
      anIn : function(){
      //入场动画
        workPencel1Node.style.transform = 'translateY(0)';
        workPencel2Node.style.transform = 'translateY(0)';
        workPencel3Node.style.transform = 'translateY(0)';
      }
    },

    {   //第四屏
      anOut : function(){
      //  出厂动画
        aboutImgNode[0].style.transform = 'rotate(45deg)';
        aboutImgNode[1].style.transform = 'rotate(-45deg)';
      },
      anIn : function(){
      //  入场动画
        aboutImgNode[0].style.transform = 'rotate(0)';
        aboutImgNode[1].style.transform = 'rotate(0)';
      }
    },

    {  //第五屏
      anOut : function(){
        //  出厂动画
        teamTitleNode.style.transform = 'translateX(-100px)';
        teamContentNode.style.transform = 'translateX(100px)';

      },
      anIn : function(){
        //  入场动画
        teamTitleNode.style.transform = 'translateX(0)';
        teamContentNode.style.transform = 'translateX(0)';
      }
    }
  ]

  // 初始化时所有的屏都得做出厂动画
  for(var i = 0 ; i< animationArr.length ; i++){
    animationArr[i].anOut();
  }

  // animationArr[4].anOut();
  // setTimeout(function(){
  //   animationArr[4].anIn();
  // },1500)
  // move(4);

//开机动画
  bootAnimation();
  function bootAnimation(){
    //获取dom元素
    var bootAnimationNode = document.querySelector('.bootAnimation');
    var bootTopNode = document.querySelector('.bootAnimation .top');
    var bootBottomNode = document.querySelector('.bootAnimation .bottom');
    var bootLineNode = document.querySelector('.bootAnimation .line');

  //  根据图片来决定加载的进度
    var imageArr = ['bg1.jpg','bg2.jpg','bg3.jpg','bg4.jpg','bg5.jpg','about1.jpg','about2.jpg','about3.jpg','about4.jpg','worksimg1.jpg','worksimg2.jpg','worksimg3.jpg','worksimg4.jpg','team.png','greenLine.png'];

    var num = 0;   //加载完成图片的数量
    for(var i=0;i<imageArr.length;i++){
      var item = imageArr[i];
    //  创建图片容器
      var image = new Image();
      image.src = './img/' + item;

    // 绑定事件
      image.onload = function(){
      //  图片加载完成触发onload事件
        num++;
        //  说明图片加载完成
          bootLineNode.style.width = num / imageArr.length * 100 + '%';

          if(num === imageArr.length){
          //  说明图片都加载完成 ，要打开遮罩层
            bootTopNode.style.height = 0;
            bootBottomNode.style.height = 0;
            bootLineNode.style.display = 'none';

            bootTopNode.addEventListener('transitionend',function(){
              bootAnimationNode.remove();
            //  第一屏要做入场动画
              animationArr[0].anIn();
            })
          }

      }

    }

  }








//    侧边导航栏
//     for(var i=0;i<navLiNodes.length;i++){
//         navListNode[i].index = i;
//         navLiNodes[i].onclick = function(){
//             nowIndex = this.index;
//                move(nowIndex);
//         }
//     }

}
