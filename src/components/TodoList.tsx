import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCirclePlus,
  faThumbTack,
  faPen,
  faTrashCan,
} from "@fortawesome/free-solid-svg-icons";
import Checkbox from "@mui/material/Checkbox";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd"; // this was "react-beautiful-dnd" at first but since the library is no longer maintained i used this forked edited one with up-to-date dependencies.
import useFetchTodo from "@/Custom Hooks/useFetchTodo";
import { triggerRefetch } from "@/features/RefetchTodos";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

export default function TodoList() {
  const dispatch = useDispatch();
  const refetchTodos = useSelector((state) => state.RefetchTodos.value);
  const { addTodo, deleteTodo, editTodo, todos } = useFetchTodo();

  const onDragEnd = (result) => {
    if (!result.destination) {
      return;
    }

    const reorderedItems = Array.from(todos);
    const [movedItem] = reorderedItems.splice(result.source.index, 1);
    reorderedItems.splice(result.destination.index, 0, movedItem);
    console.log(todos);
    // Update the order field based on the new index
    const updatedOrder = reorderedItems.map((item, index) => ({
      ...item,
      order: index + 1, // Assuming order starts from 1
    }));

    // Update each item in Firestore
    updatedOrder.forEach((item) => {
      const { id, ...rest } = item;
      editTodo(rest, id);
    });
    dispatch(triggerRefetch(!refetchTodos));
    console.log(updatedOrder);
  };

  const [newTodoTitle, setNewTodoTitle] = useState("");

  const addNewTodoItem = async () => {
    const newTodoData = {
      title: newTodoTitle,
      done: false,
      pinned: false,
      order: todos.length + 1,
      timestamp: new Date(),
    };
    await addTodo(newTodoData);
    dispatch(triggerRefetch(!refetchTodos));
    setNewTodoTitle("");
  };
  const deleteTodoItem = (todoItemId) => {
    deleteTodo(todoItemId);
    dispatch(triggerRefetch(!refetchTodos));
  };
  const pinTodoItem = (item) => {
    const newItem = {
      ...item,
      pinned: true,
    };
    editTodo(newItem, item.id);
    dispatch(triggerRefetch(!refetchTodos));
    console.log(todos);
  };

  return (
    <div className="todo-page">
      <h1>To-Do List</h1>
      <h1>What's on your agenda ?</h1>
      <div className="todo-input">
        <input
          type="text"
          placeholder="Add New Task"
          onChange={(e) => setNewTodoTitle(e.target.value)}
          value={newTodoTitle}
        />
        <button onClick={addNewTodoItem}>
          Add <FontAwesomeIcon icon={faCirclePlus} />
        </button>
      </div>
      <h1>Let's get some tasks done.</h1>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="unchecked-todo">
          {(provided) => (
            <div
              className="unchecked-todo"
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {todos.map((item, index) =>
                !item.done ? (
                  <Draggable key={item.id} draggableId={item.id} index={index}>
                    {(provided) => (
                      <div
                        className="todo-item"
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        ref={provided.innerRef}
                      >
                        <Checkbox
                          sx={{
                            color: "#FF4200",
                            "&.Mui-checked": {
                              color: "#FF4200",
                            },
                          }}
                        />
                        <h3>{item.title}</h3>

                        <div className="todo-item-toolbox">
                          <FontAwesomeIcon
                            icon={faTrashCan}
                            onClick={() => deleteTodoItem(item.id)}
                          />
                          <FontAwesomeIcon
                            icon={faThumbTack}
                            onClick={() => pinTodoItem(item)}
                            style={{ color: item.pinned ? "#FF4200" : "" }}
                          />
                          <FontAwesomeIcon icon={faPen} />
                        </div>
                      </div>
                    )}
                  </Draggable>
                ) : null
              )}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
      <h1>Keep going you're getting there.</h1>
    </div>
  );
}
