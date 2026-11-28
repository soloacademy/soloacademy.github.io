(function(){
var INK="#26303b";
function n(v){return Math.round(v*10)/10}
function T(x,y,size,txt,cls,anchor){return '<text x="'+n(x)+'" y="'+n(y)+'" font-size="'+size+'"'+(anchor?' text-anchor="'+anchor+'"':'')+(cls?' class="'+cls+'"':'')+'>'+txt+'</text>'}
function TN(x,y,size,txt,cls,anchor){return '<text x="'+n(x)+'" y="'+n(y)+'" font-size="'+size+'" style="stroke:none"'+(anchor?' text-anchor="'+anchor+'"':'')+(cls?' class="'+cls+'"':'')+'>'+txt+'</text>'}
function line(x1,y1,x2,y2,k,w){return '<line x1="'+n(x1)+'" y1="'+n(y1)+'" x2="'+n(x2)+'" y2="'+n(y2)+'" stroke="'+k+'" stroke-width="'+(w||1)+'"/>'}

/* ---------- 回路図 ----------
   電源は上。直列：抵抗は下で左右に並ぶ。並列：抵抗は上下に並ぶ。
   c がなければ「名前＋A・V・Ω」の文字(厳選ポイント)。c があれば、A・V・Ω の枠を、全体(電源の近く)・抵抗1・抵抗2(それぞれの近く)に置く(問題)。
   分かっている値は灰色の枠、求める値は入力欄(図の上に重ねる) */
var NM={t:"全体",a:"抵抗1",b:"抵抗2"},LB0={t:"A・V・Ω",a:"A₁・V₁・Ω₁",b:"A₂・V₂・Ω₂"};
var Q=["A","V","R"],SY={A:"A",V:"V",R:"Ω"},QN={A:"電流",V:"電圧",R:"抵抗"};
var SW=36,SH=30,PITCH=63;
function fmt(q,v){return (q==="A"&&v%1===0)?v.toFixed(1):String(v)}
function res(cx,cy,w,h){return '<rect x="'+n(cx-w/2)+'" y="'+n(cy-h/2)+'" width="'+w+'" height="'+h+'" fill="#fff" stroke="'+INK+'" stroke-width="1.5"/>'}
function batH(x,y){return line(x-4,y-12,x-4,y+12,INK,1.5)+line(x+4,y-7,x+4,y+7,INK,1.5)}
function resN(cx,cy,it){return res(cx,cy,60,24)+TN(cx,cy+5,13,NM[it],"b","middle")}
function circ(kind,title,c){
 var slot=!!c,two=slot&&kind==="s",s=T(4,14,14,title,"b"),flds=[],H,al,L=30,R=310,yT,yB,y1,y2;
 /* A・V・Ω は記号(上の端 ys)のすぐ上。名前は、抵抗は白い四角の中、全体は電源の近く。slot＝入力枠(単位は枠の後ろ)、そうでなければ文字 */
 function put(it,sx,ys,x0){
  var o='',ry=ys-36;
  if(!slot){
   if(it==="t")return T(sx,ys-6,13,'<tspan class="b">全体</tspan>　<tspan class="g" font-size="11.5">'+LB0.t+'</tspan>',null,"middle");
   return T(sx,ys-6,11.5,LB0[it],"g","middle")}
  /* 枠の後ろに単位(A・V・Ω)。直列は狭いので「V が上、下に Ω と A」、並列は横一列 */
  var W=SW+13,pos={},nx,ny;
  if(two){pos={V:[sx-W/2,ys-70],R:[sx-56,ys-36],A:[sx+7,ys-36]};nx=sx-W/2-6;ny=ys-70+SH/2+5}
  else{Q.forEach(function(q,qi){pos[q]=[x0+PITCH*qi,ry]});nx=x0-6;ny=ry+SH/2+5}
  if(it==="t")o+=T(nx,ny,13,"全体","b","end");
  Q.forEach(function(q){
   var bx=pos[q][0],by=pos[q][1];
   o+=T(bx+SW+3,by+SH/2+6,15,SY[q],"b");
   if(c.given[it].indexOf(q)>=0)
    o+='<rect x="'+n(bx)+'" y="'+by+'" width="'+SW+'" height="'+SH+'" rx="4" fill="#eceff2" stroke="#c9d0d7" stroke-width="1"/>'+TN(bx+SW/2,by+SH/2+6,16,fmt(q,c.full[it][q]),null,"middle");
   else flds.push({x:bx,y:by,w:SW,h:SH,accept:[c.full[it][q]],tol:.005,aria:NM[it]+" "+QN[q]});
  });
  return o}
 if(kind==="s"){
  /* 下の線：導線の左はし、抵抗1、抵抗2、導線の右はしの間を、3か所とも同じ長さ(g)にする */
  L=8;R=332;var g=(R-L-120)/3,b1=L+g+30,b2=L+2*g+90;
  yT=slot?104:53;yB=slot?206:116;H=slot?228:140;
  s+=line(L,yT,166,yT,INK,1.5)+batH(170,yT)+line(174,yT,R,yT,INK,1.5)+
   line(L,yT,L,yB,INK,1.5)+line(R,yT,R,yB,INK,1.5)+
   line(L,yB,L+g,yB,INK,1.5)+line(L+g+60,yB,L+2*g+60,yB,INK,1.5)+line(L+2*g+120,yB,R,yB,INK,1.5)+
   resN(b1,yB,"a")+resN(b2,yB,"b")+
   put("t",170,yT-12,94)+put("a",b1,yB-12,0)+put("b",b2,yB-12,0);
  al="直列回路の図。上に電池があり、下に抵抗1と抵抗2が、左右に一列につながっている。抵抗の名前は、四角の中にある。電池と、各抵抗の上に、";
 }else{
  /* 電源・抵抗1・抵抗2は、回路の中央にそろえる */
  yT=slot?72:56;y1=slot?138:108;y2=slot?204:160;H=slot?222:176;
  s+=line(L,yT,166,yT,INK,1.5)+batH(170,yT)+line(174,yT,R,yT,INK,1.5)+
   line(L,yT,L,y2,INK,1.5)+line(R,yT,R,y2,INK,1.5)+
   line(L,y1,140,y1,INK,1.5)+resN(170,y1,"a")+line(200,y1,R,y1,INK,1.5)+
   line(L,y2,140,y2,INK,1.5)+resN(170,y2,"b")+line(200,y2,R,y2,INK,1.5)+
   '<circle cx="'+L+'" cy="'+y1+'" r="3" fill="'+INK+'"/><circle cx="'+R+'" cy="'+y1+'" r="3" fill="'+INK+'"/>'+
   put("t",170,yT-12,82)+put("a",170,y1-12,82)+put("b",170,y2-12,82);
  al="並列回路の図。上に電池があり、その下に、抵抗1と抵抗2が、上下に並んでいる。電池と抵抗は、回路の中央にそろっている。抵抗の名前は、四角の中にある。電池と、各抵抗の上に、";
 }
 var info="";
 if(c){["t","a","b"].forEach(function(it){var g=Q.filter(function(q){return c.given[it].indexOf(q)>=0}).map(function(q){return QN[q]+fmt(q,c.full[it][q])+SY[q]});info+=NM[it]+(g.length?"は、最初から分かっている値が、"+g.join("、"):"は、すべて空欄")+"。"});}
 var lab=title+"。"+al+(c?"A・V・Ωの枠がある。灰色の枠は、最初から分かっている値。"+info:"A・V・Ωの名前がある");
 return {svg:'<svg viewBox="0 0 340 '+H+'" role="img" aria-label="'+lab+'">'+s+'</svg>',H:H,fields:flds}}
function figL(kind,title){return '<div class="fig cfig">'+circ(kind,title,null).svg+'</div>'}

/* ---------- オームの法則の円(1-1「密度」と同じ大きさ・同じ形)：上＝電圧、左下＝抵抗、右下＝電流 ---------- */
function ohm(){
 var CX=150,CY=95,R=70,GL="#8a949f",s='';
 s+='<circle cx="'+CX+'" cy="'+CY+'" r="'+R+'" fill="#fff" stroke="'+GL+'" stroke-width="1.2"/>'+
  line(CX-R,CY,CX+R,CY,GL,1.2)+line(CX,CY,CX,CY+R,GL,1.2)+
  T(CX-30,CY+8,20,"÷","b","middle")+T(CX+30,CY+8,20,"÷","b","middle")+T(CX,CY+36,16,"×","b","middle")+
  TN(CX,CY-34,22,"電圧","b","middle")+TN(CX,CY-14,12,"(V)","g","middle")+
  TN(CX-30,CY+33,20,"抵抗","b","middle")+TN(CX-30,CY+49,11,"(Ω)","g","middle")+
  TN(CX+30,CY+33,20,"電流","b","middle")+TN(CX+30,CY+49,12,"(A)","g","middle")+
  T(58,20,17,"関係図","g b");
 var lb="「電圧・電流・抵抗」の関係図。1つの円に、横の直径と、中心から下への半径がある。上半分に電圧(V)、左下に抵抗(Ω)、右下に電流(A)。抵抗と電流の間は×、電圧と抵抗の間と、電圧と電流の間は÷";
 return '<div style="margin:.6rem 0"><div class="fig" style="margin:0;width:7.8rem;flex:0 0 auto"><svg viewBox="56 4 174 166" role="img" aria-label="'+lb+'">'+s+'</svg></div></div>'}

/* ---------- 関係の表(厳選ポイント)：等しい＝青、和＝赤 ---------- */
var E='<span class="v">等しい</span>',S='<span class="m">和</span>';
function fr(d){return '<span class="frac" style="margin:0 .05rem;line-height:1.3"><span style="padding:0 .05rem">1</span><span style="padding:0 .05rem">'+d+'</span></span>'}
function cell(h,st){return '<div style="display:flex;flex-direction:column;justify-content:center;text-align:center;padding:.25rem .1rem;line-height:1.3;border-top:1px solid #dde2e7;'+(st||'')+'">'+h+'</div>'}
/* 記号を大きく(＝は青、＋は赤)、式を小さく */
var BIG='font-weight:700;font-size:1.3rem;line-height:1.2';
function rl(cls,word,f){return cell('<span class="'+cls+'" style="'+BIG+'">'+word+'</span><span class="'+cls+'" style="font-size:.7rem">'+f+'</span>')}
function relTable(){
 var G='display:grid;grid-template-columns:2.6rem repeat(3,1fr);align-items:stretch;margin:.6rem 0 .4rem;max-width:21rem',
  h=function(a,b){return '<div style="text-align:center;font-weight:700;line-height:1.3;padding:.1rem 0 .3rem">'+a+'<br><span style="font-size:.75rem;color:var(--muted);font-weight:400">'+b+'</span></div>'},
  nm=function(t){return cell(t,'text-align:left;font-weight:700')};
 return '<div style="'+G+'"><div></div>'+h('電流','(A)')+h('電圧','(V)')+h('抵抗','(Ω)')+
  nm('直列')+rl('v','＝','A₁＝A₂＝A')+rl('m','＋','V₁＋V₂＝V')+rl('m','＋','Ω₁＋Ω₂＝Ω')+
  nm('並列')+rl('m','＋','A₁＋A₂＝A')+rl('v','＝','V₁＝V₂＝V')+cell('<span class="m" style="font-size:.7rem">'+fr('Ω₁')+'＋'+fr('Ω₂')+'＝'+fr('Ω')+'</span>')+
  '</div>'}

/* ---------- 問題・補充の回路 ----------
   full＝全部の値(t＝全体、a＝抵抗1、b＝抵抗2)、given＝最初から分かっている量(A・V・R)、st＝求める順番、nt＝小さい注 */
var C={
 q1:{k:"s",t:"(1) 直列回路",full:{t:{V:6,A:0.2,R:30},a:{V:2,A:0.2,R:10},b:{V:4,A:0.2,R:20}},given:{t:["V"],a:["R"],b:["R"]},
  st:'① 全体 Ω(抵抗の'+S+')：10＋20＝30Ω → ② 全体 A：6÷30＝0.2A → ③ A は'+E+'ので、抵抗1・抵抗2 も 0.2A → ④ V₁＝10×0.2＝2V、V₂＝20×0.2＝4V'},
 q2:{k:"p",t:"(2) 並列回路",full:{t:{V:12,A:1,R:12},a:{V:12,A:0.6,R:20},b:{V:12,A:0.4,R:30}},given:{t:["V"],a:["R"],b:["R"]},
  st:'① V は'+E+'ので、抵抗1・抵抗2 も 12V → ② A₁＝12÷20＝0.6A、A₂＝12÷30＝0.4A → ③ 全体 A(電流の'+S+')：0.6＋0.4＝1.0A → ④ 全体 Ω：12÷1.0＝12Ω',
  nt:'逆数の式で確かめると、1/20＋1/30＝3/60＋2/60＝5/60＝1/12 で、12Ω になります。'},
 s1:{k:"s",t:"(1) 直列回路",full:{t:{V:12,A:0.4,R:30},a:{V:4,A:0.4,R:10},b:{V:8,A:0.4,R:20}},given:{t:["V"],a:["R"],b:["R"]},
  st:'① 全体 Ω：10＋20＝30Ω → ② 全体 A：12÷30＝0.4A → ③ A は'+E+'ので、抵抗1・抵抗2 も 0.4A → ④ V₁＝10×0.4＝4V、V₂＝20×0.4＝8V'},
 s2:{k:"s",t:"(2) 直列回路",full:{t:{V:6,A:0.2,R:30},a:{V:2,A:0.2,R:10},b:{V:4,A:0.2,R:20}},given:{t:[],a:["V","R"],b:["R"]},
  st:'① A₁＝2÷10＝0.2A → ② A は'+E+'ので、抵抗2・全体も 0.2A → ③ V₂＝20×0.2＝4V → ④ 全体 V(電圧の'+S+')：2＋4＝6V → ⑤ 全体 Ω：10＋20＝30Ω'},
 s3:{k:"s",t:"(3) 直列回路",full:{t:{V:20,A:0.5,R:40},a:{V:5,A:0.5,R:10},b:{V:15,A:0.5,R:30}},given:{t:["V","A"],a:["R"],b:[]},
  st:'① 全体 Ω：20÷0.5＝40Ω → ② A は'+E+'ので、抵抗1・抵抗2 も 0.5A → ③ V₁＝10×0.5＝5V → ④ V₂＝20−5＝15V → ⑤ Ω₂＝15÷0.5＝30Ω',
  nt:'Ω₂ は、全体 Ω − Ω₁ ＝ 40 − 10 ＝ 30Ω でも求められます。'},
 p1:{k:"p",t:"(4) 並列回路",full:{t:{V:8,A:1,R:8},a:{V:8,A:0.8,R:10},b:{V:8,A:0.2,R:40}},given:{t:["V"],a:["R"],b:["R"]},
  st:'① 全体 Ω：1/10＋1/40＝4/40＋1/40＝5/40＝1/8 → 8Ω → ② V は'+E+'ので、抵抗1・抵抗2 も 8V → ③ A₁＝8÷10＝0.8A、A₂＝8÷40＝0.2A → ④ 全体 A(電流の'+S+')：0.8＋0.2＝1.0A',
  nt:'全体 A は、全体 V÷全体 Ω ＝ 8÷8 ＝ 1.0A でも求められます。'},
 p2:{k:"p",t:"(5) 並列回路",full:{t:{V:12,A:2,R:6},a:{V:12,A:1.2,R:10},b:{V:12,A:0.8,R:15}},given:{t:["V","A"],a:["R"],b:[]},
  st:'① V は'+E+'ので、抵抗1・抵抗2 も 12V → ② A₁＝12÷10＝1.2A → ③ A₂＝2.0−1.2＝0.8A → ④ Ω₂＝12÷0.8＝15Ω → ⑤ 全体 Ω：12÷2.0＝6Ω',
  nt:'逆数の式で確かめると、1/10＋1/15＝3/30＋2/30＝5/30＝1/6 で、6Ω になります。'},
 p3:{k:"p",t:"(6) 並列回路",full:{t:{V:10,A:2.5,R:4},a:{V:10,A:2,R:5},b:{V:10,A:0.5,R:20}},given:{t:["A"],a:["R"],b:["R"]},
  st:'① 全体 Ω：1/5＋1/20＝4/20＋1/20＝5/20＝1/4 → 4Ω → ② 全体 V：4×2.5＝10V → ③ V は'+E+'ので、抵抗1・抵抗2 も 10V → ④ A₁＝10÷5＝2.0A、A₂＝10÷20＝0.5A'}
};
function part(c){var r=circ(c.k,c.t,c);return {type:"slots",svg:r.svg,W:340,H:r.H,fields:r.fields}}
function ansTab(c){
 var G='display:grid;grid-template-columns:3.6rem repeat(3,1fr);align-items:stretch;margin:.4rem 0 .5rem;max-width:21rem',
  hd=function(t){return '<div style="text-align:center;font-size:.75rem;color:var(--muted);padding:.1rem 0">'+t+'</div>'},
  s='<div style="'+G+'">'+hd('')+hd('電流(A)')+hd('電圧(V)')+hd('抵抗(Ω)');
 ["t","a","b"].forEach(function(it){
  s+=cell(NM[it],'text-align:left;font-weight:700;font-size:.9rem');
  Q.forEach(function(q){var g=c.given[it].indexOf(q)>=0;s+=cell(fmt(q,c.full[it][q]),g?'color:var(--muted)':'font-weight:700')})});
 return s+'</div>'}
var SM='<p class="note" style="font-size:.8rem;margin:.2rem 0">';
function sol(c){return '<p style="margin-bottom:0"><b>'+c.t+'</b></p>'+ansTab(c)+'<p style="margin:.3rem 0">'+c.st+'</p>'+(c.nt?SM+'※ '+c.nt+'</p>':'')}

/* ---------- 文章 ---------- */
var HD='font-size:1.05rem;font-weight:700;line-height:1.5;margin:1.8rem 0 .3rem;padding-bottom:.2rem;border-bottom:1px solid #c9d0d7';
function hd(x,first){return '<h3 style="'+HD+(first?';margin-top:.9rem':'')+'">'+x+'</h3>'}

function bs(a,u,t){return '<span><b>'+a+'</b><span style="font-size:.8rem;color:var(--muted)">('+u+')</span></span><span style="font-size:.9rem;line-height:1.6">'+t+'</span>'}
var BASIC='<div style="display:grid;grid-template-columns:max-content 1fr;column-gap:.9rem;row-gap:.6rem;align-items:baseline;margin:.8rem 0">'+
 bs('電流','A','回路を流れる電気の量。単位は A(アンペア)')+
 bs('電圧','V','電流を流そうとするはたらき。単位は V(ボルト)')+
 bs('抵抗','Ω','電流の流れにくさ。単位は Ω(オーム)')+'</div>';

var PCFIX='<style>@media (min-width:700px){.cfig svg{max-width:18rem}}</style>';
var POINT=PCFIX+hd('電流・電圧・抵抗',true)+BASIC+
 hd('直列回路と並列回路')+
 figL("s","直列回路")+figL("p","並列回路")+relTable()+
 SM+'※ 並列回路の全体の抵抗は、どの抵抗よりも小さくなります。</p>'+
 hd('オームの法則')+ohm();

var QBODY='<p>次の回路で、空欄に入る値を求めなさい。灰色の枠は、最初から分かっている値です。</p>';
var GRAYNOTE=SM+'※ 灰色の数字は、最初から分かっている値です。</p>';
var ANS=GRAYNOTE+sol(C.q1)+sol(C.q2);
var SOL2=GRAYNOTE+["s1","s2","s3","p1","p2","p3"].map(function(k){return sol(C[k])}).join('');

window.UNIT={
no:"2-16",title:"電流と回路",
sections:[
{type:"text",point:true,title:"厳選ポイント",html:POINT},
{type:"problem",title:"問題",body:QBODY,parts:[part(C.q1),part(C.q2)]},
{type:"answer",html:ANS},
{type:"problem",title:"補充問題",body:QBODY,
 parts:["s1","s2","s3","p1","p2","p3"].map(function(k){return part(C[k])}),
 solution:SOL2}
]};
})();
