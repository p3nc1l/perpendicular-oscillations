import Slider from "@mui/material/Slider";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import Typography from "@mui/material/Typography";

export default function ParameterSlider({ state, setState, label, measurement, max, min }: { state: number, setState: (state: number) => void; label: string, measurement: string, max: number, min: number }) {
    return (
        <>
            <Typography>{label}</Typography>
            <div className={`flex flex-row items-center gap-2`}>
                <Slider value={state} min={min} max={max} step={(max - min) / 20} onChange={(_, value) => setState(value as number)} />
                <TextField className={"w-35"} disabled size={"small"} slotProps={{ input: { endAdornment: <InputAdornment position={"end"}>{measurement}</InputAdornment> } }} value={state} />
            </div>
        </>
    );
}