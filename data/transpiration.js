(function(){
var INK="#26303b",BLUE="#1f5fa8",GRAY="#8a949f",GREEN="#d9edcf",GMID="#5b8a4c";
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
  U="M"+x(38)+",96 C"+x(56)+",80 "+x(86)+",80 "+x(102)+",96",
  L="M"+x(38)+",96 C"+x(56)+",112 "+x(86)+",112 "+x(102)+",96",
  ALL=U+" C"+x(86)+",112 "+x(56)+",112 "+x(38)+",96 Z";
 function lab(xx,yy,t,st){return T(xx,yy,12,t,A?(st==="open"?"v b":"g"):null,"middle")}
 if(c.cut){
  s+='<path d="'+ALL+'" fill="none" stroke="'+GRAY+'" stroke-width="1.2" stroke-dasharray="3 3"/>';
 }else{
  s+=path(ALL,GREEN,INK,1.2)+line(x(38),96,x(102),96,GMID,1.2);
  if(c.top==="block")s+=path(U,"none",GRAY,4.5);
  if(c.bot==="block")s+=path(L,"none",GRAY,4.5);
  if(A){
   if(c.top==="open")s+=arr(ox+70,82,ox+70,64);
   if(c.bot==="open")s+=arr(ox+70,111,ox+70,129)}
  s+=lab(ox+70,tY,"表",c.top)+lab(ox+70,bY,"裏",c.bot);
 }
 s+='<rect x="'+x(30)+'" y="60" width="8" height="90" fill="'+GREEN+'" stroke="'+INK+'" stroke-width="1.2"/>';
 if(A)s+=arr(ox+28,132,ox+10,132);
 s+=lab(ox+34,164,"茎","open");
 return s}

/* ---------- 厳選ポイントの図：ふつうの枝と、表にワセリンをぬった枝 ---------- */
function figPoint(){
 var s=T(80,30,14,"ふつう","b","middle")+T(264,30,14,"表にワセリンをぬる","b","middle")+
  sprig(24,{top:"open",bot:"open",arrows:true})+sprig(208,{top:"block",bot:"open",arrows:true});
 return svgY(14,162,"枝の絵が2つ。左は、ふつうの枝で、葉の表、葉の裏、茎の3か所から、水蒸気が出ていく。右は、葉の表にワセリンをぬった枝で、表は灰色にふさがれて水蒸気が出ず、葉の裏と茎の2か所から出ていく",s)}

/* ---------- 問題・解答の図：A(表にワセリン)、B(裏にワセリン)、C(葉を切る)
   arrows=false：問題の図。arrows=true：解答の図(開いている所を青で、減った量を書く) ---------- */
var PN=[
 {k:"A",pr:"表にワセリン",c:{top:"block",bot:"open"},op:"裏と茎が開く"},
 {k:"B",pr:"裏にワセリン",c:{top:"open",bot:"block"},op:"表と茎が開く"},
 {k:"C",pr:"葉を切る",c:{cut:true},op:"茎だけが開く"}];
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
function rd(a,b){return '<div style="margin:.45rem 0 0"><div style="font-size:.8rem;line-height:1.5;color:var(--muted)">'+a+'</div>'+
 '<div style="line-height:1.6">→ 気孔が開いているのは、<span style="white-space:nowrap">'+V(b)+'</span></div></div>'}
var ROWS='<div style="margin:0 0 .9rem">'+rd('A　葉の表にワセリンをぬった場合','裏と茎')+rd('B　葉の裏にワセリンをぬった場合','表と茎')+rd('C　葉を切った場合','茎だけ')+'</div>';
var NW='<span style="white-space:nowrap">';

var POINT='<p>蒸散は、植物の体の水が、水蒸気になって、気孔から出ていくことです。</p>'+figPoint()+
 SMN+'※ 青い矢印は、水蒸気が出ていくようすです。灰色は、ワセリンでふさいだ所です。</p>'+
 '<p style="margin-bottom:0">葉にワセリンをぬる問題では、気孔の開いているところを考えましょう。</p>'+ROWS+
 '<div class="formula" style="white-space:normal">'+NW+'減った水の量 ＝</span> '+NW+V('開いている所')+'の蒸散量の合計</span></div>';

function tbl(a,b,c){
 return '<table style="margin:.8rem 0"><tr><th></th><th>A</th><th>B</th><th>C</th></tr>'+
  '<tr><td>実験前</td><td>100mL</td><td>100mL</td><td>100mL</td></tr>'+
  '<tr><td>4時間後</td><td>'+a+'</td><td>'+b+'</td><td>'+c+'</td></tr></table>'}

var QBODY='<p>葉のついた同じ植物の枝3本(A〜C)を用意し、それぞれ処理をして、4時間後の水の量を調べた。</p>'+figABC(false)+tbl('91mL','96mL','99mL');

var ANS='<p>開いている所(青)から、水蒸気が出ます。</p>'+figABC(true,["9mL","4mL","1mL"])+
 '<p>(1) A：100 − 91 ＝ <b>9mL</b><br>　　B：100 − 96 ＝ <b>4mL</b><br>　　C：100 − 99 ＝ <b>1mL</b></p>'+
 '<p>(2) 茎：Cは、茎だけが開いている。<b>1mL</b><br>　　裏：Aは、裏と茎。9 − 1 ＝ <b>8mL</b><br>　　表：Bは、表と茎。4 − 1 ＝ <b>3mL</b></p>';

var SBODY='<p>葉のついた同じ植物の枝3本(A〜C)を用意し、それぞれ処理をして、4時間後の水の量を調べた。</p>'+figABC(false)+tbl('93mL','95mL','99mL')+
 '<p>葉の表と裏の気孔の数の比(表：裏)を、最も簡単な整数比で求めなさい。</p>';

var SOL2='<p>気孔の数の比は、蒸散量の比と同じと考えます。</p>'+figABC(true,["7mL","5mL","1mL"])+
 '<p>A：100 − 93 ＝ 7mL<br>B：100 − 95 ＝ 5mL<br>C：100 − 99 ＝ 1mL</p>'+
 '<p>茎：Cは、茎だけが開いている。<b>1mL</b><br>裏：Aは、裏と茎。7 − 1 ＝ <b>6mL</b><br>表：Bは、表と茎。5 − 1 ＝ <b>4mL</b></p>'+
 '<p>表：裏 ＝ 4：6 ＝ <b>2：3</b></p>';

window.UNIT={
no:"2-11",title:"蒸散",
sections:[
{type:"text",point:true,title:"厳選ポイント",html:POINT},
{type:"problem",title:"問題",body:QBODY,
 parts:[
  {head:"(1) 4時間で減った水の量は、それぞれ何mLか。",label:"A",unit:"mL",type:"number",accept:[9],tol:0.05},
  {label:"B",unit:"mL",type:"number",accept:[4],tol:0.05},
  {label:"C",unit:"mL",type:"number",accept:[1],tol:0.05},
  {head:"(2) 葉の表、葉の裏、茎の蒸散量は、それぞれ何mLか。",label:"表",unit:"mL",type:"number",accept:[3],tol:0.05},
  {label:"裏",unit:"mL",type:"number",accept:[8],tol:0.05},
  {label:"茎",unit:"mL",type:"number",accept:[1],tol:0.05}
 ]},
{type:"answer",html:ANS},
{type:"problem",title:"補充問題",body:SBODY,
 parts:[{label:"答え",text:"表：裏 ＝",type:"pick",choices:["4：6","2：3","5：7","3：2"],accept:["2：3"]}],
 solution:SOL2}
]};
})();
