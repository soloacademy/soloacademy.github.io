(function(){
var INK="#26303b",BLUE="#1f5fa8",RED="#c2410c",GRID="#e4e8ec",GRAY="#8a949f",PALE="#e3edf8",PALER="#fdefe8";
var C=20,X0=10,Y0=10,NX=16;
function px(x){return X0+C*x}
function T(x,y,size,txt,cls,anchor){return '<text x="'+x+'" y="'+y+'" font-size="'+size+'"'+(anchor?' text-anchor="'+anchor+'"':'')+(cls?' class="'+cls+'"':'')+'>'+txt+'</text>'}
/* 色つきの面の上の文字：まわりの白いふちを消す */
function TN(x,y,size,txt,cls,anchor){return '<text x="'+x+'" y="'+y+'" font-size="'+size+'" style="stroke:none"'+(anchor?' text-anchor="'+anchor+'"':'')+(cls?' class="'+cls+'"':'')+'>'+txt+'</text>'}
function line(x1,y1,x2,y2,k,w,dash){return '<line x1="'+x1+'" y1="'+y1+'" x2="'+x2+'" y2="'+y2+'" stroke="'+k+'" stroke-width="'+(w||1)+'"'+(dash?' stroke-dasharray="4 3"':'')+'/>'}
function svg(h,label,body){return '<div class="fig"><svg viewBox="0 0 340 '+h+'" role="img" aria-label="'+label+'">'+body+'</svg></div>'}
/* 光の道すじの矢じるし：線の真ん中に、進む向きの「く」の字を置く */
function arw(x1,y1,x2,y2){var mx=(x1+x2)/2,my=(y1+y2)/2,a=Math.atan2(y2-y1,x2-x1),L=7,s=.5;
 function p(t){return (mx-L*Math.cos(a+t)).toFixed(1)+','+(my-L*Math.sin(a+t)).toFixed(1)}
 return '<path d="M'+p(s)+' L'+mx.toFixed(1)+','+my.toFixed(1)+' L'+p(-s)+'" fill="none" stroke="'+INK+'" stroke-width="1.5"/>'}

/* うすい格子。1マス＝20。横は0〜16、縦は ymin〜ymax。鏡の高さが y=0 */
function area(ymax,ymin){
 var py=function(y){return Y0+C*(ymax-y)},d='',x,y;
 for(x=0;x<=NX;x++)d+='M'+px(x)+' '+py(ymax)+'V'+py(ymin);
 for(y=ymin;y<=ymax;y++)d+='M'+px(0)+' '+py(y)+'H'+px(NX);
 return {py:py,h:py(ymin)+Y0,grid:'<path d="'+d+'" fill="none" stroke="'+GRID+'" stroke-width="1"/>'}}
function mirror(a,x1,x2){return line(px(x1),a.py(0),px(x2),a.py(0),INK,4)+T(px(x1)-8,a.py(0)+5,13,"鏡","b","end")}
function real(a,x,y,k){var X=px(x),Y=a.py(y);return '<circle cx="'+X+'" cy="'+Y+'" r="9" fill="'+PALER+'" stroke="'+RED+'" stroke-width="1.5"/>'+TN(X,Y+5,13,k,"m b","middle")}
function virt(a,x,y,k){var X=px(x),Y=a.py(y);return '<circle cx="'+X+'" cy="'+Y+'" r="9" fill="'+PALE+'" stroke="'+BLUE+'" stroke-width="1.5" stroke-dasharray="3 2"/>'+TN(X,Y+4,11,k+"'","v b","middle")}

/* 問題の図：鏡は左から3〜6マス(上下は鏡から6マスずつ)、自分(2,-5)、A〜Dは鏡から3マス下に4マスずつ(2,6,10,14)。見えるのはBだけ */
var Ex=2,Ey=-5,M1=3,M2=6,PT={A:[2,-3],B:[6,-3],C:[10,-3],D:[14,-3]},KS=["A","B","C","D"];
function eye(a){var X=px(Ex),Y=a.py(Ey);return '<circle cx="'+X+'" cy="'+Y+'" r="5" fill="'+INK+'"/>'+T(X,Y+18,13,"自分","b","middle")}
var LBL="格子の真ん中の高さに、横長の鏡があります。鏡は、左から3マス目から6マス目までです。鏡の下に、自分(左から2マス目、鏡から5マス下)があります。A、B、C、Dは、鏡から3マス下に、左から2マス目、6マス目、10マス目、14マス目と、同じ間かくで一列に並んでいます。鏡の上は、6マス分の空きです";
function figProblem(){var a=area(6,-6),s=a.grid+mirror(a,M1,M2);
 KS.forEach(function(k){s+=real(a,PT[k][0],PT[k][1],k)});
 return svg(a.h,LBL,s+eye(a))}

/* 解説の図：虚像A'〜D'を描き、自分から見える鏡の向こうの範囲をうすい青にする。
   範囲は、自分から鏡の両端を通る線の間(格子の端で切る)。範囲に入る虚像だけが見える
   鏡の両側の点線は、鏡の向こうの世界と、実際の世界の境目。自分から鏡の両端までも点線 */
function cone(a,sx,sy,Y,fill){
 var f=(Y-sy)/(0-sy),xl=sx+(M1-sx)*f,xr=sx+(M2-sx)*f,P=[[M1,0],[xl,Y]];
 if(xr>NX)P.push([NX,Y],[NX,sy+(0-sy)*(NX-sx)/(M2-sx)]);else P.push([xr,Y]);
 P.push([M2,0]);
 return '<polygon points="'+P.map(function(p){return px(p[0])+','+a.py(p[1])}).join(' ')+'" fill="'+(fill||PALE)+'"/>'}
function dl(x1,y1,x2,y2,k,w,da){return '<line x1="'+x1+'" y1="'+y1+'" x2="'+x2+'" y2="'+y2+'" stroke="'+k+'" stroke-width="'+w+'" stroke-dasharray="'+da+'"/>'}
/* 境目の点線(格子の左端から右端まで)・自分から鏡の両端までの点線・鏡(ラベルは線の上側) */
function frame(a,sx,sy){return dl(px(0),a.py(0),px(NX),a.py(0),GRAY,1.2,"6 4")+
 dl(px(sx),a.py(sy),px(M1),a.py(0),INK,1,"2 3")+dl(px(sx),a.py(sy),px(M2),a.py(0),INK,1,"2 3")+
 line(px(M1),a.py(0),px(M2),a.py(0),INK,4)+T(px(M1)-12,a.py(0)-5,13,"鏡","b","end")}
function figAns(){var a=area(6,-6),s=cone(a,Ex,Ey,6)+cone(a,Ex,-Ey,-6,PALER)+a.grid+frame(a,Ex,Ey);
 s+=TN(px(6.6),a.py(5)+16,12,"虚像が見える範囲","v","middle")+TN(px(7.1),a.py(-5)+16,12,"物体が見える範囲","m","middle");
 KS.forEach(function(k){s+=real(a,PT[k][0],PT[k][1],k)});
 KS.forEach(function(k){s+=virt(a,PT[k][0],-PT[k][1],k)});
 return svg(a.h,"鏡を軸にして、A、B、C、Dの線対称の位置に、虚像A'、B'、C'、D'を描いた図。自分から鏡の両端までを点線で結び、その先の、鏡の向こうの範囲が、うすい青の「虚像が見える範囲」になっている。この範囲に入っている虚像は、B'だけ。鏡の手前には、鏡を軸にした線対称の位置に、うすい赤の「物体が見える範囲」がある。この範囲に入っている点は、Bだけ",s+eye(a))}

/* 別解の図(小さめ)：自分の虚像から、鏡の両端を通る線の間の、鏡の手前の範囲をうすい青にする。範囲に入る点が見える */
function figAlt(){var a=area(6,-6),s=cone(a,Ex,-Ey,-6,PALER)+a.grid+frame(a,Ex,-Ey),X=px(Ex),Y=a.py(-Ey);
 s+=TN(px(7.1),a.py(-5)+16,12,"物体が見える範囲","m","middle");
 KS.forEach(function(k){s+=real(a,PT[k][0],PT[k][1],k)});
 s+='<circle cx="'+X+'" cy="'+Y+'" r="5" fill="'+BLUE+'"/>'+T(X,Y-10,13,"自分の虚像","v b","middle");
 return svg(a.h,"自分の虚像から鏡の両端までを点線で結び、その先の、鏡の手前の範囲が、うすい赤の「物体が見える範囲」になっている図。この範囲に入っている点は、Bだけ",s).replace('<svg ','<svg style="max-width:17rem" ')}

/* アイコン(商用利用可のフリーアイコンの輪郭をSVGにしたもの)：幅または高さ100の座標 */
var IC={
 man:"M6.6,19.1 4.3,20.3 1.6,23.0 0.0,26.6 0.0,55.7 0.4,55.9 0.4,57.2 2.0,58.8 3.1,59.2 5.3,58.8 5.9,58.0 6.4,58.0 7.2,56.4 7.2,32.4 8.8,32.2 9.0,95.9 9.8,97.9 12.5,99.8 16.2,99.4 16.8,98.6 17.4,98.6 18.6,96.3 18.6,59.0 20.1,58.8 20.3,96.3 21.5,98.6 22.1,98.6 22.7,99.4 26.4,99.8 29.1,97.9 29.9,95.9 29.9,32.4 31.6,32.4 31.6,56.4 32.4,58.0 33.0,58.0 33.6,58.8 35.7,59.2 36.9,58.8 38.5,57.2 38.5,55.9 38.9,55.7 38.9,26.6 37.3,23.0 34.6,20.3 32.2,19.1ZM18.0,0.0 14.8,1.2 12.5,3.5 11.3,5.9 11.3,8.0 10.9,8.4 12.5,13.1 14.5,15.0 16.8,16.2 20.1,16.6 24.4,15.0 26.4,13.1 27.9,8.2 27.5,8.0 27.5,5.9 26.4,3.5 24.0,1.2 20.9,0.0Z",
 dog:"M99.0,41.0 97.9,39.8 96.5,40.6 92.6,47.9 89.5,51.6 89.5,52.1 84.6,57.4 84.0,57.4 82.4,59.0 77.9,53.7 76.8,51.6 75.2,50.2 75.2,49.6 73.6,48.2 73.6,47.7 72.1,46.3 70.9,44.1 69.3,42.8 68.2,40.6 66.6,39.3 66.6,38.7 63.9,35.7 63.9,35.2 61.1,32.2 61.1,31.6 58.4,28.7 58.4,28.1 55.7,25.2 55.7,24.6 54.7,24.6 50.2,28.5 48.0,29.7 46.7,31.2 46.1,31.2 44.7,32.8 42.6,34.0 41.2,35.5 40.6,35.5 39.6,36.7 39.1,36.7 36.1,39.5 35.5,39.5 29.7,44.1 30.1,45.5 32.0,47.7 32.8,49.4 31.6,52.9 30.9,53.9 30.1,57.2 29.3,58.2 28.5,61.5 27.7,62.5 27.0,65.8 26.2,66.8 22.3,79.1 21.1,81.2 21.1,84.6 21.9,86.1 23.0,87.3 25.0,88.1 27.1,88.1 29.9,86.5 41.8,62.3 43.0,63.3 43.0,63.9 45.7,67.4 44.5,68.4 43.4,71.1 43.4,75.2 37.9,76.2 36.3,77.0 34.0,79.7 34.0,81.1 33.6,81.2 34.0,83.8 34.8,85.4 36.7,86.9 39.1,87.7 42.0,87.7 42.2,88.1 77.1,88.1 77.3,87.7 81.4,87.7 85.4,86.1 88.5,83.4 90.4,79.5 90.4,72.7 89.3,69.1 92.8,65.4 92.8,64.8 95.5,61.5 99.0,53.7 99.0,52.0 99.8,49.8 99.8,44.5 99.4,44.3ZM0.8,2.7 0.0,3.9 0.0,6.1 0.4,6.2 1.6,15.4 2.3,17.8 4.7,20.1 6.6,20.9 20.1,23.6 20.7,24.2 20.5,24.6 10.9,24.2 9.4,25.4 9.4,27.5 10.5,29.5 14.5,32.2 17.4,32.6 21.7,34.6 25.0,38.1 25.6,38.1 26.6,36.9 28.7,35.7 30.1,34.2 32.2,33.0 33.6,31.4 34.2,31.4 35.2,30.3 37.3,29.1 38.7,27.5 40.8,26.4 42.2,24.8 42.8,24.8 50.6,18.6 49.0,16.0 45.1,11.5 45.1,10.9 43.6,9.6 42.4,7.4 38.5,2.9 38.5,2.3 35.7,0.0 34.0,0.4 32.4,2.7 32.0,4.5 29.5,7.0 28.3,7.4 25.0,7.4 23.2,6.6 21.5,6.6 19.7,5.9 18.0,5.9 16.2,5.1 14.5,5.1 14.3,4.7 10.9,4.3 10.7,3.9 7.4,3.5 7.2,3.1 3.9,2.7 3.7,2.3Z"
};
function ic(k,x,y,sx,sy,f){return '<path transform="translate('+x+','+y+') scale('+sx+','+sy+')" fill="'+f+'" fill-rule="evenodd" d="'+IC[k]+'"/>'}

/* 厳選ポイントの図：横から見た図。縦の鏡の左に人と物体(イヌ)、右に虚像。1マス＝20
   物体(120,70)・虚像(240,70)は鏡(x=180)を軸に線対称。目(64,150)と虚像を結ぶ線が鏡と交わる点(180,97.3)で、光が反射する */
function figLight(){
 var d='',i,s,my=150+(70-150)*(180-64)/(240-64);
 for(i=20;i<=320;i+=20)d+='M'+i+' 10V210';
 for(i=10;i<=210;i+=20)d+='M20 '+i+'H320';
 s='<path d="'+d+'" fill="none" stroke="'+GRID+'" stroke-width="1"/>'+
  line(120,70,240,70,GRAY,1,true)+
  line(180,my,240,70,BLUE,1.5,true)+
  line(120,70,180,my,INK,1.5)+arw(120,70,180,my)+
  line(180,my,64,150,INK,1.5)+arw(180,my,64,150)+
  line(180,50,180,170,INK,4)+
  '<circle cx="180" cy="'+my.toFixed(1)+'" r="3" fill="'+INK+'"/>'+
  ic("man",48,145,.6,.6,INK)+ic("dog",140,52.4,-.4,.4,RED)+ic("dog",220,52.4,.4,.4,BLUE)+
  T(120,108,13,"物体","m b","middle")+T(240,108,13,"虚像","v b","middle")+T(180,230,13,"鏡","b","middle");
 return svg(240,"横から見た図。縦の鏡の左に、人と、鏡に向かうイヌ(物体)がいる。鏡の右の、鏡を軸にした線対称の位置に、イヌの虚像がある。イヌから出た光は、鏡で反射して人の目に届く。目には、光が鏡の向こうの虚像から来たように見える",s)}

/* 補充問題の図：横から見た図。1cm＝1.6 */
var FY=270;
function sy(cm){return FY-1.6*cm}
/* Aさん：人のアイコン。身長140cm＝高さ224(1cm＝1.6)。xc＝体の中心(頭の中心)のx。光の道すじは、この中心の線の上の、頭の上・目・足の先を通る */
function aSan(xc,f){return ic("man",xc-43.8,sy(140),2.24,2.24,f)}
function figSideQ(){
 var s=aSan(130,INK)+line(250,sy(140),250,sy(0),INK,4)+T(250,36,13,"鏡","b","middle")+
  '<path d="M78,'+sy(140)+' H72 V'+sy(0)+' H78" fill="none" stroke="'+GRAY+'" stroke-width="1.2"/>'+
  T(66,(sy(140)+sy(0))/2+5,13,"140cm","b","end")+T(130,FY+20,13,"Aさん","b","middle");
 return svg(300,"横から見た図。身長140cmのAさんが、鏡の前に立っている",s)}
function figSideA(){
 var xp=60,xm=170,xv=280,ey=sy(130),h1=sy(135),h2=sy(65),s='';
 s+=line(xm,h1,xv,sy(140),BLUE,1.5,true)+line(xm,h2,xv,sy(0),BLUE,1.5,true)+line(xm,h1,xm,h2,INK,4);
 s+=line(xp,sy(140),xm,h1,INK,1.5)+arw(xp,sy(140),xm,h1)+line(xm,h1,xp,ey,INK,1.5)+arw(xm,h1,xp,ey)+
  line(xp,sy(0),xm,h2,INK,1.5)+arw(xp,sy(0),xm,h2)+line(xm,h2,xp,ey,INK,1.5)+arw(xm,h2,xp,ey);
 s+=aSan(xp,INK)+aSan(xv,BLUE)+
  '<circle cx="'+xm+'" cy="'+h1+'" r="3" fill="'+INK+'"/><circle cx="'+xm+'" cy="'+h2+'" r="3" fill="'+INK+'"/>'+
  '<circle cx="'+xp+'" cy="'+ey+'" r="3.5" fill="#fff"/>'+
  T(xp-25,ey+5,13,"目","b","end")+T(xm+10,(h1+h2)/2+5,13,"70cm","b")+
  T(xp,FY+20,13,"Aさん","b","middle")+T(xv,FY+20,13,"虚像","v b","middle");
 return svg(300,"横から見た図。Aさんの目から見て、頭のてっぺんの虚像は鏡の上の端で、足の先の虚像は鏡の下の端で見える。頭からの光は、目と頭の真ん中で反射し、足からの光は、目と足の真ん中で反射する。鏡の長さは70cm",s)}

var M='<span class="m" style="white-space:nowrap">物体</span>',V='<span class="v" style="white-space:nowrap">虚像</span>';
var SOL='<p>鏡は、虚像を見る「窓」と考えます。鏡の向こうに、虚像の世界があります。</p>'+figAns()+
 '<p>① 鏡を軸にして、A、B、C、Dの線対称の位置に、虚像(A\', B\', C\', D\')を描く。</p>'+
 '<p>② 自分から鏡の両端まで、点線を引く。その先の、鏡の向こうの範囲が、虚像が見える範囲(図のうすい青)。</p>'+
 '<p>③ 範囲に入っている虚像を選ぶ。</p>'+
 '<p>範囲に入っているのは、B\'だけです。見えるのは<b>B</b>です。A、C、Dの虚像は、範囲の外にあるので、見えません。</p>'+
 '<p>鏡の手前のうすい赤は、鏡に映って見える物体の範囲です。Bは、この範囲の中にあります。</p>'+
 '<p><b>別解</b><br>自分の虚像から、鏡の両端まで、点線を引きます。</p>'+figAlt()+
 '<p>その先の、鏡の手前のうすい赤の範囲に入っている点が、鏡に映って見えます。入っているのは<b>B</b>だけです。</p>';
var SOL2='<p>鏡に全身が映るとき、頭のてっぺんと足の先の虚像が、鏡の中に見えます。</p>'+figSideA()+
 '<p>① 頭からの光は、目と頭の真ん中で反射する。<br>② 足からの光は、目と足の真ん中で反射する。</p>'+
 '<p>鏡に必要な長さは、この2つの点の間です。<br>140cm ÷ 2 ＝ <b>70cm</b></p>'+
 '<p class="note">図では、目の高さを130cmとしました。目の高さが変わっても、答えは同じです。</p>';

window.UNIT={
no:"1-8",title:"光の反射",
sections:[
{type:"text",point:true,title:"厳選ポイント",html:
 '<p>鏡に映った像を、'+V+'といいます。<br>'+M+'の'+V+'は、鏡を軸にした線対称の位置にできます。</p>'+figLight()+
 '<p>'+M+'から出た光は、鏡で反射して、目に届きます。<br>人は、その光が、鏡の向こうの'+V+'から来たように感じます。</p>'},
{type:"problem",title:"問題",
 body:'<p>図は、鏡と、点A、B、C、Dを、上から見たものである。</p>'+figProblem()+
 '<p>(1) 自分の位置から鏡を見たとき、鏡に映って見える点を選びなさい。</p>',
 parts:[{label:"(1)",type:"choice",choices:["A","B","C","D"],accept:["B"]}]},
{type:"answer",html:SOL},
{type:"problem",title:"補充問題",
 body:'<p>身長140cmのAさんが、鏡に自分の全身を映したい。最低限必要な鏡の縦の長さは何cmか。</p>'+figSideQ(),
 parts:[{label:"答え",unit:"cm",type:"number",accept:[70],tol:0.5}],
 solution:SOL2}
]};
})();
