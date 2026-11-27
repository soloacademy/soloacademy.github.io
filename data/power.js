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

/* ---------- 図の共通(この3つの図だけで使う) ---------- */
var INK="#26303b",RED="#c2410c",BLUE="#1f5fa8",GL="#8a949f",LIGHT="#b7791f";
function figBox(y0,h,label,body){return '<div class="fig" style="margin:.4rem 0"><svg viewBox="0 '+y0+' 340 '+h+'" role="img" aria-label="'+label+'">'+body+'</svg></div>'}
function rays(cx,cy,angles,r0,r1,w){
 return angles.map(function(g){var a=g*Math.PI/180;
  return '<line x1="'+n(cx+r0*Math.cos(a))+'" y1="'+n(cy+r0*Math.sin(a))+'" x2="'+n(cx+r1*Math.cos(a))+'" y2="'+n(cy+r1*Math.sin(a))+'" stroke="'+LIGHT+'" stroke-width="'+w+'" stroke-linecap="round"/>'}).join('')}

/* ---------- 電力：電球の明るさ比べ(光の線の数と長さで見せる) ---------- */
function bulb(cx,cy,fill){
 return '<circle cx="'+cx+'" cy="'+cy+'" r="22" fill="'+fill+'" stroke="'+INK+'" stroke-width="1.5"/>'+
  '<path d="M'+(cx-8)+','+(cy+9)+' L'+(cx-4)+','+(cy-1)+' L'+cx+','+(cy+9)+' L'+(cx+4)+','+(cy-1)+' L'+(cx+8)+','+(cy+9)+'" fill="none" stroke="'+INK+'" stroke-width="1.2" stroke-linejoin="round"/>'+
  '<rect x="'+(cx-9)+'" y="'+(cy+20)+'" width="18" height="14" rx="2" fill="#fff" stroke="'+INK+'" stroke-width="1.5"/>'+
  line(cx-9,cy+27,cx+9,cy+27,INK,1)}
function figPower(){
 var cy=70,s=
  rays(90,cy,[-180,-157.5,-135,-112.5,-90,-67.5,-45,-22.5,0],28,48,2)+bulb(90,cy,"#fdf0b8")+
  rays(250,cy,[-135,-90,-45],28,36,1.5)+bulb(250,cy,"#f7f3e3")+
  T(90,134,18,"100W","m b","middle")+T(90,154,12,"明るい","g","middle")+
  T(250,134,18,"40W","m b","middle")+T(250,154,12,"暗い","g","middle");
 return figBox(0,162,"電力の図。電球が2つ並ぶ。左は100Wの電球で、光の線が多くて長く、明るい。右は40Wの電球で、光の線が少なくて短く、暗い。電力が大きいほど、明るい",s)}

/* ---------- 熱量(J)：電熱線で水が温まる ---------- */
function ar(x,y1,y2){return line(x,y1,x,y2,RED,1.5)+'<path d="M'+(x-4)+','+(y2+6)+' L'+x+','+y2+' L'+(x+4)+','+(y2+6)+'" fill="none" stroke="'+RED+'" stroke-width="1.5"/>'}
function ld(x1,y1,x2,y2){return line(x1,y1,x2,y2,INK,1)+'<circle cx="'+x2+'" cy="'+y2+'" r="2.5" fill="'+INK+'"/>'}
function figHeat(){
 var s='<rect x="71" y="72" width="178" height="57" fill="#cfe0f3"/>'+
  '<path d="M70,48 V130 H250 V48" fill="none" stroke="'+INK+'" stroke-width="1.5" stroke-linejoin="round"/>'+
  /* 電熱線(コイル)と、外へ出る2本の線 */
  line(90,112,90,34,INK,1.5)+line(150,112,150,34,INK,1.5)+
  '<circle cx="90" cy="34" r="3" fill="'+INK+'"/><circle cx="150" cy="34" r="3" fill="'+INK+'"/>'+
  '<path d="M90,112 L95,104 L105,120 L115,104 L125,120 L135,104 L145,120 L150,112" fill="none" stroke="'+INK+'" stroke-width="2" stroke-linejoin="round"/>'+
  /* 熱(赤い矢印) */
  ar(105,100,90)+ar(120,100,90)+ar(135,100,90)+TN(120,85,12,"熱量(J)","m b","middle")+
  /* 温度計 */
  '<rect x="201" y="30" width="8" height="82" rx="4" fill="#fff" stroke="'+INK+'" stroke-width="1.2"/>'+
  '<circle cx="205" cy="118" r="7" fill="'+RED+'" stroke="'+INK+'" stroke-width="1.2"/>'+
  line(205,118,205,62,RED,3)+
  T(4,117,13,"電熱線","b")+ld(48,113,92,113)+
  T(262,64,13,"温度計","b")+ld(258,60,211,62);
 return figBox(24,120,"熱量の図。水の入った容器の中に、電熱線と温度計がある。電熱線に電流を流すと、熱が出て、水が温まる。温度計の液が上がる。熱の量の単位はジュール(J)",s)}

/* ---------- 電力量(Wh)：家電(ドライヤー) × 時計 ＝ 電力量 ---------- */
function figWh(){
 var s=
  /* ドライヤー(本体・ふき出し口・にぎり・風) */
  '<rect x="39" y="28" width="48" height="26" rx="10" fill="#fff" stroke="'+INK+'" stroke-width="1.5"/>'+
  '<rect x="29" y="32" width="10" height="18" rx="2" fill="#fff" stroke="'+INK+'" stroke-width="1.5"/>'+
  '<rect x="56" y="54" width="12" height="26" rx="3" fill="#fff" stroke="'+INK+'" stroke-width="1.5"/>'+
  line(12,35,22,35,GL,1.5)+line(12,41,22,41,GL,1.5)+line(12,47,22,47,GL,1.5)+
  T(58,106,18,"1200W","m b","middle")+
  T(118,60,22,"×","b","middle")+
  /* 時計 */
  '<circle cx="175" cy="52" r="26" fill="#fff" stroke="'+INK+'" stroke-width="1.5"/>'+
  line(175,28,175,33,INK,1.5)+line(175,71,175,76,INK,1.5)+line(151,52,156,52,INK,1.5)+line(194,52,199,52,INK,1.5)+
  line(175,52,175,37,INK,2)+line(175,52,188,59,INK,1.5)+
  T(175,106,18,"2時間","v b","middle")+
  T(232,60,22,"＝","b","middle")+
  T(290,59,20,"2400Wh","m b","middle");
 return figBox(0,116,"電力量の図。左はドライヤーで1200W。その右に、かけ算の記号と、2時間を表す時計。さらに右に、等号と2400Wh。電力量は、電力に、使った時間をかけたもの",s)}

/* 文章。 */
function M(t){return '<span class="m">'+t+'</span>'}
function V(t){return '<span class="v">'+t+'</span>'}
var SM='<p class="note" style="font-size:.8rem;margin:.2rem 0">';
var HD='font-size:1.05rem;font-weight:700;line-height:1.5;margin:1.8rem 0 .3rem;padding-bottom:.2rem;border-bottom:1px solid #c9d0d7';
function hd(x,first){return '<h3 style="'+HD+(first?';margin-top:.9rem':'')+'">'+x+'</h3>'}
function F(h){return '<div class="formula" style="white-space:normal">'+h+'</div>'}

var POINT=
 hd('電力',true)+
 figPower()+
 F('Ω(抵抗) ＝ V(電圧) <b>÷</b> A(電流)<br><span style="color:var(--muted)">↓ ÷を×に変える</span><br>'+M('W(電力)')+' ＝ V(電圧) <b>×</b> '+V('A(電流)'))+
 '<p>(例) 100V × 12A ＝ <b>1200W</b></p>'+
 SM+'※ 電力は、1秒あたりに消費される電気エネルギーの量です。</p>'+
 hd('電力量・熱量(J)')+
 figHeat()+
 F(M('J(電力量・熱量)')+' ＝ W(電力) × '+V('秒'))+
 '<p>(例) 20W × 15秒 ＝ <b>300J</b></p>'+
 SM+'※ 時間は、秒に直します。1分 ＝ 60秒</p>'+
 hd('電力量(Wh)')+
 figWh()+
 F(M('Wh(電力量)')+' ＝ W(電力) × '+V('h(時間)'))+
 F('1Wh ＝ 3600J')+
 SM+'※ Jを忘れたら、Whを思い出す。時間を秒に変えたものが、Jです。</p>';

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
