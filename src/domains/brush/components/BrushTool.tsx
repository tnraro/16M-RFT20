import { useAtom, useAtomValue } from "jotai";
import { selectedBrushAtom } from "../atoms/selectedBrushAtom";
import sx from "./BrushTool.module.css";

const tierStyleMap = [sx.tier0, sx.tier1, sx.tier2, sx.tier3];
export interface BrushToolProps {
  children: React.ReactNode;
}
export function BrushTool(props: BrushToolProps) {
  const selectedBrush = useAtomValue(selectedBrushAtom);
  return (
    <div className={sx.container}>
      <h1>🎨색칠 도구</h1>
      <div>
        <div className={[sx.brush, sx.preview, tierStyleMap[selectedBrush]].join(" ")} />
        <div>|</div>
        {props.children}
      </div>
    </div>
  );
}
export interface Brush {
  value: number;
  description: string;
}
export function Brush(props: Brush) {
  const [selectedBrush, setSelectedBrush] = useAtom(selectedBrushAtom);
  return (
    <label
      className={[sx.brush].join(" ")}
      aria-selected={selectedBrush === props.value}
    >
      <input
        type="radio"
        name="brush"
        value={props.value}
        onChange={() => setSelectedBrush(props.value)}
      />
      {props.description}
    </label>
  );
}