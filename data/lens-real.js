(function(){
var INK="#26303b",BLUE="#1f5fa8",RED="#c2410c",MUTED="#5d6874",LIGHT="#b7791f",GLASS="#cfe0f3";
/* 座標：光軸の高さ AX、レンズの位置 LX、焦点距離 F(=45)、物体の高さ HO */
var AX=130,LX=170,F=45,HO=40,FL=LX-F,FR=LX+F;
function n(v){return Math.round(v*10)/10}
function T(x,y,size,txt,cls,anchor){return '<text x="'+n(x)+'" y="'+n(y)+'" font-size="'+size+'"'+(anchor?' text-anchor="'+anchor+'"':'')+(cls?' class="'+cls+'"':'')+'>'+txt+'</text>'}
function TN(x,y,size,txt,cls,anchor){return '<text x="'+n(x)+'" y="'+n(y)+'" font-size="'+size+'" style="stroke:none"'+(anchor?' text-anchor="'+anchor+'"':'')+(cls?' class="'+cls+'"':'')+'>'+txt+'</text>'}
function line(x1,y1,x2,y2,k,w,dash){return '<line x1="'+n(x1)+'" y1="'+n(y1)+'" x2="'+n(x2)+'" y2="'+n(y2)+'" stroke="'+k+'" stroke-width="'+(w||1)+'"'+(dash?' stroke-dasharray="4 3"':'')+'/>'}
function pline(a,k,w){return '<polyline points="'+a.map(function(p){return n(p[0])+','+n(p[1])}).join(' ')+'" fill="none" stroke="'+k+'" stroke-width="'+(w||1)+'" stroke-linecap="round" stroke-linejoin="round"/>'}
function svg(h,label,body){return '<div class="fig"><svg viewBox="0 0 340 '+h+'" role="img" aria-label="'+label+'">'+body+'</svg></div>'}
/* 光の道すじの矢じるし：点(x,y)を先として、向きaの「く」の字 */
function chev(x,y,a,k){var L=7,s=.5;
 function p(t){return n(x-L*Math.cos(a+t))+','+n(y-L*Math.sin(a+t))}
 return '<path d="M'+p(s)+' L'+n(x)+','+n(y)+' L'+p(-s)+'" fill="none" stroke="'+(k||LIGHT)+'" stroke-width="1.5"/>'}
/* 点pから点qへの線の上、qから back だけ手前に矢じるし。back が null なら真ん中 */
function chevOn(p,q,back){var dx=q[0]-p[0],dy=q[1]-p[1],len=Math.hypot(dx,dy),a=Math.atan2(dy,dx),b=back==null?len/2:back;
 return chev(q[0]-b*Math.cos(a),q[1]-b*Math.sin(a),a)}
/* 点qから先へ、pからqの向きに、少し延長した点 */
function ext(p,q,L){var dx=q[0]-p[0],dy=q[1]-p[1],l=Math.hypot(dx,dy);return [q[0]+L*dx/l,q[1]+L*dy/l]}
function dot(x,y){return '<circle cx="'+n(x)+'" cy="'+n(y)+'" r="3.5" fill="'+INK+'"/>'}
function entry(x,y){return '<circle cx="'+n(x)+'" cy="'+n(y)+'" r="3.5" fill="#fff" stroke="'+LIGHT+'" stroke-width="1.2"/>'}
/* 物体・実像の矢印。tip＝先の高さ(上向きなら小さい値、下向きなら大きい値) */
function arrowV(x,tip,col){var s=tip<AX?1:-1;
 return line(x,AX,x,tip+s*10,col,3)+'<polygon points="'+n(x)+','+n(tip)+' '+n(x-5.5)+','+n(tip+s*12)+' '+n(x+5.5)+','+n(tip+s*12)+'" fill="'+col+'"/>'}
function lens(){return '<path d="M170,45 C183,85 183,175 170,215 C157,175 157,85 170,45 Z" fill="'+GLASS+'" stroke="'+INK+'" stroke-width="1.5" stroke-linejoin="round"/>'}
function axis(){return line(4,AX,336,AX,MUTED,1)}
/* 焦点の文字：左は光軸の下、右は光軸の上(右上へずらして、光の線と重ならないようにする) */
function focal(){return dot(FL,AX)+dot(FR,AX)+T(FL,148,13,"焦点","b","middle")+T(FR+4,124,13,"焦点","b")}


function lensH(half){var a=AX-half,b=AX+half,u=AX-half*.47,v=AX+half*.47;
 return '<path d="M170,'+n(a)+' C183,'+n(u)+' 183,'+n(v)+' 170,'+n(b)+' C157,'+n(v)+' 157,'+n(u)+' 170,'+n(a)+' Z" fill="'+GLASS+'" stroke="'+INK+'" stroke-width="1.5" stroke-linejoin="round"/>'}
function svgY(y0,h,label,body){return '<div class="fig"><svg viewBox="0 '+y0+' 340 '+h+'" role="img" aria-label="'+label+'">'+body+'</svg></div>'}

/* ---------- 厳選ポイントの図1：太陽の光(光軸に平行な光)が、凸レンズを通って焦点に集まる ---------- */
function figSun(){
 var s=line(4,AX,336,AX,MUTED,1)+T(332,AX-6,13,"光軸","g","end")+lensH(62)+dot(FL,AX)+T(FL,148,13,"焦点","b","middle");
 [-48,-24,0,24,48].forEach(function(o){var y=AX+o,ex=24;
  s+=line(20,y,LX,y,LIGHT,1.5)+chevOn([20,y],[LX,y])+line(LX,y,FR+ex,AX-o*ex/F,LIGHT,1.5);
  if(o)s+=chevOn([LX,y],[FR,AX],(Math.hypot(FR-LX,AX-y))/2)});
 s+=dot(FR,AX)+line(FR,136,FR,157,INK,1,true)+T(FR,170,13,"焦点","b","middle")+T(4,72,13,"光軸に平行な光","b");
 return svgY(60,140,"光軸に平行な、何本もの光が、左から凸レンズに当たる。光は、レンズを通ったあと、右の焦点の1点に集まり、焦点をこえたあとは、広がっていく",s)}

/* ---------- 厳選ポイントの図2：実際のレンズ(2回曲がる)と、作図の場合(中心の線で1回だけ曲がる) ----------
   実際のレンズ：両面が円の一部(半径60、屈折率1.5)。光の道すじは、屈折の法則で計算する */
function refr(d,N,eta){var ci=-(N[0]*d[0]+N[1]*d[1]),k=1-eta*eta*(1-ci*ci),c=eta*ci-Math.sqrt(k);
 return [eta*d[0]+c*N[0],eta*d[1]+c*N[1]]}
var LR=50,LH=32,LS=LR-Math.sqrt(LR*LR-LH*LH),LHT=24;
var RC=(function(){
 var C1=[-LS+LR,0],C2=[LS-LR,0],y=LHT,
  p=[C1[0]-Math.sqrt(LR*LR-y*y),y],N1=[(p[0]-C1[0])/LR,(p[1]-C1[1])/LR],t1=refr([1,0],N1,1/1.5),
  w=[p[0]-C2[0],p[1]-C2[1]],b=w[0]*t1[0]+w[1]*t1[1],c=w[0]*w[0]+w[1]*w[1]-LR*LR,s=-b+Math.sqrt(b*b-c),
  q=[p[0]+s*t1[0],p[1]+s*t1[1]],N2=[-(q[0]-C2[0])/LR,-(q[1]-C2[1])/LR],t2=refr(t1,N2,1.5),
  u=-q[1]/t2[1];
 return {p:p,q:q,fx:q[0]+u*t2[0]}})();
function figCmp(){
 var S=2,ay=100,xs=[36,226],s='',k,H=LH*S,R=LR*S,sg=LS*S,h=LHT*S;
 for(k=0;k<2;k++){var xc=xs[k],xf=xc+RC.fx*S;
  s+=line(xc-34,ay,xf+16,ay,MUTED,1);
  s+='<path d="M'+n(xc-sg)+','+ay+' A'+R+','+R+' 0 0 1 '+xc+','+(ay-H)+' A'+R+','+R+' 0 0 1 '+n(xc+sg)+','+ay+' Z" fill="'+GLASS+'" stroke="none"/>'+
   '<path d="M'+n(xc-sg)+','+ay+' A'+R+','+R+' 0 0 1 '+xc+','+(ay-H)+' A'+R+','+R+' 0 0 1 '+n(xc+sg)+','+ay+'" fill="none" stroke="'+INK+'" stroke-width="1.5" stroke-linejoin="round"/>';
  if(k===1)s+=line(xc,ay,xc,ay-H,INK,3);
  var a=[xc-32,ay-h],P=k===0?[xc+RC.p[0]*S,ay-RC.p[1]*S]:[xc,ay-h],Q=k===0?[xc+RC.q[0]*S,ay-RC.q[1]*S]:null,E=[xf,ay];
  s+=line(a[0],a[1],P[0],P[1],LIGHT,1.5)+chevOn(a,P,Math.max(8,Math.hypot(P[0]-a[0],P[1]-a[1])/2));
  if(Q)s+=line(P[0],P[1],Q[0],Q[1],LIGHT,1.5)+line(Q[0],Q[1],E[0],E[1],LIGHT,1.5)+chevOn(Q,E,26)+entry(P[0],P[1])+entry(Q[0],Q[1]);
  else s+=line(P[0],P[1],E[0],E[1],LIGHT,1.5)+chevOn(P,E,26)+entry(P[0],P[1]);
  s+=dot(xf,ay)+T(xf,118,12,"焦点","b","middle")}
 s+=line(158,ay,180,ay,INK,1.5)+'<path d="M174,95 L180,100 L174,105" fill="none" stroke="'+INK+'" stroke-width="1.5"/>';
 s+=T(80,16,13,"実際のレンズ","b","middle")+T(80,138,12,"入るときと、出るときに","g","middle")+T(80,152,12,"2回曲がる","g","middle")+
  T(270,16,13,"作図の場合","b","middle")+T(270,138,12,"薄いレンズとして","g","middle")+T(270,152,12,"中心の線で1回曲がる","g","middle");
 return svgY(0,160,"凸レンズの上半分を、大きくした図。左は、実際のレンズ。光は、レンズに入るときと、出るときの2回曲がって、焦点に向かう。右向きの矢印のあと、右は、作図の場合。薄いレンズを、実際の太さで描いている。光は、レンズの中心の線で、1回だけ曲がって、焦点に向かう",s)}


/* ---------- 厳選ポイントの図(光線なし) ---------- */
function dim(a,b,y){return line(a+6,y,b-6,y,INK,1)+'<path d="M'+(a+12)+','+(y-5)+' L'+(a+6)+','+y+' L'+(a+12)+','+(y+5)+' M'+(b-12)+','+(y-5)+' L'+(b-6)+','+y+' L'+(b-12)+','+(y+5)+'" fill="none" stroke="'+INK+'" stroke-width="1"/>'}
function eq(x){return line(x-2,AX-5,x-2,AX+5,INK,1.5)+line(x+2,AX-5,x+2,AX+5,INK,1.5)}
function figStd(){
 var s=axis()+lens()+T(LX,32,13,"凸レンズ","b","middle")+
  pline([[80,AX-HO],[LX,AX-HO],[260,AX+HO],ext([LX,AX-HO],[260,AX+HO],14)],LIGHT,1.5)+pline([[80,AX-HO],[260,AX+HO],ext([80,AX-HO],[260,AX+HO],14)],LIGHT,1.5)+
  chevOn([80,AX-HO],[LX,AX-HO])+chevOn([LX,AX-HO],[260,AX+HO],20)+chevOn([80,AX-HO],[LX,AX])+chevOn([LX,AX],[260,AX+HO],55)+
  entry(LX,AX-HO)+entry(LX,AX)+
  dot(80,AX)+dot(260,AX)+dot(FL,AX)+dot(FR,AX)+T(FL,148,13,"焦点","b","middle")+T(FR+4,119,13,"焦点","b")+
  eq(102.5)+eq(147.5)+eq(192.5)+eq(237.5)+
  arrowV(80,AX-HO,RED)+T(80,72,13,"物体","m b","middle")+
  arrowV(260,AX+HO,BLUE)+T(260,196,13,"実像","v b","middle")+
  line(FR,134,FR,196,INK,1,true)+line(LX,184,LX,196,INK,1)+dim(LX,FR,190)+T(192,212,12,"焦点距離","g","middle");
 return svg(224,"凸レンズの図。レンズの左右に焦点があり、その外側に、焦点距離の2倍の位置がある。左の2倍の位置に、赤い矢印の物体がある。物体の先端から、光軸に平行な光と、レンズの中心を通る光が出る。光軸に平行な光は焦点を通る。2本の光が交わる点が実像の先端で、右の2倍の位置に、同じ大きさで上下が逆の、青い矢印の実像ができる。光軸の上の、物体と左の焦点の間、左の焦点とレンズの間、レンズと右の焦点の間、右の焦点と実像の間には、二重の縦線がある。4つの間は、すべて同じ長さで、レンズから焦点までの長さが、焦点距離",s)}

/* ---------- 参考の図：物体の先端から出た、いろいろな向きの光が、すべて実像の先端に集まる。太い線は、光軸に平行な光と中心を通る光 ---------- */
function figMany(){
 var hs=[66,90,110,130,150,170,194],tx=80,ty=AX-HO,ix=260,iy=AX+HO,s=axis()+lensH(70);
 /* 凸レンズに当たらない光：先端から、真上・左斜め上・左・左斜め下・右斜め上へ、短い矢印 */
 [-90,-135,180,135,-45].forEach(function(g){var a=g*Math.PI/180,e=[tx+36*Math.cos(a),ty+36*Math.sin(a)];s+=line(tx,ty,e[0],e[1],LIGHT,1)+chev(e[0],e[1],a)});
 function ray(h,w){return pline([[tx,ty],[LX,h],[ix,iy],ext([LX,h],[ix,iy],14)],LIGHT,w)}
 hs.forEach(function(h){if(h!==90&&h!==130)s+=ray(h,1)});
 s+=ray(90,2.5)+ray(130,2.5)+
  chevOn([tx,ty],[LX,90])+chevOn([LX,90],[ix,iy])+chevOn([tx,ty],[LX,130])+chevOn([LX,130],[ix,iy])+
  entry(LX,90)+entry(LX,130)+
  arrowV(tx,ty,RED)+T(tx,152,13,"物体","m b","middle")+
  arrowV(ix,iy,BLUE)+T(ix,202,13,"実像","v b","middle");
 return svg(224,"凸レンズの図。物体の先端から出た、いろいろな向きの光のうち、凸レンズを通った光は、すべて実像の先端の1点に集まる。そのうち太い2本が、光軸に平行な光と、レンズの中心を通る光。物体の先端からは、凸レンズに当たらない向きにも、短い矢印の光が出ている。それらは集まらない",s)}

/* ---------- 問題の図：光のルール(A〜Cから選ぶ) ---------- */
/* kind=1：光軸に平行な光(左から水平に入る)。kind=2：レンズの中心を通る光(左上から入る)
   候補は3つ。傾きの小さい順(上から順)にA、B、C。正しいのは、kind=1が焦点を通る線、kind=2が直進する線 */
function rule(kind){
 var hit,start,sl,ok,h,s,i;
 if(kind===1){hit=[LX,AX-40];start=[20,AX-40];sl=[-0.3,0,40/F];ok=2;h=236}
 else{hit=[LX,AX];start=[30,AX-0.3*(LX-30)];sl=[0.12,0.3,0.5];ok=1;h=224}
 s=axis()+lens()+dot(FL,AX)+dot(FR,AX)+T(FL,148,13,"焦点","b","middle")+T(FR+4,124,13,"焦点","b");
 s+=line(start[0],start[1],hit[0],hit[1],LIGHT,1.5)+chevOn(start,hit);
 for(i=0;i<3;i++){
  var ex=300,ey=hit[1]+sl[i]*(ex-LX),a=Math.atan2(sl[i],1);
  s+=line(hit[0],hit[1],ex,ey,LIGHT,1.5)+chevOn(hit,[ex,ey]);
  var cx=ex+12*Math.cos(a),cy=ey+12*Math.sin(a);
  s+='<circle cx="'+n(cx)+'" cy="'+n(cy)+'" r="11" fill="#fff" stroke="'+INK+'" stroke-width="1.2"/>'+TN(cx,cy+5,14,"ABC".charAt(i),"b","middle")}
 s+=entry(hit[0],hit[1]);
 var lab=kind===1?"光軸に平行な光が、左から当たる図。通ったあとの道すじの候補が、A、B、Cの3つある":"凸レンズの中心に、光が左上から当たる図。通ったあとの道すじの候補が、A、B、Cの3つある";
 return {html:svg(h,lab,s),ans:"ABC".charAt(ok)}}

/* ---------- 作図の図(光線あり)：物体の位置は、レンズから焦点距離の mult 倍。像の位置と大きさは計算で出す
   c1＝線1の2つ目の区間の矢じるしの位置(像の先から手前へ)、c2＝線2の2つ目の区間のもの ---------- */
function draw(mult,c1,c2,label){
 var d=mult*F,ox=LX-d,di=d*F/(d-F),ix=LX+di,hi=HO*di/d,ty=AX-HO,iy=AX+hi;
 var r1=[[ox,ty],[LX,ty],[ix,iy]],r2=[[ox,ty],[ix,iy]];
 var s=axis()+lens()+focal()+pline(r1.concat([ext(r1[1],r1[2],14)]),LIGHT,1.5)+pline(r2.concat([ext(r2[0],r2[1],14)]),LIGHT,1.5)+
  chevOn(r1[0],r1[1])+chevOn(r1[1],r1[2],c1)+chevOn(r2[0],[LX,AX])+chevOn([LX,AX],r2[1],c2)+
  entry(LX,ty)+entry(LX,AX)+
  arrowV(ox,ty,RED)+T(ox,72,13,"物体","m b","middle")+
  arrowV(ix,iy,BLUE)+T(ix,iy+24,13,"実像","v b","middle");
 return svg(Math.ceil(Math.max(224,iy+38)),label,s)}
var DRAW0=draw(2,20,55,"作図の図。物体の先端から、光軸に平行な線を引くと、レンズを通ったあと、焦点を通る。物体の先端から、レンズの中心に線を引くと、そのまま直進する。2本が交わる点が、実像の先端。物体が焦点距離の2倍の位置にあるとき、実像も反対側の2倍の位置にでき、物体と同じ大きさになる");
var DRAW1=draw(1.5,24,70,"作図の図。物体を焦点に近づけた場合。2本の線が交わる点が、実像の先端。実像は、凸レンズから遠い位置にでき、物体より大きい");
var DRAW2=draw(3,11,30,"作図の図。物体を焦点から遠ざけた場合。2本の線が交わる点が、実像の先端。実像は、凸レンズに近い位置にでき、物体より小さい");

/* ---------- 補充問題(1)の図：物体、凸レンズ、スクリーン。レンズからスクリーンまで40cm ---------- */
function figBench(){
 var s=axis()+lens()+T(LX,32,13,"凸レンズ","b","middle")+
  line(260,60,260,192,"#b4bbc3",6)+T(260,50,13,"スクリーン","b","middle")+
  arrowV(80,AX-HO,RED)+T(80,72,13,"物体","m b","middle")+
  arrowV(260,AX+HO,BLUE)+T(260,196,13,"実像","v b","middle")+
  line(LX,198,LX,210,INK,1)+line(260,198,260,210,INK,1)+line(176,204,254,204,INK,1)+
  '<path d="M182,199 L176,204 L182,209 M248,199 L254,204 L248,209" fill="none" stroke="'+INK+'" stroke-width="1"/>'+
  T(215,226,14,"40cm","b","middle");
 return svg(238,"物体、凸レンズ、スクリーンを一直線に並べた図。スクリーンに、物体と同じ大きさの実像がうつっている。凸レンズからスクリーンまでの距離は40cm",s)}

/* ---------- 文章 ---------- */
var M='<span class="m" style="white-space:nowrap">物体</span>',V='<span class="v" style="white-space:nowrap">実像</span>';
var Q1=rule(1),Q2=rule(2);
var C3=["大きくなる","小さくなる","変わらない"];

var POINT='<p>レンズの中心を通り、レンズに垂直な線を<b>光軸</b>といいます。光軸に平行に入った光は、レンズを通ったあと、1点に集まります。この点を<b>焦点</b>といいます。焦点は、レンズの両側にあります。</p>'+figSun()+
 '<p>'+M+'の先端から出た、<b>光軸に平行な光</b>と、<b>レンズの中心を通る光</b>が交わる点に、'+V+'の先端ができます。</p>'+figStd()+
 '<p class="note">物体を、焦点距離の2倍の位置に置くと、反対側の焦点距離の2倍の位置に、同じ大きさの実像ができます。</p>'+
 '<p class="note">実像は、スクリーンにうつる像です。上下左右が逆さまになります。</p>';

var QBODY='<p>光が凸レンズに入ります。通ったあとの光の道すじとして正しいものを、A〜Cから選びなさい。</p>'+
 '<p>(1) 光軸に平行な光</p>'+Q1.html+
 '<p>(2) レンズの中心を通る光</p>'+Q2.html;

var ANS='<p>光は、次のルールで進みます。</p>'+
 '<p>① 光軸に平行な光は、レンズを通ったあと、<b>焦点</b>を通る。<br>② レンズの中心を通る光は、そのまま<b>直進</b>する。</p>'+
 '<p>(1) <b>'+Q1.ans+'</b>　(2) <b>'+Q2.ans+'</b></p>'+
 '<p>この2つのルールで、実像を作図できます。</p>'+DRAW0+
 '<p>① '+M+'の先端から、光軸に平行な線(横にまっすぐな線)を引く。レンズを通ったあと、焦点を通る。<br>'+
 '② 物体の先端から、レンズの中心へ線を引く。そのまま直進する。<br>'+
 '③ 2本が交わる点が、'+V+'の先端。そこから、中央の横線まで、矢印を引く。</p>';

var SBODY='<p>物体を、凸レンズの焦点距離の2倍の位置に置くと、スクリーンに、物体と同じ大きさの実像がうつった。このとき、凸レンズからスクリーンまでの距離は40cmであった。</p>'+figBench()+
 '<p>(1) この凸レンズの焦点距離は何cmか。</p>'+
 '<p>次に、物体を、焦点距離の2倍の位置から動かして、実像がはっきりうつるように、スクリーンを動かした。(2)と(3)は物体を焦点に近づけたとき、(4)と(5)は物体を焦点から遠ざけたときである。動かす前と比べて、どうなるか。</p>'+
 '<p>(2)(4) 凸レンズとスクリーンの距離<br>(3)(5) 実像の大きさ</p>';

var SOL2='<p>(1) 同じ大きさの実像ができるのは、物体も実像も、焦点距離の2倍の位置にあるときです。<br>スクリーンまでの40cmが、焦点距離の2倍にあたります。<br>40cm ÷ 2 ＝ <b>20cm</b></p>'+
 '<p>(2)〜(5) 作図で確かめます。</p>'+
 '<p>物体を焦点に近づけると、実像は凸レンズから遠ざかり、大きくなります。</p>'+DRAW1+
 '<p>(2) <b>大きくなる</b>　(3) <b>大きくなる</b></p>'+
 '<p>物体を焦点から遠ざけると、実像は凸レンズに近づき、小さくなります。</p>'+DRAW2+
 '<p>(4) <b>小さくなる</b>　(5) <b>小さくなる</b></p>';

window.UNIT={
no:"1-10",title:"凸レンズ(実像)",
sections:[
{type:"text",point:true,title:"厳選ポイント",html:POINT},
{type:"problem",title:"問題",body:QBODY,
 parts:[
  {label:"(1)",type:"choice",choices:["A","B","C"],accept:[Q1.ans]},
  {label:"(2)",type:"choice",choices:["A","B","C"],accept:[Q2.ans]}
 ]},
{type:"answer",html:ANS},
{type:"problem",title:"補充問題",body:SBODY,
 parts:[
  {label:"(1)",unit:"cm",type:"number",accept:[20],tol:0.5},
  {label:"(2) 近づける・距離",type:"choice",choices:C3,accept:["大きくなる"]},
  {label:"(3) 近づける・大きさ",type:"choice",choices:C3,accept:["大きくなる"]},
  {label:"(4) 遠ざける・距離",type:"choice",choices:C3,accept:["小さくなる"]},
  {label:"(5) 遠ざける・大きさ",type:"choice",choices:C3,accept:["小さくなる"]}
 ],
 solution:SOL2},
{type:"text",title:"ノートに書いてみよう",html:
 '<p>何も見ずに、ノートに凸レンズと焦点を書いて、実像を作図してみましょう。</p>'+
 '<p>① 物体を、焦点距離の2倍の位置に置いたとき<br>② 物体を、焦点に近づけたとき</p>'+
 '<p class="note">光の線は、2本引きます。①と②を比べて、実像の場所と大きさがどう変わるかを見てください。</p>'},
{type:"text",title:"参考：実際のレンズでは、光は2回曲がる",html:
 '<p>実際のレンズでは、光は、レンズに入るときと出るときの2回、曲がります。作図では、レンズを薄いものと考えて、レンズの中心の線で、1回だけ曲がることにします。</p>'+figCmp()+
 '<p class="note">※レンズの中心を通る光は、実際のレンズでも、ほとんどまっすぐ進みます。作図では、まっすぐ進むことにします。</p>'},
{type:"text",title:"参考：凸レンズを通った光は1点に集まる",html:
 '<p>'+M+'の先端からは、四方八方に光が出ます。そのうち、凸レンズを通った光は、すべて、'+V+'の先端に集まります。</p>'+figMany()+
 '<p class="note">太い線の2本が、光軸に平行な光と、レンズの中心を通る光です。作図では、この2本だけを引けば、ほかの光も集まる点(実像の先端)が分かります。</p>'+
 '<p class="note">短い矢印は、凸レンズに当たらない光です。そのまま直進して、集まりません。</p>'}
]};
})();
