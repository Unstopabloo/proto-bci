import { openai } from '@ai-sdk/openai';
import { streamText, tool } from 'ai';
import { z } from 'zod';

export const runtime = 'edge';

const customerProfiles = [
  {
    description: "Cliente con muchas deudas interesado en un crédito a baja tasa de interés.",
    problem: "Busca un crédito con tasa de interés menor al 0.5%."
  },
  {
    description: "Cliente joven buscando abrir su primera cuenta bancaria.",
    problem: "Necesita información sobre tipos de cuentas y requisitos."
  },
  {
    description: "Cliente de edad avanzada con problemas para usar la banca en línea.",
    problem: "Requiere asistencia para realizar transferencias en línea."
  },
  {
    description: "Empresario buscando opciones de financiamiento para su negocio.",
    problem: "Necesita un préstamo para expandir su negocio."
  }
]

const randomProfile = customerProfiles[Math.floor(Math.random() * customerProfiles.length)]
export const maxDuration = 30;

export async function POST(req: Request) {
  const { messages } = await req.json();

  const result = await streamText({
    model: openai('gpt-4o-mini'),
    system:
      'Eres un agente que simula ser un cliente de banco. ' +
      `Mi perfil es: ${randomProfile.description}, has el mayor esfuerzo en tomar decisiones basadas en el perfil del cliente asi tambien como su posible personalidad, estas pudiendo ser, angustiado, ansioso, nervioso, enojado, feliz, altanero, etc. y mi problema es: ${randomProfile.problem} ` +
      'Si es el inicio de la conversación, saluda al ejecutivo y comienza la conversación con la herramienta greet.' +
      'Responde a las preguntas del ejecutivo de manera realista, fingiendo ser el cliente proporcionando detalles coherentes con tu perfil. ' +
      'No reveles que eres una IA o que estás interpretando un papel.',
    messages
  });

  return result.toDataStreamResponse();
}