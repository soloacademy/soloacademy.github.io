(function(){
var INK="#26303b",BLUE="#1f5fa8",RED="#c2410c",PALE="#e3edf8",PALER="#fdefe8";
function TN(x,y,size,txt,cls,anchor){return '<text x="'+x+'" y="'+y+'" font-size="'+size+'" style="stroke:none"'+(anchor?' text-anchor="'+anchor+'"':'')+(cls?' class="'+cls+'"':'')+'>'+txt+'</text>'}
function svg(w,h,label,body){return '<div class="fig"><svg viewBox="0 0 '+w+' '+h+'" role="img" aria-label="'+label+'">'+body+'</svg></div>'}

/* ビーカーとはかりの図：はかりの数字＝溶液(青)、液の中の赤い粒＝溶質(赤)。座標は元の絵のまま、viewBoxで切り出す */
function beaker(whole,part,n){
 var dots=[[86,140],[112,162],[140,134],[100,188],[158,174],[130,198],[78,170],[170,152]],s='',w=String(parseFloat(whole))+".0 g";
 s+='<g transform="translate(130,220)">'+
  '<polygon points="-94,18 94,18 78,-9 -78,-9" fill="#d5dae0" stroke="#8a949f" stroke-width="1.5" stroke-linejoin="round"/>'+
  '<rect x="-94" y="18" width="188" height="28" fill="#e6e9ed" stroke="#8a949f" stroke-width="1.5"/>'+
  '<ellipse cx="0" cy="5" rx="66" ry="9" fill="#9aa3ad"/>'+
  '<ellipse cx="0" cy="2" rx="66" ry="9" fill="#b4bbc3" stroke="#8a949f" stroke-width="1.2"/>'+
  '<rect x="14" y="24" width="68" height="16" rx="3" fill="#cfdccb" stroke="#5d6874" stroke-width="1"/>'+
  '<text x="75" y="36" font-size="13" text-anchor="end" style="stroke:none;fill:#26303b;font-family:monospace">'+w+'</text></g>'+
  '<path d="M62,64 V212 A68,8 0 0 0 198,212 V64" fill="#eef4fa" fill-opacity=".5" stroke="#5d6874" stroke-width="2"/>'+
  '<path d="M63,116 V212 A67,8 0 0 0 197,212 V116 Z" fill="#cfe0f3"/>'+
  '<ellipse cx="130" cy="212" rx="68" ry="8" fill="#fff" fill-opacity=".25" stroke="#5d6874" stroke-opacity=".4"/>'+
  '<ellipse cx="130" cy="116" rx="67" ry="7" fill="#bcd6ee" stroke="'+BLUE+'" stroke-width="1.5"/>'+
  '<ellipse cx="130" cy="64" rx="68" ry="8" fill="none" stroke="#5d6874" stroke-width="2"/>';
 var use=n===2?[dots[1],dots[4]]:dots,tg=use[use.length-1];use.forEach(function(d){s+='<circle cx="'+d[0]+'" cy="'+d[1]+'" r="3.5" fill="'+RED+'"/>'});
 s+='<path d="M66,92 h14 M66,116 h14 M66,140 h14 M66,164 h14 M66,188 h14 M66,104 h8 M66,128 h8 M66,152 h8 M66,176 h8 M66,200 h8" stroke="#5d6874" fill="none"/>'+
  '<rect x="72" y="72" width="6" height="134" rx="3" fill="#fff" opacity=".5"/>'+
  '<path d="M214,116 H220 V214 H214" fill="none" stroke="'+BLUE+'" stroke-width="1.5"/>'+
  '<text x="230" y="164" font-size="14" class="v b">溶液(食塩水)</text><text x="230" y="184" font-size="14" class="v b">'+whole+'</text>'+
  '<line x1="232" y1="82" x2="'+tg[0]+'" y2="'+(tg[1]-3)+'" stroke="'+RED+'" stroke-dasharray="4 3"/>'+
  '<text x="236" y="80" font-size="14" class="m b">溶質(食塩)</text><text x="236" y="100" font-size="14" class="m b">'+part+'</text>';
 return '<div class="fig"><svg viewBox="30 44 366 232" role="img" aria-label="ビーカーとはかりの図。はかりが示す溶液(食塩水)は'+whole+'。そのうち、溶けている溶質(食塩)は'+part+'">'+s+'</svg></div>'}

/* 溶質＋溶媒＝溶液 の図(解説の(2)用)。item=[名前,役割,質量] */
function sbox(x,item,kind){
 var f=kind==="m"?PALER:kind==="v"?PALE:"#fff",k=kind==="m"?RED:kind==="v"?BLUE:INK,c=kind==="m"?"m b":kind==="v"?"v b":"b",cx=x+43;
 return '<rect x="'+x+'" y="4" width="86" height="76" rx="6" fill="'+f+'" stroke="'+k+'" stroke-width="1.5"/>'+
  TN(cx,28,15,item[0],"b","middle")+TN(cx,48,16,item[2],c,"middle")+TN(cx,68,12,item[1],c,"middle")}
function sum3(a,b,c,label){
 return svg(320,84,label,sbox(2,a,"m")+TN(102.5,51,22,"＋",null,"middle")+sbox(117,b,"")+TN(217.5,51,22,"＝",null,"middle")+sbox(232,c,"v"))}

function fr(a,b){return '<span class="frac"><span class="m">'+a+'</span><span class="v">'+b+'</span></span>'}
function fp(a,b){return '<span class="frac"><span>'+a+'</span><span>'+b+'</span></span>'}
var S='<span class="m">溶質</span>',Y='<span class="v">溶液</span>';

var BEAKER1=beaker("40g","10g",8),BEAKER5=beaker("100g","5g",2);
var FIG2=sum3(["食塩","溶質","25g"],["水","溶媒","100g"],["食塩水","溶液","125g"],"食塩25gを水100gに溶かすと、食塩水は125gになります");

var SOL1='<p>(1) '+S+'は食塩5g、'+Y+'は食塩水100g。</p>'+BEAKER5+
 '<p>'+fr("5g","100g")+' × 100 ＝ <b>5%</b></p>';
var SOL2='<p>(2) '+Y+'は、水100g ＋ 食塩25g ＝ 食塩水125g。</p>'+FIG2+
 '<p>'+fr("25g","125g")+' × 100 ＝ <b>20%</b><br><span class="note">水100gではなく、食塩水125gで割ります。</span></p>';

var SOL='<p>水を加えても、'+S+'(食塩)の質量は変わりません。これに目をつけます。</p>'+
 '<p>① はじめの食塩の質量<br>100g × '+fp("20","100")+' ＝ <b class="m">20g</b></p>'+
 '<p>② 5%にしたときの食塩水の質量<br>5%は、食塩水100gに食塩5g。食塩20gは5gの4倍なので、食塩水は 100g × 4 ＝ <b class="v">400g</b></p>'+
 '<p>③ 加える水の質量<br>400g − 100g ＝ <b>300g</b></p>';

window.UNIT={
no:"1-3",title:"質量パーセント濃度",
sections:[
{type:"text",point:true,title:"厳選ポイント",html:
 '<p>質量パーセント濃度は、<span class="v" style="white-space:nowrap">溶液</span>の質量のうち、<span class="m" style="white-space:nowrap">溶質</span>の質量が何%かを表したものです。</p>'+BEAKER1+
 '<div class="formula">質量パーセント濃度(%)<br>＝ '+fr("溶質の質量(g)","溶液の質量(g)")+' × 100<br>＝ '+fr("10g","40g")+' × 100 ＝ 25%</div>'+
 '<p class="note">分数や小数は「× 100」で%になります。</p>'},
{type:"problem",title:"問題",
 body:'<p>次の質量パーセント濃度を求めなさい。</p>'+
 '<p>(1) 食塩水100gに、食塩5gが溶けている。</p>'+
 '<p>(2) 水100gに、食塩25gを溶かす。</p>',
 parts:[
  {label:"(1)",unit:"%",type:"number",accept:[5],tol:0.01},
  {label:"(2)",unit:"%",type:"number",accept:[20],tol:0.01}
 ]},
{type:"answer",html:SOL1+SOL2},
{type:"problem",title:"補充問題",
 body:'<p>質量パーセント濃度20%の食塩水100gがある。この食塩水に水を加えて、質量パーセント濃度5%にする。何gの水が必要か。</p>',
 parts:[{label:"答え",unit:"g",type:"number",accept:[300],tol:0.5}],
 solution:SOL}
]};
})();
