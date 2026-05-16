import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
    name: "user",
    initialState: {
        value: localStorage.getItem('currentUserInfoFiredChat') ?
            JSON.parse(localStorage.getItem('currentUserInfoFiredChat'))
            :
            {
                userName: "",
                email: "",
                currentRoom: "",
                rooms: []
            }
    },
    reducers: {
        setUser: (state, action) => {
            state.value = action.payload;
            localStorage.setItem('currentUserInfoFiredChat', JSON.stringify(action.payload));
        },
        clearUser: (state) => {
            state.value = {
                userName: "",
                email: "",
                currentRoom: "",
                rooms: []
            };
            localStorage.removeItem('currentUserInfoFiredChat');
        },
        updateUserRooms: (state, action) => {
            state.value.rooms.push(action.payload);
            localStorage.setItem('currentUserInfoFiredChat', JSON.stringify(state.value));            
        }
    }
})



export const { setUser, clearUser, updateUserRooms } = userSlice.actions;

export default userSlice.reducer;
