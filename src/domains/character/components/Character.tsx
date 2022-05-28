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
  const handleBrushEvent = (event: React.MouseEvent<HTMLElement>) => {
    if ((event.buttons & 1) !== 1) return;
    setTier(selectedBrush);
  }
  const touchRef = useRef({
    touchs: new Map(),
  });
  const handleTouchEvent = (event: React.TouchEvent<HTMLElement>) => {
    Array.from(event.changedTouches).forEach(touch => {
      const { identifier } = touch;
      const { clientX, clientY } = touch;
      const touchs = touchRef.current.touchs;
      switch (event.type) {
        case "touchstart": {
          touchs.set(identifier, { x: clientX, y: clientY });
          break;
        }
        case "touchmove": {
          if (!touchs.has(identifier)) break;
          const { x, y } = touchs.get(identifier);
          const dx = clientX - x;
          const dy = clientY - y;
          if (dx*dx+dy*dy >= 32) {
            touchs.delete(identifier);
          }
          break;
        }
        case "touchend":
        case "touchcancel": {
          if (!touchs.has(identifier)) break;
          setTier(selectedBrush);
          break;
        }
      }
    });
  }
  return (
    <figure
      className={sx.container}
      onMouseEnter={handleBrushEvent}
      onMouseDown={handleBrushEvent}
      onTouchStart={handleTouchEvent}
      onTouchEnd={handleTouchEvent}
      onTouchCancel={handleTouchEvent}
      onTouchMove={handleTouchEvent}
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