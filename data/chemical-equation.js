(function(){
/* 係数だけ赤(class="m")。化学式は黒。原子と小さい注は灰色。 */
var MU='color:var(--muted)';
var AT='font-size:.7rem;line-height:1.3;white-space:nowrap;'+MU;
function co(c){return c>1?'<b class="m">'+c+'</b>':''}

/* 化学式から、原子を個数分ならべる(例：Ag₂O → Ag Ag O)。係数の数だけ段にする。1種類1個の化学式は、1段に2個ずつ(4Ag → Ag Ag / Ag Ag) */
var SUBS='₀₁₂₃₄₅₆₇₈₉';
function atomsOf(f){var a=[],re=/([A-Z][a-z]?)([₀-₉]?)/g,m,k,n;
 while((m=re.exec(f))){n=m[2]?SUBS.indexOf(m[2]):1;for(k=0;k<n;k++)a.push(m[1])}return a}
function rowsOf(f,c){var a=atomsOf(f),r=[],i;
 if(a.length===1){for(i=0;i<c;i+=2)r.push(Array(Math.min(2,c-i)+1).join(a[0]+' ').trim())}
 else for(i=0;i<c;i++)r.push(a.join(' '));
 return r}

function bx(r){return '<span style="'+AT+'padding:.1rem .4rem;border:1px solid #c9d0d7;border-radius:4px">'+r+'</span>'}
function col(t){var single=atomsOf(t[0]).length===1;
 return '<span style="display:inline-flex;flex-direction:column;align-items:center"><span>'+co(t[1])+t[0]+'</span>'+
 '<span style="display:flex;flex-direction:column;align-items:center;gap:.2rem;margin-top:.2rem">'+
 rowsOf(t[0],t[1]).map(function(r){return '<span style="display:flex;gap:.2rem">'+(single?r.split(' ').map(bx).join(''):bx(r))+'</span>'}).join('')+'</span></span>'}
function op(t){return '<span style="margin:0 .4rem">'+t+'</span>'}
/* 式1行：mark＝①②③、L・R＝[化学式,係数]の並び、note＝係数を変えた理由(右に小さく)。
   「+」「→」は、すぐ前の化学式にくっつける。幅がたりないときは、化学式の間で折り返す */
function items(L,R){var all=L.map(function(t,i){return [t,i<L.length-1?'+':'→']}).concat(R.map(function(t,i){return [t,i<R.length-1?'+':'']}));
 return all.map(function(x){return '<span style="display:inline-flex;align-items:flex-start">'+col(x[0])+(x[1]?op(x[1]):'')+'</span>'}).join('')}
function eqLine(mark,L,R,note,top){
 return '<div style="display:flex;flex-wrap:wrap;align-items:flex-start;column-gap:.6rem'+(top?';margin-top:.8rem':'')+'">'+
  '<div style="display:flex;flex-wrap:wrap;align-items:flex-start;row-gap:.4rem">'+
  (mark?'<span style="flex:none;width:1.4rem;font-size:.8rem;line-height:32px;'+MU+'">'+mark+'</span>':'')+
  items(L,R)+'</div>'+
  (note?'<div style="flex:1 1 4rem;margin-top:.4rem;'+AT.replace('white-space:nowrap','white-space:normal')+'">◀ '+note+'の数が等しくなるよう係数をつける</div>':'')+'</div>'}

/* ---------- 問題4問(分解)と補充4問(化合) ----------
   steps＝①、②、③の式(L,R＝[化学式,係数]、n＝その段で、そろえる原子)。最後の段が、答え */
function T(f,c){return [f,c||1]}
var E1=[
 {k:"(1)",name:"塩化銅水溶液の電気分解",desc:"塩化銅水溶液に電流を流すと、銅と塩素に分解する。",
  steps:[{L:[T("CuCl₂")],R:[T("Cu"),T("Cl₂")]}],
  choices:["Cl","CuCl₂","Cu","CuO","Cl₂","CuCl"],at:"Cu 1個＝1個、Cl 2個＝2個"},
 {k:"(2)",name:"水の電気分解",desc:"水に電流を流すと、水素と酸素に分解する。",
  steps:[{L:[T("H₂O")],R:[T("H₂"),T("O₂")]},
         {L:[T("H₂O",2)],R:[T("H₂"),T("O₂")],n:"酸素"},
         {L:[T("H₂O",2)],R:[T("H₂",2),T("O₂")],n:"水素"}],
  choices:["O₂","H","H₂O","Cl₂","H₂","O"],at:"H 4個＝4個、O 2個＝2個"},
 {k:"(3)",name:"酸化銀の熱分解",desc:"酸化銀を加熱すると、銀と酸素に分解する。",
  steps:[{L:[T("Ag₂O")],R:[T("Ag"),T("O₂")]},
         {L:[T("Ag₂O",2)],R:[T("Ag"),T("O₂")],n:"酸素"},
         {L:[T("Ag₂O",2)],R:[T("Ag",4),T("O₂")],n:"銀"}],
  choices:["AgO","O","Ag","Ag₂","O₂","Ag₂O"],at:"Ag 4個＝4個、O 2個＝2個"},
 {k:"(4)",name:"炭酸水素ナトリウムの熱分解",desc:"炭酸水素ナトリウムを加熱すると、炭酸ナトリウムと二酸化炭素と水に分解する。",
  steps:[{L:[T("NaHCO₃")],R:[T("Na₂CO₃"),T("CO₂"),T("H₂O")]},
         {L:[T("NaHCO₃",2)],R:[T("Na₂CO₃"),T("CO₂"),T("H₂O")],n:"ナトリウム"}],
  choices:["H₂CO₃","CO₂","NaOH","NaHCO₃","H₂O","Na₂CO₃"],at:"Na 2個＝2個、H 2個＝2個、C 2個＝2個、O 6個＝6個"}];
var E2=[
 {k:"(5)",name:"鉄が硫黄と結びつく化学変化",desc:"鉄と硫黄を混ぜて加熱すると、硫化鉄ができる。",
  steps:[{L:[T("Fe"),T("S")],R:[T("FeS")]}],
  choices:["SFe","Fe","FeO","S","Fe₂","FeS"],at:"Fe 1個＝1個、S 1個＝1個"},
 {k:"(6)",name:"炭素の酸化",desc:"炭素を空気中で加熱すると、二酸化炭素ができる。",
  steps:[{L:[T("C"),T("O₂")],R:[T("CO₂")]}],
  choices:["O","CO₂","C₂","C","H₂O","O₂"],at:"C 1個＝1個、O 2個＝2個"},
 {k:"(7)",name:"マグネシウムの酸化",desc:"マグネシウムを空気中で加熱すると、酸化マグネシウムができる。",
  steps:[{L:[T("Mg"),T("O₂")],R:[T("MgO")]},
         {L:[T("Mg"),T("O₂")],R:[T("MgO",2)],n:"酸素"},
         {L:[T("Mg",2),T("O₂")],R:[T("MgO",2)],n:"マグネシウム"}],
  choices:["MgS","O","Mg","Mg₂","MgO","O₂"],at:"Mg 2個＝2個、O 2個＝2個"},
 {k:"(8)",name:"銅の酸化",desc:"銅を空気中で加熱すると、酸化銅ができる。",
  steps:[{L:[T("Cu"),T("O₂")],R:[T("CuO")]},
         {L:[T("Cu"),T("O₂")],R:[T("CuO",2)],n:"酸素"},
         {L:[T("Cu",2),T("O₂")],R:[T("CuO",2)],n:"銅"}],
  choices:["CuS","Cu₂","O₂","CuO","O","Cu"],at:"Cu 2個＝2個、O 2個＝2個"}];

/* ---------- 解答：その問題が終わる段(①か②か③)まで書く ---------- */
var MK=["①","②","③"];
function ans(list){
 return '<p class="note" style="font-size:.8rem;margin:.2rem 0">①　化学式で書く　　②　③　係数をつける</p>'+
  list.map(function(e){
   return '<p style="margin:.9rem 0 .15rem">'+e.k+' '+e.name+'</p>'+
    e.steps.map(function(s,i){return eqLine(MK[i],s.L,s.R,s.n,i>0)}).join('')+
    '<p style="font-size:.8rem;margin:.3rem 0 0;'+MU+'">原子の数(左＝右)：'+e.at+'</p>'}).join('')}
function parts(a){return a.map(function(e){var z=e.steps[e.steps.length-1];
 return {label:e.k,text:'<b>'+e.name+'</b><br>'+e.desc,type:"eq",
  L:z.L.map(function(t){return [t[0],t[1]]}),R:z.R.map(function(t){return [t[0],t[1]]}),choices:e.choices}})}

/* ---------- 厳選ポイント：酸化銀の熱分解(①②③) ---------- */
var P=E1[2].steps;
function box(s,top){return '<div class="formula" style="white-space:normal">'+eqLine("",s.L,s.R,s.n)+'</div>'}
var SM='<p class="note" style="font-size:.8rem;margin:.2rem 0">';
var POINT='<p>化学変化を、化学式を使って表した式を、<b>化学反応式</b>といいます。</p>'+
 '<p>酸化銀を加熱すると、銀と酸素に分解します。この反応で、書き方を見ます。</p>'+
 '<p>① 反応前の物質を左、反応後の物質を右に、化学式で書き、「→」で結びます。</p>'+box(P[0])+
 '<p>② 左右で、<b>酸素</b>原子の数が等しくなるように、係数をつけます。</p>'+box(P[1])+
 '<p>③ 左右で、<b>銀</b>原子の数が等しくなるように、係数をつけます。</p>'+box(P[2])+
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
