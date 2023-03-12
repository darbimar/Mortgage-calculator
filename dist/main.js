!function(){"use strict";let e={selectedProgram:.104,cost:12e6,minPrice:375e3,maxPrice:1e8,minPaymentPercent:.15,maxPaymentPercent:.9,paymentPercent:.5,payment:6e6,getMinPayment:function(){return this.cost*this.minPaymentPercent},getMaxPayment:function(){return this.cost*this.maxPaymentPercent},programs:{base:.104,it:.047,gov:.067,fam:.057,east:.02,mil:.098,zero:.107},term:10,minTerm:1,maxTerm:30},t={rate:e.selectedProgram};function n(){return{...e}}function a(){return{...t}}function r(n){"buttonProgram"===n.onUpdate&&("zero-value"===n.id?e.minPaymentPercent=0:e.minPaymentPercent=.15),"inputCost"!==n.onUpdate&&"costSlider"!==n.onUpdate||(n.cost<e.minPrice?n.cost=e.minPrice:n.cost>e.maxPrice&&(n.cost=e.maxPrice),e.payment=e.getMinPayment()),"inputPayment"===n.onUpdate&&(n.paymentPercent=100*n.payment/e.cost/100),"paymentSlider"===n.onUpdate&&(n.paymentPercent=n.paymentPercent/100,e.payment=e.cost*n.paymentPercent),"inputTerm"===n.onUpdate&&(n.term<e.minTerm?n.term=e.minTerm:n.term>e.maxTerm&&(n.term=e.maxTerm)),e={...e,...n};const a=12*e.term,r=e.cost-e.payment,o=e.selectedProgram/12,s=(1+o)**a,l=r*o*s/(s-1),i=l*a-r,c=2*l;t={rate:e.selectedProgram,totalAmount:r,monthPayment:l,overPayment:i,necessaryIncome:c}}const o=new Intl.NumberFormat("ru-Ru",{style:"currency",currency:"RUB",maximumFractionDigits:0}),s=new Intl.NumberFormat("ru-Ru",{style:"currency",currency:"RUB",maximumFractionDigits:2});var l=function(e){document.querySelector("#total_percent").innerHTML=(100*e.rate).toFixed(1)+"%",document.querySelector("#month_payment").innerHTML=s.format(e.monthPayment),document.querySelector("#total_amount").innerHTML=o.format(e.totalAmount),document.querySelector("#over_payment").innerHTML=s.format(e.overPayment),document.querySelector("#necessary_income").innerHTML=s.format(e.necessaryIncome)},i=function(e,t){e.dispatchEvent(new CustomEvent("updateForm",{bubbles:!0,detail:{...t}}))};window.onload=function(){const e=n;!function(e){const t=document.querySelectorAll('button[name="program"]'),n=document.querySelector(".switch-btn"),{base:a,it:r,gov:o,fam:s,east:l,mil:c,zero:m}=e().programs;document.querySelector("#base-value").value=a,document.querySelector("#it-value").value=r,document.querySelector("#gov-value").value=o,document.querySelector("#fam-value").value=s,document.querySelector("#east-value").value=l,document.querySelector("#mil-value").value=c,document.querySelector("#zero-value").value=m,document.querySelector("#base-text").innerHTML=100*a+"%",document.querySelector("#it-text").innerHTML=100*r+"%",document.querySelector("#gov-text").innerHTML=100*o+"%",document.querySelector("#fam-text").innerHTML=100*s+"%",document.querySelector("#east-text").innerHTML=100*l+"%",document.querySelector("#mil-text").innerHTML=100*c+"%",document.querySelector("#zero-text").innerHTML=100*m+"%",t.forEach((function(e){e.addEventListener("click",(function(){(async()=>{t.forEach((e=>{e.classList.remove("button_active"),n.classList.remove("switch-on")}))})(),e.className="button button_active",i(this,{selectedProgram:parseFloat(this.value),onUpdate:"buttonProgram",id:this.id})})),n.addEventListener("click",(()=>{"button button_active"===e.className&&("switch-btn switch-on"===n.className?(n.classList.remove("switch-on"),i(e,{selectedProgram:parseFloat(e.value),onUpdate:"buttonProgram"})):"switch-btn switch-on"!==n.className&&(n.classList.add("switch-on"),i(e,{selectedProgram:parseFloat(e.value)-.01,onUpdate:"buttonProgram"})))}))}))}(e);const t=function(e){const t=document.querySelector("#input-cost"),n=e(),a=new Cleave(t,{numeral:!0,numeralThousandsGroupStyle:"thousand",delimiter:" "});return a.setRawValue(n.cost),t.addEventListener("input",(function(){const e=+a.getRawValue();e<n.minPrice||e>n.maxPrice?t.closest(".param__details").classList.add("param__details--error"):t.closest(".param__details").classList.remove("param__details--error"),i(t,{cost:e,onUpdate:"inputCost"})})),t.addEventListener("blur",(function(){const e=+a.getRawValue();e<n.minPrice?(t.closest(".param__details").classList.remove("param__details--error"),a.setRawValue(n.minPrice)):e>n.maxPrice&&(t.closest(".param__details").classList.remove("param__details--error"),a.setRawValue(n.maxPrice)),i(t,{cost:+a.getRawValue(),onUpdate:"inputCost"})})),a}(e),o=function(e){const t=document.querySelector("#slider-cost"),n=e();return noUiSlider.create(t,{start:n.cost,connect:"lower",tooltips:!1,step:1e5,range:{min:n.minPrice,"1%":[4e5,1e5],"50%":[12e6,1e6],max:n.maxPrice}}),t.noUiSlider.on("slide",(function(){let e=t.noUiSlider.get();e=e.split(".")[0],i(t,{cost:e,onUpdate:"costSlider"})})),t}(e),s=function(e){const t=document.querySelector("#input-downpayment"),n=new Cleave(t,{numeral:!0,numeralThousandsGroupStyle:"thousand",delimiter:" "});return n.setRawValue(e().payment),t.addEventListener("input",(function(){const a=+n.getRawValue();a<e().getMinPayment()||a>e().getMaxPayment()?t.closest(".param__details").classList.add("param__details--error"):t.closest(".param__details").classList.remove("param__details--error"),i(t,{payment:a,onUpdate:"inputPayment"})})),t.addEventListener("blur",(function(){const a=+n.getRawValue();a<e().getMinPayment()?(t.closest(".param__details").classList.remove("param__details--error"),n.setRawValue(e().getMinPayment())):a>e().getMaxPayment()&&(t.closest(".param__details").classList.remove("param__details--error"),n.setRawValue(e().getMaxPayment())),i(t,{payment:+n.getRawValue(),onUpdate:"inputPayment"})})),n}(e),c=function(e){const t=document.querySelector("#slider-downpayment");return noUiSlider.create(t,{start:100*e().paymentPercent,connect:"lower",tooltips:!1,step:1,range:{min:100*e().minPaymentPercent,max:100*e().maxPaymentPercent}}),t.noUiSlider.on("slide",(function(){let e=t.noUiSlider.get();e=e.split(".")[0],i(t,{paymentPercent:e,onUpdate:"paymentSlider"})})),t}(e),m=function(e){const t=document.querySelector("#input-term"),n=e(),a=new Cleave(t,{numeral:!0,numeralThousandsGroupStyle:"thousand",delimiter:" "});return a.setRawValue(n.term),t.addEventListener("input",(function(){const e=+a.getRawValue();e<n.minTerm||e>n.maxTerm?t.closest(".param__details").classList.add("param__details--error"):t.closest(".param__details").classList.remove("param__details--error"),i(t,{term:e,onUpdate:"inputTerm"})})),t.addEventListener("blur",(function(){const e=+a.getRawValue();e>n.maxTerm?(t.closest(".param__details").classList.remove("param__details--error"),a.setRawValue(n.maxTerm)):e<n.minTerm&&(t.closest(".param__details").classList.remove("param__details--error"),a.setRawValue(n.minTerm)),i(t,{term:+a.getRawValue(),onUpdate:"inputTerm"})})),a}(e),u=function(e){const t=document.querySelector("#slider-term"),n=e();return noUiSlider.create(t,{start:n.term,connect:"lower",tooltips:!1,step:1,range:{min:n.minTerm,max:n.maxTerm}}),t.noUiSlider.on("slide",(function(){let e=t.noUiSlider.get();e=e.split(".")[0],i(t,{term:e,onUpdate:"termSlider"})})),t}(e);!function(){const e=document.querySelector("select"),t=document.querySelector("#base-value"),n=document.querySelector("#it-value"),a=document.querySelector("#gov-value"),r=document.querySelector("#fam-value"),o=document.querySelector("#east-value"),s=document.querySelector("#mil-value"),l=document.querySelector("#zero-value");"secondary"===e.value&&(t.style.display="block",o.style.display="block",s.style.display="block",l.style.display="block"),e.addEventListener("change",(function(){"secondary"===e.value&&(t.style.display="block",n.style.display="none",a.style.display="none",r.style.display="none",o.style.display="block",s.style.display="block",l.style.display="block"),"newbuilding"!==e.value&&"buy_house"!==e.value&&"build_house"!==e.value||(t.style.display="block",n.style.display="block",a.style.display="block",r.style.display="block",o.style.display="block",s.style.display="block",l.style.display="block"),"refinance"===e.value&&(t.style.display="block",n.style.display="none",a.style.display="none",r.style.display="none",o.style.display="none",s.style.display="none",l.style.display="block")}))}(),r({});const d=a();l(d),document.addEventListener("updateForm",(e=>{r(e.detail);const i=n(),d=a();!function(e){"buttonProgram"===e.onUpdate&&(function(e){document.querySelector("#percents-from").innerHTML=100*e.minPaymentPercent+"%"}(e),c.noUiSlider.updateOptions({range:{min:100*e.minPaymentPercent,max:100*e.maxPaymentPercent}})),"inputCost"!==e.onUpdate&&t.setRawValue(e.cost),"costSlider"!==e.onUpdate&&o.noUiSlider.set(e.cost),"inputPayment"!==e.onUpdate&&s.setRawValue(e.payment),"paymentSlider"!==e.onUpdate&&c.noUiSlider.set(100*e.paymentPercent),"inputTerm"!==e.onUpdate&&m.setRawValue(e.term),"termSlider"!==e.onUpdate&&u.noUiSlider.set(e.term)}(i),l(d)}));const y=document.querySelector("#orderFormBtn"),p=document.querySelector("#orderForm"),v=document.querySelector("#submitFormBtn");y.addEventListener("click",(()=>{p.classList.remove("none"),y.classList.add("none")})),p.addEventListener("submit",(e=>{e.preventDefault();const t=new FormData(p);v.setAttribute("disabled",!0),v.innerHTML="Заявка отправляется...",p.querySelectorAll("input").forEach((function(e){e.setAttribute("disabled",!0)})),async function(){const e=n(),r=a();let o=function(e){let t=document.location.href.split(".");if("html"===t[t.length-1]){t.pop();let e=t.join("."),n=e.split("-");return n.pop(),e=n.join("/"),e}return String(t)}();const s=await fetch(o+"mail.php",{method:"POST",headers:{"Content-Type":"application/json;charset=utf-8"},body:JSON.stringify({form:{name:t.get("name"),email:t.get("email"),phone:t.get("phone")},data:e,results:r})}),l=await s.text();v.removeAttribute("disabled",!0),v.innerHTML="Оформить заявку",p.querySelectorAll("input").forEach((e=>{e.removeAttribute("disabled",!0)})),p.reset(),p.classList.add("none"),"SUCCESS"===l?document.querySelector("#success").classList.remove("none"):document.querySelector("#error").classList.remove("none")}()}))}}();