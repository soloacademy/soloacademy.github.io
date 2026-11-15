(function(){
var RULE="#c9d0d7";
function n(v){return Math.round(v*10)/10}
function T(x,y,size,txt,cls,anchor){return '<text x="'+n(x)+'" y="'+n(y)+'" font-size="'+size+'"'+(anchor?' text-anchor="'+anchor+'"':'')+(cls?' class="'+cls+'"':'')+'>'+txt+'</text>'}
function line(x1,y1,x2,y2,k,w){return '<line x1="'+n(x1)+'" y1="'+n(y1)+'" x2="'+n(x2)+'" y2="'+n(y2)+'" stroke="'+k+'" stroke-width="'+(w||1)+'"/>'}
function svg(h,label,body){return '<div class="fig"><svg viewBox="0 0 340 '+h+'" role="img" aria-label="'+label+'">'+body+'</svg></div>'}
/* 色：まえの元素＝赤(m)、うしろの元素＝青(v) */
function M(t){return '<span class="m">'+t+'</span>'}
function V(t){return '<span class="v">'+t+'</span>'}
function sm(t){return '<tspan class="m">'+t+'</tspan>'}
function sv(t){return '<tspan class="v">'+t+'</tspan>'}

/* ---------- 厳選ポイントの図：酸化亜鉛を、うしろから書く ---------- */
function figOrder(){
 var s=T(8,28,20,sm("酸化")+sv("亜鉛"),"b")+line(4,44,336,44,RULE)+
  T(8,76,15,"① "+sv("亜鉛")+"を書く")+T(290,82,24,"Zn","v b","middle")+
  line(4,96,336,96,RULE)+
  T(8,126,15,"② "+sm("酸素")+"を書いて完成")+T(290,132,24,sv("Zn")+sm("O"),"b","middle")+
  line(4,146,336,146,RULE);
 return svg(152,"酸化亜鉛の化学式の書き方。名前は、まえが酸化、うしろが亜鉛。1番目に、うしろの亜鉛を書いて、Zn。2番目に、まえの酸素を書いて完成、ZnO",s)}

/* ---------- 解答の図：4問を4行にまとめる ----------
   行：{k:(1)など, a:まえ(酸化など), b:うしろ(銅など), f1:1番目に書く記号, f2:まえの記号} */
function figAns(rows,label){
 var s=T(215,20,15,"①","b","middle")+T(290,20,15,"②","b","middle")+line(4,30,336,30,RULE),i,r,yc,txt=[];
 for(i=0;i<rows.length;i++){r=rows[i];yc=52+34*i;
  s+=T(8,yc+5.5,15,r.k)+T(36,yc+5.5,15,sm(r.a)+sv(r.b),"b")+
   T(215,yc+7,20,r.f1,"v b","middle")+T(290,yc+7,20,sv(r.f1)+sm(r.f2),"b","middle")+
   line(4,yc+17,336,yc+17,RULE);
  txt.push(r.k+" "+r.a+r.b+"は、"+r.f1+"を書いて、"+r.f1+r.f2)}
 return svg(52+34*(rows.length-1)+24,label+txt.join("。")+"。",s)}

var R1=[
 {k:"(1)",a:"酸化",b:"銅",f1:"Cu",f2:"O"},
 {k:"(2)",a:"酸化",b:"マグネシウム",f1:"Mg",f2:"O"},
 {k:"(3)",a:"塩化",b:"ナトリウム",f1:"Na",f2:"Cl"},
 {k:"(4)",a:"硫化",b:"鉄",f1:"Fe",f2:"S"}];
var R2=[
 {k:"(1)",a:"酸化",b:"カルシウム",f1:"Ca",f2:"O"},
 {k:"(2)",a:"塩化",b:"銀",f1:"Ag",f2:"Cl"},
 {k:"(3)",a:"硫化",b:"亜鉛",f1:"Zn",f2:"S"},
 {k:"(4)",a:"塩化",b:"水素",f1:"H",f2:"Cl"}];
var FIG1=figAns(R1,"化学式の書き方の表。1番目に、うしろの元素を書き、2番目に、まえの元素を書き足す。");
var FIG2=figAns(R2,"化学式の書き方の表。1番目に、うしろの元素を書き、2番目に、まえの元素を書き足す。");
var STEP='<p>① '+V('うしろ')+'の元素を書く<br>② '+M('まえ')+'の元素を書き足す</p>';

/* ---------- 厳選ポイントの表：名前の読み方 ---------- */
var TD='<td style="padding:.3rem .5rem;text-align:left">';
var TB='<div style="overflow-x:auto"><table>'+
 '<tr>'+TD+'<b>'+M('酸化')+V('○○')+'</b></td>'+TD+M('酸素')+'(O)が化合した'+V('○○')+'</td></tr>'+
 '<tr>'+TD+'<b>'+M('塩化')+V('○○')+'</b></td>'+TD+M('塩素')+'(Cl)が化合した'+V('○○')+'</td></tr>'+
 '<tr>'+TD+'<b>'+M('硫化')+V('○○')+'</b></td>'+TD+M('硫黄')+'(S)が化合した'+V('○○')+'</td></tr></table></div>';
var SM='<p class="note" style="font-size:.8rem;margin:.2rem 0">';
var POINT='<p>化合物は、2種類以上の異なる元素が結びついてできた物質です。</p>'+TB+
 '<p>化学式は、<b>うしろ</b>から書きます。</p>'+figOrder()+
 SM+'※ 化学式に「2」がつく化合物は、あとの単元で学びます。</p>';

var QBODY='<p>次の化合物の化学式を、選択肢から選びなさい。</p>';
var TIGHT='<style>.pick .pk-bt{gap:.4rem}.pick button.choice{padding:.1rem .55rem;min-width:2.6rem}</style>';
var ANS=FIG1+STEP;
var SOL2=FIG2+STEP;

window.UNIT={
no:"2-2",title:"化学式(化合物①)",
sections:[
{type:"text",point:true,title:"厳選ポイント",html:POINT},
{type:"problem",title:"問題",body:TIGHT+QBODY,
 parts:[
  {label:"(1)",text:"酸化銅",type:"pick",choices:["CuS","OCu","CuO","ZnO"],accept:["CuO"]},
  {label:"(2)",text:"酸化マグネシウム",type:"pick",choices:["MgO","MgS","BaO","OMg"],accept:["MgO"]},
  {label:"(3)",text:"塩化ナトリウム",type:"pick",choices:["ClK","NaCl","KCl","ClNa"],accept:["NaCl"]},
  {label:"(4)",text:"硫化鉄",type:"pick",choices:["SFe","CuS","MgS","FeS"],accept:["FeS"]}
 ]},
{type:"answer",html:ANS},
{type:"problem",title:"補充問題",body:QBODY,
 parts:[
  {label:"(1)",text:"酸化カルシウム",type:"pick",choices:["OCa","CaO","ZnO","CaS"],accept:["CaO"]},
  {label:"(2)",text:"塩化銀",type:"pick",choices:["AgCl","ClAg","ClK","KCl"],accept:["AgCl"]},
  {label:"(3)",text:"硫化亜鉛",type:"pick",choices:["SZn","ZnO","ZnS","CaS"],accept:["ZnS"]},
  {label:"(4)",text:"塩化水素",type:"pick",choices:["ClNa","HCl","NaCl","ClH"],accept:["HCl"]}
 ],
 solution:SOL2}
]};
})();
