import { GetStaticProps } from "next";
import { Character } from "../domains/character/components/Character";
import { fetchCharacters, CharacterData } from "../domains/er/server/fetchCharacters";
import { CharacterGrid } from "../domains/character-grid/components/CharacterGrid";
import { Brush, BrushTool } from "../domains/brush/components/BrushTool";
import { useState } from "react";

interface PageProps {
  characters: CharacterData[];
}
function Page(props: PageProps) {
  const [brush, setBrush] = useState(0);
  return (
    <>
      <header>
        <div>
          <a
            target="_blank"
            rel="noreferrer"
            href="https://twitter.com/hashtag/%EB%82%B4%EA%B0%80_%ED%95%A0%EC%88%98%EC%9E%88%EB%8A%94_%EC%8B%A4%ED%97%98%EC%B2%B4%EB%A5%BC_%EB%A7%90%ED%95%B4%EB%B3%B4%EC%9E%90">#내가_할수있는_실험체를_말해보자
          </a>
        </div>
        <div>💛 - 자주 함.</div>
        <div>💜 - 심심하면 함. 어느 정도 소화 가능</div>
        <div>💙 - 스킬 셋은 앎.</div>
        <div>🖤 - 스킬 셋도 모름 OR 너무 어려워서 못함.</div>
      </header>
      <main>
        <div className="tools">
          <BrushTool>
            <Brush value={0} symbol="💛" description="노란색" keyTrigger="1" />
            <Brush value={1} symbol="💜" description="보라색" keyTrigger="2" />
            <Brush value={2} symbol="💙" description="파란색" keyTrigger="3" />
            <Brush value={3} symbol="🖤" description="검정색" keyTrigger="4" />
          </BrushTool>
        </div>
        <CharacterGrid>
          {props.characters.map(character => {
            return <Character key={character.id} {...character} />
          })}
        </CharacterGrid>
      </main>
      <footer>
        <div>
          해시태그 만든 사람: <a
            href="https://twitter.com/Jippang_ER"
            rel="noreferrer"
            target="_blank">@Jippang_ER</a>
        </div>
        <div>
          만든 사람: <a
            href="https://twitter.com/tnraro_er"
            rel="noreferrer"
            target="_blank">@tnraro_er</a>
        </div>
        <div id="uid-0" hidden>,</div>
      </footer>
    </>
  );
}
export const getStaticProps: GetStaticProps = async (context) => {
  const characters = await fetchCharacters();
  return {
    props: {
      characters,
    },
  };
}
export default Page;