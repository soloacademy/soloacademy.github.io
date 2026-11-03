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
/* 枠の外の文字：特徴は黒、具体例はグレー */
function L(cx,y,a,cls){return a.map(function(t,i){return T(cx,y+17*i+4,12,t,cls,"middle")}).join("")}
function fig(h,label,body,ia){return '<div class="fig"><svg viewBox="0 0 340 '+h+'" style="max-width:22rem" '+(ia?'role="group"':'role="img"')+' aria-label="'+label+'">'+body+'</svg></div>'}

function top(B,ia){
 var s=ln(169,50,169,65)+ln(83,65,255,65)+ln(83,65,83,80)+ln(255,65,255,80)+
  ln(83,114,83,132)+ln(40,132,126,132)+ln(40,132,40,150)+ln(126,132,126,150)+
  ln(255,114,255,132)+ln(212,132,298,132)+ln(212,132,212,150)+ln(298,132,298,150)+
  nd(169,16,120,"植物","r",B)+nd(83,80,150,"種子植物","s",B)+nd(255,80,150,"胞子で増える植物","sp",B)+
  nd(40,150,80,"被子植物","ang",B)+nd(126,150,80,"裸子植物","gym",B)+nd(212,150,80,"シダ植物","fern",B)+nd(298,150,80,"コケ植物","moss",B)+
  L(40,206,["胚珠が子房に","包まれている"])+
  L(126,206,["胚珠が","むき出しに","なっている"])+L(126,266,["マツ","イチョウ","スギ","ソテツ"],"g")+
  L(212,206,["根茎葉の","区別あり","地下茎"])+L(212,266,["ゼンマイ","イヌワラビ","スギナ"],"g")+
  L(298,206,["根茎葉の","区別なし","仮根","体の表面","から吸水","雄株と雌株"])+L(298,317,["スギゴケ","ゼニゴケ"],"g");
 return fig(350,"植物の分類表の上の図。植物は、種子植物と胞子で増える植物に分かれる。種子植物は、胚珠が子房に包まれている被子植物と、胚珠がむき出しの裸子植物に分かれる。胞子で増える植物は、根茎葉の区別があるシダ植物と、区別がないコケ植物に分かれる",s,ia)}

function bottom(B,ia){
 var s=ln(169,50,169,65)+ln(83,65,255,65)+ln(83,65,83,80)+ln(255,65,255,80)+
  ln(255,184,255,194)+ln(212,194,298,194)+ln(212,194,212,208)+ln(298,194,298,208)+
  nd(169,16,120,"被子植物","ang",B)+nd(83,80,90,"単子葉類","mono",B)+nd(255,80,90,"双子葉類","di",B)+
  nd(212,208,80,"離弁花類","li",B)+nd(298,208,80,"合弁花類","go",B)+
  L(83,136,["子葉が1枚","平行脈","ひげ根"])+L(83,196,["ツユクサ","ユリ","トウモロコシ","イネ","チューリップ"],"g")+
  L(255,136,["子葉が2枚","網状脈","主根と側根"])+
  L(212,264,["花弁が","分かれている"])+L(212,307,["サクラ","アブラナ","マメ科","バラ科"],"g")+
  L(298,264,["花弁が","くっついている"])+L(298,307,["タンポポ","アサガオ","ツツジ"],"g");
 return fig(372,"植物の分類表の下の図。被子植物は、子葉が1枚で平行脈、ひげ根の単子葉類と、子葉が2枚で網状脈、主根と側根の双子葉類に分かれる。双子葉類は、花弁が分かれている離弁花類と、花弁がくっついている合弁花類に分かれる",s,ia)}

var A1={s:"種子植物",sp:"胞子で増える植物",ang:"被子植物",gym:"裸子植物",fern:"シダ植物",moss:"コケ植物"};
var A2={mono:"単子葉類",di:"双子葉類",li:"離弁花類",go:"合弁花類"};
var A3={};Object.keys(A1).forEach(function(k){A3[k]=A1[k]});Object.keys(A2).forEach(function(k){A3[k]=A2[k]});
function names(A){return Object.keys(A).map(function(k){return A[k]})}
var C1=["シダ植物","被子植物","胞子で増える植物","コケ植物","種子植物","裸子植物"];
var C2=["合弁花類","単子葉類","離弁花類","双子葉類"];
var C3=["離弁花類","コケ植物","被子植物","双子葉類","胞子で増える植物","裸子植物","合弁花類","種子植物","単子葉類","シダ植物"];

var FULL=top({})+bottom({});
var ANS1='<p>種子をつくる植物が<b>種子植物</b>、胞子で増える植物が<b>胞子で増える植物</b>です。</p>'+
 '<p>種子植物は、胚珠が子房に包まれていれば<b>被子植物</b>、むき出しなら<b>裸子植物</b>です。</p>'+
 '<p>胞子で増える植物は、根・茎・葉の区別があれば<b>シダ植物</b>、なければ<b>コケ植物</b>です。</p>';
var SOL2='<p>被子植物は、子葉が1枚なら<b>単子葉類</b>、2枚なら<b>双子葉類</b>です。</p>'+
 '<p>双子葉類は、花弁が分かれていれば<b>離弁花類</b>、くっついていれば<b>合弁花類</b>です。</p>';

window.UNIT={
no:"1-6",title:"植物の分類",
sections:[
{type:"text",point:true,title:"厳選ポイント",html:
 '<p>植物は、次のように分類されます。</p>'+top({})+
 '<p class="note">被子植物は、次の図でさらに分かれます。</p>'+bottom({})+
 '<p>分類に迷ったら、合弁花類にしましょう。</p>'},
{type:"problem",title:"問題",
 body:'<p>表の空欄に入る名称を、下のボタンを押して入れなさい。</p>'+
 '<p class="note">空欄を押してから、ボタンを押すと、その空欄に入ります。</p>',
 parts:[{type:"tree",svg:top(A1&&{s:1,sp:1,ang:1,gym:1,fern:1,moss:1},true),answers:A1,choices:C1}]},
{type:"answer",html:ANS1},
{type:"problem",title:"補充問題",
 body:'<p>被子植物から下の表の、空欄に入る名称を入れなさい。</p>',
 parts:[{type:"tree",svg:bottom({mono:1,di:1,li:1,go:1},true),answers:A2,choices:C2}],
 solution:SOL2},
{type:"problem",title:"最終練習",
 body:'<p>表全体の、10個の空欄に入る名称を入れなさい。</p>'+
 '<p class="note">被子植物は、上の図と下の図の両方にあります。どちらかに入れると、もう一方にも入ります。</p>',
 parts:[{type:"tree",svg:top({s:1,sp:1,ang:1,gym:1,fern:1,moss:1},true)+bottom({ang:1,mono:1,di:1,li:1,go:1},true),answers:A3,choices:C3}]},
{type:"text",title:"ノートに書いてみよう",html:
 '<p>何も見ずに、ノートに植物の分類表を書いてみましょう。<br>名称だけでなく、特徴と具体例も書きます。</p>'},
{type:"answer",label:"完成した分類表を見る",html:FULL+'<p>分類に迷ったら、合弁花類にしましょう。</p>'}
]};
})();
