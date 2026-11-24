(function(){
var INK="#26303b",BLUE="#1f5fa8",RED="#c2410c",GRAY="#8a949f",FILL="#eceff2";
function n(v){return Math.round(v*10)/10}
function T(x,y,size,txt,cls,anchor){return '<text x="'+n(x)+'" y="'+n(y)+'" font-size="'+size+'"'+(anchor?' text-anchor="'+anchor+'"':'')+(cls?' class="'+cls+'"':'')+'>'+txt+'</text>'}
function TN(x,y,size,txt,cls,anchor){return '<text x="'+n(x)+'" y="'+n(y)+'" font-size="'+size+'" style="stroke:none"'+(anchor?' text-anchor="'+anchor+'"':'')+(cls?' class="'+cls+'"':'')+'>'+txt+'</text>'}
function line(x1,y1,x2,y2,k,w,dash){return '<line x1="'+n(x1)+'" y1="'+n(y1)+'" x2="'+n(x2)+'" y2="'+n(y2)+'" stroke="'+k+'" stroke-width="'+(w||1)+'"'+(dash?' stroke-dasharray="4 3"':'')+'/>'}
function svgY(y0,h,label,body){return '<div class="fig"><svg viewBox="0 '+y0+' 340 '+h+'" role="img" aria-label="'+label+'">'+body+'</svg></div>'}
/* 先は(x2,y2)。頭は「く」の字 */
function arr(x1,y1,x2,y2,k,w,dash){var a=Math.atan2(y2-y1,x2-x1);k=k||INK;w=w||1.5;
 function p(t){return n(x2-7*Math.cos(a+t))+','+n(y2-7*Math.sin(a+t))}
 return line(x1,y1,x2,y2,k,w,dash)+'<path d="M'+p(.5)+' L'+n(x2)+','+n(y2)+' L'+p(-.5)+'" fill="none" stroke="'+k+'" stroke-width="'+w+'" stroke-linecap="round" stroke-linejoin="round"/>'}
/* 空欄(点線の枠) */
function box(id,cx,cy,w,h,fs){
 return '<g class="bl" data-b="'+id+'"><rect x="'+n(cx-w/2)+'" y="'+n(cy-h/2)+'" width="'+w+'" height="'+h+'" rx="4"/>'+
  '<text class="bt" x="'+n(cx)+'" y="'+n(cy+fs*.36)+'" font-size="'+fs+'" text-anchor="middle"></text>'+
  '<text class="bm" x="'+n(cx+w/2-2)+'" y="'+n(cy-h/2+10)+'" font-size="12" text-anchor="end"></text></g>'}
function node(mode,id,cx,cy,w,h,fs,txt,cls){
 if(mode==="blank")return box(id,cx,cy,w,h,fs);
 return '<rect x="'+n(cx-w/2)+'" y="'+n(cy-h/2)+'" width="'+w+'" height="'+h+'" rx="4" fill="#fff" stroke="'+GRAY+'" stroke-width="1.2"/>'+TN(cx,cy+fs*.36,fs,txt,cls,"middle")}
function lab(mode,id,cx,cy,w,txt){return mode==="blank"?box(id,cx,cy,w,22,13):T(cx,cy+5,13,txt,"b","middle")}

/* ---------- 神経の図：左＝感覚器官・運動器官、まん中＝末梢神経(点線の枠)、右＝中枢神経(灰色の面)
   青＝感覚(刺激が入る道すじ)、赤＝運動(命令が出る道すじ)
   mode＝"point"(名前を書く)、"blank"(問題：空欄8個)、"reflex"(反射：大脳を通らない近道) ---------- */
function nerve(mode){
 var b=mode==="blank",rf=mode==="reflex",s='',lb;
 s+='<rect x="232" y="44" width="98" height="186" rx="8" fill="'+FILL+'"/>'+
  '<rect x="102" y="44" width="80" height="186" rx="8" fill="none" stroke="'+GRAY+'" stroke-width="1.2" stroke-dasharray="4 3"/>';
 if(!rf)s+=lab(mode,"a7",281,28,78,"中枢神経")+lab(mode,"a8",142,28,78,"末梢神経");
 s+=T(42,100,13,"刺激","v b","middle")+arr(42,108,42,126,BLUE)+
  node(mode,"a1",42,140,68,26,12,"感覚器官","v b")+arr(78,140,108,140,BLUE)+
  node(mode,"a2",142,140,64,26,13,"感覚神経","v b")+arr(176,140,248,140,BLUE)+
  node(mode,"a3",285,170,70,100,14,"脊髄","b")+
  node(mode,"a4",285,72,60,26,13,"大脳","b")+
  node(mode,"a5",142,200,64,26,13,"運動神経","m b")+
  node(mode,"a6",42,200,68,26,12,"運動器官","m b")+
  arr(250,200,176,200,RED)+arr(108,200,78,200,RED)+arr(42,213,42,232,RED)+T(42,252,13,"反応","m b","middle");
 if(rf){
  s+=arr(273,120,273,87,BLUE,1.5,true)+
   line(250,140,262,140,BLUE,3)+line(262,140,262,170,BLUE,3)+line(262,170,262,200,RED,3)+line(262,200,250,200,RED,3)}
 else s+=arr(273,120,273,87,BLUE)+arr(297,87,297,118,RED);
 lb="神経の図。左に感覚器官と運動器官、まん中に感覚神経と運動神経を囲む点線の枠(末梢神経)、右に大脳と脊髄を囲む灰色の面(中枢神経)。青い矢印は刺激が入る道すじ、赤い矢印は命令が出る道すじ。";
 if(rf)return svgY(38,224,lb+"反射の図。刺激は、感覚器官から感覚神経を通って脊髄に入り、脊髄の中で折り返して、運動神経から運動器官へ、反応として出る。大脳は通らない。青い点線は、同時に大脳へ伝わる信号",s);
 return svgY(0,262,lb+(b?"名前は、感覚器官、感覚神経、脊髄、大脳、運動神経、運動器官、中枢神経、末梢神経の8つとも空欄。刺激から、感覚器官、感覚神経、脊髄、大脳と進み、大脳から脊髄にもどって、運動神経、運動器官、反応と進む":"刺激は、感覚器官、感覚神経、脊髄、大脳と進む。大脳から、脊髄にもどって、運動神経、運動器官、反応と進む"),s)}

/* ---------- 補充の図：10人の輪。矢印は、信号が伝わる向き ---------- */
function ring(ans){
 var cx=170,cy=106,R=78,P=[],i,s='',a,u,v,dx,dy,l;
 for(i=0;i<10;i++){a=(-90+36*i)*Math.PI/180;P.push([cx+R*Math.cos(a),cy+R*Math.sin(a)])}
 for(i=0;i<10;i++){u=P[i];v=P[(i+1)%10];dx=v[0]-u[0];dy=v[1]-u[1];l=Math.hypot(dx,dy);
  s+=arr(u[0]+14*dx/l,u[1]+14*dy/l,v[0]-14*dx/l,v[1]-14*dy/l,INK,1.5)}
 for(i=0;i<10;i++)s+='<circle cx="'+n(P[i][0])+'" cy="'+n(P[i][1])+'" r="12" fill="'+(i?"#fff":FILL)+'" stroke="'+INK+'" stroke-width="1.2"/>'+TN(P[i][0],P[i][1]+5,13,i+1,"b","middle");
 if(ans)s+=T(cx,90,14,"一周 2.5秒","b","middle")+T(cx,111,13,"÷10人","g","middle")+T(cx,132,12,"1人あたり","g","middle")+T(cx,157,22,"0.25秒","m b","middle");
 else s+=T(cx,100,13,"一周","g","middle")+T(cx,124,22,"2.5秒","b","middle");
 return svgY(0,208,"10人が輪になって手をつないだ図。1から10の番号の丸が輪になり、矢印が時計まわりに、次の人へ向かう。1の丸が1人目で、はじめにとなりの手をにぎる。信号が1周して、1人目にもどるまでが2.5秒"+(ans?"。1人あたりは、0.25秒":""),s)}

/* ---------- アイコン(自作のSVG)：炎と手 ---------- */
function SV(x){return 'data:image/svg+xml;charset=utf-8,'+encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">'+x+'</svg>')}
var GG="#5d6874";
var ICF=SV('<path d="M32,4 C40,18 52,26 52,40 C52,52 43,60 32,60 C21,60 12,52 12,40 C12,32 17,27 20,22 C21,28 24,30 26,30 C24,20 27,10 32,4 Z" fill="'+RED+'"/><path d="M32,34 C36,40 40,43 40,49 C40,55 36,58 32,58 C28,58 24,55 24,49 C24,44 29,41 32,34 Z" fill="#fff" fill-opacity=".55"/>'),
 ICH=SV('<g fill="'+GG+'"><rect x="14" y="30" width="36" height="28" rx="10"/><rect x="14" y="12" width="7" height="30" rx="3.5"/><rect x="23" y="6" width="7" height="36" rx="3.5"/><rect x="32" y="6" width="7" height="36" rx="3.5"/><rect x="41" y="12" width="7" height="30" rx="3.5"/><path d="M14,40 C8,34 4,34 3,38 C3,44 10,52 18,54 Z"/></g>');
function ic(u){return '<img src="'+u+'" alt="" aria-hidden="true" style="width:1.6rem;height:auto">'}

/* ---------- 文章 ---------- */
var M=function(t){return '<span class="m">'+t+'</span>'},V=function(t){return '<span class="v">'+t+'</span>'};
var SM='<p class="note" style="font-size:.8rem;margin:.2rem 0">';
var HD='font-size:1.05rem;font-weight:700;line-height:1.5;margin:1.8rem 0 .3rem;padding-bottom:.2rem;border-bottom:1px solid #c9d0d7';
function hd(x,first){return '<h3 style="'+HD+(first?';margin-top:.9rem':'')+'">'+x+'</h3>'}

var POINT=hd('神経',true)+
 '<p>脳と脊髄を<b>中枢神経</b>、中枢神経から全身にのびる神経を<b>末梢神経</b>といいます。末梢神経には、'+V('感覚神経')+'と'+M('運動神経')+'があります。</p>'+nerve("point")+
 '<p>刺激の信号は、感覚神経から脊髄を通って、大脳に伝わります。大脳が決めた命令は、脊髄を通って、運動神経から運動器官に伝わります。</p>'+
 SM+'※ 顔(頭部)にある特別な感覚器官(目・耳・鼻など)が受けた刺激は、脊髄を通りません。特別な感覚器官 → 脳神経 → 大脳 と伝わります。</p>'+
 hd('反射')+
 '<p>反射は、刺激に対して、意識とは関係なく起こる反応です。命令が大脳を通らず、脊髄から直接出るので、反応が速くなります。</p>'+nerve("reflex")+
 SM+'※ 青い点線は、同時に大脳へ伝わる信号です。そのため、手を引っこめたあとで、「熱い」と感じます。</p>'+
 '<p style="display:flex;flex-wrap:wrap;align-items:center;gap:.2rem .4rem;margin:.8rem 0 .4rem">'+ic(ICF)+'<span>熱いものに触れて、思わず</span>'+ic(ICH)+'<span>手を引っこめる</span></p>'+
 SM+'※ 脊髄を通らない反射もあります。明るい所で瞳が小さくなる反応は、顔の感覚器官の刺激なので、脳神経を通り、脊髄を通りません。</p>';

var QBODY='<p>刺激が伝わる道すじです。矢印は、信号が伝わる向きです。空欄に入る名前を、下の語群から選びなさい。</p>';
var ANS8={a1:"感覚器官",a2:"感覚神経",a3:"脊髄",a4:"大脳",a5:"運動神経",a6:"運動器官",a7:"中枢神経",a8:"末梢神経"};
var CH=["脊髄","運動器官","脳神経","中枢神経","感覚神経","大脳","脊髄神経","末梢神経","感覚器官","運動神経"];
var ANSW=nerve("point")+'<p>刺激は、'+V('感覚神経')+'で脊髄、大脳へ。命令は、脊髄から'+M('運動神経')+'で運動器官へ伝わります。脳と脊髄が中枢神経、感覚神経と運動神経が末梢神経です。</p>';

var SBODY='<p>10人が輪になって、手をつないだ。1人目が、となりの人の手をにぎる。にぎられた人は、すぐに次の人の手をにぎり返す。これを次々とくり返して、信号が輪を1周し、1人目にもどるまでに、2.5秒かかった。1人から次の人へ伝わる時間は、どこも同じとする。</p>'+ring(false)+
 SM+'※ 「にぎられたと感じて、にぎり返す」までを、1回の伝わりと考えます。</p>';
var SOL2=ring(true)+
 '<p>(1) 1周で、10人の間を、10回伝わります。<br>2.5秒 ÷ 10 ＝ <b>0.25秒</b></p>'+
 '<p>(2) 速さ ＝ 距離 ÷ 時間 より、<br>1.5m ÷ 0.25秒 ＝ <b>6m/s</b></p>'+
 SM+'※ 判断の時間もふくむので、実際の神経の速さより、ずっと遅い値になります。</p>';

window.UNIT={
no:"2-15",title:"神経と反射",
sections:[
{type:"text",point:true,title:"厳選ポイント",html:POINT},
{type:"problem",title:"問題",body:QBODY,
 parts:[{type:"tree",svg:nerve("blank"),answers:ANS8,choices:CH}]},
{type:"answer",html:ANSW},
{type:"problem",title:"補充問題",body:SBODY,
 parts:[
  {label:"(1) 信号が、1人から次の人へ伝わる時間",unit:"秒",type:"number",accept:[0.25],tol:0.005},
  {label:"(2) 1人から次の人へ、神経の道すじの長さを1.5mとして、信号が伝わる速さ",unit:"m/s",type:"number",accept:[6],tol:0.05}
 ],
 solution:SOL2}
]};
})();
