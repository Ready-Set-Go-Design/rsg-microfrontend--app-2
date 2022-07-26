import { MyCard, MyComponent } from "@ready-set-go-design/rsg-mfe-package-ts";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { Observable } from "windowed-observable";

interface ObservableMessage {
  target: string;
  action: string;
  value?: any;
}

const Wrapper = styled.div`
  background-color: #d5d5d5;
  padding: 20px;
  margin: 20px;
`;

const observable = new Observable("mfe-observable");

const App = () => {
  const [count, setCount] = useState(0);
  const [app1Count, setApp1Count] = useState(0);
  const [messageFromContainer, setMessageFromContainer] = useState<
    string | null
  >(null);

  const handleObservableMessage = (
    message: ObservableMessage,
    app1Count: number
  ) => {
    if (message.target !== "app2") return;

    switch (message.action) {
      case "increment":
        setApp1Count(app1Count + 1);
        break;
      case "container_message":
        setMessageFromContainer(message.value);
    }
  };
  useEffect(() => {
    observable.subscribe((e) => handleObservableMessage(e, app1Count));

    return () => {
      observable.unsubscribe((e) => handleObservableMessage(e, app1Count));
    };
  }, [app1Count]);

  const incrementCount = () => {
    setCount(count + 1);
    observable.publish({ action: "increment", target: "app1" });
  };

  return (
    <Wrapper>
      This is the 'app 2' microfrontend.
      <button onClick={() => incrementCount()}>
        You've clicked this button {count} time{count === 1 ? "" : "s"}.
      </button>
      <p>
        App 1 has been clicked {app1Count} time{app1Count === 1 ? "" : "s"}.
      </p>
      {messageFromContainer && (
        <p>
          Message from Container: <em>{messageFromContainer}</em>
        </p>
      )}
      <MyComponent color="red" text="Hello from App 2" />
      <MyCard
        title="App 2 Card"
        body="App 2 Stuff!"
        action={() => alert("clicked in app 2!")}
        buttonVariant="contained"
      />
    </Wrapper>
  );
};

export default App;
