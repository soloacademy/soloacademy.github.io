(function(){
var INK="#26303b",BLUE="#1f5fa8",RED="#c2410c",MUTED="#5d6874",FACE="#eceff2",LBLUE="#e3edf8";
function n(v){return Math.round(v*10)/10}
function T(x,y,size,txt,cls,anchor){return '<text x="'+n(x)+'" y="'+n(y)+'" font-size="'+size+'"'+(anchor?' text-anchor="'+anchor+'"':'')+(cls?' class="'+cls+'"':'')+'>'+txt+'</text>'}
function line(x1,y1,x2,y2,k,w){return '<line x1="'+n(x1)+'" y1="'+n(y1)+'" x2="'+n(x2)+'" y2="'+n(y2)+'" stroke="'+k+'" stroke-width="'+(w||1)+'"/>'}
/* 名前の線：(x1,y1)から(x2,y2)まで。先に点 */
function ld(x1,y1,x2,y2,k){k=k||MUTED;return line(x1,y1,x2,y2,k,1)+'<circle cx="'+n(x2)+'" cy="'+n(y2)+'" r="2.5" fill="'+k+'"/>'}
/* 2つの細胞の間に置く名前：中心 x=141。左右に線を引いて、動物と植物の両方を指す */
function cen(cy,txt,ax,ay,px,py,k,c){var h=txt.length*6.5+3;
 return ld(141-h,cy,ax,ay,k)+ld(141+h,cy,px,py,k)+T(141,cy+4.5,13,txt,c+" b","middle")}

/* ---------- 細胞の図：動物(左)と植物(右)。共通のつくり(核・細胞膜)の名前は、2つの細胞の間。植物だけのつくり(細胞壁・液胞・葉緑体)の名前は、植物の細胞の右
   hi＝答えのつくり(nuc,mem,wall,vac,chl,cyt)。hi があるとき、それ以外は薄くする。cyt があるときだけ、細胞質を灰色の面で示す ---------- */
function fig(hi,label){
 function G(id,s){return (hi&&!hi[id])?'<g opacity=".3">'+s+'</g>':s}
 var gray=hi&&hi.cyt,fill=gray?FACE:"#fff",s='';
 s+=T(58,20,14,"動物の細胞","b","middle")+T(226,20,14,"植物の細胞","b","middle");
 /* 細胞の中の面 */
 s+='<ellipse cx="58" cy="92" rx="52" ry="48" fill="'+fill+'"/>'+
  '<rect x="178" y="44" width="96" height="96" rx="6" fill="'+fill+'"/>';
 /* 細胞壁(植物だけ) */
 s+=G("wall",'<rect x="173" y="39" width="106" height="106" rx="9" fill="none" stroke="'+BLUE+'" stroke-width="5"/>'+
  ld(291,52,279,52,BLUE)+T(294,56.5,12.5,"細胞壁","v b"));
 /* 細胞膜(共通) */
 s+=G("mem",'<ellipse cx="58" cy="92" rx="52" ry="48" fill="none" stroke="'+RED+'" stroke-width="2.5"/>'+
  '<rect x="178" y="44" width="96" height="96" rx="6" fill="none" stroke="'+RED+'" stroke-width="2"/>'+
  cen(124,"細胞膜",96.8,124,178,124,RED,"m"));
 /* 核(共通)：それぞれの細胞の中心 */
 s+=G("nuc",'<circle cx="58" cy="92" r="13" fill="#fff" stroke="'+RED+'" stroke-width="2"/>'+
  '<circle cx="226" cy="92" r="13" fill="#fff" stroke="'+RED+'" stroke-width="2"/>'+
  cen(92,"核",71,92,213,92,RED,"m"));
 /* 細胞質(答えの図だけ) */
 if(gray)s+=G("cyt",cen(62,"細胞質",84,62,186,76,MUTED,"g"));
 /* 液胞(植物だけ)：少しいびつな形。核や葉緑体に触れない */
 s+=G("vac",'<path d="M238,60 C240,52 248,48 256,50 C266,50 270,58 268,68 C268,78 258,82 250,78 C242,78 236,70 238,60 Z" fill="#fff" stroke="'+BLUE+'" stroke-width="2"/>'+
  ld(291,84,268,68,BLUE)+T(294,88.5,12.5,"液胞","v b"));
 /* 葉緑体(植物だけ)：小さな粒。1つの粒に線を引く */
 var gr=[[200,60],[192,112],[216,126],[246,124],[262,108]],g='';
 gr.forEach(function(p){g+='<ellipse cx="'+p[0]+'" cy="'+p[1]+'" rx="7" ry="4.5" fill="'+LBLUE+'" stroke="'+BLUE+'" stroke-width="1.5"/>'});
 s+=G("chl",g+ld(291,116,266,109,BLUE)+T(294,120.5,12.5,"葉緑体","v b"));
 return '<div class="fig"><svg viewBox="0 0 340 156" role="img" aria-label="'+label+'">'+s+'</svg></div>'}

var LAB="動物の細胞と植物の細胞の図。動物の細胞(左)と植物の細胞(右)の間に、共通のつくりである、核と細胞膜の名前があり、線が両方の細胞を指している。核は、それぞれの細胞の中心にある。植物の細胞の右には、植物だけにあるつくりである、細胞壁、液胞、葉緑体の名前が縦に並び、線が指している。葉緑体は、小さな粒";
var FIGP=fig(null,LAB);
var FIGQ=fig({nuc:1,mem:1},LAB+"。共通のつくりである、核と細胞膜を、はっきり示している");
var FIGS=fig({vac:1,mem:1,chl:1,cyt:1},LAB+"。細胞質は、核以外の部分で、灰色の面で示し、名前は2つの細胞の間にある。細胞質にふくまれるつくりである、細胞膜、液胞、葉緑体を、はっきり示している");

/* ---------- 文章 ---------- */
var SM='<p class="note" style="font-size:.8rem;margin:.2rem 0">';
/* 図の下に、小さく：核・細胞壁、そして細胞質の中のつくり(右に、かっこと「細胞質」) */
var RS='font-size:.8rem;line-height:1.7;color:var(--muted)';
var ROLE='<div style="margin:.5rem 0 .9rem;'+RS+'">核：酢酸オルセイン液などの染色液に染まる<br>細胞壁：細胞を保護する。体を支える'+
 '<div style="display:grid;grid-template-columns:max-content .5rem max-content;column-gap:.4rem;justify-content:start">'+
 '<span style="grid-column:1">細胞膜：細胞質の外側を包む膜<br>葉緑体：光合成を行う<br>液胞：不要な物質を貯める</span>'+
 '<span style="grid-column:2;border:1.5px solid var(--muted);border-left:0"></span>'+
 '<span style="grid-column:3;align-self:center">細胞質</span></div></div>';

/* からだのつくり：4列(細胞・組織・器官・個体)。伝えたいのは見出し(大きく太く)。例は小さく。罫線なし */
function body(){
 var H=["細胞","組織","器官","個体"],R=[["筋細胞","筋組織","心臓・胃","人"],["神経細胞","神経組織","脳・脊髄","人"],["骨細胞","骨組織","骨(骨格)","人"]],h='';
 var HS='font-weight:700;font-size:1.05rem',ES='font-size:.8rem;color:var(--muted)';
 function row(a,hd){var o='';a.forEach(function(t,i){
  o+='<span style="'+(hd?HS:ES)+'">'+t+'</span>';
  if(i<3)o+='<span style="text-align:center;'+(hd?HS:ES)+'">→</span>'});return o}
 h+=row(H,true);R.forEach(function(r){h+=row(r,false)});
 return '<div style="display:grid;grid-template-columns:max-content 1.1rem max-content 1.1rem max-content 1.1rem max-content;column-gap:.15rem;row-gap:.45rem;align-items:baseline;margin:.8rem 0">'+h+'</div>'}

var POINT='<p>細胞のつくりを、動物と植物で<span style="white-space:nowrap">比べます。</span></p>'+FIGP+ROLE+
 '<p>多細胞生物のからだは、次の順に、集まってできています。</p>'+body();

var CH1=["共通","植物だけ"],CH2=["ふくまれる","ふくまれない"];
var NM=["液胞","核","細胞壁","細胞膜","葉緑体"];
var A1=["植物だけ","共通","植物だけ","共通","植物だけ"];
var A2=["ふくまれる","ふくまれない","ふくまれない","ふくまれる","ふくまれる"];
function mk(ch,ans){return NM.map(function(t,i){return {label:t,type:"choice",choices:ch,accept:[ans[i]]}})}

var QBODY='<p>次のつくりは、動物と植物の細胞に<b>共通</b>か、植物の細胞<b>だけ</b>にあるか。丸をタップして選びなさい。</p>';
var ANS=FIGQ+'<p>共通のつくりは、<b>核</b>と<b>細胞膜</b>です。</p>';
var SBODY='<p>次のつくりは、細胞質に<b>ふくまれる</b>か、<b>ふくまれない</b>か。丸をタップして選びなさい。</p>';
var SOL2=FIGS+'<p>細胞質は、核以外の部分です(細胞壁は、細胞質にふくみません)。<b>液胞</b>、<b>細胞膜</b>、<b>葉緑体</b>が、ふくまれます。</p>';

window.UNIT={
no:"2-9",title:"細胞のつくり",
sections:[
{type:"text",point:true,title:"厳選ポイント",html:POINT},
{type:"problem",title:"問題",body:QBODY,parts:mk(CH1,A1)},
{type:"answer",html:ANS},
{type:"problem",title:"補充問題",body:SBODY,parts:mk(CH2,A2),solution:SOL2}
]};
})();
