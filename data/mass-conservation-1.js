(function(){
var INK="#26303b",RED="#c2410c",GRAY="#b4bbc3",LIQ="#cfe0f3",STONE="#9aa5b1";
function n(v){return Math.round(v*10)/10}
function T(x,y,size,txt,cls,anchor){return '<text x="'+n(x)+'" y="'+n(y)+'" font-size="'+size+'"'+(anchor?' text-anchor="'+anchor+'"':'')+(cls?' class="'+cls+'"':'')+'>'+txt+'</text>'}
function line(x1,y1,x2,y2,k,w){return '<line x1="'+n(x1)+'" y1="'+n(y1)+'" x2="'+n(x2)+'" y2="'+n(y2)+'" stroke="'+k+'" stroke-width="'+(w||1)+'"/>'}
function svg(h,label,body){return '<div class="fig"><svg viewBox="0 0 340 '+h+'" role="img" aria-label="'+label+'">'+body+'</svg></div>'}
function right(x1,x2,y){return line(x1,y,x2,y,INK,1.5)+'<path d="M'+n(x2-6)+','+n(y-5)+' L'+n(x2)+','+n(y)+' L'+n(x2-6)+','+n(y+5)+'" fill="none" stroke="'+INK+'" stroke-width="1.5"/>'}
function up(x,y1,y2){return line(x,y1,x,y2,RED,1.5)+'<path d="M'+n(x-5)+','+n(y2+7)+' L'+n(x)+','+n(y2)+' L'+n(x+5)+','+n(y2+7)+'" fill="none" stroke="'+RED+'" stroke-width="1.5"/>'}
/* 容器：中心cx、上はしy0。o.lid＝ふた(閉)、o.open＝ふた(開けて、容器の右上に置く)、o.stone＝石灰石の粒、o.gas＝"in"(中にとどまる)か"out"(外へ逃げる) */
function flask(cx,y0,o){
 var W=60,H=64,x=cx-W/2,s='',i;
 s+='<rect x="'+n(x)+'" y="'+(y0+34)+'" width="'+W+'" height="'+(H-34)+'" fill="'+LIQ+'"/>'+
  '<path d="M'+n(x)+','+y0+' V'+(y0+H)+' H'+n(x+W)+' V'+y0+'" fill="none" stroke="'+INK+'" stroke-width="1.5" stroke-linejoin="round"/>'+
  T(cx,y0+45,11,"塩酸",null,"middle");
 if(o.stone)[[-15,-4],[0,-4],[14,-4],[-7,-9]].forEach(function(p){
  s+='<ellipse cx="'+n(cx+p[0])+'" cy="'+(y0+H+p[1])+'" rx="6" ry="3.5" fill="'+STONE+'" stroke="'+INK+'" stroke-width="1"/>'});
 if(o.lid)s+='<rect x="'+n(x-3)+'" y="'+(y0-6)+'" width="'+(W+6)+'" height="6" fill="'+GRAY+'" stroke="'+INK+'" stroke-width="1.2"/>';
 if(o.open)s+='<rect x="'+n(cx+8)+'" y="'+(y0-6)+'" width="'+(W+6)+'" height="6" fill="'+GRAY+'" stroke="'+INK+'" stroke-width="1.2"/>';
 if(o.gas==="in")s+=T(cx,y0+22,12,"CO₂","m b","middle");
 if(o.gas==="out")s+=up(cx-14,y0-4,y0-24)+up(cx-2,y0-4,y0-24)+T(cx-20,y0-10,12,"CO₂","m b","end");
 return s}

/* 厳選ポイントの図：ふたを閉めたときと、開けたとき(数字なし)。左に、石灰石と塩酸の名前 */
function figPoint(){
 var y0=60,s=T(110,20,13,"ふたを閉める","b","middle")+T(264,20,13,"ふたを開ける","b","middle")+
  flask(110,y0,{lid:true,stone:true,gas:"in"})+flask(250,y0,{open:true,gas:"out"})+
    line(44,y0+66,97,y0+58,INK,1)+'<circle cx="97" cy="'+(y0+58)+'" r="2.5" fill="'+INK+'"/>'+T(4,y0+71,12,"石灰石","g")+
  T(110,150,14,"質量は変わらない","b","middle")+T(250,150,14,'質量が<tspan class="m">減る</tspan>',"b","middle");
 return svg(162,"容器に、うすい塩酸と石灰石を入れて反応させる図。左は、ふたを閉めた容器で、二酸化炭素が中にとどまり、質量は変わらない。右は、ふたを開けた容器で、ふたは横にずれていて、3分の2が容器の右の外にある、二酸化炭素が外へ逃げ、質量が減る。容器の中は、塩酸と石灰石",s)}

/* 問題・解答の図：反応前(500g)→反応後(密閉)→ふたを開けた(495g)。show＝答えを入れる */
function figQ(show){
 var y0=68,X=[52,152,258],s=T(X[0],20,13,"反応前(密閉)","b","middle")+T(X[1],20,13,"反応後(密閉)","b","middle")+T(X[2]+14,20,13,"ふたを開けた","b","middle")+
  flask(X[0],y0,{lid:true,stone:true})+flask(X[1],y0,{lid:true,gas:"in"})+flask(X[2],y0,{open:true,gas:"out"})+
  right(X[0]+36,X[1]-36,y0+30)+right(X[1]+36,X[2]-36,y0+30)+
  T(X[0],154,17,"500g","b","middle")+T(X[1],154,17,show?"500g":"(1)","b","middle")+T(X[2],154,17,"495g","b","middle");
 if(show)s+=T(X[2],178,14,"5g逃げた","m b","middle");
 return svg(show?188:166,"左から、反応前の密閉した容器が500g。容器の中は、塩酸と石灰石。反応後の密閉した容器の質量が"+(show?"500g":"(1)")+"。ふたを開けると、二酸化炭素が逃げて、質量は495gになる"+(show?"。逃げた気体は5g":""),s)}

/* 表 */
function tbl(rows){
 return '<div style="overflow-x:auto"><table style="margin:0">'+rows.map(function(r){
  return '<tr>'+r.map(function(c,j){return (j?'<td>':'<th>')+c+(j?'</td>':'</th>')}).join('')+'</tr>'}).join('')+'</table></div>'}
var R1=["加えた石灰石の質量(g)","1.0","2.0","3.0","4.0"],R2=["反応後の容器全体の質量(g)","100.6","101.2","101.8","102.8"];
function M(t){return '<span class="m">'+t+'</span>'}
var R3=[M("発生した二酸化炭素の質量(g)"),M("0.4"),M("0.8"),M("1.2"),M("1.2")];
var R3B=[M("発生した二酸化炭素の質量(g)"),"&nbsp;","&nbsp;","&nbsp;","&nbsp;"];
var SM='<p class="note" style="font-size:.8rem;margin:.2rem 0">';
var TIP='気体が発生する問題では、逃げた気体の質量を、表に書き込みましょう。';

var POINT='<p>質量保存の法則：化学変化の前後で、物質全体の質量は変わらない。</p>'+
 '<p>うすい塩酸に石灰石(主成分は炭酸カルシウム)を入れると、'+M('二酸化炭素')+'が発生します。</p>'+figPoint()+
 '<p>ふたを開けると、気体が逃げて、質量が減ります。</p>'+
 '<div class="formula">減った質量 ＝ '+M('発生した気体の質量')+'</div>'+
 '<p><b>'+TIP+'</b></p>';

var QBODY='<p>密閉した容器にうすい塩酸と石灰石を入れて反応させた。反応前の容器全体の質量は500gだった。</p>'+figQ(false)+
 '<p>(1) 反応後の密閉した容器全体の質量を答えよ。</p>'+
 '<p>(2) 反応後、容器のふたを一度開け、再び閉めて全体の質量をはかると495gだった。発生した気体の質量を求めよ。</p>'+
 SM+'※ 図の灰色の粒は、石灰石です。</p>';

var ANS=figQ(true)+
 '<p>(1) 密閉していると、質量は変わらない。<b>500g</b></p>'+
 '<p>(2) 500g(密閉) − 495g(ふたを開けたあと) ＝ <b class="m">5g</b></p>';

var SBODY='<p>うすい塩酸を入れた容器全体の質量をはかったところ100.0gであった。この容器に質量を変えた石灰石をそれぞれ加え、完全に反応させた後、容器全体の質量を測定した。次の表はその結果である。</p>'+tbl([R1,R2,R3B])+
 SM+'※ '+TIP+'</p>'+
 '<p>(1) 1.0gの石灰石を加えたとき、発生した二酸化炭素の質量は何gか。</p>'+
 '<p>(2) このうすい塩酸と過不足なく反応する石灰石の質量は何gか。</p>'+
 '<p>(3) 4.0gの石灰石を加えたとき、反応せずに残った石灰石は何gか。</p>';

var SOL2='<p>発生した二酸化炭素は、(100.0g + 石灰石) − 反応後の質量 で求め、表に書き込みます。</p>'+tbl([R1,R2,R3])+
 '<p>(1) 101.0 − 100.6 ＝ <b class="m">0.4g</b></p>'+
 '<p>(2) 二酸化炭素は、石灰石が3.0gのとき1.2gになり、それ以上は増えない。<b>3.0g</b></p>'+
 '<p>(3) 4.0g − 3.0g ＝ <b>1.0g</b></p>';

window.UNIT={
no:"2-7",title:"質量保存の法則(気体が発生する反応)",
sections:[
{type:"text",point:true,title:"厳選ポイント",html:POINT},
{type:"problem",title:"問題",body:QBODY,
 parts:[
  {label:"(1)",unit:"g",type:"number",accept:[500],tol:0.5},
  {label:"(2)",unit:"g",type:"number",accept:[5],tol:0.05}
 ]},
{type:"answer",html:ANS},
{type:"problem",title:"補充問題",body:SBODY,
 parts:[
  {label:"(1)",unit:"g",type:"number",accept:[0.4],tol:0.005},
  {label:"(2)",unit:"g",type:"number",accept:[3],tol:0.05},
  {label:"(3)",unit:"g",type:"number",accept:[1],tol:0.05}
 ],
 solution:SOL2}
]};
})();
