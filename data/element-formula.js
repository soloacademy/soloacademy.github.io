(function(){
var S='<span class="m">₂</span>';
/* [名前, 表に出す化学式, 答え(化学式), 答え(元素記号)] */
var NM=[["水素","H"+S,"H2","H"],["酸素","O"+S,"O2","O"],["塩素","Cl"+S,"Cl2","Cl"],["窒素","N"+S,"N2","N"],["炭素","C","C","C"],["硫黄","S","S","S"]];
var MT=[["ナトリウム","Na"],["カリウム","K"],["マグネシウム","Mg"],["カルシウム","Ca"],["アルミニウム","Al"],["バリウム","Ba"],["銀","Ag"],["銅","Cu"],["亜鉛","Zn"],["鉄","Fe"],["金","Au"],["水銀","Hg"]];
var TD='<td style="padding:.3rem .5rem;text-align:left">';
function c(n,f){return TD+n+'</td>'+TD+'<b>'+f+'</b></td>'}
function tb(rows){return '<div style="overflow-x:auto"><table>'+rows.map(function(r){return '<tr>'+r+'</tr>'}).join('')+'</table></div>'}
var T1=tb(['<th>名前</th><th>元素記号</th><th>化学式</th>',
 TD+'水素</td>'+TD+'<b>H</b></td>'+TD+'<b>H'+S+'</b></td>',
 TD+'亜鉛</td>'+TD+'<b>Zn</b></td>'+TD+'<b>Zn</b></td>']);
var T2=tb([c("水素",NM[0][1])+c("酸素",NM[1][1]),c("塩素",NM[2][1])+c("窒素",NM[3][1]),c("炭素※","C")+c("硫黄※","S")]);
var T3=tb([0,1,2,3,4,5].map(function(i){return c(MT[i][0],MT[i][1])+c(MT[i+6][0],MT[i+6][1])}));
var POINT='<p>単体は、1種類の元素でできている物質です。</p>'+T1+
 '<p>非金属は分子をつくるので、<span class="m">2</span>がつきます。金属は分子をつくらないので、元素記号のままです。</p>'+
 '<p><b>非金属(分子をつくる)</b></p>'+T2+
 '<p class="note">※ 炭素(C)と硫黄(S)は非金属ですが、単体で分子をつくりません。</p>'+
 '<p><b>金属(分子をつくらない)</b></p>'+T3+
 '<p class="note">金属の性質：金属光沢、電気伝導性、熱伝導性、展性、延性</p>';
var ST='<style>.problem .part>span:first-child{min-width:7em}</style>';
var P1=NM.map(function(a){return {label:a[0],type:"text",accept:[a[2]]}}).concat(MT.map(function(a){return {label:a[0],type:"text",accept:[a[1]]}}));
var P2=NM.map(function(a){return {label:a[0],type:"text",accept:[a[3]]}}).concat(MT.map(function(a){return {label:a[0],type:"text",accept:[a[1]]}}));
window.UNIT={
no:"2-1",title:"元素記号と化学式(単体)",
sections:[
{type:"text",point:true,title:"厳選ポイント",html:POINT},
{type:"problem",title:"問題",body:ST+'<p>次の単体の化学式を答えなさい。</p><p class="note">H₂ は「H2」と打ちます。大文字・小文字は区別しません。</p>',parts:P1},
{type:"problem",title:"補充問題",body:ST+'<p>次の物質の元素記号を答えなさい。</p>',parts:P2}
]};
})();
