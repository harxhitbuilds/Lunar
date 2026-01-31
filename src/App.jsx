import { Loader } from "lucide-react";

import { useEffect } from "react";
import { Route, Routes } from "react-router-dom";

import MainLayout from "./layouts/Layout";
import AdminPage from "./pages/admin/AdminPage";
import AlbumPage from "./pages/album/AlbumPage";
import Albums from "./pages/albums/Albums";
import HomePage from "./pages/home/HomePage";
import PlaylistPage from "./pages/playlist/PlaylistPage";
import Playlist from "./pages/playlists/Playlists";
import Profile from "./pages/profile/ProfilePage";
import Search from "./pages/search/Search";
import useAuthStore from "./stores/useAuthStore";

const App = () => {
  const { checkAuth, checkingAuth } = useAuthStore();
  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (checkingAuth) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <Loader className="animate-spin text-white" />
      </div>
    );
  }

  return (
    <>
      <Routes>
        <Route path="/admin" element={<AdminPage />} />
        <Route element={<MainLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/albums/:id" element={<AlbumPage />} />
          <Route path="/search" element={<Search />} />
          <Route path="/albums" element={<Albums />} />
          <Route path="/playlists" element={<Playlist />} />
          <Route path="/playlist/:id" element={<PlaylistPage />} />
          <Route path="/profile" element={<Profile />} />
        </Route>
      </Routes>
    </>
  );
};
export default App;
