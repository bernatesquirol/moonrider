/********************************************************
Copyright 2016 Google Inc. All Rights Reserved.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*********************************************************/
// The vertex shader used for the 3D sonogram visualization

attribute vec3 gPosition;
attribute vec2 gTexCoord0;
uniform sampler2D vertexFrequencyData;
uniform float vertexYOffset;
uniform mat4 worldViewProjection;
uniform float verticalScale;
uniform float hueStartAngle;
uniform float hueFinishAngle;
uniform float satStart;
uniform float satFinish;
uniform float valStart;
uniform float valFinish;

varying vec2 texCoord;
varying vec3 color;



/**
 * Conversion based on Wikipedia article
 * @see http://en.wikipedia.org/wiki/HSL_and_HSV#Converting_to_RGB
 */
vec3 convertHSVToRGB(in float hue, in float saturation, in float lightness) {
  float chroma = lightness * saturation;
  float hueDash = hue / 60.0;
  float x = chroma * (1.0 - abs(mod(hueDash, 2.0) - 1.0));
  vec3 hsv = vec3(0.0);

  if(hueDash < 1.0) {
    hsv.r = chroma;
    hsv.g = x;
  } else if (hueDash < 2.0) {
    hsv.r = x;
    hsv.g = chroma;
  } else if (hueDash < 3.0) {
    hsv.g = chroma;
    hsv.b = x;
  } else if (hueDash < 4.0) {
    hsv.g = x;
    hsv.b = chroma;
  } else if (hueDash < 5.0) {
    hsv.r = x;
    hsv.b = chroma;
  } else if (hueDash < 6.0) {
    hsv.r = chroma;
    hsv.b = x;
  }

  return hsv;
}
float module(in float x, in float y){
  return x - y * (x/y);
}

void main()
{
    float x = pow(256.0, gTexCoord0.x - 1.0);
    vec4 sample = texture2D(vertexFrequencyData, vec2(x, gTexCoord0.y + vertexYOffset));
    vec4 newPosition = vec4(gPosition.x, gPosition.y + verticalScale * sample.a, gPosition.z, 1.0);
    gl_Position = worldViewProjection * newPosition;
    texCoord = gTexCoord0;
    float intervalHue = hueFinishAngle - hueStartAngle;
    float hue = mod(hueStartAngle + ((newPosition.y / verticalScale) * intervalHue),360.0);
    // float s = mod(satStart + ((newPosition.y / verticalScale) * satFinish), 1.0);
    // float v = mod(valStart + ((newPosition.y / verticalScale) * valFinish), 1.0);
    color = convertHSVToRGB(hue, satStart, valStart);
}