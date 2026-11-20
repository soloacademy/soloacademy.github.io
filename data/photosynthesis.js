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

/* ---------- 厳選ポイントの図1：BTB溶液の色(左から、黄・緑・青)。もともとは青色で、二酸化炭素がとけるほど、左へ変わる ---------- */
function larrow(x1,x2,y){return line(x1,y,x2,y,INK,1.5)+'<path d="M'+(x2+6)+','+(y-5)+' L'+x2+','+y+' L'+(x2+6)+','+(y+5)+'" fill="none" stroke="'+INK+'" stroke-width="1.5"/>'}
function figBar(){
 var x=[20,120,220],col=[LY,LG,LB],nm=["黄色","緑色","青色"],s='',i;
 for(i=0;i<3;i++)s+='<rect x="'+x[i]+'" y="8" width="100" height="36" fill="'+col[i]+'" stroke="'+GRAY+'" stroke-width="1"/>'+TN(x[i]+50,32,15,nm[i],"b","middle");
 s+=larrow(320,20,64)+T(20,88,13,"二酸化炭素が多い")+T(320,88,13,"少ない",null,"end");
 return svg(98,"BTB溶液の色の図。左から、黄色、緑色、青色。左へ進むほど、二酸化炭素が多い。黄色は二酸化炭素が多く、青色は少ない。もともとは青色",s)}

/* ---------- 厳選ポイントの図2：光合成と呼吸の式(上の矢印が光合成、下の矢印が呼吸) ---------- */
function figGas(){
 var cy=50,s=T(20,cy+6,16,"二酸化炭素＋水","b")+T(240,cy+6,16,"栄養＋酸素","b")+
  T(186,cy-17,14,"光合成",null,"middle")+arrow(142,230,cy-5)+
  larrow(230,142,cy+5)+T(186,cy+28,14,"呼吸",null,"middle");
 return svg(96,"光合成と呼吸の式。二酸化炭素と水から、栄養と酸素ができる。右向きの矢印の上に、光合成。左向きの矢印の下に、呼吸",s)}

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

var POINT='<p>BTB溶液は、もともと青色です。二酸化炭素がとけると、緑色、黄色と変わります。</p>'+figBar()+
 '<p>この単元では、青色のBTB溶液に息を吹き込んで、緑色にした液を使います。</p>'+
 '<p>光合成と呼吸は、次の式で表されます。</p>'+figGas()+
 SMN+'※ 呼吸は、光が当たっていても、いつも行われています。</p>';

var QBODY=TIGHT+'<p>青いBTB溶液を入れた水に、息を吹き込んで、緑色にした。この液を3本の試験管A〜Cに入れ、同じ場所に置いた。しばらくして、液の色を調べた。</p>'+figQ(false)+
 '<p>(1) A〜Cの液の色は、それぞれ何色になったか。丸をタップして選びなさい。</p>';

var ANS=figQ(true)+
 '<p>(1) A：<b>青色</b>　B：<b>黄色</b>　C：<b>緑色</b></p>'+
 '<p>(2) Bは、光がなく、呼吸だけをする。二酸化炭素が増えるので、黄色になる。'+NW('<b>呼吸</b>')+'</p>'+
 '<p>(3) Aは、光合成のほうが、呼吸より多い。二酸化炭素が減るので、青色になる。'+NW('<b>光合成</b>')+'</p>';

function rd(a,b){return '<div style="margin:.45rem 0 0"><div style="font-size:.8rem;line-height:1.5;color:var(--muted)">'+a+'</div>'+
 '<div style="line-height:1.6">→ '+b+'</div></div>'}
var SBODY=TIGHT+'<p>問題の実験の結果から、考えなさい。</p>'+
 SMN+NW('A：オオカナダモ + 光')+'　'+NW('B：オオカナダモ + アルミホイル')+'　'+NW('C：オオカナダモなし + 光')+'</p>';
var SOL2='<p>ちがう条件を1つだけにして比べると、その条件のはたらきが分かります。</p>'+
 '<div style="margin:0 0 .9rem">'+
 rd('(1) AとBを比べる(ちがいは、光だけ)','光を当てたAだけ、二酸化炭素が減って青色になる。光合成には、'+NW('<b>光</b>が必要')+'')+
 rd('(2) AとCを比べる(ちがいは、オオカナダモだけ)','オオカナダモを入れたAだけ、色が変わる。色の変化は、'+NW('<b>オオカナダモ</b>のはたらき')+'')+'</div>';

window.UNIT={
no:"2-12",title:"光合成と呼吸",
sections:[
{type:"text",point:true,title:"厳選ポイント",html:POINT},
{type:"problem",title:"問題",body:QBODY,
 parts:[
  {label:"A",type:"choice",choices:["青","緑","黄"],accept:["青"]},
  {label:"B",type:"choice",choices:["青","緑","黄"],accept:["黄"]},
  {label:"C",type:"choice",choices:["青","緑","黄"],accept:["緑"]},
  {label:"(2)",text:"Bの液が黄色になったのは、オオカナダモが何というはたらきをしたからか。",type:"pick",choices:["蒸散","光合成","呼吸","消化"],accept:["呼吸"]},
  {label:"(3)",text:"Aの液が青色になったのは、オオカナダモが何というはたらきをしたからか。",type:"pick",choices:["光合成","吸収","発芽","蒸散"],accept:["光合成"]}
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
