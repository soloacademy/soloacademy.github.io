(function(){
var INK="#26303b",MUTED="#5d6874",BLUE="#1f5fa8",RED="#c2410c",PALE="#e3edf8",GRAY="#8a949f",LG="#e6e9ed",MID="#cfd5db";
function T(x,y,size,txt,cls,anchor){return '<text x="'+x+'" y="'+y+'" font-size="'+size+'"'+(anchor?' text-anchor="'+anchor+'"':'')+(cls?' class="'+cls+'"':'')+'>'+txt+'</text>'}
function TN(x,y,size,txt,cls,anchor){return '<text x="'+x+'" y="'+y+'" font-size="'+size+'" style="stroke:none"'+(anchor?' text-anchor="'+anchor+'"':'')+(cls?' class="'+cls+'"':'')+'>'+txt+'</text>'}
function svg(w,h,label,body){return '<div class="fig"><svg viewBox="0 0 '+w+' '+h+'" role="img" aria-label="'+label+'">'+body+'</svg></div>'}
function line(x1,y1,x2,y2,k,w){return '<line x1="'+x1+'" y1="'+y1+'" x2="'+x2+'" y2="'+y2+'" stroke="'+k+'" stroke-width="'+(w||1)+'"/>'}
function ell(cx,cy,rx,ry,f,k,w){return '<ellipse cx="'+cx+'" cy="'+cy+'" rx="'+rx+'" ry="'+ry+'" fill="'+f+'" stroke="'+k+'" stroke-width="'+(w||1.5)+'"/>'}
function dot(x,y,r){return '<circle cx="'+x+'" cy="'+y+'" r="'+r+'" fill="'+RED+'"/>'}
function mk(x,y,c){return '<circle cx="'+x+'" cy="'+y+'" r="10" fill="#fff" stroke="'+INK+'" stroke-width="1.5"/>'+TN(x,y+5,14,c,"b","middle")}

/* 厳選ポイントの図：上＝エンドウの花の断面、下＝受粉後のさや。子房→果実は青、胚珠→種子は赤 */
function fig1(){
 var s='';
 s+='<path d="M146,200 C128,150 112,90 92,50 C70,120 96,190 142,206 Z" fill="#fff" stroke="'+GRAY+'" stroke-width="1.5"/>'+
    '<path d="M174,200 C192,150 208,90 228,50 C250,120 224,190 178,206 Z" fill="#fff" stroke="'+GRAY+'" stroke-width="1.5"/>';
 s+='<path d="M150,200 Q140,170 138,122" fill="none" stroke="'+MUTED+'" stroke-width="2"/><path d="M170,200 Q180,170 182,122" fill="none" stroke="'+MUTED+'" stroke-width="2"/>'+
    ell(138,112,7,10,MID,MUTED,1.5)+ell(182,112,7,10,MID,MUTED,1.5);
 s+=line(160,78,160,142,MUTED,3)+ell(160,72,9,6,MID,MUTED,1.5)+ell(160,172,22,33,PALE,BLUE,1.5);
 [[152,158],[168,158],[152,178],[168,178]].forEach(function(d){s+=dot(d[0],d[1],4.5)});
 s+='<path d="M120,192 C124,224 196,224 200,192 C188,206 132,206 120,192 Z" fill="'+LG+'" stroke="'+GRAY+'" stroke-width="1.5"/>';
 /* 名前 */
 s+=line(66,112,131,112,MUTED)+T(62,117,14,"おしべ",null,"end")+
    line(66,150,90,150,MUTED)+T(62,155,14,"花弁",null,"end")+
    line(66,212,125,208,MUTED)+T(62,217,14,"がく",null,"end")+
    line(160,40,160,64,MUTED)+T(160,34,14,"柱頭",null,"middle")+
    line(164,88,250,88,MUTED)+T(254,93,14,"めしべ")+
    line(178,152,250,152,MUTED)+T(254,157,14,"子房","v b")+
    line(172,178,250,178,MUTED)+T(254,183,14,"胚珠","m b");
 /* 受粉後 */
 s+=line(160,242,160,282,INK,1.5)+'<path d="M154,276 L160,282 L166,276" fill="none" stroke="'+INK+'" stroke-width="1.5"/>'+T(172,266,14,"受粉");
 s+='<path d="M90,352 C120,320 260,320 290,352 C260,384 120,384 90,352 Z" fill="'+PALE+'" stroke="'+BLUE+'" stroke-width="1.5"/>';
 [137,171,205,239].forEach(function(x){s+=dot(x,352,12)});
 s+=line(158,312,158,328,MUTED)+T(158,306,14,"果実(さや)","v b","middle")+
    line(171,396,171,366,MUTED)+T(171,412,14,"種子(豆)","m b","middle");
 return svg(320,420,"エンドウの花の断面と、受粉後のさやの図。花では、めしべの根もとの子房の中に胚珠があり、まわりにおしべ、花弁、がくがある。受粉すると、子房は果実のさやに、胚珠は種子の豆になる",s)}

/* 補充問題の図：A＝胚珠、B＝花粉の位置 */
function fig2(){
 var s=T(80,20,14,"被子植物","b","middle")+T(245,20,14,"裸子植物","b","middle");
 s+=line(80,60,80,100,MUTED,3)+ell(80,54,9,6,MID,MUTED,1.5)+ell(80,125,20,28,PALE,BLUE,1.5);
 [[73,118],[87,118],[73,134],[87,134]].forEach(function(d){s+=dot(d[0],d[1],4)});
 s+=line(124,150,124,78,MUTED,2)+ell(124,66,7,10,MID,MUTED,1.5)+
    T(80,174,13,"子房","v b","middle")+T(136,102,13,"やく")+
    line(38,125,60,125,MUTED)+mk(28,125,"A")+line(140,66,131,66,MUTED)+mk(150,66,"B");
 s+=ell(245,70,40,8,LG,GRAY,1.5)+dot(231,59,6)+dot(259,59,6)+T(245,94,12,"雌花のりん片",null,"middle")+
    line(293,52,266,57,MUTED)+mk(303,50,"A");
 s+=T(245,122,12,"雄花のりん片",null,"middle")+ell(231,152,8,6,MID,MUTED,1.5)+ell(259,152,8,6,MID,MUTED,1.5)+ell(245,138,40,8,LG,GRAY,1.5)+
    T(245,176,12,"花粉のう",null,"middle")+line(293,152,268,152,MUTED)+mk(303,152,"B");
 return svg(320,192,"被子植物と裸子植物の花の図。被子植物では、子房の中のAと、やくの中のB。裸子植物では、雌花のりん片にむき出しのAと、雄花のりん片の花粉のうの中のB",s)}

function g(n,c){return '<span class="'+c+'">'+n+'</span>'}
function tbl(hd,rows){
 var L='style="text-align:left"',N='style="white-space:nowrap;text-align:left"';
 return '<div style="overflow-x:auto"><table style="background:#fff"><tr>'+hd.map(function(t,i){return '<th '+(i?L:N)+'>'+t+'</th>'}).join('')+'</tr>'+
  rows.map(function(r){return '<tr>'+r.map(function(t,i){return '<td '+(i?L:N)+'>'+t+'</td>'}).join('')+'</tr>'}).join('')+'</table></div>'}

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
 '<p class="note">花粉がめしべの柱頭につくことを、受粉といいます。図はエンドウの花とさやです。</p>'},
{type:"problem",title:"問題",
 body:'<p>(1) 次の花のつくりを、花の中心から外側へ向かって並べなさい。</p>'+
 '<p>(2) 被子植物の子房と胚珠は、受粉後に成長すると、それぞれ何になるか。</p>'+
 '<p class="note">(1)は、中心に近い順に、下のボタンを押して並べます。</p>',
 parts:[
  {label:"(1)",type:"order",choices:["がく","おしべ","めしべ","花弁"],accept:["めしべ→おしべ→花弁→がく"]},
  {label:g("子房","v")+"→",type:"choice",choices:C2,accept:["果実"]},
  {label:g("胚珠","m")+"→",type:"choice",choices:C2,accept:["種子"]}
 ]},
{type:"answer",html:
 '<p>(1) <b>めしべ → おしべ → 花弁 → がく</b><br>中心にめしべがあり、外へ向かっておしべ、花弁、がくの順です。がくは、つぼみのときに花を守っています。</p>'+
 '<p>(2) '+g("子房","v")+'→<b class="v">果実</b>　'+g("胚珠","m")+'→<b class="m">種子</b><br>エンドウでは、さやが果実、中の豆が種子です。</p>'+
 '<div style="border-top:1px solid var(--rule);margin-top:1.2rem;padding-top:.6rem"><p><b>被子植物と裸子植物の花</b>(補充問題で使います)</p>'+PART+'</div>'},
{type:"problem",title:"補充問題",
 body:'<p>被子植物と裸子植物の花について、図のA・Bに入る語を選びなさい。</p>'+fig2()+
 '<p class="note">ヒント：「問題の解答と解説」の最後にある表を使います。</p>',
 parts:[
  {label:"A",type:"choice",choices:C4,accept:["胚珠"]},
  {label:"B",type:"choice",choices:C4,accept:["花粉"]}
 ],
 solution:SOL2}
]};
})();
