import Head from "next/head";
import useSWR, { mutate } from "swr";
import useInterval from "use-interval";
import SongService from "@services/SongService";
import PlaylistService from "@services/PlaylistService";
import Header from "@components/header";
import PlaylistOverview from "@components/playlists/PlaylistOverview";

const Songs: React.FC = () => {
    
    const getPlaylistsAndSongs = async () => {
        const responses = await Promise.all([
            PlaylistService.getAllPlaylists(),
            SongService.getAllSongs()
        ])

        const [playlistsResponse, songsResponse] = responses;

        if (playlistsResponse.ok && songsResponse.ok) {
            const playlists = await playlistsResponse.json()
            const songs = await songsResponse.json()
            return {playlists, songs}
        }
    }

    const { data, isLoading, error } = useSWR(
        "playlistsAndSongs",
        getPlaylistsAndSongs
    )

    useInterval(() => {
        mutate("playlistsAndSongs", getPlaylistsAndSongs())
    }, 2000)


    return (
        <>
            <Head>
                <title>Playlists</title>
            </Head>
            <Header />
            <main className="container mx-auto px-6 py-8 text-center flex flex-col items-center">
                <h1 className="text-3xl font-bold text-blue-800 mb-6">Playlists</h1>
                <>
                    {error && <div className="text-red-800">{error}</div>}
                    {isLoading && <p className="text-green-800">Loading...</p>}
                    {data && (
                        <PlaylistOverview
                            playlists={data.playlists}
                            songs={data.songs}
                        />
                    )}
                </>
            </main>
        </>
    );
};

export default Songs;