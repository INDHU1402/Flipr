window.onload = function () {
    var dataPoints1 = [], dataPoints2 = [], dataPoints3 = [];
    var stockChart = new CanvasJS.StockChart("chartContainer",{
      theme: "light2",
      exportEnabled: true,
      title:{
        text:"Chart"
      },
      charts: [{
        toolTip: {
          shared: true
        },
        axisX: {
          lineThickness: 5,
          tickLength: 0,
          labelFormatter: function(e) {
            return "";
          }
        },
        axisY: {
          prefix: "$"
        },
        legend: {
          verticalAlign: "top"
        },
        data: [{
          showInLegend: true,
          name: "Stock Price (in USD)",
          yValueFormatString: "$#,###.##",
          type: "candlestick",
          dataPoints : dataPoints1
        }]
      },{
        height: 100,
        toolTip: {
          shared: true
        },
        axisY: {
          prefix: "$",
          labelFormatter: addSymbols
        },
        legend: {
          verticalAlign: "top"
        },
        data: [{
          showInLegend: true,
          name: "Volume (BTC/USD)",
          yValueFormatString: "$#,###.##",
          dataPoints : dataPoints2
        }]
      }],
      navigator: {
        data: [{
          dataPoints: dataPoints3
        }],
        slider: {
          minimum: new Date(2018, 06, 01),
          maximum: new Date(2018, 08, 01)
        }
      }
    });
    $.getJSON("https://canvasjs.com/data/docs/btcusd2018.json", function(data) {
      for(var i = 0; i < data.length; i++){
        dataPoints1.push({x: new Date(data[i].date), y: [Number(data[i].open), Number(data[i].high), Number(data[i].low), Number(data[i].close)]});;
        dataPoints2.push({x: new Date(data[i].date), y: Number(data[i].volume_usd)});
        dataPoints3.push({x: new Date(data[i].date), y: Number(data[i].close)});
      }
      stockChart.render();
    });
    function addSymbols(e){
      var suffixes = ["", "K", "M", "B"];
      var order = Math.max(Math.floor(Math.log(e.value) / Math.log(1000)), 0);
      if(order > suffixes.length - 1)
        order = suffixes.length - 1;
      var suffix = suffixes[order];
      return CanvasJS.formatNumber(e.value / Math.pow(1000, order)) + suffix;
    }
  }