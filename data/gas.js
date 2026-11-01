(function(){
var INK="#26303b",MUTED="#5d6874",TINT="#f4f6f8";
function T(x,y,size,txt,cls,anchor){return '<text x="'+x+'" y="'+y+'" font-size="'+size+'"'+(anchor?' text-anchor="'+anchor+'"':'')+(cls?' class="'+cls+'"':'')+'>'+txt+'</text>'}
function svg(w,h,label,body){return '<div class="fig"><svg viewBox="0 0 '+w+' '+h+'" role="img" aria-label="'+label+'">'+body+'</svg></div>'}
function line(x1,y1,x2,y2,k,w,dash){return '<line x1="'+x1+'" y1="'+y1+'" x2="'+x2+'" y2="'+y2+'" stroke="'+k+'" stroke-width="'+(w||1)+'"'+(dash?' stroke-dasharray="4 3"':'')+'/>'}
function head(d){return '<path d="'+d+'" fill="none" stroke="'+INK+'" stroke-width="1.2"/>'}

/* 表の部品：左から n 列は折り返さない */
function tbl(hd,rows,n){
 var L='style="text-align:left"',N='style="white-space:nowrap;text-align:left"';
 var h='<tr>'+hd.map(function(t,i){return '<th '+(i<n?N:L)+'>'+t+'</th>'}).join('')+'</tr>';
 var b=rows.map(function(r){return '<tr>'+r.map(function(t,i){return '<td '+(i<n?N:L)+'>'+t+'</td>'}).join('')+'</tr>'}).join('');
 return '<div style="overflow-x:auto"><table style="background:#fff">'+h+b+'</table></div>'}

/* 気体の名前のカプセル */
function chip(cx,cy,name){var w=name.length*14+16;
 return '<rect x="'+(cx-w/2)+'" y="'+(cy-12)+'" width="'+w+'" height="24" rx="12" fill="#fff" stroke="'+INK+'" stroke-width="1.2"/>'+T(cx,cy+5,14,name,"b","middle")}

/* 厳選ポイントの図：横＝水への溶けやすさ、縦＝空気と比べた重さ */
function plane(){
 var s=T(0,16,12,"空気と比べた重さ","g");
 s+='<rect x="46" y="26" width="266" height="210" fill="#fff" stroke="'+INK+'" stroke-width="1.5"/>';
 s+=line(179,26,179,236,INK,1)+line(46,131,312,131,MUTED,1,true);
 s+=T(40,52,13,"軽い","g","end")+T(40,135,13,"空気","g","end")+T(40,226,13,"重い","g","end");
 s+=T(54,228,14,"水上置換法","b")+T(304,48,14,"上方置換法","b","end")+T(304,228,14,"下方置換法","b","end");
 s+=chip(112,66,"水素")+chip(112,158,"酸素")+chip(246,100,"アンモニア")+chip(179,196,"二酸化炭素")+T(179,224,11,"少し溶ける","g","middle");
 s+=line(46,248,312,248,INK,1.2)+head("M306,243 L312,248 L306,253");
 s+=T(46,268,13,"溶けにくい","g")+T(179,268,12,"水への溶けやすさ","g","middle")+T(312,268,13,"溶けやすい","g","end");
 return svg(320,276,"気体の集め方を表す図。横は水への溶けやすさ、縦は空気と比べた重さ。水に溶けにくい酸素と水素は水上置換法。水に非常に溶けやすく空気より軽いアンモニアは上方置換法。水に溶けやすく空気より重い気体は下方置換法。二酸化炭素は少し溶けて空気より重いので、水上置換法と下方置換法のどちらでも集められる",s)}

/* 解説の図：集め方の考え方の順番 */
function box(x,y,w,h,f,sw){return '<rect x="'+x+'" y="'+y+'" width="'+w+'" height="'+h+'" rx="6" fill="'+f+'" stroke="'+INK+'" stroke-width="'+sw+'"/>'}
function flow(){
 var s=box(14,8,128,36,"#fff",1.2)+T(78,31,13,"水に溶けにくい？",null,"middle")+
  box(14,86,128,36,"#fff",1.2)+T(78,109,13,"空気より軽い？",null,"middle")+
  box(184,4,122,44,TINT,2)+T(245,24,14,"水上置換法","b","middle")+T(245,40,11,"酸素・水素","g","middle")+
  box(184,82,122,44,TINT,2)+T(245,102,14,"上方置換法","b","middle")+T(245,118,11,"アンモニア","g","middle")+
  box(14,164,128,44,TINT,2)+T(78,184,14,"下方置換法","b","middle")+T(78,200,11,"二酸化炭素","g","middle");
 s+=line(142,26,182,26,INK,1.2)+head("M176,21 L182,26 L176,31")+T(162,19,12,"はい",null,"middle");
 s+=line(142,104,182,104,INK,1.2)+head("M176,99 L182,104 L176,109")+T(162,97,12,"はい",null,"middle");
 s+=line(78,44,78,84,INK,1.2)+head("M73,78 L78,84 L83,78")+T(86,70,12,"いいえ");
 s+=line(78,122,78,162,INK,1.2)+head("M73,156 L78,162 L83,156")+T(86,148,12,"いいえ");
 return svg(320,212,"集め方の考え方の順番を表す図。水に溶けにくければ水上置換法。溶けやすければ、空気より軽いかどうかを考え、軽ければ上方置換法、重ければ下方置換法",s)}

var PLANE=plane(),FLOW=flow();

/* 気体の見分けるポイント(問題の解答と解説の最後に置く表) */
var LOOK=tbl(["気体","見分けるポイント"],[
 ["<b>酸素</b>","ものを燃やすはたらき(助燃性)がある"],
 ["<b>二酸化炭素</b>","石灰水を白くにごらせる"],
 ["<b>水素</b>","物質の中で密度が最も小さい<br>燃えると水ができる"],
 ["<b>アンモニア</b>","水に非常に溶けやすく、水溶液はアルカリ性を示す<br>特有の刺激臭がある"]
],1);

/* 補充問題の解説 */
var SOL=tbl(["","気体","見分けるポイント"],[
 ["(1)","<b>② 二酸化炭素</b>","石灰水を白くにごらせる"],
 ["(2)","<b>① 酸素</b>","ものを燃やすはたらき(助燃性)がある"],
 ["(3)","<b>④ アンモニア</b>","特有の刺激臭があり、水に非常に溶けやすい"],
 ["(4)","<b>③ 水素</b>","燃えると水ができる"]
],2)+
 '<p class="note">酸素そのものは燃えません。ほかのものを燃やすのを助けます。<br>水素は、物質の中で密度が最も小さい気体でもあります。</p>';

window.UNIT={
no:"1-2",title:"気体の性質",
sections:[
{type:"text",point:true,title:"厳選ポイント",html:
 '<p>気体の集め方は、「水への溶けやすさ」と「空気との重さ」で決まります。</p>'+PLANE+
 '<p class="note">「空気より軽い」は、「空気より密度が小さい」という意味です。</p>'},
{type:"problem",title:"問題",
 body:'<p>次の気体の集め方を、①〜③の番号で答えなさい。</p>'+
 '<p>① 水上置換法　② 上方置換法　③ 下方置換法</p>'+
 '<p>(1) 酸素<br>(2) 二酸化炭素<br>(3) 水素<br>(4) アンモニア<br>(5) 水に非常に溶けやすく、空気より重い気体</p>'+
 '<p class="note">(2)の二酸化炭素は、2つの方法があります。どちらか1つを答えれば正解です。</p>',
 parts:[
  {label:"(1)",type:"number",accept:[1],tol:0},
  {label:"(2)",type:"number",accept:[1,3],tol:0},
  {label:"(3)",type:"number",accept:[1],tol:0},
  {label:"(4)",type:"number",accept:[2],tol:0},
  {label:"(5)",type:"number",accept:[3],tol:0}
 ]},
{type:"answer",html:
 '<p>集め方は、次の順に考えます。</p>'+FLOW+
 '<p>(1) 酸素：水に溶けにくいので、<b>① 水上置換法</b>。</p>'+
 '<p>(2) 二酸化炭素：空気より重いので、<b>③ 下方置換法</b>。水に少し溶けますが、<b>① 水上置換法</b>でも集められます。</p>'+
 '<p>(3) 水素：水に溶けにくいので、<b>① 水上置換法</b>。</p>'+
 '<p>(4) アンモニア：水に非常に溶けやすいので、水上置換法は使えません。空気より軽いので、<b>② 上方置換法</b>。</p>'+
 '<p>(5) 水に溶けやすいので、水上置換法は使えません。空気より重いので、<b>③ 下方置換法</b>。</p>'+
 '<div style="border-top:1px solid var(--rule);margin-top:1.2rem;padding-top:.6rem"><p><b>気体の見分けるポイント</b>(補充問題で使います)</p>'+LOOK+'</div>'},
{type:"problem",title:"補充問題",
 body:'<p>次の(1)〜(4)の実験で調べた気体は、どれか。①〜④の番号で答えなさい。</p>'+
 '<p>① 酸素　② 二酸化炭素　③ 水素　④ アンモニア</p>'+
 '<p>(1) 気体を石灰水に通すと、白くにごった。</p>'+
 '<p>(2) 火のついた線香を入れると、炎を上げて激しく燃えた。</p>'+
 '<p>(3) 特有の刺激臭があり、水に非常によく溶けた。</p>'+
 '<p>(4) 火をつけると燃えて、容器の内側に水がついた。</p>'+
 '<p class="note">ヒント：「問題の解答と解説」の最後にある表を使います。</p>',
 parts:[
  {label:"(1)",type:"number",accept:[2],tol:0},
  {label:"(2)",type:"number",accept:[1],tol:0},
  {label:"(3)",type:"number",accept:[4],tol:0},
  {label:"(4)",type:"number",accept:[3],tol:0}
 ],
 solution:SOL}
]};
})();
