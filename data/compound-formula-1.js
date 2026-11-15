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

/* ---------- 厳選ポイントの図：酸化銅を、うしろから書く ---------- */
function figOrder(){
 var s=T(8,28,20,sm("酸化")+sv("銅"),"b")+line(4,44,336,44,RULE)+
  T(8,76,15,"① "+sv("銅")+"を書く")+T(290,82,24,"Cu","v b","middle")+
  line(4,96,336,96,RULE)+
  T(8,126,15,"② "+sm("酸素")+"を書いて完成")+T(290,132,24,sv("Cu")+sm("O"),"b","middle")+
  line(4,146,336,146,RULE);
 return svg(152,"酸化銅の化学式の書き方。名前は、まえが酸化、うしろが銅。1番目に、うしろの銅を書いて、Cu。2番目に、まえの酸素を書いて完成、CuO",s)}

/* ---------- 解答：完成した化学式と、小さい文 ----------
   行：{k:(1)など, a:まえ(酸化など), b:うしろ(銅など), f1:うしろの記号, f2:まえの記号} */
var EL={"酸化":"酸素","塩化":"塩素","硫化":"硫黄"};
function ansRows(rows){
 var sm='font-size:.8rem;margin:.1rem 0 0;padding-left:2rem;color:var(--muted)';
 return '<div style="margin:.4rem 0 .8rem">'+rows.map(function(r){
  return '<p style="margin:.9rem 0 0">'+r.k+' '+M(r.a)+V(r.b)+'</p>'+
   '<p style="'+sm+'">① '+V(r.b)+'を書く　'+V(r.f1)+'</p>'+
   '<p style="'+sm+'">② '+M(EL[r.a])+'を書いて完成　'+V(r.f1)+M(r.f2)+'</p>'}).join('')+'</div>'}

var R1=[
 {k:"(1)",a:"酸化",b:"マグネシウム",f1:"Mg",f2:"O"},
 {k:"(2)",a:"酸化",b:"亜鉛",f1:"Zn",f2:"O"},
 {k:"(3)",a:"塩化",b:"ナトリウム",f1:"Na",f2:"Cl"},
 {k:"(4)",a:"硫化",b:"鉄",f1:"Fe",f2:"S"}];
var R2=[
 {k:"(1)",a:"酸化",b:"カルシウム",f1:"Ca",f2:"O"},
 {k:"(2)",a:"塩化",b:"銀",f1:"Ag",f2:"Cl"},
 {k:"(3)",a:"硫化",b:"亜鉛",f1:"Zn",f2:"S"},
 {k:"(4)",a:"塩化",b:"水素",f1:"H",f2:"Cl"}];

/* ---------- 厳選ポイント：名前の読み方(罫線なしの3行) ---------- */
function rd(a,el,b){return '<p style="margin:.7rem 0"><b>'+M(a)+V(b)+'</b><span style="font-size:.7rem;white-space:nowrap;margin-left:.4rem">◀ '+M(el)+'が化合('+M(a)+')した'+V(b)+'</span></p>'}
var RD='<div style="margin:.6rem 0 1rem">'+rd('酸化','酸素','銅')+rd('塩化','塩素','ナトリウム')+rd('硫化','硫黄','鉄')+'</div>';
var SM='<p class="note" style="font-size:.8rem;margin:.2rem 0">';
var POINT='<p>化合物は、2種類以上の異なる元素が結びついてできた物質です。</p>'+RD+
 '<p>化学式は、<b>うしろ</b>から書きます。</p>'+figOrder()+
 SM+'※ 化学式に「2」がつく化合物は、あとの単元で学びます。</p>';

var QBODY='<p>次の化合物の化学式を、選択肢から選びなさい。</p>';
var TIGHT='<style>.pick .pk-bt{gap:.4rem}.pick button.choice{padding:.1rem .55rem;min-width:2.6rem}</style>';
var ANS=ansRows(R1);
var SOL2=ansRows(R2);

window.UNIT={
no:"2-2",title:"化学式(化合物①)",
sections:[
{type:"text",point:true,title:"厳選ポイント",html:POINT},
{type:"problem",title:"問題",body:TIGHT+QBODY,
 parts:[
  {label:"(1)",text:"酸化マグネシウム",type:"pick",choices:["MgS","MgO","BaO","OMg"],accept:["MgO"]},
  {label:"(2)",text:"酸化亜鉛",type:"pick",choices:["OZn","BaO","ZnS","ZnO"],accept:["ZnO"]},
  {label:"(3)",text:"塩化ナトリウム",type:"pick",choices:["NaCl","ClK","KCl","ClNa"],accept:["NaCl"]},
  {label:"(4)",text:"硫化鉄",type:"pick",choices:["SFe","CuS","FeS","MgS"],accept:["FeS"]}
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
