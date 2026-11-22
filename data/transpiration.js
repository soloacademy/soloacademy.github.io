(function(){
var INK="#26303b",BLUE="#1f5fa8",GRAY="#8a949f",GREEN="#d9edcf",GMID="#5b8a4c",GVEIN="#78a468",RULE="#c9d0d7";
function n(v){return Math.round(v*10)/10}
function T(x,y,size,txt,cls,anchor){return '<text x="'+n(x)+'" y="'+n(y)+'" font-size="'+size+'"'+(anchor?' text-anchor="'+anchor+'"':'')+(cls?' class="'+cls+'"':'')+'>'+txt+'</text>'}
function line(x1,y1,x2,y2,k,w){return '<line x1="'+n(x1)+'" y1="'+n(y1)+'" x2="'+n(x2)+'" y2="'+n(y2)+'" stroke="'+k+'" stroke-width="'+(w||1)+'"/>'}
function path(d,f,k,w){return '<path d="'+d+'" fill="'+f+'" stroke="'+k+'" stroke-width="'+(w||1)+'" stroke-linejoin="round" stroke-linecap="round"/>'}
function svgY(y0,h,label,body){return '<div class="fig"><svg viewBox="0 '+y0+' 340 '+h+'" role="img" aria-label="'+label+'">'+body+'</svg></div>'}
/* 水蒸気の矢印(青)：先は(x2,y2)。頭は「く」の字 */
function arr(x1,y1,x2,y2){var a=Math.atan2(y2-y1,x2-x1);
 function p(t){return n(x2-7*Math.cos(a+t))+','+n(y2-7*Math.sin(a+t))}
 return line(x1,y1,x2,y2,BLUE,2)+'<path d="M'+p(.5)+' L'+n(x2)+','+n(y2)+' L'+p(-.5)+'" fill="none" stroke="'+BLUE+'" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>'}

/* ---------- 枝の絵：左が茎、右が葉(横から見た形)。葉の上の面＝表、下の面＝裏
   c.top / c.bot＝"open"か"block"(ワセリンでふさぐ)、c.cut＝葉を切った枝、c.arrows＝開いている所から出る水蒸気(青い矢印)と名前を色で見せる ---------- */
function sprig(ox,c){
 var s='',A=!!c.arrows,tY=A?58:76,bY=A?143:126,
  x=function(v){return n(ox+v)},
  U="M"+x(46)+",96 C"+x(56)+",80 "+x(86)+",78 "+x(104)+",94",
  L="M"+x(46)+",96 C"+x(60)+",114 "+x(88)+",112 "+x(104)+",94",
  ALL=U+" C"+x(88)+",112 "+x(60)+",114 "+x(46)+",96 Z";
 function lab(xx,yy,t,st){return T(xx,yy,12,t,A?(st==="open"?"v b":"g"):null,"middle")}
 s+=line(x(36),98,x(47),96,GMID,2.2);
 if(c.cut){
  s+='<path d="'+ALL+'" fill="none" stroke="'+GRAY+'" stroke-width="1.2" stroke-dasharray="3 3"/>';
 }else{
  s+=path(ALL,GREEN,INK,1.2);
  [[58,66],[70,79],[82,90]].forEach(function(v){s+=line(x(v[0]),96,x(v[1]),90,GVEIN,1)+line(x(v[0]),96,x(v[1]),102,GVEIN,1)});
  s+='<path d="M'+x(46)+',96 Q'+x(76)+',98 '+x(104)+',94" fill="none" stroke="'+GMID+'" stroke-width="1.3" stroke-linecap="round"/>';
  if(c.top==="block")s+=path(U,"none",GRAY,4.5);
  if(c.bot==="block")s+=path(L,"none",GRAY,4.5);
  if(A){
   if(c.top==="open")s+=arr(ox+70,82,ox+70,64);
   if(c.bot==="open")s+=arr(ox+70,111,ox+70,129)}
  if(!c.nolab)s+=lab(ox+70,tY,"表",c.top)+lab(ox+70,bY,"裏",c.bot);
 }
 s+='<rect x="'+x(30)+'" y="60" width="8" height="90" fill="'+GREEN+'" stroke="'+INK+'" stroke-width="1.2"/>';
 if(A)s+=arr(ox+28,132,ox+10,132);
 if(!c.nolab)s+=lab(ox+34,164,"茎","open");
 return s}

/* ---------- 厳選ポイントの図：表。頭(列)に、表・裏・茎。左に、処理の名前と枝の図。1行目＝ふつう(文字つきのお手本) ---------- */
function figTable(){
 var R=[{t:["","ふつう"],c:{top:"open",bot:"open"},on:[1,1,1],h:112,lab:true},
        {t:["葉の表に","ワセリン"],c:{top:"block",bot:"open"},on:[0,1,1],h:90},
        {t:["葉の裏に","ワセリン"],c:{top:"open",bot:"block"},on:[1,0,1],h:90},
        {t:["","葉を切る"],c:{cut:true},on:[0,0,1],h:90}],
  CX=[196,252,308],H=["表","裏","茎"],K=.85,FX=108,s='',y=46,cy;
 s+=T(252,13,11,"気孔が開いている所","g","middle")+line(176,20,328,20,RULE,1);
 H.forEach(function(h,i){s+=T(CX[i],37,14,h,"b","middle")});
 s+=line(4,y,336,y,RULE,1);
 R.forEach(function(r){cy=y+r.h/2;
  if(r.t[0])s+=T(4,cy-4,13,r.t[0],"b")+T(4,cy+12,13,r.t[1],"b");else s+=T(4,cy+5,13,r.t[1],"b");
  s+='<g transform="translate('+n(FX*(1-K))+','+n(cy-K*107)+') scale('+K+')">'+sprig(FX-57,{top:r.c.top,bot:r.c.bot,cut:r.c.cut,arrows:true,nolab:!r.lab})+'</g>';
  r.on.forEach(function(o,i){s+=o?'<circle cx="'+CX[i]+'" cy="'+n(cy)+'" r="5.5" fill="'+BLUE+'"/>':line(CX[i]-5,cy,CX[i]+5,cy,"#9aa5b1",1.5)});
  y+=r.h;s+=line(4,y,336,y,RULE,1)});
 s+='<line x1="7" y1="'+(y+17)+'" x2="21" y2="'+(y+17)+'" stroke="'+GRAY+'" stroke-width="4.5" stroke-linecap="round"/>'+T(29,y+21,11,"ワセリンでふさいだ所","g")+
  '<circle cx="160" cy="'+(y+17)+'" r="4.5" fill="'+BLUE+'"/>'+T(170,y+21,11,"開いている","g")+
  arr(7,y+35,23,y+35)+T(29,y+39,11,"水蒸気が出る向き","g");
 return svgY(0,y+46,"表。列の見出しは、左から、表、裏、茎で、その上に、気孔が開いている所、と書いてある。左に、4つの枝の絵が縦に並ぶ。上から、ふつうの枝は、表、裏、茎の3か所が開いている。葉の表にワセリンをぬった枝は、裏と茎が開いている。葉の裏にワセリンをぬった枝は、表と茎が開いている。葉を切った枝は、茎だけが開いている。開いている所に、青い丸がある。灰色の太い線は、ワセリンでふさいだ所。青い矢印は、水蒸気が出る向き",s)}

/* ---------- 問題・解答の図：A(表にワセリン)、B(裏にワセリン)、C(葉を切る)
   arrows=false：問題の図。arrows=true：解答の図(開いている所を青で、減った量を書く) ---------- */
var PN=[
 {k:"A",pr:"表にワセリン",c:{top:"block",bot:"open"},op:"気孔：裏と茎"},
 {k:"B",pr:"裏にワセリン",c:{top:"open",bot:"block"},op:"気孔：表と茎"},
 {k:"C",pr:"葉を切る",c:{cut:true},op:"気孔：茎だけ"}];
function figABC(A,amts){
 var s='',i,ox,cx,c;
 for(i=0;i<3;i++){ox=4+112*i;cx=ox+56;
  c={top:PN[i].c.top,bot:PN[i].c.bot,cut:PN[i].c.cut,arrows:A};
  s+=sprig(ox,c)+T(cx,190,14,PN[i].k,"b","middle")+T(cx,208,12,PN[i].pr,null,"middle");
  if(A)s+=T(cx,226,12,PN[i].op,"v b","middle")+T(cx,244,12,"減った量 "+amts[i],"b","middle")}
 var lab=A?"A、B、Cの3本の枝の絵。Aは、葉の表にワセリンをぬった枝で、裏と茎が開いていて、減った量は"+amts[0]+"。Bは、葉の裏にワセリンをぬった枝で、表と茎が開いていて、減った量は"+amts[1]+"。Cは、葉を切った枝で、茎だけが開いていて、減った量は"+amts[2]+"。開いている所から、青い矢印で水蒸気が出ている":
  "A、B、Cの3本の枝の絵。Aは、葉の表にワセリンをぬった枝。Bは、葉の裏にワセリンをぬった枝。Cは、葉を切った枝";
 return A?svgY(44,208,lab,s):svgY(60,160,lab,s)}

/* ---------- 文章 ---------- */
var V=function(t){return '<span class="v">'+t+'</span>'};
var SMN='<p class="note" style="font-size:.8rem;margin:.2rem 0">';
var NW='<span style="white-space:nowrap">';

var POINT='<p>蒸散は、植物の体の水が、水蒸気になって、気孔から出ていくことです。<span style="white-space:nowrap">ワセリンをぬった面の気孔は、</span><span style="white-space:nowrap">ふさがれます。</span></p>'+
 figTable()+
 '<div class="formula" style="white-space:normal">'+NW+'減った水の量 ＝</span> '+NW+V('開いている気孔')+'からの</span>'+NW+'蒸散量の合計</span></div>';

function tbl(a,b,c){
 return '<table style="margin:.8rem 0"><tr><th></th><th>A</th><th>B</th><th>C</th></tr>'+
  '<tr><td>実験前</td><td>100mL</td><td>100mL</td><td>100mL</td></tr>'+
  '<tr><td>4時間後</td><td>'+a+'</td><td>'+b+'</td><td>'+c+'</td></tr></table>'}

var QBODY='<p>葉のついた同じ植物の枝3本(A〜C)を用意し、それぞれ処理をして、4時間後の水の量を調べた。</p>'+figABC(false)+tbl('91mL','96mL','99mL');

var ANS='<p>開いている所(青)から、水蒸気が出ます。</p>'+figABC(true,["9mL","4mL","1mL"])+
 '<p>(1) A：<b>裏と茎</b><br>　　B：<b>表と茎</b><br>　　C：<b>茎だけ</b></p>'+
 '<p>(2) A：100 − 91 ＝ <b>9mL</b><br>　　B：100 − 96 ＝ <b>4mL</b><br>　　C：100 − 99 ＝ <b>1mL</b></p>'+
 '<p>(3) 茎：Cは、茎だけが開いている。<b>1mL</b><br>　　裏：Aは、裏と茎。9 − 1 ＝ <b>8mL</b><br>　　表：Bは、表と茎。4 − 1 ＝ <b>3mL</b></p>';

var SBODY='<p>葉のついた同じ植物の枝3本(A〜C)を用意し、それぞれ処理をして、4時間後の水の量を調べた。</p>'+figABC(false)+tbl('93mL','95mL','99mL')+
 '<p>葉の表と裏の気孔の数の比(表：裏)を、最も簡単な整数比で求めなさい。</p>'+
 SMN+'※ 気孔の数の比は、蒸散量の比と同じと考えます。</p>';

var SOL2='<p>開いている所(青)から、水蒸気が出ます。</p>'+figABC(true,["7mL","5mL","1mL"])+
 '<p>A：100 − 93 ＝ 7mL<br>B：100 − 95 ＝ 5mL<br>C：100 − 99 ＝ 1mL</p>'+
 '<p>茎：Cは、茎だけが開いている。<b>1mL</b><br>裏：Aは、裏と茎。7 − 1 ＝ <b>6mL</b><br>表：Bは、表と茎。5 − 1 ＝ <b>4mL</b></p>'+
 '<p>表：裏 ＝ 4：6 ＝ <b>2：3</b></p>';

var OP=["表","裏","茎"];

window.UNIT={
no:"2-11",title:"蒸散",
sections:[
{type:"text",point:true,title:"厳選ポイント",html:POINT},
{type:"problem",title:"問題",body:QBODY,
 parts:[
  {head:"(1) 気孔が開いている所を、すべて選びなさい。",label:"A",type:"multi",choices:OP,accept:["裏茎"]},
  {label:"B",type:"multi",choices:OP,accept:["表茎"]},
  {label:"C",type:"multi",choices:OP,accept:["茎"]},
  {head:"(2) 4時間で減った水の量は、それぞれ何mLか。",label:"A",grp:1,type:"number",accept:[9],tol:0.05},
  {label:"B",grp:1,type:"number",accept:[4],tol:0.05},
  {label:"C",grp:1,unit:"mL",type:"number",accept:[1],tol:0.05},
  {head:"(3) 葉の表、葉の裏、茎の蒸散量は、それぞれ何mLか。",label:"表",grp:2,type:"number",accept:[3],tol:0.05},
  {label:"裏",grp:2,type:"number",accept:[8],tol:0.05},
  {label:"茎",grp:2,unit:"mL",type:"number",accept:[1],tol:0.05}
 ]},
{type:"answer",html:ANS},
{type:"problem",title:"補充問題",body:SBODY,
 parts:[{label:"答え",text:"表：裏 ＝",type:"pick",choices:["4：6","2：3","5：7","3：2"],accept:["2：3"]}],
 solution:SOL2}
]};
})();
