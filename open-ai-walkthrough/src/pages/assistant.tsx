import openai, { OpenAI } from 'openai';
import { Threads } from 'openai/resources/beta/index.mjs';
import { ThreadMessage, ThreadMessagesPage } from 'openai/resources/beta/threads/index.mjs';
import { FC, useEffect, useState } from 'react';

interface Props {
  assistantId: string,
  apiKey: string
}

const Assistant: FC<Props> = ({assistantId, apiKey}) => {
  const [query, setQuery] = useState<string>('');
  const [messageList, setMessageList] = useState<ThreadMessage[]>([]);
  const openai = new OpenAI({ apiKey: apiKey, dangerouslyAllowBrowser: true });//you should not pass these keys through the front end
  const [thread, setThread] = useState<null | Threads.Thread>(null)

  useEffect(() => {
    // const thread = await openai.beta.threads.create();

  }, [])

  const updateMessages = async (intervalId: NodeJS.Timeout) => {
    

  }
  
  const handleQuery = async () => {
    
   
  };


  const handleQueryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  
    setQuery(e.target.value);

  };

  return (
    <div className="container mx-auto p-4">
      <form 
        onSubmit={(e) => {e.preventDefault(); handleQuery()}} 
        className="flex flex-col text-center w-full mb-6 max-w-4xl"
      >
         <div className="mt-2 flex flex-row items-center">
            <input 
              style={{flex: 1}}
              onChange={handleQueryChange}
              value={query}
              id="query"
              placeholder="Enter Question here"
            />
            <button type="submit">Search</button>
         </div>
      </form>
    </div>
  );
};

export default Assistant;
