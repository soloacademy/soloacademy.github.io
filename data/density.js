(function(){
var INK="#26303b",BLUE="#1f5fa8",RED="#c2410c";
function pts(a){return a.map(function(p){return p.join(",")}).join(" ")}
function poly(a,f,k,o){return '<polygon points="'+pts(a)+'" fill="'+f+'" stroke="'+k+'" stroke-width="1" stroke-linejoin="round"/>'+(o?'<polygon points="'+pts(a)+'" fill="'+o[0]+'" fill-opacity="'+o[1]+'"/>':'')}
function cube(x,y,s,c,k){k=k||INK;var d=Math.round(s*.3),b=y+d;
 return poly([[x,b],[x+s,b],[x+s,b+s],[x,b+s]],c,k)+
  poly([[x,b],[x+d,y],[x+s+d,y],[x+s,b]],c,k,["#fff",.5])+
  poly([[x+s,b],[x+s+d,y],[x+s+d,y+s],[x+s,b+s]],c,k,["#000",.12])}
function T(x,y,size,txt,cls,anchor){return '<text x="'+x+'" y="'+y+'" font-size="'+size+'"'+(anchor?' text-anchor="'+anchor+'"':'')+(cls?' class="'+cls+'"':'')+'>'+txt+'</text>'}
function svg(w,h,label,body){return '<div class="fig"><svg viewBox="0 0 '+w+' '+h+'" role="img" aria-label="'+label+'">'+body+'</svg></div>'}
function line(x1,y1,x2,y2,k,w,dash){return '<line x1="'+x1+'" y1="'+y1+'" x2="'+x2+'" y2="'+y2+'" stroke="'+k+'" stroke-width="'+(w||1)+'"'+(dash?' stroke-dasharray="4 3"':'')+'/>'}

/* 図1：1cm³あたりの質量 */
var fig1=svg(320,150,"体積1cm³の立方体の質量が、密度になることを表す図",
 cube(24,24,70,"#dbe8f6",BLUE)+T(59,142,15,"体積 1cm³","v b","middle")+
 line(124,85,164,85,INK,2)+'<polygon points="172,85 162,79 162,91" fill="'+INK+'"/>'+
 T(180,66,14,"1cm³あたりの")+T(180,94,21,"質量(g)","m b")+T(180,120,14,"これが密度"));

/* 図2：1cm³の立方体の比較（縦並び） */
var rows=[["水素","0.00008","#ffffff"],["エタノール","0.79","#e3e8ee"],["水","1.00","#cfe0f3"],["鉄","7.87","#aeb4bb"],["金","19.30","#f0d48a"]];
var b2=T(310,16,13,"1cm³あたりの質量","g","end");
rows.forEach(function(r,i){var y=26+i*52;
 b2+=cube(14,y,30,r[2])+T(62,y+30,17,r[0])+T(310,y+30,18,r[1]+"g","m b","end")+line(0,y+50,320,y+50,"#dde2e7")});
var fig2=svg(320,286,"水素0.00008g、エタノール0.79g、水1.00g、鉄7.87g、金19.30gが、それぞれ1cm³あたりの質量です",b2);

/* 図3：メスシリンダー（show=trueで増えた体積の印を入れる） */
function tube(x,level,metal){
 var s="",top=30,w=50,sc=8;
 s+='<rect x="'+x+'" y="'+(top+(70-level)*sc)+'" width="'+w+'" height="'+((level-50)*sc)+'" fill="#cfe0f3"/>';
 if(metal)s+='<rect x="'+(x+15)+'" y="170" width="20" height="20" fill="#8a949f" stroke="'+INK+'"/>';
 s+='<rect x="'+x+'" y="'+top+'" width="'+w+'" height="160" fill="none" stroke="'+INK+'" stroke-width="1.5"/>';
 s+=line(x,top+(70-level)*sc,x+w,top+(70-level)*sc,BLUE,2);
 [70,65,60,55,50].forEach(function(v){var y=top+(70-v)*sc;
  s+=line(x,y,x+8,y,INK)+T(x-5,y+4,11,v,v%10?"g":"b","end")});
 return s}
function fig3(show){
 var b=tube(30,60,false)+tube(150,65,true)+
  T(52,214,13,"水だけ 60cm³","b","middle")+T(175,214,13,"金属を入れる 65cm³","b","middle")+
  line(186,180,214,180,RED,1)+T(218,184,12,"金属39.4g","m");
 if(show)b+=line(80,110,150,110,"#5d6874",1,true)+
  '<path d="M206,70 h6 v40 h-6" fill="none" stroke="'+BLUE+'" stroke-width="2"/>'+
  T(220,88,16,"5cm³","v b")+T(220,106,12,"金属の体積","v");
 return svg(320,224,show?"水が60cm³から65cm³に増え、増えた5cm³が金属の体積であることを表す図":"60cm³の水が入ったメスシリンダーに金属を沈めると、目もりが65cm³になる図",b)}

window.UNIT={
no:"1-1",title:"密度",
sections:[
{type:"problem",title:"例題",
 body:'<p>60cm³の水を入れたメスシリンダーに、ある金属39.4gを沈めたところ、目もりは65cm³になった。</p>'+fig3(false)+
 '<p>(1) この金属の密度(g/cm³)を求めなさい。答えは、小数第2位を四捨五入して、小数第1位まで求めなさい。</p>'+
 '<p>(2) この金属100cm³の質量(g)を求めなさい。(1)の答えを使って計算しなさい。</p>',
 parts:[
  {label:"(1)",unit:"g/cm³",type:"number",accept:[7.9,7.88],tol:0.005},
  {label:"(2)",unit:"g",type:"number",accept:[790,788],tol:0.5}
 ]},
{type:"text",title:"解説",html:
 '<p>密度は「1cm³あたりの質量」です。</p>'+fig1+
 '<div class="formula">密度(g/cm³) ＝ <span class="frac"><span class="m">質量(g)</span><span class="v">体積(cm³)</span></span></div>'+
 '<p class="note">g/cm³ の「/」は「÷」の意味です。分子が<span class="m">質量</span>、分母が<span class="v">体積</span>になります。</p>'+
 '<p>体積が同じ1cm³でも、物質によって質量はこれだけちがいます。この数字(g)が、そのまま密度(g/cm³)です。</p>'+fig2+
 '<p>水の増加量が、沈めた金属の体積です。</p>'+fig3(true)},
{type:"answer",title:"解答",html:
 '<p>(1) 金属の体積は 65cm³ − 60cm³ ＝ 5cm³。<br>密度は 39.4g ÷ 5cm³ ＝ 7.88g/cm³ ≒ <b>7.9g/cm³</b></p>'+
 '<p>(2) 7.9g/cm³ × 100cm³ ＝ <b>790g</b><br><span class="note">g/cm³ × cm³ で、cm³ が約分されて g になります。</span></p>'},
{type:"problem",title:"練習問題",
 body:'<p>次の物体A、B、C、Dを、密度の小さい順に並べなさい。</p>'+
 '<table><tr><th></th><th>A</th><th>B</th><th>C</th><th>D</th></tr>'+
 '<tr><td>質量</td><td>23g</td><td>23g</td><td>29g</td><td>29g</td></tr>'+
 '<tr><td>体積</td><td>31cm³</td><td>37cm³</td><td>23cm³</td><td>31cm³</td></tr></table>'+
 '<p class="note">例：DCBA のように、記号だけを並べて入力します。</p>',
 parts:[{label:"答え",type:"text",accept:["BADC"]}],
 solution:'<p>密度 ＝ 質量 ÷ 体積 で求めます。<br>A ≒ 0.74、B ≒ 0.62、C ≒ 1.26、D ≒ 0.94（g/cm³）</p><p>小さい順に <b>B、A、D、C</b></p>'}
]};
})();
