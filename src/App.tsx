import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import TulajdonsagSlider from "./components/TulajdonsagSlider.tsx";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { useState, useRef } from "react";
import { Rezges } from "./scripts/Rezges.ts";

const canvasWidth = 500;
const canvasHeight = canvasWidth;
const ppm = canvasWidth;

const theme = createTheme({
    colorSchemes: {
        dark: true,
    },
});

export default function App() {
    const [ampl1, setAmpl1] = useState(0.2);
    const [frekv1, setFrekv1] = useState(1);
    const [faz1, setFaz1] = useState(0);
    const [ampl2, setAmpl2] = useState(0.2);
    const [frekv2, setFrekv2] = useState(1);
    const [faz2, setFaz2] = useState(0);

    const animationRef = useRef(0);
    const canvasRef = useRef(null);
    const timestampRef = useRef(null);

    const xRezges = new Rezges(ampl1, frekv1, faz1);
    const yRezges = new Rezges(ampl2, frekv2, faz2);

    const pontok: { x: number, y: number}[] = [];

    const startTimestamp = Date.now();
    let lastPont = startTimestamp;

    function Render() {
        if (canvasRef.current == null) return;
        if (timestampRef.current == null) return;

        const pillanat = (Date.now() - startTimestamp) / 1000;
        const pillanatElement = timestampRef.current as HTMLElement;
        pillanatElement.innerHTML = `t = ${Math.round(pillanat * 10) / 10}s`;

        const canvas = canvasRef.current as HTMLCanvasElement;
        const ctx = canvas.getContext("2d");

        if (ctx == null) return;

        if (pontok.length < 350 && Date.now() - lastPont > 25) {
            pontok.push({
                x: canvasWidth / 2 + xRezges.ertek(pillanat) * ppm,
                y: canvasHeight / 2 + yRezges.ertek(pillanat) * ppm
            });
            lastPont = Date.now();
        }

        ctx.clearRect(0, 0, canvasWidth, canvasHeight);

        ctx.beginPath();
        ctx.strokeStyle = "oklch(0.704 0.191 22.216)";
        for (let i = 1; i < pontok.length; i++) {
            ctx.moveTo(pontok[i - 1].x, pontok[i - 1].y);
            ctx.lineTo(pontok[i].x, pontok[i].y);
            ctx.stroke();
        }

        ctx.beginPath();
        ctx.arc(canvasWidth / 2 + xRezges.ertek(pillanat) * ppm, canvasHeight / 2 + yRezges.ertek(pillanat) * ppm, 5, 0, 2 * Math.PI);
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
                    <Typography variant={"h5"} component={"h2"}>Vízszintes rezgés</Typography>
                    <TulajdonsagSlider state={ampl1} setState={setAmpl1} label={"Amplitudó"} measurement={"m"} min={0} max={0.4} />
                    <TulajdonsagSlider state={frekv1} setState={setFrekv1} label={"Frekvencia"} measurement={"Hz"} min={0.2} max={2.2} />
                    <TulajdonsagSlider state={faz1} setState={setFaz1} label={"Kezdő fázis"} measurement={"π"} min={0} max={2} />
                    <Divider />
                    <Typography variant={"h5"} component={"h2"}>Függőleges rezgés</Typography>
                    <TulajdonsagSlider state={ampl2} setState={setAmpl2} label={"Amplitudó"} measurement={"m"} min={0} max={0.4} />
                    <TulajdonsagSlider state={frekv2} setState={setFrekv2} label={"Frekvencia"} measurement={"Hz"} min={0.2} max={2.2} />
                    <TulajdonsagSlider state={faz2} setState={setFaz2} label={"Kezdő fázis"} measurement={"π"} min={0} max={2} />
                </div>
            </div>
        </ThemeProvider>
    );
}