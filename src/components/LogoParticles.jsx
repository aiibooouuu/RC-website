// Place this as LogoParticles.jsx in your React project

import React, { useRef, useEffect } from "react";

// --- SHADERS (WebGL1) ---
const vertexShaderSource = `
attribute vec2 a_position;
attribute vec4 a_color;
uniform vec2 u_resolution;
varying vec4 v_color;
void main() {
    vec2 zeroToOne = a_position / u_resolution;
    vec2 zeroToTwo = zeroToOne * 2.0;
    vec2 clipSpace = zeroToTwo - 1.0;
    gl_Position = vec4(clipSpace * vec2(1, -1), 0, 1);
    gl_PointSize = 2.0;
    v_color = a_color;
}
`;

const fragmentShaderSource = `
precision mediump float;
varying vec4 v_color;
void main() {
    gl_FragColor = v_color;
}
`;

// --- CONFIG ---
const config = {
    logoPath: "/logo.png", // Place logo.png in public/
    logoSize: 1250,
    logoColor: "",
    canvasBg: "#011526",
    distortionRadius: 3000,
    forceStrength: 0.0035,
    maxDisplacement: 100,
    returnForce: 0.025,
};

function hexToRgb(hex) {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
        ? {
              r: parseInt(result[1], 16) / 255,
              g: parseInt(result[2], 16) / 255,
              b: parseInt(result[3], 16) / 255,
          }
        : { r: 1, g: 1, b: 1 };
}

const LogoParticles = () => {
    const canvasRef = useRef(null);
    const glRef = useRef(null);
    const programRef = useRef(null);
    const positionBufferRef = useRef(null);
    const colorBufferRef = useRef(null);
    const positionArrayRef = useRef(null);
    const colorArrayRef = useRef(null);
    const particlesRef = useRef([]);
    const mouseRef = useRef({ x: 0, y: 0 });
    const animationCountRef = useRef(0);
    const rafRef = useRef();

    useEffect(() => {
        const canvas = canvasRef.current;
        const dpr = window.devicePixelRatio || 1;
        canvas.width = window.innerWidth * dpr;
        canvas.height = window.innerHeight * dpr;
        canvas.style.width = window.innerWidth + "px";
        canvas.style.height = window.innerHeight + "px";

        // --- WebGL ---
        const gl = canvas.getContext("webgl", {
            alpha: true,
            depth: false,
            stencil: false,
            antialias: true,
            powerPreference: "high-performance",
            premultipliedAlpha: false,
        });
        glRef.current = gl;

        gl.enable(gl.BLEND);
        gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

        // --- Compile Shaders ---
        function compileShader(type, source) {
            const shader = gl.createShader(type);
            gl.shaderSource(shader, source);
            gl.compileShader(shader);
            if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
                console.error(
                    "Shader compile failed with: " + gl.getShaderInfoLog(shader)
                );
                gl.deleteShader(shader);
                return null;
            }
            return shader;
        }

        const vs = compileShader(gl.VERTEX_SHADER, vertexShaderSource);
        const fs = compileShader(gl.FRAGMENT_SHADER, fragmentShaderSource);
        if (!vs || !fs) return;

        const program = gl.createProgram();
        gl.attachShader(program, vs);
        gl.attachShader(program, fs);
        gl.linkProgram(program);

        if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
            console.error(
                "Program failed to link: " + gl.getProgramInfoLog(program)
            );
            return;
        }
        programRef.current = program;

        // --- Load Logo and Create Particles ---
        const image = new window.Image();
        image.onload = function () {
            const tempCanvas = document.createElement("canvas");
            const ctx = tempCanvas.getContext("2d");
            tempCanvas.width = config.logoSize;
            tempCanvas.height = config.logoSize;

            const scale = 0.9;
            const size = config.logoSize * scale;
            const offset = (config.logoSize - size) / 2;
            ctx.drawImage(image, offset, offset, size, size);

            const imageData = ctx.getImageData(
                0,
                0,
                config.logoSize,
                config.logoSize
            );
            createParticles(imageData.data);
        };
        image.src = config.logoPath;

        function createParticles(pixels) {
            const centerX = canvas.width / 2;
            const centerY = canvas.height / 2;
            const positions = [];
            const colors = [];
            const particles = [];

            const logoTint = hexToRgb(config.logoColor);

            for (let i = 0; i < config.logoSize; i++) {
                for (let j = 0; j < config.logoSize; j++) {
                    const pixelIndex = (i * config.logoSize + j) * 4;
                    const alpha = pixels[pixelIndex + 3];

                    if (alpha > 10) {
                        const particleX =
                            centerX + (j - config.logoSize / 2) * 1.0;
                        const particleY =
                            centerY + (i - config.logoSize / 2) * 1.0;

                        positions.push(particleX, particleY);

                        const originalR = pixels[pixelIndex] / 255;
                        const originalG = pixels[pixelIndex + 1] / 255;
                        const originalB = pixels[pixelIndex + 2] / 255;
                        const originalA = pixels[pixelIndex + 3] / 255;

                        colors.push(
                            originalR * logoTint.r,
                            originalG * logoTint.g,
                            originalB * logoTint.b,
                            originalA
                        );
                        particles.push({
                            orignalX: particleX,
                            orignalY: particleY,
                            velocityX: 0,
                            velocityY: 0,
                        });
                    }
                }
            }

            positionArrayRef.current = new Float32Array(positions);
            colorArrayRef.current = new Float32Array(colors);
            particlesRef.current = particles;

            // --- Buffers ---
            positionBufferRef.current = gl.createBuffer();
            gl.bindBuffer(gl.ARRAY_BUFFER, positionBufferRef.current);
            gl.bufferData(
                gl.ARRAY_BUFFER,
                positionArrayRef.current,
                gl.DYNAMIC_DRAW
            );

            colorBufferRef.current = gl.createBuffer();
            gl.bindBuffer(gl.ARRAY_BUFFER, colorBufferRef.current);
            gl.bufferData(
                gl.ARRAY_BUFFER,
                colorArrayRef.current,
                gl.DYNAMIC_DRAW
            );

            animate();
        }

        // --- Animation Loop ---
        function animate() {
            updatePhysics();
            render();
            rafRef.current = requestAnimationFrame(animate);
        }

        function updatePhysics() {
            if (animationCountRef.current <= 0) return;
            animationCountRef.current--;
            const radiusSquared = config.distortionRadius * config.distortionRadius;
            const particles = particlesRef.current;
            const positionArray = positionArrayRef.current;

            for (let i = 0; i < particles.length; i++) {
                const particle = particles[i];
                const currentX = positionArray[i * 2];
                const currentY = positionArray[i * 2 + 1];

                const deltaX = mouseRef.current.x - currentX;
                const deltaY = mouseRef.current.y - currentY;
                const distanceSquared = deltaX * deltaX + deltaY * deltaY;

                if (distanceSquared < radiusSquared && distanceSquared > 0) {
                    const force = -radiusSquared / distanceSquared;
                    const angle = Math.atan2(deltaY, deltaX);

                    const distFromOrigin = Math.sqrt(
                        (currentX - particle.orignalX) ** 2 +
                            (currentY - particle.orignalY) ** 2
                    );
                    const forceMultiplier = Math.max(
                        0.1,
                        1 - distFromOrigin / (config.maxDisplacement * 2)
                    );

                    particle.velocityX +=
                        force *
                        Math.cos(angle) *
                        config.forceStrength *
                        forceMultiplier;
                    particle.velocityY +=
                        force *
                        Math.sin(angle) *
                        config.forceStrength *
                        forceMultiplier;
                }

                particle.velocityX *= 0.82;
                particle.velocityY *= 0.82;

                const targetX =
                    currentX +
                    particle.velocityX +
                    (particle.orignalX - currentX) * config.returnForce;
                const targetY =
                    currentY +
                    particle.velocityY +
                    (particle.orignalY - currentY) * config.returnForce;

                const offsetX = targetX - particle.orignalX;
                const offsetY = targetY - particle.orignalY;
                const distFromOrigin = Math.sqrt(
                    offsetX * offsetX + offsetY * offsetY
                );

                if (distFromOrigin > config.maxDisplacement) {
                    const exess = distFromOrigin - config.maxDisplacement;
                    const scale = config.maxDisplacement / distFromOrigin;
                    const dampedScale =
                        scale + (1 - scale) * Math.exp(-exess * 0.02);

                    positionArray[i * 2] =
                        particle.orignalX + offsetX * dampedScale;
                    positionArray[i * 2 + 1] =
                        particle.orignalY + offsetY * dampedScale;

                    particle.velocityX *= 0.7;
                    particle.velocityY *= 0.7;
                } else {
                    positionArray[i * 2] = targetX;
                    positionArray[i * 2 + 1] = targetY;
                }
            }

            gl.bindBuffer(gl.ARRAY_BUFFER, positionBufferRef.current);
            gl.bufferSubData(gl.ARRAY_BUFFER, 0, positionArrayRef.current);
        }

        function render() {
            gl.viewport(0, 0, canvas.width, canvas.height);
            const bgColor = hexToRgb(config.canvasBg);
            gl.clearColor(bgColor.r, bgColor.g, bgColor.b, 1.0);
            gl.clear(gl.COLOR_BUFFER_BIT);

            if (particlesRef.current.length === 0) return;

            gl.useProgram(programRef.current);
            const resolutionLoc = gl.getUniformLocation(programRef.current, "u_resolution");
            gl.uniform2f(resolutionLoc, canvas.width, canvas.height);

            gl.bindBuffer(gl.ARRAY_BUFFER, positionBufferRef.current);
            const positionLoc = gl.getAttribLocation(programRef.current, "a_position");
            gl.enableVertexAttribArray(positionLoc);
            gl.vertexAttribPointer(positionLoc, 2, gl.FLOAT, false, 0, 0);

            gl.bindBuffer(gl.ARRAY_BUFFER, colorBufferRef.current);
            const colorLoc = gl.getAttribLocation(programRef.current, "a_color");
            gl.enableVertexAttribArray(colorLoc);
            gl.vertexAttribPointer(colorLoc, 4, gl.FLOAT, false, 0, 0);

            gl.drawArrays(gl.POINTS, 0, particlesRef.current.length);
        }

        // --- Mouse and Resize Events ---
        function handleMouseMove(event) {
            const rect = canvas.getBoundingClientRect();
            const dpr = window.devicePixelRatio || 1;
            mouseRef.current.x = (event.clientX - rect.left) * dpr;
            mouseRef.current.y = (event.clientY - rect.top) * dpr;
            animationCountRef.current = 300;
        }

        function handleResize() {
            const dpr = window.devicePixelRatio || 1;
            canvas.width = window.innerWidth * dpr;
            canvas.height = window.innerHeight * dpr;
            canvas.style.width = window.innerWidth + "px";
            canvas.style.height = window.innerHeight + "px";
            // Optionally, reposition particles here if needed
            if (particlesRef.current.length > 0) {
                const centerX = canvas.width / 2;
                const centerY = canvas.height / 2;
                const dim = Math.sqrt(particlesRef.current.length);

                for (let i = 0; i < particlesRef.current.length; i++) {
                    const row = Math.floor(i / dim);
                    const col = i % dim;
                    const repositionX = centerX + (col - dim / 2) * 1.0;
                    const repositionY = centerY + (row - dim / 2) * 1.0;
                    particlesRef.current[i].orignalX = repositionX;
                    particlesRef.current[i].orignalY = repositionY;
                }

                gl.bindBuffer(gl.ARRAY_BUFFER, positionBufferRef.current);
                gl.bufferSubData(gl.ARRAY_BUFFER, positionArrayRef.current);
            }
        }

        document.addEventListener("mousemove", handleMouseMove);
        window.addEventListener("resize", handleResize);

        // --- Cleanup ---
        return () => {
            cancelAnimationFrame(rafRef.current);
            document.removeEventListener("mousemove", handleMouseMove);
            window.removeEventListener("resize", handleResize);
        };
        // eslint-disable-next-line
    }, []);

    return (
        <canvas
            ref={canvasRef}
            style={{
                display: "block",
                width: "100vw",
                height: "100vh",
                background: config.canvasBg,
                position: "fixed",
                top: 0,
                left: 0,
                zIndex: 1,
            }}
        />
    );
};

export default LogoParticles;