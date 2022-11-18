import { useSnapshot } from "valtio";
import messageStore from "~/stores/messageStore";

export const Message: React.FC = () => {
  const message = useSnapshot(messageStore);

  if (!message.text) return <></>;

  if (message.type === "Error")
    return (
      <div className="absolute mx-auto w-96 left-0 right-0 bottom-[10%] align-middle" role="alert">
        <div className="bg-red-500 text-white font-bold rounded-t px-4 py-2">{message.type}</div>
        <div className="border border-t-0 border-red-400 rounded-b bg-red-100 px-4 py-2 text-red-700">
          <p className="overflow-hidden whitespace-pre-line text-ellipsis">{message.text}</p>
        </div>
      </div>
    );

  return (
    <div className="absolute mx-auto w-96 left-0 right-0 bottom-[10%] align-middle" role="alert">
      <div className="bg-blue-500 text-white font-bold rounded-t px-4 py-2">{message.type}</div>
      <div className="border border-t-0 border-blue-400 rounded-b bg-blue-100 px-4 py-2 text-blue-700">
        <p className="overflow-hidden whitespace-pre-line text-ellipsis">{message.text}</p>
      </div>
    </div>
  );
};
