import{a as Nt}from"/build/_shared/chunk-HGA4JJFT.js";import"/build/_shared/chunk-C35P34BX.js";import{a as mn}from"/build/_shared/chunk-PGOH7JLP.js";import{a as $t,b as Ct,d as kt}from"/build/_shared/chunk-TCGD6H7C.js";import"/build/_shared/chunk-O3WTSDCE.js";import{a as pe,b as C}from"/build/_shared/chunk-4HXKWYDW.js";import{b as f,c as b}from"/build/_shared/chunk-Q3IECNXJ.js";var ne=f((NA,gr)=>{var bs="2.0.0",Ts=Number.MAX_SAFE_INTEGER||9007199254740991,Is=16,xs=256-6,Os=["major","premajor","minor","preminor","patch","prepatch","prerelease"];gr.exports={MAX_LENGTH:256,MAX_SAFE_COMPONENT_LENGTH:Is,MAX_SAFE_BUILD_LENGTH:xs,MAX_SAFE_INTEGER:Ts,RELEASE_TYPES:Os,SEMVER_SPEC_VERSION:bs,FLAG_INCLUDE_PRERELEASE:1,FLAG_LOOSE:2}});var se=f((LA,yr)=>{var Ps=typeof process=="object"&&process.env&&process.env.NODE_DEBUG&&/\bsemver\b/i.test(process.env.NODE_DEBUG)?(...e)=>console.error("SEMVER",...e):()=>{};yr.exports=Ps});var X=f(($,Er)=>{var{MAX_SAFE_COMPONENT_LENGTH:ft,MAX_SAFE_BUILD_LENGTH:vs,MAX_LENGTH:$s}=ne(),Cs=se();$=Er.exports={};var ks=$.re=[],Ns=$.safeRe=[],a=$.src=[],c=$.t={},Ls=0,ht="[a-zA-Z0-9-]",_s=[["\\s",1],["\\d",$s],[ht,vs]],qs=e=>{for(let[t,r]of _s)e=e.split(`${t}*`).join(`${t}{0,${r}}`).split(`${t}+`).join(`${t}{1,${r}}`);return e},h=(e,t,r)=>{let o=qs(t),n=Ls++;Cs(e,n,t),c[e]=n,a[n]=t,ks[n]=new RegExp(t,r?"g":void 0),Ns[n]=new RegExp(o,r?"g":void 0)};h("NUMERICIDENTIFIER","0|[1-9]\\d*");h("NUMERICIDENTIFIERLOOSE","\\d+");h("NONNUMERICIDENTIFIER",`\\d*[a-zA-Z-]${ht}*`);h("MAINVERSION",`(${a[c.NUMERICIDENTIFIER]})\\.(${a[c.NUMERICIDENTIFIER]})\\.(${a[c.NUMERICIDENTIFIER]})`);h("MAINVERSIONLOOSE",`(${a[c.NUMERICIDENTIFIERLOOSE]})\\.(${a[c.NUMERICIDENTIFIERLOOSE]})\\.(${a[c.NUMERICIDENTIFIERLOOSE]})`);h("PRERELEASEIDENTIFIER",`(?:${a[c.NUMERICIDENTIFIER]}|${a[c.NONNUMERICIDENTIFIER]})`);h("PRERELEASEIDENTIFIERLOOSE",`(?:${a[c.NUMERICIDENTIFIERLOOSE]}|${a[c.NONNUMERICIDENTIFIER]})`);h("PRERELEASE",`(?:-(${a[c.PRERELEASEIDENTIFIER]}(?:\\.${a[c.PRERELEASEIDENTIFIER]})*))`);h("PRERELEASELOOSE",`(?:-?(${a[c.PRERELEASEIDENTIFIERLOOSE]}(?:\\.${a[c.PRERELEASEIDENTIFIERLOOSE]})*))`);h("BUILDIDENTIFIER",`${ht}+`);h("BUILD",`(?:\\+(${a[c.BUILDIDENTIFIER]}(?:\\.${a[c.BUILDIDENTIFIER]})*))`);h("FULLPLAIN",`v?${a[c.MAINVERSION]}${a[c.PRERELEASE]}?${a[c.BUILD]}?`);h("FULL",`^${a[c.FULLPLAIN]}$`);h("LOOSEPLAIN",`[v=\\s]*${a[c.MAINVERSIONLOOSE]}${a[c.PRERELEASELOOSE]}?${a[c.BUILD]}?`);h("LOOSE",`^${a[c.LOOSEPLAIN]}$`);h("GTLT","((?:<|>)?=?)");h("XRANGEIDENTIFIERLOOSE",`${a[c.NUMERICIDENTIFIERLOOSE]}|x|X|\\*`);h("XRANGEIDENTIFIER",`${a[c.NUMERICIDENTIFIER]}|x|X|\\*`);h("XRANGEPLAIN",`[v=\\s]*(${a[c.XRANGEIDENTIFIER]})(?:\\.(${a[c.XRANGEIDENTIFIER]})(?:\\.(${a[c.XRANGEIDENTIFIER]})(?:${a[c.PRERELEASE]})?${a[c.BUILD]}?)?)?`);h("XRANGEPLAINLOOSE",`[v=\\s]*(${a[c.XRANGEIDENTIFIERLOOSE]})(?:\\.(${a[c.XRANGEIDENTIFIERLOOSE]})(?:\\.(${a[c.XRANGEIDENTIFIERLOOSE]})(?:${a[c.PRERELEASELOOSE]})?${a[c.BUILD]}?)?)?`);h("XRANGE",`^${a[c.GTLT]}\\s*${a[c.XRANGEPLAIN]}$`);h("XRANGELOOSE",`^${a[c.GTLT]}\\s*${a[c.XRANGEPLAINLOOSE]}$`);h("COERCEPLAIN",`(^|[^\\d])(\\d{1,${ft}})(?:\\.(\\d{1,${ft}}))?(?:\\.(\\d{1,${ft}}))?`);h("COERCE",`${a[c.COERCEPLAIN]}(?:$|[^\\d])`);h("COERCEFULL",a[c.COERCEPLAIN]+`(?:${a[c.PRERELEASE]})?(?:${a[c.BUILD]})?(?:$|[^\\d])`);h("COERCERTL",a[c.COERCE],!0);h("COERCERTLFULL",a[c.COERCEFULL],!0);h("LONETILDE","(?:~>?)");h("TILDETRIM",`(\\s*)${a[c.LONETILDE]}\\s+`,!0);$.tildeTrimReplace="$1~";h("TILDE",`^${a[c.LONETILDE]}${a[c.XRANGEPLAIN]}$`);h("TILDELOOSE",`^${a[c.LONETILDE]}${a[c.XRANGEPLAINLOOSE]}$`);h("LONECARET","(?:\\^)");h("CARETTRIM",`(\\s*)${a[c.LONECARET]}\\s+`,!0);$.caretTrimReplace="$1^";h("CARET",`^${a[c.LONECARET]}${a[c.XRANGEPLAIN]}$`);h("CARETLOOSE",`^${a[c.LONECARET]}${a[c.XRANGEPLAINLOOSE]}$`);h("COMPARATORLOOSE",`^${a[c.GTLT]}\\s*(${a[c.LOOSEPLAIN]})$|^$`);h("COMPARATOR",`^${a[c.GTLT]}\\s*(${a[c.FULLPLAIN]})$|^$`);h("COMPARATORTRIM",`(\\s*)${a[c.GTLT]}\\s*(${a[c.LOOSEPLAIN]}|${a[c.XRANGEPLAIN]})`,!0);$.comparatorTrimReplace="$1$2$3";h("HYPHENRANGE",`^\\s*(${a[c.XRANGEPLAIN]})\\s+-\\s+(${a[c.XRANGEPLAIN]})\\s*$`);h("HYPHENRANGELOOSE",`^\\s*(${a[c.XRANGEPLAINLOOSE]})\\s+-\\s+(${a[c.XRANGEPLAINLOOSE]})\\s*$`);h("STAR","(<|>)?=?\\s*\\*");h("GTE0","^\\s*>=\\s*0\\.0\\.0\\s*$");h("GTE0PRE","^\\s*>=\\s*0\\.0\\.0-0\\s*$")});var xe=f((_A,Ar)=>{var Us=Object.freeze({loose:!0}),Fs=Object.freeze({}),Ds=e=>e?typeof e!="object"?Us:e:Fs;Ar.exports=Ds});var mt=f((qA,Sr)=>{var wr=/^[0-9]+$/,Rr=(e,t)=>{let r=wr.test(e),o=wr.test(t);return r&&o&&(e=+e,t=+t),e===t?0:r&&!o?-1:o&&!r?1:e<t?-1:1},Hs=(e,t)=>Rr(t,e);Sr.exports={compareIdentifiers:Rr,rcompareIdentifiers:Hs}});var A=f((UA,xr)=>{var Oe=se(),{MAX_LENGTH:br,MAX_SAFE_INTEGER:Pe}=ne(),{safeRe:Tr,t:Ir}=X(),Ms=xe(),{compareIdentifiers:W}=mt(),I=class{constructor(t,r){if(r=Ms(r),t instanceof I){if(t.loose===!!r.loose&&t.includePrerelease===!!r.includePrerelease)return t;t=t.version}else if(typeof t!="string")throw new TypeError(`Invalid version. Must be a string. Got type "${typeof t}".`);if(t.length>br)throw new TypeError(`version is longer than ${br} characters`);Oe("SemVer",t,r),this.options=r,this.loose=!!r.loose,this.includePrerelease=!!r.includePrerelease;let o=t.trim().match(r.loose?Tr[Ir.LOOSE]:Tr[Ir.FULL]);if(!o)throw new TypeError(`Invalid Version: ${t}`);if(this.raw=t,this.major=+o[1],this.minor=+o[2],this.patch=+o[3],this.major>Pe||this.major<0)throw new TypeError("Invalid major version");if(this.minor>Pe||this.minor<0)throw new TypeError("Invalid minor version");if(this.patch>Pe||this.patch<0)throw new TypeError("Invalid patch version");o[4]?this.prerelease=o[4].split(".").map(n=>{if(/^[0-9]+$/.test(n)){let s=+n;if(s>=0&&s<Pe)return s}return n}):this.prerelease=[],this.build=o[5]?o[5].split("."):[],this.format()}format(){return this.version=`${this.major}.${this.minor}.${this.patch}`,this.prerelease.length&&(this.version+=`-${this.prerelease.join(".")}`),this.version}toString(){return this.version}compare(t){if(Oe("SemVer.compare",this.version,this.options,t),!(t instanceof I)){if(typeof t=="string"&&t===this.version)return 0;t=new I(t,this.options)}return t.version===this.version?0:this.compareMain(t)||this.comparePre(t)}compareMain(t){return t instanceof I||(t=new I(t,this.options)),W(this.major,t.major)||W(this.minor,t.minor)||W(this.patch,t.patch)}comparePre(t){if(t instanceof I||(t=new I(t,this.options)),this.prerelease.length&&!t.prerelease.length)return-1;if(!this.prerelease.length&&t.prerelease.length)return 1;if(!this.prerelease.length&&!t.prerelease.length)return 0;let r=0;do{let o=this.prerelease[r],n=t.prerelease[r];if(Oe("prerelease compare",r,o,n),o===void 0&&n===void 0)return 0;if(n===void 0)return 1;if(o===void 0)return-1;if(o===n)continue;return W(o,n)}while(++r)}compareBuild(t){t instanceof I||(t=new I(t,this.options));let r=0;do{let o=this.build[r],n=t.build[r];if(Oe("build compare",r,o,n),o===void 0&&n===void 0)return 0;if(n===void 0)return 1;if(o===void 0)return-1;if(o===n)continue;return W(o,n)}while(++r)}inc(t,r,o){switch(t){case"premajor":this.prerelease.length=0,this.patch=0,this.minor=0,this.major++,this.inc("pre",r,o);break;case"preminor":this.prerelease.length=0,this.patch=0,this.minor++,this.inc("pre",r,o);break;case"prepatch":this.prerelease.length=0,this.inc("patch",r,o),this.inc("pre",r,o);break;case"prerelease":this.prerelease.length===0&&this.inc("patch",r,o),this.inc("pre",r,o);break;case"major":(this.minor!==0||this.patch!==0||this.prerelease.length===0)&&this.major++,this.minor=0,this.patch=0,this.prerelease=[];break;case"minor":(this.patch!==0||this.prerelease.length===0)&&this.minor++,this.patch=0,this.prerelease=[];break;case"patch":this.prerelease.length===0&&this.patch++,this.prerelease=[];break;case"pre":{let n=Number(o)?1:0;if(!r&&o===!1)throw new Error("invalid increment argument: identifier is empty");if(this.prerelease.length===0)this.prerelease=[n];else{let s=this.prerelease.length;for(;--s>=0;)typeof this.prerelease[s]=="number"&&(this.prerelease[s]++,s=-2);if(s===-1){if(r===this.prerelease.join(".")&&o===!1)throw new Error("invalid increment argument: identifier already exists");this.prerelease.push(n)}}if(r){let s=[r,n];o===!1&&(s=[r]),W(this.prerelease[0],r)===0?isNaN(this.prerelease[1])&&(this.prerelease=s):this.prerelease=s}break}default:throw new Error(`invalid increment argument: ${t}`)}return this.raw=this.format(),this.build.length&&(this.raw+=`+${this.build.join(".")}`),this}};xr.exports=I});var D=f((FA,Pr)=>{var Or=A(),js=(e,t,r=!1)=>{if(e instanceof Or)return e;try{return new Or(e,t)}catch(o){if(!r)return null;throw o}};Pr.exports=js});var $r=f((DA,vr)=>{var Bs=D(),Vs=(e,t)=>{let r=Bs(e,t);return r?r.version:null};vr.exports=Vs});var kr=f((HA,Cr)=>{var Gs=D(),Xs=(e,t)=>{let r=Gs(e.trim().replace(/^[=v]+/,""),t);return r?r.version:null};Cr.exports=Xs});var _r=f((MA,Lr)=>{var Nr=A(),Ws=(e,t,r,o,n)=>{typeof r=="string"&&(n=o,o=r,r=void 0);try{return new Nr(e instanceof Nr?e.version:e,r).inc(t,o,n).version}catch{return null}};Lr.exports=Ws});var Fr=f((jA,Ur)=>{var qr=D(),Ks=(e,t)=>{let r=qr(e,null,!0),o=qr(t,null,!0),n=r.compare(o);if(n===0)return null;let s=n>0,i=s?r:o,u=s?o:r,l=!!i.prerelease.length;if(!!u.prerelease.length&&!l)return!u.patch&&!u.minor?"major":i.patch?"patch":i.minor?"minor":"major";let g=l?"pre":"";return r.major!==o.major?g+"major":r.minor!==o.minor?g+"minor":r.patch!==o.patch?g+"patch":"prerelease"};Ur.exports=Ks});var Hr=f((BA,Dr)=>{var zs=A(),Js=(e,t)=>new zs(e,t).major;Dr.exports=Js});var jr=f((VA,Mr)=>{var Ys=A(),Qs=(e,t)=>new Ys(e,t).minor;Mr.exports=Qs});var Vr=f((GA,Br)=>{var Zs=A(),ei=(e,t)=>new Zs(e,t).patch;Br.exports=ei});var Xr=f((XA,Gr)=>{var ti=D(),ri=(e,t)=>{let r=ti(e,t);return r&&r.prerelease.length?r.prerelease:null};Gr.exports=ri});var O=f((WA,Kr)=>{var Wr=A(),oi=(e,t,r)=>new Wr(e,r).compare(new Wr(t,r));Kr.exports=oi});var Jr=f((KA,zr)=>{var ni=O(),si=(e,t,r)=>ni(t,e,r);zr.exports=si});var Qr=f((zA,Yr)=>{var ii=O(),ai=(e,t)=>ii(e,t,!0);Yr.exports=ai});var ve=f((JA,eo)=>{var Zr=A(),ci=(e,t,r)=>{let o=new Zr(e,r),n=new Zr(t,r);return o.compare(n)||o.compareBuild(n)};eo.exports=ci});var ro=f((YA,to)=>{var ui=ve(),li=(e,t)=>e.sort((r,o)=>ui(r,o,t));to.exports=li});var no=f((QA,oo)=>{var pi=ve(),di=(e,t)=>e.sort((r,o)=>pi(o,r,t));oo.exports=di});var ie=f((ZA,so)=>{var fi=O(),hi=(e,t,r)=>fi(e,t,r)>0;so.exports=hi});var $e=f((ew,io)=>{var mi=O(),gi=(e,t,r)=>mi(e,t,r)<0;io.exports=gi});var gt=f((tw,ao)=>{var yi=O(),Ei=(e,t,r)=>yi(e,t,r)===0;ao.exports=Ei});var yt=f((rw,co)=>{var Ai=O(),wi=(e,t,r)=>Ai(e,t,r)!==0;co.exports=wi});var Ce=f((ow,uo)=>{var Ri=O(),Si=(e,t,r)=>Ri(e,t,r)>=0;uo.exports=Si});var ke=f((nw,lo)=>{var bi=O(),Ti=(e,t,r)=>bi(e,t,r)<=0;lo.exports=Ti});var Et=f((sw,po)=>{var Ii=gt(),xi=yt(),Oi=ie(),Pi=Ce(),vi=$e(),$i=ke(),Ci=(e,t,r,o)=>{switch(t){case"===":return typeof e=="object"&&(e=e.version),typeof r=="object"&&(r=r.version),e===r;case"!==":return typeof e=="object"&&(e=e.version),typeof r=="object"&&(r=r.version),e!==r;case"":case"=":case"==":return Ii(e,r,o);case"!=":return xi(e,r,o);case">":return Oi(e,r,o);case">=":return Pi(e,r,o);case"<":return vi(e,r,o);case"<=":return $i(e,r,o);default:throw new TypeError(`Invalid operator: ${t}`)}};po.exports=Ci});var ho=f((iw,fo)=>{var ki=A(),Ni=D(),{safeRe:Ne,t:Le}=X(),Li=(e,t)=>{if(e instanceof ki)return e;if(typeof e=="number"&&(e=String(e)),typeof e!="string")return null;t=t||{};let r=null;if(!t.rtl)r=e.match(t.includePrerelease?Ne[Le.COERCEFULL]:Ne[Le.COERCE]);else{let l=t.includePrerelease?Ne[Le.COERCERTLFULL]:Ne[Le.COERCERTL],m;for(;(m=l.exec(e))&&(!r||r.index+r[0].length!==e.length);)(!r||m.index+m[0].length!==r.index+r[0].length)&&(r=m),l.lastIndex=m.index+m[1].length+m[2].length;l.lastIndex=-1}if(r===null)return null;let o=r[2],n=r[3]||"0",s=r[4]||"0",i=t.includePrerelease&&r[5]?`-${r[5]}`:"",u=t.includePrerelease&&r[6]?`+${r[6]}`:"";return Ni(`${o}.${n}.${s}${i}${u}`,t)};fo.exports=Li});var go=f((aw,mo)=>{var At=class{constructor(){this.max=1e3,this.map=new Map}get(t){let r=this.map.get(t);if(r!==void 0)return this.map.delete(t),this.map.set(t,r),r}delete(t){return this.map.delete(t)}set(t,r){if(!this.delete(t)&&r!==void 0){if(this.map.size>=this.max){let n=this.map.keys().next().value;this.delete(n)}this.map.set(t,r)}return this}};mo.exports=At});var P=f((cw,wo)=>{var _i=/\s+/g,H=class{constructor(t,r){if(r=Ui(r),t instanceof H)return t.loose===!!r.loose&&t.includePrerelease===!!r.includePrerelease?t:new H(t.raw,r);if(t instanceof wt)return this.raw=t.value,this.set=[[t]],this.formatted=void 0,this;if(this.options=r,this.loose=!!r.loose,this.includePrerelease=!!r.includePrerelease,this.raw=t.trim().replace(_i," "),this.set=this.raw.split("||").map(o=>this.parseRange(o.trim())).filter(o=>o.length),!this.set.length)throw new TypeError(`Invalid SemVer Range: ${this.raw}`);if(this.set.length>1){let o=this.set[0];if(this.set=this.set.filter(n=>!Eo(n[0])),this.set.length===0)this.set=[o];else if(this.set.length>1){for(let n of this.set)if(n.length===1&&Vi(n[0])){this.set=[n];break}}}this.formatted=void 0}get range(){if(this.formatted===void 0){this.formatted="";for(let t=0;t<this.set.length;t++){t>0&&(this.formatted+="||");let r=this.set[t];for(let o=0;o<r.length;o++)o>0&&(this.formatted+=" "),this.formatted+=r[o].toString().trim()}}return this.formatted}format(){return this.range}toString(){return this.range}parseRange(t){let o=((this.options.includePrerelease&&ji)|(this.options.loose&&Bi))+":"+t,n=yo.get(o);if(n)return n;let s=this.options.loose,i=s?T[R.HYPHENRANGELOOSE]:T[R.HYPHENRANGE];t=t.replace(i,ea(this.options.includePrerelease)),y("hyphen replace",t),t=t.replace(T[R.COMPARATORTRIM],Di),y("comparator trim",t),t=t.replace(T[R.TILDETRIM],Hi),y("tilde trim",t),t=t.replace(T[R.CARETTRIM],Mi),y("caret trim",t);let u=t.split(" ").map(p=>Gi(p,this.options)).join(" ").split(/\s+/).map(p=>Zi(p,this.options));s&&(u=u.filter(p=>(y("loose invalid filter",p,this.options),!!p.match(T[R.COMPARATORLOOSE])))),y("range list",u);let l=new Map,m=u.map(p=>new wt(p,this.options));for(let p of m){if(Eo(p))return[p];l.set(p.value,p)}l.size>1&&l.has("")&&l.delete("");let g=[...l.values()];return yo.set(o,g),g}intersects(t,r){if(!(t instanceof H))throw new TypeError("a Range is required");return this.set.some(o=>Ao(o,r)&&t.set.some(n=>Ao(n,r)&&o.every(s=>n.every(i=>s.intersects(i,r)))))}test(t){if(!t)return!1;if(typeof t=="string")try{t=new Fi(t,this.options)}catch{return!1}for(let r=0;r<this.set.length;r++)if(ta(this.set[r],t,this.options))return!0;return!1}};wo.exports=H;var qi=go(),yo=new qi,Ui=xe(),wt=ae(),y=se(),Fi=A(),{safeRe:T,t:R,comparatorTrimReplace:Di,tildeTrimReplace:Hi,caretTrimReplace:Mi}=X(),{FLAG_INCLUDE_PRERELEASE:ji,FLAG_LOOSE:Bi}=ne(),Eo=e=>e.value==="<0.0.0-0",Vi=e=>e.value==="",Ao=(e,t)=>{let r=!0,o=e.slice(),n=o.pop();for(;r&&o.length;)r=o.every(s=>n.intersects(s,t)),n=o.pop();return r},Gi=(e,t)=>(y("comp",e,t),e=Ki(e,t),y("caret",e),e=Xi(e,t),y("tildes",e),e=Ji(e,t),y("xrange",e),e=Qi(e,t),y("stars",e),e),S=e=>!e||e.toLowerCase()==="x"||e==="*",Xi=(e,t)=>e.trim().split(/\s+/).map(r=>Wi(r,t)).join(" "),Wi=(e,t)=>{let r=t.loose?T[R.TILDELOOSE]:T[R.TILDE];return e.replace(r,(o,n,s,i,u)=>{y("tilde",e,o,n,s,i,u);let l;return S(n)?l="":S(s)?l=`>=${n}.0.0 <${+n+1}.0.0-0`:S(i)?l=`>=${n}.${s}.0 <${n}.${+s+1}.0-0`:u?(y("replaceTilde pr",u),l=`>=${n}.${s}.${i}-${u} <${n}.${+s+1}.0-0`):l=`>=${n}.${s}.${i} <${n}.${+s+1}.0-0`,y("tilde return",l),l})},Ki=(e,t)=>e.trim().split(/\s+/).map(r=>zi(r,t)).join(" "),zi=(e,t)=>{y("caret",e,t);let r=t.loose?T[R.CARETLOOSE]:T[R.CARET],o=t.includePrerelease?"-0":"";return e.replace(r,(n,s,i,u,l)=>{y("caret",e,n,s,i,u,l);let m;return S(s)?m="":S(i)?m=`>=${s}.0.0${o} <${+s+1}.0.0-0`:S(u)?s==="0"?m=`>=${s}.${i}.0${o} <${s}.${+i+1}.0-0`:m=`>=${s}.${i}.0${o} <${+s+1}.0.0-0`:l?(y("replaceCaret pr",l),s==="0"?i==="0"?m=`>=${s}.${i}.${u}-${l} <${s}.${i}.${+u+1}-0`:m=`>=${s}.${i}.${u}-${l} <${s}.${+i+1}.0-0`:m=`>=${s}.${i}.${u}-${l} <${+s+1}.0.0-0`):(y("no pr"),s==="0"?i==="0"?m=`>=${s}.${i}.${u}${o} <${s}.${i}.${+u+1}-0`:m=`>=${s}.${i}.${u}${o} <${s}.${+i+1}.0-0`:m=`>=${s}.${i}.${u} <${+s+1}.0.0-0`),y("caret return",m),m})},Ji=(e,t)=>(y("replaceXRanges",e,t),e.split(/\s+/).map(r=>Yi(r,t)).join(" ")),Yi=(e,t)=>{e=e.trim();let r=t.loose?T[R.XRANGELOOSE]:T[R.XRANGE];return e.replace(r,(o,n,s,i,u,l)=>{y("xRange",e,o,n,s,i,u,l);let m=S(s),g=m||S(i),p=g||S(u),E=p;return n==="="&&E&&(n=""),l=t.includePrerelease?"-0":"",m?n===">"||n==="<"?o="<0.0.0-0":o="*":n&&E?(g&&(i=0),u=0,n===">"?(n=">=",g?(s=+s+1,i=0,u=0):(i=+i+1,u=0)):n==="<="&&(n="<",g?s=+s+1:i=+i+1),n==="<"&&(l="-0"),o=`${n+s}.${i}.${u}${l}`):g?o=`>=${s}.0.0${l} <${+s+1}.0.0-0`:p&&(o=`>=${s}.${i}.0${l} <${s}.${+i+1}.0-0`),y("xRange return",o),o})},Qi=(e,t)=>(y("replaceStars",e,t),e.trim().replace(T[R.STAR],"")),Zi=(e,t)=>(y("replaceGTE0",e,t),e.trim().replace(T[t.includePrerelease?R.GTE0PRE:R.GTE0],"")),ea=e=>(t,r,o,n,s,i,u,l,m,g,p,E)=>(S(o)?r="":S(n)?r=`>=${o}.0.0${e?"-0":""}`:S(s)?r=`>=${o}.${n}.0${e?"-0":""}`:i?r=`>=${r}`:r=`>=${r}${e?"-0":""}`,S(m)?l="":S(g)?l=`<${+m+1}.0.0-0`:S(p)?l=`<${m}.${+g+1}.0-0`:E?l=`<=${m}.${g}.${p}-${E}`:e?l=`<${m}.${g}.${+p+1}-0`:l=`<=${l}`,`${r} ${l}`.trim()),ta=(e,t,r)=>{for(let o=0;o<e.length;o++)if(!e[o].test(t))return!1;if(t.prerelease.length&&!r.includePrerelease){for(let o=0;o<e.length;o++)if(y(e[o].semver),e[o].semver!==wt.ANY&&e[o].semver.prerelease.length>0){let n=e[o].semver;if(n.major===t.major&&n.minor===t.minor&&n.patch===t.patch)return!0}return!1}return!0}});var ae=f((uw,xo)=>{var ce=Symbol("SemVer ANY"),K=class{static get ANY(){return ce}constructor(t,r){if(r=Ro(r),t instanceof K){if(t.loose===!!r.loose)return t;t=t.value}t=t.trim().split(/\s+/).join(" "),St("comparator",t,r),this.options=r,this.loose=!!r.loose,this.parse(t),this.semver===ce?this.value="":this.value=this.operator+this.semver.version,St("comp",this)}parse(t){let r=this.options.loose?So[bo.COMPARATORLOOSE]:So[bo.COMPARATOR],o=t.match(r);if(!o)throw new TypeError(`Invalid comparator: ${t}`);this.operator=o[1]!==void 0?o[1]:"",this.operator==="="&&(this.operator=""),o[2]?this.semver=new To(o[2],this.options.loose):this.semver=ce}toString(){return this.value}test(t){if(St("Comparator.test",t,this.options.loose),this.semver===ce||t===ce)return!0;if(typeof t=="string")try{t=new To(t,this.options)}catch{return!1}return Rt(t,this.operator,this.semver,this.options)}intersects(t,r){if(!(t instanceof K))throw new TypeError("a Comparator is required");return this.operator===""?this.value===""?!0:new Io(t.value,r).test(this.value):t.operator===""?t.value===""?!0:new Io(this.value,r).test(t.semver):(r=Ro(r),r.includePrerelease&&(this.value==="<0.0.0-0"||t.value==="<0.0.0-0")||!r.includePrerelease&&(this.value.startsWith("<0.0.0")||t.value.startsWith("<0.0.0"))?!1:!!(this.operator.startsWith(">")&&t.operator.startsWith(">")||this.operator.startsWith("<")&&t.operator.startsWith("<")||this.semver.version===t.semver.version&&this.operator.includes("=")&&t.operator.includes("=")||Rt(this.semver,"<",t.semver,r)&&this.operator.startsWith(">")&&t.operator.startsWith("<")||Rt(this.semver,">",t.semver,r)&&this.operator.startsWith("<")&&t.operator.startsWith(">")))}};xo.exports=K;var Ro=xe(),{safeRe:So,t:bo}=X(),Rt=Et(),St=se(),To=A(),Io=P()});var ue=f((lw,Oo)=>{var ra=P(),oa=(e,t,r)=>{try{t=new ra(t,r)}catch{return!1}return t.test(e)};Oo.exports=oa});var vo=f((pw,Po)=>{var na=P(),sa=(e,t)=>new na(e,t).set.map(r=>r.map(o=>o.value).join(" ").trim().split(" "));Po.exports=sa});var Co=f((dw,$o)=>{var ia=A(),aa=P(),ca=(e,t,r)=>{let o=null,n=null,s=null;try{s=new aa(t,r)}catch{return null}return e.forEach(i=>{s.test(i)&&(!o||n.compare(i)===-1)&&(o=i,n=new ia(o,r))}),o};$o.exports=ca});var No=f((fw,ko)=>{var ua=A(),la=P(),pa=(e,t,r)=>{let o=null,n=null,s=null;try{s=new la(t,r)}catch{return null}return e.forEach(i=>{s.test(i)&&(!o||n.compare(i)===1)&&(o=i,n=new ua(o,r))}),o};ko.exports=pa});var qo=f((hw,_o)=>{var bt=A(),da=P(),Lo=ie(),fa=(e,t)=>{e=new da(e,t);let r=new bt("0.0.0");if(e.test(r)||(r=new bt("0.0.0-0"),e.test(r)))return r;r=null;for(let o=0;o<e.set.length;++o){let n=e.set[o],s=null;n.forEach(i=>{let u=new bt(i.semver.version);switch(i.operator){case">":u.prerelease.length===0?u.patch++:u.prerelease.push(0),u.raw=u.format();case"":case">=":(!s||Lo(u,s))&&(s=u);break;case"<":case"<=":break;default:throw new Error(`Unexpected operation: ${i.operator}`)}}),s&&(!r||Lo(r,s))&&(r=s)}return r&&e.test(r)?r:null};_o.exports=fa});var Fo=f((mw,Uo)=>{var ha=P(),ma=(e,t)=>{try{return new ha(e,t).range||"*"}catch{return null}};Uo.exports=ma});var _e=f((gw,jo)=>{var ga=A(),Mo=ae(),{ANY:ya}=Mo,Ea=P(),Aa=ue(),Do=ie(),Ho=$e(),wa=ke(),Ra=Ce(),Sa=(e,t,r,o)=>{e=new ga(e,o),t=new Ea(t,o);let n,s,i,u,l;switch(r){case">":n=Do,s=wa,i=Ho,u=">",l=">=";break;case"<":n=Ho,s=Ra,i=Do,u="<",l="<=";break;default:throw new TypeError('Must provide a hilo val of "<" or ">"')}if(Aa(e,t,o))return!1;for(let m=0;m<t.set.length;++m){let g=t.set[m],p=null,E=null;if(g.forEach(d=>{d.semver===ya&&(d=new Mo(">=0.0.0")),p=p||d,E=E||d,n(d.semver,p.semver,o)?p=d:i(d.semver,E.semver,o)&&(E=d)}),p.operator===u||p.operator===l||(!E.operator||E.operator===u)&&s(e,E.semver))return!1;if(E.operator===l&&i(e,E.semver))return!1}return!0};jo.exports=Sa});var Vo=f((yw,Bo)=>{var ba=_e(),Ta=(e,t,r)=>ba(e,t,">",r);Bo.exports=Ta});var Xo=f((Ew,Go)=>{var Ia=_e(),xa=(e,t,r)=>Ia(e,t,"<",r);Go.exports=xa});var zo=f((Aw,Ko)=>{var Wo=P(),Oa=(e,t,r)=>(e=new Wo(e,r),t=new Wo(t,r),e.intersects(t,r));Ko.exports=Oa});var Yo=f((ww,Jo)=>{var Pa=ue(),va=O();Jo.exports=(e,t,r)=>{let o=[],n=null,s=null,i=e.sort((g,p)=>va(g,p,r));for(let g of i)Pa(g,t,r)?(s=g,n||(n=g)):(s&&o.push([n,s]),s=null,n=null);n&&o.push([n,null]);let u=[];for(let[g,p]of o)g===p?u.push(g):!p&&g===i[0]?u.push("*"):p?g===i[0]?u.push(`<=${p}`):u.push(`${g} - ${p}`):u.push(`>=${g}`);let l=u.join(" || "),m=typeof t.raw=="string"?t.raw:String(t);return l.length<m.length?l:t}});var on=f((Rw,rn)=>{var Qo=P(),It=ae(),{ANY:Tt}=It,le=ue(),xt=O(),$a=(e,t,r={})=>{if(e===t)return!0;e=new Qo(e,r),t=new Qo(t,r);let o=!1;e:for(let n of e.set){for(let s of t.set){let i=ka(n,s,r);if(o=o||i!==null,i)continue e}if(o)return!1}return!0},Ca=[new It(">=0.0.0-0")],Zo=[new It(">=0.0.0")],ka=(e,t,r)=>{if(e===t)return!0;if(e.length===1&&e[0].semver===Tt){if(t.length===1&&t[0].semver===Tt)return!0;r.includePrerelease?e=Ca:e=Zo}if(t.length===1&&t[0].semver===Tt){if(r.includePrerelease)return!0;t=Zo}let o=new Set,n,s;for(let d of e)d.operator===">"||d.operator===">="?n=en(n,d,r):d.operator==="<"||d.operator==="<="?s=tn(s,d,r):o.add(d.semver);if(o.size>1)return null;let i;if(n&&s){if(i=xt(n.semver,s.semver,r),i>0)return null;if(i===0&&(n.operator!==">="||s.operator!=="<="))return null}for(let d of o){if(n&&!le(d,String(n),r)||s&&!le(d,String(s),r))return null;for(let hn of t)if(!le(d,String(hn),r))return!1;return!0}let u,l,m,g,p=s&&!r.includePrerelease&&s.semver.prerelease.length?s.semver:!1,E=n&&!r.includePrerelease&&n.semver.prerelease.length?n.semver:!1;p&&p.prerelease.length===1&&s.operator==="<"&&p.prerelease[0]===0&&(p=!1);for(let d of t){if(g=g||d.operator===">"||d.operator===">=",m=m||d.operator==="<"||d.operator==="<=",n){if(E&&d.semver.prerelease&&d.semver.prerelease.length&&d.semver.major===E.major&&d.semver.minor===E.minor&&d.semver.patch===E.patch&&(E=!1),d.operator===">"||d.operator===">="){if(u=en(n,d,r),u===d&&u!==n)return!1}else if(n.operator===">="&&!le(n.semver,String(d),r))return!1}if(s){if(p&&d.semver.prerelease&&d.semver.prerelease.length&&d.semver.major===p.major&&d.semver.minor===p.minor&&d.semver.patch===p.patch&&(p=!1),d.operator==="<"||d.operator==="<="){if(l=tn(s,d,r),l===d&&l!==s)return!1}else if(s.operator==="<="&&!le(s.semver,String(d),r))return!1}if(!d.operator&&(s||n)&&i!==0)return!1}return!(n&&m&&!s&&i!==0||s&&g&&!n&&i!==0||E||p)},en=(e,t,r)=>{if(!e)return t;let o=xt(e.semver,t.semver,r);return o>0?e:o<0||t.operator===">"&&e.operator===">="?t:e},tn=(e,t,r)=>{if(!e)return t;let o=xt(e.semver,t.semver,r);return o<0?e:o>0||t.operator==="<"&&e.operator==="<="?t:e};rn.exports=$a});var cn=f((Sw,an)=>{var Ot=X(),nn=ne(),Na=A(),sn=mt(),La=D(),_a=$r(),qa=kr(),Ua=_r(),Fa=Fr(),Da=Hr(),Ha=jr(),Ma=Vr(),ja=Xr(),Ba=O(),Va=Jr(),Ga=Qr(),Xa=ve(),Wa=ro(),Ka=no(),za=ie(),Ja=$e(),Ya=gt(),Qa=yt(),Za=Ce(),ec=ke(),tc=Et(),rc=ho(),oc=ae(),nc=P(),sc=ue(),ic=vo(),ac=Co(),cc=No(),uc=qo(),lc=Fo(),pc=_e(),dc=Vo(),fc=Xo(),hc=zo(),mc=Yo(),gc=on();an.exports={parse:La,valid:_a,clean:qa,inc:Ua,diff:Fa,major:Da,minor:Ha,patch:Ma,prerelease:ja,compare:Ba,rcompare:Va,compareLoose:Ga,compareBuild:Xa,sort:Wa,rsort:Ka,gt:za,lt:Ja,eq:Ya,neq:Qa,gte:Za,lte:ec,cmp:tc,coerce:rc,Comparator:oc,Range:nc,satisfies:sc,toComparators:ic,maxSatisfying:ac,minSatisfying:cc,minVersion:uc,validRange:lc,outside:pc,gtr:dc,ltr:fc,intersects:hc,simplifyRange:mc,subset:gc,SemVer:Na,re:Ot.re,src:Ot.src,tokens:Ot.t,SEMVER_SPEC_VERSION:nn.SEMVER_SPEC_VERSION,RELEASE_TYPES:nn.RELEASE_TYPES,compareIdentifiers:sn.compareIdentifiers,rcompareIdentifiers:sn.rcompareIdentifiers}});var ZS=b(mn(),1);var de;try{de=crypto}catch{}var L;(function(e){e.Base64="base64",e.Hex="hex"})(L||(L={}));var j=()=>{throw new Error("Missing adapter implementation for 'abstractFetch' - make sure to import the appropriate adapter for your platform")};function Ue(e){j=e}var _=()=>{throw new Error("Missing adapter implementation for 'abstractConvertRequest' - make sure to import the appropriate adapter for your platform")};function Fe(e){_=e}var fe=()=>{throw new Error("Missing adapter implementation for 'abstractConvertResponse' - make sure to import the appropriate adapter for your platform")};function De(e){fe=e}var He=()=>{throw new Error("Missing adapter implementation for 'abstractConvertHeaders' - make sure to import the appropriate adapter for your platform")};function Me(e){He=e}var he=()=>{throw new Error("Missing adapter implementation for 'abstractRuntimeString' - make sure to import the appropriate adapter for your platform")};function z(e){he=e}function je(e){return e.replace(/(^|-)(\w+)/g,(t,r,o)=>r+o.slice(0,1).toUpperCase()+o.slice(1).toLowerCase())}function me(e,t,r){J(e);let o=je(t),n=e[o];n?Array.isArray(n)||(n=[n]):n=[],e[o]=n,n.push(r)}function Lt(e){return typeof e=="number"?e.toString():e}function J(e){for(let[t,r]of Object.entries(e)){let o=je(t);e[o]||(e[o]=[]),Array.isArray(e[o])||(e[o]=[Lt(e[o])]),t!==o&&(delete e[t],e[o].push(...[r].flat().map(n=>Lt(n))))}return e}function Be(e){return e?Object.entries(e).flatMap(([t,r])=>Array.isArray(r)?r.map(o=>[t,o]):[[t,r]]):[]}async function _t(e){let t=e.rawRequest,r={};for(let[o,n]of t.headers.entries())me(r,o,n);return{headers:r,method:t.method??"GET",url:new URL(t.url).toString()}}async function Ve(e,t){let r=new Headers;return Be(e??{}).forEach(([o,n])=>r.append(o,n)),Promise.resolve(r)}async function qt(e,t){return new Response(e.body,{status:e.statusCode,statusText:e.statusText,headers:await Ve(e.headers??{})})}function Ut(){return"Web API"}Ue(fetch);Fe(_t);De(qt);Me(Ve);z(Ut);var k;(function(e){e[e.Error=0]="Error",e[e.Warning=1]="Warning",e[e.Info=2]="Info",e[e.Debug=3]="Debug"})(k||(k={}));var B;(function(e){e.October22="2022-10",e.January23="2023-01",e.April23="2023-04",e.July23="2023-07",e.October23="2023-10",e.January24="2024-01",e.April24="2024-04",e.July24="2024-07",e.Unstable="unstable"})(B||(B={}));var ge=B.July24,x;(function(e){e.AccessToken="X-Shopify-Access-Token",e.ApiVersion="X-Shopify-API-Version",e.Domain="X-Shopify-Shop-Domain",e.Hmac="X-Shopify-Hmac-Sha256",e.Topic="X-Shopify-Topic",e.SubTopic="X-Shopify-Sub-Topic",e.WebhookId="X-Shopify-Webhook-Id",e.StorefrontPrivateToken="Shopify-Storefront-Private-Token",e.StorefrontSDKVariant="X-SDK-Variant",e.StorefrontSDKVersion="X-SDK-Version"})(x||(x={}));var Xe;(function(e){e.Rest="rest",e.Graphql="graphql"})(Xe||(Xe={}));var Q;(function(e){e.OneTime="ONE_TIME",e.Every30Days="EVERY_30_DAYS",e.Annual="ANNUAL",e.Usage="USAGE"})(Q||(Q={}));var We;(function(e){e.ApplyImmediately="APPLY_IMMEDIATELY",e.ApplyOnNextBillingCycle="APPLY_ON_NEXT_BILLING_CYCLE",e.Standard="STANDARD"})(We||(We={}));var Mt=`\r
`;var Sn=Mt+Mt;var Qe;(function(e){e.Get="GET",e.Post="POST",e.Put="PUT",e.Delete="DELETE"})(Qe||(Qe={}));var Ze;(function(e){e.Get="GET",e.Post="POST",e.Put="PUT",e.Patch="PATCH",e.Delete="DELETE",e.Head="HEAD",e.Options="OPTIONS",e.Connect="CONNECT"})(Ze||(Ze={}));var v;(function(e){e[e.Continue=100]="Continue",e[e.SwitchingProtocols=101]="SwitchingProtocols",e[e.Ok=200]="Ok",e[e.Created=201]="Created",e[e.Accepted=202]="Accepted",e[e.NonAuthoritativeInformation=203]="NonAuthoritativeInformation",e[e.NoContent=204]="NoContent",e[e.ResetContent=205]="ResetContent",e[e.PartialContent=206]="PartialContent",e[e.MultipleChoices=300]="MultipleChoices",e[e.MovedPermanently=301]="MovedPermanently",e[e.Found=302]="Found",e[e.SeeOther=303]="SeeOther",e[e.NotModified=304]="NotModified",e[e.UseProxy=305]="UseProxy",e[e.TemporaryRedirect=307]="TemporaryRedirect",e[e.BadRequest=400]="BadRequest",e[e.Unauthorized=401]="Unauthorized",e[e.PaymentRequired=402]="PaymentRequired",e[e.Forbidden=403]="Forbidden",e[e.NotFound=404]="NotFound",e[e.MethodNotAllowed=405]="MethodNotAllowed",e[e.NotAcceptable=406]="NotAcceptable",e[e.ProxyAuthenticationRequired=407]="ProxyAuthenticationRequired",e[e.RequestTimeout=408]="RequestTimeout",e[e.Conflict=409]="Conflict",e[e.Gone=410]="Gone",e[e.LengthRequired=411]="LengthRequired",e[e.PreconditionFailed=412]="PreconditionFailed",e[e.RequestEntityTooLarge=413]="RequestEntityTooLarge",e[e.RequestUriTooLong=414]="RequestUriTooLong",e[e.UnsupportedMediaType=415]="UnsupportedMediaType",e[e.RequestedRangeNotSatisfiable=416]="RequestedRangeNotSatisfiable",e[e.ExpectationFailed=417]="ExpectationFailed",e[e.ImATeapot=418]="ImATeapot",e[e.UnprocessableEntity=422]="UnprocessableEntity",e[e.TooManyRequests=429]="TooManyRequests",e[e.InternalServerError=500]="InternalServerError",e[e.NotImplemented=501]="NotImplemented",e[e.BadGateway=502]="BadGateway",e[e.ServiceUnavailable=503]="ServiceUnavailable",e[e.GatewayTimeout=504]="GatewayTimeout",e[e.HttpVersionNotSupported=505]="HttpVersionNotSupported"})(v||(v={}));var et;(function(e){e.Accept="Accept",e.AcceptEncoding="Accept-Encoding",e.AcceptLanguage="Accept-Language",e.AccessControlAllowCredentials="Access-Control-Allow-Credentials",e.AccessControlAllowHeaders="Access-Control-Allow-Headers",e.AccessControlAllowMethods="Access-Control-Allow-Methods",e.AccessControlAllowOrigin="Access-Control-Allow-Origin",e.AccessControlExposeHeaders="Access-Control-Expose-Headers",e.AccessControlMaxAge="Access-Control-Max-Age",e.AccessControlRequestHeaders="Access-Control-Request-Headers",e.AccessControlRequestMethod="Access-Control-Request-Method",e.Authorization="Authorization",e.CacheControl="Cache-Control",e.CacheStatus="Cache-Status",e.Connection="Connection",e.ContentDisposition="Content-Disposition",e.ContentEncoding="Content-Encoding",e.ContentLength="Content-Length",e.ContentSecurityPolicy="Content-Security-Policy",e.ContentSecurityPolicyReportOnly="Content-Security-Policy-Report-Only",e.ContentType="Content-Type",e.ContentTypeOptions="X-Content-Type-Options",e.Cookie="Cookie",e.DownloadOptions="X-Download-Options",e.ETag="ETag",e.Forwarded="Forwarded",e.ForwardedFor="X-Forwarded-For",e.ForwardedHost="X-Forwarded-Host",e.ForwardedProtocol="X-Forwarded-Proto",e.FrameOptions="X-Frame-Options",e.Host="Host",e.IfNoneMatch="If-None-Match",e.Location="Location",e.Origin="Origin",e.ReferrerPolicy="Referrer-Policy",e.ServerTiming="Server-Timing",e.StrictTransportSecurity="Strict-Transport-Security",e.TimingAllowOrigin="Timing-Allow-Origin",e.Trailer="Trailer",e.TransferEncoding="Transfer-Encoding",e.UserAgent="User-Agent",e.WwwAuthenticate="WWW-Authenticate",e.XhrRedirectedTo="X-XHR-Redirected-To",e.XhrReferer="X-XHR-Referer",e.XssProtecton="X-XSS-Protection",e.XContentTypeOptions="X-Content-Type-Options",e.XDownloadOptions="X-Download-Options",e.XForwardedFor="X-Forwarded-For",e.XForwardedHost="X-Forwarded-Host",e.XForwardedProto="X-Forwarded-Proto",e.XFrameOptions="X-Frame-Options",e.XXhrRedirectedTo="X-XHR-Redirected-To",e.XXhrReferer="X-XHR-Referer",e.XXssProtecton="X-XSS-Protection",e.XXssProtection="X-XSS-Protection"})(et||(et={}));var tt;(function(e){e.ChildSrc="child-src",e.ConnectSrc="connect-src",e.DefaultSrc="default-src",e.FontSrc="font-src",e.FrameSrc="frame-src",e.ImgSrc="img-src",e.ManifestSrc="manifest-src",e.MediaSrc="media-src",e.ObjectSrc="object-src",e.PrefetchSrc="prefetch-src",e.ScriptSrc="script-src",e.StyleSrc="style-src",e.WebrtcSrc="webrtc-src",e.WorkerSrc="worker-src",e.BaseUri="base-uri",e.PluginTypes="plugin-types",e.Sandbox="sandbox",e.FormAction="form-action",e.FrameAncestors="frame-ancestors",e.ReportUri="report-uri",e.BlockAllMixedContent="block-all-mixed-content",e.RequireSriFor="require-sri-for",e.UpgradeInsecureRequests="upgrade-insecure-requests"})(tt||(tt={}));var rt;(function(e){e.Forms="allow-forms",e.SameOrigin="allow-same-origin",e.Scripts="allow-scripts",e.Popups="allow-popups",e.Modals="allow-modals",e.OrientationLock="allow-orientation-lock",e.PointerLock="allow-pointer-lock",e.Presentation="allow-presentation",e.PopupsToEscapeSandbox="allow-popups-to-escape-sandbox",e.TopNavigation="allow-top-navigation"})(rt||(rt={}));var ot;(function(e){e.Any="*",e.Self="'self'",e.UnsafeInline="'unsafe-inline'",e.UnsafeEval="'unsafe-eval'",e.None="'none'",e.StrictDynamic="'strict-dynamic'",e.ReportSample="'report-sample'",e.Data="data:",e.Blob="blob:",e.FileSystem="filesystem:"})(ot||(ot={}));var nt;(function(e){e.Script="script",e.Style="style"})(nt||(nt={}));var st;(function(e){e.Sha256="sha256",e.Sha384="sha384",e.Sha512="sha512"})(st||(st={}));var it;(function(e){e.Informational="1xx",e.Success="2xx",e.Redirection="3xx",e.ClientError="4xx",e.ServerError="5xx",e.Unknown="Unknown"})(it||(it={}));var U;(function(e){e.NoCache="no-cache",e.NoStore="no-store",e.MustRevalidate="must-revalidate",e.MaxAge="max-age"})(U||(U={}));var kn=`${U.NoCache},${U.NoStore},${U.MustRevalidate},${U.MaxAge}=0`;var G;(function(e){e.Flow="flow",e.Webhook="webhook",e.FulfillmentService="fulfillment_service"})(G||(G={}));var ee={MissingBody:"missing_body",InvalidHmac:"invalid_hmac",MissingHmac:"missing_hmac"};var te;(function(e){e.JSON="application/json",e.GraphQL="application/graphql",e.URLEncoded="application/x-www-form-urlencoded"})(te||(te={}));var Ae;(function(e){e.OnlineAccessToken="urn:shopify:params:oauth:token-type:online-access-token",e.OfflineAccessToken="urn:shopify:params:oauth:token-type:offline-access-token"})(Ae||(Ae={}));var F;(function(e){e.Http="http",e.EventBridge="eventbridge",e.PubSub="pubsub"})(F||(F={}));var we;(function(e){e.Create="create",e.Update="update",e.Delete="delete"})(we||(we={}));var Re={...ee,MissingHeaders:"missing_headers"};var as={subTopic:x.SubTopic},Bh={apiVersion:x.ApiVersion,domain:x.Domain,hmac:x.Hmac,topic:x.Topic,webhookId:x.WebhookId,...as};var Yh={[v.Ok]:"OK",[v.BadRequest]:"Bad Request",[v.Unauthorized]:"Unauthorized",[v.NotFound]:"Not Found",[v.InternalServerError]:"Internal Server Error"};var re;(function(e){e.AppStore="app_store",e.SingleMerchant="single_merchant",e.ShopifyAdmin="shopify_admin"})(re||(re={}));var be;(function(e){e.MissingShop="MISSING_SHOP",e.InvalidShop="INVALID_SHOP"})(be||(be={}));function ur(e){let{parentHeaders:t,loaderHeaders:r,actionHeaders:o,errorHeaders:n}=e;return n&&Array.from(n.entries()).length>0?n:new Headers([...t?Array.from(t.entries()):[],...r?Array.from(r.entries()):[],...o?Array.from(o.entries()):[]])}var lr=b(C(),1);function pr(e){if(e.constructor.name==="ErrorResponse"||e.constructor.name==="ErrorResponseImpl")return(0,lr.jsx)("div",{dangerouslySetInnerHTML:{__html:e.data||"Handling response"}});throw e}var lt={error:pr,headers:ur};var Ec=b(cn(),1);z(()=>"Remix");var Pt=b(C(),1);var ln=b(C(),1),pn=b(pe(),1);var bc=pn.default.forwardRef((e,t)=>(0,ln.jsx)(Ct,{...e,to:e.url??e.to,ref:t}));var Tc;(async()=>Tc=await import("/build/_shared/en-2HFHUW2L.js"))();var dn=b(C(),1),qe=b(pe(),1),vt=(0,qe.createContext)(null);var Ic=b(C(),1),xc=b(pe(),1);var Oc=b(C(),1),Pc=b(pe(),1);var M=b(C(),1),vc=()=>[{rel:"stylesheet",href:Nt}];function fn(){let{products:e}=kt();return Array.isArray(e)?(0,M.jsxs)("div",{children:[(0,M.jsx)("h1",{children:"Products from dd Belgium"}),(0,M.jsx)("ul",{children:e.map((t,r)=>(0,M.jsx)("li",{children:t.name},r))})]}):(0,M.jsx)("div",{children:"Error: Products data is not in the expected format."})}function $c(){return lt.error($t())}export{$c as ErrorBoundary,fn as default,vc as links};
