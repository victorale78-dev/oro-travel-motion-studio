import React from "react";
import {AbsoluteFill, Img, Sequence, interpolate, staticFile, useCurrentFrame, useVideoConfig} from "remotion";
import {TransitionSeries, linearTiming} from "@remotion/transitions";
import {fade} from "@remotion/transitions/fade";
import {slide} from "@remotion/transitions/slide";
const scenes = [
  {name:"GRANADA",tag:"Where every street tells a story",image:"images/granada.jpg"},
  {name:"OMETEPE",tag:"Nature beyond imagination",image:"images/ometepe.jpg"},
  {name:"CORN ISLANDS",tag:"Your Caribbean escape",image:"images/corn-islands.jpg"},
  {name:"SAN JUAN DEL SUR",tag:"Chase the Pacific sunset",image:"images/san-juan.jpg"},
];
const sceneLength = 234;
const transitionLength = 12;
const Scene:React.FC<{name:string;tag:string;image:string}> = ({name,tag,image}) => {
 const frame=useCurrentFrame();
 const scale=interpolate(frame,[0,sceneLength],[1.04,1.18],{extrapolateRight:"clamp"});
 const opacity=interpolate(frame,[8,22,sceneLength-28,sceneLength-10],[0,1,1,0],{extrapolateLeft:"clamp",extrapolateRight:"clamp"});
 return <AbsoluteFill style={{backgroundColor:"#0b1c26",overflow:"hidden"}}>
   <Img src={staticFile(image)} style={{width:"100%",height:"100%",objectFit:"cover",transform:`scale(${scale})`}}/>
   <AbsoluteFill style={{background:"linear-gradient(0deg,rgba(0,0,0,.75),transparent 65%)"}}/>
   <div style={{position:"absolute",bottom:260,left:80,right:80,opacity,color:"white"}}>
     <div style={{fontFamily:"Georgia,serif",fontSize:100,fontWeight:700,letterSpacing:1}}>{name}</div>
     <div style={{width:120,height:8,background:"#e58a32",margin:"25px 0"}}/>
     <div style={{fontFamily:"Arial,sans-serif",fontSize:44}}>{tag}</div>
   </div>
 </AbsoluteFill>;
};
export const DiscoverNicaragua:React.FC=()=>{
 return <AbsoluteFill style={{background:"#0b1c26"}}>
 <TransitionSeries>
 {scenes.map((scene,i)=><React.Fragment key={scene.name}>
 {i>0 && <TransitionSeries.Transition presentation={i%2?slide({direction:"from-right"}):fade()} timing={linearTiming({durationInFrames:transitionLength})}/>}
 <TransitionSeries.Sequence durationInFrames={sceneLength}><Scene {...scene}/></TransitionSeries.Sequence>
 </React.Fragment>)}
 </TransitionSeries>
 <Sequence from={852} durationInFrames={48}>
 <AbsoluteFill style={{background:"rgba(8,25,33,.82)",alignItems:"center",justifyContent:"center",color:"white",fontFamily:"Georgia,serif",fontSize:92,textAlign:"center"}}>
 DISCOVER NICARAGUA<div style={{fontFamily:"Arial,sans-serif",fontSize:43,marginTop:40,color:"#f0a452"}}>WITH ORO TRAVEL</div>
 </AbsoluteFill>
 </Sequence>
 </AbsoluteFill>;
};
