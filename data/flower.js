(function(){
var INK="#26303b",MUTED="#5d6874";
function T(x,y,size,txt,cls,anchor){return '<text x="'+x+'" y="'+y+'" font-size="'+size+'"'+(anchor?' text-anchor="'+anchor+'"':'')+(cls?' class="'+cls+'"':'')+'>'+txt+'</text>'}
function TN(x,y,size,txt,cls,anchor){return '<text x="'+x+'" y="'+y+'" font-size="'+size+'" style="stroke:none"'+(anchor?' text-anchor="'+anchor+'"':'')+(cls?' class="'+cls+'"':'')+'>'+txt+'</text>'}
function L(x,y,txt,cls,anchor){return T(x,y,15,txt,cls,anchor)}
function svg(w,h,label,body){return '<div class="fig"><svg viewBox="0 0 '+w+' '+h+'" style="max-width:'+(w/16)+'rem" role="img" aria-label="'+label+'">'+body+'</svg></div>'}
function ln(x1,y1,x2,y2){return '<line x1="'+x1+'" y1="'+y1+'" x2="'+x2+'" y2="'+y2+'" stroke="'+MUTED+'" stroke-width="1"/>'}
function mk(x,y,c){return '<circle cx="'+x+'" cy="'+y+'" r="10" fill="#fff" stroke="'+INK+'" stroke-width="1.5"/>'+TN(x,y+5,15,c,"b","middle")}

/* 厳選ポイントの図：上＝花の縦断面、下＝受粉後(子房→果実、胚珠→種子)。子房・果実は青、胚珠・種子は赤 */
function fig1(){
 var s='<g transform="translate(50,0)">'+
 '<path d="M138,252 C118,256 100,248 92,232 C110,234 126,240 140,246 Z" fill="#d9e8cf" stroke="#7f9a75" stroke-width="1.5"/>'+
 '<path d="M202,252 C222,256 240,248 248,232 C230,234 214,240 200,246 Z" fill="#d9e8cf" stroke="#7f9a75" stroke-width="1.5"/>'+
 '<path d="M134,242 C90,230 40,170 32,92 C32,80 46,76 54,86 C60,120 112,200 150,238 Z" fill="#fbe3e8" stroke="#c9929f" stroke-width="1.5"/>'+
 '<path d="M206,242 C250,230 300,170 308,92 C308,80 294,76 286,86 C280,120 228,200 190,238 Z" fill="#fbe3e8" stroke="#c9929f" stroke-width="1.5"/>'+
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
 ln(14,108,157,108)+ln(14,170,54,170)+ln(14,214,113,214)+ln(14,250,96,240)+
 ln(245,132,326,128)+ln(200,160,326,160)+ln(194,196,326,196)+ln(176,207,326,228)+
 L(10,113,"柱頭",null,"end")+L(10,175,"花弁",null,"end")+L(10,219,"おしべ",null,"end")+L(10,255,"がく",null,"end")+
 L(330,133,"やく")+L(330,165,"めしべ","b")+L(330,201,"子房","v b")+L(330,233,"胚珠","m b")+
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
 return svg(440,490,"花の縦断面の図と、受粉後の変化の図。上は花の縦断面。中心の点線で囲んだ部分がめしべで、柱頭、花柱、子房からなり、子房の中に胚珠が1個ある。まわりにおしべ、花弁、がくがある。下は、受粉すると、子房が果実に、胚珠が種子になる図",s)}

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
 ln(60,118,90,126)+ln(62,168,92,150)+ln(180,100,154,86)+ln(170,52,158,64)+
 mk(50,116,"A")+mk(190,104,"B")+
 L(44,175,"子房","v b","middle")+L(172,49,"やく");
 return svg(220,214,"被子植物の花の図。めしべの根もとの子房の中にA、おしべのやくの中にBがある",s)}

/* 補充問題の図2：裸子植物(マツ)の枝と、雌花・雄花のりん片の拡大 */
function fig2b(){
 var s=L(4,20,"裸子植物(マツ)","b")+'<g transform="translate(40,0)">'+
 '<path d="M104,430 C100,360 108,290 102,220 C98,160 106,100 104,44" fill="none" stroke="#8a6a4a" stroke-width="7" stroke-linecap="round"/>'+
 '<g stroke="#9bbd7f" stroke-width="2.2" stroke-linecap="round" fill="none"><line x1="102" y1="142" x2="74" y2="106"/><line x1="102" y1="142" x2="80" y2="102"/><line x1="102" y1="142" x2="87" y2="99"/><line x1="106" y1="142" x2="134" y2="106"/><line x1="106" y1="142" x2="128" y2="102"/><line x1="106" y1="142" x2="121" y2="99"/></g>'+
 '<g stroke="#5f8a5a" stroke-width="2.2" stroke-linecap="round" fill="none"><line x1="101" y1="296" x2="56" y2="238"/><line x1="101" y1="296" x2="64" y2="232"/><line x1="101" y1="296" x2="72" y2="228"/><line x1="105" y1="296" x2="150" y2="238"/><line x1="105" y1="296" x2="142" y2="232"/><line x1="105" y1="296" x2="134" y2="228"/></g>'+
 '<g fill="#d98aa0" stroke="#a0526b" stroke-width="1.5"><ellipse cx="102" cy="32" rx="9" ry="13"/><ellipse cx="86" cy="50" rx="8" ry="11"/><ellipse cx="118" cy="50" rx="8" ry="11"/></g>'+
 '<g fill="#f0d57a" stroke="#a68a2a" stroke-width="1.2"><ellipse cx="112" cy="166" rx="5" ry="9"/><ellipse cx="120" cy="172" rx="5" ry="9"/><ellipse cx="128" cy="168" rx="5" ry="9"/><ellipse cx="116" cy="182" rx="5" ry="9"/><ellipse cx="124" cy="184" rx="5" ry="9"/><ellipse cx="132" cy="180" rx="5" ry="9"/></g>'+
 '<line x1="94" y1="178" x2="101" y2="180" stroke="#8a6a4a" stroke-width="3"/>'+
 '<ellipse cx="84" cy="176" rx="10" ry="14" fill="#b3a56a" stroke="#6f6535" stroke-width="1.5"/>'+
 '<line x1="104" y1="324" x2="128" y2="322" stroke="#8a6a4a" stroke-width="3"/>'+
 '<ellipse cx="140" cy="346" rx="19" ry="30" fill="#b08d5f" stroke="#7a5c35" stroke-width="1.5"/>'+
 '<g fill="none" stroke="#7a5c35" stroke-width="1"><path d="M124,330 Q140,338 156,330"/><path d="M122,342 Q140,350 158,342"/><path d="M122,354 Q140,362 158,354"/><path d="M126,366 Q140,372 154,366"/></g>'+
 ln(62,50,76,50)+ln(62,110,76,106)+ln(62,176,72,176)+ln(62,274,82,274)+ln(160,346,166,346)+
 L(58,55,"雌花",null,"end")+L(58,115,"来年の葉",null,"end")+L(58,181,"昨年の雌花",null,"end")+L(58,279,"葉",null,"end")+
 L(124,209,"雄花",null,"middle")+L(170,345,"マツカサ")+L(170,365,"(一昨年の雌花)")+
 '<g stroke="'+INK+'" stroke-width="1.5" fill="none"><line x1="132" y1="48" x2="262" y2="58"/><path d="M254,52 L262,58 L254,64"/><line x1="142" y1="176" x2="268" y2="190"/><path d="M260,184 L268,190 L259,195"/></g>'+
 L(197,44,"拡大",null,"middle")+L(205,170,"拡大",null,"middle")+
 '<path d="M292,126 C290,108 270,96 268,64 C266,36 286,20 305,20 C324,20 344,36 342,64 C340,96 320,108 318,126 Z" fill="#e6e9ed" stroke="#8a949f" stroke-width="1.5"/>'+
 '<ellipse cx="293" cy="100" rx="7" ry="10" fill="#c2410c" transform="rotate(15 293 100)"/>'+
 '<ellipse cx="317" cy="100" rx="7" ry="10" fill="#c2410c" transform="rotate(-15 317 100)"/>'+
 ln(360,100,327,100)+mk(370,100,"A")+L(305,151,"雌花のりん片",null,"middle")+
 '<path d="M297,266 C294,248 276,238 276,214 C276,194 290,180 305,162 C320,180 334,194 334,214 C334,238 316,248 313,266 Z" fill="#e6e9ed" stroke="#8a949f" stroke-width="1.5"/>'+
 '<ellipse cx="294" cy="218" rx="8" ry="22" fill="#fdf3c8" stroke="#a68a2a" stroke-width="1.5"/><ellipse cx="316" cy="218" rx="8" ry="22" fill="#fdf3c8" stroke="#a68a2a" stroke-width="1.5"/>'+
 '<g fill="#d9a400"><circle cx="294" cy="208" r="2"/><circle cx="291" cy="218" r="2"/><circle cx="296" cy="228" r="2"/><circle cx="316" cy="208" r="2"/><circle cx="313" cy="218" r="2"/><circle cx="318" cy="228" r="2"/></g>'+
 ln(360,218,325,218)+mk(370,218,"B")+ln(270,218,284,218)+L(266,223,"花粉のう",null,"end")+L(305,295,"雄花のりん片",null,"middle")+
 '</g>';
 return svg(440,450,"マツの枝と、りん片の拡大図。枝の先端に今年の雌花、その下に来年の葉、その付け根に雄花と昨年の雌花、さらに下に葉、その根もとにマツカサ(一昨年の雌花)がある。右は、雌花のりん片の拡大図で、むき出しの胚珠にA、雄花のりん片の拡大図で、花粉のうの中にBがある",s)}

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
 '<p>受粉すると、'+g("子房","v")+'は果実に、'+g("胚珠","m")+'は種子になります。</p>'+fig1()+
 '<p class="note">花粉がめしべの柱頭につくことを、受粉といいます。図はサクラの花とサクランボです。</p>'},
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
 '<p>(3) '+g("胚珠","m")+'→<b class="m">種子</b><br>サクランボでは、実が果実、その中にできる種が種子です。</p>'+
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
