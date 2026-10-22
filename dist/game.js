(()=>{var Iu=0,Vc=1,Lu=2;var En=1,Du=2,Qs=3,rn=0,je=1,Oe=2,on=0,an=1,Si=2,Gc=3,Wc=4,Nu=5;var hs=100,Uu=101,Fu=102,Ou=103,Bu=104,ku=200,zu=201,Hu=202,Vu=203,Xc=204,qc=205,Gu=206,Wu=207,Xu=208,qu=209,Yu=210,$u=211,Zu=212,ju=213,Ju=214,Ko=0,Qo=1,ta=2,Ws=3,ea=4,ia=5,na=6,sa=7,Yc=0,Ku=1,Qu=2,Hi=0,$c=1,Zc=2,jc=3,jr=4,Jc=5,Kc=6,Qc=7;var th=300,Wn=301,us=302,Ia=303,La=304,Jr=306,Mn=1e3,Mi=1001,ra=1002,qe=1003,td=1004;var Kr=1005;var ke=1006,Da=1007;var ln=1008;var gi=1009,eh=1010,ih=1011,tr=1012,Na=1013,Vi=1014,Pi=1015,Gi=1016,Ua=1017,Fa=1018,er=1020,nh=35902,sh=35899,rh=1021,oh=1022,xi=1023,Qi=1026,Xn=1027,Oa=1028,Ba=1029,qn=1030,ka=1031;var za=1033,Qr=33776,to=33777,eo=33778,io=33779,Ha=35840,Va=35841,Ga=35842,Wa=35843,Xa=36196,qa=37492,Ya=37496,$a=37488,Za=37489,no=37490,ja=37491,Ja=37808,Ka=37809,Qa=37810,tl=37811,el=37812,il=37813,nl=37814,sl=37815,rl=37816,ol=37817,al=37818,ll=37819,cl=37820,hl=37821,ul=36492,dl=36494,fl=36495,pl=36283,ml=36284,so=36285,gl=36286;var Ar=2300,oa=2301,jo=2302,Nc=2303,Uc=2400,Fc=2401,Oc=2402;var ed=3200;var xl=0,id=1,Wi="",Ie="srgb",Rr="srgb-linear",Cr="linear",le="srgb";var Jo=7680;var nd=519,sd=512,rd=513,od=514,yl=515,ad=516,ld=517,_l=518,cd=519,ah=35044,ir=35048;var lh="300 es",zi=2e3,Xs=2001;function lp(r){for(let t=r.length-1;t>=0;--t)if(r[t]>=65535)return!0;return!1}function cp(r){return ArrayBuffer.isView(r)&&!(r instanceof DataView)}function Pr(r){return document.createElementNS("http://www.w3.org/1999/xhtml",r)}function hd(){let r=Pr("canvas");return r.style.display="block",r}var su={},qs=null;function Ir(...r){let t="THREE."+r.shift();qs?qs("log",t,...r):console.log(t,...r)}function ud(r){let t=r[0];if(typeof t=="string"&&t.startsWith("TSL:")){let e=r[1];e&&e.isStackTrace?r[0]+=" "+e.getLocation():r[1]='Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.'}return r}function Ht(...r){r=ud(r);let t="THREE."+r.shift();if(qs)qs("warn",t,...r);else{let e=r[0];e&&e.isStackTrace?console.warn(e.getError(t)):console.warn(t,...r)}}function zt(...r){r=ud(r);let t="THREE."+r.shift();if(qs)qs("error",t,...r);else{let e=r[0];e&&e.isStackTrace?console.error(e.getError(t)):console.error(t,...r)}}function rs(...r){let t=r.join(" ");t in su||(su[t]=!0,Ht(...r))}function dd(r,t,e){return new Promise(function(i,n){function s(){switch(r.clientWaitSync(t,r.SYNC_FLUSH_COMMANDS_BIT,0)){case r.WAIT_FAILED:n();break;case r.TIMEOUT_EXPIRED:setTimeout(s,e);break;default:i()}}setTimeout(s,e)})}var fd={[Ko]:Qo,[ta]:na,[ea]:sa,[Ws]:ia,[Qo]:Ko,[na]:ta,[sa]:ea,[ia]:Ws},tn=class{addEventListener(t,e){this._listeners===void 0&&(this._listeners={});let i=this._listeners;i[t]===void 0&&(i[t]=[]),i[t].indexOf(e)===-1&&i[t].push(e)}hasEventListener(t,e){let i=this._listeners;return i===void 0?!1:i[t]!==void 0&&i[t].indexOf(e)!==-1}removeEventListener(t,e){let i=this._listeners;if(i===void 0)return;let n=i[t];if(n!==void 0){let s=n.indexOf(e);s!==-1&&n.splice(s,1)}}dispatchEvent(t){let e=this._listeners;if(e===void 0)return;let i=e[t.type];if(i!==void 0){t.target=this;let n=i.slice(0);for(let s=0,o=n.length;s<o;s++)n[s].call(this,t);t.target=null}}},ii=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];var hc=Math.PI/180,aa=180/Math.PI;function kn(){let r=Math.random()*4294967295|0,t=Math.random()*4294967295|0,e=Math.random()*4294967295|0,i=Math.random()*4294967295|0;return(ii[r&255]+ii[r>>8&255]+ii[r>>16&255]+ii[r>>24&255]+"-"+ii[t&255]+ii[t>>8&255]+"-"+ii[t>>16&15|64]+ii[t>>24&255]+"-"+ii[e&63|128]+ii[e>>8&255]+"-"+ii[e>>16&255]+ii[e>>24&255]+ii[i&255]+ii[i>>8&255]+ii[i>>16&255]+ii[i>>24&255]).toLowerCase()}function ee(r,t,e){return Math.max(t,Math.min(e,r))}function hp(r,t){return(r%t+t)%t}function uc(r,t,e){return(1-e)*r+e*t}function Ki(r,t){switch(t.constructor){case Float32Array:return r;case Uint32Array:return r/4294967295;case Uint16Array:return r/65535;case Uint8Array:case Uint8ClampedArray:return r/255;case Int32Array:return Math.max(r/2147483647,-1);case Int16Array:return Math.max(r/32767,-1);case Int8Array:return Math.max(r/127,-1);default:throw new Error("THREE.MathUtils: Invalid component type.")}}function de(r,t){switch(t.constructor){case Float32Array:return r;case Uint32Array:return Math.round(r*4294967295);case Uint16Array:return Math.round(r*65535);case Uint8Array:case Uint8ClampedArray:return Math.round(r*255);case Int32Array:return Math.round(r*2147483647);case Int16Array:return Math.round(r*32767);case Int8Array:return Math.round(r*127);default:throw new Error("THREE.MathUtils: Invalid component type.")}}var fh=class fh{constructor(t=0,e=0){this.x=t,this.y=e}get width(){return this.x}set width(t){this.x=t}get height(){return this.y}set height(t){this.y=t}set(t,e){return this.x=t,this.y=e,this}setScalar(t){return this.x=t,this.y=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;default:throw new Error("THREE.Vector2: index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;default:throw new Error("THREE.Vector2: index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y)}copy(t){return this.x=t.x,this.y=t.y,this}add(t){return this.x+=t.x,this.y+=t.y,this}addScalar(t){return this.x+=t,this.y+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this}subScalar(t){return this.x-=t,this.y-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this}multiply(t){return this.x*=t.x,this.y*=t.y,this}multiplyScalar(t){return this.x*=t,this.y*=t,this}divide(t){return this.x/=t.x,this.y/=t.y,this}divideScalar(t){return this.multiplyScalar(1/t)}applyMatrix3(t){let e=this.x,i=this.y,n=t.elements;return this.x=n[0]*e+n[3]*i+n[6],this.y=n[1]*e+n[4]*i+n[7],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this}clamp(t,e){return this.x=ee(this.x,t.x,e.x),this.y=ee(this.y,t.y,e.y),this}clampScalar(t,e){return this.x=ee(this.x,t,e),this.y=ee(this.y,t,e),this}clampLength(t,e){let i=this.length();return this.divideScalar(i||1).multiplyScalar(ee(i,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(t){return this.x*t.x+this.y*t.y}cross(t){return this.x*t.y-this.y*t.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(t){let e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;let i=this.dot(t)/e;return Math.acos(ee(i,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){let e=this.x-t.x,i=this.y-t.y;return e*e+i*i}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this}lerpVectors(t,e,i){return this.x=t.x+(e.x-t.x)*i,this.y=t.y+(e.y-t.y)*i,this}equals(t){return t.x===this.x&&t.y===this.y}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this}rotateAround(t,e){let i=Math.cos(e),n=Math.sin(e),s=this.x-t.x,o=this.y-t.y;return this.x=s*i-o*n+t.x,this.y=s*n+o*i+t.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}};fh.prototype.isVector2=!0;var Vt=fh,en=class{constructor(t=0,e=0,i=0,n=1){this.isQuaternion=!0,this._x=t,this._y=e,this._z=i,this._w=n}static slerpFlat(t,e,i,n,s,o,a){let l=i[n+0],c=i[n+1],h=i[n+2],u=i[n+3],d=s[o+0],f=s[o+1],g=s[o+2],x=s[o+3];if(u!==x||l!==d||c!==f||h!==g){let m=l*d+c*f+h*g+u*x;m<0&&(d=-d,f=-f,g=-g,x=-x,m=-m);let p=1-a;if(m<.9995){let y=Math.acos(m),M=Math.sin(y);p=Math.sin(p*y)/M,a=Math.sin(a*y)/M,l=l*p+d*a,c=c*p+f*a,h=h*p+g*a,u=u*p+x*a}else{l=l*p+d*a,c=c*p+f*a,h=h*p+g*a,u=u*p+x*a;let y=1/Math.sqrt(l*l+c*c+h*h+u*u);l*=y,c*=y,h*=y,u*=y}}t[e]=l,t[e+1]=c,t[e+2]=h,t[e+3]=u}static multiplyQuaternionsFlat(t,e,i,n,s,o){let a=i[n],l=i[n+1],c=i[n+2],h=i[n+3],u=s[o],d=s[o+1],f=s[o+2],g=s[o+3];return t[e]=a*g+h*u+l*f-c*d,t[e+1]=l*g+h*d+c*u-a*f,t[e+2]=c*g+h*f+a*d-l*u,t[e+3]=h*g-a*u-l*d-c*f,t}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get w(){return this._w}set w(t){this._w=t,this._onChangeCallback()}set(t,e,i,n){return this._x=t,this._y=e,this._z=i,this._w=n,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(t){return this._x=t.x,this._y=t.y,this._z=t.z,this._w=t.w,this._onChangeCallback(),this}setFromEuler(t,e=!0){let i=t._x,n=t._y,s=t._z,o=t._order,a=Math.cos,l=Math.sin,c=a(i/2),h=a(n/2),u=a(s/2),d=l(i/2),f=l(n/2),g=l(s/2);switch(o){case"XYZ":this._x=d*h*u+c*f*g,this._y=c*f*u-d*h*g,this._z=c*h*g+d*f*u,this._w=c*h*u-d*f*g;break;case"YXZ":this._x=d*h*u+c*f*g,this._y=c*f*u-d*h*g,this._z=c*h*g-d*f*u,this._w=c*h*u+d*f*g;break;case"ZXY":this._x=d*h*u-c*f*g,this._y=c*f*u+d*h*g,this._z=c*h*g+d*f*u,this._w=c*h*u-d*f*g;break;case"ZYX":this._x=d*h*u-c*f*g,this._y=c*f*u+d*h*g,this._z=c*h*g-d*f*u,this._w=c*h*u+d*f*g;break;case"YZX":this._x=d*h*u+c*f*g,this._y=c*f*u+d*h*g,this._z=c*h*g-d*f*u,this._w=c*h*u-d*f*g;break;case"XZY":this._x=d*h*u-c*f*g,this._y=c*f*u-d*h*g,this._z=c*h*g+d*f*u,this._w=c*h*u+d*f*g;break;default:Ht("Quaternion: .setFromEuler() encountered an unknown order: "+o)}return e===!0&&this._onChangeCallback(),this}setFromAxisAngle(t,e){let i=e/2,n=Math.sin(i);return this._x=t.x*n,this._y=t.y*n,this._z=t.z*n,this._w=Math.cos(i),this._onChangeCallback(),this}setFromRotationMatrix(t){let e=t.elements,i=e[0],n=e[4],s=e[8],o=e[1],a=e[5],l=e[9],c=e[2],h=e[6],u=e[10],d=i+a+u;if(d>0){let f=.5/Math.sqrt(d+1);this._w=.25/f,this._x=(h-l)*f,this._y=(s-c)*f,this._z=(o-n)*f}else if(i>a&&i>u){let f=2*Math.sqrt(1+i-a-u);this._w=(h-l)/f,this._x=.25*f,this._y=(n+o)/f,this._z=(s+c)/f}else if(a>u){let f=2*Math.sqrt(1+a-i-u);this._w=(s-c)/f,this._x=(n+o)/f,this._y=.25*f,this._z=(l+h)/f}else{let f=2*Math.sqrt(1+u-i-a);this._w=(o-n)/f,this._x=(s+c)/f,this._y=(l+h)/f,this._z=.25*f}return this._onChangeCallback(),this}setFromUnitVectors(t,e){let i=t.dot(e)+1;return i<1e-8?(i=0,Math.abs(t.x)>Math.abs(t.z)?(this._x=-t.y,this._y=t.x,this._z=0,this._w=i):(this._x=0,this._y=-t.z,this._z=t.y,this._w=i)):(this._x=t.y*e.z-t.z*e.y,this._y=t.z*e.x-t.x*e.z,this._z=t.x*e.y-t.y*e.x,this._w=i),this.normalize()}angleTo(t){return 2*Math.acos(Math.abs(ee(this.dot(t),-1,1)))}rotateTowards(t,e){let i=this.angleTo(t);if(i===0)return this;let n=Math.min(1,e/i);return this.slerp(t,n),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(t){return this._x*t._x+this._y*t._y+this._z*t._z+this._w*t._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let t=this.length();return t===0?(this._x=0,this._y=0,this._z=0,this._w=1):(t=1/t,this._x=this._x*t,this._y=this._y*t,this._z=this._z*t,this._w=this._w*t),this._onChangeCallback(),this}multiply(t){return this.multiplyQuaternions(this,t)}premultiply(t){return this.multiplyQuaternions(t,this)}multiplyQuaternions(t,e){let i=t._x,n=t._y,s=t._z,o=t._w,a=e._x,l=e._y,c=e._z,h=e._w;return this._x=i*h+o*a+n*c-s*l,this._y=n*h+o*l+s*a-i*c,this._z=s*h+o*c+i*l-n*a,this._w=o*h-i*a-n*l-s*c,this._onChangeCallback(),this}slerp(t,e){let i=t._x,n=t._y,s=t._z,o=t._w,a=this.dot(t);a<0&&(i=-i,n=-n,s=-s,o=-o,a=-a);let l=1-e;if(a<.9995){let c=Math.acos(a),h=Math.sin(c);l=Math.sin(l*c)/h,e=Math.sin(e*c)/h,this._x=this._x*l+i*e,this._y=this._y*l+n*e,this._z=this._z*l+s*e,this._w=this._w*l+o*e,this._onChangeCallback()}else this._x=this._x*l+i*e,this._y=this._y*l+n*e,this._z=this._z*l+s*e,this._w=this._w*l+o*e,this.normalize();return this}slerpQuaternions(t,e,i){return this.copy(t).slerp(e,i)}random(){let t=2*Math.PI*Math.random(),e=2*Math.PI*Math.random(),i=Math.random(),n=Math.sqrt(1-i),s=Math.sqrt(i);return this.set(n*Math.sin(t),n*Math.cos(t),s*Math.sin(e),s*Math.cos(e))}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._w===this._w}fromArray(t,e=0){return this._x=t[e],this._y=t[e+1],this._z=t[e+2],this._w=t[e+3],this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._w,t}fromBufferAttribute(t,e){return this._x=t.getX(e),this._y=t.getY(e),this._z=t.getZ(e),this._w=t.getW(e),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}},ph=class ph{constructor(t=0,e=0,i=0){this.x=t,this.y=e,this.z=i}set(t,e,i){return i===void 0&&(i=this.z),this.x=t,this.y=e,this.z=i,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;default:throw new Error("THREE.Vector3: index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("THREE.Vector3: index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this}multiplyVectors(t,e){return this.x=t.x*e.x,this.y=t.y*e.y,this.z=t.z*e.z,this}applyEuler(t){return this.applyQuaternion(ru.setFromEuler(t))}applyAxisAngle(t,e){return this.applyQuaternion(ru.setFromAxisAngle(t,e))}applyMatrix3(t){let e=this.x,i=this.y,n=this.z,s=t.elements;return this.x=s[0]*e+s[3]*i+s[6]*n,this.y=s[1]*e+s[4]*i+s[7]*n,this.z=s[2]*e+s[5]*i+s[8]*n,this}applyNormalMatrix(t){return this.applyMatrix3(t).normalize()}applyMatrix4(t){let e=this.x,i=this.y,n=this.z,s=t.elements,o=1/(s[3]*e+s[7]*i+s[11]*n+s[15]);return this.x=(s[0]*e+s[4]*i+s[8]*n+s[12])*o,this.y=(s[1]*e+s[5]*i+s[9]*n+s[13])*o,this.z=(s[2]*e+s[6]*i+s[10]*n+s[14])*o,this}applyQuaternion(t){let e=this.x,i=this.y,n=this.z,s=t.x,o=t.y,a=t.z,l=t.w,c=2*(o*n-a*i),h=2*(a*e-s*n),u=2*(s*i-o*e);return this.x=e+l*c+o*u-a*h,this.y=i+l*h+a*c-s*u,this.z=n+l*u+s*h-o*c,this}project(t){return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix)}unproject(t){return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld)}transformDirection(t){let e=this.x,i=this.y,n=this.z,s=t.elements;return this.x=s[0]*e+s[4]*i+s[8]*n,this.y=s[1]*e+s[5]*i+s[9]*n,this.z=s[2]*e+s[6]*i+s[10]*n,this.normalize()}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this}divideScalar(t){return this.multiplyScalar(1/t)}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this}clamp(t,e){return this.x=ee(this.x,t.x,e.x),this.y=ee(this.y,t.y,e.y),this.z=ee(this.z,t.z,e.z),this}clampScalar(t,e){return this.x=ee(this.x,t,e),this.y=ee(this.y,t,e),this.z=ee(this.z,t,e),this}clampLength(t,e){let i=this.length();return this.divideScalar(i||1).multiplyScalar(ee(i,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this}lerpVectors(t,e,i){return this.x=t.x+(e.x-t.x)*i,this.y=t.y+(e.y-t.y)*i,this.z=t.z+(e.z-t.z)*i,this}cross(t){return this.crossVectors(this,t)}crossVectors(t,e){let i=t.x,n=t.y,s=t.z,o=e.x,a=e.y,l=e.z;return this.x=n*l-s*a,this.y=s*o-i*l,this.z=i*a-n*o,this}projectOnVector(t){let e=t.lengthSq();if(e===0)return this.set(0,0,0);let i=t.dot(this)/e;return this.copy(t).multiplyScalar(i)}projectOnPlane(t){return dc.copy(this).projectOnVector(t),this.sub(dc)}reflect(t){return this.sub(dc.copy(t).multiplyScalar(2*this.dot(t)))}angleTo(t){let e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;let i=this.dot(t)/e;return Math.acos(ee(i,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){let e=this.x-t.x,i=this.y-t.y,n=this.z-t.z;return e*e+i*i+n*n}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)+Math.abs(this.z-t.z)}setFromSpherical(t){return this.setFromSphericalCoords(t.radius,t.phi,t.theta)}setFromSphericalCoords(t,e,i){let n=Math.sin(e)*t;return this.x=n*Math.sin(i),this.y=Math.cos(e)*t,this.z=n*Math.cos(i),this}setFromCylindrical(t){return this.setFromCylindricalCoords(t.radius,t.theta,t.y)}setFromCylindricalCoords(t,e,i){return this.x=t*Math.sin(e),this.y=i,this.z=t*Math.cos(e),this}setFromMatrixPosition(t){let e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this}setFromMatrixScale(t){let e=this.setFromMatrixColumn(t,0).length(),i=this.setFromMatrixColumn(t,1).length(),n=this.setFromMatrixColumn(t,2).length();return this.x=e,this.y=i,this.z=n,this}setFromMatrixColumn(t,e){return this.fromArray(t.elements,e*4)}setFromMatrix3Column(t,e){return this.fromArray(t.elements,e*3)}setFromEuler(t){return this.x=t._x,this.y=t._y,this.z=t._z,this}setFromColor(t){return this.x=t.r,this.y=t.g,this.z=t.b,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){let t=Math.random()*Math.PI*2,e=Math.random()*2-1,i=Math.sqrt(1-e*e);return this.x=i*Math.cos(t),this.y=e,this.z=i*Math.sin(t),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}};ph.prototype.isVector3=!0;var L=ph,dc=new L,ru=new en,mh=class mh{constructor(t,e,i,n,s,o,a,l,c){this.elements=[1,0,0,0,1,0,0,0,1],t!==void 0&&this.set(t,e,i,n,s,o,a,l,c)}set(t,e,i,n,s,o,a,l,c){let h=this.elements;return h[0]=t,h[1]=n,h[2]=a,h[3]=e,h[4]=s,h[5]=l,h[6]=i,h[7]=o,h[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(t){let e=this.elements,i=t.elements;return e[0]=i[0],e[1]=i[1],e[2]=i[2],e[3]=i[3],e[4]=i[4],e[5]=i[5],e[6]=i[6],e[7]=i[7],e[8]=i[8],this}extractBasis(t,e,i){return t.setFromMatrix3Column(this,0),e.setFromMatrix3Column(this,1),i.setFromMatrix3Column(this,2),this}setFromMatrix4(t){let e=t.elements;return this.set(e[0],e[4],e[8],e[1],e[5],e[9],e[2],e[6],e[10]),this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){let i=t.elements,n=e.elements,s=this.elements,o=i[0],a=i[3],l=i[6],c=i[1],h=i[4],u=i[7],d=i[2],f=i[5],g=i[8],x=n[0],m=n[3],p=n[6],y=n[1],M=n[4],_=n[7],v=n[2],S=n[5],T=n[8];return s[0]=o*x+a*y+l*v,s[3]=o*m+a*M+l*S,s[6]=o*p+a*_+l*T,s[1]=c*x+h*y+u*v,s[4]=c*m+h*M+u*S,s[7]=c*p+h*_+u*T,s[2]=d*x+f*y+g*v,s[5]=d*m+f*M+g*S,s[8]=d*p+f*_+g*T,this}multiplyScalar(t){let e=this.elements;return e[0]*=t,e[3]*=t,e[6]*=t,e[1]*=t,e[4]*=t,e[7]*=t,e[2]*=t,e[5]*=t,e[8]*=t,this}determinant(){let t=this.elements,e=t[0],i=t[1],n=t[2],s=t[3],o=t[4],a=t[5],l=t[6],c=t[7],h=t[8];return e*o*h-e*a*c-i*s*h+i*a*l+n*s*c-n*o*l}invert(){let t=this.elements,e=t[0],i=t[1],n=t[2],s=t[3],o=t[4],a=t[5],l=t[6],c=t[7],h=t[8],u=h*o-a*c,d=a*l-h*s,f=c*s-o*l,g=e*u+i*d+n*f;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);let x=1/g;return t[0]=u*x,t[1]=(n*c-h*i)*x,t[2]=(a*i-n*o)*x,t[3]=d*x,t[4]=(h*e-n*l)*x,t[5]=(n*s-a*e)*x,t[6]=f*x,t[7]=(i*l-c*e)*x,t[8]=(o*e-i*s)*x,this}transpose(){let t,e=this.elements;return t=e[1],e[1]=e[3],e[3]=t,t=e[2],e[2]=e[6],e[6]=t,t=e[5],e[5]=e[7],e[7]=t,this}getNormalMatrix(t){return this.setFromMatrix4(t).invert().transpose()}transposeIntoArray(t){let e=this.elements;return t[0]=e[0],t[1]=e[3],t[2]=e[6],t[3]=e[1],t[4]=e[4],t[5]=e[7],t[6]=e[2],t[7]=e[5],t[8]=e[8],this}setUvTransform(t,e,i,n,s,o,a){let l=Math.cos(s),c=Math.sin(s);return this.set(i*l,i*c,-i*(l*o+c*a)+o+t,-n*c,n*l,-n*(-c*o+l*a)+a+e,0,0,1),this}scale(t,e){return rs("Matrix3: .scale() is deprecated. Use .makeScale() instead."),this.premultiply(fc.makeScale(t,e)),this}rotate(t){return rs("Matrix3: .rotate() is deprecated. Use .makeRotation() instead."),this.premultiply(fc.makeRotation(-t)),this}translate(t,e){return rs("Matrix3: .translate() is deprecated. Use .makeTranslation() instead."),this.premultiply(fc.makeTranslation(t,e)),this}makeTranslation(t,e){return t.isVector2?this.set(1,0,t.x,0,1,t.y,0,0,1):this.set(1,0,t,0,1,e,0,0,1),this}makeRotation(t){let e=Math.cos(t),i=Math.sin(t);return this.set(e,-i,0,i,e,0,0,0,1),this}makeScale(t,e){return this.set(t,0,0,0,e,0,0,0,1),this}equals(t){let e=this.elements,i=t.elements;for(let n=0;n<9;n++)if(e[n]!==i[n])return!1;return!0}fromArray(t,e=0){for(let i=0;i<9;i++)this.elements[i]=t[i+e];return this}toArray(t=[],e=0){let i=this.elements;return t[e]=i[0],t[e+1]=i[1],t[e+2]=i[2],t[e+3]=i[3],t[e+4]=i[4],t[e+5]=i[5],t[e+6]=i[6],t[e+7]=i[7],t[e+8]=i[8],t}clone(){return new this.constructor().fromArray(this.elements)}};mh.prototype.isMatrix3=!0;var Gt=mh,fc=new Gt,ou=new Gt().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),au=new Gt().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function up(){let r={enabled:!0,workingColorSpace:Rr,spaces:{},convert:function(n,s,o){return this.enabled===!1||s===o||!s||!o||(this.spaces[s].transfer===le&&(n.r=vn(n.r),n.g=vn(n.g),n.b=vn(n.b)),this.spaces[s].primaries!==this.spaces[o].primaries&&(n.applyMatrix3(this.spaces[s].toXYZ),n.applyMatrix3(this.spaces[o].fromXYZ)),this.spaces[o].transfer===le&&(n.r=Gs(n.r),n.g=Gs(n.g),n.b=Gs(n.b))),n},workingToColorSpace:function(n,s){return this.convert(n,this.workingColorSpace,s)},colorSpaceToWorking:function(n,s){return this.convert(n,s,this.workingColorSpace)},getPrimaries:function(n){return this.spaces[n].primaries},getTransfer:function(n){return n===Wi?Cr:this.spaces[n].transfer},getToneMappingMode:function(n){return this.spaces[n].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(n,s=this.workingColorSpace){return n.fromArray(this.spaces[s].luminanceCoefficients)},define:function(n){Object.assign(this.spaces,n)},_getMatrix:function(n,s,o){return n.copy(this.spaces[s].toXYZ).multiply(this.spaces[o].fromXYZ)},_getDrawingBufferColorSpace:function(n){return this.spaces[n].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(n=this.workingColorSpace){return this.spaces[n].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(n,s){return rs("ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),r.workingToColorSpace(n,s)},toWorkingColorSpace:function(n,s){return rs("ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),r.colorSpaceToWorking(n,s)}},t=[.64,.33,.3,.6,.15,.06],e=[.2126,.7152,.0722],i=[.3127,.329];return r.define({[Rr]:{primaries:t,whitePoint:i,transfer:Cr,toXYZ:ou,fromXYZ:au,luminanceCoefficients:e,workingColorSpaceConfig:{unpackColorSpace:Ie},outputColorSpaceConfig:{drawingBufferColorSpace:Ie}},[Ie]:{primaries:t,whitePoint:i,transfer:le,toXYZ:ou,fromXYZ:au,luminanceCoefficients:e,outputColorSpaceConfig:{drawingBufferColorSpace:Ie}}}),r}var Kt=up();function vn(r){return r<.04045?r*.0773993808:Math.pow(r*.9478672986+.0521327014,2.4)}function Gs(r){return r<.0031308?r*12.92:1.055*Math.pow(r,.41666)-.055}var Es,la=class{static getDataURL(t,e="image/png"){if(/^data:/i.test(t.src)||typeof HTMLCanvasElement>"u")return t.src;let i;if(t instanceof HTMLCanvasElement)i=t;else{Es===void 0&&(Es=Pr("canvas")),Es.width=t.width,Es.height=t.height;let n=Es.getContext("2d");t instanceof ImageData?n.putImageData(t,0,0):n.drawImage(t,0,0,t.width,t.height),i=Es}return i.toDataURL(e)}static sRGBToLinear(t){if(typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap){let e=Pr("canvas");e.width=t.width,e.height=t.height;let i=e.getContext("2d");i.drawImage(t,0,0,t.width,t.height);let n=i.getImageData(0,0,t.width,t.height),s=n.data;for(let o=0;o<s.length;o++)s[o]=vn(s[o]/255)*255;return i.putImageData(n,0,0),e}else if(t.data){let e=t.data.slice(0);for(let i=0;i<e.length;i++)e instanceof Uint8Array||e instanceof Uint8ClampedArray?e[i]=Math.floor(vn(e[i]/255)*255):e[i]=vn(e[i]);return{data:e,width:t.width,height:t.height}}else return Ht("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),t}},dp=0,Ys=class{constructor(t=null){this.isTextureSource=!0,Object.defineProperty(this,"id",{value:dp++}),this.uuid=kn(),this.data=t,this.dataReady=!0,this.version=0}getSize(t){let e=this.data;return typeof HTMLVideoElement<"u"&&e instanceof HTMLVideoElement?t.set(e.videoWidth,e.videoHeight,0):typeof VideoFrame<"u"&&e instanceof VideoFrame?t.set(e.displayWidth,e.displayHeight,0):e!==null?t.set(e.width,e.height,e.depth||0):t.set(0,0,0),t}set needsUpdate(t){t===!0&&this.version++}toJSON(t){let e=t===void 0||typeof t=="string";if(!e&&t.images[this.uuid]!==void 0)return t.images[this.uuid];let i={uuid:this.uuid,url:""},n=this.data;if(n!==null){let s;if(Array.isArray(n)){s=[];for(let o=0,a=n.length;o<a;o++)n[o].isDataTexture?s.push(pc(n[o].image)):s.push(pc(n[o]))}else s=pc(n);i.url=s}return e||(t.images[this.uuid]=i),i}};function pc(r){return typeof HTMLImageElement<"u"&&r instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&r instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&r instanceof ImageBitmap?la.getDataURL(r):r.data?{data:Array.from(r.data),width:r.width,height:r.height,type:r.data.constructor.name}:(Ht("Texture: Unable to serialize Texture."),{})}var fp=0,mc=new L,ui=class r extends tn{constructor(t=r.DEFAULT_IMAGE,e=r.DEFAULT_MAPPING,i=Mi,n=Mi,s=ke,o=ln,a=xi,l=gi,c=r.DEFAULT_ANISOTROPY,h=Wi){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:fp++}),this.uuid=kn(),this.name="",this.source=new Ys(t),this.mipmaps=[],this.mapping=e,this.channel=0,this.wrapS=i,this.wrapT=n,this.magFilter=s,this.minFilter=o,this.anisotropy=c,this.format=a,this.internalFormat=null,this.type=l,this.offset=new Vt(0,0),this.repeat=new Vt(1,1),this.center=new Vt(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Gt,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=h,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(t&&t.depth&&t.depth>1),this.pmremVersion=0,this.normalized=!1}get width(){return this.source.getSize(mc).x}get height(){return this.source.getSize(mc).y}get depth(){return this.source.getSize(mc).z}get image(){return this.source.data}set image(t){this.source.data=t}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(t){return this.name=t.name,this.source=t.source,this.mipmaps=t.mipmaps.slice(0),this.mapping=t.mapping,this.channel=t.channel,this.wrapS=t.wrapS,this.wrapT=t.wrapT,this.magFilter=t.magFilter,this.minFilter=t.minFilter,this.anisotropy=t.anisotropy,this.format=t.format,this.internalFormat=t.internalFormat,this.type=t.type,this.normalized=t.normalized,this.offset.copy(t.offset),this.repeat.copy(t.repeat),this.center.copy(t.center),this.rotation=t.rotation,this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrix.copy(t.matrix),this.generateMipmaps=t.generateMipmaps,this.premultiplyAlpha=t.premultiplyAlpha,this.flipY=t.flipY,this.unpackAlignment=t.unpackAlignment,this.colorSpace=t.colorSpace,this.renderTarget=t.renderTarget,this.isRenderTargetTexture=t.isRenderTargetTexture,this.isArrayTexture=t.isArrayTexture,this.userData=JSON.parse(JSON.stringify(t.userData)),this.needsUpdate=!0,this}setValues(t){for(let e in t){let i=t[e];if(i===void 0){Ht(`Texture.setValues(): parameter '${e}' has value of undefined.`);continue}let n=this[e];if(n===void 0){Ht(`Texture.setValues(): property '${e}' does not exist.`);continue}n&&i&&n.isVector2&&i.isVector2||n&&i&&n.isVector3&&i.isVector3||n&&i&&n.isMatrix3&&i.isMatrix3?n.copy(i):this[e]=i}}toJSON(t){let e=t===void 0||typeof t=="string";if(!e&&t.textures[this.uuid]!==void 0)return t.textures[this.uuid];let i={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(t).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,normalized:this.normalized,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(i.userData=this.userData),e||(t.textures[this.uuid]=i),i}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(t){if(this.mapping!==th)return t;if(t.applyMatrix3(this.matrix),t.x<0||t.x>1)switch(this.wrapS){case Mn:t.x=t.x-Math.floor(t.x);break;case Mi:t.x=t.x<0?0:1;break;case ra:Math.abs(Math.floor(t.x)%2)===1?t.x=Math.ceil(t.x)-t.x:t.x=t.x-Math.floor(t.x);break}if(t.y<0||t.y>1)switch(this.wrapT){case Mn:t.y=t.y-Math.floor(t.y);break;case Mi:t.y=t.y<0?0:1;break;case ra:Math.abs(Math.floor(t.y)%2)===1?t.y=Math.ceil(t.y)-t.y:t.y=t.y-Math.floor(t.y);break}return this.flipY&&(t.y=1-t.y),t}set needsUpdate(t){t===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(t){t===!0&&this.pmremVersion++}};ui.DEFAULT_IMAGE=null;ui.DEFAULT_MAPPING=th;ui.DEFAULT_ANISOTROPY=1;var gh=class gh{constructor(t=0,e=0,i=0,n=1){this.x=t,this.y=e,this.z=i,this.w=n}get width(){return this.z}set width(t){this.z=t}get height(){return this.w}set height(t){this.w=t}set(t,e,i,n){return this.x=t,this.y=e,this.z=i,this.w=n,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this.w=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setW(t){return this.w=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;case 3:this.w=e;break;default:throw new Error("THREE.Vector4: index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("THREE.Vector4: index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=t.w!==void 0?t.w:1,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this.w+=t.w,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this.w+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this.w=t.w+e.w,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this.w+=t.w*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this.w-=t.w,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this.w-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this.w=t.w-e.w,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this.w*=t.w,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this.w*=t,this}applyMatrix4(t){let e=this.x,i=this.y,n=this.z,s=this.w,o=t.elements;return this.x=o[0]*e+o[4]*i+o[8]*n+o[12]*s,this.y=o[1]*e+o[5]*i+o[9]*n+o[13]*s,this.z=o[2]*e+o[6]*i+o[10]*n+o[14]*s,this.w=o[3]*e+o[7]*i+o[11]*n+o[15]*s,this}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this.w/=t.w,this}divideScalar(t){return this.multiplyScalar(1/t)}setAxisAngleFromQuaternion(t){this.w=2*Math.acos(t.w);let e=Math.sqrt(1-t.w*t.w);return e<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=t.x/e,this.y=t.y/e,this.z=t.z/e),this}setAxisAngleFromRotationMatrix(t){let e,i,n,s,l=t.elements,c=l[0],h=l[4],u=l[8],d=l[1],f=l[5],g=l[9],x=l[2],m=l[6],p=l[10];if(Math.abs(h-d)<.01&&Math.abs(u-x)<.01&&Math.abs(g-m)<.01){if(Math.abs(h+d)<.1&&Math.abs(u+x)<.1&&Math.abs(g+m)<.1&&Math.abs(c+f+p-3)<.1)return this.set(1,0,0,0),this;e=Math.PI;let M=(c+1)/2,_=(f+1)/2,v=(p+1)/2,S=(h+d)/4,T=(u+x)/4,b=(g+m)/4;return M>_&&M>v?M<.01?(i=0,n=.707106781,s=.707106781):(i=Math.sqrt(M),n=S/i,s=T/i):_>v?_<.01?(i=.707106781,n=0,s=.707106781):(n=Math.sqrt(_),i=S/n,s=b/n):v<.01?(i=.707106781,n=.707106781,s=0):(s=Math.sqrt(v),i=T/s,n=b/s),this.set(i,n,s,e),this}let y=Math.sqrt((m-g)*(m-g)+(u-x)*(u-x)+(d-h)*(d-h));return Math.abs(y)<.001&&(y=1),this.x=(m-g)/y,this.y=(u-x)/y,this.z=(d-h)/y,this.w=Math.acos((c+f+p-1)/2),this}setFromMatrixPosition(t){let e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this.w=e[15],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this.w=Math.min(this.w,t.w),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this.w=Math.max(this.w,t.w),this}clamp(t,e){return this.x=ee(this.x,t.x,e.x),this.y=ee(this.y,t.y,e.y),this.z=ee(this.z,t.z,e.z),this.w=ee(this.w,t.w,e.w),this}clampScalar(t,e){return this.x=ee(this.x,t,e),this.y=ee(this.y,t,e),this.z=ee(this.z,t,e),this.w=ee(this.w,t,e),this}clampLength(t,e){let i=this.length();return this.divideScalar(i||1).multiplyScalar(ee(i,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z+this.w*t.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this.w+=(t.w-this.w)*e,this}lerpVectors(t,e,i){return this.x=t.x+(e.x-t.x)*i,this.y=t.y+(e.y-t.y)*i,this.z=t.z+(e.z-t.z)*i,this.w=t.w+(e.w-t.w)*i,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z&&t.w===this.w}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this.w=t[e+3],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t[e+3]=this.w,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this.w=t.getW(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}};gh.prototype.isVector4=!0;var Ee=gh,ca=class extends tn{constructor(t=1,e=1,i={}){super(),i=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:ke,depthBuffer:!0,stencilBuffer:!1,resolveColorBuffer:!0,resolveDepthBuffer:!0,resolveStencilBuffer:!0,storeMultisampledColorBuffer:!0,storeMultisampledDepthBuffer:!0,storeMultisampledStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1,useArrayDepthTexture:!1},i),this.isRenderTarget=!0,this.width=t,this.height=e,this.depth=i.depth,this.scissor=new Ee(0,0,t,e),this.scissorTest=!1,this.viewport=new Ee(0,0,t,e),this.textures=[];let n={width:t,height:e,depth:i.depth},s=new ui(n),o=i.count;for(let a=0;a<o;a++)this.textures[a]=s.clone(),this.textures[a].isRenderTargetTexture=!0,this.textures[a].renderTarget=this;this._setTextureOptions(i),this.depthBuffer=i.depthBuffer,this.stencilBuffer=i.stencilBuffer,this.resolveColorBuffer=i.resolveColorBuffer,this.resolveDepthBuffer=i.resolveDepthBuffer,this.resolveStencilBuffer=i.resolveStencilBuffer,this.storeMultisampledColorBuffer=i.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=i.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=i.storeMultisampledStencilBuffer,this._depthTexture=null,this.depthTexture=i.depthTexture,this.samples=i.samples,this.multiview=i.multiview,this.useArrayDepthTexture=i.useArrayDepthTexture}_setTextureOptions(t={}){let e={minFilter:ke,generateMipmaps:!1,flipY:!1,internalFormat:null};t.mapping!==void 0&&(e.mapping=t.mapping),t.wrapS!==void 0&&(e.wrapS=t.wrapS),t.wrapT!==void 0&&(e.wrapT=t.wrapT),t.wrapR!==void 0&&(e.wrapR=t.wrapR),t.magFilter!==void 0&&(e.magFilter=t.magFilter),t.minFilter!==void 0&&(e.minFilter=t.minFilter),t.format!==void 0&&(e.format=t.format),t.type!==void 0&&(e.type=t.type),t.anisotropy!==void 0&&(e.anisotropy=t.anisotropy),t.colorSpace!==void 0&&(e.colorSpace=t.colorSpace),t.flipY!==void 0&&(e.flipY=t.flipY),t.generateMipmaps!==void 0&&(e.generateMipmaps=t.generateMipmaps),t.internalFormat!==void 0&&(e.internalFormat=t.internalFormat);for(let i=0;i<this.textures.length;i++)this.textures[i].setValues(e)}get texture(){return this.textures[0]}set texture(t){this.textures[0]=t}set depthTexture(t){this._depthTexture!==null&&this._depthTexture.renderTarget===this&&(this._depthTexture.renderTarget=null),t!==null&&t.renderTarget===null&&(t.renderTarget=this),this._depthTexture=t}get depthTexture(){return this._depthTexture}setSize(t,e,i=1){if(this.width!==t||this.height!==e||this.depth!==i){this.width=t,this.height=e,this.depth=i;for(let n=0,s=this.textures.length;n<s;n++)this.textures[n].image.width=t,this.textures[n].image.height=e,this.textures[n].image.depth=i,this.textures[n].isData3DTexture!==!0&&(this.textures[n].isArrayTexture=this.textures[n].image.depth>1);this.dispose()}this.viewport.set(0,0,t,e),this.scissor.set(0,0,t,e)}clone(){return new this.constructor().copy(this)}copy(t){this.width=t.width,this.height=t.height,this.depth=t.depth,this.scissor.copy(t.scissor),this.scissorTest=t.scissorTest,this.viewport.copy(t.viewport),this.textures.length=0;for(let e=0,i=t.textures.length;e<i;e++){this.textures[e]=t.textures[e].clone(),this.textures[e].isRenderTargetTexture=!0,this.textures[e].renderTarget=this;let n=Object.assign({},t.textures[e].image);this.textures[e].source=new Ys(n)}if(this.depthBuffer=t.depthBuffer,this.stencilBuffer=t.stencilBuffer,this.resolveColorBuffer=t.resolveColorBuffer,this.resolveDepthBuffer=t.resolveDepthBuffer,this.resolveStencilBuffer=t.resolveStencilBuffer,this.storeMultisampledColorBuffer=t.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=t.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=t.storeMultisampledStencilBuffer,t.depthTexture!==null)if(t.depthTexture.renderTarget===t){let e=t.depthTexture.clone();e.renderTarget=null,this.depthTexture=e}else this.depthTexture=t.depthTexture;return this.samples=t.samples,this.multiview=t.multiview,this.useArrayDepthTexture=t.useArrayDepthTexture,this}dispose(){this.dispatchEvent({type:"dispose"})}},mi=class extends ca{constructor(t=1,e=1,i={}){super(t,e,i),this.isWebGLRenderTarget=!0}},Lr=class extends ui{constructor(t=null,e=1,i=1,n=1){super(null),this.isDataArrayTexture=!0,this.image={data:t,width:e,height:i,depth:n},this.magFilter=qe,this.minFilter=qe,this.wrapR=Mi,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}copy(t){return super.copy(t),this.wrapR=t.wrapR,this}addLayerUpdate(t){this.layerUpdates.add(t)}clearLayerUpdates(){this.layerUpdates.clear()}};var ha=class extends ui{constructor(t=null,e=1,i=1,n=1){super(null),this.isData3DTexture=!0,this.image={data:t,width:e,height:i,depth:n},this.magFilter=qe,this.minFilter=qe,this.wrapR=Mi,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}copy(t){return super.copy(t),this.wrapR=t.wrapR,this}};var Pa=class Pa{constructor(t,e,i,n,s,o,a,l,c,h,u,d,f,g,x,m){this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],t!==void 0&&this.set(t,e,i,n,s,o,a,l,c,h,u,d,f,g,x,m)}set(t,e,i,n,s,o,a,l,c,h,u,d,f,g,x,m){let p=this.elements;return p[0]=t,p[4]=e,p[8]=i,p[12]=n,p[1]=s,p[5]=o,p[9]=a,p[13]=l,p[2]=c,p[6]=h,p[10]=u,p[14]=d,p[3]=f,p[7]=g,p[11]=x,p[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new Pa().fromArray(this.elements)}copy(t){let e=this.elements,i=t.elements;return e[0]=i[0],e[1]=i[1],e[2]=i[2],e[3]=i[3],e[4]=i[4],e[5]=i[5],e[6]=i[6],e[7]=i[7],e[8]=i[8],e[9]=i[9],e[10]=i[10],e[11]=i[11],e[12]=i[12],e[13]=i[13],e[14]=i[14],e[15]=i[15],this}copyPosition(t){let e=this.elements,i=t.elements;return e[12]=i[12],e[13]=i[13],e[14]=i[14],this}setFromMatrix3(t){let e=t.elements;return this.set(e[0],e[3],e[6],0,e[1],e[4],e[7],0,e[2],e[5],e[8],0,0,0,0,1),this}extractBasis(t,e,i){return this.determinantAffine()===0?(t.set(1,0,0),e.set(0,1,0),i.set(0,0,1),this):(t.setFromMatrixColumn(this,0),e.setFromMatrixColumn(this,1),i.setFromMatrixColumn(this,2),this)}makeBasis(t,e,i){return this.set(t.x,e.x,i.x,0,t.y,e.y,i.y,0,t.z,e.z,i.z,0,0,0,0,1),this}extractRotation(t){if(t.determinantAffine()===0)return this.identity();let e=this.elements,i=t.elements,n=1/Ts.setFromMatrixColumn(t,0).length(),s=1/Ts.setFromMatrixColumn(t,1).length(),o=1/Ts.setFromMatrixColumn(t,2).length();return e[0]=i[0]*n,e[1]=i[1]*n,e[2]=i[2]*n,e[3]=0,e[4]=i[4]*s,e[5]=i[5]*s,e[6]=i[6]*s,e[7]=0,e[8]=i[8]*o,e[9]=i[9]*o,e[10]=i[10]*o,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromEuler(t){let e=this.elements,i=t.x,n=t.y,s=t.z,o=Math.cos(i),a=Math.sin(i),l=Math.cos(n),c=Math.sin(n),h=Math.cos(s),u=Math.sin(s);if(t.order==="XYZ"){let d=o*h,f=o*u,g=a*h,x=a*u;e[0]=l*h,e[4]=-l*u,e[8]=c,e[1]=f+g*c,e[5]=d-x*c,e[9]=-a*l,e[2]=x-d*c,e[6]=g+f*c,e[10]=o*l}else if(t.order==="YXZ"){let d=l*h,f=l*u,g=c*h,x=c*u;e[0]=d+x*a,e[4]=g*a-f,e[8]=o*c,e[1]=o*u,e[5]=o*h,e[9]=-a,e[2]=f*a-g,e[6]=x+d*a,e[10]=o*l}else if(t.order==="ZXY"){let d=l*h,f=l*u,g=c*h,x=c*u;e[0]=d-x*a,e[4]=-o*u,e[8]=g+f*a,e[1]=f+g*a,e[5]=o*h,e[9]=x-d*a,e[2]=-o*c,e[6]=a,e[10]=o*l}else if(t.order==="ZYX"){let d=o*h,f=o*u,g=a*h,x=a*u;e[0]=l*h,e[4]=g*c-f,e[8]=d*c+x,e[1]=l*u,e[5]=x*c+d,e[9]=f*c-g,e[2]=-c,e[6]=a*l,e[10]=o*l}else if(t.order==="YZX"){let d=o*l,f=o*c,g=a*l,x=a*c;e[0]=l*h,e[4]=x-d*u,e[8]=g*u+f,e[1]=u,e[5]=o*h,e[9]=-a*h,e[2]=-c*h,e[6]=f*u+g,e[10]=d-x*u}else if(t.order==="XZY"){let d=o*l,f=o*c,g=a*l,x=a*c;e[0]=l*h,e[4]=-u,e[8]=c*h,e[1]=d*u+x,e[5]=o*h,e[9]=f*u-g,e[2]=g*u-f,e[6]=a*h,e[10]=x*u+d}return e[3]=0,e[7]=0,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromQuaternion(t){return this.compose(pp,t,mp)}lookAt(t,e,i){let n=this.elements;return _i.subVectors(t,e),_i.lengthSq()===0&&(_i.z=1),_i.normalize(),Nn.crossVectors(i,_i),Nn.lengthSq()===0&&(Math.abs(i.z)===1?_i.x+=1e-4:_i.z+=1e-4,_i.normalize(),Nn.crossVectors(i,_i)),Nn.normalize(),Eo.crossVectors(_i,Nn),n[0]=Nn.x,n[4]=Eo.x,n[8]=_i.x,n[1]=Nn.y,n[5]=Eo.y,n[9]=_i.y,n[2]=Nn.z,n[6]=Eo.z,n[10]=_i.z,this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){let i=t.elements,n=e.elements,s=this.elements,o=i[0],a=i[4],l=i[8],c=i[12],h=i[1],u=i[5],d=i[9],f=i[13],g=i[2],x=i[6],m=i[10],p=i[14],y=i[3],M=i[7],_=i[11],v=i[15],S=n[0],T=n[4],b=n[8],A=n[12],R=n[1],I=n[5],U=n[9],N=n[13],C=n[2],D=n[6],k=n[10],z=n[14],et=n[3],$=n[7],Q=n[11],V=n[15];return s[0]=o*S+a*R+l*C+c*et,s[4]=o*T+a*I+l*D+c*$,s[8]=o*b+a*U+l*k+c*Q,s[12]=o*A+a*N+l*z+c*V,s[1]=h*S+u*R+d*C+f*et,s[5]=h*T+u*I+d*D+f*$,s[9]=h*b+u*U+d*k+f*Q,s[13]=h*A+u*N+d*z+f*V,s[2]=g*S+x*R+m*C+p*et,s[6]=g*T+x*I+m*D+p*$,s[10]=g*b+x*U+m*k+p*Q,s[14]=g*A+x*N+m*z+p*V,s[3]=y*S+M*R+_*C+v*et,s[7]=y*T+M*I+_*D+v*$,s[11]=y*b+M*U+_*k+v*Q,s[15]=y*A+M*N+_*z+v*V,this}multiplyScalar(t){let e=this.elements;return e[0]*=t,e[4]*=t,e[8]*=t,e[12]*=t,e[1]*=t,e[5]*=t,e[9]*=t,e[13]*=t,e[2]*=t,e[6]*=t,e[10]*=t,e[14]*=t,e[3]*=t,e[7]*=t,e[11]*=t,e[15]*=t,this}determinant(){let t=this.elements,e=t[0],i=t[4],n=t[8],s=t[12],o=t[1],a=t[5],l=t[9],c=t[13],h=t[2],u=t[6],d=t[10],f=t[14],g=t[3],x=t[7],m=t[11],p=t[15],y=l*f-c*d,M=a*f-c*u,_=a*d-l*u,v=o*f-c*h,S=o*d-l*h,T=o*u-a*h;return e*(x*y-m*M+p*_)-i*(g*y-m*v+p*S)+n*(g*M-x*v+p*T)-s*(g*_-x*S+m*T)}determinantAffine(){let t=this.elements,e=t[0],i=t[4],n=t[8],s=t[1],o=t[5],a=t[9],l=t[2],c=t[6],h=t[10];return e*(o*h-a*c)-i*(s*h-a*l)+n*(s*c-o*l)}transpose(){let t=this.elements,e;return e=t[1],t[1]=t[4],t[4]=e,e=t[2],t[2]=t[8],t[8]=e,e=t[6],t[6]=t[9],t[9]=e,e=t[3],t[3]=t[12],t[12]=e,e=t[7],t[7]=t[13],t[13]=e,e=t[11],t[11]=t[14],t[14]=e,this}setPosition(t,e,i){let n=this.elements;return t.isVector3?(n[12]=t.x,n[13]=t.y,n[14]=t.z):(n[12]=t,n[13]=e,n[14]=i),this}invert(){let t=this.elements,e=t[0],i=t[1],n=t[2],s=t[3],o=t[4],a=t[5],l=t[6],c=t[7],h=t[8],u=t[9],d=t[10],f=t[11],g=t[12],x=t[13],m=t[14],p=t[15],y=e*a-i*o,M=e*l-n*o,_=e*c-s*o,v=i*l-n*a,S=i*c-s*a,T=n*c-s*l,b=h*x-u*g,A=h*m-d*g,R=h*p-f*g,I=u*m-d*x,U=u*p-f*x,N=d*p-f*m,C=y*N-M*U+_*I+v*R-S*A+T*b;if(C===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);let D=1/C;return t[0]=(a*N-l*U+c*I)*D,t[1]=(n*U-i*N-s*I)*D,t[2]=(x*T-m*S+p*v)*D,t[3]=(d*S-u*T-f*v)*D,t[4]=(l*R-o*N-c*A)*D,t[5]=(e*N-n*R+s*A)*D,t[6]=(m*_-g*T-p*M)*D,t[7]=(h*T-d*_+f*M)*D,t[8]=(o*U-a*R+c*b)*D,t[9]=(i*R-e*U-s*b)*D,t[10]=(g*S-x*_+p*y)*D,t[11]=(u*_-h*S-f*y)*D,t[12]=(a*A-o*I-l*b)*D,t[13]=(e*I-i*A+n*b)*D,t[14]=(x*M-g*v-m*y)*D,t[15]=(h*v-u*M+d*y)*D,this}scale(t){let e=this.elements,i=t.x,n=t.y,s=t.z;return e[0]*=i,e[4]*=n,e[8]*=s,e[1]*=i,e[5]*=n,e[9]*=s,e[2]*=i,e[6]*=n,e[10]*=s,e[3]*=i,e[7]*=n,e[11]*=s,this}getMaxScaleOnAxis(){let t=this.elements,e=t[0]*t[0]+t[1]*t[1]+t[2]*t[2],i=t[4]*t[4]+t[5]*t[5]+t[6]*t[6],n=t[8]*t[8]+t[9]*t[9]+t[10]*t[10];return Math.sqrt(Math.max(e,i,n))}makeTranslation(t,e,i){return t.isVector3?this.set(1,0,0,t.x,0,1,0,t.y,0,0,1,t.z,0,0,0,1):this.set(1,0,0,t,0,1,0,e,0,0,1,i,0,0,0,1),this}makeRotationX(t){let e=Math.cos(t),i=Math.sin(t);return this.set(1,0,0,0,0,e,-i,0,0,i,e,0,0,0,0,1),this}makeRotationY(t){let e=Math.cos(t),i=Math.sin(t);return this.set(e,0,i,0,0,1,0,0,-i,0,e,0,0,0,0,1),this}makeRotationZ(t){let e=Math.cos(t),i=Math.sin(t);return this.set(e,-i,0,0,i,e,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(t,e){let i=Math.cos(e),n=Math.sin(e),s=1-i,o=t.x,a=t.y,l=t.z,c=s*o,h=s*a;return this.set(c*o+i,c*a-n*l,c*l+n*a,0,c*a+n*l,h*a+i,h*l-n*o,0,c*l-n*a,h*l+n*o,s*l*l+i,0,0,0,0,1),this}makeScale(t,e,i){return this.set(t,0,0,0,0,e,0,0,0,0,i,0,0,0,0,1),this}makeShear(t,e,i,n,s,o){return this.set(1,i,s,0,t,1,o,0,e,n,1,0,0,0,0,1),this}compose(t,e,i){let n=this.elements,s=e._x,o=e._y,a=e._z,l=e._w,c=s+s,h=o+o,u=a+a,d=s*c,f=s*h,g=s*u,x=o*h,m=o*u,p=a*u,y=l*c,M=l*h,_=l*u,v=i.x,S=i.y,T=i.z;return n[0]=(1-(x+p))*v,n[1]=(f+_)*v,n[2]=(g-M)*v,n[3]=0,n[4]=(f-_)*S,n[5]=(1-(d+p))*S,n[6]=(m+y)*S,n[7]=0,n[8]=(g+M)*T,n[9]=(m-y)*T,n[10]=(1-(d+x))*T,n[11]=0,n[12]=t.x,n[13]=t.y,n[14]=t.z,n[15]=1,this}decompose(t,e,i){let n=this.elements;t.x=n[12],t.y=n[13],t.z=n[14];let s=this.determinantAffine();if(s===0)return i.set(1,1,1),e.identity(),this;let o=Ts.set(n[0],n[1],n[2]).length(),a=Ts.set(n[4],n[5],n[6]).length(),l=Ts.set(n[8],n[9],n[10]).length();s<0&&(o=-o),Fi.copy(this);let c=1/o,h=1/a,u=1/l;return Fi.elements[0]*=c,Fi.elements[1]*=c,Fi.elements[2]*=c,Fi.elements[4]*=h,Fi.elements[5]*=h,Fi.elements[6]*=h,Fi.elements[8]*=u,Fi.elements[9]*=u,Fi.elements[10]*=u,e.setFromRotationMatrix(Fi),i.x=o,i.y=a,i.z=l,this}makePerspective(t,e,i,n,s,o,a=zi,l=!1){let c=this.elements,h=2*s/(e-t),u=2*s/(i-n),d=(e+t)/(e-t),f=(i+n)/(i-n),g,x;if(l)g=s/(o-s),x=o*s/(o-s);else if(a===zi)g=-(o+s)/(o-s),x=-2*o*s/(o-s);else if(a===Xs)g=-o/(o-s),x=-o*s/(o-s);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+a);return c[0]=h,c[4]=0,c[8]=d,c[12]=0,c[1]=0,c[5]=u,c[9]=f,c[13]=0,c[2]=0,c[6]=0,c[10]=g,c[14]=x,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(t,e,i,n,s,o,a=zi,l=!1){let c=this.elements,h=2/(e-t),u=2/(i-n),d=-(e+t)/(e-t),f=-(i+n)/(i-n),g,x;if(l)g=1/(o-s),x=o/(o-s);else if(a===zi)g=-2/(o-s),x=-(o+s)/(o-s);else if(a===Xs)g=-1/(o-s),x=-s/(o-s);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+a);return c[0]=h,c[4]=0,c[8]=0,c[12]=d,c[1]=0,c[5]=u,c[9]=0,c[13]=f,c[2]=0,c[6]=0,c[10]=g,c[14]=x,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(t){let e=this.elements,i=t.elements;for(let n=0;n<16;n++)if(e[n]!==i[n])return!1;return!0}fromArray(t,e=0){for(let i=0;i<16;i++)this.elements[i]=t[i+e];return this}toArray(t=[],e=0){let i=this.elements;return t[e]=i[0],t[e+1]=i[1],t[e+2]=i[2],t[e+3]=i[3],t[e+4]=i[4],t[e+5]=i[5],t[e+6]=i[6],t[e+7]=i[7],t[e+8]=i[8],t[e+9]=i[9],t[e+10]=i[10],t[e+11]=i[11],t[e+12]=i[12],t[e+13]=i[13],t[e+14]=i[14],t[e+15]=i[15],t}};Pa.prototype.isMatrix4=!0;var fe=Pa,Ts=new L,Fi=new fe,pp=new L(0,0,0),mp=new L(1,1,1),Nn=new L,Eo=new L,_i=new L,lu=new fe,cu=new en,bn=class r{constructor(t=0,e=0,i=0,n=r.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=e,this._z=i,this._order=n}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get order(){return this._order}set order(t){this._order=t,this._onChangeCallback()}set(t,e,i,n=this._order){return this._x=t,this._y=e,this._z=i,this._order=n,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(t){return this._x=t._x,this._y=t._y,this._z=t._z,this._order=t._order,this._onChangeCallback(),this}setFromRotationMatrix(t,e=this._order,i=!0){let n=t.elements,s=n[0],o=n[4],a=n[8],l=n[1],c=n[5],h=n[9],u=n[2],d=n[6],f=n[10];switch(e){case"XYZ":this._y=Math.asin(ee(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(-h,f),this._z=Math.atan2(-o,s)):(this._x=Math.atan2(d,c),this._z=0);break;case"YXZ":this._x=Math.asin(-ee(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(a,f),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-u,s),this._z=0);break;case"ZXY":this._x=Math.asin(ee(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(-u,f),this._z=Math.atan2(-o,c)):(this._y=0,this._z=Math.atan2(l,s));break;case"ZYX":this._y=Math.asin(-ee(u,-1,1)),Math.abs(u)<.9999999?(this._x=Math.atan2(d,f),this._z=Math.atan2(l,s)):(this._x=0,this._z=Math.atan2(-o,c));break;case"YZX":this._z=Math.asin(ee(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-h,c),this._y=Math.atan2(-u,s)):(this._x=0,this._y=Math.atan2(a,f));break;case"XZY":this._z=Math.asin(-ee(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(d,c),this._y=Math.atan2(a,s)):(this._x=Math.atan2(-h,f),this._y=0);break;default:Ht("Euler: .setFromRotationMatrix() encountered an unknown order: "+e)}return this._order=e,i===!0&&this._onChangeCallback(),this}setFromQuaternion(t,e,i){return lu.makeRotationFromQuaternion(t),this.setFromRotationMatrix(lu,e,i)}setFromVector3(t,e=this._order){return this.set(t.x,t.y,t.z,e)}reorder(t){return cu.setFromEuler(this),this.setFromQuaternion(cu,t)}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._order===this._order}fromArray(t){return this._x=t[0],this._y=t[1],this._z=t[2],t[3]!==void 0&&(this._order=t[3]),this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._order,t}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}};bn.DEFAULT_ORDER="XYZ";var Dr=class{constructor(){this.mask=1}set(t){this.mask=(1<<t|0)>>>0}enable(t){this.mask|=1<<t|0}enableAll(){this.mask=-1}toggle(t){this.mask^=1<<t|0}disable(t){this.mask&=~(1<<t|0)}disableAll(){this.mask=0}test(t){return(this.mask&t.mask)!==0}isEnabled(t){return(this.mask&(1<<t|0))!==0}},gp=0,hu=new L,As=new en,pn=new fe,To=new L,yr=new L,xp=new L,yp=new en,uu=new L(1,0,0),du=new L(0,1,0),fu=new L(0,0,1),pu={type:"added"},_p={type:"removed"},Rs={type:"childadded",child:null},gc={type:"childremoved",child:null},Le=class r extends tn{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:gp++}),this.uuid=kn(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=r.DEFAULT_UP.clone();let t=new L,e=new bn,i=new en,n=new L(1,1,1);function s(){i.setFromEuler(e,!1)}function o(){e.setFromQuaternion(i,void 0,!1)}e._onChange(s),i._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:e},quaternion:{configurable:!0,enumerable:!0,value:i},scale:{configurable:!0,enumerable:!0,value:n},modelViewMatrix:{value:new fe},normalMatrix:{value:new Gt}}),this.matrix=new fe,this.matrixWorld=new fe,this.matrixAutoUpdate=r.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=r.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Dr,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(t){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(t),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(t){return this.quaternion.premultiply(t),this}setRotationFromAxisAngle(t,e){this.quaternion.setFromAxisAngle(t,e)}setRotationFromEuler(t){this.quaternion.setFromEuler(t,!0)}setRotationFromMatrix(t){this.quaternion.setFromRotationMatrix(t)}setRotationFromQuaternion(t){this.quaternion.copy(t)}rotateOnAxis(t,e){return As.setFromAxisAngle(t,e),this.quaternion.multiply(As),this}rotateOnWorldAxis(t,e){return As.setFromAxisAngle(t,e),this.quaternion.premultiply(As),this}rotateX(t){return this.rotateOnAxis(uu,t)}rotateY(t){return this.rotateOnAxis(du,t)}rotateZ(t){return this.rotateOnAxis(fu,t)}translateOnAxis(t,e){return hu.copy(t).applyQuaternion(this.quaternion),this.position.add(hu.multiplyScalar(e)),this}translateX(t){return this.translateOnAxis(uu,t)}translateY(t){return this.translateOnAxis(du,t)}translateZ(t){return this.translateOnAxis(fu,t)}localToWorld(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(this.matrixWorld)}worldToLocal(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(pn.copy(this.matrixWorld).invert())}lookAt(t,e,i){t.isVector3?To.copy(t):To.set(t,e,i);let n=this.parent;this.updateWorldMatrix(!0,!1),yr.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?pn.lookAt(yr,To,this.up):pn.lookAt(To,yr,this.up),this.quaternion.setFromRotationMatrix(pn),n&&(pn.extractRotation(n.matrixWorld),As.setFromRotationMatrix(pn),this.quaternion.premultiply(As.invert()))}add(t){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.add(arguments[e]);return this}return t===this?(zt("Object3D.add: object can't be added as a child of itself.",t),this):(t&&t.isObject3D?(t.removeFromParent(),t.parent=this,this.children.push(t),t.dispatchEvent(pu),Rs.child=t,this.dispatchEvent(Rs),Rs.child=null):zt("Object3D.add: object not an instance of THREE.Object3D.",t),this)}remove(t){if(arguments.length>1){for(let i=0;i<arguments.length;i++)this.remove(arguments[i]);return this}let e=this.children.indexOf(t);return e!==-1&&(t.parent=null,this.children.splice(e,1),t.dispatchEvent(_p),gc.child=t,this.dispatchEvent(gc),gc.child=null),this}removeFromParent(){let t=this.parent;return t!==null&&t.remove(this),this}clear(){return this.remove(...this.children)}attach(t){return this.updateWorldMatrix(!0,!1),pn.copy(this.matrixWorld).invert(),t.parent!==null&&(t.parent.updateWorldMatrix(!0,!1),pn.multiply(t.parent.matrixWorld)),t.applyMatrix4(pn),t.removeFromParent(),t.parent=this,this.children.push(t),t.updateWorldMatrix(!1,!0),t.dispatchEvent(pu),Rs.child=t,this.dispatchEvent(Rs),Rs.child=null,this}getObjectById(t){return this.getObjectByProperty("id",t)}getObjectByName(t){return this.getObjectByProperty("name",t)}getObjectByProperty(t,e){if(this[t]===e)return this;for(let i=0,n=this.children.length;i<n;i++){let o=this.children[i].getObjectByProperty(t,e);if(o!==void 0)return o}}getObjectsByProperty(t,e,i=[]){this[t]===e&&i.push(this);let n=this.children;for(let s=0,o=n.length;s<o;s++)n[s].getObjectsByProperty(t,e,i);return i}getWorldPosition(t){return this.updateWorldMatrix(!0,!1),t.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(yr,t,xp),t}getWorldScale(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(yr,yp,t),t}getWorldDirection(t){this.updateWorldMatrix(!0,!1);let e=this.matrixWorld.elements;return t.set(e[8],e[9],e[10]).normalize()}raycast(){}intersectsFrustum(){}traverse(t){t(this);let e=this.children;for(let i=0,n=e.length;i<n;i++)e[i].traverse(t)}traverseVisible(t){if(this.visible===!1)return;t(this);let e=this.children;for(let i=0,n=e.length;i<n;i++)e[i].traverseVisible(t)}traverseAncestors(t){let e=this.parent;e!==null&&(t(e),e.traverseAncestors(t))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);let t=this.pivot;if(t!==null){let e=t.x,i=t.y,n=t.z,s=this.matrix.elements;s[12]+=e-s[0]*e-s[4]*i-s[8]*n,s[13]+=i-s[1]*e-s[5]*i-s[9]*n,s[14]+=n-s[2]*e-s[6]*i-s[10]*n}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(t){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||t)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,t=!0);let e=this.children;for(let i=0,n=e.length;i<n;i++)e[i].updateMatrixWorld(t)}updateWorldMatrix(t,e,i=!1){let n=this.parent;if(t===!0&&n!==null&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||i)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,i=!0),e===!0){let s=this.children;for(let o=0,a=s.length;o<a;o++)s[o].updateWorldMatrix(!1,!0,i)}}toJSON(t){let e=t===void 0||typeof t=="string",i={};e&&(t={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},i.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});let n={};n.uuid=this.uuid,n.type=this.type,n.name=this.name,n.castShadow=this.castShadow,n.receiveShadow=this.receiveShadow,n.visible=this.visible,n.frustumCulled=this.frustumCulled,n.renderOrder=this.renderOrder,n.static=this.static,n.matrixAutoUpdate=this.matrixAutoUpdate,Object.keys(this.userData).length>0&&(n.userData=this.userData),n.layers=this.layers.mask,n.matrix=this.matrix.toArray(),n.up=this.up.toArray(),this.pivot!==null&&(n.pivot=this.pivot.toArray()),this.morphTargetDictionary!==void 0&&(n.morphTargetDictionary=Object.assign({},this.morphTargetDictionary)),this.morphTargetInfluences!==void 0&&(n.morphTargetInfluences=this.morphTargetInfluences.slice()),this.isInstancedMesh&&(n.type="InstancedMesh",n.count=this.count,n.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(n.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(n.type="BatchedMesh",n.perObjectFrustumCulled=this.perObjectFrustumCulled,n.sortObjects=this.sortObjects,n.drawRanges=this._drawRanges,n.reservedRanges=this._reservedRanges,n.geometryInfo=this._geometryInfo.map(a=>({...a,boundingBox:a.boundingBox?a.boundingBox.toJSON():void 0,boundingSphere:a.boundingSphere?a.boundingSphere.toJSON():void 0})),n.instanceInfo=this._instanceInfo.map(a=>({...a})),n.availableInstanceIds=this._availableInstanceIds.slice(),n.availableGeometryIds=this._availableGeometryIds.slice(),n.nextIndexStart=this._nextIndexStart,n.nextVertexStart=this._nextVertexStart,n.geometryCount=this._geometryCount,n.maxInstanceCount=this._maxInstanceCount,n.maxVertexCount=this._maxVertexCount,n.maxIndexCount=this._maxIndexCount,n.geometryInitialized=this._geometryInitialized,n.matricesTexture=this._matricesTexture.toJSON(t),n.indirectTexture=this._indirectTexture.toJSON(t),this._colorsTexture!==null&&(n.colorsTexture=this._colorsTexture.toJSON(t)),this.boundingSphere!==null&&(n.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(n.boundingBox=this.boundingBox.toJSON()));function s(a,l){return a[l.uuid]===void 0&&(a[l.uuid]=l.toJSON(t)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?n.background=this.background.toJSON():this.background.isTexture&&(n.background=this.background.toJSON(t).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(n.environment=this.environment.toJSON(t).uuid);else if(this.isMesh||this.isLine||this.isPoints){n.geometry=s(t.geometries,this.geometry);let a=this.geometry.parameters;if(a!==void 0&&a.shapes!==void 0){let l=a.shapes;if(Array.isArray(l))for(let c=0,h=l.length;c<h;c++){let u=l[c];s(t.shapes,u)}else s(t.shapes,l)}}if(this.isSkinnedMesh&&(n.bindMode=this.bindMode,n.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(s(t.skeletons,this.skeleton),n.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){let a=[];for(let l=0,c=this.material.length;l<c;l++)a.push(s(t.materials,this.material[l]));n.material=a}else n.material=s(t.materials,this.material);if(this.children.length>0){n.children=[];for(let a=0;a<this.children.length;a++)n.children.push(this.children[a].toJSON(t).object)}if(this.animations.length>0){n.animations=[];for(let a=0;a<this.animations.length;a++){let l=this.animations[a];n.animations.push(s(t.animations,l))}}if(e){let a=o(t.geometries),l=o(t.materials),c=o(t.textures),h=o(t.images),u=o(t.shapes),d=o(t.skeletons),f=o(t.animations),g=o(t.nodes);a.length>0&&(i.geometries=a),l.length>0&&(i.materials=l),c.length>0&&(i.textures=c),h.length>0&&(i.images=h),u.length>0&&(i.shapes=u),d.length>0&&(i.skeletons=d),f.length>0&&(i.animations=f),g.length>0&&(i.nodes=g)}return i.object=n,i;function o(a){let l=[];for(let c in a){let h=a[c];delete h.metadata,l.push(h)}return l}}clone(t){return new this.constructor().copy(this,t)}copy(t,e=!0){if(this.name=t.name,this.up.copy(t.up),this.position.copy(t.position),this.rotation.order=t.rotation.order,this.quaternion.copy(t.quaternion),this.scale.copy(t.scale),this.pivot=t.pivot!==null?t.pivot.clone():null,this.matrix.copy(t.matrix),this.matrixWorld.copy(t.matrixWorld),this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrixWorldAutoUpdate=t.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=t.matrixWorldNeedsUpdate,this.layers.mask=t.layers.mask,this.visible=t.visible,this.castShadow=t.castShadow,this.receiveShadow=t.receiveShadow,this.frustumCulled=t.frustumCulled,this.renderOrder=t.renderOrder,this.static=t.static,this.animations=t.animations.slice(),this.userData=JSON.parse(JSON.stringify(t.userData)),e===!0)for(let i=0;i<t.children.length;i++){let n=t.children[i];this.add(n.clone())}return this}dispose(){this.dispatchEvent({type:"dispose"})}};Le.DEFAULT_UP=new L(0,1,0);Le.DEFAULT_MATRIX_AUTO_UPDATE=!0;Le.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;var kt=class extends Le{constructor(){super(),this.isGroup=!0,this.type="Group"}},vp={type:"move"},$s=class{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new kt,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new kt,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new L,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new L),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new kt,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new L,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new L,this._grip.eventsEnabled=!1),this._grip}dispatchEvent(t){return this._targetRay!==null&&this._targetRay.dispatchEvent(t),this._grip!==null&&this._grip.dispatchEvent(t),this._hand!==null&&this._hand.dispatchEvent(t),this}connect(t){if(t&&t.hand){let e=this._hand;if(e)for(let i of t.hand.values())this._getHandJoint(e,i)}return this.dispatchEvent({type:"connected",data:t}),this}disconnect(t){return this.dispatchEvent({type:"disconnected",data:t}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(t,e,i){let n=null,s=null,o=null,a=this._targetRay,l=this._grip,c=this._hand;if(t&&e.session.visibilityState!=="visible-blurred"){if(c&&t.hand){o=!0;for(let x of t.hand.values()){let m=e.getJointPose(x,i),p=this._getHandJoint(c,x);m!==null&&(p.matrix.fromArray(m.transform.matrix),p.matrix.decompose(p.position,p.rotation,p.scale),p.matrixWorldNeedsUpdate=!0,p.jointRadius=m.radius),p.visible=m!==null}let h=c.joints["index-finger-tip"],u=c.joints["thumb-tip"],d=h.position.distanceTo(u.position),f=.02,g=.005;c.inputState.pinching&&d>f+g?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:t.handedness,target:this})):!c.inputState.pinching&&d<=f-g&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:t.handedness,target:this}))}else l!==null&&t.gripSpace&&(s=e.getPose(t.gripSpace,i),s!==null&&(l.matrix.fromArray(s.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,s.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(s.linearVelocity)):l.hasLinearVelocity=!1,s.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(s.angularVelocity)):l.hasAngularVelocity=!1,l.eventsEnabled&&l.dispatchEvent({type:"gripUpdated",data:t,target:this})));a!==null&&(n=e.getPose(t.targetRaySpace,i),n===null&&s!==null&&(n=s),n!==null&&(a.matrix.fromArray(n.transform.matrix),a.matrix.decompose(a.position,a.rotation,a.scale),a.matrixWorldNeedsUpdate=!0,n.linearVelocity?(a.hasLinearVelocity=!0,a.linearVelocity.copy(n.linearVelocity)):a.hasLinearVelocity=!1,n.angularVelocity?(a.hasAngularVelocity=!0,a.angularVelocity.copy(n.angularVelocity)):a.hasAngularVelocity=!1,this.dispatchEvent(vp)))}return a!==null&&(a.visible=n!==null),l!==null&&(l.visible=s!==null),c!==null&&(c.visible=o!==null),this}_getHandJoint(t,e){if(t.joints[e.jointName]===void 0){let i=new kt;i.matrixAutoUpdate=!1,i.visible=!1,t.joints[e.jointName]=i,t.add(i)}return t.joints[e.jointName]}},pd={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Un={h:0,s:0,l:0},Ao={h:0,s:0,l:0};function xc(r,t,e){return e<0&&(e+=1),e>1&&(e-=1),e<1/6?r+(t-r)*6*e:e<1/2?t:e<2/3?r+(t-r)*6*(2/3-e):r}var It=class{constructor(t,e,i){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(t,e,i)}set(t,e,i){if(e===void 0&&i===void 0){let n=t;n&&n.isColor?this.copy(n):typeof n=="number"?this.setHex(n):typeof n=="string"&&this.setStyle(n)}else this.setRGB(t,e,i);return this}setScalar(t){return this.r=t,this.g=t,this.b=t,this}setHex(t,e=Ie){return t=Math.floor(t),this.r=(t>>16&255)/255,this.g=(t>>8&255)/255,this.b=(t&255)/255,Kt.colorSpaceToWorking(this,e),this}setRGB(t,e,i,n=Kt.workingColorSpace){return this.r=t,this.g=e,this.b=i,Kt.colorSpaceToWorking(this,n),this}setHSL(t,e,i,n=Kt.workingColorSpace){if(t=hp(t,1),e=ee(e,0,1),i=ee(i,0,1),e===0)this.r=this.g=this.b=i;else{let s=i<=.5?i*(1+e):i+e-i*e,o=2*i-s;this.r=xc(o,s,t+1/3),this.g=xc(o,s,t),this.b=xc(o,s,t-1/3)}return Kt.colorSpaceToWorking(this,n),this}setStyle(t,e=Ie){function i(s){s!==void 0&&parseFloat(s)<1&&Ht("Color: Alpha component of "+t+" will be ignored.")}let n;if(n=/^(\w+)\(([^\)]*)\)/.exec(t)){let s,o=n[1],a=n[2];switch(o){case"rgb":case"rgba":if(s=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return i(s[4]),this.setRGB(Math.min(255,parseInt(s[1],10))/255,Math.min(255,parseInt(s[2],10))/255,Math.min(255,parseInt(s[3],10))/255,e);if(s=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return i(s[4]),this.setRGB(Math.min(100,parseInt(s[1],10))/100,Math.min(100,parseInt(s[2],10))/100,Math.min(100,parseInt(s[3],10))/100,e);break;case"hsl":case"hsla":if(s=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return i(s[4]),this.setHSL(parseFloat(s[1])/360,parseFloat(s[2])/100,parseFloat(s[3])/100,e);break;default:Ht("Color: Unknown color model "+t)}}else if(n=/^\#([A-Fa-f\d]+)$/.exec(t)){let s=n[1],o=s.length;if(o===3)return this.setRGB(parseInt(s.charAt(0),16)/15,parseInt(s.charAt(1),16)/15,parseInt(s.charAt(2),16)/15,e);if(o===6)return this.setHex(parseInt(s,16),e);Ht("Color: Invalid hex color "+t)}else if(t&&t.length>0)return this.setColorName(t,e);return this}setColorName(t,e=Ie){let i=pd[t.toLowerCase()];return i!==void 0?this.setHex(i,e):Ht("Color: Unknown color "+t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(t){return this.r=t.r,this.g=t.g,this.b=t.b,this}copySRGBToLinear(t){return this.r=vn(t.r),this.g=vn(t.g),this.b=vn(t.b),this}copyLinearToSRGB(t){return this.r=Gs(t.r),this.g=Gs(t.g),this.b=Gs(t.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(t=Ie){return Kt.workingToColorSpace(ni.copy(this),t),Math.round(ee(ni.r*255,0,255))*65536+Math.round(ee(ni.g*255,0,255))*256+Math.round(ee(ni.b*255,0,255))}getHexString(t=Ie){return("000000"+this.getHex(t).toString(16)).slice(-6)}getHSL(t,e=Kt.workingColorSpace){Kt.workingToColorSpace(ni.copy(this),e);let i=ni.r,n=ni.g,s=ni.b,o=Math.max(i,n,s),a=Math.min(i,n,s),l,c,h=(a+o)/2;if(a===o)l=0,c=0;else{let u=o-a;switch(c=h<=.5?u/(o+a):u/(2-o-a),o){case i:l=(n-s)/u+(n<s?6:0);break;case n:l=(s-i)/u+2;break;case s:l=(i-n)/u+4;break}l/=6}return t.h=l,t.s=c,t.l=h,t}getRGB(t,e=Kt.workingColorSpace){return Kt.workingToColorSpace(ni.copy(this),e),t.r=ni.r,t.g=ni.g,t.b=ni.b,t}getStyle(t=Ie){Kt.workingToColorSpace(ni.copy(this),t);let e=ni.r,i=ni.g,n=ni.b;return t!==Ie?`color(${t} ${e.toFixed(3)} ${i.toFixed(3)} ${n.toFixed(3)})`:`rgb(${Math.round(e*255)},${Math.round(i*255)},${Math.round(n*255)})`}offsetHSL(t,e,i){return this.getHSL(Un),this.setHSL(Un.h+t,Un.s+e,Un.l+i)}add(t){return this.r+=t.r,this.g+=t.g,this.b+=t.b,this}addColors(t,e){return this.r=t.r+e.r,this.g=t.g+e.g,this.b=t.b+e.b,this}addScalar(t){return this.r+=t,this.g+=t,this.b+=t,this}sub(t){return this.r=Math.max(0,this.r-t.r),this.g=Math.max(0,this.g-t.g),this.b=Math.max(0,this.b-t.b),this}multiply(t){return this.r*=t.r,this.g*=t.g,this.b*=t.b,this}multiplyScalar(t){return this.r*=t,this.g*=t,this.b*=t,this}lerp(t,e){return this.r+=(t.r-this.r)*e,this.g+=(t.g-this.g)*e,this.b+=(t.b-this.b)*e,this}lerpColors(t,e,i){return this.r=t.r+(e.r-t.r)*i,this.g=t.g+(e.g-t.g)*i,this.b=t.b+(e.b-t.b)*i,this}lerpHSL(t,e){this.getHSL(Un),t.getHSL(Ao);let i=uc(Un.h,Ao.h,e),n=uc(Un.s,Ao.s,e),s=uc(Un.l,Ao.l,e);return this.setHSL(i,n,s),this}setFromVector3(t){return this.r=t.x,this.g=t.y,this.b=t.z,this}applyMatrix3(t){let e=this.r,i=this.g,n=this.b,s=t.elements;return this.r=s[0]*e+s[3]*i+s[6]*n,this.g=s[1]*e+s[4]*i+s[7]*n,this.b=s[2]*e+s[5]*i+s[8]*n,this}equals(t){return t.r===this.r&&t.g===this.g&&t.b===this.b}fromArray(t,e=0){return this.r=t[e],this.g=t[e+1],this.b=t[e+2],this}toArray(t=[],e=0){return t[e]=this.r,t[e+1]=this.g,t[e+2]=this.b,t}fromBufferAttribute(t,e){return this.r=t.getX(e),this.g=t.getY(e),this.b=t.getZ(e),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}},ni=new It;It.NAMES=pd;var Nr=class r{constructor(t,e=1,i=1e3){this.isFog=!0,this.name="",this.color=new It(t),this.near=e,this.far=i}clone(){return new r(this.color,this.near,this.far)}toJSON(){return{type:"Fog",name:this.name,color:this.color.getHex(),near:this.near,far:this.far}}},os=class extends Le{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new bn,this.environmentIntensity=1,this.environmentRotation=new bn,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(t,e){return super.copy(t,e),t.background!==null&&(this.background=t.background.clone()),t.environment!==null&&(this.environment=t.environment.clone()),t.fog!==null&&(this.fog=t.fog.clone()),this.backgroundBlurriness=t.backgroundBlurriness,this.backgroundIntensity=t.backgroundIntensity,this.backgroundRotation.copy(t.backgroundRotation),this.environmentIntensity=t.environmentIntensity,this.environmentRotation.copy(t.environmentRotation),t.overrideMaterial!==null&&(this.overrideMaterial=t.overrideMaterial.clone()),this.matrixAutoUpdate=t.matrixAutoUpdate,this}toJSON(t){let e=super.toJSON(t);return this.fog!==null&&(e.object.fog=this.fog.toJSON()),e.object.backgroundBlurriness=this.backgroundBlurriness,e.object.backgroundIntensity=this.backgroundIntensity,e.object.backgroundRotation=this.backgroundRotation.toArray(),e.object.environmentIntensity=this.environmentIntensity,e.object.environmentRotation=this.environmentRotation.toArray(),e}},Oi=new L,mn=new L,yc=new L,gn=new L,Cs=new L,Ps=new L,mu=new L,_c=new L,vc=new L,Mc=new L,bc=new Ee,Sc=new Ee,wc=new Ee,_n=class r{constructor(t=new L,e=new L,i=new L){this.a=t,this.b=e,this.c=i}static getNormal(t,e,i,n){n.subVectors(i,e),Oi.subVectors(t,e),n.cross(Oi);let s=n.lengthSq();return s>0?n.multiplyScalar(1/Math.sqrt(s)):n.set(0,0,0)}static getBarycoord(t,e,i,n,s){Oi.subVectors(n,e),mn.subVectors(i,e),yc.subVectors(t,e);let o=Oi.dot(Oi),a=Oi.dot(mn),l=Oi.dot(yc),c=mn.dot(mn),h=mn.dot(yc),u=o*c-a*a;if(u===0)return s.set(0,0,0),null;let d=1/u,f=(c*l-a*h)*d,g=(o*h-a*l)*d;return s.set(1-f-g,g,f)}static containsPoint(t,e,i,n){return this.getBarycoord(t,e,i,n,gn)===null?!1:gn.x>=0&&gn.y>=0&&gn.x+gn.y<=1}static getInterpolation(t,e,i,n,s,o,a,l){return this.getBarycoord(t,e,i,n,gn)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(s,gn.x),l.addScaledVector(o,gn.y),l.addScaledVector(a,gn.z),l)}static getInterpolatedAttribute(t,e,i,n,s,o){return bc.setScalar(0),Sc.setScalar(0),wc.setScalar(0),bc.fromBufferAttribute(t,e),Sc.fromBufferAttribute(t,i),wc.fromBufferAttribute(t,n),o.setScalar(0),o.addScaledVector(bc,s.x),o.addScaledVector(Sc,s.y),o.addScaledVector(wc,s.z),o}static isFrontFacing(t,e,i,n){return Oi.subVectors(i,e),mn.subVectors(t,e),Oi.cross(mn).dot(n)<0}set(t,e,i){return this.a.copy(t),this.b.copy(e),this.c.copy(i),this}setFromPointsAndIndices(t,e,i,n){return this.a.copy(t[e]),this.b.copy(t[i]),this.c.copy(t[n]),this}setFromAttributeAndIndices(t,e,i,n){return this.a.fromBufferAttribute(t,e),this.b.fromBufferAttribute(t,i),this.c.fromBufferAttribute(t,n),this}clone(){return new this.constructor().copy(this)}copy(t){return this.a.copy(t.a),this.b.copy(t.b),this.c.copy(t.c),this}getArea(){return Oi.subVectors(this.c,this.b),mn.subVectors(this.a,this.b),Oi.cross(mn).length()*.5}getMidpoint(t){return t.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return r.getNormal(this.a,this.b,this.c,t)}getPlane(t){return t.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,e){return r.getBarycoord(t,this.a,this.b,this.c,e)}getInterpolation(t,e,i,n,s){return r.getInterpolation(t,this.a,this.b,this.c,e,i,n,s)}containsPoint(t){return r.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return r.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(t){return t.intersectsTriangle(this)}closestPointToPoint(t,e){let i=this.a,n=this.b,s=this.c,o,a;Cs.subVectors(n,i),Ps.subVectors(s,i),_c.subVectors(t,i);let l=Cs.dot(_c),c=Ps.dot(_c);if(l<=0&&c<=0)return e.copy(i);vc.subVectors(t,n);let h=Cs.dot(vc),u=Ps.dot(vc);if(h>=0&&u<=h)return e.copy(n);let d=l*u-h*c;if(d<=0&&l>=0&&h<=0)return o=l/(l-h),e.copy(i).addScaledVector(Cs,o);Mc.subVectors(t,s);let f=Cs.dot(Mc),g=Ps.dot(Mc);if(g>=0&&f<=g)return e.copy(s);let x=f*c-l*g;if(x<=0&&c>=0&&g<=0)return a=c/(c-g),e.copy(i).addScaledVector(Ps,a);let m=h*g-f*u;if(m<=0&&u-h>=0&&f-g>=0)return mu.subVectors(s,n),a=(u-h)/(u-h+(f-g)),e.copy(n).addScaledVector(mu,a);let p=1/(m+x+d);return o=x*p,a=d*p,e.copy(i).addScaledVector(Cs,o).addScaledVector(Ps,a)}equals(t){return t.a.equals(this.a)&&t.b.equals(this.b)&&t.c.equals(this.c)}},nn=class{constructor(t=new L(1/0,1/0,1/0),e=new L(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=t,this.max=e}set(t,e){return this.min.copy(t),this.max.copy(e),this}setFromArray(t){this.makeEmpty();for(let e=0,i=t.length;e<i;e+=3)this.expandByPoint(Bi.fromArray(t,e));return this}setFromBufferAttribute(t){this.makeEmpty();for(let e=0,i=t.count;e<i;e++)this.expandByPoint(Bi.fromBufferAttribute(t,e));return this}setFromPoints(t){this.makeEmpty();for(let e=0,i=t.length;e<i;e++)this.expandByPoint(t[e]);return this}setFromCenterAndSize(t,e){let i=Bi.copy(e).multiplyScalar(.5);return this.min.copy(t).sub(i),this.max.copy(t).add(i),this}setFromObject(t,e=!1){return this.makeEmpty(),this.expandByObject(t,e)}clone(){return new this.constructor().copy(this)}copy(t){return this.min.copy(t.min),this.max.copy(t.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(t){return this.isEmpty()?t.set(0,0,0):t.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(t){return this.isEmpty()?t.set(0,0,0):t.subVectors(this.max,this.min)}expandByPoint(t){return this.min.min(t),this.max.max(t),this}expandByVector(t){return this.min.sub(t),this.max.add(t),this}expandByScalar(t){return this.min.addScalar(-t),this.max.addScalar(t),this}expandByObject(t,e=!1){t.updateWorldMatrix(!1,!1);let i=t.geometry;if(i!==void 0){let s=i.getAttribute("position");if(e===!0&&s!==void 0&&t.isInstancedMesh!==!0)for(let o=0,a=s.count;o<a;o++)t.isMesh===!0?t.getVertexPosition(o,Bi):Bi.fromBufferAttribute(s,o),Bi.applyMatrix4(t.matrixWorld),this.expandByPoint(Bi);else t.boundingBox!==void 0?(t.boundingBox===null&&t.computeBoundingBox(),Ro.copy(t.boundingBox)):(i.boundingBox===null&&i.computeBoundingBox(),Ro.copy(i.boundingBox)),Ro.applyMatrix4(t.matrixWorld),this.union(Ro)}let n=t.children;for(let s=0,o=n.length;s<o;s++)this.expandByObject(n[s],e);return this}containsPoint(t){return t.x>=this.min.x&&t.x<=this.max.x&&t.y>=this.min.y&&t.y<=this.max.y&&t.z>=this.min.z&&t.z<=this.max.z}containsBox(t){return this.min.x<=t.min.x&&t.max.x<=this.max.x&&this.min.y<=t.min.y&&t.max.y<=this.max.y&&this.min.z<=t.min.z&&t.max.z<=this.max.z}getParameter(t,e){return e.set((t.x-this.min.x)/(this.max.x-this.min.x),(t.y-this.min.y)/(this.max.y-this.min.y),(t.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(t){return t.max.x>=this.min.x&&t.min.x<=this.max.x&&t.max.y>=this.min.y&&t.min.y<=this.max.y&&t.max.z>=this.min.z&&t.min.z<=this.max.z}intersectsSphere(t){return this.clampPoint(t.center,Bi),Bi.distanceToSquared(t.center)<=t.radius*t.radius}intersectsPlane(t){let e,i;return t.normal.x>0?(e=t.normal.x*this.min.x,i=t.normal.x*this.max.x):(e=t.normal.x*this.max.x,i=t.normal.x*this.min.x),t.normal.y>0?(e+=t.normal.y*this.min.y,i+=t.normal.y*this.max.y):(e+=t.normal.y*this.max.y,i+=t.normal.y*this.min.y),t.normal.z>0?(e+=t.normal.z*this.min.z,i+=t.normal.z*this.max.z):(e+=t.normal.z*this.max.z,i+=t.normal.z*this.min.z),e<=-t.constant&&i>=-t.constant}intersectsTriangle(t){if(this.isEmpty())return!1;this.getCenter(_r),Co.subVectors(this.max,_r),Is.subVectors(t.a,_r),Ls.subVectors(t.b,_r),Ds.subVectors(t.c,_r),Fn.subVectors(Ls,Is),On.subVectors(Ds,Ls),es.subVectors(Is,Ds);let e=[0,-Fn.z,Fn.y,0,-On.z,On.y,0,-es.z,es.y,Fn.z,0,-Fn.x,On.z,0,-On.x,es.z,0,-es.x,-Fn.y,Fn.x,0,-On.y,On.x,0,-es.y,es.x,0];return!Ec(e,Is,Ls,Ds,Co)||(e=[1,0,0,0,1,0,0,0,1],!Ec(e,Is,Ls,Ds,Co))?!1:(Po.crossVectors(Fn,On),e=[Po.x,Po.y,Po.z],Ec(e,Is,Ls,Ds,Co))}clampPoint(t,e){return e.copy(t).clamp(this.min,this.max)}distanceToPoint(t){return this.clampPoint(t,Bi).distanceTo(t)}getBoundingSphere(t){return this.isEmpty()?t.makeEmpty():(this.getCenter(t.center),t.radius=this.getSize(Bi).length()*.5),t}intersect(t){return this.min.max(t.min),this.max.min(t.max),this.isEmpty()&&this.makeEmpty(),this}union(t){return this.min.min(t.min),this.max.max(t.max),this}applyMatrix4(t){return this.isEmpty()?this:(xn[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(t),xn[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(t),xn[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(t),xn[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(t),xn[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(t),xn[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(t),xn[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(t),xn[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(t),this.setFromPoints(xn),this)}translate(t){return this.min.add(t),this.max.add(t),this}equals(t){return t.min.equals(this.min)&&t.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(t){return this.min.fromArray(t.min),this.max.fromArray(t.max),this}},xn=[new L,new L,new L,new L,new L,new L,new L,new L],Bi=new L,Ro=new nn,Is=new L,Ls=new L,Ds=new L,Fn=new L,On=new L,es=new L,_r=new L,Co=new L,Po=new L,is=new L;function Ec(r,t,e,i,n){for(let s=0,o=r.length-3;s<=o;s+=3){is.fromArray(r,s);let a=n.x*Math.abs(is.x)+n.y*Math.abs(is.y)+n.z*Math.abs(is.z),l=t.dot(is),c=e.dot(is),h=i.dot(is);if(Math.max(-Math.max(l,c,h),Math.min(l,c,h))>a)return!1}return!0}var Fe=new L,Io=new Vt,Mp=0,Se=class extends tn{constructor(t,e,i=!1){if(super(),Array.isArray(t))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:Mp++}),this.name="",this.array=t,this.itemSize=e,this.count=t!==void 0?t.length/e:0,this.normalized=i,this.usage=ah,this.updateRanges=[],this.gpuType=Pi,this.version=0}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.name=t.name,this.array=new t.array.constructor(t.array),this.itemSize=t.itemSize,this.count=t.count,this.normalized=t.normalized,this.usage=t.usage,this.gpuType=t.gpuType,this}copyAt(t,e,i){t*=this.itemSize,i*=e.itemSize;for(let n=0,s=this.itemSize;n<s;n++)this.array[t+n]=e.array[i+n];return this}copyArray(t){return this.array.set(t),this}applyMatrix3(t){if(this.itemSize===2)for(let e=0,i=this.count;e<i;e++)Io.fromBufferAttribute(this,e),Io.applyMatrix3(t),this.setXY(e,Io.x,Io.y);else if(this.itemSize===3)for(let e=0,i=this.count;e<i;e++)Fe.fromBufferAttribute(this,e),Fe.applyMatrix3(t),this.setXYZ(e,Fe.x,Fe.y,Fe.z);return this}applyMatrix4(t){for(let e=0,i=this.count;e<i;e++)Fe.fromBufferAttribute(this,e),Fe.applyMatrix4(t),this.setXYZ(e,Fe.x,Fe.y,Fe.z);return this}applyNormalMatrix(t){for(let e=0,i=this.count;e<i;e++)Fe.fromBufferAttribute(this,e),Fe.applyNormalMatrix(t),this.setXYZ(e,Fe.x,Fe.y,Fe.z);return this}transformDirection(t){for(let e=0,i=this.count;e<i;e++)Fe.fromBufferAttribute(this,e),Fe.transformDirection(t),this.setXYZ(e,Fe.x,Fe.y,Fe.z);return this}set(t,e=0){return this.array.set(t,e),this}getComponent(t,e){let i=this.array[t*this.itemSize+e];return this.normalized&&(i=Ki(i,this.array)),i}setComponent(t,e,i){return this.normalized&&(i=de(i,this.array)),this.array[t*this.itemSize+e]=i,this}getX(t){let e=this.array[t*this.itemSize];return this.normalized&&(e=Ki(e,this.array)),e}setX(t,e){return this.normalized&&(e=de(e,this.array)),this.array[t*this.itemSize]=e,this}getY(t){let e=this.array[t*this.itemSize+1];return this.normalized&&(e=Ki(e,this.array)),e}setY(t,e){return this.normalized&&(e=de(e,this.array)),this.array[t*this.itemSize+1]=e,this}getZ(t){let e=this.array[t*this.itemSize+2];return this.normalized&&(e=Ki(e,this.array)),e}setZ(t,e){return this.normalized&&(e=de(e,this.array)),this.array[t*this.itemSize+2]=e,this}getW(t){let e=this.array[t*this.itemSize+3];return this.normalized&&(e=Ki(e,this.array)),e}setW(t,e){return this.normalized&&(e=de(e,this.array)),this.array[t*this.itemSize+3]=e,this}setXY(t,e,i){return t*=this.itemSize,this.normalized&&(e=de(e,this.array),i=de(i,this.array)),this.array[t+0]=e,this.array[t+1]=i,this}setXYZ(t,e,i,n){return t*=this.itemSize,this.normalized&&(e=de(e,this.array),i=de(i,this.array),n=de(n,this.array)),this.array[t+0]=e,this.array[t+1]=i,this.array[t+2]=n,this}setXYZW(t,e,i,n,s){return t*=this.itemSize,this.normalized&&(e=de(e,this.array),i=de(i,this.array),n=de(n,this.array),s=de(s,this.array)),this.array[t+0]=e,this.array[t+1]=i,this.array[t+2]=n,this.array[t+3]=s,this}onUpload(t){return this.onUploadCallback=t,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){let t={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return t.name=this.name,t.usage=this.usage,t.gpuType=this.gpuType,t}dispose(){this.dispatchEvent({type:"dispose"})}};var as=class extends Se{constructor(t,e,i){super(new Uint16Array(t),e,i)}};var ls=class extends Se{constructor(t,e,i){super(new Uint32Array(t),e,i)}};var he=class extends Se{constructor(t,e,i){super(new Float32Array(t),e,i)}},bp=new nn,vr=new L,Tc=new L,Sn=class{constructor(t=new L,e=-1){this.isSphere=!0,this.center=t,this.radius=e}set(t,e){return this.center.copy(t),this.radius=e,this}setFromPoints(t,e){let i=this.center;e!==void 0?i.copy(e):bp.setFromPoints(t).getCenter(i);let n=0;for(let s=0,o=t.length;s<o;s++)n=Math.max(n,i.distanceToSquared(t[s]));return this.radius=Math.sqrt(n),this}copy(t){return this.center.copy(t.center),this.radius=t.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(t){return t.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(t){return t.distanceTo(this.center)-this.radius}intersectsSphere(t){let e=this.radius+t.radius;return t.center.distanceToSquared(this.center)<=e*e}intersectsBox(t){return t.intersectsSphere(this)}intersectsPlane(t){return Math.abs(t.distanceToPoint(this.center))<=this.radius}clampPoint(t,e){let i=this.center.distanceToSquared(t);return e.copy(t),i>this.radius*this.radius&&(e.sub(this.center).normalize(),e.multiplyScalar(this.radius).add(this.center)),e}getBoundingBox(t){return this.isEmpty()?(t.makeEmpty(),t):(t.set(this.center,this.center),t.expandByScalar(this.radius),t)}applyMatrix4(t){return this.center.applyMatrix4(t),this.radius=this.radius*t.getMaxScaleOnAxis(),this}translate(t){return this.center.add(t),this}expandByPoint(t){if(this.isEmpty())return this.center.copy(t),this.radius=0,this;vr.subVectors(t,this.center);let e=vr.lengthSq();if(e>this.radius*this.radius){let i=Math.sqrt(e),n=(i-this.radius)*.5;this.center.addScaledVector(vr,n/i),this.radius+=n}return this}union(t){return t.isEmpty()?this:this.isEmpty()?(this.copy(t),this):(this.center.equals(t.center)===!0?this.radius=Math.max(this.radius,t.radius):(Tc.subVectors(t.center,this.center).setLength(t.radius),this.expandByPoint(vr.copy(t.center).add(Tc)),this.expandByPoint(vr.copy(t.center).sub(Tc))),this)}equals(t){return t.center.equals(this.center)&&t.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(t){return this.radius=t.radius,this.center.fromArray(t.center),this}},Sp=0,Ai=new fe,Ac=new Le,Ns=new L,vi=new nn,Mr=new nn,Xe=new L,Ae=class r extends tn{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:Sp++}),this.uuid=kn(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={},this._transformed=!1}getIndex(){return this.index}setIndex(t){return Array.isArray(t)?this.index=new(lp(t)?ls:as)(t,1):this.index=t,this}setIndirect(t,e=0){return this.indirect=t,this.indirectOffset=e,this}getIndirect(){return this.indirect}getAttribute(t){return this.attributes[t]}setAttribute(t,e){return this.attributes[t]=e,this}deleteAttribute(t){return delete this.attributes[t],this}hasAttribute(t){return this.attributes[t]!==void 0}addGroup(t,e,i=0){this.groups.push({start:t,count:e,materialIndex:i})}clearGroups(){this.groups=[]}setDrawRange(t,e){this.drawRange.start=t,this.drawRange.count=e}applyMatrix4(t){let e=this.attributes.position;e!==void 0&&(e.applyMatrix4(t),e.needsUpdate=!0);let i=this.attributes.normal;if(i!==void 0){let s=new Gt().getNormalMatrix(t);i.applyNormalMatrix(s),i.needsUpdate=!0}let n=this.attributes.tangent;return n!==void 0&&(n.transformDirection(t),n.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this._transformed=!0,this}applyQuaternion(t){return Ai.makeRotationFromQuaternion(t),this.applyMatrix4(Ai),this}rotateX(t){return Ai.makeRotationX(t),this.applyMatrix4(Ai),this}rotateY(t){return Ai.makeRotationY(t),this.applyMatrix4(Ai),this}rotateZ(t){return Ai.makeRotationZ(t),this.applyMatrix4(Ai),this}translate(t,e,i){return Ai.makeTranslation(t,e,i),this.applyMatrix4(Ai),this}scale(t,e,i){return Ai.makeScale(t,e,i),this.applyMatrix4(Ai),this}lookAt(t){return Ac.lookAt(t),Ac.updateMatrix(),this.applyMatrix4(Ac.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Ns).negate(),this.translate(Ns.x,Ns.y,Ns.z),this}setFromPoints(t){let e=this.getAttribute("position");if(e===void 0){let i=[];for(let n=0,s=t.length;n<s;n++){let o=t[n];i.push(o.x,o.y,o.z||0)}this.setAttribute("position",new he(i,3))}else{let i=Math.min(t.length,e.count);for(let n=0;n<i;n++){let s=t[n];e.setXYZ(n,s.x,s.y,s.z||0)}t.length>e.count&&Ht("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),e.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new nn);let t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){zt("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new L(-1/0,-1/0,-1/0),new L(1/0,1/0,1/0));return}if(t!==void 0){if(this.boundingBox.setFromBufferAttribute(t),e)for(let i=0,n=e.length;i<n;i++){let s=e[i];vi.setFromBufferAttribute(s),this.morphTargetsRelative?(Xe.addVectors(this.boundingBox.min,vi.min),this.boundingBox.expandByPoint(Xe),Xe.addVectors(this.boundingBox.max,vi.max),this.boundingBox.expandByPoint(Xe)):(this.boundingBox.expandByPoint(vi.min),this.boundingBox.expandByPoint(vi.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&zt('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Sn);let t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){zt("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new L,1/0);return}if(t){let i=this.boundingSphere.center;if(vi.setFromBufferAttribute(t),e)for(let s=0,o=e.length;s<o;s++){let a=e[s];Mr.setFromBufferAttribute(a),this.morphTargetsRelative?(Xe.addVectors(vi.min,Mr.min),vi.expandByPoint(Xe),Xe.addVectors(vi.max,Mr.max),vi.expandByPoint(Xe)):(vi.expandByPoint(Mr.min),vi.expandByPoint(Mr.max))}vi.getCenter(i);let n=0;for(let s=0,o=t.count;s<o;s++)Xe.fromBufferAttribute(t,s),n=Math.max(n,i.distanceToSquared(Xe));if(e)for(let s=0,o=e.length;s<o;s++){let a=e[s],l=this.morphTargetsRelative;for(let c=0,h=a.count;c<h;c++)Xe.fromBufferAttribute(a,c),l&&(Ns.fromBufferAttribute(t,c),Xe.add(Ns)),n=Math.max(n,i.distanceToSquared(Xe))}this.boundingSphere.radius=Math.sqrt(n),isNaN(this.boundingSphere.radius)&&zt('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){let t=this.index,e=this.attributes;if(t===null||e.position===void 0||e.normal===void 0||e.uv===void 0){zt("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}let i=e.position,n=e.normal,s=e.uv,o=this.getAttribute("tangent");(o===void 0||o.count!==i.count)&&(o=new Se(new Float32Array(4*i.count),4),this.setAttribute("tangent",o));let a=[],l=[];for(let b=0;b<i.count;b++)a[b]=new L,l[b]=new L;let c=new L,h=new L,u=new L,d=new Vt,f=new Vt,g=new Vt,x=new L,m=new L;function p(b,A,R){c.fromBufferAttribute(i,b),h.fromBufferAttribute(i,A),u.fromBufferAttribute(i,R),d.fromBufferAttribute(s,b),f.fromBufferAttribute(s,A),g.fromBufferAttribute(s,R),h.sub(c),u.sub(c),f.sub(d),g.sub(d);let I=1/(f.x*g.y-g.x*f.y);isFinite(I)&&(x.copy(h).multiplyScalar(g.y).addScaledVector(u,-f.y).multiplyScalar(I),m.copy(u).multiplyScalar(f.x).addScaledVector(h,-g.x).multiplyScalar(I),a[b].add(x),a[A].add(x),a[R].add(x),l[b].add(m),l[A].add(m),l[R].add(m))}let y=this.groups;y.length===0&&(y=[{start:0,count:t.count}]);for(let b=0,A=y.length;b<A;++b){let R=y[b],I=R.start,U=R.count;for(let N=I,C=I+U;N<C;N+=3)p(t.getX(N+0),t.getX(N+1),t.getX(N+2))}let M=new L,_=new L,v=new L,S=new L;function T(b){v.fromBufferAttribute(n,b),S.copy(v);let A=a[b];M.copy(A),M.sub(v.multiplyScalar(v.dot(A))).normalize(),_.crossVectors(S,A);let I=_.dot(l[b])<0?-1:1;o.setXYZW(b,M.x,M.y,M.z,I)}for(let b=0,A=y.length;b<A;++b){let R=y[b],I=R.start,U=R.count;for(let N=I,C=I+U;N<C;N+=3)T(t.getX(N+0)),T(t.getX(N+1)),T(t.getX(N+2))}this._transformed=!0}computeVertexNormals(){let t=this.index,e=this.getAttribute("position");if(e!==void 0){let i=this.getAttribute("normal");if(i===void 0||i.count!==e.count)i=new Se(new Float32Array(e.count*3),3),this.setAttribute("normal",i);else for(let d=0,f=i.count;d<f;d++)i.setXYZ(d,0,0,0);let n=new L,s=new L,o=new L,a=new L,l=new L,c=new L,h=new L,u=new L;if(t)for(let d=0,f=t.count;d<f;d+=3){let g=t.getX(d+0),x=t.getX(d+1),m=t.getX(d+2);n.fromBufferAttribute(e,g),s.fromBufferAttribute(e,x),o.fromBufferAttribute(e,m),h.subVectors(o,s),u.subVectors(n,s),h.cross(u),a.fromBufferAttribute(i,g),l.fromBufferAttribute(i,x),c.fromBufferAttribute(i,m),a.add(h),l.add(h),c.add(h),i.setXYZ(g,a.x,a.y,a.z),i.setXYZ(x,l.x,l.y,l.z),i.setXYZ(m,c.x,c.y,c.z)}else for(let d=0,f=e.count;d<f;d+=3)n.fromBufferAttribute(e,d+0),s.fromBufferAttribute(e,d+1),o.fromBufferAttribute(e,d+2),h.subVectors(o,s),u.subVectors(n,s),h.cross(u),i.setXYZ(d+0,h.x,h.y,h.z),i.setXYZ(d+1,h.x,h.y,h.z),i.setXYZ(d+2,h.x,h.y,h.z);this.normalizeNormals(),i.needsUpdate=!0}}normalizeNormals(){let t=this.attributes.normal;for(let e=0,i=t.count;e<i;e++)Xe.fromBufferAttribute(t,e),Xe.normalize(),t.setXYZ(e,Xe.x,Xe.y,Xe.z)}toNonIndexed(){function t(a,l){let c=a.array,h=a.itemSize,u=a.normalized,d=new c.constructor(l.length*h),f=0,g=0;for(let x=0,m=l.length;x<m;x++){a.isInterleavedBufferAttribute?f=l[x]*a.data.stride+a.offset:f=l[x]*h;for(let p=0;p<h;p++)d[g++]=c[f++]}return new Se(d,h,u)}if(this.index===null)return Ht("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;let e=new r,i=this.index.array,n=this.attributes;for(let a in n){let l=n[a],c=t(l,i);e.setAttribute(a,c)}let s=this.morphAttributes;for(let a in s){let l=[],c=s[a];for(let h=0,u=c.length;h<u;h++){let d=c[h],f=t(d,i);l.push(f)}e.morphAttributes[a]=l}e.morphTargetsRelative=this.morphTargetsRelative;let o=this.groups;for(let a=0,l=o.length;a<l;a++){let c=o[a];e.addGroup(c.start,c.count,c.materialIndex)}return e}toJSON(){let t={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(t.uuid=this.uuid,t.type=this.parameters!==void 0&&this._transformed===!0?"BufferGeometry":this.type,t.name=this.name,Object.keys(this.userData).length>0&&(t.userData=this.userData),this.parameters!==void 0&&this._transformed!==!0){let l=this.parameters;for(let c in l)l[c]!==void 0&&(t[c]=l[c]);return t}t.data={attributes:{}};let e=this.index;e!==null&&(t.data.index={type:e.array.constructor.name,array:Array.prototype.slice.call(e.array)});let i=this.attributes;for(let l in i){let c=i[l];t.data.attributes[l]=c.toJSON(t.data)}let n={},s=!1;for(let l in this.morphAttributes){let c=this.morphAttributes[l],h=[];for(let u=0,d=c.length;u<d;u++){let f=c[u];h.push(f.toJSON(t.data))}h.length>0&&(n[l]=h,s=!0)}s&&(t.data.morphAttributes=n,t.data.morphTargetsRelative=this.morphTargetsRelative);let o=this.groups;o.length>0&&(t.data.groups=JSON.parse(JSON.stringify(o)));let a=this.boundingSphere;return a!==null&&(t.data.boundingSphere=a.toJSON()),t}clone(){return new this.constructor().copy(this)}copy(t){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;let e={};this.name=t.name;let i=t.index;i!==null&&this.setIndex(i.clone());let n=t.attributes;for(let c in n){let h=n[c];this.setAttribute(c,h.clone(e))}let s=t.morphAttributes;for(let c in s){let h=[],u=s[c];for(let d=0,f=u.length;d<f;d++)h.push(u[d].clone(e));this.morphAttributes[c]=h}this.morphTargetsRelative=t.morphTargetsRelative;let o=t.groups;for(let c=0,h=o.length;c<h;c++){let u=o[c];this.addGroup(u.start,u.count,u.materialIndex)}let a=t.boundingBox;a!==null&&(this.boundingBox=a.clone());let l=t.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=t.drawRange.start,this.drawRange.count=t.drawRange.count,this.userData=t.userData,this._transformed=t._transformed,this}dispose(){this.dispatchEvent({type:"dispose"})}},ua=class{constructor(t,e){this.isInterleavedBuffer=!0,this.array=t,this.stride=e,this.count=t!==void 0?t.length/e:0,this.usage=ah,this.updateRanges=[],this.version=0,this.uuid=kn()}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.array=new t.array.constructor(t.array),this.count=t.count,this.stride=t.stride,this.usage=t.usage,this}copyAt(t,e,i){t*=this.stride,i*=e.stride;for(let n=0,s=this.stride;n<s;n++)this.array[t+n]=e.array[i+n];return this}set(t,e=0){return this.array.set(t,e),this}clone(t){t.arrayBuffers===void 0&&(t.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=kn()),t.arrayBuffers[this.array.buffer._uuid]===void 0&&(t.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);let e=new this.array.constructor(t.arrayBuffers[this.array.buffer._uuid]),i=new this.constructor(e,this.stride);return i.setUsage(this.usage),i}onUpload(t){return this.onUploadCallback=t,this}toJSON(t){t.arrayBuffers===void 0&&(t.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=kn()),t.arrayBuffers[this.array.buffer._uuid]===void 0&&(t.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer)));let e={uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride};return e.usage=this.usage,e}},hi=new L,Ur=class r{constructor(t,e,i,n=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=t,this.itemSize=e,this.offset=i,this.normalized=n}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(t){this.data.needsUpdate=t}applyMatrix4(t){for(let e=0,i=this.data.count;e<i;e++)hi.fromBufferAttribute(this,e),hi.applyMatrix4(t),this.setXYZ(e,hi.x,hi.y,hi.z);return this}applyNormalMatrix(t){for(let e=0,i=this.count;e<i;e++)hi.fromBufferAttribute(this,e),hi.applyNormalMatrix(t),this.setXYZ(e,hi.x,hi.y,hi.z);return this}transformDirection(t){for(let e=0,i=this.count;e<i;e++)hi.fromBufferAttribute(this,e),hi.transformDirection(t),this.setXYZ(e,hi.x,hi.y,hi.z);return this}getComponent(t,e){let i=this.array[t*this.data.stride+this.offset+e];return this.normalized&&(i=Ki(i,this.array)),i}setComponent(t,e,i){return this.normalized&&(i=de(i,this.array)),this.data.array[t*this.data.stride+this.offset+e]=i,this}setX(t,e){return this.normalized&&(e=de(e,this.array)),this.data.array[t*this.data.stride+this.offset]=e,this}setY(t,e){return this.normalized&&(e=de(e,this.array)),this.data.array[t*this.data.stride+this.offset+1]=e,this}setZ(t,e){return this.normalized&&(e=de(e,this.array)),this.data.array[t*this.data.stride+this.offset+2]=e,this}setW(t,e){return this.normalized&&(e=de(e,this.array)),this.data.array[t*this.data.stride+this.offset+3]=e,this}getX(t){let e=this.data.array[t*this.data.stride+this.offset];return this.normalized&&(e=Ki(e,this.array)),e}getY(t){let e=this.data.array[t*this.data.stride+this.offset+1];return this.normalized&&(e=Ki(e,this.array)),e}getZ(t){let e=this.data.array[t*this.data.stride+this.offset+2];return this.normalized&&(e=Ki(e,this.array)),e}getW(t){let e=this.data.array[t*this.data.stride+this.offset+3];return this.normalized&&(e=Ki(e,this.array)),e}setXY(t,e,i){return t=t*this.data.stride+this.offset,this.normalized&&(e=de(e,this.array),i=de(i,this.array)),this.data.array[t+0]=e,this.data.array[t+1]=i,this}setXYZ(t,e,i,n){return t=t*this.data.stride+this.offset,this.normalized&&(e=de(e,this.array),i=de(i,this.array),n=de(n,this.array)),this.data.array[t+0]=e,this.data.array[t+1]=i,this.data.array[t+2]=n,this}setXYZW(t,e,i,n,s){return t=t*this.data.stride+this.offset,this.normalized&&(e=de(e,this.array),i=de(i,this.array),n=de(n,this.array),s=de(s,this.array)),this.data.array[t+0]=e,this.data.array[t+1]=i,this.data.array[t+2]=n,this.data.array[t+3]=s,this}clone(t){if(t===void 0){Ir("InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");let e=[];for(let i=0;i<this.count;i++){let n=i*this.data.stride+this.offset;for(let s=0;s<this.itemSize;s++)e.push(this.data.array[n+s])}return new Se(new this.array.constructor(e),this.itemSize,this.normalized)}else return t.interleavedBuffers===void 0&&(t.interleavedBuffers={}),t.interleavedBuffers[this.data.uuid]===void 0&&(t.interleavedBuffers[this.data.uuid]=this.data.clone(t)),new r(t.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(t){if(t===void 0){Ir("InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");let e=[];for(let i=0;i<this.count;i++){let n=i*this.data.stride+this.offset;for(let s=0;s<this.itemSize;s++)e.push(this.data.array[n+s])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:e,normalized:this.normalized}}else return t.interleavedBuffers===void 0&&(t.interleavedBuffers={}),t.interleavedBuffers[this.data.uuid]===void 0&&(t.interleavedBuffers[this.data.uuid]=this.data.toJSON(t)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}},Rc=new L,wp=new L,Ep=new Gt,ki=class{constructor(t=new L(1,0,0),e=0){this.isPlane=!0,this.normal=t,this.constant=e}set(t,e){return this.normal.copy(t),this.constant=e,this}setComponents(t,e,i,n){return this.normal.set(t,e,i),this.constant=n,this}setFromNormalAndCoplanarPoint(t,e){return this.normal.copy(t),this.constant=-e.dot(this.normal),this}setFromCoplanarPoints(t,e,i){let n=Rc.subVectors(i,e).cross(wp.subVectors(t,e)).normalize();return this.setFromNormalAndCoplanarPoint(n,t),this}copy(t){return this.normal.copy(t.normal),this.constant=t.constant,this}normalize(){let t=1/this.normal.length();return this.normal.multiplyScalar(t),this.constant*=t,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(t){return this.normal.dot(t)+this.constant}distanceToSphere(t){return this.distanceToPoint(t.center)-t.radius}projectPoint(t,e){return e.copy(t).addScaledVector(this.normal,-this.distanceToPoint(t))}intersectLine(t,e,i=!0){let n=t.delta(Rc),s=this.normal.dot(n);if(s===0)return this.distanceToPoint(t.start)===0?e.copy(t.start):null;let o=-(t.start.dot(this.normal)+this.constant)/s;return i===!0&&(o<0||o>1)?null:e.copy(t.start).addScaledVector(n,o)}intersectsLine(t){let e=this.distanceToPoint(t.start),i=this.distanceToPoint(t.end);return e<0&&i>0||i<0&&e>0}intersectsBox(t){return t.intersectsPlane(this)}intersectsSphere(t){return t.intersectsPlane(this)}coplanarPoint(t){return t.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(t,e){let i=e||Ep.getNormalMatrix(t),n=this.coplanarPoint(Rc).applyMatrix4(t),s=this.normal.applyMatrix3(i).normalize();return this.constant=-n.dot(s),this}translate(t){return this.constant-=t.dot(this.normal),this}equals(t){return t.normal.equals(this.normal)&&t.constant===this.constant}clone(){return new this.constructor().copy(this)}toJSON(){return{normal:this.normal.toArray(),constant:this.constant}}fromJSON(t){return this.normal.fromArray(t.normal),this.constant=t.constant,this}},Tp=0,sn=class extends tn{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Tp++}),this.uuid=kn(),this.name="",this.type="Material",this.blending=an,this.side=rn,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Xc,this.blendDst=qc,this.blendEquation=hs,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new It(0,0,0),this.blendAlpha=0,this.depthFunc=Ws,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=nd,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Jo,this.stencilZFail=Jo,this.stencilZPass=Jo,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(t){this._alphaTest>0!=t>0&&this.version++,this._alphaTest=t}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(t){if(t!==void 0)for(let e in t){let i=t[e];if(i===void 0){Ht(`Material: parameter '${e}' has value of undefined.`);continue}let n=this[e];if(n===void 0){Ht(`Material: '${e}' is not a property of THREE.${this.type}.`);continue}n&&n.isColor?n.set(i):n&&n.isVector2&&i&&i.isVector2||n&&n.isEuler&&i&&i.isEuler||n&&n.isVector3&&i&&i.isVector3?n.copy(i):this[e]=i}}toJSON(t){let e=t===void 0||typeof t=="string";e&&(t={textures:{},images:{}});let i={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};i.uuid=this.uuid,i.type=this.type,i.blending=this.blending,i.side=this.side,i.shadowSide=this.shadowSide,i.vertexColors=this.vertexColors,i.opacity=this.opacity,i.transparent=this.transparent,i.blendSrc=this.blendSrc,i.blendDst=this.blendDst,i.blendEquation=this.blendEquation,i.blendSrcAlpha=this.blendSrcAlpha,i.blendDstAlpha=this.blendDstAlpha,i.blendEquationAlpha=this.blendEquationAlpha,i.blendColor=this.blendColor.getHex(),i.blendAlpha=this.blendAlpha,i.depthFunc=this.depthFunc,i.depthTest=this.depthTest,i.depthWrite=this.depthWrite,i.colorWrite=this.colorWrite,i.clipIntersection=this.clipIntersection,i.clipShadows=this.clipShadows,i.stencilWriteMask=this.stencilWriteMask,i.stencilFunc=this.stencilFunc,i.stencilRef=this.stencilRef,i.stencilFuncMask=this.stencilFuncMask,i.stencilFail=this.stencilFail,i.stencilZFail=this.stencilZFail,i.stencilZPass=this.stencilZPass,i.stencilWrite=this.stencilWrite,i.polygonOffset=this.polygonOffset,i.polygonOffsetFactor=this.polygonOffsetFactor,i.polygonOffsetUnits=this.polygonOffsetUnits,i.dithering=this.dithering,i.alphaTest=this.alphaTest,i.alphaHash=this.alphaHash,i.alphaToCoverage=this.alphaToCoverage,i.premultipliedAlpha=this.premultipliedAlpha,i.forceSinglePass=this.forceSinglePass,i.allowOverride=this.allowOverride,i.visible=this.visible,i.toneMapped=this.toneMapped,i.name=this.name,this.color&&this.color.isColor&&(i.color=this.color.getHex()),this.roughness!==void 0&&(i.roughness=this.roughness),this.metalness!==void 0&&(i.metalness=this.metalness),this.sheen!==void 0&&(i.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(i.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(i.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(i.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&(i.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(i.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(i.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(i.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(i.shininess=this.shininess),this.clearcoat!==void 0&&(i.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(i.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(i.clearcoatMap=this.clearcoatMap.toJSON(t).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(i.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(t).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(i.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(t).uuid,i.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(i.sheenColorMap=this.sheenColorMap.toJSON(t).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(i.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(t).uuid),this.dispersion!==void 0&&(i.dispersion=this.dispersion),this.retroreflectivity!==void 0&&(i.retroreflectivity=this.retroreflectivity),this.iridescence!==void 0&&(i.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(i.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(i.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(i.iridescenceMap=this.iridescenceMap.toJSON(t).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(i.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(t).uuid),this.anisotropy!==void 0&&(i.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(i.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(i.anisotropyMap=this.anisotropyMap.toJSON(t).uuid),this.map&&this.map.isTexture&&(i.map=this.map.toJSON(t).uuid),this.matcap&&this.matcap.isTexture&&(i.matcap=this.matcap.toJSON(t).uuid),this.alphaMap&&this.alphaMap.isTexture&&(i.alphaMap=this.alphaMap.toJSON(t).uuid),this.lightMap&&this.lightMap.isTexture&&(i.lightMap=this.lightMap.toJSON(t).uuid,i.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(i.aoMap=this.aoMap.toJSON(t).uuid,i.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(i.bumpMap=this.bumpMap.toJSON(t).uuid,i.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(i.normalMap=this.normalMap.toJSON(t).uuid,i.normalMapType=this.normalMapType,i.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(i.displacementMap=this.displacementMap.toJSON(t).uuid,i.displacementScale=this.displacementScale,i.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(i.roughnessMap=this.roughnessMap.toJSON(t).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(i.metalnessMap=this.metalnessMap.toJSON(t).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(i.emissiveMap=this.emissiveMap.toJSON(t).uuid),this.specularMap&&this.specularMap.isTexture&&(i.specularMap=this.specularMap.toJSON(t).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(i.specularIntensityMap=this.specularIntensityMap.toJSON(t).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(i.specularColorMap=this.specularColorMap.toJSON(t).uuid),this.envMap&&this.envMap.isTexture&&(i.envMap=this.envMap.toJSON(t).uuid,this.combine!==void 0&&(i.combine=this.combine)),this.envMapRotation!==void 0&&(i.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(i.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(i.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(i.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(i.gradientMap=this.gradientMap.toJSON(t).uuid),this.transmission!==void 0&&(i.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(i.transmissionMap=this.transmissionMap.toJSON(t).uuid),this.thickness!==void 0&&(i.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(i.thicknessMap=this.thicknessMap.toJSON(t).uuid),this.attenuationDistance!==void 0&&(i.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(i.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(i.size=this.size),this.sizeAttenuation!==void 0&&(i.sizeAttenuation=this.sizeAttenuation),Array.isArray(this.clippingPlanes)&&this.clippingPlanes.length>0&&(i.clippingPlanes=this.clippingPlanes.map(s=>s.toJSON())),this.rotation!==void 0&&(i.rotation=this.rotation),this.depthPacking!==void 0&&(i.depthPacking=this.depthPacking),this.linewidth!==void 0&&(i.linewidth=this.linewidth),this.linecap!==void 0&&(i.linecap=this.linecap),this.linejoin!==void 0&&(i.linejoin=this.linejoin),this.dashSize!==void 0&&(i.dashSize=this.dashSize),this.gapSize!==void 0&&(i.gapSize=this.gapSize),this.scale!==void 0&&(i.scale=this.scale),this.wireframe!==void 0&&(i.wireframe=this.wireframe),this.wireframeLinewidth!==void 0&&(i.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!==void 0&&(i.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!==void 0&&(i.wireframeLinejoin=this.wireframeLinejoin),this.flatShading!==void 0&&(i.flatShading=this.flatShading),this.fog!==void 0&&(i.fog=this.fog),Object.keys(this.userData).length>0&&(i.userData=this.userData);function n(s){let o=[];for(let a in s){let l=s[a];delete l.metadata,o.push(l)}return o}if(e){let s=n(t.textures),o=n(t.images);s.length>0&&(i.textures=s),o.length>0&&(i.images=o)}return i}fromJSON(t,e){if(t.uuid!==void 0&&(this.uuid=t.uuid),t.name!==void 0&&(this.name=t.name),t.color!==void 0&&this.color!==void 0&&this.color.setHex(t.color),t.roughness!==void 0&&(this.roughness=t.roughness),t.metalness!==void 0&&(this.metalness=t.metalness),t.sheen!==void 0&&(this.sheen=t.sheen),t.sheenColor!==void 0&&(this.sheenColor=new It().setHex(t.sheenColor)),t.sheenRoughness!==void 0&&(this.sheenRoughness=t.sheenRoughness),t.emissive!==void 0&&this.emissive!==void 0&&this.emissive.setHex(t.emissive),t.specular!==void 0&&this.specular!==void 0&&this.specular.setHex(t.specular),t.specularIntensity!==void 0&&(this.specularIntensity=t.specularIntensity),t.specularColor!==void 0&&this.specularColor!==void 0&&this.specularColor.setHex(t.specularColor),t.shininess!==void 0&&(this.shininess=t.shininess),t.clearcoat!==void 0&&(this.clearcoat=t.clearcoat),t.clearcoatRoughness!==void 0&&(this.clearcoatRoughness=t.clearcoatRoughness),t.dispersion!==void 0&&(this.dispersion=t.dispersion),t.retroreflectivity!==void 0&&(this.retroreflectivity=t.retroreflectivity),t.iridescence!==void 0&&(this.iridescence=t.iridescence),t.iridescenceIOR!==void 0&&(this.iridescenceIOR=t.iridescenceIOR),t.iridescenceThicknessRange!==void 0&&(this.iridescenceThicknessRange=t.iridescenceThicknessRange),t.transmission!==void 0&&(this.transmission=t.transmission),t.thickness!==void 0&&(this.thickness=t.thickness),t.attenuationDistance!==void 0&&(this.attenuationDistance=t.attenuationDistance),t.attenuationColor!==void 0&&this.attenuationColor!==void 0&&this.attenuationColor.setHex(t.attenuationColor),t.anisotropy!==void 0&&(this.anisotropy=t.anisotropy),t.anisotropyRotation!==void 0&&(this.anisotropyRotation=t.anisotropyRotation),t.fog!==void 0&&(this.fog=t.fog),t.flatShading!==void 0&&(this.flatShading=t.flatShading),t.blending!==void 0&&(this.blending=t.blending),t.combine!==void 0&&(this.combine=t.combine),t.side!==void 0&&(this.side=t.side),t.shadowSide!==void 0&&(this.shadowSide=t.shadowSide),t.opacity!==void 0&&(this.opacity=t.opacity),t.transparent!==void 0&&(this.transparent=t.transparent),t.alphaTest!==void 0&&(this.alphaTest=t.alphaTest),t.alphaHash!==void 0&&(this.alphaHash=t.alphaHash),t.depthFunc!==void 0&&(this.depthFunc=t.depthFunc),t.depthTest!==void 0&&(this.depthTest=t.depthTest),t.depthWrite!==void 0&&(this.depthWrite=t.depthWrite),t.colorWrite!==void 0&&(this.colorWrite=t.colorWrite),t.clippingPlanes!==void 0&&(this.clippingPlanes=t.clippingPlanes.map(i=>new ki().fromJSON(i))),t.clipIntersection!==void 0&&(this.clipIntersection=t.clipIntersection),t.clipShadows!==void 0&&(this.clipShadows=t.clipShadows),t.depthPacking!==void 0&&(this.depthPacking=t.depthPacking),t.blendSrc!==void 0&&(this.blendSrc=t.blendSrc),t.blendDst!==void 0&&(this.blendDst=t.blendDst),t.blendEquation!==void 0&&(this.blendEquation=t.blendEquation),t.blendSrcAlpha!==void 0&&(this.blendSrcAlpha=t.blendSrcAlpha),t.blendDstAlpha!==void 0&&(this.blendDstAlpha=t.blendDstAlpha),t.blendEquationAlpha!==void 0&&(this.blendEquationAlpha=t.blendEquationAlpha),t.blendColor!==void 0&&this.blendColor!==void 0&&this.blendColor.setHex(t.blendColor),t.blendAlpha!==void 0&&(this.blendAlpha=t.blendAlpha),t.stencilWriteMask!==void 0&&(this.stencilWriteMask=t.stencilWriteMask),t.stencilFunc!==void 0&&(this.stencilFunc=t.stencilFunc),t.stencilRef!==void 0&&(this.stencilRef=t.stencilRef),t.stencilFuncMask!==void 0&&(this.stencilFuncMask=t.stencilFuncMask),t.stencilFail!==void 0&&(this.stencilFail=t.stencilFail),t.stencilZFail!==void 0&&(this.stencilZFail=t.stencilZFail),t.stencilZPass!==void 0&&(this.stencilZPass=t.stencilZPass),t.stencilWrite!==void 0&&(this.stencilWrite=t.stencilWrite),t.wireframe!==void 0&&(this.wireframe=t.wireframe),t.wireframeLinewidth!==void 0&&(this.wireframeLinewidth=t.wireframeLinewidth),t.wireframeLinecap!==void 0&&(this.wireframeLinecap=t.wireframeLinecap),t.wireframeLinejoin!==void 0&&(this.wireframeLinejoin=t.wireframeLinejoin),t.rotation!==void 0&&(this.rotation=t.rotation),t.linewidth!==void 0&&(this.linewidth=t.linewidth),t.linecap!==void 0&&(this.linecap=t.linecap),t.linejoin!==void 0&&(this.linejoin=t.linejoin),t.dashSize!==void 0&&(this.dashSize=t.dashSize),t.gapSize!==void 0&&(this.gapSize=t.gapSize),t.scale!==void 0&&(this.scale=t.scale),t.polygonOffset!==void 0&&(this.polygonOffset=t.polygonOffset),t.polygonOffsetFactor!==void 0&&(this.polygonOffsetFactor=t.polygonOffsetFactor),t.polygonOffsetUnits!==void 0&&(this.polygonOffsetUnits=t.polygonOffsetUnits),t.dithering!==void 0&&(this.dithering=t.dithering),t.alphaToCoverage!==void 0&&(this.alphaToCoverage=t.alphaToCoverage),t.premultipliedAlpha!==void 0&&(this.premultipliedAlpha=t.premultipliedAlpha),t.forceSinglePass!==void 0&&(this.forceSinglePass=t.forceSinglePass),t.allowOverride!==void 0&&(this.allowOverride=t.allowOverride),t.visible!==void 0&&(this.visible=t.visible),t.toneMapped!==void 0&&(this.toneMapped=t.toneMapped),t.userData!==void 0&&(this.userData=t.userData),t.vertexColors!==void 0&&(typeof t.vertexColors=="number"?this.vertexColors=t.vertexColors>0:this.vertexColors=t.vertexColors),t.size!==void 0&&(this.size=t.size),t.sizeAttenuation!==void 0&&(this.sizeAttenuation=t.sizeAttenuation),t.map!==void 0&&(this.map=e[t.map]||null),t.matcap!==void 0&&(this.matcap=e[t.matcap]||null),t.alphaMap!==void 0&&(this.alphaMap=e[t.alphaMap]||null),t.bumpMap!==void 0&&(this.bumpMap=e[t.bumpMap]||null),t.bumpScale!==void 0&&(this.bumpScale=t.bumpScale),t.normalMap!==void 0&&(this.normalMap=e[t.normalMap]||null),t.normalMapType!==void 0&&(this.normalMapType=t.normalMapType),t.normalScale!==void 0){let i=t.normalScale;Array.isArray(i)===!1&&(i=[i,i]),this.normalScale=new Vt().fromArray(i)}return t.displacementMap!==void 0&&(this.displacementMap=e[t.displacementMap]||null),t.displacementScale!==void 0&&(this.displacementScale=t.displacementScale),t.displacementBias!==void 0&&(this.displacementBias=t.displacementBias),t.roughnessMap!==void 0&&(this.roughnessMap=e[t.roughnessMap]||null),t.metalnessMap!==void 0&&(this.metalnessMap=e[t.metalnessMap]||null),t.emissiveMap!==void 0&&(this.emissiveMap=e[t.emissiveMap]||null),t.emissiveIntensity!==void 0&&(this.emissiveIntensity=t.emissiveIntensity),t.specularMap!==void 0&&(this.specularMap=e[t.specularMap]||null),t.specularIntensityMap!==void 0&&(this.specularIntensityMap=e[t.specularIntensityMap]||null),t.specularColorMap!==void 0&&(this.specularColorMap=e[t.specularColorMap]||null),t.envMap!==void 0&&(this.envMap=e[t.envMap]||null),t.envMapRotation!==void 0&&this.envMapRotation.fromArray(t.envMapRotation),t.envMapIntensity!==void 0&&(this.envMapIntensity=t.envMapIntensity),t.reflectivity!==void 0&&(this.reflectivity=t.reflectivity),t.refractionRatio!==void 0&&(this.refractionRatio=t.refractionRatio),t.lightMap!==void 0&&(this.lightMap=e[t.lightMap]||null),t.lightMapIntensity!==void 0&&(this.lightMapIntensity=t.lightMapIntensity),t.aoMap!==void 0&&(this.aoMap=e[t.aoMap]||null),t.aoMapIntensity!==void 0&&(this.aoMapIntensity=t.aoMapIntensity),t.gradientMap!==void 0&&(this.gradientMap=e[t.gradientMap]||null),t.clearcoatMap!==void 0&&(this.clearcoatMap=e[t.clearcoatMap]||null),t.clearcoatRoughnessMap!==void 0&&(this.clearcoatRoughnessMap=e[t.clearcoatRoughnessMap]||null),t.clearcoatNormalMap!==void 0&&(this.clearcoatNormalMap=e[t.clearcoatNormalMap]||null),t.clearcoatNormalScale!==void 0&&(this.clearcoatNormalScale=new Vt().fromArray(t.clearcoatNormalScale)),t.iridescenceMap!==void 0&&(this.iridescenceMap=e[t.iridescenceMap]||null),t.iridescenceThicknessMap!==void 0&&(this.iridescenceThicknessMap=e[t.iridescenceThicknessMap]||null),t.transmissionMap!==void 0&&(this.transmissionMap=e[t.transmissionMap]||null),t.thicknessMap!==void 0&&(this.thicknessMap=e[t.thicknessMap]||null),t.anisotropyMap!==void 0&&(this.anisotropyMap=e[t.anisotropyMap]||null),t.sheenColorMap!==void 0&&(this.sheenColorMap=e[t.sheenColorMap]||null),t.sheenRoughnessMap!==void 0&&(this.sheenRoughnessMap=e[t.sheenRoughnessMap]||null),this}clone(){return new this.constructor().copy(this)}copy(t){this.name=t.name,this.blending=t.blending,this.side=t.side,this.vertexColors=t.vertexColors,this.opacity=t.opacity,this.transparent=t.transparent,this.blendSrc=t.blendSrc,this.blendDst=t.blendDst,this.blendEquation=t.blendEquation,this.blendSrcAlpha=t.blendSrcAlpha,this.blendDstAlpha=t.blendDstAlpha,this.blendEquationAlpha=t.blendEquationAlpha,this.blendColor.copy(t.blendColor),this.blendAlpha=t.blendAlpha,this.depthFunc=t.depthFunc,this.depthTest=t.depthTest,this.depthWrite=t.depthWrite,this.stencilWriteMask=t.stencilWriteMask,this.stencilFunc=t.stencilFunc,this.stencilRef=t.stencilRef,this.stencilFuncMask=t.stencilFuncMask,this.stencilFail=t.stencilFail,this.stencilZFail=t.stencilZFail,this.stencilZPass=t.stencilZPass,this.stencilWrite=t.stencilWrite;let e=t.clippingPlanes,i=null;if(e!==null){let n=e.length;i=new Array(n);for(let s=0;s!==n;++s)i[s]=e[s].clone()}return this.clippingPlanes=i,this.clipIntersection=t.clipIntersection,this.clipShadows=t.clipShadows,this.shadowSide=t.shadowSide,this.colorWrite=t.colorWrite,this.precision=t.precision,this.polygonOffset=t.polygonOffset,this.polygonOffsetFactor=t.polygonOffsetFactor,this.polygonOffsetUnits=t.polygonOffsetUnits,this.dithering=t.dithering,this.alphaTest=t.alphaTest,this.alphaHash=t.alphaHash,this.alphaToCoverage=t.alphaToCoverage,this.premultipliedAlpha=t.premultipliedAlpha,this.forceSinglePass=t.forceSinglePass,this.allowOverride=t.allowOverride,this.visible=t.visible,this.toneMapped=t.toneMapped,this.userData=JSON.parse(JSON.stringify(t.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(t){t===!0&&this.version++}},Zs=class extends sn{constructor(t){super(),this.isSpriteMaterial=!0,this.type="SpriteMaterial",this.color=new It(16777215),this.map=null,this.alphaMap=null,this.rotation=0,this.sizeAttenuation=!0,this.transparent=!0,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.alphaMap=t.alphaMap,this.rotation=t.rotation,this.sizeAttenuation=t.sizeAttenuation,this.fog=t.fog,this}},Us,br=new L,Fs=new L,Os=new L,Bs=new Vt,Sr=new Vt,md=new fe,Lo=new L,wr=new L,Do=new L,gu=new Vt,Cc=new Vt,xu=new Vt,Fr=class extends Le{constructor(t=new Zs){if(super(),this.isSprite=!0,this.type="Sprite",Us===void 0){Us=new Ae;let e=new Float32Array([-.5,-.5,0,0,0,.5,-.5,0,1,0,.5,.5,0,1,1,-.5,.5,0,0,1]),i=new ua(e,5);Us.setIndex([0,1,2,0,2,3]),Us.setAttribute("position",new Ur(i,3,0,!1)),Us.setAttribute("uv",new Ur(i,2,3,!1))}this.geometry=Us,this.material=t,this.center=new Vt(.5,.5),this.count=1}intersectsFrustum(t){return t.intersectsSprite(this)}raycast(t,e){t.camera===null&&zt('Sprite: "Raycaster.camera" needs to be set in order to raycast against sprites.'),Fs.setFromMatrixScale(this.matrixWorld),md.copy(t.camera.matrixWorld),this.modelViewMatrix.multiplyMatrices(t.camera.matrixWorldInverse,this.matrixWorld),Os.setFromMatrixPosition(this.modelViewMatrix),t.camera.isPerspectiveCamera&&this.material.sizeAttenuation===!1&&Fs.multiplyScalar(-Os.z);let i=this.material.rotation,n,s;i!==0&&(s=Math.cos(i),n=Math.sin(i));let o=this.center;No(Lo.set(-.5,-.5,0),Os,o,Fs,n,s),No(wr.set(.5,-.5,0),Os,o,Fs,n,s),No(Do.set(.5,.5,0),Os,o,Fs,n,s),gu.set(0,0),Cc.set(1,0),xu.set(1,1);let a=t.ray.intersectTriangle(Lo,wr,Do,!1,br);if(a===null&&(No(wr.set(-.5,.5,0),Os,o,Fs,n,s),Cc.set(0,1),a=t.ray.intersectTriangle(Lo,Do,wr,!1,br),a===null))return;let l=t.ray.origin.distanceTo(br);l<t.near||l>t.far||e.push({distance:l,point:br.clone(),uv:_n.getInterpolation(br,Lo,wr,Do,gu,Cc,xu,new Vt),face:null,object:this})}copy(t,e){return super.copy(t,e),t.center!==void 0&&this.center.copy(t.center),this.material=t.material,this}};function No(r,t,e,i,n,s){Bs.subVectors(r,e).addScalar(.5).multiply(i),n!==void 0?(Sr.x=s*Bs.x-n*Bs.y,Sr.y=n*Bs.x+s*Bs.y):Sr.copy(Bs),r.copy(t),r.x+=Sr.x,r.y+=Sr.y,r.applyMatrix4(md)}var yn=new L,Pc=new L,Uo=new L,Fo=new L,Or=class{constructor(t=new L,e=new L(0,0,-1)){this.origin=t,this.direction=e}set(t,e){return this.origin.copy(t),this.direction.copy(e),this}copy(t){return this.origin.copy(t.origin),this.direction.copy(t.direction),this}at(t,e){return e.copy(this.origin).addScaledVector(this.direction,t)}lookAt(t){return this.direction.copy(t).sub(this.origin).normalize(),this}recast(t){return this.origin.copy(this.at(t,yn)),this}closestPointToPoint(t,e){e.subVectors(t,this.origin);let i=e.dot(this.direction);return i<0?e.copy(this.origin):e.copy(this.origin).addScaledVector(this.direction,i)}distanceToPoint(t){return Math.sqrt(this.distanceSqToPoint(t))}distanceSqToPoint(t){let e=yn.subVectors(t,this.origin).dot(this.direction);return e<0?this.origin.distanceToSquared(t):(yn.copy(this.origin).addScaledVector(this.direction,e),yn.distanceToSquared(t))}distanceSqToSegment(t,e,i,n){Pc.copy(t).add(e).multiplyScalar(.5),Uo.copy(e).sub(t).normalize(),Fo.copy(this.origin).sub(Pc);let s=t.distanceTo(e)*.5,o=-this.direction.dot(Uo),a=Fo.dot(this.direction),l=-Fo.dot(Uo),c=Fo.lengthSq(),h=Math.abs(1-o*o),u,d,f,g;if(h>0)if(u=o*l-a,d=o*a-l,g=s*h,u>=0)if(d>=-g)if(d<=g){let x=1/h;u*=x,d*=x,f=u*(u+o*d+2*a)+d*(o*u+d+2*l)+c}else d=s,u=Math.max(0,-(o*d+a)),f=-u*u+d*(d+2*l)+c;else d=-s,u=Math.max(0,-(o*d+a)),f=-u*u+d*(d+2*l)+c;else d<=-g?(u=Math.max(0,-(-o*s+a)),d=u>0?-s:Math.min(Math.max(-s,-l),s),f=-u*u+d*(d+2*l)+c):d<=g?(u=0,d=Math.min(Math.max(-s,-l),s),f=d*(d+2*l)+c):(u=Math.max(0,-(o*s+a)),d=u>0?s:Math.min(Math.max(-s,-l),s),f=-u*u+d*(d+2*l)+c);else d=o>0?-s:s,u=Math.max(0,-(o*d+a)),f=-u*u+d*(d+2*l)+c;return i&&i.copy(this.origin).addScaledVector(this.direction,u),n&&n.copy(Pc).addScaledVector(Uo,d),f}intersectSphere(t,e){if(t.radius<0)return null;yn.subVectors(t.center,this.origin);let i=yn.dot(this.direction),n=yn.dot(yn)-i*i,s=t.radius*t.radius;if(n>s)return null;let o=Math.sqrt(s-n),a=i-o,l=i+o;return l<0?null:a<0?this.at(l,e):this.at(a,e)}intersectsSphere(t){return t.radius<0?!1:this.distanceSqToPoint(t.center)<=t.radius*t.radius}distanceToPlane(t){let e=t.normal.dot(this.direction);if(e===0)return t.distanceToPoint(this.origin)===0?0:null;let i=-(this.origin.dot(t.normal)+t.constant)/e;return i>=0?i:null}intersectPlane(t,e){let i=this.distanceToPlane(t);return i===null?null:this.at(i,e)}intersectsPlane(t){let e=t.distanceToPoint(this.origin);return e===0||t.normal.dot(this.direction)*e<0}intersectBox(t,e){let i,n,s,o,a,l,c=1/this.direction.x,h=1/this.direction.y,u=1/this.direction.z,d=this.origin;return c>=0?(i=(t.min.x-d.x)*c,n=(t.max.x-d.x)*c):(i=(t.max.x-d.x)*c,n=(t.min.x-d.x)*c),h>=0?(s=(t.min.y-d.y)*h,o=(t.max.y-d.y)*h):(s=(t.max.y-d.y)*h,o=(t.min.y-d.y)*h),i>o||s>n||((s>i||isNaN(i))&&(i=s),(o<n||isNaN(n))&&(n=o),u>=0?(a=(t.min.z-d.z)*u,l=(t.max.z-d.z)*u):(a=(t.max.z-d.z)*u,l=(t.min.z-d.z)*u),i>l||a>n)||((a>i||i!==i)&&(i=a),(l<n||n!==n)&&(n=l),n<0)?null:this.at(i>=0?i:n,e)}intersectsBox(t){return this.intersectBox(t,yn)!==null}intersectTriangle(t,e,i,n,s){let o=this.origin,a=this.direction,l=a.x,c=a.y,h=a.z,u=t.x-o.x,d=t.y-o.y,f=t.z-o.z,g=e.x-o.x,x=e.y-o.y,m=e.z-o.z,p=i.x-o.x,y=i.y-o.y,M=i.z-o.z,_=Math.abs(l),v=Math.abs(c),S=Math.abs(h),T,b,A,R,I,U,N,C,D,k,z,et;if(_>=v&&_>=S?(A=l,U=u,D=g,et=p,l>=0?(T=c,b=h,R=d,I=f,N=x,C=m,k=y,z=M):(T=h,b=c,R=f,I=d,N=m,C=x,k=M,z=y)):v>=S?(A=c,U=d,D=x,et=y,c>=0?(T=h,b=l,R=f,I=u,N=m,C=g,k=M,z=p):(T=l,b=h,R=u,I=f,N=g,C=m,k=p,z=M)):(A=h,U=f,D=m,et=M,h>=0?(T=l,b=c,R=u,I=d,N=g,C=x,k=p,z=y):(T=c,b=l,R=d,I=u,N=x,C=g,k=y,z=p)),A===0)return null;let $=T/A,Q=b/A,V=1/A,nt=R-$*U,rt=I-Q*U,at=N-$*D,lt=C-Q*D,ht=k-$*et,X=z-Q*et,K=ht*lt-X*at,ot=nt*X-rt*ht,Tt=at*rt-lt*nt;if(n){if(K<0||ot<0||Tt<0)return null}else if((K<0||ot<0||Tt<0)&&(K>0||ot>0||Tt>0))return null;let vt=K+ot+Tt;if(vt===0)return null;let wt=V*(K*U+ot*D+Tt*et);return(vt>0?wt<0:wt>0)?null:this.at(wt/vt,s)}applyMatrix4(t){return this.origin.applyMatrix4(t),this.direction.transformDirection(t),this}equals(t){return t.origin.equals(this.origin)&&t.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}},se=class extends sn{constructor(t){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new It(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new bn,this.combine=Yc,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}},yu=new fe,ns=new Or,Oo=new Sn,_u=new L,Bo=new L,ko=new L,zo=new L,Ic=new L,Ho=new L,vu=new L,Vo=new L,Et=class extends Le{constructor(t=new Ae,e=new se){super(),this.isMesh=!0,this.type="Mesh",this.geometry=t,this.material=e,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),t.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=t.morphTargetInfluences.slice()),t.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary)),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}updateMorphTargets(){let e=this.geometry.morphAttributes,i=Object.keys(e);if(i.length>0){let n=e[i[0]];if(n!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,o=n.length;s<o;s++){let a=n[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=s}}}}getVertexPosition(t,e){let i=this.geometry,n=i.attributes.position,s=i.morphAttributes.position,o=i.morphTargetsRelative;e.fromBufferAttribute(n,t);let a=this.morphTargetInfluences;if(s&&a){Ho.set(0,0,0);for(let l=0,c=s.length;l<c;l++){let h=a[l],u=s[l];h!==0&&(Ic.fromBufferAttribute(u,t),o?Ho.addScaledVector(Ic,h):Ho.addScaledVector(Ic.sub(e),h))}e.add(Ho)}return e}intersectsFrustum(t){return t.intersectsObject(this)}raycast(t,e){let i=this.geometry,n=this.material,s=this.matrixWorld;n!==void 0&&(i.boundingSphere===null&&i.computeBoundingSphere(),Oo.copy(i.boundingSphere),Oo.applyMatrix4(s),ns.copy(t.ray).recast(t.near),!(Oo.containsPoint(ns.origin)===!1&&(ns.intersectSphere(Oo,_u)===null||ns.origin.distanceToSquared(_u)>(t.far-t.near)**2))&&(yu.copy(s).invert(),ns.copy(t.ray).applyMatrix4(yu),!(i.boundingBox!==null&&ns.intersectsBox(i.boundingBox)===!1)&&this._computeIntersections(t,e,ns)))}_computeIntersections(t,e,i){let n,s=this.geometry,o=this.material,a=s.index,l=s.attributes.position,c=s.attributes.uv,h=s.attributes.uv1,u=s.attributes.normal,d=s.groups,f=s.drawRange;if(a!==null)if(Array.isArray(o))for(let g=0,x=d.length;g<x;g++){let m=d[g],p=o[m.materialIndex],y=Math.max(m.start,f.start),M=Math.min(a.count,Math.min(m.start+m.count,f.start+f.count));for(let _=y,v=M;_<v;_+=3){let S=a.getX(_),T=a.getX(_+1),b=a.getX(_+2);n=Go(this,p,t,i,c,h,u,S,T,b),n&&(n.faceIndex=Math.floor(_/3),n.face.materialIndex=m.materialIndex,e.push(n))}}else{let g=Math.max(0,f.start),x=Math.min(a.count,f.start+f.count);for(let m=g,p=x;m<p;m+=3){let y=a.getX(m),M=a.getX(m+1),_=a.getX(m+2);n=Go(this,o,t,i,c,h,u,y,M,_),n&&(n.faceIndex=Math.floor(m/3),e.push(n))}}else if(l!==void 0)if(Array.isArray(o))for(let g=0,x=d.length;g<x;g++){let m=d[g],p=o[m.materialIndex],y=Math.max(m.start,f.start),M=Math.min(l.count,Math.min(m.start+m.count,f.start+f.count));for(let _=y,v=M;_<v;_+=3){let S=_,T=_+1,b=_+2;n=Go(this,p,t,i,c,h,u,S,T,b),n&&(n.faceIndex=Math.floor(_/3),n.face.materialIndex=m.materialIndex,e.push(n))}}else{let g=Math.max(0,f.start),x=Math.min(l.count,f.start+f.count);for(let m=g,p=x;m<p;m+=3){let y=m,M=m+1,_=m+2;n=Go(this,o,t,i,c,h,u,y,M,_),n&&(n.faceIndex=Math.floor(m/3),e.push(n))}}}};function Ap(r,t,e,i,n,s,o,a){let l;if(t.side===je?l=i.intersectTriangle(o,s,n,!0,a):l=i.intersectTriangle(n,s,o,t.side===rn,a),l===null)return null;Vo.copy(a),Vo.applyMatrix4(r.matrixWorld);let c=e.ray.origin.distanceTo(Vo);return c<e.near||c>e.far?null:{distance:c,point:Vo.clone(),object:r}}function Go(r,t,e,i,n,s,o,a,l,c){r.getVertexPosition(a,Bo),r.getVertexPosition(l,ko),r.getVertexPosition(c,zo);let h=Ap(r,t,e,i,Bo,ko,zo,vu);if(h){let u=new L;_n.getBarycoord(vu,Bo,ko,zo,u),n&&(h.uv=_n.getInterpolatedAttribute(n,a,l,c,u,new Vt)),s&&(h.uv1=_n.getInterpolatedAttribute(s,a,l,c,u,new Vt)),o&&(h.normal=_n.getInterpolatedAttribute(o,a,l,c,u,new L),h.normal.dot(i.direction)>0&&h.normal.multiplyScalar(-1));let d={a,b:l,c,normal:new L,materialIndex:0};_n.getNormal(Bo,ko,zo,d.normal),h.face=d,h.barycoord=u}return h}var cs=class extends ui{constructor(t=null,e=1,i=1,n,s,o,a,l,c=qe,h=qe,u,d){super(null,o,a,l,c,h,n,s,u,d),this.isDataTexture=!0,this.image={data:t,width:e,height:i},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}};var Br=class extends Se{constructor(t,e,i,n=1){super(t,e,i),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=n}copy(t){return super.copy(t),this.meshPerAttribute=t.meshPerAttribute,this}toJSON(){let t=super.toJSON();return t.meshPerAttribute=this.meshPerAttribute,t.isInstancedBufferAttribute=!0,t}},ks=new fe,Mu=new fe,Wo=[],bu=new nn,Rp=new fe,Er=new Et,Tr=new Sn,js=class extends Et{constructor(t,e,i){super(t,e),this.isInstancedMesh=!0,this.instanceMatrix=new Br(new Float32Array(i*16),16),this.instanceColor=null,this.morphTexture=null,this.count=i,this.boundingBox=null,this.boundingSphere=null;for(let n=0;n<i;n++)this.setMatrixAt(n,Rp)}computeBoundingBox(){let t=this.geometry,e=this.count;this.boundingBox===null&&(this.boundingBox=new nn),t.boundingBox===null&&t.computeBoundingBox(),this.boundingBox.makeEmpty();for(let i=0;i<e;i++)this.getMatrixAt(i,ks),bu.copy(t.boundingBox).applyMatrix4(ks),this.boundingBox.union(bu)}computeBoundingSphere(){let t=this.geometry,e=this.count;this.boundingSphere===null&&(this.boundingSphere=new Sn),t.boundingSphere===null&&t.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let i=0;i<e;i++)this.getMatrixAt(i,ks),Tr.copy(t.boundingSphere).applyMatrix4(ks),this.boundingSphere.union(Tr)}copy(t,e){return super.copy(t,e),this.instanceMatrix.copy(t.instanceMatrix),t.morphTexture!==null&&(this.morphTexture=t.morphTexture.clone()),t.instanceColor!==null&&(this.instanceColor=t.instanceColor.clone()),this.count=t.count,t.boundingBox!==null&&(this.boundingBox=t.boundingBox.clone()),t.boundingSphere!==null&&(this.boundingSphere=t.boundingSphere.clone()),this}getColorAt(t,e){return this.instanceColor===null?e.setRGB(1,1,1):e.fromArray(this.instanceColor.array,t*3)}getMatrixAt(t,e){return e.fromArray(this.instanceMatrix.array,t*16)}getMorphAt(t,e){let i=e.morphTargetInfluences,n=this.morphTexture.source.data.data,s=i.length+1,o=t*s+1;for(let a=0;a<i.length;a++)i[a]=n[o+a]}raycast(t,e){let i=this.matrixWorld,n=this.count;if(Er.geometry=this.geometry,Er.material=this.material,Er.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),Tr.copy(this.boundingSphere),Tr.applyMatrix4(i),t.ray.intersectsSphere(Tr)!==!1))for(let s=0;s<n;s++){this.getMatrixAt(s,ks),Mu.multiplyMatrices(i,ks),Er.matrixWorld=Mu,Er.raycast(t,Wo);for(let o=0,a=Wo.length;o<a;o++){let l=Wo[o];l.instanceId=s,l.object=this,e.push(l)}Wo.length=0}}setColorAt(t,e){return this.instanceColor===null&&(this.instanceColor=new Br(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),e.toArray(this.instanceColor.array,t*3),this}setMatrixAt(t,e){return e.toArray(this.instanceMatrix.array,t*16),this}setMorphAt(t,e){let i=e.morphTargetInfluences,n=i.length+1;this.morphTexture===null&&(this.morphTexture=new cs(new Float32Array(n*this.count),n,this.count,Oa,Pi));let s=this.morphTexture.source.data.data,o=0;for(let c=0;c<i.length;c++)o+=i[c];let a=this.geometry.morphTargetsRelative?1:1-o,l=n*t;return s[l]=a,s.set(i,l+1),this}updateMorphTargets(){}dispose(){super.dispose(),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null)}},ss=new Sn,Cp=new Vt(.5,.5),Xo=new L,Js=class{constructor(t=new ki,e=new ki,i=new ki,n=new ki,s=new ki,o=new ki){this.planes=[t,e,i,n,s,o]}set(t,e,i,n,s,o){let a=this.planes;return a[0].copy(t),a[1].copy(e),a[2].copy(i),a[3].copy(n),a[4].copy(s),a[5].copy(o),this}copy(t){let e=this.planes;for(let i=0;i<6;i++)e[i].copy(t.planes[i]);return this}setFromProjectionMatrix(t,e=zi,i=!1){let n=this.planes,s=t.elements,o=s[0],a=s[1],l=s[2],c=s[3],h=s[4],u=s[5],d=s[6],f=s[7],g=s[8],x=s[9],m=s[10],p=s[11],y=s[12],M=s[13],_=s[14],v=s[15];if(n[0].setComponents(c-o,f-h,p-g,v-y).normalize(),n[1].setComponents(c+o,f+h,p+g,v+y).normalize(),n[2].setComponents(c+a,f+u,p+x,v+M).normalize(),n[3].setComponents(c-a,f-u,p-x,v-M).normalize(),i)n[4].setComponents(l,d,m,_).normalize(),n[5].setComponents(c-l,f-d,p-m,v-_).normalize();else if(n[4].setComponents(c-l,f-d,p-m,v-_).normalize(),e===zi)n[5].setComponents(c+l,f+d,p+m,v+_).normalize();else if(e===Xs)n[5].setComponents(l,d,m,_).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+e);return this}intersectsObject(t){if(t.boundingSphere!==void 0)t.boundingSphere===null&&t.computeBoundingSphere(),ss.copy(t.boundingSphere).applyMatrix4(t.matrixWorld);else{let e=t.geometry;e.boundingSphere===null&&e.computeBoundingSphere(),ss.copy(e.boundingSphere).applyMatrix4(t.matrixWorld)}return this.intersectsSphere(ss)}intersectsSprite(t){ss.center.set(0,0,0);let e=Cp.distanceTo(t.center);return ss.radius=.7071067811865476+e,ss.applyMatrix4(t.matrixWorld),this.intersectsSphere(ss)}intersectsSphere(t){let e=this.planes,i=t.center,n=-t.radius;for(let s=0;s<6;s++)if(e[s].distanceToPoint(i)<n)return!1;return!0}intersectsBox(t){let e=this.planes;for(let i=0;i<6;i++){let n=e[i];if(Xo.x=n.normal.x>0?t.max.x:t.min.x,Xo.y=n.normal.y>0?t.max.y:t.min.y,Xo.z=n.normal.z>0?t.max.z:t.min.z,n.distanceToPoint(Xo)<0)return!1}return!0}containsPoint(t){let e=this.planes;for(let i=0;i<6;i++)if(e[i].distanceToPoint(t)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}};var da=class extends sn{constructor(t){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new It(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.alphaMap=t.alphaMap,this.size=t.size,this.sizeAttenuation=t.sizeAttenuation,this.fog=t.fog,this}},Su=new fe,Bc=new Or,qo=new Sn,Yo=new L,kr=class extends Le{constructor(t=new Ae,e=new da){super(),this.isPoints=!0,this.type="Points",this.geometry=t,this.material=e,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}intersectsFrustum(t){return t.intersectsObject(this)}raycast(t,e){let i=this.geometry,n=this.matrixWorld,s=t.params.Points.threshold,o=i.drawRange;if(i.boundingSphere===null&&i.computeBoundingSphere(),qo.copy(i.boundingSphere),qo.applyMatrix4(n),qo.radius+=s,t.ray.intersectsSphere(qo)===!1)return;Su.copy(n).invert(),Bc.copy(t.ray).applyMatrix4(Su);let a=s/((this.scale.x+this.scale.y+this.scale.z)/3),l=a*a,c=i.index,u=i.attributes.position;if(c!==null){let d=Math.max(0,o.start),f=Math.min(c.count,o.start+o.count);for(let g=d,x=f;g<x;g++){let m=c.getX(g);Yo.fromBufferAttribute(u,m),wu(Yo,m,l,n,t,e,this)}}else{let d=Math.max(0,o.start),f=Math.min(u.count,o.start+o.count);for(let g=d,x=f;g<x;g++)Yo.fromBufferAttribute(u,g),wu(Yo,g,l,n,t,e,this)}}updateMorphTargets(){let e=this.geometry.morphAttributes,i=Object.keys(e);if(i.length>0){let n=e[i[0]];if(n!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,o=n.length;s<o;s++){let a=n[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=s}}}}};function wu(r,t,e,i,n,s,o){let a=Bc.distanceSqToPoint(r);if(a<e){let l=new L;Bc.closestPointToPoint(r,l),l.applyMatrix4(i);let c=n.ray.origin.distanceTo(l);if(c<n.near||c>n.far)return;s.push({distance:c,distanceToRay:Math.sqrt(a),point:l,index:t,face:null,faceIndex:null,barycoord:null,object:o})}}var zr=class extends ui{constructor(t=[],e=Wn,i,n,s,o,a,l,c,h){super(t,e,i,n,s,o,a,l,c,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(t){this.image=t}},wn=class extends ui{constructor(t,e,i,n,s,o,a,l,c){super(t,e,i,n,s,o,a,l,c),this.isCanvasTexture=!0,this.needsUpdate=!0}};var zn=class extends ui{constructor(t,e,i=Vi,n,s,o,a=qe,l=qe,c,h=Qi,u=1){if(h!==Qi&&h!==Xn)throw new Error("THREE.DepthTexture: format must be either THREE.DepthFormat or THREE.DepthStencilFormat");let d={width:t,height:e,depth:u};super(d,n,s,o,a,l,h,i,c),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(t){return super.copy(t),this.source=new Ys(Object.assign({},t.image)),this.compareFunction=t.compareFunction,this}toJSON(t){let e=super.toJSON(t);return e.compareFunction=this.compareFunction,e}},fa=class extends zn{constructor(t,e=Vi,i=Wn,n,s,o=qe,a=qe,l,c=Qi){let h={width:t,height:t,depth:1},u=[h,h,h,h,h,h];super(t,t,e,i,n,s,o,a,l,c),this.image=u,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(t){this.image=t}},Hr=class extends ui{constructor(t=null){super(),this.sourceTexture=t,this.isExternalTexture=!0}copy(t){return super.copy(t),this.sourceTexture=t.sourceTexture,this}},ri=class r extends Ae{constructor(t=1,e=1,i=1,n=1,s=1,o=1){super(),this.type="BoxGeometry",this.parameters={width:t,height:e,depth:i,widthSegments:n,heightSegments:s,depthSegments:o};let a=this;n=Math.floor(n),s=Math.floor(s),o=Math.floor(o);let l=[],c=[],h=[],u=[],d=0,f=0;g("z","y","x",-1,-1,i,e,t,o,s,0),g("z","y","x",1,-1,i,e,-t,o,s,1),g("x","z","y",1,1,t,i,e,n,o,2),g("x","z","y",1,-1,t,i,-e,n,o,3),g("x","y","z",1,-1,t,e,i,n,s,4),g("x","y","z",-1,-1,t,e,-i,n,s,5),this.setIndex(l),this.setAttribute("position",new he(c,3)),this.setAttribute("normal",new he(h,3)),this.setAttribute("uv",new he(u,2));function g(x,m,p,y,M,_,v,S,T,b,A){let R=_/T,I=v/b,U=_/2,N=v/2,C=S/2,D=T+1,k=b+1,z=0,et=0,$=new L;for(let Q=0;Q<k;Q++){let V=Q*I-N;for(let nt=0;nt<D;nt++){let rt=nt*R-U;$[x]=rt*y,$[m]=V*M,$[p]=C,c.push($.x,$.y,$.z),$[x]=0,$[m]=0,$[p]=S>0?1:-1,h.push($.x,$.y,$.z),u.push(nt/T),u.push(1-Q/b),z+=1}}for(let Q=0;Q<b;Q++)for(let V=0;V<T;V++){let nt=d+V+D*Q,rt=d+V+D*(Q+1),at=d+(V+1)+D*(Q+1),lt=d+(V+1)+D*Q;l.push(nt,rt,lt),l.push(rt,at,lt),et+=6}a.addGroup(f,et,A),f+=et,d+=z}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new r(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}};var Vr=class r extends Ae{constructor(t=1,e=32,i=0,n=Math.PI*2){super(),this.type="CircleGeometry",this.parameters={radius:t,segments:e,thetaStart:i,thetaLength:n},e=Math.max(3,e);let s=[],o=[],a=[],l=[],c=new L,h=new Vt;o.push(0,0,0),a.push(0,0,1),l.push(.5,.5);for(let u=0,d=3;u<=e;u++,d+=3){let f=i+u/e*n;c.x=t*Math.cos(f),c.y=t*Math.sin(f),o.push(c.x,c.y,c.z),a.push(0,0,1),h.x=(o[d]/t+1)/2,h.y=(o[d+1]/t+1)/2,l.push(h.x,h.y)}for(let u=1;u<=e;u++)s.push(u,u+1,0);this.setIndex(s),this.setAttribute("position",new he(o,3)),this.setAttribute("normal",new he(a,3)),this.setAttribute("uv",new he(l,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new r(t.radius,t.segments,t.thetaStart,t.thetaLength)}},ve=class r extends Ae{constructor(t=1,e=1,i=1,n=32,s=1,o=!1,a=0,l=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:t,radiusBottom:e,height:i,radialSegments:n,heightSegments:s,openEnded:o,thetaStart:a,thetaLength:l};let c=this;n=Math.floor(n),s=Math.floor(s);let h=[],u=[],d=[],f=[],g=0,x=[],m=i/2,p=0;y(),o===!1&&(t>0&&M(!0),e>0&&M(!1)),this.setIndex(h),this.setAttribute("position",new he(u,3)),this.setAttribute("normal",new he(d,3)),this.setAttribute("uv",new he(f,2));function y(){let _=new L,v=new L,S=0,T=(e-t)/i;for(let b=0;b<=s;b++){let A=[],R=b/s,I=R*(e-t)+t;for(let U=0;U<=n;U++){let N=U/n,C=N*l+a,D=Math.sin(C),k=Math.cos(C);v.x=I*D,v.y=-R*i+m,v.z=I*k,u.push(v.x,v.y,v.z),_.set(D,T,k).normalize(),d.push(_.x,_.y,_.z),f.push(N,1-R),A.push(g++)}x.push(A)}for(let b=0;b<n;b++)for(let A=0;A<s;A++){let R=x[A][b],I=x[A+1][b],U=x[A+1][b+1],N=x[A][b+1];(t>0||A!==0)&&(h.push(R,I,N),S+=3),(e>0||A!==s-1)&&(h.push(I,U,N),S+=3)}c.addGroup(p,S,0),p+=S}function M(_){let v=g,S=new Vt,T=new L,b=0,A=_===!0?t:e,R=_===!0?1:-1;for(let U=1;U<=n;U++)u.push(0,m*R,0),d.push(0,R,0),f.push(.5,.5),g++;let I=g;for(let U=0;U<=n;U++){let C=U/n*l+a,D=Math.cos(C),k=Math.sin(C);T.x=A*k,T.y=m*R,T.z=A*D,u.push(T.x,T.y,T.z),d.push(0,R,0),S.x=D*.5+.5,S.y=k*.5*R+.5,f.push(S.x,S.y),g++}for(let U=0;U<n;U++){let N=v+U,C=I+U;_===!0?h.push(C,C+1,N):h.push(C+1,C,N),b+=3}c.addGroup(p,b,_===!0?1:2),p+=b}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new r(t.radiusTop,t.radiusBottom,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}},Gr=class r extends ve{constructor(t=1,e=1,i=32,n=1,s=!1,o=0,a=Math.PI*2){super(0,t,e,i,n,s,o,a),this.type="ConeGeometry",this.parameters={radius:t,height:e,radialSegments:i,heightSegments:n,openEnded:s,thetaStart:o,thetaLength:a}}static fromJSON(t){return new r(t.radius,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}};var Ri=class r extends Ae{constructor(t=1,e=1,i=1,n=1){super(),this.type="PlaneGeometry",this.parameters={width:t,height:e,widthSegments:i,heightSegments:n};let s=t/2,o=e/2,a=Math.floor(i),l=Math.floor(n),c=a+1,h=l+1,u=t/a,d=e/l,f=[],g=[],x=[],m=[];for(let p=0;p<h;p++){let y=p*d-o;for(let M=0;M<c;M++){let _=M*u-s;g.push(_,-y,0),x.push(0,0,1),m.push(M/a),m.push(1-p/l)}}for(let p=0;p<l;p++)for(let y=0;y<a;y++){let M=y+c*p,_=y+c*(p+1),v=y+1+c*(p+1),S=y+1+c*p;f.push(M,_,S),f.push(_,v,S)}this.setIndex(f),this.setAttribute("position",new he(g,3)),this.setAttribute("normal",new he(x,3)),this.setAttribute("uv",new he(m,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new r(t.width,t.height,t.widthSegments,t.heightSegments)}};var Ci=class r extends Ae{constructor(t=1,e=32,i=16,n=0,s=Math.PI*2,o=0,a=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:t,widthSegments:e,heightSegments:i,phiStart:n,phiLength:s,thetaStart:o,thetaLength:a},e=Math.max(3,Math.floor(e)),i=Math.max(2,Math.floor(i));let l=Math.min(o+a,Math.PI),c=0,h=[],u=new L,d=new L,f=[],g=[],x=[],m=[];for(let p=0;p<=i;p++){let y=[],M=p/i,_=o+M*a,v=t*Math.cos(_),S=Math.sqrt(t*t-v*v),T=0;p===0&&o===0?T=.5/e:p===i&&l===Math.PI&&(T=-.5/e);for(let b=0;b<=e;b++){let A=b/e,R=n+A*s;u.x=-S*Math.cos(R),u.y=v,u.z=S*Math.sin(R),g.push(u.x,u.y,u.z),d.copy(u).normalize(),x.push(d.x,d.y,d.z),m.push(A+T,1-M),y.push(c++)}h.push(y)}for(let p=0;p<i;p++)for(let y=0;y<e;y++){let M=h[p][y+1],_=h[p][y],v=h[p+1][y],S=h[p+1][y+1];(p!==0||o>0)&&f.push(M,_,S),(p!==i-1||l<Math.PI)&&f.push(_,v,S)}this.setIndex(f),this.setAttribute("position",new he(g,3)),this.setAttribute("normal",new he(x,3)),this.setAttribute("uv",new he(m,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new r(t.radius,t.widthSegments,t.heightSegments,t.phiStart,t.phiLength,t.thetaStart,t.thetaLength)}};var Wr=class r extends Ae{constructor(t=1,e=.4,i=12,n=48,s=Math.PI*2,o=0,a=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:t,tube:e,radialSegments:i,tubularSegments:n,arc:s,thetaStart:o,thetaLength:a},i=Math.floor(i),n=Math.floor(n);let l=[],c=[],h=[],u=[],d=new L,f=new L,g=new L;for(let x=0;x<=i;x++){let m=o+x/i*a;for(let p=0;p<=n;p++){let y=p/n*s;f.x=(t+e*Math.cos(m))*Math.cos(y),f.y=(t+e*Math.cos(m))*Math.sin(y),f.z=e*Math.sin(m),c.push(f.x,f.y,f.z),d.x=t*Math.cos(y),d.y=t*Math.sin(y),g.subVectors(f,d).normalize(),h.push(g.x,g.y,g.z),u.push(p/n),u.push(x/i)}}for(let x=1;x<=i;x++)for(let m=1;m<=n;m++){let p=(n+1)*x+m-1,y=(n+1)*(x-1)+m-1,M=(n+1)*(x-1)+m,_=(n+1)*x+m;l.push(p,y,_),l.push(y,M,_)}this.setIndex(l),this.setAttribute("position",new he(c,3)),this.setAttribute("normal",new he(h,3)),this.setAttribute("uv",new he(u,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new r(t.radius,t.tube,t.radialSegments,t.tubularSegments,t.arc,t.thetaStart,t.thetaLength)}};function ds(r){let t={};for(let e in r){t[e]={};for(let i in r[e]){let n=r[e][i];if(Eu(n))n.isRenderTargetTexture?(Ht("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),t[e][i]=null):t[e][i]=n.clone();else if(Array.isArray(n))if(Eu(n[0])){let s=[];for(let o=0,a=n.length;o<a;o++)s[o]=n[o].clone();t[e][i]=s}else t[e][i]=n.slice();else t[e][i]=n}}return t}function oi(r){let t={};for(let e=0;e<r.length;e++){let i=ds(r[e]);for(let n in i)t[n]=i[n]}return t}function Eu(r){return r&&(r.isColor||r.isMatrix3||r.isMatrix4||r.isVector2||r.isVector3||r.isVector4||r.isTexture||r.isQuaternion)}function Pp(r){let t=[];for(let e=0;e<r.length;e++)t.push(r[e].clone());return t}function ch(r){let t=r.getRenderTarget();return t===null?r.outputColorSpace:t.isXRRenderTarget===!0?t.texture.colorSpace:Kt.workingColorSpace}var gd={clone:ds,merge:oi},Ip=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,Lp=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`,Ze=class extends sn{constructor(t){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=Ip,this.fragmentShader=Lp,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,t!==void 0&&this.setValues(t)}copy(t){return super.copy(t),this.fragmentShader=t.fragmentShader,this.vertexShader=t.vertexShader,this.uniforms=ds(t.uniforms),this.uniformsGroups=Pp(t.uniformsGroups),this.defines=Object.assign({},t.defines),this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.fog=t.fog,this.lights=t.lights,this.clipping=t.clipping,this.extensions=Object.assign({},t.extensions),this.glslVersion=t.glslVersion,this.defaultAttributeValues=Object.assign({},t.defaultAttributeValues),this.index0AttributeName=t.index0AttributeName,this.uniformsNeedUpdate=t.uniformsNeedUpdate,this}toJSON(t){let e=super.toJSON(t);e.glslVersion=this.glslVersion,e.uniforms={};for(let n in this.uniforms){let o=this.uniforms[n].value;o&&o.isTexture?e.uniforms[n]={type:"t",value:o.toJSON(t).uuid}:o&&o.isColor?e.uniforms[n]={type:"c",value:o.getHex()}:o&&o.isVector2?e.uniforms[n]={type:"v2",value:o.toArray()}:o&&o.isVector3?e.uniforms[n]={type:"v3",value:o.toArray()}:o&&o.isVector4?e.uniforms[n]={type:"v4",value:o.toArray()}:o&&o.isMatrix3?e.uniforms[n]={type:"m3",value:o.toArray()}:o&&o.isMatrix4?e.uniforms[n]={type:"m4",value:o.toArray()}:e.uniforms[n]={value:o}}Object.keys(this.defines).length>0&&(e.defines=this.defines),e.vertexShader=this.vertexShader,e.fragmentShader=this.fragmentShader,e.lights=this.lights,e.clipping=this.clipping;let i={};for(let n in this.extensions)this.extensions[n]===!0&&(i[n]=!0);return Object.keys(i).length>0&&(e.extensions=i),e}fromJSON(t,e){if(super.fromJSON(t,e),t.uniforms!==void 0)for(let i in t.uniforms){let n=t.uniforms[i];switch(this.uniforms[i]={},n.type){case"t":this.uniforms[i].value=e[n.value]||null;break;case"c":this.uniforms[i].value=new It().setHex(n.value);break;case"v2":this.uniforms[i].value=new Vt().fromArray(n.value);break;case"v3":this.uniforms[i].value=new L().fromArray(n.value);break;case"v4":this.uniforms[i].value=new Ee().fromArray(n.value);break;case"m3":this.uniforms[i].value=new Gt().fromArray(n.value);break;case"m4":this.uniforms[i].value=new fe().fromArray(n.value);break;default:this.uniforms[i].value=n.value}}if(t.defines!==void 0&&(this.defines=t.defines),t.vertexShader!==void 0&&(this.vertexShader=t.vertexShader),t.fragmentShader!==void 0&&(this.fragmentShader=t.fragmentShader),t.glslVersion!==void 0&&(this.glslVersion=t.glslVersion),t.extensions!==void 0)for(let i in t.extensions)this.extensions[i]=t.extensions[i];return t.lights!==void 0&&(this.lights=t.lights),t.clipping!==void 0&&(this.clipping=t.clipping),this}},pa=class extends Ze{constructor(t){super(t),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}},re=class extends sn{constructor(t){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new It(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new It(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=xl,this.normalScale=new Vt(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new bn,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.defines={STANDARD:""},this.color.copy(t.color),this.roughness=t.roughness,this.metalness=t.metalness,this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.roughnessMap=t.roughnessMap,this.metalnessMap=t.metalnessMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.envMapIntensity=t.envMapIntensity,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}};var ma=class extends sn{constructor(t){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=ed,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(t)}copy(t){return super.copy(t),this.depthPacking=t.depthPacking,this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this}},ga=class extends sn{constructor(t){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(t)}copy(t){return super.copy(t),this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this}};function zs(r,t){return!r||r.constructor===t?r:typeof t.BYTES_PER_ELEMENT=="number"?new t(r):Array.prototype.slice.call(r)}function Lc(r){return r!==void 0&&r.inTangents!==void 0&&r.outTangents!==void 0}var Hn=class{constructor(t,e,i,n){this.parameterPositions=t,this._cachedIndex=0,this.resultBuffer=n!==void 0?n:new e.constructor(i),this.sampleValues=e,this.valueSize=i,this.settings=null,this.DefaultSettings_={}}evaluate(t){let e=this.parameterPositions,i=this._cachedIndex,n=e[i],s=e[i-1];i:{t:{let o;e:{n:if(!(t<n)){for(let a=i+2;;){if(n===void 0){if(t<s)break n;return i=e.length,this._cachedIndex=i,this.copySampleValue_(i-1)}if(i===a)break;if(s=n,n=e[++i],t<n)break t}o=e.length;break e}if(!(t>=s)){let a=e[1];t<a&&(i=2,s=a);for(let l=i-2;;){if(s===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(i===l)break;if(n=s,s=e[--i-1],t>=s)break t}o=i,i=0;break e}break i}for(;i<o;){let a=i+o>>>1;t<e[a]?o=a:i=a+1}if(n=e[i],s=e[i-1],s===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(n===void 0)return i=e.length,this._cachedIndex=i,this.copySampleValue_(i-1)}this._cachedIndex=i,this.intervalChanged_(i,s,n)}return this.interpolate_(i,s,t,n)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(t){let e=this.resultBuffer,i=this.sampleValues,n=this.valueSize,s=t*n;for(let o=0;o!==n;++o)e[o]=i[s+o];return e}interpolate_(){throw new Error("THREE.Interpolant: Call to abstract method.")}intervalChanged_(){}},xa=class extends Hn{constructor(t,e,i,n){super(t,e,i,n),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:Uc,endingEnd:Uc}}intervalChanged_(t,e,i){let n=this.parameterPositions,s=t-2,o=t+1,a=n[s],l=n[o];if(a===void 0)switch(this.getSettings_().endingStart){case Fc:s=t,a=2*e-i;break;case Oc:s=n.length-2,a=e+n[s]-n[s+1];break;default:s=t,a=i}if(l===void 0)switch(this.getSettings_().endingEnd){case Fc:o=t,l=2*i-e;break;case Oc:o=1,l=i+n[1]-n[0];break;default:o=t-1,l=e}let c=(i-e)*.5,h=this.valueSize;this._weightPrev=c/(e-a),this._weightNext=c/(l-i),this._offsetPrev=s*h,this._offsetNext=o*h}interpolate_(t,e,i,n){let s=this.resultBuffer,o=this.sampleValues,a=this.valueSize,l=t*a,c=l-a,h=this._offsetPrev,u=this._offsetNext,d=this._weightPrev,f=this._weightNext,g=(i-e)/(n-e),x=g*g,m=x*g,p=-d*m+2*d*x-d*g,y=(1+d)*m+(-1.5-2*d)*x+(-.5+d)*g+1,M=(-1-f)*m+(1.5+f)*x+.5*g,_=f*m-f*x;for(let v=0;v!==a;++v)s[v]=p*o[h+v]+y*o[c+v]+M*o[l+v]+_*o[u+v];return s}},ya=class extends Hn{constructor(t,e,i,n){super(t,e,i,n)}interpolate_(t,e,i,n){let s=this.resultBuffer,o=this.sampleValues,a=this.valueSize,l=t*a,c=l-a,h=(i-e)/(n-e),u=1-h;for(let d=0;d!==a;++d)s[d]=o[c+d]*u+o[l+d]*h;return s}},_a=class extends Hn{constructor(t,e,i,n){super(t,e,i,n)}interpolate_(t){return this.copySampleValue_(t-1)}},va=class extends Hn{interpolate_(t,e,i,n){let s=this.resultBuffer,o=this.sampleValues,a=this.valueSize,l=t*a,c=l-a,h=this.inTangents,u=this.outTangents;if(!h||!u){let g=(i-e)/(n-e),x=1-g;for(let m=0;m!==a;++m)s[m]=o[c+m]*x+o[l+m]*g;return s}let d=a*2,f=t-1;for(let g=0;g!==a;++g){let x=o[c+g],m=o[l+g],p=f*d+g*2,y=u[p],M=u[p+1],_=t*d+g*2,v=h[_],S=h[_+1],T=Np(i,e,y,v,n);s[g]=xd(T,x,M,S,m)}return s}};function xd(r,t,e,i,n){let s=1-r;return s*s*s*t+3*s*s*r*e+3*s*r*r*i+r*r*r*n}function Dp(r,t,e,i,n){let s=1-r;return 3*s*s*(e-t)+6*s*r*(i-e)+3*r*r*(n-i)}function Np(r,t,e,i,n){let s=(r-t)/(n-t);for(let o=0;o<8;o++){let a=xd(s,t,e,i,n)-r;if(Math.abs(a)<1e-10)break;let l=Dp(s,t,e,i,n);if(Math.abs(l)<1e-10)break;s=Math.max(0,Math.min(1,s-a/l))}return s}var bi=class{constructor(t,e,i,n){if(t===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(e===void 0||e.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+t);this.name=t,this.times=zs(e,this.TimeBufferType),this.values=zs(i,this.ValueBufferType),this.setInterpolation(n||this.DefaultInterpolation)}static toJSON(t){let e=t.constructor,i;if(e.toJSON!==this.toJSON)i=e.toJSON(t);else{i={name:t.name,times:zs(t.times,Array),values:zs(t.values,Array)};let n=t.getInterpolation();n!==t.DefaultInterpolation&&(i.interpolation=n),Lc(t.settings)&&(i.settings={inTangents:zs(t.settings.inTangents,Array),outTangents:zs(t.settings.outTangents,Array)})}return i.type=t.ValueTypeName,i}InterpolantFactoryMethodDiscrete(t){return new _a(this.times,this.values,this.getValueSize(),t)}InterpolantFactoryMethodLinear(t){return new ya(this.times,this.values,this.getValueSize(),t)}InterpolantFactoryMethodSmooth(t){return new xa(this.times,this.values,this.getValueSize(),t)}InterpolantFactoryMethodBezier(t){let e=new va(this.times,this.values,this.getValueSize(),t);return this.settings&&(e.inTangents=this.settings.inTangents,e.outTangents=this.settings.outTangents),e}setInterpolation(t){let e;switch(t){case Ar:e=this.InterpolantFactoryMethodDiscrete;break;case oa:e=this.InterpolantFactoryMethodLinear;break;case jo:e=this.InterpolantFactoryMethodSmooth;break;case Nc:e=this.InterpolantFactoryMethodBezier;break}if(e===void 0){let i="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(t!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw new Error(i);return Ht("KeyframeTrack:",i),this}return this.createInterpolant=e,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return Ar;case this.InterpolantFactoryMethodLinear:return oa;case this.InterpolantFactoryMethodSmooth:return jo;case this.InterpolantFactoryMethodBezier:return Nc}}getValueSize(){return this.values.length/this.times.length}shift(t){if(t!==0){let e=this.times;for(let i=0,n=e.length;i!==n;++i)e[i]+=t}return this}scale(t){if(t!==1){let e=this.times;for(let i=0,n=e.length;i!==n;++i)e[i]*=t;Lc(this.settings)&&(Tu(this.settings.inTangents,t),Tu(this.settings.outTangents,t))}return this}trim(t,e){let i=this.times,n=i.length,s=0,o=n-1;for(;s!==n&&i[s]<t;)++s;for(;o!==-1&&i[o]>e;)--o;if(++o,s!==0||o!==n){s>=o&&(o=Math.max(o,1),s=o-1);let a=this.getValueSize();this.times=i.slice(s,o),this.values=this.values.slice(s*a,o*a)}return this}validate(){let t=!0,e=this.getValueSize();e-Math.floor(e)!==0&&(zt("KeyframeTrack: Invalid value size in track.",this),t=!1);let i=this.times,n=this.values,s=i.length;s===0&&(zt("KeyframeTrack: Track is empty.",this),t=!1);let o=null;for(let a=0;a!==s;a++){let l=i[a];if(typeof l=="number"&&isNaN(l)){zt("KeyframeTrack: Time is not a valid number.",this,a,l),t=!1;break}if(o!==null&&o>l){zt("KeyframeTrack: Out of order keys.",this,a,l,o),t=!1;break}o=l}if(n!==void 0&&cp(n))for(let a=0,l=n.length;a!==l;++a){let c=n[a];if(isNaN(c)){zt("KeyframeTrack: Value is not a valid number.",this,a,c),t=!1;break}}return t}optimize(){let t=this.times.slice(),e=this.values.slice(),i=this.getValueSize(),n=this.getInterpolation()===jo,s=t.length-1,o=1;for(let a=1;a<s;++a){let l=!1,c=t[a],h=t[a+1];if(c!==h&&(a!==1||c!==t[0]))if(n)l=!0;else{let u=a*i,d=u-i,f=u+i;for(let g=0;g!==i;++g){let x=e[u+g];if(x!==e[d+g]||x!==e[f+g]){l=!0;break}}}if(l){if(a!==o){t[o]=t[a];let u=a*i,d=o*i;for(let f=0;f!==i;++f)e[d+f]=e[u+f]}++o}}if(s>0){t[o]=t[s];for(let a=s*i,l=o*i,c=0;c!==i;++c)e[l+c]=e[a+c];++o}return o!==t.length?(this.times=t.slice(0,o),this.values=e.slice(0,o*i)):(this.times=t,this.values=e),this}clone(){let t=this.times.slice(),e=this.values.slice(),i=this.constructor,n=new i(this.name,t,e);return n.createInterpolant=this.createInterpolant,Lc(this.settings)&&(n.settings={inTangents:this.settings.inTangents.slice(),outTangents:this.settings.outTangents.slice()}),n}};function Tu(r,t){for(let e=0,i=r.length;e!==i;e+=2)r[e]*=t}bi.prototype.ValueTypeName="";bi.prototype.TimeBufferType=Float32Array;bi.prototype.ValueBufferType=Float32Array;bi.prototype.DefaultInterpolation=oa;var Vn=class extends bi{constructor(t,e,i){super(t,e,i)}};Vn.prototype.ValueTypeName="bool";Vn.prototype.ValueBufferType=Array;Vn.prototype.DefaultInterpolation=Ar;Vn.prototype.InterpolantFactoryMethodLinear=void 0;Vn.prototype.InterpolantFactoryMethodSmooth=void 0;var Ma=class extends bi{constructor(t,e,i,n){super(t,e,i,n)}};Ma.prototype.ValueTypeName="color";var ba=class extends bi{constructor(t,e,i,n){super(t,e,i,n)}};ba.prototype.ValueTypeName="number";var Sa=class extends Hn{constructor(t,e,i,n){super(t,e,i,n)}interpolate_(t,e,i,n){let s=this.resultBuffer,o=this.sampleValues,a=this.valueSize,l=(i-e)/(n-e),c=t*a;for(let h=c+a;c!==h;c+=4)en.slerpFlat(s,0,o,c-a,o,c,l);return s}},Xr=class extends bi{constructor(t,e,i,n){super(t,e,i,n)}InterpolantFactoryMethodLinear(t){return new Sa(this.times,this.values,this.getValueSize(),t)}};Xr.prototype.ValueTypeName="quaternion";Xr.prototype.InterpolantFactoryMethodSmooth=void 0;var Gn=class extends bi{constructor(t,e,i){super(t,e,i)}};Gn.prototype.ValueTypeName="string";Gn.prototype.ValueBufferType=Array;Gn.prototype.DefaultInterpolation=Ar;Gn.prototype.InterpolantFactoryMethodLinear=void 0;Gn.prototype.InterpolantFactoryMethodSmooth=void 0;var wa=class extends bi{constructor(t,e,i,n){super(t,e,i,n)}};wa.prototype.ValueTypeName="vector";var Ea=class{constructor(t,e,i){let n=this,s=!1,o=0,a=0,l,c=[];this.onStart=void 0,this.onLoad=t,this.onProgress=e,this.onError=i,this._abortController=null,this.itemStart=function(h){a++,s===!1&&n.onStart!==void 0&&n.onStart(h,o,a),s=!0},this.itemEnd=function(h){o++,n.onProgress!==void 0&&n.onProgress(h,o,a),o===a&&(s=!1,n.onLoad!==void 0&&n.onLoad())},this.itemError=function(h){n.onError!==void 0&&n.onError(h)},this.resolveURL=function(h){return h=h.normalize("NFC"),l?l(h):h},this.setURLModifier=function(h){return l=h,this},this.addHandler=function(h,u){return c.push(h,u),this},this.removeHandler=function(h){let u=c.indexOf(h);return u!==-1&&c.splice(u,2),this},this.getHandler=function(h){for(let u=0,d=c.length;u<d;u+=2){let f=c[u],g=c[u+1];if(f.global&&(f.lastIndex=0),f.test(h))return g}return null},this.abort=function(){return this.abortController.abort(),this._abortController=null,this}}get abortController(){return this._abortController||(this._abortController=new AbortController),this._abortController}},yd=new Ea,Ta=class{constructor(t){this.manager=t!==void 0?t:yd,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}load(){}loadAsync(t,e){let i=this;return new Promise(function(n,s){i.load(t,n,e,s)})}parse(){}setCrossOrigin(t){return this.crossOrigin=t,this}setWithCredentials(t){return this.withCredentials=t,this}setPath(t){return this.path=t,this}setResourcePath(t){return this.resourcePath=t,this}setRequestHeader(t){return this.requestHeader=t,this}abort(){return this}};Ta.DEFAULT_MATERIAL_NAME="__DEFAULT";var qr=class extends Le{constructor(t,e=1){super(),this.isLight=!0,this.type="Light",this.color=new It(t),this.intensity=e}copy(t,e){return super.copy(t,e),this.color.copy(t.color),this.intensity=t.intensity,this}toJSON(t){let e=super.toJSON(t);return e.object.color=this.color.getHex(),e.object.intensity=this.intensity,e}},Yr=class extends qr{constructor(t,e,i){super(t,i),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(Le.DEFAULT_UP),this.updateMatrix(),this.groundColor=new It(e)}copy(t,e){return super.copy(t,e),this.groundColor.copy(t.groundColor),this}toJSON(t){let e=super.toJSON(t);return e.object.groundColor=this.groundColor.getHex(),e}},Dc=new fe,Au=new L,Ru=new L,Aa=class{constructor(t){this.camera=t,this.intensity=1,this.bias=0,this.biasNode=null,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new Vt(512,512),this.mapType=gi,this.map=null,this.mapPass=null,this.matrix=new fe,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Js,this._frameExtents=new Vt(1,1),this._viewportCount=1,this._viewports=[new Ee(0,0,1,1)]}getViewportCount(){return this._viewportCount}getCamera(){return this.camera}getFrustum(){return this._frustum}updateMatrices(t){let e=this.camera;Au.setFromMatrixPosition(t.matrixWorld),e.position.copy(Au),Ru.setFromMatrixPosition(t.target.matrixWorld),e.lookAt(Ru),e.updateMatrixWorld(),this._updateMatrix(e,this.matrix,this._frustum)}_updateMatrix(t,e,i,n){Dc.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),i.setFromProjectionMatrix(Dc,t.coordinateSystem,t.reversedDepth);let s=this._frameExtents,o=n?n.z/s.x:1,a=n?n.w/s.y:1,l=n?n.x/s.x:0,c=n?n.y/s.y:0;t.coordinateSystem===Xs||t.reversedDepth?e.set(.5*o,0,0,.5*o+l,0,.5*a,0,.5*a+c,0,0,1,0,0,0,0,1):e.set(.5*o,0,0,.5*o+l,0,.5*a,0,.5*a+c,0,0,.5,.5,0,0,0,1),e.multiply(Dc)}getViewport(t){return this._viewports[t]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(t){return this.camera=t.camera.clone(),this.intensity=t.intensity,this.bias=t.bias,this.radius=t.radius,this.autoUpdate=t.autoUpdate,this.needsUpdate=t.needsUpdate,this.normalBias=t.normalBias,this.blurSamples=t.blurSamples,this.mapSize.copy(t.mapSize),this.biasNode=t.biasNode,this}clone(){return new this.constructor().copy(this)}toJSON(){let t={};return t.intensity=this.intensity,t.bias=this.bias,t.normalBias=this.normalBias,t.radius=this.radius,t.blurSamples=this.blurSamples,t.mapSize=this.mapSize.toArray(),t.camera=this.camera.toJSON(!1).object,delete t.camera.matrix,t}},$o=new L,Zo=new en,Ji=new L,$r=class extends Le{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new fe,this.projectionMatrix=new fe,this.projectionMatrixInverse=new fe,this.coordinateSystem=zi,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(t,e){return super.copy(t,e),this.matrixWorldInverse.copy(t.matrixWorldInverse),this.projectionMatrix.copy(t.projectionMatrix),this.projectionMatrixInverse.copy(t.projectionMatrixInverse),this.coordinateSystem=t.coordinateSystem,this}getWorldDirection(t){return super.getWorldDirection(t).negate()}updateMatrixWorld(t){super.updateMatrixWorld(t),this.matrixWorld.decompose($o,Zo,Ji),Ji.x===1&&Ji.y===1&&Ji.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose($o,Zo,Ji.set(1,1,1)).invert()}updateWorldMatrix(t,e,i=!1){super.updateWorldMatrix(t,e,i),this.matrixWorld.decompose($o,Zo,Ji),Ji.x===1&&Ji.y===1&&Ji.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose($o,Zo,Ji.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}},Bn=new L,Cu=new Vt,Pu=new Vt,si=class extends $r{constructor(t=50,e=1,i=.1,n=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=t,this.zoom=1,this.near=i,this.far=n,this.focus=10,this.aspect=e,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.fov=t.fov,this.zoom=t.zoom,this.near=t.near,this.far=t.far,this.focus=t.focus,this.aspect=t.aspect,this.view=t.view===null?null:Object.assign({},t.view),this.filmGauge=t.filmGauge,this.filmOffset=t.filmOffset,this}setFocalLength(t){let e=.5*this.getFilmHeight()/t;this.fov=aa*2*Math.atan(e),this.updateProjectionMatrix()}getFocalLength(){let t=Math.tan(hc*.5*this.fov);return .5*this.getFilmHeight()/t}getEffectiveFOV(){return aa*2*Math.atan(Math.tan(hc*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(t,e,i){Bn.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),e.set(Bn.x,Bn.y).multiplyScalar(-t/Bn.z),Bn.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),i.set(Bn.x,Bn.y).multiplyScalar(-t/Bn.z)}getViewSize(t,e){return this.getViewBounds(t,Cu,Pu),e.subVectors(Pu,Cu)}setViewOffset(t,e,i,n,s,o){this.aspect=t/e,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=i,this.view.offsetY=n,this.view.width=s,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let t=this.near,e=t*Math.tan(hc*.5*this.fov)/this.zoom,i=2*e,n=this.aspect*i,s=-.5*n,o=this.view;if(this.view!==null&&this.view.enabled){let l=o.fullWidth,c=o.fullHeight;s+=o.offsetX*n/l,e-=o.offsetY*i/c,n*=o.width/l,i*=o.height/c}let a=this.filmOffset;a!==0&&(s+=t*a/this.getFilmWidth()),this.projectionMatrix.makePerspective(s,s+n,e,e-i,t,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){let e=super.toJSON(t);return e.object.fov=this.fov,e.object.zoom=this.zoom,e.object.near=this.near,e.object.far=this.far,e.object.focus=this.focus,e.object.aspect=this.aspect,this.view!==null&&(e.object.view=Object.assign({},this.view)),e.object.filmGauge=this.filmGauge,e.object.filmOffset=this.filmOffset,e}};var Ks=class extends $r{constructor(t=-1,e=1,i=1,n=-1,s=.1,o=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=t,this.right=e,this.top=i,this.bottom=n,this.near=s,this.far=o,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.left=t.left,this.right=t.right,this.top=t.top,this.bottom=t.bottom,this.near=t.near,this.far=t.far,this.zoom=t.zoom,this.view=t.view===null?null:Object.assign({},t.view),this}setViewOffset(t,e,i,n,s,o){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=i,this.view.offsetY=n,this.view.width=s,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let t=(this.right-this.left)/(2*this.zoom),e=(this.top-this.bottom)/(2*this.zoom),i=(this.right+this.left)/2,n=(this.top+this.bottom)/2,s=i-t,o=i+t,a=n+e,l=n-e;if(this.view!==null&&this.view.enabled){let c=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;s+=c*this.view.offsetX,o=s+c*this.view.width,a-=h*this.view.offsetY,l=a-h*this.view.height}this.projectionMatrix.makeOrthographic(s,o,a,l,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){let e=super.toJSON(t);return e.object.zoom=this.zoom,e.object.left=this.left,e.object.right=this.right,e.object.top=this.top,e.object.bottom=this.bottom,e.object.near=this.near,e.object.far=this.far,this.view!==null&&(e.object.view=Object.assign({},this.view)),e}},kc=class extends Aa{constructor(){super(new Ks(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}},Zr=class extends qr{constructor(t,e){super(t,e),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(Le.DEFAULT_UP),this.updateMatrix(),this.target=new Le,this.shadow=new kc}dispose(){super.dispose(),this.shadow.dispose()}copy(t){return super.copy(t),this.target=t.target.clone(),this.shadow=t.shadow.clone(),this}toJSON(t){let e=super.toJSON(t);return e.object.shadow=this.shadow.toJSON(),e.object.target=this.target.uuid,e}};var Hs=-90,Vs=1,Ra=class extends Le{constructor(t,e,i){super(),this.type="CubeCamera",this.renderTarget=i,this.coordinateSystem=null,this.activeMipmapLevel=0;let n=new si(Hs,Vs,t,e);n.layers=this.layers,this.add(n);let s=new si(Hs,Vs,t,e);s.layers=this.layers,this.add(s);let o=new si(Hs,Vs,t,e);o.layers=this.layers,this.add(o);let a=new si(Hs,Vs,t,e);a.layers=this.layers,this.add(a);let l=new si(Hs,Vs,t,e);l.layers=this.layers,this.add(l);let c=new si(Hs,Vs,t,e);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){let t=this.coordinateSystem,e=this.children.concat(),[i,n,s,o,a,l]=e;for(let c of e)this.remove(c);if(t===zi)i.up.set(0,1,0),i.lookAt(1,0,0),n.up.set(0,1,0),n.lookAt(-1,0,0),s.up.set(0,0,-1),s.lookAt(0,1,0),o.up.set(0,0,1),o.lookAt(0,-1,0),a.up.set(0,1,0),a.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(t===Xs)i.up.set(0,-1,0),i.lookAt(-1,0,0),n.up.set(0,-1,0),n.lookAt(1,0,0),s.up.set(0,0,1),s.lookAt(0,1,0),o.up.set(0,0,-1),o.lookAt(0,-1,0),a.up.set(0,-1,0),a.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+t);for(let c of e)this.add(c),c.updateMatrixWorld()}update(t,e){this.parent===null&&this.updateMatrixWorld();let{renderTarget:i,activeMipmapLevel:n}=this;this.coordinateSystem!==t.coordinateSystem&&(this.coordinateSystem=t.coordinateSystem,this.updateCoordinateSystem());let[s,o,a,l,c,h]=this.children,u=t.getRenderTarget(),d=t.getActiveCubeFace(),f=t.getActiveMipmapLevel(),g=t.xr.enabled;t.xr.enabled=!1;let x=i.texture.generateMipmaps;i.texture.generateMipmaps=!1;let m=!1;t.isWebGLRenderer===!0?m=t.state.buffers.depth.getReversed():m=t.reversedDepthBuffer,t.setRenderTarget(i,0,n),m&&t.autoClear===!1&&t.clearDepth(),t.render(e,s),t.setRenderTarget(i,1,n),m&&t.autoClear===!1&&t.clearDepth(),t.render(e,o),t.setRenderTarget(i,2,n),m&&t.autoClear===!1&&t.clearDepth(),t.render(e,a),t.setRenderTarget(i,3,n),m&&t.autoClear===!1&&t.clearDepth(),t.render(e,l),t.setRenderTarget(i,4,n),m&&t.autoClear===!1&&t.clearDepth(),t.render(e,c),i.texture.generateMipmaps=x,t.setRenderTarget(i,5,n),m&&t.autoClear===!1&&t.clearDepth(),t.render(e,h),t.setRenderTarget(u,d,f),t.xr.enabled=g,i.texture.needsPMREMUpdate=!0}},Ca=class extends si{constructor(t=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=t}};var hh="\\[\\]\\.:\\/",Up=new RegExp("["+hh+"]","g"),uh="[^"+hh+"]",Fp="[^"+hh.replace("\\.","")+"]",Op=/((?:WC+[\/:])*)/.source.replace("WC",uh),Bp=/(WCOD+)?/.source.replace("WCOD",Fp),kp=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",uh),zp=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",uh),Hp=new RegExp("^"+Op+Bp+kp+zp+"$"),Vp=["material","materials","bones","map"],zc=class{constructor(t,e,i){let n=i||be.parseTrackName(e);this._targetGroup=t,this._bindings=t.subscribe_(e,n)}getValue(t,e){this.bind();let i=this._targetGroup.nCachedObjects_,n=this._bindings[i];n!==void 0&&n.getValue(t,e)}setValue(t,e){let i=this._bindings;for(let n=this._targetGroup.nCachedObjects_,s=i.length;n!==s;++n)i[n].setValue(t,e)}bind(){let t=this._bindings;for(let e=this._targetGroup.nCachedObjects_,i=t.length;e!==i;++e)t[e].bind()}unbind(){let t=this._bindings;for(let e=this._targetGroup.nCachedObjects_,i=t.length;e!==i;++e)t[e].unbind()}},be=class r{constructor(t,e,i){this.path=e,this.parsedPath=i||r.parseTrackName(e),this.node=r.findNode(t,this.parsedPath.nodeName),this.rootNode=t,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(t,e,i){return t&&t.isAnimationObjectGroup?new r.Composite(t,e,i):new r(t,e,i)}static sanitizeNodeName(t){return t.replace(/\s/g,"_").replace(Up,"")}static parseTrackName(t){let e=Hp.exec(t);if(e===null)throw new Error("THREE.PropertyBinding: Cannot parse trackName: "+t);let i={nodeName:e[2],objectName:e[3],objectIndex:e[4],propertyName:e[5],propertyIndex:e[6]},n=i.nodeName&&i.nodeName.lastIndexOf(".");if(n!==void 0&&n!==-1){let s=i.nodeName.substring(n+1);Vp.indexOf(s)!==-1&&(i.nodeName=i.nodeName.substring(0,n),i.objectName=s)}if(i.propertyName===null||i.propertyName.length===0)throw new Error("THREE.PropertyBinding: can not parse propertyName from trackName: "+t);return i}static findNode(t,e){if(e===void 0||e===""||e==="."||e===-1||e===t.name||e===t.uuid)return t;if(t.skeleton){let i=t.skeleton.getBoneByName(e);if(i!==void 0)return i}if(t.children){let i=function(s){for(let o=0;o<s.length;o++){let a=s[o];if(a.name===e||a.uuid===e)return a;let l=i(a.children);if(l)return l}return null},n=i(t.children);if(n)return n}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(t,e){t[e]=this.targetObject[this.propertyName]}_getValue_array(t,e){let i=this.resolvedProperty;for(let n=0,s=i.length;n!==s;++n)t[e++]=i[n]}_getValue_arrayElement(t,e){t[e]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(t,e){this.resolvedProperty.toArray(t,e)}_setValue_direct(t,e){this.targetObject[this.propertyName]=t[e]}_setValue_direct_setNeedsUpdate(t,e){this.targetObject[this.propertyName]=t[e],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(t,e){this.targetObject[this.propertyName]=t[e],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(t,e){let i=this.resolvedProperty;for(let n=0,s=i.length;n!==s;++n)i[n]=t[e++]}_setValue_array_setNeedsUpdate(t,e){let i=this.resolvedProperty;for(let n=0,s=i.length;n!==s;++n)i[n]=t[e++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(t,e){let i=this.resolvedProperty;for(let n=0,s=i.length;n!==s;++n)i[n]=t[e++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(t,e){this.resolvedProperty[this.propertyIndex]=t[e]}_setValue_arrayElement_setNeedsUpdate(t,e){this.resolvedProperty[this.propertyIndex]=t[e],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(t,e){this.resolvedProperty[this.propertyIndex]=t[e],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(t,e){this.resolvedProperty.fromArray(t,e)}_setValue_fromArray_setNeedsUpdate(t,e){this.resolvedProperty.fromArray(t,e),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(t,e){this.resolvedProperty.fromArray(t,e),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(t,e){this.bind(),this.getValue(t,e)}_setValue_unbound(t,e){this.bind(),this.setValue(t,e)}bind(){let t=this.node,e=this.parsedPath,i=e.objectName,n=e.propertyName,s=e.propertyIndex;if(t||(t=r.findNode(this.rootNode,e.nodeName),this.node=t),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!t){Ht("PropertyBinding: No target node found for track: "+this.path+".");return}if(i){let c=e.objectIndex;switch(i){case"materials":if(!t.material){zt("PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!t.material.materials){zt("PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}t=t.material.materials;break;case"bones":if(!t.skeleton){zt("PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}t=t.skeleton.bones;for(let h=0;h<t.length;h++)if(t[h].name===c){c=h;break}break;case"map":if("map"in t){t=t.map;break}if(!t.material){zt("PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!t.material.map){zt("PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}t=t.material.map;break;default:if(t[i]===void 0){zt("PropertyBinding: Can not bind to objectName of node undefined.",this);return}t=t[i]}if(c!==void 0){if(t[c]===void 0){zt("PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,t);return}t=t[c]}}let o=t[n];if(o===void 0){let c=e.nodeName;zt("PropertyBinding: Trying to update property for track: "+c+"."+n+" but it wasn't found.",t);return}let a=this.Versioning.None;this.targetObject=t,t.isMaterial===!0?a=this.Versioning.NeedsUpdate:t.isObject3D===!0&&(a=this.Versioning.MatrixWorldNeedsUpdate);let l=this.BindingType.Direct;if(s!==void 0){if(n==="morphTargetInfluences"){if(!t.geometry){zt("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!t.geometry.morphAttributes){zt("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}t.morphTargetDictionary[s]!==void 0&&(s=t.morphTargetDictionary[s])}l=this.BindingType.ArrayElement,this.resolvedProperty=o,this.propertyIndex=s}else o.fromArray!==void 0&&o.toArray!==void 0?(l=this.BindingType.HasFromToArray,this.resolvedProperty=o):Array.isArray(o)?(l=this.BindingType.EntireArray,this.resolvedProperty=o):this.propertyName=n;this.getValue=this.GetterByBindingType[l],this.setValue=this.SetterByBindingTypeAndVersioning[l][a]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}};be.Composite=zc;be.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};be.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};be.prototype.GetterByBindingType=[be.prototype._getValue_direct,be.prototype._getValue_array,be.prototype._getValue_arrayElement,be.prototype._getValue_toArray];be.prototype.SetterByBindingTypeAndVersioning=[[be.prototype._setValue_direct,be.prototype._setValue_direct_setNeedsUpdate,be.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[be.prototype._setValue_array,be.prototype._setValue_array_setNeedsUpdate,be.prototype._setValue_array_setMatrixWorldNeedsUpdate],[be.prototype._setValue_arrayElement,be.prototype._setValue_arrayElement_setNeedsUpdate,be.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[be.prototype._setValue_fromArray,be.prototype._setValue_fromArray_setNeedsUpdate,be.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];var A_=new Float32Array(1);var xh=class xh{constructor(t,e,i,n){this.elements=[1,0,0,1],t!==void 0&&this.set(t,e,i,n)}identity(){return this.set(1,0,0,1),this}fromArray(t,e=0){for(let i=0;i<4;i++)this.elements[i]=t[i+e];return this}set(t,e,i,n){let s=this.elements;return s[0]=t,s[2]=e,s[1]=i,s[3]=n,this}};xh.prototype.isMatrix2=!0;var Hc=xh;function dh(r,t,e,i){let n=Gp(i);switch(e){case rh:return r*t;case Oa:return r*t/n.components*n.byteLength;case Ba:return r*t/n.components*n.byteLength;case qn:return r*t*2/n.components*n.byteLength;case ka:return r*t*2/n.components*n.byteLength;case oh:return r*t*3/n.components*n.byteLength;case xi:return r*t*4/n.components*n.byteLength;case za:return r*t*4/n.components*n.byteLength;case Qr:case to:return Math.floor((r+3)/4)*Math.floor((t+3)/4)*8;case eo:case io:return Math.floor((r+3)/4)*Math.floor((t+3)/4)*16;case Va:case Wa:return Math.max(r,16)*Math.max(t,8)/4;case Ha:case Ga:return Math.max(r,8)*Math.max(t,8)/2;case Xa:case qa:case $a:case Za:return Math.floor((r+3)/4)*Math.floor((t+3)/4)*8;case Ya:case no:case ja:return Math.floor((r+3)/4)*Math.floor((t+3)/4)*16;case Ja:return Math.floor((r+3)/4)*Math.floor((t+3)/4)*16;case Ka:return Math.floor((r+4)/5)*Math.floor((t+3)/4)*16;case Qa:return Math.floor((r+4)/5)*Math.floor((t+4)/5)*16;case tl:return Math.floor((r+5)/6)*Math.floor((t+4)/5)*16;case el:return Math.floor((r+5)/6)*Math.floor((t+5)/6)*16;case il:return Math.floor((r+7)/8)*Math.floor((t+4)/5)*16;case nl:return Math.floor((r+7)/8)*Math.floor((t+5)/6)*16;case sl:return Math.floor((r+7)/8)*Math.floor((t+7)/8)*16;case rl:return Math.floor((r+9)/10)*Math.floor((t+4)/5)*16;case ol:return Math.floor((r+9)/10)*Math.floor((t+5)/6)*16;case al:return Math.floor((r+9)/10)*Math.floor((t+7)/8)*16;case ll:return Math.floor((r+9)/10)*Math.floor((t+9)/10)*16;case cl:return Math.floor((r+11)/12)*Math.floor((t+9)/10)*16;case hl:return Math.floor((r+11)/12)*Math.floor((t+11)/12)*16;case ul:case dl:case fl:return Math.ceil(r/4)*Math.ceil(t/4)*16;case pl:case ml:return Math.ceil(r/4)*Math.ceil(t/4)*8;case so:case gl:return Math.ceil(r/4)*Math.ceil(t/4)*16}throw new Error(`Unable to determine texture byte length for ${e} format.`)}function Gp(r){switch(r){case gi:case eh:return{byteLength:1,components:1};case tr:case ih:case Gi:return{byteLength:2,components:1};case Ua:case Fa:return{byteLength:2,components:4};case Vi:case Na:case Pi:return{byteLength:4,components:1};case nh:case sh:return{byteLength:4,components:3}}throw new Error(`THREE.TextureUtils: Unknown texture type ${r}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:"186"}}));typeof window<"u"&&(window.__THREE__?Ht("WARNING: Multiple instances of Three.js being imported."):window.__THREE__="186");function zd(){let r=null,t=!1,e=null,i=null;function n(s,o){i=r.requestAnimationFrame(n),e(s,o)}return{start:function(){t!==!0&&e!==null&&r!==null&&(i=r.requestAnimationFrame(n),t=!0)},stop:function(){r!==null&&r.cancelAnimationFrame(i),t=!1},setAnimationLoop:function(s){e=s},setContext:function(s){r=s}}}function Xp(r){let t=new WeakMap;function e(a,l){let c=a.array,h=a.usage,u=c.byteLength,d=r.createBuffer();r.bindBuffer(l,d),r.bufferData(l,c,h),a.onUploadCallback();let f;if(c instanceof Float32Array)f=r.FLOAT;else if(typeof Float16Array<"u"&&c instanceof Float16Array)f=r.HALF_FLOAT;else if(c instanceof Uint16Array)a.isFloat16BufferAttribute?f=r.HALF_FLOAT:f=r.UNSIGNED_SHORT;else if(c instanceof Int16Array)f=r.SHORT;else if(c instanceof Uint32Array)f=r.UNSIGNED_INT;else if(c instanceof Int32Array)f=r.INT;else if(c instanceof Int8Array)f=r.BYTE;else if(c instanceof Uint8Array)f=r.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)f=r.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:d,type:f,bytesPerElement:c.BYTES_PER_ELEMENT,version:a.version,size:u}}function i(a,l,c){let h=l.array,u=l.updateRanges;if(r.bindBuffer(c,a),u.length===0)r.bufferSubData(c,0,h);else{u.sort((f,g)=>f.start-g.start);let d=0;for(let f=1;f<u.length;f++){let g=u[d],x=u[f];x.start<=g.start+g.count+1?g.count=Math.max(g.count,x.start+x.count-g.start):(++d,u[d]=x)}u.length=d+1;for(let f=0,g=u.length;f<g;f++){let x=u[f];r.bufferSubData(c,x.start*h.BYTES_PER_ELEMENT,h,x.start,x.count)}l.clearUpdateRanges()}l.onUploadCallback()}function n(a){return a.isInterleavedBufferAttribute&&(a=a.data),t.get(a)}function s(a){a.isInterleavedBufferAttribute&&(a=a.data);let l=t.get(a);l&&(r.deleteBuffer(l.buffer),t.delete(a))}function o(a,l){if(a.isInterleavedBufferAttribute&&(a=a.data),a.isGLBufferAttribute){let h=t.get(a);(!h||h.version<a.version)&&t.set(a,{buffer:a.buffer,type:a.type,bytesPerElement:a.elementSize,version:a.version});return}let c=t.get(a);if(c===void 0)t.set(a,e(a,l));else if(c.version<a.version){if(c.size!==a.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");i(c.buffer,a,l),c.version=a.version}}return{get:n,remove:s,update:o}}var qp=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,Yp=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,$p=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,Zp=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,jp=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,Jp=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,Kp=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,Qp=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,t0=`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec4 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 );
	}
#endif`,e0=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,i0=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,n0=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,s0=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,r0=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,o0=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,a0=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,l0=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,c0=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,h0=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,u0=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,d0=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,f0=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,p0=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec4( 1.0 );
#endif
#ifdef USE_COLOR_ALPHA
	vColor *= color;
#elif defined( USE_COLOR )
	vColor.rgb *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.rgb *= instanceColor.rgb;
#endif
#ifdef USE_BATCHING_COLOR
	vColor *= getBatchingColor( getIndirectIndex( gl_DrawID ) );
#endif`,m0=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
#define inverseTransformDirection transformDirectionByInverseViewMatrix
vec3 transformNormalByInverseViewMatrix( in vec3 normal, in mat4 viewMatrix ) {
	return normalize( ( vec4( normal, 0.0 ) * viewMatrix ).xyz );
}
vec3 transformDirectionByInverseViewMatrix( in vec3 dir, in mat4 viewMatrix ) {
	return normalize( ( vec4( dir, 0.0 ) * viewMatrix ).xyz );
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,g0=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,x0=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
#endif`,y0=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,_0=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,v0=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,M0=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,b0="gl_FragColor = linearToOutputTexel( gl_FragColor );",S0=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,w0=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * reflectVec );
		#ifdef ENVMAP_BLENDING_MULTIPLY
			outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_MIX )
			outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_ADD )
			outgoingLight += envColor.xyz * specularStrength * reflectivity;
		#endif
	#endif
#endif`,E0=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
#endif`,T0=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,A0=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,R0=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = transformNormalByInverseViewMatrix( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,C0=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,P0=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,I0=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,L0=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,D0=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,N0=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,U0=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,F0=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,O0=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_SUN_LIGHTS > 0
	struct SunLight {
		vec3 direction;
		vec3 color;
	};
	uniform SunLight sunLights[ NUM_SUN_LIGHTS ];
	void getSunLightInfo( const in SunLight sunLight, out IncidentLight light ) {
		light.color = sunLight.color;
		light.direction = sunLight.direction;
		light.visible = true;
	}
#endif
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif
#include <lightprobes_pars_fragment>`,B0=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, pow4( roughness ) ) );
			reflectVec = transformDirectionByInverseViewMatrix( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_RETROREFLECTION
		vec3 getIBLRetroRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 retroVec = normalize( mix( viewDir, normal, pow4( roughness ) ) );
				retroVec = transformDirectionByInverseViewMatrix( retroVec, viewMatrix );
				vec4 envMapColor = textureCubeUV( envMap, envMapRotation * retroVec, roughness );
				return envMapColor.rgb * envMapIntensity;
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
		#ifdef USE_RETROREFLECTION
			vec3 getIBLAnisotropyRetroRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
				#ifdef ENVMAP_TYPE_CUBE_UV
					vec3 bentNormal = cross( bitangent, viewDir );
					bentNormal = normalize( cross( bentNormal, bitangent ) );
					bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
					return getIBLRetroRadiance( viewDir, bentNormal, roughness );
				#else
					return vec3( 0.0 );
				#endif
			}
		#endif
	#endif
#endif`,k0=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,z0=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,H0=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,V0=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,G0=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.diffuseContribution = diffuseColor.rgb * ( 1.0 - metalnessFactor );
material.metalness = metalnessFactor;
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor;
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = vec3( 0.04 );
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_RETROREFLECTION
	material.retroreflectivity = retroreflectivity;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.0001, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,W0=`uniform sampler2D dfgLUT;
struct PhysicalMaterial {
	vec3 diffuseColor;
	vec3 diffuseContribution;
	vec3 specularColor;
	vec3 specularColorBlended;
	float roughness;
	float metalness;
	float specularF90;
	float dispersion;
	vec2 dfg;
	vec3 multiScatteringCompensation;
	#ifdef USE_RETROREFLECTION
		float retroreflectivity;
	#endif
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0Dielectric;
		vec3 iridescenceF0Metallic;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		return 0.5 / max( gv + gl, EPSILON );
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColorBlended;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transpose( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float rInv = 1.0 / ( roughness + 0.1 );
	float a = -1.9362 + 1.0678 * roughness + 0.4573 * r2 - 0.8469 * rInv;
	float b = -0.6014 + 0.5538 * roughness - 0.4670 * r2 - 0.1255 * rInv;
	float DG = exp( a * dotNV + b );
	return saturate( DG );
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 fab = texture2D( dfgLUT, vec2( roughness, dotNV ) ).rg;
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec2 fab, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec2 fab, const in vec3 specularColor, const in float specularF90, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColorBlended * t2.x + ( material.specularF90 - material.specularColorBlended ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseContribution * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
		#ifdef USE_CLEARCOAT
			vec3 Ncc = geometryClearcoatNormal;
			vec2 uvClearcoat = LTC_Uv( Ncc, viewDir, material.clearcoatRoughness );
			vec4 t1Clearcoat = texture2D( ltc_1, uvClearcoat );
			vec4 t2Clearcoat = texture2D( ltc_2, uvClearcoat );
			mat3 mInvClearcoat = mat3(
				vec3( t1Clearcoat.x, 0, t1Clearcoat.y ),
				vec3(             0, 1,             0 ),
				vec3( t1Clearcoat.z, 0, t1Clearcoat.w )
			);
			vec3 fresnelClearcoat = material.clearcoatF0 * t2Clearcoat.x + ( material.clearcoatF90 - material.clearcoatF0 ) * t2Clearcoat.y;
			clearcoatSpecularDirect += lightColor * fresnelClearcoat * LTC_Evaluate( Ncc, viewDir, position, mInvClearcoat, rectCoords );
		#endif
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
 
 		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
 
 		float sheenAlbedoV = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
 		float sheenAlbedoL = IBLSheenBRDF( geometryNormal, directLight.direction, material.sheenRoughness );
 
 		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * max( sheenAlbedoV, sheenAlbedoL );
 
 		irradiance *= sheenEnergyComp;
 
 	#endif
	vec3 specularBRDF = BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	#ifdef USE_RETROREFLECTION
		vec3 retroViewDir = reflect( - geometryViewDir, geometryNormal );
		vec3 retroSpecularBRDF = BRDF_GGX( directLight.direction, retroViewDir, geometryNormal, material );
		specularBRDF = mix( specularBRDF, retroSpecularBRDF, saturate( material.retroreflectivity ) );
	#endif
	reflectedLight.directSpecular += irradiance * specularBRDF * material.multiScatteringCompensation;
	vec3 halfDir = normalize( directLight.direction + geometryViewDir );
	float dotVH = saturate( dot( geometryViewDir, halfDir ) );
	vec3 F = F_Schlick( material.specularColor, material.specularF90, dotVH );
	#ifdef USE_RETROREFLECTION
		vec3 retroHalfDir = normalize( directLight.direction + retroViewDir );
		float dotRetroVH = saturate( dot( retroViewDir, retroHalfDir ) );
		vec3 retroF = F_Schlick( material.specularColor, material.specularF90, dotRetroVH );
		F = mix( F, retroF, saturate( material.retroreflectivity ) );
	#endif
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseContribution ) * ( 1.0 - F );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( material.dfg, material.specularColor, material.specularF90, material.iridescence, material.iridescenceF0Dielectric, singleScattering, multiScattering );
	#else
		computeMultiscattering( material.dfg, material.specularColor, material.specularF90, singleScattering, multiScattering );
	#endif
	vec3 diffuse = irradiance * BRDF_Lambert( material.diffuseContribution ) * ( 1.0 - singleScattering - multiScattering );
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		sheenSpecularIndirect += irradiance * material.sheenColor * sheenAlbedo * RECIPROCAL_PI;
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		diffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectDiffuse += diffuse;
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness ) * RECIPROCAL_PI;
 	#endif
	vec3 singleScatteringDielectric = vec3( 0.0 );
	vec3 multiScatteringDielectric = vec3( 0.0 );
	vec3 singleScatteringMetallic = vec3( 0.0 );
	vec3 multiScatteringMetallic = vec3( 0.0 );
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( material.dfg, material.specularColor, material.specularF90, material.iridescence, material.iridescenceF0Dielectric, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscatteringIridescence( material.dfg, material.diffuseColor, material.specularF90, material.iridescence, material.iridescenceF0Metallic, singleScatteringMetallic, multiScatteringMetallic );
	#else
		computeMultiscattering( material.dfg, material.specularColor, material.specularF90, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscattering( material.dfg, material.diffuseColor, material.specularF90, singleScatteringMetallic, multiScatteringMetallic );
	#endif
	vec3 singleScattering = mix( singleScatteringDielectric, singleScatteringMetallic, material.metalness );
	vec3 multiScattering = mix( multiScatteringDielectric, multiScatteringMetallic, material.metalness );
	vec3 totalScatteringDielectric = singleScatteringDielectric + multiScatteringDielectric;
	vec3 diffuse = material.diffuseContribution * ( 1.0 - totalScatteringDielectric );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	vec3 indirectSpecular = radiance * singleScattering;
	indirectSpecular += multiScattering * cosineWeightedIrradiance;
	vec3 indirectDiffuse = diffuse * cosineWeightedIrradiance;
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		indirectSpecular *= sheenEnergyComp;
		indirectDiffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectSpecular += indirectSpecular;
	reflectedLight.indirectDiffuse += indirectDiffuse;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,X0=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		vec3 iridescenceFresnelDielectric = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		vec3 iridescenceFresnelMetallic = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.diffuseColor );
		material.iridescenceFresnel = mix( iridescenceFresnelDielectric, iridescenceFresnelMetallic, material.metalness );
		material.iridescenceF0Dielectric = Schlick_to_F0( iridescenceFresnelDielectric, 1.0, dotNVi );
		material.iridescenceF0Metallic = Schlick_to_F0( iridescenceFresnelMetallic, 1.0, dotNVi );
	}
#endif
#ifdef STANDARD
	float dotNVms = saturate( dot( geometryNormal, geometryViewDir ) );
	material.dfg = texture2D( dfgLUT, vec2( material.roughness, dotNVms ) ).rg;
	#if ( NUM_SUN_LIGHTS > 0 || NUM_DIR_LIGHTS > 0 || NUM_POINT_LIGHTS > 0 || NUM_SPOT_LIGHTS > 0 )
		float EssMs = material.dfg.x + material.dfg.y;
		material.multiScatteringCompensation = 1.0 + material.specularColorBlended * ( 1.0 / EssMs - 1.0 );
	#endif
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS ) && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SUN_LIGHTS > 0 ) && defined( RE_Direct )
	SunLight sunLight;
	#if defined( USE_SHADOWMAP ) && NUM_SUN_LIGHT_SHADOWS > 0
	SunLightShadow sunLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SUN_LIGHTS; i ++ ) {
		sunLight = sunLights[ i ];
		getSunLightInfo( sunLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SUN_LIGHT_SHADOWS )
		sunLightShadow = sunLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getSunShadow( sunShadowMap[ i ], sunLightShadow, UNROLLED_LOOP_INDEX ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
	#ifdef USE_LIGHT_PROBES_GRID
		vec3 probeWorldPos = ( ( vec4( geometryPosition, 1.0 ) - viewMatrix[ 3 ] ) * viewMatrix ).xyz;
		vec3 probeWorldNormal = transformNormalByInverseViewMatrix( geometryNormal, viewMatrix );
		irradiance += getLightProbeGridIrradiance( probeWorldPos, probeWorldNormal );
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,q0=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( ENVMAP_TYPE_CUBE_UV )
		#if defined( STANDARD ) || defined( LAMBERT ) || defined( PHONG )
			iblIrradiance += getIBLIrradiance( geometryNormal );
		#endif
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		vec3 iblRadiance = getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		vec3 iblRadiance = getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_RETROREFLECTION
		#ifdef USE_ANISOTROPY
			vec3 retroIBLRadiance = getIBLAnisotropyRetroRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
		#else
			vec3 retroIBLRadiance = getIBLRetroRadiance( geometryViewDir, geometryNormal, material.roughness );
		#endif
		iblRadiance = mix( iblRadiance, retroIBLRadiance, saturate( material.retroreflectivity ) );
	#endif
	radiance += iblRadiance;
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,Y0=`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,$0=`#ifdef USE_LIGHT_PROBES_GRID
uniform highp sampler3D probesSH;
uniform vec3 probesMin;
uniform vec3 probesMax;
uniform vec3 probesResolution;
vec3 getLightProbeGridIrradiance( vec3 worldPos, vec3 worldNormal ) {
	vec3 res = probesResolution;
	vec3 gridRange = probesMax - probesMin;
	vec3 resMinusOne = res - 1.0;
	vec3 probeSpacing = gridRange / resMinusOne;
	vec3 samplePos = worldPos + worldNormal * probeSpacing * 0.5;
	vec3 uvw = clamp( ( samplePos - probesMin ) / gridRange, 0.0, 1.0 );
	uvw = uvw * resMinusOne / res + 0.5 / res;
	float nz          = res.z;
	float paddedSlices = nz + 2.0;
	float atlasDepth  = 7.0 * paddedSlices;
	float uvZBase     = uvw.z * nz + 1.0;
	vec4 s0 = texture( probesSH, vec3( uvw.xy, ( uvZBase                       ) / atlasDepth ) );
	vec4 s1 = texture( probesSH, vec3( uvw.xy, ( uvZBase +       paddedSlices   ) / atlasDepth ) );
	vec4 s2 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 2.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s3 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 3.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s4 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 4.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s5 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 5.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s6 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 6.0 * paddedSlices   ) / atlasDepth ) );
	vec3 c0 = s0.xyz;
	vec3 c1 = vec3( s0.w, s1.xy );
	vec3 c2 = vec3( s1.zw, s2.x );
	vec3 c3 = s2.yzw;
	vec3 c4 = s3.xyz;
	vec3 c5 = vec3( s3.w, s4.xy );
	vec3 c6 = vec3( s4.zw, s5.x );
	vec3 c7 = s5.yzw;
	vec3 c8 = s6.xyz;
	float x = worldNormal.x, y = worldNormal.y, z = worldNormal.z;
	vec3 result = c0 * 0.886227;
	result += c1 * 2.0 * 0.511664 * y;
	result += c2 * 2.0 * 0.511664 * z;
	result += c3 * 2.0 * 0.511664 * x;
	result += c4 * 2.0 * 0.429043 * x * y;
	result += c5 * 2.0 * 0.429043 * y * z;
	result += c6 * ( 0.743125 * z * z - 0.247708 );
	result += c7 * 2.0 * 0.429043 * x * z;
	result += c8 * 0.429043 * ( x * x - y * y );
	return max( result, vec3( 0.0 ) );
}
#endif`,Z0=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,j0=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,J0=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,K0=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,Q0=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,tm=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,em=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,im=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,nm=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,sm=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,rm=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,om=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,am=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,lm=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,cm=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,hm=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#ifdef DOUBLE_SIDED
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#ifdef DOUBLE_SIDED
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,um=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#if defined( USE_PACKED_NORMALMAP )
		mapN = vec3( mapN.xy, sqrt( saturate( 1.0 - dot( mapN.xy, mapN.xy ) ) ) );
	#endif
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,dm=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,fm=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,pm=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
		#ifdef FLIP_SIDED
			vBitangent = - vBitangent;
		#endif
	#endif
#endif`,mm=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,gm=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,xm=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,ym=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,_m=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,vm=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,Mm=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	#ifdef USE_REVERSED_DEPTH_BUFFER
	
		return depth * ( far - near ) - far;
	#else
		return depth * ( near - far ) - near;
	#endif
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	
	#ifdef USE_REVERSED_DEPTH_BUFFER
		return ( near * far ) / ( ( near - far ) * depth - near );
	#else
		return ( near * far ) / ( ( far - near ) * depth - far );
	#endif
}`,bm=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,Sm=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,wm=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,Em=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,Tm=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,Am=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,Rm=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
		#define SUN_LIGHT_CASCADES 2
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow sunShadowMap[ NUM_SUN_LIGHT_SHADOWS ];
		#else
			uniform sampler2D sunShadowMap[ NUM_SUN_LIGHT_SHADOWS ];
		#endif
		uniform mat4 sunShadowMatrix[ NUM_SUN_LIGHT_SHADOWS * SUN_LIGHT_CASCADES ];
		uniform vec4 sunShadowCascade[ NUM_SUN_LIGHT_SHADOWS * SUN_LIGHT_CASCADES ];
		varying vec4 vSunShadowWorldPosition;
		varying vec3 vSunShadowWorldNormal;
		struct SunLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SunLightShadow sunLightShadows[ NUM_SUN_LIGHT_SHADOWS ];
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#else
			uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#endif
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#else
			uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#endif
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform samplerCubeShadow pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#elif defined( SHADOWMAP_TYPE_BASIC )
			uniform samplerCube pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#endif
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float interleavedGradientNoise( vec2 position ) {
			return fract( 52.9829189 * fract( dot( position, vec2( 0.06711056, 0.00583715 ) ) ) );
		}
		vec2 vogelDiskSample( int sampleIndex, int samplesCount, float phi ) {
			const float goldenAngle = 2.399963229728653;
			float r = sqrt( ( float( sampleIndex ) + 0.5 ) / float( samplesCount ) );
			float theta = float( sampleIndex ) * goldenAngle + phi;
			return vec2( cos( theta ), sin( theta ) ) * r;
		}
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float getShadow( sampler2DShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			shadowCoord.z += shadowBias;
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
				float radius = shadowRadius * texelSize.x;
				float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
				shadow = (
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 0, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 1, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 2, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 3, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 4, 5, phi ) * radius, shadowCoord.z ) )
				) * 0.2;
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#elif defined( SHADOWMAP_TYPE_VSM )
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 distribution = texture2D( shadowMap, shadowCoord.xy ).rg;
				float mean = distribution.x;
				float variance = distribution.y * distribution.y;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					float hard_shadow = step( mean, shadowCoord.z );
				#else
					float hard_shadow = step( shadowCoord.z, mean );
				#endif
				
				if ( hard_shadow == 1.0 ) {
					shadow = 1.0;
				} else {
					variance = max( variance, 0.0000001 );
					float d = shadowCoord.z - mean;
					float p_max = variance / ( variance + d * d );
					p_max = clamp( ( p_max - 0.3 ) / 0.65, 0.0, 1.0 );
					shadow = max( hard_shadow, p_max );
				}
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#else
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				float depth = texture2D( shadowMap, shadowCoord.xy ).r;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					shadow = step( depth, shadowCoord.z );
				#else
					shadow = step( shadowCoord.z, depth );
				#endif
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#endif
	#if NUM_SUN_LIGHT_SHADOWS > 0
		float getSunShadow(
			#if defined( SHADOWMAP_TYPE_PCF )
				sampler2DShadow shadowMap,
			#else
				sampler2D shadowMap,
			#endif
			SunLightShadow sunLightShadow,
			int shadowIndex
		) {
			vec4 shadowWorldPosition = vec4( vSunShadowWorldPosition.xyz + vSunShadowWorldNormal * sunLightShadow.shadowNormalBias, 1.0 );
			float viewDepth = vSunShadowWorldPosition.w;
			int cascadeOffset = shadowIndex * SUN_LIGHT_CASCADES;
			float shadow = 1.0;
			for ( int i = SUN_LIGHT_CASCADES - 1; i >= 0; i -- ) {
				vec4 cascade = sunShadowCascade[ cascadeOffset + i ];
				if ( viewDepth >= cascade.x && viewDepth < cascade.y ) {
					float cascadeShadow = getShadow(
						shadowMap,
						sunLightShadow.shadowMapSize,
						sunLightShadow.shadowIntensity,
						sunLightShadow.shadowBias,
						sunLightShadow.shadowRadius,
						sunShadowMatrix[ cascadeOffset + i ] * shadowWorldPosition
					);
					shadow = mix( cascadeShadow, shadow, smoothstep( cascade.z, cascade.y, viewDepth ) );
				}
			}
			return shadow;
		}
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	#if defined( SHADOWMAP_TYPE_PCF )
	float getPointShadow( samplerCubeShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 bd3D = normalize( lightToPosition );
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			#ifdef USE_REVERSED_DEPTH_BUFFER
				float dp = ( shadowCameraNear * ( shadowCameraFar - viewSpaceZ ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
				dp -= shadowBias;
			#else
				float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
				dp += shadowBias;
			#endif
			float texelSize = shadowRadius / shadowMapSize.x;
			vec3 absDir = abs( bd3D );
			vec3 tangent = absDir.x > absDir.z ? vec3( 0.0, 1.0, 0.0 ) : vec3( 1.0, 0.0, 0.0 );
			tangent = normalize( cross( bd3D, tangent ) );
			vec3 bitangent = cross( bd3D, tangent );
			float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
			vec2 sample0 = vogelDiskSample( 0, 5, phi );
			vec2 sample1 = vogelDiskSample( 1, 5, phi );
			vec2 sample2 = vogelDiskSample( 2, 5, phi );
			vec2 sample3 = vogelDiskSample( 3, 5, phi );
			vec2 sample4 = vogelDiskSample( 4, 5, phi );
			shadow = (
				texture( shadowMap, vec4( bd3D + ( tangent * sample0.x + bitangent * sample0.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample1.x + bitangent * sample1.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample2.x + bitangent * sample2.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample3.x + bitangent * sample3.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample4.x + bitangent * sample4.y ) * texelSize, dp ) )
			) * 0.2;
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#elif defined( SHADOWMAP_TYPE_BASIC )
	float getPointShadow( samplerCube shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			float depth = textureCube( shadowMap, bd3D ).r;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				depth = 1.0 - depth;
			#endif
			shadow = step( dp, depth );
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#endif
	#endif
#endif`,Cm=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
		varying vec4 vSunShadowWorldPosition;
		varying vec3 vSunShadowWorldNormal;
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,Pm=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_SUN_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	#ifdef HAS_NORMAL
		vec3 shadowWorldNormal = transformNormalByInverseViewMatrix( transformedNormal, viewMatrix );
	#else
		vec3 shadowWorldNormal = vec3( 0.0 );
	#endif
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_SUN_LIGHT_SHADOWS > 0
		vSunShadowWorldPosition = vec4( worldPosition.xyz, - mvPosition.z );
		vSunShadowWorldNormal = shadowWorldNormal;
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,Im=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
	SunLightShadow sunLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SUN_LIGHT_SHADOWS; i ++ ) {
		sunLight = sunLightShadows[ i ];
		shadow *= receiveShadow ? getSunShadow( sunShadowMap[ i ], sunLight, UNROLLED_LOOP_INDEX ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0 && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,Lm=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,Dm=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,Nm=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,Um=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,Fm=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,Om=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,Bm=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,km=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,zm=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = transformNormalByInverseViewMatrix( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseContribution, material.specularColorBlended, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,Hm=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		#else
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,Vm=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,Gm=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,Wm=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,Xm=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`,qm=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,Ym=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,$m=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Zm=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vWorldDirection );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,jm=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Jm=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Km=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,Qm=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	#ifdef USE_REVERSED_DEPTH_BUFFER
		float fragCoordZ = vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ];
	#else
		float fragCoordZ = 0.5 * vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ] + 0.5;
	#endif
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,tg=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,eg=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = vec4( dist, 0.0, 0.0, 1.0 );
}`,ig=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,ng=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,sg=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,rg=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,og=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,ag=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,lg=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,cg=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,hg=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,ug=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,dg=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,fg=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( normalize( normal ) * 0.5 + 0.5, diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,pg=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,mg=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,gg=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,xg=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_RETROREFLECTION
	uniform float retroreflectivity;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
 
		outgoingLight = outgoingLight + sheenSpecularDirect + sheenSpecularIndirect;
 
 	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,yg=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,_g=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,vg=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,Mg=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,bg=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Sg=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,wg=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,Eg=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,$t={alphahash_fragment:qp,alphahash_pars_fragment:Yp,alphamap_fragment:$p,alphamap_pars_fragment:Zp,alphatest_fragment:jp,alphatest_pars_fragment:Jp,aomap_fragment:Kp,aomap_pars_fragment:Qp,batching_pars_vertex:t0,batching_vertex:e0,begin_vertex:i0,beginnormal_vertex:n0,bsdfs:s0,iridescence_fragment:r0,bumpmap_pars_fragment:o0,clipping_planes_fragment:a0,clipping_planes_pars_fragment:l0,clipping_planes_pars_vertex:c0,clipping_planes_vertex:h0,color_fragment:u0,color_pars_fragment:d0,color_pars_vertex:f0,color_vertex:p0,common:m0,cube_uv_reflection_fragment:g0,defaultnormal_vertex:x0,displacementmap_pars_vertex:y0,displacementmap_vertex:_0,emissivemap_fragment:v0,emissivemap_pars_fragment:M0,colorspace_fragment:b0,colorspace_pars_fragment:S0,envmap_fragment:w0,envmap_common_pars_fragment:E0,envmap_pars_fragment:T0,envmap_pars_vertex:A0,envmap_physical_pars_fragment:B0,envmap_vertex:R0,fog_vertex:C0,fog_pars_vertex:P0,fog_fragment:I0,fog_pars_fragment:L0,gradientmap_pars_fragment:D0,lightmap_pars_fragment:N0,lights_lambert_fragment:U0,lights_lambert_pars_fragment:F0,lights_pars_begin:O0,lights_toon_fragment:k0,lights_toon_pars_fragment:z0,lights_phong_fragment:H0,lights_phong_pars_fragment:V0,lights_physical_fragment:G0,lights_physical_pars_fragment:W0,lights_fragment_begin:X0,lights_fragment_maps:q0,lights_fragment_end:Y0,lightprobes_pars_fragment:$0,logdepthbuf_fragment:Z0,logdepthbuf_pars_fragment:j0,logdepthbuf_pars_vertex:J0,logdepthbuf_vertex:K0,map_fragment:Q0,map_pars_fragment:tm,map_particle_fragment:em,map_particle_pars_fragment:im,metalnessmap_fragment:nm,metalnessmap_pars_fragment:sm,morphinstance_vertex:rm,morphcolor_vertex:om,morphnormal_vertex:am,morphtarget_pars_vertex:lm,morphtarget_vertex:cm,normal_fragment_begin:hm,normal_fragment_maps:um,normal_pars_fragment:dm,normal_pars_vertex:fm,normal_vertex:pm,normalmap_pars_fragment:mm,clearcoat_normal_fragment_begin:gm,clearcoat_normal_fragment_maps:xm,clearcoat_pars_fragment:ym,iridescence_pars_fragment:_m,opaque_fragment:vm,packing:Mm,premultiplied_alpha_fragment:bm,project_vertex:Sm,dithering_fragment:wm,dithering_pars_fragment:Em,roughnessmap_fragment:Tm,roughnessmap_pars_fragment:Am,shadowmap_pars_fragment:Rm,shadowmap_pars_vertex:Cm,shadowmap_vertex:Pm,shadowmask_pars_fragment:Im,skinbase_vertex:Lm,skinning_pars_vertex:Dm,skinning_vertex:Nm,skinnormal_vertex:Um,specularmap_fragment:Fm,specularmap_pars_fragment:Om,tonemapping_fragment:Bm,tonemapping_pars_fragment:km,transmission_fragment:zm,transmission_pars_fragment:Hm,uv_pars_fragment:Vm,uv_pars_vertex:Gm,uv_vertex:Wm,worldpos_vertex:Xm,background_vert:qm,background_frag:Ym,backgroundCube_vert:$m,backgroundCube_frag:Zm,cube_vert:jm,cube_frag:Jm,depth_vert:Km,depth_frag:Qm,distance_vert:tg,distance_frag:eg,equirect_vert:ig,equirect_frag:ng,linedashed_vert:sg,linedashed_frag:rg,meshbasic_vert:og,meshbasic_frag:ag,meshlambert_vert:lg,meshlambert_frag:cg,meshmatcap_vert:hg,meshmatcap_frag:ug,meshnormal_vert:dg,meshnormal_frag:fg,meshphong_vert:pg,meshphong_frag:mg,meshphysical_vert:gg,meshphysical_frag:xg,meshtoon_vert:yg,meshtoon_frag:_g,points_vert:vg,points_frag:Mg,shadow_vert:bg,shadow_frag:Sg,sprite_vert:wg,sprite_frag:Eg},xt={common:{diffuse:{value:new It(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Gt},alphaMap:{value:null},alphaMapTransform:{value:new Gt},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Gt}},envmap:{envMap:{value:null},envMapRotation:{value:new Gt},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Gt}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Gt}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Gt},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Gt},normalScale:{value:new Vt(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Gt},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Gt}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Gt}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Gt}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new It(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},sunLights:{value:[],properties:{direction:{},color:{}}},sunLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},sunShadowMatrix:{value:[]},sunShadowCascade:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null},probesSH:{value:null},probesMin:{value:new L},probesMax:{value:new L},probesResolution:{value:new L}},points:{diffuse:{value:new It(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Gt},alphaTest:{value:0},uvTransform:{value:new Gt}},sprite:{diffuse:{value:new It(16777215)},opacity:{value:1},center:{value:new Vt(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Gt},alphaMap:{value:null},alphaMapTransform:{value:new Gt},alphaTest:{value:0}}},hn={basic:{uniforms:oi([xt.common,xt.specularmap,xt.envmap,xt.aomap,xt.lightmap,xt.fog]),vertexShader:$t.meshbasic_vert,fragmentShader:$t.meshbasic_frag},lambert:{uniforms:oi([xt.common,xt.specularmap,xt.envmap,xt.aomap,xt.lightmap,xt.emissivemap,xt.bumpmap,xt.normalmap,xt.displacementmap,xt.fog,xt.lights,{emissive:{value:new It(0)},envMapIntensity:{value:1}}]),vertexShader:$t.meshlambert_vert,fragmentShader:$t.meshlambert_frag},phong:{uniforms:oi([xt.common,xt.specularmap,xt.envmap,xt.aomap,xt.lightmap,xt.emissivemap,xt.bumpmap,xt.normalmap,xt.displacementmap,xt.fog,xt.lights,{emissive:{value:new It(0)},specular:{value:new It(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:$t.meshphong_vert,fragmentShader:$t.meshphong_frag},standard:{uniforms:oi([xt.common,xt.envmap,xt.aomap,xt.lightmap,xt.emissivemap,xt.bumpmap,xt.normalmap,xt.displacementmap,xt.roughnessmap,xt.metalnessmap,xt.fog,xt.lights,{emissive:{value:new It(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:$t.meshphysical_vert,fragmentShader:$t.meshphysical_frag},toon:{uniforms:oi([xt.common,xt.aomap,xt.lightmap,xt.emissivemap,xt.bumpmap,xt.normalmap,xt.displacementmap,xt.gradientmap,xt.fog,xt.lights,{emissive:{value:new It(0)}}]),vertexShader:$t.meshtoon_vert,fragmentShader:$t.meshtoon_frag},matcap:{uniforms:oi([xt.common,xt.bumpmap,xt.normalmap,xt.displacementmap,xt.fog,{matcap:{value:null}}]),vertexShader:$t.meshmatcap_vert,fragmentShader:$t.meshmatcap_frag},points:{uniforms:oi([xt.points,xt.fog]),vertexShader:$t.points_vert,fragmentShader:$t.points_frag},dashed:{uniforms:oi([xt.common,xt.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:$t.linedashed_vert,fragmentShader:$t.linedashed_frag},depth:{uniforms:oi([xt.common,xt.displacementmap]),vertexShader:$t.depth_vert,fragmentShader:$t.depth_frag},normal:{uniforms:oi([xt.common,xt.bumpmap,xt.normalmap,xt.displacementmap,{opacity:{value:1}}]),vertexShader:$t.meshnormal_vert,fragmentShader:$t.meshnormal_frag},sprite:{uniforms:oi([xt.sprite,xt.fog]),vertexShader:$t.sprite_vert,fragmentShader:$t.sprite_frag},background:{uniforms:{uvTransform:{value:new Gt},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:$t.background_vert,fragmentShader:$t.background_frag},backgroundCube:{uniforms:{envMap:{value:null},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Gt}},vertexShader:$t.backgroundCube_vert,fragmentShader:$t.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:$t.cube_vert,fragmentShader:$t.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:$t.equirect_vert,fragmentShader:$t.equirect_frag},distance:{uniforms:oi([xt.common,xt.displacementmap,{referencePosition:{value:new L},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:$t.distance_vert,fragmentShader:$t.distance_frag},shadow:{uniforms:oi([xt.lights,xt.fog,{color:{value:new It(0)},opacity:{value:1}}]),vertexShader:$t.shadow_vert,fragmentShader:$t.shadow_frag}};hn.physical={uniforms:oi([hn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Gt},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Gt},clearcoatNormalScale:{value:new Vt(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Gt},dispersion:{value:0},retroreflectivity:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Gt},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Gt},sheen:{value:0},sheenColor:{value:new It(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Gt},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Gt},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Gt},transmissionSamplerSize:{value:new Vt},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Gt},attenuationDistance:{value:0},attenuationColor:{value:new It(0)},specularColor:{value:new It(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Gt},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Gt},anisotropyVector:{value:new Vt},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Gt}}]),vertexShader:$t.meshphysical_vert,fragmentShader:$t.meshphysical_frag};var vl={r:0,b:0,g:0},Tg=new fe,Hd=new Gt;Hd.set(-1,0,0,0,1,0,0,0,1);function Ag(r,t,e,i,n,s){let o=new It(0),a=n===!0?0:1,l,c,h=null,u=0,d=null;function f(y){let M=y.isScene===!0?y.background:null;if(M&&M.isTexture){let _=y.backgroundBlurriness>0;M=t.get(M,_)}return M}function g(y){let M=!1,_=f(y);_===null?m(o,a):_&&_.isColor&&(m(_,1),M=!0);let v=r.xr.getEnvironmentBlendMode();v==="additive"?e.buffers.color.setClear(0,0,0,1,s):v==="alpha-blend"&&e.buffers.color.setClear(0,0,0,0,s),(r.autoClear||M)&&(e.buffers.depth.setTest(!0),e.buffers.depth.setMask(!0),e.buffers.color.setMask(!0),r.clear(r.autoClearColor,r.autoClearDepth,r.autoClearStencil))}function x(y,M){let _=f(M);_&&(_.isCubeTexture||_.mapping===Jr)?(c===void 0&&(c=new Et(new ri(1,1,1),new Ze({name:"BackgroundCubeMaterial",uniforms:ds(hn.backgroundCube.uniforms),vertexShader:hn.backgroundCube.vertexShader,fragmentShader:hn.backgroundCube.fragmentShader,side:je,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),c.geometry.deleteAttribute("uv"),c.onBeforeRender=function(v,S,T){this.matrixWorld.copyPosition(T.matrixWorld)},Object.defineProperty(c.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),i.update(c)),c.material.uniforms.envMap.value=_,c.material.uniforms.backgroundBlurriness.value=M.backgroundBlurriness,c.material.uniforms.backgroundIntensity.value=M.backgroundIntensity,c.material.uniforms.backgroundRotation.value.setFromMatrix4(Tg.makeRotationFromEuler(M.backgroundRotation)).transpose(),_.isCubeTexture&&_.isRenderTargetTexture===!1&&c.material.uniforms.backgroundRotation.value.premultiply(Hd),c.material.toneMapped=Kt.getTransfer(_.colorSpace)!==le,(h!==_||u!==_.version||d!==r.toneMapping)&&(c.material.needsUpdate=!0,h=_,u=_.version,d=r.toneMapping),c.layers.enableAll(),y.unshift(c,c.geometry,c.material,0,0,null)):_&&_.isTexture&&(l===void 0&&(l=new Et(new Ri(2,2),new Ze({name:"BackgroundMaterial",uniforms:ds(hn.background.uniforms),vertexShader:hn.background.vertexShader,fragmentShader:hn.background.fragmentShader,side:rn,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute("normal"),Object.defineProperty(l.material,"map",{get:function(){return this.uniforms.t2D.value}}),i.update(l)),l.material.uniforms.t2D.value=_,l.material.uniforms.backgroundIntensity.value=M.backgroundIntensity,l.material.toneMapped=Kt.getTransfer(_.colorSpace)!==le,_.matrixAutoUpdate===!0&&_.updateMatrix(),l.material.uniforms.uvTransform.value.copy(_.matrix),(h!==_||u!==_.version||d!==r.toneMapping)&&(l.material.needsUpdate=!0,h=_,u=_.version,d=r.toneMapping),l.layers.enableAll(),y.unshift(l,l.geometry,l.material,0,0,null))}function m(y,M){y.getRGB(vl,ch(r)),e.buffers.color.setClear(vl.r,vl.g,vl.b,M,s)}function p(){c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0),l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0)}return{getClearColor:function(){return o},setClearColor:function(y,M=1){o.set(y),a=M,m(o,a)},getClearAlpha:function(){return a},setClearAlpha:function(y){a=y,m(o,a)},render:g,addToRenderList:x,dispose:p}}function Rg(r,t){let e=r.getParameter(r.MAX_VERTEX_ATTRIBS),i={},n=d(null),s=n,o=!1;function a(I,U,N,C,D){let k=!1,z=u(I,C,N,U);s!==z&&(s=z,c(s.object)),k=f(I,C,N,D),k&&g(I,C,N,D),D!==null&&t.update(D,r.ELEMENT_ARRAY_BUFFER),(k||o)&&(o=!1,_(I,U,N,C),D!==null&&r.bindBuffer(r.ELEMENT_ARRAY_BUFFER,t.get(D).buffer))}function l(){return r.createVertexArray()}function c(I){return r.bindVertexArray(I)}function h(I){return r.deleteVertexArray(I)}function u(I,U,N,C){let D=C.wireframe===!0,k=i[U.id];k===void 0&&(k={},i[U.id]=k);let z=I.isInstancedMesh===!0?I.id:0,et=k[z];et===void 0&&(et={},k[z]=et);let $=et[N.id];$===void 0&&($={},et[N.id]=$);let Q=$[D];return Q===void 0&&(Q=d(l()),$[D]=Q),Q}function d(I){let U=[],N=[],C=[];for(let D=0;D<e;D++)U[D]=0,N[D]=0,C[D]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:U,enabledAttributes:N,attributeDivisors:C,object:I,attributes:{},index:null}}function f(I,U,N,C){let D=s.attributes,k=U.attributes,z=0,et=N.getAttributes();for(let $ in et)if(et[$].location>=0){let V=D[$],nt=k[$];if(nt===void 0&&($==="instanceMatrix"&&I.instanceMatrix&&(nt=I.instanceMatrix),$==="instanceColor"&&I.instanceColor&&(nt=I.instanceColor)),V===void 0||V.attribute!==nt||nt&&V.data!==nt.data)return!0;z++}return s.attributesNum!==z||s.index!==C}function g(I,U,N,C){let D={},k=U.attributes,z=0,et=N.getAttributes();for(let $ in et)if(et[$].location>=0){let V=k[$];V===void 0&&($==="instanceMatrix"&&I.instanceMatrix&&(V=I.instanceMatrix),$==="instanceColor"&&I.instanceColor&&(V=I.instanceColor));let nt={};nt.attribute=V,V&&V.data&&(nt.data=V.data),D[$]=nt,z++}s.attributes=D,s.attributesNum=z,s.index=C}function x(){let I=s.newAttributes;for(let U=0,N=I.length;U<N;U++)I[U]=0}function m(I){p(I,0)}function p(I,U){let N=s.newAttributes,C=s.enabledAttributes,D=s.attributeDivisors;N[I]=1,C[I]===0&&(r.enableVertexAttribArray(I),C[I]=1),D[I]!==U&&(r.vertexAttribDivisor(I,U),D[I]=U)}function y(){let I=s.newAttributes,U=s.enabledAttributes;for(let N=0,C=U.length;N<C;N++)U[N]!==I[N]&&(r.disableVertexAttribArray(N),U[N]=0)}function M(I,U,N,C,D,k,z){z===!0?r.vertexAttribIPointer(I,U,N,D,k):r.vertexAttribPointer(I,U,N,C,D,k)}function _(I,U,N,C){x();let D=C.attributes,k=N.getAttributes(),z=U.defaultAttributeValues;for(let et in k){let $=k[et];if($.location>=0){let Q=D[et];if(Q===void 0&&(et==="instanceMatrix"&&I.instanceMatrix&&(Q=I.instanceMatrix),et==="instanceColor"&&I.instanceColor&&(Q=I.instanceColor)),Q!==void 0){let V=Q.normalized,nt=Q.itemSize,rt=t.get(Q);if(rt===void 0)continue;let at=rt.buffer,lt=rt.type,ht=rt.bytesPerElement,X=lt===r.INT||lt===r.UNSIGNED_INT||Q.gpuType===Na;if(Q.isInterleavedBufferAttribute){let K=Q.data,ot=K.stride,Tt=Q.offset;if(K.isInstancedInterleavedBuffer){for(let vt=0;vt<$.locationSize;vt++)p($.location+vt,K.meshPerAttribute);I.isInstancedMesh!==!0&&C._maxInstanceCount===void 0&&(C._maxInstanceCount=K.meshPerAttribute*K.count)}else for(let vt=0;vt<$.locationSize;vt++)m($.location+vt);r.bindBuffer(r.ARRAY_BUFFER,at);for(let vt=0;vt<$.locationSize;vt++)M($.location+vt,nt/$.locationSize,lt,V,ot*ht,(Tt+nt/$.locationSize*vt)*ht,X)}else{if(Q.isInstancedBufferAttribute){for(let K=0;K<$.locationSize;K++)p($.location+K,Q.meshPerAttribute);I.isInstancedMesh!==!0&&C._maxInstanceCount===void 0&&(C._maxInstanceCount=Q.meshPerAttribute*Q.count)}else for(let K=0;K<$.locationSize;K++)m($.location+K);r.bindBuffer(r.ARRAY_BUFFER,at);for(let K=0;K<$.locationSize;K++)M($.location+K,nt/$.locationSize,lt,V,nt*ht,nt/$.locationSize*K*ht,X)}}else if(z!==void 0){let V=z[et];if(V!==void 0)switch(V.length){case 2:r.vertexAttrib2fv($.location,V);break;case 3:r.vertexAttrib3fv($.location,V);break;case 4:r.vertexAttrib4fv($.location,V);break;default:r.vertexAttrib1fv($.location,V)}}}}y()}function v(){A();for(let I in i){let U=i[I];for(let N in U){let C=U[N];for(let D in C){let k=C[D];for(let z in k)h(k[z].object),delete k[z];delete C[D]}}delete i[I]}}function S(I){if(i[I.id]===void 0)return;let U=i[I.id];for(let N in U){let C=U[N];for(let D in C){let k=C[D];for(let z in k)h(k[z].object),delete k[z];delete C[D]}}delete i[I.id]}function T(I){for(let U in i){let N=i[U];for(let C in N){let D=N[C];if(D[I.id]===void 0)continue;let k=D[I.id];for(let z in k)h(k[z].object),delete k[z];delete D[I.id]}}}function b(I){for(let U in i){let N=i[U],C=I.isInstancedMesh===!0?I.id:0,D=N[C];if(D!==void 0){for(let k in D){let z=D[k];for(let et in z)h(z[et].object),delete z[et];delete D[k]}delete N[C],Object.keys(N).length===0&&delete i[U]}}}function A(){R(),o=!0,s!==n&&(s=n,c(s.object))}function R(){n.geometry=null,n.program=null,n.wireframe=!1}return{setup:a,reset:A,resetDefaultState:R,dispose:v,releaseStatesOfGeometry:S,releaseStatesOfObject:b,releaseStatesOfProgram:T,initAttributes:x,enableAttribute:m,disableUnusedAttributes:y}}function Cg(r,t,e){let i;function n(l){i=l}function s(l,c){r.drawArrays(i,l,c),e.update(c,i,1)}function o(l,c,h){h!==0&&(r.drawArraysInstanced(i,l,c,h),e.update(c,i,h))}function a(l,c,h){if(h===0)return;t.get("WEBGL_multi_draw").multiDrawArraysWEBGL(i,l,0,c,0,h);let d=0;for(let f=0;f<h;f++)d+=c[f];e.update(d,i,1)}this.setMode=n,this.render=s,this.renderInstances=o,this.renderMultiDraw=a}function Pg(r,t,e,i){let n;function s(){if(n!==void 0)return n;if(t.has("EXT_texture_filter_anisotropic")===!0){let T=t.get("EXT_texture_filter_anisotropic");n=r.getParameter(T.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else n=0;return n}function o(T){return!(T!==xi&&i.convert(T)!==r.getParameter(r.IMPLEMENTATION_COLOR_READ_FORMAT))}function a(T){let b=T===Gi&&(t.has("EXT_color_buffer_half_float")||t.has("EXT_color_buffer_float"));return!(T!==gi&&T!==Pi&&!b&&i.convert(T)!==r.getParameter(r.IMPLEMENTATION_COLOR_READ_TYPE))}function l(T){if(T==="highp"){if(r.getShaderPrecisionFormat(r.VERTEX_SHADER,r.HIGH_FLOAT).precision>0&&r.getShaderPrecisionFormat(r.FRAGMENT_SHADER,r.HIGH_FLOAT).precision>0)return"highp";T="mediump"}return T==="mediump"&&r.getShaderPrecisionFormat(r.VERTEX_SHADER,r.MEDIUM_FLOAT).precision>0&&r.getShaderPrecisionFormat(r.FRAGMENT_SHADER,r.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=e.precision!==void 0?e.precision:"highp",h=l(c);h!==c&&(Ht("WebGLRenderer:",c,"not supported, using",h,"instead."),c=h);let u=e.logarithmicDepthBuffer===!0,d=e.reversedDepthBuffer===!0&&t.has("EXT_clip_control");e.reversedDepthBuffer===!0&&d===!1&&Ht("WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer.");let f=r.getParameter(r.MAX_TEXTURE_IMAGE_UNITS),g=r.getParameter(r.MAX_VERTEX_TEXTURE_IMAGE_UNITS),x=r.getParameter(r.MAX_TEXTURE_SIZE),m=r.getParameter(r.MAX_CUBE_MAP_TEXTURE_SIZE),p=r.getParameter(r.MAX_VERTEX_ATTRIBS),y=r.getParameter(r.MAX_VERTEX_UNIFORM_VECTORS),M=r.getParameter(r.MAX_VARYING_VECTORS),_=r.getParameter(r.MAX_FRAGMENT_UNIFORM_VECTORS),v=r.getParameter(r.MAX_SAMPLES),S=r.getParameter(r.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:s,getMaxPrecision:l,textureFormatReadable:o,textureTypeReadable:a,precision:c,logarithmicDepthBuffer:u,reversedDepthBuffer:d,maxTextures:f,maxVertexTextures:g,maxTextureSize:x,maxCubemapSize:m,maxAttributes:p,maxVertexUniforms:y,maxVaryings:M,maxFragmentUniforms:_,maxSamples:v,samples:S}}function Ig(r){let t=this,e=null,i=0,n=!1,s=!1,o=new ki,a=new Gt,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(u,d){let f=u.length!==0||d||i!==0||n;return n=d,i=u.length,f},this.beginShadows=function(){s=!0,h(null)},this.endShadows=function(){s=!1},this.setGlobalState=function(u,d){e=h(u,d,0)},this.setState=function(u,d,f){let g=u.clippingPlanes,x=u.clipIntersection,m=u.clipShadows,p=r.get(u);if(!n||g===null||g.length===0||s&&!m)s?h(null):c();else{let y=s?0:i,M=y*4,_=p.clippingState||null;l.value=_,_=h(g,d,M,f);for(let v=0;v!==M;++v)_[v]=e[v];p.clippingState=_,this.numIntersection=x?this.numPlanes:0,this.numPlanes+=y}};function c(){l.value!==e&&(l.value=e,l.needsUpdate=i>0),t.numPlanes=i,t.numIntersection=0}function h(u,d,f,g){let x=u!==null?u.length:0,m=null;if(x!==0){if(m=l.value,g!==!0||m===null){let p=f+x*4,y=d.matrixWorldInverse;a.getNormalMatrix(y),(m===null||m.length<p)&&(m=new Float32Array(p));for(let M=0,_=f;M!==x;++M,_+=4)o.copy(u[M]).applyMatrix4(y,a),o.normal.toArray(m,_),m[_+3]=o.constant}l.value=m,l.needsUpdate=!0}return t.numPlanes=x,t.numIntersection=0,m}}var sr=4,Lg=6,Dg=20,Ng=256,ro=new Ks,_d=new It,yh=null,_h=0,vh=0,Mh=!1,Ug=new L,fs=new L,or=class{constructor(t){this._renderer=t,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._sizeLods=[],this._lodMeshes=[],this._backgroundBox=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null}fromScene(t,e=0,i=.1,n=100,s={}){let{size:o=256,position:a=Ug}=s;yh=this._renderer.getRenderTarget(),_h=this._renderer.getActiveCubeFace(),vh=this._renderer.getActiveMipmapLevel(),Mh=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(o);let l=this._allocateTargets();return l.depthBuffer=!0,this._sceneToCubeUV(t,i,n,l,a),e>0&&this._blur(l,0,0,e),this._applyPMREM(l),this._cleanup(l),l}fromEquirectangular(t,e=null){return this._fromTexture(t,e)}fromCubemap(t,e=null){return this._fromTexture(t,e)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=bd(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Md(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._backgroundBox!==null&&(this._backgroundBox.geometry.dispose(),this._backgroundBox.material.dispose())}_setSize(t){this._lodMax=Math.floor(Math.log2(t)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let t=0;t<this._lodMeshes.length;t++)this._lodMeshes[t].geometry.dispose()}_cleanup(t){this._renderer.setRenderTarget(yh,_h,vh),this._renderer.xr.enabled=Mh,t.scissorTest=!1,nr(t,0,0,t.width,t.height)}_fromTexture(t,e){t.mapping===Wn||t.mapping===us?this._setSize(t.image.length===0?16:t.image[0].width||t.image[0].image.width):this._setSize(t.image.width/4),yh=this._renderer.getRenderTarget(),_h=this._renderer.getActiveCubeFace(),vh=this._renderer.getActiveMipmapLevel(),Mh=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;let i=e||this._allocateTargets();return this._textureToCubeUV(t,i),this._applyPMREM(i),this._cleanup(i),i}_allocateTargets(){let t=3*Math.max(this._cubeSize,112),e=4*this._cubeSize,i={magFilter:ke,minFilter:ke,generateMipmaps:!1,type:Gi,format:xi,colorSpace:Rr,depthBuffer:!1},n=vd(t,e,i);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==t||this._pingPongRenderTarget.height!==e){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=vd(t,e,i);let{_lodMax:s}=this;({lodMeshes:this._lodMeshes,sizeLods:this._sizeLods}=Fg(s)),this._blurMaterial=Bg(s,t,e),this._ggxMaterial=Og(s,t,e)}return n}_compileMaterial(t){let e=new Et(new Ae,t);this._renderer.compile(e,ro)}_sceneToCubeUV(t,e,i,n,s){let l=new si(90,1,e,i),c=[1,-1,1,1,1,1],h=[1,1,1,-1,-1,-1],u=this._renderer,d=u.autoClear,f=u.toneMapping;u.getClearColor(_d),u.toneMapping=Hi,u.autoClear=!1,u.state.buffers.depth.getReversed()&&(u.setRenderTarget(n),u.clearDepth(),u.setRenderTarget(null)),this._backgroundBox===null&&(this._backgroundBox=new Et(new ri,new se({name:"PMREM.Background",side:je,depthWrite:!1,depthTest:!1})));let x=this._backgroundBox,m=x.material,p=!1,y=t.background;y?y.isColor&&(m.color.copy(y),t.background=null,p=!0):(m.color.copy(_d),p=!0);for(let M=0;M<6;M++){let _=M%3;_===0?(l.up.set(0,c[M],0),l.position.set(s.x,s.y,s.z),l.lookAt(s.x+h[M],s.y,s.z)):_===1?(l.up.set(0,0,c[M]),l.position.set(s.x,s.y,s.z),l.lookAt(s.x,s.y+h[M],s.z)):(l.up.set(0,c[M],0),l.position.set(s.x,s.y,s.z),l.lookAt(s.x,s.y,s.z+h[M]));let v=this._cubeSize;nr(n,_*v,M>2?v:0,v,v),u.setRenderTarget(n),p&&u.render(x,l),u.render(t,l)}u.toneMapping=f,u.autoClear=d,t.background=y}_textureToCubeUV(t,e){let i=this._renderer,n=t.mapping===Wn||t.mapping===us;n?(this._cubemapMaterial===null&&(this._cubemapMaterial=bd()),this._cubemapMaterial.uniforms.flipEnvMap.value=t.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Md());let s=n?this._cubemapMaterial:this._equirectMaterial,o=this._lodMeshes[0];o.material=s;let a=s.uniforms;a.envMap.value=t;let l=this._cubeSize;nr(e,0,0,3*l,2*l),i.setRenderTarget(e),i.render(o,ro)}_applyPMREM(t){let e=this._renderer,i=e.autoClear;e.autoClear=!1;let n=this._lodMeshes.length;for(let s=1;s<n;s++)this._applyGGXFilter(t,s-1,s);e.autoClear=i}_applyGGXFilter(t,e,i){let n=this._renderer,s=this._pingPongRenderTarget,o=this._ggxMaterial,a=this._lodMeshes[i];a.material=o;let l=o.uniforms,c=i/(this._lodMeshes.length-1),h=e/(this._lodMeshes.length-1),u=Math.sqrt(c*c-h*h),d=c*1.25,f=u*d,{_lodMax:g}=this,x=this._sizeLods[i],m=3*x*(i>g-sr?i-g+sr:0),p=4*(this._cubeSize-x);l.envMap.value=t.texture,l.roughness.value=f,l.mipInt.value=g-e,nr(s,m,p,3*x,2*x),n.setRenderTarget(s),n.render(a,ro),l.envMap.value=s.texture,l.roughness.value=0,l.mipInt.value=g-i,nr(t,m,p,3*x,2*x),n.setRenderTarget(t),n.render(a,ro)}_blur(t,e,i,n){let s=this._pingPongRenderTarget,o=Math.min(n,Math.PI)/Math.SQRT2;this._blurPass(t,s,e,i,o),this._blurPass(s,t,i,i,o)}_blurPass(t,e,i,n,s){let o=this._renderer,a=this._blurMaterial,l=this._lodMeshes[n];l.material=a;let c=a.uniforms;c.envMap.value=t.texture,c.sigma.value=s,c.mipInt.value=this._lodMax-i;let h=this._sizeLods[n],u=3*h*(n>this._lodMax-sr?n-this._lodMax+sr:0),d=4*(this._cubeSize-h);nr(e,u,d,3*h,2*h),o.setRenderTarget(e),o.render(l,ro)}};function Fg(r){let t=[],e=[],i=r,n=r-sr+1+Lg;for(let s=0;s<n;s++){let o=Math.pow(2,i);t.push(o);let a=1/(o-2),l=-a,c=1+a,h=[l,l,c,l,c,c,l,l,c,c,l,c],u=6,d=6,f=3,g=new Float32Array(f*d*u),x=new Float32Array(f*d*u);for(let p=0;p<u;p++){let y=p%3*2/3-1,M=p>2?0:-1,_=[y,M,0,y+2/3,M,0,y+2/3,M+1,0,y,M,0,y+2/3,M+1,0,y,M+1,0];g.set(_,f*d*p);for(let v=0;v<d;v++){let S=h[v*2]*2-1,T=h[v*2+1]*2-1;p===0?fs.set(1,T,S):p===1?fs.set(-S,1,-T):p===2?fs.set(-S,T,1):p===3?fs.set(-1,T,-S):p===4?fs.set(-S,-1,T):fs.set(S,T,-1),fs.toArray(x,(p*d+v)*f)}}let m=new Ae;m.setAttribute("position",new Se(g,f)),m.setAttribute("outputDirection",new Se(x,f)),e.push(new Et(m,null)),i>sr&&i--}return{lodMeshes:e,sizeLods:t}}function vd(r,t,e){let i=new mi(r,t,e);return i.texture.mapping=Jr,i.texture.name="PMREM.cubeUv",i.scissorTest=!0,i}function nr(r,t,e,i,n){r.viewport.set(t,e,i,n),r.scissor.set(t,e,i,n)}function Og(r,t,e){return new Ze({name:"PMREMGGXConvolution",defines:{GGX_SAMPLES:Ng,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/e,CUBEUV_MAX_MIP:`${r}.0`},uniforms:{envMap:{value:null},roughness:{value:0},mipInt:{value:0}},vertexShader:wl(),fragmentShader:`

			precision highp float;
			precision highp int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform float roughness;
			uniform float mipInt;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			#define PI 3.14159265359

			// Van der Corput radical inverse
			float radicalInverse_VdC(uint bits) {
				bits = (bits << 16u) | (bits >> 16u);
				bits = ((bits & 0x55555555u) << 1u) | ((bits & 0xAAAAAAAAu) >> 1u);
				bits = ((bits & 0x33333333u) << 2u) | ((bits & 0xCCCCCCCCu) >> 2u);
				bits = ((bits & 0x0F0F0F0Fu) << 4u) | ((bits & 0xF0F0F0F0u) >> 4u);
				bits = ((bits & 0x00FF00FFu) << 8u) | ((bits & 0xFF00FF00u) >> 8u);
				return float(bits) * 2.3283064365386963e-10; // / 0x100000000
			}

			// Hammersley sequence
			vec2 hammersley(uint i, uint N) {
				return vec2(float(i) / float(N), radicalInverse_VdC(i));
			}

			// GGX VNDF importance sampling (Eric Heitz 2018)
			// "Sampling the GGX Distribution of Visible Normals"
			// https://jcgt.org/published/0007/04/01/
			vec3 importanceSampleGGX_VNDF(vec2 Xi, vec3 V, float roughness) {
				float alpha = roughness * roughness;

				// Section 4.1: Orthonormal basis
				vec3 T1 = vec3(1.0, 0.0, 0.0);
				vec3 T2 = cross(V, T1);

				// Section 4.2: Parameterization of projected area
				float r = sqrt(Xi.x);
				float phi = 2.0 * PI * Xi.y;
				float t1 = r * cos(phi);
				float t2 = r * sin(phi);
				float s = 0.5 * (1.0 + V.z);
				t2 = (1.0 - s) * sqrt(1.0 - t1 * t1) + s * t2;

				// Section 4.3: Reprojection onto hemisphere
				vec3 Nh = t1 * T1 + t2 * T2 + sqrt(max(0.0, 1.0 - t1 * t1 - t2 * t2)) * V;

				// Section 3.4: Transform back to ellipsoid configuration
				return normalize(vec3(alpha * Nh.x, alpha * Nh.y, max(0.0, Nh.z)));
			}

			void main() {
				vec3 N = normalize(vOutputDirection);
				vec3 V = N; // Assume view direction equals normal for pre-filtering

				vec3 prefilteredColor = vec3(0.0);
				float totalWeight = 0.0;

				// For very low roughness, just sample the environment directly
				if (roughness < 0.001) {
					gl_FragColor = vec4(bilinearCubeUV(envMap, N, mipInt), 1.0);
					return;
				}

				// Tangent space basis for VNDF sampling
				vec3 up = abs(N.z) < 0.999 ? vec3(0.0, 0.0, 1.0) : vec3(1.0, 0.0, 0.0);
				vec3 tangent = normalize(cross(up, N));
				vec3 bitangent = cross(N, tangent);

				for(uint i = 0u; i < uint(GGX_SAMPLES); i++) {
					vec2 Xi = hammersley(i, uint(GGX_SAMPLES));

					// For PMREM, V = N, so in tangent space V is always (0, 0, 1)
					vec3 H_tangent = importanceSampleGGX_VNDF(Xi, vec3(0.0, 0.0, 1.0), roughness);

					// Transform H back to world space
					vec3 H = normalize(tangent * H_tangent.x + bitangent * H_tangent.y + N * H_tangent.z);
					vec3 L = normalize(2.0 * dot(V, H) * H - V);

					float NdotL = max(dot(N, L), 0.0);

					if(NdotL > 0.0) {
						// Sample environment at fixed mip level
						// VNDF importance sampling handles the distribution filtering
						vec3 sampleColor = bilinearCubeUV(envMap, L, mipInt);

						// Weight by NdotL for the split-sum approximation
						// VNDF PDF naturally accounts for the visible microfacet distribution
						prefilteredColor += sampleColor * NdotL;
						totalWeight += NdotL;
					}
				}

				if (totalWeight > 0.0) {
					prefilteredColor = prefilteredColor / totalWeight;
				}

				gl_FragColor = vec4(prefilteredColor, 1.0);
			}
		`,blending:on,depthTest:!1,depthWrite:!1})}function Bg(r,t,e){return new Ze({name:"SphericalGaussianBlur",defines:{SAMPLES:Dg,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/e,CUBEUV_MAX_MIP:`${r}.0`},uniforms:{envMap:{value:null},sigma:{value:0},mipInt:{value:0}},vertexShader:wl(),fragmentShader:`

			precision highp float;
			precision highp int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform float sigma;
			uniform float mipInt;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			#define PI 3.14159265359
			#define GOLDEN_ANGLE 2.39996322973

			void main() {

				if ( sigma == 0.0 ) {

					gl_FragColor = vec4( bilinearCubeUV( envMap, vOutputDirection, mipInt ), 1.0 );
					return;

				}

				vec3 outputDirection = normalize( vOutputDirection );

				vec3 up = abs( outputDirection.z ) < 0.999 ? vec3( 0.0, 0.0, 1.0 ) : vec3( 1.0, 0.0, 0.0 );
				vec3 tangent = normalize( cross( up, outputDirection ) );
				vec3 bitangent = cross( outputDirection, tangent );

				// Truncate the kernel at three standard deviations or at the antipode.
				float thetaMax = min( 3.0 * sigma, PI );
				float truncation = 1.0 - exp( - 0.5 * thetaMax * thetaMax / ( sigma * sigma ) );

				vec3 accumColor = vec3( 0.0 );
				float accumWeight = 0.0;

				for ( int i = 0; i < SAMPLES; i ++ ) {

					// Stratified inverse-CDF sampling of the Gaussian, placed on a golden-angle spiral.
					float stratum = ( float( i ) + 0.5 ) / float( SAMPLES );
					float theta = sigma * sqrt( - 2.0 * log( 1.0 - stratum * truncation ) );
					float phi = float( i ) * GOLDEN_ANGLE;

					vec3 offset = cos( phi ) * tangent + sin( phi ) * bitangent;
					vec3 sampleDirection = cos( theta ) * outputDirection + sin( theta ) * offset;

					// Correct the planar sample density to solid angle.
					float weight = sin( theta ) / theta;

					accumColor += weight * bilinearCubeUV( envMap, sampleDirection, mipInt );
					accumWeight += weight;

				}

				gl_FragColor = vec4( accumColor / accumWeight, 1.0 );

			}
		`,blending:on,depthTest:!1,depthWrite:!1})}function Md(){return new Ze({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:wl(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:on,depthTest:!1,depthWrite:!1})}function bd(){return new Ze({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:wl(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:on,depthTest:!1,depthWrite:!1})}function wl(){return`

		precision mediump float;
		precision mediump int;

		attribute vec3 outputDirection;

		varying vec3 vOutputDirection;

		void main() {

			vOutputDirection = outputDirection;
			gl_Position = vec4( position, 1.0 );

		}
	`}var bl=class extends mi{constructor(t=1,e={}){super(t,t,e),this.isWebGLCubeRenderTarget=!0;let i={width:t,height:t,depth:1},n=[i,i,i,i,i,i];this.texture=new zr(n),this._setTextureOptions(e),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(t,e){this.texture.type=e.type,this.texture.colorSpace=e.colorSpace,this.texture.generateMipmaps=e.generateMipmaps,this.texture.minFilter=e.minFilter,this.texture.magFilter=e.magFilter;let i={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},n=new ri(5,5,5),s=new Ze({name:"CubemapFromEquirect",uniforms:ds(i.uniforms),vertexShader:i.vertexShader,fragmentShader:i.fragmentShader,side:je,blending:on});s.uniforms.tEquirect.value=e;let o=new Et(n,s),a=e.minFilter;return e.minFilter===ln&&(e.minFilter=ke),new Ra(1,10,this).update(t,o),e.minFilter=a,o.geometry.dispose(),o.material.dispose(),this}clear(t,e=!0,i=!0,n=!0){let s=t.getRenderTarget();for(let o=0;o<6;o++)t.setRenderTarget(this,o),t.clear(e,i,n);t.setRenderTarget(s)}};function kg(r){let t=new WeakMap,e=new WeakMap,i=null;function n(d,f=!1){return d==null?null:f?o(d):s(d)}function s(d){if(d&&d.isTexture){let f=d.mapping;if(f===Ia||f===La)if(t.has(d)){let g=t.get(d).texture;return a(g,d.mapping)}else{let g=d.image;if(g&&g.height>0){let x=new bl(g.height);return x.fromEquirectangularTexture(r,d),t.set(d,x),d.addEventListener("dispose",c),a(x.texture,d.mapping)}else return null}}return d}function o(d){if(d&&d.isTexture){let f=d.mapping,g=f===Ia||f===La,x=f===Wn||f===us;if(g||x){let m=e.get(d),p=m!==void 0?m.texture.pmremVersion:0;if(d.isRenderTargetTexture&&d.pmremVersion!==p)return i===null&&(i=new or(r)),m=g?i.fromEquirectangular(d,m):i.fromCubemap(d,m),m.texture.pmremVersion=d.pmremVersion,e.set(d,m),m.texture;if(m!==void 0)return m.texture;{let y=d.image;return g&&y&&y.height>0||x&&y&&l(y)?(i===null&&(i=new or(r)),m=g?i.fromEquirectangular(d):i.fromCubemap(d),m.texture.pmremVersion=d.pmremVersion,e.set(d,m),d.addEventListener("dispose",h),m.texture):null}}}return d}function a(d,f){return f===Ia?d.mapping=Wn:f===La&&(d.mapping=us),d}function l(d){let f=0,g=6;for(let x=0;x<g;x++)d[x]!==void 0&&f++;return f===g}function c(d){let f=d.target;f.removeEventListener("dispose",c);let g=t.get(f);g!==void 0&&(t.delete(f),g.dispose())}function h(d){let f=d.target;f.removeEventListener("dispose",h);let g=e.get(f);g!==void 0&&(e.delete(f),g.dispose())}function u(){t=new WeakMap,e=new WeakMap,i!==null&&(i.dispose(),i=null)}return{get:n,dispose:u}}function zg(r){let t={};function e(i){if(t[i]!==void 0)return t[i];let n=r.getExtension(i);return t[i]=n,n}return{has:function(i){return e(i)!==null},init:function(){e("EXT_color_buffer_float"),e("WEBGL_clip_cull_distance"),e("OES_texture_float_linear"),e("EXT_color_buffer_half_float"),e("WEBGL_multisampled_render_to_texture"),e("WEBGL_render_shared_exponent")},get:function(i){let n=e(i);return n===null&&rs("WebGLRenderer: "+i+" extension not supported."),n}}}function Hg(r,t,e,i){let n={},s=new WeakMap;function o(u){let d=u.target;d.index!==null&&t.remove(d.index);for(let g in d.attributes)t.remove(d.attributes[g]);d.removeEventListener("dispose",o),delete n[d.id];let f=s.get(d);f&&(t.remove(f),s.delete(d)),i.releaseStatesOfGeometry(d),d.isInstancedBufferGeometry===!0&&delete d._maxInstanceCount,e.memory.geometries--}function a(u,d){return n[d.id]===!0||(d.addEventListener("dispose",o),n[d.id]=!0,e.memory.geometries++),d}function l(u){let d=u.attributes;for(let f in d)t.update(d[f],r.ARRAY_BUFFER)}function c(u){let d=[],f=u.index,g=u.attributes.position,x=0;if(g===void 0)return;if(f!==null){let y=f.array;x=f.version;for(let M=0,_=y.length;M<_;M+=3){let v=y[M+0],S=y[M+1],T=y[M+2];d.push(v,S,S,T,T,v)}}else{let y=g.array;x=g.version;for(let M=0,_=y.length/3-1;M<_;M+=3){let v=M+0,S=M+1,T=M+2;d.push(v,S,S,T,T,v)}}let m=new(g.count>=65535?ls:as)(d,1);m.version=x;let p=s.get(u);p&&t.remove(p),s.set(u,m)}function h(u){let d=s.get(u);if(d){let f=u.index;f!==null&&d.version<f.version&&c(u)}else c(u);return s.get(u)}return{get:a,update:l,getWireframeAttribute:h}}function Vg(r,t,e){let i;function n(u){i=u}let s,o;function a(u){s=u.type,o=u.bytesPerElement}function l(u,d){r.drawElements(i,d,s,u*o),e.update(d,i,1)}function c(u,d,f){f!==0&&(r.drawElementsInstanced(i,d,s,u*o,f),e.update(d,i,f))}function h(u,d,f){if(f===0)return;t.get("WEBGL_multi_draw").multiDrawElementsWEBGL(i,d,0,s,u,0,f);let x=0;for(let m=0;m<f;m++)x+=d[m];e.update(x,i,1)}this.setMode=n,this.setIndex=a,this.render=l,this.renderInstances=c,this.renderMultiDraw=h}function Gg(r){let t={geometries:0,textures:0},e={frame:0,calls:0,triangles:0,points:0,lines:0};function i(s,o,a){switch(e.calls++,o){case r.TRIANGLES:e.triangles+=a*(s/3);break;case r.LINES:e.lines+=a*(s/2);break;case r.LINE_STRIP:e.lines+=a*(s-1);break;case r.LINE_LOOP:e.lines+=a*s;break;case r.POINTS:e.points+=a*s;break;default:zt("WebGLInfo: Unknown draw mode:",o);break}}function n(){e.calls=0,e.triangles=0,e.points=0,e.lines=0}return{memory:t,render:e,programs:null,autoReset:!0,reset:n,update:i}}function Wg(r,t,e){let i=new WeakMap,n=new Ee;function s(o,a,l){let c=o.morphTargetInfluences,h=a.morphAttributes.position||a.morphAttributes.normal||a.morphAttributes.color,u=h!==void 0?h.length:0,d=i.get(a);if(d===void 0||d.count!==u){let A=function(){T.dispose(),i.delete(a),a.removeEventListener("dispose",A)};d!==void 0&&d.texture.dispose();let f=a.morphAttributes.position!==void 0,g=a.morphAttributes.normal!==void 0,x=a.morphAttributes.color!==void 0,m=a.morphAttributes.position||[],p=a.morphAttributes.normal||[],y=a.morphAttributes.color||[],M=0;f===!0&&(M=1),g===!0&&(M=2),x===!0&&(M=3);let _=a.attributes.position.count*M,v=1;_>t.maxTextureSize&&(v=Math.ceil(_/t.maxTextureSize),_=t.maxTextureSize);let S=new Float32Array(_*v*4*u),T=new Lr(S,_,v,u);T.type=Pi,T.needsUpdate=!0;let b=M*4;for(let R=0;R<u;R++){let I=m[R],U=p[R],N=y[R],C=_*v*4*R;for(let D=0;D<I.count;D++){let k=D*b;f===!0&&(n.fromBufferAttribute(I,D),S[C+k+0]=n.x,S[C+k+1]=n.y,S[C+k+2]=n.z,S[C+k+3]=0),g===!0&&(n.fromBufferAttribute(U,D),S[C+k+4]=n.x,S[C+k+5]=n.y,S[C+k+6]=n.z,S[C+k+7]=0),x===!0&&(n.fromBufferAttribute(N,D),S[C+k+8]=n.x,S[C+k+9]=n.y,S[C+k+10]=n.z,S[C+k+11]=N.itemSize===4?n.w:1)}}d={count:u,texture:T,size:new Vt(_,v)},i.set(a,d),a.addEventListener("dispose",A)}if(o.isInstancedMesh===!0&&o.morphTexture!==null)l.getUniforms().setValue(r,"morphTexture",o.morphTexture,e);else{let f=0;for(let x=0;x<c.length;x++)f+=c[x];let g=a.morphTargetsRelative?1:1-f;l.getUniforms().setValue(r,"morphTargetBaseInfluence",g),l.getUniforms().setValue(r,"morphTargetInfluences",c)}l.getUniforms().setValue(r,"morphTargetsTexture",d.texture,e),l.getUniforms().setValue(r,"morphTargetsTextureSize",d.size)}return{update:s}}function Xg(r,t,e,i,n){let s=new WeakMap;function o(c){let h=n.render.frame,u=c.geometry,d=t.get(c,u);if(s.get(d)!==h&&(t.update(d),s.set(d,h)),c.isInstancedMesh&&(c.hasEventListener("dispose",l)===!1&&c.addEventListener("dispose",l),s.get(c)!==h&&(e.update(c.instanceMatrix,r.ARRAY_BUFFER),c.instanceColor!==null&&e.update(c.instanceColor,r.ARRAY_BUFFER),s.set(c,h))),c.isSkinnedMesh){let f=c.skeleton;s.get(f)!==h&&(f.update(),s.set(f,h))}return d}function a(){s=new WeakMap}function l(c){let h=c.target;h.removeEventListener("dispose",l),i.releaseStatesOfObject(h),e.remove(h.instanceMatrix),h.instanceColor!==null&&e.remove(h.instanceColor)}return{update:o,dispose:a}}var qg={[$c]:"LINEAR_TONE_MAPPING",[Zc]:"REINHARD_TONE_MAPPING",[jc]:"CINEON_TONE_MAPPING",[jr]:"ACES_FILMIC_TONE_MAPPING",[Kc]:"AGX_TONE_MAPPING",[Qc]:"NEUTRAL_TONE_MAPPING",[Jc]:"CUSTOM_TONE_MAPPING"};function Yg(r,t,e,i,n,s){let o=new mi(t,e,{type:r,depthBuffer:n,stencilBuffer:s,samples:i?4:0,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,resolveDepthBuffer:!1,resolveStencilBuffer:!1}),a=null,l=null,c=new Ae;c.setAttribute("position",new he([-1,3,0,-1,-1,0,3,-1,0],3)),c.setAttribute("uv",new he([0,2,0,0,2,0],2));let h=new pa({uniforms:{tDiffuse:{value:null}},vertexShader:`
			precision highp float;

			uniform mat4 modelViewMatrix;
			uniform mat4 projectionMatrix;

			attribute vec3 position;
			attribute vec2 uv;

			varying vec2 vUv;

			void main() {
				vUv = uv;
				gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
			}`,fragmentShader:`
			precision highp float;

			uniform sampler2D tDiffuse;

			varying vec2 vUv;

			#include <tonemapping_pars_fragment>
			#include <colorspace_pars_fragment>

			void main() {
				gl_FragColor = texture2D( tDiffuse, vUv );

				#ifdef LINEAR_TONE_MAPPING
					gl_FragColor.rgb = LinearToneMapping( gl_FragColor.rgb );
				#elif defined( REINHARD_TONE_MAPPING )
					gl_FragColor.rgb = ReinhardToneMapping( gl_FragColor.rgb );
				#elif defined( CINEON_TONE_MAPPING )
					gl_FragColor.rgb = CineonToneMapping( gl_FragColor.rgb );
				#elif defined( ACES_FILMIC_TONE_MAPPING )
					gl_FragColor.rgb = ACESFilmicToneMapping( gl_FragColor.rgb );
				#elif defined( AGX_TONE_MAPPING )
					gl_FragColor.rgb = AgXToneMapping( gl_FragColor.rgb );
				#elif defined( NEUTRAL_TONE_MAPPING )
					gl_FragColor.rgb = NeutralToneMapping( gl_FragColor.rgb );
				#elif defined( CUSTOM_TONE_MAPPING )
					gl_FragColor.rgb = CustomToneMapping( gl_FragColor.rgb );
				#endif

				#ifdef SRGB_TRANSFER
					gl_FragColor = sRGBTransferOETF( gl_FragColor );
				#endif
			}`,depthTest:!1,depthWrite:!1}),u=new Et(c,h),d=new Ks(-1,1,1,-1,0,1),f=null,g=null,x=!1,m,p=null,y=[],M=!1;this.setSize=function(_,v){o.setSize(_,v),a!==null&&a.setSize(_,v),l!==null&&l.setSize(_,v);for(let S=0;S<y.length;S++){let T=y[S];T.setSize&&T.setSize(_,v)}},this.setEffects=function(_){y=_,M=y.length>0&&y[0].isRenderPass===!0;let v=o.width,S=o.height;y.length>0&&a===null&&(a=new mi(v,S,{type:Gi,depthBuffer:!1,stencilBuffer:!1}),l=new mi(v,S,{type:Gi,depthBuffer:!1,stencilBuffer:!1}));for(let T=0;T<y.length;T++){let b=y[T];b.setSize&&b.setSize(v,S)}},this.begin=function(_,v){if(x||_.toneMapping===Hi&&y.length===0)return!1;if(p=v,v!==null){let S=v.width,T=v.height;(o.width!==S||o.height!==T)&&this.setSize(S,T)}return M===!1&&_.setRenderTarget(o),m=_.toneMapping,_.toneMapping=Hi,!0},this.hasRenderPass=function(){return M},this.end=function(_,v){_.toneMapping=m,x=!0;let S=o,T=a;for(let b=0;b<y.length;b++){let A=y[b];A.enabled!==!1&&(A.render(_,T,S,v),A.needsSwap!==!1&&(S=T,T=T===a?l:a))}if(f!==_.outputColorSpace||g!==_.toneMapping){f=_.outputColorSpace,g=_.toneMapping,h.defines={},Kt.getTransfer(f)===le&&(h.defines.SRGB_TRANSFER="");let b=qg[g];b&&(h.defines[b]=""),h.needsUpdate=!0}h.uniforms.tDiffuse.value=S.texture,_.setRenderTarget(p),_.render(u,d),p=null,x=!1},this.isCompositing=function(){return x},this.dispose=function(){o.dispose(),a!==null&&a.dispose(),l!==null&&l.dispose(),c.dispose(),h.dispose()}}var Vd=new ui,wh=new zn(1,1),Gd=new Lr,Wd=new ha,Xd=new zr,Sd=[],wd=[],Ed=new Float32Array(16),Td=new Float32Array(9),Ad=new Float32Array(4);function ar(r,t,e){let i=r[0];if(i<=0||i>0)return r;let n=t*e,s=Sd[n];if(s===void 0&&(s=new Float32Array(n),Sd[n]=s),t!==0){i.toArray(s,0);for(let o=1,a=0;o!==t;++o)a+=e,r[o].toArray(s,a)}return s}function ze(r,t){if(r.length!==t.length)return!1;for(let e=0,i=r.length;e<i;e++)if(r[e]!==t[e])return!1;return!0}function He(r,t){for(let e=0,i=t.length;e<i;e++)r[e]=t[e]}function El(r,t){let e=wd[t];e===void 0&&(e=new Int32Array(t),wd[t]=e);for(let i=0;i!==t;++i)e[i]=r.allocateTextureUnit();return e}function $g(r,t){let e=this.cache;e[0]!==t&&(r.uniform1f(this.addr,t),e[0]=t)}function Zg(r,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(r.uniform2f(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(ze(e,t))return;r.uniform2fv(this.addr,t),He(e,t)}}function jg(r,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(r.uniform3f(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else if(t.r!==void 0)(e[0]!==t.r||e[1]!==t.g||e[2]!==t.b)&&(r.uniform3f(this.addr,t.r,t.g,t.b),e[0]=t.r,e[1]=t.g,e[2]=t.b);else{if(ze(e,t))return;r.uniform3fv(this.addr,t),He(e,t)}}function Jg(r,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(r.uniform4f(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(ze(e,t))return;r.uniform4fv(this.addr,t),He(e,t)}}function Kg(r,t){let e=this.cache,i=t.elements;if(i===void 0){if(ze(e,t))return;r.uniformMatrix2fv(this.addr,!1,t),He(e,t)}else{if(ze(e,i))return;Ad.set(i),r.uniformMatrix2fv(this.addr,!1,Ad),He(e,i)}}function Qg(r,t){let e=this.cache,i=t.elements;if(i===void 0){if(ze(e,t))return;r.uniformMatrix3fv(this.addr,!1,t),He(e,t)}else{if(ze(e,i))return;Td.set(i),r.uniformMatrix3fv(this.addr,!1,Td),He(e,i)}}function tx(r,t){let e=this.cache,i=t.elements;if(i===void 0){if(ze(e,t))return;r.uniformMatrix4fv(this.addr,!1,t),He(e,t)}else{if(ze(e,i))return;Ed.set(i),r.uniformMatrix4fv(this.addr,!1,Ed),He(e,i)}}function ex(r,t){let e=this.cache;e[0]!==t&&(r.uniform1i(this.addr,t),e[0]=t)}function ix(r,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(r.uniform2i(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(ze(e,t))return;r.uniform2iv(this.addr,t),He(e,t)}}function nx(r,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(r.uniform3i(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(ze(e,t))return;r.uniform3iv(this.addr,t),He(e,t)}}function sx(r,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(r.uniform4i(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(ze(e,t))return;r.uniform4iv(this.addr,t),He(e,t)}}function rx(r,t){let e=this.cache;e[0]!==t&&(r.uniform1ui(this.addr,t),e[0]=t)}function ox(r,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(r.uniform2ui(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(ze(e,t))return;r.uniform2uiv(this.addr,t),He(e,t)}}function ax(r,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(r.uniform3ui(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(ze(e,t))return;r.uniform3uiv(this.addr,t),He(e,t)}}function lx(r,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(r.uniform4ui(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(ze(e,t))return;r.uniform4uiv(this.addr,t),He(e,t)}}function cx(r,t,e){let i=this.cache,n=e.allocateTextureUnit();i[0]!==n&&(r.uniform1i(this.addr,n),i[0]=n);let s;this.type===r.SAMPLER_2D_SHADOW?(wh.compareFunction=e.isReversedDepthBuffer()?_l:yl,s=wh):s=Vd,e.setTexture2D(t||s,n)}function hx(r,t,e){let i=this.cache,n=e.allocateTextureUnit();i[0]!==n&&(r.uniform1i(this.addr,n),i[0]=n),e.setTexture3D(t||Wd,n)}function ux(r,t,e){let i=this.cache,n=e.allocateTextureUnit();i[0]!==n&&(r.uniform1i(this.addr,n),i[0]=n),e.setTextureCube(t||Xd,n)}function dx(r,t,e){let i=this.cache,n=e.allocateTextureUnit();i[0]!==n&&(r.uniform1i(this.addr,n),i[0]=n),e.setTexture2DArray(t||Gd,n)}function fx(r){switch(r){case 5126:return $g;case 35664:return Zg;case 35665:return jg;case 35666:return Jg;case 35674:return Kg;case 35675:return Qg;case 35676:return tx;case 5124:case 35670:return ex;case 35667:case 35671:return ix;case 35668:case 35672:return nx;case 35669:case 35673:return sx;case 5125:return rx;case 36294:return ox;case 36295:return ax;case 36296:return lx;case 35678:case 36198:case 36298:case 36306:case 35682:return cx;case 35679:case 36299:case 36307:return hx;case 35680:case 36300:case 36308:case 36293:return ux;case 36289:case 36303:case 36311:case 36292:return dx}}function px(r,t){r.uniform1fv(this.addr,t)}function mx(r,t){let e=ar(t,this.size,2);r.uniform2fv(this.addr,e)}function gx(r,t){let e=ar(t,this.size,3);r.uniform3fv(this.addr,e)}function xx(r,t){let e=ar(t,this.size,4);r.uniform4fv(this.addr,e)}function yx(r,t){let e=ar(t,this.size,4);r.uniformMatrix2fv(this.addr,!1,e)}function _x(r,t){let e=ar(t,this.size,9);r.uniformMatrix3fv(this.addr,!1,e)}function vx(r,t){let e=ar(t,this.size,16);r.uniformMatrix4fv(this.addr,!1,e)}function Mx(r,t){r.uniform1iv(this.addr,t)}function bx(r,t){r.uniform2iv(this.addr,t)}function Sx(r,t){r.uniform3iv(this.addr,t)}function wx(r,t){r.uniform4iv(this.addr,t)}function Ex(r,t){r.uniform1uiv(this.addr,t)}function Tx(r,t){r.uniform2uiv(this.addr,t)}function Ax(r,t){r.uniform3uiv(this.addr,t)}function Rx(r,t){r.uniform4uiv(this.addr,t)}function Cx(r,t,e){let i=this.cache,n=t.length,s=El(e,n);ze(i,s)||(r.uniform1iv(this.addr,s),He(i,s));let o;this.type===r.SAMPLER_2D_SHADOW?o=wh:o=Vd;for(let a=0;a!==n;++a)e.setTexture2D(t[a]||o,s[a])}function Px(r,t,e){let i=this.cache,n=t.length,s=El(e,n);ze(i,s)||(r.uniform1iv(this.addr,s),He(i,s));for(let o=0;o!==n;++o)e.setTexture3D(t[o]||Wd,s[o])}function Ix(r,t,e){let i=this.cache,n=t.length,s=El(e,n);ze(i,s)||(r.uniform1iv(this.addr,s),He(i,s));for(let o=0;o!==n;++o)e.setTextureCube(t[o]||Xd,s[o])}function Lx(r,t,e){let i=this.cache,n=t.length,s=El(e,n);ze(i,s)||(r.uniform1iv(this.addr,s),He(i,s));for(let o=0;o!==n;++o)e.setTexture2DArray(t[o]||Gd,s[o])}function Dx(r){switch(r){case 5126:return px;case 35664:return mx;case 35665:return gx;case 35666:return xx;case 35674:return yx;case 35675:return _x;case 35676:return vx;case 5124:case 35670:return Mx;case 35667:case 35671:return bx;case 35668:case 35672:return Sx;case 35669:case 35673:return wx;case 5125:return Ex;case 36294:return Tx;case 36295:return Ax;case 36296:return Rx;case 35678:case 36198:case 36298:case 36306:case 35682:return Cx;case 35679:case 36299:case 36307:return Px;case 35680:case 36300:case 36308:case 36293:return Ix;case 36289:case 36303:case 36311:case 36292:return Lx}}var Eh=class{constructor(t,e,i){this.id=t,this.addr=i,this.cache=[],this.type=e.type,this.setValue=fx(e.type)}},Th=class{constructor(t,e,i){this.id=t,this.addr=i,this.cache=[],this.type=e.type,this.size=e.size,this.setValue=Dx(e.type)}},Ah=class{constructor(t){this.id=t,this.seq=[],this.map={}}setValue(t,e,i){let n=this.seq;for(let s=0,o=n.length;s!==o;++s){let a=n[s];a.setValue(t,e[a.id],i)}}},bh=/(\w+)(\])?(\[|\.)?/g;function Rd(r,t){r.seq.push(t),r.map[t.id]=t}function Nx(r,t,e){let i=r.name,n=i.length;for(bh.lastIndex=0;;){let s=bh.exec(i),o=bh.lastIndex,a=s[1],l=s[2]==="]",c=s[3];if(l&&(a=a|0),c===void 0||c==="["&&o+2===n){Rd(e,c===void 0?new Eh(a,r,t):new Th(a,r,t));break}else{let u=e.map[a];u===void 0&&(u=new Ah(a),Rd(e,u)),e=u}}}var rr=class{constructor(t,e){this.seq=[],this.map={};let i=t.getProgramParameter(e,t.ACTIVE_UNIFORMS);for(let o=0;o<i;++o){let a=t.getActiveUniform(e,o),l=t.getUniformLocation(e,a.name);Nx(a,l,this)}let n=[],s=[];for(let o of this.seq)o.type===t.SAMPLER_2D_SHADOW||o.type===t.SAMPLER_CUBE_SHADOW||o.type===t.SAMPLER_2D_ARRAY_SHADOW?n.push(o):s.push(o);n.length>0&&(this.seq=n.concat(s))}setValue(t,e,i,n){let s=this.map[e];s!==void 0&&s.setValue(t,i,n)}setOptional(t,e,i){let n=e[i];n!==void 0&&this.setValue(t,i,n)}static upload(t,e,i,n){for(let s=0,o=e.length;s!==o;++s){let a=e[s],l=i[a.id];l.needsUpdate!==!1&&a.setValue(t,l.value,n)}}static seqWithValue(t,e){let i=[];for(let n=0,s=t.length;n!==s;++n){let o=t[n];o.id in e&&i.push(o)}return i}};function Cd(r,t,e){let i=r.createShader(t);return r.shaderSource(i,e),r.compileShader(i),i}var Ux=37297,Fx=0;function Ox(r,t){let e=r.split(`
`),i=[],n=Math.max(t-6,0),s=Math.min(t+6,e.length);for(let o=n;o<s;o++){let a=o+1;i.push(`${a===t?">":" "} ${a}: ${e[o]}`)}return i.join(`
`)}var Pd=new Gt;function Bx(r){Kt._getMatrix(Pd,Kt.workingColorSpace,r);let t=`mat3( ${Pd.elements.map(e=>e.toFixed(4))} )`;switch(Kt.getTransfer(r)){case Cr:return[t,"LinearTransferOETF"];case le:return[t,"sRGBTransferOETF"];default:return Ht("WebGLProgram: Unsupported color space: ",r),[t,"LinearTransferOETF"]}}function Id(r,t,e){let i=r.getShaderParameter(t,r.COMPILE_STATUS),s=(r.getShaderInfoLog(t)||"").trim();if(i&&s==="")return"";let o=/ERROR: 0:(\d+)/.exec(s);if(o){let a=parseInt(o[1]);return e.toUpperCase()+`

`+s+`

`+Ox(r.getShaderSource(t),a)}else return s}function kx(r,t){let e=Bx(t);return[`vec4 ${r}( vec4 value ) {`,`	return ${e[1]}( vec4( value.rgb * ${e[0]}, value.a ) );`,"}"].join(`
`)}var zx={[$c]:"Linear",[Zc]:"Reinhard",[jc]:"Cineon",[jr]:"ACESFilmic",[Kc]:"AgX",[Qc]:"Neutral",[Jc]:"Custom"};function Hx(r,t){let e=zx[t];return e===void 0?(Ht("WebGLProgram: Unsupported toneMapping:",t),"vec3 "+r+"( vec3 color ) { return LinearToneMapping( color ); }"):"vec3 "+r+"( vec3 color ) { return "+e+"ToneMapping( color ); }"}var Ml=new L;function Vx(){Kt.getLuminanceCoefficients(Ml);let r=Ml.x.toFixed(4),t=Ml.y.toFixed(4),e=Ml.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${r}, ${t}, ${e} );`,"	return dot( weights, rgb );","}"].join(`
`)}function Gx(r){return[r.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",r.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(ao).join(`
`)}function Wx(r){let t=[];for(let e in r){let i=r[e];i!==!1&&t.push("#define "+e+" "+i)}return t.join(`
`)}function Xx(r,t){let e={},i=r.getProgramParameter(t,r.ACTIVE_ATTRIBUTES);for(let n=0;n<i;n++){let s=r.getActiveAttrib(t,n),o=s.name,a=1;s.type===r.FLOAT_MAT2&&(a=2),s.type===r.FLOAT_MAT3&&(a=3),s.type===r.FLOAT_MAT4&&(a=4),e[o]={type:s.type,location:r.getAttribLocation(t,o),locationSize:a}}return e}function ao(r){return r!==""}function Ld(r,t){let e=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return r.replace(/NUM_SUN_LIGHTS/g,t.numSunLights).replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,e).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_SUN_LIGHT_SHADOWS/g,t.numSunLightShadows).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function Dd(r,t){return r.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}var qx=/^[ \t]*#include +<([\w\d./]+)>/gm;function Rh(r){return r.replace(qx,$x)}var Yx=new Map;function $x(r,t){let e=$t[t];if(e===void 0){let i=Yx.get(t);if(i!==void 0)e=$t[i],Ht('WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',t,i);else throw new Error("THREE.WebGLProgram: Can not resolve #include <"+t+">")}return Rh(e)}var Zx=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Nd(r){return r.replace(Zx,jx)}function jx(r,t,e,i){let n="";for(let s=parseInt(t);s<parseInt(e);s++)n+=i.replace(/\[\s*i\s*\]/g,"[ "+s+" ]").replace(/UNROLLED_LOOP_INDEX/g,s);return n}function Ud(r){let t=`precision ${r.precision} float;
	precision ${r.precision} int;
	precision ${r.precision} sampler2D;
	precision ${r.precision} samplerCube;
	precision ${r.precision} sampler3D;
	precision ${r.precision} sampler2DArray;
	precision ${r.precision} sampler2DShadow;
	precision ${r.precision} samplerCubeShadow;
	precision ${r.precision} sampler2DArrayShadow;
	precision ${r.precision} isampler2D;
	precision ${r.precision} isampler3D;
	precision ${r.precision} isamplerCube;
	precision ${r.precision} isampler2DArray;
	precision ${r.precision} usampler2D;
	precision ${r.precision} usampler3D;
	precision ${r.precision} usamplerCube;
	precision ${r.precision} usampler2DArray;
	`;return r.precision==="highp"?t+=`
#define HIGH_PRECISION`:r.precision==="mediump"?t+=`
#define MEDIUM_PRECISION`:r.precision==="lowp"&&(t+=`
#define LOW_PRECISION`),t}var Jx={[En]:"SHADOWMAP_TYPE_PCF",[Qs]:"SHADOWMAP_TYPE_VSM"};function Kx(r){return Jx[r.shadowMapType]||"SHADOWMAP_TYPE_BASIC"}var Qx={[Wn]:"ENVMAP_TYPE_CUBE",[us]:"ENVMAP_TYPE_CUBE",[Jr]:"ENVMAP_TYPE_CUBE_UV"};function ty(r){return r.envMap===!1?"ENVMAP_TYPE_CUBE":Qx[r.envMapMode]||"ENVMAP_TYPE_CUBE"}var ey={[us]:"ENVMAP_MODE_REFRACTION"};function iy(r){return r.envMap===!1?"ENVMAP_MODE_REFLECTION":ey[r.envMapMode]||"ENVMAP_MODE_REFLECTION"}var ny={[Yc]:"ENVMAP_BLENDING_MULTIPLY",[Ku]:"ENVMAP_BLENDING_MIX",[Qu]:"ENVMAP_BLENDING_ADD"};function sy(r){return r.envMap===!1?"ENVMAP_BLENDING_NONE":ny[r.combine]||"ENVMAP_BLENDING_NONE"}function ry(r){let t=r.envMapCubeUVHeight;if(t===null)return null;let e=Math.log2(t)-2,i=1/t;return{texelWidth:1/(3*Math.max(Math.pow(2,e),112)),texelHeight:i,maxMip:e}}function oy(r,t,e,i){let n=r.getContext(),s=e.defines,o=e.vertexShader,a=e.fragmentShader,l=Kx(e),c=ty(e),h=iy(e),u=sy(e),d=ry(e),f=Gx(e),g=Wx(s),x=n.createProgram(),m,p,y=e.glslVersion?"#version "+e.glslVersion+`
`:"";e.isRawShaderMaterial?(m=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g].filter(ao).join(`
`),m.length>0&&(m+=`
`),p=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g].filter(ao).join(`
`),p.length>0&&(p+=`
`)):(m=[Ud(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g,e.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",e.batching?"#define USE_BATCHING":"",e.batchingColor?"#define USE_BATCHING_COLOR":"",e.instancing?"#define USE_INSTANCING":"",e.instancingColor?"#define USE_INSTANCING_COLOR":"",e.instancingMorph?"#define USE_INSTANCING_MORPH":"",e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.map?"#define USE_MAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+h:"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.displacementMap?"#define USE_DISPLACEMENTMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.mapUv?"#define MAP_UV "+e.mapUv:"",e.alphaMapUv?"#define ALPHAMAP_UV "+e.alphaMapUv:"",e.lightMapUv?"#define LIGHTMAP_UV "+e.lightMapUv:"",e.aoMapUv?"#define AOMAP_UV "+e.aoMapUv:"",e.emissiveMapUv?"#define EMISSIVEMAP_UV "+e.emissiveMapUv:"",e.bumpMapUv?"#define BUMPMAP_UV "+e.bumpMapUv:"",e.normalMapUv?"#define NORMALMAP_UV "+e.normalMapUv:"",e.displacementMapUv?"#define DISPLACEMENTMAP_UV "+e.displacementMapUv:"",e.metalnessMapUv?"#define METALNESSMAP_UV "+e.metalnessMapUv:"",e.roughnessMapUv?"#define ROUGHNESSMAP_UV "+e.roughnessMapUv:"",e.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+e.anisotropyMapUv:"",e.clearcoatMapUv?"#define CLEARCOATMAP_UV "+e.clearcoatMapUv:"",e.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+e.clearcoatNormalMapUv:"",e.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+e.clearcoatRoughnessMapUv:"",e.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+e.iridescenceMapUv:"",e.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+e.iridescenceThicknessMapUv:"",e.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+e.sheenColorMapUv:"",e.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+e.sheenRoughnessMapUv:"",e.specularMapUv?"#define SPECULARMAP_UV "+e.specularMapUv:"",e.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+e.specularColorMapUv:"",e.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+e.specularIntensityMapUv:"",e.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+e.transmissionMapUv:"",e.thicknessMapUv?"#define THICKNESSMAP_UV "+e.thicknessMapUv:"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexNormals?"#define HAS_NORMAL":"",e.vertexColors?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.flatShading?"#define FLAT_SHADED":"",e.skinning?"#define USE_SKINNING":"",e.morphTargets?"#define USE_MORPHTARGETS":"",e.morphNormals&&e.flatShading===!1?"#define USE_MORPHNORMALS":"",e.morphColors?"#define USE_MORPHCOLORS":"",e.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+e.morphTextureStride:"",e.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+e.morphTargetsCount:"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+l:"",e.sizeAttenuation?"#define USE_SIZEATTENUATION":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",e.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(ao).join(`
`),p=[Ud(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g,e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",e.map?"#define USE_MAP":"",e.matcap?"#define USE_MATCAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+c:"",e.envMap?"#define "+h:"",e.envMap?"#define "+u:"",d?"#define CUBEUV_TEXEL_WIDTH "+d.texelWidth:"",d?"#define CUBEUV_TEXEL_HEIGHT "+d.texelHeight:"",d?"#define CUBEUV_MAX_MIP "+d.maxMip+".0":"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.packedNormalMap?"#define USE_PACKED_NORMALMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoat?"#define USE_CLEARCOAT":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.dispersion?"#define USE_DISPERSION":"",e.retroreflection?"#define USE_RETROREFLECTION":"",e.iridescence?"#define USE_IRIDESCENCE":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaTest?"#define USE_ALPHATEST":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.sheen?"#define USE_SHEEN":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors||e.instancingColor?"#define USE_COLOR":"",e.vertexAlphas||e.batchingColor?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.gradientMap?"#define USE_GRADIENTMAP":"",e.flatShading?"#define FLAT_SHADED":"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+l:"",e.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.numLightProbeGrids>0?"#define USE_LIGHT_PROBES_GRID":"",e.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",e.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",e.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",e.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",e.toneMapping!==Hi?"#define TONE_MAPPING":"",e.toneMapping!==Hi?$t.tonemapping_pars_fragment:"",e.toneMapping!==Hi?Hx("toneMapping",e.toneMapping):"",e.dithering?"#define DITHERING":"",e.opaque?"#define OPAQUE":"",$t.colorspace_pars_fragment,kx("linearToOutputTexel",e.outputColorSpace),Vx(),e.useDepthPacking?"#define DEPTH_PACKING "+e.depthPacking:"",`
`].filter(ao).join(`
`)),o=Rh(o),o=Ld(o,e),o=Dd(o,e),a=Rh(a),a=Ld(a,e),a=Dd(a,e),o=Nd(o),a=Nd(a),e.isRawShaderMaterial!==!0&&(y=`#version 300 es
`,m=[f,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+m,p=["#define varying in",e.glslVersion===lh?"":"layout(location = 0) out highp vec4 pc_fragColor;",e.glslVersion===lh?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+p);let M=y+m+o,_=y+p+a,v=Cd(n,n.VERTEX_SHADER,M),S=Cd(n,n.FRAGMENT_SHADER,_);n.attachShader(x,v),n.attachShader(x,S),e.index0AttributeName!==void 0?n.bindAttribLocation(x,0,e.index0AttributeName):e.hasPositionAttribute===!0&&n.bindAttribLocation(x,0,"position"),n.linkProgram(x);function T(I){if(r.debug.checkShaderErrors){let U=n.getProgramInfoLog(x)||"",N=n.getShaderInfoLog(v)||"",C=n.getShaderInfoLog(S)||"",D=U.trim(),k=N.trim(),z=C.trim(),et=!0,$=!0;if(n.getProgramParameter(x,n.LINK_STATUS)===!1)if(et=!1,typeof r.debug.onShaderError=="function")r.debug.onShaderError(n,x,v,S);else{let Q=Id(n,v,"vertex"),V=Id(n,S,"fragment");zt("WebGLProgram: Shader Error "+n.getError()+" - VALIDATE_STATUS "+n.getProgramParameter(x,n.VALIDATE_STATUS)+`

Material Name: `+I.name+`
Material Type: `+I.type+`

Program Info Log: `+D+`
`+Q+`
`+V)}else D!==""?Ht("WebGLProgram: Program Info Log:",D):(k===""||z==="")&&($=!1);$&&(I.diagnostics={runnable:et,programLog:D,vertexShader:{log:k,prefix:m},fragmentShader:{log:z,prefix:p}})}n.deleteShader(v),n.deleteShader(S),b=new rr(n,x),A=Xx(n,x)}let b;this.getUniforms=function(){return b===void 0&&T(this),b};let A;this.getAttributes=function(){return A===void 0&&T(this),A};let R=e.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return R===!1&&(R=n.getProgramParameter(x,Ux)),R},this.destroy=function(){i.releaseStatesOfProgram(this),n.deleteProgram(x),this.program=void 0},this.type=e.shaderType,this.name=e.shaderName,this.id=Fx++,this.cacheKey=t,this.usedTimes=1,this.program=x,this.vertexShader=v,this.fragmentShader=S,this}var ay=0,Ch=class{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(t,e,i){let n=this._getShaderCacheForMaterial(t);return n.has(e)===!1&&(n.add(e),e.usedTimes++),n.has(i)===!1&&(n.add(i),i.usedTimes++),this}remove(t){let e=this.materialCache.get(t);for(let i of e)i.usedTimes--,i.usedTimes===0&&this.shaderCache.delete(i.code);return this.materialCache.delete(t),this}getVertexShaderStage(t){return this._getShaderStage(t.vertexShader)}getFragmentShaderStage(t){return this._getShaderStage(t.fragmentShader)}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(t){let e=this.materialCache,i=e.get(t);return i===void 0&&(i=new Set,e.set(t,i)),i}_getShaderStage(t){let e=this.shaderCache,i=e.get(t);return i===void 0&&(i=new Ph(t),e.set(t,i)),i}},Ph=class{constructor(t){this.id=ay++,this.code=t,this.usedTimes=0}};function ly(r){return r===qn||r===no||r===so}function cy(r,t,e,i,n,s){let o=new Dr,a=new Ch,l=new Set,c=[],h=new Map,u=i.logarithmicDepthBuffer,d=i.precision,f={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distance",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function g(b){return l.add(b),b===0?"uv":`uv${b}`}function x(b,A,R,I,U,N){let C=I.fog,D=U.geometry,k=b.isMeshStandardMaterial||b.isMeshLambertMaterial||b.isMeshPhongMaterial?I.environment:null,z=b.isMeshStandardMaterial||b.isMeshLambertMaterial&&!b.envMap||b.isMeshPhongMaterial&&!b.envMap,et=t.get(b.envMap||k,z),$=et&&et.mapping===Jr?et.image.height:null,Q=f[b.type];b.precision!==null&&(d=i.getMaxPrecision(b.precision),d!==b.precision&&Ht("WebGLProgram.getParameters:",b.precision,"not supported, using",d,"instead."));let V=D.morphAttributes.position||D.morphAttributes.normal||D.morphAttributes.color,nt=V!==void 0?V.length:0,rt=0;D.morphAttributes.position!==void 0&&(rt=1),D.morphAttributes.normal!==void 0&&(rt=2),D.morphAttributes.color!==void 0&&(rt=3);let at,lt,ht,X;if(Q){let ye=hn[Q];at=ye.vertexShader,lt=ye.fragmentShader}else{at=b.vertexShader,lt=b.fragmentShader;let ye=a.getVertexShaderStage(b),oe=a.getFragmentShaderStage(b);a.update(b,ye,oe),ht=ye.id,X=oe.id}let K=r.getRenderTarget(),ot=r.state.buffers.depth.getReversed(),Tt=U.isInstancedMesh===!0,vt=U.isBatchedMesh===!0,wt=!!b.map,qt=!!b.matcap,At=!!et,Wt=!!b.aoMap,xe=!!b.lightMap,Jt=!!b.bumpMap&&b.wireframe===!1,we=!!b.normalMap,We=!!b.displacementMap,pi=!!b.emissiveMap,Te=!!b.metalnessMap,Ne=!!b.roughnessMap,B=b.anisotropy>0,ti=b.clearcoat>0,ce=b.dispersion>0,P=b.retroreflectivity>0,w=b.iridescence>0,H=b.sheen>0,q=b.transmission>0,Z=B&&!!b.anisotropyMap,ct=ti&&!!b.clearcoatMap,ut=ti&&!!b.clearcoatNormalMap,J=ti&&!!b.clearcoatRoughnessMap,it=w&&!!b.iridescenceMap,dt=w&&!!b.iridescenceThicknessMap,Dt=H&&!!b.sheenColorMap,gt=H&&!!b.sheenRoughnessMap,ft=!!b.specularMap,Nt=!!b.specularColorMap,Bt=!!b.specularIntensityMap,Xt=q&&!!b.transmissionMap,O=q&&!!b.thicknessMap,pt=!!b.gradientMap,tt=!!b.alphaMap,mt=b.alphaTest>0,Mt=!!b.alphaHash,st=!!b.extensions,Ut=Hi;b.toneMapped&&(K===null||K.isXRRenderTarget===!0)&&(Ut=r.toneMapping);let Pt={shaderID:Q,shaderType:b.type,shaderName:b.name,vertexShader:at,fragmentShader:lt,defines:b.defines,customVertexShaderID:ht,customFragmentShaderID:X,isRawShaderMaterial:b.isRawShaderMaterial===!0,glslVersion:b.glslVersion,precision:d,batching:vt,batchingColor:vt&&U._colorsTexture!==null,instancing:Tt,instancingColor:Tt&&U.instanceColor!==null,instancingMorph:Tt&&U.morphTexture!==null,outputColorSpace:K===null?r.outputColorSpace:K.isXRRenderTarget===!0?K.texture.colorSpace:Kt.workingColorSpace,alphaToCoverage:!!b.alphaToCoverage,map:wt,matcap:qt,envMap:At,envMapMode:At&&et.mapping,envMapCubeUVHeight:$,aoMap:Wt,lightMap:xe,bumpMap:Jt,normalMap:we,displacementMap:We,emissiveMap:pi,normalMapObjectSpace:we&&b.normalMapType===id,normalMapTangentSpace:we&&b.normalMapType===xl,packedNormalMap:we&&b.normalMapType===xl&&ly(b.normalMap.format),metalnessMap:Te,roughnessMap:Ne,anisotropy:B,anisotropyMap:Z,clearcoat:ti,clearcoatMap:ct,clearcoatNormalMap:ut,clearcoatRoughnessMap:J,dispersion:ce,retroreflection:P,iridescence:w,iridescenceMap:it,iridescenceThicknessMap:dt,sheen:H,sheenColorMap:Dt,sheenRoughnessMap:gt,specularMap:ft,specularColorMap:Nt,specularIntensityMap:Bt,transmission:q,transmissionMap:Xt,thicknessMap:O,gradientMap:pt,opaque:b.transparent===!1&&b.blending===an&&b.alphaToCoverage===!1,alphaMap:tt,alphaTest:mt,alphaHash:Mt,combine:b.combine,mapUv:wt&&g(b.map.channel),aoMapUv:Wt&&g(b.aoMap.channel),lightMapUv:xe&&g(b.lightMap.channel),bumpMapUv:Jt&&g(b.bumpMap.channel),normalMapUv:we&&g(b.normalMap.channel),displacementMapUv:We&&g(b.displacementMap.channel),emissiveMapUv:pi&&g(b.emissiveMap.channel),metalnessMapUv:Te&&g(b.metalnessMap.channel),roughnessMapUv:Ne&&g(b.roughnessMap.channel),anisotropyMapUv:Z&&g(b.anisotropyMap.channel),clearcoatMapUv:ct&&g(b.clearcoatMap.channel),clearcoatNormalMapUv:ut&&g(b.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:J&&g(b.clearcoatRoughnessMap.channel),iridescenceMapUv:it&&g(b.iridescenceMap.channel),iridescenceThicknessMapUv:dt&&g(b.iridescenceThicknessMap.channel),sheenColorMapUv:Dt&&g(b.sheenColorMap.channel),sheenRoughnessMapUv:gt&&g(b.sheenRoughnessMap.channel),specularMapUv:ft&&g(b.specularMap.channel),specularColorMapUv:Nt&&g(b.specularColorMap.channel),specularIntensityMapUv:Bt&&g(b.specularIntensityMap.channel),transmissionMapUv:Xt&&g(b.transmissionMap.channel),thicknessMapUv:O&&g(b.thicknessMap.channel),alphaMapUv:tt&&g(b.alphaMap.channel),vertexTangents:!!D.attributes.tangent&&(we||B),vertexNormals:!!D.attributes.normal,vertexColors:b.vertexColors,vertexAlphas:b.vertexColors===!0&&!!D.attributes.color&&D.attributes.color.itemSize===4,pointsUvs:U.isPoints===!0&&!!D.attributes.uv&&(wt||tt),fog:!!C,useFog:b.fog===!0,fogExp2:!!C&&C.isFogExp2,flatShading:b.wireframe===!1&&(b.flatShading===!0||D.attributes.normal===void 0&&we===!1&&(b.isMeshLambertMaterial||b.isMeshPhongMaterial||b.isMeshStandardMaterial||b.isMeshPhysicalMaterial)),sizeAttenuation:b.sizeAttenuation===!0,logarithmicDepthBuffer:u,reversedDepthBuffer:ot,skinning:U.isSkinnedMesh===!0,hasPositionAttribute:D.attributes.position!==void 0,morphTargets:D.morphAttributes.position!==void 0,morphNormals:D.morphAttributes.normal!==void 0,morphColors:D.morphAttributes.color!==void 0,morphTargetsCount:nt,morphTextureStride:rt,numSunLights:A.sun.length,numDirLights:A.directional.length,numPointLights:A.point.length,numSpotLights:A.spot.length,numSpotLightMaps:A.spotLightMap.length,numRectAreaLights:A.rectArea.length,numHemiLights:A.hemi.length,numSunLightShadows:A.sunShadowMap.length,numDirLightShadows:A.directionalShadowMap.length,numPointLightShadows:A.pointShadowMap.length,numSpotLightShadows:A.spotShadowMap.length,numSpotLightShadowsWithMaps:A.numSpotLightShadowsWithMaps,numLightProbes:A.numLightProbes,numLightProbeGrids:N.length,numClippingPlanes:s.numPlanes,numClipIntersection:s.numIntersection,dithering:b.dithering,shadowMapEnabled:r.shadowMap.enabled&&R.length>0,shadowMapType:r.shadowMap.type,toneMapping:Ut,decodeVideoTexture:wt&&b.map.isVideoTexture===!0&&Kt.getTransfer(b.map.colorSpace)===le,decodeVideoTextureEmissive:pi&&b.emissiveMap.isVideoTexture===!0&&Kt.getTransfer(b.emissiveMap.colorSpace)===le,premultipliedAlpha:b.premultipliedAlpha,doubleSided:b.side===Oe,flipSided:b.side===je,useDepthPacking:b.depthPacking>=0,depthPacking:b.depthPacking||0,index0AttributeName:b.index0AttributeName,extensionClipCullDistance:st&&b.extensions.clipCullDistance===!0&&e.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(st&&b.extensions.multiDraw===!0||vt)&&e.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:e.has("KHR_parallel_shader_compile"),customProgramCacheKey:b.customProgramCacheKey()};return Pt.vertexUv1s=l.has(1),Pt.vertexUv2s=l.has(2),Pt.vertexUv3s=l.has(3),l.clear(),Pt}function m(b){let A=[];if(b.shaderID?A.push(b.shaderID):(A.push(b.customVertexShaderID),A.push(b.customFragmentShaderID)),b.defines!==void 0)for(let R in b.defines)A.push(R),A.push(b.defines[R]);return b.isRawShaderMaterial===!1&&(p(A,b),y(A,b),A.push(r.outputColorSpace)),A.push(b.customProgramCacheKey),A.join()}function p(b,A){b.push(A.precision),b.push(A.outputColorSpace),b.push(A.envMapMode),b.push(A.envMapCubeUVHeight),b.push(A.mapUv),b.push(A.alphaMapUv),b.push(A.lightMapUv),b.push(A.aoMapUv),b.push(A.bumpMapUv),b.push(A.normalMapUv),b.push(A.displacementMapUv),b.push(A.emissiveMapUv),b.push(A.metalnessMapUv),b.push(A.roughnessMapUv),b.push(A.anisotropyMapUv),b.push(A.clearcoatMapUv),b.push(A.clearcoatNormalMapUv),b.push(A.clearcoatRoughnessMapUv),b.push(A.iridescenceMapUv),b.push(A.iridescenceThicknessMapUv),b.push(A.sheenColorMapUv),b.push(A.sheenRoughnessMapUv),b.push(A.specularMapUv),b.push(A.specularColorMapUv),b.push(A.specularIntensityMapUv),b.push(A.transmissionMapUv),b.push(A.thicknessMapUv),b.push(A.combine),b.push(A.fogExp2),b.push(A.sizeAttenuation),b.push(A.morphTargetsCount),b.push(A.morphAttributeCount),b.push(A.numSunLights),b.push(A.numDirLights),b.push(A.numPointLights),b.push(A.numSpotLights),b.push(A.numSpotLightMaps),b.push(A.numHemiLights),b.push(A.numRectAreaLights),b.push(A.numSunLightShadows),b.push(A.numDirLightShadows),b.push(A.numPointLightShadows),b.push(A.numSpotLightShadows),b.push(A.numSpotLightShadowsWithMaps),b.push(A.numLightProbes),b.push(A.shadowMapType),b.push(A.toneMapping),b.push(A.numClippingPlanes),b.push(A.numClipIntersection),b.push(A.depthPacking)}function y(b,A){o.disableAll(),A.instancing&&o.enable(0),A.instancingColor&&o.enable(1),A.instancingMorph&&o.enable(2),A.matcap&&o.enable(3),A.envMap&&o.enable(4),A.normalMapObjectSpace&&o.enable(5),A.normalMapTangentSpace&&o.enable(6),A.clearcoat&&o.enable(7),A.iridescence&&o.enable(8),A.alphaTest&&o.enable(9),A.vertexColors&&o.enable(10),A.vertexAlphas&&o.enable(11),A.vertexUv1s&&o.enable(12),A.vertexUv2s&&o.enable(13),A.vertexUv3s&&o.enable(14),A.vertexTangents&&o.enable(15),A.anisotropy&&o.enable(16),A.alphaHash&&o.enable(17),A.batching&&o.enable(18),A.dispersion&&o.enable(19),A.retroreflection&&o.enable(24),A.batchingColor&&o.enable(20),A.gradientMap&&o.enable(21),A.packedNormalMap&&o.enable(22),A.vertexNormals&&o.enable(23),b.push(o.mask),o.disableAll(),A.fog&&o.enable(0),A.useFog&&o.enable(1),A.flatShading&&o.enable(2),A.logarithmicDepthBuffer&&o.enable(3),A.reversedDepthBuffer&&o.enable(4),A.skinning&&o.enable(5),A.morphTargets&&o.enable(6),A.morphNormals&&o.enable(7),A.morphColors&&o.enable(8),A.premultipliedAlpha&&o.enable(9),A.shadowMapEnabled&&o.enable(10),A.doubleSided&&o.enable(11),A.flipSided&&o.enable(12),A.useDepthPacking&&o.enable(13),A.dithering&&o.enable(14),A.transmission&&o.enable(15),A.sheen&&o.enable(16),A.opaque&&o.enable(17),A.pointsUvs&&o.enable(18),A.decodeVideoTexture&&o.enable(19),A.decodeVideoTextureEmissive&&o.enable(20),A.alphaToCoverage&&o.enable(21),A.numLightProbeGrids>0&&o.enable(22),A.hasPositionAttribute&&o.enable(23),b.push(o.mask)}function M(b){let A=f[b.type],R;if(A){let I=hn[A];R=gd.clone(I.uniforms)}else R=b.uniforms;return R}function _(b,A){let R=h.get(A);return R!==void 0?++R.usedTimes:(R=new oy(r,A,b,n),c.push(R),h.set(A,R)),R}function v(b){if(--b.usedTimes===0){let A=c.indexOf(b);c[A]=c[c.length-1],c.pop(),h.delete(b.cacheKey),b.destroy()}}function S(b){a.remove(b)}function T(){a.dispose()}return{getParameters:x,getProgramCacheKey:m,getUniforms:M,acquireProgram:_,releaseProgram:v,releaseShaderCache:S,programs:c,dispose:T}}function hy(){let r=new WeakMap;function t(o){return r.has(o)}function e(o){let a=r.get(o);return a===void 0&&(a={},r.set(o,a)),a}function i(o){r.delete(o)}function n(o,a,l){r.get(o)[a]=l}function s(){r=new WeakMap}return{has:t,get:e,remove:i,update:n,dispose:s}}function uy(r,t){return r.groupOrder!==t.groupOrder?r.groupOrder-t.groupOrder:r.renderOrder!==t.renderOrder?r.renderOrder-t.renderOrder:r.material.id!==t.material.id?r.material.id-t.material.id:r.materialVariant!==t.materialVariant?r.materialVariant-t.materialVariant:r.z!==t.z?r.z-t.z:r.id-t.id}function Fd(r,t){return r.groupOrder!==t.groupOrder?r.groupOrder-t.groupOrder:r.renderOrder!==t.renderOrder?r.renderOrder-t.renderOrder:r.z!==t.z?t.z-r.z:r.id-t.id}function Od(){let r=[],t=0,e=[],i=[],n=[];function s(){t=0,e.length=0,i.length=0,n.length=0}function o(d){let f=0;return d.isInstancedMesh&&(f+=2),d.isSkinnedMesh&&(f+=1),f}function a(d,f,g,x,m,p){let y=r[t];return y===void 0?(y={id:d.id,object:d,geometry:f,material:g,materialVariant:o(d),groupOrder:x,renderOrder:d.renderOrder,z:m,group:p},r[t]=y):(y.id=d.id,y.object=d,y.geometry=f,y.material=g,y.materialVariant=o(d),y.groupOrder=x,y.renderOrder=d.renderOrder,y.z=m,y.group=p),t++,y}function l(d,f,g,x,m,p,y){y.reversedDepth===!0&&(m=-m);let M=a(d,f,g,x,m,p);g.transmission>0?i.push(M):g.transparent===!0?n.push(M):e.push(M)}function c(d,f,g,x,m,p){let y=a(d,f,g,x,m,p);g.transmission>0?i.unshift(y):g.transparent===!0?n.unshift(y):e.unshift(y)}function h(d,f){e.length>1&&e.sort(d||uy),i.length>1&&i.sort(f||Fd),n.length>1&&n.sort(f||Fd)}function u(){for(let d=t,f=r.length;d<f;d++){let g=r[d];if(g.id===null)break;g.id=null,g.object=null,g.geometry=null,g.material=null,g.group=null}}return{opaque:e,transmissive:i,transparent:n,init:s,push:l,unshift:c,finish:u,sort:h}}function dy(){let r=new WeakMap;function t(i,n){let s=r.get(i),o;return s===void 0?(o=new Od,r.set(i,[o])):n>=s.length?(o=new Od,s.push(o)):o=s[n],o}function e(){r=new WeakMap}return{get:t,dispose:e}}function fy(){let r={};return{get:function(t){if(r[t.id]!==void 0)return r[t.id];let e;switch(t.type){case"SunLight":case"DirectionalLight":e={direction:new L,color:new It};break;case"SpotLight":e={position:new L,direction:new L,color:new It,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":e={position:new L,color:new It,distance:0,decay:0};break;case"HemisphereLight":e={direction:new L,skyColor:new It,groundColor:new It};break;case"RectAreaLight":e={color:new It,position:new L,halfWidth:new L,halfHeight:new L};break}return r[t.id]=e,e}}}function py(){let r={};return{get:function(t){if(r[t.id]!==void 0)return r[t.id];let e;switch(t.type){case"SunLight":case"DirectionalLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Vt};break;case"SpotLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Vt};break;case"PointLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Vt,shadowCameraNear:1,shadowCameraFar:1e3};break}return r[t.id]=e,e}}}var my=0;function gy(r,t){return(t.castShadow?2:0)-(r.castShadow?2:0)+(t.map?1:0)-(r.map?1:0)}function xy(r){let t=new fy,e=py(),i={version:0,hash:{sunLength:-1,directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numSunShadows:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],sun:[],sunShadow:[],sunShadowMap:[],sunShadowMatrix:[],sunShadowCascade:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)i.probe.push(new L);let n=new L,s=new fe,o=new fe;function a(c){let h=0,u=0,d=0;for(let U=0;U<9;U++)i.probe[U].set(0,0,0);let f=0,g=0,x=0,m=0,p=0,y=0,M=0,_=0,v=0,S=0,T=0,b=0,A=0,R=0;c.sort(gy);for(let U=0,N=c.length;U<N;U++){let C=c[U],D=C.color,k=C.intensity,z=C.distance,et=null;if(C.shadow&&C.shadow.map&&(C.shadow.map.texture.format===qn?et=C.shadow.map.texture:et=C.shadow.map.depthTexture||C.shadow.map.texture),C.isAmbientLight)h+=D.r*k,u+=D.g*k,d+=D.b*k;else if(C.isLightProbe){for(let $=0;$<9;$++)i.probe[$].addScaledVector(C.sh.coefficients[$],k);R++}else if(C.isSunLight){let $=t.get(C);if($.color.copy(C.color).multiplyScalar(C.intensity),C.castShadow){let Q=C.shadow,V=e.get(C);V.shadowIntensity=Q.intensity,V.shadowBias=Q.bias,V.shadowNormalBias=Q.normalBias,V.shadowRadius=Q.radius,V.shadowMapSize.copy(Q.mapSize).multiply(Q.getFrameExtents()),i.sunShadow[g]=V,i.sunShadowMap[g]=et;let nt=Q.getViewportCount();for(let rt=0;rt<nt;rt++)i.sunShadowMatrix[x+rt]=Q.getMatrix(rt),i.sunShadowCascade[x+rt]=Q._cascadeData[rt];x+=nt,g++}i.sun[f]=$,f++}else if(C.isDirectionalLight){let $=t.get(C);if($.color.copy(C.color).multiplyScalar(C.intensity),C.castShadow){let Q=C.shadow,V=e.get(C);V.shadowIntensity=Q.intensity,V.shadowBias=Q.bias,V.shadowNormalBias=Q.normalBias,V.shadowRadius=Q.radius,V.shadowMapSize=Q.mapSize,i.directionalShadow[m]=V,i.directionalShadowMap[m]=et,i.directionalShadowMatrix[m]=C.shadow.matrix,v++}i.directional[m]=$,m++}else if(C.isSpotLight){let $=t.get(C);$.position.setFromMatrixPosition(C.matrixWorld),$.color.copy(D).multiplyScalar(k),$.distance=z,$.coneCos=Math.cos(C.angle),$.penumbraCos=Math.cos(C.angle*(1-C.penumbra)),$.decay=C.decay,i.spot[y]=$;let Q=C.shadow;if(C.map&&(i.spotLightMap[b]=C.map,b++,Q.updateMatrices(C),C.castShadow&&A++),i.spotLightMatrix[y]=Q.matrix,C.castShadow){let V=e.get(C);V.shadowIntensity=Q.intensity,V.shadowBias=Q.bias,V.shadowNormalBias=Q.normalBias,V.shadowRadius=Q.radius,V.shadowMapSize=Q.mapSize,i.spotShadow[y]=V,i.spotShadowMap[y]=et,T++}y++}else if(C.isRectAreaLight){let $=t.get(C);$.color.copy(D).multiplyScalar(k),$.halfWidth.set(C.width*.5,0,0),$.halfHeight.set(0,C.height*.5,0),i.rectArea[M]=$,M++}else if(C.isPointLight){let $=t.get(C);if($.color.copy(C.color).multiplyScalar(C.intensity),$.distance=C.distance,$.decay=C.decay,C.castShadow){let Q=C.shadow,V=e.get(C);V.shadowIntensity=Q.intensity,V.shadowBias=Q.bias,V.shadowNormalBias=Q.normalBias,V.shadowRadius=Q.radius,V.shadowMapSize=Q.mapSize,V.shadowCameraNear=Q.camera.near,V.shadowCameraFar=Q.camera.far,i.pointShadow[p]=V,i.pointShadowMap[p]=et,i.pointShadowMatrix[p]=C.shadow.matrix,S++}i.point[p]=$,p++}else if(C.isHemisphereLight){let $=t.get(C);$.skyColor.copy(C.color).multiplyScalar(k),$.groundColor.copy(C.groundColor).multiplyScalar(k),i.hemi[_]=$,_++}}M>0&&(r.has("OES_texture_float_linear")===!0?(i.rectAreaLTC1=xt.LTC_FLOAT_1,i.rectAreaLTC2=xt.LTC_FLOAT_2):(i.rectAreaLTC1=xt.LTC_HALF_1,i.rectAreaLTC2=xt.LTC_HALF_2)),i.ambient[0]=h,i.ambient[1]=u,i.ambient[2]=d;let I=i.hash;(I.sunLength!==f||I.directionalLength!==m||I.pointLength!==p||I.spotLength!==y||I.rectAreaLength!==M||I.hemiLength!==_||I.numSunShadows!==g||I.numDirectionalShadows!==v||I.numPointShadows!==S||I.numSpotShadows!==T||I.numSpotMaps!==b||I.numLightProbes!==R)&&(i.sun.length=f,i.directional.length=m,i.spot.length=y,i.rectArea.length=M,i.point.length=p,i.hemi.length=_,i.sunShadow.length=g,i.sunShadowMap.length=g,i.sunShadowMatrix.length=x,i.sunShadowCascade.length=x,i.directionalShadow.length=v,i.directionalShadowMap.length=v,i.directionalShadowMatrix.length=v,i.pointShadow.length=S,i.pointShadowMap.length=S,i.pointShadowMatrix.length=S,i.spotShadow.length=T,i.spotShadowMap.length=T,i.spotLightMatrix.length=T+b-A,i.spotLightMap.length=b,i.numSpotLightShadowsWithMaps=A,i.numLightProbes=R,I.sunLength=f,I.directionalLength=m,I.pointLength=p,I.spotLength=y,I.rectAreaLength=M,I.hemiLength=_,I.numSunShadows=g,I.numDirectionalShadows=v,I.numPointShadows=S,I.numSpotShadows=T,I.numSpotMaps=b,I.numLightProbes=R,i.version=my++)}function l(c,h){let u=0,d=0,f=0,g=0,x=0,m=0,p=h.matrixWorldInverse;for(let y=0,M=c.length;y<M;y++){let _=c[y];if(_.isSunLight){let v=i.sun[u];v.direction.setFromMatrixPosition(_.matrixWorld),v.direction.transformDirection(p),u++}else if(_.isDirectionalLight){let v=i.directional[d];v.direction.setFromMatrixPosition(_.matrixWorld),n.setFromMatrixPosition(_.target.matrixWorld),v.direction.sub(n),v.direction.transformDirection(p),d++}else if(_.isSpotLight){let v=i.spot[g];v.position.setFromMatrixPosition(_.matrixWorld),v.position.applyMatrix4(p),v.direction.setFromMatrixPosition(_.matrixWorld),n.setFromMatrixPosition(_.target.matrixWorld),v.direction.sub(n),v.direction.transformDirection(p),g++}else if(_.isRectAreaLight){let v=i.rectArea[x];v.position.setFromMatrixPosition(_.matrixWorld),v.position.applyMatrix4(p),o.identity(),s.copy(_.matrixWorld),s.premultiply(p),o.extractRotation(s),v.halfWidth.set(_.width*.5,0,0),v.halfHeight.set(0,_.height*.5,0),v.halfWidth.applyMatrix4(o),v.halfHeight.applyMatrix4(o),x++}else if(_.isPointLight){let v=i.point[f];v.position.setFromMatrixPosition(_.matrixWorld),v.position.applyMatrix4(p),f++}else if(_.isHemisphereLight){let v=i.hemi[m];v.direction.setFromMatrixPosition(_.matrixWorld),v.direction.transformDirection(p),m++}}}return{setup:a,setupView:l,state:i}}function Bd(r){let t=new xy(r),e=[],i=[],n=[];function s(d){u.camera=d,e.length=0,i.length=0,n.length=0}function o(d){e.push(d)}function a(d){i.push(d)}function l(d){n.push(d)}function c(){t.setup(e)}function h(d){t.setupView(e,d)}let u={lightsArray:e,shadowsArray:i,lightProbeGridArray:n,camera:null,lights:t,transmissionRenderTarget:{},textureUnits:0};return{init:s,state:u,setupLights:c,setupLightsView:h,pushLight:o,pushShadow:a,pushLightProbeGrid:l}}function yy(r){let t=new WeakMap;function e(n,s=0){let o=t.get(n),a;return o===void 0?(a=new Bd(r),t.set(n,[a])):s>=o.length?(a=new Bd(r),o.push(a)):a=o[s],a}function i(){t=new WeakMap}return{get:e,dispose:i}}var _y=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,vy=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ).rg;
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ).r;
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( max( 0.0, squared_mean - mean * mean ) );
	gl_FragColor = vec4( mean, std_dev, 0.0, 1.0 );
}`,My=[new L(1,0,0),new L(-1,0,0),new L(0,1,0),new L(0,-1,0),new L(0,0,1),new L(0,0,-1)],by=[new L(0,-1,0),new L(0,-1,0),new L(0,0,1),new L(0,0,-1),new L(0,-1,0),new L(0,-1,0)],kd=new fe,oo=new L,Sh=new L;function Sy(r,t,e){let i=new Js,n=new Vt,s=new Vt,o=new Ee,a=new ma,l=new ga,c={},h=e.maxTextureSize,u={[rn]:je,[je]:rn,[Oe]:Oe},d=new Ze({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new Vt},radius:{value:4}},vertexShader:_y,fragmentShader:vy}),f=d.clone();f.defines.HORIZONTAL_PASS=1;let g=new Ae;g.setAttribute("position",new Se(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));let x=new Et(g,d),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=En;let p=this.type;this.render=function(S,T,b){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||S.length===0)return;this.type===Du&&(Ht("WebGLShadowMap: PCFSoftShadowMap has been removed. Using PCFShadowMap instead."),this.type=En);let A=r.getRenderTarget(),R=r.getActiveCubeFace(),I=r.getActiveMipmapLevel(),U=r.state;U.setBlending(on),U.buffers.depth.getReversed()===!0?U.buffers.color.setClear(0,0,0,0):U.buffers.color.setClear(1,1,1,1),U.buffers.depth.setTest(!0),U.setScissorTest(!1);let N=p!==this.type;N&&T.traverse(function(C){C.material&&(Array.isArray(C.material)?C.material.forEach(D=>D.needsUpdate=!0):C.material.needsUpdate=!0)});for(let C=0,D=S.length;C<D;C++){let k=S[C],z=k.shadow;if(z===void 0){Ht("WebGLShadowMap:",k,"has no shadow.");continue}if(z.autoUpdate===!1&&z.needsUpdate===!1)continue;n.copy(z.mapSize);let et=z.getFrameExtents();n.multiply(et),s.copy(z.mapSize),(n.x>h||n.y>h)&&(n.x>h&&(s.x=Math.floor(h/et.x),n.x=s.x*et.x,z.mapSize.x=s.x),n.y>h&&(s.y=Math.floor(h/et.y),n.y=s.y*et.y,z.mapSize.y=s.y));let $=r.state.buffers.depth.getReversed();if(z.camera._reversedDepth=$,z.map===null||N===!0){if(z.map!==null&&(z.map.depthTexture!==null&&(z.map.depthTexture.dispose(),z.map.depthTexture=null),z.map.dispose()),this.type===Qs){if(k.isPointLight){Ht("WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.");continue}z.map=new mi(n.x,n.y,{format:qn,type:Gi,minFilter:ke,magFilter:ke,generateMipmaps:!1}),z.map.texture.name=k.name+".shadowMap",z.map.depthTexture=new zn(n.x,n.y,Pi),z.map.depthTexture.name=k.name+".shadowMapDepth",z.map.depthTexture.format=Qi,z.map.depthTexture.compareFunction=null,z.map.depthTexture.minFilter=qe,z.map.depthTexture.magFilter=qe}else k.isPointLight?(z.map=new bl(n.x),z.map.depthTexture=new fa(n.x,Vi)):(z.map=new mi(n.x,n.y),z.map.depthTexture=new zn(n.x,n.y,Vi)),z.map.depthTexture.name=k.name+".shadowMap",z.map.depthTexture.format=Qi,this.type===En?(z.map.depthTexture.compareFunction=$?_l:yl,z.map.depthTexture.minFilter=ke,z.map.depthTexture.magFilter=ke):(z.map.depthTexture.compareFunction=null,z.map.depthTexture.minFilter=qe,z.map.depthTexture.magFilter=qe);z.camera.updateProjectionMatrix()}z.map.isWebGLCubeRenderTarget!==!0&&(z.map.width!==n.x||z.map.height!==n.y)&&z.map.setSize(n.x,n.y);let Q=z.map.isWebGLCubeRenderTarget?6:z.getViewportCount();k.isPointLight!==!0&&z.updateMatrices(k,b);for(let V=0;V<Q;V++){let nt=z.getCamera(V);if(k.isPointLight){let rt=z.camera,at=z.matrix,lt=k.distance||rt.far;lt!==rt.far&&(rt.far=lt,rt.updateProjectionMatrix()),oo.setFromMatrixPosition(k.matrixWorld),rt.position.copy(oo),Sh.copy(rt.position),Sh.add(My[V]),rt.up.copy(by[V]),rt.lookAt(Sh),rt.updateMatrixWorld(),at.makeTranslation(-oo.x,-oo.y,-oo.z),kd.multiplyMatrices(rt.projectionMatrix,rt.matrixWorldInverse),z._frustum.setFromProjectionMatrix(kd,rt.coordinateSystem,rt.reversedDepth)}if(z.map.isWebGLCubeRenderTarget)r.setRenderTarget(z.map,V),r.clear();else{V===0&&(r.setRenderTarget(z.map),r.clear());let rt=z.getViewport(V);o.set(s.x*rt.x,s.y*rt.y,s.x*rt.z,s.y*rt.w),U.viewport(o)}i=z.getFrustum(V),_(T,b,nt,k,this.type)}z.isPointLightShadow!==!0&&this.type===Qs&&y(z,b),z.needsUpdate=!1}p=this.type,m.needsUpdate=!1,r.setRenderTarget(A,R,I)};function y(S,T){let b=t.update(x);d.defines.VSM_SAMPLES!==S.blurSamples&&(d.defines.VSM_SAMPLES=S.blurSamples,f.defines.VSM_SAMPLES=S.blurSamples,d.needsUpdate=!0,f.needsUpdate=!0),S.mapPass===null?S.mapPass=new mi(n.x,n.y,{format:qn,type:Gi}):(S.mapPass.width!==S.map.width||S.mapPass.height!==S.map.height)&&S.mapPass.setSize(S.map.width,S.map.height),d.uniforms.shadow_pass.value=S.map.depthTexture,d.uniforms.resolution.value.set(S.map.width,S.map.height),d.uniforms.radius.value=S.radius,r.setRenderTarget(S.mapPass),r.clear(),r.renderBufferDirect(T,null,b,d,x,null),f.uniforms.shadow_pass.value=S.mapPass.texture,f.uniforms.resolution.value.set(S.map.width,S.map.height),f.uniforms.radius.value=S.radius,r.setRenderTarget(S.map),r.clear(),r.renderBufferDirect(T,null,b,f,x,null)}function M(S,T,b,A){let R=null,I=b.isPointLight===!0?S.customDistanceMaterial:S.customDepthMaterial;if(I!==void 0)R=I;else if(R=b.isPointLight===!0?l:a,r.localClippingEnabled&&T.clipShadows===!0&&Array.isArray(T.clippingPlanes)&&T.clippingPlanes.length!==0||T.displacementMap&&T.displacementScale!==0||T.alphaMap&&T.alphaTest>0||T.map&&T.alphaTest>0||T.alphaToCoverage===!0){let U=R.uuid,N=T.uuid,C=c[U];C===void 0&&(C={},c[U]=C);let D=C[N];D===void 0&&(D=R.clone(),C[N]=D,T.addEventListener("dispose",v)),R=D}if(R.visible=T.visible,R.wireframe=T.wireframe,A===Qs?R.side=T.shadowSide!==null?T.shadowSide:T.side:R.side=T.shadowSide!==null?T.shadowSide:u[T.side],R.alphaMap=T.alphaMap,R.alphaTest=T.alphaToCoverage===!0?.5:T.alphaTest,R.map=T.map,R.clipShadows=T.clipShadows,R.clippingPlanes=T.clippingPlanes,R.clipIntersection=T.clipIntersection,R.displacementMap=T.displacementMap,R.displacementScale=T.displacementScale,R.displacementBias=T.displacementBias,R.wireframeLinewidth=T.wireframeLinewidth,R.linewidth=T.linewidth,b.isPointLight===!0&&R.isMeshDistanceMaterial===!0){let U=r.properties.get(R);U.light=b}return R}function _(S,T,b,A,R){if(S.visible===!1)return;if(S.layers.test(T.layers)&&(S.isMesh||S.isLine||S.isPoints)&&(S.castShadow||S.receiveShadow&&R===Qs)&&(!S.frustumCulled||S.intersectsFrustum(i))){S.modelViewMatrix.multiplyMatrices(b.matrixWorldInverse,S.matrixWorld);let N=t.update(S),C=S.material;if(Array.isArray(C)){let D=N.groups;for(let k=0,z=D.length;k<z;k++){let et=D[k],$=C[et.materialIndex];if($&&$.visible){let Q=M(S,$,A,R);S.onBeforeShadow(r,S,T,b,N,Q,et),r.renderBufferDirect(b,null,N,Q,S,et),S.onAfterShadow(r,S,T,b,N,Q,et)}}}else if(C.visible){let D=M(S,C,A,R);S.onBeforeShadow(r,S,T,b,N,D,null),r.renderBufferDirect(b,null,N,D,S,null),S.onAfterShadow(r,S,T,b,N,D,null)}}let U=S.children;for(let N=0,C=U.length;N<C;N++)_(U[N],T,b,A,R)}function v(S){S.target.removeEventListener("dispose",v);for(let b in c){let A=c[b],R=S.target.uuid;R in A&&(A[R].dispose(),delete A[R])}}}function wy(r,t){function e(){let O=!1,pt=new Ee,tt=null,mt=new Ee(0,0,0,0);return{setMask:function(Mt){tt!==Mt&&!O&&(r.colorMask(Mt,Mt,Mt,Mt),tt=Mt)},setLocked:function(Mt){O=Mt},setClear:function(Mt,st,Ut,Pt,ye){ye===!0&&(Mt*=Pt,st*=Pt,Ut*=Pt),pt.set(Mt,st,Ut,Pt),mt.equals(pt)===!1&&(r.clearColor(Mt,st,Ut,Pt),mt.copy(pt))},reset:function(){O=!1,tt=null,mt.set(-1,0,0,0)}}}function i(){let O=!1,pt=!1,tt=null,mt=null,Mt=null;return{setReversed:function(st){if(pt!==st){let Ut=t.get("EXT_clip_control");st?Ut.clipControlEXT(Ut.LOWER_LEFT_EXT,Ut.ZERO_TO_ONE_EXT):Ut.clipControlEXT(Ut.LOWER_LEFT_EXT,Ut.NEGATIVE_ONE_TO_ONE_EXT),pt=st;let Pt=Mt;Mt=null,this.setClear(Pt)}},getReversed:function(){return pt},setTest:function(st){st?K(r.DEPTH_TEST):ot(r.DEPTH_TEST)},setMask:function(st){tt!==st&&!O&&(r.depthMask(st),tt=st)},setFunc:function(st){if(pt&&(st=fd[st]),mt!==st){switch(st){case Ko:r.depthFunc(r.NEVER);break;case Qo:r.depthFunc(r.ALWAYS);break;case ta:r.depthFunc(r.LESS);break;case Ws:r.depthFunc(r.LEQUAL);break;case ea:r.depthFunc(r.EQUAL);break;case ia:r.depthFunc(r.GEQUAL);break;case na:r.depthFunc(r.GREATER);break;case sa:r.depthFunc(r.NOTEQUAL);break;default:r.depthFunc(r.LEQUAL)}mt=st}},setLocked:function(st){O=st},setClear:function(st){Mt!==st&&(Mt=st,pt&&(st=1-st),r.clearDepth(st))},reset:function(){O=!1,tt=null,mt=null,Mt=null,pt=!1}}}function n(){let O=!1,pt=null,tt=null,mt=null,Mt=null,st=null,Ut=null,Pt=null,ye=null;return{setTest:function(oe){O||(oe?K(r.STENCIL_TEST):ot(r.STENCIL_TEST))},setMask:function(oe){pt!==oe&&!O&&(r.stencilMask(oe),pt=oe)},setFunc:function(oe,Ui,Zi){(tt!==oe||mt!==Ui||Mt!==Zi)&&(r.stencilFunc(oe,Ui,Zi),tt=oe,mt=Ui,Mt=Zi)},setOp:function(oe,Ui,Zi){(st!==oe||Ut!==Ui||Pt!==Zi)&&(r.stencilOp(oe,Ui,Zi),st=oe,Ut=Ui,Pt=Zi)},setLocked:function(oe){O=oe},setClear:function(oe){ye!==oe&&(r.clearStencil(oe),ye=oe)},reset:function(){O=!1,pt=null,tt=null,mt=null,Mt=null,st=null,Ut=null,Pt=null,ye=null}}}let s=new e,o=new i,a=new n,l=new WeakMap,c=new WeakMap,h={},u={},d={},f=new WeakMap,g=[],x=null,m=!1,p=null,y=null,M=null,_=null,v=null,S=null,T=null,b=new It(0,0,0),A=0,R=!1,I=null,U=null,N=null,C=null,D=null,k=r.getParameter(r.MAX_COMBINED_TEXTURE_IMAGE_UNITS),z=!1,et=0,$=r.getParameter(r.VERSION);$.indexOf("WebGL")!==-1?(et=parseFloat(/^WebGL (\d)/.exec($)[1]),z=et>=1):$.indexOf("OpenGL ES")!==-1&&(et=parseFloat(/^OpenGL ES (\d)/.exec($)[1]),z=et>=2);let Q=null,V={},nt=r.getParameter(r.SCISSOR_BOX),rt=r.getParameter(r.VIEWPORT),at=new Ee().fromArray(nt),lt=new Ee().fromArray(rt);function ht(O,pt,tt,mt){let Mt=new Uint8Array(4),st=r.createTexture();r.bindTexture(O,st),r.texParameteri(O,r.TEXTURE_MIN_FILTER,r.NEAREST),r.texParameteri(O,r.TEXTURE_MAG_FILTER,r.NEAREST);for(let Ut=0;Ut<tt;Ut++)O===r.TEXTURE_3D||O===r.TEXTURE_2D_ARRAY?r.texImage3D(pt,0,r.RGBA,1,1,mt,0,r.RGBA,r.UNSIGNED_BYTE,Mt):r.texImage2D(pt+Ut,0,r.RGBA,1,1,0,r.RGBA,r.UNSIGNED_BYTE,Mt);return st}let X={};X[r.TEXTURE_2D]=ht(r.TEXTURE_2D,r.TEXTURE_2D,1),X[r.TEXTURE_CUBE_MAP]=ht(r.TEXTURE_CUBE_MAP,r.TEXTURE_CUBE_MAP_POSITIVE_X,6),X[r.TEXTURE_2D_ARRAY]=ht(r.TEXTURE_2D_ARRAY,r.TEXTURE_2D_ARRAY,1,1),X[r.TEXTURE_3D]=ht(r.TEXTURE_3D,r.TEXTURE_3D,1,1),s.setClear(0,0,0,1),o.setClear(1),a.setClear(0),K(r.DEPTH_TEST),o.setFunc(Ws),Jt(!1),we(Vc),K(r.CULL_FACE),Wt(on);function K(O){h[O]!==!0&&(r.enable(O),h[O]=!0)}function ot(O){h[O]!==!1&&(r.disable(O),h[O]=!1)}function Tt(O,pt){return d[O]!==pt?(r.bindFramebuffer(O,pt),d[O]=pt,O===r.DRAW_FRAMEBUFFER&&(d[r.FRAMEBUFFER]=pt),O===r.FRAMEBUFFER&&(d[r.DRAW_FRAMEBUFFER]=pt),!0):!1}function vt(O,pt){let tt=g,mt=!1;if(O){tt=f.get(pt),tt===void 0&&(tt=[],f.set(pt,tt));let Mt=O.textures;if(tt.length!==Mt.length||tt[0]!==r.COLOR_ATTACHMENT0){for(let st=0,Ut=Mt.length;st<Ut;st++)tt[st]=r.COLOR_ATTACHMENT0+st;tt.length=Mt.length,mt=!0}}else tt[0]!==r.BACK&&(tt[0]=r.BACK,mt=!0);mt&&r.drawBuffers(tt)}function wt(O){return x!==O?(r.useProgram(O),x=O,!0):!1}let qt={[hs]:r.FUNC_ADD,[Uu]:r.FUNC_SUBTRACT,[Fu]:r.FUNC_REVERSE_SUBTRACT};qt[Ou]=r.MIN,qt[Bu]=r.MAX;let At={[ku]:r.ZERO,[zu]:r.ONE,[Hu]:r.SRC_COLOR,[Xc]:r.SRC_ALPHA,[Yu]:r.SRC_ALPHA_SATURATE,[Xu]:r.DST_COLOR,[Gu]:r.DST_ALPHA,[Vu]:r.ONE_MINUS_SRC_COLOR,[qc]:r.ONE_MINUS_SRC_ALPHA,[qu]:r.ONE_MINUS_DST_COLOR,[Wu]:r.ONE_MINUS_DST_ALPHA,[$u]:r.CONSTANT_COLOR,[Zu]:r.ONE_MINUS_CONSTANT_COLOR,[ju]:r.CONSTANT_ALPHA,[Ju]:r.ONE_MINUS_CONSTANT_ALPHA};function Wt(O,pt,tt,mt,Mt,st,Ut,Pt,ye,oe){if(O===on){m===!0&&(ot(r.BLEND),m=!1);return}if(m===!1&&(K(r.BLEND),m=!0),O!==Nu){if(O!==p||oe!==R){if((y!==hs||v!==hs)&&(r.blendEquation(r.FUNC_ADD),y=hs,v=hs),oe)switch(O){case an:r.blendFuncSeparate(r.ONE,r.ONE_MINUS_SRC_ALPHA,r.ONE,r.ONE_MINUS_SRC_ALPHA);break;case Si:r.blendFunc(r.ONE,r.ONE);break;case Gc:r.blendFuncSeparate(r.ZERO,r.ONE_MINUS_SRC_COLOR,r.ZERO,r.ONE);break;case Wc:r.blendFuncSeparate(r.DST_COLOR,r.ONE_MINUS_SRC_ALPHA,r.ZERO,r.ONE);break;default:zt("WebGLState: Invalid blending: ",O);break}else switch(O){case an:r.blendFuncSeparate(r.SRC_ALPHA,r.ONE_MINUS_SRC_ALPHA,r.ONE,r.ONE_MINUS_SRC_ALPHA);break;case Si:r.blendFuncSeparate(r.SRC_ALPHA,r.ONE,r.ONE,r.ONE);break;case Gc:zt("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case Wc:zt("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:zt("WebGLState: Invalid blending: ",O);break}M=null,_=null,S=null,T=null,b.set(0,0,0),A=0,p=O,R=oe}return}Mt=Mt||pt,st=st||tt,Ut=Ut||mt,(pt!==y||Mt!==v)&&(r.blendEquationSeparate(qt[pt],qt[Mt]),y=pt,v=Mt),(tt!==M||mt!==_||st!==S||Ut!==T)&&(r.blendFuncSeparate(At[tt],At[mt],At[st],At[Ut]),M=tt,_=mt,S=st,T=Ut),(Pt.equals(b)===!1||ye!==A)&&(r.blendColor(Pt.r,Pt.g,Pt.b,ye),b.copy(Pt),A=ye),p=O,R=!1}function xe(O,pt){O.side===Oe?ot(r.CULL_FACE):K(r.CULL_FACE);let tt=O.side===je;pt&&(tt=!tt),Jt(tt),O.blending===an&&O.transparent===!1?Wt(on):Wt(O.blending,O.blendEquation,O.blendSrc,O.blendDst,O.blendEquationAlpha,O.blendSrcAlpha,O.blendDstAlpha,O.blendColor,O.blendAlpha,O.premultipliedAlpha),o.setFunc(O.depthFunc),o.setTest(O.depthTest),o.setMask(O.depthWrite),s.setMask(O.colorWrite);let mt=O.stencilWrite;a.setTest(mt),mt&&(a.setMask(O.stencilWriteMask),a.setFunc(O.stencilFunc,O.stencilRef,O.stencilFuncMask),a.setOp(O.stencilFail,O.stencilZFail,O.stencilZPass)),pi(O.polygonOffset,O.polygonOffsetFactor,O.polygonOffsetUnits),O.alphaToCoverage===!0?K(r.SAMPLE_ALPHA_TO_COVERAGE):ot(r.SAMPLE_ALPHA_TO_COVERAGE)}function Jt(O){I!==O&&(O?r.frontFace(r.CW):r.frontFace(r.CCW),I=O)}function we(O){O!==Iu?(K(r.CULL_FACE),O!==U&&(O===Vc?r.cullFace(r.BACK):O===Lu?r.cullFace(r.FRONT):r.cullFace(r.FRONT_AND_BACK))):ot(r.CULL_FACE),U=O}function We(O){O!==N&&(z&&r.lineWidth(O),N=O)}function pi(O,pt,tt){O?(K(r.POLYGON_OFFSET_FILL),(C!==pt||D!==tt)&&(C=pt,D=tt,o.getReversed()&&(pt=-pt),r.polygonOffset(pt,tt))):ot(r.POLYGON_OFFSET_FILL)}function Te(O){O?K(r.SCISSOR_TEST):ot(r.SCISSOR_TEST)}function Ne(O){O===void 0&&(O=r.TEXTURE0+k-1),Q!==O&&(r.activeTexture(O),Q=O)}function B(O,pt,tt){tt===void 0&&(Q===null?tt=r.TEXTURE0+k-1:tt=Q);let mt=V[tt];mt===void 0&&(mt={type:void 0,texture:void 0},V[tt]=mt),(mt.type!==O||mt.texture!==pt)&&(Q!==tt&&(r.activeTexture(tt),Q=tt),r.bindTexture(O,pt||X[O]),mt.type=O,mt.texture=pt)}function ti(){let O=V[Q];O!==void 0&&O.type!==void 0&&(r.bindTexture(O.type,null),O.type=void 0,O.texture=void 0)}function ce(){try{r.compressedTexImage2D(...arguments)}catch(O){zt("WebGLState:",O)}}function P(){try{r.compressedTexImage3D(...arguments)}catch(O){zt("WebGLState:",O)}}function w(){try{r.texSubImage2D(...arguments)}catch(O){zt("WebGLState:",O)}}function H(){try{r.texSubImage3D(...arguments)}catch(O){zt("WebGLState:",O)}}function q(){try{r.compressedTexSubImage2D(...arguments)}catch(O){zt("WebGLState:",O)}}function Z(){try{r.compressedTexSubImage3D(...arguments)}catch(O){zt("WebGLState:",O)}}function ct(){try{r.texStorage2D(...arguments)}catch(O){zt("WebGLState:",O)}}function ut(){try{r.texStorage3D(...arguments)}catch(O){zt("WebGLState:",O)}}function J(){try{r.texImage2D(...arguments)}catch(O){zt("WebGLState:",O)}}function it(){try{r.texImage3D(...arguments)}catch(O){zt("WebGLState:",O)}}function dt(O){return u[O]!==void 0?u[O]:r.getParameter(O)}function Dt(O,pt){u[O]!==pt&&(r.pixelStorei(O,pt),u[O]=pt)}function gt(O){at.equals(O)===!1&&(r.scissor(O.x,O.y,O.z,O.w),at.copy(O))}function ft(O){lt.equals(O)===!1&&(r.viewport(O.x,O.y,O.z,O.w),lt.copy(O))}function Nt(O,pt){let tt=c.get(pt);tt===void 0&&(tt=new WeakMap,c.set(pt,tt));let mt=tt.get(O);mt===void 0&&(mt=r.getUniformBlockIndex(pt,O.name),tt.set(O,mt))}function Bt(O,pt){let mt=c.get(pt).get(O);l.get(pt)!==mt&&(r.uniformBlockBinding(pt,mt,O.__bindingPointIndex),l.set(pt,mt))}function Xt(){r.disable(r.BLEND),r.disable(r.CULL_FACE),r.disable(r.DEPTH_TEST),r.disable(r.POLYGON_OFFSET_FILL),r.disable(r.SCISSOR_TEST),r.disable(r.STENCIL_TEST),r.disable(r.SAMPLE_ALPHA_TO_COVERAGE),r.blendEquation(r.FUNC_ADD),r.blendFunc(r.ONE,r.ZERO),r.blendFuncSeparate(r.ONE,r.ZERO,r.ONE,r.ZERO),r.blendColor(0,0,0,0),r.colorMask(!0,!0,!0,!0),r.clearColor(0,0,0,0),r.depthMask(!0),r.depthFunc(r.LESS),o.setReversed(!1),r.clearDepth(1),r.stencilMask(4294967295),r.stencilFunc(r.ALWAYS,0,4294967295),r.stencilOp(r.KEEP,r.KEEP,r.KEEP),r.clearStencil(0),r.cullFace(r.BACK),r.frontFace(r.CCW),r.polygonOffset(0,0),r.activeTexture(r.TEXTURE0),r.bindFramebuffer(r.FRAMEBUFFER,null),r.bindFramebuffer(r.DRAW_FRAMEBUFFER,null),r.bindFramebuffer(r.READ_FRAMEBUFFER,null),r.useProgram(null),r.lineWidth(1),r.scissor(0,0,r.canvas.width,r.canvas.height),r.viewport(0,0,r.canvas.width,r.canvas.height),r.pixelStorei(r.PACK_ALIGNMENT,4),r.pixelStorei(r.UNPACK_ALIGNMENT,4),r.pixelStorei(r.UNPACK_FLIP_Y_WEBGL,!1),r.pixelStorei(r.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),r.pixelStorei(r.UNPACK_COLORSPACE_CONVERSION_WEBGL,r.BROWSER_DEFAULT_WEBGL),r.pixelStorei(r.PACK_ROW_LENGTH,0),r.pixelStorei(r.PACK_SKIP_PIXELS,0),r.pixelStorei(r.PACK_SKIP_ROWS,0),r.pixelStorei(r.UNPACK_ROW_LENGTH,0),r.pixelStorei(r.UNPACK_IMAGE_HEIGHT,0),r.pixelStorei(r.UNPACK_SKIP_PIXELS,0),r.pixelStorei(r.UNPACK_SKIP_ROWS,0),r.pixelStorei(r.UNPACK_SKIP_IMAGES,0),h={},u={},Q=null,V={},d={},f=new WeakMap,g=[],x=null,m=!1,p=null,y=null,M=null,_=null,v=null,S=null,T=null,b=new It(0,0,0),A=0,R=!1,I=null,U=null,N=null,C=null,D=null,at.set(0,0,r.canvas.width,r.canvas.height),lt.set(0,0,r.canvas.width,r.canvas.height),s.reset(),o.reset(),a.reset()}return{buffers:{color:s,depth:o,stencil:a},enable:K,disable:ot,bindFramebuffer:Tt,drawBuffers:vt,useProgram:wt,setBlending:Wt,setMaterial:xe,setFlipSided:Jt,setCullFace:we,setLineWidth:We,setPolygonOffset:pi,setScissorTest:Te,activeTexture:Ne,bindTexture:B,unbindTexture:ti,compressedTexImage2D:ce,compressedTexImage3D:P,texImage2D:J,texImage3D:it,pixelStorei:Dt,getParameter:dt,updateUBOMapping:Nt,uniformBlockBinding:Bt,texStorage2D:ct,texStorage3D:ut,texSubImage2D:w,texSubImage3D:H,compressedTexSubImage2D:q,compressedTexSubImage3D:Z,scissor:gt,viewport:ft,reset:Xt}}function Ey(r,t,e,i,n,s,o){let a=t.has("WEBGL_multisampled_render_to_texture")?t.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new Vt,h=new WeakMap,u=new Set,d,f=new WeakMap,g=!1;try{g=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function x(P,w){return g?new OffscreenCanvas(P,w):Pr("canvas")}function m(P,w,H){let q=1,Z=ce(P);if((Z.width>H||Z.height>H)&&(q=H/Math.max(Z.width,Z.height)),q<1)if(typeof HTMLImageElement<"u"&&P instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&P instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&P instanceof ImageBitmap||typeof VideoFrame<"u"&&P instanceof VideoFrame){let ct=Math.floor(q*Z.width),ut=Math.floor(q*Z.height);d===void 0&&(d=x(ct,ut));let J=w?x(ct,ut):d;return J.width=ct,J.height=ut,J.getContext("2d").drawImage(P,0,0,ct,ut),Ht("WebGLRenderer: Texture has been resized from ("+Z.width+"x"+Z.height+") to ("+ct+"x"+ut+")."),J}else return"data"in P&&Ht("WebGLRenderer: Image in DataTexture is too big ("+Z.width+"x"+Z.height+")."),P;return P}function p(P){return P.generateMipmaps}function y(P){r.generateMipmap(P)}function M(P){return P.isWebGLCubeRenderTarget?r.TEXTURE_CUBE_MAP:P.isWebGL3DRenderTarget?r.TEXTURE_3D:P.isWebGLArrayRenderTarget||P.isCompressedArrayTexture?r.TEXTURE_2D_ARRAY:r.TEXTURE_2D}function _(P,w,H,q,Z,ct=!1){if(P!==null){if(r[P]!==void 0)return r[P];Ht("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+P+"'")}let ut;q&&(ut=t.get("EXT_texture_norm16"),ut||Ht("WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension"));let J=w;if(w===r.RED&&(H===r.FLOAT&&(J=r.R32F),H===r.HALF_FLOAT&&(J=r.R16F),H===r.UNSIGNED_BYTE&&(J=r.R8),H===r.UNSIGNED_SHORT&&ut&&(J=ut.R16_EXT),H===r.SHORT&&ut&&(J=ut.R16_SNORM_EXT)),w===r.RED_INTEGER&&(H===r.UNSIGNED_BYTE&&(J=r.R8UI),H===r.UNSIGNED_SHORT&&(J=r.R16UI),H===r.UNSIGNED_INT&&(J=r.R32UI),H===r.BYTE&&(J=r.R8I),H===r.SHORT&&(J=r.R16I),H===r.INT&&(J=r.R32I)),w===r.RG&&(H===r.FLOAT&&(J=r.RG32F),H===r.HALF_FLOAT&&(J=r.RG16F),H===r.UNSIGNED_BYTE&&(J=r.RG8),H===r.UNSIGNED_SHORT&&ut&&(J=ut.RG16_EXT),H===r.SHORT&&ut&&(J=ut.RG16_SNORM_EXT)),w===r.RG_INTEGER&&(H===r.UNSIGNED_BYTE&&(J=r.RG8UI),H===r.UNSIGNED_SHORT&&(J=r.RG16UI),H===r.UNSIGNED_INT&&(J=r.RG32UI),H===r.BYTE&&(J=r.RG8I),H===r.SHORT&&(J=r.RG16I),H===r.INT&&(J=r.RG32I)),w===r.RGB_INTEGER&&(H===r.UNSIGNED_BYTE&&(J=r.RGB8UI),H===r.UNSIGNED_SHORT&&(J=r.RGB16UI),H===r.UNSIGNED_INT&&(J=r.RGB32UI),H===r.BYTE&&(J=r.RGB8I),H===r.SHORT&&(J=r.RGB16I),H===r.INT&&(J=r.RGB32I)),w===r.RGBA_INTEGER&&(H===r.UNSIGNED_BYTE&&(J=r.RGBA8UI),H===r.UNSIGNED_SHORT&&(J=r.RGBA16UI),H===r.UNSIGNED_INT&&(J=r.RGBA32UI),H===r.BYTE&&(J=r.RGBA8I),H===r.SHORT&&(J=r.RGBA16I),H===r.INT&&(J=r.RGBA32I)),w===r.RGB&&(H===r.UNSIGNED_SHORT&&ut&&(J=ut.RGB16_EXT),H===r.SHORT&&ut&&(J=ut.RGB16_SNORM_EXT),H===r.UNSIGNED_INT_5_9_9_9_REV&&(J=r.RGB9_E5),H===r.UNSIGNED_INT_10F_11F_11F_REV&&(J=r.R11F_G11F_B10F)),w===r.RGBA){let it=ct?Cr:Kt.getTransfer(Z);H===r.FLOAT&&(J=r.RGBA32F),H===r.HALF_FLOAT&&(J=r.RGBA16F),H===r.UNSIGNED_BYTE&&(J=it===le?r.SRGB8_ALPHA8:r.RGBA8),H===r.UNSIGNED_SHORT&&ut&&(J=ut.RGBA16_EXT),H===r.SHORT&&ut&&(J=ut.RGBA16_SNORM_EXT),H===r.UNSIGNED_SHORT_4_4_4_4&&(J=r.RGBA4),H===r.UNSIGNED_SHORT_5_5_5_1&&(J=r.RGB5_A1)}return(J===r.R16F||J===r.R32F||J===r.RG16F||J===r.RG32F||J===r.RGBA16F||J===r.RGBA32F)&&t.get("EXT_color_buffer_float"),J}function v(P,w){let H;return P?w===null||w===Vi||w===er?H=r.DEPTH24_STENCIL8:w===Pi?H=r.DEPTH32F_STENCIL8:w===tr&&(H=r.DEPTH24_STENCIL8,Ht("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):w===null||w===Vi||w===er?H=r.DEPTH_COMPONENT24:w===Pi?H=r.DEPTH_COMPONENT32F:w===tr&&(H=r.DEPTH_COMPONENT16),H}function S(P,w){return p(P)===!0||P.isFramebufferTexture&&P.minFilter!==qe&&P.minFilter!==ke?Math.log2(Math.max(w.width,w.height))+1:P.mipmaps!==void 0&&P.mipmaps.length>0?P.mipmaps.length:P.isCompressedTexture&&Array.isArray(P.image)?w.mipmaps.length:1}function T(P){let w=P.target;w.removeEventListener("dispose",T),A(w),w.isVideoTexture&&h.delete(w),w.isHTMLTexture&&u.delete(w)}function b(P){let w=P.target;w.removeEventListener("dispose",b),I(w)}function A(P){let w=i.get(P);if(w.__webglInit===void 0)return;let H=P.source,q=f.get(H);if(q){let Z=q[w.__cacheKey];Z.usedTimes--,Z.usedTimes===0&&R(P),Object.keys(q).length===0&&f.delete(H)}i.remove(P)}function R(P){let w=i.get(P);r.deleteTexture(w.__webglTexture);let H=P.source,q=f.get(H);delete q[w.__cacheKey],o.memory.textures--}function I(P){let w=i.get(P);if(P.depthTexture&&(P.depthTexture.dispose(),i.remove(P.depthTexture)),P.isWebGLCubeRenderTarget)for(let q=0;q<6;q++){if(Array.isArray(w.__webglFramebuffer[q]))for(let Z=0;Z<w.__webglFramebuffer[q].length;Z++)r.deleteFramebuffer(w.__webglFramebuffer[q][Z]);else r.deleteFramebuffer(w.__webglFramebuffer[q]);w.__webglDepthbuffer&&r.deleteRenderbuffer(w.__webglDepthbuffer[q])}else{if(Array.isArray(w.__webglFramebuffer))for(let q=0;q<w.__webglFramebuffer.length;q++)r.deleteFramebuffer(w.__webglFramebuffer[q]);else r.deleteFramebuffer(w.__webglFramebuffer);if(w.__webglDepthbuffer&&r.deleteRenderbuffer(w.__webglDepthbuffer),w.__webglMultisampledFramebuffer&&r.deleteFramebuffer(w.__webglMultisampledFramebuffer),w.__webglColorRenderbuffer)for(let q=0;q<w.__webglColorRenderbuffer.length;q++)w.__webglColorRenderbuffer[q]&&r.deleteRenderbuffer(w.__webglColorRenderbuffer[q]);w.__webglDepthRenderbuffer&&r.deleteRenderbuffer(w.__webglDepthRenderbuffer)}let H=P.textures;for(let q=0,Z=H.length;q<Z;q++){let ct=i.get(H[q]);ct.__webglTexture&&(r.deleteTexture(ct.__webglTexture),o.memory.textures--),i.remove(H[q])}i.remove(P)}let U=0;function N(){U=0}function C(){return U}function D(P){U=P}function k(){let P=U;return P>=n.maxTextures&&Ht("WebGLTextures: Trying to use "+(P+1)+" texture units while this GPU supports only "+n.maxTextures),U+=1,P}function z(P){let w=[];return w.push(P.wrapS),w.push(P.wrapT),w.push(P.wrapR||0),w.push(P.magFilter),w.push(P.minFilter),w.push(P.anisotropy),w.push(P.internalFormat),w.push(P.format),w.push(P.type),w.push(P.generateMipmaps),w.push(P.premultiplyAlpha),w.push(P.flipY),w.push(P.unpackAlignment),w.push(P.colorSpace),w.join()}function et(P,w){let H=i.get(P);if(P.isVideoTexture&&B(P),P.isRenderTargetTexture===!1&&P.isExternalTexture!==!0&&P.version>0&&H.__version!==P.version){let q=P.image;if(q===null)Ht("WebGLRenderer: Texture marked for update but no image data found.");else if(q.complete===!1)Ht("WebGLRenderer: Texture marked for update but image is incomplete");else{ot(H,P,w);return}}else P.isExternalTexture&&(H.__webglTexture=P.sourceTexture?P.sourceTexture:null);e.bindTexture(r.TEXTURE_2D,H.__webglTexture,r.TEXTURE0+w)}function $(P,w){let H=i.get(P);if(P.isRenderTargetTexture===!1&&P.version>0&&H.__version!==P.version){ot(H,P,w);return}else P.isExternalTexture&&(H.__webglTexture=P.sourceTexture?P.sourceTexture:null);e.bindTexture(r.TEXTURE_2D_ARRAY,H.__webglTexture,r.TEXTURE0+w)}function Q(P,w){let H=i.get(P);if(P.isRenderTargetTexture===!1&&P.version>0&&H.__version!==P.version){ot(H,P,w);return}e.bindTexture(r.TEXTURE_3D,H.__webglTexture,r.TEXTURE0+w)}function V(P,w){let H=i.get(P);if(P.isCubeDepthTexture!==!0&&P.version>0&&H.__version!==P.version){Tt(H,P,w);return}e.bindTexture(r.TEXTURE_CUBE_MAP,H.__webglTexture,r.TEXTURE0+w)}let nt={[Mn]:r.REPEAT,[Mi]:r.CLAMP_TO_EDGE,[ra]:r.MIRRORED_REPEAT},rt={[qe]:r.NEAREST,[td]:r.NEAREST_MIPMAP_NEAREST,[Kr]:r.NEAREST_MIPMAP_LINEAR,[ke]:r.LINEAR,[Da]:r.LINEAR_MIPMAP_NEAREST,[ln]:r.LINEAR_MIPMAP_LINEAR},at={[sd]:r.NEVER,[cd]:r.ALWAYS,[rd]:r.LESS,[yl]:r.LEQUAL,[od]:r.EQUAL,[_l]:r.GEQUAL,[ad]:r.GREATER,[ld]:r.NOTEQUAL};function lt(P,w){if(w.type===Pi&&t.has("OES_texture_float_linear")===!1&&(w.magFilter===ke||w.magFilter===Da||w.magFilter===Kr||w.magFilter===ln||w.minFilter===ke||w.minFilter===Da||w.minFilter===Kr||w.minFilter===ln)&&Ht("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),r.texParameteri(P,r.TEXTURE_WRAP_S,nt[w.wrapS]),r.texParameteri(P,r.TEXTURE_WRAP_T,nt[w.wrapT]),(P===r.TEXTURE_3D||P===r.TEXTURE_2D_ARRAY)&&r.texParameteri(P,r.TEXTURE_WRAP_R,nt[w.wrapR]),r.texParameteri(P,r.TEXTURE_MAG_FILTER,rt[w.magFilter]),r.texParameteri(P,r.TEXTURE_MIN_FILTER,rt[w.minFilter]),w.compareFunction&&(r.texParameteri(P,r.TEXTURE_COMPARE_MODE,r.COMPARE_REF_TO_TEXTURE),r.texParameteri(P,r.TEXTURE_COMPARE_FUNC,at[w.compareFunction])),t.has("EXT_texture_filter_anisotropic")===!0){if(w.magFilter===qe||w.minFilter!==Kr&&w.minFilter!==ln||w.type===Pi&&t.has("OES_texture_float_linear")===!1)return;if(w.anisotropy>1||i.get(w).__currentAnisotropy){let H=t.get("EXT_texture_filter_anisotropic");r.texParameterf(P,H.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(w.anisotropy,n.getMaxAnisotropy())),i.get(w).__currentAnisotropy=w.anisotropy}}}function ht(P,w){let H=!1;P.__webglInit===void 0&&(P.__webglInit=!0,w.addEventListener("dispose",T));let q=w.source,Z=f.get(q);Z===void 0&&(Z={},f.set(q,Z));let ct=z(w);if(ct!==P.__cacheKey){Z[ct]===void 0&&(Z[ct]={texture:r.createTexture(),usedTimes:0},o.memory.textures++,H=!0),Z[ct].usedTimes++;let ut=Z[P.__cacheKey];ut!==void 0&&(Z[P.__cacheKey].usedTimes--,ut.usedTimes===0&&R(w)),P.__cacheKey=ct,P.__webglTexture=Z[ct].texture}return H}function X(P,w,H){return Math.floor(Math.floor(P/H)/w)}function K(P,w,H,q){let ct=P.updateRanges;if(ct.length===0)e.texSubImage2D(r.TEXTURE_2D,0,0,0,w.width,w.height,H,q,w.data);else{ct.sort((Dt,gt)=>Dt.start-gt.start);let ut=0;for(let Dt=1;Dt<ct.length;Dt++){let gt=ct[ut],ft=ct[Dt],Nt=gt.start+gt.count,Bt=X(ft.start,w.width,4),Xt=X(gt.start,w.width,4);ft.start<=Nt+1&&Bt===Xt&&X(ft.start+ft.count-1,w.width,4)===Bt?gt.count=Math.max(gt.count,ft.start+ft.count-gt.start):(++ut,ct[ut]=ft)}ct.length=ut+1;let J=e.getParameter(r.UNPACK_ROW_LENGTH),it=e.getParameter(r.UNPACK_SKIP_PIXELS),dt=e.getParameter(r.UNPACK_SKIP_ROWS);e.pixelStorei(r.UNPACK_ROW_LENGTH,w.width);for(let Dt=0,gt=ct.length;Dt<gt;Dt++){let ft=ct[Dt],Nt=Math.floor(ft.start/4),Bt=Math.ceil(ft.count/4),Xt=Nt%w.width,O=Math.floor(Nt/w.width),pt=Bt,tt=1;e.pixelStorei(r.UNPACK_SKIP_PIXELS,Xt),e.pixelStorei(r.UNPACK_SKIP_ROWS,O),e.texSubImage2D(r.TEXTURE_2D,0,Xt,O,pt,tt,H,q,w.data)}P.clearUpdateRanges(),e.pixelStorei(r.UNPACK_ROW_LENGTH,J),e.pixelStorei(r.UNPACK_SKIP_PIXELS,it),e.pixelStorei(r.UNPACK_SKIP_ROWS,dt)}}function ot(P,w,H){let q=r.TEXTURE_2D;(w.isDataArrayTexture||w.isCompressedArrayTexture)&&(q=r.TEXTURE_2D_ARRAY),w.isData3DTexture&&(q=r.TEXTURE_3D);let Z=ht(P,w),ct=w.source;e.bindTexture(q,P.__webglTexture,r.TEXTURE0+H);let ut=i.get(ct);if(ct.version!==ut.__version||Z===!0){if(e.activeTexture(r.TEXTURE0+H),(typeof ImageBitmap<"u"&&w.image instanceof ImageBitmap)===!1){let tt=Kt.getPrimaries(Kt.workingColorSpace),mt=w.colorSpace===Wi?null:Kt.getPrimaries(w.colorSpace),Mt=w.colorSpace===Wi||tt===mt?r.NONE:r.BROWSER_DEFAULT_WEBGL;e.pixelStorei(r.UNPACK_FLIP_Y_WEBGL,w.flipY),e.pixelStorei(r.UNPACK_PREMULTIPLY_ALPHA_WEBGL,w.premultiplyAlpha),e.pixelStorei(r.UNPACK_COLORSPACE_CONVERSION_WEBGL,Mt)}e.pixelStorei(r.UNPACK_ALIGNMENT,w.unpackAlignment);let it=m(w.image,!1,n.maxTextureSize);it=ti(w,it);let dt=s.convert(w.format,w.colorSpace),Dt=s.convert(w.type),gt=_(w.internalFormat,dt,Dt,w.normalized,w.colorSpace,w.isVideoTexture);lt(q,w);let ft,Nt=w.mipmaps,Bt=w.isVideoTexture!==!0,Xt=ut.__version===void 0||Z===!0,O=ct.dataReady,pt=S(w,it);if(w.isDepthTexture)gt=v(w.format===Xn,w.type),Xt&&(Bt?e.texStorage2D(r.TEXTURE_2D,1,gt,it.width,it.height):e.texImage2D(r.TEXTURE_2D,0,gt,it.width,it.height,0,dt,Dt,null));else if(w.isDataTexture)if(Nt.length>0){Bt&&Xt&&e.texStorage2D(r.TEXTURE_2D,pt,gt,Nt[0].width,Nt[0].height);for(let tt=0,mt=Nt.length;tt<mt;tt++)ft=Nt[tt],Bt?O&&e.texSubImage2D(r.TEXTURE_2D,tt,0,0,ft.width,ft.height,dt,Dt,ft.data):e.texImage2D(r.TEXTURE_2D,tt,gt,ft.width,ft.height,0,dt,Dt,ft.data);w.generateMipmaps=!1}else Bt?(Xt&&e.texStorage2D(r.TEXTURE_2D,pt,gt,it.width,it.height),O&&K(w,it,dt,Dt)):e.texImage2D(r.TEXTURE_2D,0,gt,it.width,it.height,0,dt,Dt,it.data);else if(w.isCompressedTexture)if(w.isCompressedArrayTexture){Bt&&Xt&&e.texStorage3D(r.TEXTURE_2D_ARRAY,pt,gt,Nt[0].width,Nt[0].height,it.depth);for(let tt=0,mt=Nt.length;tt<mt;tt++)if(ft=Nt[tt],w.format!==xi)if(dt!==null)if(Bt){if(O)if(w.layerUpdates.size>0){let Mt=dh(ft.width,ft.height,w.format,w.type);for(let st of w.layerUpdates){let Ut=ft.data.subarray(st*Mt/ft.data.BYTES_PER_ELEMENT,(st+1)*Mt/ft.data.BYTES_PER_ELEMENT);e.compressedTexSubImage3D(r.TEXTURE_2D_ARRAY,tt,0,0,st,ft.width,ft.height,1,dt,Ut)}}else e.compressedTexSubImage3D(r.TEXTURE_2D_ARRAY,tt,0,0,0,ft.width,ft.height,it.depth,dt,ft.data)}else e.compressedTexImage3D(r.TEXTURE_2D_ARRAY,tt,gt,ft.width,ft.height,it.depth,0,ft.data,0,0);else Ht("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else Bt?O&&e.texSubImage3D(r.TEXTURE_2D_ARRAY,tt,0,0,0,ft.width,ft.height,it.depth,dt,Dt,ft.data):e.texImage3D(r.TEXTURE_2D_ARRAY,tt,gt,ft.width,ft.height,it.depth,0,dt,Dt,ft.data);w.layerUpdates.size>0&&w.clearLayerUpdates()}else{Bt&&Xt&&e.texStorage2D(r.TEXTURE_2D,pt,gt,Nt[0].width,Nt[0].height);for(let tt=0,mt=Nt.length;tt<mt;tt++)ft=Nt[tt],w.format!==xi?dt!==null?Bt?O&&e.compressedTexSubImage2D(r.TEXTURE_2D,tt,0,0,ft.width,ft.height,dt,ft.data):e.compressedTexImage2D(r.TEXTURE_2D,tt,gt,ft.width,ft.height,0,ft.data):Ht("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Bt?O&&e.texSubImage2D(r.TEXTURE_2D,tt,0,0,ft.width,ft.height,dt,Dt,ft.data):e.texImage2D(r.TEXTURE_2D,tt,gt,ft.width,ft.height,0,dt,Dt,ft.data)}else if(w.isDataArrayTexture)if(Bt){if(Xt&&e.texStorage3D(r.TEXTURE_2D_ARRAY,pt,gt,it.width,it.height,it.depth),O)if(w.layerUpdates.size>0){let tt=dh(it.width,it.height,w.format,w.type);for(let mt of w.layerUpdates){let Mt=it.data.subarray(mt*tt/it.data.BYTES_PER_ELEMENT,(mt+1)*tt/it.data.BYTES_PER_ELEMENT);e.texSubImage3D(r.TEXTURE_2D_ARRAY,0,0,0,mt,it.width,it.height,1,dt,Dt,Mt)}w.clearLayerUpdates()}else e.texSubImage3D(r.TEXTURE_2D_ARRAY,0,0,0,0,it.width,it.height,it.depth,dt,Dt,it.data)}else e.texImage3D(r.TEXTURE_2D_ARRAY,0,gt,it.width,it.height,it.depth,0,dt,Dt,it.data);else if(w.isData3DTexture)Bt?(Xt&&e.texStorage3D(r.TEXTURE_3D,pt,gt,it.width,it.height,it.depth),O&&e.texSubImage3D(r.TEXTURE_3D,0,0,0,0,it.width,it.height,it.depth,dt,Dt,it.data)):e.texImage3D(r.TEXTURE_3D,0,gt,it.width,it.height,it.depth,0,dt,Dt,it.data);else if(w.isFramebufferTexture){if(Xt)if(Bt)e.texStorage2D(r.TEXTURE_2D,pt,gt,it.width,it.height);else{let tt=it.width,mt=it.height;for(let Mt=0;Mt<pt;Mt++)e.texImage2D(r.TEXTURE_2D,Mt,gt,tt,mt,0,dt,Dt,null),tt>>=1,mt>>=1}}else if(w.isHTMLTexture){if("texElementImage2D"in r){let tt=r.canvas;if(tt.hasAttribute("layoutsubtree")||tt.setAttribute("layoutsubtree","true"),it.parentNode!==tt){tt.appendChild(it),u.add(w),tt.onpaint=mt=>{let Mt=mt.changedElements;for(let st of u)Mt.includes(st.image)&&(st.needsUpdate=!0)},tt.requestPaint();return}if(r.texElementImage2D.length===3)r.texElementImage2D(r.TEXTURE_2D,r.RGBA8,it);else{let Mt=r.RGBA,st=r.RGBA,Ut=r.UNSIGNED_BYTE;r.texElementImage2D(r.TEXTURE_2D,0,Mt,st,Ut,it)}r.texParameteri(r.TEXTURE_2D,r.TEXTURE_MIN_FILTER,r.LINEAR),r.texParameteri(r.TEXTURE_2D,r.TEXTURE_WRAP_S,r.CLAMP_TO_EDGE),r.texParameteri(r.TEXTURE_2D,r.TEXTURE_WRAP_T,r.CLAMP_TO_EDGE)}}else if(Nt.length>0){if(Bt&&Xt){let tt=ce(Nt[0]);e.texStorage2D(r.TEXTURE_2D,pt,gt,tt.width,tt.height)}for(let tt=0,mt=Nt.length;tt<mt;tt++)ft=Nt[tt],Bt?O&&e.texSubImage2D(r.TEXTURE_2D,tt,0,0,dt,Dt,ft):e.texImage2D(r.TEXTURE_2D,tt,gt,dt,Dt,ft);w.generateMipmaps=!1}else if(Bt){if(Xt){let tt=ce(it);e.texStorage2D(r.TEXTURE_2D,pt,gt,tt.width,tt.height)}O&&e.texSubImage2D(r.TEXTURE_2D,0,0,0,dt,Dt,it)}else e.texImage2D(r.TEXTURE_2D,0,gt,dt,Dt,it);p(w)&&y(q),ut.__version=ct.version,w.onUpdate&&w.onUpdate(w)}P.__version=w.version}function Tt(P,w,H){if(w.image.length!==6)return;let q=ht(P,w),Z=w.source;e.bindTexture(r.TEXTURE_CUBE_MAP,P.__webglTexture,r.TEXTURE0+H);let ct=i.get(Z);if(Z.version!==ct.__version||q===!0){e.activeTexture(r.TEXTURE0+H);let ut=Kt.getPrimaries(Kt.workingColorSpace),J=w.colorSpace===Wi?null:Kt.getPrimaries(w.colorSpace),it=w.colorSpace===Wi||ut===J?r.NONE:r.BROWSER_DEFAULT_WEBGL;e.pixelStorei(r.UNPACK_FLIP_Y_WEBGL,w.flipY),e.pixelStorei(r.UNPACK_PREMULTIPLY_ALPHA_WEBGL,w.premultiplyAlpha),e.pixelStorei(r.UNPACK_ALIGNMENT,w.unpackAlignment),e.pixelStorei(r.UNPACK_COLORSPACE_CONVERSION_WEBGL,it);let dt=w.isCompressedTexture||w.image[0].isCompressedTexture,Dt=w.image[0]&&w.image[0].isDataTexture,gt=[];for(let st=0;st<6;st++)!dt&&!Dt?gt[st]=m(w.image[st],!0,n.maxCubemapSize):gt[st]=Dt?w.image[st].image:w.image[st],gt[st]=ti(w,gt[st]);let ft=gt[0],Nt=s.convert(w.format,w.colorSpace),Bt=s.convert(w.type),Xt=_(w.internalFormat,Nt,Bt,w.normalized,w.colorSpace),O=w.isVideoTexture!==!0,pt=ct.__version===void 0||q===!0,tt=Z.dataReady,mt=S(w,ft);lt(r.TEXTURE_CUBE_MAP,w);let Mt;if(dt){O&&pt&&e.texStorage2D(r.TEXTURE_CUBE_MAP,mt,Xt,ft.width,ft.height);for(let st=0;st<6;st++){Mt=gt[st].mipmaps;for(let Ut=0;Ut<Mt.length;Ut++){let Pt=Mt[Ut];w.format!==xi?Nt!==null?O?tt&&e.compressedTexSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+st,Ut,0,0,Pt.width,Pt.height,Nt,Pt.data):e.compressedTexImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+st,Ut,Xt,Pt.width,Pt.height,0,Pt.data):Ht("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):O?tt&&e.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+st,Ut,0,0,Pt.width,Pt.height,Nt,Bt,Pt.data):e.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+st,Ut,Xt,Pt.width,Pt.height,0,Nt,Bt,Pt.data)}}}else{if(Mt=w.mipmaps,O&&pt){Mt.length>0&&mt++;let st=ce(gt[0]);e.texStorage2D(r.TEXTURE_CUBE_MAP,mt,Xt,st.width,st.height)}for(let st=0;st<6;st++)if(Dt){O?tt&&e.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+st,0,0,0,gt[st].width,gt[st].height,Nt,Bt,gt[st].data):e.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+st,0,Xt,gt[st].width,gt[st].height,0,Nt,Bt,gt[st].data);for(let Ut=0;Ut<Mt.length;Ut++){let ye=Mt[Ut].image[st].image;O?tt&&e.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+st,Ut+1,0,0,ye.width,ye.height,Nt,Bt,ye.data):e.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+st,Ut+1,Xt,ye.width,ye.height,0,Nt,Bt,ye.data)}}else{O?tt&&e.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+st,0,0,0,Nt,Bt,gt[st]):e.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+st,0,Xt,Nt,Bt,gt[st]);for(let Ut=0;Ut<Mt.length;Ut++){let Pt=Mt[Ut];O?tt&&e.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+st,Ut+1,0,0,Nt,Bt,Pt.image[st]):e.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+st,Ut+1,Xt,Nt,Bt,Pt.image[st])}}}p(w)&&y(r.TEXTURE_CUBE_MAP),ct.__version=Z.version,w.onUpdate&&w.onUpdate(w)}P.__version=w.version}function vt(P,w,H,q,Z,ct){let ut=s.convert(H.format,H.colorSpace),J=s.convert(H.type),it=_(H.internalFormat,ut,J,H.normalized,H.colorSpace),dt=i.get(w),Dt=i.get(H);if(Dt.__renderTarget=w,!dt.__hasExternalTextures){let gt=Math.max(1,w.width>>ct),ft=Math.max(1,w.height>>ct);Z===r.TEXTURE_3D||Z===r.TEXTURE_2D_ARRAY?e.texImage3D(Z,ct,it,gt,ft,w.depth,0,ut,J,null):e.texImage2D(Z,ct,it,gt,ft,0,ut,J,null)}e.bindFramebuffer(r.FRAMEBUFFER,P),Ne(w)?a.framebufferTexture2DMultisampleEXT(r.FRAMEBUFFER,q,Z,Dt.__webglTexture,0,Te(w)):(Z===r.TEXTURE_2D||Z>=r.TEXTURE_CUBE_MAP_POSITIVE_X&&Z<=r.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&r.framebufferTexture2D(r.FRAMEBUFFER,q,Z,Dt.__webglTexture,ct),e.bindFramebuffer(r.FRAMEBUFFER,null)}function wt(P,w,H){if(r.bindRenderbuffer(r.RENDERBUFFER,P),w.depthBuffer){let q=w.depthTexture,Z=q&&q.isDepthTexture?q.type:null,ct=v(w.stencilBuffer,Z),ut=w.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT;Ne(w)?a.renderbufferStorageMultisampleEXT(r.RENDERBUFFER,Te(w),ct,w.width,w.height):H?r.renderbufferStorageMultisample(r.RENDERBUFFER,Te(w),ct,w.width,w.height):r.renderbufferStorage(r.RENDERBUFFER,ct,w.width,w.height),r.framebufferRenderbuffer(r.FRAMEBUFFER,ut,r.RENDERBUFFER,P)}else{let q=w.textures;for(let Z=0;Z<q.length;Z++){let ct=q[Z],ut=s.convert(ct.format,ct.colorSpace),J=s.convert(ct.type),it=_(ct.internalFormat,ut,J,ct.normalized,ct.colorSpace);Ne(w)?a.renderbufferStorageMultisampleEXT(r.RENDERBUFFER,Te(w),it,w.width,w.height):H?r.renderbufferStorageMultisample(r.RENDERBUFFER,Te(w),it,w.width,w.height):r.renderbufferStorage(r.RENDERBUFFER,it,w.width,w.height)}}r.bindRenderbuffer(r.RENDERBUFFER,null)}function qt(P,w,H){let q=w.isWebGLCubeRenderTarget===!0;if(e.bindFramebuffer(r.FRAMEBUFFER,P),!(w.depthTexture&&w.depthTexture.isDepthTexture))throw new Error("THREE.WebGLTextures: renderTarget.depthTexture must be an instance of THREE.DepthTexture.");let Z=i.get(w.depthTexture);if(Z.__renderTarget=w,(!Z.__webglTexture||w.depthTexture.image.width!==w.width||w.depthTexture.image.height!==w.height)&&(w.depthTexture.image.width=w.width,w.depthTexture.image.height=w.height,w.depthTexture.needsUpdate=!0),q){if(Z.__webglInit===void 0&&(Z.__webglInit=!0,w.depthTexture.addEventListener("dispose",T)),Z.__webglTexture===void 0){Z.__webglTexture=r.createTexture(),e.bindTexture(r.TEXTURE_CUBE_MAP,Z.__webglTexture),lt(r.TEXTURE_CUBE_MAP,w.depthTexture);let dt=s.convert(w.depthTexture.format),Dt=s.convert(w.depthTexture.type),gt;w.depthTexture.format===Qi?gt=r.DEPTH_COMPONENT24:w.depthTexture.format===Xn&&(gt=r.DEPTH24_STENCIL8);for(let ft=0;ft<6;ft++)r.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+ft,0,gt,w.width,w.height,0,dt,Dt,null)}}else et(w.depthTexture,0);let ct=Z.__webglTexture,ut=Te(w),J=q?r.TEXTURE_CUBE_MAP_POSITIVE_X+H:r.TEXTURE_2D,it=w.depthTexture.format===Xn?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT;if(w.depthTexture.format===Qi)Ne(w)?a.framebufferTexture2DMultisampleEXT(r.FRAMEBUFFER,it,J,ct,0,ut):r.framebufferTexture2D(r.FRAMEBUFFER,it,J,ct,0);else if(w.depthTexture.format===Xn)Ne(w)?a.framebufferTexture2DMultisampleEXT(r.FRAMEBUFFER,it,J,ct,0,ut):r.framebufferTexture2D(r.FRAMEBUFFER,it,J,ct,0);else throw new Error("THREE.WebGLTextures: Unknown depthTexture format.")}function At(P){let w=i.get(P),H=P.isWebGLCubeRenderTarget===!0;if(w.__boundDepthTexture!==P.depthTexture){let q=P.depthTexture;if(w.__depthDisposeCallback&&w.__depthDisposeCallback(),q){let Z=()=>{delete w.__boundDepthTexture,delete w.__depthDisposeCallback,q.removeEventListener("dispose",Z)};q.addEventListener("dispose",Z),w.__depthDisposeCallback=Z}w.__boundDepthTexture=q}if(P.depthTexture&&!w.__autoAllocateDepthBuffer)if(H)for(let q=0;q<6;q++)qt(w.__webglFramebuffer[q],P,q);else{let q=P.texture.mipmaps;q&&q.length>0?qt(w.__webglFramebuffer[0],P,0):qt(w.__webglFramebuffer,P,0)}else if(H){w.__webglDepthbuffer=[];for(let q=0;q<6;q++)if(e.bindFramebuffer(r.FRAMEBUFFER,w.__webglFramebuffer[q]),w.__webglDepthbuffer[q]===void 0)w.__webglDepthbuffer[q]=r.createRenderbuffer(),wt(w.__webglDepthbuffer[q],P,!1);else{let Z=P.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT,ct=w.__webglDepthbuffer[q];r.bindRenderbuffer(r.RENDERBUFFER,ct),r.framebufferRenderbuffer(r.FRAMEBUFFER,Z,r.RENDERBUFFER,ct)}}else{let q=P.texture.mipmaps;if(q&&q.length>0?e.bindFramebuffer(r.FRAMEBUFFER,w.__webglFramebuffer[0]):e.bindFramebuffer(r.FRAMEBUFFER,w.__webglFramebuffer),w.__webglDepthbuffer===void 0)w.__webglDepthbuffer=r.createRenderbuffer(),wt(w.__webglDepthbuffer,P,!1);else{let Z=P.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT,ct=w.__webglDepthbuffer;r.bindRenderbuffer(r.RENDERBUFFER,ct),r.framebufferRenderbuffer(r.FRAMEBUFFER,Z,r.RENDERBUFFER,ct)}}e.bindFramebuffer(r.FRAMEBUFFER,null)}function Wt(P,w,H){let q=i.get(P);w!==void 0&&vt(q.__webglFramebuffer,P,P.texture,r.COLOR_ATTACHMENT0,r.TEXTURE_2D,0),H!==void 0&&At(P)}function xe(P){let w=P.texture,H=i.get(P),q=i.get(w);P.addEventListener("dispose",b);let Z=P.textures,ct=P.isWebGLCubeRenderTarget===!0,ut=Z.length>1;if(ut||(q.__webglTexture===void 0&&(q.__webglTexture=r.createTexture()),q.__version=w.version,o.memory.textures++),ct){H.__webglFramebuffer=[];for(let J=0;J<6;J++)if(w.mipmaps&&w.mipmaps.length>0){H.__webglFramebuffer[J]=[];for(let it=0;it<w.mipmaps.length;it++)H.__webglFramebuffer[J][it]=r.createFramebuffer()}else H.__webglFramebuffer[J]=r.createFramebuffer()}else{if(w.mipmaps&&w.mipmaps.length>0){H.__webglFramebuffer=[];for(let J=0;J<w.mipmaps.length;J++)H.__webglFramebuffer[J]=r.createFramebuffer()}else H.__webglFramebuffer=r.createFramebuffer();if(ut)for(let J=0,it=Z.length;J<it;J++){let dt=i.get(Z[J]);dt.__webglTexture===void 0&&(dt.__webglTexture=r.createTexture(),o.memory.textures++)}if(P.samples>0&&Ne(P)===!1){H.__webglMultisampledFramebuffer=r.createFramebuffer(),H.__webglColorRenderbuffer=[],e.bindFramebuffer(r.FRAMEBUFFER,H.__webglMultisampledFramebuffer);for(let J=0;J<Z.length;J++){let it=Z[J];H.__webglColorRenderbuffer[J]=r.createRenderbuffer(),r.bindRenderbuffer(r.RENDERBUFFER,H.__webglColorRenderbuffer[J]);let dt=s.convert(it.format,it.colorSpace),Dt=s.convert(it.type),gt=_(it.internalFormat,dt,Dt,it.normalized,it.colorSpace,P.isXRRenderTarget===!0),ft=Te(P);r.renderbufferStorageMultisample(r.RENDERBUFFER,ft,gt,P.width,P.height),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0+J,r.RENDERBUFFER,H.__webglColorRenderbuffer[J])}r.bindRenderbuffer(r.RENDERBUFFER,null),P.depthBuffer&&(H.__webglDepthRenderbuffer=r.createRenderbuffer(),wt(H.__webglDepthRenderbuffer,P,!0)),e.bindFramebuffer(r.FRAMEBUFFER,null)}}if(ct){e.bindTexture(r.TEXTURE_CUBE_MAP,q.__webglTexture),lt(r.TEXTURE_CUBE_MAP,w);for(let J=0;J<6;J++)if(w.mipmaps&&w.mipmaps.length>0)for(let it=0;it<w.mipmaps.length;it++)vt(H.__webglFramebuffer[J][it],P,w,r.COLOR_ATTACHMENT0,r.TEXTURE_CUBE_MAP_POSITIVE_X+J,it);else vt(H.__webglFramebuffer[J],P,w,r.COLOR_ATTACHMENT0,r.TEXTURE_CUBE_MAP_POSITIVE_X+J,0);p(w)&&y(r.TEXTURE_CUBE_MAP),e.unbindTexture()}else if(ut){for(let J=0,it=Z.length;J<it;J++){let dt=Z[J],Dt=i.get(dt),gt=r.TEXTURE_2D;(P.isWebGL3DRenderTarget||P.isWebGLArrayRenderTarget)&&(gt=P.isWebGL3DRenderTarget?r.TEXTURE_3D:r.TEXTURE_2D_ARRAY),e.bindTexture(gt,Dt.__webglTexture),lt(gt,dt),vt(H.__webglFramebuffer,P,dt,r.COLOR_ATTACHMENT0+J,gt,0),p(dt)&&y(gt)}e.unbindTexture()}else{let J=r.TEXTURE_2D;if((P.isWebGL3DRenderTarget||P.isWebGLArrayRenderTarget)&&(J=P.isWebGL3DRenderTarget?r.TEXTURE_3D:r.TEXTURE_2D_ARRAY),e.bindTexture(J,q.__webglTexture),lt(J,w),w.mipmaps&&w.mipmaps.length>0)for(let it=0;it<w.mipmaps.length;it++)vt(H.__webglFramebuffer[it],P,w,r.COLOR_ATTACHMENT0,J,it);else vt(H.__webglFramebuffer,P,w,r.COLOR_ATTACHMENT0,J,0);p(w)&&y(J),e.unbindTexture()}P.depthBuffer&&At(P)}function Jt(P){let w=P.textures;for(let H=0,q=w.length;H<q;H++){let Z=w[H];if(p(Z)){let ct=M(P),ut=i.get(Z).__webglTexture;e.bindTexture(ct,ut),y(ct),e.unbindTexture()}}}let we=[],We=[];function pi(P){if(P.samples>0){if(Ne(P)===!1){let w=P.textures,H=P.width,q=P.height,Z=r.COLOR_BUFFER_BIT,ct=P.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT,ut=i.get(P),J=w.length>1;if(J)for(let dt=0;dt<w.length;dt++)e.bindFramebuffer(r.FRAMEBUFFER,ut.__webglMultisampledFramebuffer),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0+dt,r.RENDERBUFFER,null),e.bindFramebuffer(r.FRAMEBUFFER,ut.__webglFramebuffer),r.framebufferTexture2D(r.DRAW_FRAMEBUFFER,r.COLOR_ATTACHMENT0+dt,r.TEXTURE_2D,null,0);e.bindFramebuffer(r.READ_FRAMEBUFFER,ut.__webglMultisampledFramebuffer);let it=P.texture.mipmaps;it&&it.length>0?e.bindFramebuffer(r.DRAW_FRAMEBUFFER,ut.__webglFramebuffer[0]):e.bindFramebuffer(r.DRAW_FRAMEBUFFER,ut.__webglFramebuffer);for(let dt=0;dt<w.length;dt++){if(P.resolveDepthBuffer&&(P.depthBuffer&&(Z|=r.DEPTH_BUFFER_BIT),P.stencilBuffer&&P.resolveStencilBuffer&&(Z|=r.STENCIL_BUFFER_BIT)),J){r.framebufferRenderbuffer(r.READ_FRAMEBUFFER,r.COLOR_ATTACHMENT0,r.RENDERBUFFER,ut.__webglColorRenderbuffer[dt]);let Dt=i.get(w[dt]).__webglTexture;r.framebufferTexture2D(r.DRAW_FRAMEBUFFER,r.COLOR_ATTACHMENT0,r.TEXTURE_2D,Dt,0)}r.blitFramebuffer(0,0,H,q,0,0,H,q,Z,r.NEAREST),l===!0&&(we.length=0,We.length=0,we.push(r.COLOR_ATTACHMENT0+dt),P.depthBuffer&&P.storeMultisampledDepthBuffer===!1&&(we.push(ct),We.push(ct),r.invalidateFramebuffer(r.DRAW_FRAMEBUFFER,We)),r.invalidateFramebuffer(r.READ_FRAMEBUFFER,we))}if(e.bindFramebuffer(r.READ_FRAMEBUFFER,null),e.bindFramebuffer(r.DRAW_FRAMEBUFFER,null),J)for(let dt=0;dt<w.length;dt++){e.bindFramebuffer(r.FRAMEBUFFER,ut.__webglMultisampledFramebuffer),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0+dt,r.RENDERBUFFER,ut.__webglColorRenderbuffer[dt]);let Dt=i.get(w[dt]).__webglTexture;e.bindFramebuffer(r.FRAMEBUFFER,ut.__webglFramebuffer),r.framebufferTexture2D(r.DRAW_FRAMEBUFFER,r.COLOR_ATTACHMENT0+dt,r.TEXTURE_2D,Dt,0)}e.bindFramebuffer(r.DRAW_FRAMEBUFFER,ut.__webglMultisampledFramebuffer)}else if(P.depthBuffer&&P.storeMultisampledDepthBuffer===!1&&l){let w=P.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT;r.invalidateFramebuffer(r.DRAW_FRAMEBUFFER,[w])}}}function Te(P){return Math.min(n.maxSamples,P.samples)}function Ne(P){let w=i.get(P);return P.samples>0&&t.has("WEBGL_multisampled_render_to_texture")===!0&&w.__useRenderToTexture!==!1}function B(P){let w=o.render.frame;h.get(P)!==w&&(h.set(P,w),P.update())}function ti(P,w){let H=P.colorSpace,q=P.format,Z=P.type;return P.isCompressedTexture===!0||P.isVideoTexture===!0||H!==Rr&&H!==Wi&&(Kt.getTransfer(H)===le?(q!==xi||Z!==gi)&&Ht("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):zt("WebGLTextures: Unsupported texture color space:",H)),w}function ce(P){return typeof HTMLImageElement<"u"&&P instanceof HTMLImageElement?(c.width=P.naturalWidth||P.width,c.height=P.naturalHeight||P.height):typeof VideoFrame<"u"&&P instanceof VideoFrame?(c.width=P.displayWidth,c.height=P.displayHeight):(c.width=P.width,c.height=P.height),c}this.allocateTextureUnit=k,this.resetTextureUnits=N,this.getTextureUnits=C,this.setTextureUnits=D,this.setTexture2D=et,this.setTexture2DArray=$,this.setTexture3D=Q,this.setTextureCube=V,this.rebindTextures=Wt,this.setupRenderTarget=xe,this.updateRenderTargetMipmap=Jt,this.updateMultisampleRenderTarget=pi,this.setupDepthRenderbuffer=At,this.setupFrameBufferTexture=vt,this.useMultisampledRTT=Ne,this.isReversedDepthBuffer=function(){return e.buffers.depth.getReversed()}}function Ty(r,t){function e(i,n=Wi){let s,o=Kt.getTransfer(n);if(i===gi)return r.UNSIGNED_BYTE;if(i===Ua)return r.UNSIGNED_SHORT_4_4_4_4;if(i===Fa)return r.UNSIGNED_SHORT_5_5_5_1;if(i===nh)return r.UNSIGNED_INT_5_9_9_9_REV;if(i===sh)return r.UNSIGNED_INT_10F_11F_11F_REV;if(i===eh)return r.BYTE;if(i===ih)return r.SHORT;if(i===tr)return r.UNSIGNED_SHORT;if(i===Na)return r.INT;if(i===Vi)return r.UNSIGNED_INT;if(i===Pi)return r.FLOAT;if(i===Gi)return r.HALF_FLOAT;if(i===rh)return r.ALPHA;if(i===oh)return r.RGB;if(i===xi)return r.RGBA;if(i===Qi)return r.DEPTH_COMPONENT;if(i===Xn)return r.DEPTH_STENCIL;if(i===Oa)return r.RED;if(i===Ba)return r.RED_INTEGER;if(i===qn)return r.RG;if(i===ka)return r.RG_INTEGER;if(i===za)return r.RGBA_INTEGER;if(i===Qr||i===to||i===eo||i===io)if(o===le)if(s=t.get("WEBGL_compressed_texture_s3tc_srgb"),s!==null){if(i===Qr)return s.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(i===to)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(i===eo)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(i===io)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(s=t.get("WEBGL_compressed_texture_s3tc"),s!==null){if(i===Qr)return s.COMPRESSED_RGB_S3TC_DXT1_EXT;if(i===to)return s.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(i===eo)return s.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(i===io)return s.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(i===Ha||i===Va||i===Ga||i===Wa)if(s=t.get("WEBGL_compressed_texture_pvrtc"),s!==null){if(i===Ha)return s.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(i===Va)return s.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(i===Ga)return s.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(i===Wa)return s.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(i===Xa||i===qa||i===Ya||i===$a||i===Za||i===no||i===ja)if(s=t.get("WEBGL_compressed_texture_etc"),s!==null){if(i===Xa||i===qa)return o===le?s.COMPRESSED_SRGB8_ETC2:s.COMPRESSED_RGB8_ETC2;if(i===Ya)return o===le?s.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:s.COMPRESSED_RGBA8_ETC2_EAC;if(i===$a)return s.COMPRESSED_R11_EAC;if(i===Za)return s.COMPRESSED_SIGNED_R11_EAC;if(i===no)return s.COMPRESSED_RG11_EAC;if(i===ja)return s.COMPRESSED_SIGNED_RG11_EAC}else return null;if(i===Ja||i===Ka||i===Qa||i===tl||i===el||i===il||i===nl||i===sl||i===rl||i===ol||i===al||i===ll||i===cl||i===hl)if(s=t.get("WEBGL_compressed_texture_astc"),s!==null){if(i===Ja)return o===le?s.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:s.COMPRESSED_RGBA_ASTC_4x4_KHR;if(i===Ka)return o===le?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:s.COMPRESSED_RGBA_ASTC_5x4_KHR;if(i===Qa)return o===le?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:s.COMPRESSED_RGBA_ASTC_5x5_KHR;if(i===tl)return o===le?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:s.COMPRESSED_RGBA_ASTC_6x5_KHR;if(i===el)return o===le?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:s.COMPRESSED_RGBA_ASTC_6x6_KHR;if(i===il)return o===le?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:s.COMPRESSED_RGBA_ASTC_8x5_KHR;if(i===nl)return o===le?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:s.COMPRESSED_RGBA_ASTC_8x6_KHR;if(i===sl)return o===le?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:s.COMPRESSED_RGBA_ASTC_8x8_KHR;if(i===rl)return o===le?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:s.COMPRESSED_RGBA_ASTC_10x5_KHR;if(i===ol)return o===le?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:s.COMPRESSED_RGBA_ASTC_10x6_KHR;if(i===al)return o===le?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:s.COMPRESSED_RGBA_ASTC_10x8_KHR;if(i===ll)return o===le?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:s.COMPRESSED_RGBA_ASTC_10x10_KHR;if(i===cl)return o===le?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:s.COMPRESSED_RGBA_ASTC_12x10_KHR;if(i===hl)return o===le?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:s.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(i===ul||i===dl||i===fl)if(s=t.get("EXT_texture_compression_bptc"),s!==null){if(i===ul)return o===le?s.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:s.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(i===dl)return s.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(i===fl)return s.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(i===pl||i===ml||i===so||i===gl)if(s=t.get("EXT_texture_compression_rgtc"),s!==null){if(i===pl)return s.COMPRESSED_RED_RGTC1_EXT;if(i===ml)return s.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(i===so)return s.COMPRESSED_RED_GREEN_RGTC2_EXT;if(i===gl)return s.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return i===er?r.UNSIGNED_INT_24_8:r[i]!==void 0?r[i]:null}return{convert:e}}var Ay=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,Ry=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`,Ih=class{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(t,e){if(this.texture===null){let i=new Hr(t.texture);(t.depthNear!==e.depthNear||t.depthFar!==e.depthFar)&&(this.depthNear=t.depthNear,this.depthFar=t.depthFar),this.texture=i}}getMesh(t){if(this.texture!==null&&this.mesh===null){let e=t.cameras[0].viewport,i=new Ze({vertexShader:Ay,fragmentShader:Ry,uniforms:{depthColor:{value:this.texture},depthWidth:{value:e.z},depthHeight:{value:e.w}}});this.mesh=new Et(new Ri(20,20),i)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}},Lh=class extends tn{constructor(t,e){super();let i=this,n=null,s=1,o=null,a="local-floor",l=1,c=null,h=null,u=null,d=null,f=null,g=null,x=typeof XRWebGLBinding<"u",m=new Ih,p={},y=e.getContextAttributes(),M=null,_=null,v=[],S=[],T=new Vt,b=null,A=null,R=new si;R.viewport=new Ee;let I=new si;I.viewport=new Ee;let U=[R,I],N=new Ca,C=null,D=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(X){let K=v[X];return K===void 0&&(K=new $s,v[X]=K),K.getTargetRaySpace()},this.getControllerGrip=function(X){let K=v[X];return K===void 0&&(K=new $s,v[X]=K),K.getGripSpace()},this.getHand=function(X){let K=v[X];return K===void 0&&(K=new $s,v[X]=K),K.getHandSpace()};function k(X){let K=S.indexOf(X.inputSource);if(K===-1)return;let ot=v[K];ot!==void 0&&(ot.update(X.inputSource,X.frame,c||o),ot.dispatchEvent({type:X.type,data:X.inputSource}))}function z(){n.removeEventListener("select",k),n.removeEventListener("selectstart",k),n.removeEventListener("selectend",k),n.removeEventListener("squeeze",k),n.removeEventListener("squeezestart",k),n.removeEventListener("squeezeend",k),n.removeEventListener("end",z),n.removeEventListener("inputsourceschange",et);for(let X=0;X<v.length;X++){let K=S[X];K!==null&&(S[X]=null,v[X].disconnect(K))}C=null,D=null,m.reset();for(let X in p)delete p[X];if(t.setRenderTarget(M),f=null,d=null,u=null,n=null,_=null,ht.stop(),i.isPresenting=!1,t.setPixelRatio(b),t.setSize(T.width,T.height,!1),A!==null){let X=A.camera;X.fov=A.fov,X.zoom=A.zoom,X.updateProjectionMatrix(),A=null}i.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(X){s=X,i.isPresenting===!0&&Ht("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(X){a=X,i.isPresenting===!0&&Ht("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||o},this.setReferenceSpace=function(X){c=X},this.getBaseLayer=function(){return d!==null?d:f},this.getBinding=function(){return u===null&&x&&(u=new XRWebGLBinding(n,e)),u},this.getFrame=function(){return g},this.getSession=function(){return n},this.setSession=async function(X){if(n=X,n!==null){if(M=t.getRenderTarget(),n.addEventListener("select",k),n.addEventListener("selectstart",k),n.addEventListener("selectend",k),n.addEventListener("squeeze",k),n.addEventListener("squeezestart",k),n.addEventListener("squeezeend",k),n.addEventListener("end",z),n.addEventListener("inputsourceschange",et),y.xrCompatible!==!0&&await e.makeXRCompatible(),b=t.getPixelRatio(),t.getSize(T),x&&"createProjectionLayer"in XRWebGLBinding.prototype){let ot=null,Tt=null,vt=null;y.depth&&(vt=y.stencil?e.DEPTH24_STENCIL8:e.DEPTH_COMPONENT24,ot=y.stencil?Xn:Qi,Tt=y.stencil?er:Vi);let wt={colorFormat:e.RGBA8,depthFormat:vt,scaleFactor:s};u=this.getBinding(),d=u.createProjectionLayer(wt),n.updateRenderState({layers:[d]}),t.setPixelRatio(1),t.setSize(d.textureWidth,d.textureHeight,!1),_=new mi(d.textureWidth,d.textureHeight,{format:xi,type:gi,depthTexture:new zn(d.textureWidth,d.textureHeight,Tt,void 0,void 0,void 0,void 0,void 0,void 0,ot),stencilBuffer:y.stencil,colorSpace:t.outputColorSpace,samples:y.antialias?4:0,resolveDepthBuffer:d.ignoreDepthValues===!1,resolveStencilBuffer:d.ignoreDepthValues===!1,storeMultisampledDepthBuffer:d.ignoreDepthValues===!1,storeMultisampledStencilBuffer:d.ignoreDepthValues===!1})}else{let ot={antialias:y.antialias,alpha:!0,depth:y.depth,stencil:y.stencil,framebufferScaleFactor:s};f=new XRWebGLLayer(n,e,ot),n.updateRenderState({baseLayer:f}),t.setPixelRatio(1),t.setSize(f.framebufferWidth,f.framebufferHeight,!1),_=new mi(f.framebufferWidth,f.framebufferHeight,{format:xi,type:gi,colorSpace:t.outputColorSpace,stencilBuffer:y.stencil,resolveDepthBuffer:f.ignoreDepthValues===!1,resolveStencilBuffer:f.ignoreDepthValues===!1,storeMultisampledDepthBuffer:f.ignoreDepthValues===!1,storeMultisampledStencilBuffer:f.ignoreDepthValues===!1})}_.isXRRenderTarget=!0,this.setFoveation(l),c=null,o=await n.requestReferenceSpace(a),ht.setContext(n),ht.start(),i.isPresenting=!0,i.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(n!==null)return n.environmentBlendMode},this.getDepthTexture=function(){return m.getDepthTexture()};function et(X){for(let K=0;K<X.removed.length;K++){let ot=X.removed[K],Tt=S.indexOf(ot);Tt>=0&&(S[Tt]=null,v[Tt].disconnect(ot))}for(let K=0;K<X.added.length;K++){let ot=X.added[K],Tt=S.indexOf(ot);if(Tt===-1){for(let wt=0;wt<v.length;wt++)if(wt>=S.length){S.push(ot),Tt=wt;break}else if(S[wt]===null){S[wt]=ot,Tt=wt;break}if(Tt===-1)break}let vt=v[Tt];vt&&vt.connect(ot)}}let $=new L,Q=new L;function V(X,K,ot){$.setFromMatrixPosition(K.matrixWorld),Q.setFromMatrixPosition(ot.matrixWorld);let Tt=$.distanceTo(Q),vt=K.projectionMatrix.elements,wt=ot.projectionMatrix.elements,qt=vt[14]/(vt[10]-1),At=vt[14]/(vt[10]+1),Wt=(vt[9]+1)/vt[5],xe=(vt[9]-1)/vt[5],Jt=(vt[8]-1)/vt[0],we=(wt[8]+1)/wt[0],We=qt*Jt,pi=qt*we,Te=Tt/(-Jt+we),Ne=Te*-Jt;if(K.matrixWorld.decompose(X.position,X.quaternion,X.scale),X.translateX(Ne),X.translateZ(Te),X.matrixWorld.compose(X.position,X.quaternion,X.scale),X.matrixWorldInverse.copy(X.matrixWorld).invert(),vt[10]===-1)X.projectionMatrix.copy(K.projectionMatrix),X.projectionMatrixInverse.copy(K.projectionMatrixInverse);else{let B=qt+Te,ti=At+Te,ce=We-Ne,P=pi+(Tt-Ne),w=Wt*At/ti*B,H=xe*At/ti*B;X.projectionMatrix.makePerspective(ce,P,w,H,B,ti),X.projectionMatrixInverse.copy(X.projectionMatrix).invert()}}function nt(X,K){K===null?X.matrixWorld.copy(X.matrix):X.matrixWorld.multiplyMatrices(K.matrixWorld,X.matrix),X.matrixWorldInverse.copy(X.matrixWorld).invert()}this.updateCamera=function(X){if(n===null)return;let K=X.near,ot=X.far;m.texture!==null&&(m.depthNear>0&&(K=m.depthNear),m.depthFar>0&&(ot=m.depthFar)),N.near=I.near=R.near=K,N.far=I.far=R.far=ot,(C!==N.near||D!==N.far)&&(n.updateRenderState({depthNear:N.near,depthFar:N.far}),C=N.near,D=N.far),N.layers.mask=X.layers.mask|6,R.layers.mask=N.layers.mask&-5,I.layers.mask=N.layers.mask&-3;let Tt=X.parent,vt=N.cameras;nt(N,Tt);for(let wt=0;wt<vt.length;wt++)nt(vt[wt],Tt);vt.length===2?V(N,R,I):N.projectionMatrix.copy(R.projectionMatrix),A===null&&X.isPerspectiveCamera&&(A={camera:X,fov:X.fov,zoom:X.zoom}),rt(X,N,Tt)};function rt(X,K,ot){ot===null?X.matrix.copy(K.matrixWorld):(X.matrix.copy(ot.matrixWorld),X.matrix.invert(),X.matrix.multiply(K.matrixWorld)),X.matrix.decompose(X.position,X.quaternion,X.scale),X.updateMatrixWorld(!0),X.projectionMatrix.copy(K.projectionMatrix),X.projectionMatrixInverse.copy(K.projectionMatrixInverse),X.isPerspectiveCamera&&(X.fov=aa*2*Math.atan(1/X.projectionMatrix.elements[5]),X.zoom=1)}this.getCamera=function(){return N},this.getFoveation=function(){if(!(d===null&&f===null))return l},this.setFoveation=function(X){l=X,d!==null&&(d.fixedFoveation=X),f!==null&&f.fixedFoveation!==void 0&&(f.fixedFoveation=X)},this.hasDepthSensing=function(){return m.texture!==null},this.getDepthSensingMesh=function(){return m.getMesh(N)},this.getCameraTexture=function(X){return p[X]};let at=null;function lt(X,K){if(h=K.getViewerPose(c||o),g=K,h!==null){let ot=h.views;f!==null&&(t.setRenderTargetFramebuffer(_,f.framebuffer),t.setRenderTarget(_));let Tt=!1;ot.length!==N.cameras.length&&(N.cameras.length=0,Tt=!0);for(let At=0;At<ot.length;At++){let Wt=ot[At],xe=null;if(f!==null)xe=f.getViewport(Wt);else{let we=u.getViewSubImage(d,Wt);xe=we.viewport,At===0&&(t.setRenderTargetTextures(_,we.colorTexture,we.depthStencilTexture),t.setRenderTarget(_))}let Jt=U[At];Jt===void 0&&(Jt=new si,Jt.layers.enable(At),Jt.viewport=new Ee,U[At]=Jt),Jt.matrix.fromArray(Wt.transform.matrix),Jt.matrix.decompose(Jt.position,Jt.quaternion,Jt.scale),Jt.projectionMatrix.fromArray(Wt.projectionMatrix),Jt.projectionMatrixInverse.copy(Jt.projectionMatrix).invert(),Jt.viewport.set(xe.x,xe.y,xe.width,xe.height),At===0&&(N.matrix.copy(Jt.matrix),N.matrix.decompose(N.position,N.quaternion,N.scale)),Tt===!0&&N.cameras.push(Jt)}let vt=n.enabledFeatures;if(vt&&vt.includes("depth-sensing")&&n.depthUsage=="gpu-optimized"&&x){u=i.getBinding();let At=u.getDepthInformation(ot[0]);At&&At.isValid&&At.texture&&m.init(At,n.renderState)}if(vt&&vt.includes("camera-access")&&x){t.state.unbindTexture(),u=i.getBinding();for(let At=0;At<ot.length;At++){let Wt=ot[At].camera;if(Wt){let xe=p[Wt];xe||(xe=new Hr,p[Wt]=xe);let Jt=u.getCameraImage(Wt);xe.sourceTexture=Jt}}}}for(let ot=0;ot<v.length;ot++){let Tt=S[ot],vt=v[ot];Tt!==null&&vt!==void 0&&vt.update(Tt,K,c||o)}at&&at(X,K),K.detectedPlanes&&i.dispatchEvent({type:"planesdetected",data:K}),g=null}let ht=new zd;ht.setAnimationLoop(lt),this.setAnimationLoop=function(X){at=X},this.dispose=function(){}}},Cy=new fe,qd=new Gt;qd.set(-1,0,0,0,1,0,0,0,1);function Py(r,t){function e(m,p){m.matrixAutoUpdate===!0&&m.updateMatrix(),p.value.copy(m.matrix)}function i(m,p){p.color.getRGB(m.fogColor.value,ch(r)),p.isFog?(m.fogNear.value=p.near,m.fogFar.value=p.far):p.isFogExp2&&(m.fogDensity.value=p.density)}function n(m,p,y,M,_){p.isNodeMaterial?p.uniformsNeedUpdate=!1:p.isMeshBasicMaterial?s(m,p):p.isMeshLambertMaterial?(s(m,p),p.envMap&&(m.envMapIntensity.value=p.envMapIntensity)):p.isMeshToonMaterial?(s(m,p),u(m,p)):p.isMeshPhongMaterial?(s(m,p),h(m,p),p.envMap&&(m.envMapIntensity.value=p.envMapIntensity)):p.isMeshStandardMaterial?(s(m,p),d(m,p),p.isMeshPhysicalMaterial&&f(m,p,_)):p.isMeshMatcapMaterial?(s(m,p),g(m,p)):p.isMeshDepthMaterial?s(m,p):p.isMeshDistanceMaterial?(s(m,p),x(m,p)):p.isMeshNormalMaterial?s(m,p):p.isLineBasicMaterial?(o(m,p),p.isLineDashedMaterial&&a(m,p)):p.isPointsMaterial?l(m,p,y,M):p.isSpriteMaterial?c(m,p):p.isShadowMaterial?(m.color.value.copy(p.color),m.opacity.value=p.opacity):p.isShaderMaterial&&(p.uniformsNeedUpdate=!1)}function s(m,p){m.opacity.value=p.opacity,p.color&&m.diffuse.value.copy(p.color),p.emissive&&m.emissive.value.copy(p.emissive).multiplyScalar(p.emissiveIntensity),p.map&&(m.map.value=p.map,e(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,e(p.alphaMap,m.alphaMapTransform)),p.bumpMap&&(m.bumpMap.value=p.bumpMap,e(p.bumpMap,m.bumpMapTransform),m.bumpScale.value=p.bumpScale,p.side===je&&(m.bumpScale.value*=-1)),p.normalMap&&(m.normalMap.value=p.normalMap,e(p.normalMap,m.normalMapTransform),m.normalScale.value.copy(p.normalScale),p.side===je&&m.normalScale.value.negate()),p.displacementMap&&(m.displacementMap.value=p.displacementMap,e(p.displacementMap,m.displacementMapTransform),m.displacementScale.value=p.displacementScale,m.displacementBias.value=p.displacementBias),p.emissiveMap&&(m.emissiveMap.value=p.emissiveMap,e(p.emissiveMap,m.emissiveMapTransform)),p.specularMap&&(m.specularMap.value=p.specularMap,e(p.specularMap,m.specularMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest);let y=t.get(p),M=y.envMap,_=y.envMapRotation;M&&(m.envMap.value=M,m.envMapRotation.value.setFromMatrix4(Cy.makeRotationFromEuler(_)).transpose(),M.isCubeTexture&&M.isRenderTargetTexture===!1&&m.envMapRotation.value.premultiply(qd),m.reflectivity.value=p.reflectivity,m.ior.value=p.ior,m.refractionRatio.value=p.refractionRatio),p.lightMap&&(m.lightMap.value=p.lightMap,m.lightMapIntensity.value=p.lightMapIntensity,e(p.lightMap,m.lightMapTransform)),p.aoMap&&(m.aoMap.value=p.aoMap,m.aoMapIntensity.value=p.aoMapIntensity,e(p.aoMap,m.aoMapTransform))}function o(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,p.map&&(m.map.value=p.map,e(p.map,m.mapTransform))}function a(m,p){m.dashSize.value=p.dashSize,m.totalSize.value=p.dashSize+p.gapSize,m.scale.value=p.scale}function l(m,p,y,M){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.size.value=p.size*y,m.scale.value=M*.5,p.map&&(m.map.value=p.map,e(p.map,m.uvTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,e(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function c(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.rotation.value=p.rotation,p.map&&(m.map.value=p.map,e(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,e(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function h(m,p){m.specular.value.copy(p.specular),m.shininess.value=Math.max(p.shininess,1e-4)}function u(m,p){p.gradientMap&&(m.gradientMap.value=p.gradientMap)}function d(m,p){m.metalness.value=p.metalness,p.metalnessMap&&(m.metalnessMap.value=p.metalnessMap,e(p.metalnessMap,m.metalnessMapTransform)),m.roughness.value=p.roughness,p.roughnessMap&&(m.roughnessMap.value=p.roughnessMap,e(p.roughnessMap,m.roughnessMapTransform)),p.envMap&&(m.envMapIntensity.value=p.envMapIntensity)}function f(m,p,y){m.ior.value=p.ior,p.sheen>0&&(m.sheenColor.value.copy(p.sheenColor).multiplyScalar(p.sheen),m.sheenRoughness.value=p.sheenRoughness,p.sheenColorMap&&(m.sheenColorMap.value=p.sheenColorMap,e(p.sheenColorMap,m.sheenColorMapTransform)),p.sheenRoughnessMap&&(m.sheenRoughnessMap.value=p.sheenRoughnessMap,e(p.sheenRoughnessMap,m.sheenRoughnessMapTransform))),p.clearcoat>0&&(m.clearcoat.value=p.clearcoat,m.clearcoatRoughness.value=p.clearcoatRoughness,p.clearcoatMap&&(m.clearcoatMap.value=p.clearcoatMap,e(p.clearcoatMap,m.clearcoatMapTransform)),p.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=p.clearcoatRoughnessMap,e(p.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),p.clearcoatNormalMap&&(m.clearcoatNormalMap.value=p.clearcoatNormalMap,e(p.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(p.clearcoatNormalScale),p.side===je&&m.clearcoatNormalScale.value.negate())),p.dispersion>0&&(m.dispersion.value=p.dispersion),p.retroreflectivity>0&&(m.retroreflectivity.value=p.retroreflectivity),p.iridescence>0&&(m.iridescence.value=p.iridescence,m.iridescenceIOR.value=p.iridescenceIOR,m.iridescenceThicknessMinimum.value=p.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=p.iridescenceThicknessRange[1],p.iridescenceMap&&(m.iridescenceMap.value=p.iridescenceMap,e(p.iridescenceMap,m.iridescenceMapTransform)),p.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=p.iridescenceThicknessMap,e(p.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),p.transmission>0&&(m.transmission.value=p.transmission,m.transmissionSamplerMap.value=y.texture,m.transmissionSamplerSize.value.set(y.width,y.height),p.transmissionMap&&(m.transmissionMap.value=p.transmissionMap,e(p.transmissionMap,m.transmissionMapTransform)),m.thickness.value=p.thickness,p.thicknessMap&&(m.thicknessMap.value=p.thicknessMap,e(p.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=p.attenuationDistance,m.attenuationColor.value.copy(p.attenuationColor)),p.anisotropy>0&&(m.anisotropyVector.value.set(p.anisotropy*Math.cos(p.anisotropyRotation),p.anisotropy*Math.sin(p.anisotropyRotation)),p.anisotropyMap&&(m.anisotropyMap.value=p.anisotropyMap,e(p.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=p.specularIntensity,m.specularColor.value.copy(p.specularColor),p.specularColorMap&&(m.specularColorMap.value=p.specularColorMap,e(p.specularColorMap,m.specularColorMapTransform)),p.specularIntensityMap&&(m.specularIntensityMap.value=p.specularIntensityMap,e(p.specularIntensityMap,m.specularIntensityMapTransform))}function g(m,p){p.matcap&&(m.matcap.value=p.matcap)}function x(m,p){let y=t.get(p).light;m.referencePosition.value.setFromMatrixPosition(y.matrixWorld),m.nearDistance.value=y.shadow.camera.near,m.farDistance.value=y.shadow.camera.far}return{refreshFogUniforms:i,refreshMaterialUniforms:n}}function Iy(r,t,e,i){let n={},s={},o=[],a=r.getParameter(r.MAX_UNIFORM_BUFFER_BINDINGS);function l(_,v){let S=v.program;i.uniformBlockBinding(_,S)}function c(_,v){let S=n[_.id];S===void 0&&(m(_),S=h(_),n[_.id]=S,_.addEventListener("dispose",y));let T=v.program;i.updateUBOMapping(_,T);let b=t.render.frame;s[_.id]!==b&&(d(_),s[_.id]=b)}function h(_){let v=u();_.__bindingPointIndex=v;let S=r.createBuffer(),T=_.__size,b=_.usage;return r.bindBuffer(r.UNIFORM_BUFFER,S),r.bufferData(r.UNIFORM_BUFFER,T,b),r.bindBuffer(r.UNIFORM_BUFFER,null),r.bindBufferBase(r.UNIFORM_BUFFER,v,S),S}function u(){for(let _=0;_<a;_++)if(o.indexOf(_)===-1)return o.push(_),_;return zt("WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function d(_){let v=n[_.id],S=_.uniforms,T=_.__cache;r.bindBuffer(r.UNIFORM_BUFFER,v);for(let b=0,A=S.length;b<A;b++){let R=S[b];if(Array.isArray(R))for(let I=0,U=R.length;I<U;I++)f(R[I],b,I,T);else f(R,b,0,T)}r.bindBuffer(r.UNIFORM_BUFFER,null)}function f(_,v,S,T){if(x(_,v,S,T)===!0){let b=_.__offset,A=_.value;if(Array.isArray(A)){let R=0;for(let I=0;I<A.length;I++){let U=A[I],N=p(U);g(U,_.__data,R),typeof U!="number"&&typeof U!="boolean"&&!U.isMatrix3&&!ArrayBuffer.isView(U)&&(R+=N.storage/Float32Array.BYTES_PER_ELEMENT)}}else g(A,_.__data,0);r.bufferSubData(r.UNIFORM_BUFFER,b,_.__data)}}function g(_,v,S){typeof _=="number"||typeof _=="boolean"?v[0]=_:_.isMatrix3?(v[0]=_.elements[0],v[1]=_.elements[1],v[2]=_.elements[2],v[3]=0,v[4]=_.elements[3],v[5]=_.elements[4],v[6]=_.elements[5],v[7]=0,v[8]=_.elements[6],v[9]=_.elements[7],v[10]=_.elements[8],v[11]=0):ArrayBuffer.isView(_)?v.set(new _.constructor(_.buffer,_.byteOffset,v.length)):_.toArray(v,S)}function x(_,v,S,T){let b=_.value,A=v+"_"+S;if(T[A]===void 0)return typeof b=="number"||typeof b=="boolean"?T[A]=b:ArrayBuffer.isView(b)?T[A]=b.slice():T[A]=b.clone(),!0;{let R=T[A];if(typeof b=="number"||typeof b=="boolean"){if(R!==b)return T[A]=b,!0}else{if(ArrayBuffer.isView(b))return!0;if(R.equals(b)===!1)return R.copy(b),!0}}return!1}function m(_){let v=_.uniforms,S=0,T=16;for(let A=0,R=v.length;A<R;A++){let I=Array.isArray(v[A])?v[A]:[v[A]];for(let U=0,N=I.length;U<N;U++){let C=I[U],D=Array.isArray(C.value)?C.value:[C.value];for(let k=0,z=D.length;k<z;k++){let et=D[k],$=p(et),Q=S%T,V=Q%$.boundary,nt=Q+V;S+=V,nt!==0&&T-nt<$.storage&&(S+=T-nt),C.__data=new Float32Array($.storage/Float32Array.BYTES_PER_ELEMENT),C.__offset=S,S+=$.storage}}}let b=S%T;return b>0&&(S+=T-b),_.__size=S,_.__cache={},this}function p(_){let v={boundary:0,storage:0};return typeof _=="number"||typeof _=="boolean"?(v.boundary=4,v.storage=4):_.isVector2?(v.boundary=8,v.storage=8):_.isVector3||_.isColor?(v.boundary=16,v.storage=12):_.isVector4?(v.boundary=16,v.storage=16):_.isMatrix3?(v.boundary=48,v.storage=48):_.isMatrix4?(v.boundary=64,v.storage=64):_.isTexture?Ht("WebGLRenderer: Texture samplers can not be part of an uniforms group."):ArrayBuffer.isView(_)?(v.boundary=16,v.storage=_.byteLength):Ht("WebGLRenderer: Unsupported uniform value type.",_),v}function y(_){let v=_.target;v.removeEventListener("dispose",y);let S=o.indexOf(v.__bindingPointIndex);o.splice(S,1),r.deleteBuffer(n[v.id]),delete n[v.id],delete s[v.id]}function M(){for(let _ in n)r.deleteBuffer(n[_]);o=[],n={},s={}}return{bind:l,update:c,dispose:M}}var Ly=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]),cn=null;function Dy(){return cn===null&&(cn=new cs(Ly,16,16,qn,Gi),cn.name="DFG_LUT",cn.minFilter=ke,cn.magFilter=ke,cn.wrapS=Mi,cn.wrapT=Mi,cn.generateMipmaps=!1,cn.needsUpdate=!0),cn}var Sl=class{constructor(t={}){let{canvas:e=hd(),context:i=null,depth:n=!0,stencil:s=!1,alpha:o=!1,antialias:a=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:u=!1,reversedDepthBuffer:d=!1,outputBufferType:f=gi}=t;this.isWebGLRenderer=!0;let g;if(i!==null){if(typeof WebGLRenderingContext<"u"&&i instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");g=i.getContextAttributes().alpha}else g=o;let x=f,m=new Set([za,ka,Ba]),p=new Set([gi,Vi,tr,er,Ua,Fa]),y=new Uint32Array(4),M=new Int32Array(4),_=new L,v=null,S=null,T=[],b=[],A=null;this.domElement=e,this.debug={checkShaderErrors:!0,diagnostics:{keywords:!1},onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=Hi,this.toneMappingExposure=1,this.transmissionResolutionScale=1;let R=this,I=!1,U=null,N=null,C=null,D=null;this._outputColorSpace=Ie;let k=0,z=0,et=null,$=-1,Q=null,V=new Ee,nt=new Ee,rt=null,at=new It(0),lt=0,ht=e.width,X=e.height,K=1,ot=null,Tt=null,vt=new Ee(0,0,ht,X),wt=new Ee(0,0,ht,X),qt=!1,At=new Js,Wt=!1,xe=!1,Jt=new fe,we=new L,We=new Ee,pi={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0},Te=!1;function Ne(){return et===null?K:1}let B=i;function ti(E,F){return e.getContext(E,F)}let ce,P,w,H,q,Z,ct,ut,J,it,dt,Dt,gt,ft,Nt,Bt,Xt,O,pt,tt,mt,Mt,st;try{let E={alpha:!0,depth:n,stencil:s,antialias:a,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:h,failIfMajorPerformanceCaveat:u};if("setAttribute"in e&&e.setAttribute("data-engine",`three.js r${"186"}`),e.addEventListener("webglcontextlost",ye,!1),e.addEventListener("webglcontextrestored",oe,!1),e.addEventListener("webglcontextcreationerror",Ui,!1),B===null){let F="webgl2";if(B=ti(F,E),B===null)throw ti(F)?new Error("THREE.WebGLRenderer: Error creating WebGL context with your selected attributes."):new Error("THREE.WebGLRenderer: Error creating WebGL context.")}Ut()}catch(E){throw e.removeEventListener("webglcontextlost",ye,!1),e.removeEventListener("webglcontextrestored",oe,!1),e.removeEventListener("webglcontextcreationerror",Ui,!1),zt("WebGLRenderer: "+E.message),E}function Ut(){ce=new zg(B),ce.init(),mt=new Ty(B,ce),P=new Pg(B,ce,t,mt),w=new wy(B,ce),P.reversedDepthBuffer&&d&&w.buffers.depth.setReversed(!0),N=B.createFramebuffer(),C=B.createFramebuffer(),D=B.createFramebuffer(),H=new Gg(B),q=new hy,Z=new Ey(B,ce,w,q,P,mt,H),ct=new kg(R),ut=new Xp(B),Mt=new Rg(B,ut),J=new Hg(B,ut,H,Mt),it=new Xg(B,J,ut,Mt,H),O=new Wg(B,P,Z),Nt=new Ig(q),dt=new cy(R,ct,ce,P,Mt,Nt),Dt=new Py(R,q),gt=new dy,ft=new yy(ce),Xt=new Ag(R,ct,w,it,g,l),Bt=new Sy(R,it,P),st=new Iy(B,H,P,w),pt=new Cg(B,ce,H),tt=new Vg(B,ce,H),H.programs=dt.programs,R.capabilities=P,R.extensions=ce,R.properties=q,R.renderLists=gt,R.shadowMap=Bt,R.state=w,R.info=H}x!==gi&&(A=new Yg(x,e.width,e.height,a,n,s));let Pt=new Lh(R,B);this.xr=Pt,this.getContext=function(){return B},this.getContextAttributes=function(){return B.getContextAttributes()},this.forceContextLoss=function(){let E=ce.get("WEBGL_lose_context");E&&E.loseContext()},this.forceContextRestore=function(){let E=ce.get("WEBGL_lose_context");E&&E.restoreContext()},this.getPixelRatio=function(){return K},this.setPixelRatio=function(E){E!==void 0&&(K=E,this.setSize(ht,X,!1))},this.getSize=function(E){return E.set(ht,X)},this.setSize=function(E,F,Y=!0){if(Pt.isPresenting){Ht("WebGLRenderer: Can't change size while VR device is presenting.");return}ht=E,X=F,e.width=Math.floor(E*K),e.height=Math.floor(F*K),Y===!0&&(e.style.width=E+"px",e.style.height=F+"px"),A!==null&&A.setSize(e.width,e.height),this.setViewport(0,0,E,F)},this.getDrawingBufferSize=function(E){return E.set(ht*K,X*K).floor()},this.setDrawingBufferSize=function(E,F,Y){ht=E,X=F,K=Y,e.width=Math.floor(E*Y),e.height=Math.floor(F*Y),this.setViewport(0,0,E,F)},this.setEffects=function(E){if(x===gi){zt("WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.");return}if(E){for(let F=0;F<E.length;F++)if(E[F].isOutputPass===!0){Ht("WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.");break}}A.setEffects(E||[])},this.getCurrentViewport=function(E){return E.copy(V)},this.getViewport=function(E){return E.copy(vt)},this.setViewport=function(E,F,Y,G){E.isVector4?vt.set(E.x,E.y,E.z,E.w):vt.set(E,F,Y,G),w.viewport(V.copy(vt).multiplyScalar(K).round())},this.getScissor=function(E){return E.copy(wt)},this.setScissor=function(E,F,Y,G){E.isVector4?wt.set(E.x,E.y,E.z,E.w):wt.set(E,F,Y,G),w.scissor(nt.copy(wt).multiplyScalar(K).round())},this.getScissorTest=function(){return qt},this.setScissorTest=function(E){w.setScissorTest(qt=E)},this.setOpaqueSort=function(E){ot=E},this.setTransparentSort=function(E){Tt=E},this.getClearColor=function(E){return E.copy(Xt.getClearColor())},this.setClearColor=function(){Xt.setClearColor(...arguments)},this.getClearAlpha=function(){return Xt.getClearAlpha()},this.setClearAlpha=function(){Xt.setClearAlpha(...arguments)},this.clear=function(E=!0,F=!0,Y=!0){let G=0;if(E){let W=!1;if(et!==null){let _t=et.texture.format;W=m.has(_t)}if(W){let _t=et.texture.type,St=p.has(_t),yt=Xt.getClearColor(),Rt=Xt.getClearAlpha(),Lt=yt.r,Yt=yt.g,Zt=yt.b;St?(y[0]=Lt,y[1]=Yt,y[2]=Zt,y[3]=Rt,B.clearBufferuiv(B.COLOR,0,y)):(M[0]=Lt,M[1]=Yt,M[2]=Zt,M[3]=Rt,B.clearBufferiv(B.COLOR,0,M))}else G|=B.COLOR_BUFFER_BIT}F&&(G|=B.DEPTH_BUFFER_BIT,this.state.buffers.depth.setMask(!0)),Y&&(G|=B.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),G!==0&&B.clear(G)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.setNodesHandler=function(E){E.setRenderer(this),U=E},this.dispose=function(){e.removeEventListener("webglcontextlost",ye,!1),e.removeEventListener("webglcontextrestored",oe,!1),e.removeEventListener("webglcontextcreationerror",Ui,!1),Xt.dispose(),gt.dispose(),ft.dispose(),q.dispose(),ct.dispose(),it.dispose(),Mt.dispose(),st.dispose(),dt.dispose(),Pt.dispose(),Pt.removeEventListener("sessionstart",Zh),Pt.removeEventListener("sessionend",jh),ts.stop()};function ye(E){E.preventDefault(),Ir("WebGLRenderer: Context Lost."),I=!0}function oe(){Ir("WebGLRenderer: Context Restored."),I=!1;let E=H.autoReset,F=Bt.enabled,Y=Bt.autoUpdate,G=Bt.needsUpdate,W=Bt.type;Ut(),H.autoReset=E,Bt.enabled=F,Bt.autoUpdate=Y,Bt.needsUpdate=G,Bt.type=W}function Ui(E){zt("WebGLRenderer: A WebGL context could not be created. Reason: ",E.statusMessage)}function Zi(E){let F=E.target;F.removeEventListener("dispose",Zi),ep(F)}function ep(E){ip(E),q.remove(E)}function ip(E){let F=q.get(E).programs;F!==void 0&&(F.forEach(function(Y){dt.releaseProgram(Y)}),E.isShaderMaterial&&dt.releaseShaderCache(E))}this.renderBufferDirect=function(E,F,Y,G,W,_t){F===null&&(F=pi);let St=W.isMesh&&W.matrixWorld.determinantAffine()<0,yt=rp(E,F,Y,G,W);w.setMaterial(G,St);let Rt=Y.index,Lt=1;if(G.wireframe===!0){if(Rt=J.getWireframeAttribute(Y),Rt===void 0)return;Lt=2}let Yt=Y.drawRange,Zt=Y.attributes.position,Ct=Yt.start*Lt,ae=(Yt.start+Yt.count)*Lt;_t!==null&&(Ct=Math.max(Ct,_t.start*Lt),ae=Math.min(ae,(_t.start+_t.count)*Lt)),Rt!==null?(Ct=Math.max(Ct,0),ae=Math.min(ae,Rt.count)):Zt!=null&&(Ct=Math.max(Ct,0),ae=Math.min(ae,Zt.count));let Ue=ae-Ct;if(Ue<0||Ue===1/0)return;Mt.setup(W,G,yt,Y,Rt);let Me,me=pt;if(Rt!==null&&(Me=ut.get(Rt),me=tt,me.setIndex(Me)),W.isMesh)G.wireframe===!0?(w.setLineWidth(G.wireframeLinewidth*Ne()),me.setMode(B.LINES)):me.setMode(B.TRIANGLES);else if(W.isLine){let ei=G.linewidth;ei===void 0&&(ei=1),w.setLineWidth(ei*Ne()),W.isLineSegments?me.setMode(B.LINES):W.isLineLoop?me.setMode(B.LINE_LOOP):me.setMode(B.LINE_STRIP)}else W.isPoints?me.setMode(B.POINTS):W.isSprite&&me.setMode(B.TRIANGLES);if(W.isBatchedMesh)if(ce.get("WEBGL_multi_draw"))me.renderMultiDraw(W._multiDrawStarts,W._multiDrawCounts,W._multiDrawCount);else{let ei=W._multiDrawStarts,bt=W._multiDrawCounts,ci=W._multiDrawCount,ie=Rt?ut.get(Rt).bytesPerElement:1,Ti=q.get(G).currentProgram.getUniforms();for(let ji=0;ji<ci;ji++)Ti.setValue(B,"_gl_DrawID",ji),me.render(ei[ji]/ie,bt[ji])}else if(W.isInstancedMesh)me.renderInstances(Ct,Ue,W.count);else if(Y.isInstancedBufferGeometry){let ei=Y._maxInstanceCount!==void 0?Y._maxInstanceCount:1/0,bt=Math.min(Y.instanceCount,ei);me.renderInstances(Ct,Ue,bt)}else me.render(Ct,Ue)};function $h(E,F,Y,G){U!==null&&E.isNodeMaterial&&U.setObject(G,E),Wt===!0&&Nt.setState(E,Y,!1),E.transparent===!0&&E.side===Oe&&E.forceSinglePass===!1?(E.side=je,E.needsUpdate=!0,wo(E,F,G),E.side=rn,E.needsUpdate=!0,wo(E,F,G),E.side=Oe):wo(E,F,G)}this.compile=function(E,F,Y=null){Y===null&&(Y=E),U!==null&&U.renderStart(E,F,Y),S=ft.get(Y),S.init(F),b.push(S),Y.traverseVisible(function(W){W.isLight&&W.layers.test(F.layers)&&(S.pushLight(W),W.castShadow&&S.pushShadow(W))}),E!==Y&&E.traverseVisible(function(W){W.isLight&&W.layers.test(F.layers)&&(S.pushLight(W),W.castShadow&&S.pushShadow(W))}),S.setupLights(),U!==null&&U.updateLights(S.state.lightsArray),xe=this.localClippingEnabled,Wt=Nt.init(this.clippingPlanes,xe),Wt===!0&&Nt.setGlobalState(this.clippingPlanes,F),U!==null&&Bt.render(S.state.shadowsArray,Y,F);let G=new Set;return E.traverse(function(W){if(!(W.isMesh||W.isPoints||W.isLine||W.isSprite))return;let _t=W.material;if(_t)if(Array.isArray(_t))for(let St=0;St<_t.length;St++){let yt=_t[St];$h(yt,Y,F,W),G.add(yt)}else $h(_t,Y,F,W),G.add(_t)}),S=b.pop(),U!==null&&U.renderEnd(),G},this.compileAsync=function(E,F,Y=null){let G=this.compile(E,F,Y);return new Promise(W=>{function _t(){if(G.forEach(function(St){let Rt=q.get(St).currentProgram;(Rt===void 0||Rt.isReady())&&G.delete(St)}),G.size===0){W(E);return}setTimeout(_t,10)}ce.get("KHR_parallel_shader_compile")!==null?_t():setTimeout(_t,10)})};let lc=null;function np(E){lc&&lc(E)}function Zh(){ts.stop()}function jh(){ts.start()}let ts=new zd;ts.setAnimationLoop(np),typeof self<"u"&&ts.setContext(self),this.setAnimationLoop=function(E){lc=E,Pt.setAnimationLoop(E),E===null?ts.stop():ts.start()},Pt.addEventListener("sessionstart",Zh),Pt.addEventListener("sessionend",jh),this.render=function(E,F){if(F!==void 0&&F.isCamera!==!0){zt("WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(I===!0)return;U!==null&&U.renderStart(E,F);let Y=Pt.enabled===!0&&Pt.isPresenting===!0,G=A!==null&&(et===null||Y)&&A.begin(R,et);if(E.matrixWorldAutoUpdate===!0&&E.updateMatrixWorld(),F.parent===null&&F.matrixWorldAutoUpdate===!0&&F.updateMatrixWorld(),Pt.enabled===!0&&Pt.isPresenting===!0&&(A===null||A.isCompositing()===!1)&&(Pt.cameraAutoUpdate===!0&&Pt.updateCamera(F),F=Pt.getCamera()),E.isScene===!0&&E.onBeforeRender(R,E,F,et),S=ft.get(E,b.length),S.init(F),S.state.textureUnits=Z.getTextureUnits(),b.push(S),Jt.multiplyMatrices(F.projectionMatrix,F.matrixWorldInverse),At.setFromProjectionMatrix(Jt,zi,F.reversedDepth),xe=this.localClippingEnabled,Wt=Nt.init(this.clippingPlanes,xe),v=gt.get(E,T.length),v.init(),T.push(v),Pt.enabled===!0&&Pt.isPresenting===!0){let St=R.xr.getDepthSensingMesh();St!==null&&cc(St,F,-1/0,R.sortObjects)}cc(E,F,0,R.sortObjects),v.finish(),U!==null&&U.updateLights(S.state.lightsArray),R.sortObjects===!0&&v.sort(ot,Tt),Te=Pt.enabled===!1||Pt.isPresenting===!1||Pt.hasDepthSensing()===!1,Te&&Xt.addToRenderList(v,E),this.info.render.frame++,this.info.autoReset===!0&&this.info.reset(),Wt===!0&&Nt.beginShadows();let W=S.state.shadowsArray;if(Bt.render(W,E,F),Wt===!0&&Nt.endShadows(),(G&&A.hasRenderPass())===!1){let St=v.opaque,yt=v.transmissive;if(S.setupLights(),F.isArrayCamera){let Rt=F.cameras;if(yt.length>0)for(let Lt=0,Yt=Rt.length;Lt<Yt;Lt++){let Zt=Rt[Lt];Kh(St,yt,E,Zt)}Te&&Xt.render(E);for(let Lt=0,Yt=Rt.length;Lt<Yt;Lt++){let Zt=Rt[Lt];Jh(v,E,Zt,Zt.viewport)}}else yt.length>0&&Kh(St,yt,E,F),Te&&Xt.render(E),Jh(v,E,F)}et!==null&&z===0&&(Z.updateMultisampleRenderTarget(et),Z.updateRenderTargetMipmap(et)),G&&A.end(R),E.isScene===!0&&E.onAfterRender(R,E,F),Mt.resetDefaultState(),$=-1,Q=null,b.pop(),b.length>0?(S=b[b.length-1],Z.setTextureUnits(S.state.textureUnits),Wt===!0&&Nt.setGlobalState(R.clippingPlanes,S.state.camera)):S=null,T.pop(),T.length>0?v=T[T.length-1]:v=null,U!==null&&U.renderEnd()};function cc(E,F,Y,G){if(E.visible===!1)return;if(E.layers.test(F.layers)){if(E.isGroup)Y=E.renderOrder;else if(E.isLOD)E.autoUpdate===!0&&E.update(F);else if(E.isLightProbeGrid)S.pushLightProbeGrid(E);else if(E.isLight)S.pushLight(E),E.castShadow&&S.pushShadow(E);else if(E.isSprite){if(!E.frustumCulled||E.intersectsFrustum(At)){G&&We.setFromMatrixPosition(E.matrixWorld).applyMatrix4(Jt);let St=it.update(E),yt=E.material;yt.visible&&v.push(E,St,yt,Y,We.z,null,F)}}else if((E.isMesh||E.isLine||E.isPoints)&&(!E.frustumCulled||E.intersectsFrustum(At))){let St=it.update(E),yt=E.material;if(G&&(E.boundingSphere!==void 0?(E.boundingSphere===null&&E.computeBoundingSphere(),We.copy(E.boundingSphere.center)):(St.boundingSphere===null&&St.computeBoundingSphere(),We.copy(St.boundingSphere.center)),We.applyMatrix4(E.matrixWorld).applyMatrix4(Jt)),Array.isArray(yt)){let Rt=St.groups;for(let Lt=0,Yt=Rt.length;Lt<Yt;Lt++){let Zt=Rt[Lt],Ct=yt[Zt.materialIndex];Ct&&Ct.visible&&v.push(E,St,Ct,Y,We.z,Zt,F)}}else yt.visible&&v.push(E,St,yt,Y,We.z,null,F)}}let _t=E.children;for(let St=0,yt=_t.length;St<yt;St++)cc(_t[St],F,Y,G)}function Jh(E,F,Y,G){let{opaque:W,transmissive:_t,transparent:St}=E;S.setupLightsView(Y),Wt===!0&&Nt.setGlobalState(R.clippingPlanes,Y),G&&w.viewport(V.copy(G)),W.length>0&&So(W,F,Y),_t.length>0&&So(_t,F,Y),St.length>0&&So(St,F,Y),w.buffers.depth.setTest(!0),w.buffers.depth.setMask(!0),w.buffers.color.setMask(!0),w.setPolygonOffset(!1)}function Kh(E,F,Y,G){if((Y.isScene===!0?Y.overrideMaterial:null)!==null)return;if(S.state.transmissionRenderTarget[G.id]===void 0){let Ct=ce.has("EXT_color_buffer_half_float")||ce.has("EXT_color_buffer_float");S.state.transmissionRenderTarget[G.id]=new mi(1,1,{generateMipmaps:!0,type:Ct?Gi:gi,minFilter:ln,samples:Math.max(4,P.samples),stencilBuffer:s,resolveDepthBuffer:!1,resolveStencilBuffer:!1,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,colorSpace:Kt.workingColorSpace})}let _t=S.state.transmissionRenderTarget[G.id],St=G.viewport||V;_t.setSize(St.z*R.transmissionResolutionScale,St.w*R.transmissionResolutionScale);let yt=R.getRenderTarget(),Rt=R.getActiveCubeFace(),Lt=R.getActiveMipmapLevel();R.setRenderTarget(_t),R.getClearColor(at),lt=R.getClearAlpha(),lt<1&&R.setClearColor(16777215,.5),R.clear(),Te&&Xt.render(Y);let Yt=R.toneMapping;R.toneMapping=Hi;let Zt=G.viewport;if(G.viewport!==void 0&&(G.viewport=void 0),S.setupLightsView(G),Wt===!0&&Nt.setGlobalState(R.clippingPlanes,G),So(E,Y,G),Z.updateMultisampleRenderTarget(_t),Z.updateRenderTargetMipmap(_t),ce.has("WEBGL_multisampled_render_to_texture")===!1){let Ct=!1;for(let ae=0,Ue=F.length;ae<Ue;ae++){let Me=F[ae],{object:me,geometry:ei,material:bt,group:ci}=Me;if(bt.side===Oe&&me.layers.test(G.layers)){let ie=bt.side;bt.side=je,bt.needsUpdate=!0,Qh(me,Y,G,ei,bt,ci),bt.side=ie,bt.needsUpdate=!0,Ct=!0}}Ct===!0&&(Z.updateMultisampleRenderTarget(_t),Z.updateRenderTargetMipmap(_t))}R.setRenderTarget(yt,Rt,Lt),R.setClearColor(at,lt),Zt!==void 0&&(G.viewport=Zt),R.toneMapping=Yt}function So(E,F,Y){let G=F.isScene===!0?F.overrideMaterial:null;for(let W=0,_t=E.length;W<_t;W++){let St=E[W],{object:yt,geometry:Rt,group:Lt}=St,Yt=St.material;Yt.allowOverride===!0&&G!==null&&(Yt=G),yt.layers.test(Y.layers)&&Qh(yt,F,Y,Rt,Yt,Lt)}}function Qh(E,F,Y,G,W,_t){U!==null&&W.isNodeMaterial&&U.setObject(E,W),E.onBeforeRender(R,F,Y,G,W,_t),E.modelViewMatrix.multiplyMatrices(Y.matrixWorldInverse,E.matrixWorld),E.normalMatrix.getNormalMatrix(E.modelViewMatrix),W.onBeforeRender(R,F,Y,G,E,_t),W.transparent===!0&&W.side===Oe&&W.forceSinglePass===!1?(W.side=je,W.needsUpdate=!0,R.renderBufferDirect(Y,F,G,W,E,_t),W.side=rn,W.needsUpdate=!0,R.renderBufferDirect(Y,F,G,W,E,_t),W.side=Oe):R.renderBufferDirect(Y,F,G,W,E,_t),E.onAfterRender(R,F,Y,G,W,_t)}function wo(E,F,Y){F.isScene!==!0&&(F=pi);let G=q.get(E),W=S.state.lights,_t=S.state.shadowsArray,St=W.state.version,yt=dt.getParameters(E,W.state,_t,F,Y,S.state.lightProbeGridArray),Rt=dt.getProgramCacheKey(yt),Lt=G.programs;G.environment=E.isMeshStandardMaterial||E.isMeshLambertMaterial||E.isMeshPhongMaterial?F.environment:null,G.fog=F.fog;let Yt=E.isMeshStandardMaterial||E.isMeshLambertMaterial&&!E.envMap||E.isMeshPhongMaterial&&!E.envMap;G.envMap=ct.get(E.envMap||G.environment,Yt),G.envMapRotation=G.environment!==null&&E.envMap===null?F.environmentRotation:E.envMapRotation,Lt===void 0&&(E.addEventListener("dispose",Zi),Lt=new Map,G.programs=Lt);let Zt=Lt.get(Rt);if(Zt!==void 0){if(G.currentProgram===Zt&&G.lightsStateVersion===St)return eu(E,yt),Zt}else yt.uniforms=dt.getUniforms(E),U!==null&&E.isNodeMaterial&&U.build(E,Y,yt),E.onBeforeCompile(yt,R),Zt=dt.acquireProgram(yt,Rt),Lt.set(Rt,Zt),G.uniforms=yt.uniforms;let Ct=G.uniforms;return(!E.isShaderMaterial&&!E.isRawShaderMaterial||E.clipping===!0)&&(Ct.clippingPlanes=Nt.uniform),eu(E,yt),G.needsLights=ap(E),G.lightsStateVersion=St,G.needsLights&&(Ct.ambientLightColor.value=W.state.ambient,Ct.lightProbe.value=W.state.probe,Ct.sunLights.value=W.state.sun,Ct.sunLightShadows.value=W.state.sunShadow,Ct.directionalLights.value=W.state.directional,Ct.directionalLightShadows.value=W.state.directionalShadow,Ct.spotLights.value=W.state.spot,Ct.spotLightShadows.value=W.state.spotShadow,Ct.rectAreaLights.value=W.state.rectArea,Ct.ltc_1.value=W.state.rectAreaLTC1,Ct.ltc_2.value=W.state.rectAreaLTC2,Ct.pointLights.value=W.state.point,Ct.pointLightShadows.value=W.state.pointShadow,Ct.hemisphereLights.value=W.state.hemi,Ct.sunShadowMatrix.value=W.state.sunShadowMatrix,Ct.sunShadowCascade.value=W.state.sunShadowCascade,Ct.directionalShadowMatrix.value=W.state.directionalShadowMatrix,Ct.spotLightMatrix.value=W.state.spotLightMatrix,Ct.spotLightMap.value=W.state.spotLightMap,Ct.pointShadowMatrix.value=W.state.pointShadowMatrix),G.lightProbeGrid=S.state.lightProbeGridArray.length>0,G.currentProgram=Zt,G.uniformsList=null,Zt}function tu(E){if(E.uniformsList===null){let F=E.currentProgram.getUniforms();E.uniformsList=rr.seqWithValue(F.seq,E.uniforms)}return E.uniformsList}function eu(E,F){let Y=q.get(E);Y.outputColorSpace=F.outputColorSpace,Y.batching=F.batching,Y.batchingColor=F.batchingColor,Y.instancing=F.instancing,Y.instancingColor=F.instancingColor,Y.instancingMorph=F.instancingMorph,Y.skinning=F.skinning,Y.morphTargets=F.morphTargets,Y.morphNormals=F.morphNormals,Y.morphColors=F.morphColors,Y.morphTargetsCount=F.morphTargetsCount,Y.numClippingPlanes=F.numClippingPlanes,Y.numIntersection=F.numClipIntersection,Y.vertexAlphas=F.vertexAlphas,Y.vertexTangents=F.vertexTangents,Y.toneMapping=F.toneMapping}function sp(E,F){if(E.length===0)return null;if(E.length===1)return E[0].texture!==null?E[0]:null;_.setFromMatrixPosition(F.matrixWorld);for(let Y=0,G=E.length;Y<G;Y++){let W=E[Y];if(W.texture!==null&&W.boundingBox.containsPoint(_))return W}return null}function rp(E,F,Y,G,W){F.isScene!==!0&&(F=pi),Z.resetTextureUnits();let _t=F.fog,St=G.isMeshStandardMaterial||G.isMeshLambertMaterial||G.isMeshPhongMaterial?F.environment:null,yt=et===null?R.outputColorSpace:et.isXRRenderTarget===!0?et.texture.colorSpace:Kt.workingColorSpace,Rt=G.isMeshStandardMaterial||G.isMeshLambertMaterial&&!G.envMap||G.isMeshPhongMaterial&&!G.envMap,Lt=ct.get(G.envMap||St,Rt),Yt=G.vertexColors===!0&&!!Y.attributes.color&&Y.attributes.color.itemSize===4,Zt=!!Y.attributes.tangent&&(!!G.normalMap||G.anisotropy>0),Ct=!!Y.morphAttributes.position,ae=!!Y.morphAttributes.normal,Ue=!!Y.morphAttributes.color,Me=Hi;G.toneMapped&&(et===null||et.isXRRenderTarget===!0)&&(Me=R.toneMapping);let me=Y.morphAttributes.position||Y.morphAttributes.normal||Y.morphAttributes.color,ei=me!==void 0?me.length:0,bt=q.get(G),ci=S.state.lights;if(Wt===!0&&(xe===!0||E!==Q)){let _e=E===Q&&G.id===$;Nt.setState(G,E,_e)}let ie=!1;G.version===bt.__version?(bt.needsLights&&bt.lightsStateVersion!==ci.state.version||bt.outputColorSpace!==yt||W.isBatchedMesh&&bt.batching===!1||!W.isBatchedMesh&&bt.batching===!0||W.isBatchedMesh&&bt.batchingColor===!0&&W._colorsTexture===null||W.isBatchedMesh&&bt.batchingColor===!1&&W._colorsTexture!==null||W.isInstancedMesh&&bt.instancing===!1||!W.isInstancedMesh&&bt.instancing===!0||W.isSkinnedMesh&&bt.skinning===!1||!W.isSkinnedMesh&&bt.skinning===!0||W.isInstancedMesh&&bt.instancingColor===!0&&W.instanceColor===null||W.isInstancedMesh&&bt.instancingColor===!1&&W.instanceColor!==null||W.isInstancedMesh&&bt.instancingMorph===!0&&W.morphTexture===null||W.isInstancedMesh&&bt.instancingMorph===!1&&W.morphTexture!==null||bt.envMap!==Lt||G.fog===!0&&bt.fog!==_t||bt.numClippingPlanes!==void 0&&(bt.numClippingPlanes!==Nt.numPlanes||bt.numIntersection!==Nt.numIntersection)||bt.vertexAlphas!==Yt||bt.vertexTangents!==Zt||bt.morphTargets!==Ct||bt.morphNormals!==ae||bt.morphColors!==Ue||bt.toneMapping!==Me||bt.morphTargetsCount!==ei||!!bt.lightProbeGrid!=S.state.lightProbeGridArray.length>0)&&(ie=!0):(ie=!0,bt.__version=G.version);let Ti=bt.currentProgram;ie===!0&&(Ti=wo(G,F,W),U&&G.isNodeMaterial&&U.onUpdateProgram(G,Ti,bt));let ji=!1,In=!1,Ss=!1,ue=Ti.getUniforms(),Pe=bt.uniforms;if(w.useProgram(Ti.program)&&(ji=!0,In=!0,Ss=!0),G.id!==$&&($=G.id,In=!0),bt.needsLights){let _e=sp(S.state.lightProbeGridArray,W);bt.lightProbeGrid!==_e&&(bt.lightProbeGrid=_e,In=!0)}if(ji||Q!==E){w.buffers.depth.getReversed()&&E.reversedDepth!==!0&&(E._reversedDepth=!0,E.updateProjectionMatrix()),ue.setValue(B,"projectionMatrix",E.projectionMatrix),ue.setValue(B,"viewMatrix",E.matrixWorldInverse);let Dn=ue.map.cameraPosition;Dn!==void 0&&Dn.setValue(B,we.setFromMatrixPosition(E.matrixWorld)),P.logarithmicDepthBuffer&&ue.setValue(B,"logDepthBufFC",2/(Math.log(E.far+1)/Math.LN2)),(G.isMeshPhongMaterial||G.isMeshToonMaterial||G.isMeshLambertMaterial||G.isMeshBasicMaterial||G.isMeshStandardMaterial||G.isShaderMaterial)&&ue.setValue(B,"isOrthographic",E.isOrthographicCamera===!0),Q!==E&&(Q=E,In=!0,Ss=!0)}if(bt.needsLights&&(ci.state.sunShadowMap.length>0&&ue.setValue(B,"sunShadowMap",ci.state.sunShadowMap,Z),ci.state.directionalShadowMap.length>0&&ue.setValue(B,"directionalShadowMap",ci.state.directionalShadowMap,Z),ci.state.spotShadowMap.length>0&&ue.setValue(B,"spotShadowMap",ci.state.spotShadowMap,Z),ci.state.pointShadowMap.length>0&&ue.setValue(B,"pointShadowMap",ci.state.pointShadowMap,Z)),W.isSkinnedMesh){ue.setOptional(B,W,"bindMatrix"),ue.setOptional(B,W,"bindMatrixInverse");let _e=W.skeleton;_e&&(_e.boneTexture===null&&_e.computeBoneTexture(),ue.setValue(B,"boneTexture",_e.boneTexture,Z))}W.isBatchedMesh&&(ue.setOptional(B,W,"batchingTexture"),ue.setValue(B,"batchingTexture",W._matricesTexture,Z),ue.setOptional(B,W,"batchingIdTexture"),ue.setValue(B,"batchingIdTexture",W._indirectTexture,Z),ue.setOptional(B,W,"batchingColorTexture"),W._colorsTexture!==null&&ue.setValue(B,"batchingColorTexture",W._colorsTexture,Z));let Ln=Y.morphAttributes;if((Ln.position!==void 0||Ln.normal!==void 0||Ln.color!==void 0)&&O.update(W,Y,Ti),(In||bt.receiveShadow!==W.receiveShadow)&&(bt.receiveShadow=W.receiveShadow,ue.setValue(B,"receiveShadow",W.receiveShadow)),(G.isMeshStandardMaterial||G.isMeshLambertMaterial||G.isMeshPhongMaterial)&&G.envMap===null&&F.environment!==null&&(Pe.envMapIntensity.value=F.environmentIntensity),Pe.dfgLUT!==void 0&&(Pe.dfgLUT.value=Dy()),In){if(ue.setValue(B,"toneMappingExposure",R.toneMappingExposure),bt.needsLights&&op(Pe,Ss),_t&&G.fog===!0&&Dt.refreshFogUniforms(Pe,_t),Dt.refreshMaterialUniforms(Pe,G,K,X,S.state.transmissionRenderTarget[E.id]),bt.needsLights&&bt.lightProbeGrid){let _e=bt.lightProbeGrid;Pe.probesSH.value=_e.texture,Pe.probesMin.value.copy(_e.boundingBox.min),Pe.probesMax.value.copy(_e.boundingBox.max),Pe.probesResolution.value.copy(_e.resolution)}rr.upload(B,tu(bt),Pe,Z)}if(G.isShaderMaterial&&G.uniformsNeedUpdate===!0&&(rr.upload(B,tu(bt),Pe,Z),G.uniformsNeedUpdate=!1),G.isSpriteMaterial&&ue.setValue(B,"center",W.center),ue.setValue(B,"modelViewMatrix",W.modelViewMatrix),ue.setValue(B,"normalMatrix",W.normalMatrix),ue.setValue(B,"modelMatrix",W.matrixWorld),G.uniformsGroups!==void 0){let _e=G.uniformsGroups;for(let Dn=0,ws=_e.length;Dn<ws;Dn++){let nu=_e[Dn];st.update(nu,Ti),st.bind(nu,Ti)}}return Ti}function op(E,F){E.ambientLightColor.needsUpdate=F,E.lightProbe.needsUpdate=F,E.sunLights.needsUpdate=F,E.sunLightShadows.needsUpdate=F,E.directionalLights.needsUpdate=F,E.directionalLightShadows.needsUpdate=F,E.pointLights.needsUpdate=F,E.pointLightShadows.needsUpdate=F,E.spotLights.needsUpdate=F,E.spotLightShadows.needsUpdate=F,E.rectAreaLights.needsUpdate=F,E.hemisphereLights.needsUpdate=F}function ap(E){return E.isMeshLambertMaterial||E.isMeshToonMaterial||E.isMeshPhongMaterial||E.isMeshStandardMaterial||E.isShadowMaterial||E.isShaderMaterial&&E.lights===!0}this.getActiveCubeFace=function(){return k},this.getActiveMipmapLevel=function(){return z},this.getRenderTarget=function(){return et},this.setRenderTargetTextures=function(E,F,Y){let G=q.get(E);G.__autoAllocateDepthBuffer=E.resolveDepthBuffer===!1,G.__autoAllocateDepthBuffer===!1&&(G.__useRenderToTexture=!1),q.get(E.texture).__webglTexture=F,q.get(E.depthTexture).__webglTexture=G.__autoAllocateDepthBuffer?void 0:Y,G.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(E,F){let Y=q.get(E);Y.__webglFramebuffer=F,Y.__useDefaultFramebuffer=F===void 0},this.setRenderTarget=function(E,F=0,Y=0){et=E,k=F,z=Y;let G=null,W=!1,_t=!1;if(E){let yt=q.get(E);if(yt.__useDefaultFramebuffer!==void 0){w.bindFramebuffer(B.FRAMEBUFFER,yt.__webglFramebuffer),V.copy(E.viewport),nt.copy(E.scissor),rt=E.scissorTest,w.viewport(V),w.scissor(nt),w.setScissorTest(rt),$=-1;return}else if(yt.__webglFramebuffer===void 0)Z.setupRenderTarget(E);else if(yt.__hasExternalTextures)Z.rebindTextures(E,q.get(E.texture).__webglTexture,q.get(E.depthTexture).__webglTexture);else if(E.depthBuffer){let Yt=E.depthTexture;if(yt.__boundDepthTexture!==Yt){if(Yt!==null&&q.has(Yt)&&(E.width!==Yt.image.width||E.height!==Yt.image.height))throw new Error("THREE.WebGLRenderer: Attached DepthTexture is initialized to the incorrect size.");Z.setupDepthRenderbuffer(E)}}let Rt=E.texture;(Rt.isData3DTexture||Rt.isDataArrayTexture||Rt.isCompressedArrayTexture)&&(_t=!0);let Lt=q.get(E).__webglFramebuffer;E.isWebGLCubeRenderTarget?(Array.isArray(Lt[F])?G=Lt[F][Y]:G=Lt[F],W=!0):E.samples>0&&Z.useMultisampledRTT(E)===!1?G=q.get(E).__webglMultisampledFramebuffer:Array.isArray(Lt)?G=Lt[Y]:G=Lt,V.copy(E.viewport),nt.copy(E.scissor),rt=E.scissorTest}else V.copy(vt).multiplyScalar(K).floor(),nt.copy(wt).multiplyScalar(K).floor(),rt=qt;if(Y!==0&&(G=N),w.bindFramebuffer(B.FRAMEBUFFER,G)&&w.drawBuffers(E,G),w.viewport(V),w.scissor(nt),w.setScissorTest(rt),W){let yt=q.get(E.texture);B.framebufferTexture2D(B.FRAMEBUFFER,B.COLOR_ATTACHMENT0,B.TEXTURE_CUBE_MAP_POSITIVE_X+F,yt.__webglTexture,Y)}else if(_t){let yt=F;for(let Rt=0;Rt<E.textures.length;Rt++){let Lt=q.get(E.textures[Rt]);B.framebufferTextureLayer(B.FRAMEBUFFER,B.COLOR_ATTACHMENT0+Rt,Lt.__webglTexture,Y,yt)}}else if(E!==null&&Y!==0){let yt=q.get(E.texture);B.framebufferTexture2D(B.FRAMEBUFFER,B.COLOR_ATTACHMENT0,B.TEXTURE_2D,yt.__webglTexture,Y)}$=-1};function iu(E){let F=q.get(E);return(F.__readFormat!==E.format||F.__readType!==E.type)&&(F.__readFormat=E.format,F.__readType=E.type,F.__formatReadable=P.textureFormatReadable(E.format),F.__typeReadable=P.textureTypeReadable(E.type)),F}this.readRenderTargetPixels=function(E,F,Y,G,W,_t,St,yt=0){if(!(E&&E.isWebGLRenderTarget)){zt("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Rt=q.get(E).__webglFramebuffer;if(E.isWebGLCubeRenderTarget&&St!==void 0&&(Rt=Rt[St]),Rt){w.bindFramebuffer(B.FRAMEBUFFER,Rt);try{let Lt=E.textures[yt],Yt=Lt.format,Zt=Lt.type;E.textures.length>1&&B.readBuffer(B.COLOR_ATTACHMENT0+yt);let Ct=iu(Lt);if(Ct.__formatReadable===!1){zt("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(Ct.__typeReadable===!1){zt("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}F>=0&&F<=E.width-G&&Y>=0&&Y<=E.height-W&&B.readPixels(F,Y,G,W,mt.convert(Yt),mt.convert(Zt),_t)}finally{let Lt=et!==null?q.get(et).__webglFramebuffer:null;w.bindFramebuffer(B.FRAMEBUFFER,Lt)}}},this.readRenderTargetPixelsAsync=async function(E,F,Y,G,W,_t,St,yt=0){if(!(E&&E.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Rt=q.get(E).__webglFramebuffer;if(E.isWebGLCubeRenderTarget&&St!==void 0&&(Rt=Rt[St]),Rt)if(F>=0&&F<=E.width-G&&Y>=0&&Y<=E.height-W){w.bindFramebuffer(B.FRAMEBUFFER,Rt);let Lt=E.textures[yt],Yt=Lt.format,Zt=Lt.type;E.textures.length>1&&B.readBuffer(B.COLOR_ATTACHMENT0+yt);let Ct=iu(Lt);if(Ct.__formatReadable===!1)throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(Ct.__typeReadable===!1)throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");let ae=B.createBuffer();B.bindBuffer(B.PIXEL_PACK_BUFFER,ae),B.bufferData(B.PIXEL_PACK_BUFFER,_t.byteLength,B.STREAM_READ),B.readPixels(F,Y,G,W,mt.convert(Yt),mt.convert(Zt),0),B.bindBuffer(B.PIXEL_PACK_BUFFER,null);let Ue=et!==null?q.get(et).__webglFramebuffer:null;w.bindFramebuffer(B.FRAMEBUFFER,Ue);let Me=B.fenceSync(B.SYNC_GPU_COMMANDS_COMPLETE,0);return B.flush(),await dd(B,Me,4),B.bindBuffer(B.PIXEL_PACK_BUFFER,ae),B.getBufferSubData(B.PIXEL_PACK_BUFFER,0,_t),B.bindBuffer(B.PIXEL_PACK_BUFFER,null),B.deleteBuffer(ae),B.deleteSync(Me),_t}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(E,F=null,Y=0){let G=Math.pow(2,-Y),W=Math.floor(E.image.width*G),_t=Math.floor(E.image.height*G),St=F!==null?F.x:0,yt=F!==null?F.y:0;Z.setTexture2D(E,0),B.copyTexSubImage2D(B.TEXTURE_2D,Y,0,0,St,yt,W,_t),w.unbindTexture()},this.copyTextureToTexture=function(E,F,Y=null,G=null,W=0,_t=0){let St,yt,Rt,Lt,Yt,Zt,Ct,ae,Ue,Me=E.isCompressedTexture?E.mipmaps[_t]:E.image;if(Y!==null)St=Y.max.x-Y.min.x,yt=Y.max.y-Y.min.y,Rt=Y.isBox3?Y.max.z-Y.min.z:1,Lt=Y.min.x,Yt=Y.min.y,Zt=Y.isBox3?Y.min.z:0;else{let Pe=Math.pow(2,-W);St=Math.floor(Me.width*Pe),yt=Math.floor(Me.height*Pe),E.isDataArrayTexture?Rt=Me.depth:E.isData3DTexture?Rt=Math.floor(Me.depth*Pe):Rt=1,Lt=0,Yt=0,Zt=0}G!==null?(Ct=G.x,ae=G.y,Ue=G.z):(Ct=0,ae=0,Ue=0);let me=mt.convert(F.format),ei=mt.convert(F.type),bt;F.isData3DTexture?(Z.setTexture3D(F,0),bt=B.TEXTURE_3D):F.isDataArrayTexture||F.isCompressedArrayTexture?(Z.setTexture2DArray(F,0),bt=B.TEXTURE_2D_ARRAY):(Z.setTexture2D(F,0),bt=B.TEXTURE_2D),w.activeTexture(B.TEXTURE0),w.pixelStorei(B.UNPACK_FLIP_Y_WEBGL,F.flipY),w.pixelStorei(B.UNPACK_PREMULTIPLY_ALPHA_WEBGL,F.premultiplyAlpha),w.pixelStorei(B.UNPACK_ALIGNMENT,F.unpackAlignment);let ci=w.getParameter(B.UNPACK_ROW_LENGTH),ie=w.getParameter(B.UNPACK_IMAGE_HEIGHT),Ti=w.getParameter(B.UNPACK_SKIP_PIXELS),ji=w.getParameter(B.UNPACK_SKIP_ROWS),In=w.getParameter(B.UNPACK_SKIP_IMAGES);w.pixelStorei(B.UNPACK_ROW_LENGTH,Me.width),w.pixelStorei(B.UNPACK_IMAGE_HEIGHT,Me.height),w.pixelStorei(B.UNPACK_SKIP_PIXELS,Lt),w.pixelStorei(B.UNPACK_SKIP_ROWS,Yt),w.pixelStorei(B.UNPACK_SKIP_IMAGES,Zt);let Ss=E.isDataArrayTexture||E.isData3DTexture,ue=F.isDataArrayTexture||F.isData3DTexture;if(E.isDepthTexture){let Pe=q.get(E),Ln=q.get(F),_e=q.get(Pe.__renderTarget),Dn=q.get(Ln.__renderTarget);w.bindFramebuffer(B.READ_FRAMEBUFFER,_e.__webglFramebuffer),w.bindFramebuffer(B.DRAW_FRAMEBUFFER,Dn.__webglFramebuffer);for(let ws=0;ws<Rt;ws++)Ss&&(B.framebufferTextureLayer(B.READ_FRAMEBUFFER,B.COLOR_ATTACHMENT0,q.get(E).__webglTexture,W,Zt+ws),B.framebufferTextureLayer(B.DRAW_FRAMEBUFFER,B.COLOR_ATTACHMENT0,q.get(F).__webglTexture,_t,Ue+ws)),B.blitFramebuffer(Lt,Yt,St,yt,Ct,ae,St,yt,B.DEPTH_BUFFER_BIT,B.NEAREST);w.bindFramebuffer(B.READ_FRAMEBUFFER,null),w.bindFramebuffer(B.DRAW_FRAMEBUFFER,null)}else if(W!==0||E.isRenderTargetTexture||q.has(E)){let Pe=q.get(E),Ln=q.get(F);w.bindFramebuffer(B.READ_FRAMEBUFFER,C),w.bindFramebuffer(B.DRAW_FRAMEBUFFER,D);for(let _e=0;_e<Rt;_e++)Ss?B.framebufferTextureLayer(B.READ_FRAMEBUFFER,B.COLOR_ATTACHMENT0,Pe.__webglTexture,W,Zt+_e):B.framebufferTexture2D(B.READ_FRAMEBUFFER,B.COLOR_ATTACHMENT0,B.TEXTURE_2D,Pe.__webglTexture,W),ue?B.framebufferTextureLayer(B.DRAW_FRAMEBUFFER,B.COLOR_ATTACHMENT0,Ln.__webglTexture,_t,Ue+_e):B.framebufferTexture2D(B.DRAW_FRAMEBUFFER,B.COLOR_ATTACHMENT0,B.TEXTURE_2D,Ln.__webglTexture,_t),W!==0?B.blitFramebuffer(Lt,Yt,St,yt,Ct,ae,St,yt,B.COLOR_BUFFER_BIT,B.NEAREST):ue?B.copyTexSubImage3D(bt,_t,Ct,ae,Ue+_e,Lt,Yt,St,yt):B.copyTexSubImage2D(bt,_t,Ct,ae,Lt,Yt,St,yt);w.bindFramebuffer(B.READ_FRAMEBUFFER,null),w.bindFramebuffer(B.DRAW_FRAMEBUFFER,null)}else ue?E.isDataTexture||E.isData3DTexture?B.texSubImage3D(bt,_t,Ct,ae,Ue,St,yt,Rt,me,ei,Me.data):F.isCompressedArrayTexture?B.compressedTexSubImage3D(bt,_t,Ct,ae,Ue,St,yt,Rt,me,Me.data):B.texSubImage3D(bt,_t,Ct,ae,Ue,St,yt,Rt,me,ei,Me):E.isDataTexture?B.texSubImage2D(B.TEXTURE_2D,_t,Ct,ae,St,yt,me,ei,Me.data):E.isCompressedTexture?B.compressedTexSubImage2D(B.TEXTURE_2D,_t,Ct,ae,Me.width,Me.height,me,Me.data):B.texSubImage2D(B.TEXTURE_2D,_t,Ct,ae,St,yt,me,ei,Me);w.pixelStorei(B.UNPACK_ROW_LENGTH,ci),w.pixelStorei(B.UNPACK_IMAGE_HEIGHT,ie),w.pixelStorei(B.UNPACK_SKIP_PIXELS,Ti),w.pixelStorei(B.UNPACK_SKIP_ROWS,ji),w.pixelStorei(B.UNPACK_SKIP_IMAGES,In),_t===0&&F.generateMipmaps&&B.generateMipmap(bt),w.unbindTexture()},this.initRenderTarget=function(E){q.get(E).__webglFramebuffer===void 0&&Z.setupRenderTarget(E)},this.initTexture=function(E){E.isCubeTexture?Z.setTextureCube(E,0):E.isData3DTexture?Z.setTexture3D(E,0):E.isDataArrayTexture||E.isCompressedArrayTexture?Z.setTexture2DArray(E,0):Z.setTexture2D(E,0),w.unbindTexture()},this.resetState=function(){k=0,z=0,et=null,w.reset(),Mt.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return zi}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(t){this._outputColorSpace=t;let e=this.getContext();e.drawingBufferColorSpace=Kt._getDrawingBufferColorSpace(t),e.unpackColorSpace=Kt._getUnpackColorSpace()}};var Dh=Math.PI*2,Re=(r,t,e)=>r<t?t:r>e?e:r,Ve=(r,t,e)=>r+(t-r)*e;var Ce=(r,t,e)=>{let i=Re((e-r)/(t-r),0,1);return i*i*(3-2*i)},ps=(r,t,e,i)=>Ve(r,t,1-Math.exp(-e*i)),Yn=r=>(r%=Dh,r>Math.PI?r-=Dh:r<-Math.PI&&(r+=Dh),r),Tl=(r,t,e,i)=>r+Yn(t-r)*(1-Math.exp(-e*i));function jt(r){let t=r>>>0;return function(){t=t+1831565813>>>0;let e=t;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}}function Yd(r,t,e=0){let i=Math.imul(r|0,374761393)+Math.imul(t|0,668265263)+Math.imul(e|0,2147483647)|0;return i=Math.imul(i^i>>>13,1274126177),i^=i>>>16,(i>>>0)/4294967296}var $d=r=>r[Math.floor(Math.random()*r.length)];function Al(r,t=Math.random){for(let e=r.length-1;e>0;e--){let i=Math.floor(t()*(e+1));[r[e],r[i]]=[r[i],r[e]]}return r}function lo(r,t=Math.random){let e=0;for(let n of r)e+=n[1];let i=t()*e;for(let n of r)if(i-=n[1],i<=0)return n[0];return r[r.length-1][0]}var Tn=class{constructor(t=1){let e=jt(t),i=new Uint8Array(256);for(let n=0;n<256;n++)i[n]=n;for(let n=255;n>0;n--){let s=Math.floor(e()*(n+1)),o=i[n];i[n]=i[s],i[s]=o}this.perm=new Uint8Array(512),this.permMod12=new Uint8Array(512);for(let n=0;n<512;n++)this.perm[n]=i[n&255],this.permMod12[n]=this.perm[n]%12}noise(t,e){let i=.5*(Math.sqrt(3)-1),n=(3-Math.sqrt(3))/6,s=this.perm,o=this.permMod12,a=(t+e)*i,l=Math.floor(t+a),c=Math.floor(e+a),h=(l+c)*n,u=t-(l-h),d=e-(c-h),f=u>d?1:0,g=u>d?0:1,x=u-f+n,m=d-g+n,p=u-1+2*n,y=d-1+2*n,M=l&255,_=c&255,v=0,S=0,T=0,b=.5-u*u-d*d;if(b>=0){let I=o[M+s[_]]*2;b*=b,v=b*b*(lr[I]*u+lr[I+1]*d)}let A=.5-x*x-m*m;if(A>=0){let I=o[M+f+s[_+g]]*2;A*=A,S=A*A*(lr[I]*x+lr[I+1]*m)}let R=.5-p*p-y*y;if(R>=0){let I=o[M+1+s[_+1]]*2;R*=R,T=R*R*(lr[I]*p+lr[I+1]*y)}return 70*(v+S+T)}fbm(t,e,i=4,n=2,s=.5){let o=1,a=1,l=0,c=0;for(let h=0;h<i;h++)l+=o*this.noise(t*a,e*a),c+=o,o*=s,a*=n;return l/c}ridged(t,e,i=4){let n=1,s=1,o=0,a=0;for(let l=0;l<i;l++){let c=1-Math.abs(this.noise(t*s,e*s));o+=n*c*c,a+=n,n*=.5,s*=2.03}return o/a}},lr=new Float32Array([1,1,-1,1,1,-1,-1,-1,1,0,-1,0,1,0,-1,0,0,1,0,-1,0,1,0,-1]);var $e=[{id:"parkour_plaza",name:"Parkour Plaza",x:0,z:-40,y:"auto",flatR:105,blendR:200,clearR:120,color:"#38d6ff",chests:9,floorLoot:34,bias:{parkour:1.8,floorange:1.5},rough:0},{id:"distant_desert",name:"Distant Desert",x:-540,z:420,y:6,flatR:190,blendR:330,clearR:150,color:"#ffb347",chests:14,floorLoot:26,bias:{west:2.2},rough:.7},{id:"floorange_grove",name:"Floorange Grove",x:500,z:400,y:"auto",flatR:120,blendR:230,clearR:130,color:"#ff8a1f",chests:8,floorLoot:32,bias:{floorange:6,food:2.5},rough:1.2,grassOk:!0},{id:"frostpeak_lodge",name:"Frostpeak Lodge",x:-400,z:-380,y:"auto",flatR:80,blendR:150,clearR:95,color:"#bfe6ff",chests:8,floorLoot:22,bias:{heavy:1.6},rough:.5},{id:"bluewater_lake",name:"Bluewater Lake",x:480,z:-430,y:3,flatR:235,blendR:340,clearR:225,color:"#4fa8ff",chests:8,floorLoot:24,bias:{ranged:1.3},rough:.2,grassOk:!0},{id:"neon_heights",name:"Neon Heights",x:10,z:-590,y:"auto",flatR:140,blendR:230,clearR:150,color:"#ff4fd8",chests:14,floorLoot:40,bias:{smg:1.5,shield:1.6},rough:0},{id:"pinewood_camp",name:"Pinewood Camp",x:-650,z:-20,y:"auto",flatR:85,blendR:160,clearR:100,color:"#5bd16a",chests:6,floorLoot:22,bias:{melee:1.8},rough:.4,grassOk:!0},{id:"rusty_yard",name:"Rusty Yard",x:380,z:-20,y:"auto",flatR:115,blendR:200,clearR:125,color:"#d9d2c6",chests:9,floorLoot:30,bias:{explosive:1.7,heavy:1.3},rough:0}],Ge=Object.fromEntries($e.map(r=>[r.id,r])),Xi={x:480,z:-430,r:150,level:0},Ii={x:-540,z:420,r:330},An={x:-500,z:-520,sigma:215,height:118},Zd=16;var Ot={size:2048,half:1024,cell:2,n:1024,chunk:128,limit:1e3,islandR:830,seaLevel:0},ms=new Tn(1337),Cl=new Tn(7331),cr=new Tn(4242),Nh=new Tn(9001);function Ny(r,t){let e=Math.atan2(t,r),i=Math.cos(e),n=Math.sin(e);return Ot.islandR+75*ms.noise(i*1.2+5,n*1.2+5)+28*ms.noise(i*3.7,n*3.7)+10*ms.noise(r*.01,t*.01)}function jd(r,t){let e=Math.hypot(r-Ii.x,t-Ii.z),i=Cl.noise(r*.004,t*.004)*60;return 1-Ce(Ii.r*.7,Ii.r*1.15,e+i)}function Jd(r,t){let e=Math.hypot(r,t),i=Ny(r,t)-e,n=i>=0?3.2*Ce(0,75,i):Math.max(i*.15,-30);i<-250&&(n=-30+(i+250)*.01);let s=Ce(35,240,i),o=ms.fbm(r*.0021+3.1,t*.0021-1.7,5,2,.5),a=Re(o*.5+.55,0,1),l=Cl.ridged(r*.0035,t*.0035,3),c=4+a*a*30+l*l*14;n+=s*c;let h=(r-An.x)**2+(t-An.z)**2,u=Math.exp(-h/(2*An.sigma*An.sigma)),d=An.height*u*(.7+.55*Cl.ridged(r*.006,t*.006,4));n+=d*Ce(-60,90,i)+u*5*cr.noise(r*.03,t*.03);let f=jd(r,t)*Ce(5,90,i);if(f>0){let x=6+(1.6*cr.noise(r*.012,t*.012)+.6*cr.noise(r*.05,t*.05)),m=Math.hypot(r-Ii.x,t-Ii.z),p=Nh.noise(r*.0042+7,t*.0042+3);x+=Ce(.4,.48,p)*26*Ce(230,300,m),n=Ve(n,x,f*.97)}return n}for(let r of $e)r.y==="auto"&&(r.y=Jd(r.x,r.z));function Uy(r,t){let e=Jd(r,t);for(let n=0;n<$e.length;n++){let s=$e[n],o=Math.hypot(r-s.x,t-s.z);if(o>=s.blendR)continue;let a=1-Ce(s.flatR,s.blendR,o),l=s.y+(s.rough?s.rough*ms.noise(r*.03,t*.03)*Ce(s.roughStart??40,s.flatR,o):0);e=Ve(e,l,a)}let i=Math.hypot(r-Xi.x,t-Xi.z);if(i<Xi.r*1.1){let n=Cl.noise(r*.02,t*.02)*14,s=1-Ce(Xi.r*.55,Xi.r*1,i+n);e=Ve(e,-5.5,s);let o=Math.hypot(r-Xi.x,t-Xi.z-6);o<30&&(e=Math.max(e,Ve(-5.5,2.4,1-Ce(10,28,o))))}return e}function hr(r,t,e,i,n){n.desert=jd(r,t)*Ce(1.8,4.2,e)*(1-Ce(30,45,e)),n.snow=Ce(56+cr.noise(r*.02,t*.02)*9,78,e),n.rock=Ce(.62,1.1,i);let s=ms.fbm(r*.0046+100,t*.0046+100,3);return n.forest=Ce(.1,.36,s)*(1-n.desert)*(1-n.snow)*Ce(3.5,8,e),n.sand=(1-Ce(1,2.5,e+Nh.noise(r*.05,t*.05)*.4))*(e>-2?1:0),n}var qi=r=>new It(r),un={grassLush:qi("#4f7a2c"),grassDry:qi("#8a8a45"),forestFloor:qi("#2f4a20"),desertA:qi("#d8a866"),desertB:qi("#c47e4c"),beach:qi("#dccb9a"),rock:qi("#78726a"),rockDark:qi("#55504b"),snow:qi("#f4f8ff"),seabed:qi("#6d7f6a"),mud:qi("#6a5a3e")},Rl=new It,Fy={desert:0,snow:0,rock:0,forest:0,sand:0};function Pl(r,t,e,i,n){let s=hr(r,t,e,i,Fy),o=Nh.fbm(r*.025,t*.025,3)*.5+.5;n.copy(un.grassLush).lerp(un.grassDry,Re(o*1.3-.25,0,1)),n.lerp(un.forestFloor,s.forest*.85);let a=Math.sin((e+ms.noise(r*.01,t*.01)*3)*1.5)*.5+.5;Rl.copy(un.desertA).lerp(un.desertB,Re(a*.6+(e-6)*.04,0,1)),n.lerp(Rl,s.desert),n.lerp(un.beach,s.sand),Rl.copy(un.rock).lerp(un.rockDark,cr.noise(r*.08,t*.08)*.5+.5),n.lerp(Rl,s.rock),n.lerp(un.snow,s.snow*(1-s.rock*.45)),e<.3&&n.lerp(un.seabed,Ce(.3,-2,e));let l=.93+.14*cr.noise(r*.21,t*.21);return n.multiplyScalar(l),n}var Oy=[64,32,16],Il=class{constructor(){let t=Ot.n+1;this.N1=t,this.data=new Float32Array(t*t),this.group=new kt,this.group.name="terrain",this.chunks=[],this.viewDistance=800,this.material=null,this.buildQueue=[]}async bake(t){let{n:e,cell:i,half:n}=Ot,s=this.N1,o=performance.now();for(let a=0;a<=e;a++){let l=-n+a*i,c=a*s;for(let h=0;h<=e;h++)this.data[c+h]=Uy(-n+h*i,l);performance.now()-o>30&&(t?.(a/e),await new Promise(h=>setTimeout(h,0)),o=performance.now())}t?.(1)}height(t,e){let{n:i,cell:n,half:s}=Ot,o=(t+s)/n,a=(e+s)/n;o<0?o=0:o>i-1e-4&&(o=i-1e-4),a<0?a=0:a>i-1e-4&&(a=i-1e-4);let l=o|0,c=a|0,h=o-l,u=a-c,d=this.N1,f=this.data,g=c*d+l,x=f[g],m=f[g+1],p=f[g+d],y=f[g+d+1];return h+u<=1?x+(m-x)*h+(p-x)*u:y+(p-y)*(1-h)+(m-y)*(1-u)}normal(t,e,i){let s=this.height(t-1.5,e),o=this.height(t+1.5,e),a=this.height(t,e-1.5),l=this.height(t,e+1.5);return i.set(s-o,2*1.5,a-l).normalize(),i}slope(t,e){let n=(this.height(t+1.5,e)-this.height(t-1.5,e))/3,s=(this.height(t,e+1.5)-this.height(t,e-1.5))/(2*1.5);return Math.hypot(n,s)}createMeshes(t,e){this.material=new re({vertexColors:!0,map:e.detail,roughness:.96,metalness:0}),this.material.normalMap=null,this.normalMapTex=e.detailNormal;let i=Ot.size/Ot.chunk;for(let n=0;n<i;n++)for(let s=0;s<i;s++){let o=new Et(new Ae,this.material);o.receiveShadow=!0,o.frustumCulled=!0,o.visible=!1,o.matrixAutoUpdate=!1;let a={cx:s,cz:n,mesh:o,lod:-1,x0:-Ot.half+s*Ot.chunk,z0:-Ot.half+n*Ot.chunk,geoLow:null};a.mx=a.x0+Ot.chunk/2,a.mz=a.z0+Ot.chunk/2,this.chunks.push(a),this.group.add(o)}t.add(this.group)}setDetailNormals(t){this.material.normalMap=t?this.normalMapTex:null,t&&this.material.normalScale.set(.6,.6),this.material.needsUpdate=!0}buildGeometry(t,e){let i=Oy[e],s=Ot.chunk/i,o=i+1,a=o*o,l=4*o,c=a+l,h=new Float32Array(c*3),u=new Float32Array(c*3),d=new Float32Array(c*3),f=new Float32Array(c*2),g=new It,x=new L,m=5+e*4,p=0;for(let R=0;R<=i;R++)for(let I=0;I<=i;I++){let U=t.x0+I*s,N=t.z0+R*s,C=this.height(U,N);this.normal(U,N,x);let D=Math.sqrt(1-x.y*x.y)/Math.max(x.y,.05);Pl(U,N,C,D,g),h[p*3]=U,h[p*3+1]=C,h[p*3+2]=N,u[p*3]=x.x,u[p*3+1]=x.y,u[p*3+2]=x.z,d[p*3]=g.r,d[p*3+1]=g.g,d[p*3+2]=g.b,f[p*2]=U/7,f[p*2+1]=N/7,p++}let y=[];for(let R=0;R<=i;R++)y.push(R);for(let R=0;R<=i;R++)y.push(i*o+R);for(let R=0;R<=i;R++)y.push(R*o);for(let R=0;R<=i;R++)y.push(R*o+i);for(let R of y)h[p*3]=h[R*3],h[p*3+1]=h[R*3+1]-m,h[p*3+2]=h[R*3+2],u[p*3]=u[R*3],u[p*3+1]=u[R*3+1],u[p*3+2]=u[R*3+2],d[p*3]=d[R*3],d[p*3+1]=d[R*3+1],d[p*3+2]=d[R*3+2],f[p*2]=f[R*2],f[p*2+1]=f[R*2+1],p++;let M=new Uint32Array(i*i*6+4*i*6),_=0;for(let R=0;R<i;R++)for(let I=0;I<i;I++){let U=R*o+I,N=U+1,C=U+o,D=C+1;M[_++]=U,M[_++]=C,M[_++]=N,M[_++]=N,M[_++]=C,M[_++]=D}let v=[a,a+o,a+2*o,a+3*o],S=[0,i*o,0,i],T=[1,1,o,o],b=[!0,!1,!1,!0];for(let R=0;R<4;R++)for(let I=0;I<i;I++){let U=S[R]+I*T[R],N=U+T[R],C=v[R]+I,D=C+1;b[R]?(M[_++]=U,M[_++]=N,M[_++]=C,M[_++]=N,M[_++]=D,M[_++]=C):(M[_++]=U,M[_++]=C,M[_++]=N,M[_++]=N,M[_++]=C,M[_++]=D)}let A=new Ae;return A.setAttribute("position",new Se(h,3)),A.setAttribute("normal",new Se(u,3)),A.setAttribute("color",new Se(d,3)),A.setAttribute("uv",new Se(f,2)),A.setIndex(new Se(M,1)),A.computeBoundingSphere(),A.computeBoundingBox(),A}setChunkLod(t,e){if(t.lod===e)return;let i=t.mesh.geometry,n;e===2?n=t.geoLow||(t.geoLow=this.buildGeometry(t,2)):n=this.buildGeometry(t,e),t.mesh.geometry=n,i&&i!==t.geoLow&&i.dispose(),t.lod=e}update(t,e=!1){let i=this.viewDistance+Ot.chunk,n=e?1e9:3,s=this.lodNear??300,o=this.lodMid??700;for(let a of this.chunks){let l=Math.hypot(a.mx-t.x,a.mz-t.z);if(l>i){a.mesh.visible=!1;continue}let c,h=a.lod>=0?40:0;l<s+(a.lod===0?h:-h)?c=0:l<o+(a.lod<=1?h:-h)?c=1:c=2,c!==a.lod&&(n>0||a.lod<0)&&(this.setChunkLod(a,c),n--),a.mesh.visible=a.lod>=0}}async makeMapCanvas(t=1024,e=null){let i=document.createElement("canvas");i.width=i.height=t;let n=i.getContext("2d"),s=n.createImageData(t,t),o=new It,a=Ot.size/t,l=h=>Math.round(255*(h<=.0031308?12.92*h:1.055*Math.pow(h,1/2.4)-.055)),c=6;for(let h=0;h<t;h+=c){for(let u=h;u<Math.min(t,h+c);u++)for(let d=0;d<t;d++){let f=-Ot.half+(d+.5)*a,g=-Ot.half+(u+.5)*a,x=this.height(f,g),m=(u*t+d)*4;if(x<0){let p=Re(-x/14,0,1);s.data[m]=30+(1-p)*40,s.data[m+1]=90+(1-p)*60,s.data[m+2]=160+(1-p)*40}else{let p=this.slope(f,g);Pl(f,g,x,p,o);let y=Re(1+(this.height(f-4,g-4)-this.height(f+4,g+4))*.05,.6,1.35);s.data[m]=l(o.r*y),s.data[m+1]=l(o.g*y),s.data[m+2]=l(o.b*y)}s.data[m+3]=255}h%96===0&&await new Promise(u=>setTimeout(u,0))}return n.putImageData(s,0,0),e&&e(n,h=>(h+Ot.half)*(t/Ot.size),t/Ot.size),i}};function Kd(r){let t=new kt,e=new re({color:1798042,roughness:.08,metalness:0,transparent:!0,opacity:.86,normalMap:r.waterNormal,normalScale:new Vt(.55,.55),depthWrite:!1,envMapIntensity:1.6}),i=new Et(new Ri(6e3,6e3,1,1).rotateX(-Math.PI/2),e);i.position.y=Ot.seaLevel-.05,i.renderOrder=2;let n=new Et(new Ri(6e3,6e3).rotateX(-Math.PI/2),new se({color:401454}));return n.position.y=-36,t.add(n,i),t.userData.water=i,t}var Qd=0,Uh=1,Ll=2,dn=8,wi=Ot.size/dn,gs=1/0,Dl=class{constructor(t){this.terrain=t,this.grid=new Array(wi*wi).fill(null),this.all=[],this.rayId=0}_ci(t){let e=Math.floor((t+Ot.half)/dn);return e<0?0:e>=wi?wi-1:e}_insert(t){let e=this._ci(t.minX),i=this._ci(t.maxX),n=this._ci(t.minZ),s=this._ci(t.maxZ);for(let o=n;o<=s;o++)for(let a=e;a<=i;a++){let l=o*wi+a;(this.grid[l]||(this.grid[l]=[])).push(t)}return t.rs=0,this.all.push(t),t}addBox(t,e,i,n,s,o,a=0){return this._insert({t:Qd,minX:t,maxX:n,minZ:i,maxZ:o,minY:e,maxY:s,tag:a})}addRamp(t,e,i,n,s,o,a,l,c,h=0){let u=a==="x"?0:1,d=u===0?l?t:i:l?e:n,f=u===0?i-t:n-e,g=l?1:-1,x=(o-s)/f*g;return this._insert({t:Uh,minX:t,maxX:i,minZ:e,maxZ:n,minY:c,maxY:Math.max(s,o),tag:h,ax:u,s0:d,k:x,base:s})}addCircle(t,e,i,n,s,o=0){return this._insert({t:Ll,minX:t-i,maxX:t+i,minZ:e-i,maxZ:e+i,minY:n,maxY:s,cx:t,cz:e,r:i,tag:o})}surfaceAt(t,e,i){if(t.t===Ll){let n=e-t.cx,s=i-t.cz;return n*n+s*s<=t.r*t.r?t.maxY:-gs}return e<t.minX||e>t.maxX||i<t.minZ||i>t.maxZ?-gs:t.t===Qd?t.maxY:t.base+t.k*((t.ax===0?e:i)-t.s0)}groundAt(t,e,i,n){let s=this.terrain.height(t,e),o=this.grid[this._ci(e)*wi+this._ci(t)];if(o){let a=i+n;for(let l=0;l<o.length;l++){let c=o[l],h=this.surfaceAt(c,t,e);h>s&&h<=a&&(s=h)}}return s}ceilingAt(t,e,i,n=.25){let s=gs,o=this._ci(t-n),a=this._ci(t+n),l=this._ci(e-n),c=this._ci(e+n);for(let h=l;h<=c;h++)for(let u=o;u<=a;u++){let d=this.grid[h*wi+u];if(d)for(let f=0;f<d.length;f++){let g=d[f];g.minY<i-.05||g.minY>=s||t+n<g.minX||t-n>g.maxX||e+n<g.minZ||e-n>g.maxZ||(s=g.minY)}}return s}resolve(t,e,i,n){let s=!1,o=t.y;for(let a=0;a<3;a++){let l=!1,c=this._ci(t.x-e),h=this._ci(t.x+e),u=this._ci(t.z-e),d=this._ci(t.z+e);for(let f=u;f<=d;f++)for(let g=c;g<=h;g++){let x=this.grid[f*wi+g];if(x)for(let m=0;m<x.length;m++){let p=x[m];if(p.minY>=o+i-.1||p.maxY<=o+n)continue;if(p.t===Ll){let T=t.x-p.cx,b=t.z-p.cz,A=T*T+b*b,R=e+p.r;if(A>=R*R)continue;let I=Math.sqrt(A)||1e-4,U=(R-I)/I;t.x+=T*U,t.z+=b*U,l=!0;continue}if(t.x+e<=p.minX||t.x-e>=p.maxX||t.z+e<=p.minZ||t.z-e>=p.maxZ)continue;let y=t.x<p.minX?p.minX:t.x>p.maxX?p.maxX:t.x,M=t.z<p.minZ?p.minZ:t.z>p.maxZ?p.maxZ:t.z;if(p.t===Uh&&p.base+p.k*((p.ax===0?y:M)-p.s0)<=o+n)continue;let _=t.x-y,v=t.z-M,S=_*_+v*v;if(S>0){if(S>=e*e)continue;let T=Math.sqrt(S),b=(e-T)/T;t.x+=_*b,t.z+=v*b}else{let T=t.x-p.minX,b=p.maxX-t.x,A=t.z-p.minZ,R=p.maxZ-t.z,I=Math.min(T,b,A,R);I===T?t.x=p.minX-e:I===b?t.x=p.maxX+e:I===A?t.z=p.minZ-e:t.z=p.maxZ+e}l=!0}}if(!l)break;s=!0}return s}raycast(t,e,i,n,s,o,a,l){let c=a,h=-1,u=0,d=1,f=0,g=0,x=++this.rayId,m=Ot.half,p=Math.floor((t+m)/dn),y=Math.floor((i+m)/dn),M=n>0?1:-1,_=o>0?1:-1,v=n!==0?Math.abs(dn/n):gs,S=o!==0?Math.abs(dn/o):gs,T=n!==0?((n>0?(p+1)*dn:p*dn)-m-t)/n:gs,b=o!==0?((o>0?(y+1)*dn:y*dn)-m-i)/o:gs,A=0,R=By;for(let N=0;N<400;N++){if(p>=0&&p<wi&&y>=0&&y<wi){let D=this.grid[y*wi+p];if(D)for(let k=0;k<D.length;k++){let z=D[k];z.rs!==x&&(z.rs=x,ky(z,t,e,i,n,s,o,c,R)&&R.t<c&&(c=R.t,h=1,u=R.nx,d=R.ny,f=R.nz,g=z.tag))}}if(Math.min(T,b)>c||(T<b?(p+=M,A=T,T+=v):(y+=_,A=b,b+=S),p<0||p>=wi||y<0||y>=wi))break}let I=this.terrain;if(!(e>200&&s>=0)){let N=0,C=e-I.height(t,i),D=1.5;for(let k=D;k<=c+D;k+=D){let z=Math.min(k,c),et=t+n*z,$=e+s*z,Q=i+o*z,V=$-I.height(et,Q);if(V<0&&C>=0){let nt=N,rt=z;for(let at=0;at<7;at++){let lt=(nt+rt)*.5;e+s*lt-I.height(t+n*lt,i+o*lt)>0?nt=lt:rt=lt}if(rt<c){c=rt,h=0;let at=t+n*rt,lt=i+o*rt,ht=1.2;u=I.height(at-ht,lt)-I.height(at+ht,lt),d=2*ht,f=I.height(at,lt-ht)-I.height(at,lt+ht);let X=Math.hypot(u,d,f);u/=X,d/=X,f/=X,g=0}break}if(N=z,C=V,z>=c)break;k>80&&(D=3),k>250&&(D=6)}}return h<0?-1:(l&&(l.x=t+n*c,l.y=e+s*c,l.z=i+o*c,l.nx=u,l.ny=d,l.nz=f,l.kind=h,l.tag=g),c)}clearLine(t,e,i,n,s,o){let a=n-t,l=s-e,c=o-i,h=Math.hypot(a,l,c);return h<.01?!0:this.raycast(t,e,i,a/h,l/h,c/h,h-.1,null)<0}},By={t:0,nx:0,ny:0,nz:0};function ky(r,t,e,i,n,s,o,a,l){if(r.t===Ll){let g=t-r.cx,x=i-r.cz,m=n*n+o*o;if(m<1e-9)return!1;let p=g*n+x*o,y=g*g+x*x-r.r*r.r,M=p*p-m*y;if(M<0)return!1;let _=Math.sqrt(M),v=(-p-_)/m;if(v<0)if(y<0)v=0;else return!1;if(v>a)return!1;let S=e+s*v;if(S<r.minY||S>r.maxY)return!1;l.t=v;let T=t+n*v-r.cx,b=i+o*v-r.cz,A=Math.hypot(T,b)||1;return l.nx=T/A,l.ny=0,l.nz=b/A,!0}let c=0,h=a,u=0,d=0,f=0;if(n!==0){let g=1/n,x=(r.minX-t)*g,m=(r.maxX-t)*g,p=-1;if(x>m){let y=x;x=m,m=y,p=1}if(x>c&&(c=x,u=p,d=0,f=0),m<h&&(h=m),c>h)return!1}else if(t<r.minX||t>r.maxX)return!1;if(o!==0){let g=1/o,x=(r.minZ-i)*g,m=(r.maxZ-i)*g,p=-1;if(x>m){let y=x;x=m,m=y,p=1}if(x>c&&(c=x,u=0,d=0,f=p),m<h&&(h=m),c>h)return!1}else if(i<r.minZ||i>r.maxZ)return!1;if(s!==0){let g=1/s,x=(r.minY-e)*g,m=(r.maxY-e)*g,p=-1;if(x>m){let y=x;x=m,m=y,p=1}if(x>c&&(c=x,u=0,d=p,f=0),m<h&&(h=m),c>h)return!1}else if(e<r.minY||e>r.maxY)return!1;if(r.t===Uh){let g=r.ax===0?t:i,x=r.ax===0?n:o,m=e-r.base-r.k*(g-r.s0),p=s-r.k*x;if(Math.abs(p)<1e-9){if(m>0)return!1}else{let y=-m/p;if(p>0)y<h&&(h=y);else if(y>c){c=y;let M=Math.hypot(r.ax===0?-r.k:0,1,r.ax===1?-r.k:0);u=r.ax===0?-r.k/M:0,d=1/M,f=r.ax===1?-r.k/M:0}if(c>h)return!1}}return c>a||h<0?!1:(l.t=Math.max(c,0),l.nx=u,l.ny=d,l.nz=f,!0)}var Nl=new L(.52,.66,.42).normalize(),Ul=new It("#c3d6ea"),zy=new It("#3b78c8"),Hy=new It("#7fb0e0"),Vy=`
  varying vec3 vDir;
  void main() {
    vDir = position;
    vec4 p = modelViewMatrix * vec4(position, 1.0);
    gl_Position = projectionMatrix * p;
    gl_Position.z = gl_Position.w; // always at the far plane
  }
`,Gy=`
  uniform vec3 uHorizon; uniform vec3 uMid; uniform vec3 uZenith; uniform vec3 uSun;
  uniform float uStorm;
  varying vec3 vDir;
  void main() {
    vec3 d = normalize(vDir);
    float h = max(d.y, 0.0);
    vec3 col = mix(uHorizon, uMid, smoothstep(0.0, 0.22, h));
    col = mix(col, uZenith, smoothstep(0.15, 0.85, h));
    float s = max(dot(d, uSun), 0.0);
    col += vec3(1.0, 0.82, 0.55) * (pow(s, 6.0) * 0.14 + pow(s, 48.0) * 0.28);
    col += vec3(1.0, 0.97, 0.9) * smoothstep(0.9993, 0.9998, s) * 2.0;
    col = mix(col, uHorizon, smoothstep(0.0, -0.06, d.y));
    gl_FragColor = vec4(col, 1.0);
    #include <colorspace_fragment>
  }
`;function tf(r,t,e){let i=new kt;i.name="sky";let n=new Ze({vertexShader:Vy,fragmentShader:Gy,side:je,depthWrite:!1,depthTest:!1,fog:!1,toneMapped:!1,uniforms:{uHorizon:{value:Ul.clone()},uMid:{value:Hy.clone()},uZenith:{value:zy.clone()},uSun:{value:Nl.clone()},uStorm:{value:0}}}),s=new Et(new Ci(1,32,16),n);s.scale.setScalar(3e3),s.frustumCulled=!1,s.renderOrder=-10,i.add(s);let o=[],a=jt(31),l=new Zs({map:e.cloud,transparent:!0,depthWrite:!1,fog:!1,toneMapped:!1,opacity:.92,color:new It("#f6f9ff")}),c=new kt;for(let y=0;y<70;y++){let M=new Fr(l),_=500+a()*900;M.scale.set(_,_*.42,1),M.position.set((a()-.5)*5200,380+a()*360,(a()-.5)*5200),M.renderOrder=-5,c.add(M),o.push(M)}i.add(c);let h=new Yr(12375807,7301708,1.15),u=new Zr(16773596,3.2);u.castShadow=!0,u.shadow.bias=-4e-4,u.shadow.normalBias=.5;let d=u.shadow.camera;d.near=10,d.far=700,d.left=d.bottom=-110,d.right=d.top=110,u.shadow.mapSize.set(2048,2048),r.add(u,u.target,h),r.add(i),r.fog=new Nr(Ul.getHex(),200,900),r.fog.color.copy(Ul);let f=new or(t),g=new os,x=new Et(new Ci(1,32,16),n.clone());x.material.depthTest=!0,x.material.toneMapped=!1,x.scale.setScalar(50),g.add(x);let m=f.fromScene(g,.02,.1,100);return r.environment=m.texture,r.environmentIntensity=.55,{root:i,sun:u,hemi:h,fogColor:Ul,shadowTexel:.1,update(y,M,_,v){s.position.copy(y.position),c.position.set(y.position.x,0,y.position.z);for(let R of o)R.position.x+=_*6,R.position.x>2600&&(R.position.x-=5200);let S=(d.right-d.left)/u.shadow.mapSize.x,T=Math.round(M.x/S)*S,b=Math.round(M.y/S)*S,A=Math.round(M.z/S)*S;u.target.position.set(T,b,A),u.position.set(T+Nl.x*300,b+Nl.y*300,A+Nl.z*300),u.target.updateMatrixWorld()},setShadowQuality(y,M){if(y===0){u.castShadow=!1;return}u.castShadow=!0,u.shadow.mapSize.x!==y&&(u.shadow.mapSize.set(y,y),u.shadow.map?.dispose(),u.shadow.map=null),d.left=d.bottom=-M,d.right=d.top=M,d.updateProjectionMatrix()},setFog(y,M){r.fog.near=y,r.fog.far=M},setCloudsVisible(y){c.visible=y}}}var ef=new Map;function Fh(r){if(r&&r.isColor)return[r.r,r.g,r.b];let t=ef.get(r);if(!t){let e=new It(r);t=[e.r,e.g,e.b],ef.set(r,t)}return t}var ai=class{constructor(t=1){this.pos=[],this.nor=[],this.col=[],this.uv=[],this.idx=[],this.n=0,this.rng=jt(t)}_jitter(t,e){let[i,n,s]=Fh(t),o=1+(this.rng()-.5)*2*e;return[i*o,n*o,s*o]}_quad(t,e,i,n,s){let o=this.n;for(let a=0;a<4;a++){this.pos.push(t[a][0],t[a][1],t[a][2]),this.nor.push(e[0],e[1],e[2]);let l=n[a];this.col.push(i[0]*l,i[1]*l,i[2]*l),this.uv.push(s[a][0],s[a][1])}this.idx.push(o,o+1,o+2,o,o+2,o+3),this.n+=4}box(t,e,i,n,s,o,a,l={}){let c=this._jitter(a,l.jit??.05),h=l.uvScale??2.5,u=l.ao??.78,d=l.uvX??h,f=l.uvY??h,g=n-t,x=o-i,m=l.noBottom;this._quad([[n,e,o],[n,e,i],[n,s,i],[n,s,o]],[1,0,0],c,[u,u,1,1],[[o/d,e/f],[i/d,e/f],[i/d,s/f],[o/d,s/f]]),this._quad([[t,e,i],[t,e,o],[t,s,o],[t,s,i]],[-1,0,0],c,[u,u,1,1],[[i/d,e/f],[o/d,e/f],[o/d,s/f],[i/d,s/f]]),this._quad([[t,s,o],[n,s,o],[n,s,i],[t,s,i]],[0,1,0],c,[1,1,1,1],[[t/h,o/h],[n/h,o/h],[n/h,i/h],[t/h,i/h]]),this._quad([[t,e,o],[n,e,o],[n,s,o],[t,s,o]],[0,0,1],c,[u,u,1,1],[[t/d,e/f],[n/d,e/f],[n/d,s/f],[t/d,s/f]]),this._quad([[n,e,i],[t,e,i],[t,s,i],[n,s,i]],[0,0,-1],c,[u,u,1,1],[[n/d,e/f],[t/d,e/f],[t/d,s/f],[n/d,s/f]]),m||this._quad([[t,e,i],[n,e,i],[n,e,o],[t,e,o]],[0,-1,0],c,[u,u,u,u],[[t/h,i/h],[n/h,i/h],[n/h,o/h],[t/h,o/h]])}wedge(t,e,i,n,s,o,a,l,c,h,u={}){let d=this._jitter(h,u.jit??.04),f=u.uvScale??2.5,g=.8,x,m,p,y;if(a==="x"){let b=l?s:o,A=l?o:s;x=b,m=A,p=A,y=b}else{let b=l?s:o,A=l?o:s;x=b,m=b,p=A,y=A}let M=c,_=[i-t,m-x,0],v=[0,y-x,n-e],S=[_[1]*v[2]-_[2]*v[1],_[2]*v[0]-_[0]*v[2],_[0]*v[1]-_[1]*v[0]];S=[v[1]*_[2]-v[2]*_[1],v[2]*_[0]-v[0]*_[2],v[0]*_[1]-v[1]*_[0]],S[1]<0&&(S=S.map(b=>-b));let T=Math.hypot(...S);S=S.map(b=>b/T),this._quad([[t,y,n],[i,p,n],[i,m,e],[t,x,e]],S,d,[1,1,1,1],[[t/f,n/f],[i/f,n/f],[i/f,e/f],[t/f,e/f]]),this._quad([[i,M,n],[i,M,e],[i,m,e],[i,p,n]],[1,0,0],d,[g,g,1,1],[[n/f,M/f],[e/f,M/f],[e/f,m/f],[n/f,p/f]]),this._quad([[t,M,e],[t,M,n],[t,y,n],[t,x,e]],[-1,0,0],d,[g,g,1,1],[[e/f,M/f],[n/f,M/f],[n/f,y/f],[e/f,x/f]]),this._quad([[t,M,n],[i,M,n],[i,p,n],[t,y,n]],[0,0,1],d,[g,g,1,1],[[t/f,M/f],[i/f,M/f],[i/f,p/f],[t/f,y/f]]),this._quad([[i,M,e],[t,M,e],[t,x,e],[i,m,e]],[0,0,-1],d,[g,g,1,1],[[i/f,M/f],[t/f,M/f],[t/f,x/f],[i/f,m/f]])}cyl(t,e,i,n,s,o,a={}){let l=a.sides??10,c=a.rTop??n,h=this._jitter(o,a.jit??.04),u=a.ao??.8,d=a.uvScale??2.5,f=this.n,g=(n-c)/s;for(let x=0;x<=l;x++){let m=x/l*Math.PI*2,p=Math.cos(m),y=Math.sin(m),M=Math.hypot(1,g);for(let _=0;_<2;_++){let v=_===0?n:c,S=_===0?u:1;this.pos.push(t+p*v,e+_*s,i+y*v),this.nor.push(p/M,g/M,y/M),this.col.push(h[0]*S,h[1]*S,h[2]*S),this.uv.push(x/l*(Math.PI*2*n)/d,(e+_*s)/d)}}for(let x=0;x<l;x++){let m=f+x*2;this.idx.push(m,m+3,m+1,m,m+2,m+3)}if(this.n+=(l+1)*2,c>.01&&!a.noCap){let x=this.n;this.pos.push(t,e+s,i),this.nor.push(0,1,0),this.col.push(h[0],h[1],h[2]),this.uv.push(t/d,i/d);for(let m=0;m<=l;m++){let p=m/l*Math.PI*2;this.pos.push(t+Math.cos(p)*c,e+s,i+Math.sin(p)*c),this.nor.push(0,1,0),this.col.push(h[0],h[1],h[2]),this.uv.push((t+Math.cos(p)*c)/d,(i+Math.sin(p)*c)/d)}for(let m=0;m<l;m++)this.idx.push(x,x+2+m,x+1+m);this.n+=l+2}}gable(t,e,i,n,s,o,a,l,c={}){let h=this._jitter(l,.04),u=c.uvScale??2,d=c.thick??.25,f=s-d,g=(t+i)/2,x=(e+n)/2,m=s+o;if(a==="x"){let p=Math.hypot(o,x-e),y=(x-e)/p,M=o/p;this._quad([[t,s,n],[i,s,n],[i,m,x],[t,m,x]],[0,M,y],h,[.95,.95,1,1],[[t/u,n/u],[i/u,n/u],[i/u,x/u],[t/u,x/u]]),this._quad([[i,s,e],[t,s,e],[t,m,x],[i,m,x]],[0,M,-y],h,[.95,.95,1,1],[[i/u,e/u],[t/u,e/u],[t/u,x/u],[i/u,x/u]]),this._tri([[i,f,n],[i,f,e],[i,m,x]],[1,0,0],h),this._tri([[t,f,e],[t,f,n],[t,m,x]],[-1,0,0],h),this._quad([[t,f,e],[i,f,e],[i,f,n],[t,f,n]],[0,-1,0],h,[.7,.7,.7,.7],[[0,0],[1,0],[1,1],[0,1]]),this._quad([[t,f,n],[i,f,n],[i,s,n],[t,s,n]],[0,0,1],h,[.8,.8,.9,.9],[[0,0],[1,0],[1,.1],[0,.1]]),this._quad([[i,f,e],[t,f,e],[t,s,e],[i,s,e]],[0,0,-1],h,[.8,.8,.9,.9],[[0,0],[1,0],[1,.1],[0,.1]])}else{let p=Math.hypot(o,g-t),y=(g-t)/p,M=o/p;this._quad([[i,s,n],[i,s,e],[g,m,e],[g,m,n]],[y,M,0],h,[.95,.95,1,1],[[n/u,i/u],[e/u,i/u],[e/u,g/u],[n/u,g/u]]),this._quad([[t,s,e],[t,s,n],[g,m,n],[g,m,e]],[-y,M,0],h,[.95,.95,1,1],[[e/u,t/u],[n/u,t/u],[n/u,g/u],[e/u,g/u]]),this._tri([[t,f,n],[i,f,n],[g,m,n]],[0,0,1],h),this._tri([[i,f,e],[t,f,e],[g,m,e]],[0,0,-1],h),this._quad([[t,f,e],[i,f,e],[i,f,n],[t,f,n]],[0,-1,0],h,[.7,.7,.7,.7],[[0,0],[1,0],[1,1],[0,1]]),this._quad([[i,f,n],[i,f,e],[i,s,e],[i,s,n]],[1,0,0],h,[.8,.8,.9,.9],[[0,0],[1,0],[1,.1],[0,.1]]),this._quad([[t,f,e],[t,f,n],[t,s,n],[t,s,e]],[-1,0,0],h,[.8,.8,.9,.9],[[0,0],[1,0],[1,.1],[0,.1]])}}_tri(t,e,i){let n=this.n;for(let s=0;s<3;s++)this.pos.push(t[s][0],t[s][1],t[s][2]),this.nor.push(e[0],e[1],e[2]),this.col.push(i[0]*.92,i[1]*.92,i[2]*.92),this.uv.push(t[s][0]/2+t[s][2]/2,t[s][1]/2);this.idx.push(n,n+1,n+2),this.n+=3}limb(t,e,i,n,s,o,a,l,c,h={}){let u=h.sides??6,d=this._jitter(c,h.jit??.05),f=n-t,g=s-e,x=o-i,m=Math.hypot(f,g,x)||1;f/=m,g/=m,x/=m;let p=0,y=1,M=0;Math.abs(g)>.9&&(p=1,y=0);let _=g*M-x*y,v=x*p-f*M,S=f*y-g*p,T=Math.hypot(_,v,S);_/=T,v/=T,S/=T,p=v*x-S*g,y=S*f-_*x,M=_*g-v*f;let b=this.n,A=h.ao??.85;for(let R=0;R<=u;R++){let I=R/u*Math.PI*2,U=Math.cos(I),N=Math.sin(I),C=p*U+_*N,D=y*U+v*N,k=M*U+S*N;for(let z=0;z<2;z++){let et=z===0?a:l,$=z===0?t:n,Q=z===0?e:s,V=z===0?i:o;this.pos.push($+C*et,Q+D*et,V+k*et),this.nor.push(C,D,k);let nt=z===0?A:1;this.col.push(d[0]*nt,d[1]*nt,d[2]*nt),this.uv.push(R/u,z)}}for(let R=0;R<u;R++){let I=b+R*2;this.idx.push(I,I+3,I+1,I,I+2,I+3)}this.n+=(u+1)*2}blob(t,e,i,n,s,o,a,l={}){let c=l.seg??7,h=l.rings??5,u=l.wobble??.18,d=this._jitter(a,l.jit??.06),f=l.ao??.72,g=this.n,x=this.rng,m=[];for(let p=0;p<=h;p++){let y=p/h,M=y*Math.PI;for(let _=0;_<=c;_++){let v=_/c*Math.PI*2,S=_===c?0:_,T=1+(m[p*(c+1)+S]??(x()-.5)*2*u);m[p*(c+1)+_]=T-1;let b=Math.sin(M)*Math.cos(v),A=Math.cos(M),R=Math.sin(M)*Math.sin(v),I=p===0||p===h?1:T;this.pos.push(t+b*n*I,e+A*s*I,i+R*o*I);let U=Math.hypot(b/n,A/s,R/o)||1;this.nor.push(b/n/U,A/s/U,R/o/U);let N=f+(1-f)*(A*.5+.5);this.col.push(d[0]*N,d[1]*N,d[2]*N),this.uv.push(_/c,y)}}for(let p=0;p<h;p++)for(let y=0;y<c;y++){let M=g+p*(c+1)+y,_=M+1,v=M+c+1,S=v+1;this.idx.push(M,_,v,_,S,v)}this.n+=(h+1)*(c+1)}strip(t,e,i,n,s={}){let o=Fh(i),a=Fh(n),l=s.normal??[0,1,0],c=s.side??[1,0,0],h=t.length,u=this.n;for(let d=0;d<h;d++){let f=d/(h-1),g=t[d],x=e[d]/2,m=[o[0]+(a[0]-o[0])*f,o[1]+(a[1]-o[1])*f,o[2]+(a[2]-o[2])*f];for(let p of[-1,1])this.pos.push(g[0]+c[0]*x*p,g[1]+c[1]*x*p,g[2]+c[2]*x*p),this.nor.push(l[0],l[1],l[2]),this.col.push(m[0],m[1],m[2]),this.uv.push(p<0?0:1,f)}for(let d=0;d<h-1;d++){let f=u+d*2;this.idx.push(f,f+1,f+3,f,f+3,f+2),this.idx.push(f,f+3,f+1,f,f+2,f+3)}this.n+=h*2}cone(t,e,i,n,s,o,a=8,l={}){this.cyl(t,e,i,n,s,o,{sides:a,rTop:1e-4,noCap:!0,...l})}build(){if(!this.n)return null;let t=new Ae;return t.setAttribute("position",new he(this.pos,3)),t.setAttribute("normal",new he(this.nor,3)),t.setAttribute("color",new he(this.col,3)),t.setAttribute("uv",new he(this.uv,2)),t.setIndex(this.n>65e3?new ls(this.idx,1):new as(this.idx,1)),t.computeBoundingSphere(),t.computeBoundingBox(),t}},De=class{constructor(t,e=1){this.world=t,this.col=t.collision,this.terrain=t.terrain,this.rng=jt(e),this.solid=new ai(e*3+1),this.glow=new ai(e*3+2),this.glass=new ai(e*3+3),this.tower=new ai(e*3+4),this.spots=[],this.buildings=[],this.jumpPads=[],this.animated=[],this.meshes=[],this.lights=[]}h(t,e){return this.terrain.height(t,e)}box(t,e,i,n,s,o,a,l={}){let c=t-n/2,h=t+n/2,u=i-o/2,d=i+o/2;return(l.batch||this.solid).box(c,e,u,h,e+s,d,a,l),l.solid===!1?null:this.col.addBox(c,l.colBottom??e,u,h,e+s,d,l.tag??0)}mapRect(t,e,i,n,s){var o;((o=this.world).mapRects||(o.mapRects=[])).push({x0:t,z0:e,x1:i,z1:n,color:s})}slab(t,e,i,n,s,o,a,l={}){return(l.batch||this.solid).box(t,e,i,n,s,o,a,l),l.solid===!1?null:this.col.addBox(t,l.colBottom??e,i,n,s,o,l.tag??0)}glowBox(t,e,i,n,s,o,a){this.glow.box(t-n/2,e,i-o/2,t+n/2,e+s,i+o/2,a,{jit:0,ao:1})}ramp(t,e,i,n,s,o,a,l,c,h,u={}){return this.solid.wedge(t,e,i,n,s,o,a,l,c,h,u),this.col.addRamp(t,e,i,n,s,o,a,l,c,u.tag??0)}stairs(t,e,i,n,s,o,a,l,c,h,u={}){let d=o-s,f=Math.max(2,Math.round(d/.22)),g=a==="x"?i-t:n-e;for(let x=0;x<f;x++){let m=x/f,p=(x+1)/f,y=s+d*p,M,_;l?(M=m,_=p):(M=1-p,_=1-m),a==="x"?this.solid.box(t+M*g,c,e,t+_*g,y,n,h,{jit:.08,ao:.9,noBottom:!0}):this.solid.box(t,c,e+M*g,i,y,e+_*g,h,{jit:.08,ao:.9,noBottom:!0})}return this.col.addRamp(t,e,i,n,s,o,a,l,c,u.tag??0)}cylinder(t,e,i,n,s,o,a={}){return(a.batch||this.solid).cyl(t,e,i,n,s,o,a),a.solid===!1?null:this.col.addCircle(t,i,n,e,e+s,a.tag??0)}crate(t,e,i=1,n=9136702,s=null){let o=s??this.h(t,e);return this.box(t,o,e,i,i,i,n,{jit:.1}),this.solid.box(t-i/2-.01,o+i*.45,e-i/2-.01,t+i/2+.01,o+i*.55,e+i/2+.01,6112551,{jit:.05,ao:1}),o+i}barrel(t,e,i=8014634,n=null){let s=n??this.h(t,e);this.cylinder(t,s,e,.42,1,i,{sides:9}),this.solid.cyl(t,s+.3,e,.44,.07,2894892,{sides:9,noCap:!0,ao:1}),this.solid.cyl(t,s+.75,e,.44,.07,2894892,{sides:9,noCap:!0,ao:1})}hay(t,e,i=null){let n=i??this.h(t,e);this.box(t,n,e,1.6,1,1.1,13939802,{jit:.08})}fence(t,e,i,n,s=9071173,o={}){let a=Math.hypot(i-t,n-e),l=Math.max(1,Math.round(a/2.5)),c=(i-t)/l,h=(n-e)/l,u=Math.abs(i-t)>Math.abs(n-e);for(let d=0;d<=l;d++){let f=t+c*d,g=e+h*d,x=this.h(f,g);this.solid.box(f-.08,x-.1,g-.08,f+.08,x+1.25,g+.08,s,{jit:.1})}for(let d of o.rails??[.45,.95])for(let f=0;f<l;f++){let g=t+c*f,x=e+h*f,m=g+c,p=x+h,y=(this.h(g,x)+this.h(m,p))/2+d,M=.06;u?this.slab(Math.min(g,m),y,x-M,Math.max(g,m),y+.12,x+M,s,{solid:!1}):this.slab(g-M,y,Math.min(x,p),g+M,y+.12,Math.max(x,p),s,{solid:!1})}if(o.solid!==!1){let f=Math.min(this.h(t,e),this.h(i,n))-.5;this.col.addBox(Math.min(t,i)-.1,f,Math.min(e,n)-.1,Math.max(t,i)+.1,f+2,Math.max(e,n)+.1,0)}}chest(t,e,i,n=0){this.world.chestSpots.push({x:t,y:e,z:i,yaw:n,poi:this.poiId})}floorLoot(t,e,i,n=!1,s=null){this.world.lootSpots.push({x:t,y:e,z:i,elevated:n,poi:this.poiId,tag:s})}building(t){let e=t.wallT??.3,i=t.floors??1,n=t.floorH??3.2,s=t.w,o=t.d,a=t.x-s/2,l=t.x+s/2,c=t.z-o/2,h=t.z+o/2,u=[[a,c],[l,c],[a,h],[l,h],[t.x,t.z]],d=t.y??Math.max(...u.map(([V,nt])=>this.h(V,nt)))-.02,f=t.color??10518624,g=t.trim??4864554,x=t.floorColor??7230008,m=t.roof??"flat",p=t.doorW??1.9,y=t.doorH??2.5,M=i*n,_=V=>d+.12+V*n,v=_(i),S=m==="flat"?v:d+.12+M;this.slab(a-.25,d-1.4,c-.25,l+.25,d+.12,h+.25,t.baseColor??7827558,{colBottom:d-1.4,jit:.04,uvScale:3}),this.solid.box(a+e,d+.119,c+e,l-e,d+.125,h-e,x,{jit:.03,ao:1,noBottom:!0});let T=(t.doors??[{side:"S",off:0}]).map(V=>({...V})),b=V=>T.filter(nt=>nt.side===V),A=d-1,R=_(0)+y,I=t.batch||this.solid,U=(V,nt,rt,at,lt)=>{let ht=lt==="N"||lt==="S",X=ht?V:nt,K=ht?rt:at,ot=b(lt).map(wt=>{let qt=(ht?t.x:t.z)+(wt.off||0);return[qt-p/2,qt+p/2]}).sort((wt,qt)=>wt[0]-qt[0]),Tt=X,vt=(wt,qt)=>{qt-wt<.05||(ht?this.slab(wt,A,nt,qt,S,at,f,{batch:I,colBottom:d,uvScale:t.uvScale??2.5}):this.slab(V,A,wt,rt,S,qt,f,{batch:I,colBottom:d,uvScale:t.uvScale??2.5}))};for(let[wt,qt]of ot){vt(Tt,wt),ht?this.slab(wt,R,nt,qt,S,at,f,{batch:I,colBottom:R}):this.slab(V,R,wt,rt,S,qt,f,{batch:I,colBottom:R});let At=.1;ht?(this.solid.box(wt-At,_(0),nt-.04,wt,R,at+.04,g,{ao:1}),this.solid.box(qt,_(0),nt-.04,qt+At,R,at+.04,g,{ao:1})):(this.solid.box(V-.04,_(0),wt-At,rt+.04,R,wt,g,{ao:1}),this.solid.box(V-.04,_(0),qt,rt+.04,R,qt+At,g,{ao:1})),Tt=qt}vt(Tt,K)};if(U(a,c,l,c+e,"N"),U(a,h-e,l,h,"S"),U(a,c+e,a+e,h-e,"W"),U(l-e,c+e,l,h-e,"E"),t.corners!==!1)for(let[V,nt]of[[a,c],[l,c],[a,h],[l,h]])this.solid.box(V-.18,d-.2,nt-.18,V+.18,S+.05,nt+.18,g,{jit:.04,ao:.9});if(t.band)for(let V=1;V<=i;V++){let nt=_(V)-.35;this.solid.box(a-.06,nt,c-.06,l+.06,nt+.35,h+.06,g,{jit:.02,ao:1})}if(t.windows!==!1){let V=t.windowSpacing??3.6;for(let nt=0;nt<i;nt++){let rt=_(nt)+.95,at=t.windowH??1.25,lt=t.windowW??1.3;for(let ht of["N","S","E","W"]){let X=ht==="N"||ht==="S",K=X?s:o,ot=Math.max(1,Math.floor((K-1.6)/V));for(let Tt=0;Tt<ot;Tt++){let vt=((Tt+.5)/ot-.5)*(K-1.2),wt=(X?t.x:t.z)+vt;if(nt===0&&b(ht).some(At=>Math.abs((X?t.x:t.z)+(At.off||0)-wt)<p/2+lt/2+.2))continue;let qt=.03;if(X){let At=ht==="N"?c:h,Wt=ht==="N"?-qt:qt;this.solid.box(wt-lt/2-.1,rt-.1,Math.min(At,At+Wt)-.02,wt+lt/2+.1,rt+at+.1,Math.max(At,At+Wt)+.02,g,{ao:1,jit:.03}),this.glass.box(wt-lt/2,rt,Math.min(At,At+Wt*2.2),wt+lt/2,rt+at,Math.max(At,At+Wt*2.2),7316680,{ao:1,jit:0})}else{let At=ht==="W"?a:l,Wt=ht==="W"?-qt:qt;this.solid.box(Math.min(At,At+Wt)-.02,rt-.1,wt-lt/2-.1,Math.max(At,At+Wt)+.02,rt+at+.1,wt+lt/2+.1,g,{ao:1,jit:.03}),this.glass.box(Math.min(At,At+Wt*2.2),rt,wt-lt/2,Math.max(At,At+Wt*2.2),rt+at,wt+lt/2,7316680,{ao:1,jit:0})}}}}}let N=a+e,C=l-e,D=c+e,k=h-e,z=1.8,et=[],$=m==="flat"?i:i-1;for(let V=0;V<$;V++){let rt=n/.55,at=V%2===0,lt=at?N:C-z,ht=at?N+z:C,X=at?D:k-rt,K=at?D+rt:k;this.stairs(lt,X,ht,K,_(V),_(V+1),"z",!at,_(V)-.1,t.stairColor??7692362);let ot=_(V+1),Tt=t.slabColor??9079430;m==="flat"&&V+1===i||(at?(this.slab(ht,ot-.25,D,C,ot,k,Tt,{colBottom:ot-.25,jit:.03}),this.slab(lt,ot-.25,K,ht,ot,k,Tt,{colBottom:ot-.25,jit:.03})):(this.slab(N,ot-.25,D,lt,ot,k,Tt,{colBottom:ot-.25,jit:.03}),this.slab(lt,ot-.25,D,ht,ot,X,Tt,{colBottom:ot-.25,jit:.03}))),et.push({k:V,lowX:(lt+ht)/2,lowZ:at?K-.6:X+.6,lowY:_(V),highX:(lt+ht)/2,highZ:at?X+.6:K-.6,highY:_(V+1),entryX:at?ht+.9:lt-.9,entryZ:at?K-.6:X+.6})}if(m==="flat"){let V=t.parapet??.9;if(V>0){let at=v;this.solid.box(a-.15,at,c-.15,l+.15,at+V,c+.12,f,{ao:.9}),this.solid.box(a-.15,at,h-.12,l+.15,at+V,h+.15,f,{ao:.9}),this.solid.box(a-.15,at,c+.12,a+.12,at+V,h-.12,f,{ao:.9}),this.solid.box(l-.12,at,c+.12,l+.15,at+V,h-.12,f,{ao:.9}),this.col.addBox(a-.15,at,c-.15,l+.15,at+V,c+.12),this.col.addBox(a-.15,at,h-.12,l+.15,at+V,h+.15),this.col.addBox(a-.15,at,c+.12,a+.12,at+V,h-.12),this.col.addBox(l-.12,at,c+.12,l+.15,at+V,h-.12)}let nt=t.roofColor??6249045;if(et.find(at=>at.k===i-1)){let at=(i-1)%2===0,lt=at?N:C-z,ht=at?N+z:C,X=n/.55;at?(this.slab(ht,v-.25,c,l,v,h,nt,{colBottom:v-.25}),this.slab(a,v-.25,c,lt,v,h,nt,{colBottom:v-.25}),this.slab(lt,v-.25,c,ht,v,D,nt,{colBottom:v-.25}),this.slab(lt,v-.25,D+X,ht,v,h,nt,{colBottom:v-.25})):(this.slab(a,v-.25,c,lt,v,h,nt,{colBottom:v-.25}),this.slab(ht,v-.25,c,l,v,h,nt,{colBottom:v-.25}),this.slab(lt,v-.25,c,ht,v,k-X,nt,{colBottom:v-.25}),this.slab(lt,v-.25,k,ht,v,h,nt,{colBottom:v-.25}))}else this.slab(a,v-.25,c,l,v,h,nt,{colBottom:v-.25})}else if(m==="gable"){let nt=t.ridge??(s>=o?"x":"z"),rt=t.rise??Math.min(s,o)*.3,at=a-(nt==="x"?.5:.2),lt=l+(nt==="x"?.5:.2),ht=c-(nt==="x"?.2:.5),X=h+(nt==="x"?.2:.5),K=t.roofColor??7027499;if(this.solid.gable(at,ht,lt,X,S,rt,nt,K,{uvScale:2}),nt==="x"){let ot=(ht+X)/2;this.col.addRamp(at,ht,lt,ot,S,S+rt,"z",!0,S-.3),this.col.addRamp(at,ot,lt,X,S,S+rt,"z",!1,S-.3)}else{let ot=(at+lt)/2;this.col.addRamp(at,ht,ot,X,S,S+rt,"x",!0,S-.3),this.col.addRamp(ot,ht,lt,X,S,S+rt,"x",!1,S-.3)}if(t.chimney){let ot=l-1.2,Tt=t.z;this.solid.box(ot-.45,d-.5,Tt-.45,ot+.45,S+rt+1,Tt+.45,8418924,{ao:.85}),this.col.addBox(ot-.45,d,Tt-.45,ot+.45,S+rt+1,Tt+.45)}}let Q={id:t.id||"b",x:t.x,z:t.z,minX:a,maxX:l,minZ:c,maxZ:h,y0:_(0),floors:i,floorH:n,doors:[],stairs:et,roofAccess:m==="flat"&&i>0,topY:v};for(let V of T){let nt=V.side==="N"||V.side==="S",rt=(nt?t.x:t.z)+(V.off||0),at=V.side==="N"||V.side==="W"?-1:1,lt=nt?rt:V.side==="W"?a+e/2:l-e/2,ht=nt?V.side==="N"?c+e/2:h-e/2:rt;Q.doors.push({x:lt,z:ht,outX:nt?lt:lt+at*2.2,outZ:nt?ht+at*2.2:ht,inX:nt?lt:lt-at*1.8,inZ:nt?ht-at*1.8:ht})}return this.buildings.push(Q),this.world.buildings.push(Q),Q}stockBuilding(t,{chests:e=1,floorSpots:i=2,upper:n=!0,rng:s=this.rng}={}){let a=c=>c%2===0?[t.minX+.3,t.minX+2.5]:[t.maxX-2.5,t.maxX-.3],l=(c,h)=>{for(let u=0;u<12;u++){let d=t.minX+1+.4+s()*(t.maxX-t.minX-2-.8),f=t.minZ+1+.4+s()*(t.maxZ-t.minZ-2-.8),g=!1;for(let m=0;m<t.stairs.length;m++){let[p,y]=a(m);d>p-.8&&d<y+.8&&(g=!0)}if(g)continue;let x=t.y0+c*t.floorH;h?this.chest(d,x,f,Math.floor(s()*4)*Math.PI/2):this.floorLoot(d,x,f,c>0);return}};for(let c=0;c<e;c++)l(0,!0);for(let c=0;c<i;c++)l(0,!1);if(n&&t.floors>1){for(let c=1;c<t.floors;c++)l(c,s()<.7),l(c,!1);t.roofAccess&&s()<.7&&l(t.floors,s()<.5)}}},nf=new Map;function Fl(r,t,e,{bg:i="#3a2616",fg:n="#f4d58a",border:s="#1a0f08",font:o="bold 64px Georgia, serif",glow:a=!1}={}){let l=[r,i,n,o].join("|"),c=nf.get(l);if(!c){let u=document.createElement("canvas"),d=t/e;u.width=512,u.height=Math.max(32,Math.round(512/d));let f=u.getContext("2d");f.fillStyle=i,f.fillRect(0,0,u.width,u.height),f.strokeStyle=s,f.lineWidth=10,f.strokeRect(5,5,u.width-10,u.height-10),f.fillStyle=n,f.textAlign="center",f.textBaseline="middle";let g=Math.floor(u.height*.6);do f.font=o.replace(/\d+px/,g+"px"),g-=2;while(f.measureText(r).width>u.width-40&&g>10);f.fillText(r,u.width/2,u.height/2+2);let x=new wn(u);x.colorSpace=Ie,x.anisotropy=4,c=a?new se({map:x,side:Oe}):new re({map:x,roughness:.8,side:Oe}),nf.set(l,c)}let h=new Et(new Ri(t,e),c);return h.castShadow=!1,h}var fn=256;function sf(r=!1){let t=new ai(r?12:11);t.cyl(0,0,0,.32,4,5915440,{sides:6,rTop:.2,noCap:!0});for(let e=0;e<5;e++){let i=2.5+e*1.8,n=2.6-e*.46,s=2.7,o=r?e%2?14674414:3103300:[2972206,3368499,2774320,3828533,3039284][e];t.cyl(0,i,0,n,s,o,{sides:8,rTop:.001,noCap:!0,ao:.62,jit:.07})}return t.build()}function Wy(){let r=new ai(21);r.limb(0,0,0,.1,3.4,0,.42,.26,7032629,{sides:7}),r.limb(.05,2.8,0,1.6,4.6,.4,.2,.1,7032629,{sides:5}),r.limb(.05,3,0,-1.4,4.7,-.5,.2,.1,7032629,{sides:5});let t=[5012016,5670202,4485164,6130748];return r.blob(.1,5.7,0,3,2.5,3,t[0],{seg:8,rings:5}),r.blob(1.9,5,.6,2.1,1.9,2.1,t[1],{seg:7,rings:4}),r.blob(-1.8,5.2,-.7,2.2,1.9,2.2,t[2],{seg:7,rings:4}),r.blob(.3,7.2,.2,1.9,1.6,1.9,t[3],{seg:7,rings:4}),r.build()}function Xy(){let r=new ai(31),t=[];for(let i=0;i<=6;i++){let n=i/6;t.push([Math.sin(n*1.3)*.9,n*7.2,n*n*.7])}for(let i=0;i<6;i++){let n=.3-i*.015,s=.3-(i+1)*.015;r.limb(...t[i],...t[i+1],n,s,i%2?10190168:9072203,{sides:6,jit:.04})}let e=t[6];for(let i=0;i<9;i++){let n=i/9*Math.PI*2+.3,s=Math.cos(n),o=Math.sin(n),a=[],l=[];for(let c=0;c<5;c++){let h=c/4;a.push([e[0]+s*h*3.6,e[1]+.5+Math.sin(h*2.1)*1-h*h*1.6,e[2]+o*h*3.6]),l.push(.1+Math.sin(h*Math.PI)*.75)}r.strip(a,l,3107626,5937722,{side:[-o,0,s],normal:[0,1,0]})}return r.blob(e[0],e[1]+.3,e[2],.35,.3,.35,7032618,{seg:5,rings:3}),r.build()}function rf(r=0){let t=new ai(41+r),e=5212741,i=4.2+r*1;t.cyl(0,0,0,.42,i,e,{sides:8,rTop:.36,ao:.7,uvScale:1}),t.blob(0,i,0,.36,.3,.36,e,{seg:6,rings:3,wobble:.02});let n=(s,o,a)=>{t.limb(0,o,0,s*1.1,o,0,.26,.26,e,{sides:7}),t.limb(s*1.1,o,0,s*1.1,o+a,0,.26,.24,e,{sides:7}),t.blob(s*1.1,o+a,0,.25,.25,.25,e,{seg:6,rings:3,wobble:.02})};return n(1,i*.45,1.5+r*.3),r>0&&n(-1,i*.62,1.2),t.build()}function qy(){let r=new ai(51),t=8022616;return r.limb(0,0,0,.2,3.2,0,.3,.16,t,{sides:6}),r.limb(.15,2.4,0,1.4,3.9,.3,.12,.05,t,{sides:5}),r.limb(.2,3,0,-1,4.3,-.3,.1,.04,t,{sides:5}),r.limb(.2,3.2,0,.3,4.6,.8,.08,.03,t,{sides:5}),r.build()}function Yy(){let r=new ai(61);r.limb(0,0,0,0,2.7,0,.27,.2,6112304,{sides:6}),r.limb(0,2.2,0,1.1,3.3,.4,.12,.07,6112304,{sides:5}),r.limb(0,2.3,0,-1,3.4,-.5,.12,.07,6112304,{sides:5}),r.blob(0,4.1,0,2.5,1.7,2.5,3107372,{seg:9,rings:5,wobble:.12}),r.blob(1.1,3.6,.9,1.5,1.1,1.5,3634735,{seg:7,rings:4}),r.blob(-1.2,3.7,-.8,1.5,1.1,1.5,2777640,{seg:7,rings:4});let t=jt(5);for(let e=0;e<16;e++){let i=t()*Math.PI*2,n=t()*.7-.45,s=2.35*Math.cos(n);r.blob(Math.cos(i)*s,4.1+Math.sin(n)*1.5,Math.sin(i)*s,.22,.22,.22,16747028,{seg:5,rings:3,wobble:.04,ao:.9,jit:.08})}return r.build()}function Oh(r){let t=new ai(70+r),e=[8091504,7105126,8748402];return r===0?t.blob(0,.55,0,1.2,.85,1,e[0],{seg:7,rings:4,wobble:.22,ao:.6}):r===1?(t.blob(0,.8,0,1.7,1.3,1.5,e[1],{seg:8,rings:5,wobble:.25,ao:.6}),t.blob(1.5,.4,.5,.9,.6,.8,e[0],{seg:6,rings:4,wobble:.2,ao:.6})):(t.blob(0,2.2,0,3.2,2.8,3,e[2],{seg:9,rings:6,wobble:.22,ao:.55}),t.blob(2.6,1,1,1.8,1.4,1.6,e[1],{seg:7,rings:4,wobble:.2,ao:.55}),t.blob(-2.2,1.2,-1.2,1.6,1.3,1.6,e[0],{seg:7,rings:4,wobble:.2,ao:.55})),t.build()}function of(r=!1){let t=new ai(90),e=r?[9077064,8221760]:[4091690,4881713,3629862];return t.blob(0,.55,0,1,.7,1,e[0],{seg:6,rings:4,wobble:.2}),t.blob(.7,.4,.3,.7,.5,.7,e[1],{seg:6,rings:3,wobble:.2}),t.build()}function $y(){let r=new ai(99),t=jt(3);for(let e=0;e<6;e++){let i=t()*Math.PI*2,n=(t()-.5)*.45,s=(t()-.5)*.45,o=.55+t()*.45,a=(t()-.3)*.35,l=Math.cos(i),c=Math.sin(i),h=[[n,0,s],[n+l*a*.4,o*.5,s+c*a*.4],[n+l*a,o,s+c*a]];r.strip(h,[.09,.07,0],2902551,11916138,{side:[-c,0,l],normal:[.2,1,.2]})}return r.build()}var Ol=class{constructor(t,e){this.world=t,this.terrain=t.terrain,this.col=t.collision,this.textures=e,this.group=new kt,this.group.name="props",this.chunks=[],this.propDistance=700,this.shadowDistance=140,this.grassRadius=0,this.grassDensity=0,this.time={value:0},this.treeMat=new re({vertexColors:!0,roughness:.9,metalness:0}),this.rockMat=new re({vertexColors:!0,roughness:.95,metalness:0,map:e.grain}),this.rockMat.flatShading=!1,this.grassMat=new re({vertexColors:!0,roughness:1,metalness:0,side:rn}),this.grassMat.onBeforeCompile=i=>{i.uniforms.uTime=this.time,i.vertexShader=`uniform float uTime;
`+i.vertexShader.replace("#include <begin_vertex>",`#include <begin_vertex>
         #ifdef USE_INSTANCING
           float ph = instanceMatrix[3].x * 0.31 + instanceMatrix[3].z * 0.23;
           float sw = (sin(uTime * 1.7 + ph) + 0.5 * sin(uTime * 3.1 + ph * 1.7)) * 0.09 * position.y * position.y;
           transformed.x += sw; transformed.z += sw * 0.6;
         #endif`)},this.types={pine:{geo:sf(!1),mat:this.treeMat,trunk:.38,h:14},pineSnow:{geo:sf(!0),mat:this.treeMat,trunk:.38,h:14},oak:{geo:Wy(),mat:this.treeMat,trunk:.5,h:9},palm:{geo:Xy(),mat:this.treeMat,trunk:.32,h:9},cactus:{geo:rf(0),mat:this.treeMat,trunk:.5,h:4},cactus2:{geo:rf(1),mat:this.treeMat,trunk:.5,h:5},dead:{geo:qy(),mat:this.treeMat,trunk:.3,h:4},orange:{geo:Yy(),mat:this.treeMat,trunk:.3,h:6},rockS:{geo:Oh(0),mat:this.rockMat,trunk:1,h:1.4,rock:!0},rockM:{geo:Oh(1),mat:this.rockMat,trunk:1.5,h:2.2,rock:!0},rockL:{geo:Oh(2),mat:this.rockMat,trunk:2.8,h:5,rock:!0},bush:{geo:of(!1),mat:this.treeMat,trunk:0,h:1,soft:!0},bushDry:{geo:of(!0),mat:this.treeMat,trunk:0,h:1,soft:!0}},this.grassGeo=$y(),this.grassTiles=new Map,this.grassQueue=[]}addInstance(t,e,i,n=1,s=0,o=null){(this._extra||(this._extra=[])).push({type:t,x:e,z:i,scale:n,yaw:s,y:o})}generate(t){var h;let e=Ot.size/fn,i=new Le,n={desert:0,snow:0,rock:0,forest:0,sand:0},s=6,o=fn/s,a=$e.find(u=>u.id==="pinewood_camp"),l=(u,d)=>jt(u*7919+d*104729+17),c=(u,d)=>{for(let f of $e)if(Math.hypot(u-f.x,d-f.z)<f.clearR)return f;return null};for(let u=0;u<e;u++){for(let d=0;d<e;d++){let f=-Ot.half+d*fn,g=-Ot.half+u*fn,x={},m=l(d,u);for(let M=0;M<o;M++)for(let _=0;_<o;_++){let v=f+(_+m())*s,S=g+(M+m())*s,T=m(),b=m(),A=m();if(Math.hypot(v,S)>Ot.limit||c(v,S))continue;let R=this.terrain.height(v,S);if(R<.5)continue;let I=this.terrain.slope(v,S);hr(v,S,R,I,n);let U=Math.hypot(v-a.x,S-a.z),N=Math.max(n.forest,(1-Ce(130,330,U))*(1-n.snow)),C=null,D=.8+b*.7;if(I>1)T<.12&&(C=A<.6?"rockM":"rockL",D=.8+b*.8);else if(n.snow>.45)T<.14&&I<.7?C="pineSnow":T<.2&&(C="rockS",D=.7+b);else if(n.desert>.35)T<.03?C=A<.5?"cactus":"cactus2":T<.045?C="dead":T<.075?(C=A<.7?"rockS":A<.93?"rockM":"rockL",D=.7+b*1.1):T<.1&&(C="bushDry");else if(R<3.8&&n.sand>.5)T<.07?(C="palm",D=.8+b*.5):T<.09&&(C="rockS");else if(N>.15){let k=.2+N*.7;T<k?C=A<.62?"pine":"oak":T<k+.12?C="bush":T<k+.16&&(C="rockS")}else T<.045?C="oak":T<.12?C="bush":T<.14?C=A<.7?"rockS":"rockM":T<.15&&A<.4&&(C="pine");C&&(x[C]||(x[C]=[])).push({x:v,z:S,y:R,scale:D,yaw:A*Math.PI*2})}let p=this._extra?.filter(M=>M.x>=f&&M.x<f+fn&&M.z>=g&&M.z<g+fn);for(let M of p||[])(x[h=M.type]||(x[h]=[])).push({x:M.x,z:M.z,y:M.y??this.terrain.height(M.x,M.z),scale:M.scale,yaw:M.yaw});let y={x:f+fn/2,z:g+fn/2,meshes:[],soft:[]};for(let[M,_]of Object.entries(x)){let v=this.types[M],S=new js(v.geo,v.mat,_.length);for(let T=0;T<_.length;T++){let b=_[T];i.position.set(b.x,b.y-(v.rock?.15*b.scale:.05),b.z),i.rotation.set(0,b.yaw,0);let A=v.rock?b.scale*(.8+.4*Yd(T,d*31+u)):b.scale;i.scale.set(b.scale,A,b.scale),i.updateMatrix(),S.setMatrixAt(T,i.matrix),v.trunk>0&&this.col.addCircle(b.x,b.z,v.trunk*b.scale,b.y-1,b.y+v.h*b.scale,0)}S.instanceMatrix.needsUpdate=!0,S.computeBoundingSphere(),S.matrixAutoUpdate=!1,S.castShadow=!0,S.receiveShadow=M.startsWith("rock")||M==="bush",v.soft&&(Zy(S,_.length),S.userData.total=_.length,y.soft.push(S)),this.group.add(S),y.meshes.push(S)}this.chunks.push(y)}t?.((u+1)/e)}}setQuality({propDistance:t,shadowDistance:e,grassRadius:i,grassDensity:n,bushDensity:s}){this.propDistance=t,this.shadowDistance=e,this.grassRadius=i,this.grassDensity=n;for(let o of this.chunks)for(let a of o.soft)a.count=Math.floor(a.userData.total*s);for(let o of this.grassTiles.values())o.mesh&&(this.group.remove(o.mesh),o.mesh.dispose());this.grassTiles.clear()}update(t,e,i){this.time.value=i;let n=this.propDistance+fn,s=this.shadowDistance+fn*.7;for(let o of this.chunks){let a=Math.hypot(o.x-t.x,o.z-t.z),l=a<n,c=a<s;for(let h of o.meshes)h.visible=l&&h.count!==0,h.castShadow=c}this.updateGrass(t)}updateGrass(t){let e=this.grassRadius;if(e<=0){for(let u of this.grassTiles.values())u.mesh&&(u.mesh.visible=!1);return}let i=32,n=Math.floor((t.x-e)/i),s=Math.floor((t.x+e)/i),o=Math.floor((t.z-e)/i),a=Math.floor((t.z+e)/i),l=[];for(let u=o;u<=a;u++)for(let d=n;d<=s;d++){let f=d+","+u,g=(d+.5)*i,x=(u+.5)*i,m=Math.hypot(g-t.x,x-t.z);m>e+i*.7||l.push([f,d,u,m])}let c=new Set(l.map(u=>u[0]));for(let[u,d]of this.grassTiles)c.has(u)?d.mesh&&(d.mesh.visible=!0):(d.mesh&&(this.group.remove(d.mesh),d.mesh.dispose()),this.grassTiles.delete(u));l.sort((u,d)=>u[3]-d[3]);let h=1;for(let[u,d,f]of l){if(this.grassTiles.has(u))continue;if(h--<=0)break;let g=this.buildGrassTile(d,f,i);this.grassTiles.set(u,{mesh:g}),g&&this.group.add(g)}}buildGrassTile(t,e,i){let n=t*i,s=e*i,o=Math.floor(i*i*this.grassDensity),a=[],l={desert:0,snow:0,rock:0,forest:0,sand:0},c=new It,h=[],u=jt(t*73856093^e*19349663);for(let x=0;x<o;x++){let m=n+u()*i,p=s+u()*i,y=.7+u()*.9,M=u()*6.283,_=this.terrain.height(m,p);if(_<.6)continue;let v=this.terrain.slope(m,p);if(v>.8)continue;hr(m,p,_,v,l);let S=1-Math.min(1,l.desert*1.3+l.snow*1.5+l.sand*1.2+l.rock);u()>S||this.world.nearPoiClear(m,p)||(Pl(m,p,_,v,c),c.multiplyScalar(1.5),a.push(m,_,p,y,M),h.push(c.r,c.g,c.b))}let d=a.length/5;if(!d)return null;let f=new js(this.grassGeo,this.grassMat,d),g=new Le;for(let x=0;x<d;x++)g.position.set(a[x*5],a[x*5+1]-.02,a[x*5+2]),g.rotation.set(0,a[x*5+4],0),g.scale.setScalar(a[x*5+3]),g.updateMatrix(),f.setMatrixAt(x,g.matrix),c.setRGB(h[x*3],h[x*3+1],h[x*3+2]),f.setColorAt(x,c);return f.instanceMatrix.needsUpdate=!0,f.instanceColor&&(f.instanceColor.needsUpdate=!0),f.computeBoundingSphere(),f.matrixAutoUpdate=!1,f.castShadow=!1,f.receiveShadow=!1,f}};function Zy(r,t){let e=r.instanceMatrix.array,i=Al([...Array(t).keys()],jt(t+1)),n=new Float32Array(e);for(let s=0;s<t;s++)for(let o=0;o<16;o++)e[s*16+o]=n[i[s]*16+o];r.instanceMatrix.needsUpdate=!0,r.computeBoundingSphere()}var ur=12830410,co=6120300,ho=16742959,uo=1553323,fo=13188049,po=15909424;var Rn=3533055,$n=16727536,Bl=10354490;function af(r){let t=Ge.parkour_plaza,e=new De(r,11);e.poiId=t.id;let i=t.x,n=t.z,s=t.y,o=[ho,uo,fo,po],a=(p,y,M,_,v,S,T=.12)=>{e.glow.box(p,v,y,M,v+.05,y+T,S,{jit:0,ao:1}),e.glow.box(p,v,_-T,M,v+.05,_,S,{jit:0,ao:1}),e.glow.box(p,v,y+T,p+T,v+.05,_-T,S,{jit:0,ao:1}),e.glow.box(M-T,v,y+T,M,v+.05,_-T,S,{jit:0,ao:1})},l=(p,y,M,_,v,S,T,b=s)=>{e.box(i+p,b,n+y,M,v-b,_,S,{jit:.04,uvScale:3}),T!==null&&a(i+p-M/2,n+y-_/2,i+p+M/2,n+y+_/2,v,T??Rn)};e.slab(i-82,s-1.6,n-82,i+82,s+.12,n+82,ur,{colBottom:s-1.6,jit:.02,uvScale:6});for(let p=0;p<4;p++){let y=70-p*16,M=p%2?15330802:10133930;e.solid.box(i-y,s+.12,n-y,i+y,s+.145,n+y,M,{jit:0,ao:1,noBottom:!0}),e.solid.box(i-y+1.2,s+.145,n-y+1.2,i+y-1.2,s+.16,n+y-1.2,12830410,{jit:0,ao:1,noBottom:!0})}for(let[p,y]of[[1,0],[-1,0],[0,1],[0,-1]])e.glow.box(i+(p?12*p:-.4),s+.165,n+(y?12*y:-.4),i+(p?72*p:.4),s+.185,n+(y?72*y:.4),Rn,{jit:0,ao:1});let c=22,h=6.8,u=1.3;e.box(i,s,n,6,u*c+.5,6,co,{uvScale:3});for(let p=0;p<c;p++){let y=p*.72,M=Math.cos(y)*h,_=Math.sin(y)*h,v=s+u*(p+1),S=o[p%4];e.box(i+M,v-.5,n+_,3.2,.5,3.2,S,{jit:.03}),a(i+M-1.6,n+_-1.6,i+M+1.6,n+_+1.6,v,p%2?Rn:$n),p<5&&e.floorLoot(i+M,v,n+_,!0,"parkour")}let d=s+u*c+.5;e.box(i,d-.5,n,11,.5,11,ur,{jit:.03}),a(i-5.5,n-5.5,i+5.5,n+5.5,d,Bl),e.chest(i-2,d,n+1.5,.6),e.chest(i+2,d,n-1.5,3.9),e.floorLoot(i+3,d,n+3,!0,"parkour"),e.floorLoot(i-3,d,n-3,!0,"parkour"),e.cylinder(i+4.8,d,n+4.8,.08,6,15658734,{sides:5,solid:!1}),e.glow.box(i+4.8,d+4.6,n+4.8,i+6.6,d+5.8,n+4.9,$n,{jit:0,ao:1}),[1.6,3,4.4,2.8,4.2,5.6,4,5.4].forEach((p,y)=>{let M=24+y*9;l(M,-32,5,5,s+p,y%2?uo:ho,y%2?$n:Rn),y%3===1&&e.floorLoot(i+M,s+p,n-32,!0,"parkour")}),l(96,-32,6,6,s+6.6,fo,Bl),e.chest(i+96,s+6.6,n-32,1.57),e.ramp(i-62,n-46,i-54,n-30,s+.12,s+5,"z",!1,s-.2,ho),l(-58,-50,8,8,s+5,ho,Rn),e.chest(i-58,s+5,n-50,0),e.ramp(i-50,n-34,i-44,n-28,s+.12,s+6,"z",!1,s-.2,uo),l(-47,-37.5,6,7,s+6,uo,$n),e.floorLoot(i-47,s+6,n-37.5,!0,"parkour"),e.ramp(i-40,n+6,i-28,n+10,s+.12,s+4,"x",!0,s-.2,fo),e.ramp(i-22,n+6,i-10,n+10,s+.12,s+4,"x",!1,s-.2,fo),e.floorLoot(i-25,s,n+8,!1,"parkour"),l(-25,-62,6,6,s+6,co,Rn),l(-25,-92,6,6,s+6,co,$n),e.slab(i-25.4,s+5.6,n-89,i-24.6,s+6,n-65,po,{jit:.02}),e.slab(i-22.6,s+5.6,n-89,i-22,s+6,n-65,po,{jit:.02}),e.chest(i-25,s+6,n-92,3.14),e.floorLoot(i-25,s+6,n-62,!0,"parkour"),e.ramp(i-35,n-62,i-28,n-40,s+.12,s+2.2,"z",!1,s-.2,ur),[26,20,14,8].forEach((p,y)=>{l(12,56,p,p,s+1.3*(y+1),y%2?ur:11186360,y===3?Bl:null)}),e.chest(i+12,s+5.2,n+56,0),e.floorLoot(i+8,s+5.2,n+56,!0,"parkour"),e.floorLoot(i+4,s+3.9,n+56,!0,"parkour"),e.floorLoot(i+20,s+2.6,n+56,!0,"parkour");for(let p=0;p<3;p++)l(-48+p*2.2,44,2.2,2.2,s+1*(p+1),12028490,null);l(-39,44,6,6,s+3,12028490,po),e.chest(i-39,s+3,n+44,1.57);for(let[p,y]of[[-30,56],[-26,58],[-34,30],[30,20],[50,40],[44,70]])e.crate(i+p,n+y,1.4,12028490,s+.12);l(50,10,4,4,s+2.4,ho,Rn),l(58,17,4,4,s+3.8,uo,$n),l(66,24,4,4,s+5.2,fo,Rn),l(74,31,4,4,s+3.6,po,$n),l(82,38,6,6,s+5,co,Bl),e.chest(i+82,s+5,n+38,2.4),e.floorLoot(i+66,s+5.2,n+24,!0,"parkour");for(let p=0;p<5;p++)l(-70+p*3.2,70,.8,8,s+2+p%2*1+p*.3,ur,null);for(let p=0;p<22;p++){let y=p/22*Math.PI*2+.3,M=18+p%5*11;e.floorLoot(i+Math.cos(y)*M,s+.12,n+Math.sin(y)*M,!1,"parkour")}for(let[p,y]of[[-15,-15],[20,15],[-8,35],[35,-8]])e.chest(i+p,s+.12,n+y,Math.random()*6.28);let x=[[12,-12,21],[-12,12,21],[58,-26,20],[-46,-20,19],[-4,78,20],[40,10,18],[-70,40,20],[96,-50,18]];for(let[p,y,M]of x){let _=i+p,v=n+y;e.cylinder(_,s+.12,v,1.6,.2,2435635,{sides:14,solid:!1}),e.glow.cyl(_,s+.32,v,1.3,.05,Rn,{sides:14}),e.glow.cyl(_,s+.37,v,.7,.04,16777215,{sides:10}),e.jumpPads.push({x:_,y:s+.12,z:v,r:1.5,vy:M,vx:0,vz:0})}let m=(p,y,M)=>{let _=M?0:1,v=M?1:0;for(let A of[-1,1])e.box(i+p+_*0+(M?A*7:0),s,n+y+(M?0:A*7),1.4,11,1.4,co,{uvScale:3});let S=M?15.4:1.6,T=M?1.6:15.4;e.box(i+p,s+10,n+y,S,1.4,T,ur),e.glow.box(i+p-(M?7.4:-.1),s+11.4,n+y-(M?-.1:7.4),i+p+(M?7.4:.1),s+11.5,n+y+(M?.1:7.4),$n,{jit:0,ao:1});let b=Fl("PARKOUR PLAZA",12,3,{bg:"#101a2e",fg:"#35e8ff",border:"#ff3df0",font:"bold 80px Arial Black, Arial, sans-serif",glow:!0});b.position.set(i+p+(M?0:.9),s+8.2,n+y+(M?.9:0)),b.rotation.y=M?0:Math.PI/2,e.meshes.push(b)};m(-84,0,!1),m(84,0,!1),m(0,-84,!0),m(0,84,!0);for(let[p,y]of[[-76,-76],[76,-76],[-76,76],[76,76],[-40,-76],[40,76],[76,20],[-76,20]])e.box(i+p,s+.12,n+y,5,.6,5,7031339,{jit:.03}),r.props.addInstance("oak",i+p,n+y,.9,0,s+.7);return r.addBuilder(e,t.id),e}function Je(r,t,e,i,{w:n=null,h:s=1.1,y:o=null,style:a={}}={}){let l=e==="N"||e==="S"?t.maxX-t.minX:t.maxZ-t.minZ,c=n??Math.min(l-.6,Math.max(3,i.length*.7)),h=Fl(i,c,s,a),u=o??t.y0+t.floorH*t.floors+.9,d=.42;return e==="S"?h.position.set(t.x,u,t.maxZ+d):e==="N"?(h.position.set(t.x,u,t.minZ-d),h.rotation.y=Math.PI):e==="E"?(h.position.set(t.maxX+d,u,t.z),h.rotation.y=Math.PI/2):(h.position.set(t.minX-d,u,t.z),h.rotation.y=-Math.PI/2),r.meshes.push(h),h}function Bh(r,t,e,i=3,n=8018746,s=5914662){let o=e==="N"||e==="S",a=e==="S"||e==="E"?1:-1,l=t.y0,c=o?t.minX:a>0?t.maxX:t.minX-i,h=o?t.maxX:a>0?t.maxX+i:t.minX,u=o?a>0?t.maxZ:t.minZ-i:t.minZ,d=o?a>0?t.maxZ+i:t.minZ:t.maxZ;r.slab(c,l-.8,u,h,l+.1,d,n,{colBottom:l-.8,jit:.04});let f=l+3.3;r.slab(c-.1,f,u-.1,h+.1,f+.2,d+.1,n,{colBottom:f,jit:.04});let g=Math.max(2,Math.round((o?h-c:d-u)/3.2)+1);for(let x=0;x<g;x++){let m=x/(g-1),p=o?c+.25+m*(h-c-.5):a>0?h-.2:c+.2,y=o?a>0?d-.2:u+.2:u+.25+m*(d-u-.5);r.cylinder(p,l+.1,y,.13,3.2,s,{sides:6})}return{x0:c,x1:h,z0:u,z1:d,roofY:f}}function kl(r,{count:t,accept:e,minSep:i=60,radius:n=900,seed:s=1,avoidPois:o=!0,tries:a=4e3,flatness:l=1.2,footprint:c=6}){let h=jt(s),u=[],d=r.terrain;for(let f=0;f<a&&u.length<t;f++){let g=h()*Math.PI*2,x=Math.sqrt(h())*n,m=Math.cos(g)*x,p=Math.sin(g)*x;if(Math.hypot(m,p)>Ot.limit-80)continue;let y=d.height(m,p);if(y<2.5||o&&$e.some(v=>Math.hypot(m-v.x,p-v.z)<v.clearR+40)||u.some(v=>Math.hypot(m-v.x,p-v.z)<i))continue;let M=y,_=y;for(let[v,S]of[[c,0],[-c,0],[0,c],[0,-c]]){let T=d.height(m+v,p+S);M=Math.min(M,T),_=Math.max(_,T)}_-M>l||e&&!e(m,p,y)||u.push({x:m,z:p,h:y,rng:jt(s*1e3+u.length)})}return u}function mo(r,t,e,i,{height:n=11,color:s=9411235,y:o=null}={}){let a=o??r.h(e,i)-.1,l=3,c=n/l;for(let y=0;y<l;y++){let M=3-y*.65;r.box(e,a+y*c,i,M,c,M,8085317,{jit:.05,uvScale:2})}let h=a+n;r.box(e,h,i,2,.5,2,4864813);let u=new kt;u.position.set(e+1.15,h+1.6,i);let d=new kt,f=new re({color:s,roughness:.6,metalness:.2});for(let y=0;y<8;y++){let M=new kt;M.rotation.z=y/8*Math.PI*2;let _=new Et(new ri(.7,3.4,.06),f);_.position.set(0,2.2,0),_.castShadow=!0,M.add(_),d.add(M)}let g=new Et(new ve(.28,.28,.5,8).rotateZ(Math.PI/2),new re({color:3355443}));d.add(g),u.add(d);let x=new Et(new ri(2.6,.06,.8),f);x.position.set(-3.6,.2,0),u.add(x),d.rotation.y=Math.PI/2,u.rotation.y=0,r.meshes.push(u);let m=new kt;u.remove(d),m.add(d),d.rotation.set(0,Math.PI/2,0),u.add(m);let p=.8+Math.random()*.6;t.animated.push({update:y=>{m.rotation.x+=y*p}}),r.floorLoot(e+2.2,a,i+1.5,!1)}function kh(r,t,e,{y:i=null,height:n=8}={}){let s=i??r.h(t,e)-.1;for(let[o,a]of[[-1.6,-1.6],[1.6,-1.6],[-1.6,1.6],[1.6,1.6]])r.box(t+o,s,e+a,.4,n,.4,5914662,{jit:.05});r.box(t,s+n*.45,e,3.8,.2,.2,5914662,{solid:!1}),r.cylinder(t,s+n,e,2.2,3,9132602,{sides:12,uvScale:2}),r.solid.cyl(t,s+n+3,e,2.3,1.1,4863268,{sides:12,rTop:.01,noCap:!0}),r.solid.cyl(t,s+n+.9,e,2.25,.12,2829099,{sides:12,noCap:!0,ao:1}),r.solid.cyl(t,s+n+2,e,2.25,.12,2829099,{sides:12,noCap:!0,ao:1})}function Ke(r,t){let e=r.building({id:t.id||"cabin",x:t.x,z:t.z,w:t.w??8,d:t.d??7,floors:t.floors??1,floorH:3.1,color:t.color??8017462,trim:t.trim??3811094,floorColor:6965806,baseColor:7827562,roofColor:t.roofColor??5192236,roof:"gable",rise:t.rise??2.2,chimney:t.chimney!==!1,doors:[{side:t.side??"S",off:t.doorOff??0}],windowSpacing:3.2,ridge:t.ridge,y:t.y,uvScale:1.8,stairColor:6965806,slabColor:8018490});if(t.logs!==!1){let i=Math.floor(5.454545454545454);for(let n=1;n<i;n++){let s=e.y0+.12+n*.55;r.solid.box(e.minX-.03,s,e.minZ-.03,e.maxX+.03,s+.07,e.minZ+.02,4074008,{ao:1,jit:.1,noBottom:!0}),r.solid.box(e.minX-.03,s,e.maxZ-.02,e.maxX+.03,s+.07,e.maxZ+.03,4074008,{ao:1,jit:.1,noBottom:!0})}}return t.stock!==!1&&r.stockBuilding(e,{chests:t.chests??1,floorSpots:t.spots??2}),e}function Cn(r,t,e,i=13197355,n=3.2,s=null){let o=s??r.h(t,e);r.solid.cone(t,o,e,n,n*.8,i,4,{ao:.75}),r.col.addCircle(t,e,n*.55,o-.3,o+n*.5)}function xs(r,t,e,i=null){let n=i??r.h(t,e);for(let s=0;s<6;s++){let o=s/6*Math.PI*2;r.solid.limb(t+Math.cos(o)*.7,n+.1,e+Math.sin(o)*.7,t+Math.cos(o)*.1,n+.45,e+Math.sin(o)*.1,.12,.1,4862752,{sides:5})}r.glow.blob(t,n+.5,e,.45,.55,.45,16751146,{seg:6,rings:3,wobble:.15,ao:1}),r.glow.blob(t,n+.75,e,.25,.4,.25,16769130,{seg:5,rings:3,wobble:.1,ao:1});for(let s=0;s<4;s++){let o=s/4*Math.PI*2+.4;r.box(t+Math.cos(o)*2.3,n,e+Math.sin(o)*2.3,1.2,.45,.45,6965806,{jit:.1})}}function zl(r,t,e,{height:i=8,y:n=null,color:s=6965806}={}){let o=n??r.h(t,e)-.1;for(let[l,c]of[[-1.6,-1.6],[1.6,-1.6],[-1.6,1.6],[1.6,1.6]])r.box(t+l,o,e+c,.45,i,.45,s,{jit:.06});r.solid.box(t-1.6,o+i*.45,e-1.65,t+1.6,o+i*.45+.2,e-1.55,s,{ao:1}),r.solid.box(t-1.6,o+i*.45,e+1.55,t+1.6,o+i*.45+.2,e+1.65,s,{ao:1}),r.slab(t-2.3,o+i,e-2.3,t+2.3,o+i+.3,e+2.3,s,{colBottom:o+i-.1,jit:.04});for(let[l,c,h,u]of[[-2.3,-2.3,2.3,-2.1],[-2.3,2.1,2.3,2.3],[-2.3,-2.1,-2.1,2.1],[2.1,-2.1,2.3,2.1]])r.slab(t+l,o+i+.3,e+c,t+h,o+i+1.2,e+u,s,{jit:.04});let a=(i+.3)/.55;return r.stairs(t+2.5,e-2.2,t+4.1,e-2.2+a,o+.05,o+i+.3,"z",!1,o-.3,8018490),r.chest(t,o+i+.3,e,0),r.floorLoot(t+1.2,o+i+.3,e+1.2,!0),{x:t,z:e,topY:o+i+.3,stairX:t+3.3,stairZ:e-2.2+a}}var jy=[10517071,9202245,11569754,9726792,10125150],Hl=4008989;function zh(r,t){let e=t.side,i=t.color??$d(jy),n=r.building({id:t.id,x:t.x,z:t.z,w:t.w,d:t.d,floors:t.floors??1,floorH:3.4,color:i,trim:Hl,floorColor:8018746,baseColor:7234130,slabColor:8414538,roofColor:5982778,stairColor:7294771,doors:[{side:e,off:t.doorOff??0},...t.backDoor?[{side:{N:"S",S:"N",E:"W",W:"E"}[e],off:0}]:[]],roof:"flat",parapet:.55,band:(t.floors??1)>1,doorW:t.doorW??1.9,windowSpacing:3.4,y:t.y}),s=e==="N"||e==="S",o=2,a=n.topY;if(s){let c=e==="S"?n.maxZ-.15:n.minZ+.15;r.box(n.x,a,c,t.w+.2,o,.35,i,{jit:.02}),r.box(n.x,a+o,c,t.w+.5,.18,.5,Hl,{jit:0})}else{let c=e==="E"?n.maxX-.15:n.minX+.15;r.box(c,a,n.z,.35,o,t.d+.2,i,{jit:.02}),r.box(c,a+o,n.z,.5,.18,t.d+.5,Hl,{jit:0})}if(t.sign&&Je(r,n,e,t.sign,{y:a+o*.5+.1,h:1.3,w:Math.min(t.w-1,Math.max(4,t.sign.length*.75)),style:t.signStyle}),t.porch!==!1){let c=Bh(r,n,e,3.2);if((t.floors??1)>1){let h=s?c.x1-2.4:c.x0,d=n.floorH/.55;if(r.slab(c.x0-.1,n.y0+n.floorH-.2,c.z0-.1,c.x1+.1,n.y0+n.floorH+.05,c.z1+.1,8018746,{colBottom:n.y0+n.floorH-.2}),s){let f=e==="S"?c.z1:c.z0-d;r.stairs(n.maxX,f-0,n.maxX+1.6,f+d,n.y0+.1,n.y0+n.floorH+.05,"z",e==="N",n.y0-.2,7294771)}if(s){let f=e==="S"?c.z1-.1:c.z0+.1;r.slab(c.x0,n.y0+n.floorH+.05,f-.05,c.x1,n.y0+n.floorH+1.15,f+.05,5914662,{jit:.03})}r.floorLoot((c.x0+c.x1)/2,n.y0+n.floorH+.05,(c.z0+c.z1)/2,!0,"west")}}r.stockBuilding(n,{chests:t.chests??1,floorSpots:t.spots??2});let l=t.rng??r.rng;for(let c=0;c<(t.props??2);c++){let h=n.minX+1+l()*(n.maxX-n.minX-2),u=n.minZ+1+l()*(n.maxZ-n.minZ-2);n.floors>1&&h<n.minX+3||(l()<.5?r.crate(h,u,.9,10188613,n.y0):r.barrel(h,u,8014634,n.y0))}return n}function lf(r,t,e,i=!0){let n=r.h(t,e);r.box(t,n,e,i?3:.8,.7,i?.8:3,7031339,{jit:.04}),r.glow.box(t-(i?1.3:.3),n+.55,e-(i?.3:1.3),t+(i?1.3:.3),n+.62,e+(i?.3:1.3),3108762,{jit:0,ao:1})}function cf(r,t,e){let i=r.h(t,e);r.box(t-.8,i,e,.15,1.3,.15,4863268,{solid:!1}),r.box(t+.8,i,e,.15,1.3,.15,4863268,{solid:!1}),r.box(t,i+1,e,1.8,.12,.12,4863268,{solid:!1})}function hf(r,t,e,i=!0){let n=r.h(t,e),s=i?3.6:1.8,o=i?1.8:3.6;r.box(t,n+.5,e,s,.9,o,9069368,{jit:.05});for(let a of[-1,1])for(let l of[-1,1]){let c=i?t+l*1.1:t+a*1,h=i?e+a*1:e+l*1.1;r.solid.cyl(c,n,h,.5,.12,3877402,{sides:8,uvScale:1})}r.box(t,n+1.4,e,s-.4,.8,o-.4,14273450,{solid:!1,jit:.04})}function Jy(r,t,e,i){let n=a=>r.h(t,a),s=Math.round((i-e)/1.3);for(let a=0;a<s;a++){let l=e+a*1.3,c=n(l);r.solid.box(t-1.3,c-.02,l-.15,t+1.3,c+.12,l+.15,4930090,{jit:.08,ao:1})}let o=8;for(let a=e;a<i;a+=o){let l=a,c=Math.min(i,a+o),h=n(l),u=n(c);for(let d of[-.72,.72])r.solid.box(t+d-.07,Math.min(h,u)+.1,l,t+d+.07,Math.max(h,u)+.2,c,7171440,{jit:.03,ao:1})}}function Ky(r,t,e){let i=r.h(t,e),n=e;r.box(t,i+.9,n,3,2.2,8,2369067,{jit:.02}),r.box(t,i+3.1,n+2.4,3,2.6,3.2,3093048,{jit:.02}),r.box(t,i+5.7,n+2.4,3.4,.3,3.6,1842464,{jit:0}),r.cylinder(t,i+3.1,n-2.4,.55,2.2,1842464,{sides:8}),r.solid.cyl(t,i+5.3,n-2.4,.8,.4,1842464,{sides:8,rTop:.5,noCap:!0}),r.solid.cyl(t,i+1.2,n-3.9,1,.8,6954783,{sides:10,noCap:!0});for(let o of[-1.45,1.45])for(let a=0;a<4;a++)r.solid.cyl(t+o,i+.5,n-2.5+a*2,.55,.15,1118481,{sides:8,ao:1});r.solid.box(t-1.6,i+0,n-4,t+1.6,i+.5,n+4,3815994,{ao:1});let s=[9121578,8018474,4020846];for(let o=0;o<3;o++){let a=n+9.5+o*10.5;r.box(t,i+.7,a,3,3.1,9.6,s[o],{jit:.03,uvScale:2}),r.box(t,i+3.8,a,3.2,.2,9.8,2829099,{jit:0});for(let l of[-1.45,1.45])for(let c=0;c<2;c++)r.solid.cyl(t+l,i+.45,a-3+c*6,.45,.14,1118481,{sides:8,ao:1});r.glow.box(t+1.52,i+1,a-1,t+1.55,i+3,a+1,2431506,{jit:0,ao:1}),r.floorLoot(t,i+3.8,a,!0,"west")}r.chest(t,i+3.8,n+9.5+21,0)}function uf(r){let t=Ge.distant_desert,e=new De(r,23);e.poiId=t.id;let i=t.x,n=t.z,s=jt(2323),o=t.y;e.mapRect(i-62,n-6,i+56,n+6,"#b08d5c"),e.solid.box(i-62,o-.02,n-6,i+56,o+.05,n+6,11570524,{jit:.03,ao:1,uvScale:5}),e.solid.box(i-62,o-.02,n-.3,i+56,o+.06,n+.3,10123853,{jit:.05,ao:1});let a=(g,x,m,p,y={})=>zh(e,{id:g,x:i+x,z:n-7.5-p/2,w:m,d:p,side:"S",rng:s,...y}),l=(g,x,m,p,y={})=>zh(e,{id:g,x:i+x,z:n+7.5+p/2,w:m,d:p,side:"N",rng:s,...y});a("saloon",-32,17,12,{floors:2,color:9654330,sign:"SALOON",chests:2,spots:3,props:4,backDoor:!0}),a("bank",-9,11,10,{color:13219992,sign:"BANK",chests:2,spots:2,signStyle:{bg:"#2d3a2a",fg:"#e9d78a"}}),a("sheriff",7,10,9,{color:10122312,sign:"SHERIFF",chests:1,spots:2,signStyle:{bg:"#4a3a1a",fg:"#ffd84a"}}),a("store",23,12,9,{color:7309964,sign:"GENERAL STORE",chests:1,spots:3,props:5}),l("hotel",-28,17,11,{floors:2,color:11831904,sign:"HOTEL",chests:2,spots:3,backDoor:!0}),l("stable",-6,14,10,{color:9202245,sign:"STABLES",chests:1,spots:2,doorW:3.2,props:5,porch:!1}),l("doc",10,9,8,{color:11056800,sign:"DOC",chests:1,spots:2}),l("house",24,10,9,{color:10843725,chests:1,spots:2,sign:"HOME"});for(let g of[-38,-20,-2,14,30])cf(e,i+g,n-4.6);for(let g of[-16,18])cf(e,i+g,n+4.6);lf(e,i-2,n-5.4),lf(e,i+30,n+5.4),hf(e,i-12,n+2,!0),hf(e,i+40,n-1,!0);for(let[g,x]of[[-45,-12],[-46,16],[48,-14],[50,12]])e.crate(i+g,n+x,1.2,10188613);for(let[g,x]of[[-44,8],[-43,9.2],[47,-9],[46,-10.3]])e.barrel(i+g,n+x);e.hay(i-36,n+24),e.hay(i-34.2,n+24.4),kh(e,i+46,n-24),e.chest(i+46,e.h(i+46,n-24),n-22.2,0),mo(e,r,i-52,n+26);let c=i+100;Jy(e,c,n-170,n+170);let h=e.building({id:"station",x:c-12,z:n-6,w:7,d:16,floors:1,color:9071178,trim:Hl,floorColor:8018746,baseColor:7234130,roofColor:5982778,doors:[{side:"E",off:0},{side:"W",off:0}],roof:"flat",parapet:.5});Je(e,h,"E","DISTANT DESERT",{y:h.topY-.5,h:1.1,w:6}),Bh(e,h,"E",3),e.stockBuilding(h,{chests:2,floorSpots:3}),Ky(e,c,n+14);let u=(g,x,m,p,y=.8,M=1.3)=>{for(let _=0;_<g;_++){let v=s()*Math.PI*2,S=x+s()*(m-x),T=i+Math.cos(v)*S,b=n+Math.sin(v)*S;Math.abs(b-n)<14&&T>i-70&&T<i+120||Math.abs(T-c)<8||r.props.addInstance(p,T,b,y+s()*(M-y),s()*6.28)}};u(26,60,148,"cactus"),u(18,60,148,"cactus2"),u(10,55,148,"dead"),u(26,50,148,"rockS",.7,1.5),u(8,80,148,"rockM",.8,1.4),u(12,55,148,"bushDry");for(let g=0;g<16;g++){let x=s()*Math.PI*2,m=6+s()*60,p=i+Math.cos(x)*m,y=n+Math.sin(x)*m;y<n-7&&y>n-7-12&&Math.abs(p-i)<40||e.floorLoot(p,e.h(p,y),y,!1,"west")}r.addBuilder(e,t.id);let d=kl(r,{count:9,seed:77,radius:1e3,minSep:85,flatness:1.3,footprint:7,accept:(g,x,m)=>Math.hypot(g-Ii.x,x-Ii.z)<300&&Math.hypot(g-Ii.x,x-Ii.z)>190&&m<14}),f=new De(r,91);f.poiId=t.id;for(let g of d){let x=g.rng,m=8+Math.floor(x()*4),p=7+Math.floor(x()*3),y=["N","S","E","W"][Math.floor(x()*4)];zh(f,{id:"homestead",x:g.x,z:g.z,w:m,d:p,side:y,floors:1,rng:x,chests:1,spots:2,props:2,sign:x()<.5?"RANCH":null,porch:x()<.7}),x()<.6?mo(f,r,g.x+13,g.z-6):kh(f,g.x-12,g.z-8,{height:6}),f.fence(g.x-8,g.z+14,g.x+8,g.z+14),f.fence(g.x-8,g.z+14,g.x-8,g.z+24),f.fence(g.x+8,g.z+14,g.x+8,g.z+24),f.fence(g.x-8,g.z+24,g.x+8,g.z+24),f.hay(g.x+3,g.z+18),f.crate(g.x-3,g.z+19,1.1,10188613),f.floorLoot(g.x,f.h(g.x,g.z+18),g.z+18,!1,"west");for(let M=0;M<3;M++)r.props.addInstance(x()<.5?"cactus":"rockS",g.x+(x()-.5)*50,g.z+(x()-.5)*50,.8+x()*.6,x()*6.28);r.homesteads=r.homesteads||[],r.homesteads.push({x:g.x,z:g.z})}r.addBuilder(f,"desert_homesteads")}function df(r){let t=Ge.floorange_grove,e=new De(r,31);e.poiId=t.id;let i=t.x,n=t.z,s=t.y,o=jt(3131),a=e.building({id:"factory",x:i-20,z:n-6,w:17,d:12,floors:2,floorH:3.5,color:16052194,trim:15238175,floorColor:13616816,baseColor:9077882,slabColor:14143680,roofColor:9077882,stairColor:12102026,doors:[{side:"S",off:-3},{side:"E",off:0}],roof:"flat",parapet:1,band:!0,windowSpacing:3.2,y:s});Je(e,a,"S","FLOORANGE JUICE CO.",{y:a.y0+2.95,h:1,w:9,style:{bg:"#e8841f",fg:"#ffffff",border:"#7a3a00",font:"bold 70px Arial Black, Arial"}}),e.stockBuilding(a,{chests:2,floorSpots:3}),e.solid.blob(i-20,a.topY+3.2,n-6,3.4,3.2,3.4,16747034,{seg:12,rings:8,wobble:.02,ao:.85}),e.solid.cyl(i-20,a.topY+6.2,n-6,.35,.7,3050286,{sides:6,noCap:!1});for(let d=0;d<7;d++)e.crate(i-28+d*1.35,n+1.5+d%2*.4,1.1,15238175,null);let l=e.building({id:"barn",x:i+20,z:n-14,w:20,d:15,floors:2,floorH:3.6,color:10893866,trim:15986662,floorColor:8018746,baseColor:8156782,roofColor:5917253,slabColor:8742986,stairColor:7690042,roof:"gable",rise:3.8,ridge:"x",doors:[{side:"S",off:0},{side:"N",off:0}],doorW:4.4,doorH:3.2,windowSpacing:4.5,y:s});e.stockBuilding(l,{chests:2,floorSpots:4}),e.hay(i+14,n-10,s+.12),e.hay(i+15.8,n-10,s+.12),e.hay(i+14.9,n-10,s+1.12);let c=e.building({id:"farmhouse",x:i+4,z:n+20,w:12,d:9,floors:1,floorH:3.2,color:15787984,trim:9058858,floorColor:9071178,baseColor:9077626,roofColor:9058858,roof:"gable",rise:2.8,chimney:!0,doors:[{side:"N",off:0}],windowSpacing:3.2,y:s});e.stockBuilding(c,{chests:1,floorSpots:3}),e.cylinder(i+38,s,n+4,3.6,15,13222580,{sides:14,uvScale:3}),e.solid.cyl(i+38,s+15,n+4,3.8,3.2,9080724,{sides:14,rTop:.01,noCap:!0}),e.chest(i+38,s,n+8.4,0),mo(e,r,i-40,n+14,{y:s,height:12});for(let d=0;d<6;d++)e.hay(i+30+d%3*2,n-28+Math.floor(d/3)*1.6,s);e.fence(i+6,n+34,i+36,n+34),e.fence(i+6,n+34,i+6,n+48),e.fence(i+36,n+34,i+36,n+48),e.fence(i+6,n+48,i+36,n+48),e.box(i-8,s,n+30,5,.9,1.6,10188613,{jit:.05}),e.solid.box(i-10.8,s+2.2,n+28.6,i-5.2,s+2.4,n+31.4,15238175,{ao:1}),e.cylinder(i-10.6,s,n+28.8,.1,2.3,6965806,{sides:5,solid:!1}),e.cylinder(i-5.4,s,n+28.8,.1,2.3,6965806,{sides:5,solid:!1}),e.chest(i-8,s+.9,n+30,0),e.solid.box(i-40,s+0,n+3,i+40,s+.05,n+9,10717280,{jit:.03,ao:1,uvScale:5}),e.solid.box(i-1,s+0,n-30,i+5,s+.05,n+40,10717280,{jit:.03,ao:1,uvScale:5});let h=(d,f)=>{let g=d-i,x=f-n;return Math.abs(g)<48&&x>-34&&x<54||Math.abs(g+8)<3.5&&x>0?!1:Math.hypot(g,x)<112},u=0;for(let d=-110;d<=110;d+=9)for(let f=-112;f<=112;f+=8){let g=i+f+(o()-.5)*1.2,x=n+d+(o()-.5)*1.2;h(g,x)&&(r.props.addInstance("orange",g,x,.85+o()*.3,o()*6.28),u++,o()<.16&&e.floorLoot(g+(o()-.5)*3,e.h(g,x),x+(o()-.5)*3,!1,"floorange"))}e.chest(i-60,e.h(i-60,n-60),n-60,.3),e.chest(i+70,e.h(i+70,n+50),n+50,2.1),e.chest(i+40,e.h(i+40,n-70),n-70,4.1),e.chest(i-70,e.h(i-70,n+40),n+40,1.1),r.addBuilder(e,t.id)}function ff(r){let t=Ge.pinewood_camp,e=new De(r,41);e.poiId=t.id;let i=t.x,n=t.z,s=t.y,o=jt(4141),a=Ke(e,{id:"ranger",x:i-4,z:n-16,w:14,d:10,floors:2,side:"S",color:7031342,roofColor:4151866,y:s,chests:2,spots:3,rise:2.6});Je(e,a,"S","RANGER STATION",{y:a.y0+2.8,h:.9,w:7,style:{bg:"#2f4a2f",fg:"#f2e8c8",border:"#14200f",font:"bold 60px Georgia, serif"}}),Ke(e,{x:i+20,z:n-10,w:8,d:7,side:"W",y:s}),Ke(e,{x:i+22,z:n+8,w:8,d:7,side:"W",y:s,color:8413244}),Ke(e,{x:i-24,z:n+10,w:8,d:7,side:"E",y:s,color:6965802}),Ke(e,{x:i-2,z:n+24,w:9,d:7,side:"N",y:s,color:7558191});let l=i+40,c=n+22;for(let[h,u]of[[-5,-4],[5,-4],[-5,4],[5,4]])e.box(l+h,s,c+u,.5,4,.5,6965806,{jit:.05});e.slab(l-6.5,s+4,c-5.5,l+6.5,s+4.3,c+5.5,5914675,{colBottom:s+3.9}),e.box(l,s,c,4,.9,1.2,8018490),e.chest(l+3,s,c-3,0);for(let h=0;h<4;h++)for(let u=0;u<3-h%2;u++){let d=l-10+u*.95+h%2*.5,f=s+h*.85;e.solid.limb(d,f+.45,c+9-3,d,f+.45,c+9+3,.45,.45,8018487,{sides:7})}e.col.addBox(l-10.6,s-.5,c+5.8,l-7.6,s+3,c+12.2),xs(e,i+2,n+2),Cn(e,i-12,n-4,13197355),Cn(e,i+10,n+14,3111578),Cn(e,i-12,n+20,8034863),Cn(e,i+12,n-22,13183818),e.chest(i-12,s,n-8,0),e.chest(i+10,s,n+17,0),zl(e,i+52,n-22,{height:11});for(let[h,u]of[[-9,6],[14,-2],[4,-8]])e.box(i+h,s,n+u,2.2,.8,.9,8018490,{jit:.05}),e.box(i+h,s,n+u-1.1,2.2,.4,.4,6965802,{solid:!1}),e.box(i+h,s,n+u+1.1,2.2,.4,.4,6965802,{solid:!1});for(let h=0;h<14;h++){let u=o()*Math.PI*2,d=12+o()*48,f=i+Math.cos(u)*d,g=n+Math.sin(u)*d;e.floorLoot(f,e.h(f,g),g,!1)}for(let h=0;h<6;h++){let u=o()*Math.PI*2,d=55+o()*25;r.props.addInstance(o()<.5?"rockM":"rockS",i+Math.cos(u)*d,n+Math.sin(u)*d,.9+o()*.6,o()*6.28)}r.addBuilder(e,t.id)}var go=15660023;function pf(r){let t=Ge.frostpeak_lodge,e=new De(r,51);e.poiId=t.id;let i=t.x,n=t.z,s=t.y,o=jt(5151),a=Ke(e,{id:"lodge",x:i,z:n-8,w:24,d:13,floors:2,side:"S",color:8082741,roofColor:go,y:s,chests:3,spots:4,rise:4.2,ridge:"x"});Je(e,a,"S","FROSTPEAK LODGE",{y:a.y0+3,h:1,w:9,style:{bg:"#2a3a52",fg:"#e9f6ff",border:"#0d1626",font:"bold 64px Georgia, serif"}}),e.slab(i-12,s-.6,n-1.5,i+12,s+.12,n+3.5,6965806,{colBottom:s-.6});for(let d of[-10,-5,5,10])e.cylinder(i+d,s+.12,n+3.2,.2,3,4862752,{sides:6});Ke(e,{x:i-26,z:n+6,w:9,d:7,side:"E",y:s,roofColor:go,color:8806458}),Ke(e,{x:i+27,z:n+8,w:9,d:7,side:"W",y:s,roofColor:go,color:7228464}),Ke(e,{x:i+4,z:n+30,w:8,d:7,side:"N",y:s,roofColor:go,color:8017978});let l=e.building({id:"gondola",x:i-38,z:n-22,w:12,d:9,floors:1,color:4874104,trim:2042424,floorColor:9080726,baseColor:7041400,roofColor:14674158,doors:[{side:"E",off:0}],roof:"flat",parapet:.5,y:s});Je(e,l,"E","SUMMIT LIFT",{y:l.topY-.7,h:.9,w:5}),e.stockBuilding(l,{chests:1,floorSpots:2});for(let d=0;d<4;d++){let f=i-38-d*18,g=n-22-d*22,x=e.h(f,g);e.box(f,x-.5,g,.9,11,.9,5595248,{jit:.03}),e.box(f,x+10,g,4.5,.4,.5,5595248,{solid:!1})}let c=i+38,h=n-28;e.solid.box(c-12,s+.02,h-8,c+12,s+.09,h+8,10933996,{jit:.02,ao:1,noBottom:!0}),e.floorLoot(c,s+.1,h,!1);for(let[d,f]of[[-12,14],[14,18],[-3,20],[30,-6],[-30,-8],[8,-34]]){let g=i+d,x=n+f,m=e.h(g,x);e.solid.blob(g,m+.6,x,.75,.65,.75,16317439,{seg:8,rings:5,wobble:.02,ao:.9}),e.solid.blob(g,m+1.45,x,.55,.5,.55,16317439,{seg:8,rings:5,wobble:.02,ao:.9}),e.solid.blob(g,m+2.1,x,.38,.36,.38,16317439,{seg:8,rings:5,wobble:.02,ao:.9}),e.solid.cone(g+.1,m+2.05,x+.35,.07,.4,16742938,5,{noCap:!0}),e.col.addCircle(g,x,.7,m-.2,m+2.5)}xs(e,i-8,n+18);for(let d=0;d<5;d++)e.box(i+16+d*.7,s,n+14,.12,1.8,.5,2779818,{jit:.1,solid:!1});e.chest(i-8,s,n+21,0),e.chest(i+18,s,n+14,0);for(let d=0;d<14;d++){let f=o()*Math.PI*2,g=10+o()*55,x=i+Math.cos(f)*g,m=n+Math.sin(f)*g;e.floorLoot(x,e.h(x,m),m,!1,"heavy")}let u=null;for(let d=0;d<6.28;d+=.2)for(let f=0;f<110;f+=10){let g=An.x+Math.cos(d)*f,x=An.z+Math.sin(d)*f,m=e.h(g,x);Math.max(Math.abs(e.h(g+5,x)-m),Math.abs(e.h(g,x+5)-m))/5<.3&&(!u||m>u.h)&&(u={x:g,z:x,h:m})}if(u){e.slab(u.x-7,u.h-3,u.z-6,u.x+7,u.h+.12,u.z+6,9080725,{colBottom:u.h-3});let d=Ke(e,{id:"summit",x:u.x,z:u.z,w:6,d:5,side:"S",y:u.h,roofColor:go,color:6965806,chests:2,spots:2});r.summit={x:u.x,z:u.z,y:u.h}}r.addBuilder(e,t.id)}function mf(r){let t=Ge.bluewater_lake,e=new De(r,61);e.poiId=t.id;let i=Xi.x,n=Xi.z,s=jt(6161),o=1.2,a=i,l=n+6,c=e.h(a,l);[15921906,12597547,15921906,12597547,15921906].forEach((y,M)=>{let _=3.3-M*.2,v=3.3-(M+1)*.2;e.solid.cyl(a,c+M*4.4,l,_,4.4,y,{sides:14,rTop:v,noCap:!0,uvScale:3})}),e.col.addCircle(a,l,3.2,c-1,c+22),e.slab(a-4.2,c+22,l-4.2,a+4.2,c+22.4,l+4.2,2829099,{colBottom:c+21.8}),e.glow.cyl(a,c+22.4,l,1.6,2.4,16773800,{sides:10,rTop:1.4}),e.solid.cone(a,c+24.8,l,2.4,1.8,12597547,10);let u=Ke(e,{id:"keeper",x:a+12,z:l+2,w:7,d:6,side:"W",y:c,roofColor:11815482,color:15788248,chests:2,spots:2});e.chest(a-7,c,l+2,.5);let d=n+170;for(let y=n+175;y>l;y-=2)if(e.h(i,y)<o-.4){d=y+8;break}let f=l+6;e.mapRect(i-1.5,f,i+1.5,d,"#8a6a45"),e.slab(i-1.3,o-.35,f,i+1.3,o,d,9071173,{colBottom:o-.35,jit:.05,uvScale:2});for(let y=f;y<d;y+=6)e.cylinder(i-1.1,-6,y,.18,o+.4+6,4862752,{sides:5,solid:!1}),e.cylinder(i+1.1,-6,y,.18,o+.4+6,4862752,{sides:5,solid:!1}),e.solid.box(i-1.3,o+0,y,i+1.3,o+.08,y+.12,5914662,{ao:1,noBottom:!0});for(let y=f+6;y<d;y+=18)e.cylinder(i-1.2,o,y,.08,2.2,2829099,{sides:5,solid:!1}),e.glow.blob(i-1.2,o+2.3,y,.2,.2,.2,16773296,{seg:5,rings:3,wobble:0,ao:1});let g=i+3.8,x=(f+d)/2;e.slab(i+1.3,o-.35,x-1.2,i+18,o,x+1.2,9071173,{colBottom:o-.35,jit:.05});for(let y=0;y<2;y++){let M=i+7+y*7,_=x+3.6;e.solid.box(M-2.2,0,_-.9,M+2.2,.75,_+.9,y?2779818:11815482,{jit:.04}),e.solid.box(M-1.9,.7,_-.7,M+1.9,.78,_+.7,9071173,{ao:1,noBottom:!0}),e.col.addBox(M-2.2,-.4,_-.9,M+2.2,.75,_+.9),e.floorLoot(M,.8,_,!1)}e.chest(i+16,o,x,1.57);let m=183,p=["BOAT RENTAL","BAIT & TACKLE",null,null,"FISHING LODGE",null,null,"LAKE CAFE"];for(let y=0;y<8;y++){let M=y/8*Math.PI*2+.35;if(Math.abs(Math.cos(M))<.2&&Math.sin(M)>.8)continue;let _=i+Math.cos(M)*m,v=n+Math.sin(M)*m,S=Math.abs(Math.cos(M))>Math.abs(Math.sin(M))?Math.cos(M)>0?"W":"E":Math.sin(M)>0?"N":"S",T=p[y]==="FISHING LODGE",b=Ke(e,{id:"lakecabin",x:_,z:v,w:T?13:8.5,d:T?9:7,floors:T?2:1,side:S,y:t.y,color:[13214826,10204103,14272672,9087119][y%4],roofColor:[4876938,9058874,4155978][y%3],chests:T?2:1,spots:2});p[y]&&Je(e,b,S,p[y],{y:b.y0+2.4,h:.8,w:4.5,style:{bg:"#1f4a6a",fg:"#ffffff",border:"#0b1e2e",font:"bold 56px Arial"}})}for(let y=0;y<18;y++){let M=s()*Math.PI*2,_=150+s()*60,v=i+Math.cos(M)*_,S=n+Math.sin(M)*_,T=e.h(v,S);T>1.8&&e.floorLoot(v,T,S,!1)}for(let y of[.9,2.2,3.6,5.3]){let M=i+Math.cos(y)*158,_=n+Math.sin(y)*158,v=e.h(M,_);v>1.4&&(e.box(M,v,_,4.2,.8,1.7,11815482,{jit:.05}),e.chest(M+3.5,v,_+2,y))}r.addBuilder(e,t.id)}var gf=[10107690,3104650,4029002,13206058,9080724,14210248,6958906,3829624];function xf(r){let t=Ge.rusty_yard,e=new De(r,71);e.poiId=t.id;let i=t.x,n=t.z,s=t.y,o=jt(7171);e.mapRect(i-110,n-100,i+110,n+100,"#8f8b82"),e.slab(i-110,s-1.2,n-100,i+110,s+.08,n+100,9078398,{colBottom:s-1.2,jit:.02,uvScale:6});for(let m=-90;m<=90;m+=30)e.solid.box(i-108,s+.085,n+m-.2,i+108,s+.1,n+m+.2,15258186,{jit:0,ao:1,noBottom:!0});let a=(m,p,y,M,_)=>{let v=M?6.1:2.45,S=M?2.45:6.1;e.box(m,p,y,v,2.6,S,_,{jit:.05,uvScale:1.5});for(let T=-2;T<=2;T++)M?e.solid.box(m+T*1.1-.05,p+.1,y-S/2-.03,m+T*1.1+.05,p+2.5,y+S/2+.03,_,{jit:.1,ao:1,noBottom:!0}):e.solid.box(m-v/2-.03,p+.1,y+T*1.1-.05,m+v/2+.03,p+2.5,y+T*1.1+.05,_,{jit:.1,ao:1,noBottom:!0});M?e.solid.box(m+v/2,p+.2,y-1,m+v/2+.04,p+2.4,y+1,2763306,{ao:1,jit:0}):e.solid.box(m-1,p+.2,y+S/2,m+1,p+2.4,y+S/2+.04,2763306,{ao:1,jit:0})},l=[],c=[-82,-26,30,58],h=[-70,-38,8,44];for(let m=0;m<c.length;m++)for(let p=0;p<h.length;p++){if(m===3&&p===0)continue;let y=i+c[m],M=n+h[p],_=(m+p)%2===0,v=_?4:2,S=_?2:4;for(let A=0;A<v;A++)for(let R=0;R<S;R++){let I=_?6.2:2.5,U=_?2.5:6.2,N=y+A*(I+.05),C=M+R*(U+.05),D=o()<.18?0:o()<.55?1:2;for(let k=0;k<D;k++)a(N,s+.08+k*2.6,C,_,gf[Math.floor(o()*gf.length)]);D>=1&&o()<.12&&e.floorLoot(N,s+.08+D*2.6,C,!0)}let T=_?y-3.1-1.7:y-1.25-1.7,b=_?M-1.25:M-3.1;e.stairs(T,M-1.2,T+1.7,M-1.2+4.8,s+.08,s+.08+2.6,"z",!1,s-.2,6975349),o()<.5&&e.chest(y+1,s+.08+2.6,M,0),o()<.5&&e.floorLoot(y+6,s+.08,M-4,!1)}let u=(m,p,y,M)=>{let _=e.building({id:M,x:i+m,z:n+p,w:30,d:17,floors:1,floorH:6,color:8030100,trim:2896184,floorColor:6974056,baseColor:7039851,roofColor:599e4,doors:[{side:y,off:-6},{side:y,off:7}],doorW:4.2,doorH:4.2,roof:"flat",parapet:.6,windowSpacing:5,windowH:1,windowW:2,y:s,uvScale:2});e.stockBuilding(_,{chests:3,floorSpots:5});for(let S=0;S<6;S++)e.crate(_.minX+3+o()*(_.maxX-_.minX-6),_.minZ+2+o()*(_.maxZ-_.minZ-4),1.2+o(),10188613,_.y0);let v=6.2/.55;return e.stairs(_.maxX-3.5,_.maxZ+.1,_.maxX-1.9,_.maxZ+.1+v,_.y0,_.y0+6,"z",!1,s-.3,6975349),e.floorLoot(_.x,_.topY,_.z,!0),_},d=u(-6,-84,"S","wh1");Je(e,d,"S","RUSTY YARD",{y:5.2+s,h:1.4,w:9,style:{bg:"#7a2f1a",fg:"#ffe6a8",border:"#2b1209",font:"bold 80px Arial Black, Arial"}}),u(-6,84,"N","wh2");let f=e.building({id:"yardoffice",x:i+97,z:n-28,w:14,d:9,floors:2,floorH:3.2,color:14207392,trim:4866096,floorColor:8022613,baseColor:7827562,roofColor:5984584,doors:[{side:"W",off:0}],roof:"flat",parapet:.8,band:!0,y:s});Je(e,f,"W","OFFICE",{y:s+2.8,h:.8,w:3.5}),e.stockBuilding(f,{chests:2,floorSpots:3});let g=i+82,x=n-82;for(let[m,p]of[[-8,-3],[8,-3],[-8,3],[8,3]])e.box(g+m,s,x+p,1.1,24,1.1,14723114,{jit:.04});e.slab(g-9,s+24,x-3.8,g+9,s+25.2,x+3.8,13210400,{colBottom:s+23.8,jit:.03}),e.box(g+3,s+22.2,x,2.5,1.8,2.2,3356736,{solid:!1}),e.chest(g,s+25.2,x,0),e.floorLoot(g+5,s+25.2,x,!0);for(let m=0;m<3;m++){let p=i-100+m*0,y=n-40+m*12;e.cylinder(i+96,s,n+30+m*11,4.2,7,[12107202,11553338,12107202][m],{sides:14,uvScale:3}),e.solid.cyl(i+96,s+7,n+30+m*11,4.2,.8,7830658,{sides:14,rTop:3,noCap:!1}),e.floorLoot(i+91,s,n+30+m*11,!1)}for(let[m,p]of[[-40,-2],[-38.8,-3.1],[20,-60],[22,-61],[-60,12]])e.barrel(i+m,n+p,11553338,s+.08);for(let m=0;m<10;m++){let p=i-100+o()*200,y=n-95+o()*190;e.floorLoot(p,s+.08,y,!1)}for(let[m,p]of[[-104,0],[104,0]])e.chest(i+m,s+.08,n+p,0);r.addBuilder(e,t.id)}var Qy=3816770,t_=11448757,e_=[3533055,16727536,16765503,10354490],Zn=(r,t,e)=>({bg:r,fg:t,border:e,font:"bold 72px Arial Black, Arial",glow:!0});function yf(r){let t=Ge.neon_heights,e=new De(r,81);e.poiId=t.id;let i=t.x,n=t.z,s=t.y,o=jt(8181),a=64,l=50;e.mapRect(i-112,n-112,i+112,n+112,"#4a4e55");for(let f of[-1,0,1])for(let g of[-1,0,1])e.mapRect(i+f*a-l/2,n+g*a-l/2,i+f*a+l/2,n+g*a+l/2,"#9aa0a8");e.slab(i-112,s-1.5,n-112,i+112,s+.05,n+112,Qy,{colBottom:s-1.5,jit:.01,uvScale:5});for(let f of[-1,0,1])for(let g of[-1,0,1])e.slab(i+f*a-l/2,s,n+g*a-l/2,i+f*a+l/2,s+.18,n+g*a+l/2,t_,{jit:.02,uvScale:4});for(let f of[-96,-32,32,96])for(let g=-108;g<108;g+=8)e.solid.box(i+g,s+.05,n+f-.15,i+g+4,s+.075,n+f+.15,15323722,{jit:0,ao:1,noBottom:!0}),e.solid.box(i+f-.15,s+.05,n+g,i+f+.15,s+.075,n+g+4,15323722,{jit:0,ao:1,noBottom:!0});let c=(f,g,x,m,p,y=10134704,M=e_[Math.floor(o()*4)])=>{e.box(i+f,s+.18,n+g,x,p,m,y,{batch:e.tower,uvX:12,uvY:27,jit:.04,ao:.9}),e.box(i+f,s+.18+p,n+g,x+.6,.8,m+.6,3817544,{jit:.02}),e.box(i+f+x*.2,s+.18+p+.8,n+g-m*.2,3,2,3,7041657,{jit:.05}),e.cylinder(i+f-x*.25,s+.18+p+.8,n+g+m*.2,.15,8,11580858,{sides:5,solid:!1}),e.glow.blob(i+f-x*.25,s+.18+p+9,n+g+m*.2,.5,.5,.5,M,{seg:6,rings:3,wobble:0,ao:1}),e.glow.box(i+f-x/2-.05,s+.18+p-1.2,n+g-m/2-.05,i+f+x/2+.05,s+.18+p-.9,n+g+m/2+.05,M,{jit:0,ao:1}),e.chest(i+f+x/2+2,s+.18,n+g,0),e.floorLoot(i+f-x/2-2,s+.18,n+g,!1)},h=(f,g,x,m,p,y,M,_,v,S,T={})=>{let b=e.building({id:f,x:i+g,z:n+x,w:m,d:p,floors:y,floorH:T.floorH??3.4,color:_,trim:2962496,floorColor:9080726,baseColor:7041400,slabColor:11186358,roofColor:4936025,stairColor:10133670,doors:T.doors??[{side:M,off:0}],roof:"flat",parapet:.9,band:y>1,windowW:1.9,windowH:1.6,windowSpacing:3.6,doorW:T.doorW??2.2,y:s+.18});return v&&Je(e,b,M,v,{y:b.y0+3,h:1.1,w:Math.min(m-1,Math.max(4,v.length*.8)),style:S}),e.stockBuilding(b,{chests:T.chests??2,floorSpots:T.spots??3}),e.box(i+g+m*.25,b.topY,n+x,2.4,1.2,2.4,7831174,{jit:.05}),b},u=(f,g,x,m)=>{let p=s+.05,y=x?4.3:1.9,M=x?1.9:4.3;e.box(i+f,p+.25,n+g,y,.75,M,m,{jit:.03,uvScale:4}),e.box(i+f,p+1,n+g,x?2.3:1.7,.6,x?1.7:2.3,1911352,{jit:.02,ao:1});for(let _ of[-1,1])for(let v of[-1,1])e.solid.box(i+f+_*(x?1.4:.85)-.3,p,n+g+v*(x?.85:1.4)-.3,i+f+_*(x?1.4:.85)+.3,p+.55,n+g+v*(x?.85:1.4)+.3,1118481,{ao:1})},d=[12597547,2719929,15844367,2600544,15528177,9323693,3426654,15105570];for(let f=0;f<26;f++){let g=[-96,-32,32,96][Math.floor(o()*4)],x=-100+o()*200;if(Math.abs(x)<8)continue;let m=o()<.5,p=(o()<.5?-1:1)*4,y=m?x:g+p,M=m?g+p:x;u(y,M,m,d[Math.floor(o()*d.length)]),o()<.3&&e.floorLoot(i+y,s+2,n+M,!1)}for(let f of[-96,-32,32,96])for(let g=-100;g<=100;g+=25)for(let[x,m]of[[g,f-7.5],[f-7.5,g]])e.solid.cyl(i+x,s+.05,n+m,.12,6,3882821,{sides:5}),e.glow.blob(i+x,s+6.1,n+m,.4,.2,.4,16773824,{seg:5,rings:3,wobble:0,ao:1});c(0,0,22,22,78,8359846,16727536);for(let[f,g]of[[-14,-14],[14,14],[-14,14],[14,-14]])e.cylinder(i+f,s+.18,n+g,1.6,.5,5595243,{sides:8}),r.props.addInstance("oak",i+f,n+g,.55,0,s+.7);h("office_a",-56,-74,22,18,3,"S",14276303,"NEON OFFICES",Zn("#101a2e","#35e8ff","#35e8ff")),h("cafe",-76,-48,14,9,1,"S",15773840,"CAFE",Zn("#2a1020","#ff9ad8","#ff3df0"),{chests:1}),h("mall",0,-64,38,24,2,"S",15131354,"NEON MALL",Zn("#1a1030","#ff3df0","#35e8ff"),{doors:[{side:"S",off:-8},{side:"S",off:8},{side:"N",off:0}],chests:4,spots:6,doorW:3}),c(58,-72,20,20,54,9083048,16765503),h("hotel_shop",70,-46,16,9,1,"S",12175320,"MINI MART",Zn("#102a20","#9dff3a","#9dff3a"),{chests:1}),h("bank",-64,0,24,20,3,"E",13617334,"FIRST NEON BANK",Zn("#1a2a1a","#ffe28a","#ffe28a"),{chests:3}),c(64,0,22,22,44,10260367,3533055),h("warehouse",-64,64,32,20,1,"N",9080726,"LOADING DOCK",Zn("#2a2a10","#ffd23f","#ffd23f"),{floorH:5,doors:[{side:"N",off:-6},{side:"N",off:8}],doorW:3.6,chests:3,spots:5}),h("office_b",0,68,24,18,3,"N",13226972,"SKYVIEW",Zn("#101a2e","#9dff3a","#9dff3a")),c(70,72,20,20,62,8229798,16727536),h("diner",56,50,14,9,1,"N",15229530,"DINER",Zn("#2a1010","#ff6a5a","#ff3df0"),{chests:1});for(let f of[-1,1])e.box(i+f*9,s+.05,n-106,1.6,12,1.6,3817544,{});e.box(i,s+11,n-106,20,1.6,1.6,3817544,{}),e.glow.box(i-9.6,s+11.5,n-106.1,i+9.6,s+11.7,n-105.9,16727536,{jit:0,ao:1});for(let f=0;f<20;f++){let g=[-96,-32,32,96][Math.floor(o()*4)],x=-100+o()*200,m=o()<.5;e.floorLoot(i+(m?x:g+2),s+.06,n+(m?g+2:x),!1)}r.addBuilder(e,t.id)}function _f(r){let t=kl(r,{count:Zd,seed:505,radius:860,minSep:150,flatness:1,footprint:8,tries:12e3,accept:(i,n,s)=>s<45&&Math.hypot(i,n)<Ot.islandR-60&&!(r.homesteads||[]).some(o=>Math.hypot(i-o.x,n-o.z)<120)}),e=new De(r,99);e.poiId="outpost",r.outposts=[];for(let i of t){let n=i.rng,s=Math.floor(n()*5),o=i.h;if(s===0)Ke(e,{x:i.x,z:i.z,w:7.5,d:6.5,side:["N","S","E","W"][Math.floor(n()*4)],y:o,chests:1,spots:2}),xs(e,i.x+9,i.z+4);else if(s===1)Cn(e,i.x-3,i.z,13197355),Cn(e,i.x+3,i.z+1,3111578),Cn(e,i.x,i.z-4,8034863),xs(e,i.x,i.z+4.5),e.chest(i.x+6,e.h(i.x+6,i.z),i.z,0),e.crate(i.x-6,i.z+3,1.2),e.floorLoot(i.x+2,e.h(i.x+2,i.z+8),i.z+8,!1),e.floorLoot(i.x-5,e.h(i.x-5,i.z-3),i.z-3,!1);else if(s===2)zl(e,i.x,i.z,{height:9+Math.floor(n()*4)}),e.crate(i.x-5,i.z+4,1.1),e.floorLoot(i.x+5,e.h(i.x+5,i.z+5),i.z+5,!1);else if(s===3){for(let a=0;a<6;a++){let l=a/6*Math.PI*2+n(),c=i.x+Math.cos(l)*5,h=i.z+Math.sin(l)*5,u=2+n()*3,d=1.2+n()*2.5;e.box(c,e.h(c,h)-.3,h,a%2?u:.8,d,a%2?.8:u,9078398,{jit:.1})}e.chest(i.x,e.h(i.x,i.z),i.z,0),e.floorLoot(i.x+3,e.h(i.x+3,i.z+3),i.z+3,!1),e.floorLoot(i.x-3,e.h(i.x-3,i.z-2),i.z-2,!1)}else{let a=e.building({id:"shed",x:i.x,z:i.z,w:9,d:7,floors:1,color:9198138,trim:3811094,floorColor:6965806,baseColor:7827562,roofColor:6968645,doors:[{side:"S",off:0}],roof:"flat",parapet:.4,y:o});e.stockBuilding(a,{chests:1,floorSpots:2}),e.hay(i.x+7,i.z+2,o),e.hay(i.x+8.8,i.z+2,o),e.fence(i.x-6,i.z+9,i.x+6,i.z+9)}r.outposts.push({x:i.x,z:i.z})}r.addBuilder(e,"outposts")}function vf(r,t){let e=[["Parkour Plaza",af],["Distant Desert",uf],["Floorange Grove",df],["Pinewood Camp",ff],["Frostpeak Lodge",pf],["Bluewater Lake",mf],["Rusty Yard",xf],["Neon Heights",yf],["Outposts",_f]];e.forEach(([i,n],s)=>{t(i,s/e.length),n(r)}),t("done",1)}var Vl=new Tn(2024);function i_(r,t,e,i,n,s){let o=0,a=1,l=0,c=n;for(let h=0;h<s;h++){let u=r/e,d=t/i,f=u*c,g=d*c,x=Vl.noise(f,g),m=Vl.noise(f-c,g),p=Vl.noise(f,g-c),y=Vl.noise(f-c,g-c),M=(x*(1-u)+m*u)*(1-d)+(p*(1-u)+y*u)*d;o+=M*a,l+=a,a*=.5,c*=2}return o/l}function dr(r,t=!0){let e=new wn(r);return e.colorSpace=t?Ie:Wi,e.wrapS=e.wrapT=Mn,e.anisotropy=4,e}function Hh(r,t,e,i=0){let n=new Float32Array(r*r);for(let s=0;s<r;s++)for(let o=0;o<r;o++)n[s*r+o]=i_(o+i,s+i*.7,r,r,t,e);return n}function Mf(r,t,e){let i=new Uint8Array(t*t*4);for(let s=0;s<t;s++)for(let o=0;o<t;o++){let a=r[s*t+(o-1+t)%t],l=r[s*t+(o+1)%t],c=r[(s-1+t)%t*t+o],h=r[(s+1)%t*t+o],u=(a-l)*e,d=(c-h)*e,f=1,g=Math.hypot(u,d,f);u/=g,d/=g,f/=g;let x=(s*t+o)*4;i[x]=(u*.5+.5)*255,i[x+1]=(d*.5+.5)*255,i[x+2]=(f*.5+.5)*255,i[x+3]=255}let n=new cs(i,t,t,xi);return n.wrapS=n.wrapT=Mn,n.magFilter=ke,n.minFilter=ln,n.generateMipmaps=!0,n.anisotropy=4,n.needsUpdate=!0,n}function bf(){let t=Hh(256,3,4),e=document.createElement("canvas");e.width=e.height=256;let i=e.getContext("2d"),n=i.createImageData(256,256),s=jt(5);for(let C=0;C<256*256;C++){let D=Re(.9+t[C]*.3+(s()-.5)*.06,0,1);n.data[C*4]=n.data[C*4+1]=n.data[C*4+2]=D*255,n.data[C*4+3]=255}i.putImageData(n,0,0);let o=dr(e),a=Mf(t,256,5),l=Hh(256,10,3,17),c=document.createElement("canvas");c.width=c.height=256;let h=c.getContext("2d"),u=h.createImageData(256,256);for(let C=0;C<256*256;C++){let D=Re(.93+l[C]*.12+(s()-.5)*.06,0,1);u.data[C*4]=u.data[C*4+1]=u.data[C*4+2]=D*255,u.data[C*4+3]=255}h.putImageData(u,0,0);let d=dr(c),f=Hh(256,2,5,40),g=Mf(f,256,7);g.repeat.set(220,220);let x=document.createElement("canvas");x.width=x.height=64;let m=x.getContext("2d"),p=m.createRadialGradient(32,32,0,32,32,32);p.addColorStop(0,"rgba(255,255,255,1)"),p.addColorStop(.35,"rgba(255,255,255,0.65)"),p.addColorStop(1,"rgba(255,255,255,0)"),m.fillStyle=p,m.fillRect(0,0,64,64);let y=dr(x);y.wrapS=y.wrapT=Mi;let M=document.createElement("canvas");M.width=256,M.height=128;let _=M.getContext("2d"),v=jt(77);for(let C=0;C<26;C++){let D=50+v()*156,k=40+v()*50,z=22+v()*34,et=_.createRadialGradient(D,k,0,D,k,z),$=255-(k>70?18:0);et.addColorStop(0,`rgba(${$},${$},${$},0.55)`),et.addColorStop(.6,`rgba(${$-8},${$-4},${$},0.22)`),et.addColorStop(1,"rgba(255,255,255,0)"),_.fillStyle=et,_.fillRect(D-z,k-z,z*2,z*2)}let S=dr(M);S.wrapS=S.wrapT=Mi;let T=document.createElement("canvas");T.width=128,T.height=256;let b=T.getContext("2d"),A=document.createElement("canvas");A.width=128,A.height=256;let R=A.getContext("2d");b.fillStyle="#4b5662",b.fillRect(0,0,128,256),R.fillStyle="#000",R.fillRect(0,0,128,256);let I=jt(9);for(let C=0;C<8;C++)for(let D=0;D<4;D++){let k=D*32+4,z=C*32+5,et=I()<.4;if(b.fillStyle=et?"#cfe8ff":"#1d2a3a",b.fillRect(k,z,24,22),et){let $=I()<.5;R.fillStyle=$?"#ffd9a0":"#a0d8ff",R.fillRect(k,z,24,22)}}let U=dr(T),N=dr(A);return{detail:o,grain:d,detailNormal:a,waterNormal:g,particle:y,cloud:S,windows:U,windowsEmissive:N}}var n_=()=>new Promise(r=>setTimeout(r,0)),Gl=class{constructor(t,e){this.renderer=t,this.scene=e,this.terrain=new Il,this.collision=new Dl(this.terrain),this.chestSpots=[],this.lootSpots=[],this.buildings=[],this.jumpPads=[],this.animated=[],this.poiGroups=[],this.pois=$e,this.extraLabels=[],this.windFlags=[],this.nearbyChecks=null}async build(t=()=>{}){let e=async(i,n)=>{t(i,n),await n_()};await e("Generating textures",.01),this.textures=bf(),this.mats={solid:new re({vertexColors:!0,map:this.textures.grain,roughness:.86,metalness:.04}),glow:new se({vertexColors:!0}),glass:new re({vertexColors:!0,transparent:!0,opacity:.55,roughness:.05,metalness:.5,depthWrite:!1}),tower:new re({vertexColors:!0,map:this.textures.windows,emissiveMap:this.textures.windowsEmissive,emissive:16777215,emissiveIntensity:.8,roughness:.4,metalness:.15})},await e("Shaping the island",.03),await this.terrain.bake(i=>t("Shaping the island",.03+i*.3)),this.terrain.createMeshes(this.scene,this.textures),this.sky=tf(this.scene,this.renderer,this.textures),this.water=Kd(this.textures),this.scene.add(this.water),await e("Raising towns & landmarks",.35),this.props=new Ol(this,this.textures),vf(this,(i,n)=>t(i,.35+n*.25)),await e("Planting forests",.62),this.props.generate(i=>t("Planting forests",.62+i*.3)),this.scene.add(this.props.group),await e("Finishing touches",.95),this.indexBuildings(),this.mapRects=this.mapRects||[],t("Ready",1)}async paintMap(){this.minimapCanvas=await this.terrain.makeMapCanvas(1024,(t,e,i)=>{for(let n of this.mapRects)t.fillStyle=n.color,t.fillRect(e(n.x0),e(n.z0),Math.max(1,(n.x1-n.x0)*i),Math.max(1,(n.z1-n.z0)*i));for(let n of this.buildings)t.fillStyle="#c9c4ba",t.fillRect(e(n.minX),e(n.minZ),Math.max(2,(n.maxX-n.minX)*i),Math.max(2,(n.maxZ-n.minZ)*i)),t.strokeStyle="rgba(30,25,20,0.9)",t.lineWidth=1,t.strokeRect(e(n.minX),e(n.minZ),Math.max(2,(n.maxX-n.minX)*i),Math.max(2,(n.maxZ-n.minZ)*i))})}addBuilder(t,e="poi"){let i=new kt;i.name=e;let n=(s,o,a,l=0)=>{let c=s.build();if(!c)return;let h=new Et(c,o);h.castShadow=a,h.receiveShadow=!0,h.renderOrder=l,h.matrixAutoUpdate=!1,i.add(h)};n(t.solid,this.mats.solid,!0),n(t.tower,this.mats.tower,!0),n(t.glow,this.mats.glow,!1),n(t.glass,this.mats.glass,!1,3);for(let s of t.meshes)i.add(s);return this.scene.add(i),this.poiGroups.push(i),this.jumpPads.push(...t.jumpPads),i}indexBuildings(){this.bGrid=new Map;for(let t of this.buildings)for(let e=Math.floor(t.minX/32);e<=Math.floor(t.maxX/32);e++)for(let i=Math.floor(t.minZ/32);i<=Math.floor(t.maxZ/32);i++){let n=e*8192+i;(this.bGrid.get(n)||this.bGrid.set(n,[]).get(n)).push(t)}}buildingAt(t,e){let i=this.bGrid?.get(Math.floor(t/32)*8192+Math.floor(e/32));if(!i)return null;for(let n of i)if(t>n.minX-.3&&t<n.maxX+.3&&e>n.minZ-.3&&e<n.maxZ+.3)return n;return null}planRoute(t,e,i,n){let s=this.buildingAt(t.x,t.z),o=this.buildingAt(e,i),a=[],l=(u,d)=>Math.max(0,Math.min(u.floors,Math.round((d-u.y0)/u.floorH))),c=(u,d,f)=>{let g=null,x=1e9;for(let m of u.doors){let p=Math.hypot(m.outX-d,m.outZ-f);p<x&&(x=p,g=m)}return g},h=s?l(s,t.y):0;if(s&&s!==o){for(let d=h-1;d>=0;d--){let f=s.stairs[d];f&&(a.push({x:f.highX,z:f.highZ}),a.push({x:f.lowX,z:f.lowZ}))}let u=c(s,e,i);u&&(a.push({x:u.inX,z:u.inZ}),a.push({x:u.outX,z:u.outZ}))}if(o){let u=0;if(s!==o){let f=c(o,t.x,t.z);f&&(a.push({x:f.outX,z:f.outZ}),a.push({x:f.inX,z:f.inZ}))}else u=h;let d=l(o,n);for(;u<d;){let f=o.stairs[u];if(!f)break;a.push({x:f.entryX,z:f.entryZ}),a.push({x:f.lowX,z:f.lowZ}),a.push({x:f.highX,z:f.highZ}),u++}for(;u>d;){let f=o.stairs[u-1];if(!f)break;a.push({x:f.highX,z:f.highZ}),a.push({x:f.lowX,z:f.lowZ}),u--}}return a.push({x:e,z:i}),a}nearPoiClear(t,e){for(let i of $e)if(!i.grassOk&&Math.hypot(t-i.x,e-i.z)<i.clearR*.9)return!0;return!1}groundAt(t,e,i,n=.6){return this.collision.groundAt(t,e,i,n)}update(t,e,i,n){this.terrain.update(t.position),this.props.update(t.position,i,n),this.sky.update(t,e,i,n);let s=Math.max(0,t.position.y-this.terrain.height(t.position.x,t.position.z));this.graphics&&this.sky.setFog(this.graphics.viewDistance*.35+s*1.2,this.graphics.viewDistance+s*3.5);let o=this.water.userData.water;this.water.position.x=Math.round(t.position.x/100)*100,this.water.position.z=Math.round(t.position.z/100)*100;let a=o.material.normalMap;a.offset.x=n*.004%1,a.offset.y=n*.0027%1;for(let l of this.animated)l.update(i,n)}applyGraphics(t){let e=this.renderer;this.graphics=t,e.setPixelRatio(t.pixelRatio),this.sky.setShadowQuality(t.shadowMap,t.shadowExtent),e.shadowMap.enabled=t.shadowMap>0,e.shadowMap.type=En,this.sky.setFog(t.viewDistance*.35,t.viewDistance),this.sky.setCloudsVisible(t.clouds),this.terrain.viewDistance=t.viewDistance,this.terrain.lodNear=t.lodNear,this.terrain.lodMid=t.lodMid,this.terrain.setDetailNormals(t.detailNormals),this.scene.environmentIntensity=t.envMap?.55:.25,this.props.setQuality(t),this.water.userData.water.material.normalScale.setScalar(t.detailNormals?.7:.4);let i=[...Object.values(this.mats),this.terrain.material,this.props.treeMat,this.props.rockMat,this.props.grassMat];for(let n of i)n.needsUpdate=!0}};var s_=`
  attribute float aSize; attribute float aAlpha; attribute vec3 aColor;
  uniform float uScale;
  varying float vAlpha; varying vec3 vColor;
  void main() {
    vAlpha = aAlpha; vColor = aColor;
    vec4 mv = modelViewMatrix * vec4(position, 1.0);
    gl_Position = projectionMatrix * mv;
    gl_PointSize = clamp(aSize * uScale / max(-mv.z, 0.1), 0.0, 256.0);
  }
`,r_=`
  uniform sampler2D uMap;
  varying float vAlpha; varying vec3 vColor;
  void main() {
    vec4 t = texture2D(uMap, gl_PointCoord);
    gl_FragColor = vec4(vColor, vAlpha * t.a);
    if (gl_FragColor.a < 0.01) discard;
  }
`,Wl=class{constructor(t,e,i){this.max=t,this.count=0,this.pos=new Float32Array(t*3),this.col=new Float32Array(t*3),this.size=new Float32Array(t),this.alpha=new Float32Array(t),this.vel=new Float32Array(t*3),this.life=new Float32Array(t),this.maxLife=new Float32Array(t),this.s0=new Float32Array(t),this.s1=new Float32Array(t),this.a0=new Float32Array(t),this.grav=new Float32Array(t),this.drag=new Float32Array(t),this.c0=new Float32Array(t*3),this.c1=new Float32Array(t*3),this.geo=new Ae,this.geo.setAttribute("position",new Se(this.pos,3).setUsage(ir)),this.geo.setAttribute("aColor",new Se(this.col,3).setUsage(ir)),this.geo.setAttribute("aSize",new Se(this.size,1).setUsage(ir)),this.geo.setAttribute("aAlpha",new Se(this.alpha,1).setUsage(ir)),this.uniforms={uMap:{value:e},uScale:{value:600}},this.mat=new Ze({vertexShader:s_,fragmentShader:r_,uniforms:this.uniforms,transparent:!0,depthWrite:!1,blending:i?Si:an,fog:!1}),this.points=new kr(this.geo,this.mat),this.points.frustumCulled=!1,this.points.renderOrder=i?6:5}emit(t,e,i,n,s,o,a,l,c,h,u,d=1,f=0,g=0){let x=this.count;x>=this.max?x=Math.floor(Math.random()*this.max):this.count++;let m=x*3;this.pos[m]=t,this.pos[m+1]=e,this.pos[m+2]=i,this.vel[m]=n,this.vel[m+1]=s,this.vel[m+2]=o,this.life[x]=a,this.maxLife[x]=a,this.s0[x]=l,this.s1[x]=c,this.a0[x]=d,this.grav[x]=f,this.drag[x]=g,this.c0[m]=h[0],this.c0[m+1]=h[1],this.c0[m+2]=h[2],this.c1[m]=u[0],this.c1[m+1]=u[1],this.c1[m+2]=u[2],this.size[x]=l,this.alpha[x]=d}update(t){let e=0;for(;e<this.count;){if(this.life[e]-=t,this.life[e]<=0){let o=--this.count;e!==o&&this._copy(o,e);continue}let i=e*3,n=1-this.life[e]/this.maxLife[e],s=Math.max(0,1-this.drag[e]*t);this.vel[i]*=s,this.vel[i+2]*=s,this.vel[i+1]=this.vel[i+1]*s-this.grav[e]*t,this.pos[i]+=this.vel[i]*t,this.pos[i+1]+=this.vel[i+1]*t,this.pos[i+2]+=this.vel[i+2]*t,this.size[e]=this.s0[e]+(this.s1[e]-this.s0[e])*n,this.alpha[e]=this.a0[e]*(1-n*n),this.col[i]=this.c0[i]+(this.c1[i]-this.c0[i])*n,this.col[i+1]=this.c0[i+1]+(this.c1[i+1]-this.c0[i+1])*n,this.col[i+2]=this.c0[i+2]+(this.c1[i+2]-this.c0[i+2])*n,e++}this.geo.setDrawRange(0,this.count),this.geo.attributes.position.needsUpdate=!0,this.geo.attributes.aColor.needsUpdate=!0,this.geo.attributes.aSize.needsUpdate=!0,this.geo.attributes.aAlpha.needsUpdate=!0}_copy(t,e){for(let i of[this.pos,this.vel,this.col,this.c0,this.c1])i[e*3]=i[t*3],i[e*3+1]=i[t*3+1],i[e*3+2]=i[t*3+2];for(let i of[this.life,this.maxLife,this.s0,this.s1,this.a0,this.grav,this.drag,this.size,this.alpha])i[e]=i[t]}},di=r=>[(r>>16&255)/255,(r>>8&255)/255,(r&255)/255],Qt={spark:di(16765562),sparkEnd:di(16734746),smoke:di(9079434),smokeEnd:di(4868682),dust:di(11901552),dustEnd:di(9073746),fire:di(16756778),fireEnd:di(13117962),white:di(16777215),green:di(7208810),cyan:di(6285567),orange:di(16751146),purple:di(13073151),heal:di(9306010),shield:di(6990591)},Xl=class{constructor(t,e,i){this.game=i,this.add=new Wl(2600,e.particle,!0),this.alpha=new Wl(1600,e.particle,!1),t.add(this.add.points,this.alpha.points),this.quality=1,this.tracers=[],this.tracerMat=new se({color:16771496,transparent:!0,opacity:.9,blending:Si,depthWrite:!1,fog:!1}),this.tracerGeo=new ri(.035,.035,1),this.tracerPool=[],this.scene=t;for(let n=0;n<40;n++){let s=new Et(this.tracerGeo,this.tracerMat.clone());s.visible=!1,s.frustumCulled=!1,s.renderOrder=7,t.add(s),this.tracerPool.push(s)}this._v=new L,this.shake=0}setQuality(t){this.quality=t}update(t,e,i){let s=i.domElement.height/(2*Math.tan(e.fov*Math.PI/360));this.add.uniforms.uScale.value=s,this.alpha.uniforms.uScale.value=s,this.add.update(t),this.alpha.update(t);for(let o=this.tracers.length-1;o>=0;o--){let a=this.tracers[o];a.t+=t;let l=Math.min(a.dist,a.t*a.speed),c=Math.max(0,l-a.len);if(c>=a.dist-.01||a.t>2){a.mesh.visible=!1,this.tracerPool.push(a.mesh),this.tracers.splice(o,1);continue}let h=l-c;a.mesh.scale.z=Math.max(h,.01);let u=(l+c)/2;a.mesh.position.set(a.ax+a.dx*u,a.ay+a.dy*u,a.az+a.dz*u)}this.shake=Math.max(0,this.shake-t*2.2)}tracer(t,e,i=16771496,n=1,s=380){let o=this.tracerPool.pop();if(!o)return;let a=e.x-t.x,l=e.y-t.y,c=e.z-t.z,h=Math.hypot(a,l,c);if(h<.5){this.tracerPool.push(o);return}let u=a/h,d=l/h,f=c/h;o.visible=!0,o.material.color.setHex(i),o.scale.set(n,n,1),o.position.copy(t),o.lookAt(e.x,e.y,e.z),this.tracers.push({mesh:o,t:0,ax:t.x,ay:t.y,az:t.z,dx:u,dy:d,dz:f,dist:h,speed:s,len:Math.min(9,h)})}impact(t,e,i="rock"){let n=this.quality,s=Math.round(5*n);for(let a=0;a<s;a++){let l=2+Math.random()*4;this.add.emit(t.x,t.y,t.z,e.x*l+(Math.random()-.5)*3,e.y*l+Math.random()*2,e.z*l+(Math.random()-.5)*3,.25+Math.random()*.25,.12,.02,Qt.spark,Qt.sparkEnd,1,9,.5)}let o=i==="terrain";this.alpha.emit(t.x,t.y,t.z,e.x*.8,e.y*.8+.3,e.z*.8,.5,.25,.9,o?Qt.dust:Qt.smoke,o?Qt.dustEnd:Qt.smokeEnd,.5,-.5,1)}hit(t){for(let e=0;e<6*this.quality;e++)this.add.emit(t.x,t.y,t.z,(Math.random()-.5)*4,Math.random()*3,(Math.random()-.5)*4,.3,.16,.02,Qt.white,Qt.orange,1,6,.4)}muzzle(t,e,i=1){for(let n=0;n<3;n++)this.add.emit(t.x,t.y,t.z,e.x*8+(Math.random()-.5)*2,e.y*8+(Math.random()-.5)*2,e.z*8+(Math.random()-.5)*2,.07,.3*i,.05,Qt.spark,Qt.fire,1,0,1)}explosion(t,e=5,i="fire"){let n=this.quality,s=i==="impulse"?[Qt.cyan,Qt.white]:i==="boogie"?[Qt.purple,Qt.white]:[Qt.fire,Qt.fireEnd],o=Math.round((16+e*3)*n);for(let a=0;a<o;a++){let l=Math.random()*6.283,c=(Math.random()-.3)*1.6,h=(.4+Math.random())*e*1.4;this.add.emit(t.x,t.y+.3,t.z,Math.cos(l)*Math.cos(c)*h,Math.sin(c)*h+1,Math.sin(l)*Math.cos(c)*h,.45+Math.random()*.4,e*.45,e*.9,s[0],s[1],.95,-1,3)}if(i==="fire"){for(let a=0;a<Math.round(12*n);a++){let l=Math.random()*6.283,c=Math.random()*e*.8;this.alpha.emit(t.x+Math.cos(l)*1.2,t.y+.6,t.z+Math.sin(l)*1.2,Math.cos(l)*c*.5,1.5+Math.random()*3,Math.sin(l)*c*.5,1.4+Math.random()*1.2,e*.5,e*1.4,Qt.smoke,Qt.smokeEnd,.6,-1.4,1.2)}for(let a=0;a<Math.round(24*n);a++){let l=6+Math.random()*14,c=Math.random()*6.283,h=Math.random()*1.2;this.add.emit(t.x,t.y+.5,t.z,Math.cos(c)*Math.cos(h)*l,Math.sin(h)*l,Math.sin(c)*Math.cos(h)*l,.6+Math.random()*.5,.2,.03,Qt.spark,Qt.sparkEnd,1,14,.2)}}else for(let a=0;a<28;a++){let l=a/28*6.283;this.add.emit(t.x,t.y+.3,t.z,Math.cos(l)*e*2.2,.5,Math.sin(l)*e*2.2,.4,.8,1.6,s[1],s[0],.9,0,2.5)}}smokeTrail(t){this.alpha.emit(t.x,t.y,t.z,(Math.random()-.5)*.4,.2,(Math.random()-.5)*.4,.9,.35,1.1,Qt.smoke,Qt.smokeEnd,.5,0,1),this.add.emit(t.x,t.y,t.z,0,0,0,.12,.45,.1,Qt.fire,Qt.fireEnd,1,0,0)}heal(t,e="heal"){let i=e==="shield"?Qt.shield:e==="speed"?Qt.green:Qt.heal;for(let n=0;n<2;n++)this.add.emit(t.x+(Math.random()-.5)*.7,t.y+.1,t.z+(Math.random()-.5)*.7,0,1.4+Math.random(),0,.9,.22,.04,i,Qt.white,.9,0,.5)}teleport(t,e="orange"){let i=e==="orange"?Qt.orange:Qt.cyan;for(let n=0;n<26*this.quality;n++){let s=Math.random()*6.283,o=Math.random()*.8;this.add.emit(t.x+Math.cos(s)*o,t.y+Math.random()*1.8,t.z+Math.sin(s)*o,0,1+Math.random()*3,0,.7,.35,.05,i,Qt.white,1,0,.6)}}dust(t,e=8){for(let i=0;i<e*this.quality;i++){let n=Math.random()*6.283,s=1+Math.random()*2.5;this.alpha.emit(t.x,t.y+.1,t.z,Math.cos(n)*s,.6,Math.sin(n)*s,.6,.35,1,Qt.dust,Qt.dustEnd,.5,-.3,2)}}splash(t,e=10){for(let i=0;i<e*this.quality;i++){let n=Math.random()*6.283,s=1+Math.random()*3;this.alpha.emit(t.x,t.y,t.z,Math.cos(n)*s,2+Math.random()*3,Math.sin(n)*s,.7,.25,.1,Qt.white,Qt.cyan,.8,11,.5)}}chestOpen(t){for(let e=0;e<30*this.quality;e++){let i=Math.random()*6.283,n=1+Math.random()*3;this.add.emit(t.x,t.y+.5,t.z,Math.cos(i)*n,2+Math.random()*4,Math.sin(i)*n,.9,.25,.04,[1,.85,.3],Qt.white,1,6,.4)}}};var li=[{id:"common",name:"Common",color:"#b9bec7",css:"#b9bec7",mult:1,weight:44},{id:"uncommon",name:"Uncommon",color:"#5fd35a",css:"#5fd35a",mult:1.05,weight:28},{id:"rare",name:"Rare",color:"#4aa8ff",css:"#4aa8ff",mult:1.1,weight:16},{id:"epic",name:"Epic",color:"#c35cff",css:"#c35cff",mult:1.15,weight:8},{id:"legendary",name:"Legendary",color:"#ffb62e",css:"#ffb62e",mult:1.2,weight:4}],fi={light:{name:"Light Ammo",icon:"\u2022",color:"#e8c86a",pack:30,max:300},medium:{name:"Medium Ammo",icon:"\u25AE",color:"#d98a3a",pack:30,max:240},heavy:{name:"Heavy Ammo",icon:"\u258C",color:"#c44a4a",pack:10,max:60},shells:{name:"Shells",icon:"\u25CD",color:"#d95f5f",pack:8,max:64},rockets:{name:"Rockets",icon:"\u25B2",color:"#8a8f96",pack:3,max:18}},Yi={},fr=r=>(Yi[r.id]=r,r),Be=r=>fr({kind:"gun",auto:!1,pellets:1,headshot:2,spread:2,adsSpread:.4,zoom:.82,recoil:1,noise:140,tracer:16771496,minR:0,maxR:4,weight:10,tags:[],falloff:[60,140,.6],range:300,spinUp:0,burst:0,...r});Be({id:"pistol",name:"Pistol",cat:"pistol",icon:"\u{1F52B}",model:"pistol",sound:"pistol",ammo:"light",dmg:24,rate:6.5,mag:16,reload:1.5,spread:1.6,recoil:1.2,weight:14,tags:["ranged"],falloff:[35,90,.55],maxR:3});Be({id:"revolver",name:"Revolver",cat:"pistol",icon:"\u{1F920}",model:"revolver",sound:"revolver",ammo:"medium",dmg:62,rate:1.7,mag:6,reload:2.8,spread:.9,headshot:2.2,recoil:3,weight:9,tags:["west","ranged"],falloff:[50,120,.6],maxR:4});Be({id:"hand_cannon",name:"Hand Cannon",cat:"pistol",icon:"\u{1F4A5}",model:"hand_cannon",sound:"cannon",ammo:"heavy",dmg:78,rate:1.9,mag:7,reload:2.5,spread:.8,headshot:2,recoil:4,weight:4,minR:3,noise:200,falloff:[60,130,.65]});Be({id:"smg",name:"Submachine Gun",cat:"smg",icon:"\u{1F52B}",model:"smg",sound:"smg",ammo:"light",dmg:17,rate:12,mag:30,reload:2.1,spread:3.2,auto:!0,headshot:1.7,recoil:.7,weight:14,tags:["smg","ranged"],falloff:[28,70,.5],noise:120});Be({id:"silenced_smg",name:"Suppressed SMG",cat:"smg",icon:"\u{1F92B}",model:"silenced_smg",sound:"silenced",ammo:"light",dmg:18,rate:11,mag:30,reload:2,spread:2.6,auto:!0,headshot:1.7,recoil:.6,weight:8,tags:["smg"],falloff:[30,75,.5],noise:35,tracer:12575231,minR:1});Be({id:"ar",name:"Assault Rifle",cat:"rifle",icon:"\u{1F52B}",model:"ar",sound:"rifle",ammo:"medium",dmg:30,rate:5.6,mag:30,reload:2.4,spread:2.2,auto:!0,headshot:1.9,recoil:.9,weight:18,tags:["ranged"],falloff:[70,170,.6],noise:160});Be({id:"burst_ar",name:"Burst Rifle",cat:"rifle",icon:"\u{1F52B}",model:"burst_ar",sound:"rifle",ammo:"medium",dmg:32,rate:2.3,burst:3,mag:30,reload:2.5,spread:1.6,headshot:2,recoil:1,weight:10,tags:["ranged"],falloff:[80,190,.65]});Be({id:"heavy_ar",name:"Heavy Assault Rifle",cat:"rifle",icon:"\u{1F52B}",model:"heavy_ar",sound:"heavy",ammo:"medium",dmg:42,rate:4,mag:25,reload:2.9,spread:2,auto:!0,headshot:1.9,recoil:1.6,weight:5,minR:2,tags:["ranged"],falloff:[80,190,.65],noise:180});Be({id:"lever",name:"Lever-Action Rifle",cat:"rifle",icon:"\u{1F920}",model:"lever",sound:"lever",ammo:"medium",dmg:56,rate:1.3,mag:8,reload:2.9,spread:.7,headshot:2.3,recoil:2.4,weight:8,tags:["west","ranged"],falloff:[90,220,.7],zoom:.7,minR:0,maxR:4});Be({id:"pump",name:"Pump Shotgun",cat:"shotgun",icon:"\u{1F52B}",model:"pump",sound:"shotgun",ammo:"shells",dmg:11,pellets:10,rate:.95,mag:5,reload:4.4,spread:5.5,headshot:1.8,recoil:5,weight:13,tags:["shotgun","ranged"],falloff:[8,28,.2],range:60,noise:170,tracer:16765562});Be({id:"tac_shotgun",name:"Tactical Shotgun",cat:"shotgun",icon:"\u{1F52B}",model:"tac_shotgun",sound:"shotgun",ammo:"shells",dmg:8,pellets:9,rate:2.2,mag:6,reload:4,spread:5,headshot:1.6,recoil:3,weight:11,tags:["shotgun","ranged"],falloff:[8,26,.2],range:55,noise:170,tracer:16765562});Be({id:"double_barrel",name:"Double Barrel",cat:"shotgun",icon:"\u{1F920}",model:"double_barrel",sound:"shotgun",ammo:"shells",dmg:13,pellets:12,rate:1.4,mag:2,reload:2.4,spread:6.5,headshot:1.8,recoil:6,weight:8,tags:["west","shotgun"],falloff:[7,24,.15],range:50,noise:190,tracer:16765562});Be({id:"auto_shotgun",name:"Auto Shotgun",cat:"shotgun",icon:"\u{1F52B}",model:"auto_shotgun",sound:"shotgun",ammo:"shells",dmg:7,pellets:8,rate:3.4,mag:10,reload:4.6,spread:5.8,auto:!0,headshot:1.5,recoil:2.4,weight:4,minR:2,tags:["shotgun"],falloff:[8,24,.2],range:50,noise:170,tracer:16765562});Be({id:"bolt_sniper",name:"Bolt-Action Sniper",cat:"sniper",icon:"\u{1F3AF}",model:"bolt_sniper",sound:"sniper",ammo:"heavy",dmg:105,rate:.8,mag:1,reload:2.6,spread:.2,adsSpread:.05,headshot:2.5,zoom:.22,recoil:6,weight:6,minR:1,tags:["ranged","heavy"],falloff:[300,700,1],range:900,noise:260,tracer:16777215});Be({id:"semi_sniper",name:"Semi-Auto Sniper",cat:"sniper",icon:"\u{1F3AF}",model:"semi_sniper",sound:"sniper",ammo:"heavy",dmg:68,rate:1.7,mag:10,reload:3,spread:.4,adsSpread:.1,headshot:2.3,zoom:.3,recoil:3.5,weight:5,minR:1,tags:["ranged","heavy"],falloff:[250,600,1],range:800,noise:240,tracer:16777215});Be({id:"lmg",name:"Light Machine Gun",cat:"lmg",icon:"\u{1F52B}",model:"lmg",sound:"rifle",ammo:"medium",dmg:23,rate:8.5,mag:60,reload:4.3,spread:3,auto:!0,headshot:1.7,recoil:.8,weight:5,minR:1,tags:["heavy","ranged"],falloff:[60,150,.55],noise:170});Be({id:"minigun",name:"Minigun",cat:"lmg",icon:"\u{1F300}",model:"minigun",sound:"minigun",ammo:"medium",dmg:17,rate:20,mag:150,reload:5.5,spread:4.5,auto:!0,headshot:1.4,recoil:.35,spinUp:.7,weight:2,minR:3,tags:["heavy"],falloff:[50,130,.5],noise:200,speedPenalty:.7});Be({id:"rocket_launcher",name:"Rocket Launcher",cat:"launcher",icon:"\u{1F680}",model:"launcher",sound:"rocket",ammo:"rockets",dmg:105,rate:.7,mag:1,reload:3.5,spread:.3,projectile:{speed:58,gravity:0,radius:5.5,fuse:6,kind:"rocket"},weight:5,minR:1,tags:["explosive","heavy"],noise:230,headshot:1});Be({id:"grenade_launcher",name:"Grenade Launcher",cat:"launcher",icon:"\u{1F4A3}",model:"grenade_launcher",sound:"grenadel",ammo:"rockets",dmg:75,rate:1.6,mag:6,reload:4.2,spread:.5,projectile:{speed:30,gravity:18,radius:5,fuse:2.2,bounce:.45,kind:"grenade"},weight:5,minR:1,tags:["explosive"],noise:200,headshot:1});Be({id:"crossbow",name:"Crossbow",cat:"bow",icon:"\u{1F3F9}",model:"crossbow",sound:"crossbow",ammo:"heavy",dmg:92,rate:.9,mag:1,reload:2.2,spread:.3,projectile:{speed:150,gravity:3,radius:0,fuse:4,kind:"bolt"},headshot:2.2,weight:5,minR:1,tags:["ranged"],noise:25,tracer:14540253,zoom:.6});var yo=r=>fr({kind:"melee",range:2.7,arc:1.1,knock:3,noise:20,minR:0,maxR:4,weight:8,tags:["melee"],...r});yo({id:"pickaxe",name:"Pickaxe",icon:"\u26CF\uFE0F",model:"pickaxe",dmg:20,rate:1.9,weight:0,maxR:0});yo({id:"machete",name:"Machete",icon:"\u{1F52A}",model:"machete",dmg:33,rate:1.7,weight:10,knock:2});yo({id:"bat",name:"Baseball Bat",icon:"\u{1F3CF}",model:"bat",dmg:38,rate:1.3,weight:9,knock:9});yo({id:"katana",name:"Katana",icon:"\u{1F5E1}\uFE0F",model:"katana",dmg:27,rate:3.1,weight:5,minR:2,range:2.9});yo({id:"sledge",name:"Sledgehammer",icon:"\u{1F528}",model:"sledge",dmg:68,rate:.75,weight:5,minR:1,knock:14,range:3});var ql=r=>fr({kind:"throw",stack:6,noise:60,minR:0,maxR:4,weight:8,tags:["explosive"],throwSpeed:21,gravity:20,bounce:.4,...r});ql({id:"frag",name:"Frag Grenade",icon:"\u{1F4A3}",model:"frag",dmg:100,radius:6.5,fuse:2.2,stack:6,weight:12});ql({id:"impulse",desc:"Shoves everything nearby. Throw it at your feet to launch yourself.",name:"Impulse Grenade",icon:"\u{1F300}",model:"impulse",dmg:0,radius:9,fuse:1.3,impulse:26,stack:4,weight:10,tags:["parkour"],bounce:.3});ql({id:"dynamite",name:"Dynamite",icon:"\u{1F9E8}",model:"dynamite",dmg:140,radius:8,fuse:3.4,stack:4,weight:7,tags:["west","explosive"],throwSpeed:18});ql({id:"boogie",desc:"Makes anyone nearby dance helplessly.",name:"Boogie Bomb",icon:"\u{1FAA9}",model:"boogie",dmg:0,radius:9,fuse:1.1,dance:5.5,stack:4,weight:4,minR:1,tags:["explosive"],bounce:.5});fr({id:"grappler",desc:"Fire at any surface to swing and pull yourself over. Jump to let go.",name:"Grappler",kind:"gadget",icon:"\u{1FA9D}",model:"grappler",stack:12,charges:6,range:70,weight:9,tags:["parkour"],minR:0,maxR:4,noise:40,gadget:"grapple"});fr({id:"launchpad",desc:"Place it, then run over it to be launched skyward.",name:"Launch Pad",kind:"gadget",icon:"\u23EB",model:"launchpad",stack:4,charges:2,weight:7,tags:["parkour"],minR:0,maxR:3,noise:50,gadget:"launchpad"});var $i=r=>fr({kind:"consume",stack:6,minR:0,maxR:4,weight:10,tags:["heal"],hp:0,shield:0,hpCap:100,shieldCap:100,time:1,...r});$i({id:"apple",name:"Apple",icon:"\u{1F34E}",model:"apple",hp:5,time:1,stack:6,weight:16,tags:["food"],maxR:0});$i({id:"banana",name:"Banana",icon:"\u{1F34C}",model:"banana",hp:5,time:1,stack:6,weight:12,tags:["food"],maxR:0});$i({id:"mushroom",name:"Shield Mushroom",icon:"\u{1F344}",model:"mushroom",shield:5,time:1,stack:6,weight:12,tags:["food","shield"],maxR:0});$i({id:"bandage",name:"Bandage",icon:"\u{1FA79}",model:"bandage",hp:15,hpCap:75,time:3.8,stack:8,weight:22});$i({id:"medkit",name:"Medkit",icon:"\u{1F9F0}",model:"medkit",hp:100,hpCap:100,time:7.5,stack:3,weight:9,minR:1});$i({id:"small_shield",name:"Mini Shield",icon:"\u{1F9EA}",model:"small_shield",shield:25,shieldCap:50,time:2.4,stack:6,weight:22,tags:["shield"]});$i({id:"big_shield",name:"Shield Potion",icon:"\u{1F535}",model:"big_shield",shield:50,shieldCap:100,time:4.6,stack:3,weight:11,minR:1,tags:["shield"]});$i({id:"chug_jug",desc:"Full health and shield.",name:"Chug Jug",icon:"\u{1F3FA}",model:"chug_jug",hp:100,shield:100,time:12,stack:1,weight:2,minR:3,tags:["shield"]});$i({id:"slurp",desc:"Restores health and shield over time.",name:"Slurp Juice",icon:"\u{1F9C3}",model:"slurp",hot:{hp:30,shield:30,dur:14},time:1.6,stack:3,weight:5,minR:2,tags:["shield"]});$i({id:"jumpple",desc:"Run faster and jump higher for 30 seconds.",name:"Jumpple",icon:"\u{1F34F}",model:"jumpple",hp:5,time:1,stack:4,weight:8,buff:{speed:1.38,jump:1.6,dur:30},tags:["parkour","food"],maxR:2});$i({id:"floorange",desc:"Only edible mid-air. Teleports you to the ground with no fall damage and heals 10 HP.",name:"Floorange",icon:"\u{1F34A}",model:"floorange",hp:10,time:.55,stack:4,weight:8,airOnly:!0,tags:["floorange","food"],maxR:1});var xo=Object.values(Yi),wf=r=>r.kind==="throw"||r.kind==="consume"||r.kind==="gadget",NS=xo.filter(r=>r.kind==="gun");function Jn(r,t=0,e=null){let i=Yi[r],n=Math.min(Math.max(t,i.minR??0),i.maxR??4),s={def:i,rarity:n,count:e??(i.kind==="gadget"?i.charges:(i.kind==="consume"||i.kind==="throw",1))};return i.kind==="gun"&&(s.mag=i.mag),s}var Ef=r=>r.def.dmg*li[r.rarity].mult,Tf=r=>r.def.reload*(1-r.rarity*.04);function _o(r){let t=r.def;return t.kind==="melee"?t.dmg*li[r.rarity].mult*t.rate*.8:t.kind==="gun"?(t.projectile?t.dmg:t.dmg*t.pellets*(t.pellets>1?.55:1))*li[r.rarity].mult*t.rate*Math.min(1,t.mag/(t.rate*4)):0}var o_={weapon:46,heal:26,ammo:20,throw:5,gadget:3};function a_(r){switch(r){case"weapon":return xo.filter(t=>t.kind==="gun"||t.kind==="melee"&&t.weight>0);case"heal":return xo.filter(t=>t.kind==="consume");case"throw":return xo.filter(t=>t.kind==="throw");case"gadget":return xo.filter(t=>t.kind==="gadget");default:return[]}}var Af={};for(let r of["weapon","heal","throw","gadget"])Af[r]=a_(r);function Sf(r,t=0){let e=li.map((i,n)=>{if(n<(r.minR??0)||n>(r.maxR??4))return[n,0];let s=i.weight*Math.pow(1+t,n);return[n,s]});return lo(e)}function jn({bias:r={},focus:t=null,rarityBias:e=0,forceGroup:i=null,rng:n=Math.random}={}){if(t==="floorange")return{id:n()<.7?"floorange":n()<.5?"apple":"banana",rarity:0,count:1+Math.floor(n()*3)};let s=i?[[i,1]]:Object.entries(o_).map(([d,f])=>{let g=f;return t==="parkour"&&(d==="gadget"||d==="throw")&&(g*=1.8),t==="west"&&d==="weapon"&&(g*=1.3),[d,g]}),o=i??lo(s,n);if(o==="ammo"){let d=lo([["light",28],["medium",28],["shells",18],["heavy",12],["rockets",6]],n);return{ammo:d,count:fi[d].pack}}let l=Af[o].map(d=>{let f=d.weight;for(let g of d.tags)r[g]&&(f*=r[g]),t&&t===g&&(f*=2);return[d,f]}),c=lo(l,n),h=c.kind==="consume"||c.kind==="throw"||c.kind==="gadget"?Sf({minR:0,maxR:0},0):Sf(c,e),u=1;return(c.kind==="consume"||c.kind==="throw")&&(u=c.stack>=6?1+Math.floor(n()*3):1),c.kind==="gadget"&&(u=c.charges),{id:c.id,rarity:h,count:u}}function Rf(r={},t=null,e=Math.random){let i=[],n=jn({bias:r,focus:t,rarityBias:.55,forceGroup:"weapon",rng:e});i.push(n);let s=Yi[n.id];if(s&&s.ammo&&i.push({ammo:s.ammo,count:fi[s.ammo].pack*2}),i.push(jn({bias:r,focus:t,forceGroup:"heal",rng:e})),e()<.7&&i.push(jn({bias:r,focus:t,forceGroup:"heal",rng:e})),e()<.55&&i.push(jn({bias:r,focus:t,forceGroup:e()<.7?"throw":"gadget",rng:e})),t==="parkour"&&e()<.3){let o=e()<.5?"jumpple":"grappler";i.push({id:o,rarity:0,count:o==="jumpple"?2:Yi.grappler.charges})}return e()<.35&&i.push(jn({bias:r,focus:t,forceGroup:"weapon",rarityBias:.3,rng:e})),i}var Cf=new Map;function _s(r,{metal:t=.25,rough:e=.6,emissive:i=0,emissiveIntensity:n=1}={}){let s=`${r}|${t}|${e}|${i}|${n}`,o=Cf.get(s);return o||(o=new re({color:r,metalness:t,roughness:e}),i&&(o.emissive=new It(i),o.emissiveIntensity=n),Cf.set(s,o)),o}var Pf=new Map;function l_(r,t,e){let i=`${r},${t},${e}`,n=Pf.get(i);return n||(n=new ri(r,t,e),Pf.set(i,n)),n}function j(r,t,e,i,n,s=0,o=0,a=0,l={}){let c=new Et(l_(t,e,i),_s(n,l));return c.position.set(s,o,a),l.rx&&(c.rotation.x=l.rx),l.ry&&(c.rotation.y=l.ry),l.rz&&(c.rotation.z=l.rz),c.castShadow=!0,r.add(c),c}var If=new Map;function Ft(r,t,e,i,n=0,s=0,o=0,a="z",l={}){let c=`${t},${e},${a},${l.rTop??t},${l.seg??10}`,h=If.get(c);h||(h=new ve(l.rTop??t,t,e,l.seg??10),a==="z"?h.rotateX(Math.PI/2):a==="x"&&h.rotateZ(Math.PI/2),If.set(c,h));let u=new Et(h,_s(i,l));return u.position.set(n,s,o),u.castShadow=!0,r.add(u),u}var Lf=new Map;function Li(r,t,e,i=0,n=0,s=0,o={}){let a=`${t},${o.sy??1}`,l=Lf.get(a);l||(l=new Ci(t,12,9),o.sy&&l.scale(1,o.sy,1),Lf.set(a,l));let c=new Et(l,_s(e,o));return c.position.set(i,n,s),c.castShadow=!0,r.add(c),c}var yi=3817286,pe=2237738;var ys=8015658,Yl=5912604,$l=13148746,Df={pistol(r){return j(r,.045,.05,.2,yi,0,.045,-.07),j(r,.04,.035,.17,pe,0,0,-.06),j(r,.038,.11,.055,pe,0,-.06,.02,{rx:.18}),-.18},revolver(r){return Ft(r,.012,.2,yi,0,.05,-.15,"z"),Ft(r,.036,.06,10134187,0,.04,-.04,"z"),j(r,.04,.05,.12,yi,0,.03,-.02),j(r,.04,.12,.055,ys,0,-.06,.04,{rx:.35}),-.25},hand_cannon(r){return j(r,.06,.07,.3,$l,0,.05,-.12,{metal:.7,rough:.3}),j(r,.055,.04,.22,1842204,0,0,-.1),j(r,.05,.13,.06,2759954,0,-.07,.04,{rx:.2}),-.28},smg(r){return j(r,.05,.08,.28,yi,0,.03,-.1),Ft(r,.014,.12,pe,0,.04,-.3),j(r,.03,.15,.045,pe,0,-.09,-.06),j(r,.04,.1,.05,pe,0,-.05,.04,{rx:.2}),j(r,.03,.03,.14,pe,0,0,.14),-.36},silenced_smg(r){return j(r,.05,.08,.26,2830390,0,.03,-.08),Ft(r,.028,.26,1842979,0,.04,-.34),j(r,.03,.15,.045,pe,0,-.09,-.05),j(r,.04,.1,.05,pe,0,-.05,.04,{rx:.2}),j(r,.03,.04,.14,pe,0,.02,.14),-.5},ar(r){return j(r,.055,.085,.4,3159355,0,.03,-.1),Ft(r,.014,.28,pe,0,.045,-.42),j(r,.045,.06,.2,2435632,0,.03,-.35),j(r,.04,.1,.2,3883080,0,0,.22),j(r,.03,.15,.06,pe,0,-.1,-.08,{rx:-.2}),j(r,.03,.04,.08,pe,0,.09,-.12),j(r,.04,.1,.05,pe,0,-.06,.06,{rx:.2}),-.56},burst_ar(r){return j(r,.055,.085,.38,2832939,0,.03,-.1),Ft(r,.016,.26,pe,0,.045,-.4),j(r,.045,.06,.18,2306083,0,.03,-.33),j(r,.04,.11,.18,2832939,0,0,.2),j(r,.03,.14,.05,pe,0,-.1,-.05),j(r,.025,.06,.2,pe,0,.1,-.08),-.53},heavy_ar(r){return j(r,.065,.1,.44,4866102,0,.03,-.1),Ft(r,.02,.28,pe,0,.045,-.44),j(r,.05,.07,.22,3813928,0,.03,-.37),j(r,.05,.12,.22,4866102,0,0,.24),j(r,.035,.16,.07,pe,0,-.11,-.06),Ft(r,.026,.14,1382427,0,.1,-.1),-.58},lever(r){return Ft(r,.014,.5,yi,0,.04,-.4),j(r,.04,.07,.3,4868682,0,.03,-.05),j(r,.045,.1,.3,ys,0,0,.2,{rx:.05}),j(r,.03,.05,.25,Yl,0,-.01,-.32),Ft(r,.03,.01,$l,0,-.07,-.02,"x"),-.65},pump(r){return Ft(r,.02,.6,yi,0,.04,-.4),Ft(r,.017,.5,2764339,0,0,-.36),j(r,.05,.05,.14,ys,0,-0,-.32),j(r,.05,.08,.2,3093304,0,.03,-0),j(r,.045,.1,.26,ys,0,-.01,.24,{rx:.1}),-.72},tac_shotgun(r){return Ft(r,.02,.5,2435373,0,.04,-.36),j(r,.055,.09,.3,3159355,0,.03,-.05),j(r,.045,.06,.16,1711135,0,0,-.3),j(r,.045,.09,.22,3159355,0,0,.2),j(r,.035,.1,.05,pe,0,-.09,0),-.62},double_barrel(r){return Ft(r,.017,.55,yi,-.017,.04,-.35),Ft(r,.017,.55,yi,.017,.04,-.35),j(r,.06,.07,.2,5592405,0,.02,0),j(r,.045,.1,.28,ys,0,-.01,.24,{rx:.1}),j(r,.05,.045,.12,Yl,0,-.01,-.28),-.63},auto_shotgun(r){return Ft(r,.022,.46,2764339,0,.04,-.34),j(r,.06,.09,.32,4861486,0,.03,-.04),Ft(r,.055,.07,1711135,0,-.09,-.08,"x"),j(r,.045,.09,.2,4861486,0,0,.2),-.58},bolt_sniper(r){return Ft(r,.016,.8,yi,0,.04,-.55),j(r,.05,.08,.34,3029550,0,.03,-.05),j(r,.05,.11,.3,3029550,0,-.01,.26,{rx:.08}),Ft(r,.03,.26,1382427,0,.11,-.08),Ft(r,.038,.04,1382427,0,.11,-.2),Ft(r,.045,.01,8042751,0,.11,-.215,"z",{metal:.9,rough:.1}),j(r,.02,.05,.02,yi,.05,.03,0),-.95},semi_sniper(r){return Ft(r,.017,.65,yi,0,.04,-.5),j(r,.055,.09,.4,3815994,0,.03,-.05),j(r,.05,.11,.26,3815994,0,-.01,.26),j(r,.03,.12,.05,pe,0,-.1,-.05),Ft(r,.03,.22,1382427,0,.11,-.08),-.85},lmg(r){return Ft(r,.022,.5,yi,0,.04,-.46),j(r,.07,.1,.46,3885614,0,.03,-.08),j(r,.1,.11,.12,2435618,0,-.1,-.05),j(r,.05,.11,.2,3885614,0,0,.24),j(r,.015,.13,.015,pe,-.03,-.05,-.55,{rx:.3}),j(r,.015,.13,.015,pe,.03,-.05,-.55,{rx:.3}),-.72},minigun(r){for(let t=0;t<6;t++){let e=t/6*Math.PI*2;Ft(r,.012,.55,yi,Math.cos(e)*.035,.03+Math.sin(e)*.035,-.4)}return Ft(r,.055,.08,pe,0,.03,-.15),j(r,.12,.14,.3,5922662,0,.02,-.02),j(r,.04,.12,.05,pe,0,-.1,.02),-.72},launcher(r){return Ft(r,.075,.9,4872762,0,.06,-.25),Ft(r,.095,.1,2831138,0,.06,-.72),Ft(r,.1,.1,2831138,0,.06,.22),j(r,.04,.1,.05,pe,0,-.06,-.08),j(r,.03,.06,.1,pe,0,.14,-.2),-.8},grenade_launcher(r){return Ft(r,.03,.4,yi,0,.05,-.32),Ft(r,.06,.12,6975285,0,.03,-.06),j(r,.05,.08,.3,3817286,0,.03,.02),j(r,.045,.1,.2,3817286,0,0,.22),j(r,.035,.1,.05,pe,0,-.08,-.12),-.55},crossbow(r){j(r,.05,.07,.5,Yl,0,.02,-.1),j(r,.5,.025,.04,2763306,0,.04,-.34),j(r,.015,.015,.34,14540253,0,.065,-.2),j(r,.04,.1,.18,Yl,0,-.01,.2);for(let t of[-1,1])j(r,.015,.015,.3,13421772,t*.12,.04,-.2,{ry:t*.45});return-.36},pickaxe(r){return Ft(r,.017,.8,ys,0,0,-.2),j(r,.03,.03,.32,8225932,0,0,-.62,{metal:.8}),j(r,.03,.03,.04,8225932,0,0,-.62),j(r,.03,.34,.035,8225932,0,0,-.6,{metal:.8}),j(r,.02,.1,.06,10134187,0,.17,-.6),j(r,.02,.1,.06,10134187,0,-.17,-.6),-.62},machete(r){return j(r,.03,.04,.13,2763306,0,0,0),j(r,.012,.075,.5,13160148,0,.01,-.33,{metal:.9,rough:.25}),j(r,.05,.02,.02,$l,0,0,-.07),-.58},bat(r){return Ft(r,.016,.28,4864554,0,0,-.05),Ft(r,.04,.55,12094034,0,0,-.5,"z",{rTop:.04}),Ft(r,.022,.3,12094034,0,0,-.2,"z",{rTop:.016}),-.78},katana(r){return j(r,.03,.035,.2,1842214,0,0,.02),j(r,.07,.07,.015,$l,0,0,-.08,{metal:.7}),j(r,.01,.045,.75,14936302,0,.01,-.46,{metal:.95,rough:.15}),-.83},sledge(r){return Ft(r,.02,.95,ys,0,0,-.35),j(r,.13,.13,.3,5593439,0,0,-.85,{metal:.6}),j(r,.14,.14,.04,2764081,0,0,-.72),j(r,.14,.14,.04,2764081,0,0,-.98),-1},frag(r){return Li(r,.055,4020778,0,0,0,{sy:1.15}),Ft(r,.02,.03,8947848,0,.07,0,"y"),j(r,.01,.03,.06,12303291,0,.085,.03),0},impulse(r){Li(r,.06,2779818,0,0,0,{metal:.5});let t=new Et(new Wr(.06,.012,6,14),_s(6285567,{emissive:6285567,emissiveIntensity:1.4}));return t.rotation.x=Math.PI/2,r.add(t),0},dynamite(r){for(let t of[-.03,0,.03])Ft(r,.022,.2,12593698,t,0,0,"y");return Ft(r,.034,.02,2236962,0,.04,0,"y"),j(r,.006,.07,.006,15259808,0,.14,0),Li(r,.012,16756778,0,.18,0,{emissive:16747034}),0},boogie(r){Li(r,.065,13213951,0,0,0,{metal:.9,rough:.15,emissive:8011775,emissiveIntensity:.5});for(let t=0;t<6;t++){let e=t/6*6.283;j(r,.03,.03,.01,16777215,Math.cos(e)*.06,Math.sin(e*2)*.03,Math.sin(e)*.06,{metal:1,rough:.1})}return 0},grappler(r){return j(r,.07,.1,.18,2764342,0,0,-.04),Ft(r,.025,.14,10134187,0,.02,-.18),j(r,.05,.04,.03,16747050,0,0,-.1,{emissive:16738816,emissiveIntensity:.6}),j(r,.04,.09,.05,pe,0,-.08,.02),-.26},launchpad(r){return Ft(r,.16,.04,2237998,0,0,0,"y"),Ft(r,.12,.02,6285567,0,.025,0,"y",{emissive:6285567,emissiveIntensity:1.2}),0},apple(r){return Li(r,.055,14168618,0,0,0,{rough:.35}),Ft(r,.006,.04,5913114,0,.06,0,"y"),j(r,.03,.005,.015,4170042,.02,.07,0),0},banana(r){for(let t=0;t<5;t++){let e=t/4-.5;Li(r,.028,16175674,e*.1,-Math.abs(e)*.04+.02,0,{sy:1,rough:.5})}return 0},mushroom(r){Ft(r,.025,.07,15788248,0,-.03,0,"y"),Li(r,.065,3836671,0,.03,0,{sy:.6,emissive:2779903,emissiveIntensity:.4});for(let[t,e]of[[.03,.02],[-.03,.03],[0,-.04]])Li(r,.012,16777215,t,.06,e);return 0},bandage(r){return Ft(r,.045,.06,16052454,0,0,0,"y"),j(r,.095,.02,.02,14168618,0,.032,0),j(r,.02,.02,.095,14168618,0,.032,0),0},medkit(r){return j(r,.2,.13,.1,16053488,0,0,0),j(r,.1,.03,.105,14168618,0,0,0),j(r,.03,.1,.105,14168618,0,0,0),j(r,.1,.03,.02,7829367,0,.08,0),0},small_shield(r){return Li(r,.055,3836671,0,-.02,0,{emissive:2779903,emissiveIntensity:.6,rough:.2}),Ft(r,.02,.06,14540253,0,.06,0,"y"),0},big_shield(r){return Li(r,.085,2779903,0,-.02,0,{emissive:2779903,emissiveIntensity:.8,rough:.2}),Ft(r,.03,.09,14540253,0,.1,0,"y"),0},chug_jug(r){return Ft(r,.075,.2,3836671,0,0,0,"y",{emissive:1727231,emissiveIntensity:.5,rough:.2}),Ft(r,.035,.06,15788248,0,.13,0,"y"),Ft(r,.035,.012,16765503,.1,.05,0,"x"),0},slurp(r){return Ft(r,.05,.16,16753706,0,0,0,"y",{emissive:16742912,emissiveIntensity:.6,rough:.2}),Ft(r,.012,.12,15790320,.02,.14,0,"y"),0},jumpple(r){return Li(r,.058,7208762,0,0,0,{emissive:3866394,emissiveIntensity:.8,rough:.3}),Ft(r,.006,.04,5913114,0,.06,0,"y"),j(r,.03,.005,.015,16777215,.02,.07,0,{emissive:16777215}),0},floorange(r){return Li(r,.06,16747028,0,0,0,{rough:.55,emissive:16738816,emissiveIntensity:.3}),j(r,.035,.005,.02,4170042,.02,.06,0),Ft(r,.006,.02,3828266,0,.06,0,"y"),0}},Nf=new Map;function vs(r){let t=Nf.get(r);if(!t){let i=Yi[r],n=new kt,o=(Df[i.model]||Df.pistol)(n);n.userData.muzzleZ=o,t=n,Nf.set(r,t)}let e=t.clone();return e.userData.muzzleZ=t.userData.muzzleZ,e}function Uf(r){let t=new kt,e=new It(fi[r].color).getHex();return j(t,.2,.12,.13,3883080,0,0,0),j(t,.205,.035,.135,e,0,.03,0,{emissive:e,emissiveIntensity:.4}),j(t,.06,.02,.02,14540253,0,0,.07),t}var c_=new ve(.9,.9,.02,20),h_=new se({color:16765503,transparent:!0,opacity:.35,depthWrite:!1,blending:Si,fog:!1});function Ff(){let r=new kt,t=new kt,e=new kt;j(t,1,.5,.6,6963232,0,.25,0),j(t,1.04,.1,.64,15906346,0,.05,0,{metal:.8,rough:.3}),j(t,1.04,.06,.64,15906346,0,.47,0,{metal:.8,rough:.3}),j(t,.08,.5,.64,15906346,-.4,.25,0,{metal:.8,rough:.3}),j(t,.08,.5,.64,15906346,.4,.25,0,{metal:.8,rough:.3}),e.position.set(0,.5,-.3),j(e,1,.18,.6,8014374,0,.09,.3),j(e,1,.1,.5,8014374,0,.21,.3),j(e,1.04,.05,.64,15906346,0,.02,.3,{metal:.8,rough:.3}),j(e,.08,.3,.64,15906346,-.4,.15,.3,{metal:.8,rough:.3}),j(e,.08,.3,.64,15906346,.4,.15,.3,{metal:.8,rough:.3}),j(e,.14,.14,.05,16769162,0,.05,.62,{metal:.9,rough:.2,emissive:16760874,emissiveIntensity:.5}),r.add(t,e);let i=new Et(c_,h_);return i.position.y=.02,r.add(i),r.userData={lid:e,glow:i},r}var u_=[15845536,14724220,13011548,10118464,7226665,16243133],d_=[14172463,3111896,3519850,15841578,9064408,1908518,15921906,16742959,2275504,14172064,6978122,4871528],f_=[2764864,3878695,1842204,4872762,2902638,7232058,3355450],p_=[1840144,4861466,13213770,9056026,2763306,15261904,3828378],m_=[null,null,14172463,1908518,3111896,9071162,15841578];function Of(r=1,t={}){let e=jt(r*977+13),i=M=>M[Math.floor(e()*M.length)],n=t.skin??i(u_),s=t.shirt??i(d_),o=t.pants??i(f_),a=t.hair??i(p_),l=t.hat!==void 0?t.hat:i(m_),c=new kt,h=new kt;c.add(h);let u=new kt;u.position.set(0,.88,0),h.add(u),j(u,.5,.3,.27,s,0,.15,0,{rough:.8,metal:0}),j(u,.5,.32,.27,s,0,.45,0,{rough:.8,metal:0}),j(u,.52,.07,.29,2760984,0,0,0,{rough:.7,metal:.1}),j(u,.34,.42,.14,t.pack??4476986,0,.32,.2,{rough:.9,metal:0}),j(u,.1,.08,.02,16777215,.1,.5,-.14,{rough:.8,metal:0,emissive:16777215,emissiveIntensity:.15});let d=new kt;d.position.set(0,.66,0),u.add(d),j(d,.27,.28,.27,n,0,.12,0,{rough:.7,metal:0}),j(d,.29,.1,.29,a,0,.27,.01,{rough:.9,metal:0}),j(d,.29,.18,.08,a,0,.18,.12,{rough:.9,metal:0}),j(d,.05,.05,.02,1380621,-.065,.14,-.136,{rough:.5,metal:0}),j(d,.05,.05,.02,1380621,.065,.14,-.136,{rough:.5,metal:0}),l&&(j(d,.31,.11,.31,l,0,.3,0,{rough:.8,metal:0}),j(d,.33,.03,.4,l,0,.25,-.05,{rough:.8,metal:0}));let f=M=>{let _=new kt;_.position.set(M*.3,.55,0),j(_,.14,.3,.14,s,0,-.15,0,{rough:.8,metal:0});let v=new kt;v.position.set(0,-.3,0),j(v,.12,.26,.12,n,0,-.13,0,{rough:.7,metal:0}),_.add(v);let S=new kt;return S.position.set(0,-.28,0),v.add(S),u.add(_),{a:_,fore:v,hand:S}},g=f(1),x=f(-1),m=M=>{let _=new kt;_.position.set(M*.13,.88,0),j(_,.17,.44,.19,o,0,-.22,0,{rough:.8,metal:0});let v=new kt;return v.position.set(0,-.44,0),j(v,.16,.34,.18,o,0,-.17,0,{rough:.8,metal:0}),j(v,.18,.1,.27,2103830,0,-.38,-.04,{rough:.7,metal:0}),_.add(v),h.add(_),{l:_,shin:v}},p=m(1),y=m(-1);return c.traverse(M=>{M.isMesh&&(M.castShadow=!0,M.receiveShadow=!1)}),{root:c,body:h,torso:u,head:d,armR:g,armL:x,legR:p,legL:y,colors:{shirt:s,skin:n}}}function Bf(r=16734767,t=16777215){let e=new kt,i=new Et(new Ci(1.9,14,8,0,Math.PI*2,0,Math.PI/2.6),new re({color:r,roughness:.7,side:Oe}));i.position.y=2.7,i.scale.set(1.35,.55,1.05),i.castShadow=!0,e.add(i);let n=new Et(new ri(.4,.03,3.4),new re({color:t,roughness:.7}));n.position.set(0,3.63,0),e.add(n);let s=new se({color:2236962}),o=new L(0,1.3,0),a=new L(0,1,0);for(let[l,c]of[[-1.2,-.7],[1.2,-.7],[-1.2,.7],[1.2,.7]]){let u=new L(l,2.85,c).clone().sub(o),d=u.length(),f=new Et(new ve(.012,.012,d,3),s);f.position.copy(o).addScaledVector(u,.5),f.quaternion.setFromUnitVectors(a,u.normalize()),e.add(f)}return e}var bs=.4,g_=new L,Qe=new L,Di=new L,Ei=new L,Ms=new L,ne={},pr={bodyGeo:new ve(.06,.06,.5,8).rotateX(Math.PI/2),bodyMat:new re({color:9080726,metalness:.5}),noseGeo:new Gr(.06,.18,8).rotateX(-Math.PI/2),noseMat:new re({color:12597547}),boltGeo:new ve(.012,.012,.6,4).rotateX(Math.PI/2),boltMat:new se({color:14540253})};function kf(r,t,e,i,n,s,o,a){let l=a.pos.y+a.height,c=a.pos.x,h=a.pos.z,u=r-c,d=e-h,f=i*i+s*s,g;if(f<1e-8)return u*u+d*d>bs*bs||(g=n<0?(l-t)/n:(a.pos.y-t)/n,g<0||g>o)?null:{t:g,head:n<0};let x=u*i+d*s,m=u*u+d*d-bs*bs,p=x*x-f*m;if(p<0)return null;let y=Math.sqrt(p);if(g=(-x-y)/f,g<0)if(m<0)g=0;else return null;if(g>o)return null;let M=t+n*g;if(M<a.pos.y-.05||M>l+.05){if(n<0&&t>l){let v=(l-t)/n;if(v>=0&&v<=o){let S=r+i*v-c,T=e+s*v-h;if(S*S+T*T<bs*bs)return{t:v,head:!0}}}return null}let _=M>l-.33;if(_){let v=r+i*g-c,S=e+s*g-h;if(v*v+S*S>.27*.27)return{t:g,head:!1}}return{t:g,head:_}}function x_(r,t){let[e,i,n]=r.falloff;return t<=e?1:t>=i?n:1+(n-1)*((t-e)/(i-e))}var Zl=class{constructor(t){this.game=t,this.projectiles=[],this.scratch={}}spreadFor(t,e){let i=e.spread*(t.ads?e.adsSpread:1),n=Math.hypot(t.vel.x,t.vel.z);return n>1&&(i*=1+Math.min(n,9)*.07),!t.grounded&&!t.swimming&&(i*=1.9),t.crouching&&(i*=.75),i+=t.bloom*(t.ads?.4:1)*.7,i}fireGun(t,e){let i=this.game,n=e.def,s=Ef(e);t.lastShotT=i.time;let o=t.aimOrigin,a=t.aimDir,l=t.muzzlePos(Di),h=(this.spreadFor(t,n)+(t.extraSpread||0))*Math.PI/180,u=n.pellets>1;if(n.projectile)this.fireProjectile(t,e,l,a,h,s);else{let d=0,f=0,g=new Map;for(let x=0;x<n.pellets;x++){let m=this.perturb(a,h,u,Qe),p=this.trace(t,o,m,n.range),y=p?p.point:Ms.set(o.x+m.x*n.range,o.y+m.y*n.range,o.z+m.z*n.range);if(d<(n.pellets>1?3:1)&&i.shouldDrawTracer(t,y)&&(i.fx.tracer(l,y,n.tracer,n.pellets>1?.7:1,n.cat==="sniper"?700:420),d++),p)if(p.char){let M=x_(n,p.t),_=s*M*(p.head?n.headshot:1),v=g.get(p.char)||{dmg:0,head:!1};v.dmg+=_,v.head=v.head||p.head,g.set(p.char,v),i.fx.hit(p.point),t.stats.hits++}else f<3&&(i.fx.impact(p.point,p.normal,p.terrain?"terrain":"rock"),f++)}for(let[x,m]of g)Ei.set(a.x,0,a.z).normalize(),x.takeDamage(m.dmg,t,{headshot:m.head,weapon:n,dir:Ei.clone(),pos:x.pos}),t.stats.damage+=m.dmg}i.fx.muzzle(l,a,n.cat==="shotgun"||n.cat==="launcher"?1.6:1),i.audio.play("gun:"+n.sound,t.pos,{max:Math.max(80,n.noise*2.2),vol:t.isPlayer?.8:1}),i.noise(t.pos,n.noise,t)}perturb(t,e,i,n){if(e<1e-5)return n.copy(t);let s=Math.random()*Math.PI*2,o=Math.sqrt(Math.random())*e;n.copy(t);let a=Math.abs(t.y)>.95?Ei.set(1,0,0):Ei.set(0,1,0),l=new L().crossVectors(t,a).normalize(),c=new L().crossVectors(l,t);return n.addScaledVector(l,Math.cos(s)*o).addScaledVector(c,Math.sin(s)*o).normalize(),n}trace(t,e,i,n,s=null){let o=this.game,a=o.world.collision,l=n,c=null,h=a.raycast(e.x,e.y,e.z,i.x,i.y,i.z,n,ne);h>=0&&(l=h,c={t:h,point:new L(ne.x,ne.y,ne.z),normal:new L(ne.nx,ne.ny,ne.nz),char:null,head:!1,terrain:ne.kind===0});let u=o.chars;for(let d=0;d<u.length;d++){let f=u[d];if(f===t||f===s||!f.alive||f.mode==="bus")continue;let g=f.pos.x-e.x,x=f.pos.z-e.z;if(g*g+x*x>(l+1)*(l+1))continue;let m=kf(e.x,e.y,e.z,i.x,i.y,i.z,l,f);m&&m.t<l&&(l=m.t,c={t:m.t,point:new L(e.x+i.x*m.t,e.y+i.y*m.t,e.z+i.z*m.t),normal:new L(-i.x,.2,-i.z),char:f,head:m.head,terrain:!1})}return c}fireProjectile(t,e,i,n,s,o){let a=e.def,l=a.projectile,c=this.perturb(n,s,!1,new L),h=this.trace(t,t.aimOrigin,c,400),u=h?h.point:Ms.set(t.aimOrigin.x+c.x*400,t.aimOrigin.y+c.y*400,t.aimOrigin.z+c.z*400),d=new L(u.x-i.x,u.y-i.y,u.z-i.z).normalize();if(l.gravity>5){let f=Math.hypot(u.x-i.x,u.z-i.z);d.y+=.5*l.gravity*(f/l.speed)/l.speed,d.normalize()}this.spawn({kind:l.kind,owner:t,dmg:o,radius:l.radius,speed:l.speed,gravity:l.gravity,fuse:l.fuse,bounce:l.bounce||0,pos:i.clone(),vel:d.multiplyScalar(l.speed),def:a,explode:l.kind!=="bolt"})}throwItem(t,e){let i=e.def,n=-Math.sin(t.yaw),s=-Math.cos(t.yaw),o=new L(t.pos.x+n*.4,t.pos.y+1.5,t.pos.z+s*.4),a=i.throwSpeed,l=i.gravity,c=this.trace(t,t.aimOrigin,t.aimDir,80),h=new L,u=!1;if(c){let f=c.point.x-o.x,g=c.point.z-o.z,x=c.point.y+.3-o.y,m=Math.hypot(f,g);if(m>1.2){let p=Math.min(a,Math.max(8,Math.sqrt(l*m/.92))),y=p**4-l*(l*m*m+2*x*p*p);y<0&&(p=a,y=p**4-l*(l*m*m+2*x*p*p));let M=y<0?Math.PI/4:Math.atan2(p*p-Math.sqrt(y),l*m);a=p,h.set(f/m*Math.cos(M),Math.sin(M),g/m*Math.cos(M)),u=!0}}u||(h.copy(t.aimDir),h.y+=.18,h.normalize());let d=h.multiplyScalar(a).add(new L(t.vel.x*.4,0,t.vel.z*.4));this.spawn({kind:"throw",owner:t,dmg:i.dmg,radius:i.radius,gravity:l,fuse:i.fuse,bounce:i.bounce,pos:o,vel:d,def:i,explode:!0}),this.game.audio.play("swing",t.pos,{max:40,vol:.6}),this.game.noise(t.pos,i.noise,t)}spawn(t){let e=this.game;if(t.t=0,t.rest=!1,t.spin=new L(Math.random()*8,Math.random()*8,Math.random()*8),t.kind==="rocket"){let i=new kt,n=new Et(pr.bodyGeo,pr.bodyMat),s=new Et(pr.noseGeo,pr.noseMat);s.position.z=-.33,i.add(n,s),t.mesh=i}else if(t.kind==="bolt")t.mesh=new Et(pr.boltGeo,pr.boltMat);else{let i=vs(t.def.model?t.def.id:"frag");i.scale.setScalar(t.kind==="grenade"?1.4:1.6),t.mesh=i,t.kind==="grenade"&&(t.mesh=vs("frag"),t.mesh.scale.setScalar(1.3))}t.mesh.position.copy(t.pos),e.scene.add(t.mesh),this.projectiles.push(t)}update(t){let e=this.game,i=e.world.collision;for(let n=this.projectiles.length-1;n>=0;n--){let s=this.projectiles[n];s.t+=t;let o=!1;if(!s.rest){s.vel.y-=(s.gravity||0)*t;let a=s.vel.length()*t;if(a>0){Qe.copy(s.vel).normalize();let l=i.raycast(s.pos.x,s.pos.y,s.pos.z,Qe.x,Qe.y,Qe.z,a+.12,ne),c=null;if(s.kind==="rocket"||s.kind==="bolt"||s.kind==="grenade")for(let h of e.chars){if(!h.alive||h===s.owner&&s.t<.15||h.mode==="bus")continue;let u=kf(s.pos.x,s.pos.y,s.pos.z,Qe.x,Qe.y,Qe.z,l>=0?l:a,h);u&&(l<0||u.t<l)&&(l=u.t,c={c:h,head:u.head})}if(l>=0){let h=s.pos.x+Qe.x*l,u=s.pos.y+Qe.y*l,d=s.pos.z+Qe.z*l;if(s.kind==="rocket"||s.kind==="grenade"&&c)s.pos.set(h,u,d),this.explode(s.pos,s),o=!0;else if(s.kind==="bolt")c?(c.c.takeDamage(s.dmg*1*(c.head?s.def.headshot:1),s.owner,{headshot:c.head,weapon:s.def,dir:Qe.clone().setY(0).normalize(),pos:c.c.pos}),e.fx.hit(Ms.set(h,u,d)),s.owner.stats.damage+=s.dmg,s.owner.stats.hits++):e.fx.impact(Ms.set(h,u,d),Ei.set(ne.nx,ne.ny,ne.nz),ne.kind===0?"terrain":"rock"),o=!0;else{let f=ne.nx,g=ne.ny,x=ne.nz,m=s.vel.x*f+s.vel.y*g+s.vel.z*x,p=s.bounce||.4;s.vel.x-=(1+p)*m*f,s.vel.y-=(1+p)*m*g,s.vel.z-=(1+p)*m*x;let M=g>.5?.4:.8;s.vel.x*=M,s.vel.z*=M,s.pos.set(h+f*.06,u+g*.06,d+x*.06),s.vel.length()<2.4&&g>.5&&(s.rest=!0,s.vel.set(0,0,0))}}else s.pos.addScaledVector(Qe,a)}s.kind==="rocket"&&e.fx.smokeTrail(s.pos)}if(!o&&s.fuse!=null&&s.t>=s.fuse&&(s.explode&&this.explode(s.pos,s),o=!0),o){e.scene.remove(s.mesh),this.projectiles.splice(n,1);continue}s.mesh.position.copy(s.pos),s.kind==="rocket"||s.kind==="bolt"?s.mesh.lookAt(s.pos.x+s.vel.x,s.pos.y+s.vel.y,s.pos.z+s.vel.z):s.rest||(s.mesh.rotation.x+=s.spin.x*t,s.mesh.rotation.z+=s.spin.z*t),s.kind==="throw"&&s.fuse-s.t<.6&&Math.floor(s.t*12)%2===0?s.mesh.scale.setScalar(1.9):s.kind==="throw"&&s.mesh.scale.setScalar(1.6)}}explode(t,e){let i=this.game,n=e.def,s=n.id==="impulse"?"impulse":n.id==="boogie"?"boogie":"fire",o=e.radius;i.fx.explosion(t,o,s),i.audio.play(s==="impulse"?"impulse":s==="boogie"?"boogie":"explosion",t,{max:s==="fire"?400:150}),i.noise(t,s==="fire"?220:90,e.owner),i.explosionShake(t,o);let a=n.impulse??11;for(let l of i.chars){if(!l.alive||l.mode==="bus")continue;let c=l.pos.y+.9,h=l.pos.x-t.x,u=c-t.y,d=l.pos.z-t.z,f=Math.hypot(h,u,d);if(f>o+.6||f>1.2&&!i.world.collision.clearLine(t.x,t.y+.3,t.z,l.pos.x,c,l.pos.z))continue;let g=Re(1-f/(o+.6),.05,1);if(e.dmg>0){let x=l===e.owner?.5:1;Ei.set(h,0,d).normalize(),l.takeDamage(e.dmg*g*x*(s==="fire"?1:0),e.owner,{weapon:n,explosive:!0,dir:Ei.clone(),pos:l.pos}),e.owner&&l!==e.owner&&(e.owner.stats.damage+=e.dmg*g)}if(n.dance&&(l.danceT=Math.max(l.danceT,n.dance),l.cancelUse?.()),l.alive&&l.mode!=="skydive"){Di.set(h,u,d),Di.lengthSq()<.01&&Di.set(0,1,0),Di.normalize(),Di.y=Math.max(Di.y,.35)+.25,Di.normalize();let x=s==="impulse"?a*(.45+.55*g):8*g+2;l.vel.x+=Di.x*x,l.vel.z+=Di.z*x,l.vel.y=Math.max(l.vel.y,0)+Di.y*x,Di.y*x>1.5&&(l.grounded=!1,l.swimming=!1,l.grapple=null),s==="impulse"&&(l.noFall=!1)}}}melee(t,e){let i=this.game,n=e.def,s=n.dmg*li[e.rarity].mult,o=-Math.sin(t.yaw),a=-Math.cos(t.yaw),l=0;for(let c of i.chars){if(c===t||!c.alive||c.mode==="bus")continue;let h=c.pos.x-t.pos.x,u=c.pos.z-t.pos.z,d=Math.hypot(h,u);if(!(d>n.range+bs||Math.abs(c.pos.y-t.pos.y)>2||(h*o+u*a)/Math.max(d,.001)<Math.cos(n.arc))&&i.world.collision.clearLine(t.pos.x,t.pos.y+1.2,t.pos.z,c.pos.x,c.pos.y+1.2,c.pos.z)&&(Ei.set(h,0,u).normalize(),c.takeDamage(s,t,{weapon:n,melee:!0,dir:Ei.clone(),pos:c.pos}),c.vel.x+=Ei.x*n.knock,c.vel.z+=Ei.z*n.knock,n.knock>5&&(c.vel.y+=3,c.grounded=!1),i.fx.hit(Ms.set(c.pos.x,c.pos.y+1.2,c.pos.z)),t.stats.damage+=s,t.stats.hits++,l++,l>=2))break}if(l)i.audio.play("melee_hit",t.pos,{max:60});else{let c=g_.set(t.pos.x,t.pos.y+1.2,t.pos.z);Qe.set(o,0,a),i.world.collision.raycast(c.x,c.y,c.z,Qe.x,Qe.y,Qe.z,n.range,ne)>=0&&(i.fx.impact(Ms.set(ne.x,ne.y,ne.z),Ei.set(ne.nx,ne.ny,ne.nz),"rock"),i.audio.play("melee_hit",t.pos,{max:40,vol:.5}))}i.noise(t.pos,25,t)}useGadget(t,e){let i=this.game,n=e.def;if(n.gadget==="grapple"){let s=t.aimOrigin,o=t.aimDir;if(i.world.collision.raycast(s.x,s.y,s.z,o.x,o.y,o.z,n.range+4,ne)<0){t.isPlayer&&i.hud?.toast("Nothing to grapple");return}t.grapple={x:ne.x,y:ne.y,z:ne.z,t:0},t.grounded=!1,t.vel.y=Math.max(t.vel.y,2),i.audio.play("grapple",t.pos,{max:80}),i.fx.impact(Ms.set(ne.x,ne.y,ne.z),Ei.set(ne.nx,ne.ny,ne.nz),"rock"),e.count--}else if(n.gadget==="launchpad"){let s=-Math.sin(t.yaw),o=-Math.cos(t.yaw),a=t.pos.x+s*2.2,l=t.pos.z+o*2.2,c=i.world.collision.groundAt(a,l,t.pos.y+.5,.6);i.addJumpPad({x:a,y:c,z:l,r:1.6,vy:21,vx:s*6,vz:o*6,expires:i.time+90}),i.audio.play("place",t.pos,{max:40}),e.count--}if(e.count<=0){let s=t.inv.slots.indexOf(e);s>0&&(t.inv.slots[s]=null),t.afterEmpty()}}};var Kn=24,Vh=(r,t)=>r*4096+t,Wh=new ve(.05,.16,3.4,8,1,!0);Wh.translate(0,1.7,0);var y_=new Vr(.6,20).rotateX(-Math.PI/2),Gh={},zf={};function Hf(r){return Gh[r]||(Gh[r]=new se({color:r,transparent:!0,opacity:.38,blending:Si,depthWrite:!1,side:Oe,fog:!1}),zf[r]=new se({color:r,transparent:!0,opacity:.45,blending:Si,depthWrite:!1,fog:!1})),[Gh[r],zf[r]]}var Jl=1.1,Kl=class{constructor(t){this.game=t,this.drops=[],this.chests=[],this.grid=new Map,this.nextId=1,this.visualRadius=110,this.group=new kt,this.group.name="loot",t.scene.add(this.group),this.hum=0}clear(){for(let t of this.drops)t.mesh&&this.group.remove(t.mesh);for(let t of this.chests)t.mesh&&this.group.remove(t.mesh),t.beam&&this.group.remove(t.beam);this.drops=[],this.chests=[],this.grid.clear()}populate(){let t=this.game.world,e=jt(9090);for(let s of t.chestSpots){let o=Ge[s.poi];this.chests.push({x:s.x,y:s.y,z:s.z,yaw:s.yaw||0,bias:o?.bias||{},focus:s.tag||null,opened:!1,progress:0,mesh:null,lidT:0,elevated:s.y-t.terrain.height(s.x,s.z)>2.2,poi:s.poi})}for(let s of t.lootSpots){let o=Ge[s.poi],a=s.tag==="floorange"?1:.7;if(e()>a)continue;let l=jn({bias:o?.bias||{},focus:s.tag});this.spawnEntry(l,s.x,s.y,s.z,{elevated:s.elevated})}let i=0,n=0;for(;i<150&&n++<3e3;){let s=e()*Math.PI*2,o=Math.sqrt(e())*(Ot.islandR-30),a=Math.cos(s)*o,l=Math.sin(s)*o,c=t.terrain.height(a,l);if(c<1.5)continue;let h=jn({});this.spawnEntry(h,a,c,l,{}),i++}for(i=0,n=0;i<14&&n++<3e3;){let s=e()*Math.PI*2,o=Math.sqrt(e())*(Ot.islandR-60),a=Math.cos(s)*o,l=Math.sin(s)*o,c=t.terrain.height(a,l);c<2||t.terrain.slope(a,l)>.4||(this.chests.push({x:a,y:c,z:l,yaw:e()*6.28,bias:{},focus:null,opened:!1,progress:0,mesh:null,lidT:0,elevated:!1,poi:null}),i++)}}spawnEntry(t,e,i,n,s={}){if(t.ammo)return this.addDrop({ammo:t.ammo,count:t.count},e,i,n,s);let o=Jn(t.id,t.rarity,t.count);return this.addDrop({stack:o,count:o.count},e,i,n,s)}addDrop(t,e,i,n,s={}){let o={id:this.nextId++,...t,pos:new L(e,i,n),vel:new L(s.vx||0,s.vy||0,s.vz||0),settled:!s.pop,elevated:!!s.elevated,mesh:null,born:this.game.time,ignore:s.ignore||null,ignoreT:s.ignoreT||0,cell:null,dead:!1};return this.drops.push(o),this.cellAdd(o),o}cellAdd(t){let e=Vh(Math.floor(t.pos.x/Kn),Math.floor(t.pos.z/Kn)),i=this.grid.get(e);i||(i=new Set,this.grid.set(e,i)),i.add(t),t.cell=e}cellRemove(t){let e=this.grid.get(t.cell);e&&e.delete(t)}dropStack(t,e,i,n=!1){if(!t)return;let s=Math.random()*Math.PI*2,o=Math.cos(s)*2,a=Math.sin(s)*2;return n&&i&&(o=-Math.sin(i.yaw)*3.5,a=-Math.cos(i.yaw)*3.5),this.addDrop({stack:t,count:t.count},e.x,e.y+1,e.z,{pop:!0,vx:o,vy:4,vz:a,ignore:i,ignoreT:1.2})}dropAmmo(t,e,i){let n=Math.random()*Math.PI*2;return this.addDrop({ammo:t,count:e},i.x,i.y+1,i.z,{pop:!0,vx:Math.cos(n)*2.5,vy:4,vz:Math.sin(n)*2.5})}dropAll(t){for(let e=1;e<t.inv.slots.length;e++){let i=t.inv.slots[e];i&&(this.dropStack(i,t.pos,null),t.inv.slots[e]=null)}for(let[e,i]of Object.entries(t.inv.ammo)){let n=i;for(;n>0;){let s=Math.min(n,fi[e].pack);this.dropAmmo(e,s,t.pos),n-=s}t.inv.ammo[e]=0}}nearbyDrops(t,e,i,n=[]){let s=Math.floor((t-i)/Kn),o=Math.floor((t+i)/Kn),a=Math.floor((e-i)/Kn),l=Math.floor((e+i)/Kn);for(let c=s;c<=o;c++)for(let h=a;h<=l;h++){let u=this.grid.get(Vh(c,h));if(u)for(let d of u)!d.dead&&(d.pos.x-t)**2+(d.pos.z-e)**2<=i*i&&n.push(d)}return n}nearestChest(t,e,i,n=null){let s=null,o=i*i;for(let a of this.chests){if(a.opened)continue;let l=a.x-t,c=a.z-e,h=l*l+c*c;h<o&&(n===null||Math.abs(a.y-n)<2.2)&&(o=h,s=a)}return s}canTake(t,e){return e.dead||e.ignore===t&&this.game.time-e.born<e.ignoreT?!1:e.ammo?t.inv.ammo[e.ammo]<fi[e.ammo].max:!0}take(t,e){if(!this.canTake(t,e)||!t.pickup(e))return!1;let n=e.ammo?e.count<=0:e.count===0||e.stack.count<=0;if(t.isPlayer){this.game.audio.play(e.ammo?"ammo":"pickup",null);let s=e.ammo?fi[e.ammo].name:e.stack.def.name;this.game.hud?.pickupToast(s,e.ammo?0:e.stack.rarity,!!e.ammo,e.ammo?"":e.stack.def.desc||"")}return n?this.removeDrop(e):e.mesh&&(e.mesh.userData.dirty=!0),!0}removeDrop(t){t.dead=!0,this.cellRemove(t),t.mesh&&(this.group.remove(t.mesh),t.mesh=null);let e=this.drops.indexOf(t);e>=0&&this.drops.splice(e,1)}work(t,e,i){return t.opened?!1:(t.progress+=i,t.lastWork=this.game.time,t.progress>=Jl?(this.open(t,e),!0):!1)}open(t,e){let i=this.game;t.opened=!0,t.progress=Jl;let n=Rf(t.bias,t.focus),s=0;for(let o of n){let a=s++/n.length*Math.PI*2+Math.random(),l=1.8+Math.random()*1.2,c=o.ammo?{ammo:o.ammo,count:o.count}:(()=>{let h=Jn(o.id,o.rarity,o.count);return{stack:h,count:h.count}})();this.addDrop(c,t.x,t.y+.7,t.z,{pop:!0,vx:Math.cos(a)*l,vy:4.5,vz:Math.sin(a)*l,elevated:t.elevated})}i.fx.chestOpen(new L(t.x,t.y,t.z)),i.audio.play("chest",new L(t.x,t.y,t.z),{max:120}),i.noise(new L(t.x,t.y,t.z),35,e)}update(t,e,i){let n=this.game,s=n.world;for(let h of this.drops){if(h.settled)continue;h.vel.y-=22*t,h.pos.addScaledVector(h.vel,t);let u=s.collision.groundAt(h.pos.x,h.pos.z,h.pos.y+.3,.6)+.05;h.pos.y<=u&&h.vel.y<0&&(h.pos.y=u,h.vel.y<-3?(h.vel.y*=-.35,h.vel.x*=.6,h.vel.z*=.6):(h.vel.set(0,0,0),h.settled=!0,h.elevated=h.pos.y-s.terrain.height(h.pos.x,h.pos.z)>2.2)),jl.copy(h.pos),s.collision.resolve(jl,.2,.3,.1)&&(h.pos.x=jl.x,h.pos.z=jl.z,h.vel.x*=.5,h.vel.z*=.5),h.cell!==Vh(Math.floor(h.pos.x/Kn),Math.floor(h.pos.z/Kn))&&(this.cellRemove(h),this.cellAdd(h)),h.mesh&&h.mesh.position.copy(h.pos)}let o=this.visualRadius,a=o*o,l=(o+25)*(o+25),c=6;for(let h of this.drops){let u=h.pos.x-e.x,d=h.pos.z-e.z,f=u*u+d*d;if(h.mesh){if(f>l){this.group.remove(h.mesh),h.mesh=null;continue}let g=h.mesh;g.userData.model.rotation.y+=t*1.4,g.userData.model.position.y=.6+Math.sin(i*2+h.id)*.08,g.position.copy(h.pos)}else f<a&&c>0&&(h.mesh=this.makeDropMesh(h),h.mesh.position.copy(h.pos),this.group.add(h.mesh),c--)}for(let h of this.chests){let u=h.x-e.x,d=h.z-e.z,f=u*u+d*d;if(h.mesh){if(f>(o+40)**2){this.group.remove(h.mesh),h.mesh=null;continue}let g=h.opened?-1.95:0;h.lidT+=(g-h.lidT)*Math.min(1,t*8),h.mesh.userData.lid.rotation.x=h.lidT,h.mesh.userData.glow.visible=!h.opened,h.beam&&(h.beam.visible=!h.opened),!h.opened&&h.progress>0&&i-(h.lastWork||0)>.3&&(h.progress=Math.max(0,h.progress-t*2)),h.opened||(h.mesh.userData.lid.rotation.x=-h.progress*.25)}else if(f<(o+30)**2&&c>0){h.mesh=Ff(),h.mesh.position.set(h.x,h.y,h.z),h.mesh.rotation.y=h.yaw;let[g]=Hf(16765503);h.beam=new Et(Wh,g),h.beam.scale.set(1.5,1.4,1.5),h.beam.position.set(h.x,h.y,h.z),this.group.add(h.mesh,h.beam),h.mesh.userData.beam=h.beam,h.mesh.traverse(x=>{x.isMesh&&(x.castShadow=!1)}),c--}h.mesh&&h.beam&&!h.beam.parent&&this.group.add(h.beam),h.mesh===null&&h.beam&&(this.group.remove(h.beam),h.beam=null)}if(this.hum-=t,this.hum<=0){this.hum=1.6;let h=n.player;if(h&&h.alive&&h.mode==="normal"){let u=this.nearestChest(h.pos.x,h.pos.z,22,h.pos.y);u&&n.audio.play("chest_hum",{x:u.x,y:u.y,z:u.z},{max:30,vol:.9})}}}makeDropMesh(t){let e=new kt,i=new kt,n,s;if(t.ammo)s=Uf(t.ammo),s.scale.setScalar(2),n=new It(fi[t.ammo].color).getHex();else{let h=t.stack.def;s=vs(h.id);let u=h.kind==="gun"?1.5:h.kind==="melee"?1.1:h.kind==="gadget"?2.2:2.6;s.scale.setScalar(u),(h.kind==="gun"||h.kind==="melee")&&(s.rotation.y=Math.PI/2),n=new It(li[t.stack.rarity].color).getHex()}i.add(s),i.position.y=.6,e.add(i);let[o,a]=Hf(n),l=new Et(Wh,o),c=new Et(y_,a);return c.position.y=.04,e.add(l,c),e.userData.model=i,i.traverse(h=>{h.isMesh&&(h.castShadow=!1)}),e}},jl=new L;var mr=[{wait:100,shrink:70,r:640,dmg:1},{wait:65,shrink:55,r:400,dmg:1.5},{wait:55,shrink:50,r:250,dmg:3},{wait:42,shrink:42,r:140,dmg:5},{wait:28,shrink:35,r:70,dmg:8},{wait:20,shrink:30,r:25,dmg:10},{wait:14,shrink:25,r:0,dmg:14}],Ql=class{constructor(t){this.game=t,this.active=!1,this.cx=0,this.cz=0,this.r=1500,this.nx=0,this.nz=0,this.nr=640,this.sx=0,this.sz=0,this.sr=1500,this.phase=-1,this.state="idle",this.t=0,this.dmg=0;let e=document.createElement("canvas");e.width=256,e.height=128;let i=e.getContext("2d"),n=i.createLinearGradient(0,0,256,0);for(let o=0;o<=8;o++)n.addColorStop(o/8,o%2?"rgba(190,90,255,0.95)":"rgba(110,40,200,0.55)");i.fillStyle=n,i.fillRect(0,0,256,128);let s=new wn(e);s.wrapS=s.wrapT=Mn,s.colorSpace=Ie,this.tex=s,this.wall=new Et(new ve(1,1,700,96,1,!0),new se({map:s,transparent:!0,opacity:.42,side:Oe,depthWrite:!1,fog:!0,blending:an})),this.wall.position.y=200,this.wall.renderOrder=4,this.wall.frustumCulled=!1,this.next=new Et(new ve(1,1,500,96,1,!0),new se({color:9425151,transparent:!0,opacity:.12,side:Oe,depthWrite:!1,fog:!1})),this.next.position.y=150,this.next.frustumCulled=!1,this.next.renderOrder=4,t.scene.add(this.wall,this.next),this.wall.visible=this.next.visible=!1,this.warned=-1}start(){this.active=!0,this.phase=-1,this.cx=0,this.cz=0,this.r=1500,this.sx=0,this.sz=0,this.sr=1500,this.nextPhase(),this.wall.visible=this.next.visible=!0}stop(){this.active=!1,this.wall.visible=this.next.visible=!1}nextPhase(){if(this.phase++,this.phase>=mr.length){this.state="done";return}let t=mr[this.phase];this.sx=this.cx,this.sz=this.cz,this.sr=this.r,this.nr=t.r;let e=null;for(let i=0;i<30;i++){let n=Math.random()*Math.PI*2,s=Math.max(0,this.sr-this.nr)*(this.phase===0?.55:.8),o=Math.sqrt(Math.random())*s,a=this.sx+Math.cos(n)*o,l=this.sz+Math.sin(n)*o,c=this.game.world.terrain.height(a,l);if(!(this.phase===0&&Math.hypot(a,l)>300)&&(c>2||i===29)&&(e=[a,l],c>2))break}this.nx=e[0],this.nz=e[1],this.state="hold",this.t=t.wait,this.dmg=t.dmg,this.game.hud?.stormMessage(this.phase===0?"The first safe zone has been marked":"The safe zone has been updated")}get remaining(){return Math.max(0,this.t)}update(t,e){if(!this.active)return;let i=mr[this.phase];if(this.state==="hold")this.t-=t,this.t<=0&&(this.state="shrink",this.t=i.shrink,this.game.audio.play("storm_warn",null),this.game.hud?.stormMessage("The storm is closing in!"));else if(this.state==="shrink"){this.t-=t;let c=1-Math.max(0,this.t)/i.shrink,h=c*c*(3-2*c);this.cx=Ve(this.sx,this.nx,h),this.cz=Ve(this.sz,this.nz,h),this.r=Ve(this.sr,this.nr,h),this.t<=0&&(this.cx=this.nx,this.cz=this.nz,this.r=this.nr,this.nextPhase())}let n=this.state==="done"?14:mr[Math.min(this.phase,mr.length-1)].dmg;this.dmg=n;for(let c of this.game.chars)if(!(!c.alive||c.mode==="bus"))if(this.inside(c.pos.x,c.pos.z))c.inStorm=!1;else{if(c.stormAcc=(c.stormAcc||0)+n*t,c.stormAcc>=1){let h=Math.floor(c.stormAcc);c.stormAcc-=h,c.takeDamage(h,null,{type:"storm"})}c.inStorm=!0}let s=this.game.camera.position,o=Math.abs(this.r-Math.hypot(s.x-this.cx,s.z-this.cz));this.wall.visible=o<850;let a=Math.max(this.r,.5);this.wall.scale.set(a,1,a),this.wall.position.x=this.cx,this.wall.position.z=this.cz,this.tex.repeat.set(Math.max(2,a/14),1),this.tex.offset.y=e*.05%1,this.tex.offset.x=e*.02%1;let l=Math.max(this.nr,.5);this.next.scale.set(l,1,l),this.next.position.x=this.nx,this.next.position.z=this.nz,this.next.visible=this.state!=="done"&&this.nr>1}inside(t,e){let i=t-this.cx,n=e-this.cz;return i*i+n*n<=this.r*this.r}edgeDistance(t,e){return this.r-Math.hypot(t-this.cx,e-this.cz)}};var Vf=330,tc=class{constructor(t){this.game=t,this.group=new kt,this.buildModel(),t.scene.add(this.group),this.group.visible=!1,this.pos=new L,this.dir=new L(1,0,0),this.speed=52,this.t=0,this.active=!1,this.start=new L,this.end=new L,this.length=2400}buildModel(){let t=this.group,e=(s,o,a,l,c,h,u,d={})=>{let f=new Et(new ri(s,o,a),_s(l,{metal:.2,rough:.5,...d}));return f.position.set(c,h,u),f.castShadow=!0,t.add(f),f};e(5.2,3.2,14,3108824,0,0,0),e(5.4,.6,14.2,16053492,0,1.9,0),e(5,.4,3.2,1916794,0,0,-7.4);for(let s=0;s<4;s++)e(.1,1.2,1.7,10475775,2.62,.5,-4.6+s*3.1,{emissive:4892927,emissiveIntensity:.4}),e(.1,1.2,1.7,10475775,-2.62,.5,-4.6+s*3.1,{emissive:4892927,emissiveIntensity:.4});e(4.6,1.5,.1,10475775,0,.5,-7.05,{emissive:4892927,emissiveIntensity:.4});for(let s of[-2.7,2.7])for(let o of[-4.5,4.5]){let a=new Et(new ve(.9,.9,.7,12).rotateZ(Math.PI/2),_s(1710618));a.position.set(s,-1.7,o),t.add(a)}let i=new Et(new Ci(9,20,14),new re({color:16732013,roughness:.5}));i.position.y=21,i.scale.set(1,1.15,1),i.castShadow=!0,t.add(i);for(let s=0;s<6;s++){let o=new Et(new Ci(9.05,20,14,s/6*Math.PI*2,Math.PI/6),new re({color:s%2?16773544:3523839,roughness:.5}));o.position.y=21,o.scale.set(1,1.15,1),t.add(o)}let n=new se({color:2236962});for(let[s,o]of[[-2.4,-6],[2.4,-6],[-2.4,6],[2.4,6]]){let a=new L(s,1.8,o),c=new L(s*1.6,13,o*.8).clone().sub(a),h=new Et(new ve(.06,.06,c.length(),4),n);h.position.copy(a).addScaledVector(c,.5),h.quaternion.setFromUnitVectors(new L(0,1,0),c.normalize()),t.add(h)}t.scale.setScalar(1.25)}launch(){let t=Math.random()*Math.PI*2;this.dir.set(Math.cos(t),0,Math.sin(t));let e=(Math.random()-.5)*520,n=new L(-this.dir.z,0,this.dir.x).multiplyScalar(e);this.start.copy(n).addScaledVector(this.dir,-this.length/2),this.end.copy(n).addScaledVector(this.dir,this.length/2),this.start.y=this.end.y=Vf,this.pos.copy(this.start),this.t=0,this.active=!0,this.group.visible=!0,this.group.rotation.y=Math.atan2(-this.dir.x,-this.dir.z)}get progress(){return this.t*this.speed/this.length}update(t){this.active&&(this.t+=t,this.pos.copy(this.start).addScaledVector(this.dir,this.t*this.speed),this.group.position.copy(this.pos),this.group.position.y+=0,this.group.position.y=this.pos.y+Math.sin(this.t*1.3)*.3,this.t*this.speed>=this.length&&(this.active=!1,this.group.visible=!1))}lateralDistance(t,e){let i=t-this.start.x,n=e-this.start.z,s=i*this.dir.x+n*this.dir.z;return Math.abs(i*-this.dir.z+n*this.dir.x)*(s>-200&&s<this.length+200?1:3)}closestOnRoute(t,e,i){let n=t-this.start.x,s=e-this.start.z,o=Math.max(0,Math.min(this.length,n*this.dir.x+s*this.dir.z));return i.set(this.start.x+this.dir.x*o,Vf,this.start.z+this.dir.z*o)}};var __={pistol:{n:.09,lp:3400,f:150,t:.08,g:.8},revolver:{n:.16,lp:2200,f:100,t:.14,g:1},cannon:{n:.24,lp:1800,f:70,t:.22,g:1.2},smg:{n:.07,lp:3e3,f:130,t:.06,g:.7},silenced:{n:.05,lp:5200,f:180,t:.03,g:.35},rifle:{n:.12,lp:2400,f:95,t:.1,g:.9},heavy:{n:.15,lp:1900,f:80,t:.13,g:1},lever:{n:.15,lp:2300,f:90,t:.12,g:1},shotgun:{n:.28,lp:1500,f:60,t:.22,g:1.25},sniper:{n:.38,lp:1700,f:55,t:.28,g:1.3,echo:!0},minigun:{n:.06,lp:2600,f:110,t:.05,g:.6},grenadel:{n:.14,lp:900,f:120,t:.2,g:.9}},ec=class{constructor(){this.ctx=null,this.volume=.6,this.listener={x:0,y:0,z:0,yaw:0},this.last={}}init(){if(this.ctx){this.ctx.state==="suspended"&&this.ctx.resume();return}let t=window.AudioContext||window.webkitAudioContext;if(!t)return;this.ctx=new t;let e=this.ctx;this.master=e.createGain(),this.master.gain.value=this.volume,this.comp=e.createDynamicsCompressor(),this.comp.threshold.value=-12,this.comp.ratio.value=6,this.master.connect(this.comp),this.comp.connect(e.destination);let i=e.sampleRate*2;this.noise=e.createBuffer(1,i,e.sampleRate);let n=this.noise.getChannelData(0);for(let s=0;s<i;s++)n[s]=Math.random()*2-1;this.wind=this._loop(900,0),this.storm=this._loop(220,0)}setVolume(t){this.volume=t,this.master&&(this.master.gain.value=t)}_loop(t,e){let i=this.ctx,n=i.createBufferSource();n.buffer=this.noise,n.loop=!0;let s=i.createBiquadFilter();s.type="bandpass",s.frequency.value=t,s.Q.value=.6;let o=i.createGain();return o.gain.value=e,n.connect(s),s.connect(o),o.connect(this.master),n.start(),{g:o,f:s}}setWind(t){this.ctx&&(this.wind.g.gain.setTargetAtTime(t*.35,this.ctx.currentTime,.15),this.wind.f.frequency.setTargetAtTime(500+t*1200,this.ctx.currentTime,.2))}setStorm(t){this.ctx&&(this.storm.g.gain.setTargetAtTime(t*.5,this.ctx.currentTime,.3),this.storm.f.frequency.setTargetAtTime(160+t*260,this.ctx.currentTime,.4))}setListener(t,e,i,n){let s=this.listener;s.x=t,s.y=e,s.z=i,s.yaw=n}_out(t,e=0){let i=this.ctx,n=i.createGain();n.gain.value=t;let s=n;if(i.createStereoPanner){let o=i.createStereoPanner();o.pan.value=Math.max(-1,Math.min(1,e)),n.connect(o),s=o}return s.connect(this.master),n}_noise(t,e,i,n,{hp:s=0,attack:o=.002,decayTo:a=1e-4,when:l=0,sweepTo:c=null}={}){let h=this.ctx,u=h.currentTime+l,d=h.createBufferSource();d.buffer=this.noise,d.loopStart=Math.random();let f=h.createBiquadFilter();f.type="lowpass",f.frequency.setValueAtTime(e,u),c&&f.frequency.exponentialRampToValueAtTime(c,u+t);let g=h.createGain();g.gain.setValueAtTime(1e-4,u),g.gain.exponentialRampToValueAtTime(i,u+o),g.gain.exponentialRampToValueAtTime(a,u+t),d.connect(f);let x=f;if(s){let m=h.createBiquadFilter();m.type="highpass",m.frequency.value=s,f.connect(m),x=m}x.connect(g),g.connect(n),d.start(u,Math.random()*1.5),d.stop(u+t+.05)}_tone(t,e,i,n,{type:s="sine",to:o=null,when:a=0,attack:l=.003}={}){let c=this.ctx,h=c.currentTime+a,u=c.createOscillator();u.type=s,u.frequency.setValueAtTime(t,h),o&&u.frequency.exponentialRampToValueAtTime(o,h+e);let d=c.createGain();d.gain.setValueAtTime(1e-4,h),d.gain.exponentialRampToValueAtTime(i,h+l),d.gain.exponentialRampToValueAtTime(1e-4,h+e),u.connect(d),d.connect(n),u.start(h),u.stop(h+e+.05)}_spatial(t,e=200){let i=this.listener,n=t.x-i.x,s=t.y-i.y,o=t.z-i.z,a=Math.hypot(n,s,o);if(a>e)return null;let l=1-a/e,c=l*l/(1+a*.015),h=Math.cos(i.yaw),u=-Math.sin(i.yaw),d=a>.5?(n*h+o*u)/a:0;return{vol:c,pan:d,d:a}}_throttle(t,e){let i=performance.now();return i-(this.last[t]||0)<e?!0:(this.last[t]=i,!1)}play(t,e=null,i={}){if(!this.ctx||this.ctx.state!=="running")return;let n=i.vol??1,s=0,o=0;if(e){let l=this._spatial(e,i.max??200);if(!l||(n*=l.vol,s=l.pan,o=l.d,n<.004))return}if(t.startsWith("gun:"))return this._gun(t.slice(4),n,s,o);let a=this._out(n*.9,s);switch(t){case"explosion":{this._noise(1.4,1600,1,a,{sweepTo:70,attack:.004}),this._tone(60,.8,1,a,{to:28}),this._noise(.25,6e3,.5,a,{hp:1e3});break}case"impulse":this._tone(220,.5,.7,a,{to:40}),this._noise(.4,1200,.5,a,{sweepTo:200}),this._tone(900,.3,.2,a,{to:2400,type:"triangle"});break;case"boogie":for(let l=0;l<6;l++)this._tone(500+l*140,.12,.25,a,{when:l*.07,type:"square"});break;case"swing":this._noise(.16,2400,.5,a,{attack:.04,sweepTo:600,hp:300});break;case"melee_hit":this._tone(140,.12,.9,a,{to:60}),this._noise(.08,3e3,.6,a);break;case"hit":this._tone(1500,.05,.5,a,{type:"triangle"});break;case"headshot":this._tone(2300,.09,.5,a,{type:"triangle"}),this._tone(3400,.14,.35,a,{when:.04,type:"triangle"});break;case"hurt":this._noise(.12,500,.9,a),this._tone(120,.15,.7,a,{to:60});break;case"shield_break":this._tone(1800,.3,.4,a,{to:300,type:"sawtooth"}),this._noise(.3,5e3,.3,a);break;case"pickup":this._tone(660,.07,.4,a,{type:"triangle"}),this._tone(990,.1,.4,a,{when:.06,type:"triangle"});break;case"ammo":this._noise(.05,4e3,.4,a),this._noise(.05,3e3,.4,a,{when:.07});break;case"chest":{this._noise(.5,800,.5,a,{sweepTo:200,attack:.1}),[523,659,784,1047,1319].forEach((l,c)=>this._tone(l,.35,.3,a,{when:.15+c*.07,type:"triangle"}));break}case"chest_hum":this._tone(1568,.5,.12,a,{type:"sine"}),this._tone(2093,.6,.08,a,{when:.12});break;case"step":this._noise(.07,i.lp??900,.5,a,{attack:.004});break;case"land":this._noise(.18,600,.9,a),this._tone(70,.15,.8,a,{to:40});break;case"jump":this._noise(.08,1200,.25,a,{hp:200});break;case"reload":this._noise(.04,5e3,.5,a),this._tone(300,.05,.4,a,{type:"square",when:.04}),this._noise(.05,4500,.6,a,{when:.55});break;case"equip":this._noise(.05,3500,.35,a),this._tone(420,.04,.25,a,{type:"square",when:.03});break;case"eat":for(let l=0;l<3;l++)this._noise(.07,2200,.5,a,{when:l*.22});break;case"drink":for(let l=0;l<4;l++)this._tone(200-l*20,.12,.4,a,{when:l*.25,to:120});break;case"heal":[523,659,784].forEach((l,c)=>this._tone(l,.25,.3,a,{when:c*.08,type:"triangle"}));break;case"shield":[784,988,1175,1568].forEach((l,c)=>this._tone(l,.3,.25,a,{when:c*.07,type:"sine"}));break;case"jumpple":[440,660,880,1320].forEach((l,c)=>this._tone(l,.12,.3,a,{when:c*.05,type:"square"}));break;case"floorange":this._tone(300,.35,.5,a,{to:1800,type:"triangle"}),this._noise(.3,6e3,.3,a,{hp:2e3});break;case"grapple":this._noise(.25,5e3,.5,a,{hp:1500,sweepTo:1500}),this._tone(1200,.2,.2,a,{to:400,type:"sawtooth"});break;case"launchpad":this._tone(180,.35,.7,a,{to:700,type:"sine"}),this._tone(360,.3,.3,a,{to:1400,type:"triangle"});break;case"place":this._tone(200,.12,.5,a,{to:90});break;case"glider":this._noise(.4,1600,.8,a,{attack:.02,hp:300}),this._tone(160,.2,.4,a,{to:80});break;case"bus":this._tone(90,1,.2,a,{type:"sawtooth",to:85});break;case"elim":this._tone(300,.5,.5,a,{to:90,type:"sawtooth"});break;case"win":[523,659,784,1047,784,1047,1319].forEach((l,c)=>this._tone(l,.28,.35,a,{when:c*.14,type:"triangle"}));break;case"storm_warn":this._tone(392,.5,.35,a,{type:"triangle"}),this._tone(330,.7,.35,a,{when:.35,type:"triangle"});break;case"click":this._tone(900,.03,.25,a,{type:"square"});break;case"dry":this._noise(.03,3e3,.35,a);break;default:break}}_gun(t,e,i,n){let s=__[t];if(t==="rocket"){let l=this._out(e,i);this._noise(.9,2500,.8,l,{sweepTo:300,attack:.05,hp:200}),this._tone(100,.4,.8,l,{to:40});return}if(t==="crossbow"){let l=this._out(e,i);this._tone(700,.18,.5,l,{to:160,type:"sawtooth"}),this._noise(.05,5e3,.4,l);return}if(!s)return;let o=this._out(e*s.g,i),a=s.lp*(n>60?Math.max(.35,1-(n-60)/400):1);if(this._noise(s.n,a,.9,o,{attack:.0015}),this._tone(s.f,s.t,.9,o,{to:s.f*.4}),s.echo&&n>20){let l=this._out(e*.35,i);this._noise(s.n*1.6,a*.6,.6,l,{when:Math.min(.9,n/340)})}}throttled(t,e){return this._throttle(t,e)}};var v_=()=>Math.min(window.devicePixelRatio||1,2),vo={low:{id:"low",label:"Low",pixelRatio:.75,shadowMap:0,shadowExtent:90,viewDistance:450,propDistance:360,shadowDistance:0,lodNear:170,lodMid:380,grassRadius:0,grassDensity:0,bushDensity:.35,detailNormals:!1,clouds:!1,envMap:!1,particles:.4,botDetailDistance:140},default:{id:"default",label:"Default",pixelRatio:1,shadowMap:2048,shadowExtent:100,viewDistance:800,propDistance:650,shadowDistance:120,lodNear:280,lodMid:650,grassRadius:48,grassDensity:.9,bushDensity:.75,detailNormals:!1,clouds:!0,envMap:!0,particles:.75,botDetailDistance:260},ultra:{id:"ultra",label:"Ultra",get pixelRatio(){return v_()},shadowMap:4096,shadowExtent:130,viewDistance:1400,propDistance:1150,shadowDistance:200,lodNear:420,lodMid:900,grassRadius:85,grassDensity:1.3,bushDensity:1,detailNormals:!0,clouds:!0,envMap:!0,particles:1,botDetailDistance:450}},Gf="shootnloot.settings.v1",M_={graphics:"default",sensitivity:1,volume:.6,fov:70,invertY:!1,showFps:!1,chosen:!1},te={...M_};function Wf(){try{let r=localStorage.getItem(Gf);r&&Object.assign(te,JSON.parse(r))}catch{}return vo[te.graphics]||(te.graphics="default"),te}function gr(){try{localStorage.setItem(Gf,JSON.stringify(te))}catch{}}var Xf=r=>`
  <div class="label">Graphics</div>
  <div class="seg" data-seg="graphics">
    ${Object.values(vo).map(t=>`<button data-g="${t.id}">${t.label}</button>`).join("")}
  </div>
  <div class="settings" style="margin-top:14px">
    <span>Mouse sensitivity</span><input type="range" min="0.2" max="3" step="0.05" data-s="sensitivity"><span class="v" data-v="sensitivity"></span>
    <span>Field of view</span><input type="range" min="60" max="100" step="1" data-s="fov"><span class="v" data-v="fov"></span>
    <span>Volume</span><input type="range" min="0" max="1" step="0.05" data-s="volume"><span class="v" data-v="volume"></span>
    <span>Invert Y</span><input type="checkbox" data-s="invertY"><span></span>
    <span>Show FPS</span><input type="checkbox" data-s="showFps"><span></span>
  </div>`,qf=`
  <div class="keys">
    <div><b>W A S D</b> move</div><div><b>Shift</b> sprint</div>
    <div><b>Space</b> jump / open glider</div><div><b>C</b> crouch</div>
    <div><b>LMB</b> fire / use item</div><div><b>RMB</b> aim down sights</div>
    <div><b>E</b> pick up \xB7 hold to open chests</div><div><b>R</b> reload</div>
    <div><b>1-6 / Wheel</b> switch item</div><div><b>G</b> drop item</div>
    <div><b>M / Tab</b> map</div><div><b>X</b> swap shoulder \xB7 <b>V</b> first person</div>
    <div><b>\u2190 \u2192 \u2191 \u2193</b> look (no mouse lock)</div><div><b>Esc</b> pause</div>
  </div>`,ic=class{constructor(t,e){this.game=t,this.root=e,e.innerHTML=`
    <div id="screen-loading" class="screen dim">
      <div class="title-wrap">
        <div class="logo">Shoot 'n' Loot<small>Battle Royale</small></div>
        <div class="loadbar"><div id="loadfill"></div></div>
        <div class="loadtxt" id="loadtxt">Loading\u2026</div>
      </div>
    </div>

    <div id="screen-title" class="screen dim hidden">
      <div class="title-wrap">
        <div class="logo">Shoot 'n' Loot<small>Battle Royale</small></div>
        <div class="tagline">50 PLAYERS \xB7 8 LOCATIONS \xB7 1 VICTORY ROYALE</div>
        <div class="tagline" style="font-size:12px;opacity:.65">Best on a desktop browser with keyboard and mouse</div>
        <div class="tagline" id="gfx-note" style="color:#7fe8ff"></div>
        <button class="btn" id="btn-play">Play</button>
        <div class="row" style="align-items:stretch">
          <div class="panel">${Xf("t")}</div>
          <div class="panel"><div class="label">Controls</div>${qf}</div>
        </div>
      </div>
    </div>

    <div id="screen-pause" class="screen dim hidden">
      <div class="title-wrap">
        <div class="logo" style="font-size:56px">Paused</div>
        <div class="row"><button class="btn" id="btn-resume">Resume</button><button class="btn alt" id="btn-quit">Leave match</button></div>
        <div class="row" style="align-items:stretch">
          <div class="panel">${Xf("p")}</div>
          <div class="panel"><div class="label">Controls</div>${qf}</div>
        </div>
      </div>
    </div>

    <div id="screen-result" class="screen dim hidden">
      <div class="result">
        <h1 id="res-title">Victory Royale</h1>
        <div id="res-sub" style="font-size:20px;opacity:.9"></div>
        <div class="stats" id="res-stats"></div>
        <div class="row">
          <button class="btn" id="btn-again">Play again</button>
          <button class="btn alt" id="btn-spec">Spectate</button>
          <button class="btn alt" id="btn-lobby">Lobby</button>
        </div>
      </div>
    </div>

    <div id="hud" class="hidden">
      <div class="vignette dmg" id="v-dmg"></div>
      <div class="vignette storm" id="v-storm"></div>
      <div class="vignette water" id="v-water"></div>
      <div class="scope" id="scope"></div>
      <div class="feed" id="feed"></div>
      <div class="storm" id="storm"><span class="chip" id="storm-chip"><span id="storm-txt"></span></span></div>
      <div class="topright">
        <div class="counters">
          <div class="chip"><span>\u{1F465} <span id="alive">50</span></span></div>
          <div class="chip"><span>\u2620 <span id="kills">0</span></span></div>
        </div>
        <div class="minimap"><canvas id="minimap" width="200" height="200"></canvas></div>
      </div>
      <div class="toasts" id="toasts"></div>
      <div class="crosshair" id="cross"><i class="h" style="left:-14px"></i><i class="h" style="left:5px"></i><i class="v" style="top:-14px"></i><i class="v" style="top:5px"></i><i class="dot"></i></div>
      <div class="hitmarker" id="hit"></div>
      <div class="prompt hidden" id="prompt"></div>
      <div class="castbar hidden" id="cast"><span id="cast-txt"></span><div class="pb"><div id="cast-fill"></div></div></div>
      <div class="pickups" id="pickups"></div>
      <div class="vitals">
        <div class="bar shield"><div id="shield-fill"></div><span id="shield-txt">0</span></div>
        <div class="bar hp"><div id="hp-fill"></div><span id="hp-txt">100</span></div>
      </div>
      <div class="hotbar" id="hotbar"></div>
      <div class="ammo" id="ammo"></div>
      <div class="busui hidden" id="busui"><div class="big">PRESS SPACE TO JUMP</div><div class="sm">Soar over the island \xB7 look for a landing spot (M for map)</div></div>
      <div class="fps hidden" id="fps"></div>
      <div id="floaters"></div>
      <div id="dirs"></div>
    </div>
    <div class="bigmap hidden" id="bigmap"><canvas id="bigmap-cv" width="1024" height="1024"></canvas><div class="hint">M or TAB to close</div></div>
    `,this.$=i=>e.querySelector(i),this.mm=this.$("#minimap").getContext("2d"),this.bm=this.$("#bigmap-cv").getContext("2d"),this.lastHot="",this.mmT=0,this.toastT=[],this.floaters=[],this.floatPool=[],this.dirs=[],this.mapOpen=!1,this.dmgA=0,this.fallA=0,this.elimTimer=0,this.fpsAcc=0,this.fpsN=0,this.bindMenus()}bindMenus(){let t=this.game,e=this.root;e.querySelectorAll("[data-seg=graphics]").forEach(i=>{i.addEventListener("click",n=>{let s=n.target.closest("button[data-g]");s&&(t.audio.init(),t.audio.play("click"),t.applyGraphics(s.dataset.g,!0),this.syncSettings())})}),e.querySelectorAll("input[data-s]").forEach(i=>{i.addEventListener("input",()=>{let n=i.dataset.s;te[n]=i.type==="checkbox"?i.checked:parseFloat(i.value),n==="volume"&&t.audio.setVolume(te.volume),n==="fov"&&(t.camera.fov=te.fov,t.camera.updateProjectionMatrix()),gr(),this.syncSettings()})}),this.$("#btn-play").addEventListener("click",()=>{t.audio.init(),t.audio.play("click"),t.startMatch()}),this.$("#btn-resume").addEventListener("click",()=>{t.audio.play("click"),t.resume()}),this.$("#btn-quit").addEventListener("click",()=>{t.audio.play("click"),t.returnToMenu()}),this.$("#btn-again").addEventListener("click",()=>{t.audio.play("click"),t.startMatch()}),this.$("#btn-lobby").addEventListener("click",()=>{t.audio.play("click"),t.returnToMenu()}),this.$("#btn-spec").addEventListener("click",()=>{t.audio.play("click"),this.show("result",!1),t.spectate()}),this.syncSettings()}syncSettings(){let t=this.root;t.querySelectorAll("[data-seg=graphics] button").forEach(e=>e.classList.toggle("on",e.dataset.g===te.graphics)),t.querySelectorAll("input[data-s]").forEach(e=>{let i=e.dataset.s;e.type==="checkbox"?e.checked=!!te[i]:e.value=te[i]}),t.querySelectorAll("[data-v]").forEach(e=>{let i=e.dataset.v;e.textContent=i==="volume"?Math.round(te[i]*100)+"%":i==="fov"?te[i]+"\xB0":te[i].toFixed(2)+"x"})}show(t,e){let i=this.$("#screen-"+t);i&&i.classList.toggle("hidden",!e)}loading(t,e){this.$("#loadfill").style.width=Math.round(e*100)+"%",this.$("#loadtxt").textContent=t}setNote(t){this.$("#gfx-note").textContent=t}showHud(t){this.$("#hud").classList.toggle("hidden",!t)}toast(t){let e=this.$("#toasts");if(e.lastChild&&e.lastChild.textContent===t)return;let i=document.createElement("div");for(i.textContent=t,e.appendChild(i),setTimeout(()=>i.remove(),2600);e.children.length>3;)e.firstChild.remove()}stormMessage(t){this.toast(t)}pickupToast(t,e,i,n=""){let s=this.$("#pickups"),o=document.createElement("div");if(o.textContent=t,n){let a=document.createElement("small");a.textContent=n,a.style.cssText="display:block;font-weight:600;opacity:.8;font-size:12px;max-width:260px",o.appendChild(a)}for(o.style.borderRightColor=i?"#ddd":li[e].css,s.appendChild(o),setTimeout(()=>o.remove(),n?3600:1800);s.children.length>4;)s.firstChild.remove()}feed(t,e=""){let i=this.$("#feed"),n=document.createElement("div");for(n.innerHTML=t,e&&(n.className=e),i.appendChild(n),setTimeout(()=>n.remove(),7e3);i.children.length>6;)i.firstChild.remove()}elimToast(t,e){let i=this.$(".elimtoast");i&&i.remove();let n=document.createElement("div");n.className="elimtoast",n.innerHTML=`ELIMINATED ${t}<small>${e} ${e===1?"elimination":"eliminations"}</small>`,this.$("#hud").appendChild(n),setTimeout(()=>n.remove(),2400)}hitmarker(t){let e=this.$("#hit");e.classList.remove("on","head"),e.offsetWidth,e.classList.add("on"),t&&e.classList.add("head")}flashDamage(t=.5){this.dmgA=Math.min(1,this.dmgA+t)}hitFrom(t){let e=this.game.camera,i=new L;e.getWorldDirection(i);let n=Math.atan2(t.x-e.position.x,-(t.z-e.position.z))-Math.atan2(i.x,-i.z),s=document.createElement("div");s.className="dirhit",s.style.transform=`rotate(${n}rad)`,s.style.opacity="1",s.style.transition="opacity 1.1s ease-out",this.$("#dirs").appendChild(s),requestAnimationFrame(()=>{s.style.opacity="0"}),setTimeout(()=>s.remove(),1200)}damageNumber(t,e,i){let n=this.floatPool.pop();n||(n=document.createElement("div"),n.className="dmgnum",this.$("#floaters").appendChild(n)),n.textContent=Math.round(e),n.style.color=i?"#ff4a4a":"#ffe14a",n.style.fontSize=i?"26px":"20px",n.style.display="block",this.floaters.push({el:n,pos:t.clone(),t:0,dx:(Math.random()-.5)*40})}setPrompt(t,e,i){let n=this.$("#prompt");if(!t){n.classList.add("hidden"),this.promptKey="";return}let s;if(t.type==="chest")s=`<span class="pk">E</span>Hold to open Chest<div class="pb"><div style="width:${Math.round(i*100)}%"></div></div>`;else{let o=t.d,a=o.ammo?`${fi[o.ammo].name} (${o.count})`:`${o.stack.def.name}${o.stack.count>1?" \xD7"+o.stack.count:""}`,l=o.ammo?"#ddd":li[o.stack.rarity].css;s=`<span class="pk">E</span>${!o.ammo&&e.inv.freeSlot()<0&&!["consume","throw","gadget"].includes(o.stack.def.kind)?"Swap":"Pick up"} <b style="color:${l}">${a}</b>${o.stack?` <span style="opacity:.7;font-size:13px">${li[o.stack.rarity].name}</span>`:""}`}s!==this.promptKey&&(n.innerHTML=s,this.promptKey=s),n.classList.remove("hidden")}toggleMap(){this.mapOpen=!this.mapOpen,this.$("#bigmap").classList.toggle("hidden",!this.mapOpen),this.mapOpen&&this.drawBigMap()}update(t,e){let i=this.game,n=i.player;if(!n)return;let s=i.state==="bus"||i.state==="playing"||i.state==="dead"||i.state==="ended";this.$("#alive").textContent=i.aliveCount,this.$("#kills").textContent=n.kills;let o=Math.max(0,Math.ceil(n.hp)),a=Math.max(0,Math.ceil(n.shield));this.$("#hp-fill").style.width=o+"%",this.$("#shield-fill").style.width=a+"%",this.$("#hp-txt").textContent=o,this.$("#shield-txt").textContent=a,this.$(".bar.hp").classList.toggle("low",o<=30);let l=i.storm,c=this.$("#storm-chip");if(l.active){let y=Math.ceil(l.remaining),M=Math.floor(y/60),_=String(y%60).padStart(2,"0"),v;l.state==="hold"?v=`\u26C8 Storm closes in ${M}:${_}`:l.state==="shrink"?v=`\u26C8 Storm shrinking ${M}:${_}`:v="\u26C8 Final circle",this.$("#storm-txt").textContent=v,c.classList.toggle("warn",l.state==="shrink"||!!n.inStorm),c.style.display="inline-block"}else c.style.display="none";this.dmgA=Math.max(0,this.dmgA-t*1.6),this.$("#v-dmg").style.opacity=this.dmgA,this.$("#v-storm").style.opacity=n.alive&&n.inStorm?.55+Math.sin(i.time*4)*.15:0,this.$("#v-water").style.opacity=i.camera.position.y<0?1:0,this.$("#scope").style.display=i.controller?.scoped?"block":"none",this.$("#busui").classList.toggle("hidden",!(i.state==="bus"&&n.mode==="bus"&&n.alive));let h=n.alive,u=h&&n.mode==="normal";if(this.$("#cross").style.display=u&&!i.controller?.scoped&&i.inputEnabled()?"block":"none",this.$("#hotbar").style.display=this.$(".vitals").style.display=h&&n.mode!=="bus"?"":"none",this.$("#ammo").style.display=u?"":"none",this.$(".vitals").style.display=h?"":"none",this.$("#hotbar").style.display=h?"":"none",u){let y=n.stack,M=3;y?.def.kind==="gun"&&(M=i.combat.spreadFor(n,y.def)+n.bloom*.3);let _=3+Math.min(40,M*4.5),v=this.$("#cross").children;v[0].style.left=-_-9+"px",v[1].style.left=_+"px",v[2].style.top=-_-9+"px",v[3].style.top=_+"px"}let d=this.$("#cast"),f=null,g=0;u&&n.using?(f=n.using.def.id==="bandage"||n.using.def.id==="medkit"?"Healing":n.using.def.airOnly?"Floorange\u2026":"Using "+n.using.def.name,g=n.using.t/n.using.dur):u&&n.reload&&(f="Reloading",g=n.reload.t/n.reload.dur),f?(d.classList.remove("hidden"),this.$("#cast-txt").textContent=f,this.$("#cast-fill").style.width=Math.round(g*100)+"%"):d.classList.add("hidden"),this.updateHotbar(n),this.mmT-=t,this.mmT<=0&&(this.mmT=.05,this.drawMinimap()),this.mapOpen&&(this.bmT=(this.bmT||0)-t,this.bmT<=0&&(this.bmT=.2,this.drawBigMap()));let x=i.camera,m=new L;for(let y=this.floaters.length-1;y>=0;y--){let M=this.floaters[y];if(M.t+=t,M.t>.9){M.el.style.display="none",this.floatPool.push(M.el),this.floaters.splice(y,1);continue}if(m.copy(M.pos),m.y+=M.t*1.2,m.project(x),m.z>1){M.el.style.display="none";continue}M.el.style.display="block",M.el.style.transform=`translate(${(m.x*.5+.5)*innerWidth+M.dx*M.t}px, ${(-m.y*.5+.5)*innerHeight}px) scale(${1+(.3-M.t)*.5})`,M.el.style.opacity=String(1-M.t/.9)}this.fpsAcc+=e,this.fpsN++;let p=this.$("#fps");p.classList.toggle("hidden",!te.showFps),te.showFps&&this.fpsN>=20&&(p.textContent=Math.round(this.fpsAcc/this.fpsN)+" FPS",this.fpsAcc=0,this.fpsN=0)}updateHotbar(t){let e=t.inv.slots,i=t.inv.sel+"|";for(let a of e)i+=a?`${a.def.id}:${a.count}:${a.rarity}:${a.mag??""};`:"-;";if(i!==this.lastHot){this.lastHot=i;let a="";e.forEach((l,c)=>{if(!l){a+=`<div class="slot empty"><span class="n">${c+1}</span></div>`;return}let h=li[l.rarity].css;a+=`<div class="slot ${c===t.inv.sel?"sel":""}"><span class="n">${c+1}</span><span class="ic">${l.def.icon}</span>${l.count>1||l.def.kind==="gadget"?`<span class="cnt">${l.count}</span>`:""}<span class="nm">${l.def.id==="pickaxe"?"":l.def.name}</span><span class="rar" style="background:${l.def.id==="pickaxe"?"transparent":h}"></span></div>`}),this.$("#hotbar").innerHTML=a}let n=t.stack,s=this.$("#ammo"),o="";if(n){let a=n.def,l=li[n.rarity].css;a.kind==="gun"?o=`<div class="big">${n.mag}<small> / ${t.inv.ammo[a.ammo]}</small></div><div class="wn" style="color:${l}">${a.name}</div>`:a.id!=="pickaxe"?o=`<div class="big">${n.count}</div><div class="wn" style="color:${l}">${a.name}</div>`:o=`<div class="wn">${a.name}</div>`}o!==this.lastAmmo&&(s.innerHTML=o,this.lastAmmo=o)}drawMinimap(){let t=this.game,e=this.mm,i=t.player,n=200,s=t.world.minimapCanvas;if(!s){e.fillStyle="#1c3a5a",e.fillRect(0,0,n,n);return}e.clearRect(0,0,n,n);let o=380,a=i.alive||i.mode==="bus"?i.mode==="bus"?t.bus.pos:i.pos:t.controller.spectate.target?.pos||i.pos,l=s.width/Ot.size,c=(a.x+Ot.half-o/2)*l,h=(a.z+Ot.half-o/2)*l,u=o*l;e.fillStyle="#1c3a5a",e.fillRect(0,0,n,n),e.drawImage(s,c,h,u,u,0,0,n,n);let d=x=>((x-a.x)/o+.5)*n,f=x=>((x-a.z)/o+.5)*n,g=n/o;this.drawOverlays(e,d,f,g,!1),e.save(),e.translate(n/2,n/2),e.rotate(-(i.alive?t.controller.yaw:0)),e.fillStyle="#fff",e.strokeStyle="#000",e.lineWidth=1.5,e.beginPath(),e.moveTo(0,-8),e.lineTo(6,7),e.lineTo(0,3),e.lineTo(-6,7),e.closePath(),e.fill(),e.stroke(),e.restore()}drawOverlays(t,e,i,n,s){let o=this.game,a=o.storm,l=o.bus;if(a.active){t.save(),t.beginPath();let c=4e3;t.rect(e(-c),i(-c),c*2*n,c*2*n),t.arc(e(a.cx),i(a.cz),a.r*n,0,Math.PI*2,!0),t.fillStyle="rgba(150,60,230,0.38)",t.fill("evenodd"),t.restore(),t.lineWidth=s?3:2,t.strokeStyle="#fff",t.beginPath(),t.arc(e(a.cx),i(a.cz),Math.max(1,a.r*n),0,Math.PI*2),t.stroke(),a.state!=="done"&&a.nr>1&&(t.strokeStyle="#7fd0ff",t.setLineDash([6,5]),t.beginPath(),t.arc(e(a.nx),i(a.nz),Math.max(1,a.nr*n),0,Math.PI*2),t.stroke(),t.setLineDash([]))}(l.active||o.state==="bus")&&(t.strokeStyle="rgba(255,230,120,0.9)",t.lineWidth=s?3:2,t.setLineDash([8,6]),t.beginPath(),t.moveTo(e(l.start.x),i(l.start.z)),t.lineTo(e(l.end.x),i(l.end.z)),t.stroke(),t.setLineDash([]),t.fillStyle="#ffd23f",t.beginPath(),t.arc(e(l.pos.x),i(l.pos.z),s?9:5,0,Math.PI*2),t.fill(),t.strokeStyle="#000",t.lineWidth=1.5,t.stroke());for(let c of $e){let h=e(c.x),u=i(c.z);!s&&(h<-10||u<-10||h>210||u>210)||(t.fillStyle=c.color,t.strokeStyle="#000",t.lineWidth=1.5,t.beginPath(),t.arc(h,u,s?7:4,0,Math.PI*2),t.fill(),t.stroke(),s||(t.font='bold 10px "Trebuchet MS", sans-serif',t.textAlign="center",t.lineWidth=3,t.strokeStyle="rgba(0,0,0,0.85)",t.strokeText(c.name,h,u+14),t.fillStyle="#fff",t.fillText(c.name,h,u+14)),s&&(t.font='bold 22px "Trebuchet MS", sans-serif',t.textAlign="center",t.lineWidth=5,t.strokeStyle="rgba(0,0,0,0.85)",t.strokeText(c.name,h,u-14),t.fillStyle="#fff",t.fillText(c.name,h,u-14)))}}drawBigMap(){let t=this.game,e=this.bm,i=t.world.minimapCanvas;if(!i)return;let n=1024;e.clearRect(0,0,n,n),e.drawImage(i,0,0,n,n);let s=n/Ot.size,o=h=>(h+Ot.half)*s,a=h=>(h+Ot.half)*s;this.drawOverlays(e,o,a,s,!0);let l=t.player,c=l.mode==="bus"?t.bus.pos:l.pos;e.save(),e.translate(o(c.x),a(c.z)),e.rotate(-t.controller.yaw),e.fillStyle="#fff",e.strokeStyle="#000",e.lineWidth=2.5,e.beginPath(),e.moveTo(0,-16),e.lineTo(11,13),e.lineTo(0,6),e.lineTo(-11,13),e.closePath(),e.fill(),e.stroke(),e.restore()}showResult({win:t,placement:e,kills:i,damage:n,time:s,killer:o,total:a}){let l=this.$("#res-title");l.textContent=t?"Victory Royale!":`#${e} of ${a}`,l.className=t?"win":"lose",this.$("#res-sub").textContent=t?"You are the last one standing.":o?`Eliminated by ${o}`:"Eliminated";let c=Math.floor(s/60),h=String(Math.floor(s%60)).padStart(2,"0");this.$("#res-stats").innerHTML=`<div><b>${i}</b>Eliminations</div><div><b>${Math.round(n)}</b>Damage dealt</div><div><b>${c}:${h}</b>Survived</div><div><b>#${e}</b>Placement</div>`,this.show("result",!0),this.$("#btn-spec").style.display=t?"none":""}};var Pn=6,nc=class{constructor(){this.slots=new Array(Pn).fill(null),this.slots[0]=Jn("pickaxe"),this.sel=0,this.lastSel=1,this.ammo={light:0,medium:0,heavy:0,shells:0,rockets:0}}get current(){return this.slots[this.sel]}addAmmo(t,e){let i=fi[t].max,n=Math.max(0,Math.min(e,i-this.ammo[t]));return this.ammo[t]+=n,n}freeSlot(){for(let t=1;t<Pn;t++)if(!this.slots[t])return t;return-1}pickup(t){if(t.ammo){let a=this.addAmmo(t.ammo,t.count);return t.count-=a,{taken:a>0,swapped:null,slot:-1,ammo:a}}let e=t.stack,i=e.def;if(wf(i)){for(let a=1;a<Pn;a++){let l=this.slots[a];if(l&&l.def===i&&l.count<i.stack){let c=Math.min(i.stack-l.count,e.count);if(l.count+=c,e.count-=c,e.count<=0)return{taken:!0,swapped:null,slot:a}}}if(e.count>0){let a=this.freeSlot();return a>=0?(this.slots[a]={...e},e.count=0,{taken:!0,swapped:null,slot:a}):{taken:!1,swapped:null,slot:-1}}return{taken:!0,swapped:null,slot:-1}}let n=this.freeSlot();if(n>=0)return this.slots[n]=e,t.count=0,{taken:!0,swapped:null,slot:n};let s=this.sel>0?this.sel:this.lastSel;s<=0&&(s=1);let o=this.slots[s];return this.slots[s]=e,t.count=0,{taken:!0,swapped:o,slot:s}}remove(t){let e=this.slots[t];return this.slots[t]=null,e}countOf(t){let e=0;for(let i of this.slots)i&&i.def.id===t&&(e+=i.count);return e}find(t){for(let e=1;e<Pn;e++)if(this.slots[e]&&t(this.slots[e]))return e;return-1}};var ge={radius:.38,height:1.8,crouchHeight:1.35,step:.55,walk:6.2,sprint:9.2,crouch:3,swim:3.7,jump:8.8,gravity:26,terminal:62,accel:55,airAccel:14,fallSafe:18,fallDmg:4.6},Xh=new L;var Yf={geo:new Ri(.34,.34),mat:new se({color:16765562,transparent:!0,opacity:.95,blending:Si,depthWrite:!1,fog:!1})},b_={desert:0,snow:0,rock:0,forest:0,sand:0},Mo=class{constructor(t,e){this.game=t,this.id=e.id,this.name=e.name,this.isPlayer=!!e.isPlayer,this.seed=e.seed??1,this.skill=e.skill??"player",this.pos=new L,this.vel=new L,this.yaw=0,this.pitch=0,this.bodyYaw=0,this.hp=100,this.shield=0,this.alive=!0,this.mode="bus",this.grounded=!1,this.swimming=!1,this.crouching=!1,this.sprinting=!1,this.ads=!1,this.noFall=!1,this.inv=new nc,this.kills=0,this.placement=0,this.input={fwd:0,strafe:0,jump:!1,jumpPressed:!1,sprint:!1,crouch:!1,fire:!1,firePressed:!1,ads:!1},this.aimOrigin=new L,this.aimDir=new L(0,0,-1),this.fireCd=0,this.burstLeft=0,this.reload=null,this.using=null,this.swingT=0,this.swingHit=!1,this.throwT=0,this.equipT=0,this.flashT=0,this.bloom=0,this.spin=0,this.recoil=0,this.buffs={speedT:0,jumpT:0},this.hot=null,this.danceT=0,this.grapple=null,this.airTime=0,this.stepDist=0,this.phase=0,this.lastDamageT=-99,this.lastAttacker=null,this.lastHitDir=new L,this.jumpHeld=!1,this.diveT=0,this.deadT=0,this.stats={damage:0,shots:0,hits:0},this.pendingMsg=null;let i=Of(this.seed,e.look||{});this.model=i,this.root=i.root,this.glider=Bf(e.gliderColor??[16734767,3120127,3523690,13192152,16761898][this.seed%5]),this.glider.visible=!1,this.root.add(this.glider),this.held=null,this.heldId=null,this.muzzleFlash=this._makeFlash(),t.scene.add(this.root),this.root.visible=!1,this.ropeLine=null}_makeFlash(){let t=new kt,e=Yf.mat,i=Yf.geo,n=new Et(i,e),s=n.clone();s.rotation.z=Math.PI/2;let o=new Et(i,e);return o.rotation.y=Math.PI/2,t.add(n,s,o),t.visible=!1,t}get height(){return this.crouching?ge.crouchHeight:ge.height}get eyeHeight(){return this.crouching?1.18:1.62}get stack(){return this.inv.current}eyePos(t=Xh){return t.set(this.pos.x,this.pos.y+this.eyeHeight,this.pos.z)}place(t,e,i){this.pos.set(t,e,i),this.root.position.copy(this.pos)}setMode(t){let e=this.mode;this.mode=t,this.root.visible=t!=="bus",this.glider.visible=t==="glide",t==="skydive"&&(this.grounded=!1,this.diveT=0,this.cancelUse(),this.reload=null),t==="glide"&&this.game.audio.play("glider",this.pos,{vol:.8,max:150}),t==="normal"&&(e==="skydive"||e==="glide")&&(this.grounded=!1),this.refreshHeld()}refreshHeld(){let t=this.stack,i=this.mode==="normal"&&t?t.def.id:null;if(i===this.heldId||(this.held&&(this.held.parent?.remove(this.held),this.held=null),this.heldId=i,!i))return;let n=vs(i),s=t.def,o=this.model.armR.hand;s.kind==="gun"?(n.rotation.x=-Math.PI/2,n.position.set(0,-.02,0)):s.kind==="melee"?(n.rotation.x=-Math.PI/2+.25,n.position.set(0,-.02,0)):(n.rotation.x=-Math.PI/2,n.position.set(0,-.06,0)),o.add(n),this.held=n,s.kind==="gun"&&(this.muzzleFlash.position.set(0,.03,n.userData.muzzleZ??-.3),n.add(this.muzzleFlash))}equip(t){t<0||t>=Pn||!this.inv.slots[t]||t===this.inv.sel||this.mode==="normal"&&(this.cancelUse(),this.reload=null,this.burstLeft=0,this.inv.sel>0&&(this.inv.lastSel=this.inv.sel),this.inv.sel=t,this.equipT=this.inv.slots[t].def.kind==="gun"?.35:.2,this.refreshHeld(),(this.isPlayer||this.game.nearPlayer(this.pos,25))&&this.game.audio.play("equip",this.pos,{vol:.8,max:40}))}cycle(t){for(let e=1;e<=Pn;e++){let i=(this.inv.sel+t*e+Pn*4)%Pn;if(this.inv.slots[i]){this.equip(i);return}}}afterEmpty(){let t=this.inv.sel;if(t>0&&!this.inv.slots[t]){let e=this.inv.lastSel;e>0&&this.inv.slots[e]?(this.inv.sel=0,this.equip(e)):(this.inv.sel=0,this.refreshHeld(),this.equipT=.2)}}takeDamage(t,e,i={}){if(!this.alive||t<=0||this.mode==="bus")return 0;let n=t,s=this.shield>0;if(this.shield>0){let o=Math.min(this.shield,n);this.shield-=o,n-=o}return this.hp-=n,this.lastDamageT=this.game.time,e&&e!==this&&(this.lastAttacker=e),i.dir&&this.lastHitDir.copy(i.dir),this.stats.damageTaken=(this.stats.damageTaken||0)+t,this.game.onDamage(this,e,t,i,s&&this.shield<=0),this.hp<=0&&this.die(e,i),t}heal(t,e,i=100,n=100){t>0&&this.hp<i&&(this.hp=Math.min(i,this.hp+t)),e>0&&this.shield<n&&(this.shield=Math.min(n,this.shield+e))}die(t,e={}){if(!this.alive)return;this.alive=!1,this.hp=0,this.shield=0,this.cancelUse(),this.reload=null,this.grapple=null;let i=this.mode==="skydive"||this.mode==="glide";this.mode="dead",this.glider.visible=!1,this.held&&(this.held.parent?.remove(this.held),this.held=null,this.heldId=null),this.game.onElimination(this,t,e,i)}pickup(t){let e=this.inv.pickup(t);return e.taken?(e.swapped&&this.game.loot.dropStack(e.swapped,this.pos,this),e.slot>0&&this.inv.sel===e.slot&&this.refreshHeld(),e.slot>0&&this.inv.sel===0&&this.inv.slots[e.slot]?.def.kind==="gun"&&!this.inv.slots.some((i,n)=>n!==e.slot&&n>0&&i&&i.def.kind==="gun")&&this.equip(e.slot),!0):!1}dropSelected(){let t=this.inv.sel;if(t===0)return;let e=this.inv.remove(t);e&&(this.game.loot.dropStack(e,this.pos,this,!0),this.cancelUse(),this.afterEmpty())}canUse(t){return t.airOnly?this.grounded||this.swimming||this.mode!=="normal"?"Can only be eaten mid-air!":null:t.buff?this.buffs.speedT>t.buff.dur*.8?"Already super-charged":null:t.hp&&!t.shield&&!t.hot&&this.hp>=t.hpCap?"Health is full":t.shield&&!t.hp&&this.shield>=t.shieldCap?"Shield is full":t.hp&&t.shield&&this.hp>=t.hpCap&&this.shield>=t.shieldCap||t.hot&&this.hp>=100&&this.shield>=100?"Already at full":null}startUse(t){let e=t.def;if(this.using||this.equipT>0)return!1;let i=this.canUse(e);if(i)return this.isPlayer&&this.game.hud?.toast(i),!1;this.using={stack:t,t:0,dur:e.time,def:e};let n=e.id==="apple"||e.id==="banana"||e.id==="mushroom"||e.id==="floorange"||e.id==="jumpple"?"eat":e.id==="bandage"||e.id==="medkit"?"ammo":"drink";return(this.isPlayer||this.game.nearPlayer(this.pos,30))&&this.game.audio.play(n,this.pos,{vol:.8,max:40}),!0}cancelUse(){this.using=null}finishUse(){let{stack:t,def:e}=this.using;this.using=null;let i=this.game,n=!0;if(e.airOnly)if(this.grounded||this.swimming)n=!1;else{let s=i.world.groundAt(this.pos.x,this.pos.z,this.pos.y,ge.step);i.fx.teleport(this.pos,"orange"),this.pos.y=s,this.vel.set(this.vel.x*.2,0,this.vel.z*.2),this.grounded=!0,this.noFall=!1,this.airTime=0,i.fx.teleport(this.pos,"orange"),i.audio.play("floorange",this.pos,{max:80}),this.heal(e.hp,0,100,100),this.isPlayer&&i.hud?.toast("Floorange! No fall damage")}else(e.hp||e.shield)&&this.heal(e.hp,e.shield,e.hpCap,e.shieldCap),e.hot&&(this.hot={hp:e.hot.hp,shield:e.hot.shield,t:0,dur:e.hot.dur}),e.buff&&(this.buffs.speedT=e.buff.dur,this.buffs.jumpT=e.buff.dur,this.buffs.speed=e.buff.speed,this.buffs.jump=e.buff.jump,i.audio.play("jumpple",this.pos,{max:40}),this.isPlayer&&i.hud?.toast("Jumpple! Super speed & jump")),e.shield&&!e.buff?i.audio.play("shield",this.pos,{max:40,vol:.6}):e.hp>=15&&i.audio.play("heal",this.pos,{max:40,vol:.6});if(n&&(t.count--,t.count<=0)){let s=this.inv.slots.indexOf(t);s>0&&(this.inv.slots[s]=null),this.afterEmpty()}}update(t){if(!this.alive){this.updateDead(t);return}if(this.mode==="bus"){this.root.visible=!1;return}let e=this.game,i=this.input;if(this.fireCd=Math.max(0,this.fireCd-t),this.equipT=Math.max(0,this.equipT-t),this.flashT=Math.max(0,this.flashT-t),this.bloom=Math.max(0,this.bloom-7*t),this.recoil=Math.max(0,this.recoil-9*t),this.buffs.speedT=Math.max(0,this.buffs.speedT-t),this.buffs.jumpT=Math.max(0,this.buffs.jumpT-t),this.danceT=Math.max(0,this.danceT-t),this.hot){this.hot.t+=t;let a=t/this.hot.dur;this.heal(this.hot.hp*a,this.hot.shield*a,100,100),(this.isPlayer||this.game.nearPlayer(this.pos,30))&&Math.random()<t*6&&e.fx.heal(this.pos,"shield"),this.hot.t>=this.hot.dur&&(this.hot=null)}this.danceT>0&&(i.fire=!1,i.firePressed=!1,i.jumpPressed=!1);let n=t;for(;n>0;){let a=Math.min(n,.016666666666666666);n-=a,this.mode==="skydive"||this.mode==="glide"?this.stepAir(a):this.stepGround(a)}i.jumpPressed=!1;let s=Ot.limit+20,o=Math.hypot(this.pos.x,this.pos.z);o>s&&(this.pos.x*=s/o,this.pos.z*=s/o),this.mode==="normal"&&this.updateCombat(t),this.renderOn!==!1?this.updateModel(t):this.root.position.copy(this.pos)}speedMul(){let t=1;this.buffs.speedT>0&&(t*=this.buffs.speed||1.38),this.using&&(t*=.55),this.ads&&(t*=.65);let e=this.stack;return e&&e.def.speedPenalty&&this.input.fire&&(t*=e.def.speedPenalty),this.danceT>0&&(t=0),t}stepGround(t){let e=this.game,i=e.world,n=this.input,s=this.pos;this.crouching=n.crouch&&!this.swimming||this.crouching&&n.crouch;let o=n.sprint&&n.fwd>.1&&!this.crouching&&!this.using&&!this.ads&&this.danceT<=0;this.sprinting=o&&(this.grounded||this.swimming);let a=this.swimming?ge.swim:this.crouching?ge.crouch:this.sprinting?ge.sprint:ge.walk;this.swimming&&this.sprinting&&(a=ge.swim*1.45),a*=this.speedMul();let l=Math.sin(this.yaw),c=Math.cos(this.yaw),h=-l,u=-c,d=c,f=-l,g=h*n.fwd+d*n.strafe,x=u*n.fwd+f*n.strafe,m=Math.hypot(g,x);m>1&&(g/=m,x/=m),this.danceT>0&&(g=0,x=0);let p=g*a,y=x*a;this.grapple&&this.stepGrapple(t);let M=this.grounded||this.swimming?m>.01?ge.accel:ge.accel*.8:ge.airAccel;if(this.grapple)this.vel.x+=p*.8*t,this.vel.z+=y*.8*t;else{let N=p-this.vel.x,C=y-this.vel.z,D=Math.hypot(N,C),k=M*t;D>k?(this.vel.x+=N/D*k,this.vel.z+=C/D*k):(this.vel.x=p,this.vel.z=y)}let _=s.x,v=s.z,S=(N,C)=>{if(N===0&&C===0)return;let D=s.x+N,k=s.z+C,z=i.terrain.height(D,k)-s.y,et=this.grounded?.2+Math.hypot(N,C)*1.5:ge.step;return z>et&&!this.swimming?!1:(s.x=D,s.z=k,!0)},T=this.vel.x*t,b=this.vel.z*t;S(T,b)||(S(T,0)||(this.vel.x*=.2),S(0,b)||(this.vel.z*=.2));let A=i.collision.resolve(s,ge.radius,this.height,ge.step);if(A&&!this.grapple){let N=(s.x-_)/t,C=(s.z-v)/t;Math.abs(N)<Math.abs(this.vel.x)&&(this.vel.x=N),Math.abs(C)<Math.abs(this.vel.z)&&(this.vel.z=C)}else A&&this.grapple&&(this.grapple=null);if(this.grounded&&!this.swimming&&(this.stepDist+=Math.hypot(s.x-_,s.z-v),this.stepDist>(this.sprinting?2.9:this.crouching?1.6:2.2)&&(this.stepDist=0,!this.crouching&&(this.isPlayer||e.nearPlayer(s,38))))){let N=i.terrain.height(s.x,s.z),C=1500;if(Math.abs(s.y-N)<.2){let D=hr(s.x,s.z,N,0,b_);C=D.snow>.5?380:D.desert>.5||D.sand>.5?480:760}e.audio.play("step",this.isPlayer?null:s,{vol:this.isPlayer?.28:.8,max:38,lp:C})}let R=i.collision.groundAt(s.x,s.z,s.y,ge.step),I=Ot.seaLevel;if(R<I-.9&&s.y<=I+.3){this.swimming||(this.swimming=!0,e.fx.splash(Xh.set(s.x,I,s.z),14),(this.isPlayer||e.nearPlayer(s,40))&&e.audio.play("land",s,{vol:.5,max:60}),this.noFall=!1),this.grounded=!1,this.grapple=null;let N=I-.95;this.vel.y=(N-s.y)*6+(n.jumpPressed?4:0),s.y+=this.vel.y*t,this.airTime=0;return}if(this.swimming=!1,this.grounded&&!this.grapple)if(s.y-R>.45+Math.hypot(this.vel.x,this.vel.z)*t*1.3)this.grounded=!1;else{s.y=R,this.vel.y=0,this.airTime=0,(n.jumpPressed||n.jump&&this.autoHop)&&!this.crouching&&this.danceT<=0&&!this.using&&(this.vel.y=ge.jump*(this.buffs.jumpT>0?this.buffs.jump||1.6:1),this.grounded=!1,(this.isPlayer||e.nearPlayer(s,30))&&e.audio.play("jump",s,{vol:.6,max:30}));for(let C of e.jumpPads())if(Math.abs(s.y-C.y)<.6&&Math.hypot(s.x-C.x,s.z-C.z)<C.r){this.vel.y=C.vy,this.vel.x+=C.vx,this.vel.z+=C.vz,this.grounded=!1,this.noFall=!0,e.fx.teleport(s,"cyan"),e.audio.play("launchpad",s,{max:80});break}}if(!this.grounded){let N=s.y,C=this.grapple?ge.gravity*.35:ge.gravity;if(this.vel.y=Math.max(-ge.terminal,this.vel.y-C*t),s.y+=this.vel.y*t,this.airTime+=t,this.vel.y>0){let D=i.collision.ceilingAt(s.x,s.z,s.y+this.height-.02,ge.radius*.8);s.y+this.height>D&&(s.y=D-this.height,this.vel.y=0)}else{let D=i.collision.groundAt(s.x,s.z,N,ge.step);if(s.y<=D){let k=-this.vel.y;s.y=D,this.land(k)}}}}land(t){let e=this.game;if(this.grounded=!0,this.grapple=null,this.vel.y=0,t>ge.fallSafe){if(!this.noFall){let i=(t-ge.fallSafe)*ge.fallDmg;e.fx.dust(this.pos,14),this.takeDamage(i,null,{type:"fall"}),this.isPlayer&&e.hud?.flashDamage(.6)}(this.isPlayer||e.nearPlayer(this.pos,40))&&e.audio.play("land",this.pos,{max:60}),this.isPlayer&&e.shake(Math.min(.6,t*.015))}else t>6&&(this.isPlayer||e.nearPlayer(this.pos,25))&&e.audio.play("land",this.pos,{vol:.35,max:30});this.noFall=!1,this.airTime=0,this.using?.def.airOnly&&this.cancelUse()}stepGrapple(t){let e=this.grapple;e.t+=t;let i=this.pos,n=e.x-i.x,s=e.y-(i.y+1.1),o=e.z-i.z,a=Math.hypot(n,s,o);if(a<2.4||e.t>3.2||this.input.jumpPressed&&e.t>.25){(this.input.jumpPressed||a<2.4)&&(this.vel.y+=a<2.4?3:0),this.grapple=null;return}let l=58;this.vel.x+=n/a*l*t,this.vel.y+=s/a*l*t+ge.gravity*.35*t,this.vel.z+=o/a*l*t;let c=Math.hypot(this.vel.x,this.vel.y,this.vel.z),h=36;c>h&&this.vel.multiplyScalar(h/c),this.grounded=!1}stepAir(t){let e=this.game,i=e.world,n=this.input,s=this.pos;this.diveT+=t;let o=Math.sin(this.yaw),a=Math.cos(this.yaw),l=-o,c=-a,h=a,u=-o,d=n.fwd>.3,f=n.fwd<-.3,g,x,m;this.mode==="skydive"?(g=d?34:f?8:20,x=d?-63:f?-38:-50,m=3.5):(g=d?23:f?8:15,x=d?-15:f?-6.5:-9.5,m=2.5);let p=(this.mode==="skydive"?13:9)*n.strafe,y=l*g*(d||f||this.mode==="glide"?1:.9)+h*p,M=c*g*(d||f||this.mode==="glide"?1:.9)+u*p;this.vel.x=ps(this.vel.x,y,m,t),this.vel.z=ps(this.vel.z,M,m,t),this.vel.y=ps(this.vel.y,x,m,t);let _=s.x,v=s.z;s.x+=this.vel.x*t,s.z+=this.vel.z*t,i.collision.resolve(s,.5,ge.height,ge.step),Math.abs(s.x-_)<Math.abs(this.vel.x*t)*.5&&(this.vel.x*=.3),Math.abs(s.z-v)<Math.abs(this.vel.z*t)*.5&&(this.vel.z*=.3);let S=s.y;s.y+=this.vel.y*t;let T=i.collision.groundAt(s.x,s.z,S,.3),b=s.y-T;if(this.mode==="skydive"){let A=b<85+this.seed%7*3;(n.jumpPressed&&this.diveT>.8&&b<400||A)&&this.setMode("glide")}s.y<=T+.02&&(s.y=T,this.vel.set(this.vel.x*.2,0,this.vel.z*.2),this.setMode("normal"),this.grounded=T>Ot.seaLevel-.9,this.swimming=!1,this.noFall=!1,this.isPlayer&&e.audio.play("land",s,{vol:.5}),e.fx.dust(s,8))}updateCombat(t){let e=this.input,i=this.stack;if(this.ads=e.ads&&i&&i.def.kind==="gun"&&!this.using&&!this.reload&&this.equipT<=0&&!this.swimming&&this.danceT<=0,this.using){this.using.t+=t,this.stack?.def!==this.using.def?this.cancelUse():this.using.t>=this.using.dur?this.finishUse():this.using.def.airOnly&&(this.grounded||this.swimming)&&this.cancelUse();return}if(this.reload){if(this.reload.t+=t,this.reload.stack!==i)this.reload=null;else if(this.reload.t>=this.reload.dur){let s=i.def,o=Math.min(s.mag-i.mag,this.inv.ammo[s.ammo]);i.mag+=o,this.inv.ammo[s.ammo]-=o,this.reload=null}}if(this.swingT>0&&(this.swingT-=t,!this.swingHit&&this.swingT<this.swingDur*.55&&(this.swingHit=!0,i&&i.def.kind==="melee"&&this.game.combat.melee(this,i))),this.throwT>0&&(this.throwT-=t,this.throwT<=0&&this.pendingThrow)){let s=this.pendingThrow;if(this.pendingThrow=null,s.stack===this.stack&&s.stack.count>0&&(this.game.combat.throwItem(this,s.stack),s.stack.count--,s.stack.count<=0)){let o=this.inv.slots.indexOf(s.stack);o>0&&(this.inv.slots[o]=null),this.afterEmpty()}}if(!i||this.equipT>0||this.swimming)return;let n=i.def;if(n.kind==="gun"){if(n.spinUp&&(e.fire&&!this.reload?this.spin=Math.min(n.spinUp,this.spin+t):this.spin=Math.max(0,this.spin-t*1.5)),this.burstLeft>0&&this.fireCd<=0)this.shoot(i,!0);else if(e.fire&&this.fireCd<=0&&!this.reload&&this.burstLeft===0){let s=e.firePressed;if(n.spinUp&&this.spin<n.spinUp)return;(n.auto||s)&&(i.mag<=0?(s&&this.game.audio.play("dry",this.pos,{max:30}),this.startReload()):(n.burst&&(this.burstLeft=n.burst),this.shoot(i,n.burst>0)))}i.mag<=0&&!this.reload&&this.fireCd<=0&&this.burstLeft===0&&this.inv.ammo[n.ammo]>0&&this.startReload()}else n.kind==="melee"?e.fire&&this.fireCd<=0&&this.swingT<=0&&(this.fireCd=1/n.rate,this.swingDur=Math.min(.5,.9/n.rate),this.swingT=this.swingDur,this.swingHit=!1,this.game.audio.play("swing",this.pos,{max:40,vol:.8})):n.kind==="throw"?e.firePressed&&this.fireCd<=0&&this.throwT<=0&&(this.fireCd=.7,this.throwT=.28,this.pendingThrow={stack:i}):n.kind==="consume"?e.firePressed&&this.startUse(i):n.kind==="gadget"&&e.firePressed&&this.fireCd<=0&&(this.fireCd=.5,this.game.combat.useGadget(this,i));e.firePressed=!1}shoot(t,e){let i=t.def;this.game.combat.fireGun(this,t),t.mag--,this.stats.shots++,this.flashT=.05,this.bloom=Math.min(4,this.bloom+i.recoil*.5),this.recoil+=i.recoil,e?(this.burstLeft--,this.fireCd=this.burstLeft>0?.075:1/i.rate):this.fireCd=1/i.rate,t.mag<=0&&(this.burstLeft=0)}startReload(){let t=this.stack;if(!t||t.def.kind!=="gun"||this.reload||this.using)return;let e=t.def;t.mag>=e.mag||this.inv.ammo[e.ammo]<=0||(this.reload={stack:t,t:0,dur:Tf(t)},this.burstLeft=0,(this.isPlayer||this.game.nearPlayer(this.pos,25))&&this.game.audio.play("reload",this.pos,{max:35,vol:.7}))}updateDead(t){this.deadT+=t;let e=this.model,i=Math.min(1,this.deadT/.6);this.root.rotation.x=-Math.PI/2*(1-Math.pow(1-i,3)),this.root.position.set(this.pos.x,this.pos.y+.12*i,this.pos.z),e.legR.l.rotation.x=Ve(e.legR.l.rotation.x,.2,.2),e.armR.a.rotation.z=Ve(e.armR.a.rotation.z,.5,.2),e.armL.a.rotation.z=Ve(e.armL.a.rotation.z,-.5,.2),this.deadT>30&&(this.root.visible=!1)}updateModel(t){let e=this.model,i=this.stack,n=Math.hypot(this.vel.x,this.vel.z),s=this.root;s.position.copy(this.pos),this.refreshHeld();let o=this.bodyYaw,a=(this.input.fire||this.ads||this.swingT>0||this.throwT>0||this.game.time-(this.lastShotT||-9)<1.5)&&this.mode==="normal";if(this.mode==="skydive"||this.mode==="glide"||a||this.isPlayer&&this.stack?.def.kind==="gun"&&this.ads?o=this.yaw:n>.8?o=Math.atan2(-this.vel.x,-this.vel.z):o=this.bodyYaw,this.mode==="normal"&&n<=.8&&!a){let v=Yn(this.yaw-this.bodyYaw);Math.abs(v)>1.3&&(o=this.yaw)}this.bodyYaw=Tl(this.bodyYaw,o,14,t),s.rotation.set(0,this.bodyYaw,0);let l=this.game.time,c=e.body,h=e.torso,u=e.head,d=[e.legR,e.legL],f=[e.armR,e.armL];if(c.rotation.set(0,0,0),c.position.set(0,0,0),h.rotation.set(0,0,0),u.rotation.set(0,0,0),this.mode==="skydive"){let v=this.input.fwd>.3;c.rotation.x=-(v?1.3:.9),c.position.y=1.2,c.position.z=.2,e.armR.a.rotation.set(.5,0,1.1),e.armL.a.rotation.set(.5,0,-1.1),e.armR.fore.rotation.x=.2,e.armL.fore.rotation.x=.2,e.legR.l.rotation.set(.3+Math.sin(l*9)*.05,0,.35),e.legL.l.rotation.set(.3+Math.sin(l*9+1)*.05,0,-.35),e.legR.shin.rotation.x=-.2,e.legL.shin.rotation.x=-.2,u.rotation.x=.7,this.glider.visible=!1;return}if(this.mode==="glide"){this.glider.visible=!0,c.rotation.x=-.12,e.armR.a.rotation.set(Math.PI*.93,0,.18),e.armL.a.rotation.set(Math.PI*.93,0,-.18),e.armR.fore.rotation.x=0,e.armL.fore.rotation.x=0,e.legR.l.rotation.set(.2,0,.05),e.legL.l.rotation.set(.1,0,-.05),e.legR.shin.rotation.x=-.35,e.legL.shin.rotation.x=-.15,this.glider.rotation.set(0,0,Re(-this.input.strafe*.25,-.3,.3));return}this.glider.visible=!1;let g=this.grounded?n:0;this.phase+=t*(g*1.25+(g>.3?2:0));let x=Re(g/8,0,1),m=this.phase,p=this.sprinting?.22:.08*x;if(c.rotation.x=-p,this.crouching&&(c.position.y=-.38,h.rotation.x=.25),!this.grounded&&!this.swimming)d.forEach((v,S)=>{v.l.rotation.x=.5-S*.5,v.shin.rotation.x=-.9+S*.3});else if(this.swimming)c.rotation.x=-.6,c.position.y=-.1,d.forEach((v,S)=>{v.l.rotation.x=Math.sin(l*7+S*Math.PI)*.5,v.shin.rotation.x=-.1});else{let v=this.crouching?.7:0;d.forEach((S,T)=>{let b=Math.sin(m+T*Math.PI);S.l.rotation.x=b*.85*x+v*.5,S.shin.rotation.x=-(Math.max(0,-Math.sin(m+T*Math.PI+.9))*1.1*x+v)})}let y=Math.sin(m),M=i?.def.kind,_=M==="gun"&&this.mode==="normal";if(this.danceT>0){let v=Math.sin(l*9);e.armR.a.rotation.set(2.4+v*.4,0,-.5+v*.3),e.armL.a.rotation.set(2.4-v*.4,0,.5-v*.3),e.armR.fore.rotation.x=.4,e.armL.fore.rotation.x=.4,c.position.y=Math.abs(Math.sin(l*9))*.12-.05,h.rotation.z=v*.2,d.forEach((S,T)=>{S.l.rotation.x=Math.sin(l*9+T*Math.PI)*.5,S.shin.rotation.x=-Math.abs(Math.sin(l*9+T*Math.PI))*.6})}else if(this.using){let v=Math.sin(this.using.t*7)*.08;e.armR.a.rotation.set(2,0,.1),e.armR.fore.rotation.x=-1.25+v,e.armL.a.rotation.set(-y*.6*x,0,0),e.armL.fore.rotation.x=0,u.rotation.x=.1}else if(this.throwT>0&&this.pendingThrow){let v=1-this.throwT/.28;e.armR.a.rotation.set(Ve(2.6,.9,v*v),0,0),e.armR.fore.rotation.x=Ve(-.6,-.1,v),e.armL.a.rotation.set(-y*.6*x,0,0),e.armL.fore.rotation.x=0}else if(_){let v=Re(this.pitch,-1.2,1.2);h.rotation.x=v*.3;let S=Math.min(.25,this.recoil*.035);if(e.armR.a.rotation.set(Math.PI/2+v*.65+S,0,-.1),e.armR.fore.rotation.x=-.15,e.armL.a.rotation.set(Math.PI/2+v*.65+S-.15,0,.42),e.armL.fore.rotation.set(-.55,0,0),u.rotation.x=-v*.4,this.reload){let T=this.reload.t/this.reload.dur;e.armL.a.rotation.x=Math.PI/2+.6+Math.sin(T*Math.PI*4)*.2,e.armL.fore.rotation.set(-1.2,0,0),h.rotation.x=.15}}else if(M==="melee"&&this.swingT>0){let v=1-this.swingT/this.swingDur,S=Ve(3,.5,Math.min(1,v*1.6));e.armR.a.rotation.set(S,0,-.15),e.armR.fore.rotation.x=Ve(-.8,-.1,v),h.rotation.y=Ve(.5,-.5,v),e.armL.a.rotation.set(.6-y*.4*x,0,0),e.armL.fore.rotation.x=0}else{let v=M==="melee"||M==="gadget"||M==="throw"||M==="consume"?.9:0;e.armR.a.rotation.set(v*.8-y*.8*x,0,.04),e.armR.fore.rotation.x=-(v*.4)-Math.max(0,y)*.4*x,e.armL.a.rotation.set(y*.8*x,0,-.04),e.armL.fore.rotation.x=-Math.max(0,-y)*.4*x,h.rotation.y=-y*.12*x}if(this.held&&_?(this.muzzleFlash.visible=this.flashT>0,this.flashT>0&&(this.muzzleFlash.rotation.z=Math.random()*3)):this.muzzleFlash.visible=!1,this.grapple){this.ropeLine||(this.ropeLine=new Et(new ve(.02,.02,1,4),new se({color:16756778})),this.game.scene.add(this.ropeLine));let v=Xh.set(this.pos.x,this.pos.y+1.3,this.pos.z),S=this.grapple,T=S.x-v.x,b=S.y-v.y,A=S.z-v.z,R=Math.hypot(T,b,A);this.ropeLine.visible=!0,this.ropeLine.position.set(v.x+T/2,v.y+b/2,v.z+A/2),this.ropeLine.scale.set(1,R,1),this.ropeLine.quaternion.setFromUnitVectors(new L(0,1,0),new L(T,b,A).normalize())}else this.ropeLine&&(this.ropeLine.visible=!1)}muzzlePos(t){return this.held&&this.stack?.def.kind==="gun"?(this.model.root.updateMatrixWorld(!0),this.muzzleFlash.getWorldPosition(t)):this.eyePos(t)}dispose(){this.game.scene.remove(this.root),this.glider.traverse(t=>{t.geometry?.dispose(),t.material?.dispose?.()}),this.ropeLine&&(this.game.scene.remove(this.ropeLine),this.ropeLine.geometry.dispose(),this.ropeLine.material.dispose())}};var S_={},Ni=new L,Qn=new L,qh=new L,bo=new L,sc=class{constructor(t,e,i){this.game=t,this.char=e,this.canvas=i,this.keys=new Set,this.yaw=0,this.pitch=-.15,this.shoulder=1,this.camDist=3.4,this.camPos=new L,this.fov=70,this.target=null,this.interactHeld=!1,this.autoPickT=0,this.lastRecoil=0,this.mouseDown=!1,this.rmbDown=!1,this.wheelAcc=0,this.spectate={target:null,idx:0},this.scoped=!1,this.locked=!1,this.bind()}bind(){let t=document;t.addEventListener("keydown",e=>this.onKey(e,!0)),t.addEventListener("keyup",e=>this.onKey(e,!1)),t.addEventListener("mousemove",e=>{if(!this.locked&&!this.fallbackLook||!this.game.inputEnabled())return;let i=.0022*te.sensitivity*(this.char.ads?Math.max(.25,this.fov/te.fov):1);this.yaw-=e.movementX*i,this.pitch-=e.movementY*i*(te.invertY?-1:1),this.pitch=Re(this.pitch,-1.45,1.35)}),this.canvas.addEventListener("mousedown",e=>{this.game.inputEnabled()&&(this.locked||this.requestLock(),this.char&&(e.button===0&&(this.mouseDown=!0,this.char.input.firePressed=!0),e.button===2&&(this.rmbDown=!0)))}),t.addEventListener("mouseup",e=>{e.button===0&&(this.mouseDown=!1),e.button===2&&(this.rmbDown=!1)}),this.canvas.addEventListener("contextmenu",e=>e.preventDefault()),t.addEventListener("wheel",e=>{this.game.inputEnabled()&&(this.wheelAcc+=e.deltaY,Math.abs(this.wheelAcc)>40&&(this.char.alive&&this.char.mode==="normal"&&this.char.cycle(this.wheelAcc>0?1:-1),this.wheelAcc=0))},{passive:!0}),t.addEventListener("pointerlockchange",()=>{this.locked=t.pointerLockElement===this.canvas,this.locked&&(this.fallbackLook=!1,this.canvas.style.cursor=""),this.locked||this.game.onLockLost()}),window.addEventListener("blur",()=>{this.keys.clear(),this.mouseDown=!1,this.rmbDown=!1}),t.addEventListener("visibilitychange",()=>{t.hidden&&this.game.pause()})}requestLock(){let t=()=>{this.fallbackLook||(this.fallbackLook=!0,this.canvas.style.cursor="crosshair",this.game.hud?.toast("Pointer lock unavailable: move the mouse to look (arrow keys also turn)"))};try{let e=this.canvas.requestPointerLock?.();this.canvas.requestPointerLock?e&&e.then&&e.then(()=>{},t):t()}catch{t()}clearTimeout(this.lockTimer),this.lockTimer=setTimeout(()=>{!this.locked&&this.game.inputEnabled()&&t()},700)}onKey(t,e){let i=t.code;if(e&&this.game.inputEnabled()&&["Space","ArrowUp","ArrowDown","Tab"].includes(i)&&t.preventDefault(),e?this.keys.add(i):this.keys.delete(i),!e){i==="KeyE"&&(this.interactHeld=!1);return}if(t.repeat)return;let n=this.game;if(i==="Escape"){n.togglePause();return}if(!n.inputEnabled())return;let s=this.char;if(s){if(i==="KeyM"||i==="Tab"){n.hud.toggleMap();return}if(i==="KeyX"&&(this.shoulder*=-1),i==="KeyV"&&(this.fpv=!this.fpv,n.hud.toast(this.fpv?"First person":"Third person")),i==="F3"&&(te.showFps=!te.showFps),!s.alive){(i==="KeyE"||i==="ArrowRight"||i==="KeyD")&&this.cycleSpectate(1),(i==="KeyQ"||i==="ArrowLeft"||i==="KeyA")&&this.cycleSpectate(-1);return}if(s.mode==="bus"){i==="Space"&&n.jumpFromBus(s);return}if(i==="Space"&&(s.input.jumpPressed=!0),s.mode==="normal"){if(i.startsWith("Digit")){let o=parseInt(i.slice(5),10);o>=1&&o<=6&&s.equip(o-1)}i==="KeyR"&&s.startReload(),i==="KeyG"&&s.dropSelected(),i==="KeyE"&&(this.interactHeld=!0,this.tryInteract(!0)),i==="KeyQ"&&s.equip(s.inv.lastSel)}}}findTarget(){let t=this.char,e=this.game.loot,i=null,n=1e9,s=e.nearbyDrops(t.pos.x,t.pos.z,2.9,[]);for(let a of s){if(Math.abs(a.pos.y-t.pos.y)>2.4||!e.canTake(t,a)||!a.settled)continue;let l=Math.hypot(a.pos.x-t.pos.x,a.pos.z-t.pos.z);l<n&&(n=l,i={type:"drop",d:a})}let o=e.nearestChest(t.pos.x,t.pos.z,2.6,t.pos.y);return o&&Math.hypot(o.x-t.pos.x,o.z-t.pos.z)<n+.6&&(i={type:"chest",c:o}),i}tryInteract(t){let e=this.target;e&&e.type==="drop"&&t&&this.game.loot.take(this.char,e.d)}update(t){let e=this.game,i=this.char;if(!i)return;let n=i.input,s=e.inputEnabled(),o=this.keys,a=!i.alive;if(s&&!a?(n.fwd=(o.has("KeyW")?1:0)-(o.has("KeyS")?1:0),n.strafe=(o.has("KeyD")?1:0)-(o.has("KeyA")?1:0),n.jump=o.has("Space"),n.sprint=o.has("ShiftLeft")||o.has("ShiftRight"),n.crouch=o.has("KeyC")||o.has("ControlLeft"),n.fire=this.mouseDown,n.ads=this.rmbDown):a||(n.fwd=n.strafe=0,n.jump=n.sprint=n.crouch=n.fire=n.ads=!1),s){let l=(o.has("ArrowLeft")?1:0)-(o.has("ArrowRight")?1:0),c=(o.has("ArrowUp")?1:0)-(o.has("ArrowDown")?1:0);if(l||c){let h=1.9*te.sensitivity*t;this.yaw+=l*h,this.pitch=Re(this.pitch+c*h*.7,-1.45,1.35)}}if(!a&&i.mode!=="bus"&&(i.yaw=this.yaw,i.pitch=this.pitch),i.recoil>this.lastRecoil+.001){let l=(i.recoil-this.lastRecoil)*.0125;this.pitch=Re(this.pitch+l,-1.45,1.35),this.yaw+=(Math.random()-.5)*l*.8}if(this.lastRecoil=i.recoil,!a&&i.mode==="normal"&&s){this.target=this.findTarget();let l=this.target;if(l&&l.type==="chest"&&this.keys.has("KeyE")&&e.loot.work(l.c,i,t)&&(this.target=null),this.autoPickT-=t,this.autoPickT<=0){this.autoPickT=.12;for(let c of e.loot.nearbyDrops(i.pos.x,i.pos.z,1.5,[]))c.ammo&&c.settled&&Math.abs(c.pos.y-i.pos.y)<2&&e.loot.canTake(i,c)&&e.loot.take(i,c)}}else this.target=null;e.hud.setPrompt(this.target,this.char,this.target?.type==="chest"?this.target.c.progress/Jl:0),this.updateCamera(t)}cycleSpectate(t){let e=this.game.chars.filter(n=>n.alive&&n!==this.char&&n.mode!=="bus");if(!e.length)return;let i=e.indexOf(this.spectate.target);this.spectate.target=e[(i+t+e.length*2)%e.length]}updateCamera(t){let e=this.game,i=this.char,n=e.camera,s=e.world,o=this.cameraTarget(),a=3.2,l=.85*this.shoulder,c=i.crouching?1.2:1.6,h=te.fov;this.scoped=!1;let u;if(i.mode==="bus"&&i.alive)u=bo.copy(e.bus.pos).add(Ni.set(0,8,0)),a=48,l=0,c=0;else if(i.alive)if(i.mode==="skydive"||i.mode==="glide")u=bo.set(i.pos.x,i.pos.y+1,i.pos.z),a=i.mode==="skydive"?7.5:8.5,l=0,c=0,i.mode==="skydive"&&i.input.fwd>.3&&(h+=14);else{u=bo.set(i.pos.x,i.pos.y+c,i.pos.z);let m=i.stack;if(i.ads&&m?.def.kind==="gun"){let p=m.def.zoom;h=te.fov*p,p<.4?this.scoped=!0:(a=1.5,l=.42*this.shoulder)}else i.sprinting&&(h+=7);i.swimming&&(c=.9)}else{this.spectate.target&&this.spectate.target.alive&&this.spectate.target||this.cycleSpectate(1);let p=this.spectate.target;p&&p.alive?u=bo.set(p.pos.x,p.pos.y+1.5,p.pos.z):u=bo.set(i.pos.x,i.pos.y+1.5,i.pos.z),a=5.5,l=0,c=0}this.fov=ps(this.fov,h,12,t);let d=Math.cos(this.pitch),f=Math.sin(this.pitch);Qn.set(-Math.sin(this.yaw)*d,f,-Math.cos(this.yaw)*d),qh.set(Math.cos(this.yaw),0,-Math.sin(this.yaw));let g=this.fpv&&i.alive&&i.mode==="normal";if(i.alive&&(i.model.head.visible=!g),this.scoped)i.eyePos(Ni),n.position.copy(Ni).addScaledVector(Qn,.25),i.root.visible=!1;else if(g)i.eyePos(Ni),n.position.copy(Ni).addScaledVector(Qn,.18),i.root.visible=!0;else{let m=Ni.copy(u).addScaledVector(qh,l).addScaledVector(Qn,-a),p=m.x-u.x,y=m.y-u.y,M=m.z-u.z,_=Math.hypot(p,y,M),v=_;if(_>.01){let A=s.collision.raycast(u.x,u.y,u.z,p/_,y/_,M/_,_+.3,S_);A>=0&&(v=Math.max(.4,A-.3))}let S=v/Math.max(_,.001);this.camDist=v<this.camDist?v:ps(this.camDist,v,10,t);let T=this.camDist/Math.max(_,.001);n.position.set(u.x+p*T,u.y+y*T,u.z+M*T);let b=s.terrain.height(n.position.x,n.position.z);n.position.y<b+.4&&(n.position.y=b+.4),i.alive&&i.mode!=="bus"&&(i.root.visible=i.mode!=="bus")}let x=e.shakeAmount;if(x>.001&&(n.position.x+=(Math.random()-.5)*x,n.position.y+=(Math.random()-.5)*x,n.position.z+=(Math.random()-.5)*x),Ni.copy(n.position).addScaledVector(Qn,50),n.lookAt(Ni),Math.abs(n.fov-this.fov)>.05&&(n.fov=this.fov,n.updateProjectionMatrix()),i.alive&&i.mode==="normal"){i.eyePos(Ni);let m=Math.max(.1,qh.set(Ni.x-n.position.x,Ni.y-n.position.y,Ni.z-n.position.z).dot(Qn));i.aimOrigin.copy(n.position).addScaledVector(Qn,m),i.aimDir.copy(Qn)}e.audio.setListener(n.position.x,n.position.y,n.position.z,this.yaw)}cameraTarget(){return null}};var w_={pro:{id:"pro",aimErr:2.1,react:.35,vis:150,hear:1,turn:11,strafe:1,heal:1,aggression:.85,burst:[1.6,.12],loot:1,nade:.5,storm:1,jumpy:.5,fireGap:0},mid:{id:"mid",aimErr:5.2,react:.7,vis:110,hear:.7,turn:7,strafe:.55,heal:.75,aggression:.6,burst:[1,.35],loot:.8,nade:.15,storm:.85,jumpy:.15,fireGap:.08},noob:{id:"noob",aimErr:10.5,react:1.2,vis:65,hear:.45,turn:3.8,strafe:.15,heal:.3,aggression:.4,burst:[.7,.7],loot:.55,nade:.03,storm:.45,jumpy:.05,fireGap:.25}},$f={pistol:20,smg:16,rifle:38,shotgun:9,sniper:95,lmg:38,launcher:38,bow:60,melee:2.2},Yh=new L,rc=new L;var Zf=["Sweaty","Cranky","Lucky","Silent","Rusty","Crispy","Turbo","Sneaky","Wobbly","Salty","Spicy","Cosmic","Dizzy","Frosty","Grumpy","Jolly","Mighty","Nimble","Peppy","Rowdy","Shady","Zesty","Bouncy","Clumsy","Fuzzy","Gritty","Hasty","Quirky"],jf=["Noodle","Pickle","Falcon","Waffle","Bandit","Panda","Goblin","Cactus","Walrus","Ninja","Biscuit","Muffin","Rocket","Taco","Yeti","Badger","Cowboy","Llama","Pirate","Gizmo","Potato","Viking","Wizard","Raccoon","Sheriff","Mango","Toaster","Banjo"];function Jf(r){let t=new Set;for(;t.size<r;){let e=Zf[Math.floor(Math.random()*Zf.length)],i=jf[Math.floor(Math.random()*jf.length)],n=Math.random(),s=e+i;n<.25?s+=Math.floor(Math.random()*99):n<.35?s="xX"+s+"Xx":n<.42&&(s=s.toUpperCase()),t.add(s)}return[...t]}var oc=class{constructor(t,e,i){this.game=t,this.ch=e,this.sk=w_[i],this.state="bus",this.thinkT=Math.random()*.3,this.t=0,this.goal=null,this.route=[],this.enemy=null,this.enemyVisible=!1,this.lastSeen=-99,this.noticeT=0,this.lastKnown=new L,this.lootTarget=null,this.black=new Map,this.strafeDir=Math.random()<.5?-1:1,this.strafeT=0,this.wob=new Vt,this.wobTarget=new Vt,this.wobT=0,this.stuckT=0,this.lastPos=new L,this.lastPosT=0,this.sidestepT=0,this.sidestepDir=1,this.weaponT=0,this.fireWindow=0,this.fireRest=0,this.semiT=0,this.idleT=0,this.investigate=null,this.landing=null,this.jumpDist=230+Math.random()*40,this.healItem=null,this.satisfied=!1,this.lootStart=0,this.wantThrow=null,this.avoidBias=Math.random()<.5?1:-1,this.travelGoal=null,this.hunt=0,this.lastEnemyDist=0,this.dropTarget=null}onNoise(t,e,i){let n=this.ch;if(!n.alive||i===n||n.mode!=="normal")return;let s=Math.hypot(t.x-n.pos.x,t.z-n.pos.z);s>e*this.sk.hear||s<3||this.enemy&&this.enemyVisible||(!this.investigate||this.game.time-this.investigate.t>3)&&(this.investigate={x:t.x,z:t.z,t:this.game.time,src:i})}onDamaged(t){!t||t===this.ch||!t.alive||(!this.enemy||!this.enemy.alive||!this.enemyVisible)&&(this.enemy=t,this.noticeT=this.sk.react*.6,this.lastKnown.copy(t.pos),this.lastSeen=this.game.time,this.enemyVisible=!1,this.hunt=4,this.ch.yaw=Math.atan2(-(t.pos.x-this.ch.pos.x),-(t.pos.z-this.ch.pos.z))+(Math.random()-.5)*.5*(1-this.sk.react))}update(t){let e=this.ch;if(!e.alive)return;this.t+=t;let i=e.input;if(i.firePressed=!1,i.jumpPressed=!1,e.mode==="bus")return this.updateBus();if(e.mode==="skydive"||e.mode==="glide")return this.updateDrop();e.mode==="normal"&&(this.thinkT-=t,this.thinkT<=0&&(this.thinkT=.16+Math.random()*.1,this.think()),this.execute(t))}pickDropTarget(){let t=this.game,e=t.bus,i=[],n=new L;for(let a of $e)e.lateralDistance(a.x,a.z)>330||i.push([{x:a.x+(Math.random()-.5)*a.flatR*1.6,z:a.z+(Math.random()-.5)*a.flatR*1.6,poi:a},2.4+(a.id==="neon_heights"||a.id==="parkour_plaza"?.8:0)]);if(t.world.homesteads)for(let a of t.world.homesteads)e.lateralDistance(a.x,a.z)<300&&i.push([{x:a.x,z:a.z},1.6]);for(let a of t.world.outposts||[])e.lateralDistance(a.x,a.z)<300&&i.push([{x:a.x,z:a.z},1.6]);for(let a=0;a<3;a++){let l=Math.random()*e.length,c=(Math.random()-.5)*600,h=e.start.x+e.dir.x*l-e.dir.z*c,u=e.start.z+e.dir.z*l+e.dir.x*c;Math.hypot(h,u)<Ot.islandR-40&&t.world.terrain.height(h,u)>2&&i.push([{x:h,z:u},2.2])}let s=0;for(let a of i)s+=a[1];let o=Math.random()*s;for(let a of i)if(o-=a[1],o<=0)return a[0];return i.length?i[0][0]:{x:0,z:0}}updateBus(){let t=this.game,e=t.bus,i=this.ch;this.dropTarget||(this.dropTarget=this.pickDropTarget(),this.jumpDist=215+Math.random()*45,this.sk.id==="noob"&&Math.random()<.3&&(this.jumpDist=80+Math.random()*120),this.sk.id==="pro"&&Math.random()<.3&&(this.jumpDist=250+Math.random()*40));let n=Math.hypot(e.pos.x-this.dropTarget.x,e.pos.z-this.dropTarget.z),s=this.dropTarget.x-e.pos.x,o=this.dropTarget.z-e.pos.z,a=s*e.dir.x+o*e.dir.z,l=Math.hypot(e.pos.x,e.pos.z)<Ot.islandR+180;t.time-t.busStartT>3&&l&&(n<=this.jumpDist||a<60&&n<330)&&t.jumpFromBus(i)}updateDrop(){let t=this.ch,e=t.input,i=this.dropTarget||{x:0,z:0},n=i.x-t.pos.x,s=i.z-t.pos.z,o=Math.hypot(n,s),a=this.game.world.terrain.height(t.pos.x,t.pos.z),l=t.pos.y-a,c=Math.atan2(-n,-s);t.yaw=Tl(t.yaw,c,5,.05)+0*this.t,t.yaw=c+Math.sin(this.t*.7+t.seed)*.02,t.mode==="skydive"?(e.fwd=o>130?1:0,o<60&&l>200&&(e.fwd=-1)):o>l*1.5+15?e.fwd=1:o<l*.6?e.fwd=-1:e.fwd=0,e.strafe=0,t.mode==="glide"&&a<-.5&&o<60&&(this.dropTarget={x:i.x*.9,z:i.z*.9})}think(){let t=this.game,e=this.ch,i=this.sk,n=t.time;if(this.scanEnemies(n),this.state==="flee"){if(n>this.fleeUntil||!this.goal||this.reached(this.goal))this.state="loot",this.goal=null;else if(!(this.enemy&&this.enemy.alive&&this.enemyVisible))return}if(this.enemy&&this.enemy.alive&&(this.enemyVisible||n-this.lastSeen<4)){this.state!=="fight"&&(this.state="fight",this.fireWindow=0,this.fireRest=0);return}this.state==="fight"&&(this.state="loot",this.enemy=null,this.goal=null);let s=this.pickHeal();if(s&&n-this.lastSeen>2.5&&Math.random()<i.heal){this.healItem=s,this.state="heal";return}this.state==="heal"&&!this.ch.using&&(this.state="loot");let o=t.storm,a=!1,l=null;if(o.active){let c=o.inside(e.pos.x,e.pos.z),h=Math.hypot(e.pos.x-o.nx,e.pos.z-o.nz),u=h>o.nr*.85,d=o.state==="shrink"?o.remaining:o.state==="hold"?o.remaining+10:5,f=(h-o.nr*.7)/8.5;if(c?u&&(o.state==="shrink"||f*(1.2+(1-i.storm))>d)&&(a=!0):a=!0,i.id==="noob"&&c&&Math.random()<.6&&(a=!1),a||u&&i.storm>.8&&o.state==="hold"&&o.remaining<50){let g=Math.atan2(e.pos.z-o.nz,e.pos.x-o.nx),x=o.nr*.55*Math.random();l={x:o.nx+Math.cos(g)*x*.3,z:o.nz+Math.sin(g)*x*.3}}}if(a){this.state="travel",this.setGoal(l.x,l.z,!0,6),this.lootTarget=null,this.useSpeedBoost();let c=this.findLoot(18);c&&(this.state="loot",this.lootTarget=c,this.setGoalForLoot(c));return}if(this.investigate&&n-this.investigate.t<8&&Math.random()<.7*i.aggression+.1&&this.hasWeapon()){this.state!=="investigate"&&(this.state="investigate",this.setGoal(this.investigate.x,this.investigate.z,i.id!=="noob",12)),Math.hypot(e.pos.x-this.investigate.x,e.pos.z-this.investigate.z)<14&&(this.investigate=null,this.state="loot",this.goal=null);return}else this.state==="investigate"&&(this.state="loot",this.goal=null);if(i.id==="noob"&&this.state!=="idle"&&Math.random()<.012&&!this.lootTarget&&(this.state="idle",this.idleT=1.5+Math.random()*3),this.state==="idle"){this.idleT-=.2,this.idleT<=0&&(this.state="loot");return}if(this.lootTarget&&(this.lootStillValid(this.lootTarget)||(this.lootTarget=null,this.goal=null)),!this.lootTarget){let c=this.findLoot(this.hasWeapon()?120:160);c&&(this.lootTarget=c,this.setGoalForLoot(c),this.state="loot")}if(!this.lootTarget&&(!this.goal||this.state!=="travel"||this.reached(this.goal))){let c=this.pickRoam();this.state="travel",this.setGoal(c.x,c.z,!0,8)}if(this.chooseWeapon(60,!0),!e.grounded&&e.vel.y<-20&&e.mode==="normal"&&!e.swimming){let c=e.inv.find(h=>h.def.id==="floorange");c>=0&&(e.equip(c),e.input.firePressed=!0)}}hasWeapon(){let t=this.ch.inv;for(let e=1;e<t.slots.length;e++){let i=t.slots[e];if(i&&i.def.kind==="gun"&&(i.mag>0||t.ammo[i.def.ammo]>0))return!0}return!1}useSpeedBoost(){let t=this.ch;if(t.buffs.speedT>0||t.using)return;let e=t.inv.find(i=>i.def.id==="jumpple");e>=0&&Math.random()<.5&&(this.healItem=e,this.state="heal")}pickHeal(){let t=this.ch,e=t.inv;if(t.using)return null;let i=n=>e.find(s=>s.def.id===n);if(t.hp<50){let n=i("medkit");if(n>=0)return n}if(t.shield<30){let n=i("chug_jug");if(n>=0&&t.hp<70||(n=i("big_shield"),n>=0)||(n=i("slurp"),n>=0))return n}if(t.shield<50){let n=i("small_shield");if(n>=0)return n}if(t.hp<75){let n=i("bandage");if(n>=0||(n=i("medkit"),n>=0&&t.hp<60))return n}if(t.hp<95){let n=i("apple");if(n>=0||(n=i("banana"),n>=0))return n}if(t.shield<90){let n=i("mushroom");if(n>=0)return n}return null}scanEnemies(t){let e=this.game,i=this.ch,n=this.sk,s=i.eyePos(Yh),o=[],a=-Math.sin(i.yaw),l=-Math.cos(i.yaw);for(let h of e.chars){if(h===i||!h.alive||h.mode==="bus")continue;let u=h.pos.x-i.pos.x,d=h.pos.z-i.pos.z,f=u*u+d*d,g=n.vis;if((h.mode==="skydive"||h.mode==="glide")&&(g=50),h.crouching&&(g*=.8),f>g*g)continue;let x=Math.sqrt(f);(u*a+d*l)/Math.max(x,.1)<-.35&&x>14&&h!==this.enemy||o.push([x,h])}o.sort((h,u)=>h[0]-u[0]);let c=null;for(let h=0;h<Math.min(3,o.length);h++){let u=o[h][1];if(rc.set(u.pos.x,u.pos.y+1.2,u.pos.z),e.world.collision.clearLine(s.x,s.y,s.z,rc.x,rc.y,rc.z)){c=u;break}}if(c){(c!==this.enemy||!this.enemyVisible&&t-this.lastSeen>1)&&(c!==this.enemy?this.noticeT=n.react*(.7+Math.random()*.6):t-this.lastSeen>2&&(this.noticeT=n.react*.5));let h=Math.hypot(c.pos.x-i.pos.x,c.pos.z-i.pos.z),u=this.hasWeapon(),d=t-i.lastDamageT<6,f=u||h<4.5&&(d||n.id==="pro"&&Math.random()<.3),g=!u&&h>=4.5&&d;if(f&&(Math.random()<n.aggression+.25||this.enemy===c||h<25))this.enemy=c,this.enemyVisible=!0,this.lastSeen=t,this.lastKnown.copy(c.pos),this.lastEnemyDist=h;else if(g&&this.state!=="flee"){this.enemy=null,this.state="flee";let x=Math.atan2(i.pos.z-c.pos.z,i.pos.x-c.pos.x)+(Math.random()-.5)*1.2;this.setGoal(i.pos.x+Math.cos(x)*45,i.pos.z+Math.sin(x)*45,!0,5),this.fleeUntil=t+6}}else this.enemyVisible=!1,this.enemy&&!this.enemy.alive&&(this.enemy=null)}bestGunDps(){let t=0;for(let e of this.ch.inv.slots)e&&e.def.kind==="gun"&&(t=Math.max(t,_o(e)));return t}valueOfDrop(t){let e=this.ch,i=e.inv;if(this.black.has(t.id)&&this.black.get(t.id)>this.game.time)return 0;if(t.ammo){let a=i.slots.some(c=>c&&c.def.kind==="gun"&&c.def.ammo===t.ammo),l=1-i.ammo[t.ammo]/fi[t.ammo].max;return(a?4:.2)*l}let n=t.stack,s=n.def,o=i.freeSlot()>=0;switch(s.kind){case"gun":{let a=_o(n),l=this.bestGunDps(),c=i.slots.filter(u=>u&&u.def.kind==="gun").length;if(c===0)return 14+a/12;if(o&&c<3)return 6+a/25;let h=a-l;return h>l*.12?2+h/15:0}case"melee":return!o||i.slots.some(a=>a&&a.def.kind==="melee"&&a.def.weight>0)?0:1.2;case"consume":{let a=i.countOf(s.id);if(!o&&a===0)return 0;let l={medkit:4.5,big_shield:4.5,small_shield:3.8,bandage:2.6,chug_jug:9,slurp:5,apple:.8,banana:.8,mushroom:1,jumpple:1.5,floorange:1.2}[s.id]||1;return a>=s.stack*.7?0:l}case"throw":return o||i.countOf(s.id)>0?1.6:0;case"gadget":return o&&this.sk.id!=="noob"?1.1:0;default:return 0}}findLoot(t){let e=this.game,i=this.ch,n=e.loot,s=e.world,o=null,a=.07,l=this.sk,c=n.nearbyDrops(i.pos.x,i.pos.z,t,[]);for(let u of c){if(!u.settled||!n.canTake(i,u))continue;let d=s.buildingAt(u.pos.x,u.pos.z);if(u.elevated&&!d)continue;let f=this.valueOfDrop(u);if(f<=0)continue;l.id==="noob"&&(f*=.6+Math.random()*.8);let g=Math.hypot(u.pos.x-i.pos.x,u.pos.z-i.pos.z)+(d&&!s.buildingAt(i.pos.x,i.pos.z)?10:0)+Math.abs(u.pos.y-i.pos.y)*6,x=f*l.loot/(g+14);x>a&&(a=x,o={kind:"drop",d:u})}let h=this.chestWant();if(h>0)for(let u of n.chests){if(u.opened||this.black.has(u)&&this.black.get(u)>e.time)continue;let d=u.x-i.pos.x,f=u.z-i.pos.z;if(d*d+f*f>(t+25)**2)continue;let g=s.buildingAt(u.x,u.z);if(u.elevated&&!g)continue;let x=Math.hypot(d,f)+(g&&!s.buildingAt(i.pos.x,i.pos.z)?10:0)+Math.abs(u.y-i.pos.y)*6,m=h*l.loot/(x+14);m>a&&(a=m,o={kind:"chest",c:u})}return o}chestWant(){let t=this.ch.inv,e=t.slots.filter(n=>n&&n.def.kind==="gun").length;return t.slots.filter(n=>n).length>=6&&e>=3?2.5:e===0?11:7}lootStillValid(t){let e=this.ch;return t.kind==="drop"?!t.d.dead&&this.game.loot.canTake(e,t.d)&&this.valueOfDrop(t.d)>0:!t.c.opened}setGoalForLoot(t){let e=t.kind==="drop"?t.d.pos.x:t.c.x,i=t.kind==="drop"?t.d.pos.z:t.c.z,n=t.kind==="drop"?t.d.pos.y:t.c.y;this.setGoal(e,i,!0,1.2,n)}pickRoam(){let t=this.game,e=this.ch,i=t.storm,n=[];for(let a of $e){let l=Math.hypot(a.x-e.pos.x,a.z-e.pos.z);l<50||l>650||i.active&&Math.hypot(a.x-i.nx,a.z-i.nz)>i.nr*.95||n.push([{x:a.x+(Math.random()-.5)*a.flatR,z:a.z+(Math.random()-.5)*a.flatR},3/(1+l/250)])}for(let a of t.world.outposts||[]){let l=Math.hypot(a.x-e.pos.x,a.z-e.pos.z);l<40||l>450||i.active&&Math.hypot(a.x-i.nx,a.z-i.nz)>i.nr||n.push([{x:a.x,z:a.z},1.5/(1+l/200)])}if(i.active){let a=Math.random()*6.283,l=Math.sqrt(Math.random())*i.nr*.8;n.push([{x:i.nx+Math.cos(a)*l,z:i.nz+Math.sin(a)*l},1.2])}if(!n.length)return{x:0,z:0};let s=0;for(let a of n)s+=a[1];let o=Math.random()*s;for(let a of n)if(o-=a[1],o<=0)return a[0];return n[0][0]}setGoal(t,e,i,n,s=null){let o=this.ch;this.goal={x:t,z:e,run:i,tol:n,y:s},this.route=this.game.world.planRoute(o.pos,t,e,s??this.game.world.terrain.height(t,e)),this.stuckT=0}reached(t){let e=this.ch;return Math.hypot(t.x-e.pos.x,t.z-e.pos.z)<t.tol}waypoint(){let t=this.ch;for(;this.route.length;){let e=this.route[0];if(Math.hypot(e.x-t.pos.x,e.z-t.pos.z)<1.1)this.route.shift();else return e}return this.goal}steerTo(t,e,i,n){let s=this.ch,o=s.input,a=this.game.world,l=t-s.pos.x,c=e-s.pos.z,h=Math.atan2(-l,-c),u=Math.hypot(l,c),d=h;if(u>1.5){let g=(m,p)=>{let y=-Math.sin(m),M=-Math.cos(m),_=s.pos.y+.9;if(a.collision.raycast(s.pos.x,_,s.pos.z,y,0,M,p,null)>=0)return!1;let S=s.pos.x+y*p,T=s.pos.z+M*p,b=a.terrain.height(S,T);return!(b<-.8&&s.pos.y>-.4&&!this.goalInWater||b-s.pos.y>1.6)},x=Math.min(3.6,u);if(!g(h,x)){let m=this.avoidBias>0?[.6,-.6,1.2,-1.2,1.9,-1.9]:[-.6,.6,-1.2,1.2,-1.9,1.9],p=!1;for(let y of m)if(g(h+y,x)){d=h+y,p=!0;break}p||(d=h+1.2*this.avoidBias)}}this.sidestepT>0&&(this.sidestepT-=n,d+=1.1*this.sidestepDir);let f=this.sk.turn*.7+3;s.yaw+=Yn(d-s.yaw)*(1-Math.exp(-f*n)),o.fwd=1,o.strafe=0,o.sprint=i}checkStuck(t,e){let i=this.ch;if(this.lastPosT+=t,this.lastPosT<.5)return;this.lastPosT=0;let n=Math.hypot(i.pos.x-this.lastPos.x,i.pos.z-this.lastPos.z);if(this.lastPos.copy(i.pos),!e){this.stuckT=0;return}n<.5&&i.grounded?(this.stuckT+=.5,i.input.jumpPressed=!0,this.stuckT>=1&&(this.sidestepT=.8,this.sidestepDir=Math.random()<.5?-1:1),this.stuckT>=3&&(this.avoidBias*=-1),this.stuckT>=6&&(this.lootTarget&&this.black.set(this.lootTarget.kind==="drop"?this.lootTarget.d.id:this.lootTarget.c,this.game.time+40),this.lootTarget=null,this.goal=null,this.route=[],this.stuckT=0)):this.stuckT=Math.max(0,this.stuckT-.5)}execute(t){let e=this.ch,i=e.input;if(i.fire=!1,i.ads=!1,i.crouch=!1,i.sprint=!1,i.fwd=0,i.strafe=0,e.danceT>0)return;let n=e.eyePos(Yh);e.aimOrigin.copy(n);let s=Math.cos(e.pitch),o=Math.sin(e.pitch);switch(e.aimDir.set(-Math.sin(e.yaw)*s,o,-Math.cos(e.yaw)*s),this.state){case"fight":this.doFight(t);break;case"heal":this.doHeal(t);break;case"idle":break;default:this.doMove(t);break}e.pitch+=(0-e.pitch)*Math.min(1,t*3)*(this.state==="fight"?0:1)}doMove(t){let e=this.ch,i=e.input,n=this.game;if(!this.goal){i.fwd=0;return}let s=this.lootTarget;if(s)if(s.kind==="drop"){let l=s.d;if(l.dead){this.lootTarget=null;return}if(Math.hypot(l.pos.x-e.pos.x,l.pos.z-e.pos.z)<1.6&&Math.abs(l.pos.y-e.pos.y)<2.4){n.loot.take(e,l)?this.afterPickup():this.black.set(l.id,n.time+30),this.lootTarget=null,this.thinkT=0;return}}else{let l=s.c,c=Math.hypot(l.x-e.pos.x,l.z-e.pos.z);if(l.opened){this.lootTarget=null;return}if(c<1.9&&Math.abs(l.y-e.pos.y)<2.4){let h=this.sk.id==="noob"?.8:1;n.loot.work(l,e,t*h),e.input.fwd=0;let u=Math.atan2(-(l.x-e.pos.x),-(l.z-e.pos.z));e.yaw+=Yn(u-e.yaw)*Math.min(1,t*8),l.opened&&(this.lootTarget=null,this.thinkT=.05);return}}let o=this.waypoint();if(!o)return;if(!s&&this.reached(this.goal)&&!this.route.length){this.goal=null,this.thinkT=0;return}let a=this.goal.run&&!e.using;this.goalInWater=!1,this.steerTo(o.x,o.z,a,t),this.sk.id==="pro"&&e.grounded&&e.input.sprint&&Math.random()<t*.15&&(e.input.jumpPressed=!0),this.sk.id==="noob"&&e.grounded&&Math.random()<t*.25&&(e.input.jumpPressed=!0),this.checkStuck(t,!0)}afterPickup(){this.weaponT=0,this.chooseWeapon(40,!0)}doHeal(t){let e=this.ch,i=e.input;!this.healItem&&!e.using&&(this.healItem=this.pickHeal()??-1);let n=this.healItem;if(n==null||n<0||!e.inv.slots[n]){this.state="loot",this.healItem=null;return}if(e.inv.sel!==n){e.equip(n);return}e.equipT>0||(e.using||e.startUse(e.inv.slots[n])||(this.state="loot",this.healItem=null,this.black.set(n,this.game.time+5)),i.fwd=0,!e.using&&this.state==="heal"&&(this.state="loot",this.healItem=null,this.chooseWeapon(40,!0)))}weaponScore(t,e){let i=this.ch,n=i.inv,s=t.def;if(s.kind==="melee")return e<3.5?(s.id==="pickaxe"?8:_o(t))*.9:0;if(s.kind!=="gun"||t.mag<=0&&n.ammo[s.ammo]<=0)return-1;let o=$f[s.cat]||30,a=(e-o)/(o*.9+8),l=Math.exp(-a*a);s.cat==="shotgun"&&e>32&&(l*=.15),s.cat==="sniper"&&e<18&&(l*=.25),s.cat==="launcher"&&e<9&&(l*=.1),s.cat==="pistol"&&e>70&&(l*=.5);let c=_o(t)*(.25+.75*l);return t.mag<=0&&(c*=.4),this.sk.id==="noob"&&(c*=.6+Math.random()*.8),c}chooseWeapon(t,e=!1){let i=this.ch;if(i.using||i.throwT>0||i.reload&&!e||this.weaponT>this.game.time&&!e)return;this.weaponT=this.game.time+1.2;let n=-1,s=-1;for(let o=0;o<i.inv.slots.length;o++){let a=i.inv.slots[o];if(!a)continue;let l=this.weaponScore(a,t);l>s&&(s=l,n=o)}n>=0&&n!==i.inv.sel&&i.equip(n)}doFight(t){let e=this.game,i=this.ch,n=i.input,s=this.sk,o=this.enemy;if(!o||!o.alive){this.state="loot",this.enemy=null;return}let a=e.time,l=this.enemyVisible,c=l?o.pos.x:this.lastKnown.x,h=l?o.pos.z:this.lastKnown.z,u=c-i.pos.x,d=h-i.pos.z,f=Math.hypot(u,d),x=(l?o.pos.y:this.lastKnown.y)+1.15+(s.id==="pro"&&f<70?.25:0)-(i.pos.y+i.eyeHeight);this.chooseWeapon(f);let m=i.stack,p=m?.def;if(l&&!this.wantThrow&&f>9&&f<28&&a-(this.lastThrow||0)>8&&Math.random()<s.nade*t*2){let k=i.inv.find(z=>z.def.kind==="throw"&&z.def.id!=="impulse"&&z.def.id!=="boogie"||z.def.id==="boogie");k>=0&&(this.wantThrow=k,this.lastThrow=a)}if(this.wantThrow!=null){let k=this.wantThrow;i.inv.slots[k]?i.inv.sel!==k?i.equip(k):i.equipT<=0&&i.throwT<=0&&(n.firePressed=!0,this.wantThrow=null,this.weaponT=0):this.wantThrow=null}if(this.wobT-=t,this.wobT<=0){this.wobT=.22;let k=l?Math.hypot(o.vel.x,o.vel.z):0,z=s.aimErr*(.55+f/85)*(1+k/11)*(Math.PI/180);this.wobTarget.set((Math.random()+Math.random()-1)*z,(Math.random()+Math.random()-1)*z*.8)}this.wob.lerp(this.wobTarget,Math.min(1,t*7));let y=0;p?.projectile&&l&&(y=f/p.projectile.speed);let M=c+(l?o.vel.x*y:0),_=h+(l?o.vel.z*y:0),v=M-i.pos.x,S=_-i.pos.z,T=Math.atan2(-v,-S),b=Math.atan2(x+(p?.projectile&&p.projectile.gravity>5?f*.18:0),Math.max(Math.hypot(v,S),.5));i.yaw+=Yn(T-i.yaw)*(1-Math.exp(-s.turn*t)),i.pitch+=(Re(b,-1.2,1.2)-i.pitch)*(1-Math.exp(-s.turn*t));let A=Yn(T-i.yaw),R=i.yaw+this.wob.x,I=i.pitch+this.wob.y,U=Math.cos(I);i.aimDir.set(-Math.sin(R)*U,Math.sin(I),-Math.cos(R)*U),i.aimOrigin.copy(i.eyePos(Yh)),i.extraSpread=0;let N=p?$f[p.cat]||30:20;this.strafeT-=t,this.strafeT<=0&&(this.strafeT=.6+Math.random()*1.3,this.strafeDir=Math.random()<.5?-1:1);let C=Math.random()<s.strafe+.05||this.strafeOn;if(this.strafeOn=s.strafe>Math.random(),l)f>N*1.35+4&&(p?.kind!=="gun"||s.aggression>.45||f<70)?(n.fwd=1,n.sprint=f>N*2):f<N*.45&&p?.kind==="gun"&&p.cat!=="shotgun"?n.fwd=-1:p?.kind==="melee"&&(n.fwd=f>1.8?1:0),C&&s.id!=="noob"?n.strafe=this.strafeDir*(.6+.4*s.strafe):s.id==="noob"&&(n.strafe=Math.random()<.2?this.strafeDir*.5:0),i.grounded&&Math.random()<s.jumpy*t*1.4&&f<35&&(n.jumpPressed=!0),p?.cat==="sniper"&&f>50&&(n.crouch=!0,n.fwd=0,n.strafe=0);else{if(this.hunt-=t,f>4&&(n.fwd=1,n.sprint=s.aggression>.5),a-this.lastSeen>4||this.hunt<-6){this.state="loot",this.enemy=null,this.goal=null;return}this.checkStuck(t,!0)}if(l&&n.fwd===0&&n.strafe===0&&this.checkStuck(t,!1),!p)return;if(n.ads=p.kind==="gun"&&f>22&&s.id!=="noob"&&Math.abs(A)<.25,!l||this.noticeT>0){this.noticeT=Math.max(0,this.noticeT-t);return}let D=Math.abs(A)<.12+1.2/Math.max(f,6)*.2;if(p.kind==="gun"){if(m.mag<=0||m.mag<=p.mag*.2&&f>50&&i.vel.lengthSq()<4){i.startReload();return}if(!D||i.reload)return;this.fireWindow-=t,this.fireWindow>0?p.auto?n.fire=!0:(this.semiT-=t,this.semiT<=0&&(n.fire=!0,n.firePressed=!0,this.semiT=1/p.rate+s.fireGap+Math.random()*s.fireGap)):(this.fireRest-=t,this.fireRest<=0&&(this.fireWindow=s.burst[0]*(.5+Math.random()),this.fireRest=s.burst[1]*(.5+Math.random()),p.rate<2&&(this.fireWindow=.3))),!p.auto&&p.rate<2.2&&i.fireCd<=0&&Math.random()<t*(s.id==="noob"?1.6:6)&&(n.fire=!0,n.firePressed=!0)}else p.kind==="melee"&&f<p.range+.3&&D&&(n.fire=!0,n.firePressed=!0)}};var Kf=49,ac=class{constructor(t,e){this.canvas=t,this.renderer=new Sl({canvas:t,antialias:!0,powerPreference:"high-performance"}),this.renderer.toneMapping=jr,this.renderer.toneMappingExposure=.92,this.renderer.outputColorSpace=Ie,this.renderer.shadowMap.enabled=!0,this.renderer.shadowMap.type=En,this.scene=new os,this.camera=new si(70,innerWidth/innerHeight,.2,4200),this.audio=new ec,this.state="loading",this.paused=!1,this.time=0,this.chars=[],this.bots=[],this.botOf=new Map,this.player=null,this.controller=null,this.dynPads=[],this.allPads=[],this.shakeAmount=0,this.aliveCount=50,this.busStartT=0,this.matchStartT=0,this.fps=60,this.pendingResult=null,this.forcedJump=!1,this.hud=new ic(this,e),addEventListener("resize",()=>this.onResize())}onResize(){this.renderer.setSize(innerWidth,innerHeight),this.camera.aspect=innerWidth/innerHeight,this.camera.updateProjectionMatrix()}async init(){Wf(),this.hud.syncSettings(),this.renderer.setPixelRatio(1),this.renderer.setSize(innerWidth,innerHeight),this.camera.fov=te.fov,this.camera.updateProjectionMatrix(),this.world=new Gl(this.renderer,this.scene),await this.world.build((t,e)=>this.hud.loading(t,e)),this.fx=new Xl(this.scene,this.world.textures,this),this.combat=new Zl(this),this.loot=new Kl(this),this.storm=new Ql(this),this.bus=new tc(this),this.controller=new sc(this,null,this.canvas),this.audio.setVolume(te.volume),this.applyGraphics(te.graphics),this.allPads=this.world.jumpPads.slice(),this.menuCamera(0),this.world.terrain.update(this.camera.position,!0),this.state="menu",this.hud.show("loading",!1),this.hud.show("title",!0),this.lastT=performance.now(),this.world.paintMap().then(()=>{this.mapReady=!0})}applyGraphics(t,e=!1){te.graphics=t,e&&(te.chosen=!0),gr();let i=vo[t];this.graphics=i,this.world.applyGraphics(i),this.loot.visualRadius=t==="low"?70:t==="ultra"?160:110,this.fx.setQuality(i.particles),this.onResize(),this.hud.syncSettings()}inputEnabled(){return!this.paused&&(this.state==="bus"||this.state==="playing"||this.state==="dead")}nearPlayer(t,e){return Math.hypot(t.x-this.camera.position.x,t.z-this.camera.position.z)<e}jumpPads(){return this.allPads}shouldDrawTracer(t,e){if(t.isPlayer)return!0;let i=this.camera.position;return Math.hypot(t.pos.x-i.x,t.pos.z-i.z)<170||Math.hypot(e.x-i.x,e.z-i.z)<120}shake(t){this.shakeAmount=Math.max(this.shakeAmount,t)}explosionShake(t,e){let i=Math.hypot(t.x-this.camera.position.x,t.y-this.camera.position.y,t.z-this.camera.position.z);i<e*6&&this.shake(Math.min(1.2,(1-i/(e*6))*1.4))}addJumpPad(t){let e=new kt,i=new Et(new ve(1.6,1.7,.18,18),new re({color:1843499,roughness:.6})),n=new Et(new ve(1.3,1.3,.06,18),new se({color:6285567}));n.position.y=.12,e.add(i,n),e.position.set(t.x,t.y+.09,t.z),this.scene.add(e),t.mesh=e,this.dynPads.push(t),this.refreshPads()}refreshPads(){this.allPads=this.world.jumpPads.concat(this.dynPads)}noise(t,e,i){for(let n of this.bots)n.onNoise(t,e,i)}clearMatch(){for(let t of this.chars)t.dispose();this.chars=[],this.bots=[],this.botOf.clear();for(let t of this.combat.projectiles)this.scene.remove(t.mesh);this.combat.projectiles=[];for(let t of this.dynPads)this.scene.remove(t.mesh);this.dynPads=[],this.refreshPads(),this.loot.clear(),this.fx.add.count=0,this.fx.alpha.count=0,this.storm.stop(),this.bus.active=!1,this.bus.group.visible=!1,this.player=null,this.hud.$("#feed").innerHTML="",this.hud.$("#toasts").innerHTML="",this.hud.$("#pickups").innerHTML="",this.hud.lastHot="",this.hud.lastAmmo=""}startMatch(){if(this.state==="loading")return;this.clearMatch(),this.paused=!1,this.pendingResult=null,this.resultShown=!1,clearTimeout(this.resultTimer),this.hud.show("title",!1),this.hud.show("result",!1),this.hud.show("pause",!1),this.hud.showHud(!0),this.hud.mapOpen=!1,this.hud.$("#bigmap").classList.add("hidden");let t=Jf(Kf),e=Al([...Array(12).fill("pro"),...Array(19).fill("mid"),...Array(18).fill("noob")]),i=new Mo(this,{id:0,name:"You",isPlayer:!0,seed:3,look:{shirt:16758318,pants:2568778,hat:null,hair:2759184,pack:3042264},gliderColor:3533055});this.player=i,this.chars.push(i);for(let n=0;n<Kf;n++){let s=new Mo(this,{id:n+1,name:t[n],seed:100+n*7,skill:e[n]}),o=new oc(this,s,e[n]);this.chars.push(s),this.bots.push(o),this.botOf.set(s,o)}this.aliveCount=this.chars.length,this.loot.populate(),this.bus.launch(),this.storm.start();for(let n of this.chars)n.setMode("bus"),n.alive=!0,n.pos.copy(this.bus.pos);this.controller.char=i,this.controller.yaw=this.bus.group.rotation.y,this.controller.pitch=-.2,this.controller.spectate.target=null,this.forcedJump=!1,this.busStartT=this.time,this.matchStartT=this.time,this.state="bus",this.audio.init(),this.audio.play("bus"),this.hud.toast("The Battle Bus is on its way!"),this.controller.requestLock(),this.hud.syncSettings()}returnToMenu(){this.paused=!1,clearTimeout(this.resultTimer),this.clearMatch(),this.controller.char=null,this.hud.showHud(!1),this.hud.show("pause",!1),this.hud.show("result",!1),this.hud.show("title",!0),this.state="menu",this.audio.setWind(0),this.audio.setStorm(0),this.resultShown=!1,this.releaseLock()}togglePause(){this.state==="menu"||this.state==="loading"||performance.now()-(this.pauseChangedAt||0)<250||(this.paused?this.resume():this.pause())}releaseLock(){this.lockReleasing=!0;try{document.exitPointerLock()}catch{}setTimeout(()=>{this.lockReleasing=!1},400)}pause(){this.paused||!["bus","playing","dead","ended"].includes(this.state)||(this.pauseChangedAt=performance.now(),this.paused=!0,this.hud.show("pause",!0),this.audio.setWind(0),this.releaseLock())}resume(){this.pauseChangedAt=performance.now(),this.paused=!1,this.hud.show("pause",!1),this.controller.requestLock()}onLockLost(){this.lockReleasing||this.resultShown||["bus","playing","dead"].includes(this.state)&&!this.paused&&!this.hud.mapOpen&&this.pause()}spectate(){this.resultShown=!1,this.state="dead",this.hud.toast("Spectating \xB7 E / Q to switch player"),this.controller.requestLock()}jumpFromBus(t){if(t.mode!=="bus"||!t.alive)return;let e=this.bus,i=t.isPlayer?0:3;t.place(e.pos.x+(Math.random()-.5)*i,e.pos.y-4,e.pos.z+(Math.random()-.5)*i),t.vel.set(e.dir.x*20,-10,e.dir.z*20),t.yaw=Math.atan2(-e.dir.x,-e.dir.z),t.setMode("skydive"),t.isPlayer&&(this.state="playing",this.controller.yaw=t.yaw,this.hud.toast("W to dive \xB7 Space to open the glider"),this.audio.play("glider",null,{vol:.4}))}onDamage(t,e,i,n,s){let o=this.player;if(t.isPlayer)this.hud.flashDamage(Math.min(.85,i/45+.15)),this.audio.play(s?"shield_break":"hurt",null,{vol:.8}),n.type!=="storm"&&this.shake(Math.min(.5,i*.012)),e&&e!==t&&this.hud.hitFrom(e.pos);else{let a=this.botOf.get(t);a&&e&&a.onDamaged(e)}e&&e.isPlayer&&t!==e&&(this.hud.hitmarker(n.headshot),this.audio.play(n.headshot?"headshot":"hit",null,{vol:.9}),this.hud.damageNumber(new L(t.pos.x,t.pos.y+1.9,t.pos.z),i,n.headshot))}onElimination(t,e,i,n){let s=this.aliveCount;this.aliveCount--,t.placement=s;let o=e&&e!==t?e:null,a,l=i.weapon?.icon||"\u{1F52B}";o?a=`<b>${o.name}</b> ${l} ${t.name}`:i.type==="storm"?a=`${t.name} was caught in the storm \u26C8`:i.type==="fall"?a=`${t.name} fell to their death \u{1F480}`:a=`${t.name} was eliminated`,this.hud.feed(a,o?.isPlayer?"me":t.isPlayer?"die":""),this.loot.dropAll(t),this.fx.teleport(t.pos,"cyan"),this.audio.play("elim",t.pos,{max:120,vol:.5}),o&&(o.kills++,o.isPlayer&&this.hud.elimToast(t.name,o.kills)),t.isPlayer&&(this.state="dead",this.audio.play("elim",null),this.controller.spectate.target=o&&o.alive?o:null,this.pendingResult={win:!1,placement:s,kills:t.kills,damage:t.stats.damage,time:this.time-this.matchStartT,killer:o?.name||(i.type==="storm"?"the storm":i.type==="fall"?"a fall":null),total:this.chars.length},this.resultTimer=setTimeout(()=>{this.pendingResult&&this.state==="dead"&&(this.resultShown=!0,this.hud.showResult(this.pendingResult)),this.releaseLock()},2200)),this.aliveCount<=1&&this.endMatch()}endMatch(){if(this.state==="ended")return;let t=this.chars.find(e=>e.alive);t?.isPlayer?(this.state="ended",this.audio.play("win",null),this.hud.feed("<b>VICTORY ROYALE!</b>","me"),this.resultTimer=setTimeout(()=>{this.resultShown=!0,this.hud.showResult({win:!0,placement:1,kills:t.kills,damage:t.stats.damage,time:this.time-this.matchStartT,total:this.chars.length}),this.releaseLock()},2500)):(this.hud.toast(`${t?t.name:"Nobody"} wins the match`),this.state!=="dead"&&(this.state="ended"),this.pendingResult&&(this.pendingResult.winner=t?.name))}menuCamera(t){let e=this.time*.045,i=this.camera;i.position.set(Math.cos(e)*560,250+Math.sin(this.time*.1)*30,Math.sin(e)*560),i.lookAt(0,20,0)}frame(t){let e=(t-this.lastT)/1e3;this.lastT=t,e>0||(e=1/60),e=Math.min(e,.05),this.fps+=(1/e-this.fps)*.1,this.autoTune(e),this.step(e),this.render()}autoTune(t){if(this.state!=="menu"||te.chosen||!this.mapReady)return;let e=this.tune||(this.tune={t:0,samples:[]});if(e.t+=t,e.t>1.5&&e.samples.push(t),e.t<5)return;te.chosen=!0;let i=e.samples.sort((s,o)=>s-o);(i[Math.floor(i.length/2)]||0)>1/22&&te.graphics!=="low"?(this.applyGraphics("low"),te.chosen=!0,gr(),this.hud.setNote("Slow graphics detected, so Low was selected. You can change this below.")):gr()}render(){this.renderer.render(this.scene,this.camera)}step(t){if(this.state==="loading")return;if(!(this.player&&this.state!=="menu")){this.time+=t,this.menuCamera(t),this.world.update(this.camera,this.camera.position,t,this.time),this.fx.update(t,this.camera,this.renderer);return}if(this.paused){this.world.update(this.camera,this.camera.position,0,this.time);return}this.time+=t;let i=this.player,n=this.bus;n.update(t);for(let c of this.chars)c.alive&&c.mode==="bus"&&(c.pos.copy(n.pos),c.pos.y-=3);let s=n.active&&n.progress>.5&&Math.hypot(n.pos.x,n.pos.z)>Ot.islandR-90;if((!n.active||s)&&!this.forcedJump&&this.chars.some(c=>c.mode==="bus"&&c.alive)){this.forcedJump=!0;for(let c of this.chars)c.mode==="bus"&&c.alive&&this.jumpFromBus(c)}this.storm.update(t,this.time),this.controller.update(t);for(let c of this.bots)c.update(t);let o=this.camera.position,a=Math.min(this.graphics.viewDistance*.95,900);for(let c of this.chars){if(c.isPlayer){c.renderOn=!0;continue}let h=Math.hypot(c.pos.x-o.x,c.pos.z-o.z),u=c.mode!=="bus"&&h<a&&(c.alive||c.deadT<40);c.renderOn=u,c.mode!=="bus"&&(c.root.visible=u);let d=u&&h<90&&this.graphics.shadowMap>0;d!==c.shadowOn&&(c.shadowOn=d,c.root.traverse(f=>{f.isMesh&&(f.castShadow=d)}))}for(let c of this.chars)c.update(t);this.separate(),this.combat.update(t);for(let c=this.dynPads.length-1;c>=0;c--)this.time>this.dynPads[c].expires&&(this.scene.remove(this.dynPads[c].mesh),this.dynPads.splice(c,1),this.refreshPads());this.loot.update(t,o,this.time),this.fx.update(t,this.camera,this.renderer);let l=i.alive||!this.controller.spectate.target?i.pos:this.controller.spectate.target.pos;if(this.world.update(this.camera,l,t,this.time),this.hud.update(t,this.fps),i.alive&&i.mode==="skydive"?this.audio.setWind(Qf(-i.vel.y/60,0,1)):i.alive&&i.mode==="glide"?this.audio.setWind(.35):this.audio.setWind(0),this.storm.active){let c=this.storm.edgeDistance(o.x,o.z);this.audio.setStorm(c<0?1:Qf(1-c/120,0,.7))}this.shakeAmount=Math.max(0,this.shakeAmount-t*1.4),this.state==="bus"&&i.mode!=="bus"&&(this.state="playing")}separate(){let t=this.chars;for(let e=0;e<t.length;e++){let i=t[e];if(!(!i.alive||i.mode!=="normal"))for(let n=e+1;n<t.length;n++){let s=t[n];if(!s.alive||s.mode!=="normal")continue;let o=s.pos.x-i.pos.x,a=s.pos.z-i.pos.z,l=o*o+a*a;if(l>.64*.64||l<1e-6||Math.abs(i.pos.y-s.pos.y)>1.5)continue;let c=Math.sqrt(l),h=(.64-c)*.5;i.pos.x-=o/c*h,i.pos.z-=a/c*h,s.pos.x+=o/c*h,s.pos.z+=a/c*h}}}},Qf=(r,t,e)=>r<t?t:r>e?e:r;var tp=document.getElementById("game"),E_=document.getElementById("ui"),xr=new ac(tp,E_);window.__game=xr;window.__items={ITEMS:Yi,makeStack:Jn};var T_=/[?&]manual/.test(location.search);window.__step=(r,t=1/30)=>{let e=Math.round(r/t);for(let i=0;i<e;i++)xr.step(t)};window.__shot=()=>(xr.render(),tp.toDataURL("image/png"));xr.init().then(()=>{if(window.__ready=!0,T_)return;let r=t=>{xr.frame(t),requestAnimationFrame(r)};xr.lastT=performance.now(),requestAnimationFrame(r)}).catch(r=>{console.error(r);let t=document.getElementById("loadtxt");t&&(t.textContent="Failed to start: "+r.message)});})();
