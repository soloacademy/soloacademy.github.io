(function(){
var root=document.getElementById("unit");
var id=new URLSearchParams(location.search).get("u")||"";
function h(tag,cls,html){var e=document.createElement(tag);if(cls)e.className=cls;if(html!=null)e.innerHTML=html;return e}
function fail(){root.appendChild(h("p",null,'この単元は見つかりませんでした。<a href="index.html">一覧へ戻る</a>'))}
function norm(s){return String(s).normalize("NFKC").replace(/[\s,、，→>＞<＜]/g,"").toUpperCase()}
function num(s){var m=String(s).normalize("NFKC").match(/-?\d+(?:\.\d+)?/);return m?parseFloat(m[0]):NaN}
function judge(p,v){
  if(p.type==="text"||p.type==="order")return p.accept.some(function(a){return norm(a)===norm(v)});
  var n=num(v);if(isNaN(n))return false;
  return p.accept.some(function(a){return Math.abs(a-n)<=(p.tol||0)});
}
function problem(sec){
  var box=h("div","problem",sec.body);
  var rows=sec.parts.map(function(p){
    var r=h("div","part");
    r.appendChild(h("span",null,p.label));
    var i=h("input");i.type="text";i.autocomplete="off";i.setAttribute("aria-label",p.label+"の答え");
    if(p.type==="order"){i.readOnly=true;i.className="ord"}else if(p.type!=="text")i.inputMode="decimal";
    i.onkeydown=function(e){if(e.key==="Enter"&&!e.isComposing){e.preventDefault();b.click()}};
    var m=h("span","mark");m.setAttribute("aria-live","polite");
    r.appendChild(i);if(p.unit)r.appendChild(h("span",null,p.unit));r.appendChild(m);
    box.appendChild(r);
    if(p.type==="order"){
      var cs=h("div","choices"),bs=[];
      var clear=function(){m.textContent="";m.className="mark"};
      p.choices.forEach(function(c){var x=h("button","choice",c);x.type="button";x.onclick=function(){i.value+=(i.value?"→":"")+c;x.disabled=true;clear()};bs.push(x);cs.appendChild(x)});
      var z=h("button","choice",'やり直し');z.type="button";z.onclick=function(){i.value="";bs.forEach(function(x){x.disabled=false});clear()};cs.appendChild(z);
      box.appendChild(cs);
    }
    return {p:p,i:i,m:m};
  });
  var msg=h("p","msg");msg.setAttribute("aria-live","polite");
  var b=h("button",null,"答え合わせ");b.type="button";
  b.onclick=function(){
    var ok=0,blank=0;
    rows.forEach(function(r){
      if(r.i.value.trim()===""||(r.p.type==="order"&&r.i.value.split("→").length<r.p.choices.length)){blank++;r.m.textContent="";r.m.className="mark";return}
      var c=judge(r.p,r.i.value);if(c)ok++;
      r.m.textContent=c?"○":"×";r.m.className="mark "+(c?"ok":"ng");
    });
    msg.textContent=blank?"入力していない欄があります。":
      ok===rows.length?"全問正解です。":"×の欄をもう一度考えてみましょう。";
  };
  box.appendChild(b);box.appendChild(msg);
  return box;
}
function render(u){
  document.title=u.no+" "+u.title+"｜ソロアカデミー";
  root.appendChild(h("p","crumb",'<a href="index.html">ソロアカデミー</a>　中学1年 理科'));
  root.appendChild(h("h1",null,u.no+"　"+u.title));
  u.sections.forEach(function(s){
    root.appendChild(h("h2",null,s.title));
    if(s.type==="problem"){
      root.appendChild(problem(s));
      if(s.solution){var d=h("details");d.appendChild(h("summary",null,"解答と解き方"));d.appendChild(h("div",null,s.solution));root.appendChild(d)}
    }else if(s.type==="answer"){
      var d=h("details");d.appendChild(h("summary",null,"解答を見る"));d.appendChild(h("div",null,s.html));root.appendChild(d);
    }else if(s.type==="video"){
      var v=h("div","video"),f=document.createElement("iframe");
      f.src="https://www.youtube-nocookie.com/embed/"+encodeURIComponent(s.id);
      f.title=s.title;f.allowFullscreen=true;f.loading="lazy";v.appendChild(f);root.appendChild(v);
    }else{root.appendChild(h("div",null,s.html))}
  });
  root.appendChild(h("footer",null,"ソロアカデミー"));
}
if(!/^[a-z0-9-]+$/.test(id)){fail();return}
var sc=document.createElement("script");
sc.src="data/"+id+".js";
sc.onload=function(){render(window.UNIT)};
sc.onerror=fail;
document.head.appendChild(sc);
})();
