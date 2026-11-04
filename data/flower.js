(function(){
var INK="#26303b",MUTED="#5d6874";
function T(x,y,size,txt,cls,anchor){return '<text x="'+x+'" y="'+y+'" font-size="'+size+'"'+(anchor?' text-anchor="'+anchor+'"':'')+(cls?' class="'+cls+'"':'')+'>'+txt+'</text>'}
function TN(x,y,size,txt,cls,anchor){return '<text x="'+x+'" y="'+y+'" font-size="'+size+'" style="stroke:none"'+(anchor?' text-anchor="'+anchor+'"':'')+(cls?' class="'+cls+'"':'')+'>'+txt+'</text>'}
function L(x,y,txt,cls,anchor){return T(x,y,15,txt,cls,anchor)}
function svg(w,h,label,body,y0){y0=y0||0;return '<div class="fig"><svg viewBox="0 '+y0+' '+w+' '+(h-y0)+'" style="max-width:'+(w/16)+'rem" role="img" aria-label="'+label+'">'+body+'</svg></div>'}
function ln(x1,y1,x2,y2){return '<line x1="'+x1+'" y1="'+y1+'" x2="'+x2+'" y2="'+y2+'" stroke="'+MUTED+'" stroke-width="1"/>'}
function mk(x,y,c){return '<circle cx="'+x+'" cy="'+y+'" r="10" fill="#fff" stroke="'+INK+'" stroke-width="1.5"/>'+TN(x,y+5,15,c,"b","middle")}

/* 厳選ポイントの図：上＝花の縦断面、下＝受粉後(子房→果実、胚珠→種子)。子房・果実は青、胚珠・種子は赤 */
function fig1(){
 var s='<g transform="translate(50,0)">'+
 '<path d="M138,252 C118,256 100,248 92,232 C110,234 126,240 140,246 Z" fill="#d9e8cf" stroke="#7f9a75" stroke-width="1.5"/>'+
 '<path d="M202,252 C222,256 240,248 248,232 C230,234 214,240 200,246 Z" fill="#d9e8cf" stroke="#7f9a75" stroke-width="1.5"/>'+
 '<path transform="translate(140,240) rotate(-42)" d="M0,0 C-38,-22 -38,-100 -6,-128 L0,-118 L6,-128 C38,-100 38,-22 0,0 Z" fill="#fbe3e8" stroke="#c9929f" stroke-width="1.5"/>'+
 '<path transform="translate(200,240) rotate(42)" d="M0,0 C-38,-22 -38,-100 -6,-128 L0,-118 L6,-128 C38,-100 38,-22 0,0 Z" fill="#fbe3e8" stroke="#c9929f" stroke-width="1.5"/>'+
 '<rect x="163" y="258" width="14" height="38" fill="#d9e8cf" stroke="#7f9a75" stroke-width="1.5"/>'+
 '<path d="M136,236 C138,262 202,262 204,236 Z" fill="#d9e8cf" stroke="#7f9a75" stroke-width="1.5"/>'+
 '<g fill="none" stroke="#7c8791" stroke-width="3.5"><path d="M132,238 C112,212 104,182 104,150"/><path d="M208,238 C228,212 236,182 236,150"/></g>'+
 '<g fill="#f0d57a" stroke="#a68a2a" stroke-width="1.5"><ellipse cx="104" cy="136" rx="9" ry="17"/><ellipse cx="236" cy="136" rx="9" ry="17"/></g>'+
 '<g stroke="#a68a2a" stroke-width="1"><line x1="104" y1="122" x2="104" y2="150"/><line x1="236" y1="122" x2="236" y2="150"/></g>'+
 '<rect x="165" y="116" width="10" height="56" fill="#cfd5db" stroke="#7c8791" stroke-width="1.5"/>'+
 '<ellipse cx="170" cy="108" rx="12" ry="8" fill="#e9e2a0" stroke="#8a8a40" stroke-width="1.5"/>'+
 '<ellipse cx="170" cy="204" rx="24" ry="34" fill="#e3edf8" stroke="#1f5fa8" stroke-width="1.5"/>'+
 '<circle cx="170" cy="204" r="5.5" fill="#c2410c"/>'+
 '<rect x="140" y="92" width="60" height="150" rx="12" fill="none" stroke="'+MUTED+'" stroke-width="1.2" stroke-dasharray="4 3"/>'+
 '<rect x="204" y="116" width="48" height="130" rx="10" fill="none" stroke="'+MUTED+'" stroke-width="1.2" stroke-dasharray="4 3"/>'+
 ln(5,97,140,97)+ln(4,127,159,108)+ln(4,161,147,196)+ln(4,193,164,204)+
 ln(322,204,260,206)+ln(322,127,252,127)+ln(338,157,244,146)+ln(322,262,227,250.5)+
 L(-44,101,"めしべ","b")+L(-30,131,"柱頭")+L(-30,165,"子房","v")+L(-30,197,"胚珠","m")+
 L(326,209,"花弁")+L(326,131,"おしべ","b")+L(342,161,"やく")+L(326,267,"がく")+
 '</g>'+
 '<line x1="20" y1="318" x2="420" y2="318" stroke="#dde2e7" stroke-width="1"/>'+
 '<g transform="translate(0,336)">'+
 L(110,12,"子房","v b","middle")+
 '<ellipse cx="110" cy="75" rx="36" ry="51" fill="#e3edf8" stroke="#1f5fa8" stroke-width="1.5"/>'+
 '<circle cx="110" cy="75" r="8" fill="#c2410c"/>'+
 ln(102,75,60,75)+L(56,80,"胚珠","m b","end")+
 '<line x1="170" y1="75" x2="250" y2="75" stroke="'+INK+'" stroke-width="1.5"/><path d="M242,68 L250,75 L242,82" fill="none" stroke="'+INK+'" stroke-width="1.5"/>'+
 L(210,60,"受粉",null,"middle")+
 L(330,12,"果実","v b","middle")+
 '<circle cx="330" cy="75" r="56" fill="#e3edf8" stroke="#1f5fa8" stroke-width="1.5"/>'+
 '<ellipse cx="330" cy="75" rx="13" ry="17" fill="#c2410c"/>'+
 ln(343,75,398,75)+L(402,80,"種子","m b")+
 '</g>';
 return svg(440,490,"花の縦断面の図と、受粉後の変化の図。上は花の縦断面。中心の点線で囲んだ部分がめしべで、柱頭、花柱、子房からなり、子房の中に胚珠が1個ある。まわりにおしべ、花弁、がくがある。下は、受粉すると、子房が果実に、胚珠が種子になる図",s,66)}

/* 補充問題の図1：被子植物(A＝子房の中、B＝やくの中) */
function fig2a(){
 var s=L(110,20,"被子植物","b","middle")+
 '<ellipse cx="110" cy="56" rx="10" ry="7" fill="#e9e2a0" stroke="#8a8a40" stroke-width="1.5"/>'+
 '<rect x="105" y="62" width="10" height="38" fill="#cfd5db" stroke="#7c8791" stroke-width="1.5"/>'+
 '<path d="M128,166 C146,144 150,112 150,90" fill="none" stroke="#7c8791" stroke-width="3.5"/>'+
 '<ellipse cx="150" cy="76" rx="9" ry="15" fill="#fdf3c8" stroke="#a68a2a" stroke-width="1.5"/>'+
 '<g fill="#d9a400"><circle cx="147" cy="68" r="2.5"/><circle cx="153" cy="74" r="2.5"/><circle cx="147" cy="80" r="2.5"/><circle cx="153" cy="85" r="2.5"/></g>'+
 '<ellipse cx="110" cy="132" rx="22" ry="32" fill="#e3edf8" stroke="#1f5fa8" stroke-width="1.5"/>'+
 '<circle cx="110" cy="132" r="5.5" fill="#c2410c"/>'+
 '<path d="M92,164 C94,180 126,180 128,164 Z" fill="#d9e8cf" stroke="#7f9a75" stroke-width="1.5"/>'+
 '<rect x="104" y="176" width="12" height="22" fill="#d9e8cf" stroke="#7f9a75" stroke-width="1.5"/>'+
 ln(60,118,105,131)+ln(62,168,92,150)+ln(180,100,154,86)+ln(171,53,155,65)+
 mk(50,116,"A")+mk(190,104,"B")+
 L(44,175,"子房","v b","middle")+L(172,49,"やく");
 return svg(220,214,"被子植物の花の図。めしべの根もとの子房の中にA、おしべのやくの中にBがある",s)}

/* 補充問題の図2：裸子植物(マツ)。左＝枝、右＝りん片1枚の拡大(雌花・雄花) */
/* りん片のもよう：小さな「逆Vの字」(∧)を、ずらしながら散りばめる。cy＝楕円の中心の高さ、a＝∧の半分の幅(高さも同じ)、st＝段の間隔 */
function arcs(cy,rx,ry,a,st,col,sw){var d='',y,x,k=0,ok=function(x,y){return x*x/(rx*rx)+y*y/(ry*ry)<=.8};
 for(y=-ry*.78;y<=ry*.6;y+=st,k++){for(x=-rx+(k%2?a*1.4:0);x<=rx;x+=a*2.8){
  if(ok(x-a,y+a)&&ok(x+a,y+a)&&ok(x,y))d+='M'+(x-a).toFixed(1)+','+(cy+y+a).toFixed(1)+' L'+x.toFixed(1)+','+(cy+y).toFixed(1)+' L'+(x+a).toFixed(1)+','+(cy+y+a).toFixed(1)}}
 return '<path d="'+d+'" fill="none" stroke="'+col+'" stroke-width="'+sw+'" stroke-linecap="round" stroke-linejoin="round"/>'}
function fig2b(){
 var R=Math.PI/180,i,j,d,y,a,L2,x2,y2,cx,cy,ey,tx=999,ty=0,
  sh='<g stroke="#8fb872" stroke-width="2.2" stroke-linecap="round" fill="none">',
  lg='<g stroke="#5f8a5a" stroke-width="1.6" stroke-linecap="round" fill="none">',
  ml='<g fill="#f0d57a" stroke="#a68a2a" stroke-width="1.2">',
  AN=[78,60,42,24,6,-12,-28];
 /* 新しい枝の短い葉：何段も重なって、枝をおおう */
 for(y=172;y>=100;y-=6){for(j=-2;j<=2;j++){a=j*20*R;sh+='<line x1="130" y1="'+y+'" x2="'+(130+13*Math.sin(a)).toFixed(1)+'" y2="'+(y-13*Math.cos(a)).toFixed(1)+'"/>'}}
 sh+='</g>';
 /* 長い葉：雄花のあたりから下まで、茎から何段も四方八方に出る(雄花より上へは出さない) */
 for(i=0;i<13;i++){y=206+i*10;
  for(j=0;j<7;j++){for(d=-1;d<=1;d+=2){
   a=(AN[j]+((i+j+(d>0?1:0))%2?5:-3))*R;L2=76+((i*3+j*5+(d>0?2:0))%5)*5;x2=L2*Math.cos(a);y2=L2*Math.sin(a);ey=y-y2;
   if(ey<165||ey>348)continue;
   if(d<0&&ey>=225&&ey<=255&&130-x2<tx){tx=130-x2;ty=ey}
   lg+='<line x1="130" y1="'+y+'" x2="'+(130+d*x2).toFixed(1)+'" y2="'+ey.toFixed(1)+'"/>'}}}
 lg+='</g>';
 /* 雄花：新しい枝の根もとに、ぎっしり集まる */
 [[228,-48],[220,-34],[214,-52],[206,-24],[198,-42],[190,-30],[182,-46],[176,-20],[228,48],[222,30],[214,54],[208,22],[200,40],[192,28],[184,46],[178,18],[212,-6],[196,8],[186,-4]].forEach(function(p){
  a=p[1]*R;cx=(130+11*Math.sin(a)).toFixed(1);cy=(p[0]-11*Math.cos(a)).toFixed(1);
  ml+='<g transform="translate('+cx+' '+cy+') rotate('+p[1]+')"><ellipse cx="0" cy="0" rx="5.5" ry="11"/>'+arcs(0,5.5,11,1.4,3.6,"#a68a2a",.7)+'</g>'});
 ml+='</g>';
 var ar='<g fill="none" stroke-linecap="round"><g stroke="#fff" stroke-width="6"><line x1="158" y1="86" x2="300" y2="86"/><line x1="158" y1="212" x2="322" y2="205"/></g>'+
  '<g stroke="'+INK+'" stroke-width="1.5"><line x1="156" y1="86" x2="302" y2="86"/><path d="M294,80 L302,86 L294,92"/><line x1="156" y1="212" x2="324" y2="205"/><path d="M316,199 L324,205 L315,211"/></g></g>';
 var s=L(4,20,"裸子植物(マツ)","b")+
 '<path d="M130,376 C126,340 134,290 130,222" fill="none" stroke="#8a6a4a" stroke-width="7" stroke-linecap="round"/>'+
 '<path d="M130,226 C129,190 131,140 130,94" fill="none" stroke="#7fa06a" stroke-width="6" stroke-linecap="round"/>'+
 lg+sh+ml+
 '<g fill="#d98aa0" stroke="#a0526b" stroke-width="1.5"><g transform="translate(125,96) rotate(-12)"><ellipse cx="0" cy="-13" rx="9" ry="13"/>'+arcs(-13,9,13,2.2,4.6,"#a0526b",1)+'</g><g transform="translate(135,96) rotate(12)"><ellipse cx="0" cy="-13" rx="9" ry="13"/>'+arcs(-13,9,13,2.2,4.6,"#a0526b",1)+'</g></g>'+
 '<line x1="130" y1="258" x2="112" y2="268" stroke="#8a6a4a" stroke-width="3"/>'+
 '<g transform="translate(101,276) rotate(53)"><ellipse cx="0" cy="0" rx="11" ry="15" fill="#b3a56a" stroke="#6f6535" stroke-width="1.5"/>'+
 '<g fill="none" stroke="#6f6535" stroke-width="1"><path d="M-8,-8 Q0,-4 8,-8"/><path d="M-9.5,-1 Q0,3 9.5,-1"/><path d="M-9,6 Q0,10 9,6"/><path d="M-6,12 Q0,15 6,12"/></g></g>'+
 '<line x1="129" y1="300" x2="149" y2="314" stroke="#8a6a4a" stroke-width="3"/>'+
 '<g transform="translate(24,30)"><g transform="rotate(-54 148 302)"><ellipse cx="148" cy="302" rx="19" ry="30" fill="#b08d5f" stroke="#7a5c35" stroke-width="1.5"/>'+
 '<g fill="none" stroke="#7a5c35" stroke-width="1"><path d="M132,286 Q148,294 164,286"/><path d="M130,298 Q148,306 166,298"/><path d="M130,310 Q148,318 166,310"/><path d="M134,322 Q148,328 162,322"/></g></g></g>'+
 ln(tx-10,ty,tx+.5,ty)+L(tx-13,ty+5,"葉",null,"end")+
 ln(80,276,88,276)+L(76,281,"昨年の雌花",null,"end")+
 ln(195,349,211,359)+L(214,364,"マツカサ")+L(214,384,"(一昨年の雌花)")+
 ar+T(229,77,13,"拡大","b","middle")+T(240,197,13,"拡大","b","middle")+
 '<g transform="translate(40,13)"><path d="M292,126 C290,108 270,96 268,64 C266,36 286,20 305,20 C324,20 344,36 342,64 C340,96 320,108 318,126 Z" fill="#e6e9ed" stroke="#8a949f" stroke-width="1.5"/>'+
 '<ellipse cx="293" cy="100" rx="7" ry="10" fill="#c2410c" transform="rotate(15 293 100)"/><ellipse cx="317" cy="100" rx="7" ry="10" fill="#c2410c" transform="rotate(-15 317 100)"/>'+
 ln(360,102,322,102)+mk(370,102,"A")+L(305,151,"雌花のりん片",null,"middle")+'</g>'+
 '<g transform="translate(40,21)"><path d="M297,266 C294,248 276,238 276,214 C276,194 290,180 305,162 C320,180 334,194 334,214 C334,238 316,248 313,266 Z" fill="#e6e9ed" stroke="#8a949f" stroke-width="1.5"/>'+
 '<ellipse cx="294" cy="218" rx="8" ry="22" fill="#fdf3c8" stroke="#a68a2a" stroke-width="1.5"/><ellipse cx="316" cy="218" rx="8" ry="22" fill="#fdf3c8" stroke="#a68a2a" stroke-width="1.5"/>'+
 '<g fill="#d9a400"><circle cx="294" cy="208" r="2"/><circle cx="290" cy="218" r="2"/><circle cx="294" cy="228" r="2"/><circle cx="316" cy="208" r="2"/><circle cx="320" cy="218" r="2"/><circle cx="316" cy="228" r="2"/></g>'+
 ln(360,218,322,218)+mk(370,218,"B")+ln(270,218,287,218)+L(266,223,"花粉のう",null,"end")+L(305,295,"雄花のりん片",null,"middle")+'</g>';
 return svg(440,400,"マツの枝と、りん片の拡大図。左は枝。新しい枝の先に雌花が2つ、そのすぐ下に雄花がぎっしり集まってついている。長い葉が、雄花のあたりから下まで、茎から四方八方に何段も出ていて、そのまわりに昨年の雌花と、マツカサ(一昨年の雌花)がある。右は、雌花のりん片の拡大図でむき出しの胚珠にA、雄花のりん片の拡大図で花粉のうの中にB",s)}

function g(n,c){return '<span class="'+c+'">'+n+'</span>'}
function tbl(hd,rows){
 var L2='style="text-align:left"',N='style="white-space:nowrap;text-align:left"';
 return '<div style="overflow-x:auto"><table style="background:#fff"><tr>'+hd.map(function(t,i){return '<th '+(i?L2:N)+'>'+t+'</th>'}).join('')+'</tr>'+
  rows.map(function(r){return '<tr>'+r.map(function(t,i){return '<td '+(i?L2:N)+'>'+t+'</td>'}).join('')+'</tr>'}).join('')+'</table></div>'}

var PART=tbl(["","胚珠","花粉"],[
 ["<b>被子植物</b>","子房の中に入っている","やくの中に入っている"],
 ["<b>裸子植物</b>","雌花のりん片にむき出しでついている","雄花のりん片の花粉のうの中に入っている"]
]);
var C2=["果実","種子","花粉"],C4=["胚珠","花粉","種子","果実"];

var SOL2='<p>(A) <b class="m">胚珠</b>　(B) <b>花粉</b></p>'+
 '<p class="note">裸子植物には子房がありません。そのため、胚珠は種子になりますが、果実はできません。</p>';

window.UNIT={
no:"1-5",title:"花のつくり",
sections:[
{type:"text",point:true,title:"厳選ポイント",html:
 fig1()+
 '<p>花粉がめしべの柱頭につくことを、受粉といいます。<br>受粉すると、'+g("子房","v")+'は果実に、'+g("胚珠","m")+'は種子になります。</p>'},
{type:"problem",title:"問題",
 body:'<p>(1) 次の花のつくりを、花の中心から外側へ向かって並べなさい。</p>'+
 '<p>(2) 受粉後、被子植物の子房は何になるか。</p>'+
 '<p>(3) 受粉後、被子植物の胚珠は何になるか。</p>'+
 '<p class="note">(1)は、中心に近い順に、下のボタンを押して並べます。</p>',
 parts:[
  {label:"(1)",type:"order",choices:["がく","おしべ","めしべ","花弁"],accept:["めしべ→おしべ→花弁→がく"]},
  {label:"(2) "+g("子房","v"),type:"choice",choices:C2,accept:["果実"]},
  {label:"(3) "+g("胚珠","m"),type:"choice",choices:C2,accept:["種子"]}
 ]},
{type:"answer",html:
 '<p>(1) <b>めしべ → おしべ → 花弁 → がく</b><br>中心にめしべがあり、外へ向かっておしべ、花弁、がくの順です。がくは、つぼみのときに花を守っています。</p>'+
 '<p>(2) '+g("子房","v")+'→<b class="v">果実</b></p>'+
 '<p>(3) '+g("胚珠","m")+'→<b class="m">種子</b></p>'+
 '<div style="border-top:1px solid var(--rule);margin-top:1.2rem;padding-top:.6rem"><p><b>被子植物と裸子植物の花</b>(補充問題で使います)</p>'+PART+'</div>'},
{type:"problem",title:"補充問題",
 body:'<p>被子植物と裸子植物の花について、図のA・Bに入る語を選びなさい。</p>'+fig2a()+fig2b()+
 '<p class="note">ヒント：「問題の解答と解説」の最後にある表を使います。</p>',
 parts:[
  {label:"(1) A",type:"choice",choices:C4,accept:["胚珠"]},
  {label:"(2) B",type:"choice",choices:C4,accept:["花粉"]}
 ],
 solution:SOL2}
]};
})();
