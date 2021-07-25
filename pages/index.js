import Box from "../src/components/Box";
import MainGrid from "../src/components/MainGrid";
import {
  AlurakutMenu,
  AlurakutProfileSidebarMenuDefault,
  OrkutNostalgicIconSet,
} from "../src/lib/AluraKutCommons";
import { ProfileRelationsBoxWrapper } from "../src/components/ProfileRelations";
import { useState } from "react";

function ProfileSideBar(props) {
  return (
    <Box as="aside">
      <img
        src={`https://github.com/${props.githubUser}.png`}
        style={{ borderRadius: "8px" }}
      />
      <hr />
      <p>
        <a className="boxLink" href={`https://github.com/${props.githubUser}`}>
          @{props.githubUser}
        </a>
      </p>
      <hr />
      <AlurakutProfileSidebarMenuDefault />
    </Box>
  );
}

export default function Home() {
  const githubUser = "Aline-ACS";
  const [comunidades, setComunidades] = useState([
    {
      id: "1",
      title: "Eu odeio acordar cedo",
      image: "https://alurakut.vercel.app/capa-comunidade-01.jpg",
    },
  ]);
  const pessoasFavoritas = [
    "juunegreiros",
    "omariosouto",
    "peas",
    "rafaballerini",
    "marcobrunodev",
    "felipefialho",
  ];

  const handleCreateCommunity = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const comunidade = {
      id: new Date().toISOString(),
      title: formData.get("title"),
      image: formData.get("image"),
    };
    setComunidades([...comunidades, comunidade]);
  };

  return (
    <>
      <AlurakutMenu githubUser={githubUser} />
      <MainGrid>
        <div className="profileArea" style={{ gridArea: "profileArea" }}>
          <ProfileSideBar githubUser={githubUser} />
        </div>
        <div className="welcomeArea" style={{ gridArea: "welcomeArea" }}>
          <Box>
            <h1 className="title">Bem vindo (a), {githubUser}</h1>
            <OrkutNostalgicIconSet />
          </Box>
          <Box>
            <h2 className="subTitle">O que você deseja fazer?</h2>
            <form onSubmit={handleCreateCommunity}>
              <div>
                <input
                  name="title"
                  type="text"
                  placeholder="Qual vai ser o nome da sua comunidade?"
                  aria-label="Qual vai ser o nome da sua comunidade?"
                />
              </div>
              <div>
                <input
                  name="image"
                  placeholder="Coloque uma URL para usarmos de capa."
                  aria-label="Coloque uma URL para usarmos de capa."
                />
              </div>
              <button type="submit">Criar comunidade</button>
            </form>
          </Box>
        </div>
        <div
          className="profileRelationsArea"
          style={{ gridArea: "profileRelationsArea" }}
        >
          <ProfileRelationsBoxWrapper>
            <h2 className="smallTitle">Comunidades ({comunidades.length})</h2>
            <ul>
              {comunidades.map((value) => {
                return (
                  <li key={value.id}>
                    <a href={`/users/${value.title}`}>
                      <img src={value.image} />
                      <span>{value.title}</span>
                    </a>
                  </li>
                );
              })}
            </ul>
          </ProfileRelationsBoxWrapper>
          <ProfileRelationsBoxWrapper>
            <h2 className="smallTitle">
              Pessoas da comunidade ({pessoasFavoritas.length})
            </h2>
            <ul>
              {pessoasFavoritas.map((value) => {
                return (
                  <li key={value}>
                    <a href={`/users/${value}`}>
                      <img src={`https://github.com/${value}.png`} />
                      <span>{value}</span>
                    </a>
                  </li>
                );
              })}
            </ul>
          </ProfileRelationsBoxWrapper>
        </div>
      </MainGrid>
    </>
  );
}
