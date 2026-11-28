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

/* ---------- 電力の図：棒の長さで比べる(赤と灰色だけ)。電球のアイコンは、塾長提供のPNGを灰色にそろえて埋め込み ---------- */
var ICB="data:image/png;base64,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";
function figPower(){
 var RED="#c2410c",s='',r=[["A",12,"60W",204],["B",64,"30W",102]];
 r.forEach(function(v){var y=v[1];
  s+='<image href="'+ICB+'" x="4" y="'+y+'" width="21" height="36"/>'+
   T(32,y+24,14,v[0],"b")+
   '<rect x="58" y="'+(y+6)+'" width="'+v[3]+'" height="24" rx="4" fill="#fdefe8" stroke="'+RED+'" stroke-width="1.2"/>'+
   T(58+v[3]+10,y+24,16,v[2],"m b")});
 return '<div class="fig" style="margin:.4rem 0"><svg viewBox="0 0 340 112" role="img" aria-label="電力の図。電球Aは60Wで、棒が長い。電球Bは30Wで、棒が短い。電力が大きいほど、1秒あたりに使う電気エネルギーが大きい">'+s+'</svg></div>'}

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
