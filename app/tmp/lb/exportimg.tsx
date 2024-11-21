import html2canvas from "html2canvas";

export const exportAsImage = async (element:HTMLElement, imageFileName:string) => {
  // const html = document.getElementsByTagName("html")[0];
  // const body = document.getElementsByTagName("body")[0];
  // let htmlWidth = html.clientWidth;
  // let bodyWidth = body.clientWidth;
  // const newWidth = element.scrollWidth - element.clientWidth;
  // if (newWidth > element.clientWidth) {
  //   htmlWidth += newWidth;
  //   bodyWidth += newWidth;
  // }
  // html.style.width = htmlWidth + "px";
  // body.style.width = bodyWidth + "px";
  const canvas = await html2canvas(element, {
    allowTaint: true,
    useCORS: true,
    ignoreElements: (element) => {
      return element.classList.contains("canvas-no-export");
    },
    scale: 1
  });
  const image = canvas.toDataURL("image/png", 1.0);
  downloadImage(image, imageFileName)
  // html.style.width = null;
  // body.style.width = null;
};

const downloadImage = async (blob:string, fileName:string) => {
  let fakeLink = window.document.createElement("a");
  fakeLink.style.display = 'none'
  fakeLink.download = fileName;
  fakeLink.href = blob

  document.body.appendChild(fakeLink);
  fakeLink.click();
  document.body.removeChild(fakeLink);

  fakeLink.remove();
};