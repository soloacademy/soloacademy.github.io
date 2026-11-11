(function(){
var INK="#26303b",BLUE="#1f5fa8",RED="#c2410c",GRAY="#8a949f",MUTED="#5d6874",TUFF="#d5dae0";
function n(v){return Math.round(v*10)/10}
function T(x,y,size,txt,cls,anchor){return '<text x="'+n(x)+'" y="'+n(y)+'" font-size="'+size+'"'+(anchor?' text-anchor="'+anchor+'"':'')+(cls?' class="'+cls+'"':'')+'>'+txt+'</text>'}
/* 色つきの面の上の文字：まわりの白いふちを消す */
function TN(x,y,size,txt,cls,anchor){return '<text x="'+n(x)+'" y="'+n(y)+'" font-size="'+size+'" style="stroke:none"'+(anchor?' text-anchor="'+anchor+'"':'')+(cls?' class="'+cls+'"':'')+'>'+txt+'</text>'}
function line(x1,y1,x2,y2,k,w,dash){return '<line x1="'+n(x1)+'" y1="'+n(y1)+'" x2="'+n(x2)+'" y2="'+n(y2)+'" stroke="'+k+'" stroke-width="'+(w||1)+'"'+(dash?' stroke-dasharray="'+dash+'"':'')+'/>'}
function rect(x,y,w,h,f,k,sw){return '<rect x="'+n(x)+'" y="'+n(y)+'" width="'+n(w)+'" height="'+n(h)+'" fill="'+f+'" stroke="'+k+'" stroke-width="'+(sw||1)+'"/>'}
function dot(x,y){return '<circle cx="'+n(x)+'" cy="'+n(y)+'" r="4" fill="'+INK+'"/>'}
function svg(h,label,body){return '<div class="fig"><svg viewBox="0 0 340 '+h+'" role="img" aria-label="'+label+'">'+body+'</svg></div>'}
function R(t){return '<tspan class="m b">'+t+'</tspan>'}
function V(t){return '<tspan class="v b">'+t+'</tspan>'}
function legend(y){return rect(14,y,16,12,TUFF,GRAY,1.2)+T(36,y+11,14,"凝灰岩")}

/* 柱ごとの、深さの小さな目盛り(左)。5mごとに目盛り線、10mごとに数字。xl＝線の位置、y0＝地表の高さ、k＝1mあたりのpx、mx＝いちばん下の深さ */
function ruler(xl,y0,k,mx){
 var s=line(xl,y0,xl,y0+k*mx,GRAY,1),d;
 for(d=0;d<=mx;d+=5){
  if(d%10===0)s+=line(xl-5,y0+k*d,xl,y0+k*d,GRAY,1)+T(xl-7,y0+k*d+4,12,d+"m","g","end");
  else s+=line(xl-3,y0+k*d,xl,y0+k*d,GRAY,1)}
 return s}
/* 滑らかな曲線(通る点のリスト) */
function smooth(P){var d='M'+P[0][0]+','+P[0][1],i,p0,p1,p2,p3;
 for(i=0;i<P.length-1;i++){p0=P[i-1]||P[i];p1=P[i];p2=P[i+1];p3=P[i+2]||p2;
  d+=' C'+n(p1[0]+(p2[0]-p0[0])/6)+','+n(p1[1]+(p2[1]-p0[1])/6)+' '+n(p2[0]-(p3[0]-p1[0])/6)+','+n(p2[1]-(p3[1]-p1[1])/6)+' '+p2[0]+','+p2[1]}
 return d}

/* ---------- 厳選ポイントの図1：地表をそろえた柱状図(縮尺 1m＝3px)。標高は、見出しに書く ---------- */
function figPointA(){
 var g=36,s=T(10,18,14,"標高"+R("55m")+"の地点","b")+T(178,18,14,"標高"+R("45m")+"の地点","b");
 [{x:42,dp:25},{x:212,dp:15}].forEach(function(u){
  s+=ruler(u.x-4,g,3,30)+rect(u.x,g,40,105,"#fff",GRAY,1.2)+rect(u.x,g+3*u.dp,40,18,TUFF,GRAY,1.2)+line(u.x,g,u.x+40,g,INK,3)});
 s+=legend(152);
 return svg(172,"柱状図を2本並べた図。地表の高さをそろえてある。左は標高55mの地点、右は標高45mの地点。それぞれの柱の左に、地表からの深さの目盛りがある。凝灰岩の上面までの深さは、左が25m、右が15m",s)}

/* ---------- 厳選ポイントの図2：標高をそろえた柱状図(縮尺 1m＝3px)。上面の標高がそろう ---------- */
function figPointB(){
 var Y=function(e){return 36+3*(55-e)},s=T(10,18,14,"標高"+R("55m")+"の地点","b")+T(178,18,14,"標高"+R("45m")+"の地点","b");
 s+=line(38,Y(55),38,Y(10),GRAY,1)+T(10,34,12,"標高","g");
 [10,20,30,40,50].forEach(function(e){s+=line(35,Y(e),38,Y(e),GRAY,1)+T(33,Y(e)+4,12,e+"m","g","end")});
 [{x:42,gv:55,bt:20},{x:212,gv:45,bt:10}].forEach(function(u){
  s+=rect(u.x,Y(u.gv),40,Y(u.bt)-Y(u.gv),"#fff",GRAY,1.2)+rect(u.x,Y(30),40,18,TUFF,GRAY,1.2)+line(u.x,Y(u.gv),u.x+40,Y(u.gv),INK,3)});
 s+=line(42,Y(30),258,Y(30),RED,1.5,"6 4")+T(262,Y(30)+5,16,"上面 "+R("30m"))+legend(184);
 return svg(202,"柱状図を2本並べた図。標高をそろえてある。左の目盛りは標高。左は標高55mの地点、右は標高45mの地点。凝灰岩の上面は、どちらも標高30mで、同じ高さにそろっている",s)}

/* ---------- 図1：等高線(上から見た図。北が上)。すべて曲線。A(120,60) B(220,60) C(220,160) D(120,160) ---------- */
function figContour(){
 var C=[
  {v:"90m",P:[[10,92],[32,62],[58,46],[72,30],[88,10]]},
  {v:"80m",P:[[10,168],[48,128],[84,102],[120,60],[152,46],[176,22],[188,10]]},
  {v:"70m",P:[[62,226],[96,190],[120,160],[168,126],[196,86],[220,60],[250,36],[276,10]]},
  {v:"60m",P:[[142,232],[180,200],[220,160],[250,138],[282,100],[312,70],[330,52]]}],s='';
 C.forEach(function(c,i){
  s+='<path d="'+smooth(c.P)+'" fill="none" stroke="'+GRAY+'" stroke-width="1.2"/>';
  s+=i<2?T(14,c.P[0][1]+16,16,c.v,"m b"):T(c.P[0][0]-4,226,16,c.v,"m b","end")});
 s+='<polygon points="120,60 220,60 220,160 120,160" fill="none" stroke="'+INK+'" stroke-width="1.5" stroke-linejoin="round"/>'+
  dot(120,60)+dot(220,60)+dot(220,160)+dot(120,160)+
  T(108,54,16,"A","b","end")+T(212,54,16,"B","b","end")+T(228,182,16,"C","b")+T(128,182,16,"D","b")+
  T(314,22,16,"北","b","middle")+line(314,52,314,30,INK,1.5)+'<path d="M309,37 L314,30 L319,37" fill="none" stroke="'+INK+'" stroke-width="1.5"/>';
 return svg(240,"上から見た等高線の図。北が上。90m、80m、70m、60mの等高線が、曲線で、おおよそ平行に並ぶ。A、B、C、Dを結ぶと正方形になる。Aは80mの等高線の上、BとDは70mの等高線の上、Cは60mの等高線の上にある",s)}

/* ---------- 図2：柱状図(地表をそろえる。深さは左の目盛りから読む。縮尺 1m＝6px) ---------- */
function figCol(){
 var us=[6,116,226],dp=[15,5,10],L="ABC",s='',Y=function(m){return 50+6*m};
 us.forEach(function(u,i){
  var x=u+30;
  s+=ruler(u+26,50,6,20)+rect(x,50,32,132,"#fff",GRAY,1.2)+rect(x,Y(dp[i]),32,18,TUFF,GRAY,1.2)+line(x,50,x+32,50,INK,3)+
   T(x+16,38,16,L.charAt(i),"b","middle")});
 s+=legend(196);
 return svg(218,"地点A、B、Cの柱状図。地表の高さをそろえてある。それぞれの柱の左に、地表からの深さの目盛りがある。凝灰岩の層の上面までの深さを、目盛りから読み取る",s)}

/* ---------- 問題の解答の図：標高をそろえた柱状図(縮尺 1m＝4px) ---------- */
function figAns(){
 var xs=[44,144,244],gE=[80,70,60],dp=[15,5,10],tv=[65,65,50],L="ABC",s='',Y=function(e){return 40+4*(80-e)};
 s+=line(32,Y(80),32,Y(40),GRAY,1)+T(4,28,12,"標高","g");
 [40,50,60,70,80].forEach(function(e){s+=line(29,Y(e),32,Y(e),GRAY,1)+T(27,Y(e)+4,12,e+"m","g","end")});
 xs.forEach(function(x,i){
  s+=rect(x,Y(gE[i]),44,200-Y(gE[i]),"#fff",GRAY,1.2)+rect(x,Y(tv[i]),44,20,TUFF,GRAY,1.2)+line(x,Y(gE[i]),x+44,Y(gE[i]),INK,3)+
   T(x+22,Y(gE[i])-8,16,gE[i]+"m","m b","middle")+
   TN(x+22,Y(tv[i])+15,16,tv[i]+"m","m b","middle")+
   '<path d="M'+(x+48)+','+Y(gE[i])+' H'+(x+54)+' V'+Y(tv[i])+' H'+(x+48)+'" fill="none" stroke="'+BLUE+'" stroke-width="1.5"/>'+
   T(x+58,(Y(gE[i])+Y(tv[i]))/2+5,16,dp[i]+"m","v b")+
   T(x+22,222,16,L.charAt(i),"b","middle")});
 s+=legend(234);
 return svg(250,"標高をそろえた柱状図。左の目盛りは標高。Aは、地表の標高80m、深さ15m、凝灰岩の上面の標高65m。Bは、地表の標高70m、深さ5m、上面の標高65m。Cは、地表の標高60m、深さ10m、上面の標高50m",s)}

/* ---------- 補充の解答の図：凝灰岩の上面の標高。ABとDCは平行で、どちらも水平 ---------- */
function figD(){
 var s=line(80,50,240,50,RED,2,"6 4")+line(80,150,240,150,RED,2,"6 4")+
  '<polygon points="110,50 210,50 210,150 110,150" fill="none" stroke="'+INK+'" stroke-width="1.2" stroke-linejoin="round"/>'+
  dot(110,50)+dot(210,50)+dot(210,150)+dot(110,150)+
  T(104,38,16,"A "+R("65m"),null,"end")+T(216,38,16,"B "+R("65m"))+
  T(216,174,16,"C "+R("50m"))+T(104,174,16,"D "+R("50m"),null,"end")+
  T(248,55,14,"水平","g")+T(248,155,14,"水平","g");
 return svg(190,"凝灰岩の上面の標高を、上から見た図。A、B、C、Dは正方形の頂点。AとBは、どちらも65mなので、線ABは水平。ABとDCは平行なので、線DCも水平で、DはCと同じ50m",s)}

/* ---------- 文章 ---------- */
var COND='<p>地層は、傾きが一定で、平行に重なっている。地層の上下の逆転や断層はない。</p>';

var POINT='<p>柱状図から、地層の高さを比べるときは、<b>標高を書き入れる</b>ことが大切です。</p>'+figPointA()+
 '<p>地表の標高から、深さを引いて、上面の標高を書き入れます。</p>'+
 '<p><span class="m">55m</span> − <span class="v">25m</span> ＝ <b class="m">30m</b><br><span class="m">45m</span> − <span class="v">15m</span> ＝ <b class="m">30m</b></p>'+figPointB()+
 '<p class="note">標高をそろえると、2つの地層が同じ高さだとわかります。</p>';

var QBODY='<p>図1は、ある地域の等高線を、上から見たものである。A、B、C、Dを直線で結ぶと、正方形になる。図2は、地点A、B、Cの柱状図である。</p>'+COND+
 '<p>図1</p>'+figContour()+'<p>図2(左の目盛りと数字は、地表からの深さ)</p>'+figCol()+
 '<p>地点A、B、Cで、凝灰岩の層の上面の標高を求めなさい。</p>';

var ANS='<p>地表の標高は図1から、深さは図2から読み取り、標高をそろえて考えます。</p>'+figAns()+
 '<p>(1) A：<span class="m">80m</span> − <span class="v">15m</span> ＝ <b class="m">65m</b><br>'+
 '(2) B：<span class="m">70m</span> − <span class="v">5m</span> ＝ <b class="m">65m</b><br>'+
 '(3) C：<span class="m">60m</span> − <span class="v">10m</span> ＝ <b class="m">50m</b></p>';

var SBODY='<p>図1の地点Dで、凝灰岩の層の上面は、地表から何mの深さにあるか。問題で求めた、A、B、Cの上面の標高を使いなさい。</p>'+COND+figContour();

var SOL='<p>(1) Dは、Bと同じ70mの等高線の上にあります。<br>Dの地表の標高：<b class="m">70m</b></p>'+
 '<p>(2) AとBの上面は、どちらも65mです。同じ標高の点を結んだ線ABは、<b>水平</b>です。<br>ABとDCは平行なので、DCも水平。DはCと同じ、<b class="m">50m</b>です。</p>'+figD()+
 '<p>(3) <span class="m">70m</span> − <span class="m">50m</span> ＝ <b class="v">20m</b></p>';

window.UNIT={
no:"1-19",title:"地層",
sections:[
{type:"text",point:true,title:"厳選ポイント",html:POINT},
{type:"problem",title:"問題",body:QBODY,
 parts:[
  {label:"(1) A地点",unit:"m",type:"number",accept:[65],tol:0.5},
  {label:"(2) B地点",unit:"m",type:"number",accept:[65],tol:0.5},
  {label:"(3) C地点",unit:"m",type:"number",accept:[50],tol:0.5}
 ]},
{type:"answer",html:ANS},
{type:"problem",title:"補充問題",body:SBODY,
 parts:[
  {label:"(1) Dの地表の標高",unit:"m",type:"number",accept:[70],tol:0.5},
  {label:"(2) Dの上面の標高",unit:"m",type:"number",accept:[50],tol:0.5},
  {label:"(3) Dの深さ",unit:"m",type:"number",accept:[20],tol:0.5}
 ],
 solution:SOL}
]};
})();
