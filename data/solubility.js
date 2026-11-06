(function(){
var INK="#26303b",BLUE="#1f5fa8",RED="#c2410c",GRID="#e4e8ec";
function T(x,y,size,txt,cls,anchor){return '<text x="'+x+'" y="'+y+'" font-size="'+size+'"'+(anchor?' text-anchor="'+anchor+'"':'')+(cls?' class="'+cls+'"':'')+'>'+txt+'</text>'}
function svg(w,h,label,body,vb){return '<div class="fig"><svg viewBox="'+(vb||('0 0 '+w+' '+h))+'" role="img" aria-label="'+label+'">'+body+'</svg></div>'}

/* 溶解度曲線：物質A。20℃で20g、40℃で60g、50℃で100gを通る、なめらかな曲線(y＝A×e^(B×t)＋C)。10℃ごとに、曲線の傾きに合わせてつなぐ */
function X(t){return 50+t*250/60}
function Y(g){return 230-g*2}
var UU=(1+Math.sqrt(5))/2,BB=Math.log(UU)/10,AA=40/(UU*UU*(UU*UU-1)),CC=20-AA*UU*UU;
function F(t){return AA*Math.exp(BB*t)+CC}
function FD(t){return AA*BB*Math.exp(BB*t)}
var TT=[0,10,20,30,40,50],VV=TT.map(F),MM=TT.map(FD);
function curve(){
 var s='M'+X(0)+','+Y(VV[0]).toFixed(1),k=2/(250/60);
 for(var i=0;i<5;i++){
  var dx=(X(TT[i+1])-X(TT[i]))/3;
  s+=' C'+(X(TT[i])+dx).toFixed(1)+','+(Y(VV[i])-MM[i]*k*dx).toFixed(1)+' '+(X(TT[i+1])-dx).toFixed(1)+','+(Y(VV[i+1])+MM[i+1]*k*dx).toFixed(1)+' '+X(TT[i+1]).toFixed(1)+','+Y(VV[i+1]).toFixed(1);
 }
 return s}
function line(x1,y1,x2,y2,k,w,dash){return '<line x1="'+x1+'" y1="'+y1+'" x2="'+x2+'" y2="'+y2+'" stroke="'+k+'" stroke-width="'+(w||1)+'"'+(dash?' stroke-dasharray="4 3"':'')+'/>'}

/* グラフ。o.pts＝読み取る点[[温度,溶解度]]、o.yt＝縦軸の名前、o.extra＝書き足し、o.label＝読み上げ用の説明 */
function graph(o){
 var s='',xs=o.pts.map(function(p){return p[0]}),ys=o.pts.map(function(p){return p[1]});
 for(var t=0;t<=60;t+=10){var h=xs.indexOf(t)>=0;
  s+=line(X(t),Y(100),X(t),230,GRID)+T(X(t),247,h?14:12,t,h?"v b":null,"middle")}
 for(var g=0;g<=100;g+=20){var r=ys.indexOf(g)>=0;
  s+=line(50,Y(g),300,Y(g),GRID)+T(44,Y(g)+4,r?14:12,g,r?"m b":null,"end")}
 s+=line(50,Y(100),50,230,INK,1.5)+line(50,230,300,230,INK,1.5);
 s+=T(6,16,12,o.yt)+T(300,264,12,"温度(℃)",null,"end");
 s+='<path d="'+curve()+'" fill="none" stroke="'+INK+'" stroke-width="2"/>'+T(268,18,13,"物質A","b");
 o.pts.forEach(function(p){
  s+=line(X(p[0]),230,X(p[0]),Y(p[1]),BLUE,1.5,true)+line(X(p[0]),Y(p[1]),50,Y(p[1]),RED,1.5,true)+
   '<circle cx="'+X(p[0])+'" cy="'+Y(p[1])+'" r="4" fill="'+RED+'"/>'});
 return svg(320,272,o.label,s+(o.extra||""))}

var YT="水100gに溶ける質量(g)";
var GRAPH_POINT=graph({yt:"溶ける質量(g)",pts:[[40,60]],label:"物質Aの溶解度曲線。40℃から上に進み、曲線で左に曲がると60gと読めます。40℃の水100gに60gまで溶けます",
 extra:line(150,68,X(40)-5,Y(60)-5,"#8a949f",1)+T(62,52,13,"40℃の水100gに","v b")+T(62,70,13,"60gまで溶ける","m b")});
var GRAPH_PLAIN=graph({yt:YT,pts:[],label:"物質Aの溶解度曲線。温度が高いほど、水100gに溶ける質量が大きくなります"});
var GRAPH_ANS=graph({yt:YT,pts:[[50,100],[20,20]],label:"物質Aの溶解度曲線。50℃では100g、20℃では20gまで溶けます。その差の80gが結晶になります",
 extra:line(X(50)+2,Y(100),268,Y(100),"#8a949f",1,true)+line(X(20)+2,Y(20),268,Y(20),"#8a949f",1,true)+
  '<path d="M268,'+Y(100)+' H274 V'+Y(20)+' H268" fill="none" stroke="'+RED+'" stroke-width="1.5"/>'+T(278,Y(60)-2,13,"結晶","m b")+T(278,Y(60)+16,14,"80g","m b")});

/* 厳選ポイントの図：水100gに物質Aを溶かす(1-3のビーカーと同じ描き方。はかりなし) */
function beaker(){
 var s='<path d="M62,64 V212 A68,8 0 0 0 198,212 V64" fill="#eef4fa" fill-opacity=".5" stroke="#5d6874" stroke-width="2"/>'+
  '<path d="M63,116 V212 A67,8 0 0 0 197,212 V116 Z" fill="#cfe0f3"/>'+
  '<ellipse cx="130" cy="212" rx="68" ry="8" fill="#fff" fill-opacity=".25" stroke="#5d6874" stroke-opacity=".4"/>'+
  '<ellipse cx="130" cy="116" rx="67" ry="7" fill="#bcd6ee" stroke="'+BLUE+'" stroke-width="1.5"/>'+
  '<ellipse cx="130" cy="64" rx="68" ry="8" fill="none" stroke="#5d6874" stroke-width="2"/>';
 [[112,162],[158,174],[100,188],[130,198],[170,152]].forEach(function(d){s+='<circle cx="'+d[0]+'" cy="'+d[1]+'" r="3.5" fill="'+RED+'"/>'});
 [[110,22],[130,12],[148,28],[120,42],[140,46]].forEach(function(d){s+='<circle cx="'+d[0]+'" cy="'+d[1]+'" r="3.5" fill="'+RED+'"/>'});
 s+='<path d="M66,92 h14 M66,116 h14 M66,140 h14 M66,164 h14 M66,188 h14 M66,104 h8 M66,128 h8 M66,152 h8 M66,176 h8 M66,200 h8" stroke="#5d6874" fill="none"/>'+
  '<rect x="72" y="72" width="6" height="134" rx="3" fill="#fff" opacity=".5"/>'+
  '<path d="M214,116 H220 V214 H214" fill="none" stroke="'+BLUE+'" stroke-width="1.5"/>'+
  T(230,170,14,"水はいつも100g","v b")+
  line(232,30,156,28,RED,1,true)+T(236,35,14,"物質A","m b");
 return svg(0,0,"水100gが入ったビーカーに、物質Aの粒を入れて溶かしている図",s,"30 0 366 232")}
var BEAKER=beaker();

var C='<span class="v">',R='<span class="m">',E='</span>';

var SOL=GRAPH_ANS+
 '<p>50℃：'+R+'100g'+E+'　20℃：'+R+'20g'+E+'<br>溶けきれない分が、結晶になって出てきます。</p>'+
 '<p>100g − 20g ＝ <b class="m">80g</b></p>'+
 '<p class="note">限界まで溶けた水溶液を、「飽和水溶液」といいます。</p>';

var SOL2='<p>水200gは、水100gの2倍です。溶ける限度も、2倍になります。</p>'+
 '<p>① 水200gに溶ける限度<br>50℃：100g × 2 ＝ '+R+'<b>200g</b>'+E+'<br>20℃：20g × 2 ＝ '+R+'<b>40g</b>'+E+'</p>'+
 '<p>② 出てくる結晶<br>200g − 40g ＝ <b>160g</b></p>';

window.UNIT={
no:"1-4",title:"溶解度",
sections:[
{type:"text",point:true,title:"厳選ポイント",html:
 '<p>溶解度は、<span class="v" style="white-space:nowrap">水100g</span>に溶ける物質の限度の<span class="m" style="white-space:nowrap">質量</span>です。</p>'+BEAKER+'<p class="note">赤い点は、物質Aの粒のイメージです。水の中の粒は、溶けています。</p>'+GRAPH_POINT},
{type:"problem",title:"問題",
 body:'<p>50℃の水100gに、物質Aを限界まで溶かした。これを20℃まで冷やすと、結晶は何g出てくるか。グラフを使って求めなさい。</p>'+GRAPH_PLAIN,
 parts:[{label:"答え",unit:"g",type:"number",accept:[80],tol:0.5}]},
{type:"answer",html:SOL},
{type:"problem",title:"補充問題",
 body:'<p>50℃の水200gに、物質Aを限界まで溶かした。これを20℃まで冷やすと、結晶は何g出てくるか。</p>'+GRAPH_PLAIN,
 parts:[{label:"答え",unit:"g",type:"number",accept:[160],tol:0.5}],
 solution:SOL2}
]};
})();
