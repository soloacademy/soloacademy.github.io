(function(){
var INK="#26303b",BLUE="#1f5fa8",RED="#c2410c",MUTED="#5d6874",PALE="#e3edf8",PALER="#fdefe8";
function T(x,y,size,txt,cls,anchor){return '<text x="'+x+'" y="'+y+'" font-size="'+size+'"'+(anchor?' text-anchor="'+anchor+'"':'')+(cls?' class="'+cls+'"':'')+'>'+txt+'</text>'}
/* 色つきの面の上の文字：まわりの白いふちを消す */
function TN(x,y,size,txt,cls,anchor){return '<text x="'+x+'" y="'+y+'" font-size="'+size+'" style="stroke:none"'+(anchor?' text-anchor="'+anchor+'"':'')+(cls?' class="'+cls+'"':'')+'>'+txt+'</text>'}
function svg(w,h,label,body){return '<div class="fig"><svg viewBox="0 0 '+w+' '+h+'" role="img" aria-label="'+label+'">'+body+'</svg></div>'}
function line(x1,y1,x2,y2,k,w,dash){return '<line x1="'+x1+'" y1="'+y1+'" x2="'+x2+'" y2="'+y2+'" stroke="'+k+'" stroke-width="'+(w||1)+'"'+(dash?' stroke-dasharray="4 3"':'')+'/>'}

/* 厳選ポイントの図：600gの物体を、地球と月でばねばかりにつるす。重力の矢印は、地球は太く、月は細く */
function panel(cx,name,wt,gw,ground){
 var s=T(cx,18,14,name,"b","middle")+
  '<circle cx="'+cx+'" cy="34" r="4" fill="none" stroke="'+MUTED+'" stroke-width="1.2"/>'+
  line(cx,38,cx,42,MUTED,1.2)+
  '<rect x="'+(cx-18)+'" y="42" width="36" height="56" rx="4" fill="#fff" stroke="'+MUTED+'" stroke-width="1.2"/>'+
  TN(cx,75,14,wt,"v b","middle")+
  line(cx,98,cx,110,MUTED,1.2)+
  '<rect x="'+(cx-28)+'" y="110" width="56" height="38" rx="4" fill="#e6e9ed" stroke="'+INK+'" stroke-width="1.2"/>'+
  TN(cx,134,14,"600g","m b","middle");
 var hw=gw>2?10:4,tip=gw>2?192:188,y0=gw>2?178:180;
 s+=line(cx,154,cx,y0,BLUE,gw)+'<polygon points="'+(cx-hw)+','+y0+' '+(cx+hw)+','+y0+' '+cx+','+tip+'" fill="'+BLUE+'"/>'+
  T(cx+14,172,12,"重力","v");
 s+='<path d="M'+(cx-70)+',206 Q'+cx+',190 '+(cx+70)+',206 V222 H'+(cx-70)+' Z" fill="'+ground+'" stroke="#8a949f" stroke-width="1"/>'+
  T(cx,248,14,"質量　600g","m b","middle")+T(cx,270,14,"重さ　"+wt,"v b","middle");
 return s}
function fig1(){
 var s=panel(85,"地球","6N",5,"#cfe0f3")+panel(255,"月","1N",1,"#e6e9ed")+
  T(170,119,12,"月へ","g","middle")+line(125,129,215,129,INK,1.5)+'<path d="M209,124 L215,129 L209,134" fill="none" stroke="'+INK+'" stroke-width="1.5"/>';
 return svg(340,282,"600gの物体をばねばかりにつるした図。地球では、質量は600g、重さは6N。月に運ぶと、質量は600gのまま変わらず、重さは1Nになる。重力の矢印は、地球では太く、月では細い",s)}

/* 解答の図：左＝地球、右＝月。1行目＝質量、2行目＝重さ。o.e＝地球の値、o.m＝月の値、o.op＝重さの変わり方、o.rev＝true なら右から左へ */
function box(cx,cy,txt,cls,f,k){
 return '<rect x="'+(cx-40)+'" y="'+(cy-18)+'" width="80" height="36" rx="4" fill="'+f+'" stroke="'+k+'" stroke-width="1.5"/>'+TN(cx,cy+6,16,txt,cls+" b","middle")}
function arrow(y,rev,lab,big){
 var s=line(150,y,240,y,INK,1.5);
 s+=rev?'<path d="M156,'+(y-5)+' L150,'+y+' L156,'+(y+5)+'" fill="none" stroke="'+INK+'" stroke-width="1.5"/>'
       :'<path d="M234,'+(y-5)+' L240,'+y+' L234,'+(y+5)+'" fill="none" stroke="'+INK+'" stroke-width="1.5"/>';
 return s+(big?T(195,y-9,16,lab,"b","middle"):T(195,y-9,12,lab,"g","middle"))}
function figRow(o,label){
 var y1=72,y2=136,s=T(105,24,14,"地球","b","middle")+T(285,24,14,"月","b","middle")+
  T(6,y1+5,14,"質量","m b")+T(6,y2+5,14,"重さ","v b")+
  box(105,y1,o.e[0],"m",PALER,RED)+box(285,y1,o.m[0],"m",PALER,RED)+arrow(y1,o.rev,"そのまま",false)+
  box(105,y2,o.e[1],"v",PALE,BLUE)+box(285,y2,o.m[1],"v",PALE,BLUE)+arrow(y2,o.rev,o.op,true);
 return svg(340,172,label,s)}

var FIG1=fig1();
var FIGA=figRow({e:["60kg","600N"],m:["60kg","100N"],op:"÷6",rev:false},"人の質量と重さを、地球と月で比べた図。質量は、地球でも月でも60kgでそのまま。重さは、地球で600N、月では6分の1の100N");
var FIGS=figRow({e:["3kg","30N"],m:["3kg","5N"],op:"×6",rev:true},"物体の質量と重さを、月と地球で比べた図。月での重さ5Nを6倍すると、地球での重さは30N。質量は、月でも地球でも3kgでそのまま");

var Mq='<span class="m">質量</span>',Wt='<span class="v">重さ</span>';

window.UNIT={
no:"1-14",title:"質量と重さ",
sections:[
{type:"text",point:true,title:"厳選ポイント",html:
 '<p>'+Mq+'は、物体そのものの量です。場所が変わっても、変わりません。</p>'+
 '<p>'+Wt+'は、物体にはたらく重力の大きさです。場所によって、変わります。</p>'+FIG1+
 '<p class="note">質量の単位は g、kg。重さの単位は N(ニュートン)です。</p>'+
 '<p class="note">地球上で100gの物体にはたらく重力の大きさが、1Nです。月の重力は、地球の6分の1です。</p>'},
{type:"problem",title:"問題",
 body:'<p>地球上での質量が60kgの人がいる。この人の月面上での'+Mq+'と'+Wt+'を求めなさい。</p>'+
 '<p>ただし、地球上で100gの物体にはたらく重力の大きさを1Nとし、月の重力は地球の6分の1とする。</p>',
 parts:[
  {label:'(1) '+Mq,unit:"kg",type:"number",accept:[60],tol:0.5},
  {label:'(2) '+Wt,unit:"N",type:"number",accept:[100],tol:0.5}
 ]},
{type:"answer",html:
 '<p>(1) '+Mq+'は、場所が変わっても変わりません。<b>60kg</b></p>'+
 '<p>(2) 地球上での'+Wt+'：60kg ＝ 60000g<br>100gで1Nなので、60000 ÷ 100 ＝ <b class="v">600N</b></p>'+FIGA+
 '<p>月の重力は6分の1なので、600N ÷ 6 ＝ <b>100N</b></p>'},
{type:"problem",title:"補充問題",
 body:'<p>月面上で、重さが5Nの物体がある。この物体の'+Mq+'は何kgか。</p>'+
 '<p>ただし、地球上で100gの物体にはたらく重力の大きさを1Nとし、月の重力は地球の6分の1とする。</p>',
 parts:[{label:"答え",unit:"kg",type:"number",accept:[3],tol:0.01}],
 solution:
 '<p>月の'+Wt+'を、地球の'+Wt+'になおして考えます。</p>'+FIGS+
 '<p>① 地球での'+Wt+'：5N × 6 ＝ <b class="v">30N</b></p>'+
 '<p>② 100gで1Nなので、30N → 30 × 100g ＝ 3000g ＝ <b class="m">3kg</b></p>'+
 '<p class="note">'+Mq+'は、場所が変わっても変わりません。月でも地球でも、3kgです。</p>'}
]};
})();
