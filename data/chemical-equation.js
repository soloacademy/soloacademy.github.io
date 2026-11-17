(function(){
/* 係数だけ赤(class="m")。化学式は黒。小さい注は灰色。 */
function co(t){return t[1]>1?'<b class="m">'+t[1]+'</b>':''}
function side(a,plain){return a.map(function(t){return (plain?'':co(t))+t[0]}).join(' + ')}
function eqh(L,R,plain){return '<span style="white-space:nowrap">'+side(L,plain)+' → '+side(R,plain)+'</span>'}
var SMN='font-size:.8rem;color:var(--muted)';
function hasCo(e){return e.L.concat(e.R).some(function(t){return t[1]>1})}

/* ---------- 解答の並び：名前、① 化学式で書く、② 係数をつける、原子の数 ---------- */
function ans(list){
 return '<p class="note" style="font-size:.8rem;margin:.2rem 0">①　化学式で書く　　②　係数をつける</p>'+
  list.map(function(e){
   return '<p style="margin:.9rem 0 .15rem">'+e.k+' '+e.name+'</p>'+
    '<p style="margin:.1rem 0"><span style="'+SMN+'">①</span> '+eqh(e.L,e.R,true)+'</p>'+
    '<p style="margin:.1rem 0"><span style="'+SMN+'">②</span> '+(hasCo(e)?eqh(e.L,e.R):'そのまま(係数なし)')+'</p>'+
    '<p style="'+SMN+';margin:.15rem 0 0">原子の数(左＝右)：'+e.at+'</p>'}).join('')}

/* ---------- 問題4問(分解)と補充4問(化合) ----------
   L,R＝左辺・右辺の[化学式,係数]、choices＝語群(並びはバラバラ)、at＝原子の数の確かめ */
var E1=[
 {k:"(1)",name:"塩化銅水溶液の電気分解",desc:"塩化銅水溶液に電流を流すと、銅と塩素に分解する。",
  L:[["CuCl₂",1]],R:[["Cu",1],["Cl₂",1]],choices:["Cl","CuCl₂","Cu","CuO","Cl₂","CuCl"],at:"Cu 1個＝1個、Cl 2個＝2個"},
 {k:"(2)",name:"水の電気分解",desc:"水に電流を流すと、水素と酸素に分解する。",
  L:[["H₂O",2]],R:[["H₂",2],["O₂",1]],choices:["O₂","H","H₂O","Cl₂","H₂","O"],at:"H 4個＝4個、O 2個＝2個"},
 {k:"(3)",name:"酸化銀の熱分解",desc:"酸化銀を加熱すると、銀と酸素に分解する。",
  L:[["Ag₂O",2]],R:[["Ag",4],["O₂",1]],choices:["AgO","O","Ag","Ag₂","O₂","Ag₂O"],at:"Ag 4個＝4個、O 2個＝2個"},
 {k:"(4)",name:"炭酸水素ナトリウムの熱分解",desc:"炭酸水素ナトリウムを加熱すると、炭酸ナトリウムと二酸化炭素と水に分解する。",
  L:[["NaHCO₃",2]],R:[["Na₂CO₃",1],["CO₂",1],["H₂O",1]],choices:["H₂CO₃","CO₂","NaOH","NaHCO₃","H₂O","Na₂CO₃"],at:"Na 2個＝2個、H 2個＝2個、C 2個＝2個、O 6個＝6個"}];
var E2=[
 {k:"(5)",name:"鉄が硫黄と結びつく化学変化",desc:"鉄と硫黄を混ぜて加熱すると、硫化鉄ができる。",
  L:[["Fe",1],["S",1]],R:[["FeS",1]],choices:["SFe","Fe","FeO","S","Fe₂","FeS"],at:"Fe 1個＝1個、S 1個＝1個"},
 {k:"(6)",name:"炭素の酸化",desc:"炭素を空気中で加熱すると、二酸化炭素ができる。",
  L:[["C",1],["O₂",1]],R:[["CO₂",1]],choices:["O","CO₂","C₂","C","H₂O","O₂"],at:"C 1個＝1個、O 2個＝2個"},
 {k:"(7)",name:"マグネシウムの酸化",desc:"マグネシウムを空気中で加熱すると、酸化マグネシウムができる。",
  L:[["Mg",2],["O₂",1]],R:[["MgO",2]],choices:["MgS","O","Mg","Mg₂","MgO","O₂"],at:"Mg 2個＝2個、O 2個＝2個"},
 {k:"(8)",name:"銅の酸化",desc:"銅を空気中で加熱すると、酸化銅ができる。",
  L:[["Cu",2],["O₂",1]],R:[["CuO",2]],choices:["CuS","Cu₂","O₂","CuO","O","Cu"],at:"Cu 2個＝2個、O 2個＝2個"}];

function parts(a){return a.map(function(e){
 return {label:e.k,text:'<b>'+e.name+'</b><br>'+e.desc,type:"eq",L:e.L,R:e.R,choices:e.choices}})}

/* ---------- 厳選ポイント：酸化銀の熱分解 ---------- */
/* 厳選ポイントの図：化学式の下に、原子を小さい文字で並べる。列＝化学式(上)＋原子(下、段ごと) */
var AT='font-size:.7rem;line-height:1.3;color:var(--muted);white-space:nowrap';
function col(f,rows){return '<span style="display:inline-flex;flex-direction:column;align-items:center"><span>'+f+'</span>'+rows.map(function(r){return '<span style="'+AT+'">'+r+'</span>'}).join('')+'</span>'}
function op(t){return '<span style="margin:0 .4rem">'+t+'</span>'}
function line(cols,note,top){
 return '<div style="display:flex;flex-wrap:wrap;align-items:flex-start;column-gap:.6rem'+(top?';margin-top:.8rem':'')+'">'+
  '<div style="display:flex;align-items:flex-start;white-space:nowrap">'+cols+'</div>'+
  (note?'<div style="flex:1 1 4rem;margin-top:.4rem;'+AT.replace('white-space:nowrap','white-space:normal')+'">'+note+'</div>':'')+'</div>'}
function nb(t){return '<span style="white-space:nowrap">'+t+'</span>'}
var C2='<b class="m">2</b>',C4='<b class="m">4</b>';
var AGAGO='Ag Ag O';
var SM='<p class="note" style="font-size:.8rem;margin:.2rem 0">';
var POINT='<p>化学変化を、化学式を使って表した式を、<b>化学反応式</b>といいます。</p>'+
 '<p>酸化銀を加熱すると、銀と酸素に分解します。この反応で、書き方を見ます。</p>'+
 '<p>① 反応前の物質を左、反応後の物質を右に、化学式で書き、「→」で結びます。</p>'+
 '<div class="formula" style="white-space:normal">'+
 line(col('Ag₂O',[AGAGO])+op('→')+col('Ag',['Ag'])+op('+')+col('O₂',['O O'])) +'</div>'+
 '<p>② 左右で、原子の種類と数が等しくなるように、<b>係数</b>をつけます。</p>'+
 '<div class="formula" style="white-space:normal">'+
 line(col(C2+'Ag₂O',[AGAGO,AGAGO])+op('→')+col('Ag',['Ag'])+op('+')+col('O₂',['O O']),'◀ 左を2倍にして、Oをそろえる')+
 line(col(C2+'Ag₂O',[AGAGO,AGAGO])+op('→')+col(C4+'Ag',['Ag Ag','Ag Ag'])+op('+')+col('O₂',['O O']),'◀ 右のAgを4倍にして、Agをそろえる',true)+'</div>'+
 SM+'原子の数(左＝右)：Ag 4個＝4個、O 2個＝2個</p>'+
 SM+'※ 係数が1のときは、書きません。化学式の右下の数字は、変えません。</p>';

var HOW='<p class="note" style="font-size:.8rem;margin:.2rem 0">点線の枠をタップして、語群から化学式を選びます。左の小さい枠は係数で、タップするたびに 2→3→4→空欄(1) と変わります。係数が1のときは、空欄のままにします。</p>';

window.UNIT={
no:"2-6",title:"化学反応式",
sections:[
{type:"text",point:true,title:"厳選ポイント",html:POINT},
{type:"problem",title:"問題",body:'<p>次の分解の化学反応式を書きなさい。</p>'+HOW,parts:parts(E1)},
{type:"answer",html:ans(E1)},
{type:"problem",title:"補充問題",body:'<p>次の化合の化学反応式を書きなさい。</p>'+HOW,parts:parts(E2),solution:ans(E2)}
]};
})();
