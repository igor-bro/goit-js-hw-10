import"./assets/styles-1668bd8f.js";import{i as a}from"./assets/vendor-651d7991.js";const i=document.querySelector(".form");i.addEventListener("submit",o=>{o.preventDefault();const t=new FormData(i),s={};t.forEach((e,r)=>{s[r]=e}),c(s).then(e=>n(e)).catch(e=>n(e,!0)),i.reset()});function c({delay:o,state:t}){return new Promise((s,e)=>{setTimeout(()=>{t==="fulfilled"?s(`✅ Fulfilled promise in ${o}ms`):e(`❌ Rejected promise in ${o}ms`)},o)})}function n(o,t=!1){a.show({title:t?"Error":"OK",titleColor:"#FFF",titleSize:"16px",message:o,messageColor:"#FFF",messageSize:"16px",position:"topCenter",backgroundColor:t?"#EF4040":"#59A10D",iconUrl:t?"./octagon.svg":"./check.svg",progressBarColor:t?"#FFBEBE":"#B5EA7C",timeout:1e4,targetFirst:!1,close:!1,buttons:[[`<button type="button" id="izi-close-button">
                 <img src="./x.svg" alt="" width="16px" height="16px" />
              </button>`,function(s,e){s.hide({},e,"buttonName")}]]})}
//# sourceMappingURL=commonHelpers2.js.map
