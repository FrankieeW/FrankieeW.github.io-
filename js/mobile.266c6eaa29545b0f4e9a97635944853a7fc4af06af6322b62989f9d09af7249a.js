(()=>{(function(){"use strict";let t=document.querySelector(".mobile-nav"),c=document.querySelector(".mobile-nav__sheet"),n=document.querySelector(".mobile-nav__toggle");function s(){t.dataset.navopen="true",c.setAttribute("aria-hidden","false"),n.setAttribute("aria-expanded","true"),document.body.addEventListener("keydown",i)}function o(){delete t.dataset.navopen,c.setAttribute("aria-hidden","true"),n.setAttribute("aria-expanded","false"),document.body.removeEventListener("keydown",i)}function i(e){e.key==="Escape"&&o()}document.querySelectorAll(".mobile-nav__cover, .mobile-nav__toggle").forEach(function(e){e.addEventListener("click",function(l){l.preventDefault(),t.dataset.navopen?o():s()})});let a=document.querySelectorAll(".mobile-nav__sheet a");a.forEach(function(e){e.addEventListener("click",function(l){o()})}),a.length&&[].slice.call(a).pop().addEventListener("blur",()=>n.focus())})();})();