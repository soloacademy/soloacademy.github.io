(function(){
var BOX="#b4bbc3";
function n(v){return Math.round(v*10)/10}
var E=["H","He","Li","Be","B","C","N","O","F","Ne","Na","Mg","Al","Si","P","S","Cl","Ar","K","Ca"];
/* マスの位置(行,列)：2-3の周期表と同じ。1行目はH(左)とHe(右はし)、2行目と3行目は8個、4行目はKとCa */
function pos(z){if(z===1)return[0,0];if(z===2)return[0,7];if(z<=10)return[1,z-3];if(z<=18)return[2,z-11];return[3,z-19]}
var CW=38,PX=41.5,PY=42,X0=5,Y0=26;
/* 列ごとの電荷。+は赤(m)、−は青(v)、0と±は灰色(g) */
var CC=["+","2+","3+","4±","3−","2−","−","0"],CK=["m","m","m","g","v","v","v","g"];

/* ---------- 厳選ポイントの図：周期表の列の上に、電荷を書く ---------- */
function figCharge(){
 var s='',c,z,p,x,y,cx;
 for(c=0;c<8;c++)s+='<text x="'+n(X0+c*PX+CW/2)+'" y="16" font-size="16" class="'+CK[c]+' b" text-anchor="middle">'+CC[c]+'</text>';
 for(z=1;z<=20;z++){
  p=pos(z);x=X0+p[1]*PX;y=Y0+p[0]*PY;cx=x+CW/2;
  s+='<rect x="'+n(x)+'" y="'+y+'" width="'+CW+'" height="'+CW+'" rx="4" fill="#fff" stroke="'+BOX+'" stroke-width="1.2"/>'+
   '<text x="'+n(x+4)+'" y="'+(y+34)+'" font-size="10" class="g" style="stroke:none">'+z+'</text>'+
   '<text x="'+n(cx)+'" y="'+(y+23.5)+'" font-size="16" class="b" text-anchor="middle" style="stroke:none">'+E[z-1]+'</text>'}
 return '<div class="fig"><svg viewBox="0 0 340 194" role="img" aria-label="周期表の図。列の上に、電荷が書いてある。1列目は、H、Li、Na、Kで、電荷は+。2列目は、Be、Mg、Caで、2+。3列目は、B、Alで、3+。4列目は、C、Siで、4+か4−。5列目は、N、Pで、3−。6列目は、O、Sで、2−。7列目は、F、Clで、−。8列目は、He、Ne、Arで、0。各マスの左下に、原子番号が書いてある">'+s+'</svg></div>'}

/* ---------- 色：+は赤、−は青。(+)や(2−)の形で書く ---------- */
function ch(t){return '<span class="'+(t.indexOf("+")>=0?"m":"v")+'">('+t+')</span>'}

/* ---------- 「①まちがった形 → ②直した形」の行(厳選ポイントと解答で共通)
   行：{k:(1)など, a:名前, e1:[前の元素の記号,電荷], e2:[後ろの元素の記号,電荷], w:①の式, r:②の式, t:②の説明, x:あれば、②の下にもう1行} ---------- */
function rows(R){
 var sm='font-size:.8rem;color:var(--muted)';
 return '<div style="display:grid;grid-template-columns:max-content 1fr;column-gap:.6rem;row-gap:.1rem;align-items:baseline;margin:.4rem 0 .8rem">'+R.map(function(r){
  return '<p style="grid-column:1/-1;margin:.9rem 0 0">'+(r.k?r.k+' ':'')+r.a+'　'+r.e1[0]+ch(r.e1[1])+'　'+r.e2[0]+ch(r.e2[1])+'</p>'+
   '<span style="'+sm+'">①'+r.w+'</span><span style="'+sm+'">◀ '+ch(r.e1[1])+'と'+ch(r.e2[1])+'で、合計が0ではない</span>'+
   '<span style="font-size:.8rem;font-weight:700">②'+r.r+'</span><span style="'+sm+'">◀ '+r.t+'</span>'+
   (r.x?'<span></span><span style="'+sm+'">'+r.x+'</span>':'')}).join('')+'</div>'}

var RP=[
 {a:"酸化銀",e1:["Ag","+"],e2:["O","2−"],w:"AgO",r:"Ag₂O",t:"Ag を2個にして、合計が0"},
 {a:"塩化銅",e1:["Cu","2+"],e2:["Cl","−"],w:"CuCl",r:"CuCl₂",t:"Cl を2個にして、合計が0"},
 {a:"硫化水素",e1:["H","+"],e2:["S","2−"],w:"HS",r:"H₂S",t:"H を2個にして、合計が0"}];

var R1=[
 {k:"(1)",a:"酸化ナトリウム",e1:["Na","+"],e2:["O","2−"],w:"NaO",r:"Na₂O",t:"Na を2個にして、合計が0"},
 {k:"(2)",a:"塩化マグネシウム",e1:["Mg","2+"],e2:["Cl","−"],w:"MgCl",r:"MgCl₂",t:"Cl を2個にして、合計が0"},
 {k:"(3)",a:"硫化ナトリウム",e1:["Na","+"],e2:["S","2−"],w:"NaS",r:"Na₂S",t:"Na を2個にして、合計が0"}];
var R2=[
 {k:"(1)",a:"塩化カルシウム",e1:["Ca","2+"],e2:["Cl","−"],w:"CaCl",r:"CaCl₂",t:"Cl を2個にして、合計が0"},
 {k:"(2)",a:"硫化カリウム",e1:["K","+"],e2:["S","2−"],w:"KS",r:"K₂S",t:"K を2個にして、合計が0"},
 {k:"(3)",a:"塩化アルミニウム",e1:["Al","3+"],e2:["Cl","−"],w:"AlCl",r:"AlCl₃",t:"Cl を3個にして、合計が0"},
 {k:"(4)",a:"酸化アルミニウム",e1:["Al","3+"],e2:["O","2−"],w:"AlO",r:"Al₂O₃",t:"Al を2個、O を3個にして、合計が0",
  x:'Al'+ch("3+")+'×2 ＝ <span class="m">6+</span>、O'+ch("2−")+'×3 ＝ <span class="v">6−</span>'}];

var SM='<p class="note" style="font-size:.8rem;margin:.2rem 0">';
var ONE=SM+'※ 個数が1のときは、「1」は書きません。</p>';

var POINT='<p>周期表の縦の列ごとに、電荷が決まっています。</p>'+figCharge()+
 SM+'※ 周期表にない金属(Cu、Zn、Fe など)は、<span class="m">2+</span> と考えます。ただし、銀(Ag)は <span class="m">+</span> です。</p>'+
 '<p>化合物は、電荷の合計が0になるように、元素の個数が決まります。</p>'+rows(RP);

var QBODY='<p>次の化合物の化学式になるように、元素記号の個数を選びなさい。</p>';

window.UNIT={
no:"2-4",title:"化学式(化合物②)",
sections:[
{type:"text",point:true,title:"厳選ポイント",html:POINT},
{type:"problem",title:"問題",body:QBODY,
 parts:[
  {label:"(1)",text:"酸化ナトリウム",type:"count",els:["Na","O"],accept:["21"]},
  {label:"(2)",text:"塩化マグネシウム",type:"count",els:["Mg","Cl"],accept:["12"]},
  {label:"(3)",text:"硫化ナトリウム",type:"count",els:["Na","S"],accept:["21"]}
 ]},
{type:"answer",html:rows(R1)+ONE},
{type:"problem",title:"補充問題",body:QBODY,
 parts:[
  {label:"(1)",text:"塩化カルシウム",type:"count",els:["Ca","Cl"],accept:["12"]},
  {label:"(2)",text:"硫化カリウム",type:"count",els:["K","S"],accept:["21"]},
  {label:"(3)",text:"塩化アルミニウム",type:"count",els:["Al","Cl"],accept:["13"]},
  {label:"(4)",text:"酸化アルミニウム",type:"count",els:["Al","O"],accept:["23"]}
 ],
 solution:rows(R2)+ONE}
]};
})();
