import { AgentStep, AgentStepInput, AgentStepOutput } from '@langchain/langgraph-sdk';

const ResourceHandler: AgentStep = async (input: AgentStepInput): Promise<AgentStepOutput> => {
  const { state, resource } = input;

  // Process the "Resource" object and update the state
  const updatedState = { ...state };

  // Example: Add the resource to the state
  updatedState.resources = [...(updatedState.resources || []), resource];

  // Perform additional processing or state updates based on the resource type
  // ...

  return { state: updatedState };
};

export default ResourceHandler;
