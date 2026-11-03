(function(){
var MUTED="#5d6874";
function T(x,y,size,txt,cls,anchor){return '<text x="'+x+'" y="'+y+'" font-size="'+size+'"'+(anchor?' text-anchor="'+anchor+'"':'')+(cls?' class="'+cls+'"':'')+'>'+txt+'</text>'}
function ln(x1,y1,x2,y2){return '<line x1="'+x1+'" y1="'+y1+'" x2="'+x2+'" y2="'+y2+'" stroke="'+MUTED+'" stroke-width="1.2"/>'}
function fig(h,label,body,ia){return '<div class="fig"><svg viewBox="0 0 340 '+h+'" style="max-width:22rem" '+(ia?'role="group"':'role="img"')+' aria-label="'+label+'">'+body+'</svg></div>'}

/* 名称の枠。「その他の…」は2行(高さ42)、ほかは1行(高さ34)。B[id] があれば空欄(青い点線の枠) */
function bx(x,y,w,name,id,B){
 var two=name.indexOf("その他の")===0&&name.length>5,h=two?42:34,cx=x+w/2;
 if(B&&B[id])return '<g class="bl" data-b="'+id+'"><rect x="'+x+'" y="'+y+'" width="'+w+'" height="'+h+'" rx="4"/>'+
  '<text class="bt" x="'+cx+'" y="'+(y+(two?17:23))+'" font-size="14" text-anchor="middle"></text>'+
  '<text class="bm" x="'+(x+w-5)+'" y="'+(y+11)+'" font-size="12" text-anchor="end"></text></g>';
 return '<rect x="'+x+'" y="'+y+'" width="'+w+'" height="'+h+'" rx="4" fill="#fff" stroke="'+MUTED+'" stroke-width="1.2"/>'+
  (two?T(cx,y+17,14,name.slice(0,4),"b","middle")+T(cx,y+33,14,name.slice(4),"b","middle"):T(cx,y+22,14,name,"b","middle"))}
/* 枠の下の文字(左そろえ・11px)：特徴は黒、具体例は赤 */
function Tx(x,y,a,cls){return a.map(function(t,i){return T(x,y+14*i,11,t,cls)}).join("")}
/* 文字n行の枠の、次の枠の上の位置 */
function after(y,h,n){return n>0?y+h+14+14*(n-1)+4+12:y+h+12}

var VERT=[
 {id:"fish",n:"魚類",f:["卵生(殻なし)","エラ呼吸・変温動物"],x:["キンギョ、サケ、ウグイ"]},
 {id:"amp",n:"両生類",f:["卵生(殻なし)・変温動物","子はエラ呼吸、親は肺呼吸"],x:["カエル、イモリ"]},
 {id:"rep",n:"ハ虫類",f:["卵生(殻あり)","肺呼吸・変温動物"],x:["ワニ、ヘビ、ヤモリ"]},
 {id:"bird",n:"鳥類",f:["卵生(殻あり)","肺呼吸・恒温動物"],x:["ペンギン、ダチョウ、スズメ"]},
 {id:"mam",n:"ホ乳類",f:["胎生","肺呼吸・恒温動物"],x:["ウシ、イヌ、コウモリ"]}
];

/* 図の組み立て。o.v＝セキツイ動物の部分、o.i＝無セキツイ動物の部分、o.e＝具体例を表示、o.B＝空欄 */
function build(o){
 var B=o.B,e=o.e,y=10,s="",XB=186,cyv=[],cy2v=0,cy2i=0,k;
 if(o.v){
  VERT.forEach(function(d){
   cyv.push(y+17);
   s+=bx(XB,y,62,d.n,d.id,B)+Tx(XB,y+48,d.f)+(e?Tx(XB,y+48+14*d.f.length,d.x,"m"):"");
   y=after(y,34,d.f.length+(e?d.x.length:0))});
  cy2v=(cyv[0]+cyv[cyv.length-1])/2;
  s+=ln(162,cy2v,180,cy2v)+ln(180,cyv[0],180,cyv[cyv.length-1]);
  cyv.forEach(function(c){s+=ln(180,c,186,c)});
  s+=bx(58,cy2v-17,104,"セキツイ動物","vert",B)+Tx(58,cy2v+31,["背骨がある"]);
  if(o.i)y+=6;
 }
 if(o.i){
  var ya=y,cyA=ya+17;
  s+=bx(XB,ya,72,"節足動物","art",B)+Tx(202,ya+48,["足に節がある・外骨格"]);
  y=after(ya,34,1);
  var yi=y,fi=["頭部、胸部、腹部","足3対、羽2対、気門"],xi=["クワガタ、ハチ、バッタ"];
  s+=bx(210,yi,58,"昆虫類","ins",B)+Tx(210,yi+48,fi)+(e?Tx(210,yi+48+14*fi.length,xi,"m"):"");
  y=after(yi,34,fi.length+(e?1:0));
  var yc=y,fc=["エラ呼吸"],xc=["カニ、エビ、ミジンコ"];
  s+=bx(210,yc,58,"甲殻類","cru",B)+Tx(210,yc+48,fc)+(e?Tx(210,yc+48+14*fc.length,xc,"m"):"");
  y=after(yc,34,fc.length+(e?1:0));
  var yo=y;
  s+=bx(210,yo,72,"その他の節足動物","oart",B)+(e?Tx(210,yo+56,["クモ、ムカデ"],"m"):"");
  y=after(yo,42,e?1:0);
  var ym=y,fm=["内臓が外とう膜で","おおわれている"],xm=["タコ、イカ、マイマイ"];
  s+=bx(XB,ym,72,"軟体動物","mol",B)+Tx(XB,ym+48,fm)+(e?Tx(XB,ym+48+14*fm.length,xm,"m"):"");
  y=after(ym,34,fm.length+(e?1:0));
  var yz=y;
  s+=bx(XB,yz,108,"その他の無セキツイ動物","oinv",B)+(e?Tx(XB,yz+56,["ミミズ、クラゲ、ヒトデ"],"m"):"");
  y=after(yz,42,e?1:0);
  var cyM=ym+17,cyZ=yz+21;
  cy2i=(cyA+cyZ)/2;
  s+=ln(174,cy2i,180,cy2i)+ln(180,cyA,180,cyZ)+ln(180,cyA,186,cyA)+ln(180,cyM,186,cyM)+ln(180,cyZ,186,cyZ);
  s+=ln(194,ya+34,194,yo+21)+ln(194,yi+17,210,yi+17)+ln(194,yc+17,210,yc+17)+ln(194,yo+21,210,yo+21);
  s+=bx(58,cy2i-17,116,"無セキツイ動物","inv",B)+Tx(58,cy2i+31,["背骨がない"]);
 }
 var cy=o.v&&o.i?(cy2v+cy2i)/2:(o.v?cy2v:cy2i);
 if(o.v&&o.i)s+=ln(48,cy,53,cy)+ln(53,cy2v,53,cy2i)+ln(53,cy2v,58,cy2v)+ln(53,cy2i,58,cy2i);
 else s+=ln(48,cy,58,cy);
 s+=bx(4,cy-17,44,"動物","animal",{});
 return {body:s,h:Math.ceil(y)}}

var LV="動物は、背骨があるセキツイ動物と、背骨がない無セキツイ動物に分かれる。",
 LV2="セキツイ動物は、魚類、両生類、ハ虫類、鳥類、ホ乳類の5つに分かれる。",
 LI="無セキツイ動物は、節足動物、軟体動物、その他の無セキツイ動物に分かれる。節足動物は、昆虫類、甲殻類、その他の節足動物に分かれる。";
function figV(B,ia,e){var r=build({v:1,i:0,e:e,B:B});return fig(r.h,"動物の分類表のセキツイ動物の部分。"+LV+LV2,r.body,ia)}
function figI(B,ia,e){var r=build({v:0,i:1,e:e,B:B});return fig(r.h,"動物の分類表の無セキツイ動物の部分。"+LI,r.body,ia)}
function figAll(B,ia,e){var r=build({v:1,i:1,e:e,B:B});return fig(r.h,"動物の分類表。"+LV+LV2+LI,r.body,ia)}

var A1={vert:"セキツイ動物",fish:"魚類",amp:"両生類",rep:"ハ虫類",bird:"鳥類",mam:"ホ乳類"};
var A2={inv:"無セキツイ動物",art:"節足動物",ins:"昆虫類",cru:"甲殻類",oart:"その他の節足動物",mol:"軟体動物",oinv:"その他の無セキツイ動物"};
var A3={};Object.keys(A1).forEach(function(k){A3[k]=A1[k]});Object.keys(A2).forEach(function(k){A3[k]=A2[k]});
function on(A){var B={};Object.keys(A).forEach(function(k){B[k]=1});return B}
var C1=["ホ乳類","魚類","セキツイ動物","鳥類","ハ虫類","両生類"];
var C2=["軟体動物","昆虫類","無セキツイ動物","その他の節足動物","節足動物","甲殻類","その他の無セキツイ動物"];
var C3=["甲殻類","ハ虫類","無セキツイ動物","魚類","その他の節足動物","セキツイ動物","軟体動物","ホ乳類","節足動物","両生類","その他の無セキツイ動物","鳥類","昆虫類"];

var ANS1='<p>背骨がある動物が<b>セキツイ動物</b>です。</p>'+
 '<p>セキツイ動物は、<b>魚類、両生類、ハ虫類、鳥類、ホ乳類</b>の5つに分かれます。</p>'+
 '<p>卵に殻がなく、一生エラ呼吸なら<b>魚類</b>、子のときはエラ呼吸で、親になると肺呼吸なら<b>両生類</b>です。</p>'+
 '<p>卵に殻があれば、体温が変わる変温動物が<b>ハ虫類</b>、体温を一定に保つ恒温動物が<b>鳥類</b>です。</p>'+
 '<p>子を母親の体内で育ててから産む(胎生)のが<b>ホ乳類</b>です。</p>';
var SOL2='<p>背骨がない動物が<b>無セキツイ動物</b>です。</p>'+
 '<p>足に節があり、体の外側が外骨格でおおわれているのが<b>節足動物</b>です。</p>'+
 '<p>節足動物は、体が頭部・胸部・腹部に分かれて足が3対ある<b>昆虫類</b>、エラ呼吸をする<b>甲殻類</b>、どちらでもない<b>その他の節足動物</b>に分かれます。</p>'+
 '<p>内臓が外とう膜でおおわれているのが<b>軟体動物</b>です。</p>'+
 '<p>節足動物と軟体動物のどちらでもない動物が、<b>その他の無セキツイ動物</b>です。</p>';

window.UNIT={
no:"1-7",title:"動物の分類",
sections:[
{type:"text",point:true,title:"厳選ポイント",html:
 '<p>動物は、次のように分類されます。</p>'+figAll({},false,true)},
{type:"problem",title:"問題",
 body:'<p>表の空欄に入る名称を、下のボタンを押して入れなさい。</p>'+
 '<p class="note">太い青の枠の空欄に入ります。別の空欄を押すと、そこに移ります。</p>',
 parts:[{type:"tree",svg:figV(on(A1),true,false),answers:A1,choices:C1}]},
{type:"answer",html:ANS1},
{type:"problem",title:"補充問題",
 body:'<p>無セキツイ動物から下の表の、空欄に入る名称を入れなさい。</p>',
 parts:[{type:"tree",svg:figI(on(A2),true,false),answers:A2,choices:C2}],
 solution:SOL2},
{type:"problem",title:"最終練習",
 body:'<p>表全体の、13個の空欄に入る名称を入れなさい。</p>',
 parts:[{type:"tree",svg:figAll(on(A3),true,false),answers:A3,choices:C3}]},
{type:"text",title:"ノートに書いてみよう",html:
 '<p>何も見ずに、ノートに動物の分類表を書いてみましょう。</p>'}
]};
})();
