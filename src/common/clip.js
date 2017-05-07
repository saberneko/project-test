class Clip {
  //需要用到vue实例中的属性， 所以传入一个$vm当闭包使用
  constructor(wpId, imgId, coverId, $vm) {
    //裁剪容器container中间为图片画布imageBox，图片画布上为裁剪遮罩层coverBox，裁剪遮罩层中间为裁剪框
    this.container = document.getElementById(wpId); //裁剪容器
    this.imageBox = document.getElementById(imgId); //图片画布
    this.coverBox = document.getElementById(coverId); //裁剪遮罩
    this.$vm = $vm;
  }

  init(file) {
    this.sx = 0; //裁剪框起点x坐标
    this.sy = 0; //裁剪框起点y坐标
    this.sWdith = 100; //裁剪框初始宽度
    this.sHeight = 100; //裁剪框初始高度
    this.chooseBoxScale = 1; //裁剪框宽高比

    this.handleFile(file);
  }

  handleFile(file) {
    //读取图片并将图片转为base64
    let t = this,
        reader = new FileReader();
    reader.onload = function() {
      t.imgUrl = this.result;
      t.panitImg(this.result);
    }
    reader.readAsDataURL(file);
  }
  //绘制图片画布
  panitImg(imgUrl) {

    let t = this;

    if(t.imageBox.getContext){
      var ctx = t.imageBox.getContext('2d');
    }

    //清空画布
    ctx.clearRect(0, 0, this.imageBox.width, this.imageBox.height);

    let img = new Image();
    img.src = imgUrl;

    img.onload = function() {

      let imgScale = img.width / img.height,
          boxScale = t.container.offsetWidth / t.container.offsetHeight;

      //判断源图片与裁剪容器的比例， 设置图片
      if(imgScale < boxScale) {
        t.imgWidth = t.container.offsetHeight * imgScale;
        t.imgHeight = t.container.offsetHeight;
      } else {
        t.imgWidth = t.container.offsetWidth;
        t.imgHeight = t.container.offsetWidth / imgScale;
      }

      //判断源图片与裁剪框的比例，设置裁剪框
      if(imgScale < t.chooseBoxScale) {
        //设置裁剪框宽高
        t.sWidth = t.imgWidth * (3/4);
        t.sHeight = t.sWidth / t.chooseBoxScale;
        //设置裁剪框起始位置
        t.sx = (t.imgWidth - t.sWidth) / 2;
        t.sy = (t.imgHeight - t.sHeight) / 2;
      } else {
        t.sHeight = t.imgHeight * (3/4);
        t.sWidth = t.sHeight * t.chooseBoxScale;

        t.sx = (t.imgWidth - t.sWidth) /2;
        t.sy = (t.imgHeight - t.sHeight) / 2;
      }

      //高分屏下图片模糊需要2倍处理
      t.imageBox.width = 2 * t.imgWidth;
      t.imageBox.height = 2 * t.imgHeight;
      t.imageBox.style.width = t.imgWidth + 'px';
      t.imageBox.style.height = t.imgHeight + 'px';

      //绘制图片
      ctx.drawImage(img, 0, 0, 2 * t.imgWidth, 2 * t.imgHeight);
      //绘制裁剪遮罩
      t.paintCover();
      //监听裁剪遮罩拖拽
      t.drag();
    }
  }

  paintCover() {
    let t = this,
        cover = t.coverBox.getContext('2d');

    //绘制裁剪遮罩
    t.coverBox.width = 2 * t.imgWidth;
    t.coverBox.height = 2 * t.imgHeight;

    t.coverBox.style.display = 'block';
    t.coverBox.style.width = t.imgWidth + 'px';
    t.coverBox.style.height = t.imgHeight + 'px';

    cover.fillStyle = "rgba(0, 0, 0, 0.7)";
    cover.fillRect(0, 0, 2 * t.imgWidth, 2 * t.imgHeight);
    //绘制裁剪框
    cover.clearRect(2 * t.sx, 2 * t.sy, 2 * t.sWidth, 2 * t.sHeight);
  }

  drag() {
    let t =this,
        draging = false;

    //拖拽初始横纵坐标
    let pageX = 0,
        pageY = 0;

    //拖拽初始位移
    let startX = 0,
        startY = 0;

    t.coverBox.addEventListener('touchstart', function(event) {
      //保证touchmove正常触发
      event.preventDefault();
      console.log(event)

      let e = event.touches[0];

      draging = true;

      pageX = e.pageX;
      pageY = e.pageY;

      startX = t.sx;
      startY = t.sy;

    })

    t.coverBox.addEventListener('touchmove', function(event) {
      console.log(event)
      let e = event.touches[0];

      let offsetX = e.pageX - pageX,
          offsetY = e.pageY - pageY;

      if(draging) {

        t.sx = startX + offsetX;
        t.sy = startY + offsetY;

        //限制裁剪框的范围
        if(t.sx <= 0 && t.sy <= 0) {
          t.sx = 0;
          t.sy = 0;
        } else if (t.sx >= t.imgWidth - t.sWidth && t.sy >= t.imgHeight - t.sHeight) {
          t.sx = t.imgWidth - t.sWidth;
          t.sy = t.imgHeight - t.sHeight;
        } else if (t.sx >= t.imgWidth - t.sWidth && t.sy <= 0) {
          t.sx = t.imgWidth - t.sWidth;
          t.sy = 0;
        } else if (t.sx <= 0 && t.sy >= t.imgHeight - t.sHeight) {
          t.sx = 0;
          t.sy = t.imgHeight - t.sHeight;
        } else if(t.sx <= 0 ) {
          t.sx = 0;
        } else if(t.sx >= t.imgWidth - t.sWidth) {
          t.sx = t.imgWidth - t.sWidth;
        } else if(t.sy <= 0) {
          t.sy = 0;
        } else if(t.sy >= t.imgHeight - t.sHeight) {
          t.sy = t.imgHeight - t.sHeight;
        }
        //重新绘制遮罩
        t.paintCover();
      }
    })

    t.coverBox.addEventListener('touchend', function(event) {
      console.log(event)
      draging = false;
    })
  }

  saveImg() {

    let t =this,
        saveCanvas = document.createElement('canvas'),
        ctx = saveCanvas.getContext('2d');

    saveCanvas.width = 300;
    saveCanvas.height = 300;

    let img = new Image();
    img.src = t.imgUrl;

    img.onload = function() {
      //计算剪裁尺寸用于剪裁图片
      let cropWidthScale = img.width / t.imgWidth,
          cropHeighScale = img.height / t.imgHeight;

      ctx.drawImage(img, cropWidthScale * t.sx, cropWidthScale * t.sy,
        cropWidthScale * t.sWidth, cropWidthScale * t.sHeight, 0, 0, 300, 300);

      t.$vm.clipUrl = saveCanvas.toDataURL("image/jpeg");
    }
  }

  cancelImg() {
    let t = this;
    t.$vm.isClip = false;
  }
}

export default Clip;
