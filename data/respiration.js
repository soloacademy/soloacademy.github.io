(function(){
var INK="#26303b",MUTED="#5d6874",RULE="#c9d0d7";
function n(v){return Math.round(v*10)/10}
function T(x,y,size,txt,cls,anchor){return '<text x="'+n(x)+'" y="'+n(y)+'" font-size="'+size+'"'+(anchor?' text-anchor="'+anchor+'"':'')+(cls?' class="'+cls+'"':'')+'>'+txt+'</text>'}
/* 色つきの面の上の文字：まわりの白いふちを消す */
function TN(x,y,size,txt,cls,anchor){return '<text x="'+n(x)+'" y="'+n(y)+'" font-size="'+size+'" style="stroke:none"'+(anchor?' text-anchor="'+anchor+'"':'')+(cls?' class="'+cls+'"':'')+'>'+txt+'</text>'}
function line(x1,y1,x2,y2,k,w){return '<line x1="'+n(x1)+'" y1="'+n(y1)+'" x2="'+n(x2)+'" y2="'+n(y2)+'" stroke="'+k+'" stroke-width="'+(w||1)+'"/>'}
/* 矢印：x1からx2へ(x2が左なら左向き)。頭は「く」の字 */
function arrow(x1,x2,y){var d=x2>x1?1:-1;
 return line(x1,y,x2,y,INK,1.5)+'<path d="M'+n(x2-d*6)+','+n(y-5)+' L'+n(x2)+','+n(y)+' L'+n(x2-d*6)+','+n(y+5)+'" fill="none" stroke="'+INK+'" stroke-width="1.5"/>'}

/* 式の部品。A＝二酸化炭素＋水(青)、B＝デンプンなど＋酸素(赤)。w＝空欄の幅 */
var GA=[{id:"a1",t:"二酸化炭素",w:78},{id:"a2",t:"水",w:30}],
    GB=[{id:"a3",t:"デンプンなど",w:90},{id:"a4",t:"酸素",w:42}],
    GP=20,AW=36,X0=8,
    WA=GA[0].w+GP+GA[1].w,WB=GB[0].w+GP+GB[1].w;
function box(id,cx,cy,w,h,fs){
 return '<g class="bl" data-b="'+id+'"><rect x="'+n(cx-w/2)+'" y="'+n(cy-h/2)+'" width="'+w+'" height="'+h+'" rx="4"/>'+
  '<text class="bt" x="'+n(cx)+'" y="'+n(cy+fs*.36)+'" font-size="'+fs+'" text-anchor="middle"></text>'+
  '<text class="bm" x="'+n(cx+w/2-2)+'" y="'+n(cy-h/2+10)+'" font-size="12" text-anchor="end"></text></g>'}
/* 式1本。rev＝false：A→B(光合成)、true：B→A(細胞呼吸)。blank＝true：空欄にする。空欄でないときは、文字の幅に合わせて、つめて並べる */
function formula(cy,rev,blank){
 var s='',x=X0,order=rev?[[GB,"m"],[GA,"v"]]:[[GA,"v"],[GB,"m"]],aw=blank?AW:54;
 order.forEach(function(o,gi){
  var g=o[0],cls=o[1];
  g.forEach(function(e,i){
   var w=blank?e.w:e.t.length*15;
   if(blank)s+=box(e.id,x+w/2,cy,w,30,13);
   else s+=TN(x+w/2,cy+5.5,15,e.t,cls+" b","middle");
   x+=w;
   if(i<g.length-1){if(blank){s+=TN(x+GP/2,cy+5.5,15,"＋",null,"middle");x+=GP}else{s+=TN(x+10.5,cy+5.5,15,"＋",null,"middle");x+=21}}});
  if(gi===0){
   s+=rev?arrow(x+aw-12,x+12,cy):arrow(x+12,x+aw-12,cy);x+=aw}});
 return s}
/* 見出し(はたらきの名前)と、小さい説明。mode＝"point"(名前を左そろえ)か、"blank"/"ans"(空欄の幅にそろえる) */
var NAMEW={a5:72,a6:84};
function head(cy,id,name,note,mode){
 var w=NAMEW[id],s='';
 if(mode==="blank")s+=box(id,X0+w/2,cy,w,30,13);
 else if(mode==="ans")s+=TN(X0+w/2,cy+6,16,name,"b","middle");
 else s+=T(X0,cy+6,16,name,"b");
 return s+T(X0+w+8,cy+5,12.5,note,"g")}

/* mode："point"＝厳選ポイント(全部書く)、"blank"＝問題(空欄)、"ans"＝問題の解答(空欄に答えを入れた形) */
function fig(mode){
 var y1=62,y2=186,t1=16,t2=140,s='',blank=mode==="blank",
  H=mode==="point"?232:206,lab;
 s+=head(t1,"a5","光合成","(光が当たるとき)",mode)+formula(y1,false,blank);
 if(mode==="point")s+=T(X0,98,12.5,"光のエネルギーを、デンプンなどにたくわえる","g");
 s+=line(4,114,336,114,RULE,1);
 s+=head(t2,"a6","細胞呼吸","(いつでも)",mode);
 if(mode==="point"){
  s+=formula(y2,true,false)+T(X0,222,12.5,"たくわえたエネルギーを、取り出す","g")}
 else s+=T(170,y2-10,12.5,"上の式の逆向き","g","middle")+arrow(300,40,y2+6);
 lab=mode==="point"?
  "光合成と細胞呼吸の図。上の段は光合成で、光が当たるとき。二酸化炭素と水から、デンプンなどと酸素ができる。光のエネルギーを、デンプンなどにたくわえる。下の段は細胞呼吸で、いつでも行われる。デンプンなどと酸素から、二酸化炭素と水ができる。たくわえたエネルギーを、取り出す。二酸化炭素と水は青、デンプンなどと酸素は赤で、上と下で左右が入れかわっている":
 mode==="blank"?
  "光合成と細胞呼吸の図。上の段は、光が当たるときのはたらきの名前が空欄で、式は、空欄4つの物質が、左の2つ、右の2つ、矢印は右向き。下の段は、いつでも行われるはたらきの名前が空欄で、上の式の逆向きの矢印がある":
  "光合成と細胞呼吸の図の答え。上の段は光合成で、二酸化炭素と水から、デンプンなどと酸素ができる。下の段は細胞呼吸で、上の式の逆向き";
 return '<div class="fig"><svg viewBox="0 0 340 '+H+'" role="img" aria-label="'+lab+'">'+s+'</svg></div>'}

/* ---------- 文章 ---------- */
var SM='<p class="note" style="font-size:.8rem;margin:.2rem 0">';
var POINT='<p>細胞呼吸は、光合成の逆向きの反応です。</p>'+fig("point")+
 SM+'※ 細胞呼吸は、動物も植物も、いつも行っています。光が当たっていても、行われています。</p>';

var QBODY='<p>光合成と細胞呼吸の図です。空欄に入る言葉を、下の語群から選びなさい。</p>';
var ANS={a1:"二酸化炭素",a2:"水",a3:"デンプンなど",a4:"酸素",a5:"光合成",a6:"細胞呼吸"};
var CH=["酸素","蒸散","デンプンなど","光合成","水","アミノ酸","細胞呼吸","二酸化炭素","消化","窒素"];

var ANSW=fig("ans")+'<p>光合成は、光が当たるときだけ行われる。細胞呼吸は、いつも行われる。</p>';

var TIGHT='<style>.mx th,.mx td{padding-left:.3rem;padding-right:.3rem}</style>';
var SBODY=TIGHT+'<p>次のことは、<b>光合成</b>か<b>細胞呼吸</b>の、どちらのことか。丸をタップして選びなさい。</p>';
var ROWS=[["光が必要","光合成"],["酸素を使う","細胞呼吸"],["二酸化炭素を出す","細胞呼吸"],["デンプンをつくる","光合成"],["動物でも行われる","細胞呼吸"]];
var SOL2='<p>光が必要：<b>光合成</b>(光のエネルギーを使う)<br>'+
 '酸素を使う：<b>細胞呼吸</b>(デンプンなどを、酸素で分解する)<br>'+
 '二酸化炭素を出す：<b>細胞呼吸</b>(光合成は、二酸化炭素を使う)<br>'+
 'デンプンをつくる：<b>光合成</b><br>'+
 '動物でも行われる：<b>細胞呼吸</b>(光合成は、葉緑体のある細胞だけ)</p>';

window.UNIT={
no:"2-13",title:"光合成と細胞呼吸",
sections:[
{type:"text",point:true,title:"厳選ポイント",html:POINT},
{type:"problem",title:"問題",body:QBODY,
 parts:[{type:"tree",svg:fig("blank"),answers:ANS,choices:CH}]},
{type:"answer",html:ANSW},
{type:"problem",title:"補充問題",body:SBODY,
 parts:ROWS.map(function(r){return {label:r[0],type:"choice",choices:["光合成","細胞呼吸"],accept:[r[1]]}}),
 solution:SOL2}
]};
})();
