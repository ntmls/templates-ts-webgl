export class WebGlInitializer {

    private context: WebGLRenderingContext; 

    initialize(canvas: HTMLCanvasElement, fragmentShaderSource: string): void {
        this.getContext(canvas);
        const vsSource = this.getVertexShaderSourceCode();
        const vertexShader = this.createVertexShader(vsSource);
        const fragmentShader = this.createFragmentShader(fragmentShaderSource);
        const shaderProgram = this.createShaderProgram(vertexShader, fragmentShader);
        this.setScreenSizeVariable(shaderProgram, canvas);
        const points = this.createTrianglePoints();
        this.createBufferFromPoints(points);
        this.assignBufferToPositionVariable(shaderProgram);
        this.drawTriangles();
    }

    private setScreenSizeVariable(shaderProgram: WebGLProgram, canvas: HTMLCanvasElement) {
        var screenSizeLocation = this.context.getUniformLocation(shaderProgram, 'screen_size');
        this.context.uniform2f(screenSizeLocation, canvas.width, canvas.height);
    }

    private getContext(canvas: HTMLCanvasElement) {
        this.context = canvas.getContext('webgl');
    }

    private drawTriangles() {
        this.context.drawArrays(this.context.TRIANGLES, 0, 6);
    }

    private assignBufferToPositionVariable(shaderProgram: WebGLProgram) {
        const pointsLocation = this.context.getAttribLocation(shaderProgram, 'aPosition');
        this.context.vertexAttribPointer(pointsLocation, 2, this.context.FLOAT, false, 0, 0);
        this.context.enableVertexAttribArray(pointsLocation);
    }

    private createBufferFromPoints(points: number[]) {
        var pointsBuffer = this.context.createBuffer();
        this.context.bindBuffer(this.context.ARRAY_BUFFER, pointsBuffer);
        this.context.bufferData(this.context.ARRAY_BUFFER, new Float32Array(points), this.context.STATIC_DRAW);
    }

    private createTrianglePoints() {
        return [
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
    }

    private createVertexShader(vertexShaderSource: string) {
        return this.createShader(this.context.VERTEX_SHADER, vertexShaderSource)
    }

    private createFragmentShader(fragmentShaderSource: string) {
        return this.createShader(this.context.FRAGMENT_SHADER, fragmentShaderSource); 
    }

    private createShader(shaderType: number, shaderSource: string) {
        
        const shader = this.context.createShader(shaderType);
        this.context.shaderSource(shader, shaderSource);
        this.context.compileShader(shader);
        if (!this.context.getShaderParameter(shader, this.context.COMPILE_STATUS)) {
            alert(`An error occurred compiling the shader: ${this.context.getShaderInfoLog(shader)}`);
            this.context.deleteShader(shader);
            throw new Error("Could not compile shader");
        }
        return shader;
    }

    private createShaderProgram(vertexShader: WebGLShader, fragmentShader: WebGLShader) {
        const shaderProgram = this.context.createProgram();
        this.context.attachShader(shaderProgram, vertexShader);
        this.context.attachShader(shaderProgram, fragmentShader);
        this.context.linkProgram(shaderProgram);
        this.context.useProgram(shaderProgram);
        if (!this.context.getProgramParameter(shaderProgram, this.context.LINK_STATUS)) {
            alert(`Unable to initialize the shader program: ${this.context.getProgramInfoLog(shaderProgram)}`);
            throw new Error("Can't link program.");
        }
        return shaderProgram;
    }

    private  getVertexShaderSourceCode() {
        return `
  attribute vec2 aPosition;
  void main() {
     gl_Position = vec4(aPosition, 0.0, 1.0);
  }
  `;}
  
}