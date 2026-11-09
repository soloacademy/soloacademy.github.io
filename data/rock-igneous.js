(function(){
var INK="#26303b",MUTED="#5d6874",RULE="#dde2e7",GRAY="#8a949f";
function n(v){return Math.round(v*10)/10}
function T(x,y,size,txt,cls,anchor){return '<text x="'+n(x)+'" y="'+n(y)+'" font-size="'+size+'"'+(anchor?' text-anchor="'+anchor+'"':'')+(cls?' class="'+cls+'"':'')+'>'+txt+'</text>'}
/* 色つきの面の上の文字：まわりの白いふちを消す */
function TN(x,y,size,txt,cls,anchor){return '<text x="'+n(x)+'" y="'+n(y)+'" font-size="'+size+'" style="stroke:none"'+(anchor?' text-anchor="'+anchor+'"':'')+(cls?' class="'+cls+'"':'')+'>'+txt+'</text>'}
/* 文字の縦の中心を cy に合わせる(ふちなし) */
function TC(x,cy,size,txt,cls,anchor){return TN(x,cy+size*.36,size,txt,cls,anchor)}
function line(x1,y1,x2,y2,k,w){return '<line x1="'+n(x1)+'" y1="'+n(y1)+'" x2="'+n(x2)+'" y2="'+n(y2)+'" stroke="'+k+'" stroke-width="'+(w||1)+'"/>'}
function rect(x,y,w,h,f,k,sw){return '<rect x="'+n(x)+'" y="'+n(y)+'" width="'+n(w)+'" height="'+n(h)+'" fill="'+f+'"'+(k?' stroke="'+k+'" stroke-width="'+(sw||1)+'"':'')+'/>'}
/* 右向きの矢印：線の先に「く」の字 */
function arrowR(x1,x2,y,k){k=k||INK;return line(x1,y,x2,y,k,1.5)+'<path d="M'+(x2-6)+','+(y-5)+' L'+x2+','+y+' L'+(x2-6)+','+(y+5)+'" fill="none" stroke="'+k+'" stroke-width="1.5"/>'}
function fig(h,label,body,ia){return '<div class="fig"><svg viewBox="0 0 340 '+h+'" role="'+(ia?'group':'img')+'" aria-label="'+label+'">'+body+'</svg></div>'}
function gt(x,y,inner){return '<g transform="translate('+x+','+y+')">'+inner+'</g>'}

/* 空欄(青い点線の枠)：同じ形で quiz.js の tree が動く */
function bl(id,x,y,w,h){
 return '<g class="bl" data-b="'+id+'"><rect x="'+x+'" y="'+y+'" width="'+w+'" height="'+h+'" rx="4"/>'+
  '<text class="bt" x="'+(x+w/2)+'" y="'+(y+h/2+5)+'" font-size="14" text-anchor="middle"></text>'+
  '<text class="bm" x="'+(x+w-5)+'" y="'+(y+11)+'" font-size="12" text-anchor="end"></text></g>'}

/* ---------- 組織の模様(56×32) ---------- */
function hex(cx,cy,r){var h=r*.866,p=[[cx-r,cy],[cx-r/2,cy-h],[cx+r/2,cy-h],[cx+r,cy],[cx+r/2,cy+h],[cx-r/2,cy+h]];
 return '<polygon points="'+p.map(function(q){return n(q[0])+','+n(q[1])}).join(' ')+'"/>'}
/* 斑状組織：大きな結晶(斑晶)が、細かい粒(石基)の中に散らばる */
function patPor(x,y){
 var D=[[4,5],[10,27],[18,4],[22,16],[25,28],[30,6],[24,11],[6,16],[44,20],[50,28],[52,19],[16,22],[28,1],[3,26],[38,29],[14,30]],s='';
 s+=rect(0,0,56,32,"#fff",GRAY,1);
 s+='<g fill="'+GRAY+'">'+D.map(function(d){return '<circle cx="'+d[0]+'" cy="'+d[1]+'" r="0.9"/>'}).join('')+'</g>';
 s+='<g fill="#e6e9ed" stroke="'+MUTED+'" stroke-width="1">'+hex(14,12,5.5)+hex(34,21,5)+hex(46,9,5)+'</g>';
 return gt(x,y,s)}
/* 斑晶・石基の文字と線(模様の右) */
function patLab(x,y){
 return gt(x,y,line(58,8,52,9,MUTED,1)+T(60,12,11,"斑晶","g")+line(58,24,53,20,MUTED,1)+T(60,28,11,"石基","g"))}
/* 等粒状組織：同じくらいの大きさの結晶が、すきまなく並ぶ */
function patEq(x,y){
 var G=[[[0,0],[14,0],[28,0],[42,0],[56,0]],[[0,11],[12,10],[27,13],[41,9],[56,11]],[[0,22],[15,24],[29,20],[43,23],[56,22]],[[0,32],[14,32],[28,32],[42,32],[56,32]]],s='',i,j;
 for(j=0;j<3;j++)for(i=0;i<4;i++){
  var p=[G[j][i],G[j][i+1],G[j+1][i+1],G[j+1][i]];
  s+='<polygon points="'+p.map(function(q){return q[0]+','+q[1]}).join(' ')+'" fill="'+((i+j)%2?"#e6e9ed":"#fff")+'" stroke="'+MUTED+'" stroke-width="0.8"/>'}
 s+='<rect x="0" y="0" width="56" height="32" fill="none" stroke="'+GRAY+'" stroke-width="1"/>';
 return gt(x,y,s)}

/* ---------- 色の見出し(白っぽい・中間・黒っぽい)。y＝上の位置 ---------- */
var CF=["#fff","#d7dce1","#aab2bb"],CN=["白っぽい","中間","黒っぽい"],CX=[118,190,262];
function colHead(y){
 var s=T(6,y+18,12,"色","g"),i;
 for(i=0;i<3;i++)s+=rect(CX[i],y,70,26,CF[i],i?"none":RULE,1)+TC(CX[i]+35,y+13,13,CN[i],null,"middle");
 return s}
/* ねばりけの矢印。y＝文字の高さ */
function sticky(y){
 return T(6,y,12,"ねばりけ","g")+T(118,y,12,"強い","g")+arrowR(148,300,y-4,MUTED)+T(334,y,12,"弱い","g","end")}

/* ---------- 鉱物の棒(含まれる量のめやす。1%＝1.1px) ---------- */
var MIN=[
 {n:"石英",w:[33,5.5,0],f:"#fff",k:GRAY},
 {n:"長石",w:[66,66,55],f:"#cfd5db"},
 {n:"クロウンモ",w:[11,5.5,0],f:"#2b2f33"},
 {n:"カクセン石",w:[0,33,0],f:"#3e5030"},
 {n:"キ石",w:[0,11,33],f:"#6a7d2c"},
 {n:"カンラン石",w:[0,0,22],f:"#b8c23f"}];
var BX=[120,192,264];
function bars(cs,h){
 var s='';
 MIN.forEach(function(m,r){m.w.forEach(function(w,i){if(w)s+=rect(BX[i],cs[r]-h/2,w,h,m.f,m.k||"none",1)})});
 return s}

/* ---------- 厳選ポイントの図 ---------- */
function figPoint(){
 var s='',i,R=["流紋岩","安山岩","玄武岩"],G=["花こう岩","せん緑岩","斑れい岩"],cs=[304,322,364,382,400,418];
 s+=T(6,24,14,"火山岩","m b")+patPor(6,32)+patLab(6,32)+T(6,78,12,"斑状組織","b")+T(118,20,12,"地表または地表付近で、急に冷える");
 for(i=0;i<3;i++)s+=rect(CX[i],32,70,46,"#fff",RULE,1)+TC(CX[i]+35,55,15,R[i],"m b","middle");
 s+=T(6,116,14,"深成岩","v b")+patEq(6,124)+T(6,170,12,"等粒状組織","b")+T(118,112,12,"地下深くで、ゆっくり冷える");
 for(i=0;i<3;i++)s+=rect(CX[i],124,70,46,"#fff",RULE,1)+TC(CX[i]+35,147,15,G[i],"v b","middle");
 s+=colHead(190)+sticky(238)+line(4,250,336,250,RULE,1)+T(6,270,14,"鉱物","b");
 [118,190,262,334].forEach(function(x){s+=line(x,280,x,424,"#e6e9ed",1)});
 s+=T(6,290,12,"無色/白色","b")+T(6,350,12,"有色","b");
 MIN.forEach(function(m,r){s+=T(14,cs[r]+4,12,m.n,"b")});
 s+=bars(cs,12)+T(6,446,12,"棒の長さは、含まれる量のめやす","g");
 return fig(452,"火成岩の分類表。火山岩は、斑状組織で、地表または地表付近で急に冷える。流紋岩、安山岩、玄武岩。深成岩は、等粒状組織で、地下深くでゆっくり冷える。花こう岩、せん緑岩、斑れい岩。その下に、色は白っぽい、中間、黒っぽい。ねばりけは、白っぽい方が強く、黒っぽい方が弱い。鉱物は、含まれる量を棒の長さで表す。白っぽい岩石は、石英が多く、長石が多く、クロウンモが少し入っている。中間の岩石は、長石が多く、カクセン石が多く、キ石と石英が少し入っている。黒っぽい岩石は、石英がなく、長石が多く、キ石とカンラン石が多く入っている。有色鉱物は、黒から黄緑の順に、クロウンモ、カクセン石、キ石、カンラン石。",s)}

/* ---------- 問題の図：岩石の表(10か所が空欄) ---------- */
var A1={vol:"火山岩",por:"斑状組織",r1:"流紋岩",r2:"安山岩",r3:"玄武岩",plu:"深成岩",equ:"等粒状組織",g1:"花こう岩",g2:"せん緑岩",g3:"斑れい岩"};
var C1=["安山岩","等粒状組織","火山岩","斑れい岩","玄武岩","斑状組織","深成岩","花こう岩","流紋岩","せん緑岩"];
function figQ(){
 var s=bl("vol",4,4,70,30)+patPor(6,40)+patLab(6,40)+bl("por",4,78,84,30)+T(118,22,12,"地表または地表付近で、急に冷える")+
  bl("r1",120,44,66,32)+bl("r2",192,44,66,32)+bl("r3",264,44,66,32)+
  bl("plu",4,124,70,30)+patEq(6,160)+bl("equ",4,198,84,30)+T(118,142,12,"地下深くで、ゆっくり冷える")+
  bl("g1",120,164,66,32)+bl("g2",192,164,66,32)+bl("g3",264,164,66,32)+
  colHead(244)+sticky(296);
 return fig(306,"火成岩の表。左に、火山岩の空欄、模様、斑状組織の空欄。その下に、深成岩の空欄、模様、等粒状組織の空欄。右に、流紋岩、安山岩、玄武岩、花こう岩、せん緑岩、斑れい岩の空欄がある。その下に、色の白っぽい、中間、黒っぽいと、ねばりけの強いから弱いへの矢印がある。",s,true)}

/* ---------- 問題の解答の図1：冷え方 → 組織 → 分類 ---------- */
function figA1(){
 var s='';
 s+=T(4,24,13,"地表または")+T(4,40,13,"地表付近で")+T(4,56,13,"急に冷える")+arrowR(100,128,36)+
  patPor(136,20)+T(136,68,12,"斑状組織","b")+arrowR(206,240,36)+T(250,42,16,"火山岩","m b");
 s+=T(4,124,13,"地下深くで")+T(4,140,13,"ゆっくり")+T(4,156,13,"冷える")+arrowR(100,128,136)+
  patEq(136,120)+T(136,168,12,"等粒状組織","b")+arrowR(206,240,136)+T(250,142,16,"深成岩","v b");
 return fig(192,"冷え方から組織と分類が決まる図。地表または地表付近で急に冷えると、斑状組織になり、火山岩。地下深くでゆっくり冷えると、等粒状組織になり、深成岩。",s)}

/* ---------- 問題の解答の図2：色が同じ岩石の対応 ---------- */
function figA2(){
 var s=T(136,18,14,"火山岩","m b","middle")+T(266,18,14,"深成岩","v b","middle"),
  Y=[52,90,128],R=["流紋岩","安山岩","玄武岩"],G=["花こう岩","せん緑岩","斑れい岩"],i;
 for(i=0;i<3;i++){
  s+=rect(4,Y[i]-15,80,30,CF[i],i?"none":RULE,1)+TC(44,Y[i],13,CN[i],null,"middle")+
   line(172,Y[i],230,Y[i],GRAY,1.5)+TC(136,Y[i],15,R[i],"m b","middle")+TC(266,Y[i],15,G[i],"v b","middle")}
 return fig(150,"色が同じ岩石の対応の図。白っぽい岩石は、火山岩が流紋岩、深成岩が花こう岩。中間の岩石は、火山岩が安山岩、深成岩がせん緑岩。黒っぽい岩石は、火山岩が玄武岩、深成岩が斑れい岩。",s)}

/* ---------- 最終練習の図：鉱物の表(6か所が空欄) ---------- */
var A3={qz:"石英",fs:"長石",bi:"クロウンモ",hb:"カクセン石",px:"キ石",ol:"カンラン石"};
var C3=["キ石","石英","カンラン石","長石","クロウンモ","カクセン石"];
function figMin(){
 var cs=[75,111,173,209,245,281],ids=["qz","fs","bi","hb","px","ol"],s=colHead(4);
 [118,190,262,334].forEach(function(x){s+=line(x,36,x,300,"#e6e9ed",1)});
 s+=T(6,52,12,"無色/白色","b")+T(6,150,12,"有色","b");
 ids.forEach(function(id,r){s+=bl(id,14,cs[r]-15,90,30)});
 s+=bars(cs,14);
 return fig(304,"鉱物の表。色は、白っぽい、中間、黒っぽい。無色/白色の2つと、有色の4つの名称が空欄になっている。棒の長さは、含まれる量を表す。有色は、上から黒、暗い緑、オリーブ色、黄緑の順。",s,true)}

/* ---------- 補充問題の解答の図：鉱物の表の完成形(名前は黒の太字、有色は棒の色を小さく添える) ---------- */
function figMinA(){
 var cs=[75,111,173,209,245,281],nm=["石英","長石","クロウンモ","カクセン石","キ石","カンラン石"],sb=[null,null,"黒","暗い緑","オリーブ","黄緑"],s=colHead(4);
 [118,190,262,334].forEach(function(x){s+=line(x,36,x,300,"#e6e9ed",1)});
 s+=T(6,52,12,"無色/白色","b")+T(6,150,12,"有色","b");
 nm.forEach(function(t,r){
  s+=T(14,sb[r]?cs[r]-1:cs[r]+5,15,t,"b");
  if(sb[r])s+=T(14,cs[r]+14,11,sb[r],"g")});
 s+=bars(cs,14);
 return fig(304,"鉱物の表の答え。無色/白色は、石英と長石。有色は、上から、黒のクロウンモ、暗い緑のカクセン石、オリーブ色のキ石、黄緑のカンラン石。石英は白っぽい岩石だけに含まれる。長石は、どの色の岩石にも含まれる。クロウンモは白っぽいと中間、カクセン石は中間、キ石は中間と黒っぽい、カンラン石は黒っぽい岩石に含まれる",s)}

/* ---------- 文章 ---------- */
function nw(t,c){return '<span'+(c?' class="'+c+'"':'')+' style="white-space:nowrap">'+t+'</span>'}
/* 名前の上に、小さく語呂合わせを書く(語呂がないときは、同じ高さの空白) */
function col(g,t,c){return '<span style="display:inline-flex;flex-direction:column;align-items:center;vertical-align:bottom">'+(g===null?'':'<span style="font-size:.72rem;line-height:1.5;color:var(--muted);white-space:nowrap">'+(g||'&nbsp;')+'</span>')+'<span'+(c?' class="'+c+'"':'')+'>'+t+'</span></span>'}
function ann(g,name,c,t){return '<span style="white-space:nowrap;margin-right:.3rem">'+col(g,name,c)+(t?col(g===null?null:"",t,""):"")+'</span>'}
var KA='<span class="m">火</span><span class="v">成</span>岩';
var QNOTE='<p class="note">太い青の枠の空欄に入ります。別の空欄を押すと、そこに移ります。';

var POINT='<p>'+KA+'は、マグマが冷え固まってできた岩石です。</p>'+figPoint()+
 '<div style="border-top:1px solid var(--rule);margin-top:1.2rem;padding-top:.6rem"><p><b>覚え方</b></p>'+
 '<p class="note">'+nw("火山岩","m")+'('+nw("流紋岩","m")+'→'+nw("安山岩","m")+'→'+nw("玄武岩","m")+')：'+nw("流産、安産、元気な子")+'<br>'+
 nw("深成岩","v")+'('+nw("花こう岩","v")+'→'+nw("せん緑岩","v")+'→'+nw("斑れい岩","v")+')：'+nw("囲んで、先生、半殺し")+'<br>'+
 '有色鉱物：'+nw("黒う○こ、隠せ、奇跡の、観覧車")+'</p></div>';

var ANS='<p>冷え方で、組織と分類が決まります。</p>'+figA1()+
 '<p class="note">急に冷えると、結晶が大きく育つ時間がなく、細かい粒(石基)ができます。ゆっくり冷えると、結晶が大きく育ちます。</p>'+
 '<p>色で、岩石の名前が決まります。</p>'+figA2()+
 '<p class="note">同じ色の岩石は、成分が同じで、冷え方だけがちがいます。</p>';

var SOL3='<p>棒の位置(どの色の岩石に含まれるか)で、名前が決まります。</p>'+figMinA()+
 '<p>無色/白色の鉱物は、<b>石英</b>と<b>長石</b>です。<br>'+
 '石英は、白っぽい岩石に多く、黒っぽい岩石にはありません。<br>'+
 '長石は、どの色の岩石にも含まれ、棒がいちばん長い鉱物です。</p>'+
 '<p>有色の鉱物は、白っぽい側から順に、<b>クロウンモ → カクセン石 → キ石 → カンラン石</b>です。<br>'+
 '棒の色は、黒 → 暗い緑 → オリーブ → 黄緑の順になります。</p>'+
 '<p class="note">語呂合わせ「黒う○こ、隠せ、奇跡の、観覧車」の順番と同じです。</p>';
window.UNIT={
no:"1-17",title:"火成岩と鉱物",
sections:[
{type:"text",point:true,title:"厳選ポイント",html:POINT},
{type:"problem",title:"問題",
 body:'<p>表の空欄に入る名称を、下のボタンを押して入れなさい。</p>'+QNOTE+'</p>',
 parts:[{type:"tree",svg:figQ(),answers:A1,choices:C1}]},
{type:"answer",html:ANS},
{type:"problem",title:"補充問題",
 body:'<p>表の空欄に入る名称を、下のボタンを押して入れなさい。</p>'+QNOTE+'棒の長さは、含まれる量のめやすです。</p>',
 parts:[{type:"tree",svg:figMin(),answers:A3,choices:C3}],
 solution:SOL3},
{type:"text",title:"ノートに書いてみよう",html:
 '<p>次の内容を、何も見ずに、そのままノートに書いてみましょう。</p>'+
 '<p>'+KA+'</p>'+
 '<p style="margin-left:1.2em">'+nw("火山岩","m")+'(斑状組織)：'+ann("流産","流紋岩","m","・")+ann("安産","安山岩","m","・")+ann("元気な子","玄武岩","m")+'</p>'+
 '<p style="margin-left:1.2em">'+nw("深成岩","v")+'(等粒状組織)：'+ann("囲んで","花こう岩","v","・")+ann("先生","せん緑岩","v","・")+ann("半殺し","斑れい岩","v")+'</p>'+
 '<p>鉱物</p>'+
 '<p style="margin-left:1.2em">無色/白色：'+ann(null,"石英","","、")+ann(null,"長石","")+'</p>'+
 '<p style="margin-left:1.2em">有色：'+ann("黒う○こ","クロウンモ","","、")+ann("隠せ","カクセン石","","、")+ann("奇跡の","キ石","","、")+ann("観覧車","カンラン石","")+'</p>'+
 '<p class="note">書けたら、厳選ポイントと見比べましょう。</p>'}
]};
})();
