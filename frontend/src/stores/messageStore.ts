import { proxy } from "valtio";

export interface MessageStore {
  text: string | null;
  type: "Error" | "Info";
  setInfo: (text: string) => void;
  setError: (text: string) => void;
  clearMessage: () => void;
}

const messageStore = proxy<MessageStore>({
  text: null,
  type: "Info",
  setInfo: (text: string) => {
    messageStore.text = text;
    messageStore.type = "Info";
  },
  setError: (text: string) => {
    messageStore.text = text;
    messageStore.type = "Error";
  },
  clearMessage: () => {
    messageStore.text = null;
  },
});

export default messageStore;
