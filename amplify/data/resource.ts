import { type ClientSchema, a, defineData } from "@aws-amplify/backend";

const schema = a.schema({
  Todo: a
    .model({
      content: a.string(),
    })
    .authorization((allow) => [allow.owner()]),

  // Updated conversation route
  chat: a
    .conversation({
      aiModel: a.ai.model("Claude 3.5 Sonnet"),
      systemPrompt: "You are a helpful assistant",
    }),

  // Updated generation route
  generateRecipe: a
    .generation({
      aiModel: a.ai.model("Claude 3.5 Sonnet"),
      systemPrompt: "You are a helpful assistant that generates recipes.",
    })
    .arguments({
      description: a.string(),
    })
    .returns(
      a.customType({
        name: a.string(),
        ingredients: a.string().array(),
        instructions: a.string(),
      })
    )
    .authorization((allow) => allow.authenticated()),
});

export type Schema = ClientSchema<typeof schema>;

export const data = defineData({
  schema,
  authorizationModes: {
    apiKeyAuthorizationMode: {
      expiresInDays: 30,
    },
    defaultAuthorizationMode: "userPool",
  },
});
