import { connectToDatabase } from "@/utils/database";
import { NextApiRequest, NextApiResponse } from "next";
import Prompt from "@/models/Prompt";

export const POST = async (req: NextApiRequest, res: NextApiResponse) => {
  const { userId, prompt, tag } = req.body;
  console.log(req.body);
  try {
    await connectToDatabase();
    const newPrompt = new Prompt({
      creator: userId,
      prompt,
      tag,
    });

    await newPrompt.save();

    return new Response(JSON.stringify(newPrompt), { status: 200 });
  } catch (err) {
    console.log(err);
    return new Response("Failed to create response", { status: 500 });
  }
};
