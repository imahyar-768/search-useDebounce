import { useState, useEffect } from 'react';
import axios from 'axios';
import Skeleton from 'react-loading-skeleton';
import 'tailwindcss/tailwind.css';
import {useDebounce} from "./useDebounce.ts";

interface User {
    id: number;
    name: string;
    email: string;
    username: string;
    phone: string;
}

function App() {
    const [data, setData] = useState<User[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [isLoading, setIsLoading] = useState(true);

    const debouncedSearchTerm = useDebounce({value: searchTerm, delay: 300});

    useEffect(() => {
        const fetchUsers = async (): Promise<void> => {
            try {
                const response = await axios.get(
                    'https://jsonplaceholder.typicode.com/users'
                );
                setData(response?.data);
                setIsLoading(false);
            } catch (error) {
                console.log(error);
            }
        };
        fetchUsers();
    }, []);

    const filteredData = data.filter((item) =>
        item.name.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
    ) as User[];

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-200">
            <header className="w-full max-w-2xl px-4 py-6 mx-auto md:max-w-3xl">
                <input
                    type="text"
                    placeholder="Search..."
                    className="block w-full px-4 py-2 mt-4 leading-tight border border-gray-400 rounded shadow appearance-none focus:outline-none focus:shadow-outline sm:text-lg"
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </header>
            <main className="w-full max-w-2xl px-4 py-6 mx-auto md:max-w-3xl">
                {isLoading ? (
                    <div className="space-y-4">
                        <Skeleton height={140} count={5} style={{marginBottom: '16px'}} />
                    </div>
                ) : (
                    <div className="space-y-4">
                        {filteredData.map((item) => (
                            <div
                                key={item?.id}
                                className="bg-white rounded shadow overflow-hidden"
                            >
                                <div className="p-4">
                                    <h2 className="text-lg font-medium text-gray-800">
                                        {item?.name}
                                    </h2>
                                    <p className="text-gray-600">{item?.email}</p>
                                    <p className="text-gray-600">{item?.username}</p>
                                    <p className="text-gray-600">{item?.phone}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </main>
        </div>
    );
}

export default App;
