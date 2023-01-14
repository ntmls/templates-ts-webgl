export class FragmentShaderSource {
    get source(): string {

        return document.getElementById('fragment-shader').innerHTML;
    /*
        return `

void main() {

    gl_FragColor = vec4(0, 0.8, 0, 1);
}

`; 
*/

    }
}