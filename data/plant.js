(function(){
var INK="#26303b",BLUE="#1f5fa8",RED="#c2410c",PALE="#e3edf8",PALER="#fdefe8";
function T(x,y,size,txt,cls,anchor){return '<text x="'+x+'" y="'+y+'" font-size="'+size+'"'+(anchor?' text-anchor="'+anchor+'"':'')+(cls?' class="'+cls+'"':'')+'>'+txt+'</text>'}
/* 色つきの面の上の文字：まわりの白いふちを消す */
function TN(x,y,size,txt,cls,anchor){return '<text x="'+x+'" y="'+y+'" font-size="'+size+'" style="stroke:none"'+(anchor?' text-anchor="'+anchor+'"':'')+(cls?' class="'+cls+'"':'')+'>'+txt+'</text>'}
function svg(w,h,label,body){return '<div class="fig"><svg viewBox="0 0 '+w+' '+h+'" role="img" aria-label="'+label+'">'+body+'</svg></div>'}
function line(x1,y1,x2,y2){return '<line x1="'+x1+'" y1="'+y1+'" x2="'+x2+'" y2="'+y2+'" stroke="'+INK+'" stroke-width="1.2"/>'}
function dn(x,y1,y2){return line(x,y1,x,y2)+'<path d="M'+(x-5)+','+(y2-6)+' L'+x+','+y2+' L'+(x+5)+','+(y2-6)+'" fill="none" stroke="'+INK+'" stroke-width="1.2"/>'}
/* 枠：v＝青(見るところ)、m＝赤(グループ名)、w＝白に赤ふち(問題の空欄) */
function bx(x,y,w,h,k){
 var f=k==="v"?PALE:k==="m"?PALER:"#fff",c=k==="v"?BLUE:RED;
 return '<rect x="'+x+'" y="'+y+'" width="'+w+'" height="'+h+'" rx="6" fill="'+f+'" stroke="'+c+'" stroke-width="1.5"/>'}

/* 分類の流れ図。quiz＝false：グループ名と例を出す／true：グループ名を①〜④にして、例を消す */
var GROUPS=[
 ["被子植物",["サクラ","タンポポ","ユリ"]],
 ["裸子植物",["マツ","イチョウ","スギ"]],
 ["シダ植物",["ゼンマイ","イヌワラビ","スギナ"]],
 ["コケ植物",["スギゴケ","ゼニゴケ"]]
];
var NUM=["①","②","③","④"];
function flow(quiz){
 var s=bx(90,4,140,36,"v")+TN(160,27,14,"種子で増える？","v b","middle")+
  line(160,40,160,60)+line(80,60,240,60)+dn(80,60,84)+dn(240,60,84)+
  T(74,77,12,"はい",null,"end")+T(234,77,12,"いいえ",null,"end")+
  bx(10,84,140,36,"v")+TN(80,107,13,"子房がある？","v b","middle")+
  bx(170,84,140,36,"v")+TN(240,107,13,"根茎葉の区別がある？","v b","middle")+
  line(80,120,80,138)+line(40,138,120,138)+dn(40,138,160)+dn(120,138,160)+
  line(240,120,240,138)+line(200,138,280,138)+dn(200,138,160)+dn(280,138,160)+
  T(34,154,12,"はい",null,"end")+T(114,154,12,"いいえ",null,"end")+
  T(194,154,12,"はい",null,"end")+T(274,154,12,"いいえ",null,"end");
 GROUPS.forEach(function(g,i){
  var x=2+i*80,cx=x+38;
  if(quiz){s+=bx(x,160,76,32,"w")+TN(cx,183,18,NUM[i],"m b","middle")}
  else{
   s+=bx(x,160,76,32,"m")+TN(cx,181,14,g[0],"m b","middle");
   g[1].forEach(function(n,j){s+=T(cx,212+j*16,12,n,null,"middle")});
  }
 });
 return quiz?
  svg(320,200,"分類の流れ図の問題。種子で増えるかを見て、はいなら子房があるかを見る。子房があれば①、なければ②。いいえなら根茎葉の区別があるかを見る。あれば③、なければ④。①から④が答える欄",s):
  svg(320,252,"植物の分類の流れ図。種子で増えるかを見て、はいなら子房があるかを見る。子房があれば被子植物(サクラ、タンポポ、ユリ)、なければ裸子植物(マツ、イチョウ、スギ)。いいえなら根茎葉の区別があるかを見る。あればシダ植物(ゼンマイ、イヌワラビ、スギナ)、なければコケ植物(スギゴケ、ゼニゴケ)",s)}

function tbl(hd,rows){
 var L='style="text-align:left"',N='style="white-space:nowrap;text-align:left"';
 return '<div style="overflow-x:auto"><table style="background:#fff"><tr>'+hd.map(function(t,i){return '<th '+(i?L:N)+'>'+t+'</th>'}).join('')+'</tr>'+
  rows.map(function(r){return '<tr>'+r.map(function(t,i){return '<td '+(i?L:N)+'>'+t+'</td>'}).join('')+'</tr>'}).join('')+'</table></div>'}

/* 見るところは青(v)、グループ名は赤(m) */
function v(n){return '<span class="v">'+n+'</span>'}
function m(n){return '<b class="m">'+n+'</b>'}

var G4=["シダ植物","被子植物","コケ植物","裸子植物"];
var G3=["単子葉類","離弁花類","合弁花類"];

/* 問題の解答と解説の最後に置く表(補充問題で使う) */
var KIND=tbl(["","特徴","例"],[
 [m("単子葉類"),"子葉が1枚<br>平行脈、ひげ根","ツユクサ、ユリ、イネ"],
 [m("離弁花類"),"子葉が2枚<br>網状脈、主根と側根<br>花弁が1枚ずつ分かれている","サクラ、アブラナ"],
 [m("合弁花類"),"子葉が2枚<br>網状脈、主根と側根<br>花弁がくっついている","タンポポ、アサガオ、ツツジ"]
]);

var SOL2='<p>(1) 子葉が2枚で、花弁が分かれているので、'+m("離弁花類")+'。</p>'+
 '<p>(2) 平行脈とひげ根は、'+m("単子葉類")+'の特徴です。</p>'+
 '<p>(3) 子葉が2枚で、花弁がくっついているので、'+m("合弁花類")+'。</p>'+
 '<p>(4) 子葉が1枚なので、'+m("単子葉類")+'。</p>'+
 '<p class="note">子葉が2枚の植物は、双子葉類です。双子葉類は、花弁のようすで、離弁花類と合弁花類に分かれます。単子葉類は、花弁では分けません。</p>';

window.UNIT={
no:"1-6",title:"植物の分類",
sections:[
{type:"text",point:true,title:"厳選ポイント",html:
 '<p>植物は、'+v("種子")+'・'+v("子房")+'・'+v("根茎葉の区別")+'を順に見て、4つのグループに分けます。</p>'+flow(false)+
 '<p class="note">種子で増えない植物は、胞子で増えます。子房があるのは、胚珠が子房に包まれている被子植物だけです(1-5)。</p>'},
{type:"problem",title:"問題",
 body:'<p>図の①〜④に入るグループを、それぞれ選びなさい。</p>'+flow(true),
 parts:[
  {label:"(1) ①",type:"choice",choices:G4,accept:["被子植物"]},
  {label:"(2) ②",type:"choice",choices:G4,accept:["裸子植物"]},
  {label:"(3) ③",type:"choice",choices:G4,accept:["シダ植物"]},
  {label:"(4) ④",type:"choice",choices:G4,accept:["コケ植物"]}
 ]},
{type:"answer",html:
 '<p>(1) ① '+m("被子植物")+'：'+v("種子")+'で増え、'+v("子房")+'がある。</p>'+
 '<p>(2) ② '+m("裸子植物")+'：'+v("種子")+'で増え、'+v("子房")+'がない(胚珠がむき出し)。</p>'+
 '<p>(3) ③ '+m("シダ植物")+'：種子で増えず、'+v("根茎葉の区別")+'がある。</p>'+
 '<p>(4) ④ '+m("コケ植物")+'：種子で増えず、'+v("根茎葉の区別")+'がない。</p>'+
 '<p class="note">スギ、スギナ、スギゴケは、名前が似ていますが、順に裸子植物、シダ植物、コケ植物です。名前ではなく、見るところで分けます。</p>'+
 '<div style="border-top:1px solid var(--rule);margin-top:1.2rem;padding-top:.6rem"><p><b>被子植物の分け方</b>(補充問題で使います)</p>'+KIND+'</div>'},
{type:"problem",title:"補充問題",
 body:'<p>次の(1)〜(4)の特徴をもつ被子植物は、どのグループか。選びなさい。</p>'+
 '<p>(1) 子葉が2枚で、花弁が1枚ずつ分かれている。</p>'+
 '<p>(2) 葉脈が平行で、根はひげ根である。</p>'+
 '<p>(3) 子葉が2枚で、花弁がくっついている。</p>'+
 '<p>(4) 子葉が1枚である。</p>'+
 '<p class="note">ヒント：「問題の解答と解説」の最後にある表を使います。</p>',
 parts:[
  {label:"(1)",type:"choice",choices:G3,accept:["離弁花類"]},
  {label:"(2)",type:"choice",choices:G3,accept:["単子葉類"]},
  {label:"(3)",type:"choice",choices:G3,accept:["合弁花類"]},
  {label:"(4)",type:"choice",choices:G3,accept:["単子葉類"]}
 ],
 solution:SOL2}
]};
})();
