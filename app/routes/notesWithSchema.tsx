// notesWithSchema.tsx

import { LoaderFunction, redirect } from "@remix-run/node";
import pool from "~/notesWithSchema/db";
import {
  Box,
  Button,
  Card,
  Editable,
  EditableInput,
  EditablePreview,
  EditableTextarea,
  Flex,
  HStack,
  Input,
  Modal,
  ModalContent,
  ModalOverlay,
  Text,
  Textarea,
  VStack,
  useDisclosure,
} from "@chakra-ui/react";
import { Form, useLoaderData } from "@remix-run/react";
// import moment from "moment";
import {
  ButtonStyles,
  Colors,
  inputFieldStyles,
  scrollBarStyles,
} from "~/style";
import { format } from "date-fns";

export let loader: LoaderFunction = async () => {
  const client = await pool.connect();
  const result = await client.query("SELECT * FROM notes");
  client.release();
  return result.rows;
};

export let action: LoaderFunction = async ({ request }) => {
  const formData = new URLSearchParams(await request.text());
  const title = formData.get("title");
  const content = formData.get("content");
  const id = formData.get("id");
  const method = formData.get("_method");

  const client = await pool.connect();

  try {
    if (method === "delete") {
      const result = await client.query("DELETE FROM notes WHERE id=$1", [id]);
      if (result.rowCount === 0) {
        throw new Error(`No note found with id: ${id}`);
      }
    } else if (method === "update") {
      const result = await client.query(
        "UPDATE notes SET title=$1, content=$2 WHERE id=$3",
        [title, content, id]
      );
      console.log("Update Result:", result); // Add this line for debugging
      if (result.rowCount === 0) {
        throw new Error(`No note found with id: ${id}`);
      }
    } else {
      const created_at = new Date().toISOString();
      console.log(created_at);
      await client.query(
        "INSERT INTO notes(title, content, created_at) VALUES($1, $2, $3)",
        [title, content, created_at]
      );
    }
  } catch (error) {
    console.error("Error:", error);
    client.release();
    return new Response("An error occurred", { status: 500 });
  } finally {
    client.release();
  }

  return redirect("/notesWithSchema");
};

interface Note {
  id: number;
  title: string;
  content: string;
  created_at: Date;
}

export default function Notes() {
  const notes = useLoaderData();
  const { isOpen, onOpen, onClose } = useDisclosure();

  function handleDelete(id: number) {
    fetch("/notesWithSchema", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        _method: "delete",
        id: id.toString(),
      }),
    }).then((response) => {
      response.text().then((text) => {
        if (response.ok) {
          window.location.reload();
        } else {
          console.error(text);
          alert("There was an error in deleting the note.");
        }
      });
    });
  }

  function handleEdit(id: number, newTitle: string, newContent: string) {
    fetch("/notesWithSchema", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        _method: "update",
        id: id.toString(),
        title: newTitle,
        content: newContent,
      }),
    }).then((response) => {
      if (response.ok) {
        // handle successful update
      } else {
        // handle error
      }
    });
  }

  return (
    <>
      <VStack
        w="98%"
        maxW="1390px"
        h="90vh"
        overflowY="auto"
        bg={Colors.myLight}
        p={5}
        shadow="dark-lg"
        spacing={5}
        color={Colors.myBlue}
        border="3px solid"
      >
        <Flex>
          <Button
            {...ButtonStyles}
            onClick={onOpen}
            w="200px"
            fontSize="1.1rem"
          >
            Add a New Note
          </Button>
        </Flex>

        <VStack w="100%" color={Colors.myLight} align="center" justify="center">
          <Box
            py={4}
            px={6}
            w="fit-content"
            mx="auto"
            bg="gray.700"
            overflowWrap="break-word"
            sx={{ columnCount: [1, 1, 2, 2, 2, 3], columnGap: "8px" }}
          >
            {notes.map((note: Note) => (
              <Card
                key={note.id}
                bg={Colors.myGreen}
                w="375px"
                h="fit-content"
                p={2}
                mb={3}
                mx={2}
                shadow="rgba(0, 0, 0, 0.4) 0px 2px 4px, rgba(0, 0, 0, 0.3) 0px 7px 13px -3px, rgba(0, 0, 0, 0.2) 0px -3px 0px inset;"
                sx={{
                  breakInside: "avoid",
                  WebkitColumnBreakInside: "avoid",
                }}
              >
                <VStack w="100%" spacing={4}>
                  <VStack w="100%" spacing={0} align="flex-start">
                    <Editable
                      defaultValue={note.title}
                      onChange={(newTitle) =>
                        handleEdit(note.id, newTitle, note.content)
                      }
                    >
                      <EditablePreview />
                      <EditableInput />
                    </Editable>
                    <Text fontSize="0.9rem">
                      {format(
                        new Date(note.created_at),
                        "MM/dd/yyyy '@'hh:mm a"
                      )}
                    </Text>
                  </VStack>
                  <Box
                    w="100%"
                    bg={Colors.myMedium}
                    color={Colors.myLight}
                    p={1}
                    shadow="2px 2px 2px rgba(0,0,0,0.5)"
                    maxH="250px"
                    overflowY="auto"
                    sx={scrollBarStyles}
                  >
                    <Editable
                      defaultValue={note.content}
                      onChange={(newContent) =>
                        handleEdit(note.id, note.title, newContent)
                      }
                    >
                      <EditablePreview
                        h="fit-content"
                        maxH="250px"
                        fontSize="0.95rem"
                      />
                      <EditableTextarea
                        h="fit-content"
                        maxH="250px"
                        fontSize="0.95rem"
                      />
                    </Editable>
                  </Box>
                  <HStack w="100%" justify="center">
                    <Button size="sm" {...ButtonStyles} fontSize="1rem">
                      Edit
                    </Button>
                    <Button
                      size="sm"
                      {...ButtonStyles}
                      fontSize="1rem"
                      onClick={() => handleDelete(note.id)}
                    >
                      Delete
                    </Button>
                  </HStack>
                </VStack>
              </Card>
            ))}
          </Box>
        </VStack>
      </VStack>
      <Modal isOpen={isOpen} onClose={onClose} size="lg">
        <ModalOverlay bg="rbga(0, 0, 10, 0.5)" />
        <ModalContent>
          {" "}
          <Form method="post">
            <VStack
              w="100%"
              bg={Colors.myMedium}
              color={Colors.myLight}
              p={2}
              shadow="rgba(0, 0, 0, 0.4) 0px 2px 4px, rgba(0, 0, 0, 0.3) 0px 7px 13px -3px, rgba(0, 0, 0, 0.2) 0px -3px 0px inset;"
            >
              <Text size="xl" fontWeight="600">
                New Note
              </Text>
              <Input
                type="text"
                name="title"
                placeholder="Title"
                {...inputFieldStyles}
                size="md"
                w="350px"
              />
              <Textarea
                name="content"
                placeholder="Content"
                {...inputFieldStyles}
                size="md"
                w="350px"
                h="250px"
                resize="none"
              />

              <Button
                type="submit"
                size="sm"
                {...ButtonStyles}
                onClick={onClose}
              >
                Add Note
              </Button>
            </VStack>
          </Form>
        </ModalContent>
      </Modal>
    </>
  );
}
