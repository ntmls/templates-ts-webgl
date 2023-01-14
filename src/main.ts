import { FragmentShaderSource } from "./FragementShaderSource";
import { WebGlInitializer } from "./WebGlInitializer";

var canvas = <HTMLCanvasElement>document.getElementById('gl-canvas')
var webGlInitializer = new WebGlInitializer(); 
var source = new FragmentShaderSource(); 
webGlInitializer.initialize(canvas, source.source);