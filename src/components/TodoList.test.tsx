import '@testing-library/jest-dom';
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { TodoList } from "./TodoList";

describe("TodoList", () => {
  test("renders empty", () => {
    render(<TodoList />);
    expect(screen.getByText("Todo List")).toBeInTheDocument();
  });

  test("adds todo", async () => {
    const user = userEvent.setup();
    render(<TodoList />);

    const input = screen.getByTestId("todo-input");
    const button = screen.getByTestId("add-button");

    await user.type(input, "Test todo");
    await user.click(button);

    expect(screen.getByText("Test todo")).toBeInTheDocument();
  });

  test("toggles todo", async () => {
    const user = userEvent.setup();
    render(<TodoList />);

    const input = screen.getByTestId("todo-input");
    const addButton = screen.getByTestId("add-button");

    await user.type(input, "Test");
    await user.click(addButton);

    const checkbox = screen.getByTestId("todo-checkbox");
    await user.click(checkbox);

    expect(screen.getByTestId("todo-item")).toHaveClass("completed");
  });

  test("deletes todo", async () => {
    const user = userEvent.setup();
    render(<TodoList />);

    const input = screen.getByTestId("todo-input");
    const addButton = screen.getByTestId("add-button");

    await user.type(input, "Delete me");
    await user.click(addButton);

    const deleteButton = screen.getByTestId("delete-button");
    await user.click(deleteButton);

    expect(screen.queryByText("Delete me")).not.toBeInTheDocument();
  });
});