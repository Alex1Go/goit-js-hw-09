const e=document.querySelector("[data-start]"),t=document.querySelector("[data-stop]");let d=0;e.addEventListener("click",(()=>{d=setInterval((()=>{document.body.style.backgroundColor=`#${Math.floor(16777215*Math.random()).toString(16).padStart(6,0)}`}),1e3),e&&(e.disabled=!0,t.disabled=!1)})),t.addEventListener("click",(()=>{clearInterval(d),t&&(e.disabled=!1,t.disabled=!0)}));
//# sourceMappingURL=01-color-switcher.a686a1f4.js.map
