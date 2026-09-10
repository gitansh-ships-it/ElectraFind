(()=>{const V=Array.isArray(window.VOTER_DATA)?window.VOTER_DATA:[],P=Array.isArray(window.PART_DATA)?window.PART_DATA:[];let mode="name",selectedPart="",current=null,t;const $=s=>document.querySelector(s),get=(v,...k)=>{for(const x of k)if(v[x]!=null)return v[x];return""},norm=x=>String(x??"").normalize("NFKC").toLocaleLowerCase("hi-IN").replace(/[.\-_/\\,;:()[\]{}]/g," ").replace(/\s+/g," ").trim(),ep=x=>String(x??"").toUpperCase().replace(/[^A-Z0-9]/g,"");$("#vc").textContent=V.length.toLocaleString("en-IN");$("#pc").textContent=P.length||13;
function kendra(v){
 const part=Number(get(v,"part_no","part"));
 const p=P.find(x=>Number(x.part_no)===part)||{};
 const station=get(v,"polling_station")||p.polling_station||"";
 const address=get(v,"polling_station_address")||p.polling_station_address||"";
 let no=get(v,"polling_station_no");
 if(!no && station){const m=String(station).match(/^\\s*(\\d+)\\s*[-–—:]\\s*/);if(m)no=m[1];}
 if(!no && part)no=String(part+196);
 return {no:String(no||"—"),name:station.replace(/^\\s*\\d+\\s*[-–—:]\\s*/,"").trim()||"—",full:station||"—",address:address||"—"};
}
function setMode(newMode){mode=newMode;document.querySelectorAll(".mode").forEach(x=>x.classList.toggle("active",x.dataset.mode===mode));}
document.querySelectorAll(".mode").forEach(b=>b.onclick=()=>{setMode(b.dataset.mode);search();});
const partFilterEl=$("#partFilter");if(partFilterEl){partFilterEl.onchange=()=>{selectedPart=partFilterEl.value;partFilterEl.classList.toggle("has-filter",Boolean(selectedPart));search();};}
function vars(s){let w=norm(s),a=[w];if(w.includes("ee"))a.push(w.replace(/ee/g,"i"));if(w.includes("i"))a.push(w.replace(/i/g,"ee"));if(w.includes("sh"))a.push(w.replace(/sh/g,"s"));if(w.includes("s"))a.push(w.replace(/s/g,"sh"));if(w.includes("v"))a.push(w.replace(/v/g,"w"));if(w.includes("w"))a.push(w.replace(/w/g,"v"));if(w.includes("agrawal"))a.push(w.replace(/agrawal/g,"agarwal"));if(w.includes("agarwal"))a.push(w.replace(/agarwal/g,"agrawal"));if(w.includes("agraval"))a.push(w.replace(/agraval/g,"agarwal"));if(w.includes("aa"))a.push(w.replace(/aa/g,"a"));if(w.includes("oo"))a.push(w.replace(/oo/g,"u"));return [...new Set(a)]}
function romanKey(s){return norm(s).replace(/[^a-z0-9 ]/g,"").replace(/[aeiou]/g,"").replace(/(.)\1+/g,"$1").replace(/ph/g,"f").replace(/bh/g,"b").replace(/dh/g,"d").replace(/th/g,"t").replace(/sh/g,"s").replace(/ch/g,"c").replace(/aa/g,"a").replace(/ee/g,"i").replace(/oo/g,"u").replace(/(.)\1+/g,"$1").replace(/\s+/g," ").trim()}
function devaFold(s){return norm(s).replace(/़/g,"").replace(/क़/g,"क").replace(/ख़/g,"ख").replace(/ग़/g,"ग").replace(/ज़/g,"ज").replace(/ड़/g,"ड").replace(/ढ़/g,"ढ").replace(/फ़/g,"फ").replace(/य़/g,"य").replace(/ऱ/g,"र").replace(/ळ/g,"ल")}
function devaKey(s){return devaFold(s).replace(/[ािीुूृॄेैोौंःँ्]/g,"").replace(/अ/g,"").replace(/(.)\1+/g,"$1")}
const H2R={"अ":"a","आ":"aa","इ":"i","ई":"ee","उ":"u","ऊ":"oo","ऋ":"ri","ए":"e","ऐ":"ai","ओ":"o","औ":"au","क":"k","ख":"kh","ग":"g","घ":"gh","ङ":"ng","च":"ch","छ":"chh","ज":"j","झ":"jh","ञ":"ny","ट":"t","ठ":"th","ड":"d","ढ":"dh","ण":"n","त":"t","थ":"th","द":"d","ध":"dh","न":"n","प":"p","फ":"ph","ब":"b","भ":"bh","म":"m","य":"y","र":"r","ल":"l","व":"v","श":"sh","ष":"sh","स":"s","ह":"h","क़":"q","ख़":"kh","ग़":"gh","ज़":"z","ड़":"r","ढ़":"rh","फ़":"f","ऱ":"r","ळ":"l","ज्ञ":"gya","क्ष":"ksh","त्र":"tr","श्र":"shr"}
const M2R={"ा":"aa","ि":"i","ी":"ee","ु":"u","ू":"oo","ृ":"ri","ॄ":"ree","े":"e","ै":"ai","ो":"o","ौ":"au","ं":"n","ः":"h","ँ":"n","़":""}
function hindiRoman(s){s=devaFold(s);let out="",i=0;while(i<s.length){let two=s.slice(i,i+2);if(H2R[two]){out+=H2R[two];i+=2;continue}let c=s[i],next=s[i+1]||"";if(H2R[c]){out+=H2R[c];if(M2R[next]){out+=M2R[next];i+=2;continue}if(next==="्"){i+=2;continue}i++;continue}if(M2R[c]){out+=M2R[c];i++;continue}if(c==="्"){i++;continue}if(c===" "||/[\u200c\u200d,.;:()\-_/]/.test(c)){out+=" ";i++;continue}i++}return out.replace(/\s+/g," ").trim()}
function lev(a,b){a=String(a||"");b=String(b||"");if(a===b)return 0;if(!a)return b.length;if(!b)return a.length;if(a.length>b.length){const t=a;a=b;b=t}let prev=Array.from({length:a.length+1},(_,i)=>i);for(let j=1;j<=b.length;j++){let cur=[j];for(let i=1;i<=a.length;i++)cur[i]=Math.min(cur[i-1]+1,prev[i]+1,prev[i-1]+(a[i-1]===b[j-1]?0:1));prev=cur}return prev[a.length]}
function fuzzyRoman(q,candidate){let a=romanKey(q),b=romanKey(candidate);if(!a||!b)return false;if(a===b||a.includes(b)||b.includes(a))return true;const at=a.split(" "),bt=b.split(" ");if(at.length!==bt.length)return false;let total=0;for(let i=0;i<at.length;i++){const x=at[i],y=bt[i],d=lev(x,y),lim=x.length<=3?1:Math.max(1,Math.floor(Math.min(x.length,y.length)*.30));if(d>lim)return false;total+=d}return total<=Math.max(1,Math.floor(a.replace(/ /g,"").length*.22))}
function fuzzyHindi(q,candidate){q=devaFold(q);candidate=devaFold(candidate);if(!q||!candidate)return false;if(q===candidate||candidate.includes(q)||q.includes(candidate))return true;let qk=devaKey(q),ck=devaKey(candidate);if(qk&&ck&&(qk===ck||qk.includes(ck)||ck.includes(qk)))return true;const a=q.split(/\s+/),b=candidate.split(/\s+/);if(a.length!==b.length)return false;let total=0;for(let i=0;i<a.length;i++){let x=a[i],y=b[i],d=lev(x,y),lim=x.length<=3?1:Math.max(1,Math.floor(Math.min(x.length,y.length)*.32));if(d>lim)return false;total+=d}return total<=Math.max(1,Math.floor(q.replace(/\s/g,"").length*.22))}
function fields(v){return{nh:norm(get(v,"name_hindi","name")),ne:norm(get(v,"name_english","english_name")),sv:norm(get(v,"search_variants","search_text")),rh:norm(get(v,"relation_name_hindi","relation")),re:norm(get(v,"relation_name_english")),hr:hindiRoman(get(v,"name_hindi","name")),rr:hindiRoman(get(v,"relation_name_hindi","relation"))}}
const SEARCH_INDEX=V.map(v=>({v,f:fields(v)}))
function match(v,q){if(selectedPart&&String(get(v,"part_no","part"))!==String(selectedPart))return false;let n=norm(q),f=fields(v);
if(mode==="epic")return ep(get(v,"epic")).includes(ep(q));
if(mode==="serial"){let qn=n.replace(/[^0-9]/g,"");return String(get(v,"serial_no","serial"))===qn||String(get(v,"serial_no","serial"))===n}
if(mode==="part"){let qp=n.replace(/[^0-9]/g,"");return String(get(v,"part_no","part"))===qp||String(get(v,"part_no","part"))===n}
if(mode==="house"){let h=norm(get(v,"house_no","house"));return h.includes(n)||h.replace(/\s+/g,"").includes(n.replace(/\s+/g,""))}
if(mode==="relation"){let qR=vars(n),qr=hindiRoman(n);return f.rh.includes(n)||f.re.includes(n)||f.rr.includes(qr)||qR.some(x=>f.re.includes(x)||f.rr.includes(hindiRoman(x))||f.rh.includes(x))||f.rh.split(/\s+/).some(x=>x.startsWith(n))}
let qRoman=/^[a-z0-9 ]+$/i.test(n),qHi=devaFold(n),qHiKey=devaKey(qHi),qHiRoman=hindiRoman(qHi);
if(f.nh.includes(n)||f.ne.includes(n)||f.sv.includes(n)||f.rh.includes(n))return true;
if(qHiKey&&devaKey(f.nh).includes(qHiKey))return true;
if(qRoman){let qks=vars(n).map(romanKey).filter(Boolean),targets=[f.ne,f.sv,f.hr];if(targets.some(t=>{let tk=romanKey(t);return qks.some(k=>tk.includes(k)||k.includes(tk))}))return true;if(fuzzyRoman(n,f.ne)||fuzzyRoman(n,f.sv)||fuzzyRoman(n,f.hr))return true}
else{if(qHiRoman&&romanKey(f.hr).includes(romanKey(qHiRoman)))return true;if(fuzzyHindi(qHi,f.nh))return true}
return vars(n).some(x=>f.ne.includes(x)||f.sv.includes(x)||f.rh.includes(x)||fuzzyRoman(x,f.ne)||fuzzyRoman(x,f.sv))}
function esc(x){return String(x??"").replace(/[&<>"']/g,m=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"}[m]))}
function score(v,q,n){let sc=100,f=fields(v),e=ep(get(v,"epic")),qe=ep(q);if(qe&&e===qe)return 1;if(mode==="serial"&&String(get(v,"serial_no","serial"))===n)return 2;if(mode==="part"&&String(get(v,"part_no","part"))===n)return 2;if(mode==="house"&&norm(get(v,"house_no","house"))===n)return 2;let qk=romanKey(n),hk=devaKey(n),hr=hindiRoman(n);if(f.nh===n||f.ne===n||f.sv===n||f.rh===n)return 3;if(qk&&(romanKey(f.ne)===qk||romanKey(f.hr)===qk))return 3;if(hk&&devaKey(f.nh)===hk)return 3;if(hr&&romanKey(f.hr)===romanKey(hr))return 3;if(f.nh.startsWith(n)||f.ne.startsWith(n)||f.sv.startsWith(n)||f.rh.startsWith(n))return 4;if(qk&&(romanKey(f.ne).startsWith(qk)||romanKey(f.hr).startsWith(qk)))return 4;if(hk&&devaKey(f.nh).startsWith(hk))return 4;if(f.nh.includes(n)||f.ne.includes(n)||f.sv.includes(n)||f.rh.includes(n))return 5;if(qk&&(romanKey(f.ne).includes(qk)||romanKey(f.hr).includes(qk)))return 6;return sc}
function search(){let q=$("#q").value.trim();if(!q&&!selectedPart){$("#results").innerHTML='<div class="empty">ऊपर से खोज शुरू करें</div>';$("#count").textContent="";return}let n=norm(q);let r=SEARCH_INDEX.filter(x=>q?match(x.v,q):(!selectedPart||String(get(x.v,"part_no","part"))===String(selectedPart))).map(x=>x.v).sort((a,b)=>score(a,q,n)-score(b,q,n)).slice(0,500);$("#count").textContent=r.length?`(${r.length}${r.length===250?"+":""})`:"";$("#results").innerHTML=r.length?r.map(v=>`<article class="card glass" data-id="${esc(v.id)}"><div class="name">${esc(get(v,"name_hindi","name")||"नाम उपलब्ध नहीं")}</div><div style="font-size:13px;color:var(--t2);margin:3px 0 6px;">पिता/पति का नाम: <b>${esc(get(v,"relation_name_hindi")||"—")}</b></div><div class="pills"><span class="pill">भाग: <b>${esc(get(v,"part_no")||"—")}</b></span><span class="pill">क्रमांक: <b>${esc(get(v,"serial_no")||"—")}</b></span><span class="pill">मकान: <b>${esc(get(v,"house_no")||"—")}</b></span><span class="pill">EPIC: <b>${esc(get(v,"epic")||"—")}</b></span><span class="pill">उम्र: ${esc(get(v,"age")||"—")}</span><span class="pill">लिंग: ${esc(get(v,"gender")||"—")}</span></div><div class="card-kendra"><div class="card-kendra-no">मतदान केन्द्र ${esc(kendra(v).no)}</div><div class="card-kendra-name">${esc(kendra(v).name)}</div><div class="card-kendra-address">${esc(kendra(v).address)}</div></div><div style="display:flex;gap:8px;margin-top:10px;"><button type="button" class="whatsapp-btn" data-id="${esc(v.id)}" style="flex:1;padding:7px 10px;border-radius:10px;border:1px solid #25D366;background:#25D366;color:white;cursor:pointer;font-size:12px;font-weight:600;">WhatsApp</button><button type="button" class="view-pdf-btn" data-page="${esc(get(v,"pdf_page"))}" style="flex:1;padding:7px 10px;border-radius:10px;border:1px solid var(--p);background:var(--p);color:white;cursor:pointer;font-size:12px;font-weight:600;">पेज खोलें (#${esc(get(v,"pdf_page"))})</button><button type="button" class="print-slip-btn" data-id="${esc(v.id)}" style="flex:1;padding:7px 10px;border-radius:10px;border:1px solid var(--accent);background:var(--accent);color:var(--t);cursor:pointer;font-size:12px;font-weight:700;">🖨 Slip</button><button type="button" class="view-detail-btn" style="flex:1;padding:7px 10px;border-radius:10px;border:1px solid var(--b);background:transparent;color:var(--t);cursor:pointer;font-size:12px;">विवरण देखें</button></div></article>`).join(""):'<div class="empty">कोई परिणाम नहीं मिला</div>'}
$("#q").oninput=()=>{clearTimeout(t);t=setTimeout(search,120)};$("#go").onclick=search;$("#results").onclick=e=>{let wa=e.target.closest(".whatsapp-btn");if(wa){e.stopPropagation();const v=V.find(x=>String(x.id)===String(wa.dataset.id));if(v){const k=kendra(v);const msg=`🗳️ वार्ड 16 मतदाता विवरण

नाम: ${get(v,"name_hindi","name")||"—"}
पिता/पति: ${get(v,"relation_name_hindi","relation")||"—"}
भाग: ${get(v,"part_no","part")||"—"}
क्रमांक: ${get(v,"serial_no","serial")||"—"}
EPIC: ${get(v,"epic")||"—"}
मकान: ${get(v,"house_no","house")||"—"}

🏫 मतदान केन्द्र संख्या: ${k.no}
🏫 मतदान केन्द्र का नाम: ${k.name}
📍 मतदान केन्द्र का पता: ${k.address}
PDF पेज: ${get(v,"pdf_page")||"—"}`;window.open(`https://wa.me/?text=${encodeURIComponent(msg)}`,"_blank");}return;}let printBtn=e.target.closest(".print-slip-btn");if(printBtn){e.stopPropagation();const v=V.find(x=>String(x.id)===String(printBtn.dataset.id));if(v)printSlip(v);return;}let pdfBtn=e.target.closest(".view-pdf-btn");if(pdfBtn){e.stopPropagation();let page=pdfBtn.dataset.page||1;window.open(`pdf/ward16.pdf#page=${page}`,"_blank");return;}let c=e.target.closest(".card");if(!c)return;current=V.find(v=>String(v.id)===String(c.dataset.id));if(!current)return;$("#dn").textContent=get(current,"name_hindi","name")||"नाम उपलब्ध नहीं";$("#de").textContent=get(current,"name_english","english_name");let f=[["पिता/पति का नाम",get(current,"relation_name_hindi","relation")],["पिता/पति (English)",get(current,"relation_name_english")],["संबंध प्रकार",get(current,"relation_type")],["लिंग",get(current,"gender")],["उम्र",get(current,"age")],["मकान नंबर",get(current,"house_no","house")],["EPIC",get(current,"epic")],["क्रमांक (Serial)",get(current,"serial_no","serial")],["भाग संख्या (Part)",get(current,"part_no","part")],["मतदान केन्द्र संख्या",get(current,"polling_station_no")],["मतदान केन्द्र पता",get(current,"polling_station_address")],["मतदान केन्द्र",get(current,"polling_station")],["कॉलोनी / क्षेत्र",get(current,"colony")],["PDF Page",get(current,"pdf_page")]];$("#details").innerHTML=f.map(x=>`<div class="detail"><small>${x[0]}</small><b>${esc(x[1]||"उपलब्ध नहीं")}</b></div>`).join("");$("#dlg").showModal()};$("#close").onclick=()=>$("#dlg").close();$("#pdf").onclick=()=>{if(current)window.open(`pdf/ward16.pdf#page=${parseInt(current.pdf_page,10)||1}`,"_blank")};$("#printSlip").onclick=()=>{if(current)printSlip(current)};

function printSlip(v){
 const area=$("#printSlipArea"); if(!area||!v)return;
 const val=(...keys)=>esc(get(v,...keys)||"—");
 const k=kendra(v);
 const part=val("part_no","part"), serial=val("serial_no","serial");
 area.innerHTML=`<div class="print-slip">
  <div class="thermal-head"><div class="thermal-brand">DURGA DAS PAL</div><div class="thermal-sub">जयपुर नगर निगम • वार्ड 16</div><div class="thermal-rule"></div><div class="thermal-title">मतदाता पर्ची</div></div>
  <div class="thermal-name">${val("name_hindi","name")}</div>
  <div class="thermal-row"><span>पिता/पति</span><b>${val("relation_name_hindi","relation")}</b></div>
  <div class="thermal-row"><span>मकान</span><b>${val("house_no","house")}</b></div>
  <div class="thermal-row"><span>EPIC</span><b>${val("epic")}</b></div>
  <div class="thermal-row"><span>भाग / क्रमांक</span><b>${part} / ${serial}</b></div>
  <div class="thermal-row"><span>उम्र / लिंग</span><b>${val("age")} / ${val("gender")}</b></div>
  <div class="thermal-section">
   <div class="thermal-label">मतदान केन्द्र</div>
   <div class="thermal-psno">केन्द्र संख्या: ${esc(k.no)}</div>
   <div class="thermal-station-name">${esc(k.name)}</div>
   <div class="thermal-address">${esc(k.address)}</div>
  </div>
  <div class="thermal-row"><span>कॉलोनी / क्षेत्र</span><b>${val("colony")}</b></div>
  <div class="thermal-foot">PDF पेज: ${val("pdf_page")}</div>
 </div>`;
 area.setAttribute("aria-hidden","false");
 document.body.classList.add("printing-slip");
 setTimeout(()=>{window.print();setTimeout(()=>{document.body.classList.remove("printing-slip");area.setAttribute("aria-hidden","true");},700);},80);
}
function applyTheme(dark){document.body.classList.toggle("dark",!!dark);const d=document.body.classList.contains("dark");const banner=$("#banner");if(banner){banner.src=d?"images/banner-dark.png":"images/banner-light.png";banner.setAttribute("data-theme",d?"dark":"light");}const themeBtn=$("#theme");if(themeBtn)themeBtn.textContent=d?"☾ Dark":"☼ Light";try{localStorage.setItem("ward16-theme",d?"dark":"light");}catch(e){}}
try{const saved=localStorage.getItem("ward16-theme");if(saved==="dark"||saved==="light")applyTheme(saved==="dark");else applyTheme(false);}catch(e){applyTheme(false);}
$("#theme").onclick=()=>applyTheme(!document.body.classList.contains("dark"));
document.querySelectorAll("[data-go]").forEach(b=>b.onclick=()=>document.getElementById(b.dataset.go).scrollIntoView({behavior:"smooth"}));

const HINDI_NUMS={'शून्य':0,'एक':1,'दो':2,'तीन':3,'चार':4,'पाँच':5,'पांच':5,'छह':6,'छः':6,'सात':7,'आठ':8,'नौ':9,'दस':10,'ग्यारह':11,'बारह':12,'तेरह':13,'चौदह':14,'पंद्रह':15,'सोलह':16,'सत्रह':17,'अट्ठारह':18,'उन्नीस':19,'बीस':20,'इक्कीस':21,'बाईस':22,'तेईस':23,'चौबीस':24,'पच्चीस':25,'छब्बीस':26,'सत्ताईस':27,'अट्ठाईस':28,'उनतीस':29,'तीस':30,'इकत्तीस':31,'बत्तीस':32,'तैंतीस':33,'चौंतीस':34,'पैंतीस':35,'छत्तीस':36,'सैंतीस':37,'अड़तीस':38,'उनतालीस':39,'चालीस':40,'इकतालीस':41,'बयालीस':42,'तैंतालीस':43,'चवालीस':44,'पैंतालीस':45,'छियालीस':46,'सैंतालीस':47,'अड़तालीस':48,'उनचास':49,'पचास':50,'इक्यावन':51,'बावन':52,'तिरेपन':53,'चौवन':54,'पचपन':55,'छप्पन':56,'सत्तावन':57,'अट्ठावन':58,'उनसठ':59,'साठ':60,'इकसठ':61,'बासठ':62,'तिरेसठ':63,'चौंसठ':64,'पैंसठ':65,'छियासठ':66,'सरसठ':67,'अड़सठ':68,'उनहत्तर':69,'सत्तर':70,'इकहत्तर':71,'बहत्तर':72,'तिहत्तर':73,'चौहत्तर':74,'पचहत्तर':75,'छिहत्तर':76,'सतहत्तर':77,'अठहत्तर':78,'उन्नासी':79,'अस्सी':80,'इक्यासी':81,'बयासी':82,'तिरासी':83,'चौरासी':84,'पचासी':85,'छियासी':86,'सत्तासी':87,'अठासी':88,'नवासी':89,'नब्बे':90,'इक्यानवे':91,'बानवे':92,'तिरानवे':93,'चौरानवे':94,'पंचानवे':95,'छियानवे':96,'सत्तानवे':97,'अट्ठानवे':98,'निन्यानवे':99,'सौ':100};
const ENG_NUMS={'zero':0,'one':1,'two':2,'three':3,'four':4,'five':5,'six':6,'seven':7,'eight':8,'nine':9,'ten':10,'eleven':11,'twelve':12,'thirteen':13,'fourteen':14,'fifteen':15,'sixteen':16,'seventeen':17,'eighteen':18,'nineteen':19,'twenty':20,'thirty':30,'forty':40,'fifty':50,'sixty':60,'seventy':70,'eighty':80,'ninety':90,'hundred':100};

function parseVoiceTranscript(raw){
let text=String(raw||'').trim().replace(/^[.,;:!?-]+|[.,;:!?-]+$/g,'').trim();
if(!text)return{text:'',targetMode:null,setPart:null};
let cleanEpic=text.replace(/[\s\-_]/g,'').toUpperCase();
if(/^[A-Z]{3}[0-9]{7}$/.test(cleanEpic)){return{text:cleanEpic,targetMode:'epic',setPart:null};}
let partMatch=text.match(/^(?:भाग|part)\s+([^\s]+)$/i);
if(partMatch){let token=partMatch[1].toLowerCase();let num=HINDI_NUMS[token]!=null?HINDI_NUMS[token]:(ENG_NUMS[token]!=null?ENG_NUMS[token]:parseInt(token,10));if(!isNaN(num)&&num>=1&&num<=13){return{text:String(num),targetMode:'part',setPart:String(num)};}}
let serialMatch=text.match(/^(?:क्रमांक|serial(?:\s*number)?|sr(?:\.?\s*no\.?)?)\s+(.+)$/i);
if(serialMatch){let token=serialMatch[1].trim().toLowerCase();let num=HINDI_NUMS[token]!=null?HINDI_NUMS[token]:(ENG_NUMS[token]!=null?ENG_NUMS[token]:parseInt(token,10));if(!isNaN(num)){return{text:String(num),targetMode:'serial',setPart:null};}}
let houseMatch=text.match(/^(?:मकान(?:\s*नंबर)?|house(?:\s*no(?:\.|\s+number)?)?)\s+(.+)$/i);
if(houseMatch){let inner=houseMatch[1].trim().replace(/\s*(?:slash|स्लैश|बटा|ऑब्लिक)\s*/gi,'/');let tokens=inner.split(/\s+/).map(w=>{let lw=w.toLowerCase();if(HINDI_NUMS[lw]!=null)return String(HINDI_NUMS[lw]);if(ENG_NUMS[lw]!=null)return String(ENG_NUMS[lw]);return w;});return{text:tokens.join(' '),targetMode:'house',setPart:null};}
if(/\b(?:slash|स्लैश|बटा|ऑब्लिक)\b/i.test(text)){text=text.replace(/\s*(?:slash|स्लैश|बटा|ऑब्लिक)\s*/gi,'/');}
return{text:text,targetMode:null,setPart:null};
}

const SpeechRec=window.SpeechRecognition||window.webkitSpeechRecognition;
let recognition=null,isListening=false,currentLang="hi-IN",statusTimeout=null;
const micBtn=$("#micBtn"),voiceStatus=$("#voiceStatus");
const micIcon=micBtn?micBtn.querySelector(".mic-icon"):null;
const micStopIcon=micBtn?micBtn.querySelector(".mic-stop-icon"):null;

function showVoiceStatus(msg,type="normal",autoHideMs=4000){
if(!voiceStatus)return;
clearTimeout(statusTimeout);
voiceStatus.textContent=msg;
voiceStatus.className="voice-status"+(type==="listening"?" listening":type==="error"?" error":"");
voiceStatus.style.display="block";
if(autoHideMs>0){statusTimeout=setTimeout(()=>{voiceStatus.style.display="none";},autoHideMs);}
}

function hideVoiceStatus(){if(!voiceStatus)return;clearTimeout(statusTimeout);voiceStatus.style.display="none";}

function setListeningUI(active){
isListening=active;
if(!micBtn)return;
micBtn.classList.toggle("listening",active);
if(micIcon)micIcon.style.display=active?"none":"inline";
if(micStopIcon)micStopIcon.style.display=active?"inline":"none";
micBtn.setAttribute("aria-label",active?"Stop Voice Search":"Voice Search");
micBtn.setAttribute("title",active?"सुनना रोकें":"आवाज़ से खोजें");
}

document.querySelectorAll(".lang-btn").forEach(btn=>{
btn.onclick=()=>{
currentLang=btn.dataset.lang;
document.querySelectorAll(".lang-btn").forEach(x=>{const isActive=x===btn;x.classList.toggle("active",isActive);x.setAttribute("aria-checked",isActive?"true":"false");});
if(recognition&&isListening){recognition.stop();setListeningUI(false);showVoiceStatus(currentLang==="hi-IN"?"भाषा: हिंदी":"Language: English","normal",2000);}
};
});

if(micBtn){
micBtn.onclick=()=>{
if(!SpeechRec){showVoiceStatus("इस browser में Voice Search उपलब्ध नहीं है।","error",5000);return;}
if(isListening){if(recognition)recognition.stop();setListeningUI(false);hideVoiceStatus();return;}
try{
recognition=new SpeechRec();
recognition.lang=currentLang;
recognition.interimResults=true;
recognition.maxAlternatives=1;
recognition.continuous=false;
let finalTranscript="";
recognition.onstart=()=>{setListeningUI(true);showVoiceStatus(currentLang==="hi-IN"?"सुन रहा हूँ…":"Listening…","listening",0);};
recognition.onresult=event=>{
let interimTranscript="";
for(let i=event.resultIndex;i<event.results.length;++i){const res=event.results[i];if(res.isFinal){finalTranscript+=res[0].transcript;}else{interimTranscript+=res[0].transcript;}}
if(interimTranscript){showVoiceStatus((currentLang==="hi-IN"?"सुन रहा हूँ: ":"Hearing: ")+interimTranscript,"listening",0);}
};
recognition.onerror=event=>{
setListeningUI(false);let err=event.error;
if(err==="no-speech"){showVoiceStatus("कुछ सुनाई नहीं दिया। फिर से बोलें।","error",4500);}
else if(err==="not-allowed"||err==="service-not-allowed"){showVoiceStatus("माइक्रोफोन की अनुमति नहीं मिली।","error",5000);}
else if(err==="audio-capture"){showVoiceStatus("माइक्रोफोन उपलब्ध नहीं है।","error",5000);}
else if(err==="network"){showVoiceStatus("इंटरनेट कनेक्शन की समस्या है।","error",4500);}
else if(err==="aborted"){hideVoiceStatus();}
else{showVoiceStatus("आवाज़ पहचानने में समस्या आई।","error",4000);}
};
recognition.onend=()=>{
setListeningUI(false);
if(finalTranscript.trim()){
const parsed=parseVoiceTranscript(finalTranscript);
if(parsed.setPart&&!selectedPart){if(partFilterEl){partFilterEl.value=parsed.setPart;selectedPart=parsed.setPart;partFilterEl.classList.add("has-filter");}}
if(parsed.targetMode){setMode(parsed.targetMode);}
$("#q").value=parsed.text;
hideVoiceStatus();
search();
}
};
recognition.start();
}catch(err){setListeningUI(false);showVoiceStatus("आवाज़ से खोज शुरू नहीं हो सकी।","error",4000);}
};
}
})();