//-------------------<固定値>------------------------------------------------------------

//origin_xaspect=13
var origin_xaspect=13;
//origin_yaspect=18.5
var origin_yaspect=18.5;
var seed=1.5;
//--------------------<パラメーター>------------------------------------------------------

//ブラウザ上で表示するサイズ
//id=drawheatmapのサイズに合わせる
var widthpx=500;
var heightpx=700;
//実際の縦横比
var x_aspect=13;
var y_aspect=18.5;
//任意のpanの値/そのpanの値からカメラに対する角度
var denominator=75;
//--------------------------------------------------------------------------------------

var x_magnification=Math.round((widthpx/x_aspect)*10)/10;
var y_magnification=Math.round((heightpx/y_aspect)*10)/10;
var function_magnification = Math.round((origin_xaspect/x_aspect)*10)/10;


var x1,x2,y1,y2;
var degree;
var radian;


$(document).ready(function()
{
// ここに処理を記述します
$.ajaxSetup({async: false});//同期通信(json取ってくるまで待つ)
$.getJSON('http://127.0.0.1:8000/heatmap/json', function(data)
//$.getJSON('http://172.16.42.83:8000/heatmap/json', function(data)
{
  //alert(window.parent.screen.width);
  var svg = d3.select("#drawheatmap").append("svg").attr({ width: 500,height: 700 });
  var r =5
  var speed = 1200;

    //data.length-1
  for(var i =0;i<data.length-1;i++)
  {
    y1=calculate.y(data[i]['ptz_z'],y_magnification,function_magnification,seed);
    y2=calculate.y(data[i+1]['ptz_z'],y_magnification,function_magnification,seed);
    x1=calculate.x(data[i]['ptz_p'],data[i]['ptz_z'],denominator,x_magnification,function_magnification,widthpx,seed);
    x2=calculate.x(data[i+1]['ptz_p'],data[i+1]['ptz_z'],denominator,x_magnification,function_magnification,widthpx,seed);


    svg.append("circle")
          .transition()
          .delay(i*speed)
          .attr("cx",x1)
          .attr("cy",y1)
          .attr("r",r)
          .attr("fill","red")
          .attr("stroke-width",5)
          .attr("stroke","orange")


    svg.append("line")
            .transition()
            .delay(i*speed)
            .attr("x1",x1)
            .attr("x2",x2)
            .attr("y1",y1)
            .attr("y2",y2)
            .attr("stroke-width",2)
            .attr("stroke","blue");

  }
});
$.ajaxSetup({async: true});
});



var  calculate ={
y : function(zoom,y_mag,func_mag,seed){
  seed=Math.ceil((seed/func_mag)*10)/10;
  var y = (180*(0.017+Math.pow(1/4,(zoom/1000))))/func_mag;
  return Math.ceil((y+seed)*y_mag);
},

x:function(pan,zoom,deno,x_mag,func_mag,widthpx,seed){
  var degree=Math.ceil(pan/deno);
  var radian=degree*(Math.PI/180);
  seed=Math.ceil((seed/func_mag)*10)/10;
  var y = (180*(0.017+Math.pow(1/4,(zoom/1000))))/func_mag;
  var x=y*Math.tan(radian);
  return Math.ceil(x*x_mag)+widthpx/2;
}

}
