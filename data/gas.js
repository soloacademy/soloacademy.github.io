(function(){
/* 表の部品：1列目は折り返さない、2列目以降は左そろえ */
function tbl(head,rows){
 var L='style="text-align:left"',N='style="white-space:nowrap"';
 var h='<tr>'+head.map(function(t,i){return '<th'+(i?' '+L:'')+'>'+t+'</th>'}).join('')+'</tr>';
 var b=rows.map(function(r){return '<tr>'+r.map(function(t,i){return '<td '+(i?L:N)+'>'+t+'</td>'}).join('')+'</tr>'}).join('');
 return '<div style="overflow-x:auto"><table style="background:#fff">'+h+b+'</table></div>'}

/* 厳選ポイントの表：4つの気体の見分けるポイント */
var POINT=tbl(["気体","見分けるポイント"],[
 ["<b>酸素</b>","ものを燃やすはたらき(助燃性)がある"],
 ["<b>二酸化炭素</b>","石灰水を白くにごらせる"],
 ["<b>水素</b>","物質の中で密度が最も小さい<br>燃えると水ができる"],
 ["<b>アンモニア</b>","水に非常に溶けやすく、水溶液はアルカリ性を示す<br>特有の刺激臭がある"]
]);

/* 補充問題の解説：集め方 */
var WAYS=tbl(["集め方","向いている気体"],[
 ["<b>水上置換法</b>","水に溶けにくい気体"],
 ["<b>上方置換法</b>","水に溶けやすく、空気より軽い気体"],
 ["<b>下方置換法</b>","水に溶けやすく、空気より重い気体"]
]);
var SOL='<p>気体の集め方は、「水への溶けやすさ」と「空気との重さ」で決まります。</p>'+WAYS+
 '<p><b>酸素・水素</b>：水に溶けにくいので、<b>水上置換法</b>。</p>'+
 '<p><b>アンモニア</b>：水に非常に溶けやすいので、水上置換法は使えません。空気より軽いので、<b>上方置換法</b>。</p>'+
 '<p><b>二酸化炭素</b>：水に少し溶けますが、<b>水上置換法</b>で集められます。空気より重いので、<b>下方置換法</b>でも集められます。</p>'+
 '<p class="note">「空気より軽い」は、「空気より密度が小さい」という意味です。</p>';

window.UNIT={
no:"1-2",title:"気体の性質",
sections:[
{type:"text",point:true,title:"厳選ポイント",html:
 '<p>4つの気体を、「見分けるポイント」で区別します。</p>'+POINT},
{type:"problem",title:"問題",
 body:'<p>次の(1)〜(4)の実験で調べた気体は、どれか。①〜④の番号で答えなさい。</p>'+
 '<p>① 酸素　② 二酸化炭素　③ 水素　④ アンモニア</p>'+
 '<p>(1) 気体を石灰水に通すと、白くにごった。</p>'+
 '<p>(2) 火のついた線香を入れると、炎を上げて激しく燃えた。</p>'+
 '<p>(3) 特有の刺激臭があり、水に非常によく溶けた。</p>'+
 '<p>(4) 火をつけると燃えて、容器の内側に水がついた。</p>',
 parts:[
  {label:"(1)",type:"number",accept:[2],tol:0},
  {label:"(2)",type:"number",accept:[1],tol:0},
  {label:"(3)",type:"number",accept:[4],tol:0},
  {label:"(4)",type:"number",accept:[3],tol:0}
 ]},
{type:"answer",html:
 '<p>(1) 石灰水を白くにごらせるのは、<b>② 二酸化炭素</b>。</p>'+
 '<p>(2) ものを燃やすはたらき(助燃性)があるのは、<b>① 酸素</b>。<br><span class="note">酸素そのものは燃えません。ほかのものを燃やすのを助けます。</span></p>'+
 '<p>(3) 刺激臭があり、水に非常に溶けやすいのは、<b>④ アンモニア</b>。</p>'+
 '<p>(4) 燃えると水ができるのは、<b>③ 水素</b>。<br><span class="note">水素は、物質の中で密度が最も小さい気体でもあります。</span></p>'},
{type:"problem",title:"補充問題",
 body:'<p>酸素、二酸化炭素、水素、アンモニアの集め方を、それぞれ選びなさい。</p>'+
 '<p>① 水上置換法　② 上方置換法　③ 下方置換法</p>'+
 '<p class="note">二酸化炭素は、2つの方法があります。どちらか1つを答えれば正解です。</p>',
 parts:[
  {label:"酸素",type:"number",accept:[1],tol:0},
  {label:"二酸化炭素",type:"number",accept:[1,3],tol:0},
  {label:"水素",type:"number",accept:[1],tol:0},
  {label:"アンモニア",type:"number",accept:[2],tol:0}
 ],
 solution:SOL}
]};
})();
