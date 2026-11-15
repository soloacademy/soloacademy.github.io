(function(){
var INK="#26303b",RULE="#c9d0d7";
function line(x1,y1,x2,y2,k,w){return '<line x1="'+x1+'" y1="'+y1+'" x2="'+x2+'" y2="'+y2+'" stroke="'+k+'" stroke-width="'+(w||1)+'"/>'}
var LB=[["水素","酸素","窒素","塩素","炭素","硫黄"],["ナトリウム","カリウム","マグネシウム","カルシウム","アルミニウム","バリウム"],["銀","銅","亜鉛","鉄","金","水銀"]];
var FM=[["H₂","O₂","N₂","Cl₂","C","S"],["Na","K","Mg","Ca","Al","Ba"],["Ag","Cu","Zn","Fe","Au","Hg"]];
var GX=[{nx:8,bx:40,bw:42},{nx:110,bx:192,bw:38},{nx:258,bx:286,bw:34}];
/* 表の図：厳選ポイント(blank=false)と問題(blank=true)で、同じ形 */
function fig(blank){
 var s=line(104,6,104,238,RULE)+line(4,42,336,42,INK)+line(4,238,336,238,RULE)+
  '<text x="54" y="18" font-size="13" class="b" text-anchor="middle">非金属</text>'+
  '<text x="54" y="34" font-size="11" class="g" text-anchor="middle">(分子をつくる)</text>'+
  '<text x="215" y="28" font-size="13" class="b" text-anchor="middle">金属<tspan class="g" font-size="11" font-weight="400">(分子をつくらない)</tspan></text>';
 GX.forEach(function(c,g){LB[g].forEach(function(nm,i){
  var yc=62+32*i,ty=(yc+4.7).toFixed(1),id="k"+(g*6+i),cx=c.bx+c.bw/2;
  s+='<text x="'+c.nx+'" y="'+ty+'" font-size="13">'+nm+'</text>';
  if(blank)s+='<g class="bl" data-b="'+id+'"><rect x="'+c.bx+'" y="'+(yc-12)+'" width="'+c.bw+'" height="24" rx="4"/>'+
   '<text class="bt" x="'+cx+'" y="'+ty+'" font-size="13" text-anchor="middle"></text>'+
   '<text class="bm" x="'+(c.bx+c.bw+3)+'" y="'+ty+'" font-size="13"></text></g>';
  else{s+='<text x="'+cx+'" y="'+ty+'" font-size="13" class="b" text-anchor="middle">'+FM[g][i].replace("₂",'<tspan class="m">₂</tspan>')+'</text>';
   if(g===0&&i>=4)s+='<text x="'+(cx+11)+'" y="'+(yc-3)+'" font-size="10" class="g">※</text>'}
 })});
 return '<div class="fig"><svg viewBox="0 0 340 244" role="img" aria-label="'+(blank?"単体の表。非金属は、水素、酸素、窒素、塩素、炭素、硫黄。金属は、ナトリウム、カリウム、マグネシウム、カルシウム、アルミニウム、バリウム、銀、銅、亜鉛、鉄、金、水銀。それぞれの化学式が空欄":"単体の表。非金属は、水素H2、酸素O2、窒素N2、塩素Cl2、炭素C、硫黄S。金属は、ナトリウムNa、カリウムK、マグネシウムMg、カルシウムCa、アルミニウムAl、バリウムBa、銀Ag、銅Cu、亜鉛Zn、鉄Fe、金Au、水銀Hg")+'">'+s+'</svg></div>'}
var TD='<td style="padding:.3rem .5rem;text-align:left">';
var T1='<div style="overflow-x:auto"><table><tr><th>名前</th><th>元素記号</th><th>化学式</th></tr>'+
 '<tr>'+TD+'水素</td>'+TD+'<b>H</b></td>'+TD+'<b>H<span class="m">₂</span></b></td></tr>'+
 '<tr>'+TD+'亜鉛</td>'+TD+'<b>Zn</b></td>'+TD+'<b>Zn</b></td></tr></table></div>';
var SM='<p class="note" style="font-size:.8rem;margin:.2rem 0">';
var POINT='<p>単体は、1種類の元素でできている物質です。</p>'+T1+
 '<p>非金属は分子をつくるので、<span class="m">2</span>がつきます。金属は分子をつくらないので、元素記号のままです。</p>'+
 fig(false)+SM+'※ 炭素(C)と硫黄(S)は非金属ですが、単体で分子をつくりません。</p>'+SM+'金属の性質：金属光沢、電気伝導性、熱伝導性、展性、延性</p>';
var ANS={};FM.forEach(function(a,g){a.forEach(function(f,i){ANS["k"+(g*6+i)]=f})});
var CH=["Cu","H₂","Na","Cl₂","Zn","C","Mg","O₂","Ag","Al","N₂","K","Fe","S","Ca","Au","Ba","Hg"];
window.UNIT={
no:"2-1",title:"元素記号と化学式(単体)",
sections:[
{type:"text",point:true,title:"厳選ポイント",html:POINT},
{type:"problem",title:"問題",body:'<p>次の単体の化学式を、下の語群から選んで、表の空欄に入れなさい。</p>',
 parts:[{type:"tree",svg:fig(true),answers:ANS,choices:CH}]}
]};
})();
