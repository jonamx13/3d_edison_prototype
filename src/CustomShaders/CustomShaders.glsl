// volumetricLightShader.glsl

// Vertex shader
varying vec2 vUv;
void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}

// Fragment shader
uniform vec3 lightPosition;
uniform vec2 viewportSize;
uniform float time;
varying vec2 vUv;

void main() {
    vec2 uv = vUv * viewportSize;
    vec3 rayDirection = normalize(vec3(uv - 0.5, 1.0)); // Ray direction from screen space
    vec3 lightDirection = normalize(lightPosition - gl_FragCoord.xyz); // Direction to light source

    float density = 0.5; // Adjust density to control foggy effect
    float intensity = 2.0; // Adjust intensity to control brightness
    float distanceToLight = length(lightPosition - gl_FragCoord.xyz);

    // Ray marching loop
    float stepSize = 0.1; // Adjust step size for accuracy vs performance
    float totalDistance = 0.0;
    float accumulatedDensity = 0.0;
    for (int i = 0; i < 100; i++) {
        vec3 samplePoint = gl_FragCoord.xyz + rayDirection * totalDistance;
        float sampleDensity = // Compute density at sample point (e.g., from a volumetric texture or function)
        accumulatedDensity += sampleDensity * stepSize;
        totalDistance += stepSize;

        if (totalDistance >= distanceToLight || accumulatedDensity > 1.0) {
            break; // Exit loop if ray reaches light source or maximum density
        }
    }

    vec3 finalColor = vec3(1.0); // Initialize final color
    float fogFactor = exp(-accumulatedDensity * density); // Compute fog factor based on accumulated density
    finalColor *= fogFactor * intensity; // Apply fog factor and intensity to final color

    gl_FragColor = vec4(finalColor, 1.0); // Output final color
}