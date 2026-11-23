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

/* ---------- 心臓の図：塾長のPowerPoint原稿の心臓の線を使用(左側＝右心房・右心室。人の体から見た左右)
   名前は、左右の外側に置き、線で指す。血管の名前は、「動脈」を赤、「静脈」を青にする(血管の種類)。中の矢印は、血液の種類(静脈血＝青、動脈血＝赤)
   mode＝"point"(名前と壁の厚さ)、"blank"(問題：空欄8個)、"ans"(解答：名前だけ) ---------- */
var HP=[
 ["M 383.1 474.3 C 392.5 474.3 400.1 470.8 400.1 466.4 L 400.1 331.4 C 400.1 330.9 400 330.3 399.8 329.8 L 399.7 329.8 L 400.3 328.9 C 403.6 323.4 406.6 317.4 409.4 311.1 C 412.1 317.4 415.1 323.4 418.4 328.9 L 420.7 332.5 L 420.7 466.4 C 420.7 470.8 428.4 474.3 437.8 474.3 C 447.1 474.3 454.8 470.8 454.8 466.4 L 454.8 370.4 L 465.8 377.9 C 501.7 399.1 543.6 398.2 575.2 380.9 L 578.1 378.9 L 637.1 468.3 C 638.3 470.2 641 470.8 644.4 470.2 C 647.7 469.7 651.8 468.1 655.7 465.6 C 659.6 463 662.6 459.9 664.4 457 C 665.3 455.6 665.9 454.2 666.1 452.9 C 666.3 451.6 666.1 450.5 665.5 449.6 L 604 356.4 L 605.5 354.6 C 648.7 296.5 626.6 180.4 409.4 49.7 C 192.1 180.4 170 296.5 213.2 354.6 L 215.6 357.4 L 155.9 449.1 C 153.6 452.8 158.1 459.9 165.9 465 C 169.9 467.6 173.9 469.1 177.3 469.6 C 178.9 469.9 180.4 469.8 181.7 469.5 C 182.9 469.2 183.9 468.6 184.5 467.7 L 241.6 379.6 L 243.5 380.9 C 279.1 400.4 327.6 399 366.1 368.9 L 366.1 368.9 L 366.1 466.4 C 366.1 470.8 373.7 474.3 383.1 474.3 Z M 383.1 474.3","#bfbfbf",6,1,0],
 ["M 365.2 468.9 C 365.2 472.4 373.3 475.3 383.2 475.3 C 393.1 475.3 401.2 472.4 401.2 468.9 C 401.2 465.3 393.1 462.4 383.2 462.4 C 373.3 462.4 365.2 465.3 365.2 468.9 Z M 365.2 468.9","#a5a5a5",6,1,0],
 ["M 419.8 468.9 C 419.8 472.4 427.8 475.3 437.8 475.3 C 447.7 475.3 455.8 472.4 455.8 468.9 C 455.8 465.3 447.7 462.4 437.8 462.4 C 427.8 462.4 419.8 465.3 419.8 468.9 Z M 419.8 468.9","#a5a5a5",6,1,0],
 ["M 637.3 468.7 C 639.2 471.7 647.5 469.7 655.9 464.3 C 664.2 458.9 669.4 452.1 667.5 449.1 C 665.5 446.1 657.2 448.1 648.9 453.5 C 640.5 459 635.3 465.8 637.3 468.7 Z M 637.3 468.7","#a5a5a5",6,1,0],
 ["M 153.5 449.1 C 151.6 452.1 156.8 458.9 165.1 464.3 C 173.4 469.7 181.8 471.7 183.7 468.7 C 185.6 465.8 180.4 459 172.1 453.5 C 163.8 448.1 155.4 446.1 153.5 449.1 Z M 153.5 449.1","#a5a5a5",6,1,0],
 ["M 371.5 372.6 C 371.5 338.1 354.6 303.6 337.8 303.6 C 321 303.6 304.1 269 304.1 234.5","#bfbfbf",6,0,0],
 ["M 448.5 372.6 C 448.5 338.4 465.3 304.2 482.1 304.2 C 498.9 304.2 515.8 269.9 515.8 235.7","#bfbfbf",6,0,0],
 ["M 413.5 318.7 C 425.9 329.2 432.8 349.1 431.2 370.2","#bfbfbf",6,0,0],
 ["M 409.1 313.9 C 395.5 326.4 389.6 348.7 394.1 371.2","#bfbfbf",6,0,0],
 ["M 623.3 299.1 C 623.3 271.6 605.3 243.9 587.2 243.9 C 569.2 243.9 551.2 231.2 551.2 218.4","#bfbfbf",6,0,0],
 ["M 195 303.5 C 195 283.3 213 263.1 231 263.1 C 249 263.1 267 242.9 267 222.7","#bfbfbf",6,0,0],
 ["M 409.4 311.1 L 409.4 49.7","#bfbfbf",6,0,0],
 ["M 418.4 57.1 L 437.7 69.5 C 444.6 73.9 452.9 78.8 459.6 83.3 C 466.2 87.8 477.8 96.5 477.8 96.5 C 483.3 100.5 487.4 103.2 492.5 107 C 497.5 110.9 508.2 119.7 508.2 119.7 C 514.9 125.1 525.7 133.4 532.5 139.4 C 539.4 145.4 543.9 150.2 549.4 155.6 C 554.9 161.1 560.3 166 565.7 172.1 C 571.1 178.1 576.8 185.4 581.7 191.8 C 586.6 198.1 590.8 202.6 595.3 210.1 C 599.7 217.6 605.5 230.1 608.5 236.6 C 611.6 243 613.5 249 613.5 249 C 614.3 250.9 613.9 249.4 613.5 247.9","#7f7f7f",12,0,1],
 ["M 418.6 316 L 418.6 58","#7f7f7f",12,0,1],
 ["M 404.4 316.5 L 404.4 58.5","#7f7f7f",6,0,1],
 ["M 403.8 55.8 L 391.6 64.4 C 387.9 67 384.9 69.1 381.7 71.1 C 378.6 73.1 376.9 73.9 372.8 76.5 C 368.7 79.1 363.1 82.5 357.1 86.7 C 351.2 91 337 102 337 102 C 329 108.2 318.4 115.8 308.9 123.7 C 299.4 131.6 287.4 142.7 280.1 149.5 C 272.9 156.4 270.6 159.2 265.4 164.8 C 260.2 170.4 254.4 175.9 248.8 183 C 243.2 190.1 236.6 200.5 231.9 207.5 C 227.1 214.5 223.9 218.8 220.4 225 C 216.9 231.2 213.6 238 210.8 244.8 C 208 251.6 204.8 260.9 203.5 265.8 C 202.1 270.7 202.5 272.4 202.8 274.1","#7f7f7f",6,0,1]];
var HS=.42,HX=-2.2,HY=6.7;
function hx(x){return n(HX+HS*x)}
function hy(y){return n(HY+HS*y)}
function heartLines(){
 var s='<g transform="translate('+HX+','+HY+') scale('+HS+')">';
 HP.forEach(function(p){s+='<path d="'+p[0]+'" transform="matrix(1,0,0,-1,0,540)" fill="'+(p[3]?"#fff":"none")+'" stroke="'+p[1]+'" stroke-width="'+p[2]+'" stroke-linecap="'+(p[4]?"round":"butt")+'" stroke-linejoin="round"/>'});
 /* 血液の流れの矢印：右心(青)と左心(赤) */
 s+='<g fill="none" stroke-width="10" stroke-linecap="round"><path d="M280,284 C280,336 346,346 356,276" stroke="'+BLUE+'"/><path d="M540,284 C540,336 474,346 464,276" stroke="'+RED+'"/></g>'+
  '<polygon points="356,252 337,280 375,280" fill="'+BLUE+'"/><polygon points="464,252 445,280 483,280" fill="'+RED+'"/></g>';
 return s}
function heart(mode){
 var b=mode==="blank",p=mode==="point",s=heartLines(),lab;
 function nm(id,cx,cy,txt){return b?box(id,cx,cy,58,24,15):TN(cx,cy+5,15,txt,"b","middle")}
 function vn(id,cx,cy,pre,suf,c){return b?box(id,cx,cy,58,24,15):T(cx,cy+5,14,pre+'<tspan class="'+c+'">'+suf+'</tspan>',"b","middle")}
 s+=ld(58,35,69,42)+ld(284,35,272,42)+ld(141,14,156,37)+ld(199,14,183,38);
 s+=vn("h5",34,24,"大","静脈","v")+vn("h7",306,24,"肺","静脈","v")+vn("h6",112,14,"肺","動脈","m")+vn("h8",228,14,"大","動脈","m");
 s+=ld(63,105,96,105)+ld(63,178,112,176)+ld(277,105,237,105)+ld(277,178,216,179);
 s+=nm("h1",34,105,"右心房")+nm("h3",34,178,"右心室")+nm("h2",306,105,"左心房")+nm("h4",306,178,"左心室");
 if(p)s+=TN(34,198,10,"(壁が厚い)","g","middle")+TN(306,198,10,"(壁が最も厚い)","g","middle");
 s+=T(130,160,12,"静脈血","v b","middle")+T(200,160,12,"動脈血","m b","middle");
 lab="心臓の図。人の体から見た左右なので、図の左側が右、右側が左。心臓の上に、4本の血管が出入りしている。左上の血管が大静脈、中央の2本は、左が肺動脈、右が大動脈、右上の血管が肺静脈。"+
  "左側の右心房と右心室の中には、静脈血を表す青い矢印、右側の左心房と左心室の中には、動脈血を表す赤い矢印がある。名前の中の動脈は赤、静脈は青で書いてある。"+
  (b?"4つの部屋と4本の血管の名前は、8つとも空欄。":p?"右心室は壁が厚く、左心室は壁が最も厚い。":"");
 return svgY(0,224,lab,s)}

/* ---------- 補充問題の模式図：血液が全身をめぐるようす。ア〜カ＝血管。hl＝答えの記号(解答の図で目立たせる) ---------- */
function lc(x,y,ch,hl){var on=hl&&hl.indexOf(ch)>=0;
 return '<circle cx="'+x+'" cy="'+y+'" r="11" fill="'+(on?HL:"#fff")+'" stroke="'+INK+'" stroke-width="'+(on?3:1.2)+'"/>'+TN(x,y+5,14,ch,"b","middle")}
function ob(x,y,w,h,txt){return '<rect x="'+x+'" y="'+y+'" width="'+w+'" height="'+h+'" rx="4" fill="'+FILL+'" stroke="'+GRAY+'" stroke-width="1.2"/>'+TN(x+w/2,y+h/2+5,14,txt,"b","middle")}
function body(hl){
 var s=ob(110,8,120,26,"肺")+ob(70,86,200,38,"心臓")+ob(140,144,60,20,"小腸")+ob(140,204,60,20,"肝臓")+ob(140,235,60,22,"腎臓")+ob(120,272,100,22,"ほかの部分");
 s+=arr(130,86,130,38)+arr(210,38,210,82)+
  line(250,124,250,283,INK,1.5)+arr(250,283,222,283)+arr(250,154,202,154)+arr(250,214,202,214)+arr(250,246,202,246)+
  arr(170,164,170,202)+arr(140,214,92,214)+arr(140,246,92,246)+
  line(90,283,90,200,INK,1.5)+arr(120,283,92,283)+arr(90,200,90,126);
 s+=lc(130,62,"ア",hl)+lc(210,62,"イ",hl)+lc(250,138,"ウ",hl)+lc(90,165,"エ",hl)+lc(170,183,"オ",hl)+lc(113,246,"カ",hl);
 return svgY(0,302,"血液が全身をめぐるようすの模式図。上に肺、その下に心臓、下の方に小腸、肝臓、腎臓、ほかの部分がある。心臓から肺へ向かう血管がア、肺から心臓へ向かう血管がイ。心臓から出る太い血管がウで、小腸、腎臓、ほかの部分へ枝分かれする。ほかの部分から心臓にもどる血管がエ。小腸から肝臓へ向かう血管がオ。大動脈から肝臓へも、血管がつながっている。腎臓から出て、エにつながる血管がカ。肝臓からも、エにつながる血管が出ている"+(hl?"。答えの記号は、太い丸と灰色で示している":""),s)}

/* ---------- 血液の流れの図(厳選ポイント)：補充問題の模式図と同じ形(記号なし)。矢印は、赤＝動脈血、青＝静脈血 ---------- */
function brace(bx,y1,y2){var m=(y1+y2)/2;
 return '<path d="M'+bx+','+y1+' Q'+(bx+8)+','+y1+' '+(bx+8)+','+(y1+8)+' V'+(m-9)+' Q'+(bx+8)+','+m+' '+(bx+16)+','+m+' Q'+(bx+8)+','+m+' '+(bx+8)+','+(m+9)+' V'+(y2-8)+' Q'+(bx+8)+','+y2+' '+bx+','+y2+'" fill="none" stroke="'+MUTED+'" stroke-width="1.5"/>'}
function vl(x,y,pre,suf,c,an){return T(x,y,14,pre+'<tspan class="'+c+'">'+suf+'</tspan>',"b",an)}
function flow(){
 var s=ob(80,8,120,26,"肺")+ob(40,86,200,38,"心臓")+ob(110,144,60,20,"小腸")+ob(110,204,60,20,"肝臓")+ob(110,235,60,22,"腎臓")+ob(90,272,100,22,"ほかの部分");
 s+=arr(100,86,100,38,BLUE,2)+arr(180,38,180,82,RED,2)+
  line(220,124,220,283,RED,2)+arr(220,283,192,283,RED,2)+arr(220,154,172,154,RED,2)+arr(220,214,172,214,RED,2)+arr(220,246,172,246,RED,2)+
  arr(140,164,140,202,BLUE,2)+arr(110,214,62,214,BLUE,2)+arr(110,246,62,246,BLUE,2)+
  line(60,283,60,200,BLUE,2)+arr(90,283,62,283,BLUE,2)+arr(60,200,60,126,BLUE,2);
 s+=vl(92,67,"肺","動脈","m","end")+vl(188,67,"肺","静脈","v")+vl(228,142,"大","動脈","m")+vl(52,170,"大","静脈","v","end")+
  brace(278,36,88)+T(296,67,13,"肺循環","b")+brace(278,126,286)+T(296,211,13,"体循環","b");
 return svgY(0,302,"血液の流れの図。上に肺、その下に心臓、下の方に小腸、肝臓、腎臓、ほかの部分がある。心臓から肺へ向かう肺動脈は青、肺から心臓へ向かう肺静脈は赤。心臓から出る大動脈は赤で、小腸、肝臓、腎臓、ほかの部分へ枝分かれする。小腸から肝臓へ向かう血管、肝臓、腎臓、ほかの部分から出て、大静脈を通って心臓へもどる血管は青。肺を通る流れが肺循環、全身を通る流れが体循環。名前の中の動脈は赤、静脈は青で書いてある",s)}

/* ---------- 文章 ---------- */
var SM='<p class="note" style="font-size:.8rem;margin:.2rem 0">';
var HD='font-size:1.05rem;font-weight:700;line-height:1.5;margin:1.8rem 0 .3rem;padding-bottom:.2rem;border-bottom:1px solid #c9d0d7';
function hd(x,first){return '<h3 style="'+HD+(first?';margin-top:.9rem':'')+'">'+x+'</h3>'}
var M=function(t){return '<span class="m">'+t+'</span>'},V=function(t){return '<span class="v">'+t+'</span>'};
var IC1='data:image/png;base64,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',IC2='data:image/png;base64,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';
var GRD='display:grid;grid-template-columns:max-content 1fr;column-gap:.9rem;row-gap:.5rem;align-items:center;margin:.6rem 0';
function gr(a,c,u,gap){var m=gap?'margin-top:.7rem;':'';
 return '<span style="'+m+'white-space:nowrap"><b>'+a+'</b></span>'+
  '<span style="'+m+'display:flex;align-items:center;gap:.5rem"><span style="font-size:.88rem;line-height:1.6">'+c+'</span>'+(u?'<img src="'+u+'" alt="" aria-hidden="true" style="flex:none;height:1.7rem;width:1.7rem">':'')+'</span>'}
var TB='<div style="'+GRD+'">'+
 gr('赤血球','酸素を運ぶ<br><span style="white-space:nowrap">(ヘモグロビン</span><wbr><span style="white-space:nowrap">＝赤い色素)</span>',IC1)+gr('白血球','菌やウイルスを分解する')+gr('血小板','出血時に血を固める',IC2)+
 gr('血しょう','何でも運ぶ<br><span style="white-space:nowrap">(栄養、</span><wbr><span style="white-space:nowrap">二酸化炭素、</span><wbr><span style="white-space:nowrap">不要物など)</span>',null,1)+'</div>';

var ORG='<div style="'+GRD+'">'+
 gr('肺','酸素をとり入れ、二酸化炭素を出す')+gr('小腸','消化した栄養分を吸収する')+
 gr('肝臓','栄養分をたくわえる<br>アンモニアを、害の少ない尿素に変える<br>胆汁をつくる')+
 gr('腎臓','血液から、尿素などの不要物をこし出して、尿をつくる')+'</div>';

var POINT=hd('血液',true)+
 '<p>血液は、固体の成分と、液体の成分でできています。</p>'+TB+
 SM+'※ 血しょうは、液体の成分です。その一部が血管からしみ出ると、組織液になります。</p>'+
 hd('心臓')+
 '<p>心臓から出る血管を<b>動脈</b>、心臓に入る血管を<b>静脈</b>といいます。'+M('動脈血')+'は酸素が多い血液、'+V('静脈血')+'は酸素が少ない血液です。</p>'+heart("point")+
 SM+'※ 図は、体の正面から見た心臓です。そのため、右心房と右心室は、図の左側にあります。<br>※ 肺動脈には静脈血、肺静脈には動脈血が流れます。名前と中身が、逆になっています。</p>'+
 hd('臓器のはたらき')+
 '<p>血液は、全身をめぐる間に、いろいろな臓器を通ります。</p>'+ORG+
 '<p>不要な物質を体の外に出すことを<b>排出</b>といいます。二酸化炭素は肺から、尿素は腎臓でこし出されて、尿として排出されます。</p>'+
 hd('血液の流れ')+
 '<p>心臓から肺を通って心臓にもどる流れを<b>肺循環</b>、心臓から全身を通って心臓にもどる流れを<b>体循環</b>といいます。</p>'+flow()+
 SM+'※ 矢印の赤は動脈血、青は静脈血です。名前の赤は動脈、青は静脈です。</p>';

var QBODY='<p>血液と心臓について、答えなさい。</p>';
var BL=["赤血球","白血球","血小板","血しょう"];
var ANS8={h1:"右心房",h2:"左心房",h3:"右心室",h4:"左心室",h5:"大静脈",h6:"肺動脈",h7:"肺静脈",h8:"大動脈"};
var CH=["肺動脈","右心室","大静脈","左心房","腎静脈","大動脈","右心房","肝静脈","肺静脈","左心室"];

var ANS='<p>(1) 酸素を運ぶ：<b>赤血球</b><br>　　血を固める：<b>血小板</b><br>　　菌を分解：<b>白血球</b><br>　　何でも運ぶ：<b>血しょう</b></p>'+
 '<p>(2)</p>'+heart("ans")+
 '<p>肺動脈には'+V('<b>静脈血</b>')+'、肺静脈には'+M('<b>動脈血</b>')+'が流れます。</p>';

var SBODY='<p>図は、血液が全身をめぐるようすを、簡単に表した模式図です。矢印は、血液の流れる向きです。ア〜カは、血管です。</p>'+body(null);
var SHEAD='丸をタップして、ア〜カから選びなさい。<br>(1) 食後、栄養分が最も多い<span style="white-space:nowrap">血液が流れる血管</span><br>(2) 尿素が最も少ない血液が流れる血管<br>(3) 酸素が少ない血液が流れる動脈<br>(4) 酸素が多い血液が流れる静脈';
var AB=["ア","イ","ウ","エ","オ","カ"];
var SOL2=body("アイオカ")+
 '<p>(1) <b>オ</b>：小腸で吸収された、ブドウ糖やアミノ酸が、肝臓へ向かう血管に入る。</p>'+
 SM+'※ 肝臓には、大動脈からも血管が来ています。栄養分が多いのは、小腸から来る血管(オ)です。</p>'+
 '<p>(2) <b>カ</b>：不要な尿素は、腎臓でこし出されて、尿になる。腎臓から出る血管で、最も少ない。</p>'+
 '<p>(3) <b>ア</b>：肺動脈。動脈で、酸素が少ないのは、肺動脈だけ。</p>'+
 '<p>(4) <b>イ</b>：肺静脈。静脈で、酸素が多いのは、肺静脈だけ。</p>';

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
  {head:SHEAD,label:"(1)",type:"choice",choices:AB,accept:["オ"]},
  {label:"(2)",type:"choice",choices:AB,accept:["カ"]},
  {label:"(3)",type:"choice",choices:AB,accept:["ア"]},
  {label:"(4)",type:"choice",choices:AB,accept:["イ"]}
 ],
 solution:SOL2}
]};
})();
