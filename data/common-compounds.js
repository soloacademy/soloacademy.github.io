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

/* ---------- 補充問題の表：7行×3列。各マスは、名前の下に空欄 ---------- */
var ROWS=[
 [["水","H₂O"],["二酸化炭素","CO₂"],["アンモニア","NH₃"]],
 [["酸化銅","CuO"],["酸化マグネシウム","MgO"],["酸化銀","Ag₂O"]],
 [["塩酸(塩化水素)","HCl"],["塩化ナトリウム","NaCl"],["塩化銅","CuCl₂"]],
 [["炭酸","H₂CO₃"],["炭酸水素ナトリウム","NaHCO₃"],["炭酸ナトリウム","Na₂CO₃"]],
 [["硫酸","H₂SO₄"],["硫酸銅","CuSO₄"],["硫酸バリウム","BaSO₄"]],
 [["水酸化ナトリウム","NaOH"],["水酸化カルシウム","Ca(OH)₂"],["水酸化バリウム","Ba(OH)₂"]],
 [["硫化鉄","FeS"],["硫化水素","H₂S"],["硝酸","HNO₃"]]];
var TC=[48,166,284],PITCH=50,TOP=4,TW=72;
var ANS={};
function table(){
 var s='',r,c,k=0,y0,bx;
 for(r=0;r<ROWS.length;r++){y0=TOP+r*PITCH;
  for(c=0;c<3;c++){bx=TC[c]-TW/2;
   s+=T(TC[c],y0+11,12,ROWS[r][c][0],null,"middle")+
    '<g class="bl" data-b="k'+k+'"><rect x="'+bx+'" y="'+(y0+16)+'" width="'+TW+'" height="24" rx="4"/>'+
    '<text class="bt" x="'+TC[c]+'" y="'+(y0+33)+'" font-size="14" text-anchor="middle"></text>'+
    '<text class="bm" x="'+(bx+TW+3)+'" y="'+(y0+33)+'" font-size="13"></text></g>';
   ANS["k"+k]=ROWS[r][c][1];k++}}
 return svg(TOP+ROWS.length*PITCH,"よく出てくる化合物の表。7行3列で、各マスに化合物の名前があり、その下に化学式の空欄がある。1行目は、水、二酸化炭素、アンモニア。2行目は、酸化銅、酸化マグネシウム、酸化銀。3行目は、塩酸(塩化水素)、塩化ナトリウム、塩化銅。4行目は、炭酸、炭酸水素ナトリウム、炭酸ナトリウム。5行目は、硫酸、硫酸銅、硫酸バリウム。6行目は、水酸化ナトリウム、水酸化カルシウム、水酸化バリウム。7行目は、硫化鉄、硫化水素、硝酸",s)}
var TBL=table();

/* ---------- 文章 ---------- */
var H='<span class="m">H</span>',NA='<span class="v">Na</span>';
var SM='<p class="note" style="font-size:.8rem;margin:.2rem 0">';
function rd(f,nm,rule){return '<b>'+f+'</b><span>'+nm+'</span><span style="font-size:.7rem">◀ '+rule+'</span>'}
var OTHER='<div style="display:grid;grid-template-columns:max-content max-content 1fr;column-gap:.6rem;row-gap:.5rem;align-items:baseline;margin:1rem 0">'+
 rd('H₂SO₄','硫酸','~SO₄(硫酸~)')+rd('NaOH','水酸化ナトリウム','~OH(水酸化~)')+rd('H₂S','硫化水素','~S(硫化~)')+rd('HNO₃','硝酸','~NO₃(硝酸~)')+'</div>';

var POINT='<p>炭酸は、水に二酸化炭素がとけたものです。</p>'+
 '<p>炭酸の'+H+'(+1)が、1個ずつ'+NA+'(+1)に置きかわります。</p>'+flow(false)+
 '<p>そのほかに、次の化合物を覚えます。</p>'+OTHER+
 SM+'※ OHのまとまりが2個のときは、( )をつけて Ca(OH)₂ のように書きます。</p>';

var ANSW='<p>炭酸の'+H+'が、1個ずつ'+NA+'に置きかわります。</p>'+flow(false);

var CH3=["NaOH","H₂CO₃","CO₂","Na₂CO₃","H₂SO₄","NaHCO₃"];
var CH21=["NaCl","H₂SO₄","Ba(OH)₂","CO₂","NaHCO₃","CuO","HNO₃","H₂O","Ag₂O","FeS","BaSO₄","NH₃","Na₂CO₃","HCl","Ca(OH)₂","CuCl₂","H₂S","MgO","NaOH","CuSO₄","H₂CO₃"];

window.UNIT={
no:"2-5",title:"化学式(よく出てくる化合物)",
sections:[
{type:"text",point:true,title:"厳選ポイント",html:POINT},
{type:"problem",title:"問題",body:'<p>炭酸の化学式が、変わっていく流れです。空欄に入る化学式を、下の語群から選びなさい。</p>',
 parts:[{type:"tree",svg:flow(true),answers:{c1:FLAT[0],c2:FLAT[1],c3:FLAT[2]},choices:CH3}]},
{type:"answer",html:ANSW},
{type:"problem",title:"補充問題",body:'<p>次の化合物の化学式を、下の語群から選んで、表の空欄に入れなさい。</p>',
 parts:[{type:"tree",svg:TBL,answers:ANS,choices:CH21}]}
]};
})();
