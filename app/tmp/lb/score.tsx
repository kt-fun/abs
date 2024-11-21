'use client'
import React, {useCallback, useEffect, useMemo, useRef, useState} from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
interface ScoreProps {
  scoreData: {
    name: string;
    score: number;
  }[],
  label: string,
  title: string,
  size: number,
  width?: number,
  height?: number,
  type: 'hitcnt'|'score'
}
import ChartDataLabels from 'chartjs-plugin-datalabels';
import ChartAnnotation from 'chartjs-plugin-annotation';
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartDataLabels,
  ChartAnnotation
);
import { Bar } from "react-chartjs-2";
import Chart from "chart.js/auto";
import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
dayjs.extend(duration);
Chart.defaults.backgroundColor = 'rgb(0,0,0,0)';
Chart.defaults.borderColor = 'rgb(0,0,0,0.1)';
Chart.defaults.color = '#ffffff';

// factor 1, 2,3,4
const splitter = (type: string, factor: number)=> ({
  borderColor: type == 'score' ? 'rgb(196, 71, 95, 0.7)' : 'rgba(53, 162, 235, 0.7)',
  type: 'line' as const,
  borderWidth: 0.7,
  scaleID: 'y',
  value: factor * 10 + 9.5,
  borderDash: [9, 9],
})


 function Score({
                        scoreData,
                        label,
                        title,
                        type,
                  size: s,
                        width,
                        height
                      }: ScoreProps) {
  const size = s ?? 100
  const options = {
    indexAxis: 'y' as const,
    elements: {},
    // responsive: true,
    width: width,
    height: height,
    plugins: {
      legend: {
        position: 'top' as const,
        labels: {
          borderRadius: 5,
          useBorderRadius: true,
        }
      },
      title: {
        display: true,
        text: title,
        font: {
          size: 40
        },
      },
      subtitle: {
        display: true,
        text: dayjs().add(dayjs.duration({hours:8})).format('YYYY-MM-DD HH:mm'),
      },
      datalabels: {
        color: 'white',
        labels: {},
        formatter: function(value: any) {
          if(type == 'hitcnt') {
            return (value/1000).toFixed(2) + "k";
          }
          return (value/10000).toFixed(2) + "w";
        }
      },
      scales: {
        x: {
          grid: {
            display: true,
            drawOnChartArea: true,
            drawTicks: true,
            color: '#ffffff'
          }
        },
        y: {
          border: {
            display: true
          },
          grid: {
            color: '#ffffff',
          },
        }
      },
      annotation: {
        common: {
          drawTime: 'afterDatasetsDraw' as const
        },
        annotations: {
          annotation0: {
            type: 'line' as const,
            borderColor: type == 'score' ? 'rgb(196, 71, 95)' : 'rgb(53, 162, 235)',
            label: {
              backgroundColor: type == 'score' ? 'rgb(196, 71, 95,0.5)' : 'rgb(53, 162, 235,0.5)',
              content: 'Top 3',
              display: true
            },
            borderWidth: 1,
            scaleID: 'y',
            value: 2.5,
            borderDash: [6, 6],
          },
          annotation1: {
            type: 'line' as const,
            borderColor: type == 'score' ? 'rgb(196, 71, 95)' : 'rgb(53, 162, 235)',
            label: {
              backgroundColor: type == 'score' ? 'rgb(196, 71, 95,0.5)' : 'rgb(53, 162, 235,0.5)',
              content: 'Top 10',
              display: true
            },
            borderWidth: 1,
            scaleID: 'y',
            value: 9.5,
            borderDash: [6, 6],
          },
          annotation2: splitter(type, 1),
          annotation3: splitter(type, 2),
          annotation4: splitter(type, 3),
          annotation5: {
            type: 'line' as const,
            borderColor: type == 'score' ? 'rgb(196, 71, 95)' : 'rgb(53, 162, 235)',
            label: {
              backgroundColor: type == 'score' ? 'rgb(196, 71, 95,0.5)' : 'rgb(53, 162, 235,0.5)',
              content: 'Top 50',
              display: true
            },
            borderWidth: 1,
            scaleID: 'y',
            value: 49.5,
            borderDash: [6, 6],
          },
          annotation6: splitter(type, 5),
          annotation7: splitter(type, 6),
          annotation8: splitter(type, 7),
          annotation9: splitter(type, 8),
        },
      }
    },
  };
  const data = {
    labels:scoreData.slice(0, size).map(it=> {
      let name = it.name
      if(it.name.length > 10) {
        name = it.name.slice(0,10) + "...";
      }
      return name
    }),
    datasets: [
      {
        label: label,
        data: scoreData.slice(0, size).map(it=>it.score),
        borderColor: type =='score' ? 'rgb(53, 162, 235)':'rgb(196, 71, 95)',
        backgroundColor: type =='score' ? 'rgba(53, 162, 235, 0.5)':'rgb(196, 71, 95, 0.5)',
        borderRadius: 5,
        borderWidth: 2,
        borderSkipped: false,
      },
    ],
  };

  return (
    <Bar options={options} data={data} width={width} height={height}/>
  )
}

export default React.memo(Score)

