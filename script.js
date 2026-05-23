
// NAV
const nav=[
  {id:'home',icon:'🏠',label:'Home'},
  {id:'products',icon:'🔵',label:'Products'},
  {id:'about',icon:'ℹ️',label:'About'},
  {id:'why',icon:'⭐',label:'Why Us'},
  {id:'testimonials',icon:'💬',label:'Reviews'},
  {id:'contact',icon:'✉️',label:'Contact'},
  {id:'mapSection',icon:'📍',label:'Map'}
];



function goToProducts() {
  document.getElementById('products').scrollIntoView({
    behavior: 'smooth'
  });
}
// utube
function subscribeNow() {
  window.open(
    "https://www.youtube.com/@SonyMusicSouthVEVO?sub_confirmation=1",
    "_blank"
  );
}

// SIDEBAR
document.getElementById('sb-nav').innerHTML=nav.map((n,i)=>`
  <div class="sb-item ${i===0?'active':''}" onclick="goTo('${n.id}');setAct(this)" data-id="${n.id}">
    <span class="sb-dot"></span>
    <span class="sb-icon">${n.icon}</span>
    <span class="sb-lbl">${n.label}</span>
  </div>`).join('');

// NAV DOTS
document.getElementById('ndots').innerHTML=nav.map((n,i)=>`
  <div class="nd ${i===0?'active':''}" data-id="${n.id}" data-label="${n.label}" onclick="goTo('${n.id}')"></div>`).join('');

function goTo(id){document.getElementById(id)?.scrollIntoView({behavior:'smooth',block:'start'})}
function setAct(el){document.querySelectorAll('.sb-item').forEach(i=>i.classList.remove('active'));el.classList.add('active')}

// SCROLL
window.addEventListener('scroll',()=>{
  const st=window.scrollY,mh=document.body.scrollHeight-window.innerHeight;
  document.getElementById('sb').style.width=(st/mh*100)+'%';
  let cur=0;
  nav.forEach((n,i)=>{const s=document.getElementById(n.id);if(s&&s.getBoundingClientRect().top<=220)cur=i});
  document.querySelectorAll('.sb-item').forEach((el,i)=>el.classList.toggle('active',i===cur));
  document.querySelectorAll('.nd').forEach((el,i)=>el.classList.toggle('active',i===cur));
},{passive:true});

// CURSOR
window.addEventListener('mousemove',e=>{const c=document.getElementById('cg');c.style.left=e.clientX+'px';c.style.top=e.clientY+'px'});

// PARTICLES
(()=>{
  const cv=document.getElementById('pc'),ctx=cv.getContext('2d');
  let ps=[],mx=null,my=null;
  const rsz=()=>{cv.width=innerWidth;cv.height=innerHeight};
  rsz();window.addEventListener('resize',rsz);
  window.addEventListener('mousemove',e=>{mx=e.clientX;my=e.clientY});
  ps=Array.from({length:100},()=>({x:Math.random()*innerWidth,y:Math.random()*innerHeight,r:Math.random()*2+.5,vx:(Math.random()-.5)*.4,vy:(Math.random()-.5)*.4,o:Math.random()*.45+.1}));
  (function loop(){
    ctx.clearRect(0,0,cv.width,cv.height);
    ps.forEach(p=>{
      p.x+=p.vx;p.y+=p.vy;
      if(p.x<0)p.x=cv.width;if(p.x>cv.width)p.x=0;
      if(p.y<0)p.y=cv.height;if(p.y>cv.height)p.y=0;
      if(mx&&my){const dx=mx-p.x,dy=my-p.y,d=Math.sqrt(dx*dx+dy*dy);if(d<120){const a=Math.atan2(dy,dx);p.x-=Math.cos(a)*1.4;p.y-=Math.sin(a)*1.4}}
      ctx.beginPath();ctx.arc(p.x,p.y,p.r,0,Math.PI*2);
      ctx.fillStyle=`rgba(0,136,255,${p.o})`;ctx.shadowBlur=8;ctx.shadowColor='rgba(0,119,255,.4)';ctx.fill();
    });
    for(let a=0;a<ps.length;a++)for(let b=a+1;b<ps.length;b++){
      const dx=ps[a].x-ps[b].x,dy=ps[a].y-ps[b].y,d=Math.sqrt(dx*dx+dy*dy);
      if(d<105){ctx.beginPath();ctx.strokeStyle=`rgba(0,119,255,${.1-d/1050})`;ctx.lineWidth=.55;ctx.moveTo(ps[a].x,ps[a].y);ctx.lineTo(ps[b].x,ps[b].y);ctx.stroke()}
    }
    requestAnimationFrame(loop);
  })();
})();

// REVEAL
const ro=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting)e.target.classList.add('show')}),{threshold:.1});
document.querySelectorAll('.reveal').forEach(el=>ro.observe(el));

// SIDEBAR HOVER
document.querySelectorAll('.sb-item').forEach(item=>{
  item.addEventListener('mousemove',e=>{const r=item.getBoundingClientRect();item.style.background=`radial-gradient(circle at ${e.clientX-r.left}px ${e.clientY-r.top}px,rgba(0,119,255,.18),rgba(0,119,255,.04))`});
  item.addEventListener('mouseleave',()=>{item.style.background=''});
});

function submitForm() {
  const n = document.getElementById('fn').value.trim();
  const p = document.getElementById('fp').value.trim();
  const s = document.getElementById('fs').value;
  const m = document.getElementById('fm').value.trim();

  if (!n || !p) {
    alert('Please enter your name and phone number.');
    return;
  }

  // YOUR EMAIL
  const businessEmail = "sbpc.plumbing@gmail.com";

  // EMAIL SUBJECT
  const subject = encodeURIComponent(
    "New Product Enquiry - Sri Balaji Pipe Corporation"
  );

const body = encodeURIComponent(
`Hello Sri Balaji Pipe Corporation Team,
  

You have received a new product enquiry from your website.

━━━━━━━━━━━━━━━━━━
CUSTOMER DETAILS
━━━━━━━━━━━━━━━━━━

Customer Name : ${n}
Phone Number  : ${p}
Product Needed: ${s}

━━━━━━━━━━━━━━━━━━
ENQUIRY DETAILS
━━━━━━━━━━━━━━━━━━

${m}

━━━━━━━━━━━━━━━━━━

Please contact the customer at the earliest and provide the best quotation along with product availability and delivery details.

Thank you.

Sri Balaji Pipe Corporation
Mayiladuthurai
`
);

  // OPEN EMAIL APP
  window.location.href =
    `mailto:${businessEmail}?subject=${subject}&body=${body}`;

  document.getElementById('cForm').style.display = 'none';
  document.getElementById('formOk').style.display = 'block';

  const t = document.getElementById('toast');
  t.classList.add('show');

  setTimeout(() => t.classList.remove('show'), 3500);
}