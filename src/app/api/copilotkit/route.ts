import { NextRequest } from "next/server";
import {
  CopilotRuntime,
  LangChainAdapter,
  copilotRuntimeNextJSAppRouterEndpoint,
} from "@copilotkit/runtime";
import { ChatOpenAI } from "@langchain/openai";

const model = new ChatOpenAI({
  modelName: process.env["OPENAI_MODEL"] || "gpt-4o-mini-2024-07-18",
  temperature: 0,
  apiKey: process.env["OPENAI_API_KEY"],
});

export const POST = async (req: NextRequest) => {
  try {
    console.log("CopilotKit API route called");
    console.log("Using model:", process.env["OPENAI_MODEL"] || "gpt-4o-mini-2024-07-18");
    
    const { handleRequest } = copilotRuntimeNextJSAppRouterEndpoint({
      runtime: new CopilotRuntime({
        actions: [],
      }),
      serviceAdapter: new LangChainAdapter({
        chainFn: async ({ messages, tools, threadId }) => {
          console.log("Processing request with", messages.length, "messages");
          
          try {
            if (tools && tools.length > 0) {
              const modelWithTools = model.bindTools(tools, { strict: true });
              return modelWithTools.stream(messages, { 
                tools, 
                metadata: { conversation_id: threadId } 
              });
            } else {
              return model.stream(messages, { 
                metadata: { conversation_id: threadId } 
              });
            }
          } catch (error) {
            console.error("Error in chainFn:", error);
            throw error;
          }
        },
      }),
      endpoint: req.nextUrl.pathname,
    });
    
    return handleRequest(req);
  } catch (error) {
    console.error("Error in CopilotKit route:", error);
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
};