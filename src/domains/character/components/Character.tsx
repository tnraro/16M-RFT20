import { atom, SetStateAction, useAtom, useAtomValue, WritableAtom } from "jotai";
import { useEffect, useRef } from "react";
import Image from "next/image";
import { selectedBrushAtom } from "../../brush/atoms/selectedBrushAtom";
import sx from "./Character.module.css";
import { atomWithStorage, RESET } from "jotai/utils";
export interface CharacterProps {
  id: number;
  name: string;
  ko: string;
}
const fakeAtom = atom(3);
const tierStyleMap = [sx.tier0, sx.tier1, sx.tier2, sx.tier3];
export function Character(props: CharacterProps) {
  const tierAtomRef = useRef<WritableAtom<number, typeof RESET | SetStateAction<number>, void> | null>(null);
  useEffect(() => {
    if (tierAtomRef.current != null) return;
    tierAtomRef.current = atomWithStorage(`c|${props.id}`, 3);
  }, [props.id]);
  const [tier, setTier] = useAtom<number, number, void>(tierAtomRef.current ?? fakeAtom);
  const selectedBrush = useAtomValue(selectedBrushAtom);
  const handleBrushEvent = (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
    if ((event.buttons & 1) !== 1) return;
    setTier(selectedBrush);
  }
  return (
    <figure
      className={sx.container}
      onMouseEnter={handleBrushEvent}
      onMouseDown={handleBrushEvent}
    >
      <div className={[sx.portrait, tierStyleMap[tier]].join(" ")}>
        <Image
          width={64}
          height={64}
          objectFit="cover"
          src={`/${props.name}_S000.webp`}
          alt={props.name}
          draggable={false}
        />
      </div>
      <figcaption>{props.ko}</figcaption>
    </figure>
  );
}