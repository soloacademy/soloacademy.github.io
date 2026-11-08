(function(){
var INK="#26303b",BLUE="#1f5fa8",RED="#c2410c",GRAY="#8a949f",MUTED="#5d6874",FILL="#e6e9ed";
function n(v){return Math.round(v*10)/10}
function T(x,y,size,txt,cls,anchor){return '<text x="'+n(x)+'" y="'+n(y)+'" font-size="'+size+'"'+(anchor?' text-anchor="'+anchor+'"':'')+(cls?' class="'+cls+'"':'')+'>'+txt+'</text>'}
/* 色つきの面の上の文字：まわりの白いふちを消す */
function TN(x,y,size,txt,cls,anchor){return '<text x="'+n(x)+'" y="'+n(y)+'" font-size="'+size+'" style="stroke:none"'+(anchor?' text-anchor="'+anchor+'"':'')+(cls?' class="'+cls+'"':'')+'>'+txt+'</text>'}
/* 文字の縦の中心を cy に合わせる */
function TC(x,cy,size,txt,cls,anchor){return T(x,cy+size*.36,size,txt,cls,anchor)}
function line(x1,y1,x2,y2,k,w,dash){return '<line x1="'+n(x1)+'" y1="'+n(y1)+'" x2="'+n(x2)+'" y2="'+n(y2)+'" stroke="'+k+'" stroke-width="'+(w||1)+'"'+(dash?' stroke-dasharray="4 3"':'')+'/>'}
function svg(w,h,label,body){return '<div class="fig"><svg viewBox="0 0 '+w+' '+h+'" role="img" aria-label="'+label+'">'+body+'</svg></div>'}
/* 下向きの矢印：先は(x,y2)。頭は「く」の字 */
function arr(x,y1,y2,k){return line(x,y1,x,y2,k,1.5)+'<path d="M'+n(x-5)+','+n(y2-7)+' L'+n(x)+','+n(y2)+' L'+n(x+5)+','+n(y2-7)+'" fill="none" stroke="'+k+'" stroke-width="1.5"/>'}
/* 空欄(点線の枠)：中心(cx,y)、幅w */
function blank(cx,y,w,txt){return '<rect x="'+n(cx-w/2)+'" y="'+n(y-13)+'" width="'+w+'" height="26" rx="4" fill="#fff" stroke="'+GRAY+'" stroke-width="1.2" stroke-dasharray="4 3"/>'+TN(cx,y+5,14,txt,"g b","middle")}
function skm(cx,y,txt){return '<rect x="'+n(cx-48)+'" y="'+n(y-13)+'" width="46" height="26" rx="4" fill="#fff" stroke="'+GRAY+'" stroke-width="1.2" stroke-dasharray="4 3"/>'+TN(cx-25,y+5,14,txt,"g b","middle")+TN(cx+4,y+5,14,"km/s",null)}

/* ---------- 厳選ポイントの図1：P波とS波の着き方(近い地点と遠い地点)。時間の長さだけで比べる ---------- */
function zz(x1,x2,yc,A,st){var k=Math.max(2,Math.round((x2-x1)/st)),d='M'+x1+','+yc,i;
 for(i=1;i<=k;i++)d+=' L'+n(x1+(x2-x1)*i/k)+','+(i===k?yc:n(yc+(i%2?-A:A)));return d}
function wv(d,k){return '<path d="'+d+'" fill="none" stroke="'+k+'" stroke-width="1.5" stroke-linejoin="round"/>'}
function figPS(){
 var X0=72,Y0=250,yN=165,yF=80,E=330,
  pN=X0+(Y0-yN)/2,sN=X0+(Y0-yN),pF=X0+(Y0-yF)/2,sF=X0+(Y0-yF),s='';
 function br(a,b,y){return '<path d="M'+a+','+y+' V'+(y+6)+' H'+b+' V'+y+'" fill="none" stroke="'+MUTED+'" stroke-width="1.5"/>'}
 s+=line(X0,Y0,X0,22,INK,1.5)+'<path d="M'+(X0-5)+',28 L'+X0+',21 L'+(X0+5)+',28" fill="none" stroke="'+INK+'" stroke-width="1.5"/>'+
  line(X0,Y0,336,Y0,INK,1.5)+'<path d="M329,245 L336,250 L329,255" fill="none" stroke="'+INK+'" stroke-width="1.5"/>'+
  line(X0,Y0,X0+(Y0-50)/2,50,RED,2)+line(X0,Y0,X0+(Y0-50),50,BLUE,2)+
  line(X0,yN,pN,yN,GRAY,1.5)+wv(zz(pN,sN,yN,3,6),RED)+wv(zz(sN,E,yN,10,12),BLUE)+
  line(X0,yF,pF,yF,GRAY,1.5)+wv(zz(pF,sF,yF,3,6),RED)+wv(zz(sF,E,yF,10,12),BLUE)+
  '<circle cx="'+pN+'" cy="'+yN+'" r="3.5" fill="'+RED+'"/><circle cx="'+sN+'" cy="'+yN+'" r="3.5" fill="'+BLUE+'"/>'+
  '<circle cx="'+pF+'" cy="'+yF+'" r="3.5" fill="'+RED+'"/><circle cx="'+sF+'" cy="'+yF+'" r="3.5" fill="'+BLUE+'"/>'+
  br(pN,sN,yN+8)+br(pF,sF,yF+8)+
  T((pN+sN)/2,yN+32,14,"初期微動継続時間","g","middle")+
  T(X0-8,34,14,"距離",null,"end")+T(336,272,14,"時間",null,"end")+T(X0,272,13,"地震発生","g","middle")+
  T(X0+(Y0-50)/2+6,50,14,"P波","m b")+T(X0+(Y0-50)+6,50,14,"S波","v b")+
  T(X0-8,yN+5,14,"近い地点",null,"end")+T(X0-8,yF+5,14,"遠い地点",null,"end");
 return svg(340,284,"縦軸が距離、横軸が時間のグラフ。原点から、P波は急な直線、S波はゆるい直線。近い地点と遠い地点の横の線の上に、P波が着くまでは平ら、P波からS波の間は小さなゆれ、S波のあとは大きなゆれを描いた図。P波からS波の間の下に括弧を付け、近い地点には「初期微動継続時間」と書いた。遠い地点のほうが、括弧が長い",s)}

/* ---------- 表の図(厳選ポイント・問題・解答で共通) ----------
   列：左＝地点と距離、中＝P波(赤)、右＝S波(青)。o.fs＝文字の大きさ、o.pitch＝行の間隔、o.rows＝行、
   o.gaps[i]＝行iと次の行の間に書き込む矢印と文字(d＝距離、p＝P波の時間、s＝S波の時間)
   行：{n:地点名, d:距離, p:P波の時刻, s:S波の時刻, merge:空欄(P波・S波に共通), bd:時刻を太字に}。o.speed＝最後に速さの空欄の行 */
var XL=36,XP=160,XS=280;
function tbl(o,label){
 var fs=o.fs,lg=fs+6,P=o.pitch,y0=56,s='',R=o.rows,i,y,yn,ym,r,g,bb=lg/2+fs*.6+3,tt=lg/2+fs*.9+3,tb=fs*.7+3,last;
 function Y(k){return o.ys?o.ys[k]:y0+k*P}
 s+=TC(XP,14,fs,"P波","m b","middle")+TC(XS,14,fs,"S波","v b","middle")+line(4,30,336,30,"#c9d0d7",1);
 for(i=0;i<R.length;i++){r=R[i];y=Y(i);
  s+=TC(XL,y-lg/2,fs,r.n,"b","middle")+TC(XL,y+lg/2,fs,r.d,null,"middle");
  if(r.merge)s+=blank((XP+XS)/2,y,150,r.merge);
  else s+=TC(XP,y,fs,r.p,r.bd?"b":null,"middle")+TC(XS,y,fs,r.s,r.bd?"b":null,"middle");
  g=o.gaps&&o.gaps[i];
  if(g){yn=Y(i+1);ym=(y+yn)/2;
   s+=arr(XL,y+bb,yn-tt,INK)+arr(XP,y+tb,yn-tb,RED)+arr(XS,y+tb,yn-tb,BLUE);
   if(g.b)s+=blank(XL,ym,64,g.b.d)+blank(XP,ym,64,g.b.p)+blank(XS,ym,64,g.b.s);
   else s+=TC(XL+12,ym,fs,g.d,"b")+TC(XP+12,ym,fs,g.p,"m b")+TC(XS+12,ym,fs,g.s,"v b")}}
 last=Y(R.length-1);
 if(o.speed){last+=(o.sp||P);
  s+=TC(XL,last,fs,"速さ","b","middle")+skm(XP,last,"(4)")+skm(XS,last,"(5)")}
 return svg(340,last+34,label,s)}

var FIGQ=tbl({fs:14,ys:[56,108,208],sp:48,rows:[
  {n:"震源",d:"0km",merge:"(6)"},
  {n:"A地点",d:"40km",p:"12時30分19秒",s:"12時30分24秒"},
  {n:"B地点",d:"88km",p:"12時30分25秒",s:"12時30分36秒"}],
 gaps:[null,{b:{d:"(1) km",p:"(2) 秒",s:"(3) 秒"}}],speed:true},
 "震源からの距離と、P波・S波が着いた時刻の表。震源は0kmで、地震が起きた時刻が(6)の空欄。A地点は40kmで、P波は12時30分19秒、S波は12時30分24秒。B地点は88kmで、P波は12時30分25秒、S波は12時30分36秒。A地点とB地点の間に、地点の間の距離(1)、P波の時間(2)、S波の時間(3)の空欄がある。いちばん下の行に、P波の速さ(4)とS波の速さ(5)の空欄がある");

var FIGA1=tbl({fs:16,pitch:100,rows:[
  {n:"A地点",d:"40km",p:"12時30分19秒",s:"12時30分24秒"},
  {n:"B地点",d:"88km",p:"12時30分25秒",s:"12時30分36秒"}],
 gaps:[{d:"48km",p:"6秒",s:"12秒"}]},
 "A地点とB地点の間に書き込んだ表。距離は48km、P波の時間は6秒、S波の時間は12秒");

var FIGA2=tbl({fs:16,pitch:100,rows:[
  {n:"震源",d:"0km",p:"12時30分14秒",s:"12時30分14秒",bd:true},
  {n:"A地点",d:"40km",p:"12時30分19秒",s:"12時30分24秒"}],
 gaps:[{d:"40km",p:"5秒",s:"10秒"}]},
 "震源とA地点の間に書き込んだ表。距離は40km、P波の時間は5秒、S波の時間は10秒。震源で地震が起きた時刻は、12時30分14秒");

/* ---------- 補充問題の解説の図：距離と初期微動継続時間の比べ(1秒＝12) ---------- */
function figS2(){
 var s=T(72,16,14,"初期微動継続時間","g b")+T(232,16,14,"震源からの距離","b"),Y=[58,106],L=["Y地点","X地点"],W=[120,84],TM=["10秒","7秒"],D=["80km","56km"],i;
 for(i=0;i<2;i++)s+=T(4,Y[i]+6,16,L[i],"b")+
  '<rect x="72" y="'+(Y[i]-15)+'" width="'+W[i]+'" height="30" fill="'+FILL+'" stroke="'+GRAY+'" stroke-width="1"/>'+
  TN(80,Y[i]+6,16,TM[i],"g b")+T(232,Y[i]+6,16,D[i],"b");
 return svg(340,140,"Y地点とX地点の、初期微動継続時間と震源からの距離を比べた図。灰色の棒の長さが初期微動継続時間。Y地点は10秒で80km、X地点は7秒で56km。時間が短いX地点のほうが、距離も短い",s)}

/* ---------- 文章 ---------- */
var Pw='<span class="m">P波</span>',Sw='<span class="v">S波</span>',GY='<span style="color:var(--muted)">',E='</span>';

var POINT=
 '<p>'+Pw+'が先に着いて、小さなゆれ(初期微動)が始まります。<br>'+Sw+'があとに着いて、大きなゆれ(主要動)が始まります。</p>'+figPS()+
 '<p>P波が着いてから、S波が着くまでの時間を、<b style="color:var(--muted)">初期微動継続時間</b>といいます。<br>震源から遠いほど、長くなります。</p>'+
 '<div class="formula">速さ(km/s) ＝ 距離(km) ÷ 時間(秒)</div>';

var QBODY='<p>表は、ある地震で、震源からの距離がちがう2つの地点に、P波とS波が着いた時刻を表している。(1)〜(6)を求めなさい。</p>'+FIGQ;

var ANS=
 '<p>(1) 距離：88 − 40 ＝ <b>48km</b><br>(2) '+Pw+'の時間：25秒 − 19秒 ＝ <b>6秒</b><br>(3) '+Sw+'の時間：36秒 − 24秒 ＝ <b>12秒</b></p>'+FIGA1+
 '<p class="note">時間は、着いた時刻の差です。</p>'+
 '<p>(4) '+Pw+'：48km ÷ 6秒 ＝ <b>8km/s</b><br>(5) '+Sw+'：48km ÷ 12秒 ＝ <b>4km/s</b></p>'+
 '<p>(6) 震源とA地点の間を、書き込みます。</p>'+FIGA2+
 '<p>'+Pw+'が40kmを進む時間：40km ÷ 8km/s ＝ 5秒<br>12時30分19秒 − 5秒 ＝ 12時30分<b>14秒</b></p>'+
 '<p class="note">S波で考えても、40km ÷ 4km/s ＝ 10秒、24秒 − 10秒 ＝ 14秒で、同じになります。</p>';

var SOL2='<p>震源から遠いほど、'+GY+'初期微動継続時間'+E+'は長くなります。距離と時間は、同じ割合で変わります。</p>'+figS2()+
 '<p>'+GY+'10秒'+E+' : 80km ＝ '+GY+'7秒'+E+' : □km<br>10 × □ ＝ 80 × 7<br>□ ＝ 560 ÷ 10 ＝ <b>56km</b></p>';

window.UNIT={
no:"1-16",title:"地震",
sections:[
{type:"text",point:true,title:"厳選ポイント",html:POINT},
{type:"problem",title:"問題",body:QBODY,
 parts:[
  {label:'(1) A地点とB地点の間の距離',unit:"km",type:"number",accept:[48],tol:0.01},
  {label:'(2) '+Pw+'が進む時間',unit:"秒",type:"number",accept:[6],tol:0.01},
  {label:'(3) '+Sw+'が進む時間',unit:"秒",type:"number",accept:[12],tol:0.01},
  {label:'(4) '+Pw+'の速さ',unit:"km/s",type:"number",accept:[8],tol:0.01},
  {label:'(5) '+Sw+'の速さ',unit:"km/s",type:"number",accept:[4],tol:0.01},
  {label:'(6) 地震が起きた時刻　12時30分',unit:"秒",type:"number",accept:[14],tol:0.01}
 ]},
{type:"answer",html:ANS},
{type:"problem",title:"補充問題",
 body:'<p>ある地震で、震源からの距離が80kmのY地点の'+GY+'初期微動継続時間'+E+'は、10秒だった。同じ地震で、'+GY+'初期微動継続時間'+E+'が7秒だったX地点は、震源から何kmか。</p>',
 parts:[{label:"答え",unit:"km",type:"number",accept:[56],tol:0.5}],
 solution:SOL2}
]};
})();
