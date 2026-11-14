(function(){
var INK="#26303b",BLUE="#1f5fa8",RED="#c2410c",MUTED="#5d6874";
function T(x,y,size,txt,cls,anchor){return '<text x="'+x+'" y="'+y+'" font-size="'+size+'"'+(anchor?' text-anchor="'+anchor+'"':'')+(cls?' class="'+cls+'"':'')+'>'+txt+'</text>'}
/* 色つきの面の上の文字：まわりの白いふちを消す */
function TN(x,y,size,txt,cls,anchor){return '<text x="'+x+'" y="'+y+'" font-size="'+size+'" style="stroke:none"'+(anchor?' text-anchor="'+anchor+'"':'')+(cls?' class="'+cls+'"':'')+'>'+txt+'</text>'}
function svg(h,label,body){return '<div class="fig"><svg viewBox="0 0 340 '+h+'" role="img" aria-label="'+label+'">'+body+'</svg></div>'}
function line(x1,y1,x2,y2,k,w,dash){return '<line x1="'+x1+'" y1="'+y1+'" x2="'+x2+'" y2="'+y2+'" stroke="'+k+'" stroke-width="'+(w||1)+'"'+(dash?' stroke-dasharray="4 3"':'')+'/>'}
function dot(x,y){return '<circle cx="'+x+'" cy="'+y+'" r="5" fill="'+INK+'"/>'}
/* 矢じるし：線の真ん中に、進む向きの「く」の字 */
function arw(x1,y1,x2,y2){var mx=(x1+x2)/2,my=(y1+y2)/2,a=Math.atan2(y2-y1,x2-x1),L=7,s=.5;
 function p(t){return (mx-L*Math.cos(a+t)).toFixed(1)+','+(my-L*Math.sin(a+t)).toFixed(1)}
 return line(x1,y1,x2,y2,INK,1.5)+'<path d="M'+p(s)+' L'+mx.toFixed(1)+','+my.toFixed(1)+' L'+p(-s)+'" fill="none" stroke="'+INK+'" stroke-width="1.5"/>'}
function brace(x1,x2,y){return '<path d="M'+x1+','+y+' V'+(y+5)+' H'+x2+' V'+y+'" fill="none" stroke="'+MUTED+'" stroke-width="1.2"/>'}

/* 厳選ポイントの図：音が出た点から波が広がり、1秒ごとに340mずつ進む */
function figSpeed(){
 var CX=30,CY=100,A=24*Math.PI/180,Rs=[90,180,270],s='',i;
 function r1(v){return Math.round(v*10)/10}
 s+=line(CX,CY,322,CY,"#b4bbc3",1);
 Rs.forEach(function(r){var dx=r*Math.cos(A),dy=r*Math.sin(A);
  s+='<path d="M'+r1(CX+dx)+','+r1(CY-dy)+' A'+r+','+r+' 0 0 1 '+r1(CX+dx)+','+r1(CY+dy)+'" fill="none" stroke="'+BLUE+'" stroke-width="2.5" stroke-linecap="round"/>'});
 for(i=0;i<3;i++){var a=CX+(i?Rs[i-1]:0)+(i?6:8),b=CX+Rs[i]-6;
  s+=line(a,CY,b-5,CY,RED,3)+'<polygon points="'+b+','+CY+' '+(b-10)+','+(CY-5.5)+' '+(b-10)+','+(CY+5.5)+'" fill="'+RED+'"/>'+
   T((a+b)/2,CY-10,14,"340m","m b","middle")}
 s+=dot(CX,CY);
 s+=T(CX+6,CY+26,14,"0秒","v b","middle")+T(CX+6,CY+44,12,"音が出る","g","middle");
 Rs.forEach(function(r,k){s+=T(CX+r-9,CY+26,14,(k+1)+"秒後","v b","end")});
 return svg(206,"音が出た点から、波が広がっていく図。音が出た時点が0秒。1秒後、2秒後、3秒後と、波の先が1秒ごとに340mずつ進む",s)}

/* 解答の図(1)：雷の光と音が、雷から見ている場所まで進む(同じ距離。光はほぼ0秒、音は6秒) */
function figOne(){
 var X1=30,X2=310,Y1=39,Y2=107,LT="#b7791f",s='';
 s+=line(X1,Y1,X1,Y2,"#b4bbc3",1,true)+line(X2,Y1,X2,Y2,"#b4bbc3",1,true);
 /* 雷 */
 s+='<polygon transform="translate(117.2,-1.5) scale(.62)" points="316,4 302,30 310,30 304,52 320,24 312,24" fill="#fbe7b0" stroke="'+LT+'" stroke-width="2.4" stroke-linejoin="round"/>';
 /* 光(上) */
 s+=T(6,Y1-22,13,'雷の光　<tspan class="g">秒速約30万km</tspan>',"b")+
  dot(X1,Y1)+dot(X2,Y1)+arw(304,Y1,36,Y1)+T(170,Y1-8,14,"ほぼ0秒","v b","middle");
 /* 音(下) */
 s+=T(6,Y2-22,13,'音　<tspan class="g">秒速340m</tspan>',"b")+
  dot(X1,Y2)+dot(X2,Y2)+arw(304,Y2,36,Y2)+T(170,Y2-8,14,"6秒","v b","middle")+
  brace(36,304,Y2+10)+T(170,Y2+36,14,"2040m","m b","middle");
 s+=T(6,Y2+56,13,"見ている場所","g")+T(310,Y2+56,13,"雷","g","middle");
 return svg(Y2+68,"雷の光と音が、雷から見ている場所まで進む図。光は秒速約30万kmで、ほぼ0秒で届く。音は秒速340mで、6秒かかる。進んだ距離は、どちらも2040m",s)}

/* 「き・は・じ」の図(PDFの形)。1つの円に、中心を通る横の直径と、中心から下への半径。
   上半分＝き(距離)、左下＝は(速さ)、右下＝じ(時間)。×は縦の線の上、÷は横の線の左右の上。
   o.ha・o.ji・o.ki＝わかっている値(なければ書かない)。o.na＝図の右横に「なので、」を付ける。o.big＝大きく表示 */
function figKHJ(o){
 o=o||{};
 var CX=150,CY=95,R=70,s='',lab,GL="#8a949f",hasV=o.ha||o.ji||o.ki,
  w=hasV?"12.2rem":"15rem",vb=hasV?"-24 18 324 158":"0 18 300 158",FS=21.5,f;
 if(o.row){w="8.5rem";vb="70 22 160 148"}
 /* 線は、まわりの図と同じ細さ(1.2)の灰色 */
 s+='<circle cx="'+CX+'" cy="'+CY+'" r="'+R+'" fill="#fff" stroke="'+GL+'" stroke-width="1.2"/>'+
  line(CX-R,CY,CX+R,CY,GL,1.2)+line(CX,CY,CX,CY+R,GL,1.2);
 /* ÷は「は」「じ」の真上、×は縦の線の上 */
 s+=T(CX-28,CY+8,20,"÷","b","middle")+T(CX+28,CY+8,20,"÷","b","middle")+T(CX,CY+40,20,"×","b","middle");
 s+=TN(CX,CY-34,24,"き","m b","middle")+TN(CX,CY-14,13,"(距離)","g","middle")+
  TN(CX-28,CY+33,24,"は","b","middle")+TN(CX-28,CY+49,12,"(速さ)","g","middle")+
  TN(CX+28,CY+33,24,"じ","v b","middle")+TN(CX+28,CY+49,12,"(時間)","g","middle");
 /* わかっている値：指し示す線つき(線の角度は、どれも約30°)。はは左下、じは右下で、円の底と下をそろえる */
 if(o.ki)s+=line(201,37,167,52,MUTED,1)+T(203,43,FS,o.ki,"m b");
 if(o.ha)s+=line(62,156,107,126,MUTED,1)+T(58,CY+R,FS,o.ha,"b","end");
 if(o.ji)s+=line(238,156,193,126,MUTED,1)+T(242,CY+R,FS,o.ji,"v b");
 lab="「き・は・じ」の図。1つの円に、横の直径と、中心から下への半径がある。上半分に「き」(距離)、左下に「は」(速さ)、右下に「じ」(時間)。「は」と「じ」の間は×、「き」と「は」の間と、「き」と「じ」の間は÷。"+
  (o.ha?"速さは"+o.ha.replace(/<[^>]*>/g,"")+"。":"")+(o.ji?"時間は"+o.ji.replace(/<[^>]*>/g,"")+"。":"")+(o.ki?"距離は"+o.ki.replace(/<[^>]*>/g,"")+"。":"");
 f='<div class="fig" style="margin:0;width:'+w+';flex:0 0 auto"><svg viewBox="'+vb+'" role="img" aria-label="'+lab+'">'+s+'</svg></div>';
 if(o.row)return '<div style="display:flex;flex-wrap:wrap;align-items:center;gap:.2rem .4rem;margin:.6rem 0"><span style="white-space:nowrap">つまり、</span>'+f+'<span style="white-space:nowrap">となります。</span></div>';
 return '<div style="display:flex;align-items:center;gap:.3rem;margin:'+(hasV?'.4rem 0':'-.6rem 0 .6rem')+'">'+f+(o.na?'<span style="white-space:nowrap;margin-left:-.9rem">なので、</span>':'')+'</div>'}

/* 解答の図(2)・補充：行きと帰りの矢印を、近づけてU字につなぐ。o.one＝片道、o.tot＝往復、o.tm＝時間、o.wall＝true なら壁、false なら山。
   o.sp があれば、上の文字を「秒速o.spで往復」にする */
function figRound(o){
 var s='',tg=o.wall?"壁":"山",Y1=52,Y2=74,XU=256,r=(Y2-Y1)/2,ym=(Y1+Y2)/2,f,top;
 if(o.wall)s+='<rect x="'+(XU+r)+'" y="36" width="26" height="54" fill="#e6e9ed" stroke="#8a949f" stroke-width="1.2"/>'+TN(XU+r+13,ym+5,13,tg,"b","middle");
 else s+='<polygon points="285,26 255,88 315,88" fill="#e6e9ed" stroke="#8a949f" stroke-width="1.2" stroke-linejoin="round"/>'+TN(285,82,13,tg,"b","middle");
 top=o.sp?'<tspan class="v b">秒速</tspan><tspan class="m b">'+o.sp+'</tspan>':'<tspan class="v b">'+o.tm+'</tspan>';
 s+=T(6,18,14,top+'で往復 <tspan class="m b">'+o.tot+'</tspan>')+
  dot(30,ym)+arw(40,Y1,XU,Y1)+arw(XU,Y2,40,Y2)+
  '<path d="M'+XU+','+Y1+' A'+r+','+r+' 0 0 1 '+XU+','+Y2+'" fill="none" stroke="'+INK+'" stroke-width="1.5"/>'+
  T(148,Y1-10,14,'行き <tspan class="m b">'+o.one+'</tspan>',null,"middle")+
  T(148,Y2+20,14,'帰り <tspan class="m b">'+o.one+'</tspan>',null,"middle")+
  T(6,Y2+44,13,"声を出した場所","g");
 f=svg(126,"声が、声を出した場所から"+tg+"まで行って、同じ道を帰ってくる図。行きと帰りの矢印を、U字につないで往復を表す。片道は"+o.one+"、往復は"+o.tot+(o.sp?"。声の速さは秒速"+o.sp:"で、かかった時間は"+o.tm),s);
 return f}

var R='<span class="m">',V='<span class="v">',E='</span>';
function fr(a,b){return '<span class="frac"><span class="m">'+a+'</span><span class="v">'+b+'</span></span>'}
var SPD='<tspan class="m">340m</tspan>/<tspan class="v">s</tspan>',
 FIG1=figSpeed(),FIGROW=figKHJ({row:1}),FIGONE=figOne(),
 FIG2=figRound({one:"680m",tot:"1360m",tm:"4秒",wall:false}),
 FIG3=figRound({one:"170m",tot:"340m",sp:"340m",wall:true});

var SOL='<p>(1) 光はほぼ0秒で届くので、聞こえるまでの<b>6秒</b>は、音が進んだ時間です。</p>'+FIGONE+
 figKHJ({ha:SPD,ji:'6秒',na:1})+
 '<p>340m/s × 6秒 ＝ <b>2040m</b></p>'+
 '<p>(2) 山びこは、山まで行って、帰ってきます。進んだ距離は<b>往復</b>です。</p>'+
 figKHJ({ha:SPD,ji:'4秒',na:1})+
 '<p>往復：340m/s × 4秒 ＝ 1360m<br>片道：1360m ÷ 2 ＝ <b>680m</b></p>'+FIG2;

var SOL2='<p>声は、壁まで行って、帰ってきます。進む距離は<b>往復</b>です。<br>往復：170m × 2 ＝ 340m</p>'+
 figKHJ({ha:SPD,ki:'340m',na:1})+
 '<p>340m ÷ 340m/s ＝ <b>1秒</b></p>'+FIG3;

window.UNIT={
no:"1-12",title:"音の速さ",
sections:[
{type:"text",point:true,title:"厳選ポイント",html:
 '<p>速さは、1秒あたりに進む'+R+'距離'+E+'です。音の速さは、'+R+'340m'+E+'/'+V+'s'+E+'です。</p>'+FIG1+
 '<div class="formula">速さ(m/s) ＝ '+fr("距離(m)","時間(s)")+'</div>'+
 '<div class="formula"><span class="m">m</span>/<span class="v">s</span> ＝ <span class="m">m</span> ÷ <span class="v">s</span> ＝ '+fr("m","s")+'</div>'+
 FIGROW+
 '<p class="note">340m/sは、「秒速340m」ともいいます。</p>'},
{type:"problem",title:"問題",
 body:'<p>音の速さを秒速340mとして、次の距離を求めなさい。</p>'+
 '<p>(1) 雷が光ってから、6秒後に雷の音が聞こえた。見ている場所から、雷が光ったところまでは何mか。</p>'+
 '<p>(2) 山に向かって大きな声を出したところ、4秒後に、山に反射した声が聞こえた。声を出した場所から山までは何mか。</p>',
 parts:[
  {label:"(1)",unit:"m",type:"number",accept:[2040],tol:0.5},
  {label:"(2)",unit:"m",type:"number",accept:[680],tol:0.5}
 ]},
{type:"answer",html:SOL},
{type:"problem",title:"補充問題",
 body:'<p>音の速さを秒速340mとする。壁まで170mの場所で、壁に向かって大きな声を出した。声が壁に反射して返ってくるまで、何秒かかるか。</p>',
 parts:[{label:"答え",unit:"秒",type:"number",accept:[1],tol:0.01}],
 solution:SOL2}
]};
})();
