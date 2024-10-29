import { AgentStep, AgentStepInput, AgentStepOutput } from '@langchain/langgraph-sdk';
import WebSocketClient from './WebSocketClient';

const processComplexQuery: AgentStep = async (input: AgentStepInput): Promise<AgentStepOutput> => {
  const { state, query } = input;

  // Create a WebSocketClient instance
  const webSocketClient = new WebSocketClient('${LANGGRAPH_API_URL}/ws/process-complex-query');

  try {
    // Connect to the WebSocket server
    await webSocketClient.connect();

    // Send the query and state to the remote assistant
    webSocketClient.send(JSON.stringify({ query, state }));

    // Handle the response from the assistant
    webSocketClient.onMessage((message) => {
      const response = JSON.parse(message);

      // Process the response, which may include "Resource" objects
      const updatedState = handleResponse(state, response);

      return { state: updatedState };
    });
  } catch (error) {
    console.error('Error processing complex query:', error);
    return { state };
  } finally {
    // Close the WebSocket connection
    webSocketClient.close();
  }
};

// Helper function to handle the response from the assistant
const handleResponse = (state, response) => {
  // Process "Resource" objects and update the state accordingly
  const updatedState = { ...state };

  if (response.resources) {
    response.resources.forEach((resource) => {
      updatedState.resources = [...(updatedState.resources || []), resource];
    });
  }

  // Update other parts of the state based on the response
  // ...

  return updatedState;
};

export default processComplexQuery;
