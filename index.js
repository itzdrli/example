var http = require("http");
var echarts = require("echarts");
const { createCanvas, Image } = require("canvas");

const pic = 'data:image/png;base64,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'
echarts.setPlatformAPI({
  // 同老版本的 setCanvasCreator
  createCanvas() {
    return createCanvas();
  },
  loadImage(src, onload, onerror) {
    const img = new Image();
    // 必须要绑定 this context.
    img.onload = onload.bind(img);
    img.onerror = onerror.bind(img);
    img.src = src;
    return img;
  }
});

function renderChart() {
  const canvas = createCanvas(400, 300);
  const chart = echarts.init(canvas);

  let option = {
    xAxis: {
      type: 'category',
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    },
    yAxis: {
      type: 'value'
    },
    series: [{
      data: [820, 932, 901, 934, 1290, 1330, 1320],
      type: 'scatter',
      symbol: 'image://' + pic, // 使用Base64图像作为符号
      symbolSize: 50, // 符号大小。你可以根据需要调整这个值
    }]
  };

  chart.setOption(option);
  return canvas;
}

http
  .createServer(function (req, res) {
    res.writeHead(200, {
      "Content-Type": "image/png"
    });
    res.write(renderChart().toBuffer("image/png"));
    res.end();
  })
  .listen(8080);

console.log("http://localhost:8080")
