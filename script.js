const clamp=(v,min,max)=>Math.min(Math.max(v,min),max);

const showcase=document.querySelector('.scroll-showcase');
const closed=document.querySelector('.closed-img');
const mid=document.querySelector('.mid-img');
const openImg=document.querySelector('.open-img');
const fill=document.querySelector('#progressFill');

function updateShowcase(){
  if(!showcase) return;
  const rect=showcase.getBoundingClientRect();
  const total=rect.height-window.innerHeight;
  const raw=clamp(-rect.top/total,0,1);
  const p=clamp(raw*1.55,0,1);
  const closedOpacity=clamp(1-p/.34,0,1);
  const midOpacity=clamp(1-Math.abs(p-.42)/.24,0,.95);
  const openOpacity=clamp((p-.46)/.34,0,1);
  closed.style.opacity=closedOpacity;
  mid.style.opacity=midOpacity;
  openImg.style.opacity=openOpacity;
  closed.style.transform=`scale(${1+.025*p}) translateY(${-4*p}px)`;
  mid.style.transform=`scale(${1.01+.025*p}) translateY(${-8*p}px)`;
  openImg.style.transform=`scale(${1.02+.025*p}) translateY(${-12*p}px)`;
  fill.style.width=`${p*100}%`;
}

let ticking=false;
function onScroll(){
  if(!ticking){
    requestAnimationFrame(()=>{
      updateShowcase();
      ticking=false;
    });
    ticking=true;
  }
}
window.addEventListener('scroll',onScroll,{passive:true});
window.addEventListener('resize',updateShowcase);
updateShowcase();

const observer=new IntersectionObserver((entries)=>{
  entries.forEach(entry=>{
    if(entry.isIntersecting) entry.target.classList.add('visible');
  });
},{threshold:.15});
document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));
