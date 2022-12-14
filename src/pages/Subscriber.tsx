import { gql, useMutation } from "@apollo/client";
import { useState, FormEvent } from "react";
import { Logo } from "../components/Logo";
import { useNavigate } from "react-router-dom";

import mockupImg from "/src/assets/mockup.png"

const CREATE_SUBSCRIBER_MUTATION = gql`
  mutation CreateSubscriber($name: String!, $email: String!) {
    createSubscriber(data: { name: $name, email: $email }) {
      id
    }
  }
`;

export function Subscriber() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const [createSubscriber, { loading }] = useMutation(
    CREATE_SUBSCRIBER_MUTATION
  );

  async function handleSubscriber(event: FormEvent) {
    event.preventDefault();

    await createSubscriber({
      variables: {
        name,
        email,
      },
    });

    navigate("/event");
  }

  return (
    <div className="min-h-screen bg-blur bg-cover bg-no-repeat flex flex-col items-center">
      <div className="w-full max-w-[1100px] flex flex-col items-center justify-between mt-10 text-center sm:flex-row sm:text-start sm:mx-auto">
        <div className="max-w-[640px] mx-10 mb-10">
          <div className="flex items-center justify-center sm:items-start sm:justify-start">
            <Logo />
          </div>

          <h1 className="mt-8 text-[2.5rem] leading-tight">
            Construa uma{" "}
            <strong className="text-blue-500">aplicação completa</strong>, do
            zero, com <strong className="text-blue-500">React</strong>
          </h1>
          <p className="mt-4 text-gray-200 leading-relaxed">
            Em apenas uma semana você vai dominar na prática uma das tecnologias
            mais utilizadas e com alta demanda para acessar as melhores
            oportunidades do mercado.
          </p>
        </div>

        <div className="p-8 bg-gray-700 border border-gray-500 rounded w-full text-start">
          <strong className="text-2xl mb-6 block">
            Inscreva-se gratuitamente
          </strong>
          <form
            onSubmit={handleSubscriber}
            className="flex flex-col gap-2 w-full"
          >
            <input
              type="text"
              placeholder="Seu nome completo"
              className="px-5 h-14 bg-gray-900 rounded"
              value={name}
              onChange={(event) => setName(event.target.value)}
            />
            <input
              type="email"
              placeholder="Digite seu e-mail"
              className="px-5 h-14 bg-gray-900 rounded"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />

            <button
              type="submit"
              disabled={loading}
              className="font-bold text-sm mt-4 py-4 uppercase bg-green-500 hover:bg-green-700 rounded transition-colors disabled:opacity-50"
            >
              Garantir minha vaga
            </button>
          </form>
        </div>
      </div>
      <img
        src={mockupImg}
        className="mt-10"
        alt="code group image"
      />
    </div>
  );
}
