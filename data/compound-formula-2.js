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
/* ---------- 解説の図：名前、①まちがった形、②直した形。式の下に、左右に開く斜めの線と、小さい文字 ----------
   線は45度。それぞれの線を上へのばすと、元素記号(右下の小さい数字は数えない)の、底の線(ベースライン)の真ん中を通る。
   左の線の上端は、1つ目の記号の真ん中の左下、右の線の上端は、2つ目の記号の真ん中の右下。文字は、線の先に、真ん中をそろえる */
var MUTED="#5d6874",FW={A:14.5,O:15.5,C:14.5,S:13.5,H:15.5,M:17.5,N:15,K:14.5,u:11.5,l:5.5,g:11.5,a:11,"₂":10,"₃":10};
function fw(t){var w=0,i;for(i=0;i<t.length;i++)w+=FW[t.charAt(i)]||12;return w}
function lw(t){var w=0,i,c,k;for(i=0;i<t.length;i++){c=t.charAt(i);k=c.charCodeAt(0);w+=k>0x2E80?12:(c==="("||c===")")?4.5:(c==="+"||c==="−"||c==="×")?7:(c>="A"&&c<="Z")?8.2:(c>="a"&&c<="z")?6.2:6.7}return w}
function segW(a){return a.reduce(function(t,g){return t+lw(g[0])},0)}
function segT(a){return a.map(function(g){return g[1]?'<tspan class="'+g[1]+'">'+g[0]+'</tspan>':g[0]}).join('')}
function segP(a){return a.map(function(g){return g[0]}).join('')}
function cls(c){return c.indexOf("+")>=0?"m":"v"}

/* 厳選ポイントの3例(小さい文字は、元素の名前) */
var EX=[
 {k:"",a:"酸化銀",f:[["Ag","O"],["Ag₂","O"]],
  l:[[[["銀",""],["(+)","m"]],[["酸素",""],["(2−)","v"]]],[[["銀",""],["(+)","m"],["×2","m"]],[["酸素",""],["(2−)","v"]]]]},
 {k:"",a:"塩化銅",f:[["Cu","Cl"],["Cu","Cl₂"]],
  l:[[[["銅",""],["(2+)","m"]],[["塩素",""],["(−)","v"]]],[[["銅",""],["(2+)","m"]],[["塩素",""],["(−)","v"],["×2","m"]]]]},
 {k:"",a:"硫化水素",f:[["H","S"],["H₂","S"]],
  l:[[[["水素",""],["(+)","m"]],[["硫黄",""],["(2−)","v"]]],[[["水素",""],["(+)","m"],["×2","m"]],[["硫黄",""],["(2−)","v"]]]]}];

/* 解答の例(小さい文字は、元素記号)。s1,c1＝前の元素の記号と電荷、s2,c2＝うしろ、n1,n2＝②での個数 */
var SUB={2:"₂",3:"₃"};
function mk(k,a,s1,c1,s2,c2,n1,n2,x){
 function lab(s,c,n,m){var g=[[s,""],["("+c+")",cls(c)]];if(m>1)g.push(["×"+m,"m"]);return g}
 return {k:k,a:a,x:x,
  f:[[s1,s2],[s1+(n1>1?SUB[n1]:""),s2+(n2>1?SUB[n2]:"")]],
  l:[[lab(s1,c1,n1,1),lab(s2,c2,n2,1)],[lab(s1,c1,n1,n1),lab(s2,c2,n2,n2)]]}}
var R1=[
 mk("(1)","酸化ナトリウム","Na","+","O","2−",2,1),
 mk("(2)","塩化マグネシウム","Mg","2+","Cl","−",1,2),
 mk("(3)","硫化ナトリウム","Na","+","S","2−",2,1)];
var R2=[
 mk("(1)","塩化カルシウム","Ca","2+","Cl","−",1,2),
 mk("(2)","硫化カリウム","K","+","S","2−",2,1),
 mk("(3)","塩化アルミニウム","Al","3+","Cl","−",1,3),
 mk("(4)","酸化アルミニウム","Al","3+","O","2−",2,3,
  [["Al",""],["(3+)","m"],["×2","m"],[" ＝ ",""],["6+","m"],["、O",""],["(2−)","v"],["×3","m"],[" ＝ ",""],["6−","v"]])];

/* L＝例の配列、o.cf＝①と②の式の真ん中のx、o.above＝名前を式の上の行に書く(長い名前用) */
function figEx(L,o){
 var s='',TY=3,SX=13,i,k,oy=0,last=0,al=[];
 for(i=0;i<L.length;i++){
  var r=L[i],base=o.above?oy+44:oy+26;
  last=oy;
  s+=o.above?'<text x="4" y="'+(oy+14)+'" font-size="16">'+r.k+' '+r.a+'</text>':'<text x="4" y="'+base+'" font-size="16">'+r.a+'</text>';
  for(k=0;k<2;k++){
   var cf=o.cf[k],a=r.f[k][0],b=r.f[k][1],wa=fw(a),wb=fw(b),x0=cf-(wa+wb)/2,
    ca=x0+fw(a.replace(/[₂₃]/,""))/2,cb=x0+wa+fw(b.replace(/[₂₃]/,""))/2,ly=base+TY+SX+12;
   s+='<text x="'+n(x0-3)+'" y="'+base+'" font-size="12" class="g" text-anchor="end" style="stroke:none">'+(k?"②":"①")+'</text>'+
    '<text x="'+cf+'" y="'+base+'" font-size="20" text-anchor="middle" style="stroke:none'+(k?';font-weight:700':';fill:'+MUTED)+'"><tspan>'+a+'</tspan><tspan>'+b+'</tspan></text>'+
    line(ca-TY,base+TY,ca-TY-SX,base+TY+SX,MUTED,1)+line(cb+TY,base+TY,cb+TY+SX,base+TY+SX,MUTED,1)+
    '<text x="'+n(ca-TY-SX)+'" y="'+ly+'" font-size="12" class="g" text-anchor="middle" style="stroke:none">'+segT(r.l[k][0])+'</text>'+
    '<text x="'+n(cb+TY+SX)+'" y="'+ly+'" font-size="12" class="g" text-anchor="middle" style="stroke:none">'+segT(r.l[k][1])+'</text>'}
  if(r.x)s+='<text x="'+o.cf[1]+'" y="'+(base+46)+'" font-size="12" class="g" text-anchor="middle" style="stroke:none">'+segT(r.x)+'</text>';
  al.push((r.k?r.k+' ':'')+r.a+'は、①'+r.f[0].join('')+'('+segP(r.l[0][0])+'と'+segP(r.l[0][1])+')、②'+r.f[1].join('')+'('+segP(r.l[1][0])+'と'+segP(r.l[1][1])+')'+(r.x?'。'+segP(r.x):''));
  oy+=(o.above?88:62)+(r.x?18:0)}
 var H=last+(o.above?78:60)+(L[L.length-1].x?18:0);
 return '<div class="fig"><svg viewBox="0 0 340 '+H+'" role="img" aria-label="化合物の化学式の作り方。'+al.join('。')+'。化学式の各元素記号から、左右に開く短い斜めの線が、下の小さい文字につながっている">'+s+'</svg></div>'}

var SM='<p class="note" style="font-size:.8rem;margin:.2rem 0">';
var ONE=SM+'※ 個数が1のときは、「1」は書きません。</p>';

var POINT='<p>周期表の縦の列ごとに、電荷が決まっています。</p>'+figCharge()+
 '<p>化合物は、電荷の合計が0になるように、元素の個数が決まります。</p>'+figEx(EX,{cf:[132,264]})+
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
{type:"answer",html:figEx(R1,{cf:[100,236],above:true})+ONE},
{type:"problem",title:"補充問題",body:QBODY,
 parts:[
  {label:"(1)",text:"塩化カルシウム",type:"count",els:["Ca","Cl"],accept:["12"]},
  {label:"(2)",text:"硫化カリウム",type:"count",els:["K","S"],accept:["21"]},
  {label:"(3)",text:"塩化アルミニウム",type:"count",els:["Al","Cl"],accept:["13"]},
  {label:"(4)",text:"酸化アルミニウム",type:"count",els:["Al","O"],accept:["23"]}
 ],
 solution:figEx(R2,{cf:[100,236],above:true})+ONE}
]};
})();
