(function(){
var INK="#26303b",BLUE="#1f5fa8",RED="#c2410c",PALE="#e3edf8",PALER="#fdefe8";
function TN(x,y,size,txt,cls,anchor){return '<text x="'+x+'" y="'+y+'" font-size="'+size+'" style="stroke:none"'+(anchor?' text-anchor="'+anchor+'"':'')+(cls?' class="'+cls+'"':'')+'>'+txt+'</text>'}
function svg(w,h,label,body){return '<div class="fig"><svg viewBox="0 0 '+w+' '+h+'" role="img" aria-label="'+label+'">'+body+'</svg></div>'}

/* 溶質＋溶媒＝溶液 の図。item=[名前,役割,質量(省略可)] 溶質は赤、溶液は青、溶媒は黒 */
function sbox(x,item,kind){
 var f=kind==="m"?PALER:kind==="v"?PALE:"#fff",k=kind==="m"?RED:kind==="v"?BLUE:INK,c=kind==="m"?"m b":kind==="v"?"v b":"b",cx=x+43;
 var s='<rect x="'+x+'" y="4" width="86" height="76" rx="6" fill="'+f+'" stroke="'+k+'" stroke-width="1.5"/>';
 if(item[2])s+=TN(cx,28,15,item[0],"b","middle")+TN(cx,48,16,item[2],c,"middle")+TN(cx,68,12,item[1],c,"middle");
 else s+=TN(cx,38,16,item[0],"b","middle")+TN(cx,60,13,item[1],c,"middle");
 return s}
function sum3(a,b,c,label){
 var s=sbox(2,a,"m")+TN(102.5,51,22,"＋",null,"middle")+sbox(117,b,"")+TN(217.5,51,22,"＝",null,"middle")+sbox(232,c,"v");
 return svg(320,84,label,s)}

function fr(a,b){return '<span class="frac"><span class="m">'+a+'</span><span class="v">'+b+'</span></span>'}
function fp(a,b){return '<span class="frac"><span>'+a+'</span><span>'+b+'</span></span>'}
var S='<span class="m">溶質</span>',Y='<span class="v">溶液</span>';

var POINT=sum3(["食塩","溶質"],["水","溶媒"],["食塩水","溶液"],"溶質と溶媒を混ぜたものが溶液です。たとえば、溶質の食塩と、溶媒の水を混ぜると、溶液の食塩水になります");

var FIG2=sum3(["食塩","溶質","25g"],["水","溶媒","100g"],["食塩水","溶液","125g"],"食塩25gを水100gに溶かすと、食塩水は125gになります");

var SOL1='<p>(1) '+S+'は食塩5g、'+Y+'は食塩水100g。<br>'+fr("5g","100g")+' × 100 ＝ <b>5%</b></p>';
var SOL2='<p>(2) '+Y+'は、水100g ＋ 食塩25g ＝ 食塩水125g。</p>'+FIG2+
 '<p>'+fr("25g","125g")+' × 100 ＝ <b>20%</b><br><span class="note">水100gではなく、食塩水125gで割ります。</span></p>';

var SOL='<p>水を加えても、'+S+'(食塩)の質量は変わりません。これに目をつけます。</p>'+
 '<p>① はじめの食塩の質量<br>100g × '+fp("20","100")+' ＝ <b class="m">20g</b></p>'+
 '<p>② 5%にしたときの食塩水の質量<br>5%は、食塩水100gに食塩5gという意味です。食塩20gは5gの4倍なので、食塩水も100gの4倍で <b class="v">400g</b>。</p>'+
 '<p>③ 加える水の質量<br>400g − 100g ＝ <b>300g</b></p>';

window.UNIT={
no:"1-3",title:"質量パーセント濃度",
sections:[
{type:"text",point:true,title:"厳選ポイント",html:
 '<p>質量パーセント濃度は、'+Y+'(全体)の質量のうち、'+S+'が何%かを表します。</p>'+POINT+
 '<div class="formula">質量パーセント濃度(%)<br>＝ '+fr("溶質の質量(g)","溶液の質量(g)")+' × 100</div>'+
 '<p class="note">「× 100」で、分数を%に直します。(例：'+fp("1","4")+' ＝ 0.25 → 25%)</p>'},
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
