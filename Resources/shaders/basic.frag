#version 330 core
out vec4 FragColor;

in vec3 FragPos;
in vec3 Normal;
in vec3 Color;

uniform vec3 lightPos;
uniform vec3 viewPos;
uniform vec3 lightColor;
uniform vec3 objectColor;
uniform bool useLighting;
uniform bool useFlatShading;

flat in vec3 flatNormal;

void main()
{
    vec3 normal;
    if (useFlatShading) {
        normal = normalize(flatNormal);
    } else {
        normal = normalize(Normal);
    }
    
    if (useLighting) {
        float ambientStrength = 0.1;
        vec3 ambient = ambientStrength * lightColor;
        
        vec3 lightDir = normalize(lightPos - FragPos);
        float diff = max(dot(normal, lightDir), 0.0);
        vec3 diffuse = diff * lightColor;
        
        vec3 result = (ambient + diffuse) * objectColor;
        FragColor = vec4(result, 1.0);
    } else {
        FragColor = vec4(objectColor, 1.0);
    }
}
