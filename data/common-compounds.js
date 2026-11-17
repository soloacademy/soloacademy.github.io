(function(){
var INK="#26303b";
function n(v){return Math.round(v*10)/10}
function T(x,y,size,txt,cls,anchor){return '<text x="'+n(x)+'" y="'+n(y)+'" font-size="'+size+'"'+(anchor?' text-anchor="'+anchor+'"':'')+(cls?' class="'+cls+'"':'')+'>'+txt+'</text>'}
function line(x1,y1,x2,y2,k,w){return '<line x1="'+n(x1)+'" y1="'+n(y1)+'" x2="'+n(x2)+'" y2="'+n(y2)+'" stroke="'+k+'" stroke-width="'+(w||1)+'"/>'}
function svgY(y0,h,label,body){return '<div class="fig"><svg viewBox="0 '+y0+' 340 '+h+'" role="img" aria-label="'+label+'">'+body+'</svg></div>'}
function svg(h,label,body){return svgY(0,h,label,body)}
function sm(t){return '<tspan class="m">'+t+'</tspan>'}
function sv(t){return '<tspan class="v">'+t+'</tspan>'}

/* ---------- 炭酸の流れの図(厳選ポイント・問題・解答で共通)。名前は、化学式(空欄)の上に小さく書く。H＝赤、Na＝青 ---------- */
var BW=76,BH=30,BT=34,BX=[4,124,244],CY=BT+BH/2;
var NAMES=["炭酸","炭酸水素ナトリウム","炭酸ナトリウム"];
var FORM=[sm("H₂")+"CO₃",sv("Na")+sm("H")+"CO₃",sv("Na₂")+"CO₃"];
var FLAT=["H₂CO₃","NaHCO₃","Na₂CO₃"];
function flow(blank){
 var s='',i,cx;
 for(i=0;i<3;i++){cx=BX[i]+BW/2;
  s+=T(cx,24,12.5,NAMES[i],"g","middle");
  if(blank)s+='<g class="bl" data-b="c'+(i+1)+'"><rect x="'+BX[i]+'" y="'+BT+'" width="'+BW+'" height="'+BH+'" rx="4"/>'+
   '<text class="bt" x="'+n(cx)+'" y="'+n(CY+5.5)+'" font-size="16" text-anchor="middle"></text>'+
   '<text class="bm" x="'+(BX[i]+BW+3)+'" y="'+(BT+4)+'" font-size="13"></text></g>';
  else s+=T(cx,CY+6,18,FORM[i],"b","middle");
  if(i<2){var a=BX[i]+BW+10,b=BX[i+1]-10;
   s+=line(a,CY,b,CY,INK,1.5)+'<path d="M'+(b-6)+','+(CY-5)+' L'+b+','+CY+' L'+(b-6)+','+(CY+5)+'" fill="none" stroke="'+INK+'" stroke-width="1.5"/>'}}
 return svgY(10,62,blank?"炭酸の化学式が変わっていく流れの図。左から、炭酸、炭酸水素ナトリウム、炭酸ナトリウムの3つの化学式が右向きの矢印でつながっていて、化学式の部分が空欄":"炭酸の化学式が変わっていく流れの図。左から、炭酸H2CO3、炭酸水素ナトリウムNaHCO3、炭酸ナトリウムNa2CO3が右向きの矢印でつながっている。HがNaに1個ずつ置きかわっている",s)}

/* ---------- 文章 ---------- */
var H='<span class="m">H</span>',NA='<span class="v">Na</span>';
var SM='<p class="note" style="font-size:.8rem;margin:.2rem 0">';
function rd(f,nm,rule){return '<span><b>'+f+'</b><span style="font-size:.7rem;margin-left:.15rem">('+nm+')</span></span><span style="font-size:.7rem">◀ '+rule+'</span>'}
var GRID='display:grid;grid-template-columns:max-content 1fr;column-gap:.6rem;row-gap:.5rem;align-items:baseline;';
var CARB='<div style="'+GRID+'margin:.6rem 0">'+rd('H₂CO₃','炭酸','水(H₂O)に二酸化炭素(CO₂)が<span style="white-space:nowrap">溶けたもの</span>')+'</div>';
var OTHER='<div style="'+GRID+'margin:1rem 0">'+
 rd('H₂SO₄','硫酸','~SO₄(硫酸~)')+rd('NaOH','水酸化ナトリウム','~OH(水酸化~)')+rd('H₂S','硫化水素','~S(硫化~)')+rd('HNO₃','硝酸','~NO₃(硝酸~)')+'</div>';

var POINT='<p>炭酸は、水に二酸化炭素がとけたものです。</p>'+CARB+
 '<p>炭酸の'+H+'(+1)が、1個ずつ'+NA+'(+1)に置きかわります。</p>'+flow(false)+
 '<p>そのほかに、次の化合物を覚えます。</p>'+OTHER+
 SM+'※ OHのまとまりが2個のときは、( )をつけて Ca(OH)₂ のように書きます。</p>';

var ANSW='<p>炭酸の'+H+'が、1個ずつ'+NA+'に置きかわります。</p>'+flow(false);

var CH3=["NaOH","H₂CO₃","CO₂","Na₂CO₃","H₂SO₄","NaHCO₃"];
/* 補充問題：名前を見て、元素ごとの原子の数を選ぶ(count型。2-4と同じ形)。els＝元素記号(化学式に出てくる順)、accept＝個数を、els の順につないだもの */
var CNT=[
 ["水",["H","O"],"21"],["二酸化炭素",["C","O"],"12"],["アンモニア",["N","H"],"13"],
 ["酸化銅",["Cu","O"],"11"],["酸化|マグネシウム",["Mg","O"],"11"],["酸化銀",["Ag","O"],"21"],
 ["塩酸|(塩化水素)",["H","Cl"],"11"],["塩化|ナトリウム",["Na","Cl"],"11"],["塩化銅",["Cu","Cl"],"12"],
 ["炭酸",["H","C","O"],"213"],["炭酸水素|ナトリウム",["Na","H","C","O"],"1113"],["炭酸|ナトリウム",["Na","C","O"],"213"],
 ["硫酸",["H","S","O"],"214"],["硫酸銅",["Cu","S","O"],"114"],["硫酸|バリウム",["Ba","S","O"],"114"],
 ["水酸化|ナトリウム",["Na","O","H"],"111"],["水酸化|カルシウム",["Ca","O","H"],"122"],["水酸化|バリウム",["Ba","O","H"],"122"],
 ["硫化鉄",["Fe","S"],"11"],["硫化水素",["H","S"],"21"],["硝酸",["H","N","O"],"113"]];
var CPARTS=CNT.map(function(c,i){return {label:"("+(i+1)+")",text:c[0].split("|").map(function(t){return '<span style="white-space:nowrap">'+t+"</span>"}).join(""),type:"count",els:c[1],accept:[c[2]]}});

window.UNIT={
no:"2-5",title:"化学式(よく出てくる化合物)",
sections:[
{type:"text",point:true,title:"厳選ポイント",html:POINT},
{type:"problem",title:"問題",body:'<p>炭酸の化学式が、変わっていく流れです。空欄に入る化学式を、下の語群から選びなさい。</p>',
 parts:[{type:"tree",svg:flow(true),answers:{c1:FLAT[0],c2:FLAT[1],c3:FLAT[2]},choices:CH3}]},
{type:"answer",html:ANSW},
{type:"problem",title:"補充問題",cols:3,body:'<p>次の化合物の化学式になるように、元素記号をタップして、<span style="white-space:nowrap">個数を選びなさい。</span></p>',
 parts:CPARTS}
]};
})();
