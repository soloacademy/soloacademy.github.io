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
function arrow(x1,x2,y){return line(x1,y,x2,y,INK,1.5)+'<path d="M'+(x2-6)+','+(y-5)+' L'+x2+','+y+' L'+(x2-6)+','+(y+5)+'" fill="none" stroke="'+INK+'" stroke-width="1.5"/>'}

/* ---------- 厳選ポイントの図1：BTB溶液の色と、二酸化炭素の量(左から、青・緑・黄) ---------- */
function figBar(){
 var x=[20,120,220],col=[LB,LG,LY],nm=["青色","緑色","黄色"],s='',i;
 for(i=0;i<3;i++)s+='<rect x="'+x[i]+'" y="8" width="100" height="36" fill="'+col[i]+'" stroke="'+GRAY+'" stroke-width="1"/>'+TN(x[i]+50,32,15,nm[i],"b","middle");
 s+=arrow(20,320,64)+T(20,88,13,"二酸化炭素が少ない")+T(320,88,13,"多い",null,"end");
 return svg(98,"BTB溶液の色の図。左から、青色、緑色、黄色。右へ進むほど、二酸化炭素が多い。青色は二酸化炭素が少なく、黄色は多い",s)}

/* ---------- 厳選ポイントの図2：光合成の式(葉緑体で、二酸化炭素と水から、栄養と酸素ができる) ---------- */
function figGas(){
 var s=T(170,26,16,"二酸化炭素＋水","b","middle")+
  line(170,40,170,84,INK,1.5)+'<path d="M165,78 L170,84 L175,78" fill="none" stroke="'+INK+'" stroke-width="1.5"/>'+
  T(186,66,14,"葉緑体で光合成")+
  T(170,114,16,"デンプンなどの栄養＋酸素","b","middle");
 return svg(128,"光合成の式。葉緑体で光合成が行われ、二酸化炭素と水から、デンプンなどの栄養と酸素ができる",s)}

/* ---------- 厳選ポイントの図3：呼吸(酸素を吸って、二酸化炭素を出す) ---------- */
function figResp(){
 var cy=30,s=T(78,cy+5,14,"酸素",null,"end")+arrow(84,108,cy)+
  '<rect x="112" y="'+(cy-18)+'" width="116" height="36" rx="6" fill="'+GREEN+'" stroke="'+INK+'" stroke-width="1.2"/>'+TN(170,cy+5.5,15,"植物","b","middle")+
  arrow(232,256,cy)+T(262,cy+5,14,"二酸化炭素");
 return svg(60,"呼吸の図。酸素が植物に入り、二酸化炭素が植物から出ていく",s)}

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

var POINT='<p>ここでは、青色のBTB溶液に息を吹き込んで、緑色にした液を使います。</p>'+figBar()+
 '<p>光合成では、二酸化炭素を使います。</p>'+figGas()+
 '<p>呼吸では、酸素を吸って、二酸化炭素を出します。</p>'+figResp()+
 SMN+'※ 呼吸は、光が当たっていても、いつも行われています。</p>';

var QBODY=TIGHT+'<p>青いBTB溶液を入れた水に、息を吹き込んで、緑色にした。この液を3本の試験管A〜Cに入れ、同じ場所に置いた。しばらくして、液の色を調べた。</p>'+figQ(false)+
 '<p>(1) A〜Cの液の色は、それぞれ何色になったか。丸をタップして選びなさい。</p>';

var ANS=figQ(true)+
 '<p>(1) A：<b>青色</b>　B：<b>黄色</b>　C：<b>緑色</b></p>'+
 '<p>(2) Bは、光がなく、呼吸だけをする。二酸化炭素が増えるので、黄色になる。'+NW('<b>呼吸</b>')+'</p>'+
 '<p>(3) Aは、光合成のほうが、呼吸より多い。二酸化炭素が減るので、青色になる。'+NW('<b>光合成</b>')+'</p>';

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
  {label:"A",type:"choice",choices:["青","緑","黄"],accept:["青"]},
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
