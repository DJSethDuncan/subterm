import { ChangeEvent, KeyboardEvent, useState } from "react";

const prompts = {
  help: `SubTerm OS v 1.0\n\nAvailable Commands:\n
help      - provides a list of available commands
ls        - show file system
  `,
};

export const Terminal = () => {
  const defaultTerminalPrompt = "SubTerm 1.0";

  // ship systems functions
  const showShipStatus = () => {
    console.log("status");
  };

  interface Folder {
    folderName: String;
    children?: String[];
    files?: File[];
    functions?: Function[];
    parent?: String;
  }

  interface File {
    fileName: String;
    fileContents: String;
  }

  interface Function {
    functionName: String;
    functionCommand: () => void;
  }

  const rootFolder: Folder = {
    folderName: "root",
    children: ["logs", "systems"],
  };

  const folderTree: Folder[] = [
    rootFolder,
    {
      folderName: "logs",
      files: [{ fileName: "errorLog", fileContents: "many errors" }],
      parent: "root",
    },
    {
      folderName: "systems",
      parent: "root",
      functions: [
        {
          functionName: "status",
          functionCommand: showShipStatus,
        },
        {
          functionName: "enablePower",
          functionCommand: () => {},
        },
        {
          functionName: "disablePower",
          functionCommand: () => {},
        },
      ],
    },
  ];

  // state stuff
  const [userInput, setUserInput] = useState("");
  const [terminalPrompt, setTerminalPrompt] = useState(defaultTerminalPrompt);
  const [error, setError] = useState("");
  const [currentFileSystemLocation, setCurrentFileSystemLocation] =
    useState<Folder>(rootFolder);

  console.log("currentFileSystemLocation", currentFileSystemLocation);

  const showFileSystem = () => {
    console.log("showFileSystem");
  };

  const enterFolder = () => {
    console.log("enterFolder");
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setUserInput(event.currentTarget.value);
  };

  const parseCommand = (command: string) => {
    const commandArray = command.split(" ");
    return {
      operator: commandArray[0],
      target: command.slice(commandArray[0].length).trim(), // cut out the first word and the first space
    };
  };

  const processUserInput = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      setError("");
      const command = parseCommand(userInput);
      switch (command.operator) {
        case "help":
          setTerminalPrompt(prompts.help);
          break;
        case "ls":
          setTerminalPrompt(showFileSystem());
          break;
        case "cd":
          enterFolder(command.target);
          break;
        case "exit":
          setTerminalPrompt(defaultTerminalPrompt);
          break;
        default:
          setTerminalPrompt("syntax error");
          break;
      }
      setUserInput("");
    }
  };

  return (
    <>
      <p style={{ width: "60%", whiteSpace: "pre-wrap", textAlign: "left" }}>
        {terminalPrompt}
      </p>
      <input
        type="text"
        value={userInput}
        onChange={handleChange}
        onKeyDown={processUserInput}
      />
      <p style={{ width: "40%", whiteSpace: "pre-wrap" }}>{error}</p>
    </>
  );
};
