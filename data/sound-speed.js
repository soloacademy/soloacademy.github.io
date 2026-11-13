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
 var X1=30,X2=310,Y1=66,Y2=134,LT="#b7791f",s='';
 s+=line(X1,Y1,X1,Y2,"#b4bbc3",1,true)+line(X2,Y1,X2,Y2,"#b4bbc3",1,true);
 /* 雷 */
 s+='<polygon points="316,4 302,30 310,30 304,52 320,24 312,24" fill="#fbe7b0" stroke="'+LT+'" stroke-width="1.5" stroke-linejoin="round"/>';
 /* 光(上) */
 s+=T(6,44,13,'雷の光　<tspan class="g">秒速約30万km</tspan>',"b")+
  dot(X1,Y1)+dot(X2,Y1)+arw(304,Y1,36,Y1)+T(170,Y1-8,14,"ほぼ0秒","v b","middle");
 /* 音(下) */
 s+=T(6,112,13,'音　<tspan class="g">秒速340m</tspan>',"b")+
  dot(X1,Y2)+dot(X2,Y2)+arw(304,Y2,36,Y2)+T(170,Y2-8,14,"6秒","v b","middle")+
  brace(36,304,Y2+10)+T(170,Y2+36,14,"2040m","m b","middle");
 s+=T(6,190,13,"見ている場所","g")+T(310,190,13,"雷","g","middle");
 return svg(200,"雷の光と音が、雷から見ている場所まで進む図。光は秒速約30万kmで、ほぼ0秒で届く。音は秒速340mで、6秒かかる。進んだ距離は、どちらも2040m",s)}

/* 解答の図(2)・補充：行きと帰り(往復)。o.one＝片道、o.tot＝往復、o.tm＝時間、o.wall＝true なら壁、false なら山 */
function figRound(o){
 var s='',tg=o.wall?"壁":"山";
 if(o.wall)s+='<rect x="284" y="30" width="26" height="92" fill="#e6e9ed" stroke="#8a949f" stroke-width="1.2"/>'+TN(297,82,13,tg,"b","middle");
 else s+='<polygon points="280,122 305,32 330,122" fill="#e6e9ed" stroke="#8a949f" stroke-width="1.2" stroke-linejoin="round"/>'+TN(305,114,13,tg,"b","middle");
 s+=dot(30,77)+arw(40,44,276,44)+arw(276,110,40,110)+
  T(160,34,14,'行き <tspan class="m b">'+o.one+'</tspan>',null,"middle")+
  T(160,82,14,'<tspan class="v b">'+o.tm+'</tspan>で往復 <tspan class="m b">'+o.tot+'</tspan>',null,"middle")+
  T(160,130,14,'帰り <tspan class="m b">'+o.one+'</tspan>',null,"middle")+
  T(6,150,13,"声を出した場所","g");
 return svg(158,"声が、声を出した場所から"+tg+"まで行って、同じ道を帰ってくる図。片道は"+o.one+"、往復は"+o.tot+"で、かかった時間は"+o.tm,s)}

/* 解答の図(2)：1秒ごとに340mずつ進む。行きは2本、帰りは2本。山で折り返す */
function figSteps(){
 var X0=30,XM=250,Y1=64,Y2=166,s='',i;
 function ar(x1,x2,y){var d=x2>x1?1:-1,tip=x2,b=x2-d*10;
  return line(x1,y,b,y,RED,3)+'<polygon points="'+tip+','+y+' '+b+','+(y-5.5)+' '+b+','+(y+5.5)+'" fill="'+RED+'"/>'+T((x1+x2)/2,y-10,14,"340m","m b","middle")}
 function tk(x,y,t){return line(x,y-6,x,y+6,INK,1.2)+T(x,y+24,14,t,"v b","middle")}
 s+=T(6,34,13,'行き　<tspan class="m b">340m × 2 ＝ 680m</tspan>',"b")+T(6,136,13,'帰り　<tspan class="m b">340m × 2 ＝ 680m</tspan>',"b");
 /* 山 */
 s+='<polygon points="257,'+Y1+' 270,'+(Y1-24)+' 283,'+Y1+'" fill="#e6e9ed" stroke="#8a949f" stroke-width="1.2" stroke-linejoin="round"/>'+TN(270,Y1-3,12,"山","b","middle");
 /* 行き(上)：0秒→1秒後→2秒後 */
 s+=ar(36,134,Y1)+ar(146,244,Y1)+dot(X0,Y1)+tk(140,Y1,"1秒後")+tk(XM,Y1,"2秒後")+T(X0,Y1+24,14,"0秒","v b","middle");
 /* 山で反射 */
 s+=line(XM,Y1+34,XM,Y2-34,MUTED,1.2,true)+T(XM+8,(Y1+Y2)/2+4,13,"山で反射","g");
 /* 帰り(下)：2秒後→3秒後→4秒後 */
 s+=ar(244,146,Y2)+ar(134,36,Y2)+dot(X0,Y2)+tk(140,Y2,"3秒後")+tk(XM,Y2,"2秒後")+T(X0,Y2+24,14,"4秒後","v b","middle");
 s+=T(6,Y2+50,13,"声を出した場所","g");
 return svg(226,"声が山まで行って、帰ってくる図。1秒ごとに340mずつ進む。行きは、0秒から2秒後までの340mの矢印が2本で、680m。山で反射して、帰りは、2秒後から4秒後までの340mの矢印が2本で、680m。4秒で、340mの矢印が4本、1360mになる",s)}

var R='<span class="m">',V='<span class="v">',E='</span>';
var FIG1=figSpeed(),FIGONE=figOne(),
 FIG2=figSteps(),
 FIG3=figRound({one:"170m",tot:"340m",tm:"1秒",wall:true});

var SOL='<p>光はほぼ0秒で届くので、聞こえるまでの<b>6秒</b>は、音が進んだ時間です。</p>'+FIGONE+
 '<p>(1) 距離 ＝ 速さ × 時間<br>340m/s × 6秒 ＝ <b>2040m</b></p>'+
 '<p>(2) 山びこは、山まで行って、帰ってきます。進んだ距離は<b>往復</b>です。<br>往復：340m/s × 4秒 ＝ 1360m<br>片道：1360m ÷ 2 ＝ <b>680m</b></p>'+FIG2+
 '<p class="note">山までの距離は、片道です。往復の1360mを、そのまま答えにしないように注意します。</p>';

var SOL2='<p>声は、壁まで行って、帰ってきます。進む距離は<b>往復</b>です。<br>往復：170m × 2 ＝ 340m<br>時間 ＝ 距離 ÷ 速さ なので、340m ÷ 340m/s ＝ <b>1秒</b></p>'+FIG3+
 '<p class="note">往復を忘れて170m ÷ 340m/s ＝ 0.5秒としないように注意します。</p>';

window.UNIT={
no:"1-12",title:"音の速さ",
sections:[
{type:"text",point:true,title:"厳選ポイント",html:
 '<p>速さは、1秒あたりに進む'+R+'距離'+E+'です。音の速さは、'+R+'340m'+E+'/'+V+'s'+E+'です。</p>'+FIG1+
 '<div class="formula">'+R+'距離(m)'+E+' ＝ 速さ('+R+'m'+E+'/'+V+'s'+E+') × '+V+'時間(秒)'+E+'</div>'+
 '<p class="note">m/sは、m÷sの意味です。340m/sは、「秒速340m」ともいいます。</p>'},
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
