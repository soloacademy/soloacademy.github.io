(function(){
var INK="#26303b",MUTED="#5d6874",TINT="#f4f6f8",BLUE="#1f5fa8",PALE="#e3edf8";
function T(x,y,size,txt,cls,anchor){return '<text x="'+x+'" y="'+y+'" font-size="'+size+'"'+(anchor?' text-anchor="'+anchor+'"':'')+(cls?' class="'+cls+'"':'')+'>'+txt+'</text>'}
/* 色つきの面の上の文字：まわりの白いふちを消す */
function TN(x,y,size,txt,cls,anchor){return '<text x="'+x+'" y="'+y+'" font-size="'+size+'" style="stroke:none"'+(anchor?' text-anchor="'+anchor+'"':'')+(cls?' class="'+cls+'"':'')+'>'+txt+'</text>'}
function svg(w,h,label,body){return '<div class="fig"><svg viewBox="0 0 '+w+' '+h+'" role="img" aria-label="'+label+'">'+body+'</svg></div>'}
function line(x1,y1,x2,y2,k,w,dash){return '<line x1="'+x1+'" y1="'+y1+'" x2="'+x2+'" y2="'+y2+'" stroke="'+k+'" stroke-width="'+(w||1)+'"'+(dash?' stroke-dasharray="4 3"':'')+'/>'}
function head(d){return '<path d="'+d+'" fill="none" stroke="'+INK+'" stroke-width="1.2"/>'}

/* 気体の名前は青：文章用(g)と太字(gb) */
function g(n){return '<span class="v">'+n+'</span>'}
function gb(n){return '<b class="v">'+n+'</b>'}

/* 表の部品：左から n 列は折り返さない */
function tbl(hd,rows,n){
 var L='style="text-align:left"',N='style="white-space:nowrap;text-align:left"';
 var h='<tr>'+hd.map(function(t,i){return '<th '+(i<n?N:L)+'>'+t+'</th>'}).join('')+'</tr>';
 var b=rows.map(function(r){return '<tr>'+r.map(function(t,i){return '<td '+(i<n?N:L)+'>'+t+'</td>'}).join('')+'</tr>'}).join('');
 return '<div style="overflow-x:auto"><table style="background:#fff">'+h+b+'</table></div>'}

/* 気体の名前のカプセル(青) */
function chip(cx,cy,name){var w=name.length*14+16;
 return '<rect x="'+(cx-w/2)+'" y="'+(cy-12)+'" width="'+w+'" height="24" rx="12" fill="'+PALE+'" stroke="'+BLUE+'" stroke-width="1.2"/>'+TN(cx,cy+5,14,name,"v b","middle")}

/* 厳選ポイントの図：横＝水への溶けやすさ、縦＝空気と比べた重さ
   縦の位置は、空気を1としたときの密度の比に合わせる(1.0＝92px、空気の線はy=136)
   水素0.07→50　アンモニア0.60→99　酸素1.11→146(枠が線に重ならないよう148)　二酸化炭素1.53→185 */
function plane(){
 var s='<rect x="46" y="26" width="266" height="210" fill="#fff" stroke="'+INK+'" stroke-width="1.5"/>';
 s+=line(179,26,179,236,INK,1)+line(46,136,312,136,MUTED,1,true);
 s+=T(40,55,13,"軽い","g","end")+T(40,140,13,"空気","g","end")+T(40,226,13,"重い","g","end");
 s+=T(54,228,14,"水上置換法","b")+T(304,48,14,"上方置換法","b","end")+T(304,228,14,"下方置換法","b","end");
 s+=chip(112,50,"水素")+chip(246,99,"アンモニア")+chip(112,148,"酸素")+chip(179,185,"二酸化炭素")+T(179,214,11,"少し溶ける","g","middle");
 s+=line(46,248,312,248,INK,1.2)+head("M306,243 L312,248 L306,253");
 s+=T(46,268,13,"水に溶けにくい","g")+T(312,268,13,"水に溶けやすい","g","end");
 return svg(320,262,"気体の集め方を表す図。横は水への溶けやすさ、縦は空気と比べた重さ。水に溶けにくい酸素と水素は水上置換法。水に非常に溶けやすく空気より軽いアンモニアは上方置換法。水に溶けやすく空気より重い気体は下方置換法。二酸化炭素は少し溶けて空気より重いので、水上置換法と下方置換法のどちらでも集められる",'<g transform="translate(0,-14)">'+s+'</g>')}

/* 解説の図：集め方の考え方の順番 */
function box(x,y,w,h,f,sw){return '<rect x="'+x+'" y="'+y+'" width="'+w+'" height="'+h+'" rx="6" fill="'+f+'" stroke="'+INK+'" stroke-width="'+sw+'"/>'}
function flow(){
 var s=box(6,8,116,36,"#fff",1.2)+T(64,31,13,"水に溶けにくい？",null,"middle")+
  box(6,86,116,36,"#fff",1.2)+T(64,109,13,"空気より軽い？",null,"middle")+
  box(150,4,164,44,TINT,2)+TN(232,24,14,"水上置換法","b","middle")+TN(232,40,11,"酸素・水素・(二酸化炭素)","v","middle")+
  box(150,82,164,44,TINT,2)+TN(232,102,14,"上方置換法","b","middle")+TN(232,118,11,"アンモニア","v","middle")+
  box(6,164,116,44,TINT,2)+TN(64,184,14,"下方置換法","b","middle")+TN(64,200,11,"二酸化炭素","v","middle");
 s+=line(122,26,148,26,INK,1.2)+head("M142,21 L148,26 L142,31")+T(135,19,12,"はい",null,"middle");
 s+=line(122,104,148,104,INK,1.2)+head("M142,99 L148,104 L142,109")+T(135,97,12,"はい",null,"middle");
 s+=line(64,44,64,84,INK,1.2)+head("M59,78 L64,84 L69,78")+T(72,70,12,"いいえ");
 s+=line(64,122,64,162,INK,1.2)+head("M59,156 L64,162 L69,156")+T(72,148,12,"いいえ");
 return svg(320,212,"集め方の考え方の順番を表す図。水に溶けにくければ水上置換法。溶けやすければ、空気より軽いかどうかを考え、軽ければ上方置換法、重ければ下方置換法",s)}

/* 厳選ポイントの最初の図：3つの集め方を横一列に(上＝水上置換法、上方置換法、下方置換法) */
function methods(){
 var K='fill="none" stroke="'+INK+'" stroke-width="1.5" stroke-linejoin="round" stroke-linecap="round"';
 function dots(a){return a.map(function(p){return '<circle cx="'+p[0]+'" cy="'+p[1]+'" r="2.5" fill="'+BLUE+'"/>'}).join('')}
 function P(x,b,n){return '<g transform="translate('+x+',0)">'+b+T(55,148,13,n,"b","middle")+'</g>'}
 var a='<rect x="8" y="84" width="92" height="40" fill="'+PALE+'"/><rect x="30" y="58" width="30" height="26" fill="'+PALE+'"/>'+
  line(8,84,30,84,BLUE,1)+line(60,84,100,84,BLUE,1)+line(30,58,60,58,BLUE,1)+
  '<path d="M8,70 V124 H100 V70" '+K+'/><path d="M30,104 V38 Q30,24 45,24 Q60,24 60,38 V104" '+K+'/><path d="M108,40 L66,116 L46,100" '+K+'/>'+
  '<g fill="none" stroke="'+INK+'" stroke-width="1"><circle cx="46" cy="92" r="2"/><circle cx="44" cy="84" r="2.5"/></g>'+
  dots([[38,42],[53,42],[45,34],[39,52],[52,52]]);
 var b='<path d="M30,104 V38 Q30,24 45,24 Q60,24 60,38 V104" '+K+'/><path d="M104,118 H45 V34" '+K+'/>'+
  dots([[36,42],[54,42],[36,54],[54,54],[37,66],[54,66]]);
 var c='<path d="M30,28 V110 Q30,124 45,124 Q60,124 60,110 V28" '+K+'/><path d="M104,16 H45 V114" '+K+'/>'+
  dots([[36,104],[54,104],[36,92],[54,92],[36,80],[54,80]]);
 return svg(330,156,"3つの気体の集め方の図。左の水上置換法は、水を満たした容器を水そうに逆さに立て、水と入れ替えて気体を集める。中央の上方置換法は、容器を逆さにして、下から入れた気体を上にためる。右の下方置換法は、容器を立てて、上から入れた気体を底にためる",
  P(0,a,"水上置換法")+P(110,b,"上方置換法")+P(220,c,"下方置換法"))}

var PLANE=plane(),FLOW=flow(),METH=methods();
var W=["水上置換法","上方置換法","下方置換法"],GAS=["酸素","二酸化炭素","水素","アンモニア"];

/* 補充問題の解説 */
var SOL=tbl(["","気体","見分けるポイント"],[
 ["(1)",gb("二酸化炭素"),"石灰水を白くにごらせる"],
 ["(2)",gb("酸素"),"ものを燃やすはたらき(助燃性)がある"],
 ["(3)",gb("アンモニア"),"特有の刺激臭があり、水に非常に溶けやすい"],
 ["(4)",gb("水素"),"燃えると水ができる"]
],2)+
 '<p class="note">'+g("酸素")+'そのものは燃えません。ほかのものを燃やすのを助けます。</p>';

window.UNIT={
no:"1-2",title:"気体の性質",
sections:[
{type:"text",point:true,title:"厳選ポイント",html:
 METH+'<p>気体の集め方は、「水への溶けやすさ」と「空気との重さ」で決まります。</p>'+PLANE+
 '<p class="note">「空気より軽い」は、「空気より密度が小さい」という意味です。</p>'},
{type:"problem",title:"問題",
 body:'<p>次の気体の集め方を、それぞれ選びなさい。</p>'+
 '<p class="note">'+g("二酸化炭素")+'は、2つの方法があります。どちらか1つを選べば正解です。</p>',
 parts:[
  {label:"(1) "+g("酸素"),type:"choice",choices:W,accept:["水上置換法"]},
  {label:"(2) "+g("二酸化炭素"),type:"choice",choices:W,accept:["水上置換法","下方置換法"]},
  {label:"(3) "+g("水素"),type:"choice",choices:W,accept:["水上置換法"]},
  {label:"(4) "+g("アンモニア"),type:"choice",choices:W,accept:["上方置換法"]}
 ]},
{type:"answer",html:
 '<p>集め方は、次の順に考えます。</p>'+FLOW+
 '<p>(1) '+gb("酸素")+'：水に溶けにくい → <b>水上置換法</b></p>'+
 '<p>(2) '+gb("二酸化炭素")+'：空気より重い → <b>下方置換法</b><br>水に少し溶けるので、<b>水上置換法</b>でも集められます。</p>'+
 '<p>(3) '+gb("水素")+'：水に溶けにくい → <b>水上置換法</b></p>'+
 '<p>(4) '+gb("アンモニア")+'：水に非常に溶けやすい、空気より軽い → <b>上方置換法</b></p>'},
{type:"problem",title:"補充問題",
 body:'<p>次の(1)〜(4)の実験で調べた気体は、どれか。選びなさい。</p>'+
 '<p>(1) 気体を石灰水に通すと、白くにごった。</p>'+
 '<p>(2) 火のついた線香を入れると、炎を上げて激しく燃えた。</p>'+
 '<p>(3) 特有の刺激臭があり、水に非常によく溶けた。</p>'+
 '<p>(4) 火をつけると燃えて、容器の内側に水がついた。</p>',
 parts:[
  {label:"(1)",type:"choice",choices:GAS,accept:["二酸化炭素"]},
  {label:"(2)",type:"choice",choices:GAS,accept:["酸素"]},
  {label:"(3)",type:"choice",choices:GAS,accept:["アンモニア"]},
  {label:"(4)",type:"choice",choices:GAS,accept:["水素"]}
 ],
 solution:SOL}
]};
})();
