(function(){
var BOX="#b4bbc3",INK="#26303b";
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
 /* KとCaの下：矢印と、「Ag」「他の金属」。右に小さい説明 */
 function up(cx){return '<line x1="'+n(cx)+'" y1="212" x2="'+n(cx)+'" y2="196" stroke="'+INK+'" stroke-width="1.5"/><path d="M'+n(cx-5)+',203 L'+n(cx)+',196 L'+n(cx+5)+',203" fill="none" stroke="'+INK+'" stroke-width="1.5"/>'}
 var kx=X0+CW/2,cax=X0+PX+CW/2;
 s+=up(kx)+up(cax)+
  '<text x="'+n(kx)+'" y="229" font-size="12" class="m b" text-anchor="middle">Ag</text>'+
  '<text x="'+n(cax)+'" y="229" font-size="12" class="m b" text-anchor="middle">他の金属</text>'+
  '<text x="98" y="222" font-size="9.5" class="g" style="stroke:none">中学理科では，周期表にない金属の電荷は</text>'+
  '<text x="98" y="234" font-size="9.5" class="g" style="stroke:none">「2＋」と考えてよい</text>';
 return '<div class="fig"><svg viewBox="0 0 340 240" role="img" aria-label="周期表の図。列の上に、電荷が書いてある。1列目は、H、Li、Na、Kで、電荷は+。2列目は、Be、Mg、Caで、2+。3列目は、B、Alで、3+。4列目は、C、Siで、4+か4−。5列目は、N、Pで、3−。6列目は、O、Sで、2−。7列目は、F、Clで、−。8列目は、He、Ne、Arで、0。各マスの左下に、原子番号が書いてある。Kの下に矢印と銀(Ag)、Caの下に矢印と他の金属が書いてあり、他の金属の右に、中学理科では周期表にない金属の電荷は2+と考えてよい、と小さく書いてある">'+s+'</svg></div>'}

function line(x1,y1,x2,y2,k,w){return '<line x1="'+n(x1)+'" y1="'+n(y1)+'" x2="'+n(x2)+'" y2="'+n(y2)+'" stroke="'+k+'" stroke-width="'+(w||1)+'"/>'}
/* ---------- 色：+は赤、−は青。(+)や(2−)の形で書く ---------- */
/* 元素記号の下に、小さく電荷を付ける */
function el(e){return '<span style="display:inline-flex;flex-direction:column;align-items:center;line-height:1.25">'+e[0]+'<span style="font-size:.7rem">'+ch(e[1])+'</span></span>'}
function ch(t){return '<span class="'+(t.indexOf("+")>=0?"m":"v")+'">('+t+')</span>'}

/* ---------- 厳選ポイントの図：名前、①まちがった形、②直した形。下に、小さい文字。間をハの字の線でつなぐ ---------- */
var MUTED="#5d6874",FW={A:14.5,O:15.5,C:14.5,S:13.5,H:15.5,u:11.5,l:5.5,g:11.5,"₂":10};
function fw(t){var w=0,i;for(i=0;i<t.length;i++)w+=FW[t.charAt(i)]||12;return w}
function lw(t){var w=0,i,c,k;for(i=0;i<t.length;i++){c=t.charAt(i);k=c.charCodeAt(0);w+=k>0x2E80?12:(c==="("||c===")")?4.5:(c==="+"||c==="−"||c==="×")?7:6.7}return w}
function segW(a){return a.reduce(function(t,g){return t+lw(g[0])},0)}
function segT(a){return a.map(function(g){return g[1]?'<tspan class="'+g[1]+'">'+g[0]+'</tspan>':g[0]}).join('')}
var EX=[
 {a:"酸化銀",f:[["Ag","O"],["Ag₂","O"]],
  l:[[[["銀",""],["(+)","m"]],[["酸素",""],["(2−)","v"]]],[[["銀",""],["(+)","m"],["×2","m"]],[["酸素",""],["(2−)","v"]]]]},
 {a:"塩化銅",f:[["Cu","Cl"],["Cu","Cl₂"]],
  l:[[[["銅",""],["(2+)","m"]],[["塩素",""],["(−)","v"]]],[[["銅",""],["(2+)","m"]],[["塩素",""],["(−)","v"],["×2","m"]]]]},
 {a:"硫化水素",f:[["H","S"],["H₂","S"]],
  l:[[[["水素",""],["(+)","m"]],[["硫黄",""],["(2−)","v"]]],[[["水素",""],["(+)","m"],["×2","m"]],[["硫黄",""],["(2−)","v"]]]]}];
function figEx(){
 var s='',CF=[128,262],G=7,i,k;
 for(i=0;i<EX.length;i++){
  var r=EX[i],oy=i*80,base=oy+26;
  s+='<text x="4" y="'+base+'" font-size="16">'+r.a+'</text>';
  for(k=0;k<2;k++){
   var cf=CF[k],a=r.f[k][0],b=r.f[k][1],wa=fw(a),wb=fw(b),x0=cf-(wa+wb)/2,ca=x0+wa/2,cb=x0+wa+wb/2,
    L=r.l[k][0],R=r.l[k][1],wl=segW(L),wr=segW(R),lc=cf-G-wl/2,rc=cf+G+wr/2;
   s+='<text x="'+n(x0-3)+'" y="'+base+'" font-size="12" class="g" text-anchor="end" style="stroke:none">'+(k?"②":"①")+'</text>'+
    '<text x="'+cf+'" y="'+base+'" font-size="20" text-anchor="middle" style="stroke:none'+(k?';font-weight:700':';fill:'+MUTED)+'"><tspan>'+a+'</tspan><tspan>'+b+'</tspan></text>'+
    line(ca,oy+34,lc,oy+62,MUTED,1)+line(cb,oy+34,rc,oy+62,MUTED,1)+
    '<text x="'+n(cf-G)+'" y="'+(oy+75)+'" font-size="12" class="g" text-anchor="end" style="stroke:none">'+segT(L)+'</text>'+
    '<text x="'+n(cf+G)+'" y="'+(oy+75)+'" font-size="12" class="g" style="stroke:none">'+segT(R)+'</text>'}}
 return '<div class="fig"><svg viewBox="0 0 340 240" role="img" aria-label="化合物の化学式の作り方。酸化銀は、①AgO(銀(+)と酸素(2−))、②Ag₂O(銀(+)×2と酸素(2−))。塩化銅は、①CuCl(銅(2+)と塩素(−))、②CuCl₂(銅(2+)と塩素(−)×2)。硫化水素は、①HS(水素(+)と硫黄(2−))、②H₂S(水素(+)×2と硫黄(2−))。2行目の斜めの線は、化学式の元素記号と、下の小さい文字をつないでいる">'+s+'</svg></div>'}

/* ---------- 「①まちがった形 → ②直した形」の行(厳選ポイントと解答で共通)
   行：{k:(1)など, a:名前, e1:[前の元素の記号,電荷], e2:[後ろの元素の記号,電荷], w:①の式, r:②の式, t:②の説明, x:あれば、②の下にもう1行} ---------- */
function rows(R){
 var sm='font-size:.8rem;color:var(--muted)';
 return '<div style="display:grid;grid-template-columns:max-content 1fr;column-gap:.6rem;row-gap:.1rem;align-items:baseline;margin:.4rem 0 .8rem">'+R.map(function(r){
  return '<p style="grid-column:1/-1;margin:.9rem 0 0">'+(r.k?r.k+' ':'')+r.a+'　'+el(r.e1)+'　'+el(r.e2)+'</p>'+
   '<span style="'+sm+'">①'+r.w+'</span><span style="'+sm+'">◀ '+ch(r.e1[1])+'と'+ch(r.e2[1])+'で、合計が0ではない</span>'+
   '<span style="font-size:.8rem;font-weight:700">②'+r.r+'</span><span style="'+sm+'">◀ '+r.t+'</span>'+
   (r.x?'<span></span><span style="'+sm+'">'+r.x+'</span>':'')}).join('')+'</div>'}

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
 '<p>化合物は、電荷の合計が0になるように、元素の個数が決まります。</p>'+figEx()+
 SM+'①は、合計が0ではありません。②は、<span class="m">×2</span> にして、合計が0になります。</p>';

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
