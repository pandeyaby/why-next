/* Why Next? viewer bootstrap: expands the compact map data (WN_CORE) into DATA and loads detail chunks on demand.
   Chunks are plain scripts calling WN.chunk(k, data), so this works on GitHub Pages and from file:// alike. */
const WN=(()=>{const C=window.WN_CORE,done=new Set(),pend=new Map();
 const nodes=C.n.map(a=>({id:a[0],n:a[1],d:C.dm[a[2]],s:C.sb[a[3]],ty:C.ty[a[4]],a:[a[5],a[6]],c:a[7],new:!!a[8],k:a[9],ls:a[10]}));
 const byId=new Map(nodes.map(n=>[n.id,n])),store={},ldone=new Set(),lpend=new Map();
 const edges=C.e.map(a=>({t:nodes[a[0]].id,p:nodes[a[1]].id,h:!!a[2],r:''}));
 const data={nodes,edges,clusters:{}};
 function chunk(k,x){for(const[i,de,ev,st]of x.n)Object.assign(nodes[i],{desc:de,ev,st});for(const[i,r]of x.r)edges[i].r=r;Object.assign(data.clusters,x.c);done.add(k)}
 function one(k){if(done.has(k))return Promise.resolve();if(!pend.has(k))pend.set(k,new Promise((ok,no)=>{const s=document.createElement('script');
  s.src=`${window.WN_BASE||""}wn/d${k}.js?v=${C.v[k]}`;s.onload=ok;s.onerror=()=>{pend.delete(k);no(new Error('could not load wn/d'+k+'.js'))};document.head.appendChild(s)}));return pend.get(k)}
 function les(k,x){Object.assign(store,x);if(typeof LEARN!=='undefined')Object.assign(LEARN.L,x);ldone.add(k)}
 const bdone=new Set(),bpend=new Map();
 function lb(k,x){for(const id in x)if(typeof LEARN!=='undefined'&&LEARN.L[id]){Object.assign(LEARN.L[id],x[id]);delete LEARN.L[id]._lz}bdone.add(k)}
 function bone(k){if(window.WN_OFFLINE||bdone.has(k)||!C.bv||!C.bv[k])return Promise.resolve();if(!bpend.has(k))bpend.set(k,new Promise((ok,no)=>{const s=document.createElement('script');
  s.src=`${window.WN_BASE||""}wn/b${k}.js?v=${C.bv[k]}`;s.onload=ok;s.onerror=()=>{bpend.delete(k);no(new Error('could not load wn/b'+k+'.js'))};document.head.appendChild(s)}));return bpend.get(k)}
 function lone(k){if(ldone.has(k)||!C.lv[k])return Promise.resolve();if(!lpend.has(k))lpend.set(k,new Promise((ok,no)=>{const s=document.createElement('script');
  s.src=`${window.WN_BASE||""}wn/l${k}.js?v=${C.lv[k]}`;s.onload=ok;s.onerror=()=>{lpend.delete(k);no(new Error('could not load wn/l'+k+'.js'))};document.head.appendChild(s)}));return lpend.get(k)}
 const SHOW_DRAFTS=(()=>{try{return /[?&]drafts=1/.test(location.search)||localStorage.getItem("wn_drafts")==="1"}catch(e){return false}})();   // auto-drafted starters stay hidden unless asked for
 const api={data,chunk,les,lb,lbload:bone,warm:()=>window.WN_OFFLINE?Promise.resolve():Promise.all([...(C.bv||[]).map((v,k)=>v?bone(k):0),typeof VIS!=='undefined'&&VIS.pre?VIS.pre():0]),store,lload:lone,flag:id=>SHOW_DRAFTS?((byId.get(id)||{}).ls||0):0,has:ks=>ks.every(k=>done.has(k)),load:ks=>Promise.all(ks.map(one)),all:false,
  loadAll(){return api.load(C.v.map((_,k)=>k)).then(()=>{api.all=true})}};return api})();
const DATA=WN.data;
