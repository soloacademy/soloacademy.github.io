(function(){
var INK="#26303b";
function n(v){return Math.round(v*10)/10}
function T(x,y,size,txt,cls,anchor){return '<text x="'+n(x)+'" y="'+n(y)+'" font-size="'+size+'"'+(anchor?' text-anchor="'+anchor+'"':'')+(cls?' class="'+cls+'"':'')+'>'+txt+'</text>'}
function TN(x,y,size,txt,cls,anchor){return '<text x="'+n(x)+'" y="'+n(y)+'" font-size="'+size+'" style="stroke:none"'+(anchor?' text-anchor="'+anchor+'"':'')+(cls?' class="'+cls+'"':'')+'>'+txt+'</text>'}
function line(x1,y1,x2,y2,k,w){return '<line x1="'+n(x1)+'" y1="'+n(y1)+'" x2="'+n(x2)+'" y2="'+n(y2)+'" stroke="'+k+'" stroke-width="'+(w||1)+'"/>'}

/* ---------- 回路図：kind＝"s"(直列)か"p"(並列)。lab＝{t,a,b}それぞれ名前の下に書く行。cls＝その行の色(厳選ポイントは灰色 g、問題は黒) ---------- */
var NM={t:"全体",a:"抵抗1",b:"抵抗2"};
function res(cx,cy,w,h){return '<rect x="'+n(cx-w/2)+'" y="'+n(cy-h/2)+'" width="'+w+'" height="'+h+'" fill="#fff" stroke="'+INK+'" stroke-width="1.5"/>'}
function bat(x,y){return line(x-10,y,x+10,y,INK,1.5)+line(x-5,y+8,x+5,y+8,INK,4)}
function lbl(x,y,it,lab,cls,anchor){
 var s=T(x,y,13,NM[it],"b",anchor),l=lab[it]||[];
 l.forEach(function(t,k){s+=T(x,y+14*(k+1),11.5,t,cls,anchor)});
 return s}
function fig(kind,title,lab,cls){
 var s=T(4,14,14,title,"b"),h,yT,yB;
 if(kind==="s"){
  yT=38;yB=108;h=116;
  s+=line(40,yT,110,yT,INK,1.5)+line(170,yT,210,yT,INK,1.5)+line(270,yT,300,yT,INK,1.5)+
   line(300,yT,300,yB,INK,1.5)+line(40,yB,300,yB,INK,1.5)+
   line(40,yT,40,68,INK,1.5)+bat(40,68)+line(40,76,40,yB,INK,1.5)+
   res(140,yT,60,24)+res(240,yT,60,24)+
   lbl(52,66,"t",lab,cls)+lbl(140,68,"a",lab,cls,"middle")+lbl(240,68,"b",lab,cls,"middle");
 }else{
  yT=30;yB=130;h=140;
  s+=line(40,yT,240,yT,INK,1.5)+line(40,yB,240,yB,INK,1.5)+
   line(40,yT,40,76,INK,1.5)+bat(40,76)+line(40,84,40,yB,INK,1.5)+
   line(140,yT,140,55,INK,1.5)+res(140,80,22,50)+line(140,105,140,yB,INK,1.5)+
   line(240,yT,240,55,INK,1.5)+res(240,80,22,50)+line(240,105,240,yB,INK,1.5)+
   '<circle cx="140" cy="'+yT+'" r="3" fill="'+INK+'"/><circle cx="140" cy="'+yB+'" r="3" fill="'+INK+'"/>'+
   lbl(52,72,"t",lab,cls)+lbl(158,72,"a",lab,cls)+lbl(258,72,"b",lab,cls);
 }
 var al=kind==="s"?"直列回路の図。電池に、抵抗1と抵抗2が、一列につながっている":"並列回路の図。電池に、抵抗1と抵抗2が、枝分かれして、別々につながっている";
 var info=[];["t","a","b"].forEach(function(it){if((lab[it]||[]).length)info.push(NM[it]+"："+lab[it].join("、"))});
 return '<div class="fig"><svg viewBox="0 0 340 '+h+'" role="img" aria-label="'+title+'。'+al+(info.length?"。"+info.join("。"):"")+'">'+s+'</svg></div>'}

/* ---------- オームの法則の円(密度の「き・は・じ」と同じ形)：上＝電圧、左下＝抵抗、右下＝電流 ---------- */
function ohm(){
 var CX=150,CY=95,R=70,GL="#8a949f",s='';
 s+='<circle cx="'+CX+'" cy="'+CY+'" r="'+R+'" fill="#fff" stroke="'+GL+'" stroke-width="1.2"/>'+
  line(CX-R,CY,CX+R,CY,GL,1.2)+line(CX,CY,CX,CY+R,GL,1.2)+
  T(CX-30,CY+8,20,"÷","b","middle")+T(CX+30,CY+8,20,"÷","b","middle")+T(CX,CY+36,16,"×","b","middle")+
  TN(CX,CY-34,22,"電圧","b","middle")+TN(CX,CY-14,12,"(V)","g","middle")+
  TN(CX-30,CY+33,20,"抵抗","b","middle")+TN(CX-30,CY+49,12,"(Ω)","g","middle")+
  TN(CX+30,CY+33,20,"電流","b","middle")+TN(CX+30,CY+49,12,"(A)","g","middle");
 var lb="電圧・電流・抵抗の図。1つの円に、横の直径と、中心から下への半径がある。上半分に電圧(V)、左下に抵抗(Ω)、右下に電流(A)。抵抗と電流の間は×、電圧と抵抗の間と、電圧と電流の間は÷";
 return '<div class="fig" style="margin:0;width:9.5rem;flex:0 0 auto"><svg viewBox="70 18 160 150" role="img" aria-label="'+lb+'">'+s+'</svg></div>'}

/* ---------- 関係の表(厳選ポイント)：等しい＝青、和＝赤 ---------- */
var E='<span class="v">等しい</span>',S='<span class="m">和</span>';
function fr(d){return '<span class="frac" style="margin:0 .1rem;line-height:1.35"><span style="padding:0 .1rem">1</span><span style="padding:0 .1rem">'+d+'</span></span>'}
function cell(h,st){return '<div style="text-align:center;padding:.5rem .1rem;line-height:1.45;border-top:1px solid #dde2e7;'+(st||'')+'">'+h+'</div>'}
function rel(cls,formula,word){return '<span class="'+cls+'"><b>'+formula+'</b></span><br><span class="'+cls+'" style="font-size:.75rem">'+word+'</span>'}
function relTable(){
 var G='display:grid;grid-template-columns:3rem 1fr 1fr;align-items:center;margin:.6rem 0 .4rem',h=function(t){return '<div style="text-align:center;font-weight:700;padding:.1rem 0 .3rem">'+t+'</div>'};
 var nm=function(a,b){return cell(a+'<br><span style="font-size:.75rem;color:var(--muted)">'+b+'</span>','text-align:left;font-weight:700;font-size:.9rem')};
 return '<div style="'+G+'"><div></div>'+h('直列')+h('並列')+
  nm('電流','(A)')+cell(rel('v','A₁＝A₂＝A','等しい'))+cell(rel('m','A₁＋A₂＝A','和'))+
  nm('電圧','(V)')+cell(rel('m','V₁＋V₂＝V','和'))+cell(rel('v','V₁＝V₂＝V','等しい'))+
  nm('抵抗','(Ω)')+cell(rel('m','Ω₁＋Ω₂＝Ω','和'))+
  cell('<span class="m" style="font-size:.85rem"><b>'+fr('Ω₁')+'＋'+fr('Ω₂')+'＝'+fr('Ω')+'</b></span><br><span class="m" style="font-size:.75rem">逆数の和</span>')+
  '</div>'}

/* ---------- 問題・補充の回路 ----------
   full＝全部の値(t＝全体、a＝抵抗1、b＝抵抗2)、given＝最初から分かっている量(A・V・R)、st＝求める順番、nt＝小さい注 */
var Q=["A","V","R"],SY={A:"A",V:"V",R:"Ω"};
function fmt(q,v){return (q==="A"&&v%1===0)?v.toFixed(1):String(v)}
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
function lines(c,it){return Q.filter(function(q){return c.given[it].indexOf(q)>=0}).map(function(q){return SY[q]+"＝"+fmt(q,c.full[it][q])+SY[q]})}
function labs(c){return {t:lines(c,"t"),a:lines(c,"a"),b:lines(c,"b")}}
var gid=0;
function parts(c){
 var out=[],first=true;
 ["t","a","b"].forEach(function(it){var g=++gid,k=0;
  Q.forEach(function(q){
   if(c.given[it].indexOf(q)>=0)return;
   var p={label:(k===0?'<span style="display:inline-block;min-width:3.6em">'+NM[it]+'</span>':'')+SY[q],grp:g,type:"number",accept:[c.full[it][q]],tol:0.005};
   if(first){p.head=fig(c.k,c.t,labs(c),"");first=false}
   out.push(p);k++})});
 return out}
function ansTab(c){
 var G='display:grid;grid-template-columns:3.6rem repeat(3,1fr);align-items:center;margin:.4rem 0 .5rem;max-width:21rem',
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
var LB0={t:["A・V・Ω"],a:["A₁・V₁・Ω₁"],b:["A₂・V₂・Ω₂"]};

var POINT=hd('直列回路と並列回路',true)+
 '<p>回路全体の値(A・V・Ω)と、抵抗1・抵抗2 の値(A₁・V₁・Ω₁、A₂・V₂・Ω₂)の関係は、次のとおりです。</p>'+
 fig("s","直列回路",LB0,"g")+fig("p","並列回路",LB0,"g")+relTable()+
 SM+'※ 並列回路の全体の抵抗は、どの抵抗よりも小さくなります。</p>'+
 hd('オームの法則')+
 '<p>電圧・電流・抵抗の間には、次の関係があります。</p>'+
 '<div style="display:flex;align-items:center;gap:1rem;margin:.4rem 0 .6rem">'+ohm()+
 '<div style="line-height:2;font-size:.95rem;white-space:nowrap">V ＝ Ω × A<br>Ω ＝ V ÷ A<br>A ＝ V ÷ Ω</div></div>'+
 SM+'※ 求めたい文字をかくします。残りが横に並んでいれば ×、上下なら ÷ です。</p>';

var QBODY='<p>次の回路で、空欄に入る値を求めなさい。図に書いてあるのは、最初から分かっている値です。</p>';
var GRAYNOTE=SM+'※ 灰色の数字は、最初から分かっている値です。</p>';
var ANS=GRAYNOTE+sol(C.q1)+sol(C.q2);
var SBODY=QBODY;
var SOL2=GRAYNOTE+["s1","s2","s3","p1","p2","p3"].map(function(k){return sol(C[k])}).join('');

window.UNIT={
no:"2-16",title:"電流と回路",
sections:[
{type:"text",point:true,title:"厳選ポイント",html:POINT},
{type:"problem",title:"問題",body:QBODY,parts:parts(C.q1).concat(parts(C.q2))},
{type:"answer",html:ANS},
{type:"problem",title:"補充問題",body:SBODY,
 parts:[].concat(parts(C.s1),parts(C.s2),parts(C.s3),parts(C.p1),parts(C.p2),parts(C.p3)),
 solution:SOL2}
]};
})();
