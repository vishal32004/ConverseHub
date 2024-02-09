"use client"
import axios from "axios";
import { useEffect, useState } from "react";
import { Action } from "./Action";
import { Button } from "../ui/button";
import { ModeToggle } from "../mode-toggle";
import { Separator } from "@radix-ui/react-dropdown-menu";
import { ScrollArea } from "../ui/scroll-area";
import { Server } from "@prisma/client";
import { ServerNavigation } from "./ServerNavigation";

const Sidebar = () => {
    const [servers, setServers] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.post('/api/AllServers');
                const data = response.data;
                if (data.success) {
                    setServers(data.data);
                    console.log(data.data, "test bro ")
                } else {
                    console.log("function did not work bruh")
                }
            } catch (error) {
                console.log
            }
        };
        fetchData()
    }, [])


    return (
        <div
            className="space-y-4 flex flex-col items-center h-full text-primary w-full dark:bg-[#1E1F22] bg-[#E3E5E8] py-3"
        >
            <Action />
            <Separator
                className="h-[2px] bg-zinc-300 dark:bg-zinc-700 rounded-md w-10 mx-auto"
            />
            <ScrollArea className="flex-1 w-full">
                {servers.map((server: Server) => (
                    <div key={server.id} className="mb-4">
                        <ServerNavigation
                            id={server.id}
                            name={server.name}
                            imageUrl={server.imageUrl}
                        />
                    </div>
                ))}
            </ScrollArea>
            <div className="pb-3 mt-auto flex items-center flex-col gap-y-4">
                <ModeToggle />
                <Button variant={"discord"}/>
            </div>
        </div>
    );
}

export default Sidebar;