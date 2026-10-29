window.UNIT={
no:"1-1",title:"密度",
sections:[
{type:"problem",title:"例題",
 body:'<p>60cm³の水を入れたメスシリンダーに、ある金属39.4gを沈めたところ、目もりは65cm³になった。</p>',
 parts:[
  {label:"(1)",unit:"g/cm³（小数第2位を四捨五入）",type:"number",accept:[7.9,7.88],tol:0.005},
  {label:"(2)",unit:"g（この金属100cm³の質量）",type:"number",accept:[790,788],tol:0.5}
 ]},
{type:"text",title:"解説",html:
 '<p>密度は「1cm³あたりの質量」です。</p>'+
 '<div class="formula">密度(g/cm³) ＝ <span class="frac"><span>質量(g)</span><span>体積(cm³)</span></span></div>'+
 '<p class="note">g/cm³ の「/」は「÷」の意味です。分子が質量、分母が体積になります。</p>'+
 '<table><tr><th>物質</th><th>1cm³の質量(g)</th></tr>'+
 '<tr><td>水素</td><td>0.00008</td></tr><tr><td>エタノール</td><td>0.79</td></tr>'+
 '<tr><td>水</td><td>1.00</td></tr><tr><td>鉄</td><td>7.87</td></tr><tr><td>金</td><td>19.30</td></tr></table>'+
 '<p>水の増加量が、沈めた金属の体積です。</p>'},
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
