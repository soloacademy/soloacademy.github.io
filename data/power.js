(function(){
function n(v){return Math.round(v*10)/10}
function T(x,y,size,txt,cls,anchor){return '<text x="'+n(x)+'" y="'+n(y)+'" font-size="'+size+'"'+(anchor?' text-anchor="'+anchor+'"':'')+(cls?' class="'+cls+'"':'')+'>'+txt+'</text>'}
function TN(x,y,size,txt,cls,anchor){return '<text x="'+n(x)+'" y="'+n(y)+'" font-size="'+size+'" style="stroke:none"'+(anchor?' text-anchor="'+anchor+'"':'')+(cls?' class="'+cls+'"':'')+'>'+txt+'</text>'}
function line(x1,y1,x2,y2,k,w){return '<line x1="'+x1+'" y1="'+y1+'" x2="'+x2+'" y2="'+y2+'" stroke="'+k+'" stroke-width="'+(w||1)+'"/>'}

/* 関係図(オームの法則だけ。1-1「密度」と同じ形)：上＝電圧、左下＝抵抗、右下＝電流。o.t・o.l・o.r＝具体的な値 */
function ohm(o){
 o=o||{};
 var CX=150,CY=95,R=70,GL="#8a949f",MU="#5d6874",FS=21.5,b='',lab,s={t:["V","(電圧)"],l:["Ω","(抵抗)"],r:["A","(電流)"]};
 b+='<circle cx="'+CX+'" cy="'+CY+'" r="'+R+'" fill="#fff" stroke="'+GL+'" stroke-width="1.2"/>'+
  line(CX-R,CY,CX+R,CY,GL,1.2)+line(CX,CY,CX,CY+R,GL,1.2)+
  T(CX-30,CY+8,20,"÷","b","middle")+T(CX+30,CY+8,20,"÷","b","middle")+T(CX,CY+36,16,"×","b","middle")+
  TN(CX,CY-34,22,s.t[0],"m b","middle")+TN(CX,CY-14,11,s.t[1],"g","middle")+
  TN(CX-30,CY+33,20,s.l[0],"b","middle")+TN(CX-30,CY+49,11,s.l[1],"g","middle")+
  TN(CX+30,CY+33,20,s.r[0],"v b","middle")+TN(CX+30,CY+49,11,s.r[1],"g","middle");
 if(o.t)b+=line(201,37,167,52,MU,1)+T(203,43,FS,o.t,"m b");
 if(o.l)b+=line(62,156,107,126,MU,1)+T(58,CY+R,FS,o.l,"b","end");
 if(o.r)b+=line(238,156,193,126,MU,1)+T(242,CY+R,FS,o.r,"v b");
 lab="関係図。1つの円で、上が電圧(V)、左下が抵抗(Ω)、右下が電流(A)。左下と右下の間は×、上と左下の間、上と右下の間は÷"+
  (o.t?"。電圧は"+o.t:"")+(o.l?"。抵抗は"+o.l:"")+(o.r?"。電流は"+o.r:"");
 return '<div class="fig" style="margin:.4rem 0;width:13rem;flex:0 0 auto"><svg viewBox="-24 18 348 158" role="img" aria-label="'+lab+'">'+b+'</svg></div>'}

/* 文章。 */
function M(t){return '<span class="m">'+t+'</span>'}
function V(t){return '<span class="v">'+t+'</span>'}
var SM='<p class="note" style="font-size:.8rem;margin:.2rem 0">';
var HD='font-size:1.05rem;font-weight:700;line-height:1.5;margin:1.8rem 0 .3rem;padding-bottom:.2rem;border-bottom:1px solid #c9d0d7';
function hd(x,first){return '<h3 style="'+HD+(first?';margin-top:.9rem':'')+'">'+x+'</h3>'}
function F(h){return '<div class="formula" style="white-space:normal">'+h+'</div>'}

var POINT=
 hd('電力',true)+
 '<p>電力は、1秒あたりに消費される電気エネルギーの量です。</p>'+
 '<p>オームの法則(2-16)の、抵抗の式から考えます。</p>'+
 F('Ω(抵抗) ＝ V(電圧) <b>÷</b> A(電流)')+
 '<p>「÷」を「<b>×</b>」に変えると、電力になります。</p>'+
 F(M('電力(W)')+' ＝ 電圧(V) <b>×</b> '+V('電流(A)'))+
 '<p>(例) 100Vの電源に、12Aの電流が流れるドライヤー<br>100V × 12A ＝ <b>1200W</b></p>'+
 hd('電力量(Wh)')+
 '<p>電力量は、ある時間に消費される電気エネルギーの総量です。電力に、使った時間をかけて求めます。</p>'+
 F(M('電力量(Wh)')+' ＝ 電力(W) × '+V('時間(h)'))+
 SM+'※ 時間は、時間(h)に直します。30分 ＝ 0.5時間</p>'+
 hd('電力量・熱量(J)')+
 '<p>時間を、<b>秒</b>で表すと、電力量の単位は J(ジュール)になります。電流を流して発生する熱の量(熱量)も、Jで表します。</p>'+
 F(M('電力量・熱量(J)')+' ＝ 電力(W) × '+V('時間(秒)'))+
 F('1Wh ＝ 1W × 1時間 ＝ 1W × 3600秒 ＝ 3600J')+
 '<p>(例) 20Wの電球を、15秒間つける<br>20W × 15秒 ＝ <b>300J</b></p>'+
 SM+'※ 時間は、秒に直します。1分 ＝ 60秒</p>'+
 SM+'※ 電力(W)は、1秒あたりの量です。電力量(Wh・J)は、全体の量です。</p>';

function Q(a){return a.map(function(t,i){return '<p>('+(i+1)+') '+t+'</p>'}).join('')}
var QBODY=Q([
 '100Vの電源につなぐと、5Aの電流が流れる電気ストーブがある。この電気ストーブの電力(W)を求めなさい。',
 '100Vの電源につなぐと、800Wの電力を消費する電子レンジがある。流れる電流(A)を求めなさい。',
 '40Wの電球を、25秒間つけた。消費した電力量(J)を求めなさい。']);

var ANS=
 '<p>(1) 電力 ＝ 電圧 × 電流<br>100V × 5A ＝ <b>500W</b></p>'+
 '<p>(2) 電流 ＝ 電力 ÷ 電圧<br>800W ÷ 100V ＝ <b>8A</b></p>'+
 '<p>(3) 電力量(J) ＝ 電力 × 時間(秒)<br>40W × 25秒 ＝ <b>1000J</b></p>';

var SBODY=Q([
 '6Vの電源につないだ豆電球に、0.5Aの電流が流れた。豆電球の電力(W)を求めなさい。',
 '100Wの電球を、2分間つけた。消費した電力量(J)を求めなさい。',
 '600Wの電気器具を、3時間使った。消費した電力量(Wh)を求めなさい。',
 '1500Wの電気ヒーターを、30分間使った。消費した電力量(Wh)を求めなさい。',
 '50Wの電気器具を使って、200Whの電力量を消費した。使った時間は何時間か。',
 '20Ωの抵抗に、10Vの電圧を加えた。流れる電流(A)と、消費する電力(W)を求めなさい。']);

var SOL2=
 '<p>(1) 6V × 0.5A ＝ <b>3W</b></p>'+
 '<p>(2) 2分 ＝ 120秒<br>100W × 120秒 ＝ <b>12000J</b></p>'+
 '<p>(3) 600W × 3時間 ＝ <b>1800Wh</b></p>'+
 '<p>(4) 30分 ＝ 0.5時間<br>1500W × 0.5時間 ＝ <b>750Wh</b></p>'+
 '<p>(5) 時間 ＝ 電力量 ÷ 電力<br>200Wh ÷ 50W ＝ <b>4時間</b></p>'+
 '<p>(6) 先に、オームの法則で、電流を求めます。</p>'+ohm({t:'10V',l:'20Ω'})+
 '<p>10V ÷ 20Ω ＝ <b>0.5A</b><br>次に、電力：10V × 0.5A ＝ <b>5W</b></p>';

window.UNIT={
no:"2-17",title:"電力と電力量",
sections:[
{type:"text",point:true,title:"厳選ポイント",html:POINT},
{type:"problem",title:"問題",body:QBODY,
 parts:[
  {label:"(1)",unit:"W",type:"number",accept:[500],tol:0.5},
  {label:"(2)",unit:"A",type:"number",accept:[8],tol:0.05},
  {label:"(3)",unit:"J",type:"number",accept:[1000],tol:0.5}
 ]},
{type:"answer",html:ANS},
{type:"problem",title:"補充問題",body:SBODY,
 parts:[
  {label:"(1)",unit:"W",type:"number",accept:[3],tol:0.05},
  {label:"(2)",unit:"J",type:"number",accept:[12000],tol:0.5},
  {label:"(3)",unit:"Wh",type:"number",accept:[1800],tol:0.5},
  {label:"(4)",unit:"Wh",type:"number",accept:[750],tol:0.5},
  {label:"(5)",unit:"時間",type:"number",accept:[4],tol:0.05},
  {label:"(6) 電流",unit:"A",type:"number",accept:[0.5],tol:0.005},
  {label:"(6) 電力",unit:"W",type:"number",accept:[5],tol:0.05}
 ],
 solution:SOL2}
]};
})();
