var Y=(i,t,e)=>{if(!t.has(i))throw TypeError("Cannot "+e)};var s=(i,t,e)=>(Y(i,t,"read from private field"),e?e.call(i):t.get(i)),h=(i,t,e)=>{if(t.has(i))throw TypeError("Cannot add the same private member more than once");t instanceof WeakSet?t.add(i):t.set(i,e)},n=(i,t,e,r)=>(Y(i,t,"write to private field"),r?r.call(i,e):t.set(i,e),e);var d=(i,t,e)=>(Y(i,t,"access private method"),e);import{P as mt,Q as Z,R as Ct,T as ct,U as lt,V as Ot,W as Et,X as Qt,Y as dt,Z as Rt,r as m,$ as St,a0 as Ut}from"./index-4DSTFKSX.js";var p,a,F,f,E,T,g,A,P,x,Q,S,O,U,w,M,L,$,k,G,B,J,j,tt,K,et,V,st,W,it,_,bt,yt,wt=(yt=class extends mt{constructor(t,e){super();h(this,w);h(this,L);h(this,k);h(this,B);h(this,j);h(this,K);h(this,V);h(this,W);h(this,_);h(this,p,void 0);h(this,a,void 0);h(this,F,void 0);h(this,f,void 0);h(this,E,void 0);h(this,T,void 0);h(this,g,void 0);h(this,A,void 0);h(this,P,void 0);h(this,x,void 0);h(this,Q,void 0);h(this,S,void 0);h(this,O,void 0);h(this,U,void 0);n(this,a,void 0),n(this,F,void 0),n(this,f,void 0),n(this,U,new Set),n(this,p,t),this.options=e,n(this,g,null),this.bindMethods(),this.setOptions(e)}bindMethods(){this.refetch=this.refetch.bind(this)}onSubscribe(){this.listeners.size===1&&(s(this,a).addObserver(this),ft(s(this,a),this.options)?d(this,w,M).call(this):this.updateResult(),d(this,j,tt).call(this))}onUnsubscribe(){this.hasListeners()||this.destroy()}shouldFetchOnReconnect(){return rt(s(this,a),this.options,this.options.refetchOnReconnect)}shouldFetchOnWindowFocus(){return rt(s(this,a),this.options,this.options.refetchOnWindowFocus)}destroy(){this.listeners=new Set,d(this,K,et).call(this),d(this,V,st).call(this),s(this,a).removeObserver(this)}setOptions(t,e){const r=this.options,y=s(this,a);if(this.options=s(this,p).defaultQueryOptions(t),Z(r,this.options)||s(this,p).getQueryCache().notify({type:"observerOptionsUpdated",query:s(this,a),observer:this}),typeof this.options.enabled<"u"&&typeof this.options.enabled!="boolean")throw new Error("Expected enabled to be a boolean");this.options.queryKey||(this.options.queryKey=r.queryKey),d(this,W,it).call(this);const u=this.hasListeners();u&&pt(s(this,a),y,this.options,r)&&d(this,w,M).call(this),this.updateResult(e),u&&(s(this,a)!==y||this.options.enabled!==r.enabled||this.options.staleTime!==r.staleTime)&&d(this,L,$).call(this);const o=d(this,k,G).call(this);u&&(s(this,a)!==y||this.options.enabled!==r.enabled||o!==s(this,O))&&d(this,B,J).call(this,o)}getOptimisticResult(t){const e=s(this,p).getQueryCache().build(s(this,p),t),r=this.createResult(e,t);return Ft(this,r)&&(n(this,f,r),n(this,T,this.options),n(this,E,s(this,a).state)),r}getCurrentResult(){return s(this,f)}trackResult(t){const e={};return Object.keys(t).forEach(r=>{Object.defineProperty(e,r,{configurable:!1,enumerable:!0,get:()=>(s(this,U).add(r),t[r])})}),e}getCurrentQuery(){return s(this,a)}refetch({...t}={}){return this.fetch({...t})}fetchOptimistic(t){const e=s(this,p).defaultQueryOptions(t),r=s(this,p).getQueryCache().build(s(this,p),e);return r.isFetchingOptimistic=!0,r.fetch().then(()=>this.createResult(r,e))}fetch(t){return d(this,w,M).call(this,{...t,cancelRefetch:t.cancelRefetch??!0}).then(()=>(this.updateResult(),s(this,f)))}createResult(t,e){var ut;const r=s(this,a),y=this.options,u=s(this,f),o=s(this,E),l=s(this,T),I=t!==r?t.state:s(this,F),{state:c}=t;let{error:z,errorUpdatedAt:at,fetchStatus:D,status:C}=c,ht=!1,b;if(e._optimisticResults){const R=this.hasListeners(),X=!R&&ft(t,e),vt=R&&pt(t,r,e,y);(X||vt)&&(D=Qt(t.options.networkMode)?"fetching":"paused",c.dataUpdatedAt||(C="pending")),e._optimisticResults==="isRestoring"&&(D="idle")}if(e.select&&typeof c.data<"u")if(u&&c.data===(o==null?void 0:o.data)&&e.select===s(this,A))b=s(this,P);else try{n(this,A,e.select),b=e.select(c.data),b=dt(u==null?void 0:u.data,b,e),n(this,P,b),n(this,g,null)}catch(R){n(this,g,R)}else b=c.data;if(typeof e.placeholderData<"u"&&typeof b>"u"&&C==="pending"){let R;if(u!=null&&u.isPlaceholderData&&e.placeholderData===(l==null?void 0:l.placeholderData))R=u.data;else if(R=typeof e.placeholderData=="function"?e.placeholderData((ut=s(this,x))==null?void 0:ut.state.data,s(this,x)):e.placeholderData,e.select&&typeof R<"u")try{R=e.select(R),n(this,g,null)}catch(X){n(this,g,X)}typeof R<"u"&&(C="success",b=dt(u==null?void 0:u.data,R,e),ht=!0)}s(this,g)&&(z=s(this,g),b=s(this,P),at=Date.now(),C="error");const N=D==="fetching",q=C==="pending",H=C==="error",ot=q&&N;return{status:C,fetchStatus:D,isPending:q,isSuccess:C==="success",isError:H,isInitialLoading:ot,isLoading:ot,data:b,dataUpdatedAt:c.dataUpdatedAt,error:z,errorUpdatedAt:at,failureCount:c.fetchFailureCount,failureReason:c.fetchFailureReason,errorUpdateCount:c.errorUpdateCount,isFetched:c.dataUpdateCount>0||c.errorUpdateCount>0,isFetchedAfterMount:c.dataUpdateCount>I.dataUpdateCount||c.errorUpdateCount>I.errorUpdateCount,isFetching:N,isRefetching:N&&!q,isLoadingError:H&&c.dataUpdatedAt===0,isPaused:D==="paused",isPlaceholderData:ht,isRefetchError:H&&c.dataUpdatedAt!==0,isStale:nt(t,e),refetch:this.refetch}}updateResult(t){const e=s(this,f),r=this.createResult(s(this,a),this.options);if(n(this,E,s(this,a).state),n(this,T,this.options),s(this,E).data!==void 0&&n(this,x,s(this,a)),Z(r,e))return;n(this,f,r);const y={},u=()=>{if(!e)return!0;const{notifyOnChangeProps:o}=this.options,l=typeof o=="function"?o():o;if(l==="all"||!l&&!s(this,U).size)return!0;const v=new Set(l??s(this,U));return this.options.throwOnError&&v.add("error"),Object.keys(s(this,f)).some(I=>{const c=I;return s(this,f)[c]!==e[c]&&v.has(c)})};(t==null?void 0:t.listeners)!==!1&&u()&&(y.listeners=!0),d(this,_,bt).call(this,{...y,...t})}onQueryUpdate(){this.updateResult(),this.hasListeners()&&d(this,j,tt).call(this)}},p=new WeakMap,a=new WeakMap,F=new WeakMap,f=new WeakMap,E=new WeakMap,T=new WeakMap,g=new WeakMap,A=new WeakMap,P=new WeakMap,x=new WeakMap,Q=new WeakMap,S=new WeakMap,O=new WeakMap,U=new WeakMap,w=new WeakSet,M=function(t){d(this,W,it).call(this);let e=s(this,a).fetch(this.options,t);return t!=null&&t.throwOnError||(e=e.catch(Ct)),e},L=new WeakSet,$=function(){if(d(this,K,et).call(this),ct||s(this,f).isStale||!lt(this.options.staleTime))return;const e=Ot(s(this,f).dataUpdatedAt,this.options.staleTime)+1;n(this,Q,setTimeout(()=>{s(this,f).isStale||this.updateResult()},e))},k=new WeakSet,G=function(){return(typeof this.options.refetchInterval=="function"?this.options.refetchInterval(s(this,a)):this.options.refetchInterval)??!1},B=new WeakSet,J=function(t){d(this,V,st).call(this),n(this,O,t),!(ct||this.options.enabled===!1||!lt(s(this,O))||s(this,O)===0)&&n(this,S,setInterval(()=>{(this.options.refetchIntervalInBackground||Et.isFocused())&&d(this,w,M).call(this)},s(this,O)))},j=new WeakSet,tt=function(){d(this,L,$).call(this),d(this,B,J).call(this,d(this,k,G).call(this))},K=new WeakSet,et=function(){s(this,Q)&&(clearTimeout(s(this,Q)),n(this,Q,void 0))},V=new WeakSet,st=function(){s(this,S)&&(clearInterval(s(this,S)),n(this,S,void 0))},W=new WeakSet,it=function(){const t=s(this,p).getQueryCache().build(s(this,p),this.options);if(t===s(this,a))return;const e=s(this,a);n(this,a,t),n(this,F,t.state),this.hasListeners()&&(e==null||e.removeObserver(this),t.addObserver(this))},_=new WeakSet,bt=function(t){Rt.batch(()=>{t.listeners&&this.listeners.forEach(e=>{e(s(this,f))}),s(this,p).getQueryCache().notify({query:s(this,a),type:"observerResultsUpdated"})})},yt);function It(i,t){return t.enabled!==!1&&!i.state.dataUpdatedAt&&!(i.state.status==="error"&&t.retryOnMount===!1)}function ft(i,t){return It(i,t)||i.state.dataUpdatedAt>0&&rt(i,t,t.refetchOnMount)}function rt(i,t,e){if(t.enabled!==!1){const r=typeof e=="function"?e(i):e;return r==="always"||r!==!1&&nt(i,t)}return!1}function pt(i,t,e,r){return e.enabled!==!1&&(i!==t||r.enabled===!1)&&(!e.suspense||i.state.status!=="error")&&nt(i,e)}function nt(i,t){return i.isStaleByTime(t.staleTime)}function Ft(i,t){return!Z(i.getCurrentResult(),t)}var gt=m.createContext(!1),Tt=()=>m.useContext(gt);gt.Provider;function Pt(){let i=!1;return{clearReset:()=>{i=!1},reset:()=>{i=!0},isReset:()=>i}}var xt=m.createContext(Pt()),Dt=()=>m.useContext(xt),Mt=(i,t)=>{(i.suspense||i.throwOnError)&&(t.isReset()||(i.retryOnMount=!1))},At=i=>{m.useEffect(()=>{i.clearReset()},[i])},Lt=({result:i,errorResetBoundary:t,throwOnError:e,query:r})=>i.isError&&!t.isReset()&&!i.isFetching&&St(e,[i.error,r]),kt=i=>{i.suspense&&typeof i.staleTime!="number"&&(i.staleTime=1e3)},Bt=(i,t)=>(i==null?void 0:i.suspense)&&t.isPending,jt=(i,t,e)=>t.fetchOptimistic(i).catch(()=>{e.clearReset()});function Kt(i,t,e){const r=Ut(e),y=Tt(),u=Dt(),o=r.defaultQueryOptions(i);o._optimisticResults=y?"isRestoring":"optimistic",kt(o),Mt(o,u),At(u);const[l]=m.useState(()=>new t(r,o)),v=l.getOptimisticResult(o);if(m.useSyncExternalStore(m.useCallback(I=>{const c=y?()=>{}:l.subscribe(Rt.batchCalls(I));return l.updateResult(),c},[l,y]),()=>l.getCurrentResult(),()=>l.getCurrentResult()),m.useEffect(()=>{l.setOptions(o,{listeners:!1})},[o,l]),Bt(o,v))throw l.setOptions(o,{listeners:!1}),jt(o,l,u);if(Lt({result:v,errorResetBoundary:u,throwOnError:o.throwOnError,query:l.getCurrentQuery()}))throw v.error;return o.notifyOnChangeProps?v:l.trackResult(v)}function zt(i,t){return Kt(i,wt,t)}export{zt as u};
