(function(){
var root=document.getElementById("unit");
var id=new URLSearchParams(location.search).get("u")||"";
function h(tag,cls,html){var e=document.createElement(tag);if(cls)e.className=cls;if(html!=null)e.innerHTML=html;return e}
function fail(){root.appendChild(h("p",null,'この単元は見つかりませんでした。<a href="index.html">一覧へ戻る</a>'))}
function norm(s){return String(s).normalize("NFKC").replace(/[\s,、，→>＞<＜]/g,"").toUpperCase()}
function num(s){var t=String(s).normalize("NFKC").replace(/[^0-9.\-]/g,"");return t===""?NaN:parseFloat(t)}
function judge(p,v){
  if(p.type==="text")return p.accept.some(function(a){return norm(a)===norm(v)});
  var n=num(v);if(isNaN(n))return false;
  return p.accept.some(function(a){return Math.abs(a-n)<=(p.tol||0)});
}
function problem(sec){
  var box=h("div","problem",sec.body);
  var rows=sec.parts.map(function(p){
    var r=h("div","part");
    r.appendChild(h("span",null,p.label));
    var i=h("input");i.type="text";i.autocomplete="off";i.setAttribute("aria-label",p.label+"の答え");
    if(p.type!=="text")i.inputMode="decimal";
    var m=h("span","mark");m.setAttribute("aria-live","polite");
    r.appendChild(i);if(p.unit)r.appendChild(h("span",null,p.unit));r.appendChild(m);
    box.appendChild(r);return {p:p,i:i,m:m};
  });
  var msg=h("p","msg");msg.setAttribute("aria-live","polite");
  var b=h("button",null,"答え合わせ");b.type="button";
  b.onclick=function(){
    var ok=0,blank=0;
    rows.forEach(function(r){
      if(r.i.value.trim()===""){blank++;r.m.textContent="";r.m.className="mark";return}
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
