(function(){
var root=document.getElementById("unit");
var id=new URLSearchParams(location.search).get("u")||"";
function h(tag,cls,html){var e=document.createElement(tag);if(cls)e.className=cls;if(html!=null)e.innerHTML=html;return e}
function fail(){root.appendChild(h("p",null,'この単元は見つかりませんでした。<a href="index.html">一覧へ戻る</a>'))}
function norm(s){return String(s).normalize("NFKC").replace(/[\s,、，→>＞<＜]/g,"").toUpperCase()}
function num(s){var m=String(s).normalize("NFKC").match(/-?\d+(?:\.\d+)?/);return m?parseFloat(m[0]):NaN}
function judge(p,v){
  if(p.type==="text"||p.type==="order"||p.type==="choice")return p.accept.some(function(a){return norm(a)===norm(v)});
  var n=num(v);if(isNaN(n))return false;
  return p.accept.some(function(a){return Math.abs(a-n)<=(p.tol||0)});
}
function problem(sec){
  var box=h("div","problem",sec.body);
  var mx=null;
  var rows=sec.parts.map(function(p){
    if(p.type==="tree"){
      var wrap=h("div",null,p.svg),vals={},marks={},sel=null,ids=Object.keys(p.answers),bs={};
      box.appendChild(wrap);
      var gs=function(id){return Array.prototype.slice.call(wrap.querySelectorAll('[data-b="'+id+'"]'))};
      var setSel=function(id){sel=id;ids.forEach(function(k){gs(k).forEach(function(g){g.classList.toggle("sel",k===id)})})};
      var put=function(id,w){vals[id]=w;marks[id].className="mark";gs(id).forEach(function(g){g.querySelector(".bt").textContent=w;g.setAttribute("aria-label","空欄 "+(w||"未記入"))})};
      var cs=h("div","choices");
      var nextId=function(){return ids.filter(function(k){return !vals[k]})[0]||null};
      var rs=ids.map(function(id){
        var m={};
        Object.defineProperty(m,"className",{set:function(v){var k=v.indexOf("ok")>=0?"ok":v.indexOf("ng")>=0?"ng":"";gs(id).forEach(function(g){g.setAttribute("class","bl"+(k?" "+k:"")+(sel===id?" sel":""));g.querySelector(".bm").textContent=k==="ok"?"○":k==="ng"?"×":""})}});
        Object.defineProperty(m,"textContent",{set:function(){}});
        marks[id]=m;
        gs(id).forEach(function(g){g.setAttribute("role","button");g.setAttribute("tabindex","0");g.setAttribute("aria-label","空欄 未記入")});
        return {p:{type:"choice",accept:[p.answers[id]]},i:{get value(){return vals[id]||""}},m:m};
      });
      wrap.addEventListener("click",function(e){
        var g=e.target.closest?e.target.closest("[data-b]"):null;if(!g)return;
        var id=g.getAttribute("data-b");
        if(vals[id]){bs[vals[id]].disabled=false;put(id,"")}
        setSel(id);
      });
      wrap.addEventListener("keydown",function(e){if(e.key==="Enter"||e.key===" "){var g=e.target.closest&&e.target.closest("[data-b]");if(g){e.preventDefault();g.dispatchEvent(new MouseEvent("click",{bubbles:true}))}}});
      p.choices.forEach(function(c){
        var x=h("button","choice",c);x.type="button";bs[c]=x;
        x.onclick=function(){
          var t=(sel&&!vals[sel])?sel:ids.filter(function(k){return !vals[k]})[0];
          if(!t)return;
          put(t,c);x.disabled=true;setSel(nextId());
        };
        cs.appendChild(x);
      });
      var z=h("button","choice","やり直し");z.type="button";
      z.onclick=function(){ids.forEach(function(k){if(vals[k]){bs[vals[k]].disabled=false;put(k,"")}});setSel(nextId())};
      cs.appendChild(z);box.appendChild(cs);setSel(nextId());
      return rs;
    }
    if(p.type==="choice"){
      if(!mx){
        mx=h("table","mx");var hd=h("tr");hd.appendChild(h("th",null,""));
        p.choices.forEach(function(c){var t=h("th",null,c);t.setAttribute("scope","col");hd.appendChild(t)});
        hd.appendChild(h("th",null,""));mx.appendChild(hd);
        var wrap=h("div");wrap.style.overflowX="auto";wrap.appendChild(mx);box.appendChild(wrap);
      }
      var tr=h("tr"),pl=p.label.replace(/<[^>]*>/g,""),iv={value:""},mk=h("span","mark");
      tr.setAttribute("role","radiogroup");tr.setAttribute("aria-label",pl);mk.setAttribute("aria-live","polite");
      tr.appendChild(h("td",null,p.label));
      var dots=[];
      p.choices.forEach(function(c){
        var td=h("td"),x=h("button","dot");x.type="button";x.setAttribute("role","radio");x.setAttribute("aria-checked","false");x.setAttribute("aria-label",pl+" "+c);
        x.onclick=function(){iv.value=c;dots.forEach(function(y){y.setAttribute("aria-checked",y===x?"true":"false")});mk.textContent="";mk.className="mark"};
        dots.push(x);td.appendChild(x);tr.appendChild(td);
      });
      var tm=h("td");tm.appendChild(mk);tr.appendChild(tm);mx.appendChild(tr);
      return {p:p,i:iv,m:mk};
    }
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
  rows=[].concat.apply([],rows);
  var msg=h("p","msg");msg.setAttribute("aria-live","polite");
  var b=h("button",null,"答え合わせ");b.type="button";
  b.onclick=function(){
    var ok=0,blank=0;
    rows.forEach(function(r){
      if(r.i.value.trim()===""||(r.p.type==="order"&&r.i.value.split("→").length<r.p.choices.length)){blank++;r.m.textContent="";r.m.className="mark";return}
      var c=judge(r.p,r.i.value);if(c)ok++;
      r.m.textContent=c?"○":"×";r.m.className="mark "+(c?"ok":"ng");
    });
    msg.textContent=blank?"答えていない欄があります。":
      ok===rows.length?"全問正解です。":"×の欄をもう一度考えてみましょう。";
  };
  box.appendChild(b);box.appendChild(msg);
  return box;
}
function nav(){
  var L=window.UNITS||[],i=-1;L.forEach(function(u,k){if(u.id===id)i=k});
  if(i<0)return null;
  var d=h("nav","pn");d.setAttribute("aria-label","前後の単元");
  function cell(u,cls,lab){
    if(!u)return h("span",cls);
    var a=h("a",cls,'<span class="pn-l">'+lab+'</span><span class="pn-t">'+u.no+'　'+u.title+'</span>');
    a.href="unit.html?u="+u.id;return a;
  }
  d.appendChild(cell(L[i-1],"pn-p","← 前の単元"));
  d.appendChild(cell(L[i+1],"pn-n","次の単元 →"));
  return d;
}
function render(u){
  document.title=u.no+" "+u.title+"｜ソロアカデミー";
  root.appendChild(h("p","crumb",'<a href="index.html">ソロアカデミー</a>　中学1年 理科'));
  root.appendChild(h("h1",null,u.no+"　"+u.title));
  u.sections.forEach(function(s){
    if(s.point){var bx=h("div","point");bx.appendChild(h("h2","point-label",s.title));bx.insertAdjacentHTML("beforeend",s.html);root.appendChild(bx);return}
    if(s.title)root.appendChild(h("h2",null,s.title));
    if(s.type==="problem"){
      root.appendChild(problem(s));
      if(s.solution){var d=h("details");d.appendChild(h("summary",null,s.solutionLabel||"補充問題の解答と解説を見る"));d.appendChild(h("div",null,s.solution));root.appendChild(d)}
    }else if(s.type==="answer"){
      var d=h("details");d.appendChild(h("summary",null,s.label||"問題の解答と解説を見る"));d.appendChild(h("div",null,s.html));root.appendChild(d);
    }else if(s.type==="video"){
      var v=h("div","video"),f=document.createElement("iframe");
      f.src="https://www.youtube-nocookie.com/embed/"+encodeURIComponent(s.id);
      f.title=s.title;f.allowFullscreen=true;f.loading="lazy";v.appendChild(f);root.appendChild(v);
    }else{root.appendChild(h("div",null,s.html))}
  });
  var nv=nav();if(nv)root.appendChild(nv);
  root.appendChild(h("footer",null,"ソロアカデミー"));
}
if(!/^[a-z0-9-]+$/.test(id)){fail();return}
var sc=document.createElement("script");
sc.src="data/"+id+".js";
sc.onload=function(){render(window.UNIT)};
sc.onerror=fail;
document.head.appendChild(sc);
})();
