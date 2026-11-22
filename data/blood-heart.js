(function(){
var INK="#26303b",BLUE="#1f5fa8",RED="#c2410c",GRAY="#8a949f",MUTED="#5d6874",FR="#fdefe8",FB="#e3edf8",FILL="#eceff2",HL="#cfd5db";
function n(v){return Math.round(v*10)/10}
function T(x,y,size,txt,cls,anchor){return '<text x="'+n(x)+'" y="'+n(y)+'" font-size="'+size+'"'+(anchor?' text-anchor="'+anchor+'"':'')+(cls?' class="'+cls+'"':'')+'>'+txt+'</text>'}
/* 色つきの面の上の文字：まわりの白いふちを消す */
function TN(x,y,size,txt,cls,anchor){return '<text x="'+n(x)+'" y="'+n(y)+'" font-size="'+size+'" style="stroke:none"'+(anchor?' text-anchor="'+anchor+'"':'')+(cls?' class="'+cls+'"':'')+'>'+txt+'</text>'}
function line(x1,y1,x2,y2,k,w){return '<line x1="'+n(x1)+'" y1="'+n(y1)+'" x2="'+n(x2)+'" y2="'+n(y2)+'" stroke="'+k+'" stroke-width="'+(w||1)+'"/>'}
function svgY(y0,h,label,body){return '<div class="fig"><svg viewBox="0 '+y0+' 340 '+h+'" role="img" aria-label="'+label+'">'+body+'</svg></div>'}
/* 先は(x2,y2)。頭は「く」の字 */
function arr(x1,y1,x2,y2,k,w){var a=Math.atan2(y2-y1,x2-x1);k=k||INK;w=w||1.5;
 function p(t){return n(x2-7*Math.cos(a+t))+','+n(y2-7*Math.sin(a+t))}
 return line(x1,y1,x2,y2,k,w)+'<path d="M'+p(.5)+' L'+n(x2)+','+n(y2)+' L'+p(-.5)+'" fill="none" stroke="'+k+'" stroke-width="'+w+'" stroke-linecap="round" stroke-linejoin="round"/>'}
/* 名前の線：先に点 */
function ld(x1,y1,x2,y2){return line(x1,y1,x2,y2,INK,1)+'<circle cx="'+n(x2)+'" cy="'+n(y2)+'" r="2.5" fill="'+INK+'"/>'}
/* 空欄(点線の枠) */
function box(id,cx,cy,w,h,fs){
 return '<g class="bl" data-b="'+id+'"><rect x="'+n(cx-w/2)+'" y="'+n(cy-h/2)+'" width="'+w+'" height="'+h+'" rx="4"/>'+
  '<text class="bt" x="'+n(cx)+'" y="'+n(cy+fs*.36)+'" font-size="'+fs+'" text-anchor="middle"></text>'+
  '<text class="bm" x="'+n(cx+w/2-2)+'" y="'+n(cy-h/2+10)+'" font-size="12" text-anchor="end"></text></g>'}

/* ---------- 心臓の図(人の体から見た左右。左側＝右心房・右心室)。赤＝動脈血(左)、青＝静脈血(右)
   mode＝"point"(名前と壁の厚さ)、"blank"(問題：空欄8個)、"ans"(解答：名前だけ) ---------- */
function heart(mode){
 var b=mode==="blank",p=mode==="point",s='',lab;
 function nm(id,cx,cy,txt){return b?box(id,cx,cy,58,24,15):TN(cx,cy+5,15,txt,"b","middle")}
 function vn(id,cx,cy,txt,c){return b?box(id,cx,cy,58,24,15):T(cx,cy+5,14,txt,c+" b","middle")}
 s+='<rect x="70" y="70" width="82" height="50" rx="8" fill="'+FB+'" stroke="'+GRAY+'" stroke-width="1.5"/>'+
  '<rect x="188" y="70" width="82" height="50" rx="8" fill="'+FR+'" stroke="'+GRAY+'" stroke-width="1.5"/>'+
  '<rect x="70" y="126" width="101" height="80" rx="8" fill="'+FB+'" stroke="'+GRAY+'" stroke-width="1.5"/>'+
  '<rect x="170" y="126" width="100" height="80" rx="8" fill="'+FR+'" stroke="'+GRAY+'" stroke-width="1.5"/>';
 /* 血管 */
 s+='<rect x="156" y="42" width="8" height="84" fill="'+FB+'" stroke="'+BLUE+'" stroke-width="1.5"/><polygon points="160,30 153,44 167,44" fill="'+BLUE+'"/>'+
  '<rect x="176" y="42" width="8" height="84" fill="'+FR+'" stroke="'+RED+'" stroke-width="1.5"/><polygon points="180,30 173,44 187,44" fill="'+RED+'"/>'+
  '<rect x="24" y="90" width="44" height="10" fill="'+FB+'" stroke="'+BLUE+'" stroke-width="1.5"/><polygon points="78,95 68,88 68,102" fill="'+BLUE+'"/>'+
  '<rect x="272" y="90" width="44" height="10" fill="'+FR+'" stroke="'+RED+'" stroke-width="1.5"/><polygon points="262,95 272,88 272,102" fill="'+RED+'"/>';
 /* 名前 */
 s+=ld(46,76,46,90)+ld(294,76,294,90)+ld(133,34,157,46)+ld(207,34,183,46);
 s+=vn("h5",46,64,"大静脈","v")+vn("h7",294,64,"肺静脈","m")+vn("h6",104,34,"肺動脈","v")+vn("h8",236,34,"大動脈","m");
 s+=nm("h1",111,95,"右心房")+nm("h2",229,95,"左心房")+nm("h3",120,b?166:160,"右心室")+nm("h4",220,b?166:160,"左心室");
 if(p)s+=TN(120,184,11,"壁が厚い","g","middle")+TN(220,184,11,"壁が最も厚い","g","middle");
 lab="心臓の図。人の体から見た左右なので、図の左側が右、右側が左。"+
  "上の部屋が心房、下の部屋が心室。左側の右心房と右心室は青(静脈血)、右側の左心房と左心室は赤(動脈血)。"+
  "左から右心房に大静脈が入り、右から左心房に肺静脈が入る。中央の上へ向かう2本は、右心室から出る肺動脈(青)と、左心室から出る大動脈(赤)。"+
  (b?"名前は、8つとも空欄。":p?"右心室は壁が厚く、左心室は壁が最も厚い。":"");
 return svgY(16,196,lab,s)}

/* ---------- 血液の流れの図(厳選ポイント)：肺循環と体循環 ---------- */
function brace(y1,y2){var m=(y1+y2)/2;
 return '<path d="M254,'+y1+' Q262,'+y1+' 262,'+(y1+8)+' V'+(m-9)+' Q262,'+m+' 270,'+m+' Q262,'+m+' 262,'+(m+9)+' V'+(y2-8)+' Q262,'+y2+' 254,'+y2+'" fill="none" stroke="'+MUTED+'" stroke-width="1.5"/>'}
function flow(){
 var s='<rect x="120" y="22" width="100" height="28" rx="6" fill="'+FILL+'" stroke="'+GRAY+'" stroke-width="1.2"/>'+TN(170,41,15,"肺","b","middle")+
  '<rect x="120" y="100" width="50" height="50" fill="'+FB+'" stroke="'+GRAY+'" stroke-width="1.2"/><rect x="170" y="100" width="50" height="50" fill="'+FR+'" stroke="'+GRAY+'" stroke-width="1.2"/>'+'<rect x="150" y="116" width="40" height="28" rx="6" fill="#fff"/>'+TN(170,136,15,"心臓","b","middle")+
  '<rect x="120" y="200" width="100" height="28" rx="6" fill="'+FILL+'" stroke="'+GRAY+'" stroke-width="1.2"/>'+TN(170,219,15,"全身","b","middle")+
  arr(150,100,150,54,BLUE,2)+arr(190,54,190,96,RED,2)+arr(190,154,190,196,RED,2)+arr(150,196,150,154,BLUE,2)+
  T(142,83,14,"肺動脈","v b","end")+T(198,83,14,"肺静脈","m b")+T(142,180,14,"大静脈","v b","end")+T(198,180,14,"大動脈","m b")+
  brace(56,100)+T(276,83,14,"肺循環","b")+brace(154,196)+T(276,180,14,"体循環","b");
 return svgY(14,222,"血液の流れの図。上に肺、真ん中に心臓、下に全身がある。心臓の左半分は青、右半分は赤。心臓から肺へ、青い肺動脈が上へ向かい、肺から心臓へ、赤い肺静脈が下へ向かう。この流れが肺循環。心臓から全身へ、赤い大動脈が下へ向かい、全身から心臓へ、青い大静脈が上へ向かう。この流れが体循環",s)}

/* ---------- 補充問題の模式図：血液が全身をめぐるようす。ア〜カ＝血管。hl＝答えの記号(解答の図で目立たせる) ---------- */
function lc(x,y,ch,hl){var on=hl&&hl.indexOf(ch)>=0;
 return '<circle cx="'+x+'" cy="'+y+'" r="11" fill="'+(on?HL:"#fff")+'" stroke="'+INK+'" stroke-width="'+(on?3:1.2)+'"/>'+TN(x,y+5,14,ch,"b","middle")}
function ob(x,y,w,h,txt){return '<rect x="'+x+'" y="'+y+'" width="'+w+'" height="'+h+'" rx="4" fill="'+FILL+'" stroke="'+GRAY+'" stroke-width="1.2"/>'+TN(x+w/2,y+h/2+5,14,txt,"b","middle")}
function body(hl){
 var s=ob(110,8,120,26,"肺")+ob(70,86,200,38,"心臓")+ob(140,144,60,20,"小腸")+ob(140,204,60,20,"肝臓")+ob(140,235,60,22,"腎臓")+ob(120,272,100,22,"ほかの部分");
 s+=arr(130,86,130,38)+arr(210,38,210,82)+
  line(250,124,250,283,INK,1.5)+arr(250,283,222,283)+arr(250,154,202,154)+arr(250,246,202,246)+
  arr(170,164,170,202)+arr(140,214,92,214)+arr(140,246,92,246)+
  line(90,283,90,200,INK,1.5)+arr(120,283,92,283)+arr(90,200,90,126);
 s+=lc(130,62,"ア",hl)+lc(210,62,"イ",hl)+lc(250,138,"ウ",hl)+lc(90,165,"エ",hl)+lc(170,183,"オ",hl)+lc(113,246,"カ",hl);
 return svgY(0,302,"血液が全身をめぐるようすの模式図。上に肺、その下に心臓、下の方に小腸、肝臓、腎臓、ほかの部分がある。心臓から肺へ向かう血管がア、肺から心臓へ向かう血管がイ。心臓から出る太い血管がウで、小腸、腎臓、ほかの部分へ枝分かれする。ほかの部分から心臓にもどる血管がエ。小腸から肝臓へ向かう血管がオ。腎臓から出て、エにつながる血管がカ。肝臓からも、エにつながる血管が出ている"+(hl?"。答えの記号は、太い丸と灰色で示している":""),s)}

/* ---------- 文章 ---------- */
var SM='<p class="note" style="font-size:.8rem;margin:.2rem 0">';
var HD='font-size:1.05rem;font-weight:700;line-height:1.5;margin:1.8rem 0 .3rem;padding-bottom:.2rem;border-bottom:1px solid #c9d0d7';
function hd(x,first){return '<h3 style="'+HD+(first?';margin-top:.9rem':'')+'">'+x+'</h3>'}
var M=function(t){return '<span class="m">'+t+'</span>'},V=function(t){return '<span class="v">'+t+'</span>'};
var TD='<td style="padding:.3rem .5rem;text-align:left">',TH='<th style="text-align:left">';
function tr(a,b,c){return '<tr>'+TD+'<b>'+a+'</b></td>'+TD+b+'</td>'+TD+c+'</td></tr>'}
var TB='<div style="overflow-x:auto"><table style="margin:.4rem 0"><tr>'+TH+'成分</th>'+TH+'状態</th>'+TH+'はたらき</th></tr>'+
 tr('赤血球','固体','酸素を運ぶ<br>(ヘモグロビン＝赤い色素)')+tr('白血球','固体','菌やウイルスを分解する')+tr('血小板','固体','出血時に血を固める')+
 tr('血しょう','液体','何でも運ぶ<br>(栄養、二酸化炭素、不要物など)')+'</table></div>';

var POINT=hd('血液',true)+
 '<p>血液は、固体の成分と、液体の成分(血しょう)でできています。</p>'+TB+
 SM+'※ 血しょうが血管からしみ出ると、組織液になります。</p>'+
 hd('心臓')+
 '<p>心臓から出る血管を<b>動脈</b>、心臓に入る血管を<b>静脈</b>といいます。'+M('動脈血')+'は酸素が多い血液、'+V('静脈血')+'は酸素が少ない血液です。</p>'+heart("point")+
 SM+'※ 左右は、人の体から見た左右です。図では、右心房と右心室が左側にあります。</p>'+
 '<p>肺動脈には'+V('<b>静脈血</b>')+'、肺静脈には'+M('<b>動脈血</b>')+'が流れます。名前と中身が、逆になっています。</p>'+
 hd('血液の流れ')+
 '<p>心臓から肺を通って心臓にもどる流れを<b>肺循環</b>、心臓から全身を通って心臓にもどる流れを<b>体循環</b>といいます。</p>'+flow();

var QBODY='<p>血液と心臓について、答えなさい。</p>';
var BL=["赤血球","白血球","血小板","血しょう"];
var ANS8={h1:"右心房",h2:"左心房",h3:"右心室",h4:"左心室",h5:"大静脈",h6:"肺動脈",h7:"肺静脈",h8:"大動脈"};
var CH=["肺動脈","右心室","大静脈","左心房","腎静脈","大動脈","右心房","肝静脈","肺静脈","左心室"];

var ANS='<p>(1) 酸素を運ぶ：<b>赤血球</b><br>　　血を固める：<b>血小板</b><br>　　菌を分解：<b>白血球</b><br>　　何でも運ぶ：<b>血しょう</b></p>'+
 '<p>(2)</p>'+heart("ans")+
 '<p>肺動脈には'+V('<b>静脈血</b>')+'、肺静脈には'+M('<b>動脈血</b>')+'が流れます。</p>';

var SBODY='<p>図は、血液が全身をめぐるようすを、簡単に表した模式図です。矢印は、血液の流れる向きです。ア〜カは、血管です。</p>'+body(null)+
 SM+'※ あてはまる記号を、すべて選びます。</p>';
var SHEAD='(1) 食後、栄養分が最も多い血液が流れる血管<br>(2) 尿素が最も少ない血液が流れる血管<br>(3) 酸素が少ない血液が流れる動脈<br>(4) 酸素が多い血液が流れる血管';
var AB=["ア","イ","ウ","エ","オ","カ"];
var SOL2=body("アイウオカ")+
 '<p>(1) <b>オ</b>：小腸で吸収された、ブドウ糖やアミノ酸が、肝臓へ向かう血管に入る。</p>'+
 '<p>(2) <b>カ</b>：不要な尿素は、腎臓でこし出されて、尿になる。腎臓から出る血管で、最も少ない。</p>'+
 '<p>(3) <b>ア</b>：肺動脈。動脈で、酸素が少ないのは、肺動脈だけ。</p>'+
 '<p>(4) <b>イ・ウ</b>：肺で酸素を受け取った血液が、肺静脈から心臓へ入り、大動脈から出ていく。</p>';

window.UNIT={
no:"2-14",title:"血液と心臓",
sections:[
{type:"text",point:true,title:"厳選ポイント",html:POINT},
{type:"problem",title:"問題",body:QBODY,
 parts:[
  {head:"(1) 次のはたらきをする成分を、丸をタップして選びなさい。",label:"酸素を運ぶ",type:"choice",choices:BL,accept:["赤血球"]},
  {label:"血を固める",type:"choice",choices:BL,accept:["血小板"]},
  {label:"菌を分解",type:"choice",choices:BL,accept:["白血球"]},
  {label:"何でも運ぶ",type:"choice",choices:BL,accept:["血しょう"]},
  {head:"(2) 心臓の図の空欄に入る名前を、下の語群から選びなさい。",type:"tree",svg:heart("blank"),answers:ANS8,choices:CH}
 ]},
{type:"answer",html:ANS},
{type:"problem",title:"補充問題",body:SBODY,
 parts:[
  {head:SHEAD,label:"(1)",type:"multi",choices:AB,accept:["オ"]},
  {label:"(2)",type:"multi",choices:AB,accept:["カ"]},
  {label:"(3)",type:"multi",choices:AB,accept:["ア"]},
  {label:"(4)",type:"multi",choices:AB,accept:["イウ"]}
 ],
 solution:SOL2}
]};
})();
