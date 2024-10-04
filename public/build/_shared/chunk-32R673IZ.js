import{a as vt}from"/build/_shared/chunk-PZX6XDA2.js";import{c as Pt}from"/build/_shared/chunk-FNGBN7UJ.js";import{a as pe,c as M}from"/build/_shared/chunk-TQC3RT7F.js";import{b as f,c as P}from"/build/_shared/chunk-Q3IECNXJ.js";var ne=f((PA,dr)=>{var ws="2.0.0",Rs=Number.MAX_SAFE_INTEGER||9007199254740991,Ss=16,bs=256-6,Ts=["major","premajor","minor","preminor","patch","prepatch","prerelease"];dr.exports={MAX_LENGTH:256,MAX_SAFE_COMPONENT_LENGTH:Ss,MAX_SAFE_BUILD_LENGTH:bs,MAX_SAFE_INTEGER:Rs,RELEASE_TYPES:Ts,SEMVER_SPEC_VERSION:ws,FLAG_INCLUDE_PRERELEASE:1,FLAG_LOOSE:2}});var se=f((vA,fr)=>{var Is=typeof process=="object"&&process.env&&process.env.NODE_DEBUG&&/\bsemver\b/i.test(process.env.NODE_DEBUG)?(...e)=>console.error("SEMVER",...e):()=>{};fr.exports=Is});var X=f(($,hr)=>{var{MAX_SAFE_COMPONENT_LENGTH:dt,MAX_SAFE_BUILD_LENGTH:Os,MAX_LENGTH:xs}=ne(),Ps=se();$=hr.exports={};var vs=$.re=[],$s=$.safeRe=[],a=$.src=[],c=$.t={},Cs=0,ft="[a-zA-Z0-9-]",ks=[["\\s",1],["\\d",xs],[ft,Os]],Ns=e=>{for(let[t,r]of ks)e=e.split(`${t}*`).join(`${t}{0,${r}}`).split(`${t}+`).join(`${t}{1,${r}}`);return e},h=(e,t,r)=>{let o=Ns(t),n=Cs++;Ps(e,n,t),c[e]=n,a[n]=t,vs[n]=new RegExp(t,r?"g":void 0),$s[n]=new RegExp(o,r?"g":void 0)};h("NUMERICIDENTIFIER","0|[1-9]\\d*");h("NUMERICIDENTIFIERLOOSE","\\d+");h("NONNUMERICIDENTIFIER",`\\d*[a-zA-Z-]${ft}*`);h("MAINVERSION",`(${a[c.NUMERICIDENTIFIER]})\\.(${a[c.NUMERICIDENTIFIER]})\\.(${a[c.NUMERICIDENTIFIER]})`);h("MAINVERSIONLOOSE",`(${a[c.NUMERICIDENTIFIERLOOSE]})\\.(${a[c.NUMERICIDENTIFIERLOOSE]})\\.(${a[c.NUMERICIDENTIFIERLOOSE]})`);h("PRERELEASEIDENTIFIER",`(?:${a[c.NUMERICIDENTIFIER]}|${a[c.NONNUMERICIDENTIFIER]})`);h("PRERELEASEIDENTIFIERLOOSE",`(?:${a[c.NUMERICIDENTIFIERLOOSE]}|${a[c.NONNUMERICIDENTIFIER]})`);h("PRERELEASE",`(?:-(${a[c.PRERELEASEIDENTIFIER]}(?:\\.${a[c.PRERELEASEIDENTIFIER]})*))`);h("PRERELEASELOOSE",`(?:-?(${a[c.PRERELEASEIDENTIFIERLOOSE]}(?:\\.${a[c.PRERELEASEIDENTIFIERLOOSE]})*))`);h("BUILDIDENTIFIER",`${ft}+`);h("BUILD",`(?:\\+(${a[c.BUILDIDENTIFIER]}(?:\\.${a[c.BUILDIDENTIFIER]})*))`);h("FULLPLAIN",`v?${a[c.MAINVERSION]}${a[c.PRERELEASE]}?${a[c.BUILD]}?`);h("FULL",`^${a[c.FULLPLAIN]}$`);h("LOOSEPLAIN",`[v=\\s]*${a[c.MAINVERSIONLOOSE]}${a[c.PRERELEASELOOSE]}?${a[c.BUILD]}?`);h("LOOSE",`^${a[c.LOOSEPLAIN]}$`);h("GTLT","((?:<|>)?=?)");h("XRANGEIDENTIFIERLOOSE",`${a[c.NUMERICIDENTIFIERLOOSE]}|x|X|\\*`);h("XRANGEIDENTIFIER",`${a[c.NUMERICIDENTIFIER]}|x|X|\\*`);h("XRANGEPLAIN",`[v=\\s]*(${a[c.XRANGEIDENTIFIER]})(?:\\.(${a[c.XRANGEIDENTIFIER]})(?:\\.(${a[c.XRANGEIDENTIFIER]})(?:${a[c.PRERELEASE]})?${a[c.BUILD]}?)?)?`);h("XRANGEPLAINLOOSE",`[v=\\s]*(${a[c.XRANGEIDENTIFIERLOOSE]})(?:\\.(${a[c.XRANGEIDENTIFIERLOOSE]})(?:\\.(${a[c.XRANGEIDENTIFIERLOOSE]})(?:${a[c.PRERELEASELOOSE]})?${a[c.BUILD]}?)?)?`);h("XRANGE",`^${a[c.GTLT]}\\s*${a[c.XRANGEPLAIN]}$`);h("XRANGELOOSE",`^${a[c.GTLT]}\\s*${a[c.XRANGEPLAINLOOSE]}$`);h("COERCEPLAIN",`(^|[^\\d])(\\d{1,${dt}})(?:\\.(\\d{1,${dt}}))?(?:\\.(\\d{1,${dt}}))?`);h("COERCE",`${a[c.COERCEPLAIN]}(?:$|[^\\d])`);h("COERCEFULL",a[c.COERCEPLAIN]+`(?:${a[c.PRERELEASE]})?(?:${a[c.BUILD]})?(?:$|[^\\d])`);h("COERCERTL",a[c.COERCE],!0);h("COERCERTLFULL",a[c.COERCEFULL],!0);h("LONETILDE","(?:~>?)");h("TILDETRIM",`(\\s*)${a[c.LONETILDE]}\\s+`,!0);$.tildeTrimReplace="$1~";h("TILDE",`^${a[c.LONETILDE]}${a[c.XRANGEPLAIN]}$`);h("TILDELOOSE",`^${a[c.LONETILDE]}${a[c.XRANGEPLAINLOOSE]}$`);h("LONECARET","(?:\\^)");h("CARETTRIM",`(\\s*)${a[c.LONECARET]}\\s+`,!0);$.caretTrimReplace="$1^";h("CARET",`^${a[c.LONECARET]}${a[c.XRANGEPLAIN]}$`);h("CARETLOOSE",`^${a[c.LONECARET]}${a[c.XRANGEPLAINLOOSE]}$`);h("COMPARATORLOOSE",`^${a[c.GTLT]}\\s*(${a[c.LOOSEPLAIN]})$|^$`);h("COMPARATOR",`^${a[c.GTLT]}\\s*(${a[c.FULLPLAIN]})$|^$`);h("COMPARATORTRIM",`(\\s*)${a[c.GTLT]}\\s*(${a[c.LOOSEPLAIN]}|${a[c.XRANGEPLAIN]})`,!0);$.comparatorTrimReplace="$1$2$3";h("HYPHENRANGE",`^\\s*(${a[c.XRANGEPLAIN]})\\s+-\\s+(${a[c.XRANGEPLAIN]})\\s*$`);h("HYPHENRANGELOOSE",`^\\s*(${a[c.XRANGEPLAINLOOSE]})\\s+-\\s+(${a[c.XRANGEPLAINLOOSE]})\\s*$`);h("STAR","(<|>)?=?\\s*\\*");h("GTE0","^\\s*>=\\s*0\\.0\\.0\\s*$");h("GTE0PRE","^\\s*>=\\s*0\\.0\\.0-0\\s*$")});var Oe=f(($A,mr)=>{var Ls=Object.freeze({loose:!0}),_s=Object.freeze({}),qs=e=>e?typeof e!="object"?Ls:e:_s;mr.exports=qs});var ht=f((CA,yr)=>{var gr=/^[0-9]+$/,Er=(e,t)=>{let r=gr.test(e),o=gr.test(t);return r&&o&&(e=+e,t=+t),e===t?0:r&&!o?-1:o&&!r?1:e<t?-1:1},Us=(e,t)=>Er(t,e);yr.exports={compareIdentifiers:Er,rcompareIdentifiers:Us}});var A=f((kA,Sr)=>{var xe=se(),{MAX_LENGTH:Ar,MAX_SAFE_INTEGER:Pe}=ne(),{safeRe:wr,t:Rr}=X(),Fs=Oe(),{compareIdentifiers:W}=ht(),T=class{constructor(t,r){if(r=Fs(r),t instanceof T){if(t.loose===!!r.loose&&t.includePrerelease===!!r.includePrerelease)return t;t=t.version}else if(typeof t!="string")throw new TypeError(`Invalid version. Must be a string. Got type "${typeof t}".`);if(t.length>Ar)throw new TypeError(`version is longer than ${Ar} characters`);xe("SemVer",t,r),this.options=r,this.loose=!!r.loose,this.includePrerelease=!!r.includePrerelease;let o=t.trim().match(r.loose?wr[Rr.LOOSE]:wr[Rr.FULL]);if(!o)throw new TypeError(`Invalid Version: ${t}`);if(this.raw=t,this.major=+o[1],this.minor=+o[2],this.patch=+o[3],this.major>Pe||this.major<0)throw new TypeError("Invalid major version");if(this.minor>Pe||this.minor<0)throw new TypeError("Invalid minor version");if(this.patch>Pe||this.patch<0)throw new TypeError("Invalid patch version");o[4]?this.prerelease=o[4].split(".").map(n=>{if(/^[0-9]+$/.test(n)){let s=+n;if(s>=0&&s<Pe)return s}return n}):this.prerelease=[],this.build=o[5]?o[5].split("."):[],this.format()}format(){return this.version=`${this.major}.${this.minor}.${this.patch}`,this.prerelease.length&&(this.version+=`-${this.prerelease.join(".")}`),this.version}toString(){return this.version}compare(t){if(xe("SemVer.compare",this.version,this.options,t),!(t instanceof T)){if(typeof t=="string"&&t===this.version)return 0;t=new T(t,this.options)}return t.version===this.version?0:this.compareMain(t)||this.comparePre(t)}compareMain(t){return t instanceof T||(t=new T(t,this.options)),W(this.major,t.major)||W(this.minor,t.minor)||W(this.patch,t.patch)}comparePre(t){if(t instanceof T||(t=new T(t,this.options)),this.prerelease.length&&!t.prerelease.length)return-1;if(!this.prerelease.length&&t.prerelease.length)return 1;if(!this.prerelease.length&&!t.prerelease.length)return 0;let r=0;do{let o=this.prerelease[r],n=t.prerelease[r];if(xe("prerelease compare",r,o,n),o===void 0&&n===void 0)return 0;if(n===void 0)return 1;if(o===void 0)return-1;if(o===n)continue;return W(o,n)}while(++r)}compareBuild(t){t instanceof T||(t=new T(t,this.options));let r=0;do{let o=this.build[r],n=t.build[r];if(xe("build compare",r,o,n),o===void 0&&n===void 0)return 0;if(n===void 0)return 1;if(o===void 0)return-1;if(o===n)continue;return W(o,n)}while(++r)}inc(t,r,o){switch(t){case"premajor":this.prerelease.length=0,this.patch=0,this.minor=0,this.major++,this.inc("pre",r,o);break;case"preminor":this.prerelease.length=0,this.patch=0,this.minor++,this.inc("pre",r,o);break;case"prepatch":this.prerelease.length=0,this.inc("patch",r,o),this.inc("pre",r,o);break;case"prerelease":this.prerelease.length===0&&this.inc("patch",r,o),this.inc("pre",r,o);break;case"major":(this.minor!==0||this.patch!==0||this.prerelease.length===0)&&this.major++,this.minor=0,this.patch=0,this.prerelease=[];break;case"minor":(this.patch!==0||this.prerelease.length===0)&&this.minor++,this.patch=0,this.prerelease=[];break;case"patch":this.prerelease.length===0&&this.patch++,this.prerelease=[];break;case"pre":{let n=Number(o)?1:0;if(!r&&o===!1)throw new Error("invalid increment argument: identifier is empty");if(this.prerelease.length===0)this.prerelease=[n];else{let s=this.prerelease.length;for(;--s>=0;)typeof this.prerelease[s]=="number"&&(this.prerelease[s]++,s=-2);if(s===-1){if(r===this.prerelease.join(".")&&o===!1)throw new Error("invalid increment argument: identifier already exists");this.prerelease.push(n)}}if(r){let s=[r,n];o===!1&&(s=[r]),W(this.prerelease[0],r)===0?isNaN(this.prerelease[1])&&(this.prerelease=s):this.prerelease=s}break}default:throw new Error(`invalid increment argument: ${t}`)}return this.raw=this.format(),this.build.length&&(this.raw+=`+${this.build.join(".")}`),this}};Sr.exports=T});var F=f((NA,Tr)=>{var br=A(),Ds=(e,t,r=!1)=>{if(e instanceof br)return e;try{return new br(e,t)}catch(o){if(!r)return null;throw o}};Tr.exports=Ds});var Or=f((LA,Ir)=>{var Hs=F(),Ms=(e,t)=>{let r=Hs(e,t);return r?r.version:null};Ir.exports=Ms});var Pr=f((_A,xr)=>{var js=F(),Bs=(e,t)=>{let r=js(e.trim().replace(/^[=v]+/,""),t);return r?r.version:null};xr.exports=Bs});var Cr=f((qA,$r)=>{var vr=A(),Vs=(e,t,r,o,n)=>{typeof r=="string"&&(n=o,o=r,r=void 0);try{return new vr(e instanceof vr?e.version:e,r).inc(t,o,n).version}catch{return null}};$r.exports=Vs});var Lr=f((UA,Nr)=>{var kr=F(),Gs=(e,t)=>{let r=kr(e,null,!0),o=kr(t,null,!0),n=r.compare(o);if(n===0)return null;let s=n>0,i=s?r:o,l=s?o:r,u=!!i.prerelease.length;if(!!l.prerelease.length&&!u)return!l.patch&&!l.minor?"major":i.patch?"patch":i.minor?"minor":"major";let g=u?"pre":"";return r.major!==o.major?g+"major":r.minor!==o.minor?g+"minor":r.patch!==o.patch?g+"patch":"prerelease"};Nr.exports=Gs});var qr=f((FA,_r)=>{var Xs=A(),Ws=(e,t)=>new Xs(e,t).major;_r.exports=Ws});var Fr=f((DA,Ur)=>{var Ks=A(),zs=(e,t)=>new Ks(e,t).minor;Ur.exports=zs});var Hr=f((HA,Dr)=>{var Js=A(),Ys=(e,t)=>new Js(e,t).patch;Dr.exports=Ys});var jr=f((MA,Mr)=>{var Qs=F(),Zs=(e,t)=>{let r=Qs(e,t);return r&&r.prerelease.length?r.prerelease:null};Mr.exports=Zs});var O=f((jA,Vr)=>{var Br=A(),ei=(e,t,r)=>new Br(e,r).compare(new Br(t,r));Vr.exports=ei});var Xr=f((BA,Gr)=>{var ti=O(),ri=(e,t,r)=>ti(t,e,r);Gr.exports=ri});var Kr=f((VA,Wr)=>{var oi=O(),ni=(e,t)=>oi(e,t,!0);Wr.exports=ni});var ve=f((GA,Jr)=>{var zr=A(),si=(e,t,r)=>{let o=new zr(e,r),n=new zr(t,r);return o.compare(n)||o.compareBuild(n)};Jr.exports=si});var Qr=f((XA,Yr)=>{var ii=ve(),ai=(e,t)=>e.sort((r,o)=>ii(r,o,t));Yr.exports=ai});var eo=f((WA,Zr)=>{var ci=ve(),li=(e,t)=>e.sort((r,o)=>ci(o,r,t));Zr.exports=li});var ie=f((KA,to)=>{var ui=O(),pi=(e,t,r)=>ui(e,t,r)>0;to.exports=pi});var $e=f((zA,ro)=>{var di=O(),fi=(e,t,r)=>di(e,t,r)<0;ro.exports=fi});var mt=f((JA,oo)=>{var hi=O(),mi=(e,t,r)=>hi(e,t,r)===0;oo.exports=mi});var gt=f((YA,no)=>{var gi=O(),Ei=(e,t,r)=>gi(e,t,r)!==0;no.exports=Ei});var Ce=f((QA,so)=>{var yi=O(),Ai=(e,t,r)=>yi(e,t,r)>=0;so.exports=Ai});var ke=f((ZA,io)=>{var wi=O(),Ri=(e,t,r)=>wi(e,t,r)<=0;io.exports=Ri});var Et=f((ew,ao)=>{var Si=mt(),bi=gt(),Ti=ie(),Ii=Ce(),Oi=$e(),xi=ke(),Pi=(e,t,r,o)=>{switch(t){case"===":return typeof e=="object"&&(e=e.version),typeof r=="object"&&(r=r.version),e===r;case"!==":return typeof e=="object"&&(e=e.version),typeof r=="object"&&(r=r.version),e!==r;case"":case"=":case"==":return Si(e,r,o);case"!=":return bi(e,r,o);case">":return Ti(e,r,o);case">=":return Ii(e,r,o);case"<":return Oi(e,r,o);case"<=":return xi(e,r,o);default:throw new TypeError(`Invalid operator: ${t}`)}};ao.exports=Pi});var lo=f((tw,co)=>{var vi=A(),$i=F(),{safeRe:Ne,t:Le}=X(),Ci=(e,t)=>{if(e instanceof vi)return e;if(typeof e=="number"&&(e=String(e)),typeof e!="string")return null;t=t||{};let r=null;if(!t.rtl)r=e.match(t.includePrerelease?Ne[Le.COERCEFULL]:Ne[Le.COERCE]);else{let u=t.includePrerelease?Ne[Le.COERCERTLFULL]:Ne[Le.COERCERTL],m;for(;(m=u.exec(e))&&(!r||r.index+r[0].length!==e.length);)(!r||m.index+m[0].length!==r.index+r[0].length)&&(r=m),u.lastIndex=m.index+m[1].length+m[2].length;u.lastIndex=-1}if(r===null)return null;let o=r[2],n=r[3]||"0",s=r[4]||"0",i=t.includePrerelease&&r[5]?`-${r[5]}`:"",l=t.includePrerelease&&r[6]?`+${r[6]}`:"";return $i(`${o}.${n}.${s}${i}${l}`,t)};co.exports=Ci});var po=f((rw,uo)=>{var yt=class{constructor(){this.max=1e3,this.map=new Map}get(t){let r=this.map.get(t);if(r!==void 0)return this.map.delete(t),this.map.set(t,r),r}delete(t){return this.map.delete(t)}set(t,r){if(!this.delete(t)&&r!==void 0){if(this.map.size>=this.max){let n=this.map.keys().next().value;this.delete(n)}this.map.set(t,r)}return this}};uo.exports=yt});var x=f((ow,go)=>{var ki=/\s+/g,D=class{constructor(t,r){if(r=Li(r),t instanceof D)return t.loose===!!r.loose&&t.includePrerelease===!!r.includePrerelease?t:new D(t.raw,r);if(t instanceof At)return this.raw=t.value,this.set=[[t]],this.formatted=void 0,this;if(this.options=r,this.loose=!!r.loose,this.includePrerelease=!!r.includePrerelease,this.raw=t.trim().replace(ki," "),this.set=this.raw.split("||").map(o=>this.parseRange(o.trim())).filter(o=>o.length),!this.set.length)throw new TypeError(`Invalid SemVer Range: ${this.raw}`);if(this.set.length>1){let o=this.set[0];if(this.set=this.set.filter(n=>!ho(n[0])),this.set.length===0)this.set=[o];else if(this.set.length>1){for(let n of this.set)if(n.length===1&&Mi(n[0])){this.set=[n];break}}}this.formatted=void 0}get range(){if(this.formatted===void 0){this.formatted="";for(let t=0;t<this.set.length;t++){t>0&&(this.formatted+="||");let r=this.set[t];for(let o=0;o<r.length;o++)o>0&&(this.formatted+=" "),this.formatted+=r[o].toString().trim()}}return this.formatted}format(){return this.range}toString(){return this.range}parseRange(t){let o=((this.options.includePrerelease&&Di)|(this.options.loose&&Hi))+":"+t,n=fo.get(o);if(n)return n;let s=this.options.loose,i=s?b[R.HYPHENRANGELOOSE]:b[R.HYPHENRANGE];t=t.replace(i,Yi(this.options.includePrerelease)),E("hyphen replace",t),t=t.replace(b[R.COMPARATORTRIM],qi),E("comparator trim",t),t=t.replace(b[R.TILDETRIM],Ui),E("tilde trim",t),t=t.replace(b[R.CARETTRIM],Fi),E("caret trim",t);let l=t.split(" ").map(p=>ji(p,this.options)).join(" ").split(/\s+/).map(p=>Ji(p,this.options));s&&(l=l.filter(p=>(E("loose invalid filter",p,this.options),!!p.match(b[R.COMPARATORLOOSE])))),E("range list",l);let u=new Map,m=l.map(p=>new At(p,this.options));for(let p of m){if(ho(p))return[p];u.set(p.value,p)}u.size>1&&u.has("")&&u.delete("");let g=[...u.values()];return fo.set(o,g),g}intersects(t,r){if(!(t instanceof D))throw new TypeError("a Range is required");return this.set.some(o=>mo(o,r)&&t.set.some(n=>mo(n,r)&&o.every(s=>n.every(i=>s.intersects(i,r)))))}test(t){if(!t)return!1;if(typeof t=="string")try{t=new _i(t,this.options)}catch{return!1}for(let r=0;r<this.set.length;r++)if(Qi(this.set[r],t,this.options))return!0;return!1}};go.exports=D;var Ni=po(),fo=new Ni,Li=Oe(),At=ae(),E=se(),_i=A(),{safeRe:b,t:R,comparatorTrimReplace:qi,tildeTrimReplace:Ui,caretTrimReplace:Fi}=X(),{FLAG_INCLUDE_PRERELEASE:Di,FLAG_LOOSE:Hi}=ne(),ho=e=>e.value==="<0.0.0-0",Mi=e=>e.value==="",mo=(e,t)=>{let r=!0,o=e.slice(),n=o.pop();for(;r&&o.length;)r=o.every(s=>n.intersects(s,t)),n=o.pop();return r},ji=(e,t)=>(E("comp",e,t),e=Gi(e,t),E("caret",e),e=Bi(e,t),E("tildes",e),e=Wi(e,t),E("xrange",e),e=zi(e,t),E("stars",e),e),S=e=>!e||e.toLowerCase()==="x"||e==="*",Bi=(e,t)=>e.trim().split(/\s+/).map(r=>Vi(r,t)).join(" "),Vi=(e,t)=>{let r=t.loose?b[R.TILDELOOSE]:b[R.TILDE];return e.replace(r,(o,n,s,i,l)=>{E("tilde",e,o,n,s,i,l);let u;return S(n)?u="":S(s)?u=`>=${n}.0.0 <${+n+1}.0.0-0`:S(i)?u=`>=${n}.${s}.0 <${n}.${+s+1}.0-0`:l?(E("replaceTilde pr",l),u=`>=${n}.${s}.${i}-${l} <${n}.${+s+1}.0-0`):u=`>=${n}.${s}.${i} <${n}.${+s+1}.0-0`,E("tilde return",u),u})},Gi=(e,t)=>e.trim().split(/\s+/).map(r=>Xi(r,t)).join(" "),Xi=(e,t)=>{E("caret",e,t);let r=t.loose?b[R.CARETLOOSE]:b[R.CARET],o=t.includePrerelease?"-0":"";return e.replace(r,(n,s,i,l,u)=>{E("caret",e,n,s,i,l,u);let m;return S(s)?m="":S(i)?m=`>=${s}.0.0${o} <${+s+1}.0.0-0`:S(l)?s==="0"?m=`>=${s}.${i}.0${o} <${s}.${+i+1}.0-0`:m=`>=${s}.${i}.0${o} <${+s+1}.0.0-0`:u?(E("replaceCaret pr",u),s==="0"?i==="0"?m=`>=${s}.${i}.${l}-${u} <${s}.${i}.${+l+1}-0`:m=`>=${s}.${i}.${l}-${u} <${s}.${+i+1}.0-0`:m=`>=${s}.${i}.${l}-${u} <${+s+1}.0.0-0`):(E("no pr"),s==="0"?i==="0"?m=`>=${s}.${i}.${l}${o} <${s}.${i}.${+l+1}-0`:m=`>=${s}.${i}.${l}${o} <${s}.${+i+1}.0-0`:m=`>=${s}.${i}.${l} <${+s+1}.0.0-0`),E("caret return",m),m})},Wi=(e,t)=>(E("replaceXRanges",e,t),e.split(/\s+/).map(r=>Ki(r,t)).join(" ")),Ki=(e,t)=>{e=e.trim();let r=t.loose?b[R.XRANGELOOSE]:b[R.XRANGE];return e.replace(r,(o,n,s,i,l,u)=>{E("xRange",e,o,n,s,i,l,u);let m=S(s),g=m||S(i),p=g||S(l),y=p;return n==="="&&y&&(n=""),u=t.includePrerelease?"-0":"",m?n===">"||n==="<"?o="<0.0.0-0":o="*":n&&y?(g&&(i=0),l=0,n===">"?(n=">=",g?(s=+s+1,i=0,l=0):(i=+i+1,l=0)):n==="<="&&(n="<",g?s=+s+1:i=+i+1),n==="<"&&(u="-0"),o=`${n+s}.${i}.${l}${u}`):g?o=`>=${s}.0.0${u} <${+s+1}.0.0-0`:p&&(o=`>=${s}.${i}.0${u} <${s}.${+i+1}.0-0`),E("xRange return",o),o})},zi=(e,t)=>(E("replaceStars",e,t),e.trim().replace(b[R.STAR],"")),Ji=(e,t)=>(E("replaceGTE0",e,t),e.trim().replace(b[t.includePrerelease?R.GTE0PRE:R.GTE0],"")),Yi=e=>(t,r,o,n,s,i,l,u,m,g,p,y)=>(S(o)?r="":S(n)?r=`>=${o}.0.0${e?"-0":""}`:S(s)?r=`>=${o}.${n}.0${e?"-0":""}`:i?r=`>=${r}`:r=`>=${r}${e?"-0":""}`,S(m)?u="":S(g)?u=`<${+m+1}.0.0-0`:S(p)?u=`<${m}.${+g+1}.0-0`:y?u=`<=${m}.${g}.${p}-${y}`:e?u=`<${m}.${g}.${+p+1}-0`:u=`<=${u}`,`${r} ${u}`.trim()),Qi=(e,t,r)=>{for(let o=0;o<e.length;o++)if(!e[o].test(t))return!1;if(t.prerelease.length&&!r.includePrerelease){for(let o=0;o<e.length;o++)if(E(e[o].semver),e[o].semver!==At.ANY&&e[o].semver.prerelease.length>0){let n=e[o].semver;if(n.major===t.major&&n.minor===t.minor&&n.patch===t.patch)return!0}return!1}return!0}});var ae=f((nw,So)=>{var ce=Symbol("SemVer ANY"),K=class{static get ANY(){return ce}constructor(t,r){if(r=Eo(r),t instanceof K){if(t.loose===!!r.loose)return t;t=t.value}t=t.trim().split(/\s+/).join(" "),Rt("comparator",t,r),this.options=r,this.loose=!!r.loose,this.parse(t),this.semver===ce?this.value="":this.value=this.operator+this.semver.version,Rt("comp",this)}parse(t){let r=this.options.loose?yo[Ao.COMPARATORLOOSE]:yo[Ao.COMPARATOR],o=t.match(r);if(!o)throw new TypeError(`Invalid comparator: ${t}`);this.operator=o[1]!==void 0?o[1]:"",this.operator==="="&&(this.operator=""),o[2]?this.semver=new wo(o[2],this.options.loose):this.semver=ce}toString(){return this.value}test(t){if(Rt("Comparator.test",t,this.options.loose),this.semver===ce||t===ce)return!0;if(typeof t=="string")try{t=new wo(t,this.options)}catch{return!1}return wt(t,this.operator,this.semver,this.options)}intersects(t,r){if(!(t instanceof K))throw new TypeError("a Comparator is required");return this.operator===""?this.value===""?!0:new Ro(t.value,r).test(this.value):t.operator===""?t.value===""?!0:new Ro(this.value,r).test(t.semver):(r=Eo(r),r.includePrerelease&&(this.value==="<0.0.0-0"||t.value==="<0.0.0-0")||!r.includePrerelease&&(this.value.startsWith("<0.0.0")||t.value.startsWith("<0.0.0"))?!1:!!(this.operator.startsWith(">")&&t.operator.startsWith(">")||this.operator.startsWith("<")&&t.operator.startsWith("<")||this.semver.version===t.semver.version&&this.operator.includes("=")&&t.operator.includes("=")||wt(this.semver,"<",t.semver,r)&&this.operator.startsWith(">")&&t.operator.startsWith("<")||wt(this.semver,">",t.semver,r)&&this.operator.startsWith("<")&&t.operator.startsWith(">")))}};So.exports=K;var Eo=Oe(),{safeRe:yo,t:Ao}=X(),wt=Et(),Rt=se(),wo=A(),Ro=x()});var le=f((sw,bo)=>{var Zi=x(),ea=(e,t,r)=>{try{t=new Zi(t,r)}catch{return!1}return t.test(e)};bo.exports=ea});var Io=f((iw,To)=>{var ta=x(),ra=(e,t)=>new ta(e,t).set.map(r=>r.map(o=>o.value).join(" ").trim().split(" "));To.exports=ra});var xo=f((aw,Oo)=>{var oa=A(),na=x(),sa=(e,t,r)=>{let o=null,n=null,s=null;try{s=new na(t,r)}catch{return null}return e.forEach(i=>{s.test(i)&&(!o||n.compare(i)===-1)&&(o=i,n=new oa(o,r))}),o};Oo.exports=sa});var vo=f((cw,Po)=>{var ia=A(),aa=x(),ca=(e,t,r)=>{let o=null,n=null,s=null;try{s=new aa(t,r)}catch{return null}return e.forEach(i=>{s.test(i)&&(!o||n.compare(i)===1)&&(o=i,n=new ia(o,r))}),o};Po.exports=ca});var ko=f((lw,Co)=>{var St=A(),la=x(),$o=ie(),ua=(e,t)=>{e=new la(e,t);let r=new St("0.0.0");if(e.test(r)||(r=new St("0.0.0-0"),e.test(r)))return r;r=null;for(let o=0;o<e.set.length;++o){let n=e.set[o],s=null;n.forEach(i=>{let l=new St(i.semver.version);switch(i.operator){case">":l.prerelease.length===0?l.patch++:l.prerelease.push(0),l.raw=l.format();case"":case">=":(!s||$o(l,s))&&(s=l);break;case"<":case"<=":break;default:throw new Error(`Unexpected operation: ${i.operator}`)}}),s&&(!r||$o(r,s))&&(r=s)}return r&&e.test(r)?r:null};Co.exports=ua});var Lo=f((uw,No)=>{var pa=x(),da=(e,t)=>{try{return new pa(e,t).range||"*"}catch{return null}};No.exports=da});var _e=f((pw,Fo)=>{var fa=A(),Uo=ae(),{ANY:ha}=Uo,ma=x(),ga=le(),_o=ie(),qo=$e(),Ea=ke(),ya=Ce(),Aa=(e,t,r,o)=>{e=new fa(e,o),t=new ma(t,o);let n,s,i,l,u;switch(r){case">":n=_o,s=Ea,i=qo,l=">",u=">=";break;case"<":n=qo,s=ya,i=_o,l="<",u="<=";break;default:throw new TypeError('Must provide a hilo val of "<" or ">"')}if(ga(e,t,o))return!1;for(let m=0;m<t.set.length;++m){let g=t.set[m],p=null,y=null;if(g.forEach(d=>{d.semver===ha&&(d=new Uo(">=0.0.0")),p=p||d,y=y||d,n(d.semver,p.semver,o)?p=d:i(d.semver,y.semver,o)&&(y=d)}),p.operator===l||p.operator===u||(!y.operator||y.operator===l)&&s(e,y.semver))return!1;if(y.operator===u&&i(e,y.semver))return!1}return!0};Fo.exports=Aa});var Ho=f((dw,Do)=>{var wa=_e(),Ra=(e,t,r)=>wa(e,t,">",r);Do.exports=Ra});var jo=f((fw,Mo)=>{var Sa=_e(),ba=(e,t,r)=>Sa(e,t,"<",r);Mo.exports=ba});var Go=f((hw,Vo)=>{var Bo=x(),Ta=(e,t,r)=>(e=new Bo(e,r),t=new Bo(t,r),e.intersects(t,r));Vo.exports=Ta});var Wo=f((mw,Xo)=>{var Ia=le(),Oa=O();Xo.exports=(e,t,r)=>{let o=[],n=null,s=null,i=e.sort((g,p)=>Oa(g,p,r));for(let g of i)Ia(g,t,r)?(s=g,n||(n=g)):(s&&o.push([n,s]),s=null,n=null);n&&o.push([n,null]);let l=[];for(let[g,p]of o)g===p?l.push(g):!p&&g===i[0]?l.push("*"):p?g===i[0]?l.push(`<=${p}`):l.push(`${g} - ${p}`):l.push(`>=${g}`);let u=l.join(" || "),m=typeof t.raw=="string"?t.raw:String(t);return u.length<m.length?u:t}});var Zo=f((gw,Qo)=>{var Ko=x(),Tt=ae(),{ANY:bt}=Tt,ue=le(),It=O(),xa=(e,t,r={})=>{if(e===t)return!0;e=new Ko(e,r),t=new Ko(t,r);let o=!1;e:for(let n of e.set){for(let s of t.set){let i=va(n,s,r);if(o=o||i!==null,i)continue e}if(o)return!1}return!0},Pa=[new Tt(">=0.0.0-0")],zo=[new Tt(">=0.0.0")],va=(e,t,r)=>{if(e===t)return!0;if(e.length===1&&e[0].semver===bt){if(t.length===1&&t[0].semver===bt)return!0;r.includePrerelease?e=Pa:e=zo}if(t.length===1&&t[0].semver===bt){if(r.includePrerelease)return!0;t=zo}let o=new Set,n,s;for(let d of e)d.operator===">"||d.operator===">="?n=Jo(n,d,r):d.operator==="<"||d.operator==="<="?s=Yo(s,d,r):o.add(d.semver);if(o.size>1)return null;let i;if(n&&s){if(i=It(n.semver,s.semver,r),i>0)return null;if(i===0&&(n.operator!==">="||s.operator!=="<="))return null}for(let d of o){if(n&&!ue(d,String(n),r)||s&&!ue(d,String(s),r))return null;for(let pn of t)if(!ue(d,String(pn),r))return!1;return!0}let l,u,m,g,p=s&&!r.includePrerelease&&s.semver.prerelease.length?s.semver:!1,y=n&&!r.includePrerelease&&n.semver.prerelease.length?n.semver:!1;p&&p.prerelease.length===1&&s.operator==="<"&&p.prerelease[0]===0&&(p=!1);for(let d of t){if(g=g||d.operator===">"||d.operator===">=",m=m||d.operator==="<"||d.operator==="<=",n){if(y&&d.semver.prerelease&&d.semver.prerelease.length&&d.semver.major===y.major&&d.semver.minor===y.minor&&d.semver.patch===y.patch&&(y=!1),d.operator===">"||d.operator===">="){if(l=Jo(n,d,r),l===d&&l!==n)return!1}else if(n.operator===">="&&!ue(n.semver,String(d),r))return!1}if(s){if(p&&d.semver.prerelease&&d.semver.prerelease.length&&d.semver.major===p.major&&d.semver.minor===p.minor&&d.semver.patch===p.patch&&(p=!1),d.operator==="<"||d.operator==="<="){if(u=Yo(s,d,r),u===d&&u!==s)return!1}else if(s.operator==="<="&&!ue(s.semver,String(d),r))return!1}if(!d.operator&&(s||n)&&i!==0)return!1}return!(n&&m&&!s&&i!==0||s&&g&&!n&&i!==0||y||p)},Jo=(e,t,r)=>{if(!e)return t;let o=It(e.semver,t.semver,r);return o>0?e:o<0||t.operator===">"&&e.operator===">="?t:e},Yo=(e,t,r)=>{if(!e)return t;let o=It(e.semver,t.semver,r);return o<0?e:o>0||t.operator==="<"&&e.operator==="<="?t:e};Qo.exports=xa});var on=f((Ew,rn)=>{var Ot=X(),en=ne(),$a=A(),tn=ht(),Ca=F(),ka=Or(),Na=Pr(),La=Cr(),_a=Lr(),qa=qr(),Ua=Fr(),Fa=Hr(),Da=jr(),Ha=O(),Ma=Xr(),ja=Kr(),Ba=ve(),Va=Qr(),Ga=eo(),Xa=ie(),Wa=$e(),Ka=mt(),za=gt(),Ja=Ce(),Ya=ke(),Qa=Et(),Za=lo(),ec=ae(),tc=x(),rc=le(),oc=Io(),nc=xo(),sc=vo(),ic=ko(),ac=Lo(),cc=_e(),lc=Ho(),uc=jo(),pc=Go(),dc=Wo(),fc=Zo();rn.exports={parse:Ca,valid:ka,clean:Na,inc:La,diff:_a,major:qa,minor:Ua,patch:Fa,prerelease:Da,compare:Ha,rcompare:Ma,compareLoose:ja,compareBuild:Ba,sort:Va,rsort:Ga,gt:Xa,lt:Wa,eq:Ka,neq:za,gte:Ja,lte:Ya,cmp:Qa,coerce:Za,Comparator:ec,Range:tc,satisfies:rc,toComparators:oc,maxSatisfying:nc,minSatisfying:sc,minVersion:ic,validRange:ac,outside:cc,gtr:lc,ltr:uc,intersects:pc,simplifyRange:dc,subset:fc,SemVer:$a,re:Ot.re,src:Ot.src,tokens:Ot.t,SEMVER_SPEC_VERSION:en.SEMVER_SPEC_VERSION,RELEASE_TYPES:en.RELEASE_TYPES,compareIdentifiers:tn.compareIdentifiers,rcompareIdentifiers:tn.rcompareIdentifiers}});function $t(e){let{parentHeaders:t,loaderHeaders:r,actionHeaders:o,errorHeaders:n}=e;return n&&Array.from(n.entries()).length>0?n:new Headers([...t?Array.from(t.entries()):[],...r?Array.from(r.entries()):[],...o?Array.from(o.entries()):[]])}var Ct=P(M(),1);function kt(e){if(e.constructor.name==="ErrorResponse"||e.constructor.name==="ErrorResponseImpl")return(0,Ct.jsx)("div",{dangerouslySetInnerHTML:{__html:e.data||"Handling response"}});throw e}var dn={error:kt,headers:$t};var de;try{de=crypto}catch{}var N;(function(e){e.Base64="base64",e.Hex="hex"})(N||(N={}));var j=()=>{throw new Error("Missing adapter implementation for 'abstractFetch' - make sure to import the appropriate adapter for your platform")};function Ue(e){j=e}var L=()=>{throw new Error("Missing adapter implementation for 'abstractConvertRequest' - make sure to import the appropriate adapter for your platform")};function Fe(e){L=e}var fe=()=>{throw new Error("Missing adapter implementation for 'abstractConvertResponse' - make sure to import the appropriate adapter for your platform")};function De(e){fe=e}var He=()=>{throw new Error("Missing adapter implementation for 'abstractConvertHeaders' - make sure to import the appropriate adapter for your platform")};function Me(e){He=e}var he=()=>{throw new Error("Missing adapter implementation for 'abstractRuntimeString' - make sure to import the appropriate adapter for your platform")};function z(e){he=e}function je(e){return e.replace(/(^|-)(\w+)/g,(t,r,o)=>r+o.slice(0,1).toUpperCase()+o.slice(1).toLowerCase())}function me(e,t,r){J(e);let o=je(t),n=e[o];n?Array.isArray(n)||(n=[n]):n=[],e[o]=n,n.push(r)}function Nt(e){return typeof e=="number"?e.toString():e}function J(e){for(let[t,r]of Object.entries(e)){let o=je(t);e[o]||(e[o]=[]),Array.isArray(e[o])||(e[o]=[Nt(e[o])]),t!==o&&(delete e[t],e[o].push(...[r].flat().map(n=>Nt(n))))}return e}function Be(e){return e?Object.entries(e).flatMap(([t,r])=>Array.isArray(r)?r.map(o=>[t,o]):[[t,r]]):[]}async function Lt(e){let t=e.rawRequest,r={};for(let[o,n]of t.headers.entries())me(r,o,n);return{headers:r,method:t.method??"GET",url:new URL(t.url).toString()}}async function Ve(e,t){let r=new Headers;return Be(e??{}).forEach(([o,n])=>r.append(o,n)),Promise.resolve(r)}async function _t(e,t){return new Response(e.body,{status:e.statusCode,statusText:e.statusText,headers:await Ve(e.headers??{})})}function qt(){return"Web API"}Ue(fetch);Fe(Lt);De(_t);Me(Ve);z(qt);var C;(function(e){e[e.Error=0]="Error",e[e.Warning=1]="Warning",e[e.Info=2]="Info",e[e.Debug=3]="Debug"})(C||(C={}));var B;(function(e){e.October22="2022-10",e.January23="2023-01",e.April23="2023-04",e.July23="2023-07",e.October23="2023-10",e.January24="2024-01",e.April24="2024-04",e.July24="2024-07",e.Unstable="unstable"})(B||(B={}));var ge=B.July24,I;(function(e){e.AccessToken="X-Shopify-Access-Token",e.ApiVersion="X-Shopify-API-Version",e.Domain="X-Shopify-Shop-Domain",e.Hmac="X-Shopify-Hmac-Sha256",e.Topic="X-Shopify-Topic",e.SubTopic="X-Shopify-Sub-Topic",e.WebhookId="X-Shopify-Webhook-Id",e.StorefrontPrivateToken="Shopify-Storefront-Private-Token",e.StorefrontSDKVariant="X-SDK-Variant",e.StorefrontSDKVersion="X-SDK-Version"})(I||(I={}));var Xe;(function(e){e.Rest="rest",e.Graphql="graphql"})(Xe||(Xe={}));var Q;(function(e){e.OneTime="ONE_TIME",e.Every30Days="EVERY_30_DAYS",e.Annual="ANNUAL",e.Usage="USAGE"})(Q||(Q={}));var We;(function(e){e.ApplyImmediately="APPLY_IMMEDIATELY",e.ApplyOnNextBillingCycle="APPLY_ON_NEXT_BILLING_CYCLE",e.Standard="STANDARD"})(We||(We={}));var Ht=`\r
`;var An=Ht+Ht;var Qe;(function(e){e.Get="GET",e.Post="POST",e.Put="PUT",e.Delete="DELETE"})(Qe||(Qe={}));var Ze;(function(e){e.Get="GET",e.Post="POST",e.Put="PUT",e.Patch="PATCH",e.Delete="DELETE",e.Head="HEAD",e.Options="OPTIONS",e.Connect="CONNECT"})(Ze||(Ze={}));var v;(function(e){e[e.Continue=100]="Continue",e[e.SwitchingProtocols=101]="SwitchingProtocols",e[e.Ok=200]="Ok",e[e.Created=201]="Created",e[e.Accepted=202]="Accepted",e[e.NonAuthoritativeInformation=203]="NonAuthoritativeInformation",e[e.NoContent=204]="NoContent",e[e.ResetContent=205]="ResetContent",e[e.PartialContent=206]="PartialContent",e[e.MultipleChoices=300]="MultipleChoices",e[e.MovedPermanently=301]="MovedPermanently",e[e.Found=302]="Found",e[e.SeeOther=303]="SeeOther",e[e.NotModified=304]="NotModified",e[e.UseProxy=305]="UseProxy",e[e.TemporaryRedirect=307]="TemporaryRedirect",e[e.BadRequest=400]="BadRequest",e[e.Unauthorized=401]="Unauthorized",e[e.PaymentRequired=402]="PaymentRequired",e[e.Forbidden=403]="Forbidden",e[e.NotFound=404]="NotFound",e[e.MethodNotAllowed=405]="MethodNotAllowed",e[e.NotAcceptable=406]="NotAcceptable",e[e.ProxyAuthenticationRequired=407]="ProxyAuthenticationRequired",e[e.RequestTimeout=408]="RequestTimeout",e[e.Conflict=409]="Conflict",e[e.Gone=410]="Gone",e[e.LengthRequired=411]="LengthRequired",e[e.PreconditionFailed=412]="PreconditionFailed",e[e.RequestEntityTooLarge=413]="RequestEntityTooLarge",e[e.RequestUriTooLong=414]="RequestUriTooLong",e[e.UnsupportedMediaType=415]="UnsupportedMediaType",e[e.RequestedRangeNotSatisfiable=416]="RequestedRangeNotSatisfiable",e[e.ExpectationFailed=417]="ExpectationFailed",e[e.ImATeapot=418]="ImATeapot",e[e.UnprocessableEntity=422]="UnprocessableEntity",e[e.TooManyRequests=429]="TooManyRequests",e[e.InternalServerError=500]="InternalServerError",e[e.NotImplemented=501]="NotImplemented",e[e.BadGateway=502]="BadGateway",e[e.ServiceUnavailable=503]="ServiceUnavailable",e[e.GatewayTimeout=504]="GatewayTimeout",e[e.HttpVersionNotSupported=505]="HttpVersionNotSupported"})(v||(v={}));var et;(function(e){e.Accept="Accept",e.AcceptEncoding="Accept-Encoding",e.AcceptLanguage="Accept-Language",e.AccessControlAllowCredentials="Access-Control-Allow-Credentials",e.AccessControlAllowHeaders="Access-Control-Allow-Headers",e.AccessControlAllowMethods="Access-Control-Allow-Methods",e.AccessControlAllowOrigin="Access-Control-Allow-Origin",e.AccessControlExposeHeaders="Access-Control-Expose-Headers",e.AccessControlMaxAge="Access-Control-Max-Age",e.AccessControlRequestHeaders="Access-Control-Request-Headers",e.AccessControlRequestMethod="Access-Control-Request-Method",e.Authorization="Authorization",e.CacheControl="Cache-Control",e.CacheStatus="Cache-Status",e.Connection="Connection",e.ContentDisposition="Content-Disposition",e.ContentEncoding="Content-Encoding",e.ContentLength="Content-Length",e.ContentSecurityPolicy="Content-Security-Policy",e.ContentSecurityPolicyReportOnly="Content-Security-Policy-Report-Only",e.ContentType="Content-Type",e.ContentTypeOptions="X-Content-Type-Options",e.Cookie="Cookie",e.DownloadOptions="X-Download-Options",e.ETag="ETag",e.Forwarded="Forwarded",e.ForwardedFor="X-Forwarded-For",e.ForwardedHost="X-Forwarded-Host",e.ForwardedProtocol="X-Forwarded-Proto",e.FrameOptions="X-Frame-Options",e.Host="Host",e.IfNoneMatch="If-None-Match",e.Location="Location",e.Origin="Origin",e.ReferrerPolicy="Referrer-Policy",e.ServerTiming="Server-Timing",e.StrictTransportSecurity="Strict-Transport-Security",e.TimingAllowOrigin="Timing-Allow-Origin",e.Trailer="Trailer",e.TransferEncoding="Transfer-Encoding",e.UserAgent="User-Agent",e.WwwAuthenticate="WWW-Authenticate",e.XhrRedirectedTo="X-XHR-Redirected-To",e.XhrReferer="X-XHR-Referer",e.XssProtecton="X-XSS-Protection",e.XContentTypeOptions="X-Content-Type-Options",e.XDownloadOptions="X-Download-Options",e.XForwardedFor="X-Forwarded-For",e.XForwardedHost="X-Forwarded-Host",e.XForwardedProto="X-Forwarded-Proto",e.XFrameOptions="X-Frame-Options",e.XXhrRedirectedTo="X-XHR-Redirected-To",e.XXhrReferer="X-XHR-Referer",e.XXssProtecton="X-XSS-Protection",e.XXssProtection="X-XSS-Protection"})(et||(et={}));var tt;(function(e){e.ChildSrc="child-src",e.ConnectSrc="connect-src",e.DefaultSrc="default-src",e.FontSrc="font-src",e.FrameSrc="frame-src",e.ImgSrc="img-src",e.ManifestSrc="manifest-src",e.MediaSrc="media-src",e.ObjectSrc="object-src",e.PrefetchSrc="prefetch-src",e.ScriptSrc="script-src",e.StyleSrc="style-src",e.WebrtcSrc="webrtc-src",e.WorkerSrc="worker-src",e.BaseUri="base-uri",e.PluginTypes="plugin-types",e.Sandbox="sandbox",e.FormAction="form-action",e.FrameAncestors="frame-ancestors",e.ReportUri="report-uri",e.BlockAllMixedContent="block-all-mixed-content",e.RequireSriFor="require-sri-for",e.UpgradeInsecureRequests="upgrade-insecure-requests"})(tt||(tt={}));var rt;(function(e){e.Forms="allow-forms",e.SameOrigin="allow-same-origin",e.Scripts="allow-scripts",e.Popups="allow-popups",e.Modals="allow-modals",e.OrientationLock="allow-orientation-lock",e.PointerLock="allow-pointer-lock",e.Presentation="allow-presentation",e.PopupsToEscapeSandbox="allow-popups-to-escape-sandbox",e.TopNavigation="allow-top-navigation"})(rt||(rt={}));var ot;(function(e){e.Any="*",e.Self="'self'",e.UnsafeInline="'unsafe-inline'",e.UnsafeEval="'unsafe-eval'",e.None="'none'",e.StrictDynamic="'strict-dynamic'",e.ReportSample="'report-sample'",e.Data="data:",e.Blob="blob:",e.FileSystem="filesystem:"})(ot||(ot={}));var nt;(function(e){e.Script="script",e.Style="style"})(nt||(nt={}));var st;(function(e){e.Sha256="sha256",e.Sha384="sha384",e.Sha512="sha512"})(st||(st={}));var it;(function(e){e.Informational="1xx",e.Success="2xx",e.Redirection="3xx",e.ClientError="4xx",e.ServerError="5xx",e.Unknown="Unknown"})(it||(it={}));var q;(function(e){e.NoCache="no-cache",e.NoStore="no-store",e.MustRevalidate="must-revalidate",e.MaxAge="max-age"})(q||(q={}));var vn=`${q.NoCache},${q.NoStore},${q.MustRevalidate},${q.MaxAge}=0`;var G;(function(e){e.Flow="flow",e.Webhook="webhook",e.FulfillmentService="fulfillment_service"})(G||(G={}));var ee={MissingBody:"missing_body",InvalidHmac:"invalid_hmac",MissingHmac:"missing_hmac"};var te;(function(e){e.JSON="application/json",e.GraphQL="application/graphql",e.URLEncoded="application/x-www-form-urlencoded"})(te||(te={}));var Ae;(function(e){e.OnlineAccessToken="urn:shopify:params:oauth:token-type:online-access-token",e.OfflineAccessToken="urn:shopify:params:oauth:token-type:offline-access-token"})(Ae||(Ae={}));var U;(function(e){e.Http="http",e.EventBridge="eventbridge",e.PubSub="pubsub"})(U||(U={}));var we;(function(e){e.Create="create",e.Update="update",e.Delete="delete"})(we||(we={}));var Re={...ee,MissingHeaders:"missing_headers"};var ns={subTopic:I.SubTopic},Bh={apiVersion:I.ApiVersion,domain:I.Domain,hmac:I.Hmac,topic:I.Topic,webhookId:I.WebhookId,...ns};var Yh={[v.Ok]:"OK",[v.BadRequest]:"Bad Request",[v.Unauthorized]:"Unauthorized",[v.NotFound]:"Not Found",[v.InternalServerError]:"Internal Server Error"};var re;(function(e){e.AppStore="app_store",e.SingleMerchant="single_merchant",e.ShopifyAdmin="shopify_admin"})(re||(re={}));var be;(function(e){e.MissingShop="MISSING_SHOP",e.InvalidShop="INVALID_SHOP"})(be||(be={}));var mc=P(on(),1);z(()=>"Remix");var H=P(M(),1);var sn="https://cdn.shopify.com/shopifycloud/app-bridge.js";var an=P(M(),1),cn=P(pe(),1);var ln=cn.default.forwardRef((e,t)=>(0,an.jsx)(Pt,{...e,to:e.url??e.to,ref:t}));var wc;import("/build/_shared/en-2HFHUW2L.js").then(e=>{wc=e.default}).catch(e=>console.error("Error loading JSON:",e));function Rc(e){let{children:t,apiKey:r,i18n:o,isEmbeddedApp:n=!0,__APP_BRIDGE_URL:s=sn,...i}=e;return(0,H.jsxs)(H.Fragment,{children:[n&&(0,H.jsx)("script",{src:s,"data-api-key":r}),(0,H.jsx)(vt,{...i,linkComponent:ln,i18n:o||englishI18n,children:t})]})}var un=P(M(),1),qe=P(pe(),1),xt=(0,qe.createContext)(null);var Sc=P(M(),1),bc=P(pe(),1);var Tc=P(M(),1),Ic=P(pe(),1);export{dn as a,Rc as b};
