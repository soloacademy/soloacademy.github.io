(function(){
var MUTED="#5d6874";
function T(x,y,size,txt,cls,anchor){return '<text x="'+x+'" y="'+y+'" font-size="'+size+'"'+(anchor?' text-anchor="'+anchor+'"':'')+(cls?' class="'+cls+'"':'')+'>'+txt+'</text>'}
function ln(x1,y1,x2,y2){return '<line x1="'+x1+'" y1="'+y1+'" x2="'+x2+'" y2="'+y2+'" stroke="'+MUTED+'" stroke-width="1.2"/>'}
/* 名称の枠。B[id] があれば空欄(青い点線の枠)。同じidの空欄は、上下の図で連動する */
function nd(cx,y,w,name,id,B){var x=cx-w/2;
 if(B&&B[id])return '<g class="bl" data-b="'+id+'"><rect x="'+x+'" y="'+y+'" width="'+w+'" height="34" rx="4"/>'+
  '<text class="bt" x="'+cx+'" y="'+(y+23)+'" font-size="14" text-anchor="middle"></text>'+
  '<text class="bm" x="'+(x+w-5)+'" y="'+(y+11)+'" font-size="12" text-anchor="end"></text></g>';
 return '<rect x="'+x+'" y="'+y+'" width="'+w+'" height="34" rx="4" fill="#fff" stroke="'+MUTED+'" stroke-width="1.2"/>'+T(cx,y+22,14,name,"b","middle")}
/* 枠の外の文字(左そろえ・小さめ)：特徴は黒、具体例は赤 */
function Ls(x,y,a,cls){return a.map(function(t,i){return '<text x="'+x+'" y="'+(y+15*i+4)+'" font-size="11"'+(cls?' class="'+cls+'"':'')+'>'+t+'</text>'}).join("")}
function fig(h,label,body,ia){return '<div class="fig"><svg viewBox="0 0 340 '+h+'" style="max-width:22rem" '+(ia?'role="group"':'role="img"')+' aria-label="'+label+'">'+body+'</svg></div>'}

/* 上の部分：植物→種子植物・胞子で増える植物→被子・裸子・シダ・コケ */
function topBody(B,e){
 return ln(175,50,175,65)+ln(93,65,257,65)+ln(93,65,93,80)+ln(257,65,257,80)+
  ln(93,114,93,132)+ln(52,132,134,132)+ln(52,132,52,150)+ln(134,132,134,150)+
  ln(257,114,257,132)+ln(216,132,298,132)+ln(216,132,216,150)+ln(298,132,298,150)+
  nd(175,16,120,"植物","r",B)+nd(93,80,150,"種子植物","s",B)+nd(257,80,150,"胞子で増える植物","sp",B)+
  nd(52,150,76,"被子植物","ang",B)+nd(134,150,76,"裸子植物","gym",B)+nd(216,150,76,"シダ植物","fern",B)+nd(298,150,76,"コケ植物","moss",B)+
  Ls(22,204,["胚珠が子房に","包まれている"])+
  Ls(104,204,["胚珠が","むき出しに","なっている"])+(e?Ls(104,258,["マツ","イチョウ","スギ"],"m"):"")+
  Ls(186,204,["根茎葉の","区別あり","地下茎"])+(e?Ls(186,258,["ゼンマイ","イヌワラビ","スギナ"],"m"):"")+
  Ls(268,204,["根茎葉の","区別なし","仮根","体の表面","から吸水","雄株と雌株"])+(e?Ls(268,303,["スギゴケ","ゼニゴケ"],"m"):"")}

/* 下の部分：被子植物の下から線を引き、右に曲がって、単子葉類(上)と双子葉類(下)。双子葉類からも右に曲がって、離弁花類(上)と合弁花類(下)。S＝線の始まり、Ym＝単子葉類の高さ */
function subBody(S,Ym,B,e){var d1=48,d2=e?114:96,Yd=Ym+d1,Yb=Ym+d1/2,Yl=Yd+48,Yg=Yd+d2,Yb2=Yd+(48+d2)/2;
 return ln(16,S,16,Yb)+ln(16,Yb,26,Yb)+ln(26,Ym,26,Yd)+ln(26,Ym,36,Ym)+ln(26,Yd,36,Yd)+
  ln(71,Yd+17,71,Yb2)+ln(71,Yb2,86,Yb2)+ln(86,Yl,86,Yg)+ln(86,Yl,98,Yl)+ln(86,Yg,98,Yg)+
  nd(71,Ym-17,70,"単子葉類","mono",B)+nd(71,Yd-17,70,"双子葉類","di",B)+nd(133,Yl-17,70,"離弁花類","li",B)+nd(133,Yg-17,70,"合弁花類","go",B)+
  Ls(114,Ym-9,["子葉が1枚、平行脈、ひげ根"])+(e?Ls(114,Ym+6,["ツユクサ、ユリ、トウモロコシ、イネ"],"m"):"")+
  Ls(114,Yd-9,["子葉が2枚、網状脈、主根と側根"])+
  Ls(176,Yl-9,["花弁が分かれている"])+(e?Ls(176,Yl+6,["サクラ、アブラナ、","マメ科、バラ科"],"m"):"")+
  Ls(176,Yg-9,["花弁がくっついている"])+(e?Ls(176,Yg+6,["タンポポ、アサガオ、ツツジ"],"m"):"")}

var LT="植物は、種子植物と胞子で増える植物に分かれる。種子植物は、胚珠が子房に包まれている被子植物と、胚珠がむき出しの裸子植物に分かれる。胞子で増える植物は、根茎葉の区別があるシダ植物と、区別がないコケ植物に分かれる。",
 LS="被子植物は、子葉が1枚で平行脈、ひげ根の単子葉類と、子葉が2枚で網状脈、主根と側根の双子葉類に分かれる。双子葉類は、花弁が分かれている離弁花類と、花弁がくっついている合弁花類に分かれる。";
function figTop(B,ia,e){return fig(e?336:300,"植物の分類表の上の部分。"+LT,topBody(B,e),ia)}
function figSub(B,ia,e){return fig(e?282:264,"植物の分類表の下の部分。"+LS,nd(52,16,76,"被子植物","ang",{})+subBody(50,90,B,e),ia)}
function figAll(B,ia,e){return fig(e?564:496,"植物の分類表。"+LT+LS,topBody(B,e)+subBody(184,e?372:322,B,e),ia)}

var A1={s:"種子植物",sp:"胞子で増える植物",ang:"被子植物",gym:"裸子植物",fern:"シダ植物",moss:"コケ植物"};
var A2={mono:"単子葉類",di:"双子葉類",li:"離弁花類",go:"合弁花類"};
var A3={};Object.keys(A1).forEach(function(k){A3[k]=A1[k]});Object.keys(A2).forEach(function(k){A3[k]=A2[k]});
function names(A){return Object.keys(A).map(function(k){return A[k]})}
var C1=["シダ植物","被子植物","胞子で増える植物","コケ植物","種子植物","裸子植物"];
var C2=["合弁花類","単子葉類","離弁花類","双子葉類"];
var C3=["離弁花類","コケ植物","被子植物","双子葉類","胞子で増える植物","裸子植物","合弁花類","種子植物","単子葉類","シダ植物"];

var ANS1='<p>種子をつくる植物が<b>種子植物</b>、胞子で増える植物が<b>胞子で増える植物</b>です。</p>'+
 '<p>種子植物は、胚珠が子房に包まれていれば<b>被子植物</b>、むき出しなら<b>裸子植物</b>です。</p>'+
 '<p>胞子で増える植物は、根・茎・葉の区別があれば<b>シダ植物</b>、なければ<b>コケ植物</b>です。</p>';
var SOL2='<p>被子植物は、子葉が1枚なら<b>単子葉類</b>、2枚なら<b>双子葉類</b>です。</p>'+
 '<p>双子葉類は、花弁が分かれていれば<b>離弁花類</b>、くっついていれば<b>合弁花類</b>です。</p>';

window.UNIT={
no:"1-6",title:"植物の分類",
sections:[
{type:"text",point:true,title:"厳選ポイント",html:
 '<p>植物は、次のように分類されます。</p>'+figAll({},false,true)},
{type:"problem",title:"問題",
 body:'<p>表の空欄に入る名称を、下のボタンを押して入れなさい。</p>'+
 '<p class="note">太い青の枠の空欄に入ります。別の空欄を押すと、そこに移ります。</p>',
 parts:[{type:"tree",svg:figTop({s:1,sp:1,ang:1,gym:1,fern:1,moss:1},true),answers:A1,choices:C1}]},
{type:"answer",html:ANS1},
{type:"problem",title:"補充問題",
 body:'<p>被子植物から下の表の、空欄に入る名称を入れなさい。</p>',
 parts:[{type:"tree",svg:figSub({mono:1,di:1,li:1,go:1},true),answers:A2,choices:C2}],
 solution:SOL2},
{type:"problem",title:"最終練習",
 body:'<p>表全体の、10個の空欄に入る名称を入れなさい。</p>',
 parts:[{type:"tree",svg:figAll({s:1,sp:1,ang:1,gym:1,fern:1,moss:1,mono:1,di:1,li:1,go:1},true),answers:A3,choices:C3}]},
{type:"text",title:"ノートに書いてみよう",html:
 '<p>何も見ずに、ノートに植物の分類表を書いてみましょう。</p>'}
]};
})();
