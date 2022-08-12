import { useState } from "react";
import { Group, Stack, Text, Button, Textarea } from "@mantine/core";
import { CopyToClipboard } from "react-copy-to-clipboard";
const sleeboard = require("../public/sleeboard.js");

interface ExtractResult {
  chars: string;
  result: string;
}

interface CopiedType {
  copied: boolean;
  text: string;
}

const Convert = () => {
  const [text, setText] = useState("");
  const [sleeboardResult, setSleeboardResult] = useState<ExtractResult[]>();
  const [copied, setCopied] = useState<CopiedType>();

  //   const handleExtract = () => {
  //     let response: ExtractResult[] = sleeboard?.getAmharic(text);
  //     setSleeboardResult(response);
  //   };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
    if (e.target.value.length > 0) {
      let response: ExtractResult[] = sleeboard?.getAmharic(e.target.value);
      setSleeboardResult(response);
    } else {
      setSleeboardResult([]);
    }
  };

  const handleClear = () => {
    setText("");
    setSleeboardResult([]);
    setCopied({ copied: false, text: "" });
  };

  return (
    <>
      <Group align="initial" style={{ padding: "10px" }}>
        <Stack style={{ flex: "1" }}>
          <Textarea value={text} onChange={handleChange} minLength={1} />
        </Stack>

        <Stack style={{ flex: "1" }}>
          <Group grow>
            {/* <Button disabled={text === ""} onClick={handleExtract}>
              Extract
            </Button> */}
            <Button onClick={handleClear}>Clear</Button>
          </Group>

          {!!sleeboardResult && (
            <Stack>
              <Text size="xl">RESULT</Text>
              {sleeboardResult.map((item) => (
                <Group key={item?.result + item.chars} grow>
                  <Text
                    style={{
                      fontFamily: "monospace",
                      background: "black",
                      padding: "5px",
                    }}
                  >
                    {item?.result}
                  </Text>
                  <CopyToClipboard
                    text={item?.result}
                    onCopy={() =>
                      setCopied({ copied: true, text: item?.result })
                    }
                  >
                    <Button>Copy to clipboard</Button>
                  </CopyToClipboard>

                  {copied && item.result === copied?.text ? (
                    <span style={{ color: "blue" }}>Copied.</span>
                  ) : null}
                </Group>
              ))}
            </Stack>
          )}
        </Stack>
      </Group>
    </>
  );
};

export default Convert;
