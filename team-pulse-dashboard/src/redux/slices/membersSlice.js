    
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Fetch random team members
export const fetchMembers = createAsyncThunk(
  "members/fetchMembers",
  async () => {
    const res = await axios.get("https://randomuser.me/api/?results=20"); 
    return res.data.results.map((user) => ({
      id: user.login.uuid,
      name: `${user.name.first} ${user.name.last}`,
      email: user.email,
      avatar: user.picture.medium,
      status: "Offline",
      tasks: []
    }));
  }
);

const membersSlice = createSlice({
  name: "members",
  initialState: {
    list: [],
    loading: false,
    error: null
  },
  reducers: {
    updateStatus: (state, action) => {
      const { userId, status } = action.payload;
      const member = state.list.find((m) => m.id === userId);
      if (member) member.status = status;
    },

    assignTask: (state, action) => {
      const { userId, task } = action.payload;
      const member = state.list.find((m) => m.id === userId);
      if (member) {
        // Ensure task has a completed flag
        const taskToAdd = {
          ...task,
          completed: task.completed ?? false
        };
        member.tasks.push(taskToAdd);
      }
    },

    updateTaskProgress: (state, action) => {
      const { userId, taskId, progress } = action.payload;
      const member = state.list.find((m) => m.id === userId);
      if (member) {
        const task = member.tasks.find((t) => t.id === taskId);
        if (task) {
          task.progress = progress;
          // Mark completed when progress reaches 100
          if (progress >= 100) {
            task.progress = 100;
            task.completed = true;
          } else {
            task.completed = false;
          }
        }
      }
    }
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchMembers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMembers.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(fetchMembers.rejected, (state) => {
        state.loading = false;
        state.error = "Failed to fetch members";
      });
  }
});

export const { updateStatus, assignTask, updateTaskProgress } =
  membersSlice.actions;

export default membersSlice.reducer;
