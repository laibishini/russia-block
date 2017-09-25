/**
 * Created by jne on 2017/9/22.
 */
(function(){

    /*细胞方块类，有行列颜色属性渲染等方法*/
    window.CellBlock = Class.extend({
            /*row~23; col:0~11;color:1~7*/
        init :function(row,col,color){

            this.row = row ;

            this.col = col;

            this.color = color;

        },
        render:function(){              /*如果他是0 */
            game.ctx.drawImage(game.images.cellBlock,20*(this.color - 1),0,20,20,this.col * 20,this.row * 20,20,20);
        }

    })

})();