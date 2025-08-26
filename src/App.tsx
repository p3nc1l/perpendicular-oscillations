import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import ParameterSlider from "./components/ParameterSlider.tsx";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { useState, useRef } from "react";
import { Oscillation } from "./scripts/Oscillation.ts";
import Dictionary from "./scripts/Dictionary.ts";

const canvasWidth = 500;
const canvasHeight = canvasWidth;
const ppm = canvasWidth;

const theme = createTheme({
    colorSchemes: {
        dark: true,
    },
});

export default function App(props: { lang?: "en" | "hu" }) {
    const [amplitude1, setAmplitude1] = useState(0.2);
    const [frequency1, setFrequency1] = useState(1);
    const [phase1, setPhase1] = useState(0);
    const [amplitude2, setAmplitude2] = useState(0.2);
    const [frequency2, setFrequency2] = useState(1);
    const [phase2, setPhase2] = useState(0);

    const animationRef = useRef(0);
    const canvasRef = useRef(null);
    const timestampRef = useRef(null);

    const xOscillation = new Oscillation(amplitude1, frequency1, phase1);
    const yOscillation = new Oscillation(amplitude2, frequency2, phase2);

    const points: { x: number, y: number}[] = [];

    const startTimestamp = Date.now();
    let lastPont = startTimestamp;

    const lang = props.lang || "en";

    function Render() {
        if (canvasRef.current == null) return;
        if (timestampRef.current == null) return;

        const timestamp = (Date.now() - startTimestamp) / 1000;
        const timestampElement = timestampRef.current as HTMLElement;
        timestampElement.innerHTML = `t = ${Math.round(timestamp * 10) / 10}s`;

        const canvas = canvasRef.current as HTMLCanvasElement;
        const ctx = canvas.getContext("2d");

        if (ctx == null) return;

        if (points.length < 350 && Date.now() - lastPont > 25) {
            points.push({
                x: canvasWidth / 2 + xOscillation.value(timestamp) * ppm,
                y: canvasHeight / 2 + yOscillation.value(timestamp) * ppm
            });
            lastPont = Date.now();
        }

        ctx.clearRect(0, 0, canvasWidth, canvasHeight);

        ctx.beginPath();
        ctx.strokeStyle = "oklch(0.704 0.191 22.216)";
        for (let i = 1; i < points.length; i++) {
            ctx.moveTo(points[i - 1].x, points[i - 1].y);
            ctx.lineTo(points[i].x, points[i].y);
            ctx.stroke();
        }

        ctx.beginPath();
        ctx.arc(canvasWidth / 2 + xOscillation.value(timestamp) * ppm, canvasHeight / 2 + yOscillation.value(timestamp) * ppm, 5, 0, 2 * Math.PI);
        ctx.fillStyle = "white";
        ctx.fill();

        animationRef.current =  requestAnimationFrame(Render);
    }

    cancelAnimationFrame(animationRef.current);
    animationRef.current =  requestAnimationFrame(Render);

    return (
        <ThemeProvider theme={theme}>
            <div className="flex justify-center items-center w-screen h-screen gap-10">
                <div className={`flex flex-col items-center justify-center w-150 max-w-2/5 relative aspect-${canvasWidth}/${canvasHeight}`}>
                    <svg className={`w-full h-full`} xmlns="http://www.w3.org/2000/svg" viewBox={`0 0 ${canvasWidth} ${canvasHeight}`}>
                        <path
                            className={"fill-none stroke-white stroke-2"}
                            d={`M${canvasWidth * 0.05} ${canvasHeight * 0.01} L${canvasWidth * 0.05} ${canvasHeight * 0.95} L${canvasWidth * 0.99} ${canvasHeight * 0.95}`}
                        />
                        <path
                            className={"fill-none stroke-white stroke-2"}
                            d={`M${canvasWidth * 0.04} ${canvasHeight * 0.02} L${canvasWidth * 0.05} ${canvasHeight * 0.01} L${canvasWidth * 0.06} ${canvasHeight * 0.02}`}
                        />
                        <path
                            className={"fill-none stroke-white stroke-2"}
                            d={`M${canvasWidth * 0.98} ${canvasHeight * 0.94} L${canvasWidth * 0.99} ${canvasHeight * 0.95} L${canvasWidth * 0.98} ${canvasHeight * 0.96}`}
                        />
                        <text x={canvasWidth * 0.02} y={canvasHeight * 0.98} className={"fill-white text-base"}>O</text>
                        <text x={canvasWidth * 0.98} y={canvasHeight * 0.98} className={"fill-white text-base"}>x</text>
                        <text x={canvasWidth * 0.02} y={canvasHeight * 0.02} className={"fill-white text-base"}>y</text>
                    </svg>
                    <canvas ref={canvasRef} className="w-19/20 absolute top-0 right-0" width={canvasWidth} height={canvasHeight} />
                    <Typography ref={timestampRef}>t = 0s</Typography>
                </div>
                <div className={`flex flex-col justify-center gap-2 w-1/4`}>
                    <Typography variant={"h5"} component={"h2"}>{Dictionary.get("horizontal oscillation")?.get(lang)}</Typography>
                    <ParameterSlider state={amplitude1} setState={setAmplitude1} label={Dictionary.get("amplitude")?.get(lang) || ""} measurement={"m"} min={0} max={0.4} />
                    <ParameterSlider state={frequency1} setState={setFrequency1} label={Dictionary.get("frequency")?.get(lang) || ""} measurement={"Hz"} min={0.2} max={2.2} />
                    <ParameterSlider state={phase1} setState={setPhase1} label={Dictionary.get("initial phase")?.get(lang) || ""} measurement={"π"} min={0} max={2} />
                    <Divider />
                    <Typography variant={"h5"} component={"h2"}>{Dictionary.get("vertical oscillation")?.get(lang)}</Typography>
                    <ParameterSlider state={amplitude2} setState={setAmplitude2} label={Dictionary.get("amplitude")?.get(lang) || ""} measurement={"m"} min={0} max={0.4} />
                    <ParameterSlider state={frequency2} setState={setFrequency2} label={Dictionary.get("frequency")?.get(lang) || ""} measurement={"Hz"} min={0.2} max={2.2} />
                    <ParameterSlider state={phase2} setState={setPhase2} label={Dictionary.get("initial phase")?.get(lang) || ""} measurement={"π"} min={0} max={2} />
                </div>
            </div>
        </ThemeProvider>
    );
}