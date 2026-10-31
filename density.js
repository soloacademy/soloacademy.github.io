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

/* 図4：2cm³・20gを半分に分けると、1cm³あたり10g */
var MET="#b4bbc3";
function fig4(){
 var px=14,py=14,pw=80,ph=40,d=12,b=py+d,t="";
 t+=poly([[px,b],[px+pw,b],[px+pw,b+ph],[px,b+ph]],MET,INK)+
  poly([[px,b],[px+d,py],[px+pw+d,py],[px+pw,b]],MET,INK,["#fff",.5])+
  poly([[px+pw,b],[px+pw+d,py],[px+pw+d,py+ph],[px+pw,b+ph]],MET,INK,["#000",.12])+
  line(px+40,b,px+40,b+ph,INK,1,true)+line(px+40,b,px+40+d,py,INK,1,true)+
  T(px+40,b+ph/2+5,13,"2cm³","v b","middle")+T(px+(pw+d)/2,96,19,"20g","m b","middle");
 t+=line(120,46,164,46,INK,1.5)+'<path d="M158,40 L164,46 L158,52" fill="none" stroke="'+INK+'" stroke-width="1.5"/>'+T(142,36,16,"÷2","b","middle");
 [176,240].forEach(function(x){
  t+=cube(x,14,40,MET)+T(x+20,51,13,"1cm³","v b","middle")+T(x+26,96,19,"10g","m b","middle")});
 t+=T(160,126,14,"1cm³あたり 10g ＝ 密度 10g/cm³","b","middle");
 return svg(320,136,"2cm³で20gのかたまりを2つに分けると、1cm³あたり10gになります。つまり密度は10g/cm³です",t)}
var fig4s=fig4();

/* 図3：メスシリンダーの拡大図（太め・上下はフェードアウト・金属の球を糸でつるす。1cm³=4） */
var uid=0;
function fade(id,inner){
 return '<defs><linearGradient id="'+id+'g" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#000"/><stop offset=".16" stop-color="#fff"/><stop offset=".84" stop-color="#fff"/><stop offset="1" stop-color="#000"/></linearGradient>'+
  '<mask id="'+id+'" maskUnits="userSpaceOnUse" x="0" y="20" width="320" height="220"><rect x="0" y="20" width="320" height="220" fill="url(#'+id+'g)"/></mask></defs><g mask="url(#'+id+')">'+inner+'</g>'}
function tube(x,level,lab,hang){
 var w=72,T0=24,B0=236,Y=function(v){return 130-(v-65)*4},L=Y(level),s="";
 s+='<rect x="'+x+'" y="'+L+'" width="'+w+'" height="'+(B0-L)+'" fill="#cfe0f3"/>';
 if(hang)s+=line(x+w/2,T0,x+w/2,155,"#5d6874",1)+'<circle cx="'+(x+w/2)+'" cy="176" r="21" fill="#8a949f" fill-opacity=".75" stroke="#5d6874" stroke-width="1"/><ellipse cx="'+(x+w/2-7)+'" cy="168" rx="6" ry="4" fill="#fff" fill-opacity=".45"/>';
 s+='<path d="M'+x+','+T0+' V'+B0+' M'+(x+w)+','+T0+' V'+B0+'" stroke="'+INK+'" stroke-width="1.5" fill="none"/>';
 s+='<path d="M'+x+','+(L-3)+' Q'+(x+w/2)+','+(L+3)+' '+(x+w)+','+(L-3)+'" fill="none" stroke="'+BLUE+'" stroke-width="2"/>';
 for(var v=44;v<=86;v++){var y=Y(v),t=v%10===0,f=v%5===0;
  s+=line(x,y,x+(t?12:f?8:5),y,INK,t?1.2:.7);
  if(t&&lab)s+=T(x-5,y+4,13,v,(v===60||v===70)?"v b":"g","end")}
 return s}
function fig3(show){
 var b=fade("fd"+(++uid),tube(34,60,true,false)+tube(182,70,false,true))+
  line(239,176,266,176,RED,1)+T(268,180,12,"金属79g","m b")+
  T(70,262,13,"水だけ 60cm³","b","middle")+T(218,262,13,"沈めたあと 70cm³","b","middle");
 if(show)b+=line(106,150,174,150,"#5d6874",1,true)+
  '<path d="M182,110 H174 V150 H182" fill="none" stroke="'+BLUE+'" stroke-width="2"/>'+
  T(168,128,17,"10cm³","v b","end")+T(168,144,11,"金属の体積","v","end");
 return svg(320,270,show?"メスシリンダーの目もりの拡大図。糸でつるした金属79gを水に入れると、水面が60cm³から70cm³に上がり、増えた10cm³が金属の体積であることを表す図":"メスシリンダーの目もりの拡大図。60cm³の水に、糸でつるした金属79gを入れると、水面が70cm³まで上がる図",b)}

/* 練習問題の解説：分数で比べる */
var D={A:[23,31],B:[23,37],C:[29,23],D:[29,31]};
function fr(k,eq){var d=D[k];return '<span class="frac"><span class="m'+(eq==="m"?" eqm":"")+'">'+d[0]+'g</span><span class="v'+(eq==="v"?" eqv":"")+'">'+d[1]+'cm³</span></span>'}
function it(k,eq){return '<span class="item"><span class="lab">'+k+'</span>'+fr(k,eq)+'</span>'}
function cmp(a,b,eq,why){return '<div class="cmp">'+it(a,eq)+'<span class="lt">＜</span>'+it(b,eq)+'<p>'+why+'</p></div>'}
var M='<span class="m">質量</span>',V='<span class="v">体積</span>';
var SOL='<p>密度は 質量÷体積 です。まず、4つを分数にします。</p><div class="fr4">'+it("A")+it("B")+it("C")+it("D")+'</div>'+
 '<p>次に、色のついた「そろっているところ」に目をつけて、2つずつ比べます。</p>'+
 cmp("B","A","m",M+'がそろっている(23g)。'+V+'が大きいBのほうが、密度は小さい。')+
 cmp("A","D","v",V+'がそろっている(31cm³)。'+M+'が大きいDのほうが、密度は大きい。')+
 cmp("D","C","m",M+'がそろっている(29g)。'+V+'が小さいCのほうが、密度は大きい。')+
 '<p>小さい順に <b>B、A、D、C</b></p>';

window.UNIT={
no:"1-1",title:"密度",
sections:[
{type:"text",point:true,title:"大事なところ",html:
 '<p>密度は「<span class="v">1cm³</span>あたりの<span class="m">質量</span>」です。</p>'+fig4s+
 '<div class="formula">密度(g/cm³) ＝ <span class="frac"><span class="m">質量(g)</span><span class="v">体積(cm³)</span></span></div>'+
 '<div class="formula"><span class="m">g</span>/<span class="v">cm³</span> ＝ <span class="m">g</span> ÷ <span class="v">cm³</span> ＝ <span class="frac"><span class="m">g</span><span class="v">cm³</span></span></div>'+
 '<p class="note">「/」は「÷」の意味です。「/」の左が分数の上(分子)、右が下(分母)になります。</p>'},
{type:"problem",title:"問題",
 body:'<p>60cm³の水を入れたメスシリンダーに、ある金属79gを沈めたところ、目もりは70cm³になった。</p>'+fig3(false)+
 '<p>(1) この金属の密度(g/cm³)を求めなさい。</p>'+
 '<p>(2) この金属100cm³の質量(g)を求めなさい。(1)の答えを使って計算しなさい。</p>',
 parts:[
  {label:"(1)",unit:"g/cm³",type:"number",accept:[7.9],tol:0.005},
  {label:"(2)",unit:"g",type:"number",accept:[790],tol:0.5}
 ]},
{type:"answer",html:
 '<p>メスシリンダーの目もりは、水面のへこみの一番低いところを、真横から読みます。</p>'+
 '<p>水の増加量が、沈めた金属の体積です。</p>'+fig3(true)+
 '<p>(1) 金属の体積は 70cm³ − 60cm³ ＝ <span class="v">10cm³</span>。<br>密度は <span class="m">79g</span> ÷ <span class="v">10cm³</span> ＝ <b>7.9g/cm³</b></p>'+
 '<p>(2) 7.9g/cm³ × 100cm³ ＝ <b>790g</b><br><span class="note">g/cm³ × cm³ で、cm³ が約分されて g になります。</span></p>'},
{type:"problem",title:"補充問題",
 body:'<p>次の物体A、B、C、Dを、密度の小さい順に並べなさい。</p>'+
 '<table><tr><th></th><th>A</th><th>B</th><th>C</th><th>D</th></tr>'+
 '<tr><td>質量</td><td>23g</td><td>23g</td><td>29g</td><td>29g</td></tr>'+
 '<tr><td>体積</td><td>31cm³</td><td>37cm³</td><td>23cm³</td><td>31cm³</td></tr></table>'+
 '<p class="note">小さい順に、下のボタンを押して並べます。</p>',
 parts:[{label:"答え",type:"order",choices:["A","B","C","D"],accept:["BADC"]}],
 solution:SOL}
]};
})();
