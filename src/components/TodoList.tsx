import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCirclePlus,
  faThumbTack,
  faTrashCan,
} from "@fortawesome/free-solid-svg-icons";
import Checkbox from "@mui/material/Checkbox";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd"; // this was "react-beautiful-dnd" at first but since the library is no longer maintained i used this forked edited one with up-to-date dependencies.
import useFetchTodo from "@/Custom Hooks/useFetchTodo";
import { triggerRefetch } from "@/features/RefetchTodos";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import useAuth from "@/Custom Hooks/useAuth";
import {
  closeShowSignInMsg,
  openShowSignInMsg,
} from "@/features/ShowSignInMsg";
import UncheckedTodo from "./UncheckedTodo";

export default function TodoList() {
  const isSidebarOpen = useSelector((state) => state.CloseSidebar.value);

  const dispatch = useDispatch();
  const { user } = useAuth();
  const refetchTodos = useSelector((state) => state.RefetchTodos.value);
  const { addTodo, deleteTodo, editTodo, todos } = useFetchTodo();
  // this works when the dragging ends
  const onDragEnd = (result) => {
    if (!result.destination) {
      return;
    }

    const reorderedItems = Array.from(todos);
    const [movedItem] = reorderedItems.splice(result.source.index, 1);
    reorderedItems.splice(result.destination.index, 0, movedItem);
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
  };

  const [newTodoTitle, setNewTodoTitle] = useState("");

  const addNewTodoItem = async () => {
    if (!user) {
      dispatch(openShowSignInMsg(true));
      setTimeout(() => {
        dispatch(closeShowSignInMsg());
      }, 2000);
      return;
    }
    if (newTodoTitle.trim() === "") {
      return;
    }
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
  const deleteTodoItem = async (todoItemId) => {
    deleteTodo(todoItemId);
    dispatch(triggerRefetch(!refetchTodos));
  };
  const pinTodoItem = async (item) => {
    const newItem = {
      ...item,
      pinned: !item.pinned,
    };
    await editTodo(newItem, item.id);
    dispatch(triggerRefetch(!refetchTodos));
  };

  const changeTaskToDone = async (item) => {
    const newItem = {
      ...item,
      done: !item.done,
    };
    await editTodo(newItem, item.id);
    dispatch(triggerRefetch(!refetchTodos));
  };

  return (
    <div className={`todo-page ${isSidebarOpen ? "open" : ""} `}>
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
      {todos.some((item) => !item.done) && <h1>Let's get some tasks done.</h1>}
      <UncheckedTodo />
      {todos.length > 0 &&
        (todos.every((item) => item.done) ? (
          <h1>All done, you can rest now.</h1>
        ) : todos.some((item) => item.done) ? (
          <h1>Keep going you're getting there.</h1>
        ) : todos.some((item) => !item.done) ? null : null)}

      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="checked-todo">
          {(provided) => (
            <div
              className="checked-todo"
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {todos.map((item, index) =>
                item.done ? (
                  <Draggable key={item.id} draggableId={item.id} index={index}>
                    {(provided, snapshot) => (
                      <div
                        className="todo-item"
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        ref={provided.innerRef}
                        style={{
                          ...provided.draggableProps.style,
                          // Add your custom styling for the dragged item here
                          backgroundColor: snapshot.isDragging
                            ? "hsl(0,0%,20%)"
                            : ``,
                          // You can adjust other styles based on the snapshot (dragging state)
                        }}
                      >
                        <Checkbox
                          checked={item.done}
                          onChange={() => changeTaskToDone(item)}
                          sx={{
                            color: "#FF4200",
                            "&.Mui-checked": {
                              color: "#FF4200",
                            },
                          }}
                        />
                        <h3
                          style={{
                            textDecoration: "line-through",
                            textDecorationThickness: "2px",
                          }}
                        >
                          {item.title}
                        </h3>

                        <div
                          className="todo-item-toolbox"
                          style={{ width: `45px` }}
                        >
                          <FontAwesomeIcon
                            icon={faTrashCan}
                            onClick={() => deleteTodoItem(item.id)}
                          />
                          <FontAwesomeIcon
                            icon={faThumbTack}
                            onClick={() => pinTodoItem(item)}
                            style={{ color: item.pinned ? "#FF4200" : "" }}
                          />
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
    </div>
  );
}
