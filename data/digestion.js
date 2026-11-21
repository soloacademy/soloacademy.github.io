(function(){
var INK="#26303b",GRAY="#8a949f",FILL="#eceff2";
function n(v){return Math.round(v*10)/10}
function T(x,y,size,txt,cls,anchor){return '<text x="'+n(x)+'" y="'+n(y)+'" font-size="'+size+'"'+(anchor?' text-anchor="'+anchor+'"':'')+(cls?' class="'+cls+'"':'')+'>'+txt+'</text>'}
function TN(x,y,size,txt,cls,anchor){return '<text x="'+n(x)+'" y="'+n(y)+'" font-size="'+size+'" style="stroke:none"'+(anchor?' text-anchor="'+anchor+'"':'')+(cls?' class="'+cls+'"':'')+'>'+txt+'</text>'}
function line(x1,y1,x2,y2,k,w){return '<line x1="'+n(x1)+'" y1="'+n(y1)+'" x2="'+n(x2)+'" y2="'+n(y2)+'" stroke="'+k+'" stroke-width="'+(w||1)+'"/>'}
function svg(h,label,body){return '<div class="fig"><svg viewBox="0 0 340 '+h+'" role="img" aria-label="'+label+'">'+body+'</svg></div>'}
/* 矢印：x1からx2へ(x2が左なら左向き) */
function arrow(x1,x2,y){var d=x2>x1?1:-1;
 return line(x1,y,x2,y,INK,1.5)+'<path d="M'+n(x2-d*6)+','+n(y-5)+' L'+n(x2)+','+n(y)+' L'+n(x2-d*6)+','+n(y+5)+'" fill="none" stroke="'+INK+'" stroke-width="1.5"/>'}
function ld(x1,y1,x2,y2){return line(x1,y1,x2,y2,INK,1)+'<circle cx="'+n(x2)+'" cy="'+n(y2)+'" r="2.5" fill="'+INK+'"/>'}
function box(id,cx,cy,w,h,fs){
 return '<g class="bl" data-b="'+id+'"><rect x="'+n(cx-w/2)+'" y="'+n(cy-h/2)+'" width="'+w+'" height="'+h+'" rx="4"/>'+
  '<text class="bt" x="'+n(cx)+'" y="'+n(cy+fs*.36)+'" font-size="'+fs+'" text-anchor="middle"></text>'+
  '<text class="bm" x="'+n(cx+w/2-2)+'" y="'+n(cy-h/2+10)+'" font-size="12" text-anchor="end"></text></g>'}

/* ---------- 図1：消化の表。mode＝"point"(全部書く)、"blank"(問題：空欄)、"ans"(解答)。酵素＝青、分解後の物質＝赤 ---------- */
var R=[
 {nm:"デンプン",ls:["だ液","すい液"],es:["アミラーゼ","アミラーゼ"],res:"ブドウ糖",bl:["a1","a4"]},
 {nm:"タンパク質",ls:["胃液","すい液"],es:["ペプシン","トリプシン"],res:"アミノ酸",bl:["a2","a5"]},
 {nm:"脂肪",ls:["すい液","胆汁"],es:["リパーゼ",""],res:"脂肪酸とモノグリセリド",bl:["a3","a6"]}];
function fig1(mode){
 var b=mode==="blank",s=T(132,14,11,"消化液(酵素)","g","middle")+T(264,14,11,"分解後","g","middle");
 R.forEach(function(r,i){var cy=56+64*i,fs=r.res.length>8?12:14;
  s+=T(37,cy+5,14,r.nm,"b","middle")+arrow(78,186,cy);
  if(b)s+=T(132,cy-7,12,r.ls[0],null,"middle")+box(r.bl[0],132,cy+17,84,24,13)+box(r.bl[1],264,cy,144,28,fs-1);
  else{
   s+=T(132,cy-7,11,r.ls[0]+'(<tspan class="v b">'+r.es[0]+'</tspan>)',null,"middle");
   s+=r.es[1]?T(132,cy+17,11,r.ls[1]+'(<tspan class="v b">'+r.es[1]+'</tspan>)',null,"middle"):T(132,cy+17,11,"胆汁(酵素なし)","g","middle");
   s+=TN(264,cy+5,fs,r.res,"m b","middle")}});
 return svg(214,b?
  "消化の表。デンプン、タンパク質、脂肪の3行。各行に、消化液の名前が1つ(だ液、胃液、すい液)と、酵素の空欄がある。右に、分解後の物質の空欄がある。空欄は6つ":
  "消化の表。デンプンは、だ液のアミラーゼとすい液のアミラーゼで、ブドウ糖になる。タンパク質は、胃液のペプシンとすい液のトリプシンで、アミノ酸になる。脂肪は、すい液のリパーゼで、脂肪酸とモノグリセリドになる。胆汁は、酵素をふくまない。酵素は青、分解後の物質は赤",s)}

/* ---------- 図2：柔毛(1本)。ブドウ糖・アミノ酸は毛細血管へ、脂肪酸とモノグリセリドはリンパ管へ ---------- */
function fig2(){
 var s='<path d="M140,200 V62 A30,30 0 0 1 200,62 V200" fill="#fff" stroke="'+INK+'" stroke-width="1.5"/>'+
  '<path d="M152,198 V84 Q152,72 160,72 Q168,72 168,84 V198" fill="none" stroke="'+INK+'" stroke-width="1.5"/>'+
  '<path d="M176,198 V74 Q176,64 183,64 Q190,64 190,74 V198" fill="'+FILL+'" stroke="'+INK+'" stroke-width="1.5"/>'+
  line(90,200,250,200,GRAY,1)+T(170,216,11,"小腸のかべ","g","middle")+
  T(170,16,14,"柔毛","b","middle")+ld(170,22,170,33)+
  T(4,100,14,"ブドウ糖","m b")+T(4,120,14,"アミノ酸","m b")+arrow(80,146,110)+
  T(336,100,14,"脂肪酸と","m b","end")+T(336,120,14,"モノグリセリド","m b","end")+arrow(236,194,110)+
  T(4,172,13,"毛細血管","b")+ld(66,168,153,168)+
  T(336,172,13,"リンパ管","b","end")+ld(272,168,191,168);
 return svg(226,"柔毛の図。小腸のかべから、柔毛が1本のびている。中に、毛細血管(左)と、リンパ管(右)がある。ブドウ糖とアミノ酸は、毛細血管へ。脂肪酸とモノグリセリドは、リンパ管へ入る",s)}

/* ---------- 文章 ---------- */
var SM='<p class="note" style="font-size:.8rem;margin:.2rem 0">';
var POINT='<p>食べ物の栄養は、消化液にふくまれる<b>消化酵素</b>のはたらきで、吸収できる小さな物質に分解されます。</p>'+fig1("point")+
 SM+'※ 胆汁は、消化酵素をふくみません。脂肪の消化を助けます。</p>'+
 '<p>分解された物質は、小腸の壁にある<b>柔毛</b>から吸収されます。</p>'+fig2()+
 SM+'※ 脂肪酸とモノグリセリドは、柔毛の中で、脂肪にもどってから、リンパ管に入ります。</p>';

var QBODY='<p>消化の表です。空欄に入る言葉を、下の語群から選びなさい。</p>';
var ANS={a1:"アミラーゼ",a2:"ペプシン",a3:"リパーゼ",a4:"ブドウ糖",a5:"アミノ酸",a6:"脂肪酸とモノグリセリド"};
var CH=["ブドウ糖","トリプシン","アミノ酸","胆汁","脂肪酸とモノグリセリド","柔毛","アミラーゼ","リパーゼ","脂肪","ペプシン"];
var ANSW=fig1("ans")+'<p>酵素は、分解する物質ごとに決まっています。</p>';

var SBODY='<p>吸収された物質は、柔毛の中の何に入るか。丸をタップして選びなさい。</p>';
var SOL2=fig2()+'<p>ブドウ糖：<b>毛細血管</b><br>アミノ酸：<b>毛細血管</b><br>脂肪酸など：<b>リンパ管</b>(柔毛の中で、脂肪にもどる)</p>';

window.UNIT={
no:"2-14",title:"消化と吸収",
sections:[
{type:"text",point:true,title:"厳選ポイント",html:POINT},
{type:"problem",title:"問題",body:QBODY,
 parts:[{type:"tree",svg:fig1("blank"),answers:ANS,choices:CH}]},
{type:"answer",html:ANSW},
{type:"problem",title:"補充問題",body:SBODY,
 parts:[
  {label:"ブドウ糖",type:"choice",choices:["毛細血管","リンパ管"],accept:["毛細血管"]},
  {label:"アミノ酸",type:"choice",choices:["毛細血管","リンパ管"],accept:["毛細血管"]},
  {label:"脂肪酸など",type:"choice",choices:["毛細血管","リンパ管"],accept:["リンパ管"]}
 ],
 solution:SOL2}
]};
})();
