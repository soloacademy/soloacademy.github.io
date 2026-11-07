(function(){
var INK="#26303b",BLUE="#1f5fa8",RED="#c2410c",MUTED="#5d6874",PALE="#e3edf8",PALER="#fdefe8";
function T(x,y,size,txt,cls,anchor){return '<text x="'+x+'" y="'+y+'" font-size="'+size+'"'+(anchor?' text-anchor="'+anchor+'"':'')+(cls?' class="'+cls+'"':'')+'>'+txt+'</text>'}
/* 色つきの面の上の文字：まわりの白いふちを消す */
function TN(x,y,size,txt,cls,anchor){return '<text x="'+x+'" y="'+y+'" font-size="'+size+'" style="stroke:none"'+(anchor?' text-anchor="'+anchor+'"':'')+(cls?' class="'+cls+'"':'')+'>'+txt+'</text>'}
function svg(w,h,label,body){return '<div class="fig"><svg viewBox="0 0 '+w+' '+h+'" role="img" aria-label="'+label+'">'+body+'</svg></div>'}
function line(x1,y1,x2,y2,k,w,dash){return '<line x1="'+x1+'" y1="'+y1+'" x2="'+x2+'" y2="'+y2+'" stroke="'+k+'" stroke-width="'+(w||1)+'"'+(dash?' stroke-dasharray="4 3"':'')+'/>'}

/* 厳選ポイントの図：600gの物体をばねにつるす。ばねののびは、重さに比例(1N＝11px)。地球は長く、月は短い */
function spring(cx,y1,y2){
 var n=Math.max(2,Math.round((y2-y1-8)/5)),st=(y2-y1-8)/n,p=[[cx,y1],[cx,y1+4]],i;
 for(i=0;i<n;i++)p.push([cx+(i%2?8:-8),+(y1+4+st*(i+.5)).toFixed(1)]);
 p.push([cx,y2-4],[cx,y2]);
 return '<polyline points="'+p.map(function(q){return q[0]+','+q[1]}).join(' ')+'" fill="none" stroke="'+INK+'" stroke-width="1.5" stroke-linejoin="round"/>'}
function panel(cx,name,N,ground){
 var y0=34,nat=50,ye=nat+11*N,s=T(cx,18,14,name,"b","middle")+
  line(cx-35,y0,cx+35,y0,INK,4)+spring(cx,y0,ye)+
  line(cx-50,nat,cx+34,nat,BLUE,1,true)+
  '<path d="M'+(cx+42)+','+nat+' V'+ye+' M'+(cx+38)+','+nat+' H'+(cx+46)+' M'+(cx+38)+','+ye+' H'+(cx+46)+'" fill="none" stroke="'+BLUE+'" stroke-width="1.5"/>'+
  T(cx+50,(nat+ye)/2+5,14,"のび","v b")+
  '<rect x="'+(cx-28)+'" y="'+ye+'" width="56" height="38" rx="4" fill="#e6e9ed" stroke="'+INK+'" stroke-width="1.2"/>'+
  TN(cx,ye+24,14,"600g","m b","middle");
 /* 重力の矢印：物体の左横。始まりは物体の中心の高さ。地球は太く、月は細く */
 var ax=cx-40,a0=ye+19,big=N>2,a1=big?a0+18:a0+16,tip=big?a0+32:a0+28,hw=big?10:4;
 s+=line(ax,a0,ax,a1,BLUE,big?5:1)+'<polygon points="'+(ax-hw)+','+a1+' '+(ax+hw)+','+a1+' '+ax+','+tip+'" fill="'+BLUE+'"/>'+
  T(ax-12,(a0+a1)/2+4,12,"重力","v","end");
 s+='<path d="M'+(cx-70)+',214 Q'+cx+',198 '+(cx+70)+',214 V230 H'+(cx-70)+' Z" fill="'+ground+'" stroke="#8a949f" stroke-width="1"/>'+
  T(cx,256,14,"質量　600g","m b","middle")+T(cx,278,14,"重さ　"+N+"N","v b","middle");
 return s}
function fig1(){
 var s=panel(85,"地球",6,"#cfe0f3")+panel(255,"月",1,"#e6e9ed")+
  T(170,130,12,"月へ","g","middle")+line(130,140,210,140,INK,1.5)+'<path d="M204,135 L210,140 L204,145" fill="none" stroke="'+INK+'" stroke-width="1.5"/>';
 return svg(340,292,"600gの物体をばねにつるした図。地球では、ばねが長くのびて、質量は600g、重さは6N。重力の矢印は太い。月に運ぶと、ばねののびは短くなって、重さは1N。重力の矢印は細い。質量は600gのまま変わらない",s)}

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
