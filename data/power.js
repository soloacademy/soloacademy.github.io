(function(){
function n(v){return Math.round(v*10)/10}
function T(x,y,size,txt,cls,anchor){return '<text x="'+n(x)+'" y="'+n(y)+'" font-size="'+size+'"'+(anchor?' text-anchor="'+anchor+'"':'')+(cls?' class="'+cls+'"':'')+'>'+txt+'</text>'}
function TN(x,y,size,txt,cls,anchor){return '<text x="'+n(x)+'" y="'+n(y)+'" font-size="'+size+'" style="stroke:none"'+(anchor?' text-anchor="'+anchor+'"':'')+(cls?' class="'+cls+'"':'')+'>'+txt+'</text>'}
function line(x1,y1,x2,y2,k,w){return '<line x1="'+x1+'" y1="'+y1+'" x2="'+x2+'" y2="'+y2+'" stroke="'+k+'" stroke-width="'+(w||1)+'"/>'}

/* 関係図(オームの法則だけ。補充(6)の解答で使う。2-16と同じ形)：上＝電圧、左下＝抵抗、右下＝電流 */
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

/* ---------- 電力の図：棒の長さで比べる(赤と灰色だけ) ---------- */
function figPower(){
 var RED="#c2410c",s=T(4,29,13,"電球A","b")+
  '<rect x="58" y="12" width="204" height="24" rx="4" fill="#fdefe8" stroke="'+RED+'" stroke-width="1.2"/>'+
  T(272,30,16,"60W","m b")+
  T(4,67,13,"電球B","b")+
  '<rect x="58" y="50" width="102" height="24" rx="4" fill="#fdefe8" stroke="'+RED+'" stroke-width="1.2"/>'+
  T(170,68,16,"30W","m b");
 return '<div class="fig" style="margin:.4rem 0"><svg viewBox="0 0 340 86" role="img" aria-label="電力の図。電球Aは60Wで、棒が長い。電球Bは30Wで、棒が短い。電力が大きいほど、1秒あたりに使う電気エネルギーが大きい">'+s+'</svg></div>'}

/* 文章 */
function M(t){return '<span class="m">'+t+'</span>'}
function V(t){return '<span class="v">'+t+'</span>'}
var SM='<p class="note" style="font-size:.8rem;margin:.2rem 0">';
var HD='font-size:1.05rem;font-weight:700;line-height:1.5;margin:1.8rem 0 .3rem;padding-bottom:.2rem;border-bottom:1px solid #c9d0d7';
function hd(x,first){return '<h3 style="'+HD+(first?';margin-top:.9rem':'')+'">'+x+'</h3>'}
function F(h){return '<div class="formula" style="white-space:normal">'+h+'</div>'}

var POINT=
 hd('電力',true)+
 '<p>電力は、1秒あたりに消費される電気エネルギーの量です。単位は W(ワット)。</p>'+
 figPower()+
 F(M('W(電力)')+' ＝ V(電圧) × '+V('A(電流)'))+
 '<p>(例) 100V × 12A ＝ <b>1200W</b></p>'+
 hd('電力量・熱量(J)')+
 '<p>電力を使った時間をかけると、電力量(熱量)になります。</p>'+
 F(M('J(電力量・熱量)')+' ＝ W(電力) × '+V('秒'))+
 '<p>(例) 20W × 15秒 ＝ <b>300J</b></p>'+
 SM+'※ 時間は、秒に直します。1分 ＝ 60秒</p>'+
 hd('電力量(Wh)')+
 F(M('Wh(電力量)')+' ＝ W(電力) × '+V('h(時間)'))+
 '<p>(例) 1200W × 2時間 ＝ <b>2400Wh</b></p>'+
 F('1Wh ＝ 3600J')+
 SM+'※ 1時間 ＝ 3600秒 なので、1Wを1時間使うと、3600Jです。</p>';

var QBODY='<p>次の問いに答えなさい。</p>';

var ANS=
 '<p>(1) 電力 ＝ 電圧 × 電流<br>100V × 5A ＝ <b>500W</b></p>'+
 '<p>(2) 電流 ＝ 電力 ÷ 電圧<br>800W ÷ 100V ＝ <b>8A</b></p>'+
 '<p>(3) 電力量(J) ＝ 電力 × 時間(秒)<br>40W × 25秒 ＝ <b>1000J</b></p>';

var SBODY='<p>次の問いに答えなさい。</p>';

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
  {head:"(1) 100Vの電源につなぐと、5Aの電流が流れる電気ストーブがある。この電気ストーブの電力を求めなさい。",label:"答え",unit:"W",type:"number",accept:[500],tol:0.5},
  {head:"(2) 100Vの電源につなぐと、800Wの電力を消費する電子レンジがある。流れる電流を求めなさい。",label:"答え",unit:"A",type:"number",accept:[8],tol:0.05},
  {head:"(3) 40Wの電球を、25秒間つけた。消費した電力量を求めなさい。",label:"答え",unit:"J",type:"number",accept:[1000],tol:0.5}
 ]},
{type:"answer",html:ANS},
{type:"problem",title:"補充問題",body:SBODY,
 parts:[
  {head:"(1) 6Vの電源につないだ豆電球に、0.5Aの電流が流れた。豆電球の電力を求めなさい。",label:"答え",unit:"W",type:"number",accept:[3],tol:0.05},
  {head:"(2) 100Wの電球を、2分間つけた。消費した電力量を求めなさい。",label:"答え",unit:"J",type:"number",accept:[12000],tol:0.5},
  {head:"(3) 600Wの電気器具を、3時間使った。消費した電力量を求めなさい。",label:"答え",unit:"Wh",type:"number",accept:[1800],tol:0.5},
  {head:"(4) 1500Wの電気ヒーターを、30分間使った。消費した電力量を求めなさい。",label:"答え",unit:"Wh",type:"number",accept:[750],tol:0.5},
  {head:"(5) 50Wの電気器具を使って、200Whの電力量を消費した。使った時間は何時間か。",label:"答え",unit:"時間",type:"number",accept:[4],tol:0.05},
  {head:"(6) 20Ωの抵抗に、10Vの電圧を加えた。流れる電流と、消費する電力を求めなさい。",label:"電流",grp:1,unit:"A",type:"number",accept:[0.5],tol:0.005},
  {label:"電力",grp:1,unit:"W",type:"number",accept:[5],tol:0.05}
 ],
 solution:SOL2}
]};
})();
