(function(){
var INK="#26303b",BLUE="#1f5fa8",RED="#c2410c",GRID="#e4e8ec",GRAY="#8a949f",PALE="#e3edf8",PALER="#fdefe8";
var C=20,X0=20,Y0=10,NX=15;
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

/* うすい格子。1マス＝20。横は0〜15、縦は ymin〜ymax。鏡の高さが y=0 */
function area(ymax,ymin){
 var py=function(y){return Y0+C*(ymax-y)},d='',x,y;
 for(x=0;x<=NX;x++)d+='M'+px(x)+' '+py(ymax)+'V'+py(ymin);
 for(y=ymin;y<=ymax;y++)d+='M'+px(0)+' '+py(y)+'H'+px(NX);
 return {py:py,h:py(ymin)+Y0,grid:'<path d="'+d+'" fill="none" stroke="'+GRID+'" stroke-width="1"/>'}}
function mirror(a,x1,x2){return line(px(x1),a.py(0),px(x2),a.py(0),INK,4)+T(px(x1)-8,a.py(0)+5,13,"鏡","b","end")}
function real(a,x,y,k){var X=px(x),Y=a.py(y);return '<circle cx="'+X+'" cy="'+Y+'" r="9" fill="'+PALER+'" stroke="'+RED+'" stroke-width="1.5"/>'+TN(X,Y+5,13,k,"m b","middle")}
function virt(a,x,y,k){var X=px(x),Y=a.py(y);return '<circle cx="'+X+'" cy="'+Y+'" r="9" fill="'+PALE+'" stroke="'+BLUE+'" stroke-width="1.5" stroke-dasharray="3 2"/>'+TN(X,Y+4,11,k+"'","v b","middle")}

/* 問題の図：鏡は左から5〜10マス、自分(2,-6)、A(1,-4) B(8,-3) C(14,-2) D(4,-4) */
var Ex=2,Ey=-6,M1=5,M2=10,PT={A:[1,-4],B:[8,-3],C:[14,-2],D:[4,-4]},KS=["A","B","C","D"];
function eye(a){var X=px(Ex),Y=a.py(Ey);return '<circle cx="'+X+'" cy="'+Y+'" r="5" fill="'+INK+'"/>'+T(X,Y+18,13,"自分","b","middle")}
var LBL="格子の上に、横長の鏡が真ん中の高さにあります。鏡は、左から5マス目から10マス目までです。鏡の下に、自分(左から2マス目、鏡から6マス下)と、A(左から1マス目、4マス下)、B(左から8マス目、3マス下)、C(左から14マス目、2マス下)、D(左から4マス目、4マス下)があります。鏡の上は、空いています";
function figProblem(){var a=area(7,-7),s=a.grid+mirror(a,M1,M2);
 KS.forEach(function(k){s+=real(a,PT[k][0],PT[k][1],k)});
 return svg(a.h,LBL,s+eye(a))}

/* 解説の図：虚像A'〜D'を描き、自分と結ぶ。Bだけ、線が鏡と交わる */
function figAns(){var a=area(7,-7),s=a.grid+mirror(a,M1,M2),EX=px(Ex),EY=a.py(Ey);
 s+=T(px(0),22,12,"鏡の向こう(虚像の世界)","g");
 ["A","C","D"].forEach(function(k){var p=PT[k];s+=line(EX,EY,px(p[0]),a.py(-p[1]),GRAY,1,true)});
 var b=PT.B,cx=Ex+(b[0]-Ex)*(0-Ey)/(-b[1]-Ey),mx=px(cx),my=a.py(0),bx=px(b[0]),by=a.py(b[1]);
 s+=line(mx,my,bx,a.py(-b[1]),BLUE,1.5,true)+
  line(bx,by,mx,my,INK,1.5)+arw(bx,by,mx,my)+
  line(mx,my,EX,EY,INK,1.5)+arw(mx,my,EX,EY)+
  '<circle cx="'+mx+'" cy="'+my+'" r="3" fill="'+INK+'"/>';
 KS.forEach(function(k){s+=real(a,PT[k][0],PT[k][1],k)});
 KS.forEach(function(k){s+=virt(a,PT[k][0],-PT[k][1],k)});
 return svg(a.h,"鏡を軸にして、A、B、C、Dの線対称の位置に、虚像A'、B'、C'、D'を描いた図。自分とB'を結ぶ線だけが、鏡と交わる。光は、Bから鏡の交点に進み、自分に届く。自分とA'、C'、D'を結ぶ線は、鏡の外を通る",s+eye(a))}

/* 厳選ポイントの図：物体(2マス下)と虚像(2マス上) */
function figPoint(){var a=area(4,-4),X=px(7),s=a.grid+mirror(a,3,12);
 s+=line(X,a.py(2),X,a.py(-2),GRAY,1,true);
 s+='<circle cx="'+X+'" cy="'+a.py(-2)+'" r="7" fill="'+PALER+'" stroke="'+RED+'" stroke-width="1.5"/>'+
  '<circle cx="'+X+'" cy="'+a.py(2)+'" r="7" fill="'+PALE+'" stroke="'+BLUE+'" stroke-width="1.5" stroke-dasharray="3 2"/>'+
  T(X+14,a.py(-2)+5,13,"物体","m b")+T(X+14,a.py(2)+5,13,"虚像","v b")+
  T(X-8,a.py(-1)+4,12,"2マス","m","end")+T(X-8,a.py(1)+4,12,"2マス","v","end");
 return svg(a.h,"格子の上の図。鏡の2マス下に物体があり、鏡の2マス上に虚像がある。物体と虚像は、鏡を軸にした線対称の位置にある",s)}

/* 補充問題の図：横から見た図。1cm＝1.6 */
var FY=270;
function sy(cm){return FY-1.6*cm}
function stick(x,k,dash){return '<line x1="'+x+'" y1="'+sy(0)+'" x2="'+x+'" y2="'+sy(140)+'" stroke="'+k+'" stroke-width="3" stroke-linecap="round"'+(dash?' stroke-dasharray="1 6"':'')+'/>'}
function figSideQ(){
 var s=stick(100,INK)+line(250,sy(140),250,sy(0),INK,4)+T(250,36,13,"鏡","b","middle")+
  '<path d="M82,'+sy(140)+' H76 V'+sy(0)+' H82" fill="none" stroke="'+GRAY+'" stroke-width="1.2"/>'+
  T(70,(sy(140)+sy(0))/2+5,13,"140cm","b","end")+T(100,FY+20,13,"Aさん","b","middle");
 return svg(300,"横から見た図。身長140cmのAさんが、鏡の前に立っている",s)}
function figSideA(){
 var xp=70,xm=170,xv=270,ey=sy(130),h1=sy(135),h2=sy(65),s='';
 s+=stick(xp,INK)+stick(xv,BLUE,true)+line(xm,h1,xm,h2,INK,4);
 s+=line(xm,h1,xv,sy(140),BLUE,1.5,true)+line(xm,h2,xv,sy(0),BLUE,1.5,true);
 s+=line(xp,sy(140),xm,h1,INK,1.5)+arw(xp,sy(140),xm,h1)+line(xm,h1,xp,ey,INK,1.5)+arw(xm,h1,xp,ey)+
  line(xp,sy(0),xm,h2,INK,1.5)+arw(xp,sy(0),xm,h2)+line(xm,h2,xp,ey,INK,1.5)+arw(xm,h2,xp,ey);
 s+='<circle cx="'+xm+'" cy="'+h1+'" r="3" fill="'+INK+'"/><circle cx="'+xm+'" cy="'+h2+'" r="3" fill="'+INK+'"/>'+
  '<circle cx="'+xp+'" cy="'+ey+'" r="5" fill="#fff" stroke="'+INK+'" stroke-width="1.5"/>'+
  T(xp-10,ey+5,13,"目","b","end")+T(xm+10,(h1+h2)/2+5,13,"70cm","b")+
  T(xp,FY+20,13,"Aさん","b","middle")+T(xv,FY+20,13,"虚像","v b","middle");
 return svg(300,"横から見た図。Aさんの目から見て、頭のてっぺんの虚像は鏡の上の端で、足の先の虚像は鏡の下の端で見える。頭からの光は、目と頭の真ん中で反射し、足からの光は、目と足の真ん中で反射する。鏡の長さは70cm",s)}

var M='<span class="m" style="white-space:nowrap">物体</span>',V='<span class="v" style="white-space:nowrap">虚像</span>';
var SOL='<p>鏡は、虚像を見る「窓」と考えます。鏡の向こうに、虚像の世界があります。</p>'+figAns()+
 '<p>① 鏡を軸にして、A、B、C、Dの線対称の位置に、虚像(A\', B\', C\', D\')を描く。</p>'+
 '<p>② 自分の位置と、虚像を、線で結ぶ。</p>'+
 '<p>③ その線と鏡の交点で、光は反射する。</p>'+
 '<p>線が鏡と交わるのは、<b>B</b>だけです。A、C、Dの虚像を結んだ線は、鏡の外を通るので、見えません。</p>'+
 '<p class="note">実際の光は、Bから鏡の交点に進み、そこで反射して自分に届きます(図の矢印)。</p>';
var SOL2='<p>鏡に全身が映るとき、頭のてっぺんと足の先の虚像が、鏡の中に見えます。</p>'+figSideA()+
 '<p>① 頭からの光は、目と頭の真ん中で反射する。<br>② 足からの光は、目と足の真ん中で反射する。</p>'+
 '<p>鏡に必要な長さは、この2つの点の間です。<br>140cm ÷ 2 ＝ <b>70cm</b></p>'+
 '<p class="note">図では、目の高さを130cmとしました。目の高さが変わっても、答えは同じです。</p>';

window.UNIT={
no:"1-8",title:"光の反射",
sections:[
{type:"text",point:true,title:"厳選ポイント",html:
 '<p>鏡に映った像を、'+V+'といいます。<br>'+M+'の'+V+'は、鏡を軸にした線対称の位置にできます。</p>'+figPoint()},
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
