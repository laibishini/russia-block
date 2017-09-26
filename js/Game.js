/**
 * Created by Danny on 2015年9月13日10:12:42
 */
(function(){
    //中介者模式
    window.Game = Class.extend({
        // 初始化
        init : function(params){
            //画布、上下文，都是game的属性
            this.canvas = document.getElementById(params.canvasid);
            this.ctx = this.canvas.getContext("2d");
            //帧率
            this.fps = params.fps;
            //静态资源管理
            var sr = new StaticResoucesUtil();
            //这个对象里面，存放着所有图片
            this.images = null;
            var self = this;
            sr.loadImages("r.json",function(alreayNum,allNum,images){
                //这个函数，将执行3次（因为一共有3张图片）
                self.ctx.clearRect(0,0,self.canvas.width,self.canvas.height);
                self.ctx.font = "20px 微软雅黑";
                self.ctx.fillText("正在加载图片资源，当前" + alreayNum + " / " + allNum,20,40);
                //当全部图片已经加载完毕，那么开始游戏
                if(alreayNum == allNum){
                    self.images = images;

                    self.run();
                }
            });
            //自己的帧管理器
            this.frameUtil = new FrameUtil();

            this.dddd = false




        },
        //开始
        run : function(){


            this.map = new Map();

            this.map.creatBlocksbymap();
            /*移动的小方格*/
            this.activeblock = new ActiveBlock(1,1);

            this.activeblock.createFFBlockBymap();

            console.log(this.activeblock.fourfourBlock)
            /*移动的小方格*/


            //设置主循环
            var self = this;
            this.timer = setInterval(function(){
                self.mainloop();
            },1000 / this.fps);
        },
        // 每帧执行
        mainloop : function(){
            //清除屏幕
            this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height);

            this.frameUtil.update();

            this.ctx.fillText(this.frameUtil.currentFrame, 300,20)
            this.ctx.fillText("FPS "+ this.frameUtil.realFps, 255,40)

            this.map.renderAllExistBlocks();

            /*渲染自己实时移动的小方块就是往下落的4*4的矩形*/
            this.activeblock.render();


           /* if(this.frameUtil.currentFrame %30 == 0){
                this.activeblock.godown();
            }*/
            //
            if(this.frameUtil.currentFrame %30 == 0) {
                this.activeblock.godown();
            //
            //
            }




        },
        stop : function(){
            clearInterval(this.timer);
        }
    });
})();