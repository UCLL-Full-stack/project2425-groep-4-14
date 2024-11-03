import React, { useState, useEffect } from "react";
import { Song } from "types";
import playlistService from "@services/playlistService";

type Props = {
    songs: Array<Song>;
};

const SongsOverview: React.FC<Props> = ({ songs }: Props) => {
    const [visibleCount, setVisibleCount] = useState(10);
    const [playlists, setPlaylists] = useState<Array<{ id: number; name: string }>>([]);
    const [isPopupVisible, setPopupVisible] = useState<number | null>(null);

    useEffect(() => {
        const fetchPlaylists = async () => {
            const response = await playlistService.getAllPlaylists();
            const playlistsData = await response.json();
            setPlaylists(playlistsData);
        };

        fetchPlaylists();
    }, []);

    const loadMoreSongs = () => {
        setVisibleCount((prevCount: number) => prevCount + 10);
    };

    const handleAddSongToPlaylist = async (songId: number, playlistId: number) => {
        await playlistService.addSongToPlaylist(songId, playlistId);
        setPopupVisible(null); 
        console.log(`Song ${songId} added to playlist ${playlistId}`);
    };

    const togglePopup = (index: number) => {
        setPopupVisible(prevIndex => (prevIndex === index ? null : index));
    };

    return (
        <>
            {songs && (
                <div className="overflow-x-auto">
                    <table className="min-w-full border border-gray-200">
                        <thead className="bg-gray-100">
                            <tr>
                                <th>Cover</th>
                                <th className="px-4 py-2 text-gray-600 text-center">Name</th>
                                <th className="px-4 py-2 text-gray-600">Genre</th>
                                <th className="px-4 py-2 text-gray-600"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {songs.slice(0, visibleCount).map((song, index) => (
                                <tr key={song.id} className={`hover:bg-gray-100 ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}>
                                    <td className="px-4 py-2 border-b border-gray-200 text-left">img</td>
                                    <td className="px-4 py-2 border-b border-gray-200 text-left">{song.title}</td>
                                    <td className="px-4 py-2 border-b border-gray-200 text-left">{song.genre}</td>
                                    <td className="px-4 py-2 border-b border-gray-200 text-left">
                                        {playlists.length > 0 ? (
                                            <>
                                                <button onClick={() => togglePopup(index)} className="text-blue-600">Add song to playlist</button>
                                                {isPopupVisible === index && (
                                                    <div className="absolute mt-2 w-48 bg-white shadow-md rounded-md border border-gray-200 z-10">
                                                        <ul>
                                                            {playlists.map(playlist => (
                                                                <li
                                                                    key={playlist.id}
                                                                    onClick={() => song.id && handleAddSongToPlaylist(song.id, playlist.id)}
                                                                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                                                                >
                                                                    {playlist.name}
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    </div>
                                                )}
                                            </>
                                        ) : (
                                            <span className="text-gray-500">Make a playlist to add the song</span>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    {visibleCount < songs.length && (
                        <div className="mt-4 text-center">
                            <button
                                onClick={loadMoreSongs}
                                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 focus:outline-none"
                            >
                                View More
                            </button>
                        </div>
                    )}
                </div>
            )}
        </>
    );
};

export default SongsOverview;

