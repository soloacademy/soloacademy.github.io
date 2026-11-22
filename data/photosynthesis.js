(function(){
var INK="#26303b",MUTED="#5d6874",GRAY="#8a949f",RULE="#c9d0d7",GREEN="#d9edcf",PL="#4f8a45",PS="#3f7a3a",FOIL="#c9d0d7";
/* 液の色：BTB溶液の本物の色(この単元では、色は液だけ) */
var LB="#8bb8e8",LG="#9ccf86",LY="#f5dd6a";
function n(v){return Math.round(v*10)/10}
function T(x,y,size,txt,cls,anchor){return '<text x="'+n(x)+'" y="'+n(y)+'" font-size="'+size+'"'+(anchor?' text-anchor="'+anchor+'"':'')+(cls?' class="'+cls+'"':'')+'>'+txt+'</text>'}
/* 色つきの面の上の文字：まわりの白いふちを消す */
function TN(x,y,size,txt,cls,anchor){return '<text x="'+n(x)+'" y="'+n(y)+'" font-size="'+size+'" style="stroke:none"'+(anchor?' text-anchor="'+anchor+'"':'')+(cls?' class="'+cls+'"':'')+'>'+txt+'</text>'}
function line(x1,y1,x2,y2,k,w){return '<line x1="'+n(x1)+'" y1="'+n(y1)+'" x2="'+n(x2)+'" y2="'+n(y2)+'" stroke="'+k+'" stroke-width="'+(w||1)+'"/>'}
function svg(h,label,body){return '<div class="fig"><svg viewBox="0 0 340 '+h+'" role="img" aria-label="'+label+'">'+body+'</svg></div>'}
function svgY(y0,h,label,body){return '<div class="fig" style="margin:.4rem 0"><svg viewBox="0 '+y0+' 340 '+h+'" role="img" aria-label="'+label+'">'+body+'</svg></div>'}
function arrow(x1,x2,y){return line(x1,y,x2,y,INK,1.5)+'<path d="M'+(x2-6)+','+(y-5)+' L'+x2+','+y+' L'+(x2-6)+','+(y+5)+'" fill="none" stroke="'+INK+'" stroke-width="1.5"/>'}

/* ---------- 厳選ポイントの図0：光合成の式。葉緑体(緑の角丸四角)の中を矢印が通り、始点と終点は四角の外。四角の上から、光が当たる(短い矢印3本) ---------- */
function ray(x){return line(x,26,x,42,INK,1.5)+'<path d="M'+(x-4)+',36 L'+x+',42 L'+(x+4)+',36" fill="none" stroke="'+INK+'" stroke-width="1.5"/>'}
function figEq(){
 var s=T(186,16,15,"光","b","middle")+ray(170)+ray(186)+ray(202)+
  '<rect x="152" y="44" width="68" height="54" rx="10" fill="'+GREEN+'" stroke="'+INK+'" stroke-width="1.2"/>'+
  T(16,67,15,"二酸化炭素＋水","b")+arrow(134,238,62)+T(248,67,15,"栄養＋酸素","b")+
  TN(186,88,13,"葉緑体",null,"middle")+T(248,86,11,"(デンプンなど)","g");
 return svg(106,"光合成の式。二酸化炭素と水から、栄養と酸素ができる。矢印は、葉緑体を表す、角の丸い四角の中を通り、始まりと終わりは四角の外にある。四角の上から、光が当たっている。栄養は、デンプンなど",s)}

/* ---------- 厳選ポイントの図1：昼と夜(光が当たる・当たらない)で、植物の中のはたらきを並べる。呼吸は、どちらでも行われる ---------- */
function dnPanel(x0,title,ps,cap){
 var s=T(x0+80,20,15,title,"b","middle")+
  '<rect x="'+x0+'" y="34" width="160" height="118" rx="8" fill="'+(ps?"#fff":"#d3d9df")+'" stroke="'+INK+'" stroke-width="1.2"/>'+
  '<rect x="'+(x0+12)+'" y="44" width="136" height="46" rx="6" fill="#fff" stroke="'+(ps?INK:GRAY)+'" stroke-width="'+(ps?1.2:1)+'"'+(ps?'':' stroke-dasharray="4 3"')+'/>'+
  TN(x0+80,61,12,"光合成",ps?"b":"g","middle")+TN(x0+80,82,ps?14:13,ps?"二酸化炭素 → 酸素":"行われない",ps?null:"g","middle")+
  '<rect x="'+(x0+12)+'" y="98" width="136" height="46" rx="6" fill="#fff" stroke="'+INK+'" stroke-width="1.2"/>'+
  TN(x0+80,115,12,"呼吸","b","middle")+TN(x0+80,134,11,"酸素 → 二酸化炭素",null,"middle")+
  T(x0+80,176,14,cap,"b","middle");
 return s}
function figDN(){
 return svg(186,"光が当たるときと、当たらないときの、植物のはたらきの図。左の、光が当たるときは、光合成で二酸化炭素が入って酸素が出て、呼吸で酸素が入って二酸化炭素が出る。光合成と呼吸の、両方が行われる。右の、光が当たらないときは、光合成は行われず、呼吸だけが行われる。呼吸は、どちらのときも行われる。光合成の気体は大きく、呼吸の気体は小さく書いてある",
  dnPanel(4,"光が当たる",true,"光合成と呼吸")+dnPanel(176,"光が当たらない",false,"呼吸だけ"))}

/* ---------- 厳選ポイントの図3：BTB溶液の3本の試験管。真ん中の緑色(息を吹き込んだ液)から、二酸化炭素が増えると黄色、減ると青色 ---------- */
function larrow(x1,x2,y){return line(x1,y,x2,y,INK,1.5)+'<path d="M'+(x2+6)+','+(y-5)+' L'+x2+','+y+' L'+(x2+6)+','+(y+5)+'" fill="none" stroke="'+INK+'" stroke-width="1.5"/>'}
function figTubes(){
 var X=[40,170,300],col=[LB,LG,LY],nm=["青色","緑色","黄色"],s='',i;
 for(i=0;i<3;i++)s+=tube(X[i],col[i],0,false)+T(X[i],154,15,nm[i],"b","middle");
 s+=larrow(138,72,86)+T(105,72,11.5,"二酸化炭素が",null,"middle")+T(105,108,14,"減る","b","middle")+
  arrow(202,268,86)+T(235,72,11.5,"二酸化炭素が",null,"middle")+T(235,108,14,"増える","b","middle");
 return svgY(26,140,"BTB溶液の試験管が3本。左から、青色、緑色、黄色。真ん中の緑色は、息を吹き込んだ液。二酸化炭素が増えると、右の黄色になる。二酸化炭素が減ると、左の青色にもどる",s)}

/* ---------- 問題・解答の図：試験管A〜C ----------
   show=false：問題の図(3本とも緑。Bはアルミホイルで包んである)。show=true：解答の図(色が変わり、二酸化炭素の増減を書く) */
function plant(cx){
 var s=line(cx,122,cx,70,PS,1.5),i,sg,yy;
 [[-1,108],[1,98],[-1,88],[1,78]].forEach(function(p){sg=p[0];yy=p[1];
  s+='<ellipse cx="'+(cx+sg*7)+'" cy="'+yy+'" rx="6" ry="2.8" transform="rotate('+(-30*sg)+' '+(cx+sg*7)+' '+yy+')" fill="'+PL+'"/>'});
 return s}
function tube(cx,liq,hasPlant,foil){
 var w=44,x=cx-w/2,y=34,yb=y+100-22,s='';
 s+='<path d="M'+x+',58 H'+(x+w)+' V'+yb+' A22,22 0 0 1 '+x+','+yb+' Z" fill="'+liq+'"/>';
 if(hasPlant)s+=plant(cx);
 s+='<path d="M'+x+','+y+' V'+yb+' A22,22 0 0 0 '+(x+w)+','+yb+' V'+y+'" fill="none" stroke="'+INK+'" stroke-width="1.5" stroke-linecap="round"/>';
 if(foil){
  s+='<path d="M'+(x-1.5)+','+(y+10)+' V'+yb+' A23.5,23.5 0 0 0 '+(x+w+1.5)+','+yb+' V'+(y+10)+' Z" fill="'+FOIL+'" stroke="'+INK+'" stroke-width="1.5" stroke-linejoin="round"/>'+
   line(x+8,y+30,x+16,y+22,GRAY,1)+line(x+24,y+40,x+34,y+30,GRAY,1)+line(x+10,y+62,x+20,y+52,GRAY,1)+line(x+26,y+76,x+34,y+68,GRAY,1)}
 return s}
function figQ(show){
 var X=[56,170,284],L=["A","B","C"],c1=["オオカナダモ","オオカナダモ","オオカナダモなし"],c2=["光を当てる","アルミホイルで包む","光を当てる"],
  liq=show?[LB,LY,LG]:[LG,LG,LG],pl=[1,1,0],R1=["青色","黄色","緑色"],R2=["減る","増える","変わらない"],R3=["光合成 &gt; 呼吸","呼吸だけ","植物なし"],s='',i;
 for(i=0;i<3;i++){
  s+=T(X[i],20,16,L[i],"b","middle")+tube(X[i],liq[i],pl[i],!show&&i===1)+
   T(X[i],158,12.5,c1[i],null,"middle")+T(X[i],176,12.5,c2[i],null,"middle");
  if(show)s+=T(X[i],210,16,R1[i],"b","middle")+T(X[i],232,12.5,"二酸化炭素",null,"middle")+T(X[i],250,14,R2[i],"b","middle")+T(X[i],272,12,R3[i],"g","middle")}
 if(show)s+=line(4,188,336,188,RULE,1);
 return svg(show?282:190,show?
  "試験管A〜Cの図。Aは、オオカナダモを入れて光を当てた。液は青色になり、二酸化炭素は減る。光合成のほうが呼吸より多い。Bは、オオカナダモを入れてアルミホイルで包んだ。液は黄色になり、二酸化炭素は増える。呼吸だけをしている。Cは、オオカナダモを入れずに光を当てた。液は緑色のままで、二酸化炭素は変わらない":
  "試験管A〜Cの図。3本とも、息を吹き込んで緑色にした液が入っている。Aは、オオカナダモを入れて、光を当てる。Bは、オオカナダモを入れて、アルミホイルで包む。Cは、オオカナダモを入れずに、光を当てる",s)}

/* ---------- 文章 ---------- */
var SMN='<p class="note" style="font-size:.8rem;margin:.2rem 0">';
var NW=function(t){return '<span style="white-space:nowrap">'+t+'</span>'};
var TIGHT='<style>.pick .pk-bt{gap:.4rem}.pick button.choice{padding:.1rem .55rem;min-width:2.6rem}</style>';

var POINT='<p>光合成は、葉緑体で、光を使って、二酸化炭素と水から、デンプンなどの栄養と酸素をつくるはたらきです。</p>'+figEq()+
 '<p>呼吸は、酸素をとり入れて、二酸化炭素を出すはたらきです。光が当たっていても、当たっていなくても、いつも行われています。</p>'+figDN()+
 SMN+'※ 文字の大きさは、気体の量を表しています。</p>'+
 '<p>実験では、青色のBTB溶液を入れた水に息を吹き込んで、緑色にした液を使います。</p>'+figTubes()+
 '<p>液の色を見ると、二酸化炭素が増えたか、減ったかが分かります。</p>';

var QBODY=TIGHT+'<p>青色のBTB溶液を入れた水に息を吹き込んで、緑色にした。この液を3本の試験管A〜Cに入れ、同じ場所に置いた。しばらくして、液の色を調べた。</p>'+figQ(false);

var ANS=figQ(true)+
 '<p>(1) A：<b>青色</b>　B：<b>黄色</b>　C：<b>緑色</b></p>'+
 '<p>(2) 黄色になるのは、B。Bは、光がなく、呼吸だけをする。二酸化炭素が増えるので、黄色になる。'+NW('<b>呼吸</b>')+'</p>'+
 '<p>(3) 青色になるのは、A。Aは、光合成のほうが、呼吸より多い。二酸化炭素が減るので、青色になる。'+NW('<b>光合成</b>')+'</p>';

var SBODY=TIGHT+'<p>問題の実験の結果から、考えなさい。</p>'+
 SMN+NW('A：オオカナダモ + 光')+'　'+NW('B：オオカナダモ + アルミホイル')+'　'+NW('C：オオカナダモなし + 光')+'</p>';
/* ---------- 補充の解答の図：2つの試験管を比べる表。ちがう行だけ、青い枠で「ちがい」。同じ行は灰色で「同じ」 ----------
   c1,c2＝試験管の記号、rows＝[条件の名前, c1のようす, c2のようす]、diff＝ちがう行の番号、res＝[[色, 文字], [色, 文字]] */
var BLUE="#1f5fa8";
function cmpFig(c1,c2,rows,diff,res,label){
 var xa=160,xb=240,y0=34,rh=34,s='',i,r,cy,d,n=rows.length;
 s+=T(xa,22,16,c1,"b","middle")+T(xb,22,16,c2,"b","middle");
 for(i=0;i<=n+1;i++)s+=line(4,y0+rh*i,332,y0+rh*i,RULE,1);
 for(i=0;i<n;i++){r=rows[i];cy=y0+rh*i+17;d=(i===diff);
  if(d)s+='<rect x="1" y="'+(y0+rh*i+1)+'" width="334" height="'+(rh-2)+'" rx="6" fill="none" stroke="'+BLUE+'" stroke-width="2"/>';
  s+=T(8,cy+5,14,r[0],d?"v b":null)+T(xa,cy+5,14,r[1],d?"v b":null,"middle")+T(xb,cy+5,14,r[2],d?"v b":null,"middle")+
   T(328,cy+5,12,d?"ちがい":"同じ",d?"v b":"g","end")}
 cy=y0+rh*n+17;
 s+=T(8,cy+5,14,"液の色")+
  '<rect x="'+(xa-28)+'" y="'+(cy-13)+'" width="56" height="26" rx="6" fill="'+res[0][0]+'" stroke="'+GRAY+'" stroke-width="1"/>'+TN(xa,cy+5,14,res[0][1],"b","middle")+
  '<rect x="'+(xb-28)+'" y="'+(cy-13)+'" width="56" height="26" rx="6" fill="'+res[1][0]+'" stroke="'+GRAY+'" stroke-width="1"/>'+TN(xb,cy+5,14,res[1][1],"b","middle");
 return svg(y0+rh*(n+1)+8,label,s)}

var F1=cmpFig("A","B",[["オオカナダモ","あり","あり"],["光","あり","なし"]],1,[[LB,"青色"],[LY,"黄色"]],
 "AとBを比べる表。オオカナダモは、AもBもあり(同じ)。光は、Aはあり、Bはなし(ちがい)。液の色は、Aは青色、Bは黄色");
var F2=cmpFig("A","C",[["オオカナダモ","あり","なし"],["光","あり","あり"]],0,[[LB,"青色"],[LG,"緑色"]],
 "AとCを比べる表。オオカナダモは、Aはあり、Cはなし(ちがい)。光は、AもCもあり(同じ)。液の色は、Aは青色、Cは緑色");

var SOL2='<p>調べたい条件<b>だけ</b>をちがえて、ほかの条件は同じにして比べる実験を、<b>対照実験</b>といいます。ちがいが1つだけなので、その条件のはたらきが分かります。</p>'+
 '<p style="margin-bottom:0">(1) AとBを比べる</p>'+F1+
 '<p>ちがいは、<b>光</b>だけ。光を当てたAだけ、二酸化炭素が減って青色になる。光合成には、'+NW('<b>光</b>が必要')+'</p>'+
 '<p style="margin-bottom:0">(2) AとCを比べる</p>'+F2+
 '<p>ちがいは、<b>オオカナダモ</b>だけ。オオカナダモを入れたAだけ、色が変わる。色の変化は、'+NW('<b>オオカナダモ</b>のはたらき')+'</p>';

window.UNIT={
no:"2-12",title:"光合成と呼吸",
sections:[
{type:"text",point:true,title:"厳選ポイント",html:POINT},
{type:"problem",title:"問題",body:QBODY,
 parts:[
  {head:"(1) A〜Cの液の色は、それぞれ何色になったか。丸をタップして選びなさい。",label:"A",type:"choice",choices:["青","緑","黄"],accept:["青"]},
  {label:"B",type:"choice",choices:["青","緑","黄"],accept:["黄"]},
  {label:"C",type:"choice",choices:["青","緑","黄"],accept:["緑"]},
  {label:"(2)",text:"液が黄色になるのは、オオカナダモが何というはたらきによるか。",type:"pick",choices:["蒸散","光合成","呼吸","消化"],accept:["呼吸"]},
  {label:"(3)",text:"液が青色になるのは、オオカナダモが何というはたらきによるか。",type:"pick",choices:["光合成","吸収","発芽","蒸散"],accept:["光合成"]}
 ]},
{type:"answer",html:ANS},
{type:"problem",title:"補充問題",body:SBODY,
 parts:[
  {label:"(1)",text:"AとBを比べると、光合成には何が必要だとわかるか。",type:"pick",choices:["水","二酸化炭素","光","酸素"],accept:["光"]},
  {label:"(2)",text:"AとCを比べると、液の色の変化は何のはたらきによるものだとわかるか。",type:"pick",choices:["光","オオカナダモ","息","水"],accept:["オオカナダモ"]}
 ],
 solution:SOL2}
]};
})();
