(function(){
var INK="#26303b",BLUE="#1f5fa8",RED="#c2410c",PALE="#e3edf8",PALER="#fdefe8",GR="#7f9a75",BR="#8a6a4a";
function T(x,y,size,txt,cls,anchor){return '<text x="'+x+'" y="'+y+'" font-size="'+size+'"'+(anchor?' text-anchor="'+anchor+'"':'')+(cls?' class="'+cls+'"':'')+'>'+txt+'</text>'}
/* 色つきの面の上の文字：まわりの白いふちを消す */
function TN(x,y,size,txt,cls,anchor){return '<text x="'+x+'" y="'+y+'" font-size="'+size+'" style="stroke:none"'+(anchor?' text-anchor="'+anchor+'"':'')+(cls?' class="'+cls+'"':'')+'>'+txt+'</text>'}
function svg(w,h,label,body){return '<div class="fig"><svg viewBox="0 0 '+w+' '+h+'" role="img" aria-label="'+label+'">'+body+'</svg></div>'}
function ln(x1,y1,x2,y2,k,w){return '<line x1="'+x1+'" y1="'+y1+'" x2="'+x2+'" y2="'+y2+'" stroke="'+(k||INK)+'" stroke-width="'+(w||1.2)+'" stroke-linecap="round"/>'}
function dn(x,y1,y2){return ln(x,y1,x,y2)+'<path d="M'+(x-5)+','+(y2-6)+' L'+x+','+y2+' L'+(x+5)+','+(y2-6)+'" fill="none" stroke="'+INK+'" stroke-width="1.2"/>'}
function bx(x,y,w,h,k){
 var f=k==="v"?PALE:k==="m"?PALER:"#fff",c=k==="v"?BLUE:k==="m"?RED:INK;
 return '<rect x="'+x+'" y="'+y+'" width="'+w+'" height="'+h+'" rx="6" fill="'+f+'" stroke="'+c+'" stroke-width="1.5"/>'}
/* 書き入れる場所：点線の枠 */
function dash(x,y,w,h){return '<rect x="'+x+'" y="'+y+'" width="'+w+'" height="'+h+'" rx="6" fill="#fff" stroke="#9aa5b1" stroke-width="1.2" stroke-dasharray="4 3"/>'}
/* 枠＋文字。lv が need 以上なら、点線の空欄にする */
function box(x,y,w,h,k,txt,size,lv,need){
 if(lv>=need)return dash(x,y,w,h);
 return bx(x,y,w,h,k)+TN(x+w/2,y+h/2+5,size,txt,k==="m"?"m b":k==="v"?"v b":"b","middle")}
function ft(cx,y,lines){return lines.map(function(t,i){return T(cx,y+i*16,12,t,"v","middle")}).join('')}
function ex(cx,y,names){return names.map(function(t,i){return T(cx,y+i*16,12,t,null,"middle")}).join('')}

/* 特徴の絵 */
function ovaryI(cx,cy){return '<ellipse cx="'+cx+'" cy="'+cy+'" rx="16" ry="20" fill="'+PALE+'" stroke="'+BLUE+'" stroke-width="1.5"/><circle cx="'+cx+'" cy="'+cy+'" r="5" fill="'+RED+'"/>'}
function scaleI(cx,cy){return '<path d="M'+(cx-20)+','+(cy+20)+' C'+(cx-16)+','+(cy-2)+' '+(cx-9)+','+(cy-12)+' '+cx+','+(cy-20)+' C'+(cx+9)+','+(cy-12)+' '+(cx+16)+','+(cy-2)+' '+(cx+20)+','+(cy+20)+' Z" fill="#e6e9ed" stroke="#8a949f" stroke-width="1.5"/>'+
 '<ellipse cx="'+(cx-6)+'" cy="'+(cy+4)+'" rx="4" ry="6" fill="'+RED+'"/><ellipse cx="'+(cx+6)+'" cy="'+(cy+4)+'" rx="4" ry="6" fill="'+RED+'"/>'}
function fernI(cx,cy){return '<ellipse cx="'+cx+'" cy="'+(cy-14)+'" rx="8" ry="13" fill="#d9e8cf" stroke="'+GR+'" stroke-width="1.5"/>'+
 ln(cx,cy-1,cx,cy+8,GR,3)+ln(cx,cy+8,cx-10,cy+22,BR,1.5)+ln(cx,cy+8,cx,cy+24,BR,1.5)+ln(cx,cy+8,cx+10,cy+22,BR,1.5)}
function mossI(cx,cy){return ln(cx+7,cy+4,cx+9,cy-12,GR,1.5)+'<ellipse cx="'+(cx+9)+'" cy="'+(cy-16)+'" rx="3.5" ry="5" fill="#b3a56a" stroke="#6f6535" stroke-width="1"/>'+
 '<path d="M'+(cx-20)+','+(cy+10)+' Q'+cx+','+(cy-14)+' '+(cx+20)+','+(cy+10)+' Z" fill="#d9e8cf" stroke="'+GR+'" stroke-width="1.5"/>'+
 ln(cx-9,cy+10,cx-11,cy+22,"#8a949f",1)+ln(cx,cy+10,cx,cy+24,"#8a949f",1)+ln(cx+9,cy+10,cx+11,cy+22,"#8a949f",1)}
function leafBase(cx,cy){return '<path d="M'+cx+','+(cy-24)+' C'+(cx+16)+','+(cy-10)+' '+(cx+16)+','+(cy+10)+' '+cx+','+(cy+24)+' C'+(cx-16)+','+(cy+10)+' '+(cx-16)+','+(cy-10)+' '+cx+','+(cy-24)+' Z" fill="#d9e8cf" stroke="'+GR+'" stroke-width="1.5"/>'}
function leafP(cx,cy){var s=leafBase(cx,cy);[-8,-4,0,4,8].forEach(function(d){s+=ln(cx+d,cy-14,cx+d,cy+14,GR,1)});return s}
function leafN(cx,cy){var s=leafBase(cx,cy)+ln(cx,cy-20,cx,cy+20,GR,1);[-12,0,12].forEach(function(k){s+=ln(cx,cy+k,cx-9,cy+k-9,GR,1)+ln(cx,cy+k,cx+9,cy+k-9,GR,1)});return s}
function rootF(cx,cy){var s=ln(cx,cy-24,cx,cy-10,GR,3);[-18,-11,-4,4,11,18].forEach(function(d){s+=ln(cx,cy-10,cx+d,cy+24,BR,1.2)});return s}
function rootT(cx,cy){return ln(cx,cy-24,cx,cy-10,GR,3)+ln(cx,cy-10,cx,cy+24,BR,3.5)+
 ln(cx,cy-2,cx-14,cy+8,BR,1.5)+ln(cx,cy-2,cx+14,cy+8,BR,1.5)+ln(cx,cy+10,cx-10,cy+18,BR,1.5)+ln(cx,cy+10,cx+10,cy+18,BR,1.5)}
function petalSep(cx,cy){var s='';for(var k=0;k<5;k++)s+='<ellipse cx="'+cx+'" cy="'+(cy-14)+'" rx="6" ry="11" transform="rotate('+(k*72)+' '+cx+' '+cy+')" fill="#fbe3e8" stroke="#c9929f" stroke-width="1.2"/>';
 return s+'<circle cx="'+cx+'" cy="'+cy+'" r="4" fill="#f0d57a"/>'}
function petalFus(cx,cy){return '<path d="M'+(cx-6)+','+(cy+22)+' L'+(cx-6)+','+(cy+4)+' C'+(cx-18)+','+(cy-2)+' '+(cx-22)+','+(cy-14)+' '+(cx-22)+','+(cy-20)+' L'+(cx+22)+','+(cy-20)+' C'+(cx+22)+','+(cy-14)+' '+(cx+18)+','+(cy-2)+' '+(cx+6)+','+(cy+4)+' L'+(cx+6)+','+(cy+22)+' Z" fill="#fbe3e8" stroke="#c9929f" stroke-width="1.2"/>'}

/* 表1：植物の4つのグループ。lv＝0:全部／1:例が空欄／2:グループ名も空欄／3:枠だけ */
var GA=[
 {n:"被子植物",f:["胚珠が子房に","包まれている"],e:["サクラ","タンポポ","ユリ"],i:ovaryI},
 {n:"裸子植物",f:["胚珠が","むき出し"],e:["マツ","イチョウ","スギ"],i:scaleI},
 {n:"シダ植物",f:["根・茎・葉の","区別あり","地下茎"],e:["ゼンマイ","イヌワラビ","スギナ"],i:fernI},
 {n:"コケ植物",f:["根・茎・葉の","区別なし","仮根"],e:["スギゴケ","ゼニゴケ"],i:mossI}
];
function A(lv){
 var s=box(125,4,70,26,"n","植物",14,lv,3)+ln(160,30,160,36)+ln(80,36,240,36)+dn(80,36,46)+dn(240,36,46)+
  box(10,46,140,28,"v","種子植物",14,lv,3)+box(170,46,140,28,"v","胞子で増える植物",13,lv,3)+
  ln(80,74,80,86)+ln(40,86,120,86)+dn(40,86,98)+dn(120,86,98)+
  ln(240,74,240,86)+ln(200,86,280,86)+dn(200,86,98)+dn(280,86,98);
 GA.forEach(function(g,i){
  var x=2+i*80,cx=x+38;
  s+=box(x,98,76,28,"m",g.n,13,lv,2);
  s+=lv>=3?dash(cx-38,134,76,104):g.i(cx,156)+ft(cx,198,g.f);
  s+=lv===0?ex(cx,254,g.e):dash(cx-38,240,76,50);
 });
 return svg(320,296,"植物の分類表(1)。植物は、種子植物と、胞子で増える植物に分かれる。種子植物は、胚珠が子房に包まれている被子植物と、胚珠がむき出しの裸子植物。胞子で増える植物は、根・茎・葉の区別があるシダ植物と、区別がないコケ植物",s)}

/* 表2：被子植物の分け方 */
function B(lv){
 var s=box(110,4,100,28,"m","被子植物",14,lv,3)+ln(160,32,160,44)+ln(60,44,215,44)+dn(60,44,56)+dn(215,44,56)+
  box(10,56,100,28,"m","単子葉類",14,lv,2)+box(165,56,100,28,"m","双子葉類",14,lv,2);
 if(lv>=3)s+=dash(14,96,100,100)+dash(140,96,150,100);
 else s+=leafP(32,122)+rootF(88,122)+ft(32,164,["平行脈"])+ft(88,164,["ひげ根"])+ft(60,182,["子葉が1枚"])+
  leafN(185,122)+rootT(245,122)+ft(185,164,["網状脈"])+ft(245,164,["主根と側根"])+ft(215,182,["子葉が2枚"]);
 s+=ln(215,190,215,206)+ln(165,206,265,206)+dn(165,206,218)+dn(265,206,218)+
  box(119,218,92,28,"m","離弁花類",14,lv,2)+box(219,218,92,28,"m","合弁花類",14,lv,2);
 if(lv>=3)s+=dash(119,254,92,76)+dash(219,254,92,76);
 else s+=petalSep(165,280)+petalFus(265,280)+ft(165,320,["花弁が分かれる"])+ft(265,320,["花弁がくっつく"]);
 s+=lv===0?ex(60,222,["ツユクサ","ユリ","イネ"])+ex(165,346,["サクラ","アブラナ"])+ex(265,346,["タンポポ","アサガオ","ツツジ"]):
  dash(22,206,76,56)+dash(127,332,76,56)+dash(227,332,76,56);
 return svg(320,392,"植物の分類表(2)。被子植物は、子葉が1枚で平行脈とひげ根の単子葉類と、子葉が2枚で網状脈と主根・側根の双子葉類に分かれる。双子葉類は、花弁が分かれている離弁花類と、花弁がくっついている合弁花類に分かれる",s)}

function g(n){return '<span class="m">'+n+'</span>'}

window.UNIT={
no:"1-6",title:"植物の分類",
sections:[
{type:"text",point:true,title:"厳選ポイント",html:
 '<p>植物の分類表です。何も見ずに、この表を紙に書けるようになることが、1-6の目標です。</p>'+A(0)+B(0)+
 '<p class="note">青は見るところ、赤はグループ名です。子房があるかどうかは、1-5のとおり、胚珠が子房に包まれているかどうかです。</p>'},
{type:"text",title:"練習1　例を書く",html:
 '<p>白い紙に、下の表を写します。点線の中には、例の植物を書き入れなさい。</p>'+A(1)+B(1)+
 '<p class="note">書けたら、厳選ポイントの表と見比べます。</p>'},
{type:"text",title:"練習2　グループ名を書く",html:
 '<p>特徴の絵と文字を見て、点線の中に、グループ名と例を書き入れなさい。</p>'+A(2)+B(2)+
 '<p class="note">絵が、名前を思い出す手がかりになります。</p>'},
{type:"text",title:"練習3　枠だけから書く",html:
 '<p>枠と矢印だけの表です。すべての点線の中を、思い出して書き入れなさい。</p>'+A(3)+B(3)},
{type:"text",title:"練習4　何も見ずに書く",html:
 '<p>白い紙を用意します。表を見ないで、2つの表を書きなさい。</p>'+
 '<p>書けたら、厳選ポイントの表と見比べて、まちがえたところを、赤で直します。</p>'+
 '<p class="note">1回で書けなくても大丈夫です。何回か書くうちに、手が覚えます。目安は5分です。</p>'}
]};
})();
