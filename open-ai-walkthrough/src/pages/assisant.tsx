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
  const [waiting, setWaiting] = useState(false);
  const [messageList, setMessageList] = useState<ThreadMessage[]>([]);
  const openai = new OpenAI({ apiKey: apiKey, dangerouslyAllowBrowser: true });
  const [thread, setThread] = useState<null | Threads.Thread>(null)

  useEffect(() => {
    const createThread = async () => {
      setThread(await openai.beta.threads.create());
    }
    if (thread) return
    createThread();
  }, [])

  const handleQuery = async () => {
    if (!thread) return;
    setQuery("");  
    setWaiting(true);

    const _message = await openai.beta.threads.messages.create(
      thread.id,
      {
        role: "user",
        content: query
      }
    )

    try {
      const run = await openai.beta.threads.runs.create(
        thread.id,
        {
          assistant_id: assistantId
        }
      );

        const intervalId = setInterval(async () => {
          console.log('This will run every 3 seconds');
          const res = await openai.beta.threads.runs.retrieve(thread.id, run.id);
          if (res.status == "completed") {
            updateMessages(intervalId);
          }
        }, 3000);
      
      }
      catch (error) {
        console.error("An error occurred:", error);
      }
   
  };

  const updateMessages = async (intervalId: NodeJS.Timeout) => {
    clearInterval(intervalId);
    if (!thread) return;
    const messages = await openai.beta.threads.messages.list(
      thread.id
    )

    setMessageList(messages.data.reverse());
    setWaiting(false);

  }

  const handleQueryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(query);
    
    setQuery(e.target.value);
  };

  return (
    <div className="container mx-auto p-4">
      <div>
      <p>text</p>
        {messageList.map(message => (
          <div className='flex flex-col py-3' key={message.id}>
            <p key={message.id}>{message.role}:</p>
            <div className='flex-1 ml-3'>
              {message.content.length === 0 ? "No Content" :
                (
                  <p className="text-left">{message.content[0].type === "text" && message.content[0].text.value}</p>
                )
              }
            </div>
          </div>
        ))}
      </div>

      <form onSubmit={handleQuery}>
        <div className="mt-2 flex flex-row items-center">
          <input 
            style={{flex:1}}
            onChange={handleQueryChange}
            value={query}
            id={'query'}
            placeholder={'Enter Question here'}
          />

          <button>
            Search
          </button>
        </div>
      </form>            
    </div>
  );
};

export default Assistant;