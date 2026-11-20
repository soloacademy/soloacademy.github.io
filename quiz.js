(function(){
var root=document.getElementById("unit");
var id=new URLSearchParams(location.search).get("u")||"";
function h(tag,cls,html){var e=document.createElement(tag);if(cls)e.className=cls;if(html!=null)e.innerHTML=html;return e}
function fail(){root.appendChild(h("p",null,'この単元は見つかりませんでした。<a href="index.html">一覧へ戻る</a>'))}
function norm(s){return String(s).normalize("NFKC").replace(/[\s,、，→>＞<＜]/g,"").toUpperCase()}
function num(s){var m=String(s).normalize("NFKC").match(/-?\d+(?:\.\d+)?/);return m?parseFloat(m[0]):NaN}
function setBt(e,w){
  e.textContent="";
  if(w.indexOf("その他の")===0&&w.length>5){
    [w.slice(0,4),w.slice(4)].forEach(function(t,k){var s=document.createElementNS("http://www.w3.org/2000/svg","tspan");s.setAttribute("x",e.getAttribute("x"));if(k)s.setAttribute("dy","16");s.textContent=t;e.appendChild(s)});
  }else e.textContent=w;
}
function judge(p,v){
  if(p.type==="text"||p.type==="order"||p.type==="choice"||p.type==="pick"||p.type==="count"||p.type==="eq")return p.accept.some(function(a){return norm(a)===norm(v)});
  var n=num(v);if(isNaN(n))return false;
  return p.accept.some(function(a){return Math.abs(a-n)<=(p.tol||0)});
}
var SB={"₀":"0","₁":"1","₂":"2","₃":"3","₄":"4","₅":"5","₆":"6","₇":"7","₈":"8","₉":"9"};
function ionHtml(t){return t.replace(/[₀-₉]+/g,function(m){return '<span class="cn-f">'+m.split("").map(function(c){return SB[c]}).join("")+"</span>"})}
var cntDone=false;
function cntCss(){
  if(cntDone)return;cntDone=true;
  var st=document.createElement("style");
  st.textContent=".cnt{row-gap:0}.cnt .cn-h{flex:0 0 100%;display:flex;align-items:center;gap:.6rem}.cnt .cn-g{display:flex;flex-wrap:nowrap;flex:none;gap:0}.cnt .cn-r{display:flex;align-items:center;gap:.5rem;flex-wrap:nowrap}.cnt button.cn-b{display:inline-flex;align-items:baseline;min-height:44px;padding:0 .08rem;border:0;border-radius:0;background:none;color:var(--ink);cursor:pointer}.cnt button.cn-b:hover{background:none}.cnt button.cn-b:active{background:var(--tint)}.cn-s{font-size:1.5rem;font-weight:700;line-height:44px}.cn-u{font-size:.95rem;margin-left:1px;position:relative;top:.45rem;color:var(--accent);font-weight:700;line-height:1.2}.cn-u:empty{display:none}.cn-s i{font-style:normal}.cn-f{font-size:.95rem;position:relative;top:.45rem;margin-left:1px;line-height:1.2}.cnt button.cn-ion{margin-left:.35rem}.cnt button.cn-ion:first-child,.cnt button.cn-ion.cn-par{margin-left:0}.cgrid .cn-f{font-size:.75rem;top:.38rem}.cgrid{display:grid;column-gap:.5rem;row-gap:.3rem;margin:.6rem 0}.cgrid .part{margin:0;min-width:0}.cgrid .part{flex-direction:column;flex-wrap:nowrap;justify-content:space-between}.cgrid .cn-h{display:block;flex:none;font-size:.8rem;line-height:1.5}.cgrid .part{align-items:stretch}.cgrid .cn-r{flex-wrap:wrap;gap:0 .1rem}.cgrid button.cn-ion{margin-left:.25rem}.cgrid .cn-b{min-height:40px}.cgrid .cn-s{font-size:1.1rem;line-height:40px}.cgrid .cn-u{font-size:.75rem;top:.38rem}.cgrid .part .mark.ok,.cgrid .part .mark.ng{width:1rem;height:1rem}";
  document.head.appendChild(st);
}
var eqDone=false;
function eqCss(){
  if(eqDone)return;eqDone=true;
  var st=document.createElement("style");
  st.textContent=".part.eqp{display:block;margin:1.1rem 0}.eqp .eq-h{margin:0 0 .35rem}.eq-r{display:flex;flex-wrap:wrap;align-items:center;gap:.4rem .1rem;margin:.15rem 0}.eq-t{display:inline-flex;align-items:center;white-space:nowrap}.eq-s{padding:0 .25rem;font-weight:700}.eqp button.eq-c,.eqp button.eq-f{height:2.4rem;background:#fff;border:1.5px dashed #9aa5b1;border-radius:4px;padding:0}.eqp button.eq-c{min-width:1.5rem;margin-right:.1rem;color:var(--mass);font-weight:700}.eqp button.eq-f{min-width:3.6rem;padding:0 .25rem;color:var(--ink)}.eqp button.eq-c:hover,.eqp button.eq-f:hover{background:var(--tint)}.eqp button.eq-c.on,.eqp button.eq-f.on{border-style:solid}.eqp button.eq-f.sel{border:2px solid var(--accent);background:#cfe0f3}";
  document.head.appendChild(st);
}
function eqKey(a){return a.map(function(t){return (t[1]>1?t[1]:"")+t[0]}).sort().join(";")}
function problem(sec){
  var box=h("div","problem",sec.body);
  var mx=null,gw=null;
  var rows=sec.parts.map(function(p){
    if(p.head)box.appendChild(h("p",null,p.head));
    if(p.type==="tree"){
      var wrap=h("div",null,p.svg),vals={},marks={},sel=null,ids=Object.keys(p.answers),bs={};
      box.appendChild(wrap);
      var gs=function(id){return Array.prototype.slice.call(wrap.querySelectorAll('[data-b="'+id+'"]'))};
      var setSel=function(id){sel=id;ids.forEach(function(k){gs(k).forEach(function(g){g.classList.toggle("sel",k===id)})})};
      var put=function(id,w){vals[id]=w;marks[id].className="mark";gs(id).forEach(function(g){setBt(g.querySelector(".bt"),w);g.setAttribute("aria-label","空欄 "+(w||"未記入"))})};
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
    if(p.type==="count"){
      cntCss();
      var cc=p.choices||["1","2","3","4"],cr=h("div","part cnt"),cv=p.els.map(function(){return cc[0]}),cm=h("span","mark");
      cm.setAttribute("aria-live","polite");cr.setAttribute("role","group");
      cr.setAttribute("aria-label",(p.label+" "+(p.text||"")).replace(/<[^>]*>/g,""));
      var ch=h("span","cn-h",p.label+" "+(p.text||""));cr.appendChild(ch);
      var cg=h("span","cn-g");
      p.els.forEach(function(el,k){
        var poly=(el.match(/[A-Z]/g)||[]).length>1,
          x=h("button","cn-b"+(poly?" cn-ion":""),'<span class="cn-s"><i></i>'+ionHtml(el)+'<i></i></span><span class="cn-u"></span>'),
          u=x.lastChild,po=x.firstChild.firstChild,pc=x.firstChild.lastChild;
        x.type="button";x.setAttribute("aria-label",el+"の個数 "+cc[0]);
        x.onclick=function(){
          cv[k]=cc[(cc.indexOf(cv[k])+1)%cc.length];
          u.textContent=cv[k]===cc[0]?"":cv[k];var pr=poly&&cv[k]!==cc[0];po.textContent=pr?"(":"";pc.textContent=pr?")":"";x.classList.toggle("cn-par",pr);x.setAttribute("aria-label",el+"の個数 "+cv[k]);
          cm.textContent="";cm.className="mark"};
        cg.appendChild(x)});
      var cw=h("span","cn-r");cw.appendChild(cg);cw.appendChild(cm);cr.appendChild(cw);
      if(sec.cols){if(!gw){gw=h("div","cgrid");gw.style.gridTemplateColumns="repeat("+sec.cols+",minmax(0,1fr))";box.appendChild(gw)}gw.appendChild(cr)}else box.appendChild(cr);
      return {p:p,i:{get value(){return cv.join("")}},m:cm};
    }
    if(p.type==="eq"){
      eqCss();
      var er=h("div","part eqp"),slots=[],ebs={},esel=-1,em=h("span","mark"),CO=[1,2,3,4];
      em.setAttribute("aria-live","polite");er.setAttribute("role","group");
      er.setAttribute("aria-label",(p.label+" "+(p.text||"")).replace(/<[^>]*>/g,""));
      var eh=h("p","eq-h",p.label+" "+(p.text||"")+" ");eh.appendChild(em);er.appendChild(eh);
      var eclr=function(){em.textContent="";em.className="mark"};
      var eqNext=function(){for(var j=0;j<slots.length;j++)if(!slots[j].v)return j;return -1};
      var eqSel=function(k){esel=k;slots.forEach(function(s,j){s.f.classList.toggle("sel",j===k)})};
      var eqPut=function(s,w){s.v=w;s.f.textContent=w;s.f.classList.toggle("on",!!w);s.f.setAttribute("aria-label","空欄 "+(w||"未記入"))};
      p.accept=[eqKey(p.L)+"="+eqKey(p.R)];
      var erow=h("div","eq-r");er.appendChild(erow);
      [p.L,p.R].forEach(function(side,si){
        side.forEach(function(t,k){
          var g=h("span","eq-t"),s={v:"",c:1,si:si},ix=slots.length;
          var cb=h("button","eq-c","");cb.type="button";cb.setAttribute("aria-label","係数 なし");
          cb.onclick=function(){s.c=CO[(CO.indexOf(s.c)+1)%CO.length];cb.textContent=s.c>1?s.c:"";cb.classList.toggle("on",s.c>1);cb.setAttribute("aria-label","係数 "+(s.c>1?s.c:"なし"));eclr()};
          var fb=h("button","eq-f","");fb.type="button";fb.setAttribute("aria-label","空欄 未記入");
          fb.onclick=function(){if(s.v){ebs[s.v].disabled=false;eqPut(s,"")}eqSel(ix);eclr()};
          s.f=fb;slots.push(s);g.appendChild(cb);g.appendChild(fb);
          if(k<side.length-1)g.appendChild(h("span","eq-s","+"));else if(si===0)g.appendChild(h("span","eq-s","→"));
          erow.appendChild(g);
        });
      });
      var ecs=h("div","choices");ecs.style.marginTop=".6rem";
      p.choices.forEach(function(c){
        var x=h("button","choice",c);x.type="button";ebs[c]=x;
        x.onclick=function(){
          var j=(esel>=0&&!slots[esel].v)?esel:eqNext();
          if(j<0)return;
          eqPut(slots[j],c);x.disabled=true;eqSel(eqNext());eclr();
        };
        ecs.appendChild(x);
      });
      er.appendChild(ecs);box.appendChild(er);eqSel(eqNext());
      return {p:p,i:{get value(){
        if(slots.some(function(s){return !s.v}))return "";
        var a=[[],[]];slots.forEach(function(s){a[s.si].push([s.v,s.c])});
        return eqKey(a[0])+"="+eqKey(a[1]);
      }},m:em};
    }
    if(p.type==="pick"){
      var pr=h("div","part pick"),pv={value:""},pm=h("span","mark"),pbs=[],pb=h("div","pk-bt");
      pm.setAttribute("aria-live","polite");pr.setAttribute("role","radiogroup");pr.setAttribute("aria-label",(p.label+" "+(p.text||"")).replace(/<svg[\s\S]*?<\/svg>/g,"").replace(/<[^>]*>/g,""));
      pr.appendChild(h("span","pk-no",p.label));pr.appendChild(h("span","pk-tx",p.text||""));
      p.choices.forEach(function(c){
        var x=h("button","choice",c);x.type="button";x.setAttribute("role","radio");x.setAttribute("aria-checked","false");
        x.onclick=function(){pv.value=c;pbs.forEach(function(y){y.setAttribute("aria-checked",y===x?"true":"false")});pm.textContent="";pm.className="mark"};
        pbs.push(x);pb.appendChild(x)});
      pb.appendChild(pm);pr.appendChild(pb);box.appendChild(pr);
      return {p:p,i:pv,m:pm};
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
    var i=h("input");i.type="text";i.autocomplete="off";i.setAttribute("autocapitalize","off");i.setAttribute("autocorrect","off");i.spellcheck=false;i.setAttribute("aria-label",p.label+"の答え");
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
function gr(u){return u.grade||parseInt(u.no,10)||1}
function nav(){
  var A=window.UNITS||[],me=A.filter(function(u){return u.id===id})[0];
  if(!me)return null;
  var L=A.filter(function(u){return gr(u)===gr(me)}),i=L.indexOf(me);
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
  root.appendChild(h("p","crumb",'<a href="index.html">ソロアカデミー</a>　中学'+gr((window.UNITS||[]).filter(function(x){return x.id===id})[0]||u)+'年 理科'));
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
  root.appendChild(h("footer",null,'<a href="index.html" style="color:inherit">ソロアカデミー</a>'));
}
if(!/^[a-z0-9-]+$/.test(id)){fail();return}
var sc=document.createElement("script");
sc.src="data/"+id+".js";
sc.onload=function(){render(window.UNIT)};
sc.onerror=fail;
document.head.appendChild(sc);
})();
