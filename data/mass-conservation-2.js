(function(){
var INK="#26303b",BLUE="#1f5fa8",RED="#c2410c",MUTED="#5d6874",GRAY="#8a949f",GRID="#e3e7eb";
var FR="#fdefe8",FB="#e3edf8",FG="#e6e9ed";
function n(v){return Math.round(v*10)/10}
function T(x,y,size,txt,cls,anchor){return '<text x="'+n(x)+'" y="'+n(y)+'" font-size="'+size+'"'+(anchor?' text-anchor="'+anchor+'"':'')+(cls?' class="'+cls+'"':'')+'>'+txt+'</text>'}
/* 色つきの面の上の文字：まわりの白いふちを消す */
function TN(x,y,size,txt,cls,anchor){return '<text x="'+n(x)+'" y="'+n(y)+'" font-size="'+size+'" style="stroke:none"'+(anchor?' text-anchor="'+anchor+'"':'')+(cls?' class="'+cls+'"':'')+'>'+txt+'</text>'}
function line(x1,y1,x2,y2,k,w,dash){return '<line x1="'+n(x1)+'" y1="'+n(y1)+'" x2="'+n(x2)+'" y2="'+n(y2)+'" stroke="'+k+'" stroke-width="'+(w||1)+'"'+(dash?' stroke-dasharray="4 3"':'')+'/>'}
function svg(h,label,body){return '<div class="fig"><svg viewBox="0 0 340 '+h+'" role="img" aria-label="'+label+'">'+body+'</svg></div>'}
function rect(x,y,w,h,f,k){return '<rect x="'+n(x)+'" y="'+n(y)+'" width="'+n(w)+'" height="'+h+'" fill="'+f+'" stroke="'+k+'" stroke-width="1.2"/>'}
/* かっこ(上向き up=1 は上に、0 は下に開く) */
function brUp(a,b,y){return '<path d="M'+n(a)+','+n(y+4)+' V'+n(y)+' H'+n(b)+' V'+n(y+4)+'" fill="none" stroke="'+MUTED+'" stroke-width="1.5"/>'}
function brDn(a,b,y){return '<path d="M'+n(a)+','+n(y-4)+' V'+n(y)+' H'+n(b)+' V'+n(y-4)+'" fill="none" stroke="'+MUTED+'" stroke-width="1.5"/>'}
function right(x1,x2,y){return line(x1,y,x2,y,INK,1.5)+'<path d="M'+n(x2-6)+','+n(y-5)+' L'+n(x2)+','+n(y)+' L'+n(x2-6)+','+n(y+5)+'" fill="none" stroke="'+INK+'" stroke-width="1.5"/>'}
function down(x,y1,y2){return line(x,y1,x,y2,INK,1.5)+'<path d="M'+n(x-5)+','+n(y2-6)+' L'+n(x)+','+n(y2)+' L'+n(x+5)+','+n(y2-6)+'" fill="none" stroke="'+INK+'" stroke-width="1.5"/>'}

/* ---------- 厳選ポイントの図：銅に酸素が結びついて、酸化銅になる(数字なし) ---------- */
function figPoint(){
 var y=36,h=34,s=rect(20,y,90,h,FR,RED)+TN(65,y+22,14,"銅","m b","middle")+
  T(152,y+h/2-8,13,"加熱","b","middle")+right(124,180,y+h/2)+
  rect(196,y,90,h,FR,RED)+TN(241,y+22,14,"銅","m b","middle")+
  rect(286,y,40,h,FB,BLUE)+TN(306,y+22,13,"酸素","v b","middle")+
  T(306,22,12,"増えた","v b","middle")+brUp(286,326,28)+
  brDn(196,326,y+h+8)+T(261,y+h+26,14,"酸化銅","b","middle");
 return svg(104,"銅を加熱すると、銅に酸素が結びついて、酸化銅ができる図。左は銅。右は酸化銅で、銅の部分と、結びついた酸素の部分がある。酸素の分だけ、質量が増える",s)}

/* ---------- 問題・解答の図：加熱した銅の質量と、できた酸化銅の質量(原点を通る直線) ---------- */
function figGraph(show){
 var ox=52,oy=210,sx=5.2,sy=3,s='',v;
 function X(a){return ox+a*sx}
 function Y(a){return oy-a*sy}
 for(v=10;v<=50;v+=10)s+=line(X(v),oy,X(v),Y(60),GRID,1);
 for(v=10;v<=60;v+=10)s+=line(ox,Y(v),X(50),Y(v),GRID,1);
 s+=line(ox,oy,X(50)+10,oy,INK,1.5)+line(ox,oy,ox,Y(60)-6,INK,1.5);
 if(show)s+=line(X(40),oy,X(40),Y(50),GRAY,1,true)+line(ox,Y(40),X(40),Y(40),GRAY,1,true)+line(ox,Y(50),X(40),Y(50),GRAY,1,true);
 s+=line(X(0),Y(0),X(48),Y(60),INK,2);
 if(show)s+=line(X(40),Y(40),X(40),Y(50),BLUE,4)+'<circle cx="'+n(X(40))+'" cy="'+n(Y(50))+'" r="3.5" fill="'+INK+'"/>'+
  T(X(40)+8,Y(45)+4,13,"増えた10g","v b");
 for(v=0;v<=50;v+=10)s+=T(X(v),oy+16,12,v,(show&&v===40)?"m b":"g","middle");
 for(v=10;v<=60;v+=10)s+=T(ox-6,Y(v)+4,12,v,(show&&v===40)?"m b":(show&&v===50)?"b":"g","end");
 s+=T(4,16,12,"酸化銅の質量[g]","b")+T(336,244,12,"加熱した銅の質量[g]","b","end");
 return svg(250,show?"加熱した銅の質量と、できた酸化銅の質量のグラフ。原点を通る右上がりの直線。銅が40gのとき、酸化銅は50gで、増えた10gが、結びついた酸素の質量":"加熱した銅の質量と、できた酸化銅の質量のグラフ。原点を通る右上がりの直線。横軸は加熱した銅の質量で0から50g、縦軸は酸化銅の質量で0から60g",s)}

/* ---------- 補充の解答の図：加熱前の12.0gと、加熱後の14.0gの中身(1g＝18) ---------- */
function figBand(){
 var x0=70,u=18,h=44,y1=36,y2=124,s='';
 function seg(x,y,w,f,k,nm,val,cl){return rect(x,y,w,h,f,k)+TN(x+w/2,y+18,12,nm,cl,"middle")+TN(x+w/2,y+37,15,val,cl+" b","middle")}
 s+=T(4,y1+h/2+5,13,"加熱前","b")+T(4,y2+h/2+5,13,"加熱後","b")+
  brUp(x0,x0+12*u,24)+T(x0+6*u,16,14,"12.0g","b","middle")+
  seg(x0,y1,8*u,FR,RED,"反応した銅","8.0g","m")+seg(x0+8*u,y1,4*u,FG,GRAY,"残った銅","4.0g","g")+
  down(24,y1+h+8,y2-12)+T(32,y1+h+27,13,"加熱","b")+
  brUp(x0,x0+10*u,y2-14)+T(x0+5*u,y2-20,13,"酸化銅 10.0g","b","middle")+
  seg(x0,y2,8*u,FR,RED,"反応した銅","8.0g","m")+seg(x0+8*u,y2,2*u,FB,BLUE,"酸素","2.0g","v")+seg(x0+10*u,y2,4*u,FG,GRAY,"残った銅","4.0g","g")+
  brDn(x0,x0+14*u,y2+h+8)+T(x0+7*u,y2+h+26,14,"14.0g","b","middle");
 return svg(206,"銅12.0gを加熱して14.0gになった図。加熱前は、反応した銅8.0gと、残った銅4.0g。加熱後は、反応した銅8.0gに酸素2.0gが結びついた酸化銅10.0gと、残った銅4.0g。全体で14.0g",s)}

/* ---------- 文章 ---------- */
var M=function(t){return '<span class="m">'+t+'</span>'},V=function(t){return '<span class="v">'+t+'</span>'};

var POINT='<p>酸素を含む空気中で銅を加熱すると、'+M('銅')+'に'+V('酸素')+'が結びついて、酸化銅ができます。結びついた'+V('酸素')+'の分だけ、質量が増えます。</p>'+figPoint()+
 '<div class="formula">増えた質量 ＝ '+V('結びついた酸素の質量')+'</div>'+
 '<p>化学反応式で表すと、次のとおりです。</p>'+
 '<div class="formula">2'+M('Cu')+' ＋ '+V('O₂')+' → 2'+M('Cu')+V('O')+'</div>';

var QBODY='<p>銅の粉末を十分に加熱し、できた酸化銅の質量を調べた。次のグラフは、その結果を表したものである。</p>'+figGraph(false);

var ANS=figGraph(true)+
 '<p>(1) 酸化銅50g − 銅40g ＝ <b class="v">10g</b><br><span class="note">増えた10gが、結びついた酸素の質量です。</span></p>'+
 '<p>(2) '+M('銅')+'：'+V('酸素')+' ＝ '+M('40g')+'：'+V('10g')+' ＝ <b>4：1</b></p>';

var SBODY='<p>銅12.0gを加熱したところ、途中で加熱をやめたため、全体の質量が14.0gになった。このとき、まだ酸素と結びついていない銅は何gか。</p>'+
 '<p class="note">問題の(2)の答えを使って、考えなさい。</p>';

var SOL2=figBand()+
 '<p>① 結びついた酸素：14.0 − 12.0 ＝ '+V('<b>2.0g</b>')+'</p>'+
 '<p>② 反応した銅：'+M('銅')+'：'+V('酸素')+' ＝ 4：1 ＝ '+M('□')+'g：'+V('2.0g')+'<br>□ ＝ 2.0 × 4 ＝ '+M('<b>8.0g</b>')+'</p>'+
 '<p>③ 反応していない銅：12.0 − 8.0 ＝ <b>4.0g</b></p>';

window.UNIT={
no:"2-8",title:"質量保存の法則(気体が結びつく反応)",
sections:[
{type:"text",point:true,title:"厳選ポイント",html:POINT},
{type:"problem",title:"問題",body:QBODY,
 parts:[
  {label:"(1) 銅40gに結びついた酸素の質量",unit:"g",type:"number",accept:[10],tol:0.5},
  {label:"(2)",text:"銅と酸素の質量比を、最も簡単な整数比で答えなさい。",type:"pick",choices:["1：4","4：1","5：4","8：2"],accept:["4：1"]}
 ]},
{type:"answer",html:ANS},
{type:"problem",title:"補充問題",body:SBODY,
 parts:[{label:"答え",unit:"g",type:"number",accept:[4],tol:0.05}],
 solution:SOL2}
]};
})();
