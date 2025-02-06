import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import TulajdonsagSlider from "./components/TulajdonsagSlider.tsx";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { useState, useRef } from "react";
import Rezges from "./scripts/Rezges.ts";

const canvasWidth = 500;
const canvasHeight = canvasWidth;

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

    const xRezges = new Rezges(ampl1, frekv1, faz1);
    const yRezges = new Rezges(ampl2, frekv2, faz2);

    const startTimestamp = Date.now();

    function Render() {
        animationRef.current =  requestAnimationFrame(Render);
    }

    cancelAnimationFrame(animationRef.current);
    animationRef.current =  requestAnimationFrame(Render);

    return (
        <ThemeProvider theme={theme}>
            <div className="flex justify-center items-center w-screen h-screen gap-10">
                <div className={`w-150 max-w-2/5 relative aspect-${canvasWidth}/${canvasHeight}`}>
                    <svg className={`w-full h-full`} xmlns="http://www.w3.org/2000/svg" viewBox={`0 0 ${canvasWidth} ${canvasHeight}`}>
                        <line className={"h-full stroke-white stroke-2"} x1={canvasWidth * 0.05} y1={canvasHeight * 0.01} x2={canvasWidth * 0.05} y2={canvasHeight * 0.95} />
                        <line className={"h-full stroke-white stroke-2"} x1={canvasWidth * 0.04} y1={canvasHeight * 0.02} x2={canvasWidth * 0.05} y2={canvasHeight * 0.01} />
                        <line className={"h-full stroke-white stroke-2"} x1={canvasWidth * 0.05} y1={canvasHeight * 0.01} x2={canvasWidth * 0.06} y2={canvasHeight * 0.02} />
                        <line className={"h-full stroke-white stroke-2"} x1={canvasWidth * 0.05} y1={canvasHeight * 0.95} x2={canvasWidth * 0.99} y2={canvasHeight * 0.95} />
                        <line className={"h-full stroke-white stroke-2"} x1={canvasWidth * 0.98} y1={canvasHeight * 0.94} x2={canvasWidth * 0.99} y2={canvasHeight * 0.95} />
                        <line className={"h-full stroke-white stroke-2"} x1={canvasWidth * 0.98} y1={canvasHeight * 0.96} x2={canvasWidth * 0.99} y2={canvasHeight * 0.95} />
                        <text x={canvasWidth * 0.02} y={canvasHeight * 0.97} className={"fill-white text-xs"}>0</text>
                        <text x={canvasWidth * 0.98} y={canvasHeight * 0.98} className={"fill-white text-xs"}>x</text>
                        <text x={canvasWidth * 0.02} y={canvasHeight * 0.02} className={"fill-white text-xs"}>y</text>
                    </svg>
                    <canvas className="w-19/20 absolute top-0 right-0" width={canvasWidth} height={canvasHeight} />
                </div>
                <div className={`flex flex-col justify-center gap-2 w-1/7`}>
                    <Typography variant={"h5"} component={"h2"}>Vízszintes rezgés</Typography>
                    <TulajdonsagSlider state={ampl1} setState={setAmpl1} label={"Amplitudo"} measurement={"m"} min={0} max={0.4} />
                    <TulajdonsagSlider state={frekv1} setState={setFrekv1} label={"Frekvencia"} measurement={"Hz"} min={0.2} max={2.2} />
                    <TulajdonsagSlider state={faz1} setState={setFaz1} label={"Kezdo fazis"} measurement={"π"} min={0} max={2} />
                    <Divider />
                    <TulajdonsagSlider state={ampl2} setState={setAmpl2} label={"Amplitudo"} measurement={"m"} min={0} max={0.4} />
                    <TulajdonsagSlider state={frekv2} setState={setFrekv2} label={"Frekvencia"} measurement={"Hz"} min={0.2} max={2.2} />
                    <TulajdonsagSlider state={faz2} setState={setFaz2} label={"Kezdo fazis"} measurement={"π"} min={0} max={2} />
                </div>
            </div>
        </ThemeProvider>
    );
}