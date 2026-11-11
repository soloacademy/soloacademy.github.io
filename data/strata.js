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

/* ---------- 厳選ポイントの図：柱状図を2本(縮尺 1m＝4px。上面の高さ30mをそろえる) ---------- */
function figPoint(){
 var s=T(14,22,14,"地表が高い地点","b")+T(182,22,14,"地表が低い地点","b");
 s+=rect(14,40,50,150,"#fff",GRAY,1.2)+rect(182,80,50,110,"#fff",GRAY,1.2)+
  rect(14,140,50,24,TUFF,GRAY,1.2)+rect(182,140,50,24,TUFF,GRAY,1.2)+
  line(14,40,64,40,INK,3)+line(182,80,232,80,INK,3)+
  '<path d="M70,40 H76 V140 H70 M238,80 H244 V140 H238" fill="none" stroke="'+BLUE+'" stroke-width="1.5"/>'+
  TN(39,157,14,"凝灰岩",null,"middle")+TN(207,157,14,"凝灰岩",null,"middle")+
  T(84,45,16,"地表 "+R("55m"))+T(84,95,16,"深さ "+V("25m"))+T(84,145,16,"上面 "+R("30m"))+
  T(252,85,16,"地表 "+R("45m"))+T(252,115,16,"深さ "+V("15m"))+T(252,145,16,"上面 "+R("30m"))+
  T(14,218,16,R("55m")+" − "+V("25m")+" ＝ "+R("30m"))+T(182,218,16,R("45m")+" − "+V("15m")+" ＝ "+R("30m"));
 return svg(232,"柱状図を2本並べた図。左は地表が高い地点で、地表の標高55m、深さ25mで、凝灰岩の上面の標高は30m。右は地表が低い地点で、地表の標高45m、深さ15mで、凝灰岩の上面の標高は30m。2本とも、凝灰岩の上面の高さがそろっている",s)}

/* ---------- 図1：等高線(上から見た図。北が上)。A(120,60) B(220,60) C(220,160) D(120,160)。標高＝90−(x＋y−80)/10 ---------- */
function figContour(){
 var s='',cs=[80,180,280,380],lab=["90m","80m","70m","60m"];
 cs.forEach(function(c,i){var x1=Math.max(10,c-230),x2=Math.min(330,c-10);
  s+=line(x1,c-x1,x2,c-x2,GRAY,1.2);
  s+=x1<=10?T(14,c-x1+16,16,lab[i],"m b"):T(x1-4,226,16,lab[i],"m b","end")});
 s+='<polygon points="120,60 220,60 220,160 120,160" fill="none" stroke="'+INK+'" stroke-width="1.5" stroke-linejoin="round"/>'+
  dot(120,60)+dot(220,60)+dot(220,160)+dot(120,160)+
  T(108,54,16,"A","b","end")+T(212,54,16,"B","b","end")+T(228,182,16,"C","b")+T(128,182,16,"D","b")+
  T(314,22,16,"北","b","middle")+line(314,52,314,30,INK,1.5)+'<path d="M309,37 L314,30 L319,37" fill="none" stroke="'+INK+'" stroke-width="1.5"/>';
 return svg(240,"上から見た等高線の図。北が上。90m、80m、70m、60mの等高線が、斜めに平行に並ぶ。A、B、C、Dを結ぶと正方形になる。Aは80mの等高線の上、BとDは70mの等高線の上、Cは60mの等高線の上にある",s)}

/* ---------- 図2：柱状図(深さを示す。縮尺 1m＝6px) ---------- */
function figCol(){
 var xs=[62,154,246],dp=[15,5,10],L="ABC",s='',Y=function(m){return 50+6*m};
 s+=line(58,50,58,182,GRAY,1)+[0,10,20].map(function(m){return line(54,Y(m),58,Y(m),GRAY,1)}).join('')+
  T(50,55,14,"地表","g","end")+T(50,Y(10)+5,14,"10m","g","end")+T(50,Y(20)+5,14,"20m","g","end");
 xs.forEach(function(x,i){
  s+=rect(x,50,40,132,"#fff",GRAY,1.2)+rect(x,Y(dp[i]),40,18,TUFF,GRAY,1.2)+line(x,50,x+40,50,INK,3)+
   T(x+20,38,16,L.charAt(i),"b","middle")+
   '<path d="M'+(x+44)+',50 H'+(x+50)+' V'+Y(dp[i])+' H'+(x+44)+'" fill="none" stroke="'+BLUE+'" stroke-width="1.5"/>'+
   T(x+54,(50+Y(dp[i]))/2+5,16,dp[i]+"m","v b")});
 s+=legend(196);
 return svg(218,"地点A、B、Cの柱状図。左の目盛りは、地表を0mとした深さ。それぞれの柱に、凝灰岩の層がある。凝灰岩の層の上面までの深さは、Aが15m、Bが5m、Cが10m",s)}

/* ---------- 問題の解答の図：標高を書き込んだ柱状図(縮尺 1m＝4px) ---------- */
function figAns(){
 var xs=[20,124,228],gE=[80,70,60],dp=[15,5,10],tv=[65,65,50],L="ABC",s='',Y=function(e){return 40+4*(80-e)};
 xs.forEach(function(x,i){
  s+=rect(x,Y(gE[i]),44,200-Y(gE[i]),"#fff",GRAY,1.2)+rect(x,Y(tv[i]),44,20,TUFF,GRAY,1.2)+line(x,Y(gE[i]),x+44,Y(gE[i]),INK,3)+
   T(x+22,Y(gE[i])-8,16,gE[i]+"m","m b","middle")+
   TN(x+22,Y(tv[i])+15,16,tv[i]+"m","m b","middle")+
   '<path d="M'+(x+48)+','+Y(gE[i])+' H'+(x+54)+' V'+Y(tv[i])+' H'+(x+48)+'" fill="none" stroke="'+BLUE+'" stroke-width="1.5"/>'+
   T(x+58,(Y(gE[i])+Y(tv[i]))/2+5,16,dp[i]+"m","v b")+
   T(x+22,222,16,L.charAt(i),"b","middle")});
 s+=legend(234);
 return svg(250,"標高を書き込んだ柱状図。Aは、地表の標高80m、深さ15m、凝灰岩の上面の標高65m。Bは、地表の標高70m、深さ5m、上面の標高65m。Cは、地表の標高60m、深さ10m、上面の標高50m",s)}

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

var POINT='<p>地層の標高は、地表の標高から、深さを引いて求めます。</p>'+figPoint()+
 '<div class="formula"><span class="m">地層の標高</span> ＝ <span class="m">地表の標高</span> − <span class="v">深さ</span></div>'+
 '<p class="note">柱状図の深さは、地表から測った長さです。</p>';

var QBODY='<p>図1は、ある地域の等高線を、上から見たものである。A、B、C、Dを直線で結ぶと、正方形になる。図2は、地点A、B、Cの柱状図である。</p>'+COND+
 '<p>図1</p>'+figContour()+'<p>図2(数字は、地表からの深さ)</p>'+figCol()+
 '<p>地点A、B、Cで、凝灰岩の層の上面の標高を求めなさい。</p>';

var ANS='<p>地表の標高は、図1の等高線から読み取ります。深さは、図2の柱状図から読み取ります。</p>'+figAns()+
 '<p>(1) A：'+'<span class="m">80m</span> − <span class="v">15m</span> ＝ <b class="m">65m</b><br>'+
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
