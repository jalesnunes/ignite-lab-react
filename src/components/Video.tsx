import {
  CaretRight,
  DiscordLogo,
  FileArrowDown,
  Lightning,
  Image,
} from "phosphor-react";


import { Button } from "./Button";
import { gql, useQuery } from "@apollo/client";
import { DefaultUi, Player, Youtube } from "@vime/react";

import "@vime/core/themes/default.css";

const GET_LESSONS_BY_SLUG_QUERY = gql`
  query GetLEssonBySlug($slug: String) {
    lesson(where: { slug: $slug }) {
      title
      videoId
      description
      teacher {
        bio
        avatarURL
        name
      }
    }
  }
`;

interface GetLEssonBySlugRes {
  lesson: {
    title: string;
    videoId: string;
    description: string;
    teacher: {
      bio: string;
      avatarURL: string;
      name: string;
    }
  }
}

interface VideoProps {
  lessonSlug: string;
}

export function Video(props: VideoProps) {
  const linkToDiscord = "https://discord.com/";
  const linkToChallenge = "https://www.facebook.com/";

  const { data } = useQuery<GetLEssonBySlugRes>(GET_LESSONS_BY_SLUG_QUERY, {
    variables: {
      slug: props.lessonSlug,
    }
  })

  console.log(data)

  if (!data) {
    return (
      <div className="flex-1">
        <p>Carregando</p>
      </div>
    )
  }

  return (
    <div className="flex-1">
      <div className="bg-black flex justify-center">
        <div className="h-full w-full max-w-[1100px] max-h-[60vh] aspect-video">
          <Player>
            <Youtube videoId={data.lesson.videoId} />
            <DefaultUi />
          </Player>
        </div>
      </div>

      <div className="p-8 max-w-[1100px] mx-auto">
        <div className=" flex flex-col items-start gap-16 sm:flex-row">
          <div className="flex-1">
            <h1 className="text-2xl font-bold">{data.lesson.title}</h1>
            <p className="mt-4 text-gray-200 leading-relaxed">
            {data.lesson.description}
            </p>

            <div className="flex items-center gap-4 mt-6">
              <img
                className="w-16 h-16 rounded-full border-2 border-blue-500"
                src={data.lesson.teacher.avatarURL}
                alt="Teacher photo"
              />
              <div className="leading-relaxed">
                <strong className="font-bold text-2xl block">
                {data.lesson.teacher.name}
                </strong>
                <span className="text-gray-200 text-sm block">
                {data.lesson.teacher.bio}
                </span>
              </div>
            </div>
          </div>

          <div className="w-full flex flex-col gap-4 sm:w-60">
            <Button
              variant="default"
              logo={<DiscordLogo size={24} />}
              link={linkToDiscord}
              buttonName="Comunidade do Discord"
            />
            <Button
              variant="challenge"
              link={linkToChallenge}
              logo={<Lightning size={24} />}
              buttonName="Acesse o Desafio"
            />
          </div>
        </div>

        <div className="flex flex-col gap-8 mt-20 sm:grid sm:grid-cols-2">
          <a
            href=""
            className="h-40 bg-gray-700 rounded overflow-hidden flex items-center gap-6 hover:bg-gray-600 transition-colors sm:h-32"
          >
            <div className="bg-green-700 h-full p-6 flex items-center">
              <FileArrowDown size={40} />
            </div>

            <div className="py6 leading-relaxed">
              <strong className="text-2xl"> Material Complementar</strong>
              <p className="text-sm text-gray-200 mt-2">
                Acesse o material complementar para acelerar o seu
                desenvolvimento
              </p>
            </div>

            <div className="h-full p-6 flex items-center">
              <CaretRight size={24} />
            </div>
          </a>

          <a
            href=""
            className="h-40 bg-gray-700 rounded overflow-hidden flex items-center gap-6 hover:bg-gray-600 transition-colors sm:h-32"
          >
            <div className="bg-green-700 h-full p-6 flex items-center">
              <Image size={40} />
            </div>

            <div className="py6 leading-relaxed">
              <strong className="text-2xl"> Material Complementar</strong>
              <p className="text-sm text-gray-200 mt-2">
                Acesse o material complementar para acelerar o seu
                desenvolvimento
              </p>
            </div>

            <div className="h-full p-6 flex items-center">
              <CaretRight size={24} />
            </div>
          </a>
        </div>
      </div>
    </div>
  );
}
