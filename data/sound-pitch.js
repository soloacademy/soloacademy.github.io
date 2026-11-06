(function(){
var INK="#26303b",BLUE="#1f5fa8",RED="#c2410c";
function n(v){return Math.round(v*10)/10}
function T(x,y,size,txt,cls,anchor){return '<text x="'+n(x)+'" y="'+n(y)+'" font-size="'+size+'"'+(anchor?' text-anchor="'+anchor+'"':'')+(cls?' class="'+cls+'"':'')+'>'+txt+'</text>'}
/* 色つきの面の上の文字：まわりの白いふちを消す */
function TN(x,y,size,txt,cls,anchor){return '<text x="'+n(x)+'" y="'+n(y)+'" font-size="'+size+'" style="stroke:none"'+(anchor?' text-anchor="'+anchor+'"':'')+(cls?' class="'+cls+'"':'')+'>'+txt+'</text>'}
function svg(h,label,body){return '<div class="fig"><svg viewBox="0 0 340 '+h+'" role="img" aria-label="'+label+'">'+body+'</svg></div>'}
function line(x1,y1,x2,y2,k,w,dash){return '<line x1="'+n(x1)+'" y1="'+n(y1)+'" x2="'+n(x2)+'" y2="'+n(y2)+'" stroke="'+k+'" stroke-width="'+(w||1)+'"'+(dash?' stroke-dasharray="4 3"':'')+'/>'}

/* 波形：左端の中心から、上向きに始まる。A＝振幅、per＝1回の振動の長さ、w＝全体の幅 */
function wave(x0,yc,A,per,w){
 var h=A*4/3,hp=per/2,m=Math.round(w/hp),d='M'+n(x0)+','+n(yc),x=x0,s=-1,i;
 for(i=0;i<m;i++){d+=' C'+n(x+hp*.36)+','+n(yc+s*h)+' '+n(x+hp*.64)+','+n(yc+s*h)+' '+n(x+hp)+','+n(yc);x+=hp;s=-s}
 return '<path d="'+d+'" fill="none" stroke="'+INK+'" stroke-width="2"/>'}
function axisL(x1,x2,y){return line(x1,y,x2,y,"#b4bbc3",1,true)}
/* 振幅：中心の線から山の頂上までの赤い棒と、文字 */
function amp(x,yc,A){var p=yc-A;
 return '<path d="M'+n(x)+','+n(p)+' V'+n(yc)+' M'+n(x-3)+','+n(p)+' H'+n(x+3)+' M'+n(x-3)+','+n(yc)+' H'+n(x+3)+'" fill="none" stroke="'+RED+'" stroke-width="1.5"/>'+
  T(x,p-8,13,"振幅","m","middle")}
/* 1回の振動：始まりと終わりの青い点線、その間の線と文字 */
function dl(x,y1,y2){return line(x,y1,x,y2,BLUE,1.5,true)}
function bk(x1,x2,y,txt){return line(x1,y,x2,y,BLUE,1.5)+T((x1+x2)/2,y+17,13,txt,"v","middle")}
function circ(x,y,c){return '<circle cx="'+x+'" cy="'+y+'" r="11" fill="#fff" stroke="'+INK+'" stroke-width="1.2"/>'+TN(x,y+5,14,c,"b","middle")}

/* 厳選ポイントの図1：振幅だけが違う2つの波形 */
function fig1(){
 var y=62,s=axisL(10,160,y)+axisL(180,330,y)+wave(10,y,10,75,150)+wave(180,y,24,75,150)+
  amp(10+75/4,y,10)+amp(180+75/4,y,24)+
  T(85,106,14,"小さい音","b","middle")+T(255,106,14,"大きい音","b","middle");
 return svg(116,"振幅だけが違う2つの波形。左は振幅が小さく、小さい音。右は振幅が大きく、大きい音。1回の振動の長さは同じ",s)}

/* 厳選ポイントの図2：振動数だけが違う2つの波形 */
function fig2(){
 var y=46,s=axisL(10,160,y)+axisL(180,330,y)+wave(10,y,16,75,150)+wave(180,y,16,37.5,150)+
  dl(10,26,86)+dl(85,26,86)+dl(180,26,86)+dl(217.5,26,86)+
  bk(10,85,82,"1回の振動")+bk(180,217.5,82,"1回の振動")+
  T(85,128,14,"低い音","b","middle")+T(255,128,14,"高い音","b","middle");
 return svg(136,"振動数だけが違う2つの波形。左は1回の振動が長く、振動数が少ないので、低い音。右は1回の振動が短く、振動数が多いので、高い音。振幅は同じ",s)}

/* 問題の図：いまの音(上)と、A〜Cの波形。横の長さ(時間)は同じ */
function rows(list){
 var X0=70,W=240,P=68,s=axisL(X0,X0+W,34)+wave(X0,34,12,60,W)+T(8,39,13,"いまの音","b");
 list.forEach(function(o,k){var y=34+P*(k+1);
  s+=axisL(X0,X0+W,y)+wave(X0,y,o.A,o.per,W)+circ(30,y,"ABC".charAt(k))});
 return s}
function fig3(list,label){return svg(272,label,rows(list))}
var Q1=[{A:12,per:30},{A:6,per:60},{A:24,per:60}];
var Q2=[{A:12,per:30},{A:24,per:60},{A:12,per:120}];
var FQ1=fig3(Q1,"いまの音の波形と、A、B、Cの3つの候補の波形。横の長さ(時間)は同じ。Aは振幅が同じで1回の振動が短い。Bは振幅が小さい。Cは振幅が大きい");
var FQ2=fig3(Q2,"いまの音の波形と、A、B、Cの3つの候補の波形。横の長さ(時間)は同じ。Aは振幅が同じで1回の振動が短い。Bは振幅が大きい。Cは振幅が同じで1回の振動が長い");

/* 解答の図：いまの音と、正しい波形を、振幅と1回の振動の印つきで並べる */
function figAns(kind){
 var X0=70,W=240,s,h;
 s=axisL(X0,X0+W,40)+wave(X0,40,12,60,W)+axisL(X0,X0+W,150)+T(8,45,13,"いまの音","b");
 if(kind===1){
  s+=wave(X0,150,24,60,W)+dl(70,30,190)+dl(130,30,190)+bk(70,130,190,"1回の振動(同じ長さ)")+
   amp(85,40,12)+amp(85,150,24)+circ(30,150,"C");h=222;
 }else{
  s+=wave(X0,150,12,30,W)+dl(70,30,76)+dl(130,30,76)+bk(70,130,72,"1回の振動")+
   dl(70,132,190)+dl(100,132,190)+bk(70,100,186,"1回の振動")+
   amp(85,40,12)+amp(77.5,150,12)+circ(30,150,"A");h=214;
 }
 return svg(h,kind===1?"(1)の答えの図。Cは、いまの音と1回の振動の長さが同じで、振幅が大きい":"(2)の答えの図。Aは、いまの音と振幅が同じで、1回の振動の長さが半分になっている",s)}
var FA1=figAns(1),FA2=figAns(2);

/* 補充問題の図：1目盛＝0.001秒の方眼に、波形。1回の振動は5目盛 */
function grid(){
 var d='',i;
 for(i=0;i<=10;i++)d+='M'+(50+24*i)+',26 V170 ';
 for(i=0;i<=6;i++)d+='M50,'+(26+24*i)+' H290 ';
 return '<path d="'+d+'" fill="none" stroke="#c9d0d7" stroke-width="1"/>'+line(50,98,290,98,INK,1)+wave(50,98,60,120,240)}
var FIGQ=svg(186,"1目盛が0.001秒の方眼に、ある音の波形がかかれている図",T(50,16,14,"1目盛 ＝ 0.001秒","v b")+grid());
var FIGGA=svg(206,"1回の振動は5目盛で、5目盛は0.005秒であることを示す図",grid()+dl(50,26,186)+dl(170,26,186)+bk(50,170,182,"5目盛 ＝ 0.005秒"));


/* 補充問題の別解の図：時間と回数を、1000倍にしてから5で割る */
function chain(){
 var R=[["0.005秒","1回"],["5秒","1000回"]],Y=[24,84],s='';
 function arr(y1,y2,t){return line(136,y1,136,y2,INK,1.5)+'<path d="M131,'+(y2-6)+' L136,'+y2+' L141,'+(y2-6)+'" fill="none" stroke="'+INK+'" stroke-width="1.5"/>'+T(148,(y1+y2)/2+5,14,t,"b")}
 R.forEach(function(r,k){s+=T(120,Y[k],15,r[0],"v","end")+T(136,Y[k],15,":",null,"middle")+T(150,Y[k],15,r[1],"v")});
 s+=arr(30,66,"×1000")+arr(90,126,"÷5")+T(120,144,15,"1秒","v b","end")+T(136,144,15,":",null,"middle")+T(150,144,15,"200回","v b")+T(212,144,15,"＝ 200Hz","v b");
 return svg(160,"時間と回数を同じ数ずつ変える図。0.005秒で1回、1000倍すると5秒で1000回。5で割ると、1秒で200回、つまり200Hz",s)}
var CHAIN=chain();

var Mp='<span class="m">振幅</span>',Vp='<span class="v">振動数</span>';
var CH3=["A","B","C"];

var ANS='<p>大きい音は'+Mp+'が大きく、高い音は'+Vp+'が多い(1回の振動が短い)です。</p>'+
 '<p>(1) <b>C</b>　高さが同じなので、1回の振動の長さは同じ。'+Mp+'が大きい。</p>'+FA1+
 '<p>(2) <b>A</b>　大きさが同じなので、'+Mp+'は同じ。1回の振動が短い。</p>'+FA2;

var SOL='<p>① 1回の振動は、5目盛です。<br>5 × 0.001秒 ＝ <b class="v">0.005秒</b></p>'+FIGGA+
 '<p>② 時間と回数を、同じ数ずつ変えて、1秒間の回数を求めます。</p>'+CHAIN+
 '<p>答えは <b class="v">200Hz</b> です。</p>'+
 '<p><b>別解</b>　比で求めます。<br><span class="v">0.005秒 : 1回 ＝ 1秒 : □回</span><br>0.005 × □ ＝ 1 × 1<br>□ ＝ 1 ÷ 0.005 ＝ <b class="v">200</b></p>';

window.UNIT={
no:"1-13",title:"音の大きさと高さ",
sections:[
{type:"text",point:true,title:"厳選ポイント",html:
 '<p>'+Mp+'が大きいほど、大きい音になります。</p>'+fig1()+
 '<p>1秒間に振動する回数を'+Vp+'といい、単位はヘルツ(Hz)です。<br>'+Vp+'が多いほど、高い音になります。</p>'+fig2()+
 '<p class="note">波1つ分が、1回の振動です。1回の振動が短いほど、振動数は多くなります。</p>'+
 '<p class="note">1秒間に50回振動する音は、50Hzです。</p>'},
{type:"problem",title:"問題",
 body:'<p>図は、ある音の波形です。横の長さ(時間)は、どの波形も同じです。</p>'+
 '<p>(1) この音と同じ高さで、大きい音の波形を選びなさい。</p>'+FQ1+
 '<p>(2) この音と同じ大きさで、高い音の波形を選びなさい。</p>'+FQ2,
 parts:[
  {label:"(1)",type:"choice",choices:CH3,accept:["C"]},
  {label:"(2)",type:"choice",choices:CH3,accept:["A"]}
 ]},
{type:"answer",html:ANS},
{type:"problem",title:"補充問題",
 body:'<p>図は、ある音の波形です。この音の振動数(Hz)を求めなさい。</p>'+FIGQ,
 parts:[{label:"答え",unit:"Hz",type:"number",accept:[200],tol:0.5}],
 solution:SOL}
]};
})();
