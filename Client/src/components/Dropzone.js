// Chakra imports
import { Button, Flex, Input, useColorModeValue, Text } from "@chakra-ui/react";
// Assets
import React, { useState } from "react";
import { useDropzone } from "react-dropzone";

function Dropzone(props) {
  const { content, img, onFileSelect, accept, maxSize = 10485760, ...rest } = props; // maxSize default 10MB
  const [fileError, setFileError] = useState(null); // To display errors related to file size/type

  // Configure the dropzone
  const { getRootProps, getInputProps } = useDropzone({
    multiple: true, // Set to false if you only want to allow selecting one file
    accept: img === "img" ? "image/*" : accept, // Only accept image if img is set to "img"
    maxSize, // Limit file size
    onDrop: (acceptedFiles, rejectedFiles) => {
      if (rejectedFiles.length > 0) {
        // Handle rejected files due to size/type restrictions
        setFileError("File too large or invalid file type");
      } else {
        setFileError(null); // Clear any previous errors
        if (acceptedFiles.length > 0) {
          onFileSelect(acceptedFiles);  // Call the passed onFileSelect handler
        }
      }
    },
  });

  // Use Chakra's color mode values for styling
  const bg = useColorModeValue("gray.100", "navy.700");
  const borderColor = useColorModeValue("secondaryGray.100", "whiteAlpha.100");
  const hoverColor = useColorModeValue("gray.200", "navy.600");

  return (
    <>
      <Flex
        align="center"
        justify="center"
        bg={bg}
        border="1px dashed"
        borderColor={borderColor}
        borderRadius="16px"
        w="100%"
        h="max-content"
        minH="100%"
        cursor="pointer"
        _hover={{ bg: hoverColor }} // Change background on hover
        _focusWithin={{ borderColor: "blue.500" }} // Change border color on focus
        {...getRootProps({ className: "dropzone" })}
        {...rest}
      >
        {/* Hidden input element to trigger file selection */}
        <Input type="file" variant="main" multiple {...getInputProps()} />

        {/* The button that shows the content, e.g., "Upload file" */}
        <Button variant="no-effects">{content}</Button>
      </Flex>

      {/* Display file size/type errors */}
      {fileError && (
        <Text color="red.500" fontSize="sm" mt={2}>
          {fileError}
        </Text>
      )}
    </>
  );
}

export default Dropzone;
