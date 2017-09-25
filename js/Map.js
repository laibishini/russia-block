/**
 * Created by jne on 2017/9/22.
 */

(function(){
    /*存放已经沉底的*/
    window.Map = Class.extend({

        init:function(){
            /*有效的行列*/
            this.colAmount = 12;

            this.rowAmount = 24;
            /*存放地图抽象的数据*/
           this.existBlockMap = [
                "xxx000000000000xxx",
                "xxx000000000000xxx",
                "xxx000000000000xxx",
                "xxx000000000000xxx",
                "xxx000000000000xxx",
                "xxx000000000000xxx",
                "xxx000000000000xxx",
                "xxx000000000000xxx",
                "xxx000000000000xxx",
                "xxx000000000000xxx",
                "xxx000000000000xxx",
                "xxx000000000000xxx",
                "xxx000000000000xxx",
                "xxx000000000000xxx",
                "xxx000001000000xxx",
                "xxx000001000000xxx",
                "xxx000001000000xxx",
                "xxx000001000000xxx",
                "xxx000001000000xxx",
                "xxx000101000000xxx",
                "xxx000120000001xxx",
                "xxx123120000001xxx",
                "xxx120120000001xxx",
                "xxx112122234541xxx",
               " xxxxxxxxxxxxxxxxxx",
               " xxxxxxxxxxxxxxxxxx",
               " xxxxxxxxxxxxxxxxxx"
            ];

            /*存放方块对应真的存放*/
            this.existBlock = [
                [null,null,null,null,null,null,null,null,null,null,null,null],
                [null,null,null,null,null,null,null,null,null,null,null,null],
                [null,null,null,null,null,null,null,null,null,null,null,null],
                [null,null,null,null,null,null,null,null,null,null,null,null],
                [null,null,null,null,null,null,null,null,null,null,null,null],
                [null,null,null,null,null,null,null,null,null,null,null,null],
                [null,null,null,null,null,null,null,null,null,null,null,null],
                [null,null,null,null,null,null,null,null,null,null,null,null],
                [null,null,null,null,null,null,null,null,null,null,null,null],
                [null,null,null,null,null,null,null,null,null,null,null,null],
                [null,null,null,null,null,null,null,null,null,null,null,null],
                [null,null,null,null,null,null,null,null,null,null,null,null],
                [null,null,null,null,null,null,null,null,null,null,null,null],
                [null,null,null,null,null,null,null,null,null,null,null,null],
                [null,null,null,null,null,null,null,null,null,null,null,null],
                [null,null,null,null,null,null,null,null,null,null,null,null],
                [null,null,null,null,null,null,null,null,null,null,null,null],
                [null,null,null,null,null,null,null,null,null,null,null,null],
                [null,null,null,null,null,null,null,null,null,null,null,null],
                [null,null,null,null,null,null,null,null,null,null,null,null],
                [null,null,null,null,null,null,null,null,null,null,null,null],
                [null,null,null,null,null,null,null,null,null,null,null,null],
                [null,null,null,null,null,null,null,null,null,null,null,null],
                [null,null,null,null,null,null,null,null,null,null,null,null]
            ]

        },

        creatBlocksbymap:function(){

            /*这个页面总体的意思是更具鸟瞰图new出null里面变成实例*/

            /*根据地图把他创造出来砖块*/

            for(var r = 0 ; r < this.rowAmount; r ++){
                for(var c = 3; c < this.colAmount+3; c++){

                    /*如果这个方块的值存在就new 出来这个方块存到真实的数组里面去*/
                    var thisBlockColor = this.existBlockMap[r].substr(c,1);

                    //(thisBlockColor != "0") && (this.existBlockMap[r][c]&& (this.existBlock[r][c] = new CellBlock(r,c,thisBlockColor) ));
                    /*如果矩阵里的是0就是为null 如果不是0 就把他new 出来实时的更新出来地图一遍我就变成0我就变成null */
                    this.existBlock[r][c-3] = thisBlockColor != "0" ? this.existBlock[r][c] = new CellBlock(r,c-3,thisBlockColor):null;
                }
            }


        },

        renderAllExistBlocks:function(){

            for(var r = 0 ; r < 24; r ++){
                for(var c = 0; c < 12; c++){
                    /*我们要先保证existBlock他不是no来实现短路运算不是n*/
                   this.existBlock[r][c] && this.existBlock[r][c].render();

                }
            }

        },
            /*实现新老的融合*/
        addFourFourIntoMyMap:function(activeblock){
            for(var r = 0; r < 4; r ++){
                for(var c = 0; c < 4; c++){
                    var theAbChar = activeblock.fourfourMap[r].substr(c,1);
                    if(theAbChar !="0"){
                        this.existBlockMap[r + activeblock.row ]= zhangyizhi(this.existBlockMap[r + activeblock.row],c+activeblock.col+3,theAbChar);
                    }
                }
            }

            /*新老融合以后我们要，调用一下自己的根据地图渲染函数*/

            this.creatBlocksbymap();

        },
        xiaohang:function (){

            /*我们要判断是不是一行满了*/
            /* 首先我们要定义一个数组*/

            var fullrowNumber = [];

            /*然后遍历行数*/
            for(var row = this.rowAmount -1; row > 0; row --){

                var num = 0;

                for(var col = 3; col < this.colAmount + 3; col ++){
                    var c = this.existBlockMap[row].substr(col,1);


                    if(c == "0"){
                        num ++;
                    }
                }

                if(num == 0){
                    fullrowNumber.push(row);
                }

            }
            /*这个是遍历存储的数组*/
            for(var i = 0 ; i < fullrowNumber.length; i ++){
                this.existBlockMap[fullrowNumber[i]] = "xxx000000000000xxx";

                this.creatBlocksbymap();
            }

            for(var i = fullrowNumber.length -1;i >=0; i-- ){
                for(var j = fullrowNumber[i]; j > 0 ; j --){
                    this.existBlockMap[j] = this.existBlockMap[j -1];
                }

                this.creatBlocksbymap();
                alert(22)
            }



        }

    });

    /*新老融合关键函数传进某一位数字号码能替换我当前所写的字母var str = "abdcj"*/
    function zhangyizhi(obj,x,str){

        if(x >= obj.length -1){
            return obj.slice(0,x) + str;
        }else {
            return obj.slice(0,x) + str + obj.slice(x+1);
        }

    }





})()
