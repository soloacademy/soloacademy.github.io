(function(){
var INK="#26303b",BLUE="#1f5fa8",RED="#c2410c",MUTED="#5d6874",FACE="#eceff2",LBLUE="#e3edf8";
function n(v){return Math.round(v*10)/10}
function T(x,y,size,txt,cls,anchor){return '<text x="'+n(x)+'" y="'+n(y)+'" font-size="'+size+'"'+(anchor?' text-anchor="'+anchor+'"':'')+(cls?' class="'+cls+'"':'')+'>'+txt+'</text>'}
/* 色つきの面の上の文字：まわりの白いふちを消す */
function TN(x,y,size,txt,cls,anchor){return '<text x="'+n(x)+'" y="'+n(y)+'" font-size="'+size+'" style="stroke:none"'+(anchor?' text-anchor="'+anchor+'"':'')+(cls?' class="'+cls+'"':'')+'>'+txt+'</text>'}
/* 名前の線：(x,y1)から(x,y2)まで。先に点 */
function lead(x,y1,y2,k){return '<line x1="'+x+'" y1="'+y1+'" x2="'+x+'" y2="'+y2+'" stroke="'+k+'" stroke-width="1"/><circle cx="'+x+'" cy="'+y2+'" r="2.5" fill="'+k+'"/>'}

/* ---------- 細胞の図：動物(左)と植物(右)。色：共通＝赤(m)、植物だけ＝青(v)、細胞質＝うすい灰色の面
   hi＝答えのつくり(nuc,mem,wall,vac,chl,cyt)。hi があるとき、それ以外は薄くする ---------- */
function fig(hi,label){
 function G(id,s){return (hi&&!hi[id])?'<g opacity=".3">'+s+'</g>':s}
 var s=T(80,16,14,"動物の細胞","b","middle")+T(260,16,14,"植物の細胞","b","middle");
 /* 面(細胞質) */
 s+='<ellipse cx="80" cy="111" rx="68" ry="48" fill="'+FACE+'"/>'+
  '<rect x="198" y="68" width="124" height="86" rx="6" fill="'+FACE+'"/>';
 /* 細胞壁(植物だけ) */
 s+=G("wall",'<rect x="192" y="62" width="136" height="98" rx="10" fill="none" stroke="'+BLUE+'" stroke-width="6"/>'+
  lead(300,50,62,BLUE)+T(300,46,13,"細胞壁","v b","middle"));
 /* 細胞膜 */
 s+=G("mem",'<ellipse cx="80" cy="111" rx="68" ry="48" fill="none" stroke="'+RED+'" stroke-width="2.5"/>'+
  '<rect x="198" y="68" width="124" height="86" rx="6" fill="none" stroke="'+RED+'" stroke-width="2"/>'+
  lead(80,178,159,RED)+T(80,192,13,"細胞膜","m b","middle")+
  lead(260,178,154,RED)+T(260,192,13,"細胞膜","m b","middle"));
 /* 核 */
 s+=G("nuc",'<circle cx="80" cy="103" r="17" fill="#fff" stroke="'+RED+'" stroke-width="2"/>'+TN(80,108,13,"核","m b","middle")+
  '<circle cx="225" cy="96" r="15" fill="#fff" stroke="'+RED+'" stroke-width="2"/>'+TN(225,101,13,"核","m b","middle"));
 /* 液胞・葉緑体(植物だけ) */
 s+=G("vac",'<rect x="262" y="76" width="50" height="48" rx="16" fill="#fff" stroke="'+BLUE+'" stroke-width="2"/>'+TN(287,105,13,"液胞","v b","middle"));
 s+=G("chl",'<ellipse cx="226" cy="136" rx="24" ry="12" fill="'+LBLUE+'" stroke="'+BLUE+'" stroke-width="2"/>'+TN(226,140.5,12,"葉緑体","v b","middle")+
  '<ellipse cx="292" cy="140" rx="24" ry="12" fill="'+LBLUE+'" stroke="'+BLUE+'" stroke-width="2"/>'+TN(292,144.5,12,"葉緑体","v b","middle"));
 /* 細胞質の名前(上から線で指す) */
 s+=G("cyt",lead(44,50,100,MUTED)+T(44,46,13,"細胞質","g b","middle")+lead(251,50,98,MUTED)+T(251,46,13,"細胞質","g b","middle"));
 return '<div class="fig"><svg viewBox="0 0 340 200" role="img" aria-label="'+label+'">'+s+'</svg></div>'}

var LAB="動物の細胞と植物の細胞の図。動物の細胞(左)には、細胞膜、核、細胞質がある。植物の細胞(右)には、細胞膜、核、細胞質のほかに、細胞壁、液胞、葉緑体がある。細胞質は、細胞膜の内側で、核以外の部分(灰色の面)";
var FIGP=fig(null,LAB);
var FIGQ=fig({nuc:1,mem:1},LAB+"。共通のつくりである、核と細胞膜を、はっきり示している");
var FIGS=fig({vac:1,chl:1,cyt:1},LAB+"。細胞質にふくまれるつくりである、液胞と葉緑体を、はっきり示している");

/* ---------- 文章 ---------- */
var Mm=function(t){return '<span class="m">'+t+'</span>'},Vv=function(t){return '<span class="v">'+t+'</span>'};
var SM='<p class="note" style="font-size:.8rem;margin:.2rem 0">';
var GRID='display:grid;grid-template-columns:max-content 1fr;column-gap:.6rem;row-gap:.5rem;align-items:baseline;';
function rd(nm,rule){return '<b>'+nm+'</b><span style="font-size:.7rem">◀ '+rule+'</span>'}
var ROLE='<div style="'+GRID+'margin:.8rem 0">'+
 rd(Mm('細胞膜'),'細胞質の外側を包む膜')+rd(Vv('葉緑体'),'光合成を行う')+rd(Vv('液胞'),'不要な物質を貯める')+rd(Vv('細胞壁'),'細胞を保護する。体を支える')+'</div>';

/* からだのつくり：4列(細胞・組織・器官・個体)、罫線なし。矢印の列をはさむ */
function body(){
 var H=["細胞","組織","器官","個体"],R=[["筋細胞","筋組織","心臓・胃","人"],["神経細胞","神経組織","脳・脊髄","人"],["骨細胞","骨組織","骨(骨格)","人"]],h='';
 function row(a,hd){var o='';a.forEach(function(t,i){
  o+='<span style="'+(hd?'font-size:.75rem;color:var(--muted)':'')+'">'+t+'</span>'+(i<3?'<span style="'+(hd?'':'color:var(--muted)')+'text-align:center">'+(hd?'':'→')+'</span>':'')});return o}
 h+=row(H,true);R.forEach(function(r){h+=row(r,false)});
 return '<div style="display:grid;grid-template-columns:max-content 1.1rem max-content 1.1rem max-content 1.1rem max-content;column-gap:.15rem;row-gap:.45rem;align-items:baseline;margin:.8rem 0;font-size:.95rem">'+h+'</div>'}

var POINT='<p>細胞のつくりを、動物と植物で<span style="white-space:nowrap">比べます。</span></p>'+FIGP+
 SM+Mm('赤')+'は動物と植物に共通、'+Vv('青')+'は植物だけにあるつくりです。</p>'+
 '<p>灰色の部分を、<b>細胞質</b>といいます。細胞質は、細胞膜の内側で、<span style="white-space:nowrap">核以外の部分です。</span></p>'+ROLE+
 '<p>多細胞生物のからだは、次の順に、集まってできています。</p>'+body();

var CH1=["共通","植物だけ"],CH2=["ふくまれる","ふくまれない"];
var NM=["液胞","核","細胞壁","細胞膜","葉緑体"];
var A1=["植物だけ","共通","植物だけ","共通","植物だけ"];
var A2=["ふくまれる","ふくまれない","ふくまれない","ふくまれない","ふくまれる"];
function mk(ch,ans){return NM.map(function(t,i){return {label:t,type:"choice",choices:ch,accept:[ans[i]]}})}

var QBODY='<p>次のつくりは、動物と植物の細胞に<b>共通</b>か、植物の細胞<b>だけ</b>にあるか。丸をタップして選びなさい。</p>';
var ANS=FIGQ+'<p>共通のつくりは、<b class="m">核</b>と<b class="m">細胞膜</b>です。</p>';
var SBODY='<p>次のつくりは、細胞質に<b>ふくまれる</b>か、<b>ふくまれない</b>か。丸をタップして選びなさい。</p>';
var SOL2=FIGS+'<p>細胞質は、細胞膜の内側で、核以外の部分です。<b>液胞</b>と<b>葉緑体</b>が、ふくまれます。</p>';

window.UNIT={
no:"2-9",title:"細胞のつくり",
sections:[
{type:"text",point:true,title:"厳選ポイント",html:POINT},
{type:"problem",title:"問題",body:QBODY,parts:mk(CH1,A1)},
{type:"answer",html:ANS},
{type:"problem",title:"補充問題",body:SBODY,parts:mk(CH2,A2),solution:SOL2}
]};
})();
