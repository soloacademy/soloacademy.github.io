(function(){
var INK="#26303b",BLUE="#1f5fa8",RED="#c2410c",GRAY="#8a949f",RULE="#c9d0d7",SOFT="#9aa5b1",SIDE="#cfd5db";
function n(v){return Math.round(v*10)/10}
function T(x,y,size,txt,cls,anchor){return '<text x="'+n(x)+'" y="'+n(y)+'" font-size="'+size+'"'+(anchor?' text-anchor="'+anchor+'"':'')+(cls?' class="'+cls+'"':'')+'>'+txt+'</text>'}
function TN(x,y,size,txt,cls,anchor){return '<text x="'+n(x)+'" y="'+n(y)+'" font-size="'+size+'" style="stroke:none"'+(anchor?' text-anchor="'+anchor+'"':'')+(cls?' class="'+cls+'"':'')+'>'+txt+'</text>'}
function line(x1,y1,x2,y2,k,w,dash){return '<line x1="'+n(x1)+'" y1="'+n(y1)+'" x2="'+n(x2)+'" y2="'+n(y2)+'" stroke="'+k+'" stroke-width="'+(w||1)+'"'+(dash?' stroke-dasharray="4 3"':'')+'/>'}
function svgY(h,label,body){return '<div class="fig"><svg viewBox="0 0 340 '+h+'" role="img" aria-label="'+label+'">'+body+'</svg></div>'}
/* 先は(x2,y2)。頭は「く」の字 */
function arr(x1,y1,x2,y2,k,w){var a=Math.atan2(y2-y1,x2-x1),L=(w||1.5)>2.5?10:7;w=w||1.5;
 function p(t){return n(x2-L*Math.cos(a+t))+','+n(y2-L*Math.sin(a+t))}
 return line(x1,y1,x2,y2,k,w)+'<path d="M'+p(.5)+' L'+n(x2)+','+n(y2)+' L'+p(-.5)+'" fill="none" stroke="'+k+'" stroke-width="'+w+'" stroke-linecap="round" stroke-linejoin="round"/>'}
function chev(x,y,a,k){var L=7;function p(t){return n(x-L*Math.cos(a+t))+','+n(y-L*Math.sin(a+t))}
 return '<path d="M'+p(.55)+' L'+n(x)+','+n(y)+' L'+p(-.55)+'" fill="none" stroke="'+k+'" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/>'}
/* 手前向き(点)・奥向き(×) */
function dotS(cx,cy,r,k){return '<circle cx="'+n(cx)+'" cy="'+n(cy)+'" r="'+r+'" fill="#fff" stroke="'+k+'" stroke-width="1.5"/><circle cx="'+n(cx)+'" cy="'+n(cy)+'" r="'+n(r*.3)+'" fill="'+k+'"/>'}
function crossS(cx,cy,r,k){var d=r*.55;return '<circle cx="'+n(cx)+'" cy="'+n(cy)+'" r="'+r+'" fill="#fff" stroke="'+k+'" stroke-width="1.5"/>'+line(cx-d,cy-d,cx+d,cy+d,k,1.8)+line(cx-d,cy+d,cx+d,cy-d,k,1.8)}

/* ---------- 図1：直線の導線。左＝横から(手前・奥)、右＝上から(同心円) ---------- */
function figStraight(){
 var s=T(86,16,13,"横から","g b","middle")+T(262,16,13,"上から","g b","middle"),cx=262,cy=108;
 s+=arr(86,160,86,44,RED,3.5)+T(100,76,13,"電流","m b")+
  dotS(34,105,11,BLUE)+T(34,134,12,"手前向き","v b","middle")+crossS(138,105,11,BLUE)+T(138,134,12,"奥向き","v b","middle");
 [24,44].forEach(function(r){
  s+='<circle cx="'+cx+'" cy="'+cy+'" r="'+r+'" fill="none" stroke="'+BLUE+'" stroke-width="1.5"/>'+
   '<path d="M'+(cx-r-5)+','+(cy-4)+' L'+(cx-r)+','+(cy+3)+' L'+(cx-r+5)+','+(cy-4)+'" fill="none" stroke="'+BLUE+'" stroke-width="1.5"/>'+
   '<path d="M'+(cx+r-5)+','+(cy+4)+' L'+(cx+r)+','+(cy-3)+' L'+(cx+r+5)+','+(cy+4)+'" fill="none" stroke="'+BLUE+'" stroke-width="1.5"/>'});
 s+=dotS(cx,cy,7,RED)+
  '<circle cx="'+cx+'" cy="64" r="11" fill="#fff" stroke="'+GRAY+'" stroke-width="1.2"/>'+line(253,64,cx,64,INK,3.5)+line(cx,64,271,64,SIDE,3.5)+T(240,68,11,"N","b","end")+
  T(cx,172,12,"磁界は同心円","v b","middle");
 return svgY(184,"直線の導線のまわりの磁界の図。左は横から見た図で、上向きの電流が流れる導線の左側では磁界が手前向き、右側では奥向き。右は上から見た図で、磁界は導線を中心にした同心円で、反時計まわり。方位磁針のN極は、磁界の向きを指す",s)}

/* ---------- 図2：コイル。o.cur＝前側の電流(up/down)、o.ends＝{l,r}のN・S、o.ask＝前側に「?」 ---------- */
function figCoil(o){
 var s=line(62,125,100,125,INK,2)+line(260,125,298,125,INK,2),i,x,a;
 for(i=0;i<4;i++){x=100+40*i;s+=line(x+20,55,x+40,125,SOFT,1.8,true)}
 for(i=0;i<4;i++){x=100+40*i;s+=line(x,125,x+20,55,INK,2.4)}
 if(o.cur){a=Math.atan2(-70,20);if(o.cur==="down")a+=Math.PI;
  for(i=0;i<4;i++){x=100+40*i;s+=chev(x+10+5*Math.cos(a),90+5*Math.sin(a),a,RED)}}
 if(o.ask)for(i=0;i<4;i++)s+=T(100+40*i+10,96,18,"?","m b","middle");
 if(o.ends)s+=T(62,98,22,o.ends.l,"b","middle")+T(298,98,22,o.ends.r,"b","middle");
 s+=T(180,150,11,"実線＝手前側　点線＝奥側","g","middle");
 var lab="コイルの図。"+(o.ends?"左端が"+o.ends.l+"極、右端が"+o.ends.r+"極。":"")+
  (o.cur?"手前側(実線)の導線の電流は、"+(o.cur==="up"?"上":"下")+"向き。":"")+(o.ask?"手前側の電流の向きが「?」。":"");
 return svgY(160,lab,s)}

/* ---------- 図3：直線の導線と方位磁針。orient＝down(下向き電流・右に磁針) / right(右向き電流・真下に磁針)。ans＝答えを書く ---------- */
function figWire(orient,ans){
 var s,h,lab;
 if(orient==="down"){h=ans?172:150;
  s=arr(110,24,110,142,RED,3.5)+T(124,60,13,"電流","m b")+
   (ans?dotS(230,80,16,BLUE):'<circle cx="230" cy="80" r="16" fill="#fff" stroke="'+INK+'" stroke-width="1.5"/>'+T(230,87,20,"?","b","middle"))+
   T(230,112,12,"方位磁針","g","middle")+(ans?T(230,132,13,"N極は手前向き","v b","middle"):"");
  lab="下向きの電流が流れる導線の図。導線の右側に、方位磁針がある"+(ans?"。N極は手前向きを指す":"")}
 else{h=ans?160:138;
  s=arr(40,40,300,40,RED,3.5)+T(60,26,13,"電流","m b")+
   (ans?crossS(170,100,16,BLUE):'<circle cx="170" cy="100" r="16" fill="#fff" stroke="'+INK+'" stroke-width="1.5"/>'+T(170,107,20,"?","b","middle"))+
   T(170,132,12,"方位磁針","g","middle")+(ans?T(170,152,13,"N極は奥向き","v b","middle"):"");
  lab="右向きの電流が流れる導線の図。導線の真下に、方位磁針がある"+(ans?"。N極は奥向きを指す":"")}
 return svgY(h,lab,s)}

/* ---------- 図4：磁石の間の導線(断面)。cur＝toward/away、fld＝right/left、force＝up/down(なければ「力は?」) ---------- */
function figFl(o){
 var s='',L=o.fld==="right"?"N":"S",R=o.fld==="right"?"S":"N";
 function mg(x,t){return '<rect x="'+x+'" y="20" width="50" height="150" fill="'+(t==="N"?"#fff":SIDE)+'" stroke="'+INK+'" stroke-width="1.5"/>'+TN(x+25,103,22,t,"b","middle")}
 s+=mg(10,L)+mg(280,R);
 [34,156].forEach(function(y){s+=o.fld==="right"?arr(80,y,260,y,BLUE,2):arr(260,y,80,y,BLUE,2)});
 s+=T(170,26,12,"磁界","v b","middle")+
  (o.cur==="toward"?dotS(170,95,13,RED):crossS(170,95,13,RED))+
  T(150,92,12,"電流","m b","end")+T(150,106,10.5,o.cur==="toward"?"(手前向き)":"(奥向き)","g","end");
 if(o.force==="up")s+=arr(170,78,170,46,INK,3)+T(184,66,14,"力","b");
 else if(o.force==="down")s+=arr(170,112,170,144,INK,3)+T(184,134,14,"力","b");
 else s+=T(190,100,14,"力は?","b");
 var lab="磁石のN極とS極の間に、導線の断面がある図。左が"+L+"極、右が"+R+"極で、磁界は"+(o.fld==="right"?"右":"左")+"向き。電流は"+(o.cur==="toward"?"手前":"奥")+"向き。"+(o.force?"力は"+(o.force==="up"?"上":"下")+"向き":"力の向きが「?」");
 return svgY(190,lab,s)}

/* ---------- 図5：小さな図を並べる。list＝[{t,cur,fld,force}] ---------- */
function figMini(list,gap){
 var w=80,tot=list.length*w+(list.length-1)*gap,x0=(340-tot)/2,s='',lab=[];
 list.forEach(function(p,i){var x=x0+i*(w+gap),cx=x+w/2;
  s+='<rect x="'+n(x)+'" y="22" width="'+w+'" height="154" rx="6" fill="none" stroke="'+RULE+'" stroke-width="1.2"/>'+T(cx,14,11.5,p.t,"b","middle")+
   (p.fld==="right"?arr(cx-26,52,cx+26,52,BLUE,2):arr(cx+26,52,cx-26,52,BLUE,2))+
   (p.cur==="toward"?dotS(cx,98,11,RED):crossS(cx,98,11,RED))+
   (p.force==="up"?arr(cx,84,cx,64,INK,2.5)+T(cx+10,78,12,"力","b"):arr(cx,112,cx,140,INK,2.5)+T(cx+10,132,12,"力","b"));
  lab.push(p.t+"は、電流が"+(p.cur==="toward"?"手前":"奥")+"向き、磁界が"+(p.fld==="right"?"右":"左")+"向き、力は"+(p.force==="up"?"上":"下")+"向き")});
 s+=T(170,196,11.5,'<tspan class="m b">電流</tspan>　<tspan class="v b">磁界</tspan>　<tspan class="b">力</tspan>',null,"middle");
 return svgY(204,"電流・磁界・力の向きの小さな図が並ぶ。"+lab.join("。"),s)}

/* ---------- 図6：電磁誘導。list＝[{t,mv(in/out/stop),pole(N/S),deg(針の角度。nullで「?」),cap}]。磁石は、pole の極を、コイルに向ける ---------- */
function figInd(list){
 var s='',lab=[];
 list.forEach(function(p,i){var x0=2+113*i,cx=x0+84,cy=118,mx=p.mv==="stop"?x0+48:x0+2,k,xs=[58,70.5,83,95.5,108],ys=[64,40,64,40,64],pts='';
  s+=T(x0+56,16,13,p.t,"g b","middle");
  for(k=0;k<5;k++)pts+=n(x0+xs[k])+','+ys[k]+' ';
  s+='<polyline points="'+pts+'" fill="none" stroke="'+INK+'" stroke-width="2" stroke-linejoin="round"/>'+
   '<path d="M'+n(x0+58)+',64 V'+cy+' H'+n(x0+68)+' M'+n(x0+108)+',64 V'+cy+' H'+n(x0+100)+'" fill="none" stroke="'+INK+'" stroke-width="2"/>';
  var a=p.pole==="N"?["S","N"]:["N","S"];
  [0,1].forEach(function(j){s+='<rect x="'+(mx+20*j)+'" y="44" width="20" height="16" fill="'+(a[j]==="N"?"#fff":SIDE)+'" stroke="'+INK+'" stroke-width="1.2"/>'+TN(mx+20*j+10,56,11,a[j],"b","middle")});
  if(p.mv==="in")s+=arr(x0+8,30,x0+40,30,INK,2);
  if(p.mv==="out")s+=arr(x0+40,30,x0+8,30,INK,2);
  s+='<circle cx="'+cx+'" cy="'+cy+'" r="16" fill="#fff" stroke="'+INK+'" stroke-width="1.5"/>'+line(cx,103,cx,107,GRAY,1);
  if(p.deg==null)s+=TN(cx,126,18,"?","b","middle");
  else{var r=p.deg*Math.PI/180;s+=line(cx,125,cx+11*Math.sin(r),125-11*Math.cos(r),INK,2)+'<circle cx="'+cx+'" cy="125" r="2" fill="'+INK+'"/>'}
  s+=T(x0+56,148,11.5,p.cap,"b","middle");
  lab.push(p.t+"：磁石は"+p.pole+"極をコイルに向けている。"+p.cap)});
 return svgY(158,"磁石とコイルと検流計の図が並ぶ。"+lab.join("。"),s)}

/* ---------- 文章 ---------- */
var M=function(t){return '<span class="m">'+t+'</span>'},V=function(t){return '<span class="v">'+t+'</span>'};
var SM='<p class="note" style="font-size:.8rem;margin:.2rem 0">';
var HD='font-size:1.05rem;font-weight:700;line-height:1.5;margin:1.8rem 0 .3rem;padding-bottom:.2rem;border-bottom:1px solid #c9d0d7';
function hd(x,first){return '<h3 style="'+HD+(first?';margin-top:.9rem':'')+'">'+x+'</h3>'}
var TIGHT='<style>.pick .pk-bt{gap:.4rem}.pick button.choice{padding:.1rem .55rem;min-width:2.6rem}</style>';
var DIR4=["上","下","手前","奥"];

var POINT=hd('右ネジの法則',true)+
 '<p>導線に'+M('電流')+'が流れると、まわりに'+V('磁界')+'ができます。磁界は同心円状で、方位磁針のN極は、磁界の向きを指します。</p>'+figStraight()+
 '<p>右手の親指を'+M('電流')+'の向きに合わせると、ほかの4本の指が'+V('磁界')+'の向きです。</p>'+
 '<p>コイルでは、4本の指を'+M('電流')+'の向きに合わせると、親指が向いた側の端が<b>N極</b>です。</p>'+figCoil({cur:"down",ends:{l:"S",r:"N"}})+
 SM+'※ 直線の導線は、親指が電流の向き。コイルは、親指がN極(磁界の向き)です。</p>'+
 hd('フレミングの左手の法則')+
 '<p>磁界の中の導線に'+M('電流')+'を流すと、導線に<b>力</b>が働きます。</p>'+figFl({cur:"away",fld:"right",force:"down"})+
 '<p>左手の中指＝'+M('電流')+'、人差し指＝'+V('磁界')+'、親指＝力の向きです。</p>'+
 '<p>'+M('電流')+'か'+V('磁界')+'の、どちらか一方を逆にすると、力も逆になります。両方を逆にすると、力は同じ向きです。</p>'+
 figMini([{t:"もとの向き",cur:"away",fld:"right",force:"down"},{t:"電流を逆",cur:"toward",fld:"right",force:"up"},{t:"磁界を逆",cur:"away",fld:"left",force:"up"},{t:"両方逆",cur:"toward",fld:"left",force:"down"}],5)+
 SM+'※ この力で回るのが、<b>モーター</b>です。</p>'+
 hd('電磁誘導')+
 '<p>コイルの中で磁石を動かすと、コイルに<b>誘導電流</b>が流れます。流れるのは、動かしている間だけです。</p>'+
 figInd([{t:"近づける",mv:"in",pole:"N",deg:-40,cap:"針は左に振れる"},{t:"止める",mv:"stop",pole:"N",deg:0,cap:"針は振れない"},{t:"遠ざける",mv:"out",pole:"N",deg:40,cap:"針は右に振れる"}])+
 '<p>近づける・遠ざける、N極・S極の、どれか1つを逆にすると、電流の向きは逆になります。</p>'+
 SM+'※ この原理を使うのが、<b>発電機</b>です。</p>';

var QBODY=TIGHT+'<p>(1) 下向きの電流が流れる導線の、右側に方位磁針を置いた。</p>'+figWire("down",false)+
 '<p>(2) 右向きの電流が流れる導線の、真下に方位磁針を置いた。</p>'+figWire("right",false)+
 '<p>(3) 電流を流すと、コイルの左端がN極になった。</p>'+figCoil({ends:{l:"N",r:"S"},ask:true});

var ANS='<p>右手の親指で、向きを決めます。</p>'+figWire("down",true)+
 '<p>(1) 親指＝電流(下向き)。右側の磁界は<b>手前向き</b>。N極は磁界の向きを指す。</p>'+figWire("right",true)+
 '<p>(2) 親指＝電流(右向き)。真下の磁界は<b>奥向き</b>。</p>'+figCoil({cur:"up",ends:{l:"N",r:"S"}})+
 '<p>(3) 親指＝N極(左)。4本の指が電流の向き。手前側は<b>上向き</b>。</p>';

var SBODY=TIGHT+'<p>(1)〜(3) 磁石の間に導線を置いて、電流を流す。図は、電流が手前向き、磁界が右向きのようすである。</p>'+figFl({cur:"toward",fld:"right",force:null})+
 '<p>(4)(5) コイルに磁石を出し入れして、検流計の針の動きを調べた。S極を近づけると、針は右に振れた。</p>'+
 figInd([{t:"近づける",mv:"in",pole:"S",deg:40,cap:"針は右に振れた"},{t:"遠ざける",mv:"out",pole:"S",deg:null,cap:"針は?"},{t:"止める",mv:"stop",pole:"S",deg:null,cap:"針は?"}]);

var SOL2=figMini([{t:"(1)",cur:"toward",fld:"right",force:"up"},{t:"(2)",cur:"away",fld:"right",force:"down"},{t:"(3)",cur:"away",fld:"left",force:"up"}],14)+
 '<p>(1) 中指＝'+M('電流')+'(手前)、人差し指＝'+V('磁界')+'(右)。親指＝<b>上向き</b></p>'+
 '<p>(2) 電流だけ逆にすると、力も逆。<b>下向き</b></p>'+
 '<p>(3) 電流と磁界を両方逆にすると、力は同じ。<b>上向き</b></p>'+
 figInd([{t:"近づける",mv:"in",pole:"S",deg:40,cap:"針は右に振れた"},{t:"遠ざける",mv:"out",pole:"S",deg:-40,cap:"針は左に振れる"},{t:"止める",mv:"stop",pole:"S",deg:0,cap:"針は振れない"}])+
 '<p>(4) 近づけるときと、向きが逆。<b>左に振れる</b></p>'+
 '<p>(5) 磁石が止まると、誘導電流は流れない。<b>振れない</b></p>';

var GRD='display:grid;grid-template-columns:max-content 1fr;column-gap:.8rem;row-gap:.9rem;align-items:baseline;margin:.8rem 0';
var SUM='<div style="'+GRD+'">'+
 '<b>右ネジ</b><span>'+M('電気')+' → '+V('磁界')+'をつくる</span>'+
 '<b>フレミング左手</b><span>'+M('電気')+' ＋ '+V('磁界')+' → 力が働く(モーター)</span>'+
 '<b>電磁誘導</b><span><b>動き</b> → '+M('電気')+'をつくる(発電機)</span></div>';

window.UNIT={
no:"2-18",title:"電流と磁界",
sections:[
{type:"text",point:true,title:"厳選ポイント",html:POINT},
{type:"problem",title:"問題",body:QBODY,
 parts:[
  {label:"(1)",text:"方位磁針のN極が指す向き",type:"pick",choices:DIR4,accept:["手前"]},
  {label:"(2)",text:"方位磁針のN極が指す向き",type:"pick",choices:DIR4,accept:["奥"]},
  {label:"(3)",text:"手前側の導線の、電流の向き",type:"pick",choices:["上","下","右","左"],accept:["上"]}
 ]},
{type:"answer",html:ANS},
{type:"problem",title:"補充問題",body:SBODY,
 parts:[
  {label:"(1)",text:"導線が受ける力の向き",type:"pick",choices:DIR4,accept:["上"]},
  {label:"(2)",text:"電流の向きだけを逆にしたときの、力の向き",type:"pick",choices:DIR4,accept:["下"]},
  {label:"(3)",text:"電流と磁界の向きを両方逆にしたときの、力の向き",type:"pick",choices:DIR4,accept:["上"]},
  {label:"(4)",text:"S極を遠ざけたときの、針の動き",type:"pick",choices:["右に振れる","左に振れる","振れない"],accept:["左に振れる"]},
  {label:"(5)",text:"S極をコイルの中で止めたときの、針の動き",type:"pick",choices:["右に振れる","左に振れる","振れない"],accept:["振れない"]}
 ],
 solution:SOL2},
{type:"text",title:"まとめ",html:SUM}
]};
})();

