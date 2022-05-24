import { useAtomValue } from "jotai";
import { selectedBrushAtom } from "../../brush/atoms/selectedBrushAtom";
import sx from "./CharacterGrid.module.css";
interface CharacterGridProps {
  children: React.ReactNode;
}
export function CharacterGrid(props: CharacterGridProps) {
  const selectedBrush = useAtomValue(selectedBrushAtom);
  return (
    <div id="characters" className={sx.container} data-selected-brush={selectedBrush}>
      {props.children}
    </div>
  );
}