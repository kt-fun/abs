'use client'
import { useLayoutEffect } from 'react';
import * as am5 from "@amcharts/amcharts5";
import * as am5xy from "@amcharts/amcharts5/xy";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import {Percent} from "@amcharts/amcharts5";



// fetch data = []
function Race({
  allData,
  type
 }: {
  allData: Record<any, any>,
  type: 'hitcnt' | 'score'
}) {
  // 'rgb(196, 71, 95, 0.7)' : 'rgba(53, 162, 235, 0.7)'
  const tickColor = type == 'score' ? am5.color('rgb(196, 71, 95)') : am5.color('rgb(53, 162, 235)');
  const columnColor = type == 'score' ? am5.color('rgb(53, 162, 235)') : am5.color('rgb(196, 71, 95)');
  const title = type == 'hitcnt' ? 'Hit Count Top 100 Race' : 'Score Top 100 Race'
  const times = Object.keys(allData).sort()
  const prefix = type == 'hitcnt' ? { number: 1e3, suffix: "K" } : { number: 1e4, suffix: "W" };
  var stepDuration = 2000;
  useLayoutEffect(() => {
    var timeIdx = 0;
    var time = times[timeIdx];

    var root = am5.Root.new("chartdiv");

    root.numberFormatter.setAll({
      numberFormat: "#a",
      // Group only into M (millions), and B (billions)
      bigNumberPrefixes: [prefix],
      // Do not use small number prefixes at all
      smallNumberPrefixes: []
    });

    // Set themes
    // https://www.amcharts.com/docs/v5/concepts/themes/
    root.setThemes([am5themes_Animated.new(root)]);


    // Create chart
    // https://www.amcharts.com/docs/v5/charts/xy-chart/
    var chart = root.container.children.push(am5xy.XYChart.new(root, {
      panX: true,
      panY: false,
      wheelX: "none",
      wheelY: "none",
      layout: root.verticalLayout
    }));
    // We don't want zoom-out button to appear while animating, so we hide it at all
    chart.zoomOutButton.set("forceHidden", true);


    // Create axes
    // https://www.amcharts.com/docs/v5/charts/xy-chart/axes/
    // yAxes
    var yRenderer = am5xy.AxisRendererY.new(root, {
      minGridDistance: 10,
      maxHeight: 20,
      inversed: true,
      minorGridEnabled: true,
    });
    yRenderer.labels.template.setAll({
      fill: am5.color('#ffffff'),
      fontSize: "1em",
      maxHeight: 20,
    });

    yRenderer.grid.template.set("visible", true);

    var yAxis = chart.yAxes.push(am5xy.CategoryAxis.new(root, {
      maxDeviation: 0,
      categoryField: "playerName",

      renderer: yRenderer,
    }));

    const f = (display: any, y: number) => {
    //   draw dash line
      display.moveTo(0, y)
      const dash = 9
      let i = 0
      while(i * dash  < 1800) {
        display.lineTo(i * dash, y)
        display.moveTo(i * dash + dash, y)
        i += 2
      }
    }
    const getLine = (y: number) => {
      return am5.Graphics.new(root, {
        stroke: tickColor,
        fill: tickColor,
        position: 'absolute',
        draw: function (display) {
          f(display, y)
        }
      })
    }


    const yH = 29
    const baseH = 8 + 58
    const getLabel = (text:string, y: number) => {
      return am5.Label.new(root, {
        text: text,
        fontSize: '1.5rem',
        fontWeight: "500",
        textAlign: "center",
        fill: am5.color('#ffffff'),
        background: am5.RoundedRectangle.new(root, {
          fillOpacity: 0.5,
          fill: tickColor,
        }),
        x: 1800,
        centerX: am5.percent(200),
        y: y,
        centerY: am5.percent(50),
        position: 'absolute',
        paddingTop: 0,
        paddingBottom: 0
      })
    }
    var top3line = getLine(baseH + yH * 3)
    // var top10line = getLine(68 + 29.5 * 10)
    // var top50line = getLine(68 + 29.5 * 50)
    chart.children.push(top3line);
    const lines = new Array(9).fill(0).map((_, i) => {
      return getLine(baseH + yH * (i + 1) * 10)
    })
    lines.forEach(line => {chart.children.push(line)})

    chart.children.unshift(getLabel('Top3', 68 + yH * 3));
    chart.children.unshift(getLabel('Top10', 68 + yH * 10));
    chart.children.unshift(getLabel('Top50', 68 + yH * 50));

    // xAxes
    var xRenderer = am5xy.AxisRendererX.new(root, {})
    xRenderer.labels.template.setAll({
      fill: am5.color('#ffffff'),
      fontSize: "1em"
    });
    var xAxis = chart.xAxes.push(am5xy.ValueAxis.new(root, {
      maxDeviation: 0,
      min: 0,
      strictMinMax: true,
      extraMax: 0.1,
      renderer: xRenderer,
    }))

      xAxis.set("interpolationDuration", stepDuration / 10);

      xAxis.set("interpolationEasing", am5.ease.linear);



    // Add series
    // https://www.amcharts.com/docs/v5/charts/xy-chart/series/
    var series = chart.series.push(am5xy.ColumnSeries.new(root, {
      xAxis: xAxis,
      yAxis: yAxis,
      valueXField: "value",
      categoryYField: "playerName",

    }));

    // Rounded corners for columns
    series.columns.template.setAll({
      cornerRadiusBR: 5,
      cornerRadiusTR: 5,
      cornerRadiusBL: 5,
      cornerRadiusTL: 5
    });

    // Make each column to be of a different color
    series.columns.template.adapters.add('fillOpacity', () => 0.7)
    series.columns.template.adapters.add("fill", () => columnColor);

    series.columns.template.adapters.add("strokeOpacity", ()=> 1);
    series.columns.template.adapters.add("stroke", ()=> columnColor);
    // series.columns.template.set('maxHeight', 20)

    // Add label bullet
    series.bullets.push(function () {
      return am5.Bullet.new(root, {
        locationX: 1,
        sprite: am5.Label.new(root, {
          text: "{valueXWorking.formatNumber('#.## a')}",
          fill: am5.color('#ffffff'),
          x: am5.p100,
          centerX: new Percent(-10),
          centerY: am5.p50,
          populateText: true
        })
      });
    });
    // date label style
    var label = chart.children.unshift(am5.Label.new(root, {
      text: times[0],
      fontSize: "4em",
      fill: am5.color('#ffffff'),
      opacity: 0.7,
      x: am5.p100,
      centerX: am5.p100,
      paddingTop: 10,
      paddingRight: 10,
      position: "absolute",
    }));
    // title
    chart.children.unshift(am5.Label.new(root, {
      text: title,
      fontSize: 48,
      fontWeight: "500",
      textAlign: "center",
      fill: am5.color('#ffffff'),
      x: am5.p50,
      centerX: am5.p50,
      paddingTop: 0,
      paddingBottom: 0,
      position: "relative",
    }));

    // Get series item by category
    function getSeriesItem(category: any) {
      for (var i = 0; i < series.dataItems.length; i++) {
        var dataItem = series.dataItems[i];
        if (dataItem.get("categoryY") == category) {
          return dataItem;
        }
      }
    }

    yAxis.get("renderer").labels.template.setAll({
      oversizedBehavior: "truncate",
      maxWidth: 120,
      ellipsis: "..."
    });
    // yAxis.get('renderer').labels.template.adapters.add('text', (target, x) => {
    //   console.log("label",target, x)
    //   console.log("labelx",x.get)
    //   return 'Custom Label'; });
    // Axis sorting
    function sortCategoryAxis() {
      // sort by value
      series.dataItems.sort(function (x, y) {
        return y.get("valueX")! - x.get("valueX")!; // descending
        //return x.get("valueX") - y.get("valueX"); // ascending
      });

      // go through each axis item
      am5.array.each(yAxis.dataItems, function (dataItem) {
        // get corresponding series item
        var seriesDataItem = getSeriesItem(dataItem.get("category"));

        if (seriesDataItem) {
          // get index of series data item
          var index = series.dataItems.indexOf(seriesDataItem);
          // calculate delta position
          var deltaPosition =
            (index - dataItem.get("index", 0)) / series.dataItems.length;
          // set index to be the same as series data item index
          if (dataItem.get("index") != index) {
            dataItem.set("index", index);
            // set deltaPosition instanlty
            dataItem.set("deltaPosition", -deltaPosition);
            // animate delta position to 0
            dataItem.animate({
              key: "deltaPosition",
              to: 0,
              duration: stepDuration / 2,
              easing: am5.ease.out(am5.ease.cubic)
            });
          }
        }
      });
      // sort axis items by index.
      // This changes the order instantly, but as deltaPosition is set, they keep in the same places and then animate to true positions.
      yAxis.dataItems.sort(function (x, y) {
        return x!.get("index")! - y!.get("index")!;
      });
    }


    // update data with values each 1.5 sec
    var sortInterval = setInterval(function () {
      sortCategoryAxis();
    }, 100);

    var interval = setInterval(function () {
      // console.log("step", stepDuration, time ,timeIdx)
      timeIdx++
      time = times[timeIdx]

      if (timeIdx == times.length) {
        clearInterval(interval);
        clearInterval(sortInterval);
        yAxis.zoomToIndexes(0, 100);
        return
      }
      updateData();
    }, stepDuration);

    function setInitialData() {
      var d = allData[time];
      for (var n in d) {
        series.data.push({ playerName: n, value: d[n] });
        yAxis.data.push({ playerName: n });
      }
    }

    function updateData() {
      var itemsWithNonZero = 0;
      if (allData[time]) {
        label.set("text", time.toString());

        am5.array.each(series.dataItems, function (dataItem) {
          var category = dataItem.get("categoryY")!;
          var value = allData[time][category];
          if (value > 0) {
            itemsWithNonZero++;
          }
          dataItem.animate({
            key: "valueX",
            to: value,
            duration: stepDuration,
            easing: am5.ease.linear
          });
          dataItem.animate({
            key: "valueXWorking",
            to: value,
            duration: stepDuration,
            easing: am5.ease.linear
          });
        });

        // yAxis.zoom(0, itemsWithNonZero / yAxis.dataItems.length);
        yAxis.zoomToIndexes(0, 100);
      }
    }

    setInitialData();


    yAxis.events.on("datavalidated", ()=>{
      var totalCount = yAxis.dataItems.length;
      yAxis.zoomToIndexes(0, 100);
    })

    // Make stuff animate on load
    // https://www.amcharts.com/docs/v5/concepts/animations/
    series.appear(1000);
    chart.appear(1000, 200);


    return () => {
      root.dispose();
    };
  }, [allData, columnColor, tickColor, title, times]);
  return (
    <div id="chartdiv" style={{ width: "1800px", height: "3000px" }}></div>
  );
}
export default Race;