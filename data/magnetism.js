(function(){
var INK="#26303b",BLUE="#1f5fa8",RED="#c2410c",GRAY="#8a949f",RULE="#c9d0d7",SOFT="#9aa5b1",SIDE="#cfd5db",HAND="#efe6dc";
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
/* 立体の見せ方：奥行き(手前向き)を、左下の斜めで表す。手前向き＝(-0.6,+0.45)の向き */
var DX=-0.6,DY=0.45;
function tube(d,w){return '<path d="'+d+'" fill="none" stroke="'+INK+'" stroke-width="'+(w+3)+'" stroke-linecap="round" stroke-linejoin="round"/><path d="'+d+'" fill="none" stroke="'+HAND+'" stroke-width="'+w+'" stroke-linecap="round" stroke-linejoin="round"/>'}
function palm(x,y,w,h){return '<rect x="'+x+'" y="'+y+'" width="'+w+'" height="'+h+'" rx="16" fill="'+HAND+'" stroke="'+INK+'" stroke-width="1.5"/>'}
function runs(a,k,w,dash){return a.map(function(r){return '<polyline points="'+r.map(function(p){return n(p[0])+','+n(p[1])}).join(' ')+'" fill="none" stroke="'+k+'" stroke-width="'+w+'" stroke-linecap="round" stroke-linejoin="round"'+(dash?' stroke-dasharray="4 3"':'')+'/>' }).join('')}
/* コイル(らせん)：手前側(front)と奥側(back)に分ける。軸は横。巻き始めは、下のはし */
function helix(xs,cy,R,pitch,turns){
 var N=turns*60,back=[],front=[],cur=[],side=null,i,ph,z,sx,sy,f;
 for(i=0;i<=N;i++){ph=-Math.PI/2+2*Math.PI*turns*i/N;z=Math.cos(ph);
  sx=xs+pitch*(ph+Math.PI/2)/(2*Math.PI)+DX*R*z;sy=cy-R*Math.sin(ph)+DY*R*z;f=z>=0;
  if(side===null)side=f;
  if(f!==side){cur.push([sx,sy]);(side?front:back).push(cur);cur=[[sx,sy]];side=f}else cur.push([sx,sy])}
 (side?front:back).push(cur);return {back:back,front:front}}

/* ---------- 図1：直線の導線の立体図。同心円状の磁界(楕円の矢印)と、方位磁針 ---------- */
function P3(x,y,z){return [170+x+DX*z,112-y+DY*z]}
function ell(r,t0,t1){var s='',t,k=0,K=.32;for(t=t0;t<=t1+.001;t+=Math.PI/18){s+=(k++?'L':'M')+n(170+r*Math.cos(t))+','+n(112-K*r*Math.sin(t))}return '<path d="'+s+'" fill="none" stroke="'+BLUE+'" stroke-width="1.5"/>'}
function figStraight(){
 var s='',R2=[44,74],K=.32,cx=96,cy=112;
 /* 左側(導線と磁界)：全体を左へ34ずらして、右に手の場所をあける */
 s+='<g transform="translate(-34,0)">';
 /* 奥側の半円(導線の後ろ) */
 R2.forEach(function(r){s+=ell(r,0,Math.PI)});
 s+=arr(170,182,170,24,RED,3.5);
 /* 手前側の半円と、磁界の向きの矢じるし：右斜め奥(右上45°)と、左斜め手前(左下45°)。向きは、円の接線 */
 R2.forEach(function(r){
  s+=ell(r,Math.PI,2*Math.PI);
  [Math.PI/4,5*Math.PI/4].forEach(function(t){
   s+=chev(170+r*Math.cos(t),112-K*r*Math.sin(t),Math.atan2(-K*Math.cos(t),-Math.sin(t)),BLUE)})});
 /* 方位磁針：外側の円の左はしに接する。針は、そこでの接線の向き(真下)。N極は下 */
 s+='<ellipse cx="'+cx+'" cy="'+cy+'" rx="17" ry="9.5" fill="#fff" stroke="'+GRAY+'" stroke-width="1.2"/>'+
  line(cx,cy,cx,cy-8,SIDE,4)+arr(cx,cy,cx,cy+34,BLUE,3)+
  T(cx,cy+34+14,13,"N","v b","middle")+T(64,94,11.5,"方位磁針","g","middle")+
  T(184,40,13,"電流","m b")+T(252,86,13,"磁界","v b");
 s+='</g>';
 /* 右側：手のひら側から見た手の画像(ChatGPTソロ作)。親指＝電流の向き(上)、4本の指＝導線をにぎる向き */
 s+='<image href="data:image/png;base64,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" x="238" y="58" width="100" height="102"/>';
 s+=arr(288,54,288,22,RED,3)+T(302,72,11.5,"親指","g b")+T(288,176,11.5,"4本の指","g b","middle");
 return svgY(196,"直線の導線と右手の図。左側は、導線の立体図。導線を上向きに電流が流れる(赤い矢印)。導線を中心に、導線に垂直な水平の円状の磁界が巻き、上から見て反時計まわり(青い横長の楕円)。2つの輪それぞれに、右斜め奥と左斜め手前に、磁界の向きの矢じるしがある。導線の左側に方位磁針があり、針は円の接線の向きの真下を指し、下の先がN極。右側は、手のひら側から見た手で、親指を上向き(電流の向き)に立て、ほかの4本の指で導線をにぎる。親指の上に、電流の赤い矢印がある",s)}


/* ---------- 図2：右手(親指＝電流の向き、ほかの指＝磁界の向き) ---------- */
function figHandR(){
  /* 導線と電流(赤)。手は、この上に重ねる */
  var s = arr(178, 172, 178, 10, RED, 3.5);
  /* そで口(アイコンの左下の四角) */
  s += '<rect x="84" y="98" width="20" height="64" rx="4" fill="' + INK + '"/>';
  /* 手：親指を上に立て、4本の指を右側にそろえてにぎる(親指立てのアイコンが土台) */
  s += '<path d="M102,106 L124,86 C132,72 134,50 138,34 C141,22 158,20 160,34 C161,50 158,66 156,84 H186 Q200,84 200,96 Q206,98 206,104 Q206,112 198,113 Q208,115 208,123 Q208,131 198,132 Q208,134 207,142 Q206,150 196,151 Q198,164 186,164 H128 Q102,164 102,140 Z" fill="' + HAND + '" stroke="' + INK + '" stroke-width="2" stroke-linejoin="round"/>' + '<path d="M172,113 H196 M172,132 H197 M172,151 H195" fill="none" stroke="' + INK + '" stroke-width="1.5" stroke-linecap="round"/>';
  /* 4本の指の向き＝磁界(青)。導線の手前を、左から右へ */
  s += arr(140, 184, 230, 184, BLUE, 2) + T(185, 200, 12, "磁界", "v b", "middle") + T(190, 26, 13, "電流", "m b") + T(128, 44, 11.5, "親指", "g b", "end") + T(218, 136, 11.5, "4本の指", "g b");
  return svgY(206, "右手の図。導線を上向きの電流が流れる(赤い矢印)。右手の親指を立てて、電流と同じ上向きにし、ほかの4本の指で導線をにぎる。4本の指は、導線の手前を左から右へ向かう。この指の向きが磁界(青い矢印)の向き", s);
}

/* ---------- 図3：コイル。o.cur＝手前側の電流(up/down)、o.ends＝{l,r}のN・S、o.ask＝手前側に「?」 ---------- */
function figCoil(o){
 var R=34,pitch=30,turns=4,xs=105,cy=85,h=helix(xs,cy,R,pitch,turns),s='',i,a,sx,sy;
 s+=line(62,cy+R,xs,cy+R,INK,2)+line(xs+turns*pitch,cy+R,298,cy+R,INK,2)+runs(h.back,SOFT,1.8,true)+runs(h.front,INK,2.4);
 for(i=0;i<turns;i++){sx=xs+pitch*(i+.25)+DX*R;sy=cy+DY*R;
  if(o.cur){a=Math.atan2(-R,pitch/(2*Math.PI));if(o.cur==="down")a+=Math.PI;s+=chev(sx+5*Math.cos(a),sy+5*Math.sin(a),a,RED)}
  if(o.ask)s+=T(sx+12,sy+6,18,"?","m b","middle")}
 if(o.ends)s+=T(58,cy+6,22,o.ends.l,"b","middle")+T(290,cy+6,22,o.ends.r,"b","middle");
 s+=T(180,150,11,"実線＝手前側　点線＝奥側","g","middle");
 var lab="コイルの立体図。導線が何回も巻かれている。"+(o.ends?"左端が"+o.ends.l+"極、右端が"+o.ends.r+"極。":"")+
  (o.cur?"手前側(実線)の導線の電流は、"+(o.cur==="up"?"上":"下")+"向き。":"")+(o.ask?"手前側の電流の向きが「?」。":"");
 return svgY(160,lab,s)}

/* ---------- 図4：直線の導線と方位磁針。orient＝down(下向き電流・右に磁針) / right(右向き電流・真下に磁針)。ans＝答えを書く ---------- */
function disc(cx,cy,ask,dir,lab){
 var s='<ellipse cx="'+cx+'" cy="'+cy+'" rx="20" ry="11" fill="#fff" stroke="'+INK+'" stroke-width="1.5"/>';
 if(ask)return s+T(cx,cy+6,18,"?","b","middle");
 var k=dir==="toward"?1:-1;
 return s+line(cx,cy,cx-k*DX*14,cy-k*DY*14,SIDE,4)+arr(cx,cy,cx+k*DX*38,cy+k*DY*38,BLUE,3)}
function figWire(orient,ans){
 var s,h,lab;
 if(orient==="down"){h=ans?170:150;
  s=arr(100,20,100,150,RED,3.5)+T(114,56,13,"電流","m b")+disc(230,92,!ans,"toward")+
   (ans?T(203,126,13,"N","v b","end"):"")+T(236,136,12,"方位磁針","g","middle")+(ans?T(236,160,13,"N極は手前向き","v b","middle"):"");
  lab="下向きの電流が流れる導線の立体図。導線の右側に、方位磁針がある"+(ans?"。N極は、手前(左下の斜め)向きを指す":"")}
 else{h=ans?176:152;
  s=arr(40,40,300,40,RED,3.5)+T(60,26,13,"電流","m b")+disc(170,110,!ans,"away")+
   (ans?T(200,92,13,"N","v b"):"")+T(170,140,12,"方位磁針","g","middle")+(ans?T(170,164,13,"N極は奥向き","v b","middle"):"");
  lab="右向きの電流が流れる導線の立体図。導線の真下に、方位磁針がある"+(ans?"。N極は、奥(右上の斜め)向きを指す":"")}
 return svgY(h,lab,s)}

/* ---------- 図5：磁石の間の導線。cur＝toward/away、fld＝right/left、force＝up/down(なければ「力は?」) ---------- */
function figFl(o){
 var s='',L=o.fld==="right"?"N":"S",R=o.fld==="right"?"S":"N";
 function mg(x,t){return '<rect x="'+x+'" y="20" width="50" height="150" fill="'+(t==="N"?"#fff":SIDE)+'" stroke="'+INK+'" stroke-width="1.5"/>'+TN(x+25,103,22,t,"b","middle")}
 s+=mg(10,L)+mg(280,R);
 [34,156].forEach(function(y){s+=o.fld==="right"?arr(80,y,260,y,BLUE,2):arr(260,y,80,y,BLUE,2)});
 s+=T(170,26,12,"磁界","v b","middle")+
  (o.cur==="toward"?arr(200,73,140,117,RED,3.5):arr(140,117,200,73,RED,3.5))+
  T(128,92,12,"電流","m b","end")+T(128,106,10.5,o.cur==="toward"?"(手前向き)":"(奥向き)","g","end");
 if(o.force==="up")s+=arr(170,92,170,46,INK,3)+T(184,62,14,"力","b");
 else if(o.force==="down")s+=arr(170,98,170,146,INK,3)+T(184,136,14,"力","b");
 else s+=T(212,104,14,"力は?","b");
 var lab="磁石のN極とS極の間に、導線がある立体図。左が"+L+"極、右が"+R+"極で、磁界は"+(o.fld==="right"?"右":"左")+"向き(青い矢印)。電流は"+(o.cur==="toward"?"手前(左下の斜め)":"奥(右上の斜め)")+"向き(赤い矢印)。"+(o.force?"力は"+(o.force==="up"?"上":"下")+"向き":"力の向きが「?」");
 return svgY(190,lab,s)}

/* ---------- 図6：左手(中指＝電流、人差し指＝磁界、親指＝力) ---------- */
function figHandL(){
 /* 手の輪郭：人差し指は上、中指は右、親指は左下の斜め */
 var s='<path d="M152,60 Q152,48 163,48 Q174,48 174,60 V98 H242 Q252,98 252,108 Q252,118 242,118 H214 V150 Q214,166 198,166 H172 L160,160 L112,176 Q100,180 94,170 Q90,162 98,157 L152,112 Z" fill="'+HAND+'" stroke="'+INK+'" stroke-width="2" stroke-linejoin="round"/>';
 /* 曲げた薬指と小指：重ねて、手のひらの右下に */
 s+='<rect x="186" y="139" width="32" height="18" rx="9" fill="'+HAND+'" stroke="'+INK+'" stroke-width="2"/>'+
  '<rect x="186" y="120" width="34" height="18" rx="9" fill="'+HAND+'" stroke="'+INK+'" stroke-width="2"/>';
 /* 袖口 */
 s+='<rect x="164" y="173" width="44" height="24" rx="4" fill="'+INK+'"/>';
 /* 矢印とラベル：電流＝赤(中指)、磁界＝青(人差し指)、力＝黒(親指) */
 s+=arr(258,108,320,108,RED,3.5)+T(289,94,13,"電流","m b","middle")+T(222,90,11,"中指","g b","middle")+
  arr(163,42,163,8,BLUE,3)+T(178,26,13,"磁界","v b")+T(144,80,11,"人差し指","g b","end")+
  arr(90,178,48,206,INK,3.5)+T(42,198,13,"力","b","end")+T(104,140,11,"親指","g b","end");
 return svgY(210,"左手の図。人差し指を上向き、中指を右向き、親指を手前向き(左下の斜め)に、たがいに直角に開いた左手。薬指と小指は曲げて重ねている。手首には袖口がある。人差し指の先に磁界の青い矢印、中指の先に電流の赤い矢印、親指の先に力の黒い矢印がある",s)}


/* ---------- 図7：向きの関係を、2×2で大きく並べる。list＝[{t,cur,fld,force}] ---------- */
function figMini(list){
 var cw=164,ch=132,gy=10,rows=Math.ceil(list.length/2),s='',lab=[],H=rows*ch+(rows-1)*gy+24;
 list.forEach(function(p,i){var r=Math.floor(i/2),c=i%2,ox=(i===list.length-1&&list.length%2===1)?(340-cw)/2:c*(cw+12),oy=r*(ch+gy),cx=ox+cw/2,cy=oy+84;
  s+='<rect x="'+n(ox)+'" y="'+oy+'" width="'+cw+'" height="'+ch+'" rx="6" fill="none" stroke="'+RULE+'" stroke-width="1.2"/>'+T(cx,oy+17,12,p.t,"b","middle")+
   (p.fld==="right"?arr(cx-54,cy,cx+54,cy,BLUE,2):arr(cx+54,cy,cx-54,cy,BLUE,2))+
   (p.cur==="toward"?arr(cx+28,cy-21,cx-28,cy+21,RED,3):arr(cx-28,cy+21,cx+28,cy-21,RED,3))+
   (p.force==="up"?arr(cx,cy,cx,cy-42,INK,3):arr(cx,cy,cx,cy+42,INK,3));
  lab.push(p.t+"は、電流が"+(p.cur==="toward"?"手前":"奥")+"向き、磁界が"+(p.fld==="right"?"右":"左")+"向き、力は"+(p.force==="up"?"上":"下")+"向き")});
 s+=T(170,H-6,11.5,'<tspan class="m b">電流(斜め)</tspan>　<tspan class="v b">磁界(横)</tspan>　<tspan class="b">力(縦)</tspan>',null,"middle");
 return svgY(H,"電流・磁界・力の向きの立体図が、2列で並ぶ。電流は赤い斜めの矢印、磁界は青い横の矢印、力は黒い縦の矢印。"+lab.join("。"),s)}

/* ---------- 図8：電磁誘導。list＝[{t,mv(in/out/stop),pole(N/S),deg(針の角度。nullで「?」),cap}]。磁石は、pole の極を、コイルに向ける ---------- */
function figInd(list){
 var s='',lab=[];
 list.forEach(function(p,i){var x0=2+113*i,cx=x0+80,cy=118,mx=p.mv==="stop"?x0+44:x0+2,h=helix(x0+58,52,16,9,5),a=p.pole==="N"?["S","N"]:["N","S"];
  s+=T(x0+56,12,13,p.t,"g b","middle")+
   '<path d="M'+(x0+58)+',68 V'+cy+' H'+(x0+65)+' M'+(x0+103)+',68 V'+cy+' H'+(x0+95)+'" fill="none" stroke="'+INK+'" stroke-width="2"/>'+runs(h.back,SOFT,1.5,false);
  [0,1].forEach(function(j){s+='<rect x="'+(mx+20*j)+'" y="44" width="20" height="16" fill="'+(a[j]==="N"?"#fff":SIDE)+'" stroke="'+INK+'" stroke-width="1.2"/>'+TN(mx+20*j+10,56,11,a[j],"b","middle")});
  s+=runs(h.front,INK,1.8,false);
  if(p.mv==="in")s+=arr(x0+8,26,x0+40,26,INK,2);
  if(p.mv==="out")s+=arr(x0+40,26,x0+8,26,INK,2);
  s+='<circle cx="'+cx+'" cy="'+cy+'" r="15" fill="#fff" stroke="'+INK+'" stroke-width="1.5"/>'+line(cx,104,cx,108,GRAY,1);
  if(p.deg==null)s+=TN(cx,125,18,"?","b","middle");
  else{var r=p.deg*Math.PI/180;s+=line(cx,125,cx+11*Math.sin(r),125-11*Math.cos(r),INK,2)+'<circle cx="'+cx+'" cy="125" r="2" fill="'+INK+'"/>'}
  s+=T(x0+56,152,11.5,p.cap,"b","middle");
  lab.push(p.t+"：磁石は"+p.pole+"極をコイルに向けている。"+p.cap)});
 return svgY(160,"磁石と、何回も巻いたコイルと、検流計の図が並ぶ。"+lab.join("。"),s)}

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
 '<p>磁界の中の導線に'+M('電流')+'を流すと、導線に<b>力</b>が働きます。</p>'+figHandL()+
 '<p>左手の中指＝'+M('電流')+'、人差し指＝'+V('磁界')+'、親指＝力の向きです。</p>'+
 '<p>'+M('電流')+'か'+V('磁界')+'の、どちらか一方を逆にすると、力も逆になります。両方を逆にすると、力は同じ向きです。</p>'+
 figMini([{t:"もとの向き",cur:"away",fld:"right",force:"down"},{t:"電流を逆",cur:"toward",fld:"right",force:"up"},{t:"磁界を逆",cur:"away",fld:"left",force:"up"},{t:"両方逆",cur:"toward",fld:"left",force:"down"}])+
 SM+'※ この力で回るのが、<b>モーター</b>です。</p>'+
 hd('電磁誘導')+
 '<p>コイルの中で磁石を動かすと、コイルに<b>誘導電流</b>が流れます。流れるのは、動かしている間だけです。</p>'+
 figInd([{t:"近づける",mv:"in",pole:"N",deg:-40,cap:"針は左に振れる"},{t:"止める",mv:"stop",pole:"N",deg:0,cap:"針は振れない"},{t:"遠ざける",mv:"out",pole:"N",deg:40,cap:"針は右に振れる"}])+
 '<p>近づける・遠ざける、N極・S極の、どれか1つを逆にすると、電流の向きは逆になります。</p>'+
 SM+'※ この原理を使うのが、<b>発電機</b>です。</p>';

var QBODY=TIGHT+'<p>(1) 下向きの電流が流れる導線の、右側に方位磁針を置いた。</p>'+figWire("down",false)+
 '<p>(2) 右向きの電流が流れる導線の、真下に方位磁針を置いた。</p>'+figWire("right",false)+
 '<p>(3) 電流を流すと、コイルの左端がN極になった。</p>'+figCoil({ends:{l:"N",r:"S"},ask:true});

var ANS='<p>右手の親指で、向きを決めます。</p>'+
 '<p>(1) 親指＝電流(下向き)。右側の磁界は<b>手前向き</b>。N極は磁界の向きを指す。</p>'+
 '<p>(2) 親指＝電流(右向き)。真下の磁界は<b>奥向き</b>。</p>'+figCoil({cur:"up",ends:{l:"N",r:"S"}})+
 '<p>(3) 親指＝N極(左)。4本の指が電流の向き。手前側は<b>上向き</b>。</p>';

var SBODY=TIGHT+'<p>(1)〜(3) 磁石の間に導線を置いて、電流を流す。図は、電流が手前向き、磁界が右向きのようすである。</p>'+figFl({cur:"toward",fld:"right",force:null})+
 '<p>(4)(5) コイルに磁石を出し入れして、検流計の針の動きを調べた。S極を近づけると、針は右に振れた。</p>'+
 figInd([{t:"近づける",mv:"in",pole:"S",deg:40,cap:"針は右に振れた"},{t:"遠ざける",mv:"out",pole:"S",deg:null,cap:"針は?"},{t:"止める",mv:"stop",pole:"S",deg:null,cap:"針は?"}]);

var SOL2=figMini([{t:"(1)",cur:"toward",fld:"right",force:"up"},{t:"(2)",cur:"away",fld:"right",force:"down"},{t:"(3)",cur:"away",fld:"left",force:"up"}])+
 '<p>(1) 中指＝'+M('電流')+'(手前)、人差し指＝'+V('磁界')+'(右)。親指＝<b>上向き</b></p>'+
 '<p>(2) 電流だけ逆にすると、力も逆。<b>下向き</b></p>'+
 '<p>(3) 電流と磁界を両方逆にすると、力は同じ。<b>上向き</b></p>'+
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

