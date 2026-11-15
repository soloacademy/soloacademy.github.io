(function(){
var BOX="#b4bbc3";
function n(v){return Math.round(v*10)/10}
var E=["H","He","Li","Be","B","C","N","O","F","Ne","Na","Mg","Al","Si","P","S","Cl","Ar","K","Ca"];
/* マスの位置(行,列)：1行目はH(左)とHe(右はし)、2行目と3行目は8個、4行目はKとCa */
function pos(z){if(z===1)return[0,0];if(z===2)return[0,7];if(z<=10)return[1,z-3];if(z<=18)return[2,z-11];return[3,z-19]}
var CW=38,PX=41.5,PY=42,X0=5,Y0=4;

/* 周期表の図：厳選ポイント(blank=false、答えを表示)と問題(blank=true、空欄)で、同じ形 */
function fig(blank){
 var s='',z,p,x,y,cx,by,id,lab;
 for(z=1;z<=20;z++){
  p=pos(z);x=X0+p[1]*PX;y=Y0+p[0]*PY;cx=x+CW/2;by=y+29;id="e"+z;
  if(blank){
   s+='<g class="bl" data-b="'+id+'"><rect x="'+n(x)+'" y="'+y+'" width="'+CW+'" height="'+CW+'" rx="4"/>'+
    '<text x="'+n(x+4)+'" y="'+(y+12)+'" font-size="10" class="g" style="stroke:none">'+z+'</text>'+
    '<text class="bt" x="'+n(cx)+'" y="'+by+'" font-size="16" text-anchor="middle"></text>'+
    '<text class="bm" x="'+n(x+CW-3)+'" y="'+(y+13)+'" font-size="13" text-anchor="end"></text></g>';
  }else{
   s+='<rect x="'+n(x)+'" y="'+y+'" width="'+CW+'" height="'+CW+'" rx="4" fill="#fff" stroke="'+BOX+'" stroke-width="1.2"/>'+
    '<text x="'+n(x+4)+'" y="'+(y+12)+'" font-size="10" class="g" style="stroke:none">'+z+'</text>'+
    '<text x="'+n(cx)+'" y="'+by+'" font-size="16" class="b" text-anchor="middle" style="stroke:none">'+E[z-1]+'</text>';
  }
 }
 if(!blank){
  /* 右下の空き(KとCaの右)に、元素名を、3つずつ3列で縦に並べる */
  [["He","ヘリウム"],["Li","リチウム"],["Be","ベリリウム"],["B","ホウ素"],["F","フッ素"],["Ne","ネオン"],["Si","ケイ素"],["P","リン"],["Ar","アルゴン"]].forEach(function(a,i){
   var c=Math.floor(i/3),r=i%3,tx=[100,184,250][c];
   s+='<text x="'+tx+'" y="'+(Y0+3*PY+10+r*12.5)+'" font-size="10" class="g" style="stroke:none"><tspan fill="#26303b" font-weight="700">'+a[0]+'</tspan> '+a[1]+'</text>'})}
 lab=blank?"周期表の図。1行目は、左のはしと右のはしの2マス。2行目と3行目は、8マスずつ。4行目は、左の2マス。各マスの左上に、原子番号1から20が書いてある。元素記号が空欄":
  "周期表の図。1行目は、左から水素H、右のはしにヘリウムHe。2行目は、左からリチウムLi、ベリリウムBe、ホウ素B、炭素C、窒素N、酸素O、フッ素F、ネオンNe。3行目は、左からナトリウムNa、マグネシウムMg、アルミニウムAl、ケイ素Si、リンP、硫黄S、塩素Cl、アルゴンAr。4行目は、左からカリウムK、カルシウムCa。各マスの左上に、原子番号が書いてある。表の右下の空きに、元素名として、He ヘリウム、Li リチウム、Be ベリリウム、B ホウ素、F フッ素、Ne ネオン、Si ケイ素、P リン、Ar アルゴンが、小さく書いてある";
 return '<div class="fig"><svg viewBox="0 0 340 172" role="img" aria-label="'+lab+'">'+s+'</svg></div>'}

/* 語呂合わせ：ことば(上)と元素記号(下)を、かたまりごとに縦にそろえる */
var GO=[["水兵","H He"],["リーベ","Li Be"],["ぼくの","B C N"],["お","O"],["船","F"],["七","Ne Na"],["曲り","Mg Al"],["シップス","Si P S"],["クラーク","Cl Ar K"],["か","Ca"]];
var GOHTML='<div class="formula" style="white-space:normal"><p class="note" style="font-size:.8rem;margin:0 0 .3rem">覚え方(語呂合わせ)</p><div style="display:flex;flex-wrap:wrap;gap:.3rem .9rem;font-size:.8rem">'+GO.map(function(c){
 return '<span style="display:inline-flex;flex-direction:column;align-items:center;line-height:1.6"><span style="color:var(--muted)">'+c[0]+'</span><b>'+c[1]+'</b></span>'}).join('')+'</div></div>';
var SM='<p class="note" style="font-size:.8rem;margin:.2rem 0">';

var POINT='<p>周期表は、元素を<b>原子番号</b>の小さい順に並べた表です。マスの左上の小さい数字が、原子番号です。</p>'+fig(false)+
 '<p class="note">縦の列は性質が似ているので、この配置のまま覚えます。</p>'+
 GOHTML;

var ANS={};E.forEach(function(f,i){ANS["e"+(i+1)]=f});
/* 語群：並びをバラバラにする */
var CH=["Ca","H","Na","B","Ar","Li","O","Mg","He","P","K","C","Cl","Be","S","N","Si","F","Al","Ne"];

window.UNIT={
no:"2-3",title:"周期表",
sections:[
{type:"text",point:true,title:"厳選ポイント",html:POINT},
{type:"problem",title:"問題",body:'<p>原子番号1〜20の元素記号を、下の語群から選んで、周期表の空欄に入れなさい。</p>',
 parts:[{type:"tree",svg:fig(true),answers:ANS,choices:CH}]}
]};
})();
