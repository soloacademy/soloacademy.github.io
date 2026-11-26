(function(){
var INK="#26303b";
function n(v){return Math.round(v*10)/10}
function T(x,y,size,txt,cls,anchor){return '<text x="'+n(x)+'" y="'+n(y)+'" font-size="'+size+'"'+(anchor?' text-anchor="'+anchor+'"':'')+(cls?' class="'+cls+'"':'')+'>'+txt+'</text>'}
function TN(x,y,size,txt,cls,anchor){return '<text x="'+n(x)+'" y="'+n(y)+'" font-size="'+size+'" style="stroke:none"'+(anchor?' text-anchor="'+anchor+'"':'')+(cls?' class="'+cls+'"':'')+'>'+txt+'</text>'}
function line(x1,y1,x2,y2,k,w){return '<line x1="'+x1+'" y1="'+y1+'" x2="'+x2+'" y2="'+y2+'" stroke="'+k+'" stroke-width="'+(w||1)+'"/>'}

/* 関係図(1-1「密度」と同じ形)：上＝左×右。s.t＝上、s.l＝左下、s.r＝右下 [記号,名前]。o.t・o.l・o.r＝具体的な値、o.row＝厳選ポイントの小さい図 */
var CW={t:["W","(電力)"],l:["V","(電圧)"],r:["A","(電流)"]},
 CJ={t:["J","(電力量・熱量)"],l:["W","(電力)"],r:["s","(秒)"]},
 CH={t:["Wh","(電力量)"],l:["W","(電力)"],r:["h","(時間)"]},
 CO={t:["V","(電圧)"],l:["Ω","(抵抗)"],r:["A","(電流)"]};
function circ(s,o){
 o=o||{};
 var CX=150,CY=95,R=70,GL="#8a949f",MU="#5d6874",FS=21.5,b='',w=o.row?"6.4rem":"13rem",vb=o.row?"78 23 144 144":"-24 18 348 158",lab,f;
 b+='<circle cx="'+CX+'" cy="'+CY+'" r="'+R+'" fill="#fff" stroke="'+GL+'" stroke-width="1.2"/>'+
  line(CX-R,CY,CX+R,CY,GL,1.2)+line(CX,CY,CX,CY+R,GL,1.2)+
  T(CX-30,CY+8,20,"÷","b","middle")+T(CX+30,CY+8,20,"÷","b","middle")+T(CX,CY+36,16,"×","b","middle")+
  TN(CX,CY-34,22,s.t[0],"m b","middle")+TN(CX,CY-14,11,s.t[1],"g","middle")+
  TN(CX-30,CY+33,20,s.l[0],"b","middle")+TN(CX-30,CY+49,11,s.l[1],"g","middle")+
  TN(CX+30,CY+33,20,s.r[0],"v b","middle")+TN(CX+30,CY+49,11,s.r[1],"g","middle");
 if(o.t)b+=line(201,37,167,52,MU,1)+T(203,43,FS,o.t,"m b");
 if(o.l)b+=line(62,156,107,126,MU,1)+T(58,CY+R,FS,o.l,"b","end");
 if(o.r)b+=line(238,156,193,126,MU,1)+T(242,CY+R,FS,o.r,"v b");
 lab="関係図。1つの円で、上が"+s.t[0]+s.t[1]+"、左下が"+s.l[0]+s.l[1]+"、右下が"+s.r[0]+s.r[1]+"。左下と右下の間は×、上と左下の間、上と右下の間は÷"+
  (o.t?"。"+s.t[0]+"は"+o.t:"")+(o.l?"。"+s.l[0]+"は"+o.l:"")+(o.r?"。"+s.r[0]+"は"+o.r:"");
 f='<div class="fig" style="margin:'+(o.row?'0':'.4rem 0')+';width:'+w+';flex:0 0 auto"><svg viewBox="'+vb+'" role="img" aria-label="'+lab+'">'+b+'</svg></div>';
 return f}
var ROW='<div style="display:flex;flex-wrap:wrap;gap:.2rem .5rem;margin:.4rem 0">'+circ(CW,{row:1})+circ(CJ,{row:1})+circ(CH,{row:1})+'</div>';

/* 文章。上＝赤、右＝青(円の図と同じ) */
function M(t){return '<span class="m">'+t+'</span>'}
function V(t){return '<span class="v">'+t+'</span>'}
var SM='<p class="note" style="font-size:.8rem;margin:.2rem 0">';
var HD='font-size:1.05rem;font-weight:700;line-height:1.5;margin:1.8rem 0 .3rem;padding-bottom:.2rem;border-bottom:1px solid #c9d0d7';
function hd(x,first){return '<h3 style="'+HD+(first?';margin-top:.9rem':'')+'">'+x+'</h3>'}
function F(h){return '<div class="formula" style="white-space:normal">'+h+'</div>'}

var POINT=SM+'※ オームの法則 V ＝ Ω × A は、2-16で学びました。電流や電圧が分からないときに使います。</p>'+
 hd('電力',true)+
 '<p>電力は、1秒あたりに消費される電気エネルギーの量です。</p>'+
 F(M('電力(W)')+' ＝ 電圧(V) × '+V('電流(A)'))+
 '<p>(例) 100Vの電源に、12Aの電流が流れるドライヤー<br>100V × 12A ＝ <b>1200W</b></p>'+
 hd('電力量・熱量')+
 '<p>電力量は、ある時間に消費される電気エネルギーの総量です。電流を流すと、熱が発生します。その熱の量を熱量といいます。</p>'+
 F(M('電力量・熱量(J)')+' ＝ 電力(W) × '+V('時間(秒)'))+
 '<p>(例) 20Wの電球を、15秒間つける<br>20W × 15秒 ＝ <b>300J</b></p>'+
 SM+'※ 時間は、秒に直します。1分 ＝ 60秒</p>'+
 hd('Wh(ワット時)')+
 '<p>家電では、時間(h)を使った、Whを使います。</p>'+
 F(M('電力量(Wh)')+' ＝ 電力(W) × '+V('時間(h)'))+
 F('1Wh ＝ 1W × 1時間 ＝ 1W × 3600秒 ＝ 3600J')+
 SM+'※ 時間は、時間(h)に直します。30分 ＝ 0.5時間</p>'+
 '<p class="note" style="margin:1rem 0 0"><b>関係図</b></p>'+ROW+
 SM+'※ 電力(W)は、1秒あたりの量です。電力量(J・Wh)は、全体の量です。</p>';

function Q(a){return a.map(function(t,i){return '<p>('+(i+1)+') '+t+'</p>'}).join('')}
var QBODY=Q([
 '100Vの電源につなぐと、5Aの電流が流れる電気ストーブがある。この電気ストーブの電力(W)を求めなさい。',
 '100Vの電源につなぐと、800Wの電力を消費する電子レンジがある。流れる電流(A)を求めなさい。',
 '40Wの電球を、25秒間つけた。消費した電力量(J)を求めなさい。']);

function L(i,t){return '<p style="margin:.9rem 0 0">('+i+')'+(t?' '+t:'')+'</p>'}
var ANS=
 L(1,'電力は、電圧 × 電流')+circ(CW,{l:'100V',r:'5A'})+'<p>100V × '+V('5A')+' ＝ <b class="m">500W</b></p>'+
 L(2,'電流は、電力 ÷ 電圧')+circ(CW,{t:'800W',l:'100V'})+'<p>'+M('800W')+' ÷ 100V ＝ <b class="v">8A</b></p>'+
 L(3,'電力量は、電力 × 時間(秒)')+circ(CJ,{l:'40W',r:'25秒'})+'<p>40W × '+V('25秒')+' ＝ <b class="m">1000J</b></p>';

var SBODY=Q([
 '6Vの電源につないだ豆電球に、0.5Aの電流が流れた。豆電球の電力(W)を求めなさい。',
 '100Wの電球を、2分間つけた。消費した電力量(J)を求めなさい。',
 '600Wの電気器具を、3時間使った。消費した電力量(Wh)を求めなさい。',
 '1500Wの電気ヒーターを、30分間使った。消費した電力量(Wh)を求めなさい。',
 '50Wの電気器具を使って、200Whの電力量を消費した。使った時間は何時間か。',
 '20Ωの抵抗に、10Vの電圧を加えた。流れる電流(A)と、消費する電力(W)を求めなさい。']);

var SOL2=
 L(1,'')+circ(CW,{l:'6V',r:'0.5A'})+'<p>6V × '+V('0.5A')+' ＝ <b class="m">3W</b></p>'+
 L(2,'分を、秒に直す')+circ(CJ,{l:'100W',r:'120秒'})+'<p>2分 ＝ 120秒<br>100W × '+V('120秒')+' ＝ <b class="m">12000J</b></p>'+
 L(3,'')+circ(CH,{l:'600W',r:'3時間'})+'<p>600W × '+V('3時間')+' ＝ <b class="m">1800Wh</b></p>'+
 L(4,'分を、時間に直す')+circ(CH,{l:'1500W',r:'0.5時間'})+'<p>30分 ＝ 0.5時間<br>1500W × '+V('0.5時間')+' ＝ <b class="m">750Wh</b></p>'+
 L(5,'時間は、電力量 ÷ 電力')+circ(CH,{t:'200Wh',l:'50W'})+'<p>'+M('200Wh')+' ÷ 50W ＝ <b class="v">4時間</b></p>'+
 L(6,'先に、オームの法則で、電流を求める')+circ(CO,{t:'10V',l:'20Ω'})+'<p>'+M('10V')+' ÷ 20Ω ＝ <b class="v">0.5A</b></p>'+
 '<p>次に、電力を求める</p>'+circ(CW,{l:'10V',r:'0.5A'})+'<p>10V × '+V('0.5A')+' ＝ <b class="m">5W</b></p>';

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
