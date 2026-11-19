(function(){
var INK="#26303b",BLUE="#1f5fa8",RED="#c2410c",MUTED="#5d6874",GRAY="#8a949f",FACE="#e6e9ed",GREEN="#d9edcf",GUARD="#b4d9a0",GVEIN="#78a468",GMID="#5b8a4c",ROOT="#b8892f",RFILL="#f7edc9";
function n(v){return Math.round(v*10)/10}
function T(x,y,size,txt,cls,anchor){return '<text x="'+n(x)+'" y="'+n(y)+'" font-size="'+size+'"'+(anchor?' text-anchor="'+anchor+'"':'')+(cls?' class="'+cls+'"':'')+'>'+txt+'</text>'}
function line(x1,y1,x2,y2,k,w,dash,cap){return '<line x1="'+n(x1)+'" y1="'+n(y1)+'" x2="'+n(x2)+'" y2="'+n(y2)+'" stroke="'+k+'" stroke-width="'+(w||1)+'"'+(dash?' stroke-dasharray="3 3"':'')+(cap?' stroke-linecap="round"':'')+'/>'}
function path(d,f,k,w){return '<path d="'+d+'" fill="'+f+'" stroke="'+k+'" stroke-width="'+(w||1)+'" stroke-linejoin="round" stroke-linecap="round"/>'}
/* 名前の線：(x1,y1)から(x2,y2)まで。先に点 */
function ld(x1,y1,x2,y2){return line(x1,y1,x2,y2,INK,1)+'<circle cx="'+n(x2)+'" cy="'+n(y2)+'" r="2.5" fill="'+INK+'"/>'}

/* ---------- 植物全体(左) ---------- */
function leaf(d,mx,my,tx,ty){
 var s=path(d,GREEN,INK,1.2),i,u,px,py,vx=tx-mx,vy=ty-my,L=Math.hypot(vx,vy),a=Math.atan2(vy,vx),k,b,ex,ey;
 [.22,.42,.62,.82].forEach(function(u){px=mx+vx*u;py=my+vy*u;
  [-1,1].forEach(function(sg){b=a+sg*0.95;k=15*(1-u*.55);ex=px+k*Math.cos(b);ey=py+k*Math.sin(b);s+=line(px,py,ex,ey,GVEIN,1.2,false,true)})});
 return s+line(mx,my,tx,ty,GMID,1.8,false,true)}
function plant(){
 var s='';
 s+=line(4,240,140,240,GRAY,1,true)+T(4,234,11,"地面","g");
 /* 根 */
 s+=line(70,240,70,352,ROOT,3,false,true)+
  path("M70,262 Q52,270 34,296",'none',ROOT,2.2)+path("M70,262 Q92,268 110,300",'none',ROOT,2.2)+
  path("M70,292 Q52,302 44,326",'none',ROOT,2.2)+path("M70,306 Q88,314 98,334",'none',ROOT,2.2);
 /* 茎 */
 s+='<rect x="66" y="100" width="8" height="140" fill="'+GREEN+'" stroke="'+INK+'" stroke-width="1.2"/>';
 /* 葉(左と右) */
 s+=leaf("M66,122 C52,80 28,66 8,70 C14,100 40,122 66,122 Z",66,122,9,71);
 s+=leaf("M74,108 C72,70 100,40 138,38 C140,70 112,104 74,108 Z",74,108,138,38);
 /* 拡大する場所(点線の丸)と、拡大の丸へのつなぎ */
 [[112,66,155,70],[70,190,155,190],[110,300,155,313]].forEach(function(c){
  s+='<circle cx="'+c[0]+'" cy="'+c[1]+'" r="10" fill="none" stroke="'+MUTED+'" stroke-width="1" stroke-dasharray="3 3"/>'+
   line(c[0]+10,c[1]+(c[3]-c[1])*.08,c[2],c[3],MUTED,1,true)});
 return s}

/* ---------- 拡大の丸(右) ---------- */
var CX=205,R=50;
function frame(cy){return '<circle cx="'+CX+'" cy="'+cy+'" r="'+R+'" fill="#fff" stroke="'+INK+'" stroke-width="1.5"/>'}
/* 葉の裏：気孔と、それを囲む2つの孔辺細胞 */
function inset1(){
 var cy=70,s=frame(cy);
 s+=path("M205,46 C176,52 176,88 205,94 C195,82 195,58 205,46 Z",GUARD,INK,1.5)+
  path("M205,46 C234,52 234,88 205,94 C215,82 215,58 205,46 Z",GUARD,INK,1.5);
 return s}
/* 茎の断面：維管束が輪のように並ぶ。外側が師管(赤)、内側が道管(青) */
function bundle(a){
 return '<g transform="translate('+CX+',190) rotate('+a+') translate(0,-30)">'+
  '<path d="M-7,0 V-7 A5,5 0 0 1 -2,-12 H2 A5,5 0 0 1 7,-7 V0 Z" fill="'+RED+'" fill-opacity=".35"/>'+
  '<path d="M-7,0 V7 A5,5 0 0 0 -2,12 H2 A5,5 0 0 0 7,7 V0 Z" fill="'+BLUE+'" fill-opacity=".35"/>'+
  '<path d="M-7,0 H7" stroke="'+MUTED+'" stroke-width=".8" fill="none"/>'+
  '<path d="M-7,-7 A5,5 0 0 1 -2,-12 H2 A5,5 0 0 1 7,-7 V7 A5,5 0 0 1 2,12 H-2 A5,5 0 0 1 -7,7 Z" fill="none" stroke="'+INK+'" stroke-width="1.2"/></g>'}
function inset2(){
 var s=frame(190),a;
 for(a=0;a<360;a+=60)s+=bundle(a);
 return s}
/* 根の先：根毛 */
function inset3(){
 var cy=315,s=frame(cy),ys=[294,302,310,318,326,334,342],i,len,y;
 s+=path("M195,278 V335 Q195,352 205,352 Q215,352 215,335 V278",RFILL,INK,1.2);
 for(i=0;i<ys.length;i++){y=ys[i];len=i===3?18:12+(i%3)*3;
  s+=line(195,y,195-len,y-4,INK,1,false,true)+line(215,y,215+len,y-4,INK,1,false,true)}
 return s}

/* ---------- 名前の欄(右)と、葉脈(左) ---------- */
var BW=56;
/* id、名前、欄の左はし、中心の高さ、線の出る点、線の先、色 */
var LB=[
 {id:"a1",nm:"気孔",x:262,y:70,from:[262,70],to:[207,70]},
 {id:"a2",nm:"葉脈",x:4,y:26,from:[32,39],to:[34.7,94]},
 {id:"a3",nm:"維管束",x:262,y:148,from:[262,148],to:[212,160]},
 {id:"a4",nm:"道管",x:262,y:226,from:[262,226],to:[207,214],c:"v"},
 {id:"a5",nm:"師管",x:262,y:180,from:[262,180],to:[238,173],c:"m"},
 {id:"a6",nm:"根毛",x:262,y:315,from:[262,315],to:[233,312]}];
function labels(blank){
 return LB.map(function(b){
  var cx=b.x+BW/2,ty=b.y+4.7,s=ld(b.from[0],b.from[1],b.to[0],b.to[1]);
  if(blank)return s+'<g class="bl" data-b="'+b.id+'"><rect x="'+b.x+'" y="'+(b.y-12)+'" width="'+BW+'" height="24" rx="4"/>'+
   '<text class="bt" x="'+cx+'" y="'+n(ty)+'" font-size="13" text-anchor="middle"></text>'+
   '<text class="bm" x="'+(b.x+BW+3)+'" y="'+n(ty)+'" font-size="13"></text></g>';
  return s+T(cx,ty,13,b.nm,(b.c?b.c+" ":"")+"b","middle")}).join('')}

function fig(blank){
 var lab=blank?"植物のからだの図。左に、葉、茎、根のある植物。右に、拡大した丸が3つ、縦に並ぶ。上は葉の裏の拡大で、2つの孔辺細胞に囲まれたすき間がある。真ん中は茎の断面の拡大で、6つの維管束が輪のように並び、それぞれの外側が赤、内側が青。下は根の先の拡大で、細い毛が出ている。気孔、葉脈、維管束、道管、師管、根毛の名前が空欄":
  "植物のからだの図。左に、葉、茎、根のある植物。右に、拡大した丸が3つ、縦に並ぶ。上は葉の裏の拡大で、2つの孔辺細胞に囲まれたすき間が気孔。左上の葉の線が葉脈。真ん中は茎の断面の拡大で、6つの維管束が輪のように並び、それぞれの外側が赤の師管、内側が青の道管。下は根の先の拡大で、細い毛が根毛";
 return '<div class="fig"><svg viewBox="0 0 340 372" role="img" aria-label="'+lab+'">'+plant()+inset1()+inset2()+inset3()+labels(blank)+'</svg></div>'}

/* ---------- 文章 ---------- */
var SM='<p class="note" style="font-size:.8rem;margin:.2rem 0">';
var GRID='display:grid;grid-template-columns:max-content 1fr;column-gap:.6rem;row-gap:.5rem;align-items:baseline;';
function rd(nm,rule,c){return '<b'+(c?' class="'+c+'"':'')+'>'+nm+'</b><span style="font-size:.75rem">◀ '+rule+'</span>'}
var ROWS='<div style="'+GRID+'margin:.8rem 0">'+
 rd('気孔','孔辺細胞に囲まれたすき間。酸素、二酸化炭素、水蒸気の出入り口。ふつう葉の裏側に多い')+
 rd('葉脈','維管束が葉で枝分かれしたもの。葉の表側が道管、裏側が師管')+
 rd('維管束','道管と師管が集まった束。内側が道管、外側が師管')+
 rd('道管','根から吸い上げられた水や養分の通り道。「水道管」で覚える','v')+
 rd('師管','葉でつくられた栄養の通り道','m')+
 rd('根毛','根の先端付近の細い毛のようなもの。表面積を広くして、水や養分の吸収効率を上げる')+'</div>';

var POINT='<p>葉・茎・根のつくりと、はたらきを覚えます。</p>'+fig(false)+
 SM+'※ 右の丸は拡大した図です(上から、葉の裏、茎の断面、根の先)。</p>'+ROWS;

var QBODY='<p>植物のからだのつくりの名前を、下の語群から選んで、図の空欄に入れなさい。</p>';
var ANS={a1:"気孔",a2:"葉脈",a3:"維管束",a4:"道管",a5:"師管",a6:"根毛"};
var CH=["師管","根毛","気孔","維管束","葉脈","道管"];

var ANSW=fig(false)+'<p>維管束の内側が<b class="v">道管</b>(水の通り道)、外側が<b class="m">師管</b>(栄養の通り道)です。</p>';

var TIGHT='<style>.pick .pk-bt{gap:.4rem}.pick button.choice{padding:.1rem .55rem;min-width:2.6rem}</style>';
var SBODY=TIGHT+'<p>次のはたらきをもつつくりを、選びなさい。</p>';

window.UNIT={
no:"2-10",title:"植物のつくり",
sections:[
{type:"text",point:true,title:"厳選ポイント",html:POINT},
{type:"problem",title:"問題",body:QBODY,
 parts:[{type:"tree",svg:fig(true),answers:ANS,choices:CH}]},
{type:"answer",html:ANSW},
{type:"problem",title:"補充問題",body:SBODY,
 parts:[
  {label:"(1)",text:"根から吸い上げられた水や養分の通り道",type:"pick",choices:["師管","道管","維管束","葉脈"],accept:["道管"]},
  {label:"(2)",text:"葉でつくられた栄養の通り道",type:"pick",choices:["道管","維管束","師管","気孔"],accept:["師管"]},
  {label:"(3)",text:"道管と師管が集まった束",type:"pick",choices:["維管束","葉脈","根毛","師管"],accept:["維管束"]},
  {label:"(4)",text:"維管束が葉で枝分かれしたもの",type:"pick",choices:["気孔","道管","根毛","葉脈"],accept:["葉脈"]},
  {label:"(5)",text:"葉の孔辺細胞に囲まれたすき間",type:"pick",choices:["葉脈","気孔","維管束","根毛"],accept:["気孔"]},
  {label:"(6)",text:"根の先端付近にある、細い毛のようなもの",type:"pick",choices:["気孔","師管","根毛","葉脈"],accept:["根毛"]}
 ]}
]};
})();
