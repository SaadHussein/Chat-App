export default function useAuthHook() {
    const token = localStorage.getItem("token");
    return {
        isLoggedIn: token ? true : false
    };
}