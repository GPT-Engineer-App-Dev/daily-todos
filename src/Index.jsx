import React, { useState } from 'react';
import { ChakraProvider, Box, Heading, Input, Button, VStack, HStack, IconButton, Text } from '@chakra-ui/react';
import { FaEdit, FaTrash } from 'react-icons/fa';

const TodoApp = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [editingIndex, setEditingIndex] = useState(null);
  const [editingText, setEditingText] = useState('');

  const addTask = () => {
    if (newTask.trim() !== '') {
      setTasks([...tasks, newTask]);
      setNewTask('');
    }
  };

  const deleteTask = (index) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
  };

  const startEditing = (index) => {
    setEditingIndex(index);
    setEditingText(tasks[index]);
  };

  const saveTask = (index) => {
    const updatedTasks = tasks.map((task, i) => (i === index ? editingText : task));
    setTasks(updatedTasks);
    setEditingIndex(null);
    setEditingText('');
  };

  return (
    <ChakraProvider>
      <Box p={4} maxW="md" mx="auto">
        <Heading mb={4}>Todo App</Heading>
        <HStack mb={4}>
          <Input
            placeholder="Add a new task"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
          />
          <Button onClick={addTask} colorScheme="teal">Add</Button>
        </HStack>
        <VStack spacing={4} align="stretch">
          {tasks.map((task, index) => (
            <HStack key={index} spacing={4}>
              {editingIndex === index ? (
                <>
                  <Input
                    value={editingText}
                    onChange={(e) => setEditingText(e.target.value)}
                  />
                  <Button onClick={() => saveTask(index)} colorScheme="teal">Save</Button>
                </>
              ) : (
                <>
                  <Text flex={1}>{task}</Text>
                  <IconButton
                    icon={<FaEdit />}
                    onClick={() => startEditing(index)}
                    colorScheme="blue"
                  />
                  <IconButton
                    icon={<FaTrash />}
                    onClick={() => deleteTask(index)}
                    colorScheme="red"
                  />
                </>
              )}
            </HStack>
          ))}
        </VStack>
      </Box>
    </ChakraProvider>
  );
};

export default TodoApp;