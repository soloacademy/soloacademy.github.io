(function(){
var INK="#26303b",BLUE="#1f5fa8",RED="#c2410c",GRAY="#8a949f",MUTED="#5d6874",FILL="#e6e9ed";
function n(v){return Math.round(v*10)/10}
function T(x,y,size,txt,cls,anchor){return '<text x="'+n(x)+'" y="'+n(y)+'" font-size="'+size+'"'+(anchor?' text-anchor="'+anchor+'"':'')+(cls?' class="'+cls+'"':'')+'>'+txt+'</text>'}
/* 色つきの面の上の文字：まわりの白いふちを消す */
function TN(x,y,size,txt,cls,anchor){return '<text x="'+n(x)+'" y="'+n(y)+'" font-size="'+size+'" style="stroke:none"'+(anchor?' text-anchor="'+anchor+'"':'')+(cls?' class="'+cls+'"':'')+'>'+txt+'</text>'}
function svg(w,h,label,body){return '<div class="fig"><svg viewBox="0 0 '+w+' '+h+'" role="img" aria-label="'+label+'">'+body+'</svg></div>'}
function line(x1,y1,x2,y2,k,w){return '<line x1="'+n(x1)+'" y1="'+n(y1)+'" x2="'+n(x2)+'" y2="'+n(y2)+'" stroke="'+k+'" stroke-width="'+(w||1)+'"/>'}
/* 力の矢印：(x1,y1)から(x2,y2)へ。先は(x2,y2) */
function arrow(x1,y1,x2,y2,k){
 var a=Math.atan2(y2-y1,x2-x1),L=11,H=6,bx=x2-L*Math.cos(a),by=y2-L*Math.sin(a),sn=Math.sin(a),cs=Math.cos(a);
 return line(x1,y1,bx,by,k,3)+'<polygon points="'+n(x2)+','+n(y2)+' '+n(bx-H*sn)+','+n(by+H*cs)+' '+n(bx+H*sn)+','+n(by-H*cs)+'" fill="'+k+'"/>'}
function sp(c,t){return '<tspan class="'+c+' b">'+t+'</tspan>'}
function L2(x,y,a,b,e){var an=e?"end":null;return T(x,y,14,a,null,an)+T(x,y+16,14,b,null,an)}

/* つるしたおもり。ar＝力の矢印と文字を描く、nm＝①〜⑤の番号を付ける。ひもを＝赤、おもりを＝青、天井を＝灰色
   矢印は、力がはたらく点から出す：接している力は、接している点(ひもの両端)から。重力は、おもりの中心から */
function hang(ar,nm,label){
 function N(c){return nm?c+" ":""}
 var s='<rect x="20" y="40" width="300" height="18" fill="'+FILL+'" stroke="'+GRAY+'" stroke-width="1"/>'+TN(312,54,13,"天井","g","end")+
  line(140,58,140,220,"#b4bbc3",1.5)+
  '<rect x="105" y="220" width="70" height="90" fill="'+FILL+'" stroke="'+GRAY+'" stroke-width="1"/>'+
  T(132,142,13,"ひも","g","end")+T(97,270,13,"おもり","g","end");
 if(ar){
  s+=arrow(140,58,140,26,RED)+arrow(140,58,140,90,MUTED)+arrow(140,220,140,252,RED)+arrow(140,220,140,180,BLUE)+arrow(140,265,140,305,BLUE)+
   L2(152,18,N("①")+"天井が",sp("m","ひもを")+"引く力")+
   L2(152,82,N("②")+"ひもが",sp("g","天井を")+"引く力")+
   L2(152,194,N("③")+"ひもが",sp("v","おもりを")+"引く力")+
   L2(188,236,N("④")+"おもりが",sp("m","ひもを")+"引く力")+
   L2(188,272,N("⑤")+"地球が",sp("v","おもりを")+"引く力(重力)")}
 return svg(340,330,label,s)}

/* 机の上の物体。机を＝赤、物体を＝青。③は物体の下面、①は机の上面、②(重力)は物体の中心から */
function desk(ar,label){
 var s='<rect x="20" y="200" width="300" height="50" fill="'+FILL+'" stroke="'+GRAY+'" stroke-width="1"/>'+TN(28,222,13,"机","g")+
  '<rect x="130" y="140" width="80" height="60" fill="#cfd5db" stroke="'+GRAY+'" stroke-width="1"/>'+TN(204,158,13,"物体","g","end");
 if(ar){
  s+=arrow(150,200,150,160,BLUE)+arrow(170,170,170,210,BLUE)+arrow(190,200,190,240,RED)+
   L2(120,168,"③ 机が",sp("v","物体を")+"押す力",1)+
   T(222,164,14,"② 地球が")+T(222,180,14,sp("v","物体を")+"引く力")+T(222,196,14,"(重力)")+
   T(202,222,14,"① 物体が")+T(202,238,14,sp("m","机を")+"押す力")}
 return svg(340,262,label,s)}

var LBL1="天井からひもでおもりがつるされている図。ひもは天井とおもりをつないでいる";
var LBL2="天井からつるされたおもりにはたらく5つの力の図。ひもを引く2つの力は赤、おもりを引く2つの力は青、天井を引く力は灰色。同じ色の2本が、つり合う2力";
var FIGP=hang(false,false,LBL1);
var FIGPOINT=hang(true,false,LBL2);
var FIGANS=hang(true,true,"(1)(2)の答えの図。①と④は、ひもを引く力で赤。③と⑤は、おもりを引く力で青。②は、天井を引く力で灰色。同じ色の2本がつり合う");
var FIGD=desk(false,"机の上に、物体が静止している図");
var FIGDA=desk(true,"(1)の答えの図。②と③は、物体を引く、押す力で青。①は、机を押す力で赤");

var CH5=["②","③","④","⑤"],CH3=["①","②","③"];

window.UNIT={
no:"1-15",title:"力のつり合い",
sections:[
{type:"text",point:true,title:"厳選ポイント",html:
 '<p>力は、「〜が 〜を 引く(押す)力」と言いかえられます。「〜を」にあたるのが、力を受ける物体です。</p>'+FIGPOINT+
 '<p>つり合っている2力は、<b>「〜を」が同じ</b>です。</p>'+
 '<p class="note">同じ色の2本が、つり合う2力です。</p>'},
{type:"problem",title:"問題",
 body:'<p>図のように、おもりがひもでつるされて、静止している。</p>'+FIGP+
 '<p>① 天井がひもを引く力<br>② ひもが天井を引く力<br>③ ひもがおもりを引く力<br>④ おもりがひもを引く力<br>⑤ 地球がおもりを引く力(重力)</p>'+
 '<p>次の力とつり合う力を、②〜⑤から選びなさい。</p>',
 parts:[
  {label:"(1) ①とつり合う力",type:"choice",choices:CH5,accept:["④"]},
  {label:"(2) ③とつり合う力",type:"choice",choices:CH5,accept:["⑤"]}
 ]},
{type:"answer",html:FIGANS+
 '<p>(1) <b>④</b>　①と④は、どちらも<b class="m">ひもを</b>引く力です。</p>'+
 '<p>(2) <b>⑤</b>　③と⑤は、どちらも<b class="v">おもりを</b>引く力です。</p>'+
 '<p class="note">②は「天井を」引く力です。同じ「〜を」の力がないので、つり合う相手はありません。</p>'},
{type:"problem",title:"補充問題",
 body:'<p>机の上に、物体が静止している。</p>'+FIGD+
 '<p>① 物体が机を押す力<br>② 地球が物体を引く力(重力)<br>③ 机が物体を押す力(垂直抗力)</p>'+
 '<p>②とつり合う力を、①〜③から選びなさい。</p>',
 parts:[{label:"(1) ②とつり合う力",type:"choice",choices:CH3,accept:["③"]}],
 solution:FIGDA+
 '<p>(1) <b>③</b>　②と③は、どちらも<b class="v">物体を</b>引く・押す力です。</p>'+
 '<p class="note">①と③は、大きさが等しく向きが反対ですが、「〜を」が違うので、つり合いではありません。</p>'}
]};
})();
