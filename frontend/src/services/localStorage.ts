import createPersistedState from 'vuex-persistedstate'

const localStorage = createPersistedState({
    key: 'rolenpermission',
    paths: ['root.token', 'root.userDetail', 'root.userRole', 'root.profileImage'],
    storage: {
        getItem: key => window.localStorage.getItem(key),
        setItem: (key, state) => window.localStorage.setItem(key, state),
        removeItem: key => window.localStorage.removeItem(key)
    }
})

export default localStorage