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
  p=pos(z);x=X0+p[1]*PX;y=Y0+p[0]*PY;cx=x+CW/2;by=y+23.5;id="e"+z;
  if(blank){
   s+='<g class="bl" data-b="'+id+'"><rect x="'+n(x)+'" y="'+y+'" width="'+CW+'" height="'+CW+'" rx="4"/>'+
    '<text x="'+n(x+4)+'" y="'+(y+34)+'" font-size="10" class="g" style="stroke:none">'+z+'</text>'+
    '<text class="bt" x="'+n(cx)+'" y="'+by+'" font-size="16" text-anchor="middle"></text>'+
    '<text class="bm" x="'+n(x+CW-3)+'" y="'+(y+13)+'" font-size="13" text-anchor="end"></text></g>';
  }else{
   s+='<rect x="'+n(x)+'" y="'+y+'" width="'+CW+'" height="'+CW+'" rx="4" fill="#fff" stroke="'+BOX+'" stroke-width="1.2"/>'+
    '<text x="'+n(x+4)+'" y="'+(y+34)+'" font-size="10" class="g" style="stroke:none">'+z+'</text>'+
    '<text x="'+n(cx)+'" y="'+by+'" font-size="16" class="b" text-anchor="middle" style="stroke:none">'+E[z-1]+'</text>';
  }
 }
 if(!blank){
  /* 右下の空き(KとCaの右)に、「参考」と元素名を並べる。上段4個・下段5個。13族(左はし)から18族(右はし)の真ん中にそろえ、上段と下段は同じ幅にする。W＝文字の幅(文字の大きさ8のとき) */
  var UP=[["He","ヘリウム",45.1],["Li","リチウム",42],["Be","ベリリウム",53.3],["B","ホウ素",32.3]],
   DN=[["F","フッ素",31.4],["Ne","ネオン",36.9],["Si","ケイ素",34.1],["P","リン",23.9],["Ar","アルゴン",43.8]],
   fs=8.5,k=fs/8,gx=6,sum=function(a){return a.reduce(function(t,c){return t+c[2]*k},0)},
   W=sum(DN)+gx*(DN.length-1),mid=(X0+2*PX+X0+7*PX+CW)/2,sx=mid-W/2,yb=Y0+3*PY;
  function row(a,y,g){var x=sx;a.forEach(function(c){
   s+='<text x="'+n(x)+'" y="'+y+'" font-size="'+fs+'" class="g" style="stroke:none"><tspan font-weight="700">'+c[0]+'</tspan> '+c[1]+'</text>';
   x+=c[2]*k+g})}
  s+='<text x="'+n(sx)+'" y="'+(yb+9)+'" font-size="'+fs+'" class="g" style="stroke:none" font-weight="700">参考</text>';
  row(UP,yb+20.5,(W-sum(UP))/(UP.length-1));
  row(DN,yb+32,gx);
 }
 lab=blank?"周期表の図。1行目は、左のはしと右のはしの2マス。2行目と3行目は、8マスずつ。4行目は、左の2マス。各マスの左下に、原子番号1から20が書いてある。元素記号が空欄":
  "周期表の図。1行目は、左から水素H、右のはしにヘリウムHe。2行目は、左からリチウムLi、ベリリウムBe、ホウ素B、炭素C、窒素N、酸素O、フッ素F、ネオンNe。3行目は、左からナトリウムNa、マグネシウムMg、アルミニウムAl、ケイ素Si、リンP、硫黄S、塩素Cl、アルゴンAr。4行目は、左からカリウムK、カルシウムCa。各マスの左下に、原子番号が書いてある。表の右下の空きに、「参考」と書いて、元素名として、He ヘリウム、Li リチウム、Be ベリリウム、B ホウ素、F フッ素、Ne ネオン、Si ケイ素、P リン、Ar アルゴンが、小さく書いてある";
 return '<div class="fig"><svg viewBox="0 0 340 172" role="img" aria-label="'+lab+'">'+s+'</svg></div>'}

/* 語呂合わせ：元素記号(青)を等間隔に並べ、その下に、対応する語呂(赤)を入れる。10個ずつ2段(Neまでと、Naから) */
var GO1=[["水兵",["H","He"]],["リーベ",["Li","Be"]],["ぼくの",["B","C","N"]],["お",["O"]],["船",["F","Ne"]]];
var GO2=[["七",["Na"]],["曲り",["Mg","Al"]],["シップス",["Si","P","S"]],["クラーク",["Cl","Ar","K"]],["か",["Ca"]]];
function goLine(a,mt){var c=1,h='<div style="display:grid;grid-template-columns:repeat(10,1fr);row-gap:0;line-height:1.4;margin:'+mt+' 0 0 1.5%;width:96.6%">';
 a.forEach(function(g){g[1].forEach(function(e,i){h+='<b class="v" style="grid-row:1;grid-column:'+(c+i)+';text-align:center;font-size:.9rem">'+e+'</b>'});
  h+='<span class="m" style="grid-row:2;grid-column:'+c+' / span '+g[1].length+';text-align:center;font-size:.8rem">'+g[0]+'</span>';c+=g[1].length});
 return h+'</div>'}
/* 周期表の図(横340、マスは左5から右333.5まで)と、左はしと右はしをそろえる。白い四角は左右の余白をなくし、中の幅を図と同じにする */
var GOHTML='<div class="formula" style="white-space:normal;padding:.6rem 0;margin-bottom:0"><div style="max-width:21rem"><p class="note" style="font-size:.8rem;line-height:1.4;margin:0 0 0 1.5%">覚え方</p>'+goLine(GO1,'.2rem')+goLine(GO2,'.5rem')+'</div></div>';
var SM='<p class="note" style="font-size:.8rem;margin:.2rem 0">';

var POINT='<p>周期表は、元素を<b>原子番号</b>の小さい順に並べた表です。マスの左下の小さい数字が、原子番号です。</p>'+fig(false)+
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
