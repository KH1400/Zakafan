
'use server';
/**
 * @fileOverview An AI flow to generate an image from a text prompt.
 *
 * - generateImage - A function that generates an image based on a description.
 * - GenerateImageInput - The input type for the generateImage function.
 * - GenerateImageOutput - The return type for the generateImage function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateImageInputSchema = z.string().describe('A text prompt describing the image to generate.');
export type GenerateImageInput = z.infer<typeof GenerateImageInputSchema>;

const GenerateImageOutputSchema = z.string().describe("The generated image as a data URI. Expected format: 'data:image/png;base64,<encoded_data>'.");
export type GenerateImageOutput = z.infer<typeof GenerateImageOutputSchema>;

export async function generateImage(prompt: GenerateImageInput): Promise<GenerateImageOutput> {
  return generateImageFlow(prompt);
}

const generateImageFlow = ai.defineFlow(
  {
    name: 'generateImageFlow',
    inputSchema: GenerateImageInputSchema,
    outputSchema: GenerateImageOutputSchema,
  },
  async (prompt) => {
    // This flow is now disabled to prevent API quota errors.
    // It returns a static placeholder. The actual images are defined in the components.
    return "https://placehold.co/1200x800.png";
  }
);
