import "./App.css";

const canvasWidth = 100;
const canvasHeight = canvasWidth;

export default function App() {
    return (
        <>
            <div className="w-150 max-w-2/5 relative">
                <canvas className="w-full" width={canvasWidth} height={canvasHeight} />
                <svg className={"absolute top-0 left-0 w-full h-full"} xmlns="http://www.w3.org/2000/svg" viewBox={`0 0 ${canvasWidth} ${canvasHeight}`}>
                    <line className={"h-full stroke-white stroke-1"} x1={0} y1={0} x2={0} y2={canvasHeight} />
                    <line className={"h-full stroke-white stroke-1"} x1={0} y1={canvasHeight} x2={canvasWidth} y2={canvasHeight} />
                </svg>
            </div>
        </>
    );
}