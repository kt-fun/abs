'use client'
import {useCallback, useEffect, useMemo, useRef, useState} from "react";
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
  type: 'hit'|'score'
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
import html2canvas from "html2canvas";
import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
dayjs.extend(duration);
Chart.defaults.backgroundColor = 'rgb(0,0,0,0)';
Chart.defaults.borderColor = 'rgb(0,0,0,0.1)';
Chart.defaults.color = '#ffffff';
export default function Score({
  scoreData,
  label,
  title,
  type
}:ScoreProps) {
  const options = {
    indexAxis: 'y' as const,
    elements: {
    },
    responsive: true,
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
          if(type == 'hit') {
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
          drawTime: 'beforeDraw' as const
        },
        annotations: {
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
          }
        },
      }
    },
  };
  const data = {
    labels:scoreData.map(it=> {
      let name = it.name
      if(it.name.length > 10) {
        name = it.name.slice(0,10) + "...";
      }
      return name
    }),
    datasets: [
      {
        label: label,
        data: scoreData.map(it=>it.score),
        borderColor: type =='score' ? 'rgb(53, 162, 235)':'rgb(196, 71, 95)',
        backgroundColor: type =='score' ? 'rgba(53, 162, 235, 0.5)':'rgb(196, 71, 95, 0.5)',
        borderRadius: 5,
        borderWidth: 2,
        borderSkipped: false,
      },
    ],
  };
  const ref = useRef(null);
  return (
    <div>
      <div className={"relative z-10 overflow-hidden rounded-lg"} id={'render-result'} ref={ref}>
        <div className={"bg-blend-darken bg-black/[.6] z-10 rounded-lg w-[1400px] h-[2048px] flex justify-center mx-auto"}>
          <Bar options={options} data={data} width={1380} height={2048}
          />
        </div>
        <img src={"https://loliapi.com/acg/pe"} className={'inset-0 w-[1400px] h-[2048px] absolute -z-10 object-cover'}
             loading={'eager'}/>
      </div>
    </div>

  )
}



const exportAsImage = async (element:HTMLElement, imageFileName:string) => {
  const html = document.getElementsByTagName("html")[0];
  const body = document.getElementsByTagName("body")[0];
  let htmlWidth = html.clientWidth;
  let bodyWidth = body.clientWidth;
  const newWidth = element.scrollWidth - element.clientWidth;
  if (newWidth > element.clientWidth) {
    htmlWidth += newWidth;
    bodyWidth += newWidth;
  }
  html.style.width = htmlWidth + "px";
  body.style.width = bodyWidth + "px";
  const canvas = await html2canvas(element);
  const image = canvas.toDataURL("image/png", 1.0);
  downloadImage(image, imageFileName);
  // html.style.width = null;
  // body.style.width = null;
};

const downloadImage = (blob:string, fileName:string) => {
  let fakeLink = window.document.createElement("a");
  fakeLink.style.display = 'none'
  fakeLink.download = fileName;
  fakeLink.href = blob

  document.body.appendChild(fakeLink);
  fakeLink.click();
  document.body.removeChild(fakeLink);

  fakeLink.remove();
};