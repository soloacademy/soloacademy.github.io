(function(){
var INK="#26303b",BLUE="#1f5fa8",RED="#c2410c",GRAY="#8a949f",MUTED="#5d6874",FILL="#e6e9ed";
function n(v){return Math.round(v*10)/10}
function T(x,y,size,txt,cls,anchor){return '<text x="'+n(x)+'" y="'+n(y)+'" font-size="'+size+'"'+(anchor?' text-anchor="'+anchor+'"':'')+(cls?' class="'+cls+'"':'')+'>'+txt+'</text>'}
/* 色つきの面の上の文字：まわりの白いふちを消す */
function TN(x,y,size,txt,cls,anchor){return '<text x="'+n(x)+'" y="'+n(y)+'" font-size="'+size+'" style="stroke:none"'+(anchor?' text-anchor="'+anchor+'"':'')+(cls?' class="'+cls+'"':'')+'>'+txt+'</text>'}
function svg(w,h,label,body){return '<div class="fig"><svg viewBox="0 0 '+w+' '+h+'" role="img" aria-label="'+label+'">'+body+'</svg></div>'}
function line(x1,y1,x2,y2,k,w){return '<line x1="'+n(x1)+'" y1="'+n(y1)+'" x2="'+n(x2)+'" y2="'+n(y2)+'" stroke="'+k+'" stroke-width="'+(w||1)+'"/>'}
function svgY(y0,y1,label,body){return '<div class="fig"><svg viewBox="0 '+y0+' 340 '+(y1-y0)+'" role="img" aria-label="'+label+'">'+body+'</svg></div>'}
/* 力の矢印：(x1,y1)から(x2,y2)へ。先は(x2,y2) */
function arrow(x1,y1,x2,y2,k){
 var a=Math.atan2(y2-y1,x2-x1),L=11,H=6,bx=x2-L*Math.cos(a),by=y2-L*Math.sin(a),sn=Math.sin(a),cs=Math.cos(a);
 return line(x1,y1,bx,by,k,3)+'<circle cx="'+n(x1)+'" cy="'+n(y1)+'" r="3.5" fill="'+k+'"/>'+'<polygon points="'+n(x2)+','+n(y2)+' '+n(bx-H*sn)+','+n(by+H*cs)+' '+n(bx+H*sn)+','+n(by-H*cs)+'" fill="'+k+'"/>'}
function sp(c,t){return '<tspan class="'+c+' b">'+t+'</tspan>'}
function num(x,y,c){return T(x,y,14,c,null,"middle")}

/* 厳選ポイントの図：物体を、左右のひもで同じ大きさで引き合う。矢印は、ひもが物体に接する点(左右の面)から出す。どちらも「物体を」引く力なので青 */
function pull(label){
 var s='<line x1="14" y1="90" x2="120" y2="90" stroke="#b4bbc3" stroke-width="1.5"/><line x1="220" y1="90" x2="326" y2="90" stroke="#b4bbc3" stroke-width="1.5"/>'+
  '<rect x="120" y="60" width="100" height="60" fill="'+FILL+'" stroke="'+GRAY+'" stroke-width="1"/>'+TN(170,96,14,"物体","g","middle")+
  arrow(120,90,60,90,BLUE)+arrow(220,90,280,90,BLUE)+
  T(90,36,14,sp("v","物体を"),null,"middle")+T(90,54,14,"左に引く力",null,"middle")+
  T(250,36,14,sp("v","物体を"),null,"middle")+T(250,54,14,"右に引く力",null,"middle");
 return svg(340,130,label,s)}

/* つるしたおもり。矢印は、力がはたらく点から出す：接している力は接点(ひもの両端)から、重力はおもりの中心から
   kind：plain＝矢印なし、num＝矢印(色なし)と番号だけ(問題用)、point＝色つきの矢印と文字(番号なし)、ans＝色つきの矢印と番号つきの文字
   色：ひもを＝赤、おもりを＝青、天井を＝灰色 */
function hang(kind,label){
 var ar=kind!=="plain",col=kind==="point"||kind==="ans",nm=kind==="ans",pn=kind==="num",
  cR=col?RED:INK,cB=col?BLUE:INK,cG=col?MUTED:INK,X=60;
 function N(c){return nm?c+" ":""}
 var s='<rect x="10" y="40" width="120" height="18" fill="'+FILL+'" stroke="'+GRAY+'" stroke-width="1"/>'+TN(16,54,13,"天井","g")+
  line(X,58,X,150,"#b4bbc3",1.5)+
  '<rect x="30" y="150" width="60" height="90" fill="'+FILL+'" stroke="'+GRAY+'" stroke-width="1"/>'+
  T(52,108,13,"ひも","g","end")+T(X,262,13,"おもり","g","middle");
 if(ar)s+=arrow(X,58,X,26,cR)+arrow(X,58,X,90,cG)+arrow(X,150,X,182,cR)+arrow(X,150,X,110,cB)+arrow(X,195,X,235,cB);
 function SL(x,y,c,t){return T(x,y,14,c+'<tspan font-size="12"> '+t+'</tspan>')}
 if(pn)s+=SL(72,32,"①","天井がひもを引く力")+SL(72,86,"②","ひもが天井を引く力")+SL(72,134,"③","ひもがおもりを引く力")+SL(72,170,"④","おもりがひもを引く力")+SL(72,218,"⑤","地球がおもりを引く力(重力)");
 if(col)s+=
   T(72,32,14,N("①")+"天井が"+sp("m","ひもを")+"引く力")+
   T(72,86,14,N("②")+"ひもが"+sp("g","天井を")+"引く力")+
   T(72,134,14,N("③")+"ひもが"+sp("v","おもりを")+"引く力")+
   T(106,170,14,N("④")+"おもりが"+sp("m","ひもを")+"引く力")+
   T(106,218,14,N("⑤")+"地球が"+sp("v","おもりを")+"引く力(重力)");
 return svg(340,276,label,s)}

/* 机の上の物体。③(垂直抗力)は物体の下面から、②(重力)は物体の中心から、①は机の上面から。3本は、重ならないぎりぎりまで寄せる(10ずつ)
   kind：num＝矢印(色なし)と番号だけ、ans＝色つきの矢印と番号つきの文字。机を＝赤、物体を＝青 */
function desk(kind,label){
 var col=kind==="ans",pn=kind==="num",cB=col?BLUE:INK,cR=col?RED:INK,
  s='<rect x="14" y="200" width="120" height="56" fill="'+FILL+'" stroke="'+GRAY+'" stroke-width="1"/>'+TN(20,224,13,"机","g")+
  '<rect x="34" y="140" width="80" height="60" fill="#cfd5db" stroke="'+GRAY+'" stroke-width="1"/>'+TN(40,158,13,"物体","g")+
  arrow(74,170,74,220,cB)+arrow(83,200,83,150,cB)+arrow(83,200,83,250,cR);
 if(pn)s+=num(62,196.3,"①")+num(95,183.8,"②")+num(95,226.3,"③");
 if(col)s+=T(140,172,13,"① 地球が"+sp("v","物体を")+"引く力(重力)")+
   T(140,138,13,"② 机が"+sp("v","物体を")+"押す力")+
   T(140,244,13,"③ 物体が"+sp("m","机を")+"押す力");
 return svgY(125,266,label,s)}

/* つり合う2力：縦に2行並べ、「〜を」をそろえ、下に「どちらも「〜を」＋t」と書く。rows＝[[番号,だれが,〜を,動き],…]、k＝m(赤)かv(青) */
function pair(rows,k,q,label){
 var y=[22,48],s='',o=36;
 rows.forEach(function(r,i){s+=T(o+4,y[i],16,r[0])+T(o+26,y[i],16,r[1])+T(o+86,y[i],16,sp(k,r[2]))+T(o+156,y[i],16,r[3])});
 s+=T(4,y[0],16,q,"b");
 return svg(340,58,label,s)}

var LBL1="天井からひもでおもりがつるされている図。ひもの上端と下端、おもりの中心から、5本の力の矢印が出ていて、それぞれに番号①〜⑤と、力の名前が付いている";
var LBL2="天井からつるされたおもりにはたらく5つの力の図。ひもを引く2つの力は赤、おもりを引く2つの力は青、天井を引く力は灰色。同じ色の2本が、つり合う2力";
var FIGPULL=pull("物体が、左右のひもで、同じ大きさの力で引かれている図。左のひもは物体を左に、右のひもは物体を右に引いている。2本の矢印は、同じ直線上にあり、向きが逆で、長さが等しい");
var FIGP=hang("num",LBL1);
var FIGPOINT=hang("point",LBL2);
var PAIR1=pair([["①","天井が","ひもを","引く力"],["④","おもりが","ひもを","引く力"]],"m","(1)","天井がひもを引く力と、おもりがひもを引く力の2つ。どちらもひもを引く力");
var PAIR2=pair([["③","ひもが","おもりを","引く力"],["⑤","地球が","おもりを","引く力(重力)"]],"v","(2)","ひもがおもりを引く力と、地球がおもりを引く力(重力)の2つ。どちらもおもりを引く力");
var FIGD=desk("num","机の上に物体が静止している図。物体の中心から下向きの矢印①が出ている。机と物体が接する1点から、上向きの矢印②と、下向きの矢印③が出ていて、それぞれに番号が付いている");
var PAIRD=pair([["①","地球が","物体を","引く力(重力)"],["②","机が","物体を","押す力"]],"v","(1)","地球が物体を引く力(重力)と、机が物体を押す力の2つ。どちらも物体を引く・押す力");

var CH5=["②","③","④","⑤"],CH3=["②","③"];

window.UNIT={
no:"1-15",title:"力のつり合い",
sections:[
{type:"text",point:true,title:"厳選ポイント",html:
 '<p>1つの物体にはたらく2力が、つり合う条件は3つです。</p>'+FIGPULL+
 '<p>① <b>大きさが等しい</b><br>② <b>向きが逆</b><br>③ <b>同じ直線上にある</b></p>'+
 '<p><b>「〜を」が同じ</b>(どちらも<span class="v">物体を</span>引く力)であることも、大切です。<br>引く力か押す力かは、関係ありません。</p>'},
{type:"problem",title:"問題",
 body:'<p>図のように、おもりがひもでつるされて、静止している。</p>'+FIGP+
 '<p>次の力とつり合う力を、②〜⑤から選びなさい。</p>',
 parts:[
  {label:"(1) ①とつり合う力",type:"choice",choices:CH5,accept:["④"]},
  {label:"(2) ③とつり合う力",type:"choice",choices:CH5,accept:["⑤"]}
 ]},
{type:"answer",html:
 PAIR1+'<p>どちらも「<span class="m">ひもを</span>」引く力なので、正解は<b>④</b>です。</p>'+
 PAIR2+'<p>どちらも「<span class="v">おもりを</span>」引く力なので、正解は<b>⑤</b>です。</p>'+
 '<p class="note">②は「天井を」引く力です。同じ「〜を」の力がないので、つり合う相手はありません。</p>'},
{type:"problem",title:"補充問題",
 body:'<p>机の上に、物体が静止している。</p>'+FIGD+
 '<p>① 地球が物体を引く力(重力)<br>② 机が物体を押す力(垂直抗力)<br>③ 物体が机を押す力</p>'+
 '<p>①とつり合う力を、②、③から選びなさい。</p>',
 parts:[{label:"(1) ①とつり合う力",type:"choice",choices:CH3,accept:["②"]}],
 solution:
 PAIRD+'<p>どちらも「<span class="v">物体を</span>」引く・押す力なので、正解は<b>②</b>です。</p>'+
 '<p class="note">②と③は、大きさが等しく向きが反対ですが、「〜を」が違うので、つり合いではありません。</p>'}
]};
})();
