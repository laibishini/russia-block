/**
 * Created by jne on 2017/9/22.
 */
/*h活动恶方块类*/

(function(){
    /*我们要罗列他的类型种类就是俄罗斯方块的类型比如L I Z S 型*/
    var  allType = {
        "I":[["0010","0010","0010","0010",],["0000","1111","0000","0000"]],
        "L":[
                ["0200","0200","0220","0000"],
                ["0000","2220","2000","0000"],
                ["2200","0200","0200","0000"],
                ["0020","2220","0000","0000"]

        ],
        "J":[
                ["0300","0300","3300","0000"],
                ["3000","3330","0000","0000"],
                ["0330","0300","0300","0000"],
                ["0000","3330","0030","0000"]

        ],
        "Z":[
                ["0000","4400","0440","0000"],
                ["0400","4400","4000","0000"]


        ],
        "T":[
                ["0000","5550","0500","0000"],
                ["0500","5500","0500","0000"],
                ["0500","5550","0000","0000"],
                ["0500","0550","0500","0000"]

        ],
        "O":[
            ["0110","0110","0000","0000"]
        ],
        "S":[
                ["0770","7700","0000","0000"],
                ["7000","7700","0700","0000"]

        ]

    }


    window.ActiveBlock = Class.extend({

        init:function(row,col){

            this.row = 0 ;

            this.col = 6;

            this.bindListener();

            /*这句话的意思是touchmove往下的函数节流*/


            this.ronghe = false;



                /*也有行的和列左上角那个方块的行和列*/

            /*那么有了地图的模型我们就随机选一位模型*/
            this. typechar = "ILJZTOS";
            /*随机选一位*/
            this. randomChar =this.typechar.substr(parseInt(Math.random()*7),1);

            /*还有一个就是随机选取一个方向*/
                /*当前形态的总数`*/
            this.directionAmount = allType[this.randomChar].length;

            this.dirction = parseInt(Math.random()*this.directionAmount);

            /*4*4的小矩阵地图也是抽象的*/
            this.fourfourMap = allType[this.randomChar][this.dirction];

            /*存放真实数据的地图的矩阵*/

            this.fourfourBlock = [
                [null,null,null,null],
                [null,null,null,null],
                [null,null,null,null],
                [null,null,null,null]
            ];

        },

        goleft:function(){

            var qiepian = [];

            for (var r = this.row; r < this.row + 4; r ++){
                /*xxx不能切所以是从3列开始切*/
                qiepian.push(game.map.existBlockMap[r].substr(this.col+3-1,4));

            }
            if( checktofourfour(qiepian,this.fourfourMap)){
                this.col --;
                this.createFFBlockBymap();

            }

        },
        /*按上键改变他的方向*/
        changeDirection:function(){

            /*现在我们要进行是不是能够旋转的，切片。还是要切片
            * 那么我们就要哪一个小手术刀切existBlockMap当前行当前列的切片*/

            if(this.dirction > this.directionAmount -1){
                this.dirction = 0;


            }
            /*重新得到一个自己的44矩阵必须能旋转所以写一个测试*/

            var testfourfourMap = allType[this.randomChar][(this.dirction+1)%this.directionAmount];


            var qiepian = [];

            for (var r = this.row; r < this.row + 4; r ++){
                /*xxx不能切所以是从3列开始切*/
                qiepian.push(game.map.existBlockMap[r].substr(this.col+3,4));

            }
            if( checktofourfour(testfourfourMap,qiepian)){
               this.fourfourMap = testfourfourMap;
                this.createFFBlockBymap();
                this.dirction ++;
            }else {



            }





        },

        goright:function(){

            /*右边移动还是切当前列+1*/
            var qiepian = [];

            for (var r = this.row; r < this.row + 4; r ++){
                /*xxx不能切所以是从3列开始切*/
                qiepian.push(game.map.existBlockMap[r].substr(this.col+3+1,4));



            }
            if( checktofourfour(qiepian,this.fourfourMap)){
                this.col ++;
                this.createFFBlockBymap();

            }

        },

        /*让他左右移动绑定监听*/
        bindListener:function(){
            var that = this;
            document.onkeydown = function(event){
                if(event.keyCode == 37){

                    that.goleft();
                    /*左边*/
                }else if(event.keyCode == 38){
                    that.changeDirection();
                    /*上边*/
                }else if(event.keyCode == 39 ){
                    that.goright();
                    /*右边*/
                }else if(event.keyCode == 40){
                    that.godown();

                    that.gobottom();
                    /*下边*/
                }
            }

            /*绑定手机时间*/

            var startX ;
            var startY;

            var yidong = false;

            /*触摸开始*/
            game.canvas.addEventListener("touchstart",function(event){
                startX= event.touches[0].pageX;
                startY= event.touches[0].pageY;
                console.log(startX)

            })
            /*触摸左右移动*/
            game.canvas.addEventListener("touchmove",function(event){
                /*让当前移动的X 减去开始的X值*/
                var dX = event.touches[0].pageX - startX;
                var dY = event.touches[0].pageY - startY;
                /*判定标准*/
                if(dX < -20){
                    that.goleft();
                    /*接着在移动的位置恢复成开始点击的位置*/
                    startX = event.touches[0].pageX;
                    yidong = true;
                }else if (dX > 20){
                    that.goright();
                    yidong=false;

                    startX = event.touches[0].pageX;
                }

                /*手指往下*/

                if(!that.ronghe){
                    console.log(that.ronghe)

                    if(dY > 100 && !game.dddd){

                        that.gobottom();

                        that.dddd = true;
                    }

                }




            });

            game.canvas.addEventListener("touchend",function(){
                /*旋转，并不是每次手指从屏幕上拿开，就应该旋转如果用户的这次触摸，导致了盒子的左边移动，那么我们就不应该出发旋转*/
                /*手指离开的时候不应该旋转*/
                if(!yidong && !this.dddd){
                    that.changeDirection();
                }

                /*如果手指抬起来我将要把他恢复成*/
                yidong = false;


            });


        },

        /*让他移动*/
        godown:function(){
            var that = this
            /*我们要进行判断那么我就要切game.map里的字符串，切成4*4的第row 切四位第col列四个数*/
            var qiepian = [];

            for (var r = this.row + 1; r < this.row + 5; r ++){
                qiepian.push(game.map.existBlockMap[r].substr(this.col+ 3,4));

            }

            /*至此我们有两个4*4矩阵了
            * 那么我们现在的工作就是要比较qiepain和this.fourfourmap是否位置都不是零
            * */



           if( checktofourfour(qiepian,this.fourfourMap)){
               this.row ++;
               this.createFFBlockBymap();
               return true;
           }else {
               /*如果不能旋转了就不能下降了说明我们要融合了 把自己加进去*/
               game.map.addFourFourIntoMyMap(this);

                /*如果融合了我在*/
               /*测试一下融合地图的情况 */

               /*融合了就new 出新的来*/
               game.activeblock = new ActiveBlock();

               that.ronghe = true;


               /*然后我们需要消除行列*/

               game.map.xiaohang();

               return false;
           }




        },
        gobottom:function(){
          while (this.godown()){
              /*如果不能了*/
              this.godown();

          }
        },

        /*根据地图生存矩阵实时运动的根据地图修改*/

        createFFBlockBymap:function(){
        /*我要遍历他*/
            for(var r = 0 ; r < 4; r ++){
                for(var c = 0 ; c < 4 ; c++){
                    /*这位的颜色是不是零*/

                    /*细胞方块是根据当前的这个活动的方式 比如当前行数5行8列每个小方块是居中的那么我们应该错开*/
                    var color = this.fourfourMap[r].substr(c,1);

                    this.fourfourBlock[r][c] = color != "0"? new CellBlock(this.row + r,this.col + c,color):null;

                }
            }
        },
        /*渲染这个活动的方块*/
        render:function(){
            for(var r = 0 ; r < 4; r ++){
                for(var c = 0 ; c < 4 ; c++){

                    /*渲染矩阵里面的render*/

                    this.fourfourBlock[r][c] && this.fourfourBlock[r][c].render();

                }
            }

        }


    });
        /*这个函数检测AB两个，矩阵是不是有项目位置上的重合f返回
        * true表示没有重合
        * */
    function checktofourfour(A,B){

        for(var r = 0; r < 4; r++){
            for(var c = 0; c < 4; c ++){
                var Achar = A[r].substr(c,1);
                var Bchar = B[r].substr(c,1);
                /* 太精妙了就是如果现在裁切的这个两张四成四的切片数让他每一位做比较，如果
                * 如果不是零说明重合了我返回重合false不是就是返回true;
                * */
                if(Achar != "0" && Bchar != "0"){
                    return false;
                }
            }


        }

        return true;

    }
})()