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
 /* 右側：右手を、向こう側から見た図(親指立てのアイコンの左右反転)。親指＝電流の向き(上)、4本の指＝導線をにぎる向き */
 s+='<g transform="translate(254,60) scale(.85)">'+
  '<path d="M78,64 C66,62 54,50 49,30 C47,16 49,6 40,6 C32,6 30,14 30,24 C30,36 28,44 24,52 C14,52 4,58 6,66 C0,68 0,76 7,78 C2,82 3,90 9,91 C8,100 18,104 28,104 C50,108 64,108 78,108 Z" fill="'+HAND+'" stroke="'+INK+'" stroke-width="2.2" stroke-linejoin="round"/>'+
  '<path d="M8,66 H22 M9,79 H22 M12,91 H24" fill="none" stroke="'+INK+'" stroke-width="1.8" stroke-linecap="round"/>'+
  '<rect x="78" y="62" width="18" height="48" rx="3" fill="'+INK+'"/><circle cx="87" cy="100" r="2.6" fill="'+HAND+'"/></g>';
 s+=arr(288,56,288,22,RED,3)+T(302,72,11.5,"親指","g b")+T(295,168,11.5,"4本の指","g b","middle");
 return svgY(196,"直線の導線と右手の図。左側は、導線の立体図。導線を上向きに電流が流れる(赤い矢印)。導線を中心に、導線に垂直な水平の円状の磁界が巻き、上から見て反時計まわり(青い横長の楕円)。2つの輪それぞれに、右斜め奥と左斜め手前に、磁界の向きの矢じるしがある。導線の左側に方位磁針があり、針は円の接線の向きの真下を指し、下の先がN極。右側は、向こう側から見た右手で、親指を上向き(電流の向き)に立て、ほかの4本の指で導線をにぎる。親指の上に、電流の赤い矢印がある",s)}


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

