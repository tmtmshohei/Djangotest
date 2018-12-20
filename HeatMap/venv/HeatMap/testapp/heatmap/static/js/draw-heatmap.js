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


var point={};
var points = [];
var value_max = 300;
var x,y,value;
var pan,zoom;
var degree;
var radian;

  $(document).ready(function()
{
  $.ajaxSetup({async: false});//同期通信(json取ってくるまで待つ)
  //$.getJSON('http://172.16.42.83:8000/heatmap/json', function(data)
  $.getJSON('http://127.0.0.1:8000/heatmap/json', function(data)
  {
    var heatmapInstance = h337.create(
    {
      container: document.getElementById('drawheatmap')
    });

    //data.length
    for(var i =0;i<data.length;i++)
    {
      if(i!=0)
      {
        if(Number(data[i]['Time'])-Number(data[i-1]['Time'])<=0){value=0;}
        else{value = Number(data[i]['Time'])-Number(data[i-1]['Time']);}
      }
      else if(i==0)
      {
        if(Number(data[i]['Time'])-Number(data[i]['Time'])<=0){value=0;}
        else{value = Number(data[i]['Time'])-Number(data[i]['Time']);}
      }
      else{alert("Data length is Invalid Value")}

      pan=data[i]['ptz_p'];
      zoom=((data[i]['ptz_z']));
      degree=Math.ceil(pan/denominator);
      radian=degree*(Math.PI/180);
      var add=Math.ceil((seed/function_magnification)*10)/10;


      y=(180*(0.017+Math.pow(1/4,(zoom/1000))))/function_magnification;
      x=y*Math.tan(radian);;
      y=Math.ceil((y+add)*y_magnification);
      x=Math.ceil(x*x_magnification)+widthpx/2;


      point={x:x,y:y,value:value};
      points.push(point);
    }

    // heatmap data format
    var data =
    {
      max: value_max,
      data: points
    };
    //make data
    heatmapInstance.setData(data);

  });
    $.ajaxSetup({async: true});
});
