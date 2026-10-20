import * as THREE from './assets/three.module.js';

let renderer, scene, camera, model, platform, heroHost, stopped=false, visible=true, pointer=0, observer, raf, printStart=0, printing=false, printRing;
const printPlane=new THREE.Plane(new THREE.Vector3(0,-1,0),3);
const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;
function ceramic(color){
  const m=new THREE.MeshStandardMaterial({color,roughness:.73,metalness:.03});
  m.onBeforeCompile=shader=>{
    shader.vertexShader=shader.vertexShader.replace('#include <common>','#include <common>\nvarying vec3 vLayerPosition;').replace('#include <begin_vertex>','#include <begin_vertex>\nvLayerPosition = position;');
    shader.fragmentShader=shader.fragmentShader.replace('#include <common>','#include <common>\nvarying vec3 vLayerPosition;').replace('#include <color_fragment>','#include <color_fragment>\nfloat layer = sin(vLayerPosition.y * 430.0);\ndiffuseColor.rgb *= 0.94 + 0.06 * layer;');
  };
  return m;
}
function mesh(g,m){const x=new THREE.Mesh(g,m);x.castShadow=true;x.receiveShadow=true;return x;}
function vaseGeometry(type){
  const points=[];const height=type==='vase'?2.8:2.05;
  for(let i=0;i<=100;i++){
    const t=i/100;
    const r=type==='vase'?(.56+.48*Math.sin(t*Math.PI)*Math.sin(t*Math.PI)+.05*Math.cos(t*9)):(.5+.4*Math.sin(t*Math.PI*.95));
    points.push(new THREE.Vector2(r,t*height));
  }
  const last=points.at(-1);points.push(new THREE.Vector2(last.x-.085,last.y));
  for(let i=100;i>=0;i--){const t=i/100;const r=type==='vase'?(.56+.48*Math.sin(t*Math.PI)**2+.05*Math.cos(t*9)):(.5+.4*Math.sin(t*Math.PI*.95));points.push(new THREE.Vector2(Math.max(.1,r-.085),.12+t*(height-.12)));}
  const g=new THREE.LatheGeometry(points,128);const pos=g.attributes.position;
  for(let i=0;i<pos.count;i++){const x=pos.getX(i),z=pos.getZ(i),y=pos.getY(i);const a=Math.atan2(z,x);const ripple=1+.026*Math.cos(a*36+y*.9);pos.setXYZ(i,x*ripple,y,z*ripple);}g.computeVertexNormals();return g;
}
function nameTexture(text,color){const c=document.createElement('canvas');c.width=1024;c.height=300;const ctx=c.getContext('2d');ctx.fillStyle=color;ctx.fillRect(0,0,1024,300);ctx.fillStyle='#f7eedb';ctx.font='600 135px "Bricolage Grotesque", sans-serif';ctx.textAlign='center';ctx.textBaseline='middle';ctx.fillText(text||'Seu nome',512,155,900);const tx=new THREE.CanvasTexture(c);tx.colorSpace=THREE.SRGBColorSpace;return tx;}
function buildModel(type,color='#244d68',text='Clara'){
  const group=new THREE.Group();const mat=ceramic(color),cream=ceramic('#e6d5b3');
  if(type==='vase'||type==='pot'){group.add(mesh(vaseGeometry(type),mat));}
  if(type==='name'||type==='lamp'){
    const base=mesh(new THREE.BoxGeometry(3,.25,.8),mat);base.position.y=.14;group.add(base);
    const plate=mesh(new THREE.BoxGeometry(2.7,.98,.18),type==='lamp'?cream:mat);plate.position.set(0,.74,0);group.add(plate);
    const front=mesh(new THREE.PlaneGeometry(2.65,.78),new THREE.MeshStandardMaterial({map:nameTexture(text,type==='lamp'?'#bd9150':color),roughness:.75,emissive:type==='lamp'?'#e2ba72':'#000000',emissiveIntensity:type==='lamp'?.18:0}));front.position.set(0,.76,.096);group.add(front);
    if(type==='lamp'){const support=mesh(new THREE.BoxGeometry(.12,.25,.1),cream);support.position.set(0,.3,-.15);group.add(support);}
  }
  if(type==='key'){
    const tag=mesh(new THREE.BoxGeometry(2.45,.75,.17),mat);tag.position.y=.65;group.add(tag);
    const front=mesh(new THREE.PlaneGeometry(2.3,.65),new THREE.MeshStandardMaterial({map:nameTexture(text,color)}));front.position.set(0,.65,.09);group.add(front);
    const ring=mesh(new THREE.TorusGeometry(.32,.035,12,48),new THREE.MeshStandardMaterial({color:'#bca477',metalness:.9,roughness:.3}));ring.position.set(-1.38,.7,0);group.add(ring);group.rotation.z=.12;
  }
  if(type==='stand'){
    const bottom=mesh(new THREE.BoxGeometry(1.7,.18,1.3),mat);bottom.position.y=.12;group.add(bottom);
    const back=mesh(new THREE.BoxGeometry(1.6,1.7,.18),mat);back.rotation.x=-.25;back.position.set(0,.9,-.2);group.add(back);
    const lip=mesh(new THREE.BoxGeometry(1.7,.26,.3),mat);lip.position.set(0,.3,.5);group.add(lip);
    const hole=mesh(new THREE.BoxGeometry(.24,.13,.32),cream);hole.position.set(0,.25,.53);group.add(hole);
  }
  if(type==='organizer'){
    const base=mesh(new THREE.BoxGeometry(2.5,.16,1.5),mat);base.position.y=.1;group.add(base);
    for(let i=0;i<3;i++){const pts=[new THREE.Vector2(.37,0),new THREE.Vector2(.37,.75+i*.4),new THREE.Vector2(.31,.75+i*.4),new THREE.Vector2(.31,.12)];const cup=mesh(new THREE.LatheGeometry(pts,64),mat);cup.position.set((i-1)*.77,.17,0);group.add(cup);}
  }
  if(type==='sculpture'){
    const ring=mesh(new THREE.TorusKnotGeometry(.67,.2,160,24,2,3),mat);ring.position.y=1.3;group.add(ring);
    const foot=mesh(new THREE.CylinderGeometry(.63,.69,.2,64),cream);foot.position.y=.1;group.add(foot);
  }
  group.rotation.y=.2;return group;
}
function clearModel(){if(!model)return;scene.remove(model);model.traverse(o=>{if(o.geometry)o.geometry.dispose();if(o.material){const ms=Array.isArray(o.material)?o.material:[o.material];ms.forEach(m=>{m.map?.dispose();m.dispose();});}});}
export function renderProduct(type,color,text,angle=0,zoom=1){
  if(!renderer)return '';
  if(printRing)printRing.visible=false;
  clearModel();model=buildModel(type,color,text);scene.add(model);platform.visible=false;
  renderer.setSize(620,680,false);renderer.setPixelRatio(1);camera.aspect=620/680;camera.position.set(4.5,3.6,7.5);camera.lookAt(0,type==='vase'?1.35:.9,0);camera.fov=32;camera.updateProjectionMatrix();
  if(type==='name'||type==='lamp'||type==='key')camera.position.set(2.3,2.6,7.4);
  camera.lookAt(0,type==='vase'?1.35:.85,0);model.rotation.y+=angle;camera.zoom=zoom;camera.updateProjectionMatrix();renderer.render(scene,camera);return renderer.domElement.toDataURL('image/webp',.88);
}
function restoreHero(){clearModel();model=buildModel('vase','#244c65');model.rotation.y=.2;model.traverse(o=>{if(o.isMesh)o.material.clippingPlanes=[printPlane];});printPlane.constant=3;printing=false;if(printRing)printRing.visible=false;scene.add(model);platform.visible=true;resize();}
function resize(){if(!heroHost)return;const {width,height}=heroHost.getBoundingClientRect();renderer.setPixelRatio(Math.min(devicePixelRatio,1.5));renderer.setSize(width,height);camera.aspect=width/height;camera.zoom=1;camera.fov=35;camera.position.set(4.8,3.6,7.5);camera.lookAt(0,1.4,0);camera.updateProjectionMatrix();renderer.render(scene,camera);}
export async function initModels(products){
  heroHost=document.querySelector('#hero-canvas');
  renderer=new THREE.WebGLRenderer({alpha:true,antialias:true,preserveDrawingBuffer:true,powerPreference:'low-power'});renderer.localClippingEnabled=true;renderer.setClearColor(0x000000,0);renderer.shadowMap.enabled=true;renderer.shadowMap.type=THREE.PCFSoftShadowMap;renderer.outputColorSpace=THREE.SRGBColorSpace;renderer.toneMapping=THREE.ACESFilmicToneMapping;renderer.toneMappingExposure=1.4;
  scene=new THREE.Scene();camera=new THREE.PerspectiveCamera(35,1,.1,50);
  scene.add(new THREE.HemisphereLight('#fff7e9','#72878a',3));const key=new THREE.DirectionalLight('#fff1da',4.5);key.position.set(-3,7,5);key.castShadow=true;key.shadow.mapSize.set(1024,1024);key.shadow.normalBias=.04;scene.add(key);const fill=new THREE.DirectionalLight('#dcecff',1.5);fill.position.set(5,3,-3);scene.add(fill);
  platform=mesh(new THREE.CylinderGeometry(1.9,1.95,.2,100),new THREE.MeshStandardMaterial({color:'#dad9cc',roughness:.95}));platform.position.y=-.13;scene.add(platform);
  const images={};for(const p of products)images[p.id]=renderProduct(p.type,p.color,p.nameText||'Clara');
  heroHost.append(renderer.domElement);restoreHero();
  printRing=new THREE.Mesh(new THREE.TorusGeometry(1,.012,8,100),new THREE.MeshBasicMaterial({color:'#dfbb76',transparent:true,opacity:.9}));printRing.rotation.x=Math.PI/2;printRing.visible=false;scene.add(printRing);
  observer=new IntersectionObserver(e=>{visible=e[0].isIntersecting;});observer.observe(heroHost);
  window.addEventListener('resize',resize);heroHost.addEventListener('pointermove',e=>{pointer=(e.offsetX/heroHost.clientWidth-.5)*.5;});heroHost.addEventListener('pointerleave',()=>pointer=0);
  document.addEventListener('visibilitychange',()=>{visible=!document.hidden;});
  function loop(t){raf=requestAnimationFrame(loop);if(visible&&!stopped&&!reduced&&!document.querySelector('dialog[open]')){model.rotation.y=.2+Math.sin(t*.0004)*.2+pointer;model.rotation.x=Math.min(window.scrollY/30000,.035);if(printing){const progress=Math.min((t-printStart)/900,1);const y=progress*2.8;printPlane.constant=y;printRing.position.y=y;const radius=.56+.48*Math.sin(progress*Math.PI)**2+.05*Math.cos(progress*9);printRing.scale.set(radius,radius,1);printRing.visible=progress<1;if(progress===1){printing=false;printPlane.constant=3;}}renderer.render(scene,camera);}}loop(0);replayPrint();
  return images;
}
export function productPreview(type,color,text,angle=0,zoom=1){const result=renderProduct(type,color,text,angle,zoom);restoreHero();return result;}
export function toggleRotation(){stopped=!stopped;return stopped;}
export function replayPrint(){if(reduced)return;stopped=false;printStart=performance.now();printing=true;printPlane.constant=0;}
