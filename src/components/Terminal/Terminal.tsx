import { ChangeEvent, KeyboardEvent, useState } from "react";

const prompts = {
  help: `SubTerm OS v 1.0\n\nAvailable Commands:\n
help      - provides a list of available commands
ls        - show file system
  `,
};

export const Terminal = () => {
  const defaultTerminalPrompt = "SubTerm 1.0";

  interface FileSystemFiles {
    [key: string]: string;
  }

  interface FileSystemFunctions {
    [key: string]: {
      function: () => void;
    };
  }

  interface FileSystemFolder {
    [key: string]: {
      folderName: string;
      files?: FileSystemFiles[];
      functions?: FileSystemFunctions[];
      children?: FileSystemFolder[];
    };
  }

  type FileSystem = FileSystemFolder[];

  // ship systems functions
  const showShipStatus = () => {
    console.log("status");
  };

  // probably should use this instead of fileTree
  const typedFileTree: FileSystem = [
    {
      root: {
        folderName: "root",
        children: [
          {
            logs: {
              folderName: "logs",
              files: [{ errorLog: "error: ship sinking" }],
            },
            systems: {
              folderName: "systems",
              functions: [
                {
                  status: {
                    function: showShipStatus,
                  },
                },
                {
                  enablePower: {
                    function: () => {},
                  },
                },
                {
                  disablePower: {
                    function: () => {},
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ];

  const fileTree = {
    root: {
      folderName: "root",
      children: {
        logs: {
          folderName: "logs",
          files: [{ errorLog: "error: ship sinking" }],
        },
        systems: {
          folderName: "systems",
          functions: [
            {
              status: {
                function: showShipStatus,
              },
            },
            {
              enablePower: {
                function: () => {},
              },
            },
            {
              disablePower: {
                function: () => {},
              },
            },
          ],
        },
      },
    },
  };

  // state stuff
  const [userInput, setUserInput] = useState("");
  const [terminalPrompt, setTerminalPrompt] = useState(defaultTerminalPrompt);
  const [error, setError] = useState("");
  const [currentFileSystemLocation, setCurrentFileSystemLocation] = useState(
    fileTree.root
  );

  const showFileSystem = () => {
    let promptString = `${currentFileSystemLocation.folderName}`;
    console.log("keys", Object.keys(currentFileSystemLocation.children));
    promptString += Object.keys(currentFileSystemLocation.children)
      .map((childFolderName) => `\n  - ${childFolderName}`)
      .join(" ");
    return promptString;
  };

  const enterFolder = (targetFolder: string) => {
    const availableFolders = Object.keys(currentFileSystemLocation.children);
    if (availableFolders.includes(targetFolder)) {
      // setting the file system to match the object above is kinda hard...may need more better typing
    } else {
      setError(`Folder ${targetFolder} not found`);
    }
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
