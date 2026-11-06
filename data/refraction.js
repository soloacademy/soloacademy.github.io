(function(){
var INK="#26303b",BLUE="#1f5fa8",RED="#c2410c",GRAY="#8a949f",MUTED="#5d6874",LIGHT="#b7791f",LFILL="#fbe7b0",GLASS="#cfe0f3",PALE="#e3edf8",NG=1.5;
function T(x,y,size,txt,cls,anchor){return '<text x="'+x.toFixed(1)+'" y="'+y.toFixed(1)+'" font-size="'+size+'"'+(anchor?' text-anchor="'+anchor+'"':'')+(cls?' class="'+cls+'"':'')+'>'+txt+'</text>'}
function TN(x,y,size,txt,cls,anchor){return '<text x="'+x.toFixed(1)+'" y="'+y.toFixed(1)+'" font-size="'+size+'" style="stroke:none"'+(anchor?' text-anchor="'+anchor+'"':'')+(cls?' class="'+cls+'"':'')+'>'+txt+'</text>'}
function svg(w,h,label,body){return '<div class="fig"><svg viewBox="0 0 '+w+' '+h+'" role="img" aria-label="'+label+'">'+body+'</svg></div>'}
function line(x1,y1,x2,y2,k,w,dash){return '<line x1="'+x1.toFixed(1)+'" y1="'+y1.toFixed(1)+'" x2="'+x2.toFixed(1)+'" y2="'+y2.toFixed(1)+'" stroke="'+k+'" stroke-width="'+(w||1)+'"'+(dash?' stroke-dasharray="4 3"':'')+'/>'}
function P(a){return a.map(function(p){return p[0].toFixed(1)+','+p[1].toFixed(1)}).join(' ')}
function pgon(a,f,k,w){return '<polygon points="'+P(a)+'" fill="'+f+'" stroke="'+(k||"none")+'" stroke-width="'+(w||1)+'" stroke-linejoin="round"/>'}
function pline(a,k,w,lc){return '<polyline points="'+P(a)+'" fill="none" stroke="'+k+'" stroke-width="'+(w||1)+'" stroke-linecap="'+(lc||"butt")+'" stroke-linejoin="round"/>'}
/* 矢じるし：線の真ん中に、進む向きの「く」の字 */
function arw(x1,y1,x2,y2,k){var mx=(x1+x2)/2,my=(y1+y2)/2,a=Math.atan2(y2-y1,x2-x1),L=7,s=.5;
 function p(t){return (mx-L*Math.cos(a+t)).toFixed(1)+','+(my-L*Math.sin(a+t)).toFixed(1)}
 return '<path d="M'+p(s)+' L'+mx.toFixed(1)+','+my.toFixed(1)+' L'+p(-s)+'" fill="none" stroke="'+(k||LIGHT)+'" stroke-width="1.5"/>'}
function ray(a,b){return line(a[0],a[1],b[0],b[1],LIGHT,2)+arw(a[0],a[1],b[0],b[1])}

/* ---------- 光の道すじの計算(空気とガラス。ガラスの屈折率は1.5) ---------- */
function nrm(v){var l=Math.hypot(v[0],v[1]);return [v[0]/l,v[1]/l]}
function hit(p,d,poly){var best=null,i;
 for(i=0;i<poly.length;i++){var a=poly[i],b=poly[(i+1)%poly.length],ex=b[0]-a[0],ey=b[1]-a[1],den=d[0]*ey-d[1]*ex;
  if(Math.abs(den)<1e-9)continue;
  var t=((a[0]-p[0])*ey-(a[1]-p[1])*ex)/den,s=((a[0]-p[0])*d[1]-(a[1]-p[1])*d[0])/den;
  if(t>1e-6&&s>=-1e-9&&s<=1+1e-9&&(!best||t<best.t)){var n=nrm([ey,-ex]);if(n[0]*d[0]+n[1]*d[1]>0)n=[-n[0],-n[1]];best={t:t,pt:[p[0]+t*d[0],p[1]+t*d[1]],N:n}}}
 return best}
/* N＝光が来る側を向く、境界面に垂直な単位ベクトル。m＝c(正しい)・w(逆向き)。入るとき／出るとき */
function bend(d,N,m,entering){
 var ci=-(N[0]*d[0]+N[1]*d[1]),th=Math.acos(ci),tg=nrm([d[0]+ci*N[0],d[1]+ci*N[1]]),o;
 if(entering){var rc=Math.asin(Math.sin(th)/NG);o=m==="c"?rc:th+(th-rc)}
 else{if(m==="c"){var s=NG*Math.sin(th);if(s>=1)throw new Error("全反射");o=Math.asin(s)}else o=Math.asin(Math.sin(th)/NG)}
 return [-Math.cos(o)*N[0]+Math.sin(o)*tg[0],-Math.cos(o)*N[1]+Math.sin(o)*tg[1]]}
function clip(p,d,b){var t=1e9;
 if(d[0]>1e-9)t=Math.min(t,(b[2]-p[0])/d[0]);if(d[0]<-1e-9)t=Math.min(t,(b[0]-p[0])/d[0]);
 if(d[1]>1e-9)t=Math.min(t,(b[3]-p[1])/d[1]);if(d[1]<-1e-9)t=Math.min(t,(b[1]-p[1])/d[1]);
 return [p[0]+t*d[0],p[1]+t*d[1]]}
function trace(poly,p0,d,m,box){
 var h1=hit(p0,d,poly),q1=h1.pt,d1=m==="s"?d:bend(d,h1.N,m,true),
  h2=hit(q1,d1,poly),q2=h2.pt,d2=m==="s"?d1:bend(d1,h2.N,m,false);
 return {p0:p0,q1:q1,q2:q2,end:clip(q2,d2,box),d:d2,d0:d,d1:d1,N1:h1.N,N2:h2.N}}


/* 光の帯(幅は一定)。境界面ごとに、なめらかに曲げる。先に境界面を通る側(A)が新しい物質、あとの側(B)は前の物質の速さ。
   bn＝[{K:境界面の点,din:入る向き,dout:出る向き,N:光が来る側を向く垂直な線,first:"in"(入る：Aは遅い＝青)か"out"(出る：Aは速い＝赤)}] */
function leg(x,y){return line(x,y,x+14,y,RED,3.5)+TN(x+20,y+5,13,"速い","m b")+line(x,y+20,x+14,y+20,BLUE,3.5)+TN(x+20,y+25,13,"遅い","v b")}
function tanOf(d,N){var c=-(d[0]*N[0]+d[1]*N[1]);return Math.sqrt(1-c*c)/c}
function band(P0,d0,bn,E,W){
 var pts=[[P0,d0]],rg=[],N=16,k,i;
 bn.forEach(function(b){
  var L1=W*tanOf(b.din,b.N),L2=W*tanOf(b.dout,b.N),
   M1=[b.K[0]-L1*b.din[0],b.K[1]-L1*b.din[1]],M2=[b.K[0]+L2*b.dout[0],b.K[1]+L2*b.dout[1]];
  pts.push([M1,b.din]);var i0=pts.length;
  for(k=0;k<=N;k++){var t=k/N,a=(1-t)*(1-t),c=2*(1-t)*t,e=t*t,
   x=a*M1[0]+c*b.K[0]+e*M2[0],y=a*M1[1]+c*b.K[1]+e*M2[1],
   tx=2*(1-t)*(b.K[0]-M1[0])+2*t*(M2[0]-b.K[0]),ty=2*(1-t)*(b.K[1]-M1[1])+2*t*(M2[1]-b.K[1]),l=Math.hypot(tx,ty);
   pts.push([[x,y],[tx/l,ty/l]])}
  rg.push({i0:i0,i1:pts.length-1,A:(b.din[1]*b.N[0]-b.din[0]*b.N[1])>0?"R":"L",first:b.first})});
 pts.push([E,bn[bn.length-1].dout]);
 function edge(s){return pts.map(function(q){return [q[0][0]+s*W*q[1][1],q[0][1]-s*W*q[1][0]]})}
 var L=edge(1),R=edge(-1),C=pts.map(function(q){return q[0]}),o=pgon(L.concat(R.slice().reverse()),LFILL)+pline(L,LIGHT,1.2)+pline(R,LIGHT,1.2);
 rg.forEach(function(r){var Ae=r.A==="R"?R:L,Be=r.A==="R"?L:R,ca=r.first==="in"?BLUE:RED,cb=r.first==="in"?RED:BLUE;
  o+=pline(Ae.slice(r.i0,r.i1+1),ca,2.5,"round")+pline(Be.slice(r.i0,r.i1+1),cb,2.5,"round")+
   line(R[r.i0][0],R[r.i0][1],L[r.i0][0],L[r.i0][1],LIGHT,1.5)+line(R[r.i1][0],R[r.i1][1],L[r.i1][0],L[r.i1][1],LIGHT,1.5)});
 o+=pline(C,"#8a5a0b",1.2)+arw(C[0][0],C[0][1],C[1][0],C[1][1],"#8a5a0b")+arw(C[C.length-2][0],C[C.length-2][1],C[C.length-1][0],C[C.length-1][1],"#8a5a0b");
 return {svg:o,L:L,R:R,C:C,rg:rg}}
function bandOf(t,W){return band(t.p0,t.d0,[{K:t.q1,din:t.d0,dout:t.d1,N:t.N1,first:"in"},{K:t.q2,din:t.d1,dout:t.d,N:t.N2,first:"out"}],t.end,W)}

/* ---------- 特訓問題の図 ---------- */
function opt(poly,p0,d,box,key,w,h,label){
 var tr=["s","c","w"].map(function(m){return {m:m,t:trace(poly,p0,d,m,box)}}),L=["A","B","C"],ans="",q1,s="";
 tr.sort(function(a,b){return key(a.t.end)-key(b.t.end)});q1=tr[0].t.q1;
 s=pgon(poly,PALE,PALE,4)+line(p0[0],p0[1],q1[0],q1[1],LIGHT,1.5)+arw(p0[0],p0[1],q1[0],q1[1]);
 tr.forEach(function(o){s+=pline([o.t.q1,o.t.q2,o.t.end],LIGHT,1.5,"round")});
 s+='<circle cx="'+q1[0].toFixed(1)+'" cy="'+q1[1].toFixed(1)+'" r="3.5" fill="#fff" stroke="'+LIGHT+'" stroke-width="1.2"/>';
 tr.forEach(function(o,i){var t=o.t,c=[t.end[0]+13*t.d[0],t.end[1]+13*t.d[1]];
  if(o.m==="c")ans=L[i];
  s+='<circle cx="'+c[0].toFixed(1)+'" cy="'+c[1].toFixed(1)+'" r="11" fill="#fff" stroke="'+INK+'" stroke-width="1.2"/>'+TN(c[0],c[1]+5,14,L[i],"b","middle")});
 return {html:svg(w,h,label,s),ans:ans,tr:tr}}
function ansFig(poly,p0,d,box,w,h,label){
 var t=trace(poly,p0,d,"c",box);
 return svg(w,h,label,pgon(poly,GLASS,MUTED,1.5)+bandOf(t,9).svg+leg(8,14))}

var RECT=[[40,120],[300,120],[300,190],[40,190]],RB=[0,0,330,260.7];
var TRI=[[170,60],[249.3,230],[90.7,230]],TRI2=[[90.7,60],[249.3,60],[170,230]],TB=[0,0,316,300];
var s2=Math.SQRT1_2;
var Q1=opt(RECT,[29.3,49.3],[s2,s2],RB,function(e){return e[0]},340,290,"直方体のガラスに、左上から光が当たる図。光の道すじの候補が、A、B、Cの3つある");
var Q2=opt(RECT,[310.7,49.3],[-s2,s2],RB,function(e){return e[0]},340,290,"直方体のガラスに、右上から光が当たる図。光の道すじの候補が、A、B、Cの3つある");
var Q3=opt(TRI,[20,150],[1,0],TB,function(e){return e[1]},340,260,"三角柱のガラスに、左から水平に光が当たる図。頂点が上。光の道すじの候補が、A、B、Cの3つある");
var Q4=opt(TRI2,[20,140],[1,0],TB,function(e){return e[1]},340,260,"三角柱のガラスに、左から水平に光が当たる図。頂点が下。光の道すじの候補が、A、B、Cの3つある");
var A1=ansFig(RECT,[29.3,49.3],[s2,s2],RB,340,290,"(1)の正しい道すじ。光の帯の線を、速い側は赤、遅い側は青で表す。光は、遅い側(青)に曲がる");
var A2=ansFig(RECT,[310.7,49.3],[-s2,s2],RB,340,290,"(2)の正しい道すじ。光の帯の線を、速い側は赤、遅い側は青で表す。光は、遅い側(青)に曲がる");
var A3=ansFig(TRI,[20,150],[1,0],TB,340,260,"(3)の正しい道すじ。どちらの面でも、遅い側(青)の下に曲がる");
var A4=ansFig(TRI2,[20,140],[1,0],TB,340,260,"(4)の正しい道すじ。どちらの面でも、遅い側(青)の上に曲がる");

/* ---------- 厳選ポイントの図 ---------- */
function figSpeed(){
 var s=pgon([[64,46],[340,46],[340,88],[64,88]],GLASS,MUTED,1)+
  line(70,24,330,24,RED,2.5)+arw(70,24,330,24,RED)+line(70,17,70,31,RED,1.5)+line(330,17,330,31,RED,1.5)+
  line(70,66,243,66,BLUE,2.5)+arw(70,66,243,66,BLUE)+line(70,59,70,73,BLUE,1.5)+line(243,59,243,73,BLUE,1.5)+
  TN(6,29,14,"空気中","m b")+TN(6,71,14,"ガラス中","v b");
 return svg(340,96,"同じ時間に光が進む距離。空気中は長く、ガラス中は短い。ガラス中では光が遅くなる",s)}

/* 曲がる図：光(帯)が、空気からガラスに入る。幅は一定。遅い側(青)と速い側(赤)を色分け */
function beam(){
 var i=50*Math.PI/180,r=30*Math.PI/180,W=30,K=[340,200],d1=[Math.sin(i),Math.cos(i)],d2=[Math.sin(r),Math.cos(r)],
  L1=W*Math.sin(i)/d1[1],L2=W*Math.sin(r)/d2[1],
  M1=[K[0]-L1*d1[0],K[1]-L1*d1[1]],M2=[K[0]+L2*d2[0],K[1]+L2*d2[1]],
  P0=[M1[0]-130*d1[0],M1[1]-130*d1[1]],E=[M2[0]+110*d2[0],M2[1]+110*d2[1]],pts=[[P0,d1]],N=20,k;
 for(k=0;k<=N;k++){var t=k/N,a=(1-t)*(1-t),b=2*(1-t)*t,c=t*t,
  x=a*M1[0]+b*K[0]+c*M2[0],y=a*M1[1]+b*K[1]+c*M2[1],
  tx=2*(1-t)*(K[0]-M1[0])+2*t*(M2[0]-K[0]),ty=2*(1-t)*(K[1]-M1[1])+2*t*(M2[1]-K[1]),l=Math.hypot(tx,ty);
  pts.push([[x,y],[tx/l,ty/l]])}
 pts.push([E,d2]);
 function edge(s){return pts.map(function(q){return [q[0][0]+s*W*q[1][1],q[0][1]-s*W*q[1][0]]})}
 return {L:edge(1),R:edge(-1),C:pts.map(function(q){return q[0]}),d2:d2}}
function figBend(){
 var B=beam(),S=.7,OX=185,OY=60;
 function X(x){return (x-OX)*S+90}function Y(y){return (y-OY)*S+10}
 function M(a){return a.map(function(p){return [X(p[0]),Y(p[1])]})}
 var L=M(B.L),R=M(B.R),C=M(B.C),n=L.length-2,
  s='<rect x="0" y="'+Y(200).toFixed(1)+'" width="340" height="'+(215-Y(200)).toFixed(1)+'" fill="'+PALE+'"/>'+
  line(0,Y(200),340,Y(200),MUTED,1.5)+
  pgon(L.concat(R.slice().reverse()),LFILL)+
  pline(L,LIGHT,1.5)+pline(R,LIGHT,1.5)+
  pline(R.slice(1,n+1),BLUE,3.5,"round")+pline(L.slice(1,n+1),RED,3.5,"round")+
  line(R[1][0],R[1][1],L[1][0],L[1][1],LIGHT,2)+line(R[n][0],R[n][1],L[n][0],L[n][1],LIGHT,2)+
  line(X(340),Y(124),X(340),Y(272),GRAY,1,true)+
  pline(C,"#8a5a0b",1.5)+arw(C[C.length-2][0],C[C.length-2][1],C[C.length-1][0],C[C.length-1][1],"#8a5a0b");
 s+='<path d="M'+X(340).toFixed(1)+','+Y(130).toFixed(1)+' A49,49 0 0 0 '+X(286.4).toFixed(1)+','+Y(155).toFixed(1)+'" fill="none" stroke="'+MUTED+'" stroke-width="1.2"/>'+
  '<path d="M'+X(340).toFixed(1)+','+Y(270).toFixed(1)+' A49,49 0 0 0 '+X(375).toFixed(1)+','+Y(260.6).toFixed(1)+'" fill="none" stroke="'+MUTED+'" stroke-width="1.2"/>'+
  T(X(310.4),Y(136.6)-8,14,"入射角","b","middle")+T(X(358.1),Y(267.6)+17,14,"屈折角","b","middle")+
  line(84,130,X(306.7),Y(211.9),GRAY,1)+TN(54,134,14,"遅い","v b")+
  line(229,90,X(361.2)+2,Y(181.8),GRAY,1)+TN(232,94,14,"速い","m b")+
  T(6,26,14,"空気","g")+T(6,208,14,"ガラス","g")+T(52,36,14,"光","b");
 return svg(340,215,"光が空気からガラスに入って曲がる図。光は帯で表し、幅は一定。進行方向の右側が先にガラスに入って遅くなり(青)、左側はまだ空気中で速い(赤)。そのため光は右(遅い方)に曲がり、境界面に垂直な線に近づく",s)}

/* 参考：全反射。入射角を大きくしていく3つの場合を、横に並べる。
   A＝ガラス→空気(入射角が大きいと、屈折角が先に90°になり、そのあとは全反射)、B＝空気→ガラス(屈折角は90°にならず、いつもガラスに入る) */
function figTotal(kind){
 var R=Math.PI/180,Y=70,L=48,K=45,CX=[57,170,283],bg,s='',i;
 var A=kind==="A",
  cs=A?[["小さい入射角",25,"out","空気に出る","v"],["約42°の入射角",41.8,"edge","すれすれに出る","v"],["さらに大きい入射角",60,"ref","全反射","m"]]
      :[["小さい入射角",25,"in","ガラスに入る","v"],["大きい入射角",60,"in","ガラスに入る","v"],["90°近い入射角",85,"in","ガラスに入る","v"]];
 bg=pgon([[0,Y],[340,Y],[340,135],[0,135]],GLASS,"none")+line(0,Y,340,Y,MUTED,1.5);
 cs.forEach(function(c,k){
  var cx=CX[k],t=c[1]*R,sn=Math.sin(t),cn=Math.cos(t),S,E,F;
  s+=line(cx,18,cx,132,GRAY,1,true)+T(cx,12,12,c[0],"b","middle");
  if(A){
   S=[cx-L*sn,Y+L*cn];
   if(c[2]==="out"){var r=Math.asin(1.5*sn);E=[cx+K*Math.sin(r),Y-K*Math.cos(r)]}
   else if(c[2]==="edge")E=[cx+44,Y];
   else E=[cx+L*sn,Y+L*cn];
  }else{
   S=[cx-L*sn,Y-L*cn];
   var r2=Math.asin(sn/1.5);E=[cx+K*Math.sin(r2),Y+K*Math.cos(r2)];
  }
  s+=ray(S,[cx,Y])+ray([cx,Y],E)+T(cx,158,14,c[3],c[4]+" b","middle")});
 s+=T(336,64,12,"空気","g","end")+T(336,128,12,"ガラス","g","end");
 s+=T(170,182,14,A?"入射角が大きいと、全反射が起こる":"入射角が大きくても、全反射は起こらない","b","middle");
 return svg(340,192,A?"ガラスから空気に向かう光の図。入射角が小さいと、光は空気に出る。入射角が約42度になると、光は境界面ぞいに出る。入射角がそれより大きいと、光は空気に出られず、境界面ですべて反射する(全反射)":"空気からガラスに向かう光の図。入射角が小さくても、大きくても、90度近くても、光は屈折して、いつもガラスの中に入る。そのため、全反射は起こらない",bg+s)}

/* ---------- 補充問題：ガラスの向こうの鉛筆 ---------- */
var BLK=[[60,85],[260,85],[260,135],[60,135]],PEN=[110,30];
var TP=trace(BLK,PEN,nrm([40,55]),"c",[0,0,340,215]),EYE=TP.end,
 PA=[TP.q2[0]-(TP.q2[1]-PEN[1])*TP.d[0]/TP.d[1],PEN[1]];
function topBlock(){return pgon(BLK,GLASS,MUTED,1.5)+TN(66,129,12,"ガラス","g")}
function topDots(){return '<circle cx="'+PEN[0]+'" cy="'+PEN[1]+'" r="5" fill="'+INK+'"/>'+T(PEN[0],17,14,"鉛筆","b","middle")+
 '<circle cx="'+EYE[0].toFixed(1)+'" cy="'+EYE[1].toFixed(1)+'" r="5" fill="'+INK+'"/>'+T(EYE[0],EYE[1]+20,14,"自分","b","middle")}
function figPQ(){return svg(340,240,"上から見た図。ガラスの向こうに鉛筆が立っている。ガラスの右手前に、自分がいる",topBlock()+topDots())}
function figPA(){
 var bd=bandOf(TP,6).svg,
  s=topBlock()+bd+topDots()+
  line(TP.q2[0],TP.q2[1],PA[0],PA[1],BLUE,1.5,true)+
  '<circle cx="'+PA[0].toFixed(1)+'" cy="'+PA[1].toFixed(1)+'" r="5" fill="#fff" stroke="'+BLUE+'" stroke-width="1.5" stroke-dasharray="3 2"/>'+
  T(PA[0]-9,PA[1]+5,13,"見える位置","v b","end")+leg(268,16);
 return svg(340,240,"上から見た図。鉛筆から出た光の帯は、ガラスに入るときも出るときも、遅い側(青)に曲がって、自分の目に届く。自分には、光が来た向きの延長線上の、鉛筆の本当の位置より左に、鉛筆があるように見える",s)}
function figPO(){
 var s='',cx=[60,170,280],sh=[-9,0,9],nm=["①","②","③"],i;
 for(i=0;i<3;i++){
  s+=pgon([[cx[i]-40,60],[cx[i]+40,60],[cx[i]+40,105],[cx[i]-40,105]],GLASS,MUTED,1)+
   line(cx[i],12,cx[i],60,INK,6)+line(cx[i]+sh[i],60,cx[i]+sh[i],105,INK,6)+TN(cx[i],132,15,nm[i],"b","middle")}
 return svg(340,142,"自分から見た鉛筆の3つの見え方。ガラス越しの下半分が、1は左にずれ、2はずれず、3は右にずれる",s)}

/* ---------- 文章 ---------- */
var POINT='<div><p>光は、同じ物質の中では<b>直進</b>します。</p>'+
 '<p>光は、空気中より、水やガラスの中で<b>遅く</b>なります。</p>'+figSpeed()+
 '<p class="note">同じ時間に進む距離です。</p></div>'+
 '<div style="margin-top:1.8rem"><p>光は、境界面で、<b>遅い方に曲がります</b>。これを光の屈折といいます。</p>'+figBend()+
 '<p class="note">先にガラスに入った側(青)が遅くなるので、光は、そちら(遅い方)に曲がります。</p>'+
 '<p class="note">境界面に垂直に入った光は、両側が同時に遅くなります。どちらかに曲がることがないので、直進します。</p></div>';

var TOTAL='<p>ガラス(水)から空気に出るとき、光は、遅い方に曲がり、屈折角は入射角より大きくなります。入射角を大きくすると、屈折角が先に90°になり、それをこえると光は出られず、すべて反射します。これを<b>全反射</b>といいます。</p>'+figTotal("A")+
 '<p>空気からガラス(水)に入るときも、光は、遅い方に曲がり、屈折角は入射角より小さくなります。入射角が90°に近くても、屈折角は約42°までなので、光はいつもガラスに入ります。全反射は起こりません。</p>'+figTotal("B");

var QBODY='<p>光がガラスに当たったとき、光の進み方として正しいものを、A〜Cから選びなさい。</p>'+
 '<p>(1)</p>'+Q1.html+'<p>(2)</p>'+Q2.html+'<p>(3)</p>'+Q3.html+'<p>(4)</p>'+Q4.html;
var SOL='<p>光は、<b>遅い方に曲がります</b>。</p>'+
 '<p class="note">光の帯の線は、赤が速い側、青が遅い側です。空気中は速く、ガラスの中は遅くなります。</p>'+
 '<p>(1) <b>'+Q1.ans+'</b><br>入るとき：先にガラスに入った側が遅い → 青い方に曲がる。<br>出るとき：先に空気に出た側が速い → 青い方に曲がる。</p>'+A1+
 '<p>(2) <b>'+Q2.ans+'</b><br>向きが変わっても、青い方に曲がります。</p>'+A2+
 '<p>(3) <b>'+Q3.ans+'</b><br>どちらの面でも、青が下側 → 下に曲がる。</p>'+A3+
 '<p>(4) <b>'+Q4.ans+'</b><br>どちらの面でも、青が上側 → 上に曲がる。</p>'+A4;
var SOL2='<p>光は、遅い方(青)に曲がります。</p>'+figPA()+
 '<p>目には、光が来た向きの延長線上(点線の先)に、鉛筆があるように見えます。<br>自分から見て、ガラス越しの下半分は、本当の位置より左にずれます。答えは<b>①</b>です。</p>';

window.UNIT={
no:"1-9",title:"光の屈折",
sections:[
{type:"text",point:true,title:"厳選ポイント",html:POINT},
{type:"problem",title:"問題",body:QBODY,
 parts:[
  {label:"(1)",type:"choice",choices:["A","B","C"],accept:[Q1.ans]},
  {label:"(2)",type:"choice",choices:["A","B","C"],accept:[Q2.ans]},
  {label:"(3)",type:"choice",choices:["A","B","C"],accept:[Q3.ans]},
  {label:"(4)",type:"choice",choices:["A","B","C"],accept:[Q4.ans]}
 ]},
{type:"answer",html:SOL},
{type:"problem",title:"補充問題",
 body:'<p>図のように、ガラスの向こうに鉛筆が1本立っている。ガラスは、鉛筆の下半分だけをおおう高さである。図は、上から見たものである。</p>'+figPQ()+
  '<p>自分の位置から見ると、鉛筆はどのように見えるか。①〜③から選びなさい。</p>'+figPO()+
  '<p class="note">①〜③は、自分から見た鉛筆です。青いうすい四角が、ガラスです。</p>',
 parts:[{label:"(1)",type:"choice",choices:["①","②","③"],accept:["①"]}],
 solution:SOL2},
{type:"text",title:"参考：全反射",html:TOTAL}
]};
})();
