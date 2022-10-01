// See the following for setup 
// https://dev.to/xavier577/setting-up-a-vanilla-typescript-project-the-right-way-21ao

var canvas = <HTMLCanvasElement>document.getElementById('gl-canvas')
var gl = canvas.getContext('webgl'); 

gl.clearColor(0.0, 0.0, 0.0, 1.0); // Set clear color to black
gl.clear(gl.COLOR_BUFFER_BIT); // Clear the color buffer with specified clear color

//gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight);

const vsSource = `
attribute vec2 aPosition;
void main() {
   gl_Position = vec4(aPosition, 0.0, 1.0);
}
`;

const vertexShader = gl.createShader(gl.VERTEX_SHADER);
gl.shaderSource(vertexShader, vsSource);
gl.compileShader(vertexShader);
if (!gl.getShaderParameter(vertexShader, gl.COMPILE_STATUS)) {
  alert(`An error occurred compiling the shaders: ${gl.getShaderInfoLog(vertexShader)}`);
  gl.deleteShader(vertexShader);
  throw new Error("Could not compile vertex shader"); 
}

const fsSource = `
void main() {
    gl_FragColor = vec4(0, 0.8, 0, 1);
}
`;

const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
gl.shaderSource(fragmentShader, fsSource);
gl.compileShader(fragmentShader);
if (!gl.getShaderParameter(fragmentShader, gl.COMPILE_STATUS)) {
  alert(`An error occurred compiling the shaders: ${gl.getShaderInfoLog(fragmentShader)}`);
  gl.deleteShader(fragmentShader);
  throw new Error("Could not compile fragment shader"); 
}

const shaderProgram = gl.createProgram();
gl.attachShader(shaderProgram, vertexShader);
gl.attachShader(shaderProgram, fragmentShader);
gl.linkProgram(shaderProgram);
gl.useProgram(shaderProgram);
if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
alert(`Unable to initialize the shader program: ${gl.getProgramInfoLog(shaderProgram)}`);
throw new Error("Can't link program.");
}

const points = [
    // first triangle
    // top left
    -1, -1,

    // top right
    1, -1,

    // bottom left
    -1, 1,

    // second triangle
    // bottom right
    1, 1,

    // top right
    1, -1,

    // bottom left
    -1, 1,
];

var pointsBuffer = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, pointsBuffer);
gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(points), gl.STATIC_DRAW);

const pointsLocation = gl.getAttribLocation(shaderProgram, 'aPosition');
gl.vertexAttribPointer(pointsLocation, 2, gl.FLOAT, false, 0, 0);
gl.enableVertexAttribArray(pointsLocation);

gl.drawArrays(gl.TRIANGLES, 0, 6);

window.alert('testing');
