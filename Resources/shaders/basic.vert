#version 330 core
layout (location = 0) in vec3 aPos;
layout (location = 1) in vec3 aNormal;

uniform mat4 projection;
uniform mat4 modelview;

out vec3 FragPos;
out vec3 Normal;
out vec3 Color;

flat out vec3 flatNormal;

void main()
{
    FragPos = vec3(modelview * vec4(aPos, 1.0));
    Normal = mat3(transpose(inverse(modelview))) * aNormal;
    flatNormal = Normal;
    
    Color = vec3(0.7, 0.7, 0.7);
    
    gl_Position = projection * modelview * vec4(aPos, 1.0);
}
