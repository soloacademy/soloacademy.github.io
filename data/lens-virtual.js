(function(){
var INK="#26303b",BLUE="#1f5fa8",RED="#c2410c",MUTED="#5d6874",LIGHT="#b7791f",GLASS="#cfe0f3";
/* 座標：光軸の高さ AX、レンズの位置 LX、焦点距離 F(=45)。物体は焦点の内側(レンズから30)、高さ HO=25。虚像は、レンズから90、高さ75 */
var AX=130,LX=170,F=45,HO=25,FL=LX-F,FR=LX+F,OD=30,OX=LX-OD,TY=AX-HO;
function n(v){return Math.round(v*10)/10}
function T(x,y,size,txt,cls,anchor){return '<text x="'+n(x)+'" y="'+n(y)+'" font-size="'+size+'"'+(anchor?' text-anchor="'+anchor+'"':'')+(cls?' class="'+cls+'"':'')+'>'+txt+'</text>'}
function TN(x,y,size,txt,cls,anchor){return '<text x="'+n(x)+'" y="'+n(y)+'" font-size="'+size+'" style="stroke:none"'+(anchor?' text-anchor="'+anchor+'"':'')+(cls?' class="'+cls+'"':'')+'>'+txt+'</text>'}
function line(x1,y1,x2,y2,k,w,dash){return '<line x1="'+n(x1)+'" y1="'+n(y1)+'" x2="'+n(x2)+'" y2="'+n(y2)+'" stroke="'+k+'" stroke-width="'+(w||1)+'"'+(dash?' stroke-dasharray="4 3"':'')+'/>'}
function pline(a,k,w){return '<polyline points="'+a.map(function(p){return n(p[0])+','+n(p[1])}).join(' ')+'" fill="none" stroke="'+k+'" stroke-width="'+(w||1)+'" stroke-linecap="round" stroke-linejoin="round"/>'}
function svg(h,label,body){return '<div class="fig"><svg viewBox="0 0 340 '+h+'" role="img" aria-label="'+label+'">'+body+'</svg></div>'}
function chev(x,y,a,k){var L=7,s=.5;
 function p(t){return n(x-L*Math.cos(a+t))+','+n(y-L*Math.sin(a+t))}
 return '<path d="M'+p(s)+' L'+n(x)+','+n(y)+' L'+p(-s)+'" fill="none" stroke="'+(k||LIGHT)+'" stroke-width="1.5"/>'}
function chevOn(p,q,back,k){var dx=q[0]-p[0],dy=q[1]-p[1],len=Math.hypot(dx,dy),a=Math.atan2(dy,dx),b=back==null?len/2:back;
 return chev(q[0]-b*Math.cos(a),q[1]-b*Math.sin(a),a,k)}
function dot(x,y){return '<circle cx="'+n(x)+'" cy="'+n(y)+'" r="3.5" fill="'+INK+'"/>'}
function entry(x,y){return '<circle cx="'+n(x)+'" cy="'+n(y)+'" r="3.5" fill="#fff" stroke="'+LIGHT+'" stroke-width="1.2"/>'}
function arrowUp(x,col){return line(x,AX,x,TY+10,col,3)+'<polygon points="'+x+','+TY+' '+(x-5.5)+','+(TY+12)+' '+(x+5.5)+','+(TY+12)+'" fill="'+col+'"/>'}
function lens(){return '<path d="M170,45 C183,85 183,175 170,215 C157,175 157,85 170,45 Z" fill="'+GLASS+'" stroke="'+INK+'" stroke-width="1.5" stroke-linejoin="round"/>'}
function axis(){return line(4,AX,336,AX,MUTED,1)}
function focal(){return dot(FL,AX)+dot(FR,AX)+T(FL,148,13,"焦点","b","middle")+T(FR+4,124,13,"焦点","b")}

/* ---------- 厳選ポイントの図：物体を焦点の内側に置く。レンズのあとの光は広がり、点線の交点に虚像 ---------- */
function figVirtual(){
 var di=OD*F/(F-OD),hi=HO*di/OD,ix=LX-di,iy=AX-hi,XE=270,
  y1=TY+HO/F*(XE-LX),y2=AX+HO/OD*(XE-LX);
 var s=axis()+lens()+focal()+T(LX,32,13,"凸レンズ","b","middle")+
  line(LX,TY,ix,iy,LIGHT,1.5,true)+line(OX,TY,ix,iy,LIGHT,1.5,true)+
  pline([[OX,TY],[LX,TY],[XE,y1]],LIGHT,1.5)+pline([[OX,TY],[LX,AX],[XE,y2]],LIGHT,1.5)+
  chevOn([OX,TY],[LX,TY])+chevOn([LX,TY],[XE,y1],30)+chevOn([OX,TY],[LX,AX])+chevOn([LX,AX],[XE,y2],40)+
  entry(LX,TY)+entry(LX,AX)+
  arrowUp(OX,RED)+T(OX+6,166,13,"物体","m b","middle")+
  line(ix,AX,ix,iy+10,BLUE,3,true)+'<polygon points="'+n(ix)+','+n(iy)+' '+n(ix-5.5)+','+n(iy+12)+' '+n(ix+5.5)+','+n(iy+12)+'" fill="'+BLUE+'"/>'+
  T(ix,iy-14,13,"虚像","v b","middle")+
  T(336,190,13,"ここからのぞく","b","end");
 return svg(236,"凸レンズの図。物体は、焦点の内側にある。物体の先端から、光軸に平行な光と、レンズの中心を通る光が出る。レンズを通ったあとの光は、広がって、集まらない。この2本を、反対向き(左)に点線でのばすと、物体より左の1点で交わる。その点が、虚像の先端。虚像は、物体と同じ向きで、物体より大きい。右側からレンズをのぞくと、この虚像が見える",s)}

/* ---------- ノート用の図：虚像の作図の完成図(すべて黒) ---------- */
function figNote(){
 var di=OD*F/(F-OD),hi=HO*di/OD,ix=LX-di,iy=AX-hi,XE=270,
  y1=TY+HO/F*(XE-LX),y2=AX+HO/OD*(XE-LX);
 function en(x,y){return '<circle cx="'+n(x)+'" cy="'+n(y)+'" r="3.5" fill="#fff" stroke="'+INK+'" stroke-width="1.2"/>'}
 var s=axis()+lens()+focal()+T(LX,32,13,"凸レンズ","b","middle")+
  line(LX,TY,ix,iy,INK,1.5,true)+line(OX,TY,ix,iy,INK,1.5,true)+
  pline([[OX,TY],[LX,TY],[XE,y1]],INK,1.5)+pline([[OX,TY],[LX,AX],[XE,y2]],INK,1.5)+
  chevOn([OX,TY],[LX,TY],null,INK)+chevOn([LX,TY],[XE,y1],30,INK)+chevOn([OX,TY],[LX,AX],null,INK)+chevOn([LX,AX],[XE,y2],40,INK)+
  en(LX,TY)+en(LX,AX)+
  arrowUp(OX,INK)+T(OX+6,166,13,"物体","b","middle")+
  line(ix,AX,ix,iy+10,INK,3,true)+'<polygon points="'+n(ix)+','+n(iy)+' '+n(ix-5.5)+','+n(iy+12)+' '+n(ix+5.5)+','+n(iy+12)+'" fill="'+INK+'"/>'+
  T(ix,iy-14,13,"虚像","b","middle");
 return svg(236,"ノート用の図。虚像の作図の完成図。凸レンズ、光軸、2つの焦点がある。物体は、焦点の内側にある。物体の先端から、光軸に平行な光と、レンズの中心を通る光の2本が出て、レンズを通ったあとは広がる。この2本を反対向き(左)に点線でのばすと、物体より左の1点で交わる。その点が虚像の先端で、物体と同じ向きの、物体より大きい虚像ができている。すべて黒で描いてある",s)}

/* ---------- 問題の図：レンズのあとの光を、反対向きにのばした点線の候補(A〜Cから選ぶ) ----------
   kind=1：光軸に平行な光(右の焦点を通る向き)。kind=2：中心を通る光(直進) 。候補は上から順にA、B、C */
function cand(kind){
 var hit,sl,ok,ex=90,s,list=[],L="ABC",h=224;
 if(kind===1){hit=[LX,TY];sl=[.9,HO/F,.25];ok=1}
 else{hit=[LX,AX];sl=[HO/OD,-.3,-.6];ok=0}
 s=axis()+lens()+focal()+arrowUp(OX,RED)+T(OX+6,166,13,"物体","m b","middle");
 s+=line(OX,TY,hit[0],hit[1],LIGHT,1.5)+chevOn([OX,TY],hit);
 sl.forEach(function(k,i){
  var ey=hit[1]-k*(LX-ex),u=[-1,-k],l=Math.hypot(u[0],u[1]);u=[u[0]/l,u[1]/l];
  s+=line(hit[0],hit[1],ex,ey,LIGHT,1.5,true);
  var cx=ex+13*u[0],cy=ey+13*u[1];
  list.push({i:i,cx:cx,cy:cy})});
 list.forEach(function(o){s+='<circle cx="'+n(o.cx)+'" cy="'+n(o.cy)+'" r="11" fill="#fff" stroke="'+INK+'" stroke-width="1.2"/>'+TN(o.cx,o.cy+5,14,L.charAt(o.i),"b","middle")});
 s+=entry(hit[0],hit[1]);
 var lab=kind===1?"物体は、焦点の内側にある。物体の先端から出た、光軸に平行な光が、レンズに当たる。通ったあとの光を、反対向きにのばした点線の候補が、A、B、Cの3つある"
  :"物体は、焦点の内側にある。物体の先端から出た光が、レンズの中心に当たる。通ったあとの光を、反対向きにのばした点線の候補が、A、B、Cの3つある";
 return {html:svg(h,lab,s),ans:L.charAt(ok)}}

/* ---------- 解答の図：mode=1 光軸に平行な光、2 中心を通る光、3 2本の点線が交わる点 ---------- */
function figAns(mode){
 var XE=270,y1=TY+HO/F*(XE-LX),y2=AX+HO/OD*(XE-LX),ex=90,
  e1=[ex,TY-HO/F*(LX-ex)],e2=[ex,AX-HO/OD*(LX-ex)],ix=80,iy=55,
  s=axis()+lens()+dot(FL,AX)+dot(FR,AX)+T(FL,148,13,"焦点","b","middle")+arrowUp(OX,RED)+T(OX+6,166,13,"物体","m b","middle"),
  lab,c;
 function r1(){return pline([[OX,TY],[LX,TY],[XE,y1]],LIGHT,1.5)+chevOn([OX,TY],[LX,TY])+chevOn([LX,TY],[XE,y1],30)+entry(LX,TY)}
 function r2(){return pline([[OX,TY],[LX,AX],[XE,y2]],LIGHT,1.5)+chevOn([OX,TY],[LX,AX])+chevOn([LX,AX],[XE,y2],40)+entry(LX,AX)}
 function ball(e,k){var u=[e[0]-LX,e[1]-(k===1?TY:AX)],l=Math.hypot(u[0],u[1]),cx=e[0]+13*u[0]/l,cy=e[1]+13*u[1]/l;
  return '<circle cx="'+n(cx)+'" cy="'+n(cy)+'" r="11" fill="#fff" stroke="'+INK+'" stroke-width="1.2"/>'+TN(cx,cy+5,14,k===1?Q1.ans:Q2.ans,"b","middle")}
 if(mode===1){s+=r1()+line(LX,TY,e1[0],e1[1],LIGHT,1.5,true)+ball(e1,1)+T(FR+4,124,13,"焦点を通る","b");
  lab="(1)の答えの図。物体の先端から出た、光軸に平行な光は、レンズを通ったあと、右の焦点を通る。この光を、反対向き(左)にのばした点線が、正しい候補"}
 else if(mode===2){s+=r2()+line(LX,AX,e2[0],e2[1],LIGHT,1.5,true)+ball(e2,2)+T(FR+4,124,13,"焦点","b")+T(240,160,13,"直進","b");
  lab="(2)の答えの図。レンズの中心を通る光は、そのまま直進する。この光を、反対向き(左)にのばした点線が、正しい候補"}
 else{s+=r1()+r2()+line(LX,TY,ix,iy,LIGHT,1.5,true)+line(OX,TY,ix,iy,LIGHT,1.5,true)+T(FR+4,124,13,"焦点","b")+
  '<circle cx="'+ix+'" cy="'+iy+'" r="8" fill="none" stroke="'+BLUE+'" stroke-width="2"/>'+T(ix,iy-16,13,"虚像の先端","v b","middle");
  lab="2本の点線が交わる点が、虚像の先端になる図"}
 return svg(mode===3?236:224,lab,s)}

function tbl(hd,rows){
 var L2='style="text-align:left"',N='style="white-space:nowrap;text-align:left"';
 return '<div style="overflow-x:auto"><table style="background:#fff"><tr>'+hd.map(function(t,i){return '<th '+(i?L2:N)+'>'+t+'</th>'}).join('')+'</tr>'+
  rows.map(function(r){return '<tr>'+r.map(function(t,i){return '<td '+(i?L2:N)+'>'+t+'</td>'}).join('')+'</tr>'}).join('')+'</table></div>'}

var M='<span class="m" style="white-space:nowrap">物体</span>',V='<span class="v" style="white-space:nowrap">虚像</span>',R='<span class="v" style="white-space:nowrap">実像</span>';
var Q1=cand(1),Q2=cand(2);
var CR=["実像","虚像"];

var POINT='<p>'+M+'を、焦点の内側に置くと、レンズを通った光は広がって、集まりません。スクリーンに像はうつりません(実像はできません)。</p>'+
 '<p>反対側からレンズをのぞくと、光が来た向きの延長線(点線)が交わる点に、像が見えます。この像を'+V+'といいます。</p>'+figVirtual()+
 '<p>作図は、実像と同じ2本の線を使います。レンズを通ったあとの光は広がるので、<b>反対向きに点線でのばします</b>。点線が交わる点が、'+V+'の先端です。</p>'+
 '<p class="note">'+V+'は、'+M+'と同じ向きで、'+M+'より大きく見えます。</p>'+
 '<p class="note">'+R+'は、スクリーンにうつる像です。'+V+'は、レンズ越しに見える像です。</p>';

var QBODY='<p>物体を、凸レンズの焦点の内側に置いた。レンズを通ったあとの光を、反対向き(左)にのばした点線として正しいものを、A〜Cから選びなさい。</p>'+
 '<p class="note">レンズを通ったあとの光は、図にかいていません。ルールから考えます。</p>'+
 '<p>(1) 光軸に平行に入った光</p>'+Q1.html+
 '<p>(2) レンズの中心を通る光</p>'+Q2.html;

var ANS='<p>(1) <b>'+Q1.ans+'</b></p>'+figAns(1)+
 '<p>光軸に平行な光は、焦点を通る。</p>'+
 '<p>(2) <b>'+Q2.ans+'</b></p>'+figAns(2)+
 '<p>中心を通る光は、直進する。</p>'+
 '<p>2本の点線が交わる点が、'+V+'の先端です。</p>'+figAns(3)+
 '<p class="note">'+V+'の位置には、光は集まりません。そのため、スクリーンにはうつりません。</p>';

var SBODY='<p>焦点距離が20cmの凸レンズがある。物体を、凸レンズから次の(1)〜(4)の距離に置いたとき、できる像は実像か虚像か。選びなさい。</p>';

var SOL2='<p>焦点距離は20cmです。物体が、レンズから20cmより遠ければ焦点の外側、近ければ焦点の内側です。</p>'+
 tbl(["","距離","物体の位置","像"],[
  ["(1)","30cm","焦点の外側","<b class=\"v\">実像</b>"],
  ["(2)","10cm","焦点の内側","<b class=\"v\">虚像</b>"],
  ["(3)","50cm","焦点の外側","<b class=\"v\">実像</b>"],
  ["(4)","15cm","焦点の内側","<b class=\"v\">虚像</b>"]
 ])+
 '<p class="note">焦点の外側なら、スクリーンにうつる実像。焦点の内側なら、レンズ越しに見える虚像です。</p>'+
 '<p class="note">物体がちょうど焦点の位置にあるときは、レンズを通った光が平行になり、実像も虚像もできません。</p>';

window.UNIT={
no:"1-11",title:"凸レンズ(虚像)",
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
  {label:"(1) 30cm",type:"choice",choices:CR,accept:["実像"]},
  {label:"(2) 10cm",type:"choice",choices:CR,accept:["虚像"]},
  {label:"(3) 50cm",type:"choice",choices:CR,accept:["実像"]},
  {label:"(4) 15cm",type:"choice",choices:CR,accept:["虚像"]}
 ],
 solution:SOL2},
{type:"text",title:"ノートに書いてみよう",html:
 '<p>何も見ずに、ノートに凸レンズと焦点を書いて、物体を焦点の内側に置いたときの虚像を作図してみましょう。</p>'+
 '<p class="note">光の線は、2本引きます。レンズを通ったあとの光は、反対向きに点線でのばします。書けたら、下の図と見比べましょう。</p>'+figNote()+
 '<p>次は、物体の位置を、焦点の内側で、焦点に近づけたり、遠ざけたりして作図してみましょう。虚像の大きさが、どう変わるかを見てください。</p>'}
]};
})();
