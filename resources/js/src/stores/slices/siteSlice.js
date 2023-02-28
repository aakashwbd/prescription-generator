const siteSlice = (set, get) => ({
    toggleDialog: false,

    // setter
    setToggleDialog: (payload) => set((state) => ({toggleDialog: !state.toggleDialog})),
})
export default siteSlice
